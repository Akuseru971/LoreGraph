/**
 * SEO canonical origin validation.
 * Run with `npm run validate:seo`.
 */
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import { absoluteUrl, findForbiddenOrigins, getSiteUrl, SITE_URL } from "../lib/seo";

const errors: string[] = [];
const warnings: string[] = [];

const FORBIDDEN = ["lore-graph.vercel.app", "lore-graph-lovat.vercel.app"];

const SKIP_DIRS = new Set(["node_modules", ".git", ".next", "docs", "data/import", "data/backup"]);
const SKIP_FILES = new Set([
  "scripts/validate-seo.ts",
  "lib/seo.ts",
  "lib/canon-hardening.test.ts",
]);

function scanDir(dir: string, extensions: Set<string>) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (SKIP_DIRS.has(entry)) continue;
    const stat = statSync(full);
    if (stat.isDirectory()) {
      scanDir(full, extensions);
    } else if (extensions.has(entry.split(".").pop() ?? "")) {
      const rel = full.replace(process.cwd() + "/", "");
      if (rel.endsWith(".test.ts") || SKIP_FILES.has(rel)) continue;
      const content = readFileSync(full, "utf8");
      for (const origin of FORBIDDEN) {
        if (content.includes(origin)) {
          errors.push(`Hardcoded origin ${origin} in ${rel}`);
        }
      }
    }
  }
}

scanDir(join(process.cwd(), "app"), new Set(["ts", "tsx"]));
scanDir(join(process.cwd(), "components"), new Set(["ts", "tsx"]));
scanDir(join(process.cwd(), "lib"), new Set(["ts", "tsx"]));

const championUrl = absoluteUrl("/champion/aatrox");
if (findForbiddenOrigins(championUrl).length) {
  errors.push("Champion canonical URL contains forbidden origin");
}
if (!championUrl.startsWith(getSiteUrl())) {
  errors.push(`Champion URL does not use SITE_URL: ${championUrl}`);
}

console.log(`SITE_URL: ${SITE_URL}`);
console.log(`Sample champion canonical: ${championUrl}`);

for (const w of warnings) console.warn(`WARN: ${w}`);
for (const e of errors) console.error(`ERROR: ${e}`);

if (errors.length) {
  console.error(`\nvalidate:seo FAILED (${errors.length} errors)`);
  process.exit(1);
}

console.log("\nvalidate:seo PASSED");
