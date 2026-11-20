/** @OnlyCurrentDoc  Limits the script to this one spreadsheet. */
/**
 * Brihadhee Table Bookings — Live Tracker: Apps Script Web App.
 *
 * Paste into Extensions → Apps Script of the sheet, set SECRET to the same value
 * as the Vercel env var BOOKING_SHEET_SECRET, run setup() once, then
 * Deploy → New deployment → Web app (Execute as: Me, Who has access: Anyone).
 * Only the website's /api/book-table calls this; it sends SECRET with each call.
 *
 * Actions (POST body is JSON):
 *   { action: "book", row: {...} }        append a booking unless a chosen table is
 *                                         already booked for one of the chosen slots
 *   { action: "availability", date }      { "1:00 PM": [2, 5], … } for that date
 *
 * Reception can delete a row to cancel a booking: the table becomes free again.
 */
const SECRET = "REPLACE_WITH_BOOKING_SHEET_SECRET";
const SHEET_NAME = "Bookings";
const TZ = "Asia/Kolkata";
const HEADERS = [
  "Booking Timestamp (IST)", "Booking ID", "Reservation Date", "Selected Timings",
  "Number of Tables", "Table Numbers", "Customer Name", "Phone Number", "Traffic Source",
];
const COL = { date: 2, timings: 3, tables: 5 }; // zero-based

function setup() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME) || ss.getSheets()[0];
  sheet.setName(SHEET_NAME);
  sheet.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS]).setFontWeight("bold");
  sheet.setFrozenRows(1);
  // Plain text, so dates and phone numbers are stored exactly as sent.
  sheet.getRange("A:I").setNumberFormat("@");
  sheet.autoResizeColumns(1, HEADERS.length);
  ss.setSpreadsheetTimeZone(TZ);
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
  return String(v).split(",").map(function (s) { return s.trim(); }).filter(String);
}

/** { "1:00 PM": Set([2, 5]) } for every booking row on `date`. */
function takenOn(sheet, date) {
  const taken = {};
  const last = sheet.getLastRow();
  if (last < 2) return taken;
  const tz = sheet.getParent().getSpreadsheetTimeZone();
  const rows = sheet.getRange(2, 1, last - 1, HEADERS.length).getValues();
  rows.forEach(function (r) {
    if (cellDate(r[COL.date]) !== date) return;
    const tables = String(r[COL.tables]).match(/\d+/g) || [];
    cellSlots(r[COL.timings], tz).forEach(function (slot) {
      taken[slot] = taken[slot] || {};
      tables.forEach(function (t) { taken[slot][Number(t)] = true; });
    });
  });
  return taken;
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
    Object.keys(taken).forEach(function (slot) { out[slot] = Object.keys(taken[slot]).map(Number); });
    return reply({ ok: true, taken: out });
  }

  if (body.action !== "book" || !body.row) return reply({ ok: false, error: "bad_action" });
  const row = body.row;
  const lock = LockService.getScriptLock();
  if (!lock.tryLock(20000)) return reply({ ok: false, error: "busy" });
  try {
    const taken = takenOn(sheet, String(row.date));
    const clash = [];
    String(row.timings).split(",").map(function (s) { return s.trim(); }).forEach(function (slot) {
      (row.tableIds || []).forEach(function (t) {
        if (taken[slot] && taken[slot][Number(t)]) clash.push({ slot: slot, table: Number(t) });
      });
    });
    if (clash.length) return reply({ ok: false, error: "taken", taken: clash });

    sheet.appendRow([
      row.timestamp, row.bookingId, row.date, row.timings, row.tableCount,
      row.tableNumbers, row.name, row.phone, row.source,
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
