# Brihadhee implementation audit

Recorded 23 November 2026 before source changes. Baseline build and all existing SEO, function, fact and link checks passed.

## Stack and keyword inputs

- Astro 7.4.5 with filesystem routes and getStaticPaths for catering routes. Static HTML output on Vercel with ESM JavaScript, TypeScript and vanilla CSS. Sources are package.json, astro.config.mjs lines 1–15, src/pages and vercel.json.
- Keys.md is absent. The existing 845-row docs/seo/keyword-tracker.csv is the available keyword input. Create Keys.md from that input, preserve its rows and record the new owner instructions.
- The request supplied on 23 November supersedes older restrictions on premium positioning and publishing useful no-garlic and Jain dietary guidance. Specific dish eligibility, shared preparation equipment and certification have not been supplied.

## Findings in impact order

| Impact | Finding and source before changes | Remediation and verification |
| --- | --- | --- |
| Critical | None found in the baseline static output. | Preserve functioning booking, enquiry and menu routes. |
| High | Required dietary audience page is absent from production. config/seo-gates.ts line 36 disables it. src/data/spokes.js lines 636–768 contains an older draft with unsupported dish and preparation assertions. | Publish accurate guidance using the owner-approved audience. Record recipe and preparation questions as TODOs. Validate its links, schema, sitemap and output. |
| High | Keys.md and the six requested seo-profile assets are missing. Repository root and docs/seo/keyword-tracker.csv line 1. | Establish a keyword source preserving existing records. Generate factual NAP, menu and weekly post assets for manual use. |
| Medium | The retired morning-service term appears in a public FAQ. config/seo-gates.ts line 111 and src/data/spokes.js line 545. | Replace the question with lunch and dinner wording. Retain protective scanners and historical evidence in internal files. |
| Medium | Corporate client strip has 26 image elements without intrinsic dimensions. src/components/ClientLogos.astro line 59. | Read actual file dimensions at build time and emit width/height. Check all built image tags and mobile layout. |
| Medium | The first hero image has high fetch priority but no responsive preload. src/components/Hero.astro lines 92–100 and src/layouts/Base.astro lines 94–97. | Preload the same responsive source used by the first slide. Compare mobile Lighthouse. |
| Medium | Restaurant and WebSite entities exist, but the requested explicit Organization node is absent. src/lib/schema.js lines 40, 77 and 125. | Add a linked brand Organization with a distinct stable ID, shared public identity and no invented legal details. Validate graph relationships. |
| Low | Trailing-slash convention relies on default routing and hosting behavior. astro.config.mjs line 10 and vercel.json lines 1–19. | Set the directory-route convention explicitly while retaining file endpoints and legacy redirects. Verify route normalization and API paths. |

## Crawlability and performance baseline

- All main content is in generated HTML. Titles and descriptions are unique and within the requested limits. Every HTML document has one H1 and a self-referencing canonical.
- robots.txt is generated with an allow rule and explicit search and training crawler rules. It references sitemap-index.xml, which points to generated sitemap.xml with 18 indexable URLs and per-page lastmod.
- Utility pages /privacy/, /reserve-table/, /reserve-table/tables/ and /404.html are intentionally noindex. Reservation routes remain functional and are excluded from the sitemap.
- Production origin is https://www.brihadhee.com. Vercel contains permanent redirects for the apex and legacy deployment domain and four old route variants. HTTP-to-HTTPS enforcement and live redirect chains require verification after an owner deployment.
- Indexable pages have no detected orphan route or broken internal link in the existing checker. The full inventory below includes all internal destinations.
- Open Graph and Twitter cards use the existing 1200 by 630 share artwork. Food images use responsive WebP variants, explicit dimensions and deferred loading below the fold. Client logos are the image-size exception.
- Latin and Tamil fonts are self-hosted with font-display rules. Two matching Latin font resources are preloaded. The largest local JavaScript bundle is 16,428 bytes before compression. Analytics load asynchronously only when configured.
- Lighthouse mobile baseline is being captured on six existing core routes before source edits. Exact results and the equivalent after measurements will be recorded in SEO-IMPLEMENTATION-REPORT.md. Lab scores do not measure field INP or establish search positions.

## Every generated HTML route before changes

Schema names below refer to top-level nodes. MenuSection, MenuItem and VegetarianDiet occur inside the menu graph. Internal links include fragments and shared navigation.

### /404.html

| Field | Baseline |
| --- | --- |
| Title | Page not found | Brihadhee, Anna Nagar East |
| Meta description | This page does not exist. See the Brihadhee menu, location and booking pages. |
| H1 | Sorry, this page isn't here |
| Canonical | https://www.brihadhee.com/404/ |
| Indexable | False |
| Schema | Restaurant, WebSite, WebPage |
| Main text word count | 28 |
| Images and alt coverage | 2 images, 0 missing alt attributes, 0 missing dimensions |

Internal destinations

- /
- /#careers
- /#top
- /_astro/fraunces-latin.DihXLNYH.woff2
- /_astro/instrument-sans-latin.BbzFLZTg.woff2
- /about/
- /about/#facts
- /apple-touch-icon.png
- /book-a-table/
- /catering-quote-chennai/
- /catering-services-chennai/
- /corporate-catering-chennai/
- /event-planner-catering-partner/
- /family-dining-anna-nagar/
- /faq/
- /favicon-96x96.png
- /favicon.ico
- /guides/what-are-nellai-meals/
- /menu/
- /menu/#beverages
- /menu/#breads
- /menu/#combos
- /menu/#dosa
- /menu/#gravies
- /menu/#idiyappam
- /menu/#idly
- /menu/#parotta
- /menu/#rice
- /menu/#signatures
- /menu/#starters
- /menu/dosa/
- /menu/nellai-meals/
- /privacy/
- /reserve-table/
- /seasonal/karthigai-ayyappa-pure-veg/
- /site.webmanifest
- /small-function-catering-chennai/
- /veg-dinner-anna-nagar/
- /whats-new/

### /about/

| Field | Baseline |
| --- | --- |
| Title | Brihadhee Address, Timings & Contact | Anna Nagar East |
| Meta description | Visit Brihadhee on 3rd Avenue, W-Block, Anna Nagar East, near Anna Nagar Tower Park. Open daily 11 AM to 11 PM. Get directions or call +91 73587 14113. |
| H1 | Visit Brihadhee in Anna Nagar |
| Canonical | https://www.brihadhee.com/about/ |
| Indexable | True |
| Schema | Restaurant, WebSite, WebPage, BreadcrumbList, FAQPage |
| Main text word count | 1251 |
| Images and alt coverage | 2 images, 0 missing alt attributes, 0 missing dimensions |

Internal destinations

- /
- /#careers
- /#coffee-bar
- /#top
- /_astro/fraunces-latin.DihXLNYH.woff2
- /_astro/instrument-sans-latin.BbzFLZTg.woff2
- /about/
- /about/#facts
- /apple-touch-icon.png
- /book-a-table/
- /catering-quote-chennai/
- /catering-services-chennai/
- /corporate-catering-chennai/
- /event-planner-catering-partner/
- /family-dining-anna-nagar/
- /faq/
- /favicon-96x96.png
- /favicon.ico
- /guides/what-are-nellai-meals/
- /menu/
- /menu/#beverages
- /menu/#breads
- /menu/#combos
- /menu/#dosa
- /menu/#gravies
- /menu/#idiyappam
- /menu/#idly
- /menu/#parotta
- /menu/#rice
- /menu/#signatures
- /menu/#starters
- /menu/dosa/
- /menu/nellai-meals/
- /privacy/
- /reserve-table/
- /seasonal/karthigai-ayyappa-pure-veg/
- /site.webmanifest
- /small-function-catering-chennai/
- /veg-dinner-anna-nagar/
- /whats-new/

### /book-a-table/

| Field | Baseline |
| --- | --- |
| Title | Brihadhee Table Booking | Pure Veg Restaurant, Anna Nagar |
| Meta description | Book lunch or dinner at Brihadhee, Anna Nagar East, through Swiggy Dineout, EazyDiner or District. Call the restaurant for group seating. |
| H1 | Book a table at Brihadhee, Anna Nagar East |
| Canonical | https://www.brihadhee.com/book-a-table/ |
| Indexable | True |
| Schema | Restaurant, WebSite, WebPage, BreadcrumbList, FAQPage |
| Main text word count | 402 |
| Images and alt coverage | 2 images, 0 missing alt attributes, 0 missing dimensions |

Internal destinations

- /
- /#careers
- /#top
- /_astro/fraunces-latin.DihXLNYH.woff2
- /_astro/instrument-sans-latin.BbzFLZTg.woff2
- /about/
- /about/#facts
- /about/#find-us
- /apple-touch-icon.png
- /book-a-table/
- /catering-quote-chennai/
- /catering-services-chennai/
- /corporate-catering-chennai/
- /event-planner-catering-partner/
- /family-dining-anna-nagar/
- /faq/
- /favicon-96x96.png
- /favicon.ico
- /guides/what-are-nellai-meals/
- /menu/
- /menu/#beverages
- /menu/#breads
- /menu/#combos
- /menu/#dosa
- /menu/#gravies
- /menu/#idiyappam
- /menu/#idly
- /menu/#parotta
- /menu/#rice
- /menu/#signatures
- /menu/#starters
- /menu/dosa/
- /menu/nellai-meals/
- /privacy/
- /reserve-table/
- /seasonal/karthigai-ayyappa-pure-veg/
- /site.webmanifest
- /small-function-catering-chennai/
- /veg-dinner-anna-nagar/
- /whats-new/

### /catering-quote-chennai/

| Field | Baseline |
| --- | --- |
| Title | Catering Quote in Chennai for 50+ Guests | Brihadhee |
| Meta description | Request a pure vegetarian catering quote in Chennai for events from 50 guests. Share your date, venue, guest count, menu and service requirements. |
| H1 | Get a Pure Vegetarian Catering Quote in Chennai |
| Canonical | https://www.brihadhee.com/catering-quote-chennai/ |
| Indexable | True |
| Schema | Restaurant, WebSite, WebPage, BreadcrumbList, FAQPage, Service |
| Main text word count | 843 |
| Images and alt coverage | 2 images, 0 missing alt attributes, 0 missing dimensions |

Internal destinations

- /
- /#careers
- /#top
- /_astro/fraunces-latin.DihXLNYH.woff2
- /_astro/instrument-sans-latin.BbzFLZTg.woff2
- /about/
- /about/#facts
- /apple-touch-icon.png
- /book-a-table/
- /catering-quote-chennai/
- /catering-services-chennai/
- /corporate-catering-chennai/
- /corporate-catering-chennai/#enquiry
- /event-planner-catering-partner/
- /family-dining-anna-nagar/
- /faq/
- /favicon-96x96.png
- /favicon.ico
- /guides/what-are-nellai-meals/
- /menu/
- /menu/#beverages
- /menu/#breads
- /menu/#combos
- /menu/#dosa
- /menu/#gravies
- /menu/#idiyappam
- /menu/#idly
- /menu/#parotta
- /menu/#rice
- /menu/#signatures
- /menu/#starters
- /menu/dosa/
- /menu/nellai-meals/
- /privacy/
- /reserve-table/
- /seasonal/karthigai-ayyappa-pure-veg/
- /site.webmanifest
- /small-function-catering-chennai/
- /small-function-catering-chennai/#menu-for-50-guests
- /veg-dinner-anna-nagar/
- /whats-new/

### /catering-services-chennai/

| Field | Baseline |
| --- | --- |
| Title | Pure Veg Wedding & Event Caterers in Chennai | Brihadhee |
| Meta description | Pure vegetarian wedding and event caterers in Chennai, based in Anna Nagar East: regional South Indian menus, live counters and per-plate quotes. |
| H1 | Pure Vegetarian Event and Wedding Catering in Chennai |
| Canonical | https://www.brihadhee.com/catering-services-chennai/ |
| Indexable | True |
| Schema | Restaurant, WebSite, WebPage, BreadcrumbList, Service, FAQPage, Service |
| Main text word count | 1444 |
| Images and alt coverage | 4 images, 0 missing alt attributes, 0 missing dimensions |

Internal destinations

- /
- /#careers
- /#top
- /_astro/fraunces-latin.DihXLNYH.woff2
- /_astro/instrument-sans-latin.BbzFLZTg.woff2
- /about/
- /about/#facts
- /apple-touch-icon.png
- /book-a-table/
- /catering-quote-chennai/
- /catering-quote-chennai/#what-to-send
- /catering-services-chennai/
- /corporate-catering-chennai/
- /event-planner-catering-partner/
- /family-dining-anna-nagar/
- /faq/
- /favicon-96x96.png
- /favicon.ico
- /guides/what-are-nellai-meals/
- /menu/
- /menu/#beverages
- /menu/#breads
- /menu/#combos
- /menu/#dosa
- /menu/#gravies
- /menu/#idiyappam
- /menu/#idly
- /menu/#parotta
- /menu/#rice
- /menu/#signatures
- /menu/#starters
- /menu/dosa/
- /menu/nellai-meals/
- /privacy/
- /reserve-table/
- /seasonal/karthigai-ayyappa-pure-veg/
- /site.webmanifest
- /small-function-catering-chennai/
- /veg-dinner-anna-nagar/
- /whats-new/

### /corporate-catering-chennai/

| Field | Baseline |
| --- | --- |
| Title | Pure Veg Corporate Catering in Chennai | Brihadhee |
| Meta description | Pure vegetarian office lunch catering, bulk meals and recurring employee meal programmes in Chennai. Share your office location and headcount for a quote. |
| H1 | Pure Vegetarian Corporate Catering and Office Lunches in Chennai |
| Canonical | https://www.brihadhee.com/corporate-catering-chennai/ |
| Indexable | True |
| Schema | Restaurant, WebSite, WebPage, BreadcrumbList, Service, FAQPage, Service |
| Main text word count | 2482 |
| Images and alt coverage | 32 images, 0 missing alt attributes, 26 missing dimensions |

Internal destinations

- /
- /#careers
- /#coffee-bar
- /#top
- /_astro/fraunces-latin.DihXLNYH.woff2
- /_astro/instrument-sans-latin.BbzFLZTg.woff2
- /about/
- /about/#facts
- /apple-touch-icon.png
- /book-a-table/
- /catering-quote-chennai/
- /catering-services-chennai/
- /corporate-catering-chennai/
- /event-planner-catering-partner/
- /family-dining-anna-nagar/
- /faq/
- /favicon-96x96.png
- /favicon.ico
- /guides/what-are-nellai-meals/
- /menu/
- /menu/#beverages
- /menu/#breads
- /menu/#combos
- /menu/#dosa
- /menu/#gravies
- /menu/#idiyappam
- /menu/#idly
- /menu/#parotta
- /menu/#rice
- /menu/#signatures
- /menu/#starters
- /menu/dosa/
- /menu/nellai-meals/
- /privacy/
- /reserve-table/
- /seasonal/karthigai-ayyappa-pure-veg/
- /site.webmanifest
- /small-function-catering-chennai/
- /veg-dinner-anna-nagar/
- /whats-new/

### /event-planner-catering-partner/

| Field | Baseline |
| --- | --- |
| Title | Catering Partner for Event Planners in Chennai | Brihadhee |
| Meta description | Plan pure vegetarian menus and white-label or co-branded live counters for Chennai events with Brihadhee. Send your agency's event brief. |
| H1 | Catering Partner for Event Planners in Chennai |
| Canonical | https://www.brihadhee.com/event-planner-catering-partner/ |
| Indexable | True |
| Schema | Restaurant, WebSite, WebPage, BreadcrumbList, Service, FAQPage, Service |
| Main text word count | 801 |
| Images and alt coverage | 4 images, 0 missing alt attributes, 0 missing dimensions |

Internal destinations

- /
- /#careers
- /#top
- /_astro/fraunces-latin.DihXLNYH.woff2
- /_astro/instrument-sans-latin.BbzFLZTg.woff2
- /about/
- /about/#facts
- /apple-touch-icon.png
- /book-a-table/
- /catering-quote-chennai/
- /catering-services-chennai/
- /corporate-catering-chennai/
- /event-planner-catering-partner/
- /family-dining-anna-nagar/
- /faq/
- /favicon-96x96.png
- /favicon.ico
- /guides/what-are-nellai-meals/
- /menu/
- /menu/#beverages
- /menu/#breads
- /menu/#combos
- /menu/#dosa
- /menu/#gravies
- /menu/#idiyappam
- /menu/#idly
- /menu/#parotta
- /menu/#rice
- /menu/#signatures
- /menu/#starters
- /menu/dosa/
- /menu/nellai-meals/
- /privacy/
- /reserve-table/
- /seasonal/karthigai-ayyappa-pure-veg/
- /site.webmanifest
- /small-function-catering-chennai/
- /veg-dinner-anna-nagar/
- /whats-new/

### /family-dining-anna-nagar/

| Field | Baseline |
| --- | --- |
| Title | Pure Veg Family Restaurant in Anna Nagar | Brihadhee |
| Meta description | Plan a vegetarian family lunch, birthday or anniversary dinner at Brihadhee in Anna Nagar East. View the menu and call ahead for group seating. |
| H1 | A Pure Veg Family Restaurant in Anna Nagar East |
| Canonical | https://www.brihadhee.com/family-dining-anna-nagar/ |
| Indexable | True |
| Schema | Restaurant, WebSite, WebPage, BreadcrumbList, FAQPage |
| Main text word count | 761 |
| Images and alt coverage | 2 images, 0 missing alt attributes, 0 missing dimensions |

Internal destinations

- /
- /#careers
- /#top
- /_astro/fraunces-latin.DihXLNYH.woff2
- /_astro/instrument-sans-latin.BbzFLZTg.woff2
- /about/
- /about/#facts
- /about/#find-us
- /apple-touch-icon.png
- /book-a-table/
- /catering-quote-chennai/
- /catering-services-chennai/
- /corporate-catering-chennai/
- /event-planner-catering-partner/
- /family-dining-anna-nagar/
- /faq/
- /favicon-96x96.png
- /favicon.ico
- /guides/what-are-nellai-meals/
- /menu/
- /menu/#beverages
- /menu/#breads
- /menu/#combos
- /menu/#dosa
- /menu/#gravies
- /menu/#idiyappam
- /menu/#idly
- /menu/#parotta
- /menu/#rice
- /menu/#signatures
- /menu/#starters
- /menu/dosa/
- /menu/nellai-meals/
- /privacy/
- /reserve-table/
- /seasonal/karthigai-ayyappa-pure-veg/
- /site.webmanifest
- /small-function-catering-chennai/
- /veg-dinner-anna-nagar/
- /whats-new/

### /faq/

| Field | Baseline |
| --- | --- |
| Title | Brihadhee FAQ: Timings, Dosa, Catering | Anna Nagar |
| Meta description | Answers about Brihadhee, the pure veg South Indian restaurant in Anna Nagar East: lunch and dinner only, 11 AM to 11 PM, dosa, catering and bookings. |
| H1 | Brihadhee Questions and Answers |
| Canonical | https://www.brihadhee.com/faq/ |
| Indexable | True |
| Schema | Restaurant, WebSite, WebPage, BreadcrumbList, FAQPage |
| Main text word count | 605 |
| Images and alt coverage | 2 images, 0 missing alt attributes, 0 missing dimensions |

Internal destinations

- /
- /#careers
- /#faq
- /#top
- /_astro/fraunces-latin.DihXLNYH.woff2
- /_astro/instrument-sans-latin.BbzFLZTg.woff2
- /about/
- /about/#facts
- /about/#faq
- /apple-touch-icon.png
- /book-a-table/
- /book-a-table/#how-to-book
- /catering-quote-chennai/
- /catering-quote-chennai/#faq
- /catering-services-chennai/
- /catering-services-chennai/#faq
- /corporate-catering-chennai/
- /corporate-catering-chennai/#faq
- /event-planner-catering-partner/
- /family-dining-anna-nagar/
- /family-dining-anna-nagar/#faq
- /faq/
- /favicon-96x96.png
- /favicon.ico
- /guides/what-are-nellai-meals/
- /guides/what-are-nellai-meals/#what-are-nellai-meals
- /menu/
- /menu/#beverages
- /menu/#breads
- /menu/#combos
- /menu/#dosa
- /menu/#faq
- /menu/#gravies
- /menu/#idiyappam
- /menu/#idly
- /menu/#parotta
- /menu/#rice
- /menu/#signatures
- /menu/#starters
- /menu/dosa/
- /menu/dosa/#faq
- /menu/nellai-meals/
- /menu/nellai-meals/#faq
- /parotta-anna-nagar/#faq
- /privacy/
- /reserve-table/
- /seasonal/karthigai-ayyappa-pure-veg/
- /site.webmanifest
- /small-function-catering-chennai/
- /small-function-catering-chennai/#faq
- /veg-dinner-anna-nagar/
- /veg-dinner-anna-nagar/#faq
- /whats-new/

### /guides/what-are-nellai-meals/

| Field | Baseline |
| --- | --- |
| Title | What Are Nellai Meals? Sodhi, Ulundhu Kali, Tirunelveli Food |
| Meta description | What are Nellai meals? A guide to sodhi, ulundhu kali, idiyappam and Tirunelveli food, and where to eat a Nellai meal in Chennai at Brihadhee. |
| H1 | What Are Nellai Meals? A Guide to Sodhi, Ulundhu Kali and Tirunelveli Food |
| Canonical | https://www.brihadhee.com/guides/what-are-nellai-meals/ |
| Indexable | True |
| Schema | Restaurant, WebSite, WebPage, BreadcrumbList, Article |
| Main text word count | 1016 |
| Images and alt coverage | 3 images, 0 missing alt attributes, 0 missing dimensions |

Internal destinations

- /
- /#careers
- /#top
- /_astro/fraunces-latin.DihXLNYH.woff2
- /_astro/instrument-sans-latin.BbzFLZTg.woff2
- /about/
- /about/#facts
- /about/#find-us
- /apple-touch-icon.png
- /book-a-table/
- /catering-quote-chennai/
- /catering-services-chennai/
- /corporate-catering-chennai/
- /event-planner-catering-partner/
- /family-dining-anna-nagar/
- /faq/
- /favicon-96x96.png
- /favicon.ico
- /guides/what-are-nellai-meals/
- /menu/
- /menu/#beverages
- /menu/#breads
- /menu/#combos
- /menu/#dosa
- /menu/#gravies
- /menu/#idiyappam
- /menu/#idly
- /menu/#parotta
- /menu/#rice
- /menu/#signatures
- /menu/#starters
- /menu/dosa/
- /menu/nellai-meals/
- /privacy/
- /reserve-table/
- /seasonal/karthigai-ayyappa-pure-veg/
- /site.webmanifest
- /small-function-catering-chennai/
- /veg-dinner-anna-nagar/
- /whats-new/

### /

| Field | Baseline |
| --- | --- |
| Title | Brihadhee | Pure Veg South Indian Restaurant, Anna Nagar |
| Meta description | Brihadhee, Anna Nagar East: pure veg South Indian lunch and dinner, customized dosa and Nellai meals. Open 11 AM–11 PM daily. See menu or book a table. |
| H1 | Brihadhee : Pure Veg South Indian Restaurant in Anna Nagar East |
| Canonical | https://www.brihadhee.com/ |
| Indexable | True |
| Schema | Restaurant, WebSite, WebPage, FAQPage, Service |
| Main text word count | 2637 |
| Images and alt coverage | 18 images, 0 missing alt attributes, 0 missing dimensions |

Internal destinations

- /
- /_astro/fraunces-latin.DihXLNYH.woff2
- /_astro/instrument-sans-latin.BbzFLZTg.woff2
- /about/
- /about/#enquiry
- /about/#facts
- /about/#find-us
- /about/#story
- /apple-touch-icon.png
- /book-a-table/
- /catering-quote-chennai/
- /catering-services-chennai/
- /corporate-catering-chennai/
- /corporate-catering-chennai/#coffee-bar
- /event-planner-catering-partner/
- /family-dining-anna-nagar/
- /faq/
- /favicon-96x96.png
- /favicon.ico
- /guides/what-are-nellai-meals/
- /menu/
- /menu/#beverages
- /menu/#breads
- /menu/#combos
- /menu/#dosa
- /menu/#gravies
- /menu/#idiyappam
- /menu/#idly
- /menu/#parotta
- /menu/#rice
- /menu/#signatures
- /menu/#starters
- /menu/dosa/
- /menu/nellai-meals/
- /parotta-anna-nagar/
- /privacy/
- /reserve-table/
- /seasonal/karthigai-ayyappa-pure-veg/
- /site.webmanifest
- /small-function-catering-chennai/
- /veg-dinner-anna-nagar/
- /whats-new/

### /menu/dosa/

| Field | Baseline |
| --- | --- |
| Title | Build Your Own Dosa in Chennai | Brihadhee, Anna Nagar |
| Meta description | Choose your batter, roast, fillings and podi, and we cook your dosa your way. Build your own dosa at Brihadhee, Anna Nagar. Lunch and dinner daily. |
| H1 | Build Your Own Dosa at Brihadhee, Anna Nagar |
| Canonical | https://www.brihadhee.com/menu/dosa/ |
| Indexable | True |
| Schema | Restaurant, WebSite, WebPage, BreadcrumbList, FAQPage |
| Main text word count | 1637 |
| Images and alt coverage | 3 images, 0 missing alt attributes, 0 missing dimensions |

Internal destinations

- /
- /#careers
- /#top
- /_astro/fraunces-latin.DihXLNYH.woff2
- /_astro/instrument-sans-latin.BbzFLZTg.woff2
- /about/
- /about/#facts
- /about/#find-us
- /apple-touch-icon.png
- /book-a-table/
- /catering-quote-chennai/
- /catering-services-chennai/
- /corporate-catering-chennai/
- /event-planner-catering-partner/
- /family-dining-anna-nagar/
- /faq/
- /favicon-96x96.png
- /favicon.ico
- /guides/what-are-nellai-meals/
- /menu/
- /menu/#beverages
- /menu/#breads
- /menu/#combos
- /menu/#dosa
- /menu/#gravies
- /menu/#idiyappam
- /menu/#idly
- /menu/#parotta
- /menu/#rice
- /menu/#signatures
- /menu/#starters
- /menu/dosa/
- /menu/nellai-meals/
- /parotta-anna-nagar/
- /privacy/
- /reserve-table/
- /seasonal/karthigai-ayyappa-pure-veg/
- /site.webmanifest
- /small-function-catering-chennai/
- /veg-dinner-anna-nagar/
- /whats-new/

### /menu/

| Field | Baseline |
| --- | --- |
| Title | Brihadhee Menu and Prices | Pure Veg, Anna Nagar East |
| Meta description | Brihadhee menu with prices: build your own dosa, 8 classic dosas, Nellai meals, parotta and filter coffee. Lunch and dinner, 11 AM to 11 PM daily. |
| H1 | Brihadhee Menu and Prices |
| Canonical | https://www.brihadhee.com/menu/ |
| Indexable | True |
| Schema | Restaurant, WebSite, WebPage, BreadcrumbList, Menu, FAQPage |
| Main text word count | 1898 |
| Images and alt coverage | 2 images, 0 missing alt attributes, 0 missing dimensions |

Internal destinations

- /
- /#careers
- /#coffee-bar
- /#top
- /_astro/fraunces-latin.DihXLNYH.woff2
- /_astro/instrument-sans-latin.BbzFLZTg.woff2
- /about/
- /about/#facts
- /about/#find-us
- /apple-touch-icon.png
- /book-a-table/
- /catering-quote-chennai/
- /catering-services-chennai/
- /corporate-catering-chennai/
- /event-planner-catering-partner/
- /family-dining-anna-nagar/
- /faq/
- /favicon-96x96.png
- /favicon.ico
- /guides/what-are-nellai-meals/
- /menu/
- /menu/#beverages
- /menu/#breads
- /menu/#combos
- /menu/#dosa
- /menu/#gravies
- /menu/#idiyappam
- /menu/#idly
- /menu/#parotta
- /menu/#rice
- /menu/#signatures
- /menu/#starters
- /menu/dosa/
- /menu/nellai-meals/
- /parotta-anna-nagar/
- /privacy/
- /reserve-table/
- /seasonal/karthigai-ayyappa-pure-veg/
- /site.webmanifest
- /small-function-catering-chennai/
- /veg-dinner-anna-nagar/
- /whats-new/

### /menu/nellai-meals/

| Field | Baseline |
| --- | --- |
| Title | Veg Lunch & Nellai Meals in Anna Nagar | Brihadhee |
| Meta description | See prices for Nellai Special Sodhi Meals, Tamil Nadu meals and dine-in lunch combos at Brihadhee, Anna Nagar East. Lunch starts at 11 AM daily. |
| H1 | Veg Lunch and Nellai Meals in Anna Nagar |
| Canonical | https://www.brihadhee.com/menu/nellai-meals/ |
| Indexable | True |
| Schema | Restaurant, WebSite, WebPage, BreadcrumbList, FAQPage |
| Main text word count | 984 |
| Images and alt coverage | 3 images, 0 missing alt attributes, 0 missing dimensions |

Internal destinations

- /
- /#careers
- /#top
- /_astro/fraunces-latin.DihXLNYH.woff2
- /_astro/instrument-sans-latin.BbzFLZTg.woff2
- /about/
- /about/#facts
- /about/#find-us
- /apple-touch-icon.png
- /book-a-table/
- /catering-quote-chennai/
- /catering-services-chennai/
- /corporate-catering-chennai/
- /event-planner-catering-partner/
- /family-dining-anna-nagar/
- /faq/
- /favicon-96x96.png
- /favicon.ico
- /guides/what-are-nellai-meals/
- /menu/
- /menu/#beverages
- /menu/#breads
- /menu/#combos
- /menu/#dosa
- /menu/#gravies
- /menu/#idiyappam
- /menu/#idly
- /menu/#lunch
- /menu/#parotta
- /menu/#rice
- /menu/#signatures
- /menu/#starters
- /menu/dosa/
- /menu/nellai-meals/
- /privacy/
- /reserve-table/
- /seasonal/karthigai-ayyappa-pure-veg/
- /site.webmanifest
- /small-function-catering-chennai/
- /veg-dinner-anna-nagar/
- /whats-new/

### /parotta-anna-nagar/

| Field | Baseline |
| --- | --- |
| Title | Vegetarian Parotta in Anna Nagar | Brihadhee Chennai |
| Meta description | Explore Paanai Parotta, veg kothu parotta and vegetarian salna at Brihadhee, Anna Nagar East. See menu prices, daily hours and directions near Anna Tower. |
| H1 | Vegetarian Parotta in Anna Nagar |
| Canonical | https://www.brihadhee.com/parotta-anna-nagar/ |
| Indexable | True |
| Schema | Restaurant, WebSite, WebPage, BreadcrumbList, ItemList, FAQPage |
| Main text word count | 643 |
| Images and alt coverage | 2 images, 0 missing alt attributes, 0 missing dimensions |

Internal destinations

- /
- /#careers
- /#top
- /_astro/fraunces-latin.DihXLNYH.woff2
- /_astro/instrument-sans-latin.BbzFLZTg.woff2
- /about/
- /about/#facts
- /about/#find-us
- /apple-touch-icon.png
- /book-a-table/
- /catering-quote-chennai/
- /catering-services-chennai/
- /corporate-catering-chennai/
- /event-planner-catering-partner/
- /family-dining-anna-nagar/
- /faq/
- /favicon-96x96.png
- /favicon.ico
- /guides/what-are-nellai-meals/
- /menu/
- /menu/#beverages
- /menu/#breads
- /menu/#combos
- /menu/#dosa
- /menu/#gravies
- /menu/#idiyappam
- /menu/#idly
- /menu/#parotta
- /menu/#rice
- /menu/#signatures
- /menu/#starters
- /menu/dosa/
- /menu/nellai-meals/
- /privacy/
- /reserve-table/
- /seasonal/karthigai-ayyappa-pure-veg/
- /site.webmanifest
- /small-function-catering-chennai/
- /veg-dinner-anna-nagar/
- /whats-new/

### /privacy/

| Field | Baseline |
| --- | --- |
| Title | Privacy Policy | Brihadhee, Anna Nagar East |
| Meta description | How the Brihadhee website handles your data: no accounts, no stored enquiries, optional Google Analytics and Meta Pixel, and linked third-party services. |
| H1 | Privacy policy |
| Canonical | https://www.brihadhee.com/privacy/ |
| Indexable | False |
| Schema | Restaurant, WebSite, WebPage, BreadcrumbList |
| Main text word count | 181 |
| Images and alt coverage | 2 images, 0 missing alt attributes, 0 missing dimensions |

Internal destinations

- /
- /#careers
- /#top
- /_astro/fraunces-latin.DihXLNYH.woff2
- /_astro/instrument-sans-latin.BbzFLZTg.woff2
- /about/
- /about/#facts
- /apple-touch-icon.png
- /book-a-table/
- /catering-quote-chennai/
- /catering-services-chennai/
- /corporate-catering-chennai/
- /event-planner-catering-partner/
- /family-dining-anna-nagar/
- /faq/
- /favicon-96x96.png
- /favicon.ico
- /guides/what-are-nellai-meals/
- /menu/
- /menu/#beverages
- /menu/#breads
- /menu/#combos
- /menu/#dosa
- /menu/#gravies
- /menu/#idiyappam
- /menu/#idly
- /menu/#parotta
- /menu/#rice
- /menu/#signatures
- /menu/#starters
- /menu/dosa/
- /menu/nellai-meals/
- /privacy/
- /reserve-table/
- /seasonal/karthigai-ayyappa-pure-veg/
- /site.webmanifest
- /small-function-catering-chennai/
- /veg-dinner-anna-nagar/
- /whats-new/

### /reserve-table/

| Field | Baseline |
| --- | --- |
| Title | Reserve a Table | Brihadhee, Anna Nagar East |
| Meta description | Pick a date and time to reserve a table at Brihadhee, the pure veg South Indian restaurant in Anna Nagar East, Chennai. |
| H1 | Reserve your table |
| Canonical | https://www.brihadhee.com/reserve-table/ |
| Indexable | False |
| Schema | Restaurant, WebSite, WebPage, BreadcrumbList |
| Main text word count | 114 |
| Images and alt coverage | 0 images, 0 missing alt attributes, 0 missing dimensions |

Internal destinations

- /_astro/fraunces-latin.DihXLNYH.woff2
- /_astro/instrument-sans-latin.BbzFLZTg.woff2
- /apple-touch-icon.png
- /favicon-96x96.png
- /favicon.ico
- /reserve-table/tables/
- /site.webmanifest

### /reserve-table/tables/

| Field | Baseline |
| --- | --- |
| Title | Choose Your Seats | Brihadhee, Anna Nagar East |
| Meta description | Choose your seats on the floor plan and confirm your booking at Brihadhee, Anna Nagar East, Chennai. |
| H1 | Choose your seats |
| Canonical | https://www.brihadhee.com/reserve-table/tables/ |
| Indexable | False |
| Schema | Restaurant, WebSite, WebPage, BreadcrumbList |
| Main text word count | 164 |
| Images and alt coverage | 0 images, 0 missing alt attributes, 0 missing dimensions |

Internal destinations

- /_astro/fraunces-latin.DihXLNYH.woff2
- /_astro/instrument-sans-latin.BbzFLZTg.woff2
- /apple-touch-icon.png
- /favicon-96x96.png
- /favicon.ico
- /reserve-table/
- /site.webmanifest

### /seasonal/karthigai-ayyappa-pure-veg/

| Field | Baseline |
| --- | --- |
| Title | Karthigai & Ayyappa Mala Pure Veg Food, Chennai | Brihadhee |
| Meta description | Plan a pure veg lunch or dinner for Karthigai and Ayyappa mala at Brihadhee in Anna Nagar East, Chennai. See the menu and opening hours. |
| H1 | Pure Veg Food for Karthigai and Ayyappa Mala in Chennai |
| Canonical | https://www.brihadhee.com/seasonal/karthigai-ayyappa-pure-veg/ |
| Indexable | True |
| Schema | Restaurant, WebSite, WebPage, BreadcrumbList, FAQPage |
| Main text word count | 576 |
| Images and alt coverage | 3 images, 0 missing alt attributes, 0 missing dimensions |

Internal destinations

- /
- /#careers
- /#top
- /_astro/fraunces-latin.DihXLNYH.woff2
- /_astro/instrument-sans-latin.BbzFLZTg.woff2
- /about/
- /about/#facts
- /apple-touch-icon.png
- /book-a-table/
- /catering-quote-chennai/
- /catering-services-chennai/
- /corporate-catering-chennai/
- /event-planner-catering-partner/
- /family-dining-anna-nagar/
- /faq/
- /favicon-96x96.png
- /favicon.ico
- /guides/what-are-nellai-meals/
- /menu/
- /menu/#beverages
- /menu/#breads
- /menu/#combos
- /menu/#dosa
- /menu/#gravies
- /menu/#idiyappam
- /menu/#idly
- /menu/#parotta
- /menu/#rice
- /menu/#signatures
- /menu/#starters
- /menu/dosa/
- /menu/nellai-meals/
- /privacy/
- /reserve-table/
- /seasonal/karthigai-ayyappa-pure-veg/
- /site.webmanifest
- /small-function-catering-chennai/
- /veg-dinner-anna-nagar/
- /whats-new/

### /small-function-catering-chennai/

| Field | Baseline |
| --- | --- |
| Title | Small Function Catering in Chennai, 50+ Guests | Brihadhee |
| Meta description | Pure vegetarian catering for birthdays, housewarmings and family gatherings in Chennai from 50 guests. Share your date, venue and headcount. |
| H1 | Small Function Catering in Chennai, From 50 Guests |
| Canonical | https://www.brihadhee.com/small-function-catering-chennai/ |
| Indexable | True |
| Schema | Restaurant, WebSite, WebPage, BreadcrumbList, Service, FAQPage, Service |
| Main text word count | 1182 |
| Images and alt coverage | 2 images, 0 missing alt attributes, 0 missing dimensions |

Internal destinations

- /
- /#careers
- /#top
- /_astro/fraunces-latin.DihXLNYH.woff2
- /_astro/instrument-sans-latin.BbzFLZTg.woff2
- /about/
- /about/#facts
- /apple-touch-icon.png
- /book-a-table/
- /catering-quote-chennai/
- /catering-quote-chennai/#enquiry
- /catering-quote-chennai/#price-factors
- /catering-quote-chennai/#what-to-send
- /catering-services-chennai/
- /catering-services-chennai/#live-dosa-counter
- /corporate-catering-chennai/
- /event-planner-catering-partner/
- /family-dining-anna-nagar/
- /faq/
- /favicon-96x96.png
- /favicon.ico
- /guides/what-are-nellai-meals/
- /menu/
- /menu/#beverages
- /menu/#breads
- /menu/#combos
- /menu/#dosa
- /menu/#gravies
- /menu/#idiyappam
- /menu/#idly
- /menu/#parotta
- /menu/#rice
- /menu/#signatures
- /menu/#starters
- /menu/dosa/
- /menu/nellai-meals/
- /menu/nellai-meals/#sodhi-meals
- /privacy/
- /reserve-table/
- /seasonal/karthigai-ayyappa-pure-veg/
- /site.webmanifest
- /small-function-catering-chennai/
- /veg-dinner-anna-nagar/
- /whats-new/

### /veg-dinner-anna-nagar/

| Field | Baseline |
| --- | --- |
| Title | Veg Dinner in Anna Nagar, Open Till 11 PM | Brihadhee |
| Meta description | Plan a vegetarian dinner at Brihadhee, Anna Nagar East, with Paanai Parotta, dosa or idiyappam. Open until 11 PM daily. Call ahead if arriving late. |
| H1 | Vegetarian Dinner in Anna Nagar, Open Till 11 PM |
| Canonical | https://www.brihadhee.com/veg-dinner-anna-nagar/ |
| Indexable | True |
| Schema | Restaurant, WebSite, WebPage, BreadcrumbList, FAQPage |
| Main text word count | 736 |
| Images and alt coverage | 3 images, 0 missing alt attributes, 0 missing dimensions |

Internal destinations

- /
- /#careers
- /#top
- /_astro/fraunces-latin.DihXLNYH.woff2
- /_astro/instrument-sans-latin.BbzFLZTg.woff2
- /about/
- /about/#facts
- /about/#find-us
- /apple-touch-icon.png
- /book-a-table/
- /catering-quote-chennai/
- /catering-services-chennai/
- /corporate-catering-chennai/
- /event-planner-catering-partner/
- /family-dining-anna-nagar/
- /faq/
- /favicon-96x96.png
- /favicon.ico
- /guides/what-are-nellai-meals/
- /menu/
- /menu/#beverages
- /menu/#breads
- /menu/#combos
- /menu/#dosa
- /menu/#gravies
- /menu/#idiyappam
- /menu/#idly
- /menu/#parotta
- /menu/#rice
- /menu/#signatures
- /menu/#starters
- /menu/dosa/
- /menu/nellai-meals/
- /parotta-anna-nagar/
- /privacy/
- /reserve-table/
- /seasonal/karthigai-ayyappa-pure-veg/
- /site.webmanifest
- /small-function-catering-chennai/
- /veg-dinner-anna-nagar/
- /whats-new/

### /whats-new/

| Field | Baseline |
| --- | --- |
| Title | What's New at Brihadhee — November 2026 | Anna Nagar |
| Meta description | Build-your-own dosa, Nellai Special Sodhi Meals for lunch, dinner until 11 PM and 1,000+ corporate meals a day: what's new at Brihadhee, Anna Nagar. |
| H1 | What's New at Brihadhee — November 2026 |
| Canonical | https://www.brihadhee.com/whats-new/ |
| Indexable | True |
| Schema | Restaurant, WebSite, WebPage, BreadcrumbList, Article, FAQPage |
| Main text word count | 359 |
| Images and alt coverage | 3 images, 0 missing alt attributes, 0 missing dimensions |

Internal destinations

- /
- /#careers
- /#top
- /_astro/fraunces-latin.DihXLNYH.woff2
- /_astro/instrument-sans-latin.BbzFLZTg.woff2
- /about/
- /about/#facts
- /apple-touch-icon.png
- /book-a-table/
- /catering-quote-chennai/
- /catering-services-chennai/
- /corporate-catering-chennai/
- /event-planner-catering-partner/
- /family-dining-anna-nagar/
- /faq/
- /favicon-96x96.png
- /favicon.ico
- /guides/what-are-nellai-meals/
- /menu/
- /menu/#beverages
- /menu/#breads
- /menu/#combos
- /menu/#dosa
- /menu/#gravies
- /menu/#idiyappam
- /menu/#idly
- /menu/#parotta
- /menu/#rice
- /menu/#signatures
- /menu/#starters
- /menu/dosa/
- /menu/nellai-meals/
- /privacy/
- /reserve-table/
- /seasonal/karthigai-ayyappa-pure-veg/
- /site.webmanifest
- /small-function-catering-chennai/
- /veg-dinner-anna-nagar/
- /whats-new/

## Rules and limits

Historical reports, research keyword exclusions, rule lists and test fixtures are evidence or enforcement data. They are scanned during remediation but are not customer-facing targeting. New output and all publishable text must follow the current owner brief.

The repository contains established fact guards. Update the outdated approvals at their source and keep protection against invented menu ingredients, parking, dietary guarantees and review statistics.

Google documents ordinary SEO eligibility for AI features without additional AI-specific requirements. The requested llms.txt is an optional business summary, and FAQ markup represents visible answers without a promised rich result or citation.

Sources reviewed on 23 November 2026

- [Google AI features](https://developers.google.com/search/docs/appearance/ai-features)
- [Google local business markup](https://developers.google.com/search/docs/appearance/structured-data/local-business)
- [Google review guidance](https://support.google.com/business/answer/3474122)


## Completed mobile Lighthouse baseline

These runs used Lighthouse in headless Chrome against compressed local static output. Each route was measured once. Source files had begun changing, while dist still contained the unmodified baseline build. Earlier incomplete local-server attempts were discarded.

| Route | Performance | Accessibility | SEO |
| --- | --- | --- | --- |
| / | 91 | 100 | 100 |
| /menu/ | 98 | 100 | 100 |
| /menu/dosa/ | 98 | 100 | 100 |
| /corporate-catering-chennai/ | 97 | 100 | 100 |
| /catering-services-chennai/ | 97 | 97 | 100 |
| /about/ | 79 | 100 | 100 |

The location page's initial viewport triggered the Google Maps embed before it was needed, loading several external map scripts. Defer that embed until its container approaches the viewport and preserve a no-JavaScript map fallback. Relevant source before changes is src/pages/about.astro line 100.
