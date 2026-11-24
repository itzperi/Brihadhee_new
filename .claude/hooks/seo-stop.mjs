// Stop hook: block stopping (exit 2) while the SEO gate fails. stop_hook_active guards the retry loop:
// the second stop in a row is let through so a red gate can never trap the session.
import path from "node:path";
import { spawnSync } from "node:child_process";

let input = "";
for await (const c of process.stdin) input += c;
if (JSON.parse(input || "{}").stop_hook_active) process.exit(0);

// Run from the repo root whatever folder the session started in.
const root = path.resolve(import.meta.dirname, "..", "..");
const run = (cmd) => spawnSync(cmd, { cwd: root, encoding: "utf8", shell: true });

// The same build Vercel runs (astro build + every check in `npm run check`), then the sprint gate.
const build = run("npm run build");
if (build.status !== 0) { process.stderr.write("npm run build failed; fix before stopping:\n" + (build.stdout + build.stderr).slice(-3000)); process.exit(2); }
const v = run(`"${process.execPath}" scripts/seo-verify.mjs --strict`);
if (v.status !== 0) { process.stderr.write("seo-verify failed; fix before stopping:\n" + v.stdout + v.stderr); process.exit(2); }
