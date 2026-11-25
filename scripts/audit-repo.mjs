#!/usr/bin/env node
/**
 * audit-repo: read-only forensic report on the repo and its static build (dist/).
 *   node scripts/audit-repo.mjs          # JSON report on stdout; exit 1 on confirmed defects
 *   node scripts/audit-repo.mjs --live   # also GET production (redirects, deploy drift, leaks)
 * Run after `npm run build:site`. Writes nothing. Live mode sends GET requests only.
 */
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const dist = path.join(root, "dist");
const ORIGIN = "https://www.brihadhee.com";
const LIVE = process.argv.includes("--live");
const read = (p) => fs.readFileSync(p, "utf8");
const has = (p) => fs.existsSync(path.join(root, p));
const rel = (p) => path.relative(root, p).replaceAll("\\", "/");
const walk = (d) => !fs.existsSync(d) ? [] : fs.readdirSync(d, { withFileTypes: true }).flatMap((e) =>
  ["node_modules", ".git", ".astro"].includes(e.name) ? [] : e.isDirectory() ? walk(path.join(d, e.name)) : [path.join(d, e.name)]);
const defects = [], warnings = [];
const defect = (where, what) => defects.push({ where, what });
const warn = (where, what) => warnings.push({ where, what });

if (!has("dist/index.html")) { console.error("dist/ missing: run `npm run build:site` first"); process.exit(1); }

/* ---- 1. Stack and hosting ------------------------------------------------ */
const pkg = JSON.parse(read(path.join(root, "package.json")));
const deps = { ...pkg.dependencies, ...pkg.devDependencies };
const astroCfg = has("astro.config.mjs") ? read(path.join(root, "astro.config.mjs")) : "";
const vercel = has("vercel.json") ? JSON.parse(read(path.join(root, "vercel.json"))) : {};
const redirects = (vercel.redirects ?? []).map((r) => ({
  source: r.source, destination: r.destination, status: r.statusCode ?? (r.permanent === false ? 307 : 308),
  when: r.has?.map((h) => `${h.type}${h.key ? ":" + h.key : ""}=${h.value}`).join(",") ?? "",
}));
const redirectSources = new Map(redirects.filter((r) => !r.when && !r.source.includes(":")).map((r) => [r.source, r]));
const stack = {
  framework: deps.next ? `Next.js ${deps.next}` : deps.astro ? `Astro ${deps.astro}` : deps.vite ? "Vite" : "static HTML",
  output: astroCfg.match(/output:\s*"(\w+)"/)?.[1] ?? null,
  trailingSlash: astroCfg.match(/trailingSlash:\s*"(\w+)"/)?.[1] ?? null,
  packageManager: has("pnpm-lock.yaml") ? "pnpm" : has("yarn.lock") ? "yarn" : has("package-lock.json") ? "npm" : "unknown",
  buildCommand: pkg.scripts?.build,
  hostingFiles: ["vercel.json", "netlify.toml", "_redirects", "public/_redirects", ".htaccess", "public/.htaccess", "nginx.conf",
    "middleware.ts", "middleware.js", "src/middleware.ts", "src/middleware.js", "next.config.js", "next.config.mjs", "next.config.ts"].filter(has),
  vercelTrailingSlash: vercel.trailingSlash ?? null,
  redirects,
  distBuiltAt: fs.statSync(path.join(dist, "index.html")).mtime.toISOString(),
};
if (stack.trailingSlash === "always" && vercel.trailingSlash !== true)
  warn("vercel.json", 'Astro trailingSlash "always" but vercel.json has no "trailingSlash": true, so slashless URLs are not redirected by config (check with --live)');

/* ---- 2. Route inventory --------------------------------------------------- */
const distFiles = walk(dist);
const distSet = new Set(distFiles.map((f) => "/" + rel(f).slice(5)));
const pick = (h, re) => (h.match(re)?.[1] ?? "").replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();
const pageMeta = (h) => {
  const ld = [...h.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)].map((m) => m[1]).join("\n");
  return {
    title: pick(h, /<title>([^<]*)<\/title>/),
    description: pick(h, /<meta name="description" content="([^"]*)"/),
    canonical: pick(h, /<link rel="canonical" href="([^"]*)"/),
    robots: pick(h, /<meta name="robots" content="([^"]*)"/),
    h1: pick(h, /<h1[^>]*>([\s\S]*?)<\/h1>/),
    h1Count: (h.match(/<h1[\s>]/g) || []).length,
    jsonLd: [...new Set([...ld.matchAll(/"@type":\s*"([^"]+)"/g)].map((m) => m[1]))],
    gtag: /googletagmanager\.com\/gtag\/js/.test(h),
  };
};
const html = Object.fromEntries(distFiles.filter((f) => f.endsWith(".html"))
  .map((f) => ["/" + rel(f).slice(5).replace(/index\.html$/, "").replace(/\.html$/, "/"), read(f)]));
const routes = Object.entries(html).map(([route, h]) => ({
  route, ...pageMeta(h),
  imgsWithoutSize: [...h.matchAll(/<img\b[^>]*>/g)].filter((m) => !/\bwidth=/.test(m[0]) || !/\bheight=/.test(m[0])).length,
}));
const indexable = routes.filter((r) => r.route !== "/404/" && !/noindex/.test(r.robots));
for (const r of routes) {
  if (r.h1Count !== 1) defect(`dist${r.route}`, `${r.h1Count} H1 elements`);
  if (!r.title || !r.description) defect(`dist${r.route}`, "empty title or meta description");
  if (r.route !== "/404/" && r.canonical !== ORIGIN + r.route) defect(`dist${r.route}`, `canonical ${r.canonical || "(none)"} is not ${ORIGIN + r.route}`);
}
for (const k of ["title", "description"]) {
  const seen = new Map();
  for (const r of indexable) seen.set(r[k], [...(seen.get(r[k]) ?? []), r.route]);
  for (const [v, rs] of seen) if (rs.length > 1) defect(rs.join(", "), `duplicate ${k}: ${v}`);
}

/* ---- 3. Forbidden legacy strings ----------------------------------------- */
const FORBIDDEN = [
  { id: "6:30 opening", re: /\b0?6[:.]30\b(?!\s*p\.?\s?m)/i },
  { id: "Mini Tiffin", re: /mini[\s-]*tiffin/i },
  { id: "299/410 price", re: /(?:₹|\brs\.?\s*|\binr\s*|"price"\s*:\s*"?)(?:299|410)\b/i, source: /(?<![\d.,#x-])(?:299|410)(?![\d])/ },
  { id: "catering phone 94442", re: /94442\s?24999|919444224999/ },
  { id: "http:// origin", re: /http:\/\/(?:www\.)?brihadhee\.com/i },
];
const guardKind = (line) => /^\s*(\*|\/\/|\/\*)/.test(line) ? "comment" : /\bre:\s*\/|RETIRED|PHONE_SWITCH|"_[\w]*note"/.test(line) ? "guard-or-note" : "value";
const sourceHits = [];
const sourceFiles = [...["src", "config", "api", "public"].flatMap((d) => walk(path.join(root, d))), path.join(root, "vercel.json"), path.join(root, "astro.config.mjs")]
  .filter((f) => /\.(astro|js|mjs|ts|json|md|txt|xml|html|css|svg)$/.test(f) && fs.existsSync(f));
for (const f of sourceFiles) read(f).split(/\r?\n/).forEach((line, i) => {
  for (const p of FORBIDDEN) if ((p.source ?? p.re).test(line))
    sourceHits.push({ at: `${rel(f)}:${i + 1}`, string: p.id, kind: guardKind(line), text: line.trim().slice(0, 140) });
});
// The catering number is owner-approved on catering pages only (footer marker) and in the llms files.
const cateringOk = (file, body) => /\.txt$/.test(file) || body.includes("Catering contact and enquiries");
const renderedHits = [];
const scanRendered = (where, body) => {
  for (const p of FORBIDDEN) for (const m of body.matchAll(new RegExp(p.re.source, p.re.flags + "g"))) {
    const ok = p.id === "catering phone 94442" && cateringOk(where, body);
    const hit = { at: where, string: p.id, approved: ok, context: body.slice(Math.max(0, m.index - 50), m.index + 40).replace(/\s+/g, " ") };
    renderedHits.push(hit);
    if (!ok) defect(where, `forbidden string "${p.id}": …${hit.context}…`);
  }
};
for (const f of distFiles.filter((f) => /\.(html|txt|xml|json)$/.test(f))) scanRendered(rel(f), read(f));

/* ---- 4. Internal links ----------------------------------------------------- */
const resolve = (p) => redirectSources.has(p) ? "redirect" : distSet.has(p) ? "file"
  : p.endsWith("/") && distSet.has(p + "index.html") ? "route" : !p.endsWith("/") && distSet.has(p + "/index.html") ? "route-no-slash" : null;
const srcRefs = (p) => sourceFiles.flatMap((f) => read(f).split(/\r?\n/).flatMap((l, i) => l.includes(p) ? [`${rel(f)}:${i + 1}`] : [])).slice(0, 8);
const broken = new Map(), slashless = new Map(), offHost = [];
const checkUrl = (raw, from) => {
  let u; try { u = new URL(raw, ORIGIN + from); } catch { return; }
  if (!/^https?:$/.test(u.protocol) || !/(^|\.)brihadhee\.com$/.test(u.hostname)) return;
  if (u.origin !== ORIGIN) offHost.push({ from, href: raw });
  const p = decodeURI(u.pathname), r = resolve(p);
  if (!r) broken.set(p, [...(broken.get(p) ?? []), from]);
  else if (r === "redirect" && !from.endsWith(".txt")) defect(`dist${from}`, `links to ${p}, which is a redirect hop (link to ${redirectSources.get(p).destination})`);
  else if (r === "route-no-slash") slashless.set(p, [...(slashless.get(p) ?? []), from]);
};
// Canonicals are checked in section 2; the 404 page's canonical names a route that is never built.
for (const [route, h] of Object.entries(html)) for (const m of h.replace(/<link rel="canonical"[^>]*>/g, "").matchAll(/\b(?:href|src)="([^"#][^"]*)"/g)) checkUrl(m[1], route);
for (const f of ["sitemap.xml", "sitemap-index.xml", "llms.txt", "llms-full.txt"].filter((f) => distSet.has("/" + f)))
  for (const m of read(path.join(dist, f)).matchAll(/https?:\/\/[^\s<)"\]]+/g)) checkUrl(m[0].replace(/[.,;]$/, ""), "/" + f);
for (const [p, from] of broken) defect(`link ${p}`, `does not resolve to a route, file or 301; linked from ${[...new Set(from)].slice(0, 6).join(", ")}; source refs: ${srcRefs(p).join(" ") || "none"}`);
for (const [p, from] of slashless) warn(`link ${p}`, `slashless link to a trailing-slash route, from ${[...new Set(from)].slice(0, 6).join(", ")}`);
for (const o of offHost) defect(`dist${o.from}`, `link to non-canonical host ${o.href}`);

/* ---- 5. Crawl files, analytics, images ------------------------------------- */
const robotsTxt = distSet.has("/robots.txt") ? read(path.join(dist, "robots.txt")) : "";
const sitemapLocs = distSet.has("/sitemap.xml") ? [...read(path.join(dist, "sitemap.xml")).matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]) : [];
for (const loc of sitemapLocs) {
  const r = routes.find((x) => ORIGIN + x.route === loc);
  if (!r) defect("sitemap.xml", `${loc} is not a built route`);
  else if (/noindex/.test(r.robots)) defect("sitemap.xml", `${loc} is noindex`);
}
for (const r of indexable) if (!sitemapLocs.includes(ORIGIN + r.route)) defect("sitemap.xml", `indexable ${r.route} missing`);
const llms = (f) => distSet.has("/" + f) ? { bytes: fs.statSync(path.join(dist, f)).size, urls: (read(path.join(dist, f)).match(/https:\/\/www\.brihadhee\.com\/\S*/g) || []).length } : null;
const crawl = {
  robots: { source: has("src/pages/robots.txt.js") ? "src/pages/robots.txt.js" : has("public/robots.txt") ? "public/robots.txt" : null,
    userAgents: (robotsTxt.match(/^User-agent:/gim) || []).length, disallow: robotsTxt.match(/^Disallow:.*$/gim) ?? [], sitemaps: robotsTxt.match(/^Sitemap:.*$/gim) ?? [] },
  sitemap: { source: "src/pages/sitemap.xml.js", urls: sitemapLocs.length, indexableRoutes: indexable.length },
  llms: { "llms.txt": llms("llms.txt"), "llms-full.txt": llms("llms-full.txt") },
};
if (!crawl.robots.sitemaps.length) defect("robots.txt", "no Sitemap line");
const envGa4 = has(".env") && /^PUBLIC_GA4_ID=\s*G-\w+/m.test(read(path.join(root, ".env")));
const analytics = { loader: "src/layouts/Base.astro (PUBLIC_GA4_ID env var)", ga4SetInLocalEnv: envGa4, gtagInLocalBuild: routes.some((r) => r.gtag) };
const dims = (b) => {
  if (b[0] === 0x89) return [b.readUInt32BE(16), b.readUInt32BE(20)];
  if (b.toString("ascii", 8, 12) === "WEBP") {
    const c = b.toString("ascii", 12, 16);
    if (c === "VP8X") return [1 + b.readUIntLE(24, 3), 1 + b.readUIntLE(27, 3)];
    if (c === "VP8 ") return [b.readUInt16LE(26) & 0x3fff, b.readUInt16LE(28) & 0x3fff];
    if (c === "VP8L") { const n = b.readUInt32LE(21); return [(n & 0x3fff) + 1, ((n >> 14) & 0x3fff) + 1]; }
  }
  if (b[0] === 0xff) for (let i = 2; i + 9 < b.length;) { const m = b[i + 1]; if (m >= 0xc0 && m <= 0xc3) return [b.readUInt16BE(i + 7), b.readUInt16BE(i + 5)]; i += 2 + b.readUInt16BE(i + 2); }
  return null;
};
const images = [...walk(path.join(root, "public")), ...walk(path.join(root, "src/assets"))]
  .filter((f) => /\.(png|jpe?g|webp|avif|gif|svg|ico)$/i.test(f))
  .map((f) => { const d = /\.(png|jpe?g|webp)$/i.test(f) ? dims(fs.readFileSync(f)) : null;
    return { file: rel(f), format: path.extname(f).slice(1).toLowerCase(), size: d ? `${d[0]}x${d[1]}` : null, kb: Math.round(fs.statSync(f).size / 1024) }; });
for (const r of routes) if (r.imgsWithoutSize) warn(`dist${r.route}`, `${r.imgsWithoutSize} <img> without width/height`);

/* ---- 6. Production (--live) ------------------------------------------------ */
let live = null;
if (LIVE) {
  const get = async (url) => {
    try {
      const r = await fetch(url, { redirect: "manual", headers: { "user-agent": "Mozilla/5.0 (compatible; repo-audit)" } });
      const type = r.headers.get("content-type") ?? "";
      return { url, status: r.status, location: r.headers.get("location") ?? "", xRobots: r.headers.get("x-robots-tag") ?? "",
        body: r.status === 200 && /html|text|xml/.test(type) ? await r.text() : "" };
    } catch (e) { return { url, status: 0, location: `network error: ${e.cause?.code ?? e.message}`, body: "" }; }
  };
  const batch = async (urls) => { const out = []; for (let i = 0; i < urls.length; i += 8) out.push(...await Promise.all(urls.slice(i, i + 8).map(get))); return out; };
  const permanent = (r, to) => [301, 308].includes(r.status) && new URL(r.location || "about:blank", r.url).href === to;
  const hostRules = await batch(["http://www.brihadhee.com/", "http://brihadhee.com/", "https://brihadhee.com/", "https://brihadhee.com/about/"]);
  const want = { "http://www.brihadhee.com/": `${ORIGIN}/`, "http://brihadhee.com/": `${ORIGIN}/`, "https://brihadhee.com/": `${ORIGIN}/`, "https://brihadhee.com/about/": `${ORIGIN}/about/` };
  for (const r of hostRules) if (!permanent(r, want[r.url]))
    defect(`Outside repo control: ${r.url}`, `answers ${r.status} ${r.location || ""}; needs one 301/308 hop to ${want[r.url]}`);
  const pages = await batch(routes.filter((r) => r.route !== "/404/").map((r) => ORIGIN + r.route));
  const pageReport = pages.map((p) => {
    const built = routes.find((r) => ORIGIN + r.route === p.url), m = p.body ? pageMeta(p.body) : null;
    if (p.status !== 200) defect(`live ${p.url}`, `status ${p.status} ${p.location}`);
    else {
      if (m.title !== built.title) warn(`live ${p.url}`, `deploy drift: live title "${m.title}" vs build "${built.title}"`);
      if (m.canonical !== p.url) defect(`live ${p.url}`, `canonical ${m.canonical || "(none)"}`);
      scanRendered(`live ${p.url}`, p.body);
    }
    return { url: p.url, status: p.status, title: m?.title, canonical: m?.canonical, robots: m?.robots, gtag: m?.gtag, jsonLdFaq: m?.jsonLd.includes("FAQPage") };
  });
  const noSlash = await batch(indexable.filter((r) => r.route !== "/").map((r) => ORIGIN + r.route.slice(0, -1)));
  for (const r of noSlash) if (!permanent(r, r.url + "/")) {
    const canon = r.status === 200 ? pageMeta(r.body).canonical : "";
    (r.status === 200 && canon === r.url + "/" ? warn : defect)(`live ${r.url}`, `slashless answers ${r.status} ${r.location}${canon ? ` (canonical ${canon})` : ""}; want 308 to ${r.url}/`);
  }
  const old = await batch([...redirectSources.keys()].map((s) => ORIGIN + s));
  for (const r of old) { const rule = redirectSources.get(new URL(r.url).pathname);
    if (!permanent(r, ORIGIN + rule.destination)) defect(`live ${r.url}`, `answers ${r.status} ${r.location}; vercel.json wants ${rule.status} ${rule.destination}`); }
  const crawlLive = await batch(["robots.txt", "sitemap.xml", "llms.txt"].map((f) => `${ORIGIN}/${f}`));
  live = { hostRules: hostRules.map(({ body, ...r }) => r), pages: pageReport, slashless: noSlash.map(({ body, ...r }) => r),
    oldRedirects: old.map(({ body, ...r }) => r), crawl: crawlLive.map((r) => ({ url: r.url, status: r.status, bytes: r.body.length })),
    gtagOnLive: pageReport.some((p) => p.gtag) };
}

const report = { stack, routes, forbidden: { source: sourceHits, rendered: renderedHits }, links: { broken: [...broken.keys()], slashless: [...slashless.keys()], offHost },
  crawl, analytics, images, live, defects, warnings };
console.log(JSON.stringify(report, null, 2));
console.error(`${defects.length ? "✖" : "✔"} audit-repo: ${routes.length} route(s), ${defects.length} defect(s), ${warnings.length} warning(s)${LIVE ? " (with --live)" : ""}`);
process.exit(defects.length ? 1 : 0);
