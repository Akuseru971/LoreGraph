/**
 * Champion quality matrix report.
 * Run with `npm run report:quality`.
 */
import { writeFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";
import { characters } from "../data/characters";
import { computeQuality, isPriorityChampion } from "../lib/knowledge/quality-matrix";

const rows = characters.map((c) => {
  const q = computeQuality(c, c.completenessTier);
  return {
    name: c.name,
    slug: c.slug,
    tier: q.tier,
    contentCompleteness: q.dimensions.contentCompleteness,
    sourceCoverage: q.dimensions.sourceCoverage,
    canonConfidence: q.dimensions.canonConfidence,
    reviewCoverage: q.dimensions.reviewCoverage,
    continuity: c.continuity ?? "unset",
    needsResearch: c.needsResearch ?? false,
    criticalMissing: q.dimensions.criticalMissing.join("; ") || "—",
    tierReasons: q.tierReasons?.join("; ") ?? "—",
    priority: isPriorityChampion(c.slug),
  };
});

rows.sort((a, b) => {
  const scoreA =
    a.contentCompleteness + a.sourceCoverage + a.canonConfidence + a.reviewCoverage;
  const scoreB =
    b.contentCompleteness + b.sourceCoverage + b.canonConfidence + b.reviewCoverage;
  return scoreA - scoreB;
});

const tierA = rows.filter((r) => r.tier === "A").length;
const tierB = rows.filter((r) => r.tier === "B").length;
const tierC = rows.filter((r) => r.tier === "C").length;

const lines = [
  "# Champion Quality Matrix",
  "",
  `Generated: ${new Date().toISOString()}`,
  "",
  `**Tier A:** ${tierA} | **Tier B:** ${tierB} | **Tier C:** ${tierC}`,
  "",
  "| Champion | Tier | Content | Sources | Canon | Review | Continuity | Critical Missing |",
  "|----------|------|---------|---------|-------|--------|------------|------------------|",
];

for (const r of rows) {
  lines.push(
    `| ${r.name} | ${r.tier} | ${r.contentCompleteness}% | ${r.sourceCoverage}% | ${r.canonConfidence}% | ${r.reviewCoverage}% | ${r.continuity} | ${r.criticalMissing} |`,
  );
}

lines.push("");
lines.push("## Closest to Tier A");
const nearA = rows
  .filter((r) => r.tier === "B")
  .sort((a, b) => {
    const gapA = 80 - (a.reviewCoverage + a.canonConfidence) / 2;
    const gapB = 80 - (b.reviewCoverage + b.canonConfidence) / 2;
    return gapA - gapB;
  })
  .slice(0, 20);

for (const r of nearA) {
  lines.push(`- **${r.name}** — review ${r.reviewCoverage}%, canon ${r.canonConfidence}%`);
}

lines.push("");
lines.push("## Priority QA Champions");
for (const r of rows.filter((r) => r.priority)) {
  lines.push(`- **${r.name}**: Tier ${r.tier}${r.tierReasons !== "—" ? ` (${r.tierReasons})` : ""}`);
}

const outDir = join(process.cwd(), "reports");
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "champion-quality-matrix.md");
writeFileSync(outPath, lines.join("\n"));

console.log(`Wrote ${outPath}`);
console.log(`Tier A: ${tierA}, Tier B: ${tierB}, Tier C: ${tierC}`);
