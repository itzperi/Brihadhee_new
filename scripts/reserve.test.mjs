// node --test scripts/reserve.test.mjs — /reserve-table/ rules and /api/book-table.
import { test } from "node:test";
import assert from "node:assert/strict";
import { SLOTS, SLOT_GROUPS, openSlots, firstOpenDate, validateBooking, normalisePhone, slotLabel, bookingId, sheetPayload } from "../src/lib/reserve.js";
import { handleBooking, handleAvailability } from "../api/book-table.js";

// 2026-11-20 12:40 IST
const NOW = Date.parse("2026-11-20T07:10:00Z");
const ENV = { BOOKING_SHEET_WEBHOOK_URL: "https://script.google.com/macros/s/AKfyTEST_123/exec", BOOKING_SHEET_SECRET: "s3cret" };
const good = { date: "2026-11-20", slots: ["13:00", "13:30"], tables: [2, 5], name: "Test Guest", phone: "9876543210", source: "instagram / paid_social" };
const post = (body) => new Request("https://www.brihadhee.com/api/book-table", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(body) });

test("24 half-hour slots from 11:00 AM to 10:30 PM in three groups", () => {
  assert.equal(SLOTS.length, 24);
  assert.equal(slotLabel(SLOTS[0]), "11:00 AM");
  assert.equal(slotLabel("12:00"), "12:00 PM");
  assert.equal(slotLabel(SLOTS.at(-1)), "10:30 PM");
  assert.deepEqual(SLOT_GROUPS.map((g) => g.slots.length), [10, 6, 8]);
  assert.deepEqual(SLOT_GROUPS.flatMap((g) => g.slots), SLOTS);
});

test("today only offers slots that have not started (IST)", () => {
  assert.equal(openSlots("2026-11-20", NOW)[0], "13:00");
  assert.equal(openSlots("2026-11-21", NOW).length, 24);
  assert.equal(openSlots("2026-11-19", NOW).length, 0);
  assert.equal(openSlots("2027-01-30", NOW).length, 0);
  assert.equal(firstOpenDate(Date.parse("2026-11-20T17:10:00Z")), "2026-11-21"); // 22:40 IST
});

test("phone normalisation", () => {
  for (const p of ["9876543210", "+91 98765 43210", "+919876543210", "09876543210", "919876543210"]) assert.equal(normalisePhone(p), "9876543210");
  for (const p of ["12345", "5876543210", "98765432101", ""]) assert.equal(normalisePhone(p), null);
});

test("validateBooking accepts a good booking and rejects bad input", () => {
  assert.equal(validateBooking(good, { now: NOW }).ok, true);
  const bad = validateBooking({ ...good, slots: ["12:00"], tables: [9], name: "x", phone: "123" }, { now: NOW });
  assert.deepEqual(Object.keys(bad.errors).sort(), ["name", "phone", "slots", "tables"]);
  assert.equal(validateBooking({ ...good, date: "2026-02-30" }, { now: NOW }).ok, false);
  assert.equal(validateBooking({ ...good, company: "bot" }, { now: NOW }).spam, true);
});

test("sheet row matches the sheet's columns", () => {
  const id = bookingId("2026-11-20", () => 0);
  assert.equal(id, "BRH-1120-2222");
  const row = sheetPayload(validateBooking(good, { now: NOW }).booking, { id, now: NOW });
  assert.equal(row.timestamp, "20/11/2026, 12:40:00");
  assert.equal(row.timings, "1:00 PM, 1:30 PM");
  assert.equal(row.tableCount, 2);
  assert.equal(row.tableNumbers, "Table 2, Table 5");
  assert.equal(row.phone, "+91 98765 43210");
});

test("POST books through the sheet and never exposes the secret to the browser", async () => {
  let sent;
  const fetchImpl = async (url, init) => {
    sent = { url, body: JSON.parse(init.body) };
    return new Response(JSON.stringify({ ok: true }));
  };
  const res = await handleBooking(post(good), { env: ENV, now: NOW, fetchImpl, rand: () => 0 });
  const data = await res.json();
  assert.equal(res.status, 200);
  assert.equal(sent.url, ENV.BOOKING_SHEET_WEBHOOK_URL);
  assert.equal(sent.body.secret, "s3cret");
  assert.equal(sent.body.action, "book");
  assert.equal(data.booking.bookingId, "BRH-1120-2222");
  assert.equal(JSON.stringify(data).includes("s3cret"), false);
  assert.equal("tableIds" in data.booking, false);
});

test("POST maps a clash to 409, sheet failure to 502, missing config to 503, bad input to 422", async () => {
  const clash = async () => new Response(JSON.stringify({ ok: false, error: "taken", taken: [{ slot: "1:30 PM", table: 5 }] }));
  const r1 = await handleBooking(post(good), { env: ENV, now: NOW, fetchImpl: clash });
  assert.equal(r1.status, 409);
  assert.deepEqual((await r1.json()).taken, [{ slot: "13:30", table: 5 }]);

  const down = async () => new Response("<html>", { status: 500 });
  assert.equal((await handleBooking(post(good), { env: ENV, now: NOW, fetchImpl: down })).status, 502);
  assert.equal((await handleBooking(post(good), { env: {}, now: NOW })).status, 503);
  assert.equal((await handleBooking(post({ ...good, phone: "1" }), { env: ENV, now: NOW })).status, 422);
  assert.equal((await handleBooking(new Request("https://x/api/book-table", { method: "POST", body: "nope" }), { env: ENV, now: NOW })).status, 400);
});

test("GET returns taken tables per slot id, with no personal data", async () => {
  const fetchImpl = async () => new Response(JSON.stringify({ ok: true, taken: { "1:00 PM": [5, 2], "9:99 PM": [1] } }));
  const res = await handleAvailability(new Request("https://x/api/book-table?date=2026-11-20"), { env: ENV, fetchImpl });
  assert.deepEqual(await res.json(), { ok: true, date: "2026-11-20", taken: { "13:00": [2, 5] } });
});
