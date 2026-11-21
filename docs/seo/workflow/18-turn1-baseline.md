# 18 Turn 1: read-only baseline, diagnosis and plan (21 Nov 2026)

> **Status (21 Nov, same day):** batch 2 (items 2.1, 2.2, 2.3, 2.5) and batch 4 were approved and implemented on branch `seo-aeo-geo`; see [`19-batch-2-4.md`](19-batch-2-4.md). Item 2.4 was withdrawn: the "repeated" MenuItem `@id`s are the same dishes shown on `/menu/` and on `/parotta-anna-nagar/`, which is correct reuse of one entity across pages, not a duplicate within a page. Items 3 (dosa name, owner G1), 6 (Content-Signal, optional) and the dashboard items 0.1 and 0.2 (owner G4, G5) are still open. The baseline files and tools listed at the end live outside the repo, in `seo-turn1-2026-11-21/` next to the clone.

**Date:** Saturday 21 November 2026, IST. **Repo:** `Zecadd/Brihadhee_new` @ `main` `b7fa440` (clean tree; nothing edited). **Live:** https://www.brihadhee.com
**Method:** fresh `npm ci` and `astro build` to get `dist/` (gitignored). Live HTML matches `dist/` with 0 differing lines on 6 sampled pages once asset hashes are stripped, so the `dist/` results stand for live. Curl was used for HTTP checks. The built-in browser was used for Google Maps and Instagram. Listing pages were captured as raw HTML on 21 Nov.
**Labels:** [Verified: source] = observed today or recorded owner decision. [Assumption] = my inference.

**Inputs I could not get**
- `keyword.md`: the path in the brief was left as `<REPLACE_WITH_RELATIVE_PATH>`, and no such file is in the repo. `.gitignore` excludes `Key.md`, and the repo cites it as `keyword (1).md`. Section 4 questions came from `docs/seo/keyword-tracker.csv` (column `section` = "Brief 4.x"). Section 7 came from the repo mirrors (`docs/seo/avoid-terms.txt`, `RETIRED_TERMS` in `src/data/entity-truth.ts`, and the 35 "section 7 rules" in `scripts/verify-seo-compliance.ts`). Section 8 came from the Q-numbers in `docs/seo/workflow/owner-questions.md`. **Sections 2, 5.4 and 6 were not reviewed directly.** Send the file path to close this.
- **GSC:** not connected. There is no GSC MCP, and the claude-seo Google runtime isn't set up (`/seo setup` was not run, because nobody asked). The only data is a 7-day export in the repo (`docs/seo/workflow/evidence/gsc/2026-11-12_to_2026-11-15/`).
- **Answer engines:** none auto-run. I have no confirmed Chennai-localised access to Google AI Overview / AI Mode, and no ChatGPT, Perplexity or Gemini connection. The panel CSV is blank and ready for manual runs.

---

## 0) Karthigai Deepam fast-track: `/seasonal/karthigai-ayyappa-pure-veg/`

| Check | Result | Evidence |
|---|---|---|
| HTTP | **200** (https www, with and without trailing slash). http → 308 → https. Apex → 307 → www | curl 21 Nov |
| Indexability | `index, follow, max-image-preview:large`; no `X-Robots-Tag` | live headers + HTML |
| Canonical | self, `https://www.brihadhee.com/seasonal/karthigai-ayyappa-pure-veg/` | live HTML |
| Sitemap | listed in `sitemap.xml` (via `sitemap-index.xml`), lastmod 2026-11-15, priority 0.7 | live sitemap |
| Internal links | linked from all 20 other built pages | `dist/` grep |
| Facts vs 15 Nov | 100% pure veg ✓ · daily 11 AM to 11 PM, lunch and dinner ✓ · dining phone +91 73587 14113 ✓ · catering 50 to 1,500 ✓ · prices match `menu.json` (Ulundhu Kali ₹100, TN meals ₹150 to ₹205) ✓ | `dist/` + `menu.json` |
| Gated claims | 0 Jain / satvik / "no onion" / "garlic-free" / fasting-menu claims. The factual negative disclaimer is present: "Some dishes contain onion or garlic", listing Onion Podi Uthappam, Tossed Podi Idli (Garlic…), garlic naan and roti, garlic podi, small onion. **Exempt from greps.** | `dist/` grep |
| JSON-LD | Restaurant, WebPage, BreadcrumbList, WebSite | `dist/` |

**Status: GREEN on everything checkable from the repo and the live site. No new claims are needed.**
**Open, needs GSC access today:** run URL Inspection → *Request indexing* for this URL and screenshot "URL is on Google". Indexing status can't be verified without GSC.
**Open owner item (not blocking):** Q28/R4, "keep the seasonal page live?". It's live and unchanged.

---

## 1) Conflicts for the owner

Source order applied: (1) Verified facts `/about/#facts` + `llms.txt` (confirmed 15 Nov) → (2) keyword plan → (3) everything else.

| # | Conflict | Sources | Recommendation (owner decides) |
|---|---|---|---|
| C1 | **Dosa name.** "Customized Dosa" is used in the homepage H2 ("Customized Dosa, Your Way"), the nav/footer (4× on every page) and Restaurant `knownFor`. "Build Your Own Dosa" is used in the `/menu/dosa/` title and H1, 20× on that page, the menu JSON-LD, the catering live-counter names, the `llms.txt` summary and the canonical definition. "customised" (British spelling) appears only in unrelated copy ("customised for your event") | Owner direction 13 Nov: pillar = "Customized Dosa" (`entity-truth.ts` comment). `llms.txt` (tier 1) leads with "Build Your Own Dosa". The tracker has both as P1 (AI-150, AI-151) | **Canonical: "Build Your Own Dosa"**; synonym "Customized Dosa" stated in every definition: "Build Your Own Dosa (also called Customized Dosa) at Brihadhee lets guests choose…". Why: it names the mechanic (guests choose batter and ingredients, the kitchen cooks), it matches the only dated AI win (Google AIO recommended Brihadhee for "where can I build my own dosa in Chennai", 12 Nov), and it already sits on the dosa page's title/H1/URL, which stay untouched. Reverses the 13 Nov homepage/nav label, so it needs a yes. If the owner keeps "Customized Dosa", invert it: nav and homepage stay, and the dosa page adds "(Customized Dosa)" to its lead sentence and schema `alternateName` |
| C2 | **"Idly & Mini Idly"** menu category (nav on every page, `/menu/`, menu JSON-LD `MenuSection`, `menu.json`, `llms-full.txt`), plus "Ghee Mini Sambar Idly (14 pcs)" and "Gun Powder Idly: crispy mini idlis" | Menu PDF of 11 Nov (owner) vs the plan's Section 7 note "no mini idli/tiffin unless served at lunch/dinner" (per brief) | Confirm that idly and mini idly are served during 11 AM to 11 PM. If yes: keep (they're dishes, not breakfast/tiffin framing). If no: remove the dishes. "Does Brihadhee serve breakfast?" is already answered plainly at `/faq/#faq-meal-times`: "No. Brihadhee serves lunch and dinner only…" (15 words) |
| C3 | **Tamil name spelling.** GBP shows **ப்ரிஹதீ**; the site, schema and llms show **பிரிஹதீ** | Site: `entity-truth.ts` nameTamil, verified 5 Nov (Ho.md). GBP observed 21 Nov | Pick one. Align GBP to the site, or vice versa, and list the other as a variant on `/about/` (which already lists பிரிஹாதீ) |
| C4 | **Listing call number (D8, open since 17 Nov).** Zomato, Swiggy Dineout and District show the catering number +91 94442 24999 as the call number. EazyDiner shows its own 786 100 4444 | Owner direction 12 Nov: 73587 14113 site-wide; 94442 24999 on catering pages only. GBP and Instagram already show 73587 14113 | Confirm that every listing shows 73587 14113 for the restaurant and 94442 24999 only as a catering line |
| C5 | **Parking.** Swiggy says "Parking available"; EazyDiner says "No, a parking facility is not available" | Q27 open; the site says "call" | Answer Q27; then fix both listings |
| C6 | **Delivery.** Zomato says "Home delivery, Takeaway available"; Justdial says "Home Delivery"; Instagram said "available on Swiggy & Zomato" (17 Nov). The site says delivery isn't confirmed | Q25 open | Answer Q25 |
| C7 | **Cost for two.** Swiggy ₹800; Zomato, District and EazyDiner ₹200 | `costForTwo` unverified | Confirm, or leave it unpublished |

**Settled, no conflict:**
- **Catering "pure veg" (issue 3):** the owner approved it 15 Nov (Q20 → `IS_CATERING_PURE_VEG = true`, client-confirmations §L, shown on `/about/#facts`). The plan's hold was waiting on exactly that answer. [Verified]
- **Phones (issue 4)** on the site: dining number on all 22 pages and in JSON-LD; catering number only on the 5 catering pages, one labelled line on `/about/`, and the llms files. No other number appears anywhere (95661 35405 is gone). [Verified: `dist/` scan]

**Open Section 8 items still blocking work** (unchanged, from `owner-questions.md`): Q11 to Q14, Q16 and Q34 (onion/garlic, Jain, satvik: **gated, nothing published**) · Q25 delivery · Q26 Beyond Curry (hidden) · Q27 parking · Q28 seasonal page · Q31 serving staff · Q32 booking lead time · Q36 Google rating (GBP shows 4.2 from 871 reviews on 21 Nov. Not publishable without Q36 and a dated screenshot) · Q22 "premium" · Q29 2,000 guests.

**Tracker drift (docs only):** AI-144 "What is Beyond Curry…" is marked ANSWERED but is hidden by `ENABLE_SUB_BRAND=false`. AI-248 (serving staff) is answered from the verified `eventService` fact while Q31 is still open.

---

## 2) Baseline

### 2a. Technical (`/claude-seo:seo-technical`)

| Check | Result | Status |
|---|---|---|
| robots.txt | 200; `User-agent: * Allow: /` plus explicit Googlebot, Bingbot, GPTBot, OAI-SearchBot, ChatGPT-User, PerplexityBot, Perplexity-User, ClaudeBot, Claude-SearchBot, Claude-User, Google-Extended; `Sitemap:` line. No `Content-Signal` | ✓ |
| `http://www` → `https://www` | **308** (permanent), 1 hop | ✓ |
| `https://brihadhee.com/*` → www | **307 Temporary.** It comes from Vercel's domain-level redirect (`Server: Vercel`), which overrides the 301 rule in `vercel.json` | ✗ dashboard fix |
| `http://brihadhee.com/` | 308 → https apex → 307 → www (2 hops, last one temporary) | ✗ same fix |
| `/nellai-meals-south-indian-veg-anna-nagar/` | 301 → `/menu/nellai-meals/` (from http: 308 then 301) | ✓ |
| `/best-dosa-parotta-anna-nagar/` | 301 → `/menu/dosa/` | ✓ |
| `/about/`, `/book-a-table/` | **200, self-canonical, in sitemap. They are current pages, not legacy routes.** Live content has 0 hits for "6:30", "Mini Tiffin", "breakfast"; dining phone only. The old copy you saw is Google's **stale index**, so the fix is recrawl. A 301 would delete two live ranking pages (`/about/` had 19 impressions at position 11) | ✓ (recrawl needed) |
| Other deleted routes in git history | only the two slugs above, both 301'd | ✓ |
| Slashless (`/about`, `/menu`) and `/index.html` | 200, canonical → slash URL | ✓ acceptable |
| `brihadhee.vercel.app`, `zecadd.github.io/Brihadhee_new/` | 404 (not indexable) | ✓ |
| Static HTML | 0 `<astro-island>`, 0 client `fetch()`. Menu and every FAQ answer are server-rendered (FAQ in `<details>`, Tamil `lang="ta"`, Tanglish `lang="ta-Latn"`) | ✓ |
| JSON-LD | **Present on all 22 pages** (the brief said "not confirmed"). One `Restaurant` `@id` (`/#restaurant`) reused on all 22. Has: name, address, geo, **hasMap = exact GBP URL**, telephone (dining), openingHoursSpecification (Mon to Sun 11:00 to 23:00), servesCuisine, hasMenu, acceptsReservations, sameAs (Instagram, Maps, Zomato, Swiggy Dineout, EazyDiner, District), founder, amenityFeature. Catering `Service` (`/#catering`, areaServed Chennai). `Menu` with 110 `MenuItem`s, all `suitableForDiet: VegetarianDiet` | ✓ |
| JSON-LD gaps vs your spec | **No `priceRange`.** It's omitted on purpose; `schema.js:87` says "₹₹" isn't visible on any page. **No `areaServed` on Restaurant** (it's on Service). **FAQPage off** (`EMIT_FAQPAGE=false`, 16 Nov). (A first read flagged 7 repeated MenuItem `@id`s; that was cross-page reuse of the same dish entities, which is correct.) | ◐ |
| Existing build gates | `npm run check` passes: facts (11 pending facts guarded), schema-visible (100 nodes, NAP and hours visible, no rating markup), AEO lint, check:seo (18 in sitemap), compliance (35 §7 rules, 7 gated-claim rules), links (1,930 internal). `npm test` 21/21 | ✓ |

### 2b. Sitemap (`/claude-seo:seo-sitemap`)
`sitemap-index.xml` → `sitemap.xml`: **18 URLs = the 18 indexable pages in `dist/`.** Trailing slash on 18/18; canonical = `<loc>` on 18/18; 0 redirected or legacy URLs; noindex pages (`/privacy/`, `/reserve-table/`, `/reserve-table/tables/`, `/404`) correctly excluded; lastmod present. **No P1 URL missing.** Note: "Coffee Bar" is a homepage section (`/#coffee-bar`), not a page.

### 2c. On-page snapshot (`/claude-seo:seo`), drift guard
Full snapshot in `baseline/onpage.json` (title, meta, canonical, robots, H1, H2 per URL). All titles are 50 to 60 characters, all metas 136 to 154, one H1 per page.

### 2d / 2e / 2f. Per-page scores

| URL | AEO (live, canonry) | GEO citability (heuristic) | Q&A (en+ta) | longest direct answer | Title chars | Meta chars |
|---|---|---|---|---|---|---|
| `/` | 86 | 43.1 | 8+2 | 27 words | 56 | 151 |
| `/menu/` | 84 | 39.8 | 4+2 | 29 words | 53 | 146 |
| `/menu/dosa/` | 85 | 39.9 | 6+3 | 30 words | 54 | 147 |
| `/catering-services-chennai/` | 85 | 36.5 | 9+0 | 29 words | 56 | 145 |
| `/small-function-catering-chennai/` | 86 | 34.6 | 7+2 | 21 words | 58 | 140 |
| `/corporate-catering-chennai/` | 84 | 33.5 | 12+2 | 30 words | 50 | 154 |
| `/parotta-anna-nagar/` | 82 | 42.9 | 6+0 | 20 words | 52 | 154 |
| `/menu/nellai-meals/` | 84 | 45.6 | 4+3 | 22 words | 50 | 144 |
| `/veg-dinner-anna-nagar/` | 82 | 42.6 | 2+0 | 16 words | 53 | 148 |
| `/family-dining-anna-nagar/` | 81 | 42.4 | 3+0 | 30 words | 52 | 143 |
| `/about/` | 83 | 51.9 | 6+0 | 19 words | 54 | 151 |
| `/book-a-table/` | 84 | 48.2 | 3+0 | 22 words | 57 | 137 |
| `/catering-quote-chennai/` | 85 | 37.6 | 5+0 | 21 words | 52 | 146 |
| `/event-planner-catering-partner/` | 83 | 38.0 | 4+0 | 29 words | 58 | 137 |
| `/faq/` | 84 | 48.3 | 7+0 | 27 words | 51 | 149 |
| `/whats-new/` | 82 | 28.7 | 1+0 | 32 words | 52 | 148 |
| `/seasonal/karthigai-ayyappa-pure-veg/` | 81 | 39.0 | 3+0 | 23 words | 59 | 136 |
| `/guides/what-are-nellai-meals/` | 84 | 58.4 | 0+0 | n/a (sections, not Q&A) | 60 | 142 |

- **AEO** (`/anthropic-skills:aeo`, `npx @canonry/aeo-audit@7 --sitemap --include-geo`): aggregate **84/100**, coverage full (18/18), **0 critical defects**. The weakest factors are sitewide: content-extractability 53 (content-to-markup ratio about 10%) and E-E-A-T 55. Its "add HowTo" and "add FAQPage for rich results" fixes are **rejected**: HowTo is deprecated, and FAQ rich results were retired 7 May 2026. The `dist/` run including noindex pages scores 80. Files: `baseline/aeo-live.json`, `baseline/aeo-dist.json`.
- **GEO** (`/geo` `citability_scorer.py`, run on `dist/` through `tools/geo_dist.py` because local Python TLS failed against live; the HTML is identical): average **41.7**. The scorer rewards self-contained passages of 134 to 167 words; most site blocks are short Q&As, so catering pages score lowest. Use it for **relative** regression only. File: `baseline/geo-citability-dist.json`.
- **Direct answers:** all 104 Q&As have a first sentence ≤ 32 words (0 over 50). The repo enforces one Q&A per route.

### 2g. llms.txt / llms-full.txt (`/geo-llmstxt`)
- The canonical answers in `llms.txt` match Verified facts exactly (hours, both phones, full address, pure veg, catering 50 to 1,500 + 1,000+ corporate meals, 15 Nov date). `menu.json` and `llms-full.txt` match the HTML (`check:facts`, `aeo-lint` "rendered business facts are consistent").
- **Drift 1:** naming (C1). `llms.txt` has "Build Your Own Dosa" 4× and "Customized Dosa" 1×; the homepage leads with "Customized Dosa".
- **Omission:** `llms.txt` has **no Brihadeeswarar disambiguation**. `llms-full.txt` has it 3×, and so do `/faq/` and `/about/`.
- `llms-full.txt` carries "Idly & Mini Idly" (C2) and the R2 "best dosa" Q&A (owner R2 open).

### 2h. Local (`/claude-seo:seo-local`): on-site NAP and 7 listings (captured 21 Nov)
On-site NAP, schema and hours: consistent across 22 pages (aeo-lint "NAP identical everywhere"). Off-site:

| Platform | Hours | Meal periods | Veg status | Dosa wording | Phone | Website | Other |
|---|---|---|---|---|---|---|---|
| **Google (GBP)** | "Closes 11 PM" ✓ (full week not visible in limited view) | not visible | category "South Indian restaurant" only | – | **073587 14113 ✓** | **https://www.brihadhee.com/ ✓** | Tamil name ப்ரிஹதீ (C3); address "W-41 (Old No. W-124, 3rd Ave, W Block, Anna Nagar…" (no "East", unclosed bracket); 4.2 / 871 reviews; review topic chip **"mini tiffin" (11)** |
| **Instagram** | – | – | "Pure Veg South Indian" ✓ | **no "500 kinds" in bio** (captions not visible) | **bio ☎️ 7358714113 ✓** ("Book your tabel" typo) | ✗ g.co/kgs short link | from page meta description |
| **Zomato** | 11am to 11pm ✓ | ✗ "Breakfast", "Brunch" | "Vegetarian only" ✓ | – | ✗ +91 94442 24999 | ✗ none | `isClaimed: true`; "Home delivery" |
| **Swiggy Dineout** | 11AM to 11PM ✓ | – | "Pure veg" ✓ | – | ✗ 9444224999 | ✗ none | ✗ address "Plot No.41, 3Road Avenue…"; "Parking available"; ₹800 for two |
| **EazyDiner** | ✗ **06:30 AM** to 11 PM | – | ✗ **"serves both veg and non veg food"** (FAQ + FAQPage JSON-LD) | – | ✗ 786 100 4444 (EazyDiner's own) | ✗ none | ✗ garbled address |
| **District** | 11 AM to 11 PM ✓ | – | ✗ no veg tag | – | ✗ +91 94442 24999 | ✗ none | – |
| **Justdial** | 11 to 11 ✓ | Dining Options Lunch, Dinner ✓; ✗ body text "breakfast, lunch, and dinner" | ✗ **"Veg Options Available"** (+ "Vegan Options") | – | not visible | ✗ "+ Add Website" | ✗ **unclaimed** ("Verify and claim", `verified:"0"`); ✗ address "New Now, 41( Old Now 124" |

**Every wrong value seen on 17 Nov is still live on 21 Nov.** None of the 5 aggregators links to brihadhee.com. Raw text is in `baseline/listings/`.

### 2i. AI answer panel (20 prompts) and CSV
File: `ai-panel-2026-11-21.csv`. It has 300 rows (20 prompts × 5 engines × 3 runs), **all result cells blank**. Your required columns are included; I added `tracker_id`, `language`, `run_date`, `search_location` and `evidence`, because CLAUDE.md forbids a mentioned/cited value without evidence. Engines: Google AI Overview, Google AI Mode, Gemini, ChatGPT search, Perplexity. Run from a Chennai location (record it) in a logged-out or incognito session. Score each core fact as correct / wrong / missing.

| ID | Type | Tracker | Prompt |
|---|---|---|---|
| A1 | A | AI-102 | What are Brihadhee's timings? |
| A2 | A | AI-103 | Does Brihadhee serve breakfast? |
| A3 | A | AI-101 | Is Brihadhee pure veg? |
| A4 | A | AI-065 | Where is Brihadhee located? |
| A5 | A | AI-105 | Can I build my own dosa at Brihadhee? |
| A6 | A | AI-193 | What is the minimum catering order at Brihadhee? |
| A7 | A | AI-147 | How many people can Brihadhee cater for? |
| A8 | A | 9 Nov AI Mode run | Tell me about Brihadhee restaurant in Anna Nagar Chennai. Is it worth visiting? |
| B1 | B | AI-150 | What is a build-your-own dosa? |
| B2 | B | AI-060 | What are Nellai meals? |
| B3 | B | AI-158 | What is paanai parotta? |
| B4 | B | AI-122 | What is end-to-end catering? |
| C1 | C | AI-058 | Where can I build my own dosa in Chennai? |
| C2 | C | AI-113 | Where can I get Nellai (Tirunelveli-style) meals in Chennai? |
| C3 | C | AI-115 | Which pure veg restaurants in Anna Nagar are open for dinner till 11 pm? |
| C4 | C | AI-110 | Where to eat authentic Tamil meals in Anna Nagar? |
| C5 | C | AI-243 | Who does small function catering in Anna Nagar? |
| C6 | C | AI-244 | Which Chennai caterers take orders for 50 people? |
| C7 | C | AI-125 (Tanglish) | Anna Nagar la dosa customise panna mudiyuma? |
| C8 | C | AI-186 (Tamil) | அண்ணா நகரில் நெல்லை மீல்ஸ் எங்கு கிடைக்கும்? |

Prior dated evidence (not re-run): 12 Nov, Google AIO recommended Brihadhee for C1, citing Instagram and showing an old phone number. 9 Nov, AI Mode cited brihadhee.com for A8 but said "closed on Sundays" (wrong) [Verified: `R_AEO.md`].

### 2j. GSC status and PROTECTED LIST
GSC is **not connected**. From the 7-day export in the repo (folder `2026-11-12_to_2026-11-15`) using your thresholds (≥1 click, or ≥50 impressions at average position ≤20):

| Protected page | Clicks | Impr. | Avg pos |
|---|---|---|---|
| https://www.brihadhee.com/ | 31 | 1,528 | 13.62 |
| https://www.brihadhee.com/menu/ | 1 | 99 | 4.18 |
| http://www.brihadhee.com/ (legacy variant holding equity: keep the 308) | 1 | 34 | 6.15 |

| Protected query | Clicks | Impr. | Avg pos |
|---|---|---|---|
| brihadhee | 22 | 254 | 1.48 |
| brihadee | 1 | 27 | 1.19 |
| veg restaurant anna nagar | 1 | 16 | 17.44 |
| brihadee anna nagar | 1 | 8 | 2.62 |
| veg restaurants in anna nagar for lunch | 1 | 6 | 14.33 |
| brihadee restaurant anna nagar | 1 | 2 | 1.0 |
| bradhi | 1 | 1 | 2.0 |
| veg restaurants in anna nagar | 0 | 88 | 17.69 |
| brihadhee menu | 0 | 78 | 3.28 |

**Protected by default until you send a 90-day / 16-month export:** every current title, H1 and slug on all 18 sitemap URLs, plus the legacy `/nellai-meals-south-indian-veg-anna-nagar/` (3 impressions, position 5) and its 301.

---

## 3) Ranked root causes (`/anthropic-skills:seo-geo-aeo` synthesis)

Weighting follows the brief: crawlable HTML, redirects/canonicals, JSON-LD and listings rank above llms.txt.

| Rank | Cause | Questions affected | Evidence |
|---|---|---|---|
| 1 | **Off-site listings contradict verified facts, and none of the aggregators links back.** EazyDiner says "veg and non veg" and opens 06:30 AM (also in its own FAQPage JSON-LD). The catering number is the call number on Zomato, Swiggy and District. Zomato tags Breakfast and Brunch. Justdial says "Veg Options Available" and "breakfast", and is unclaimed. Swiggy's address is garbled | A1, A2, A3, phone; C mention rate | 21 Nov captures. Unchanged since 17 Nov |
| 2 | **Google's index holds pre-11 Nov copies of current URLs** (`/`, `/about/`, `/book-a-table/`) **and the `http://` variant.** Live pages are clean and redirects are in place, but with no GSC access nobody can request a recrawl or see Google's chosen canonical (D4 open since 17 Nov) | A1, A2, phone | GSC export (http://www home: 34 impressions); live pages 0 legacy strings |
| 3 | **Apex redirect is 307 (temporary)**, set at Vercel's domain level; `vercel.json`'s 301 never fires | consolidation of brand signals | curl 21 Nov, `Server: Vercel` |
| 4 | **Dosa entity split** between "Customized Dosa" (homepage, nav, knownFor) and "Build Your Own Dosa" (dosa page, menu schema, llms, catering counters). Engines may not connect the two; the 12 Nov AIO win cited Instagram, not the site | A5, B1, C1, C7 | `dist/` counts |
| 5 | **GBP entity details:** Tamil spelling differs from the site; address lacks "East"; a single category; the "mini tiffin" review chip (11 reviews) keeps the retired service in Google's review summary | A1, A2, entity | Maps 21 Nov |
| 6 | **No direct "minimum is 50 guests" answer on the canonical catering page.** `/small-function-catering-chennai/` asks "Does Brihadhee cater for 50 guests? Yes…" (id still says `minimum-guest-count`). Only the homepage answer says "minimum of 50" | A6, C6 | `qa.json` |
| 7 | **Gated facts are answered inconsistently by listings** (parking yes/no, delivery, cost for two), so engines fill the gap from listings | type A long tail | C5 to C7 |
| 8 | **Machine-readable gaps vs spec:** no FAQPage, no Restaurant priceRange or areaServed; llms.txt lacks the temple disambiguation | low (no rich results; LLM parsing only) | `dist/` JSON-LD, llms.txt |

**Ruled out (verified OK):** client-only rendering; canonical vs sitemap mismatch; robots blocking; fact drift between HTML, JSON-LD, `menu.json` and llms; legacy strings in the build; missing Brihadeeswarar disambiguation on pages (`/faq/` Q&A, `/about/` name story and spelling variants are present).

---

## 4) Implementation plan: AWAITING YOUR APPROVAL

Rules applied: additive edits only; no slug, title or H1 changes on protected URLs; one page group per batch; ≥14 days of GSC data between batches; I never push, merge or deploy (CLAUDE.md). Work goes on branch `seo-aeo-geo`, with a hand-off in `docs/seo/workflow/18-*.md`.

| # | Change | URL / file | Skill | Questions | Type | Protected status | Risk | Rollback |
|---|---|---|---|---|---|---|---|---|
| **0.1** | **Today:** GSC URL Inspection → Request indexing: Karthigai URL first, then `/`, `/about/`, `/book-a-table/`, `/menu/`, `/menu/dosa/`, `/faq/`. Inspect `http://www.brihadhee.com/` and `/nellai-meals-south-indian-veg-anna-nagar/` to confirm Google sees the redirects | GSC (owner/dev) | seo-technical | A1, A2, phone | A | n/a | none | n/a |
| **0.2** | Vercel → Project → Settings → Domains → `brihadhee.com` → redirect to `www.brihadhee.com` with **308 Permanent** (now 307) | Vercel dashboard (owner/dev) | seo-technical | all | A | protects `/` | low | switch back |
| **1** | Listing corrections (Phase 4 sheet below) | 7 platforms (owner) | seo-local | A1 to A4, A6; C1 to C6 | A, C | n/a | none | n/a |
| **2.1** | `EMIT_FAQPAGE = true`. FAQPage text = visible text is already enforced by `schema-visible` and `aeo-lint`. Machine readability only; no rich-result promise. **Reverses the 16 Nov choice, so it needs your yes** | `config/seo-gates.ts` | seo-technical, aeo | all Q&As | A, B | none (JSON-LD only) | low | flag back to false |
| **2.2** | Restaurant `priceRange` = the visible dish range ("₹35–₹315"), from the same menu data as the home FAQ "How much do dishes cost", so it can't drift | `src/lib/schema.js` | seo-local | price | A | none | low | remove field |
| **2.3** | Restaurant `areaServed` = City Chennai (matches Service) | `src/lib/schema.js` | seo-local | location | A | none | low | remove field |
| ~~2.4~~ | *Withdrawn: the MenuItem `@id`s are reused across `/menu/` and `/parotta-anna-nagar/` on purpose (one entity per dish). No change.* | – | – | – | – | – | – | – |
| **2.5** | Add one line to the canonical answers: "Brihadhee is a restaurant in Anna Nagar East and is not affiliated with the Brihadeeswarar Temple in Thanjavur." (verified `nameStory`). Flows into `llms.txt` | `src/data/entity-truth.ts` `canonicalAnswerLines()` | geo-llmstxt, geo | entity | A | none | low | revert |
| **3** | **After owner C1.** Dosa naming: the definition sentence (`BYO_DEFINITION`, the single source for llms, home FAQ and dosa page) gains "(also called Customized Dosa)". Homepage H2 → "Build Your Own Dosa (Customized Dosa), Your Way". Nav/footer label → "Build Your Own Dosa". `knownFor` → "Build Your Own Dosa (Customized Dosa)". `/menu/dosa/` title, H1 and slug **unchanged** | `entity-truth.ts`, homepage dosa section, nav data | aeo, geo, geo-llmstxt | A5, B1, C1, C7 | A, B, C | `/` title and H1 untouched (H2 only, additive) | low | revert commit |
| **4** | Catering minimum: reword the small-function Q to "What is the minimum catering order at Brihadhee?" (keeps id `faq-what-is-the-minimum-guest-count-…`). Answer: "Brihadhee's minimum catering order is 50 guests for a single event in Chennai, and it caters events of up to 1,500 guests." (verified `CATERING_MIN_GUESTS`, `EVENT_GUESTS`). The homepage answer links to it | `src/data/catering.js` (small-function Q&A) | aeo | A6, AI-193, AI-244, AI-245 | A, C | page not in GSC export (protected by default: H1/title untouched) | low | revert |
| **5** | Post-deploy live check script: http→https permanent; apex → www permanent (fails until 0.2 is done); legacy slugs 301; every sitemap URL 200 + self-canonical + index; slashless → canonical slash. A `check:live` npm script, **not** part of the build | `scripts/check-live.mjs`, `package.json` | seo-technical, seo-sitemap | acceptance | – | n/a | none | delete |
| **6** | *(optional)* `Content-Signal: search=yes, ai-input=yes, ai-train=yes` in robots.txt. The owner already allowed training crawlers (client-confirmations §E) | `src/pages/robots.txt.js` | geo | – | – | none | low | remove line |
| **7** | Hand-off docs: `18-turn1-baseline.md`; add C1 to C3 to `owner-questions.md`; fix tracker rows AI-144 and AI-248 | `docs/seo/…` | – | – | – | – | none | revert |

**Proposed 301s for legacy URLs: none new.** `/nellai-meals-south-indian-veg-anna-nagar/` → `/menu/nellai-meals/` and `/best-dosa-parotta-anna-nagar/` → `/menu/dosa/` already return 301 live. `/about/` and `/book-a-table/` are current canonical pages; redirecting them would break the change rules and remove ranking URLs.

**Not doing, and why:** HowTo schema (deprecated). FAQ rich-result claims (retired). Slashless 308 rules (canonicals already consolidate, and a global `trailingSlash` would also redirect `/api/lead` and `/api/book-table`). New Person "expertise" schema (founders are already in Restaurant `founder`). Renaming "Idly & Mini Idly" (owner C2). Anything gated.

**Sequence:** 0.1 and 0.2 today → 1 (owner, starts now) → batch 2 (schema-only, sitewide) → ≥14 days → batch 4 → ≥14 days → batch 3 (after C1). Items 5 to 7 ship with batch 2.

### Phase 4 off-site prep (you execute)

**Listing correction sheet**

| Platform | Field | Current (21 Nov) | Correct |
|---|---|---|---|
| EazyDiner | Veg status / FAQ | "serves both veg and non veg food" | 100% pure vegetarian; no meat, egg or fish |
| EazyDiner | Hours | 06:30 AM to 11:00 PM daily | 11:00 AM to 11:00 PM daily (lunch and dinner) |
| EazyDiner | Phone | 786 100 4444 (platform) | +91 73587 14113 |
| EazyDiner | Address | "New no-W, 41( Old no-W 124, 3rd Ave…" | New No. W-41, Old No. W-124, W-Block, 3rd Avenue, Ward 100, Main Road, Anna Nagar East, Chennai 600040 |
| Zomato | Phone | +91 94442 24999 | +91 73587 14113 (94442 24999 as catering only, if a second field exists) |
| Zomato | Highlights | Breakfast, Brunch | remove; keep Lunch, Dinner |
| Swiggy Dineout | Address | "Plot No.41, 3Road Avenue, W Block…" | full address above |
| Swiggy Dineout | Phone | 9444224999 | +91 73587 14113 |
| Swiggy Dineout | Parking | "Parking available" | per owner Q27 |
| District | Phone | +91 94442 24999 | +91 73587 14113 |
| District | Veg tag | none | Pure veg |
| Justdial | Claim | unclaimed | claim and verify the listing |
| Justdial | Veg | "Veg Options Available" | Pure Veg |
| Justdial | Description | "breakfast, lunch, and dinner" | "lunch and dinner, 11 AM to 11 PM" |
| Justdial | Address | "New Now, 41( Old Now 124…" | full address above |
| GBP | Address | "…Anna Nagar, Chennai…" (no East) | "…Anna Nagar East…" |
| GBP | Tamil name | ப்ரிஹதீ | per C3 |
| GBP | Category | South Indian restaurant | add secondary "Vegetarian restaurant" [Assumption: available in GBP for India] |
| Instagram | Bio link | g.co/kgs short link | https://www.brihadhee.com/ |
| Instagram | Bio text | "Book your tabel" | "Book your table" |
| All 5 aggregators | Website | none | https://www.brihadhee.com/ |

Ready-to-send messages per platform are already in `docs/seo/workflow/14-listing-correction-messages.md` (21 Nov). Use those; this sheet updates the values.

**Review request (no incentive, no suggested wording)**
> Thank you for dining at Brihadhee today. If you have a minute, an honest Google review helps us a lot: [GBP review link]. Good or bad, we read every one. Team Brihadhee
> (Tamil, for owner review) இன்று பிரிஹதீயில் உணவருந்தியதற்கு நன்றி. உங்கள் நேர்மையான கருத்தை Google-இல் பகிர்ந்தால் மகிழ்வோம்: [link]

Ask every guest the same way. Don't offer discounts for reviews. Don't suggest what to write.

**Domains cited for type C prompts:** **pending the panel run (not simulated).** Known so far: instagram.com (12 Nov AIO, C1) and brihadhee.com (9 Nov AI Mode, A8). Likely surfaces to check, and how to get listed or corrected: Google Maps/GBP (owner dashboard), Zomato/District (Zomato for Business, "claim/edit"), Swiggy Dineout (partner support), EazyDiner (partner/restaurant support email), Justdial (claim via "Verify and claim"), magicpin (claim listing), Apple Maps (Apple Business Connect: name "Brihadhee Pure Veg Restaurant" → Brihadhee, primary phone fix), Bing Places (import from GBP after GBP fixes), Tripadvisor (claim; no page found 17 Nov). For listicles, see `docs/geo/outreach-targets.md` and `16-geo-pitch-pack.md`.

---

### Files in this folder (outside the repo)
- `TURN1-REPORT.md` (this file) · `ai-panel-2026-11-21.csv`
- `baseline/`: `aeo-live.json`, `aeo-dist.json`, `geo-citability-dist.json`, `onpage.json`, `qa.json`, `facts.json`, `listings/*.txt`
- `tools/`: `facts.mjs` (naming, phones, legacy and §7 terms, islands, Q&A, tracker coverage), `ld.mjs` (JSON-LD inventory), `geo_dist.py` (citability on `dist/`), `urls.txt`. Re-run all three after each batch to compare against this baseline. For AEO: `npx @canonry/aeo-audit@7 compare --baseline baseline/aeo-live.json --current <new>.json`.
