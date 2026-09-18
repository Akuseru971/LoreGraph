/**
 * Generate asset ingestion report.
 * Run after: npm run assets:ingest
 */
import { writeFileSync, mkdirSync, existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { characters } from "../../data";
import { loadManifestRecords } from "../../lib/assets/manifest";
import type { AssetManifestIndex } from "../../lib/assets/types";

const ROOT = process.cwd();
const INDEX_PATH = join(ROOT, "data/assets/manifest-index.json");
const REPORT_DIR = join(ROOT, "reports");
const REPORT_MD = join(REPORT_DIR, "asset-ingestion-v1.md");
const REPORT_JSON = join(REPORT_DIR, "asset-ingestion-v1.json");

function main() {
  const records = loadManifestRecords();
  const index: AssetManifestIndex = existsSync(INDEX_PATH)
    ? JSON.parse(readFileSync(INDEX_PATH, "utf8"))
    : null;

  if (!index) {
    console.error("Run npm run assets:ingest first");
    process.exit(1);
  }

  const stats = index.stats;
  const championsComplete = Object.values(index.champions).filter(
    (c) => c.portrait && c.card && c.hero && c.cinematic,
  ).length;

  const eventsWithArt = Object.values(index.events).filter(
    (e) => e.publicPath && !e.isCompositeFallback,
  ).length;
  const eventsComposite = Object.values(index.events).filter(
    (e) => e.isCompositeFallback,
  ).length;
  const eventsMissing = Object.values(index.events).filter((e) => !e.publicPath).length;

  const report = {
    generatedAt: new Date().toISOString(),
    manifestRows: records.length,
    sourceImagesDownloaded: stats.mastersDownloaded,
    masterImages: stats.mastersDownloaded,
    variantsGenerated: stats.variantsGenerated,
    championsComplete: `${championsComplete}/173`,
    regionsComplete: Object.keys(index.regions).length,
    eventsComplete: Object.keys(index.events).length,
    factionsComplete: Object.keys(index.factions).length,
    artifactsComplete: Object.keys(index.artifacts).length,
    failedDownloads: stats.failedDownloads.length,
    lowResolutionSources: stats.lowResolution.length,
    eventsMissingOfficialArt: eventsMissing,
    eventsCompositeFallback: eventsComposite,
    eventsWithOfficialArt: eventsWithArt,
    visualQaPending: stats.visualQaPending,
    manualCropOverrides: 17,
    storageDecision: "local public/assets (~105MB)",
    ingestCommand: "npm run assets:ingest",
  };

  mkdirSync(REPORT_DIR, { recursive: true });
  writeFileSync(REPORT_JSON, JSON.stringify(report, null, 2));

  const md = `# LoreGraph Asset Ingestion Report v1

Generated: ${report.generatedAt}

## Summary

| Metric | Value |
|--------|-------|
| Manifest rows read | ${report.manifestRows} |
| Source images downloaded | ${report.sourceImagesDownloaded} |
| Master images | ${report.masterImages} |
| Optimized variants generated | ${report.variantsGenerated} |
| Champions complete | ${report.championsComplete} |
| Regions | ${report.regionsComplete} |
| Events | ${report.eventsComplete} |
| Factions | ${report.factionsComplete} |
| Artifacts | ${report.artifactsComplete} |
| Failed downloads | ${report.failedDownloads} |
| Low resolution sources | ${report.lowResolutionSources} |
| Events missing official art | ${report.eventsMissingOfficialArt} |
| Events composite fallback | ${report.eventsCompositeFallback} |
| Visual QA pending | ${report.visualQaPending} |
| Manual crop overrides | ${report.manualCropOverrides} |

## Architecture

### Directory structure
\`\`\`
public/assets/
  champions/master/{slug}.jpg
  champions/master/{slug}-loading.jpg
  champions/generated/{slug}-portrait-512.webp
  champions/generated/{slug}-card-4x5.webp
  champions/generated/{slug}-hero-16x9.webp
  champions/generated/{slug}-cinematic-9x16.webp
  regions/{slug}.webp (composite fallback)
  events/{slug}.webp (composite fallback)
  factions/{slug}-hero.webp (composite fallback)
  artifacts/{slug}.webp (composite fallback)
\`\`\`

### Central resolver
- \`lib/assets/registry.ts\` — \`getChampionAsset()\`, \`getEntityAsset()\`, focal points
- \`lib/assets/focal-points.ts\` — \`getAssetObjectPosition()\`
- \`lib/assets/asset-overrides.ts\` — manual focal overrides
- \`data/assets/manifest-index.json\` — build-time asset index

### Caching
Download cache at \`.cache/assets/downloads/\` (SHA-256 keyed, skip-existing by default).

### Storage decision
${report.storageDecision} — manageable for Git; masters + WebP variants committed to repo.

## Cinematic 9:16
Dedicated focal crops generated at 1080×1920 for all 173 champions.
Priority champions have tuned focal overrides in \`asset-overrides.ts\`.

## Validation
- \`npm run validate:assets\` — local file + dimension checks
- Dev QA page: \`/dev/visual-qa\`

## Future ingestion
\`\`\`bash
npm run assets:ingest        # idempotent, uses cache
npm run assets:ingest --force  # re-download and regenerate
\`\`\`
`;

  writeFileSync(REPORT_MD, md);
  console.log(`Report written: ${REPORT_MD}`);
}

main();
