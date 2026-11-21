#!/usr/bin/env node
/**
 * Post-deploy live check (not part of the build): `npm run check:live`.
 *  1. http:// and the apex host reach https://www with permanent redirects (301/308).
 *  2. Every path redirect in vercel.json answers 301/308 to its destination.
 *  3. Every sitemap URL returns 200, is self-canonical and is not noindex.
 *  4. Slashless copies of sitemap URLs redirect to, or canonicalise to, the slash URL.
 * Exits 1 on any failure. Read-only: GET requests only.
 */
import { readFileSync } from "node:fs";
import { SITE_ORIGIN } from "../src/data/entity-truth.ts";

const host = new URL(SITE_ORIGIN).host; // www.brihadhee.com
const apex = host.replace(/^www\./, "");
const PERMANENT = [301, 308];
const failures = [];
const ok = (msg) => console.log(`  ✓ ${msg}`);
const fail = (msg) => { failures.push(msg); console.log(`  ✗ ${msg}`); };

async function head(url, retry = true) {
  try {
    const res = await fetch(url, { redirect: "manual", headers: { "user-agent": "brihadhee-check-live" } });
    return { status: res.status, location: res.headers.get("location") ?? "", robots: res.headers.get("x-robots-tag") ?? "", body: res.status === 200 ? await res.text() : "" };
  } catch (e) {
    if (retry) return head(url, false); // one retry for a transient connect timeout
    return { status: 0, location: `network error: ${e.cause?.code ?? e.message}`, robots: "", body: "" };
  }
}
async function expectRedirect(from, to) {
  const r = await head(from);
  const target = new URL(r.location || "about:blank", from).href;
  if (PERMANENT.includes(r.status) && target === to) ok(`${from} → ${r.status} ${to}`);
  else fail(`${from} → ${r.status} ${r.location || "(no Location)"}; want 301/308 ${to}`);
}

console.log("1. Protocol and host");
await expectRedirect(`http://${host}/`, `${SITE_ORIGIN}/`);
await expectRedirect(`https://${apex}/`, `${SITE_ORIGIN}/`);
{
  const r = await head(`http://${apex}/`);
  if (PERMANENT.includes(r.status)) ok(`http://${apex}/ → ${r.status} ${r.location}`);
  else fail(`http://${apex}/ → ${r.status}; want 301/308`);
}

console.log("2. Path redirects in vercel.json");
const vercel = JSON.parse(readFileSync(new URL("../vercel.json", import.meta.url), "utf8"));
for (const r of vercel.redirects.filter((x) => !x.has && !x.source.includes(":"))) {
  await expectRedirect(`${SITE_ORIGIN}${r.source}`, new URL(r.destination, SITE_ORIGIN).href);
}

console.log("3. Sitemap URLs");
const sitemap = await (await fetch(`${SITE_ORIGIN}/sitemap.xml`)).text();
const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
if (!urls.length) fail("sitemap.xml lists no URLs");
for (const url of urls) {
  const r = await head(url);
  const canonical = (r.body.match(/<link rel="canonical" href="([^"]+)"/) ?? [])[1];
  const noindex = /noindex/i.test(r.robots) || /<meta name="robots" content="[^"]*noindex/i.test(r.body);
  if (r.status === 200 && canonical === url && !noindex) ok(url);
  else fail(`${url}: status ${r.status}, canonical ${canonical ?? "none"}${noindex ? ", noindex" : ""}`);

  // 4. Slashless copy
  if (new URL(url).pathname === "/") continue;
  const bare = url.replace(/\/$/, "");
  const b = await head(bare);
  const bareCanonical = (b.body.match(/<link rel="canonical" href="([^"]+)"/) ?? [])[1];
  const redirected = PERMANENT.includes(b.status) && new URL(b.location, bare).href === url;
  if (!redirected && !(b.status === 200 && bareCanonical === url)) fail(`${bare}: status ${b.status}, neither redirects nor canonicalises to ${url}`);
}

console.log(failures.length ? `\n✗ check:live failed (${failures.length})` : `\n✔ check:live passed (${urls.length} sitemap URLs)`);
process.exit(failures.length ? 1 : 0);
