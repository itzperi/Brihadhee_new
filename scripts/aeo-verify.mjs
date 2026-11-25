#!/usr/bin/env node
/**
 * aeo-verify: client keyword priority checks on the built HTML in dist/ (run after `astro build`).
 * Reads the initial HTML only, the way a crawler or answer engine first sees it.
 *   1. Priority answer blocks exist as visible <h3> questions with <p> answers (client priorities 1-4)
 *   2. Every indexable page: title names Brihadhee; the opening answer pairs Brihadhee with
 *      restaurant, Anna Nagar, dosa or catering; Restaurant schema and llms files do the same
 *   3. /about/ and /faq/ carry the Tamil summary (lang="ta"); no Hindi while Q17 is open
 *   4. Cannibalization: no two pages share an H1 or an opening answer (word overlap >= 60%),
 *      and no page other than the owner has every word of a priority keyword in its title or H1
 *   5. Each priority page has internal links from at least 3 other indexable pages
 *   6. Every ₹ figure in a title or meta description is a price on the current menu
 * Exit 0 = pass, 1 = fail. Problems print as "  - ..." (read by scripts/seo-verify.mjs).
 */
import fs from "node:fs";
import path from "node:path";
import { ENABLE_HINDI_COPY } from "../config/seo-gates.ts";

const root = path.resolve(import.meta.dirname, "..");
const dist = path.join(root, "dist");
if (!fs.existsSync(path.join(dist, "index.html"))) { console.error("✖ dist/ missing: run `npm run build:site` first"); process.exit(1); }

const problems = [];
const fail = (where, what) => problems.push(`${where}: ${what}`);
const dec = (s) => s.replace(/&amp;/g, "&").replace(/&#39;|&rsquo;/g, "'").replace(/&quot;/g, '"').replace(/&nbsp;/g, " ");
const text = (h) => dec(h.replace(/<[^>]+>/g, " ")).replace(/\s+/g, " ").trim();
const walk = (d) => fs.readdirSync(d, { withFileTypes: true }).flatMap((e) => (e.isDirectory() ? walk(path.join(d, e.name)) : [path.join(d, e.name)]));

/* ---- Pages ------------------------------------------------------------------------------- */
const pages = Object.fromEntries(walk(dist).filter((f) => f.endsWith("index.html")).map((f) => {
  const route = "/" + path.relative(dist, f).split(path.sep).join("/").replace(/index\.html$/, "");
  return [route, fs.readFileSync(f, "utf8")];
}));
const indexable = Object.keys(pages).filter((r) => !/<meta name="robots" content="[^"]*noindex/.test(pages[r]));
const title = (h) => dec(h.match(/<title>([^<]*)<\/title>/)?.[1] ?? "");
const h1 = (h) => text(h.match(/<h1[^>]*>([\s\S]*?)<\/h1>/)?.[1] ?? "");
/** The opening answer: the first paragraph after the H1 with at least 15 words. */
const opening = (h) => [...(h.split(/<\/h1>/)[1] ?? "").matchAll(/<p(?=[\s>])[^>]*>([\s\S]*?)<\/p>/g)].map((m) => text(m[1])).find((p) => p.split(" ").length >= 15) ?? "";
const qas = (h) => [...h.matchAll(/<h3 class="faq__q">([\s\S]*?)<\/h3>[\s\S]*?<p class="faq__answer"[^>]*>([\s\S]*?)<\/p>/g)].map((m) => ({ q: text(m[1]), a: text(m[2]) }));

/* ---- 1. Priority answer blocks ------------------------------------------------------------- */
const NEED = [
  ["/small-function-catering-chennai/", /minimum catering order/i, [/\b50 guests\b/]],
  ["/small-function-catering-chennai/", /cost per plate/i, [/event type/i, /occasion/i, /lunch or dinner/i, /headcount/i, /must-have dishes/i, /spend/i, /serving staff/i]],
  ["/corporate-catering-chennai/", /how many people can/i, [/1,000\+/]],
  ["/catering-services-chennai/", /end-to-end/i, []],
  ["/family-dining-anna-nagar/", /temple visit/i, [/11 AM/]],
  ["/family-dining-anna-nagar/", /birthday or anniversary dinner/i, []],
  ["/veg-dinner-anna-nagar/", /open for dinner until 11 PM/i, [/lunch and dinner only/i]],
  ["/veg-dinner-anna-nagar/", /order for dinner/i, [/Paanai Parotta/, /Kothu Parotta/, /Idiyappam/, /dosa/i]],
  ["/menu/nellai-meals/", /lunch combos/i, []],
  ["/menu/dosa/", /build my own dosa/i, []],
];
for (const [route, question, mustSay] of NEED) {
  const hit = qas(pages[route] ?? "").find((x) => question.test(x.q));
  if (!hit) { fail(route, `no visible question matching ${question}`); continue; }
  for (const re of mustSay) if (!re.test(hit.a)) fail(route, `"${hit.q}" answer does not mention ${re}`);
}

/* ---- 2. Brand pairing -------------------------------------------------------------------- */
const PAIR = /restaurant|Anna Nagar|dosa|cater(?:ing|er)/i;
for (const r of indexable.filter((r) => r !== "/404/")) {
  const h = pages[r];
  if (!/Brihadhee/.test(title(h))) fail(r, "title does not name Brihadhee");
  const o = opening(h);
  if (!/Brihadhee/.test(o) || !PAIR.test(o)) fail(r, `opening answer does not pair Brihadhee with restaurant, Anna Nagar, dosa or catering: "${o.slice(0, 90)}"`);
  // The street fact already ends in "Anna Nagar East"; copy that adds it again reads as a template error.
  if (/Anna Nagar East,? in Anna Nagar East/.test(text(h))) fail(r, `repeats "Anna Nagar East" after the street address`);
}
for (const m of pages["/"].matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g))
  for (const n of JSON.parse(m[1])["@graph"] ?? [])
    if ([].concat(n["@type"]).includes("Restaurant") && !(/Brihadhee/.test(n.description) && /restaurant/i.test(n.description) && /Anna Nagar/.test(n.description)))
      fail("/ JSON-LD", "Restaurant description does not pair Brihadhee with restaurant and Anna Nagar");
for (const f of ["llms.txt", "llms-full.txt"]) {
  const lead = fs.readFileSync(path.join(dist, f), "utf8").split("\n").find((l) => l.startsWith("> ")) ?? "";
  if (!/Brihadhee/.test(lead) || !/restaurant/i.test(lead) || !/Anna Nagar/.test(lead)) fail(f, "summary line does not pair Brihadhee with restaurant and Anna Nagar");
}

/* ---- 3. Languages ---------------------------------------------------------------------- */
for (const r of ["/about/", "/faq/"]) if (!/<section[^>]*id="tamil"[^>]*lang="ta"/.test(pages[r] ?? "")) fail(r, "Tamil summary block missing");
if (!ENABLE_HINDI_COPY) for (const r of indexable) if (/[ऀ-ॿ]|lang="hi/.test(pages[r])) fail(r, "Hindi copy while Q17 is open");

/* ---- 4. Cannibalization ------------------------------------------------------------------ */
const words = (s) => new Set(s.toLowerCase().replace(/[^a-z0-9₹஀-௿ ]/g, " ").split(/\s+/).filter((w) => w.length > 2));
const shingles = (s, n = 6) => { const w = s.toLowerCase().split(/\s+/).filter(Boolean); return new Set(w.slice(0, Math.max(0, w.length - n + 1)).map((_, i) => w.slice(i, i + n).join(" "))); };
const phrases = (a, b) => { const A = shingles(a), B = shingles(b); if (!A.size || !B.size) return 0; return [...A].filter((s) => B.has(s)).length / Math.min(A.size, B.size); };
const live = indexable.filter((r) => r !== "/404/");
for (let i = 0; i < live.length; i++) for (let j = i + 1; j < live.length; j++) {
  const [a, b] = [live[i], live[j]];
  if (h1(pages[a]).toLowerCase() === h1(pages[b]).toLowerCase()) fail(`${a} + ${b}`, "same H1");
  // Copied wording, not shared facts: half the six-word phrases of the shorter opening reused.
  const shared = phrases(opening(pages[a]), opening(pages[b]));
  if (shared >= 0.5) fail(`${a} + ${b}`, `opening answers reuse ${Math.round(shared * 100)}% of their wording`);
}
// Priority keywords (client keyword plan section 1a) and the one page meant to rank for each (docs/seo/keyword-tracker.csv).
const OWNER = {
  "small function catering chennai": "/small-function-catering-chennai/",
  "vegetarian catering 50 people chennai": "/small-function-catering-chennai/",
  "catering quote chennai": "/catering-quote-chennai/",
  "end-to-end catering chennai": "/catering-services-chennai/",
  "corporate catering chennai": "/corporate-catering-chennai/",
  "office catering chennai": "/corporate-catering-chennai/",
  "build your own dosa": "/menu/dosa/",
  "family restaurant anna nagar": "/family-dining-anna-nagar/",
  "lunch combo anna nagar": "/menu/nellai-meals/",
  "veg lunch anna nagar": "/menu/nellai-meals/",
  "veg dinner anna nagar": "/veg-dinner-anna-nagar/",
  "paanai parotta anna nagar": "/parotta-anna-nagar/",
};
for (const [kw, owner] of Object.entries(OWNER)) {
  const vegWord = (x) => x.replace(/\bveg(?:etarian)?\b/gi, "veg");
  const need = [...words(vegWord(kw))];
  for (const r of live) {
    if (r === owner) continue;
    const head = words(vegWord(`${title(pages[r])} ${h1(pages[r])}`));
    if (need.every((w) => head.has(w))) fail(r, `title/H1 competes with ${owner} for "${kw}"`);
  }
}

/* ---- 5. Internal links to priority pages -------------------------------------------------- */
for (const target of [...new Set(Object.values(OWNER))]) {
  const from = live.filter((r) => r !== target && new RegExp(`href="${target.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}(?:#[^"]*)?"`).test(pages[r]));
  if (from.length < 3) fail(target, `only ${from.length} internal linking page(s); need 3`);
}

/* ---- 6. Every ₹ figure in a title or meta description is a price on the current menu ------------ */
// Snippets are typed by hand (client-approved wording), so this catches drift when the menu changes.
const MENU_PRICES = new Set([...fs.readFileSync(path.join(root, "src/data/menu-canonical.ts"), "utf8").matchAll(/"?price"?\s*:\s*"?(\d+)/g)].map((m) => Number(m[1])));
for (const r of live) {
  const h = pages[r];
  const snippet = `${title(h)} | ${dec(h.match(/<meta name="description" content="([^"]*)"/)?.[1] ?? "")}`;
  for (const m of snippet.matchAll(/₹\s?(\d[\d,]*)(?:\s*(?:–|-|to)\s*₹?\s?(\d[\d,]*))?/g))
    for (const n of [m[1], m[2]].filter(Boolean).map((x) => Number(x.replace(/,/g, ""))))
      if (!MENU_PRICES.has(n)) fail(r, `₹${n} in the title or description is not a price on the current menu`);
}

if (problems.length) {
  console.log(`✖ aeo-verify failed (${problems.length} problem(s))`);
  for (const p of problems) console.log(`  - ${p}`);
  process.exit(1);
}
console.log(`✔ aeo-verify passed (${live.length} indexable page(s), ${NEED.length} priority answers, ${Object.keys(OWNER).length} priority keywords)`);
