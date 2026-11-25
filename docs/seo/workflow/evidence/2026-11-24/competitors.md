# Competitor content gaps by keyword cluster (2026-11-24)

**Read first.** Searches and fetches ran on 2026-11-24 and finished at about 23:20 IST. WebSearch (mode "standard") is a US-based web index, not a Google results page localised to Chennai. No search location, device or language was set, and result order is not a Google ranking. Use these lists as evidence of which page types and content patterns rank for each topic. Never copy them into the position, mentioned or cited fields of `docs/seo/keyword-tracker.csv`.

WebFetch returns a small model's summary of each page after converting it to markdown, which strips scripts. Competitor JSON-LD was therefore not visible on any page: "schema not visible" means it could not be observed, not that it is absent. Prices, capacities and ratings shown by third-party pages are recorded as displayed. They are unverified and not for publishing. brihadhee.com did not appear in any of the 8 result lists (it would have been excluded), and all fetched content was treated as untrusted data.

## Method

- 8 queries, 2 per cluster (listed under each cluster).
- "Top 5 accessible": walk the result list in the order the tool returned it and keep the first 5 pages that WebFetch loaded. For a two-query cluster, interleave the lists (A1, B1, A2, B2 …) and drop duplicates. Pages loaded after the fifth are marked "reserve". Two exceptions:
  - Cluster 1 keeps 5 per query, because the event and corporate queries map to different Brihadhee pages.
  - Cluster 2 reports the brand query separately, because it returned no restaurant pages.
- Fetch failures in this session:
  - swiggy.com returned an empty body for all 8 URLs tried, so its other results were not attempted.
  - wedmegood.com returned HTTP 429 on 5 of 6 requests, so its other profiles were not attempted.
  - HTTP 403: fodors.com, saveur.com, deliveroo.co.uk, doordash.com, weddingbazaar.com, happiffie.com.
  - HTTP 404: issuu.com (2 documents) and hometriangle.com.
  - theculturetrip.com timed out twice.
  - One heyzine.com PDF was not fetched, because downloading a file is outside this brief.
  - Two results redirected to other hosts and were not followed: a wa.me chat link, and a Bengaluru vendor page on mytribe.in.
- Brihadhee baseline: the built HTML in `dist/`, read on 2026-11-24. For each page: words and images in `<main>`, JSON-LD `@type`s, form fields and headings.
- Gap rule (from the brief): competitors cover it, the Brihadhee page lacks it, and it can be filled truthfully. A "fillable" gap cites its verified source. Anything else is marked "needs owner", with the existing `owner-questions.md` ID where there is one.
- Never proposed: "best" or "No.1" claims, catering per-plate rates, ratings or reviews, parking, delivery, the retired meal period, a named temple, Jain, satvik or no-onion claims, and competitor names on the site.

Type codes:

| Code | Meaning |
|---|---|
| OFF | The business's own site |
| AGG | Aggregator, directory, marketplace or booking platform (list or profile) |
| LIST | Listicle, blog or news article |
| DOC | Document host or PDF |
| other | Anything else |

---

## Cluster 1. Catering for 50+ guests, and quotes

Owner pages: `/small-function-catering-chennai/`, `/catering-services-chennai/`, `/corporate-catering-chennai/`, `/catering-quote-chennai/`.

### Query 1A: "vegetarian catering for 50 people Chennai" (17 results)

| # | URL | Type | Fetch |
|---|---|---|---|
| 1 | https://www.wedmegood.com/vendors/chennai/wedding-catering/all/vegetarian/ | AGG list (WedMeGood) | OK on the second try (the first returned 429) |
| 2 | https://www.weddingwire.in/caterers/madharas-global-veg-caterers--e445110 | AGG profile (WeddingWire) | OK |
| 3 | https://www.wedmegood.com/profile/Sri-Raayas-Catering-and-Events-26647177 | AGG profile | 429 twice |
| 4 | https://m.indiamart.com/impcat/catering-services.html | AGG B2B category (IndiaMART) | OK |
| 5 | https://www.wedmegood.com/profile/Pooja-Catering-Services-2367110 | AGG profile | 429 twice |
| 6 | https://www.wedmegood.com/vendors/chennai/wedding-catering/kotturpuram/vegetarian/ | AGG list | not attempted (host rate limit) |
| 7 | https://www.wedmegood.com/profile/Sumathi-Catering-Vanagaram-26770474 | AGG profile | not attempted |
| 8 | https://www.wedmegood.com/profile/Vigneshwaraa-Wedding-Caterers-and-Events-2907853 | AGG profile | not attempted |
| 9 | https://www.wedmegood.com/profile/nalvirundhu-2871979 | AGG profile | not attempted |
| 10 | https://www.wedmegood.com/profile/krishna-catering-1922864 | AGG profile | not attempted |
| 11 | https://www.wedmegood.com/profile/sastha-catering-services-2021524 | AGG profile | not attempted |
| 12 | https://www.weddingwire.in/caterers/chetans-catering--e494092 | AGG profile | OK |
| 13 | https://www.wedmegood.com/profile/Sri-Sabarish-Catering-1594701 | AGG profile | not attempted |
| 14 | https://m.indiamart.com/veg-catering | AGG B2B seller page | OK |
| 15 | https://www.weddingbazaar.com/catering/chennai/s-s-caterings | AGG profile | 403 |
| 16 | https://www.sulekha.com/subhalaali-caterers-chitlapakkam-chennai-contact-address | AGG profile (Sulekha) | OK (reserve) |
| 17 | https://www.weddingbazaar.com/catering/chennai/bakkiyalakshmi-catering-services | AGG profile | not attempted (host returned 403) |

Counts: OFF 0, AGG 17 (WedMeGood 10, WeddingWire 2, WeddingBazaar 2, IndiaMART 2, Sulekha 1), LIST 0.

From the search summary only (pages not loaded, unverified): several WedMeGood profiles state a 50-guest minimum and a veg per-plate starting price, some advertise Jain menus, and two vendors set minimums of 200 and 500 guests.

### Query 1B: "corporate catering Chennai" (17 results)

| # | URL | Type | Fetch |
|---|---|---|---|
| 1 | https://cdnc.heyzine.com/flip-book/pdf/d81d4beb517dec5ec7a2d53390e6e998f03b8ab9.pdf | DOC (PDF flipbook) | not fetched (file download) |
| 2 | https://issuu.com/inemai/docs/best_catering_service_in_chennai | DOC | 404 |
| 3 | https://www.scribd.com/presentation/520466073/Chennai-Catering-PPT | DOC | OK, but only the viewer shell and description loaded |
| 4 | https://m.indiamart.com/city/chennai/buffet-services.html | AGG B2B city category | OK |
| 5 | https://connect.usama.dev/sams25 | other | 301 to a wa.me chat link; not followed |
| 6 | https://www.happiffie.com/blog/team-outing-catering-chennai | LIST (marketplace blog) | 403 |
| 7 | https://m.indiamart.com/catering-services/ | AGG B2B seller page | OK (thin) |
| 8 | https://hometriangle.com/chennai/catering | AGG | 404 |
| 9 | https://issuu.com/inemai/docs/inemai | DOC | 404 |
| 10 | https://chaikings.com/event-catering/ | OFF service page (Chai Kings) | OK |
| 11 | https://www.happiffie.com/blog/conference-catering-chennai | LIST | 403 |
| 12 | https://kasikannucateringservice.blogspot.com/2023/04/how-can-premium-catering-company-in.html | LIST (a caterer's blog) | OK |
| 13 | https://tribe.best/p/srisaicuisines.blr/wedding-and-corporate-catering | AGG (Bengaluru vendor, per the URL) | 301 to mytribe.in; not followed |
| 14 | https://kasikannucateringservice.blogspot.com/2022/11/make-your-next-corporate-event-in.html | LIST | not attempted (5 already reached) |
| 15 | https://cater-eg.pages.dev | other | not attempted |
| 16 | https://beststartup.in/5-chennai-based-catering-companies-the-most-innovative-catering-companies/?amp=1 | LIST | not attempted |
| 17 | https://threebestrated.in/catering-services-in-chennai-tn | LIST | not attempted |

Counts: OFF 1, AGG 4, LIST 6, DOC 4, other 2.

From the search summary only (pages not loaded): the Happiffie guides give a per-head add-on for staffed buffets, advise checking that a caterer keeps separate prep areas for special diets, and advise shortlisting caterers with at least three checkable corporate references.

### Top 5 accessible for 1A (event catering)

| Result | Type | Intent | Content elements seen |
|---|---|---|---|
| WedMeGood: vegetarian caterers in Chennai | AGG list | Compare vendors | About 20 vendor cards per page across 4 pages. Each card shows a veg per-plate starting price, minimum and maximum guests, locality, and rating with review count. Filters for locality, veg price, specialty, cuisine, minimum and maximum capacity, and rating. Specialty tags (full-service catering, food counters). No FAQ; no form (phone and email only). |
| WeddingWire: Madharas Global Veg Caterers | AGG profile | Vet one caterer and request a price | Per-plate starting price; 50 to 500 guests; cuisine list including live counters and chaat. FAQ of about 10 questions: payment methods, booking deposit, cancellation window, year started, awards, and veg and non-veg price bands for 300 guests. FSSAI licence noted. Food photo gallery, map and address, a "request pricing" button, no reviews. |
| IndiaMART: catering services category | AGG B2B | Find a supplier | About 25 listings with per-plate or per-event prices, capacity bands, one thumbnail each, star rating, years in business and response rate. Call, WhatsApp and best-price buttons. 1 FAQ. Subcategory tiles (buffet, wedding, corporate, live food, canteen). |
| WeddingWire: Chetan's Catering | AGG profile | Vet one caterer | Per-plate starting price; 50 to 1,500 guests; cuisines. FAQ covering payment methods, a 10% booking amount, cancellation terms and year started. About 5 photos, address and map, and price cards for similar vendors. |
| IndiaMART: Veg Catering seller page | AGG B2B | Contact a vendor | Services listed by occasion (birthday, reception, wedding, family get-together, corporate events, festival sweet boxes), GST number and years in business. No prices or capacity. |
| Reserve: Sulekha: Subhalaali Caterers | AGG profile | Vet one caterer | Menus set out by ceremony and by meal, and a Jain menu. FAQ of 8 questions: veg catering, events, capacity tiers, areas, hours, verification. 153 photos and 5 videos, enquiry hours, a rating badge and a response-time badge. |

### Top 5 accessible for 1B (corporate catering)

| Result | Type | Intent | Content elements seen |
|---|---|---|---|
| Scribd: Chennai Catering PPT | DOC | Brand awareness | Description only: private and corporate catering, corporate meals pitched as a staff reward, and an experience claim. The slides did not load. |
| IndiaMART: buffet services in Chennai | AGG B2B | Find a supplier | Per-plate prices on some listings. Buffet types (live counter, lunch, dinner, high tea), a corporate buffet subcategory and two full reception buffet menus. Capacity "as required". Call and WhatsApp only. |
| IndiaMART: "Catering Services" seller page | AGG B2B | Contact a vendor | Thin: a title naming wedding and corporate party catering, years in business and contact buttons. |
| Chai Kings: event catering | OFF service page | Book event catering or a beverage counter | Serves Chennai, Coimbatore and Hyderabad: corporate tea breaks, conferences, exhibitions and weddings. A staffed counter or self-serve flasks. Full-service staffing (setup, replenishment, clean-up). A per-person price band, a 50-guest minimum and a recommended lead time for large events. FAQ of about 11 questions: coverage, minimum order, cost, staffing, customisation, lead time, bulk orders and how to book. Enquiry form fields: name, phone, email, address, city, date, timing, order type, guest count, source and message. About 7 photos with alt text; phone, email and WhatsApp. |
| Kasikannu blog: choosing a corporate caterer | LIST (a caterer's blog) | How to choose a caterer | A 5-point checklist: menu changes for diets and allergies, flexibility on headcount and timing, logistics and staff, presentation, and communication. Scale claims (customers served, central kitchen floor area). Contact by phone and email. |

### Brihadhee baseline (built HTML)

| Page | Words in main | Images in main | Form | FAQs | Schema `@type`s (selection) |
|---|---|---|---|---|---|
| /small-function-catering-chennai/ | 1,211 | 0 | None (links to the quote page) | 7 English and 2 Tamil | Restaurant, Service, OfferCatalog, Offer, QuantitativeValue, FAQPage, BreadcrumbList |
| /catering-services-chennai/ | 1,444 | 2 (restaurant dishes) | 10 fields (event type, venue area, guests, date, serving staff, notes, name, phone, email, source) | 9 | Service, BusinessAudience, OfferCatalog, FAQPage |
| /corporate-catering-chennai/ | 2,522 | 32 (14 client logos shown twice, plus 4 food photos) | 10 fields | 12 English and 2 Tamil | Service, BusinessAudience, ServiceChannel, FAQPage |
| /catering-quote-chennai/ | 875 | 0 | 13 visible fields (event type, occasion, guests 50 to 1,500, date, venue area, lunch or dinner, spread, must-have dishes, serving staff, notes, name, phone, email) | 5 | Service, FAQPage |

Already level with or ahead of the competitors:

- 50 to 1,500 guests, Chennai coverage and live counters
- What shapes a per-plate quote, the steps from enquiry to booking, and a detailed quote form
- Named corporate clients, 1,000+ meals a day, a kitchen tasting and a trial week
- FSSAI-licensed kitchen (corporate page only), areas served, sample corporate menus and the coffee bar

### Gaps (cluster 1)

1. **Photos on the small-function and quote pages.** Both have 0 images in main. Every profile competitor leads with a food gallery, and Sulekha shows 153 photos and 5 videos.
   - Reuse the restaurant photos the site already publishes (banana-leaf meal, dosa, idiyappam, filter coffee), with the existing caption saying they show restaurant dishes. Take dish names from `menu-canonical.ts`. **Fillable from verified facts.**
   - Photos of a real event, a live counter or a setup: **needs owner** (no question yet).
2. **Kitchen trust line on the event pages.** Competitor profiles list an FSSAI licence. Brihadhee states it only on `/corporate-catering-chennai/`. Add it to `/catering-services-chennai/` and `/small-function-catering-chennai/`: the restaurant kitchen is FSSAI-licensed and cooks no meat, egg or fish, and the licence number is shared on request. Sources: `foodSafety` (B2B, 2026-11-12); `fssaiLicence` is still pending. Do not say where event food is prepared, because `prep_mode` is null. **Fillable from verified facts.**
3. **Cuisine range on the small-function page.** The profiles and IndiaMART list the cuisines each caterer covers. `/small-function-catering-chennai/` names only South Indian regional dishes, while `/catering-services-chennai/` already says menus can include North Indian and Indo-Chinese dishes. Add the same line, with restaurant dishes from `menu-canonical.ts` to ask about, such as Paneer Butter Masala, Veg Fried Rice and Gobi Manchurian. Source: `cuisines` (KW12). **Fillable from verified facts.**
4. **Booking terms FAQ.** WeddingWire FAQs give the booking deposit, payment methods and cancellation terms, and Chai Kings gives a lead time and says what its staffing includes. Brihadhee says these are agreed on the quote call. **Needs owner:**
   - Lead time: Q32.
   - Serving staff and clean-up: Q31 (`staff_serving_cleanup_included` is null).
   - Prep mode: `prep_mode` is null.
   - Deposit, payment methods and cancellation: no question yet.
5. **Sample spreads by occasion.** Sulekha sets out menus ceremony by ceremony, and IndiaMART buffet listings print full reception menus. Brihadhee has sample corporate menus but no sample event spread. **Needs owner** (Q37).

Considered but not listed:

- Year started and number of events served (WeddingWire, Sulekha and Kasikannu show these): needs owner, no question yet.
- Enquiry response time (Sulekha badge): needs owner.
- Per-plate starting prices, Jain menus and ratings: excluded by the brief.

---

## Cluster 2. Build-your-own dosa and the brand name

Owner pages: `/menu/dosa/` and `/`.

### Query 2A: "build your own dosa Chennai" (17 results)

| # | URL | Type | Fetch |
|---|---|---|---|
| 1 | https://www.fodors.com/news/photos/the-10-best-dosas-and-where-to-eat-them-in-chennai | LIST | 403 |
| 2 | https://swiggy.com/city/chennai/dosa-in-99-varieties-of-dosa-maduravoyal-rest242273 | AGG (Swiggy) | Empty body |
| 3 | https://www.swiggy.com/menu/1158124 | AGG | Empty body |
| 4 | https://www.swiggy.com/restaurants/namma-veedu-vasanta-bhavan-neelankarai-chennai-10145 | AGG | Empty body |
| 5 | https://miniguide.co/place/chennai-masala-dosa | AGG city guide (a Barcelona restaurant; off-target) | OK |
| 6 | https://www.swiggy.com/city/chennai/id-coffee-chetpet-kilpauk-rest331188 | AGG | Empty body |
| 7 | https://deliveroo.co.uk/menu/birmingham/wolverhampton-city-centre/chennai-dosa-restaurant | AGG (UK; off-target) | 403 |
| 8 | https://deliveroo.co.uk/menu/Birmingham/wolverhampton-city-centre/chennai-dosa-restaurant | AGG (UK) | Duplicate of #7 |
| 9 | https://slurrp.com/amp/article/your-guide-to-the-best-dosas-in-chennai-1652525084963 | LIST (Slurrp) | OK |
| 10 | https://www.slurrp.com/article/your-guide-to-the-best-dosas-in-chennai-1652525084963 | LIST | Duplicate of #9 |
| 11 | https://deliveroo.co.uk/menu/Leicester/belgrave-centre/chennai-dosa-lei | AGG (UK) | Not attempted (host returned 403) |
| 12 | https://www.saveur.com/gallery/dosas-photo-gallery/ | LIST | 403 |
| 13 | https://deliveroo.co.uk/menu/leicester/belgrave-centre/chennai-dosa-lei | AGG (UK) | Duplicate of #11 |
| 14 | https://deliveroo.co.uk/menu/Coventry/courthouse-green/chennai-dosa-coventry | AGG (UK) | Not attempted |
| 15 | https://theculturetrip.com/asia/india/articles/where-to-find-the-best-dosas-in-chennai | LIST | Timed out twice |
| 16 | https://www.swiggy.com/city/chennai/tiffin-shastra-mogappair-nolambur-rest1239939 | AGG | Empty body |
| 17 | https://www.doordash.com/en-GB/store/36667467 | AGG (UK; off-target) | 403 |

Counts: OFF 0, AGG 12 (Swiggy 5, Deliveroo 5, DoorDash 1, Miniguide 1), LIST 5. Two results were accessible, one of them off-target.

No result offers build-your-own dosa in Chennai. The search summary noted only that one chain's Swiggy listing tags a dosa as customisable; that page did not load.

### Query 2B: "brihadhee" (10 results)

| # | URL | Type |
|---|---|---|
| 1 | https://www.momjunction.com/baby-names/brihadeesh | other (meaning of a personal name) |
| 2 | https://sanskrit-lexicon.uni-koeln.de/scans/MW72Scan/MW72Scanpdf/pg_0961.pdf | DOC (Sanskrit dictionary scan, PDF) |
| 3 | https://www.britannica.com/topic/Brihaddeshi | other (a music treatise) |
| 4 | https://www.wisdomlib.org/definition/b%E1%B9%9Bhat%C4%AB | other (definitions) |
| 5 | https://de.wisdomlib.org/definition/brihadishvara | other |
| 6 | https://en.Wikipedia.com/wiki/Brihadratha | other (an ancient king) |
| 7 | https://graphsearch.epfl.ch/en/concept/69275167 | other |
| 8 | https://simple.wikipedia.com/wiki/Brihadeeswara_Temple | other (the Thanjavur temple) |
| 9 | https://wikiwand.com/en/Brihadratha | other |
| 10 | https://cavac.at/cavacopedia/Brihadratha | other |

None of these was fetched: the titles and URLs show all ten are off-topic, and none is about the restaurant. No Brihadhee listing profile (Zomato, District, EazyDiner, Swiggy Dineout) appeared. In this index the bare brand name reads as a Sanskrit word, a personal name or the Thanjavur temple.

For contrast, on 2026-11-17 the query "brihadhee menu" in the same tool returned the EazyDiner Brihadhee listing (`evidence/2026-11-17/competitors.md`).

### Accessible results (cluster 2)

| Result | Type | Intent | Content elements seen |
|---|---|---|---|
| Slurrp: guide to the dosas of Chennai | LIST | Where to eat dosa | 5 places. Each entry gives signature dosas, cost for two, daily timings, full address and a short story of the place (its age and reputation). One lead image; author and update date (August 2022). No build-your-own. |
| Miniguide: Chennai Masala Dosa (Barcelona) | AGG city guide | Find a dosa restaurant abroad | Number of dosa varieties, choice of filling, dietary notes (vegan, gluten-free), split opening hours, phone, website and social links, and a directions link. Off-target. |

### Brihadhee baseline

- `/menu/dosa/`: 1,779 words and 1 image.
  - Covers: a price table for the 4 build-your-own steps, 10 chef's combinations, 8 classic dosas, ragi and navadhaniya dosa explained, hours, address and offers.
  - FAQs: 6 English, 2 Tamil and 1 Tanglish.
  - Schema: Restaurant, WebPage, BreadcrumbList, FAQPage.
  - The only page in this result set that explains build-your-own dosa, with prices.
- `/`: 2,787 words and 16 images. FAQs: 8 English and 2 Tamil, including "Who founded Brihadhee?". The name story (a tribute to the Brihadeeswarar Temple in Thanjavur, not affiliated) is on `/about/` and `/faq/` only, not on `/`.

### Gaps (cluster 2)

1. **What the name means, on the home page.** The brand query returns only pages about the Sanskrit word, a personal name and the Thanjavur temple. Add one visible line near the top of `/`: Brihadhee is a pure vegetarian restaurant in Anna Nagar East; the name is a tribute to the Brihadeeswarar Temple in Thanjavur and its Chola architecture; the restaurant is not affiliated with the temple. Source: `nameStory` (BLUEPRINT, 2026-11-11). Pair "Brihadhee" with "restaurant" or "Anna Nagar", as CLAUDE.md requires. **Fillable from verified facts.**
2. **Who is behind the dosa.** The listicle gives each place a short story, but `/menu/dosa/` never says who runs Brihadhee. Add one sentence: the restaurant was founded by Rakesh and Eashwer (an auditor and a lawyer) and serves Tamil home-style food cooked from grandma's recipes. Link to `/about/`. Sources: `founders`, `recipeStory`. **Fillable from verified facts.** The opening year: **needs owner** (no question yet).
3. **Dietary notes for each batter.** The city-guide entry flags vegan and gluten-free dosas. `/menu/dosa/` names each batter's ingredients but says nothing about dairy or gluten. **Needs owner:** the kitchen must confirm ingredients and whether the tawa is shared. Keep this off live routes until then, like the Q11 to Q14 dietary gates.

Cost for two is a cross-cluster item (see the end of this file).

---

## Cluster 3. Family dining and the after-temple visit

Owner page: `/family-dining-anna-nagar/`.

### Query 3A: "family restaurant Anna Nagar veg" (17 results)

| # | URL | Type | Fetch |
|---|---|---|---|
| 1 | https://www.district.in/blog/vegetarian-restaurants-for-families-in-chennai | LIST (District blog) | OK |
| 2 | https://slurrp.com/article/10-best-family-restaurants-in-chennais-anna-nagar-1677314187303 | LIST | OK |
| 3 | https://www.swiggy.com/city/chennai/anns-kitchen-kolathur-rest874200 | AGG | Empty body |
| 4 | https://www.swiggy.com/city/chennai/anna-nagar-restaurants | AGG | Empty body |
| 5 | https://www.swiggy.com/city/chennai/best-restaurants | AGG | Not attempted (Swiggy) |
| 6 | https://www.slurrp.com/article/top-10-family-restaurants-in-adyar-1674649433561 | LIST (Adyar; outside the area) | OK |
| 7 | https://www.swiggy.com/city/chennai/non-veg-restaurants | AGG | Not attempted |
| 8 | https://shilpaahuja.com/top-veg-restaurants/ | LIST | Not attempted |
| 9 | https://www.swiggy.com/city/chennai/anna-nagar-restaurants/casual-dining-restaurants-dineout | AGG | Not attempted |
| 10 | https://www.district.in/dining/chennai/kolapasi-indian-canteen-anna-nagar-west | AGG | Not attempted |
| 11 | https://www.swiggy.com/city/pune/anand-nagar-restaurants/family-dining-restaurants-dineout | AGG (Pune; irrelevant) | Not attempted |
| 12 | https://www.livechennai.com/detailnews.asp?nav=p&newsid=83386 | LIST (news) | Not attempted |
| 13 | https://www.swiggy.com/city/chennai/dindigul-thalappakatti-since-1957-anna-nagar-rest10140 | AGG | Not attempted |
| 14 | https://trip101.com/article/non-veg-restaurants-in-anna-nagar | LIST | Not attempted |
| 15 | https://www.swiggy.com/menu/10140 | AGG | Not attempted |
| 16 | https://traveltriangle.com/blog/restaurants-in-anna-nagar | LIST | 301 to the trailing-slash URL; not followed (5 already reached) |
| 17 | https://www.eazydiner.com/chennai/adyar-ananda-bhavan-anna-nagar-west-612797 | AGG (EazyDiner) | OK (also 3B #4) |

Counts: OFF 0, AGG 10, LIST 7.

### Query 3B: "veg restaurant near temple Anna Nagar" (18 results)

| # | URL | Type | Fetch |
|---|---|---|---|
| 1 | https://yappe.in/tamil-nadu/chennai/dwaraka-veg/423918 | AGG (Yappe) | OK |
| 2 | https://www.swiggy.com/restaurants/a2b-veg-12th-main-road-anna-nagar-chennai-14673 | AGG | Empty body |
| 3 | https://www.swiggy.com/city/chennai/anna-nagar-restaurants | AGG | Duplicate of 3A #4 |
| 4 | https://www.eazydiner.com/chennai/adyar-ananda-bhavan-anna-nagar-west-612797 | AGG | OK |
| 5 | https://www.swiggy.com/city/chennai/best-restaurants | AGG | Duplicate of 3A #5 |
| 6 | https://www.eazydiner.com/chennai/gopuram-veg-ambattur-chennai-703123 | AGG | OK (reserve) |
| 7 | https://traveltriangle.com/blog/restaurants-in-anna-nagar | LIST | Duplicate of 3A #16 |
| 8 | https://www.eazydiner.com/chennai/adyar-ananda-bhavan-anna-nagar-west-612797/reviews | AGG | Not attempted |
| 9 | https://www.swiggy.com/city/chennai/anna-nagar-restaurants/casual-dining-restaurants-dineout | AGG | Duplicate of 3A #9 |
| 10 | https://shilpaahuja.com/top-veg-restaurants/ | LIST | Duplicate of 3A #8 |
| 11 | https://www.eazydiner.com/chennai/restaurants/vr-chennai/pure-veg | AGG | Not attempted |
| 12 | https://www.eazydiner.com/chennai/adyar-ananda-bhavan-anna-nagar-east-613167 | AGG | Not attempted |
| 13 | https://yappe.in/tamil-nadu/chennai/divine-restaurant/20174 | AGG | Not attempted |
| 14 | https://www.eazydiner.com/chennai/cream-centre-vegetarian-legacy-since-1958-anna-nagar-east-chennai-612987 | AGG | Not attempted |
| 15 | https://happycow.net/reviews/visalatchis-banana-leaf-kuala-lumpur-405766 | AGG (Kuala Lumpur; irrelevant) | Not attempted |
| 16 | https://yappe.in/tamil-nadu/chennai/sri-ganesh-bhavan/147631 | AGG | Not attempted |
| 17 | https://www.swiggy.com/city/pondicherry/anna-nagar-restaurants | AGG (Puducherry; irrelevant) | Not attempted |
| 18 | https://traveltriangle.com/blog/?p=775616 | LIST | Not attempted |

Counts: OFF 0, AGG 15, LIST 3. No result, fetched or in the search summary, mentions a temple.

### Top 5 accessible (3A and 3B interleaved)

| Result | Type | Intent | Content elements seen |
|---|---|---|---|
| District: vegetarian restaurants for families in Chennai (16 October 2026) | LIST (booking platform's blog) | Shortlist family veg restaurants | 10 restaurants, one in Anna Nagar West. Each entry gives cuisine, rating, cost for two, 4 to 5 dishes to order, a one-line ambience tag, an offer badge (a flat percentage or a bank offer) and a reserve button. 3 to 5 photos per entry. No timings, full addresses or FAQ. |
| Yappe: Dwaraka Veg (3rd Avenue, W Block, the same street as Brihadhee) | AGG directory | Address, hours, contact | Full address, hours for each day, nearest metro and railway stations with distances, nearby places, 5 photos, review snippets, a small FAQ (weekly off day) and click-to-call. No menu. |
| Slurrp: 15 family restaurants in Anna Nagar (April 2023) | LIST | Shortlist | Each entry gives a signature dish, location, timings, how to get there and cost for two. About 9 images. Few explicit family features. |
| EazyDiner: Adyar Ananda Bhavan, Anna Nagar West | AGG booking platform | Check facts and book | Cuisine, cost for two, hours and veg status. An 11-question FAQ: cost, veg status, hours, buffet, alcohol, parking, live music, payment and deals. Book a table, call, directions, and similar restaurants nearby. |
| Slurrp: family restaurants in Adyar (outside the area) | LIST | Shortlist | The same entry fields as the Anna Nagar list. |
| Reserve: EazyDiner: Gopuram Veg (Ambattur) | AGG booking platform | Check facts and book | Amenities (AC, pure veg), an approximate seat count from reviews, booking and bank offers, a 12-page menu in images, and an FAQ. |

### Brihadhee baseline

`/family-dining-anna-nagar/`: 794 words and 0 images.

- Covers: a summary table, lunch after a temple visit (no temple named), birthday and anniversary dinners, what families order (with prices), booking, offers and 3 FAQs.
- Schema: Restaurant, WebPage, BreadcrumbList, FAQPage.
- Ahead of the competitors: it is the only page in the set that answers the after-temple lunch, and it gives dish prices and dated offers.
- The verified direction landmarks (Anna Nagar East Metro, Roundana, VR Mall, Shanthi Colony, Thirumangalam) appear only on `/about/`.

### Gaps (cluster 3)

1. **Photos.** The page has 0 images, while District shows 3 to 5 per restaurant and Yappe shows 5.
   - Reuse the dish photos the site already publishes (banana-leaf meal, idiyappam, dosa, filter coffee). **Fillable from verified facts.**
   - Photos of the dining room, seating and group tables: **needs owner** (no question yet).
2. **Getting here.** Slurrp gives directions for each entry, and Yappe gives the nearest metro station. Add the verified landmarks as Google Maps links, with no distance or travel time (`directionLandmarks`, BLUEPRINT). Add one line naming the nearby neighbourhoods (`nearbyAreas`, KW12). Do not name a temple (Q24). **Fillable from verified facts.**
3. **Cost for two.** District, Slurrp and EazyDiner show it for every restaurant. `costForTwo` is unverified: the listings show ₹200 and ₹800, and the build probe blocks the phrase "for two". **Needs owner** (Q21 asks for the per-person spend).
4. **Group seating and the dining room.** District mentions floors and large tables, and EazyDiner lists AC and other amenities. Brihadhee asks families to call. **Needs owner:**
   - Group size: Q33.
   - AC, seating capacity and a separate party area: client-confirmations B6; no question yet for AC or capacity.

---

## Cluster 4. Lunch and dinner

Owner pages: `/menu/nellai-meals/`, `/veg-dinner-anna-nagar/`, `/parotta-anna-nagar/`.

### Query 4A: "veg lunch Anna Nagar" (19 results)

| # | URL | Type | Fetch |
|---|---|---|---|
| 1 | https://www.swiggy.com/restaurants/a2b-veg-12th-main-road-anna-nagar-chennai-14673 | AGG | Empty body |
| 2 | https://www.swiggy.com/city/chennai/aachi-namma-kitchen-anna-nagar-rest493830 | AGG | Not attempted (Swiggy) |
| 3 | https://www.swiggy.com/city/chennai/aachi-namma-kitchen-annanagar-rest493830 | AGG | Not attempted |
| 4 | https://www.swiggy.com/city/chennai/mambalam-annashree-thyagaraya-nagar-rest117303 | AGG | Not attempted |
| 5 | https://www.swiggy.com/city/chennai/shri-gowri-krishnaa-annanagar-rest190571 | AGG | Not attempted |
| 6 | https://www.swiggy.com/menu/190571 | AGG | Not attempted |
| 7 | https://www.swiggy.com/city/chennai/dindigul-thalappakatti-since-1957--annanagar-rest10140 | AGG | Not attempted |
| 8 | https://www.swiggy.com/city/chennai/anns-kitchen-kolathur-rest874200 | AGG | Empty body |
| 9 | https://www.swiggy.com/city/chennai/geetham-veg-restaurant-annanagar-anna-nagar-rest1042983 | AGG | Not attempted |
| 10 | https://www.swiggy.com/menu/10140 | AGG | Not attempted |
| 11 | https://spinach.guide/venues/saravana-bhavan-anna-nagar-178487/ | AGG (vegan guide) | OK |
| 12 | https://www.dtnext.in/amp/story/news/chennai/an-affordable-vegetarian-hang-out-spot-in-anna-nagar-788078 | LIST (news) | OK (reserve) |
| 13 | https://www.swiggy.com/city/chennai/anna-nagar-restaurants/casual-dining-restaurants-dineout | AGG | Not attempted |
| 14 | https://www.swiggy.com/city/dharmapuri/athiyan-foods-byepass-road-nirmala-nagar-rest373036 | AGG (Dharmapuri; irrelevant) | Not attempted |
| 15 | https://www.swiggy.com/city/chennai/anna-nagar-restaurants | AGG | Empty body |
| 16 | https://shilpaahuja.com/top-veg-restaurants/ | LIST | Not attempted |
| 17 | https://www.happycow.net/asia/india/chennai/print | AGG | Not attempted |
| 18 | https://www.eazydiner.com/chennai/cream-centra-vegetarian-legacy-since-1958-anna-nagar-east-chennai-612987 | AGG | Not attempted |
| 19 | https://www.swiggy.com/city/chennai/sri-raghavendra-mess-thyagaraya-nagar-ayanavaram-rest271950 | AGG | Not attempted |

Counts: OFF 0, AGG 17 (Swiggy 14), LIST 2. The first 10 results are all Swiggy listings. From the search summary only: the Swiggy listings show a rating and cost for two for each restaurant.

### Query 4B: "paanai parotta Anna Nagar" (17 results)

| # | URL | Type | Fetch |
|---|---|---|---|
| 1 | https://mtjclass.blogspot.com/2016/05/anna-nagars-best-place-for-kotthu.html | LIST (student blog) | OK |
| 2 | https://www.swiggy.com/city/chennai/anns-kitchen-kolathur-rest874200 | AGG | Empty body (duplicate) |
| 3 | https://www.swiggy.com/city/madurai/courtallam-sengai-virunthu-kk-nagar-rest1215735 | AGG (Madurai) | Not attempted |
| 4 | https://www.swiggy.com/city/trichy/shri-sangeetas-east-thillai-nagar-rest232797 | AGG (Tiruchirappalli) | Not attempted |
| 5 | https://slurrp.com/food-trails/ultimate-kothu-parotta-food-trail-in-chennai-1711624999003 | LIST | OK |
| 6 | https://www.swiggy.com/city/chennai/anjappar-adyar-rest5688 | AGG | Not attempted |
| 7 | https://www.swiggy.com/city/chennai/sri-magesh-chettinadu-resturant-annanagar-rest954151 | AGG | Not attempted |
| 8 | https://www.district.in/dining/chennai/that-mallu-joint-anna-nagar-east | AGG (District) | OK |
| 9 | https://www.swiggy.com/city/chennai/junior-kuppanna-gst-road-maraimalai-nagar-rest98548 | AGG | Not attempted |
| 10 | https://www.district.in/dining/chennai/nellai-vairamaligai-t-nagar | AGG (District) | OK |
| 11 | https://www.swiggy.com/city/trichy/anjappar-woraiyur-rest75135 | AGG | Not attempted |
| 12 | https://www.swiggy.com/menu/10140 | AGG | Not attempted |
| 13 | https://www.slurrp.com/article/chennais-top-7-places-to-relish-kothu-parotta-as-per-city-foodies-1721815318515 | LIST | Not attempted |
| 14 | https://yappe.in/tamil-nadu/chennai/curry-box/518576 | AGG (Yappe) | OK (reserve) |
| 15 | https://www.swiggy.com/city/salem/dindigul-thalappakatti-since-1957-seelanaickenpatti-rest1148586 | AGG | Not attempted |
| 16 | https://www.swiggy.com/city/trichy/hotel-padmavathi-thillai-nagar-rest1198783 | AGG | Not attempted |
| 17 | https://www.swiggy.com/city/trichy/rottu-kadai-benwells-road-reynolds-road-rest136135 | AGG | Not attempted |

Counts: OFF 0, AGG 14 (Swiggy 11), LIST 3. No result mentions paanai parotta. The closest is Curry Box in Anna Nagar West, where Yappe reviews mention a pot parotta and a dum parotta.

### Top 5 accessible (4A and 4B interleaved)

| Result | Type | Intent | Content elements seen |
|---|---|---|---|
| MTJC student blog (May 2016): kothu parotta at Grand Fast Food, Anna Nagar | LIST | Where to eat kothu parotta | Founding year, owners, quotes from staff and regulars, and 2 dish photos. No prices, timings or address. |
| Slurrp: kothu parotta food trail | LIST | Where to eat kothu parotta | 10 places, one near Anna Nagar Tower Park. Each entry gives a signature parotta, a price, timings (often separate lunch and dinner windows), and directions and call buttons. No paanai parotta. |
| District: That Mallu Joint, Anna Nagar East | AGG booking platform | Check facts before visiting | Cuisine, cost for two, menu images (2 pages), 5 photos plus a gallery, facilities (indoor seating), a rating breakdown and reviews. No weekly hours shown. |
| District: Nellai Vairamaligai, T. Nagar | AGG booking platform | Nellai-style parotta | Cost for two, one menu page, photos, facilities, a rating with review tags (family crowd, portions), two phone numbers and a map. |
| Spinach Guide: Saravana Bhavan, Anna Nagar | AGG vegan guide | Is it vegan-friendly? | Meal periods (lunch, dinner), daily hours, price tier, a vegan grade with tips on what to ask for (no ghee or curd), and directions, call and website links. No prices. |
| Reserve: DT Next (June 2024): a new vegetarian quick-service outlet in Anna Nagar | LIST (news) | New places | The founder's story, the concept and its dishes. No prices or hours. |
| Reserve: Yappe: Curry Box, Anna Nagar West | AGG directory | Address and hours | Pot parotta and dum parotta mentioned in reviews, nearest metro station with distance, a timetable, a pros and cons summary, a 4-question FAQ and 9 photos. |

### Brihadhee baseline

| Page | Words | Images | FAQs | Notes |
|---|---|---|---|---|
| /menu/nellai-meals/ | 1,176 | 1 | 4 English, 2 Tamil and 1 Tanglish | Meal contents and prices, a lunch comparison table, 5 lunch-only combos, family and office lunch, and the recipe story (grandma's recipes). No founders line. |
| /veg-dinner-anna-nagar/ | 769 | 1 | 2 | Dinner dishes and prices, open until 11 PM, last-order time not published, booking and offers. |
| /parotta-anna-nagar/ | 675 | 0 | 6 | 7 parotta dishes with prices, ItemList, MenuItem and Offer schema, and salna explained. No photo, founders line or recipe story. |

Ahead of the competitors: dish-level prices; the only page in the set that names paanai parotta; explanations of sodhi and ulundhu kali.

### Gaps (cluster 4)

1. **A parotta photo.** `/parotta-anna-nagar/` has no image, and none of the photos the site publishes shows parotta. The District listings and the MTJC post lead with parotta photos. **Needs owner:** a permissioned photo of Paanai Parotta or kothu parotta (no question yet).
2. **When lunch ends and when the kitchen takes last orders.** Slurrp entries and the Spinach Guide give meal windows. Brihadhee says lunch starts at 11 AM and the combos are lunch-only, but never says when lunch (and so the combos) ends. The last-order time before 11 PM is also unpublished. **Needs owner:** `lastOrderTime` is pending, and no source gives the lunch end time (no question yet).
3. **Other names for Paanai Parotta.** The only result near the topic (the Curry Box reviews) calls this style of dish pot parotta or dum parotta. Add "pot parotta" and "dum parotta" as plain-language aliases in the explainer, based on the menu description "slow-cooked in a sealed pot (dum style)" (`menu-canonical.ts`). **Fillable from verified facts.** Note: `/parotta-anna-nagar/` and `/` also say "claypot parotta", but "clay" is not in the menu text, so confirm it with the owner or drop it.
4. **The people behind the food.** The MTJC and DT Next pieces lead with founders and history. `/menu/nellai-meals/` has the recipe story but no founders line, and `/parotta-anna-nagar/` has neither. Add one line to each. Sources: `founders`, `recipeStory`. **Fillable from verified facts.** The opening year: **needs owner**.

Not proposed: delivery (4A is led by Swiggy listings, but restaurant delivery is gated, Q25), ratings and review tags, and Jain or onion-free notes.

---

## Cross-cluster

- **Cost for two** appears on almost every listing and listicle in clusters 2 to 4. `costForTwo` is unverified, so it needs the owner (Q21 asks for the per-person spend). Until it is verified, the build probe blocks any "for two" wording.
- **Swiggy** fills most of the "veg lunch Anna Nagar" list and a third of the dosa list, but returned empty pages to WebFetch. Its per-listing content (ratings, cost for two, dish photos, customisable tags) was not observed here.
- **New owner questions** suggested by this research. They have not been added to `owner-questions.md`, because this brief allowed editing this file only:
  - Catering deposit, payment methods and cancellation terms.
  - The year Brihadhee opened.
  - When lunch service and the lunch combos end.
  - Permissioned photos of events, the dining room and parotta.
  - Whether any batters are dairy-free or gluten-free, and whether the tawa is shared.
  - Seating capacity and AC.
