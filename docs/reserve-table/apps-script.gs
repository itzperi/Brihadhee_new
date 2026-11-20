/** @OnlyCurrentDoc  Limits the script to this one spreadsheet. */
/**
 * Brihadhee Table Bookings — Live Tracker: Apps Script Web App.
 *
 * Paste into Extensions → Apps Script of the sheet, set SECRET to the same value
 * as the Vercel env var BOOKING_SHEET_SECRET, run setup() once, then
 * Deploy → New deployment → Web app (Execute as: Me, Who has access: Anyone).
 * To update: Deploy → Manage deployments → Edit → Version: New version (same URL).
 * Only the website's /api/book-table calls this; it sends SECRET with each call.
 *
 * Guests book seats. Seat ids are "<table>-<seat>", e.g. "D1-3". The sheet's
 * "Table Numbers" column reads "D1 (seats 1, 2), D4 (seat 3)"; "Number of People"
 * (column J) is the number of seats booked, filled in automatically.
 *
 * Actions (POST body is JSON):
 *   { action: "book", row: {...} }        append a booking unless one of its seats is
 *                                         already booked for one of its slots
 *   { action: "availability", date }      { "1:00 PM": ["D1-1", "D4-3"], … } for that date
 *
 * Reception can delete a row to cancel a booking: its seats become free again.
 */
const SECRET = "REPLACE_WITH_BOOKING_SHEET_SECRET";
const SHEET_NAME = "Bookings";
const TZ = "Asia/Kolkata";
const HEADERS = [
  "Booking Timestamp (IST)", "Booking ID", "Reservation Date", "Selected Timings",
  "Number of Tables", "Table Numbers", "Customer Name", "Phone Number", "Traffic Source",
  "Number of People",
];
const COL = { date: 2, timings: 3, tables: 5 }; // zero-based
/** Seats per table, from the owner's floor plan (20 Nov 2026). */
const TABLE_SEATS = { D1: 6, D2: 6, D3: 6, D4: 4, D5: 4, D6: 6, D7: 6, D8: 6 };

function setup() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(SHEET_NAME) || ss.getSheets()[0];
  sheet.setName(SHEET_NAME);
  ensureHeaders(sheet);
  sheet.setFrozenRows(1);
  // Plain text, so dates and phone numbers are stored exactly as sent.
  sheet.getRange("A:J").setNumberFormat("@");
  sheet.autoResizeColumns(1, HEADERS.length);
  ss.setSpreadsheetTimeZone(TZ);
}

function ensureHeaders(sheet) {
  const row = sheet.getRange(1, 1, 1, HEADERS.length);
  const now = row.getValues()[0];
  if (now.join("|") !== HEADERS.join("|")) row.setValues([HEADERS]).setFontWeight("bold");
}

function reply(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}

function cellDate(v) {
  return v instanceof Date ? Utilities.formatDate(v, TZ, "yyyy-MM-dd") : String(v).trim();
}

/** "1:00 PM, 1:30 PM" → ["1:00 PM", "1:30 PM"]. A single time Sheets turned into a
 *  time value comes back as a Date, so format it in the sheet's own time zone. */
function cellSlots(v, tz) {
  if (v instanceof Date) return [Utilities.formatDate(v, tz, "h:mm a")];
  return String(v).split(",").map(function (s) { return slotLabel(s.trim()); }).filter(String);
}

/** "19:30" or "19:30:00" → "7:30 PM" (Sheets can store a lone time this way); "7:30 PM" stays. */
function slotLabel(s) {
  const m = /^(\d{1,2}):(\d{2})(?::\d{2})?$/.exec(s);
  if (!m) return s.replace(/\s+/g, " ").toUpperCase().replace(/^0/, "");
  const h = Number(m[1]);
  return ((h + 11) % 12 + 1) + ":" + m[2] + " " + (h < 12 ? "AM" : "PM");
}

function wholeTable(t) {
  const out = [];
  for (let i = 1; i <= (TABLE_SEATS[t] || 0); i++) out.push(t + "-" + i);
  return out;
}

/**
 * Seat ids in a "Table Numbers" cell. Reads "D1 (seats 1, 2), D4 (seat 3)";
 * a table named without seats ("D3", or "Table 3" from the first version of the
 * page) counts as every seat at that table.
 */
function cellSeats(v) {
  const text = String(v);
  const seats = [];
  const re = /\b(?:D|Table\s*)(\d)\b(?:\s*\(seats?\s*([\d,\s]+)\))?/gi;
  let m;
  while ((m = re.exec(text))) {
    const t = "D" + m[1];
    if (m[2]) m[2].split(",").map(function (n) { return n.trim(); }).filter(String).forEach(function (n) { seats.push(t + "-" + n); });
    else wholeTable(t).forEach(function (s) { seats.push(s); });
  }
  return seats;
}

/** { "1:00 PM": { "D1-1": true, … } } for every booking row on `date`. */
function takenOn(sheet, date) {
  const taken = {};
  const last = sheet.getLastRow();
  if (last < 2) return taken;
  const tz = sheet.getParent().getSpreadsheetTimeZone();
  const rows = sheet.getRange(2, 1, last - 1, COL.tables + 1).getValues();
  rows.forEach(function (r) {
    if (cellDate(r[COL.date]) !== date) return;
    const seats = cellSeats(r[COL.tables]);
    cellSlots(r[COL.timings], tz).forEach(function (slot) {
      taken[slot] = taken[slot] || {};
      seats.forEach(function (s) { taken[slot][s] = true; });
    });
  });
  return taken;
}

/** Seats a request asks for. Requests from the first (table) version send tableIds. */
function requestedSeats(row) {
  if (row.seatIds && row.seatIds.length) return row.seatIds.map(String);
  const out = [];
  (row.tableIds || []).forEach(function (n) { wholeTable("D" + Number(n)).forEach(function (s) { out.push(s); }); });
  return out;
}

function doPost(e) {
  let body;
  try {
    body = JSON.parse(e.postData.contents);
  } catch (err) {
    return reply({ ok: false, error: "bad_json" });
  }
  if (!body || body.secret !== SECRET) return reply({ ok: false, error: "forbidden" });

  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
  if (!sheet) return reply({ ok: false, error: "no_sheet" });

  if (body.action === "availability") {
    const taken = takenOn(sheet, String(body.date));
    const out = {};
    Object.keys(taken).forEach(function (slot) { out[slot] = Object.keys(taken[slot]); });
    return reply({ ok: true, taken: out });
  }

  if (body.action !== "book" || !body.row) return reply({ ok: false, error: "bad_action" });
  const row = body.row;
  const seats = requestedSeats(row);
  if (!seats.length) return reply({ ok: false, error: "no_seats" });
  const lock = LockService.getScriptLock();
  if (!lock.tryLock(20000)) return reply({ ok: false, error: "busy" });
  try {
    ensureHeaders(sheet);
    const taken = takenOn(sheet, String(row.date));
    const clash = [];
    String(row.timings).split(",").map(function (s) { return slotLabel(s.trim()); }).forEach(function (slot) {
      seats.forEach(function (s) {
        if (taken[slot] && taken[slot][s]) clash.push({ slot: slot, seat: s, table: Number(s.slice(1, s.indexOf("-"))) });
      });
    });
    if (clash.length) return reply({ ok: false, error: "taken", taken: clash });

    sheet.appendRow([
      row.timestamp, row.bookingId, row.date, row.timings, row.tableCount,
      row.tableNumbers, row.name, row.phone, row.source, row.seatCount != null ? row.seatCount : seats.length,
    ].map(function (v) {
      // The leading apostrophe stores every value as typed: no formulas, and no
      // "10:30 PM" or "2026-11-21" turned into time or date values. It isn't shown.
      return "'" + String(v);
    }));
    SpreadsheetApp.flush();
    return reply({ ok: true, bookingId: row.bookingId });
  } finally {
    lock.releaseLock();
  }
}

function doGet() {
  return reply({ ok: true, service: "brihadhee-table-bookings" });
}
