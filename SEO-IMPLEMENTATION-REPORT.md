# Brihadhee SEO, AEO and GEO implementation

Prepared 23 November 2026. Changes are local in this repository and ready for the owner's release review.

## Outcome

The final site has 23 HTML pages and 19 indexable routes. The new dietary page uses the existing /no-onion-no-garlic-anna-nagar/ route. It contains more than 1,000 words of ordering and preparation guidance, six matching FAQs and contextual menu, family-dining and catering links. Home, menu, custom dosa, corporate, event and location pages retain their established URLs and design.

The site already had static rendering, unique metadata, a full HTML menu, responsive WebP food images, local fonts, linked schema, generated sitemaps and robots rules. These were verified and extended. An explicit brand Organization is now linked to the Restaurant. Every indexable route has one H1, a canonical on https://www.brihadhee.com and metadata within the requested lengths.

No-garlic requests and no-onion options where available follow the new owner brief. The page helps guests confirm ingredients and preparation for their own order. Exact dishes and kitchen procedures await owner inputs.

## Changes by file

| File | Result |
| --- | --- |
| AUDIT.md | Pre-change stack, all 22 original HTML routes, metadata, schema, image and internal-link inventory, impact-ranked findings and baseline scores. |
| Keys.md | New keyword source from 457 eligible rows in the 845-row existing tracker, with approved dietary audience additions and identity fields. |
| CLAUDE.md | Current owner approvals recorded alongside remaining operational fact restrictions. |
| astro.config.mjs | Explicit trailing-slash convention for existing static routes. |
| config/seo-gates.ts | Approved dietary guidance and quality positioning, recipe TODOs and revised dining-schedule FAQ. |
| package.json | Added npm run lint using the existing repository checks. |
| scripts/validate-schema.js | Read identity from tracked Keys.md, retaining the legacy local brief fallback. |
| scripts/verify-seo-compliance.ts | Permit dietary guidance while exact recipes are pending and enforce the expanded positioning exclusion. |
| src/components/About.astro | Quality-focused regional food copy and dietary guidance link. |
| src/components/ClientLogos.astro | Intrinsic dimensions for all supplied client logos, including the repeated animation strip. |
| src/components/Hero.astro | Shared responsive image sizing with the preload. |
| src/components/LocationMap.astro | Map loaded near the viewport with an embedded no-JavaScript fallback. |
| src/data/entity-truth.ts | Recorded owner-approved dietary scope and strengthened the positioning guard. |
| src/data/menu-canonical.ts | Explicit owner TODO for the 32 missing dish descriptions. |
| src/data/pages.js | Corporate scale in home quick facts, thousands of dosa combinations and scoped seasonal dietary guidance. |
| src/data/site.js | Shared hero image sizes, actual content-revision dates and dietary navigation labels. |
| src/data/spokes.js | Live dietary guide with six matching FAQ answers, plus revised meal-period wording. |
| src/layouts/Base.astro | Responsive LCP image preload using the visible image's source selection. |
| src/lib/llms.js | Dietary summary and discovery link in the generated reference files. |
| src/lib/schema.js | Linked Organization and Restaurant entities with stable IDs and known business details. |
| src/pages/about.astro | Dietary planning link, template-based deferred map while retaining complete static HTML. |
| src/pages/index.astro | Responsive hero preload passed to the shared layout. |
| src/pages/menu.astro | Visible dietary request guidance and link. |
| docs/seo/client-confirmations.md | Recorded the 23 November owner brief as the source for new approvals. |
| docs/seo/aeo-lint-report.md | Regenerated visible-answer and schema-parity results. |
| docs/seo/internal-link-matrix.md | Regenerated matrix including dietary guidance and new contextual links. |
| seo-profile/gbp-profile.md | 601-character description, categories, services, attributes, hours, 20 Q&A pairs, all 80 current dishes and custom dosa options, and 12 weekly posts. |
| seo-profile/gbp-photos-checklist.md | 20 original-photo shots with filenames and website alt suggestions. |
| seo-profile/review-strategy.md | Ethical WhatsApp, SMS, QR card and catering requests with reply templates. |
| seo-profile/citations.md | Canonical NAP and prioritised Indian, Chennai, map and restaurant listing actions. |
| seo-profile/outreach.md | Food writer, community, corporate and planner email drafts. |
| seo-profile/content-calendar.md | 12 keyword-aligned editorial assignments with owning routes and evidence requirements. |

## Mobile Lighthouse before and after

Both phases use the same Lighthouse installation, fresh headless Chrome sessions, mobile simulation and a compressed local static preview. Baseline measurements used the unmodified built output. These are individual lab measurements. Vercel headers, real devices, field INP and network conditions require checking after publication.

| Page | Performance before → after | Accessibility before → after | SEO before → after |
| --- | ---: | ---: | ---: |
| / | 91 → 90 | 100 → 100 | 100 → 100 |
| /menu/ | 98 → 97 | 100 → 100 | 100 → 100 |
| /menu/dosa/ | 98 → 98 | 100 → 100 | 100 → 100 |
| /corporate-catering-chennai/ | 97 → 95 | 100 → 100 | 100 → 100 |
| /catering-services-chennai/ | 97 → 96 | 97 → 97 | 100 → 100 |
| /about/ | 79 → 96 | 100 → 100 | 100 → 100 |
| /no-onion-no-garlic-anna-nagar/ | — → 99 | — → 100 | — → 100 |

The location map is instantiated when its container approaches the viewport. Its inert template avoids an initial iframe document, and the no-JavaScript fallback provides the embedded map directly.

## Validation

- npm run build passed, including every configured function, fact, schema, AEO, compliance and link check.
- npm run lint passed using the existing repository checks.
- npm test passed all 43 tests, including enquiry, reservation, schema and answer behavior.
- npm run typecheck passed.
- npm run verify passed all eight output and local HTTP preview checks.
- Schema validation parsed 145 top-level graph nodes on 23 pages, checked schema.org vocabulary and relationships, and matched visible answers and business facts.
- All 80 dishes and prices match the supplied menu and the visible HTML menu.
- Every built image has an alt attribute and explicit dimensions. The logo fix covers 26 image elements.
- The sitemap lists all 19 indexable routes with content dates. Generated robots.txt allows the requested search and training crawlers and references the sitemap index.
- llms.txt, llms-full.txt and menu.json return successfully.
- Metadata and output scans found no retired-service or disallowed positioning terms in publishable text assets.
- The six profile files were checked for existence, description length, 20 Q&A pairs, 12 weekly posts and 12 calendar assignments.

- Browser checks passed on seven routes at 390, 768 and 1440 pixels. Verified page headings, horizontal overflow, direct location fragment navigation, deferred map loading and a visible embedded map with JavaScript disabled.

## Scope decisions

Keys.md was absent. The existing 845-row keyword tracker remains the historical source. The new file uses 457 eligible rows and the current owner's dietary audience additions.

The whole repository was searched for retired terms. Historical research, archived reports, exclusions and protective scanners retain those terms in 301 lines across 56 internal files. The public build excludes them. The internal records provide evidence and regression protection.

Existing service pages already provide substantial unique content. Their copy and routes were strengthened where needed. The location page is /about/, which includes NAP, landmarks, hours, founder story and an embedded map. Additional neighbourhood landing pages would duplicate existing coverage.

Utility pages /privacy/, /reserve-table/, /reserve-table/tables/ and /404.html retain their existing noindex treatment. Existing reservation and enquiry behavior is covered by the tests.

Vercel already contains permanent redirects from the apex and legacy deployment domain to www. Platform-level HTTP-to-HTTPS behavior and live redirect chains require verification on the deployed configuration. Local Astro routes and canonical URLs were checked.

The requested llms summaries and visible FAQ markup provide machine-readable business information. Google documents ordinary SEO eligibility for its AI features. Citation placement, rankings and field Core Web Vitals were not measured by these local checks. [Google AI feature guidance](https://developers.google.com/search/docs/appearance/ai-features)

## Manual actions for the owner

1. Review the local changes and publish through the existing Vercel release workflow. Confirm the production www domain, HTTPS redirects, apex redirects, directory routes and a genuine 404 response. Confirm production has the intended indexable headers.
2. Open the existing verified Search Console property. Inspect the canonical home, menu, custom dosa, corporate, event and dietary URLs after release. Submit https://www.brihadhee.com/sitemap-index.xml and request indexing for materially changed pages.
3. Test the live mobile pages and validate deployed JSON-LD in Google's Rich Results Test and Schema Markup Validator. Check field Core Web Vitals when data is available.
4. Use seo-profile/gbp-profile.md to update the verified profile's description, categories, hours, menu source and supported attributes. Confirm holiday hours and current prices. Review the three photos previously submitted in this chat. The owner chose to manage old-photo deletion personally.
5. Claim or correct Bing, Apple Maps and restaurant directory records in the order in seo-profile/citations.md. Use the canonical main NAP and label catering contacts separately. Record confirmed public profile URLs before adding sameAs identities.
6. Replace TODO_REVIEW_LINK with the verified Google review URL, test the QR code and begin the consistent process in seo-profile/review-strategy.md.
7. Use the posts, photo checklist, outreach drafts and content calendar. Obtain permission for identifiable guests, staff and client events. Record actual results over complete reporting periods.

## Missing owner inputs

- Exact no-garlic dishes and no-onion options, ingredient lists for bases, podi, spice mixes, fillings and sides, and shared tawa and utensil arrangements. config/seo-gates.ts has an explicit TODO.
- Approved descriptions for the 32 menu items with blank descriptions. src/data/menu-canonical.ts has an explicit TODO. Known dish names and prices are available.
- Parking conditions, wheelchair access, payment methods, Wi-Fi and restroom details, plus current restaurant takeaway or delivery service.
- Holiday hours and last-order time.
- The exact Google review URL for the QR card and requests.
- Reconfirmation of the existing public email address and the FSSAI licence number if the owner wants the number published.
- Current original interior, exterior, exact-dish and event photographs with permission. The repository's interior.jpg is a placeholder.

Known domain, main phone, address, menu prices, founders, corporate scale and existing social or booking identities were reused from canonical repository data. The profile files are ready for manual use. Production publication remains an owner action.
