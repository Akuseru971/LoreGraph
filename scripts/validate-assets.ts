/**
 * Asset validation — local files, manifest integrity, CDN fallbacks.
 * Run: npm run validate:assets
 */
import { existsSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import sharp from "sharp";
import { characters } from "../data";
import { loadManifestRecords } from "../lib/assets/manifest";
import {
  getChampionAssetUrl,
  hasLocalChampionAssets,
} from "../lib/assets/registry";
import type { AssetManifestIndex } from "../lib/assets/types";

const ROOT = process.cwd();
const INDEX_PATH = join(ROOT, "data/assets/manifest-index.json");
interface Issue {
  severity: "error" | "warn";
  message: string;
}

const issues: Issue[] = [];

function add(severity: "error" | "warn", message: string) {
  issues.push({ severity, message });
}

async function validateLocalFile(
  publicPath: string,
  minW?: number,
  minH?: number,
): Promise<void> {
  const fsPath = join(ROOT, "public", publicPath);
  if (!existsSync(fsPath)) {
    add("error", `Missing file: ${publicPath}`);
    return;
  }
  const st = statSync(fsPath);
  if (st.size === 0) {
    add("error", `Zero-byte file: ${publicPath}`);
    return;
  }
  try {
    const meta = await sharp(fsPath).metadata();
    if (minW && (meta.width ?? 0) < minW) {
      add("warn", `Low width ${meta.width} < ${minW}: ${publicPath}`);
    }
    if (minH && (meta.height ?? 0) < minH) {
      add("warn", `Low height ${meta.height} < ${minH}: ${publicPath}`);
    }
  } catch {
    add("error", `Corrupt image: ${publicPath}`);
  }
}

async function main() {
  console.log("\nLoreGraph Asset Validation");
  console.log("==========================\n");

  const records = loadManifestRecords();
  console.log(`Manifest records: ${records.length}`);

  let index: AssetManifestIndex | null = null;
  if (existsSync(INDEX_PATH)) {
    index = JSON.parse(readFileSync(INDEX_PATH, "utf8")) as AssetManifestIndex;
    console.log(`Index generated: ${index.generatedAt}`);
  } else {
    add("error", "manifest-index.json not found — run npm run assets:ingest");
  }

  let championsComplete = 0;
  const prioritySlugs = [
    "aatrox", "kaisa", "pantheon", "yasuo", "yone", "jinx", "vi", "viego",
    "thresh", "swain", "leblanc", "ambessa", "mel", "yunara", "aurelion-sol", "lux", "sylas",
  ];

  for (const character of characters) {
    const slug = character.slug;
    const url = getChampionAssetUrl(slug, "card");
    const hasLocal = hasLocalChampionAssets(slug);

    if (index?.champions[slug]) {
      const c = index.champions[slug];
      if (c.portrait) await validateLocalFile(c.portrait, 400, 400);
      if (c.card) await validateLocalFile(c.card, 600, 750);
      if (c.hero) await validateLocalFile(c.hero, 1200, 675);
      if (c.cinematic) await validateLocalFile(c.cinematic, 800, 1400);

      if (c.portrait && c.card && c.hero && c.cinematic) {
        championsComplete++;
      } else if (hasLocal) {
        add("warn", `${slug}: incomplete variant set`);
      }
    }

    if (!url) {
      add("error", `${slug}: no resolvable asset URL`);
    }

    if (prioritySlugs.includes(slug) && !hasLocal) {
      add("warn", `Priority champion ${slug} missing local assets`);
    }
  }

  if (index) {
    for (const [slug, meta] of Object.entries(index.events)) {
      if (meta.publicPath && meta.qaStatus !== "LOREGRAPH_COMPOSITE_FALLBACK") {
        await validateLocalFile(meta.publicPath);
      } else if (!meta.publicPath && !meta.isCompositeFallback) {
        add("warn", `Event ${slug}: missing official art`);
      }
    }
  }

  const errors = issues.filter((i) => i.severity === "error");
  const warns = issues.filter((i) => i.severity === "warn");

  console.log("\n--- Summary ---");
  console.log(`Champions complete: ${championsComplete}/${characters.length}`);
  console.log(`Errors: ${errors.length}`);
  console.log(`Warnings: ${warns.length}`);

  if (errors.length > 0) {
    console.log("\nErrors:");
    errors.slice(0, 25).forEach((e) => console.log(`  ✗ ${e.message}`));
  }
  if (warns.length > 0) {
    console.log("\nWarnings:");
    warns.slice(0, 15).forEach((w) => console.log(`  ! ${w.message}`));
    if (warns.length > 15) console.log(`  ... and ${warns.length - 15} more`);
  }

  if (errors.length > 0) {
    process.exit(1);
  }

  console.log("\nAsset validation complete ✓\n");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
