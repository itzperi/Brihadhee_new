#!/usr/bin/env node
/**
 * seo-verify: sprint gate on the static build in dist/ (run after `astro build`).
 * Adds the 2026 guardrails on top of scripts/verify-seo-aeo-geo.mjs --no-server:
 *   - retired facts never render (6:30 AM opening, Mini Tiffin, 299/410 prices, http:// origin)
 *   - the catering phone +91 94442 24999 renders only on the owner-approved pages
 *     (config/client-verification.json enquiry_channels, owner direction 2026-11-12)
 *   - no Review / AggregateRating JSON-LD, no Google Indexing API calls
 *   - FAQPage JSON-LD present only while config/seo-gates.ts EMIT_FAQPAGE is on
 *   - scripts/audit-repo.mjs (offline) reports no defects: routes, canonicals, links, sitemap
 *   - client keyword rules (CLAUDE.md, 24 Nov 2026): docs/seo/avoid-terms.txt, dietary wording
 *     behind its Q11-Q14 flags, catering headcount floor and no per-plate rates in titles
 *   - scripts/aeo-verify.mjs: priority answer blocks, Tamil summary, brand pairing, no duplicate intros
 * Exit 0 = pass, 2 = any failure. Also updates the "passes" fields in seo-sprint-tasks.json.
 */
import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { EMIT_FAQPAGE, IS_CATERING_PURE_VEG, CATERING_PURITY_CLAIM, CATERING_MIN_GUESTS, ENABLE_NO_ONION_NO_GARLIC_CLUSTER, ENABLE_JAIN_FRIENDLY_CLAIMS, stripPermittedNegatives } from "../config/seo-gates.ts";

const root = path.resolve(import.meta.dirname, "..");
const dist = path.join(root, "dist");
const walk = (d) => fs.readdirSync(d, { withFileTypes: true }).flatMap((e) =>
  e.isDirectory() ? walk(path.join(d, e.name)) : [path.join(d, e.name)]);
const rel = (p) => path.relative(root, p).replaceAll("\\", "/");

const CATERING_PHONE_OK = new Set([
  "dist/llms.txt", "dist/llms-full.txt",
  ...["catering-quote-chennai", "catering-services-chennai", "corporate-catering-chennai",
    "event-planner-catering-partner", "small-function-catering-chennai"].map((s) => `dist/${s}/index.html`),
]);
const RETIRED = [
  [/\b0?6[:.]30\s*a\.?m\b|\b06[:.]30\b/i, "retired 6:30 AM opening"],
  [/Mini Tiffin/i, "retired Mini Tiffin"],
  [/₹\s?(299|410)\b|Rs\.?\s?(299|410)\b|"price":\s*"?(299|410)\b/i, "retired 299/410 price"],
  [/http:\/\/(www\.)?brihadhee\.com/i, "non-https origin"],
];

const results = {};
const fail = (id, msg) => { (results[id] ??= []).push(msg); };
const pass = (id) => { results[id] ??= []; };

if (!fs.existsSync(path.join(dist, "index.html"))) { console.error("✖ dist/ missing: run `npm run build:site` first"); process.exit(1); }
const files = walk(dist).filter((f) => /\.(html|txt|xml|json)$/.test(f));

for (const id of ["retired-facts", "catering-phone-scope", "no-rating-schema", "faqpage-gate", "https-canonical"]) pass(id);
for (const f of files) {
  const r = rel(f), t = fs.readFileSync(f, "utf8");
  for (const [re, why] of RETIRED) if (re.test(t)) fail("retired-facts", `${r}: ${why}`);
  if (/94442\s?24999|919444224999/.test(t) && !CATERING_PHONE_OK.has(r)) fail("catering-phone-scope", `${r}: catering phone outside approved pages`);
  if (!f.endsWith(".html")) continue;
  const ld = [...t.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)].map((m) => m[1]).join("\n");
  if (/"@type":\s*"(Review|AggregateRating)"|"(aggregateRating|review)":/.test(ld)) fail("no-rating-schema", `${r}: Review/AggregateRating JSON-LD`);
  if (!EMIT_FAQPAGE && /"@type":\s*"FAQPage"/.test(ld)) fail("faqpage-gate", `${r}: FAQPage emitted while EMIT_FAQPAGE is off`);
  const canon = (t.match(/<link rel="canonical" href="([^"]*)"/) || [])[1];
  if (canon && !canon.startsWith("https://www.brihadhee.com/")) fail("https-canonical", `${r}: canonical ${canon}`);
}

pass("no-indexing-api");
for (const dir of ["src", "scripts", "api"]) for (const f of walk(path.join(root, dir)))
  if (!f.endsWith("seo-verify.mjs") && /indexing\.googleapis\.com/.test(fs.readFileSync(f, "utf8"))) fail("no-indexing-api", `${rel(f)}: Google Indexing API`);

const base = spawnSync(process.execPath, ["scripts/verify-seo-aeo-geo.mjs", "--no-server"], { cwd: root, encoding: "utf8" });
if (base.status === 0) pass("verify-seo-aeo-geo");
else fail("verify-seo-aeo-geo", (base.stdout + base.stderr).trim().split("\n").filter((l) => /✖|fail/i.test(l)).slice(0, 15).join("\n") || "exit " + base.status);

// Offline only: production checks (`audit-repo.mjs --live`, `npm run check:live`) depend on deploys and DNS.
const audit = spawnSync(process.execPath, ["scripts/audit-repo.mjs"], { cwd: root, encoding: "utf8" });
if (audit.status === 0) pass("forensic-audit");
else { try { for (const d of JSON.parse(audit.stdout).defects) fail("forensic-audit", `${d.where}: ${d.what}`); } catch { fail("forensic-audit", audit.stderr.trim() || "exit " + audit.status); } }
// --strict: audit warnings (slashless links, unsized images, missing vercel trailingSlash) fail too.
if (process.argv.includes("--strict") && audit.status === 0)
  for (const w of JSON.parse(audit.stdout).warnings) fail("forensic-audit", `strict: ${w.where}: ${w.what}`);

// Phase 2: repo-side redirects in vercel.json plus the purge, phone and canonical checks above.
const vercel = JSON.parse(fs.readFileSync(path.join(root, "vercel.json"), "utf8"));
if (vercel.trailingSlash !== true) fail("p2-redirects-canonicals", 'vercel.json needs "trailingSlash": true');
if (!vercel.redirects?.some((r) => r.has?.some((h) => h.type === "host" && h.value === "brihadhee.com") && r.destination.startsWith("https://www.brihadhee.com/") && r.statusCode === 301))
  fail("p2-redirects-canonicals", "vercel.json needs the 301 apex → https://www.brihadhee.com rule");
for (const id of ["retired-facts", "catering-phone-scope", "https-canonical", "forensic-audit"])
  if (results[id].length) fail("p2-redirects-canonicals", `${id} failing`);
pass("p2-redirects-canonicals");

// Phase 3: snippet lengths, social tags, WebSite/Restaurant entity nodes, AI crawler access, llms ground truth.
const P3 = "p3-metadata-aeo-schema";
const dec = (s) => s.replace(/&amp;/g, "&").replace(/&#39;/g, "'").replace(/&quot;/g, '"');
const meta = (h, attr, key) => dec(h.match(new RegExp(`<meta ${attr}="${key}" content="([^"]*)"`))?.[1] ?? "");
for (const f of files.filter((f) => f.endsWith(".html"))) {
  const h = fs.readFileSync(f, "utf8"), r = rel(f);
  if (/noindex/.test(meta(h, "name", "robots")) || r === "dist/404.html") continue;
  const title = dec(h.match(/<title>([^<]*)<\/title>/)?.[1] ?? ""), desc = meta(h, "name", "description");
  const canon = h.match(/<link rel="canonical" href="([^"]*)"/)?.[1];
  if (title.length > 60) fail(P3, `${r}: title ${title.length} chars (max 60)`);
  if (desc.length < 135 || desc.length > 156) fail(P3, `${r}: description ${desc.length} chars (135-156)`);
  for (const k of ["og:title", "og:description", "og:image"]) if (!meta(h, "property", k)) fail(P3, `${r}: missing ${k}`);
  if (meta(h, "property", "og:url") !== canon) fail(P3, `${r}: og:url is not the canonical`);
  if (meta(h, "name", "twitter:card") !== "summary_large_image") fail(P3, `${r}: twitter:card is not summary_large_image`);
}
{
  const home = fs.readFileSync(path.join(dist, "index.html"), "utf8");
  const nodes = [...home.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)].flatMap((m) => { const j = JSON.parse(m[1]); return j["@graph"] ?? [j]; });
  const site = nodes.find((n) => n["@type"] === "WebSite"), resto = nodes.find((n) => [].concat(n["@type"]).includes("Restaurant"));
  if (!site?.alternateName?.length || ![].concat(site.inLanguage).includes("ta-IN")) fail(P3, "WebSite needs alternateName and inLanguage with ta-IN");
  if (resto?.["@id"] !== "https://www.brihadhee.com/#restaurant" || !resto.geo || !resto.telephone || !resto.openingHoursSpecification || !resto.hasMenu && !resto.menu)
    fail(P3, "Restaurant node needs #restaurant @id, geo, telephone, hours and menu");
  const robots = fs.readFileSync(path.join(dist, "robots.txt"), "utf8");
  for (const bot of ["*", "Googlebot", "Bingbot", "OAI-SearchBot", "PerplexityBot", "Claude-SearchBot"])
    if (!new RegExp(`User-agent: ${bot.replace("*", "\\*")}\\s*\\nAllow: /\\s*$`, "m").test(robots)) fail(P3, `robots.txt: ${bot} not allowed`);
  if (!/^Sitemap: https:\/\/www\.brihadhee\.com\/sitemap\.xml$/m.test(robots)) fail(P3, "robots.txt: Sitemap line missing");
  const llms = fs.readFileSync(path.join(dist, "llms.txt"), "utf8");
  if (!/## Key facts/.test(llms) || !/100% pure vegetarian/.test(llms)) fail(P3, "llms.txt: key facts block missing");
  if (!/Menu &amp; prices verified/.test(fs.readFileSync(path.join(dist, "menu/index.html"), "utf8"))) fail(P3, "/menu/: freshness note missing");
  if (results["no-rating-schema"].length) fail(P3, "rating schema present");
}
pass(P3);

// Phase 4: offers and photos hubs, money-page upgrades, mobile bar, image hygiene, GA4 conversion names.
const P4 = "p4-hubs-money-cwv";
{
  const page = (p) => { const f = path.join(dist, p, "index.html"); return fs.existsSync(f) ? fs.readFileSync(f, "utf8") : ""; };
  const sitemap = fs.readFileSync(path.join(dist, "sitemap.xml"), "utf8");
  for (const p of ["offers", "photos"]) {
    const h = page(p);
    if (!h) { fail(P4, `/${p}/ not built`); continue; }
    if (/noindex/.test(meta(h, "name", "robots")) || !sitemap.includes(`https://www.brihadhee.com/${p}/</loc>`)) fail(P4, `/${p}/ must be indexable and in the sitemap`);
  }
  const offers = page("offers");
  if (!/<table/.test(offers)) fail(P4, "/offers/: comparison table missing");
  for (const host of ["swiggy.com", "eazydiner.com", "district.in"]) if (!offers.includes(host)) fail(P4, `/offers/: no ${host} link`);
  const linksTo = (p, target) => new RegExp(`href="/${target}/"`).test(page(p));
  for (const [from, to] of [["", "offers"], ["", "photos"], ["about", "photos"], ["book-a-table", "offers"]]) if (!linksTo(from, to)) fail(P4, `/${from}${from && "/"} does not link to /${to}/`);
  if (!/id="signature-dishes"[\s\S]*?<table/.test(page("menu"))) fail(P4, "/menu/: signature dishes table missing");
  if (!/id="how-it-works"[\s\S]*?<table/.test(page("menu/dosa"))) fail(P4, "/menu/dosa/: step table missing");
  if (!/id="pure-veg"/.test(page("about")) || !/id="reviews"/.test(page("about")) || !/id="reviews"/.test(page(""))) fail(P4, "/about/ pure-veg callout or #reviews missing");
  for (const [p, mode] of [["", "book"], ["menu", "book"], ["corporate-catering-chennai", "quote"], ["catering-services-chennai", "quote"]])
    if (!page(p).includes(`id="callbar" data-mode="${mode}"`)) fail(P4, `/${p}: callbar mode is not ${mode}`);
  for (const f of files.filter((f) => f.endsWith(".html"))) {
    const h = fs.readFileSync(f, "utf8");
    for (const img of h.match(/<img\b[^>]*>/g) ?? []) if (!/\bwidth=/.test(img) || !/\bheight=/.test(img) || !/\balt=/.test(img)) fail(P4, `${rel(f)}: <img> without width, height or alt`);
  }
  if ((page("").match(/<img\s[^>]*fetchpriority="high"/g) ?? []).length !== 1) fail(P4, "home must have exactly one <img fetchpriority=high> (the LCP hero)");
  // The shipped bundle, not the source (a comment in main.js would satisfy a source check).
  const js = fs.readdirSync(path.join(dist, "_astro")).filter((f) => f.endsWith(".js")).map((f) => fs.readFileSync(path.join(dist, "_astro", f), "utf8")).join("\n");
  for (const e of ["click_call_dinein", "click_call_catering", "click_whatsapp_catering", "click_book_table", "view_offers_hub"]) if (!new RegExp(`["'\`]${e}["'\`]`).test(js)) fail(P4, `built JS: GA4 event ${e} missing`);
  if (results["no-rating-schema"].length) fail(P4, "rating schema present");
}
pass(P4);

// Client keyword rules (24 Nov 2026, CLAUDE.md). Public build output only: drafts/ and docs/ are never built.
const CLIENT = "client-keyword-rules";
{
  const strip = (t) => dec(stripPermittedNegatives(t));
  const visible = (h) => strip(h.replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>/g, " ").replace(/<[^>]+>/g, " ")).replace(/\s+/g, " ");
  // 1. Absolute bans: every pattern in docs/seo/avoid-terms.txt (the list aeo-lint enforces in `npm run build`).
  const avoid = fs.readFileSync(path.join(root, "docs/seo/avoid-terms.txt"), "utf8").split(/\r?\n/)
    .map((l) => l.trim()).filter((l) => l && !l.startsWith("#")).map((l) => new RegExp(l, "i"));
  // 2. Dietary wording stays off public output until the kitchen confirms Q11-Q14 (config/seo-gates.ts flags).
  const dietary = [
    ...(ENABLE_NO_ONION_NO_GARLIC_CLUSTER ? [] : [/\bno[\s-]+onions?\b|\bno[\s-]+garlic\b|\bwithout\s+(?:onions?|garlic)\b|\b(?:onion|garlic)[\s-]+free\b|\bsaa?tt?vi[ck]\b/i]),
    ...(ENABLE_JAIN_FRIENDLY_CLAIMS ? [] : [/\bjains?\b|\bmarwaris?\b/i]),
  ];
  for (const f of files) {
    const r = rel(f), raw = fs.readFileSync(f, "utf8"), text = strip(raw);
    for (const re of [...avoid, ...dietary]) { const m = text.match(re); if (m) fail(CLIENT, `${r}: "${m[0]}" (${re.source})`); }
    if (!ENABLE_NO_ONION_NO_GARLIC_CLUSTER && raw.includes("/no-onion-no-garlic-anna-nagar/")) fail(CLIENT, `${r}: links to the gated dietary page`);
    if (!f.endsWith(".html") || !raw.includes("Catering contact and enquiries")) continue;
    // 3. Catering pages: no headcount under the 50-guest floor, no rupee per-plate rate in title/H1/description,
    //    and "pure veg" catering wording only while Q20 is answered (IS_CATERING_PURE_VEG).
    const v = visible(raw);
    // "30 guests", "(30+ Guests)", "40 to 1,500 guests", "10-person"
    const small = v.match(/(?<![\d,.])(?:[1-9]|[1-4]\d)(?:\s*\+?\s*(?:guests?|people|persons?|pax)\b|\s*(?:to|[-–])\s*\d[\d,]*\s*(?:guests?|people|persons?|pax)\b|[\s-]*person\b)/i);
    if (small) fail(CLIENT, `${r}: headcount under ${CATERING_MIN_GUESTS} "${small[0]}"`);
    const head = [dec(raw.match(/<title>([^<]*)<\/title>/)?.[1] ?? ""), meta(raw, "name", "description"), visible(raw.match(/<h1[^>]*>([\s\S]*?)<\/h1>/)?.[1] ?? "")].join(" | ");
    if (/(?:₹|\brs\.?|\binr)\s?\d[\d,]*\s*(?:\/|per)\s*-?\s*(?:plate|head|person|pax)\b|per[\s-](?:plate|head|person)\D{0,15}(?:₹|\brs\.?|\binr)\s?\d/i.test(head)) fail(CLIENT, `${r}: per-plate rate in title, H1 or description`);
    if (!IS_CATERING_PURE_VEG && CATERING_PURITY_CLAIM.test(v)) fail(CLIENT, `${r}: "pure veg" catering wording while Q20 is unanswered`);
  }
  if (!ENABLE_NO_ONION_NO_GARLIC_CLUSTER && fs.existsSync(path.join(dist, "no-onion-no-garlic-anna-nagar"))) fail(CLIENT, "gated dietary page was built");
}
pass(CLIENT);

// AEO priority checks (answer blocks, Tamil summary, brand pairing, duplicate intros): scripts/aeo-verify.mjs.
const aeo = spawnSync(process.execPath, ["scripts/aeo-verify.mjs"], { cwd: root, encoding: "utf8" });
if (aeo.status === 0) pass("aeo-priority");
else for (const l of (aeo.stdout + aeo.stderr).split("\n").filter((l) => l.startsWith("  - "))) fail("aeo-priority", l.slice(4));
if (aeo.status !== 0 && !results["aeo-priority"]?.length) fail("aeo-priority", aeo.stderr.trim() || `exit ${aeo.status}`);

// Phase 5: canonical sitemap with real lastmod, crawl files in the output, IndexNow helper, all gates green.
const P5 = "p5-sitemap-build-handoff";
{
  const sm = fs.readFileSync(path.join(dist, "sitemap.xml"), "utf8");
  const urls = [...sm.matchAll(/<url>\s*<loc>([^<]+)<\/loc>\s*<lastmod>([^<]+)<\/lastmod>/g)].map((m) => [m[1], m[2]]);
  const today = new Date().toLocaleDateString("sv-SE"); // local YYYY-MM-DD: the content dates are IST, UTC lags by 5.5 h
  for (const [loc, lastmod] of urls) {
    if (!/^https:\/\/www\.brihadhee\.com\/([a-z0-9-]+\/)*$/.test(loc)) fail(P5, `sitemap: non-canonical URL ${loc}`);
    if (!/^\d{4}-\d{2}-\d{2}$/.test(lastmod) || lastmod > today) fail(P5, `sitemap: bad lastmod ${lastmod} for ${loc}`);
  }
  for (const p of ["/", "/offers/", "/photos/", "/parotta-anna-nagar/", "/faq/", "/catering-quote-chennai/"])
    if (!urls.some(([loc]) => loc === `https://www.brihadhee.com${p}`)) fail(P5, `sitemap: ${p} missing`);
  for (const f of ["robots.txt", "llms.txt", "llms-full.txt", "sitemap-index.xml"]) if (!fs.existsSync(path.join(dist, f))) fail(P5, `dist/${f} missing`);
  if (!fs.existsSync(path.join(root, "scripts/indexnow.mjs"))) fail(P5, "scripts/indexnow.mjs missing");
  for (const id of Object.keys(results)) if (id !== P5 && results[id].length) fail(P5, `${id} failing`);
}
pass(P5);

const trackerPath = path.join(root, "seo-sprint-tasks.json");
if (fs.existsSync(trackerPath)) {
  const tracker = JSON.parse(fs.readFileSync(trackerPath, "utf8"));
  for (const t of tracker.tasks) if (t.check in results) t.passes = results[t.check].length === 0;
  fs.writeFileSync(trackerPath, JSON.stringify(tracker, null, 2) + "\n");
}

let bad = 0;
for (const [id, msgs] of Object.entries(results)) {
  console.log(`${msgs.length ? "✖" : "✔"} ${id}`);
  for (const m of msgs) { console.log("    " + m); bad++; }
}
console.log(bad ? `\n✖ seo-verify failed (${bad} problem(s))` : `\n✔ seo-verify passed (${files.length} file(s), EMIT_FAQPAGE=${EMIT_FAQPAGE})`);
process.exit(bad ? 2 : 0);
