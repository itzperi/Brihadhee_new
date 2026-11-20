# 17 Instagram ad booking funnel (/reserve-table/)

Written 2026-11-20 on branch `feat/reserve-table`. Not pushed or deployed (CLAUDE.md). Blocked items are under **F** in `owner-questions.md`.

## What was built

| Item | File |
| --- | --- |
| Step 1: date (Today, Tomorrow, date picker; IST) and 30-minute slots 11:00 AM–10:30 PM, grouped Lunch / Evening / Dinner, multi-select, sticky summary bar | `src/pages/reserve-table/index.astro` |
| Step 2: 8 tables, multi-select, "N Tables Selected: …", Book Table → name + +91 mobile dialog → confirmation card (Booking ID, date, timings, tables, name, phone, Call Reception, directions) | `src/pages/reserve-table/tables.astro` |
| Slim frame: wordmark, call button, address and hours from `entity-truth.ts`; no site nav, no CallBar | `src/components/ReserveFrame.astro`, `src/styles/reserve.css` |
| Shared rules (slots, IST, phone, validation, booking ID, sheet row) | `src/lib/reserve.js` |
| Vercel Function: `POST` books, `GET ?date=` returns taken tables (no personal data) | `api/book-table.js` |
| Apps Script Web App behind the Google Sheet | `docs/reserve-table/apps-script.gs` |
| Tests (8) | `scripts/reserve.test.mjs`, added to `npm test` |
| `Base.astro`: new `cta="none"` value hides the mobile CallBar. Default unchanged | `src/layouts/Base.astro` |

**Not touched:** `/book-a-table/`, `Nav.astro`, `Footer.astro`, `CallBar.astro` and every link to `/book-a-table/`.

**SEO isolation:** both pages are `noindex, follow` and kept out of the sitemap (`check:seo` confirmed this), so they can't compete with `/book-a-table/`. Nothing on the site links to them; they're for ad traffic only.

**Departures from the brief, forced by repo checks:**
- The "Evening Tiffin" label is "Evening": `check:facts` blocks "tiffin" (client direction 2026-11-11).
- Group headers show a slot count, not a time range: AEO lint reads "11:00 AM – 3:30 PM" as conflicting opening hours.
- No seat count is shown on tables ("4-seater" is unverified, so F1 is open).

## Data path

Browser → `/api/book-table` (same origin; CSP `connect-src 'self'` unchanged) → Apps Script `doPost` (checks `SECRET`, takes a lock, refuses a table already booked for an overlapping slot on that date, otherwise `appendRow`) → sheet **Brihadhee Table Bookings — Live Tracker**, tab `Bookings`.

- The browser never sees the Web App URL or the secret.
- The Apps Script has `@OnlyCurrentDoc`, so its permission covers only this spreadsheet.
- Deleting a row in the sheet cancels that booking and frees the table.
- Traffic source = `utm_source / utm_medium / utm_campaign`. Without UTMs: `fbclid`, then the referrer, then "direct".
- Analytics: GA4 `reserve_table_continue` and `reserve_table_submit`, Meta `Schedule`, each sent only when its ID is set.

## Google setup (done 2026-11-20, account brihadheemeta@gmail.com)

- Sheet: https://docs.google.com/spreadsheets/d/1hBQXELdINHxPhWOrpHDiYQciHR3x_8Tff88kh_zIYWY/edit
- Apps Script project: https://script.google.com/home/projects/1LqpEMffXzEwz-hEh_SyBRVY_UwY3IXe_L4cJSZaeJGjiEmkCiYbny3ko/edit ("Untitled project"; can be renamed)
- Web App: deployment "Brihadhee reserve-table webhook v1", Execute as Me, access Anyone. The URL and secret are in `.env.local` (git-ignored). They aren't recorded in the repo.
- Sharing: left **Restricted** (the owner account only). The sheet holds customer phone numbers, so share it by email with named people (Editor for reception), never "Anyone with the link". See F4.

## Verification (2026-11-20)

| Check | Result |
| --- | --- |
| `npm test` | passed (includes 8 new reserve tests) |
| `npm run build` (site + all checks) | passed |
| Webhook without the secret | `{"ok":false,"error":"forbidden"}` |
| Playwright, 390×844, local server against the **live** sheet: 1:00 PM + 1:30 PM, Table 2 + Table 5, Test Guest / 9876543210 | API 200, Booking ID BRH-1120-RTYV, confirmation shown, Back restores the slots, no console errors |
| Row in sheet (CSV export) | `20/11/2026, 10:43:18, BRH-1120-RTYV, 2026-11-20, "1:00 PM, 1:30 PM", 2, "Table 2, Table 5", Test Guest, +91 98765 43210, instagram / paid_social / e2e_test` |
| Overlapping booking (1:30 PM, Table 5) | 409 `taken`, not written |
| Test row deleted | Sheet holds only the header row; availability for 2026-11-20 empty |
| Live URL `https://www.brihadhee.com/reserve-table` | **Not checked: not deployed.** |

Screenshots: `evidence/reserve-table/3-tables.png` and `evidence/reserve-table/5-confirmed.png`.

## To go live (developer)

1. In Vercel → Project → Settings → Environment Variables (Production and Preview), add `BOOKING_SHEET_WEBHOOK_URL` and `BOOKING_SHEET_SECRET` with the values from `.env.local`.
2. Push `feat/reserve-table`, open a PR, merge and deploy.
3. Check `curl -sI https://www.brihadhee.com/reserve-table` returns 200. Then make one real booking from a phone and delete its row.
4. Ad URL: `https://www.brihadhee.com/reserve-table/?utm_source=instagram&utm_medium=paid_social` (add `&utm_campaign=<name>` per campaign).

If the Apps Script code changes, use Deploy → Manage deployments → Edit → New version. That keeps the same `/exec` URL.

## Update 2026-11-20: seat booking on the owner's floor plan

Step 2 now shows the dining room from the owner's sketch (`docs/reserve-table/floor-plan.md`): tables D1–D8, 44 seats. Guests tap single seats, or tap a table to take all its free seats.

- Seats already booked for an overlapping slot are greyed out and can't be chosen.
- The Apps Script refuses a clashing seat under a lock. Its 409 response names the seats that were lost, and the guest's other choices stay selected.
- The sheet gains column J "Number of Seats". "Table Numbers" reads `D1 (seats 1, 2), D4 (seat 3)`.

Checked with Playwright against the stand-in sheet: guest A booked D1 seats 1–2, and guest B saw both seats greyed and disabled. Seats fit inside the room with no overlaps at 320, 360, 390, 430, 768 and 1366 px widths.

**Order to go live:** publish the new Apps Script version first, then deploy the site. The new script still accepts bookings from the old table page, where a table booking blocks every seat at that table. The new page, however, needs the new script.
