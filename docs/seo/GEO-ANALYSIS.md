# Brihadhee technical SEO and answer-engine audit

23 November 2026 · Implementation verified in the local Astro build. These changes are awaiting deployment.

## Findings

| Finding | Evidence and resolution |
| --- | --- |
| Temporary apex redirect | The live HTTPS apex returns **307** to the canonical www host. The repo already declares a permanent rule in `vercel.json`. The Vercel project owner should check the domain-level redirect setting and set it to **308 Permanent Redirect**. [Vercel domain redirects](https://vercel.com/docs/domains/working-with-domains/deploying-and-redirecting) · [Redirect status codes](https://vercel.com/changelog/domains-can-now-be-redirected-with-a-custom-status-code) |
| Booking information was incomplete | The site linked to its first-party seat selector, but its booking guide, FAQ, and machine-readable reference described partner bookings only. Those now explain direct reservations and partner alternatives. The live availability endpoint returned HTTP 200 for 24 November. A booking was not submitted. |
| Business and editorial attribution | The Organization node lacked a verified contact point and description. The site and article publisher now reference the stable Organization ID. The Restaurant retains its own location ID, hours, menu, and links to official profiles. Both editorial pages now show the Brihadhee byline and matching dates. |
| Search snippets and answer passages | Several indexable titles lacked the brand suffix or the requested length. Three descriptions were under 140 characters. All 19 titles are now 50–59 characters, and descriptions are 140–154 characters. Key dining, event, group, and booking sections gained more explicit answers, with the guide’s two new FAQs rendered in HTML and JSON-LD. |
| Rendering and assets | The baseline already served full static HTML and working canonicals. Both versions passed heading and internal connectivity checks. The home hero now states its eager loading explicitly and retains responsive preload and high fetch priority. The footer logo and lightbox image are lazy-loaded. The map is already lazy-loaded and third-party analytics load asynchronously when configured. |
| Crawl discovery | All 18 live sitemap URLs returned HTTP 200 with matching canonicals and no `noindex`. The four legacy path redirects returned 301 directly to their replacement URLs. The local sitemap contains 19 canonical routes, including the dietary guidance page, which returned 404 on production during this check. The generated robots file now links directly to the page sitemap and explicitly permits both Apple agents. |

The 22 November Search Console export covers 24 hours of Web search and recorded 6 clicks and 414 impressions. The query “veg restaurants in anna nagar” had 23 impressions, zero clicks, and an average position of 15.96 in that window. The export cannot establish a sustained decline or identify its cause. Bing rankings, AI citations, and platform-specific visibility were unmeasured. Google’s PageSpeed API returned HTTP 429, so field Core Web Vitals remain unverified.

## Structured data and answer-engine readiness

- The build emits one JSON-LD graph per page. Indexable pages have `Organization`, `Restaurant`, `WebSite`, `WebPage`, and `FAQPage`. The 18 indexable subpages also have breadcrumbs. The offering pages use `Service` or menu-specific entities. The Nellai guide and What’s New use `Article` and article Open Graph metadata.
- The generated [site index](https://www.brihadhee.com/llms.txt) covers all 19 local sitemap URLs, grouped into restaurant and menu, visiting and reservations, catering, and guides and updates. The [full reference](https://www.brihadhee.com/llms-full.txt) is generated from the verified facts, current menu with prices, and the visible FAQs, including the Nellai guide and dietary requests. Google documents `llms.txt` as optional for other systems. The file does not affect Google Search rankings, and Google discontinued FAQ rich results in May 2026. [llms.txt format](https://llmstxt.org/) · [Google AI search guidance](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide) · [Google Search documentation updates](https://developers.google.com/search/updates)
- Verified identity links cover the restaurant’s Google Maps listing, Instagram and published dining profiles. Citation and mention frequency on Wikipedia, Reddit, YouTube and LinkedIn were unmeasured.
- Local GEO checklist score **89/100**. The assessment allocates 22/25 to standalone answers, 19/20 to readable structure, 12/15 to supporting photos and media, 17/20 to verified identity and attribution, and 19/20 to technical accessibility. This is a code and content review, with citation and ranking performance evaluated separately.

### Generated robots access

| Agent | Local policy | Purpose |
| --- | --- | --- |
| Googlebot | Allow | Google Search and Search AI features |
| Bingbot | Allow | Bing search indexing |
| OAI-SearchBot | Allow | ChatGPT Search discovery |
| ChatGPT-User | Allow | User-initiated fetching |
| GPTBot | Allow | OpenAI model training |
| PerplexityBot | Allow | Perplexity search discovery |
| Perplexity-User | Allow | User-initiated fetching |
| Claude-SearchBot | Allow | Claude search discovery |
| Claude-User | Allow | User-initiated fetching |
| ClaudeBot | Allow | Anthropic model training |
| Google-Extended | Allow | Gemini and Vertex AI training and grounding policy |
| Applebot | Allow | Apple search and discovery |
| Applebot-Extended | Allow | Apple generative-model training policy |

These are generated robots directives. End-to-end access can also depend on production firewall settings.

## Files changed in this pass

| Path | Change |
| --- | --- |
| `src/components/Footer.astro` | Lazy-loaded the footer logo and set asynchronous decoding. |
| `src/components/Gallery.astro` | Gave the lightbox a valid default image source and lazy loading. |
| `src/components/Hero.astro` | Declared the first hero image eager while retaining high priority. |
| `src/data/catering.js` | Refined the planner description and corporate service and menu answers. |
| `src/data/entity-truth.ts` | Centralized the Organization ID and recorded both reservation channels. |
| `src/data/faq.js` | Updated the booking FAQ to include first-party reservations and booking IDs. |
| `src/data/guides.js` | Revised the Nellai guide metadata and lead answers and added two FAQs. |
| `src/data/pages.js` | Revised metadata and answers across home, dosa, lunch, dinner, What’s New and the seasonal page. |
| `src/data/parotta.js` | Aligned the parotta title with the brand suffix and search intent. |
| `src/data/site.js` | Updated the route revision dates used by the sitemap and JSON-LD. |
| `src/data/spokes.js` | Refined family dining and catering answers and aligned FAQ and dietary titles. |
| `src/layouts/Base.astro` | Emitted article Open Graph type and publication and revision dates from the Article node. |
| `src/lib/llms.js` | Grouped the index by subject and expanded the full reference from verified FAQ data. |
| `src/lib/schema.js` | Added the Organization description and contact point and wired Organization, Restaurant, WebSite and Article references. |
| `src/pages/about.astro` | Revised contact and location metadata. |
| `src/pages/book-a-table.astro` | Added the first-party reservation instructions, links, metadata and visible update date. |
| `src/pages/guides/what-are-nellai-meals.astro` | Added the byline and visible FAQs with equivalent schema. |
| `src/pages/menu.astro` | Revised the menu title for local menu and price searches. |
| `src/pages/parotta-anna-nagar.astro` | Answered the variety and vegetarian salna questions above the menu list. |
| `src/pages/robots.txt.js` | Added Apple directives and the direct sitemap URL. |
| `src/pages/sitemap.xml.js` | Reused canonical route definitions for the remaining hard-coded sitemap paths. |
| `src/pages/whats-new.astro` | Marked editorial sections as an article and added attribution. |
| `scripts/check-seo.mjs` | Checked indexable metadata targets and rejected duplicate sitemap entries. |
| `scripts/validate-schema.js` | Checked the Organization contact and its relationship to the site, restaurant and articles. |
| `scripts/verify-seo-aeo-geo.mjs` | Checked image dimensions, crawler rules and sitemap revision dates on preview. |
| `docs/seo/aeo-lint-report.md` | Regenerated by the build. |
| `docs/seo/internal-link-matrix.md` | Regenerated by the build. |
| `docs/seo/GEO-ANALYSIS.md` | Recorded the evidence, implementation, and deployment checks. |

## Verification

`npm run build`, `npm run lint`, `npm run typecheck`, `npm test`, and `npm run verify` passed. The preview checked 23 static pages, 19 indexable URLs, 80 menu dishes, and 146 JSON-LD nodes across all pages. It verified that sitemap dates match each page’s JSON-LD, indexable content arrives in the initial HTML, and the generated crawl files are served. The read-only production check failed only on the 307 apex redirect.

## After deployment

1. In the live Vercel project, check **Settings → Domains → brihadhee.com → Edit**. Set the redirect to **308 Permanent Redirect** and confirm the target is `www.brihadhee.com`. Verify with `node --use-system-ca scripts/check-live.mjs` on Windows. [Vercel domain settings](https://vercel.com/docs/domains/working-with-domains/deploying-and-redirecting)
2. Submit [https://www.brihadhee.com/sitemap.xml](https://www.brihadhee.com/sitemap.xml) in the Sitemaps reports in both tools. The existing sitemap index continues to reference this page sitemap. [Google Search Console sitemap instructions](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap) · [Bing Webmaster Tools sitemap instructions](https://www.bing.com/webmasters/help/Sitemaps-3b5cf6ed)
3. Use Google URL Inspection and Bing URL Inspection or URL Submission on the following pages after confirming they serve the new build. Request indexing where the tools provide that action. [Google recrawl instructions](https://developers.google.com/search/docs/crawling-indexing/ask-google-to-recrawl) · [Bing URL inspection](https://www.bing.com/webmasters/help/url-inspection-55a30305)

   - [https://www.brihadhee.com/](https://www.brihadhee.com/)
   - [https://www.brihadhee.com/menu/](https://www.brihadhee.com/menu/)
   - [https://www.brihadhee.com/menu/dosa/](https://www.brihadhee.com/menu/dosa/)
   - [https://www.brihadhee.com/menu/nellai-meals/](https://www.brihadhee.com/menu/nellai-meals/)
   - [https://www.brihadhee.com/guides/what-are-nellai-meals/](https://www.brihadhee.com/guides/what-are-nellai-meals/)
   - [https://www.brihadhee.com/book-a-table/](https://www.brihadhee.com/book-a-table/)
   - [https://www.brihadhee.com/catering-services-chennai/](https://www.brihadhee.com/catering-services-chennai/)
   - [https://www.brihadhee.com/corporate-catering-chennai/](https://www.brihadhee.com/corporate-catering-chennai/)
   - [https://www.brihadhee.com/no-onion-no-garlic-anna-nagar/](https://www.brihadhee.com/no-onion-no-garlic-anna-nagar/)
   - [https://www.brihadhee.com/whats-new/](https://www.brihadhee.com/whats-new/)

4. Compare 28 complete days against the prior 28 days, using the same search type, country and device. Review branded and non-branded queries separately and pair query and page filters when diagnosing a drop. Check mobile field Core Web Vitals in Search Console when enough data is available.
