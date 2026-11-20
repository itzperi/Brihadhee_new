/**
 * /reserve-table/ booking rules, shared by the page script and the Vercel
 * Function api/book-table.js. Plain JS only: a Function cannot import .ts
 * (see scripts/check-functions.mjs).
 *
 * Slots are 30 minutes from 11:00 to 22:30 (the last one ends at 23:00), which is
 * the verified dining window in entity-truth.ts (DINING_OPENS / DINING_CLOSES).
 * Floor plan, table names and seats: the owner's sketch of the dining room
 * (20 Nov 2026, docs/reserve-table/floor-plan.md). Guests book seats, not tables.
 */

export const TZ = "Asia/Kolkata";
export const OPEN_MIN = 11 * 60;
export const CLOSE_MIN = 23 * 60;
export const SLOT_MIN = 30;
export const BOOK_AHEAD_DAYS = 30;

/** "13:30" for minute 810. */
const hhmm = (m) => `${String(Math.floor(m / 60)).padStart(2, "0")}:${String(m % 60).padStart(2, "0")}`;

/** "1:30 PM" for "13:30". */
export function slotLabel(id) {
  const [h, m] = id.split(":").map(Number);
  return `${((h + 11) % 12) + 1}:${String(m).padStart(2, "0")} ${h < 12 ? "AM" : "PM"}`;
}

/** All 24 slot ids, "11:00" … "22:30". */
export const SLOTS = Array.from({ length: (CLOSE_MIN - OPEN_MIN) / SLOT_MIN }, (_, i) => hhmm(OPEN_MIN + i * SLOT_MIN));

export const SLOT_GROUPS = [
  { id: "lunch", label: "Lunch", from: "11:00", to: "15:30" },
  { id: "evening", label: "Evening", from: "16:00", to: "18:30" },
  { id: "dinner", label: "Dinner", from: "19:00", to: "22:30" },
].map((g) => ({ ...g, slots: SLOTS.filter((s) => s >= g.from && s <= g.to) }));

/**
 * The dining room as sketched by the owner. x is the table's centre and y its top
 * edge, as % of the room (entrance at the top, kitchen at the bottom right).
 * "4+2" tables have 2 chairs on each long side and 1 at each end: seats 1–2 top
 * (left to right), 3–4 bottom, 5 left end, 6 right end. 4-seat tables: seats 1–4.
 */
export const TABLES = [
  { id: "D3", seats: 6, x: 19, y: 7 },
  { id: "D2", seats: 6, x: 19, y: 35 },
  { id: "D1", seats: 6, x: 19, y: 61 },
  { id: "D5", seats: 4, x: 50, y: 29 },
  { id: "D4", seats: 4, x: 50, y: 54 },
  { id: "D8", seats: 6, x: 81, y: 15 },
  { id: "D7", seats: 6, x: 81, y: 40 },
  { id: "D6", seats: 6, x: 81, y: 66 },
].map((t) => ({ ...t, label: t.seats === 6 ? "4+2 seats" : "4 seats" }));

/** Every seat id, e.g. "D1-3" (table D1, seat 3). */
export const SEATS = TABLES.flatMap((t) => Array.from({ length: t.seats }, (_, i) => `${t.id}-${i + 1}`));
export const SEAT_COUNT = SEATS.length;
const SEAT_SET = new Set(SEATS);

/** Seat ids sorted by table (D1 … D8) then seat number. */
export function sortSeats(ids) {
  const key = (id) => id.split("-").map((p) => Number(p.replace("D", "")));
  return [...new Set(ids)].sort((a, b) => key(a)[0] - key(b)[0] || key(a)[1] - key(b)[1]);
}

/** "D1 (seats 1, 2), D4 (seat 3)" for ["D1-1", "D1-2", "D4-3"]. */
export function seatSummary(ids) {
  const by = new Map();
  for (const id of sortSeats(ids)) {
    const [t, n] = id.split("-");
    by.set(t, [...(by.get(t) || []), n]);
  }
  return [...by].map(([t, ns]) => `${t} (${ns.length === 1 ? "seat" : "seats"} ${ns.join(", ")})`).join(", ");
}

/** Distinct tables in a seat list, in order. */
export const tablesOf = (ids) => [...new Set(sortSeats(ids).map((id) => id.split("-")[0]))];

/** IST calendar date ("YYYY-MM-DD") and minute of day for an instant. */
export function istNow(now = Date.now()) {
  const parts = Object.fromEntries(
    new Intl.DateTimeFormat("en-CA", { timeZone: TZ, year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", hourCycle: "h23" })
      .formatToParts(new Date(now))
      .map((p) => [p.type, p.value]),
  );
  return { date: `${parts.year}-${parts.month}-${parts.day}`, minute: Number(parts.hour) * 60 + Number(parts.minute) };
}

/** "YYYY-MM-DD" plus n days (calendar arithmetic, no time zone involved). */
export function addDays(date, n) {
  const d = new Date(`${date}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() + n);
  return d.toISOString().slice(0, 10);
}

/** "Fri, 20 Nov 2026" for "2026-11-20". */
export function dateLabel(date) {
  const d = new Date(`${date}T00:00:00Z`);
  const part = (o) => d.toLocaleDateString("en-IN", { timeZone: "UTC", ...o });
  return `${part({ weekday: "short" })}, ${d.getUTCDate()} ${part({ month: "short" })} ${d.getUTCFullYear()}`;
}

const toMin = (id) => Number(id.slice(0, 2)) * 60 + Number(id.slice(3));

/** Slots still bookable on `date`: on today, only slots that have not started. */
export function openSlots(date, now = Date.now()) {
  const t = istNow(now);
  if (date < t.date || date > addDays(t.date, BOOK_AHEAD_DAYS)) return [];
  return date === t.date ? SLOTS.filter((s) => toMin(s) > t.minute) : SLOTS.slice();
}

/** First date with at least one open slot (today, or tomorrow late at night). */
export function firstOpenDate(now = Date.now()) {
  const today = istNow(now).date;
  return openSlots(today, now).length ? today : addDays(today, 1);
}

/** Indian mobile number as 10 digits, or null. Accepts +91, 91, 0 prefixes and spaces/dashes. */
export function normalisePhone(raw) {
  let d = String(raw ?? "").replace(/[\s\-().]/g, "");
  if (d.startsWith("+91")) d = d.slice(3);
  else if (d.length === 12 && d.startsWith("91")) d = d.slice(2);
  else if (d.length === 11 && d.startsWith("0")) d = d.slice(1);
  return /^[6-9]\d{9}$/.test(d) ? d : null;
}

export const formatPhone = (d) => `+91 ${d.slice(0, 5)} ${d.slice(5)}`;

/** Slot ids from a query/body value: "13:00,13:30" or an array. Sorted, unique. */
export function parseSlots(v) {
  const list = Array.isArray(v) ? v : String(v ?? "").split(",");
  return [...new Set(list.map((s) => String(s).trim()).filter(Boolean))].sort();
}

/** Seat ids from "D1-1,D1-2" or ["D1-1", "D1-2"]. Upper-cased, unique, unvalidated. */
export function parseSeats(v) {
  const list = Array.isArray(v) ? v : String(v ?? "").split(",");
  return [...new Set(list.map((s) => String(s).trim().toUpperCase()).filter(Boolean))];
}

const clean = (s, max) => String(s ?? "").replace(/[\u0000-\u001f\u007f]/g, " ").replace(/\s+/g, " ").trim().slice(0, max);

/**
 * Validate a booking request. Returns { ok: true, booking } or { ok: false, errors }
 * ({ ok: false, spam: true } when the honeypot is filled).
 */
export function validateBooking(input, { now = Date.now() } = {}) {
  if (clean(input?.company, 200)) return { ok: false, spam: true };
  const errors = {};
  const date = String(input?.date ?? "");
  const slots = parseSlots(input?.slots);
  const seats = parseSeats(input?.seats);
  const name = clean(input?.name, 80);
  const phone = normalisePhone(input?.phone);

  if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || Number.isNaN(Date.parse(`${date}T00:00:00Z`)) || addDays(date, 0) !== date) {
    errors.date = "Choose a valid date.";
  } else {
    const open = new Set(openSlots(date, now));
    if (!open.size) errors.date = `Choose a date from today up to ${BOOK_AHEAD_DAYS} days ahead.`;
    else if (!slots.length) errors.slots = "Choose at least one time slot.";
    else if (slots.some((s) => !open.has(s))) errors.slots = "One of the chosen times is no longer available. Choose again.";
  }
  if (!seats.length) errors.seats = "Choose at least one seat.";
  else if (seats.some((id) => !SEAT_SET.has(id))) errors.seats = "Choose seats from the floor plan.";
  if (name.length < 2) errors.name = "Enter your full name.";
  if (!phone) errors.phone = "Enter a 10-digit Indian mobile number.";

  if (Object.keys(errors).length) return { ok: false, errors };
  return {
    ok: true,
    booking: { date, slots, seats: sortSeats(seats), name, phone, source: clean(input?.source, 120) || "direct" },
  };
}

/** Booking ID such as "BRH-1120-7K3Q": IST month and day, then 4 random characters. */
export function bookingId(date, rand = Math.random) {
  const abc = "23456789ABCDEFGHJKMNPQRSTUVWXYZ";
  const tail = Array.from({ length: 4 }, () => abc[Math.floor(rand() * abc.length)]).join("");
  return `BRH-${date.slice(5, 7)}${date.slice(8, 10)}-${tail}`;
}

/** "20/11/2026, 14:05:09" in IST. */
export function istTimestamp(now = Date.now()) {
  return new Intl.DateTimeFormat("en-GB", { timeZone: TZ, dateStyle: "short", timeStyle: "medium", hourCycle: "h23" }).format(new Date(now));
}

/** The row the Apps Script appends, in the sheet's column order. */
export function sheetPayload(booking, { id, now = Date.now() }) {
  return {
    timestamp: istTimestamp(now),
    bookingId: id,
    date: booking.date,
    timings: booking.slots.map(slotLabel).join(", "),
    slotIds: booking.slots,
    tableCount: tablesOf(booking.seats).length,
    tableNumbers: seatSummary(booking.seats),
    seatCount: booking.seats.length,
    seatIds: booking.seats,
    name: booking.name,
    phone: formatPhone(booking.phone),
    source: booking.source,
  };
}
