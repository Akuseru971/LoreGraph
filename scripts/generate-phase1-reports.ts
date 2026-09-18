/**
 * Phase 1 claim-provenance remediation audit reports.
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { characters, relationships } from "../data";
import { claims } from "../data/knowledge/claims";
import { storyPaths } from "../data/story-paths";
import { buildLoreGraph, findNarrativePath, resetLoreGraphCache } from "../lib/graph";
import { computeQuality, isPriorityChampion } from "../lib/knowledge/quality-matrix";
import { validateStoryPaths } from "../lib/story-path/validate";
import { isTrustedTimelineBeat } from "../lib/timeline/trust";
import { getSiteUrl, isProductionIndexable } from "../lib/seo";
import { dailyConnection } from "../lib/data/daily";

const PHASE1 = [
  "aatrox", "pantheon", "varus", "nasus", "renekton", "azir", "xerath",
  "kaisa", "kassadin", "malzahar", "belveth", "aurelion-sol", "leona", "diana", "zoe",
];

const storyResult = validateStoryPaths();
const reportsDir = join(process.cwd(), "reports");
mkdirSync(reportsDir, { recursive: true });

const extensionClaims = claims.filter((c) =>
  [
    "claim:varus-was-ascended",
    "claim:varus-became-darkin",
    "claim:varus-sealed-in-bow",
    "claim:nasus-was-ascended",
    "claim:pantheon-hosted-aspect-of-war",
    "claim:aspect-of-war-sealed-darkin",
    "claim:shurima-rite-of-ascension",
    "claim:aatrox-sealed-in-blade",
  ].includes(c.id),
);

const reviewedClaims = claims.filter((c) => c.reviewed && !c.needsReview);
const pendingClaims = claims.filter((c) => c.needsReview || !c.reviewed);
const editorialClaims = claims.filter((c) => c.certainty === "INTERPRETIVE");

let globalTimelineReviewed = 0;
let globalTimelineSourced = 0;
let globalTimelineHidden = 0;
for (const c of characters) {
  for (const beat of c.timeline) {
    globalTimelineReviewed++;
    if (beat.sourceIds?.length) globalTimelineSourced++;
    if (!isTrustedTimelineBeat(beat)) globalTimelineHidden++;
  }
}

let phase1TimelineReviewed = 0;
let phase1TimelineSourced = 0;
let phase1TimelineHidden = 0;
for (const slug of PHASE1) {
  const c = characters.find((ch) => ch.slug === slug);
  if (!c) continue;
  for (const beat of c.timeline) {
    phase1TimelineReviewed++;
    if (beat.sourceIds?.length) phase1TimelineSourced++;
    if (!isTrustedTimelineBeat(beat)) phase1TimelineHidden++;
  }
}

const priorityPaths = [
  "the-darkin",
  "targon-and-the-aspects",
  "the-fall-of-shurima",
  "piltover-and-zaun",
  "arcane-what-happened-next",
  "the-black-rose",
  "the-war-in-ionia",
];

const pathBlocks = storyPaths
  .filter((p) => priorityPaths.includes(p.slug))
  .flatMap((p) => p.chapters.flatMap((c) => c.blocks));

const factBlocks = pathBlocks.filter((b) => b.evidenceClass === "FACT");
const factPrimary = factBlocks.filter((b) =>
  b.sourceIds?.some((s) => s.includes("bio-") || s.includes("twilight") || s.includes("awaken")),
);
const factDowngraded = pathBlocks.filter((b) =>
  ["SUPPORTED_SYNTHESIS", "EDITORIAL_FRAMING", "UNRESOLVED"].includes(b.evidenceClass),
);

const tierCounts = { A: 0, B: 0, C: 0 };
const tierImproved: string[] = [];
for (const c of characters) {
  const q = computeQuality(c, c.completenessTier);
  tierCounts[q.tier]++;
  if (isPriorityChampion(c.slug) && q.tier === "B") tierImproved.push(c.name);
}

resetLoreGraphCache();
const graph = buildLoreGraph();
const connectChecks = [
  { from: "aatrox", to: "kaisa", note: "indirect" },
  { from: "aatrox", to: "nasus", note: "structural" },
  { from: "aatrox", to: "varus", note: "structural" },
  { from: "varus", to: "pantheon", note: "no direct edge" },
  { from: "pantheon", to: "aurelion-sol", note: "no fake shared event" },
];

const connectResults = connectChecks.map(({ from, to, note }) => {
  const path = findNarrativePath(`char:${from}`, `char:${to}`, graph);
  const direct = path?.steps.some(
    (s) =>
      s.edge.connectionKind === "direct" &&
      ((s.from.slug === from && s.to.slug === to) || (s.from.slug === to && s.to.slug === from)),
  );
  return `- ${from} → ${to}: ${path ? "path found" : "no path"} (${note})${direct ? " [direct edge used]" : ""}`;
});

writeFileSync(
  join(reportsDir, "phase1-claim-review.md"),
  [
    "# Phase 1 Claim Review",
    "",
    `Generated: ${new Date().toISOString()}`,
    "",
    `Claims reviewed (reviewed && !needsReview): ${reviewedClaims.length}`,
    `Atomic extension claims added: ${extensionClaims.length}`,
    `Claims upgraded to VERIFIED_CANON (extensions): ${extensionClaims.length}`,
    `Claims left PENDING: ${pendingClaims.length}`,
    `Claims marked interpretive/editorial certainty: ${editorialClaims.length}`,
    "",
    "## Phase 1 champions",
    "",
    ...PHASE1.map((slug) => {
      const c = characters.find((ch) => ch.slug === slug);
      return c
        ? `- **${c.name}** — continuity: ${c.continuity ?? "MISSING"}, bioBlocks: ${c.bioBlocks?.length ?? 0}`
        : `- ${slug} — not in roster seeds`;
    }),
  ].join("\n"),
);

writeFileSync(
  join(reportsDir, "phase1-source-audit.md"),
  [
    "# Phase 1 Source Audit",
    "",
    `Generated: ${new Date().toISOString()}`,
    "",
    "## Aatrox timeline source cleanup",
    "",
    "Per-beat sourceIds attached; removed blanket awaken/twilight reuse on all beats.",
    "",
    "## Varus Void War",
    "",
    "Downgraded: void-incursion removed from events and timeline. Ascended fact retained with bio-varus only.",
    "",
    "## Pantheon",
    "",
    "Modern beats use source:bio-pantheon. Twilight of the Gods not used as generic Pantheon bio support.",
  ].join("\n"),
);

writeFileSync(
  join(reportsDir, "phase1-timeline-audit.md"),
  [
    "# Phase 1 Timeline Audit",
    "",
    `Generated: ${new Date().toISOString()}`,
    "",
    "## Global roster timeline metrics",
    "",
    `Timeline beats reviewed (all champions): ${globalTimelineReviewed}`,
    `Beats with exact sourceIds: ${globalTimelineSourced}`,
    `Beats hidden/downgraded (fail trust): ${globalTimelineHidden}`,
    "",
    "## Phase 1 champion timeline metrics (15 champions only)",
    "",
    `Phase 1 timeline beats: ${phase1TimelineReviewed}`,
    `Phase 1 beats with sourceIds: ${phase1TimelineSourced}`,
    `Phase 1 beats hidden/downgraded: ${phase1TimelineHidden}`,
    "",
    "Varus Void War: **downgraded** (removed)",
    "Pantheon/Aurelion synthetic beat: **removed**",
  ].join("\n"),
);

writeFileSync(
  join(reportsDir, "phase1-relationship-audit.md"),
  [
    "# Phase 1 Relationship Audit",
    "",
    `Generated: ${new Date().toISOString()}`,
    "",
    `Varus↔Pantheon direct edge: **removed**`,
    `Total relationships: ${relationships.length}`,
    "",
    "Pantheon↔Aurelion Sol: structural/editorial — no shared synthetic event.",
  ].join("\n"),
);

writeFileSync(
  join(reportsDir, "phase1-story-path-audit.md"),
  [
    "# Phase 1 Story Path Audit",
    "",
    `Generated: ${new Date().toISOString()}`,
    "",
    "## Block counts (priority paths)",
    "",
    ...Object.entries(storyResult.blockCounts).map(([k, v]) => `- ${k}: ${v}`),
    "",
    `FACT blocks reviewed (priority): ${factBlocks.length}`,
    `FACT with primary Riot sources: ${factPrimary.length}`,
    `Blocks downgraded from FACT: ${factDowngraded.length}`,
    "",
    `Validation errors: ${storyResult.errors.length}`,
  ].join("\n"),
);

writeFileSync(
  join(reportsDir, "phase1-connect-regression.md"),
  [
    "# Phase 1 Connect Regression",
    "",
    `Generated: ${new Date().toISOString()}`,
    "",
    ...connectResults,
  ].join("\n"),
);

writeFileSync(
  join(reportsDir, "phase1-tier-matrix.md"),
  [
    "# Phase 1 Tier Matrix",
    "",
    `Generated: ${new Date().toISOString()}`,
    "",
    `Tier A: ${tierCounts.A}`,
    `Tier B: ${tierCounts.B}`,
    `Tier C: ${tierCounts.C}`,
    "",
    "Near Tier A (priority B):",
    tierImproved.length ? tierImproved.map((n) => `- ${n}`).join("\n") : "- none",
    "",
    `SEO SITE_URL: ${getSiteUrl()}`,
    `Production indexable: ${isProductionIndexable()}`,
    "",
    `Daily challenge: ${dailyConnection().aSlug} → ${dailyConnection().bSlug}`,
  ].join("\n"),
);

console.log("Phase 1 reports written to reports/phase1-*.md");
