/**
 * Global content depth report.
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { characters, events, factions, storyPaths } from "../data";
import { computeQuality } from "../lib/knowledge/quality-matrix";
import { runContentDepthAudit, MAJOR_EVENT_SLUGS } from "../lib/knowledge/content-depth";

const issues = runContentDepthAudit();
const reportsDir = join(process.cwd(), "reports");
mkdirSync(reportsDir, { recursive: true });

const richChampions = characters.filter(
  (c) => c.longDescription.length >= 4 && c.timeline.length >= 4,
).length;
const thinChampions = characters.filter((c) => c.longDescription.length < 2).length;

const majorEventsComplete = MAJOR_EVENT_SLUGS.filter((slug) => {
  const e = events.find((ev) => ev.slug === slug);
  return e && e.description.length >= 120 && (e.sourceIds?.length ?? 0) > 0;
}).length;

const md = [
  "# Content Depth Report",
  "",
  `Generated: ${new Date().toISOString()}`,
  "",
  "## Summary",
  "",
  `- Champions with rich profiles (4+ bio paragraphs, 4+ timeline beats): ${richChampions}`,
  `- Champions still thin (<2 bio paragraphs): ${thinChampions}`,
  `- Tier A champions: ${characters.filter((c) => computeQuality(c).tier === "A").length}`,
  `- Major events complete: ${majorEventsComplete}/${MAJOR_EVENT_SLUGS.length}`,
  `- Story paths: ${storyPaths.length}`,
  `- Factions: ${factions.length}`,
  `- Content depth issues flagged: ${issues.length}`,
  "",
  "## Issues by kind",
  "",
  ...[...new Set(issues.map((i) => i.kind))].map((kind) => {
    const count = issues.filter((i) => i.kind === kind).length;
    return `- ${kind}: ${count}`;
  }),
  "",
  "## Top issues",
  "",
  ...issues.slice(0, 40).map((i) => `- **${i.entityLabel}** — ${i.kind}: ${i.detail}`),
].join("\n");

writeFileSync(join(reportsDir, "content-depth-report.md"), md);
console.log("Wrote reports/content-depth-report.md");
