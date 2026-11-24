# Deploy checklist: www.brihadhee.com

Canonical origin: `https://www.brihadhee.com/`, every page path ending in `/`.
Measured live on 24 Nov 2026 with `node scripts/audit-repo.mjs --live`.

## In the repo (`vercel.json`)

| Rule | Status |
|---|---|
| `"trailingSlash": true`: `/menu` → 308 `/menu/` | Added 24 Nov 2026. Not live until deployed. |
| Host `brihadhee.com` → 301 `https://www.brihadhee.com/:path*` | Present. Vercel's domain redirect (below) runs first, so it only applies if that is removed. |
| Host `brihadhee.vercel.app` → 301 www, plus `X-Robots-Tag: noindex` on `*.vercel.app` | Present |
| `/nellai-meals-south-indian-veg-anna-nagar/` → 301 `/menu/nellai-meals/` | Live (301) |
| `/best-dosa-parotta-anna-nagar/` → 301 `/menu/dosa/` | Live (301) |

## Outside the repo (Vercel dashboard)

1. **Apex redirect must be permanent.** Vercel → Project → Settings → Domains → `brihadhee.com` → Edit → "Redirect to `www.brihadhee.com`", status **308 Permanent Redirect**.
   Live on 24 Nov: `https://brihadhee.com/` answers **307** (temporary).
2. **HTTP → HTTPS** is automatic on Vercel and cannot be set in `vercel.json`.
   Live: `http://www.brihadhee.com/` → 308 `https://www.brihadhee.com/` (correct).
   `http://brihadhee.com/` → 308 `https://brihadhee.com/` → apex rule. That's two hops, which is fine once step 1 is permanent.
3. **Production must serve `main`.** Vercel → Deployments: check that the Production deployment is the latest `main` commit and that its build succeeded.
   On 24 Nov, production still had the older titles, no FAQPage, and `/no-onion-no-garlic-anna-nagar/` returned 404.
4. **GA4:** Vercel → Settings → Environment Variables → `PUBLIC_GA4_ID=G-…` (Production), then redeploy. The CSP in `vercel.json` already allows Google Analytics.
5. **Google Business Profile and citations:** the website field must be `https://www.brihadhee.com/`, not `http://`. This clears the stale `http://www` URL in Search Console.

## After each production deploy

1. Test both forms. The trailing-slash rule 308-redirects `/api/lead` and `/api/book-table`; 308 keeps POST, but confirm:
   - a quote on `/catering-quote-chennai/` arrives by email
   - a booking on `/reserve-table/tables/` lands in the sheet
2. `npm run check:live`
3. `node scripts/audit-repo.mjs --live`: must exit 0 once dashboard steps 1–4 are done.
4. `npm run indexnow` (Bing/Yandex). Never use the Google Indexing API.

## Search Console after the sprint deploy (24 Nov 2026)

1. Sitemaps → submit `https://www.brihadhee.com/sitemap.xml` (21 URLs).
2. URL Inspection → Test Live URL → Request Indexing, once each, in this order:
   1. `https://www.brihadhee.com/`
   2. `https://www.brihadhee.com/menu/`
   3. `https://www.brihadhee.com/offers/` (new)
   4. `https://www.brihadhee.com/about/`
   5. `https://www.brihadhee.com/menu/dosa/`
   6. `https://www.brihadhee.com/corporate-catering-chennai/`
   7. `https://www.brihadhee.com/parotta-anna-nagar/`
   8. `https://www.brihadhee.com/photos/` (new)
3. Bing / Copilot / ChatGPT search: `INDEXNOW_KEY` must be set in Vercel before the build, then run `npm run indexnow`.
