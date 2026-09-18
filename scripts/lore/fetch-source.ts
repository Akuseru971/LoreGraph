/**
 * Fetches and caches a single lore source with rate limiting.
 * Run: npx tsx scripts/lore/fetch-source.ts <url>
 */
import { mkdirSync, writeFileSync, existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { createHash } from "node:crypto";

const CACHE_DIR = join(process.cwd(), ".cache/lore-sources");
const MIN_DELAY_MS = 1500;

async function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

async function main() {
  const url = process.argv[2];
  if (!url) {
    console.error("Usage: npx tsx scripts/lore/fetch-source.ts <url>");
    process.exit(1);
  }

  mkdirSync(CACHE_DIR, { recursive: true });
  const hash = createHash("sha256").update(url).digest("hex").slice(0, 16);
  const cachePath = join(CACHE_DIR, `${hash}.json`);

  if (existsSync(cachePath)) {
    const cached = JSON.parse(readFileSync(cachePath, "utf8")) as { url: string; fetchedAt: string };
    console.log(`Cache hit: ${url} (fetched ${cached.fetchedAt})`);
    return;
  }

  await sleep(MIN_DELAY_MS);
  const res = await fetch(url, {
    headers: { "User-Agent": "LoreGraph-Research/1.0 (knowledge-engine; +https://loregraph.gg)" },
  });

  if (!res.ok) {
    console.error(`Fetch failed: ${res.status} ${url}`);
    process.exit(1);
  }

  const body = await res.text();
  const contentHash = createHash("sha256").update(body).digest("hex");
  const record = {
    url,
    fetchedAt: new Date().toISOString(),
    status: res.status,
    contentHash,
    bodyLength: body.length,
  };

  writeFileSync(cachePath, JSON.stringify(record, null, 2), "utf8");
  writeFileSync(join(CACHE_DIR, `${hash}.html`), body, "utf8");
  console.log(`Cached ${url} (${body.length} bytes, hash ${contentHash.slice(0, 12)})`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
