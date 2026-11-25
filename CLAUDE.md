## Brihadhee SEO/AEO/GEO ground rules

Site: brihadhee.com, pure-veg South Indian restaurant and caterer, Anna Nagar East, Chennai. Branch for this work: `seo-aeo-geo`. Never push, merge or deploy. Stack and commands: `docs/seo/workflow/00-stack.md`.

**Tracker statuses** (`docs/seo/keyword-tracker.csv`)
- TARGET and SUPPORTING_VARIANT drive page work.
- TRACK_ONLY is measure-only. No "best" claims.
- OWNER_CONFIRMATION, HOLD and APPROVAL_GATED are never published until the owner approves.
- EXCLUDED is never targeted.
- LOCATION_DEPENDENT needs the search location and time recorded.
- SOURCE_NOTE rows are CSV fragments, not keywords.

**Claims**
- Use only facts already verified on the site or in `docs/`.
- The owner request of 23 November 2026 approves premium/quality positioning, thousands of custom dosa combinations, no-garlic requests and no-onion options where available, including Jain and Marwari dietary enquiries. Kitchen-confirmed dish eligibility, preparation separation and any certification remain unprovided. Use request and confirmation guidance until those details are supplied.
- Gated topics remain Brahmin/Iyer/Iyengar wording, restaurant delivery or takeaway, parking, Hindi/Hinglish copy, 2,000-guest catering, seasonal or fasting menus and the Beyond Curry sub-brand.
- Never write "best", "No.1" or award claims, catering rates (explain what moves the price instead), or invented ratings or reviews.
- No AggregateRating schema without verified, dated platform data.

**Ground truth and 2026 guardrails**
- NAP, hours and prices come only from `src/data/entity-truth.ts` and `src/data/menu-canonical.ts`. Restaurant phone +91 73587 14113 site-wide; catering phone +91 94442 24999 on catering pages only (owner direction 2026-11-12). Open 11 AM to 11 PM; 6:30 AM opening and Mini Tiffin are retired.
- No self-serving Review/AggregateRating schema. FAQPage JSON-LD follows `EMIT_FAQPAGE` in `config/seo-gates.ts` only; change it only with SEO lead or owner approval.
- No Google Indexing API (IndexNow is fine). No doorway clones: no near-duplicate area or keyword pages.
- `node scripts/seo-verify.mjs` (after `npm run build:site`) must pass (exit 2 on any failure; it also runs `scripts/aeo-verify.mjs`); it updates `seo-sprint-tasks.json`.

**Client keyword rules (24 November 2026)**
- Never on public output (enforced from `docs/seo/avoid-terms.txt`): cheap, budget (any use), pocket-friendly, affordable, under ₹100/₹150/₹300, value meal, value combo, 500 varieties, 500+ or 99+ dosa, morning walkers, tiffin, mini tiffin, pongal vada, ghee podi idli, mini idli sambar, poori masala, kuzhi paniyaram, kesari, Karthik Tiffin, "pure Jain", "100% Jain", "strictly Jain", Marwari thali, Rajasthani thali. "Idly & Mini Idly" and "Ghee Podi Dosa" are real menu names and stay.
- Catering pages: never a headcount under 50 ("tiny party", 10/20/30/40 guests), never a rupee per-plate rate in a title, H1 or meta description, never non-veg catering. "Pure veg" catering wording follows `IS_CATERING_PURE_VEG` (Q20, answered 15 Nov 2026).
- Dietary: no-onion, no-garlic, Jain, satvik and Marwari wording stays off live routes until the kitchen confirms Q11–Q14 (`ENABLE_NO_ONION_NO_GARLIC_CLUSTER`, `ENABLE_JAIN_FRIENDLY_CLAIMS`). The 23 November guidance page is kept behind those flags; the tiered draft is `drafts/no-onion-no-garlic-anna-nagar.md` (outside the router, sitemap and llms).
- Priority order: 1 catering from 50 guests and quotes, 2 brand disambiguation and build-your-own dosa, 3 temple-visit and family dining, 4 lunch combos and dinner till 11 PM, 5 Tamil and Tanglish (Hindi waits for Q17). No named temple until Q24.
- One primary URL per keyword: `docs/seo/keyword-tracker.csv` `primary_url`. Always pair "Brihadhee" with restaurant, Anna Nagar, dosa or catering in titles, opening answers, schema descriptions and llms files.

**Data**
- Never fill a Google position, mentioned or cited field without evidence (URL, screenshot path or pasted text). Blank means unverified.

**Hand-off**
- Every step writes to `docs/seo/workflow/NN-name.md`. Anything blocked goes to `docs/seo/workflow/owner-questions.md`.
