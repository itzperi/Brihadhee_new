# 20 Client keyword alignment and AEO precision pass (24 Nov 2026)

Working tree on `main`, nothing committed, pushed or deployed. Inputs: the client keyword rules pasted on
24 Nov 2026 (they restate the 12 Nov keyword brief; `docs/brihadhee-keyword-plan.md` is not in the repo),
`docs/seo/client-confirmations.md`, `docs/seo/keyword-tracker.csv`, the Search Console export in
`evidence/gsc/2026-11-12_to_2026-11-15/`, the 15–21 Nov page summary pasted in chat, the GBP screenshots of
23–24 Nov in the parent folder, and `evidence/2026-11-24/competitors.md`.

## 1. Rules applied, and where a recorded owner answer already settles them

| Client rule | Its condition | Repo record | Result |
|---|---|---|---|
| "Vegetarian catering", not "pure veg", on catering pages | until Q20 is confirmed | Q20 confirmed 15 Nov (`client-confirmations.md` L) | Kept "pure veg". `IS_CATERING_PURE_VEG` still switches every catering page, and `seo-verify` now fails if "pure veg" catering wording renders while it is off |
| Avoid "thousands of combinations" | until Q3 is approved | Approved 23 Nov | Kept |
| No live no-onion, no-garlic, Jain, satvik claims; no dietary page | until the kitchen confirms Q11–Q14 | 23 Nov approved request-only guidance; kitchen answers still missing | **Applied.** Flags off, page not built, mentions on home, `/about/`, `/menu/` and the seasonal page now follow the flags. One-line flip back |
| Zero FAQPage JSON-LD on `/faq/` | none | Kept on by your decision of 24 Nov (`EMIT_FAQPAGE`) | Kept; visible questions are `<h3>` with `<p>` answers |
| "Does Brihadhee serve breakfast? No…" | none | 23 Nov replaced it with "Which meals does Brihadhee serve?"; "breakfast" is hard-blocked | Kept the 23 Nov wording (owner question H3) |
| Reference the Anna Nagar Ayyappan temple | none | Q24 gate off | No temple named (H4) |
| Ban "budget" as a pricing factor | client 11 Nov hard block | Quote form says "spend" | Cost answer says "the spend you have in mind" |

## 2. Search Console baseline (real data only)

There is no 28-day or 90-day export in the repo and no Search Console API access in this session, so no
28/90-day figures are given. Query-level data exists only for 12–15 Nov (4 days, 1,537 impressions, 33 clicks).

Positions 4–20 with the most impressions (12–15 Nov, query rows):

| Query family | Impressions | Avg position | Primary URL |
|---|---|---|---|
| veg restaurant(s) (in) anna nagar, 5 variants | 198 | 17.2–18.1 | `/` |
| pure veg restaurants in anna nagar | 10 | 15.2 | `/` |
| veg restaurants in anna nagar for lunch | 6 | 14.3 | `/menu/nellai-meals/` |
| south indian restaurant(s) (in) anna nagar, 4 variants | 15 | 5–7 | `/` |
| south indian restaurants near me | 5 | 7.6 | `/` (Maps decides) |
| brand: reviews, photos, offers | 25 | 8.4 | now `/offers/` and `/photos/` |
| dosa and near-me dosa queries, 6 variants | 9 | 2–26 | `/menu/dosa/` |

Page level, 15–21 Nov (pasted): `/about/` 174 impressions at 9.3 with 0 clicks; `/menu/dosa/` 46 at 9.8;
`/book-a-table/` 26 at 8.9; `/catering-services-chennai/` 20 at 9.5; `/corporate-catering-chennai/` 54 at 43.5.

**Ranking risk.** The home title approved in Phase 3 drops "South Indian Restaurant", the words behind the
position 5–7 queries above. It is not deployed yet.

## 3. Competitor intelligence

See `evidence/2026-11-24/competitors.md` (8 queries on 24 Nov, about 23:20 IST, US web index, not a Chennai
Google results page; many directory pages blocked, so treat order as indicative only).

| Cluster | Dominant intent of the top results | What it means for Brihadhee |
|---|---|---|
| Catering, 50+ guests, quotes | Vendor directories with per-plate "from" prices, guest ranges and locality cards; one real caterer service page (staffing, 50-guest minimum, FAQs, form) | Brihadhee's four catering pages already cover minimum, range, quote inputs and FAQs; directories show prices the client will not publish, so the pages explain what moves the price instead |
| Build your own dosa, brand | "build your own dosa Chennai" unserved by competitors; "brihadhee" returns the Sanskrit word, a name, a king and the Thanjavur temple | Brihadhee can own the explainer; the name story now also sits on `/` for disambiguation |
| Temple-visit and family dining | Local list and listing pages; no result mentions a temple | The after-temple angle is uncontested; the family page now names 3rd Avenue, Tower Park and four direction landmarks |
| Lunch and dinner | "veg lunch Anna Nagar" is delivery-app pages; no result names Paanai Parotta | Brihadhee's parotta page is the only one naming the dish; "pot parotta, dum style" added from the menu wording |

Applied from it: the name story on the home About section, landmarks on the family page, and the menu's "sealed pot
(dum style)" wording in place of the unverified "claypot" on `/parotta-anna-nagar/` and the home social preview.
Not applied: an FSSAI line on event pages (would imply where event food is cooked, unconfirmed) and North Indian or
Indo-Chinese dishes in catering (a restaurant fact, not a confirmed catering scope). Owner facts it asked for are
H5–H7 in `owner-questions.md`.

## 4. Keyword-to-URL map (priority 1–4; one primary URL each, from the tracker)

| Priority | Keyword cluster | Primary URL | Title now |
|---|---|---|---|
| 1 | small function catering Chennai, small party catering Chennai, vegetarian catering for 50 people Chennai | `/small-function-catering-chennai/` | Small Function Veg Catering Chennai (50+ Guests) \| Brihadhee |
| 1 | catering quote Chennai, book caterer Chennai | `/catering-quote-chennai/#enquiry` | Catering Quote in Chennai for 50+ Guests \| Brihadhee |
| 1 | end-to-end catering services Chennai | `/catering-services-chennai/` | Pure Veg Event Catering Chennai (50–1,500) \| Brihadhee |
| 1 | corporate catering Chennai, office catering Chennai | `/corporate-catering-chennai/` | Pure Veg Corporate Catering Chennai \| 1,000+/Day \| Brihadhee |
| 2 | build your own dosa, customise your own dosa Chennai | `/menu/dosa/` | Build Your Own Dosa Anna Nagar \| 5 Batters ₹120+ \| Brihadhee |
| 2 | brihadhee, brihadhee anna nagar (disambiguation) | `/` and `/about/#facts` | Brihadhee Anna Nagar \| Pure Veg Dosa, Nellai Meals (₹35–315) |
| 3 | veg restaurant near temple Anna Nagar, family restaurant Anna Nagar veg, family get-together, birthday and anniversary dinner | `/family-dining-anna-nagar/` | Pure Veg Family Restaurant in Anna Nagar \| Brihadhee |
| 4 | veg lunch, lunch combo, office lunch, executive meals Anna Nagar | `/menu/nellai-meals/` | Nellai Sodhi Meals (₹240) & Veg Lunch Anna Nagar \| Brihadhee |
| 4 | veg dinner Anna Nagar, dinner till 11 PM | `/veg-dinner-anna-nagar/` | Pure Veg Dinner in Anna Nagar Till 11 PM \| Brihadhee |
| 4 | paanai parotta, veg kothu parotta Anna Nagar | `/parotta-anna-nagar/` | Vegetarian Parotta in Anna Nagar, Chennai \| Brihadhee |
| 4 | idiyappam Anna Nagar | `/menu/#idiyappam` | Brihadhee Menu & Prices (2026) \| 80 Pure Veg Dishes ₹35–315 |

`scripts/aeo-verify.mjs` checks that no other page's title or H1 contains every word of these keywords, that
no two pages share an H1 or reuse half of their opening wording, and that each primary page has links from at
least 3 other pages. All pass.

## 5. Changes in this pass

- `config/seo-gates.ts`: `ENABLE_NO_ONION_NO_GARLIC_CLUSTER` and `ENABLE_JAIN_FRIENDLY_CLAIMS` off (kitchen Q11–Q14).
- `src/components/About.astro`, `src/pages/about.astro`, `src/pages/menu.astro`, `src/data/pages.js` (seasonal):
  dietary mentions follow the flags. `src/data/spokes.js`: the dietary page builds only as a noindex draft in preview.
- `drafts/no-onion-no-garlic-anna-nagar.md` (new): tiered draft with `[CLIENT_CONFIRM_REQUIRED]` placeholders and
  pre-mapped Q&As, outside the router.
- `src/data/spokes.js`: small-function cost answer lists the client's pricing factors; "small parties" in the intro;
  quote page intro pairs Brihadhee with catering; family page names 3rd Avenue and Tower Park and group seating.
- `src/data/pages.js`: dinner page answers "Which pure veg restaurant in Anna Nagar is open for dinner until 11 PM?"
  and "What should I order for dinner at Brihadhee?".
- `src/pages/book-a-table.astro`, `src/pages/[slug].astro`: openings pair Brihadhee with restaurant or catering.
- `src/data/faq-ta.js` + `src/components/TamilSummary.astro` (new): Tamil summary on `/about/` and `/faq/`.
- `src/lib/llms.js`: catering key fact (from 50 guests, end-to-end, 1,000+ daily, quoted per event, no fixed rate).
- From the competitor pass: `src/components/About.astro` (name story on `/`), `src/data/spokes.js` (family page
  landmarks), `src/data/parotta.js` and `src/pages/index.astro` ("pot parotta, dum style" instead of "claypot").
- `docs/seo/avoid-terms.txt`: client bans not already covered. `scripts/seo-verify.mjs`: client rules (exit 2),
  runs `scripts/aeo-verify.mjs` (new). `seo-sprint-tasks.json`: P6 tasks. `CLAUDE.md`: client rules section.
- `docs/seo/workflow/owner-questions.md`: section H.

## 6. Already in place (verified, not changed)

Quote form fields (event type, occasion, guests, lunch or dinner, spend, must-have dishes, serving staff; posts
to `/api/lead`, WhatsApp form gate off, direct call and WhatsApp to +91 94442 24999); minimum-order answer (50
guests); corporate 1,000+ meals; Tamil and Tanglish Q&As on six pages; robots.txt allows search and AI crawlers;
Restaurant, Organization, WebSite, BreadcrumbList, Menu and Service schema with no rating markup.

## 7. Technical and local checks

Production (`node scripts/audit-repo.mjs --live`, 24 Nov): still the older deploy. New pages return 404,
`/about/` still shows the catering phone row (fixed in the repo), the apex redirect is a 307, slashless URLs
return 200, and GA4 is not loading. All are fixed by deploying plus the dashboard steps in
`docs/deploy-checklist.md`.

Mobile check at 375 px (built site, `astro preview`): no horizontal scroll on `/offers/`, `/photos/`, `/menu/`,
`/about/`, `/small-function-catering-chennai/`; the mobile bar shows Call, Menu & prices, Reserve table on dining
pages and Call catering, WhatsApp quote, Function quote (+91 94442 24999) on catering pages.

## 8. Google Business Profile (screenshots, 23–24 Nov)

Matches the site: categories South Indian restaurant (primary), Caterer, Vegetarian restaurant; description
"pure vegetarian … near Anna Nagar Tower Park … lunch and dinner daily from 11 AM"; services Build-your-own dosa,
Vegetarian lunch and dinner, Group dining and table reservations; edits pending Google's review. Not visible in
the screenshots: the hours (owner question P1 says the profile shows Sunday closed) and the phone number (should
be +91 73587 14113).

## 9. Diff review

An independent review of the whole sprint diff (25 Nov) found 11 items. Fixed:

- **Meta Pixel:** booking-page links had started sending Meta "Schedule" on every click. Meta again gets its original
  event names (Schedule only for partner bookings). GA4 names calls and WhatsApp clicks by the number dialled
  (`<body data-tel-*>`; the catering number only on catering pages), so the restaurant number in a catering page's
  footer counts as dine-in and the careers number stays `click_call`. Checked in the browser with a test GA4 ID:
  `click_call_catering`, `click_call_dinein`, `click_whatsapp_catering`, `click_whatsapp`, `click_book_table`
  (channels reserve-table, book-a-table, partner), `click_call` and `view_offers_hub` all fire as intended.
- **vercel.json:** the two slashless legacy redirects were dead under `"trailingSlash": true` (that rule runs first,
  so they became 308→301 chains and would fail `check:live`); removed. The slash versions still 301.
- **Gates:** `seo-verify` now catches "no onions", "onion-free", "satvic", "Jains", "Marwaris", "(30+ Guests)",
  "40 to 1,500 guests", "10-person", "Rs. 250 per plate", "₹250 per head", checks GA4 names in the built bundle, and
  compares sitemap dates with the local (IST) date. `aeo-verify` now checks every ₹ figure in titles and
  descriptions against the menu and flags "Anna Nagar East in Anna Nagar East".
- **Stop hook:** runs from the repo root whatever folder the session starts in, and runs the full `npm run build`
  (the build Vercel runs) before `seo-verify --strict`. The one-pass `stop_hook_active` guard stays by design.
- **Copy:** `/menu/dosa/` title and description now compute counts and prices from the menu ("6 podis" was 4 podis
  plus 2 toppings; now "6 toppings"); "Anna Nagar East in Anna Nagar East" removed in three places (one pre-existing
  in the Nellai guide); `/photos/` intro no longer claims captions link; the Karaikudi guide table has a header and
  no longer calls Nellai dishes lunch-only; the mobile bar's accessible name starts with its visible label
  (WCAG 2.5.3); 15 pages changed in this pass carry lastmod 2026-11-25.

Not changed: the home title's "(₹35–315)" and "Up to 40% off" in two titles are the Phase 3 tags you approved (the
Monday-to-Thursday partner terms are in the descriptions and on `/offers/`). `src/components/LocationMap.astro`
(imported by `/about/`) and the new client logo were untracked; they are included in the commit.

## 10. Verification

Run on 25 Nov 2026 after the last change:

```
npm run build                          exit 0  (check:functions, guardrails, check:facts, schema 157 nodes / 25 pages,
                                                schema-visible, AEO lint 25 pages, check:seo 21 in sitemap, compliance
                                                with 6 gated-claim rules active, links 2,309, link matrix)
node scripts/seo-verify.mjs --strict   exit 0  (14 checks incl. client-keyword-rules and aeo-priority)
node scripts/aeo-verify.mjs            exit 0  (21 indexable pages, 10 priority answers, 12 priority keywords)
npm run typecheck                      exit 0
npm test                               43 pass, 0 fail
```

Negative test: injecting "kesari", "Jain", "30 guests" and a ₹ per-plate rate into a built catering page made
`seo-verify` report all four and exit 2. `SEO_GATES_PREVIEW=1` builds the dietary page as a noindex draft with a
"Not published" banner, absent from the sitemap and `llms.txt`; the normal build has no such route.

`check:seo` still warns that 6 titles (`/`, `/menu/`, `/about/`, `/book-a-table/`, `/offers/`, `/photos/`) do not
end in " | Brihadhee"; they are the brand-first titles approved in Phase 3.

## 11. After deploy

Follow `docs/deploy-checklist.md`, then in Search Console request indexing once each for the pages whose
answers changed in this pass: `/small-function-catering-chennai/`, `/veg-dinner-anna-nagar/`,
`/family-dining-anna-nagar/`, `/catering-quote-chennai/`, `/about/`, `/faq/`. Compare like-for-like
28-day periods with `node scripts/gsc-segment.mjs <new-export> <older-export>`; no ranking is guaranteed.
