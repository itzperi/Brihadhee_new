# Dining room floor plan (seat booking)

Source: the owner's hand-drawn sketch "Book your seat", shared 20 Nov 2026 (`floor-plan-sketch.png`). The layout lives in `TABLES` in `src/lib/reserve.js` and `TABLE_SEATS` in `apps-script.gs`. Change both together.

| Table | Position (entrance at the top) | Seats |
|---|---|---|
| D3 | Left wall, top (the sketch's "B3" read as D3) | 4+2 = 6 |
| D2 | Left wall, middle | 4+2 = 6 |
| D1 | Left wall, lower | 4+2 = 6 |
| D5 | Centre, upper | 4 |
| D4 | Centre, lower | 4 |
| D8 | Right wall, top (below the cash counter) | 4+2 = 6 |
| D7 | Right wall, middle | 4+2 = 6 |
| D6 | Right wall, lower | 4+2 = 6 |

44 seats in total. The sketch also shows the entrance at the top, the cash counter top-right, the wash area bottom-left and the kitchen door bottom-right.

**Seat numbers:** 1–2 along the top edge (left to right) and 3–4 along the bottom edge. On 4+2 tables, 5 is the left end and 6 the right end. Seat ids are `<table>-<seat>`, e.g. `D1-5`.

**In the sheet:** "Table Numbers" reads `D1 (seats 1, 2), D4 (seat 3)`, "Number of Tables" counts the tables, and "Number of People" (column J) is the number of seats booked, filled in automatically. To cancel a booking, delete its row; its seats become free. A row naming a table without seats (`D3`, or `Table 3` from the first version) blocks the whole table.

**Assumption to confirm with the owner:** "4+2" is drawn as 2 chairs per long side plus 1 at each end. If the 2 extra chairs sit elsewhere, only the drawing changes; the booking rules stay the same.
