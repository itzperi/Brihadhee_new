/**
 * /api/book-table: table bookings from /reserve-table/ (Vercel Function, Node runtime).
 *
 *   POST { date, slots, tables, name, phone, source, company }  → book
 *        200 { ok, booking }      written to the sheet
 *        409 { ok:false, error:"taken", taken:[{ slot, table }] }
 *        422 { ok:false, errors } 503 not configured, 502 sheet error
 *   GET  ?date=YYYY-MM-DD                                       → availability
 *        200 { ok, taken: { "13:00": [2, 5], … } }  (no personal data)
 *
 * The Google Sheet "Brihadhee Table Bookings — Live Tracker" is the only store.
 * Its Apps Script Web App (docs/reserve-table/apps-script.gs) appends the row and
 * refuses a table that is already booked for an overlapping slot, under a lock.
 * The browser never sees the Web App URL or the secret, and CSP connect-src
 * stays 'self'.
 *
 * Environment variables (Vercel > Project > Settings > Environment Variables):
 *   BOOKING_SHEET_WEBHOOK_URL  required. The Web App's https://script.google.com/macros/s/…/exec URL
 *   BOOKING_SHEET_SECRET       required. Must equal SECRET in the Apps Script
 */
import { validateBooking, bookingId, sheetPayload, slotLabel, SLOTS, istNow } from "../src/lib/reserve.js";

const MAX_BODY = 8 * 1024;
const TIMEOUT_MS = 15000;

const json = (status, body) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store", "X-Robots-Tag": "noindex, nofollow" },
  });

const LABEL_TO_SLOT = new Map(SLOTS.map((s) => [slotLabel(s), s]));

async function callSheet(env, body, fetchImpl) {
  const res = await fetchImpl(env.BOOKING_SHEET_WEBHOOK_URL, {
    method: "POST",
    headers: { "Content-Type": "text/plain;charset=utf-8" },
    body: JSON.stringify({ ...body, secret: env.BOOKING_SHEET_SECRET }),
    redirect: "follow",
    signal: AbortSignal.timeout(TIMEOUT_MS),
  });
  if (!res.ok) throw new Error(`sheet_http_${res.status}`);
  const text = await res.text();
  try {
    return JSON.parse(text);
  } catch {
    throw new Error("sheet_not_json");
  }
}

const configured = (env) => /^https:\/\/script\.google\.com\/macros\/s\/[\w-]+\/exec$/.test(env.BOOKING_SHEET_WEBHOOK_URL || "") && !!env.BOOKING_SHEET_SECRET;

export async function handleBooking(request, { env = process.env, now = Date.now(), fetchImpl = fetch, rand = Math.random } = {}) {
  let input;
  try {
    if (Number(request.headers.get("content-length")) > MAX_BODY) throw new Error("too_large");
    const raw = await request.text();
    if (Buffer.byteLength(raw) > MAX_BODY) throw new Error("too_large");
    input = JSON.parse(raw);
    if (!input || typeof input !== "object" || Array.isArray(input)) throw new Error("invalid");
  } catch {
    return json(400, { ok: false, error: "bad_request" });
  }

  const result = validateBooking(input, { now });
  if (!result.ok && result.spam) return json(200, { ok: true });
  if (!result.ok) return json(422, { ok: false, errors: result.errors });
  if (!configured(env)) {
    console.error("[book-table] BOOKING_SHEET_WEBHOOK_URL or BOOKING_SHEET_SECRET is not set; booking not saved");
    return json(503, { ok: false, error: "not_configured" });
  }

  const { booking } = result;
  const row = sheetPayload(booking, { id: bookingId(istNow(now).date, rand), now });
  let reply;
  try {
    reply = await callSheet(env, { action: "book", row }, fetchImpl);
  } catch (e) {
    console.error("[book-table] sheet call failed:", e.message);
    return json(502, { ok: false, error: "sheet_failed" });
  }
  if (reply?.ok) return json(200, { ok: true, booking: { ...row, slotIds: undefined, tableIds: undefined } });
  if (reply?.error === "taken") {
    const taken = (reply.taken || []).map((t) => ({ slot: LABEL_TO_SLOT.get(t.slot) ?? t.slot, table: Number(t.table) }));
    return json(409, { ok: false, error: "taken", taken });
  }
  console.error("[book-table] sheet refused:", reply?.error);
  return json(502, { ok: false, error: "sheet_failed" });
}

export async function handleAvailability(request, { env = process.env, fetchImpl = fetch } = {}) {
  const date = new URL(request.url).searchParams.get("date") || "";
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) return json(400, { ok: false, error: "bad_date" });
  if (!configured(env)) return json(503, { ok: false, error: "not_configured" });
  try {
    const reply = await callSheet(env, { action: "availability", date }, fetchImpl);
    if (!reply?.ok) throw new Error(reply?.error || "refused");
    const taken = {};
    for (const [label, tables] of Object.entries(reply.taken || {})) {
      const slot = LABEL_TO_SLOT.get(label);
      if (slot) taken[slot] = [...new Set(tables.map(Number))].sort((a, b) => a - b);
    }
    return json(200, { ok: true, date, taken });
  } catch (e) {
    console.error("[book-table] availability failed:", e.message);
    return json(502, { ok: false, error: "sheet_failed" });
  }
}

export function POST(request) {
  return handleBooking(request);
}

export function GET(request) {
  return handleAvailability(request);
}
