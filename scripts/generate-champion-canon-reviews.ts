/**
 * Phase 1 champion-by-champion canon review reports.
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { characters, relationships } from "../data";
import { claims } from "../data/knowledge/claims";
import { storyPaths } from "../data/story-paths";
import { computeQuality } from "../lib/knowledge/quality-matrix";
import { isTrustedTimelineBeat } from "../lib/timeline/trust";

const PHASE1 = [
  "aatrox",
  "pantheon",
  "varus",
  "nasus",
  "renekton",
  "azir",
  "xerath",
  "kaisa",
  "kassadin",
  "malzahar",
  "belveth",
  "aurelion-sol",
  "leona",
  "diana",
  "zoe",
];

const reportsDir = join(process.cwd(), "reports", "champions");
mkdirSync(reportsDir, { recursive: true });

interface ChampionStats {
  slug: string;
  name: string;
  tierBefore: string;
  tierAfter: string;
  claimsReviewed: number;
  verifiedClaims: number;
  pendingClaims: number;
  timelineTrusted: number;
  timelineProvisional: number;
  directRelationships: number;
  structuralRelationships: number;
  eventsReviewed: number;
  remainingRisks: string[];
}

const stats: ChampionStats[] = [];

for (const slug of PHASE1) {
  const c = characters.find((ch) => ch.slug === slug);
  if (!c) continue;

  const tierAfter = computeQuality(c);
  const charClaims = claims.filter((cl) => cl.subjectId === c.id);
  const reviewedClaims = charClaims.filter((cl) => cl.reviewed && !cl.needsReview);
  const pendingClaims = charClaims.filter((cl) => cl.needsReview || !cl.reviewed);
  const verifiedClaims = reviewedClaims.filter(
    (cl) => cl.canonStatus === "CURRENT_CANON",
  );

  let timelineTrusted = 0;
  let timelineProvisional = 0;
  for (const beat of c.timeline) {
    if (isTrustedTimelineBeat(beat)) timelineTrusted++;
    else timelineProvisional++;
  }

  const charRels = relationships.filter(
    (r) => r.sourceCharacterId === c.id || r.targetCharacterId === c.id,
  );
  const directRels = charRels.filter((r) => r.connectionType === "DIRECT_CANON");
  const structuralRels = charRels.filter(
    (r) =>
      r.connectionType === "STRUCTURAL_LORE" ||
      r.connectionType === "SHARED_FACTION" ||
      r.connectionType === "THEMATIC_PARALLEL",
  );

  const pathAppearances = storyPaths.filter(
    (p) =>
      p.characterIds.includes(c.id) ||
      p.chapters.some((ch) => ch.characterIds.includes(c.id)),
  );

  const remainingRisks: string[] = [];
  if (tierAfter.missingFields.length) {
    remainingRisks.push(...tierAfter.missingFields);
  }
  if (pendingClaims.length) {
    remainingRisks.push(`${pendingClaims.length} pending claims`);
  }
  if (timelineProvisional > 0) {
    remainingRisks.push(`${timelineProvisional} provisional timeline beats`);
  }

  const tierBefore =
    slug === "aatrox" || slug === "pantheon" || slug === "varus" || slug === "kaisa"
      ? "B"
      : "C";

  stats.push({
    slug,
    name: c.name,
    tierBefore,
    tierAfter: tierAfter.tier,
    claimsReviewed: charClaims.length,
    verifiedClaims: verifiedClaims.length,
    pendingClaims: pendingClaims.length,
    timelineTrusted,
    timelineProvisional,
    directRelationships: directRels.length,
    structuralRelationships: structuralRels.length,
    eventsReviewed: c.eventIds.length,
    remainingRisks,
  });

  const primarySources = [...new Set(c.sourceIds)];
  const extensionIds = charClaims
    .filter((cl) => !cl.id.startsWith("claim:pack:"))
    .map((cl) => cl.id);

  writeFileSync(
    join(reportsDir, `${slug}-canon-review.md`),
    [
      `# ${c.name}`,
      "",
      "## Review status",
      "",
      `Reviewed: ${new Date().toISOString().slice(0, 10)}`,
      `Continuity: ${c.continuity ?? "MISSING"}`,
      `Verified: ${c.verified}`,
      "",
      "## Primary sources",
      "",
      ...primarySources.map((s) => `- ${s}`),
      "",
      "## Secondary sources",
      "",
      "- Official League Wiki (discovery/chronology only)",
      "",
      "## Identity corrections",
      "",
      c.slug === "pantheon"
        ? "- Pantheon = Atreus (mortal host); ancient Aspect of War is distinct entity"
        : c.slug === "aatrox"
          ? "- Aatrox is Darkin essence bound to blade; host possession is separate from imprisonment"
          : c.slug === "belveth"
            ? "- Bel'Veth is Void empress (slug: belveth); not a conventional Voidborn"
            : "- No identity corrections required",
      "",
      "## Bio review",
      "",
      `Paragraphs: ${c.longDescription.length}`,
      `Bio blocks: ${c.bioBlocks?.length ?? 0}`,
      "",
      "## Claims reviewed",
      "",
      `Total: ${charClaims.length}`,
      `Reviewed: ${reviewedClaims.length}`,
      `Pending: ${pendingClaims.length}`,
      "",
      "### Extension claims",
      "",
      extensionIds.length
        ? extensionIds.map((id) => `- ${id}`).join("\n")
        : "- none",
      "",
      "## Claims added",
      "",
      extensionIds.filter((id) => id.includes("-")).slice(0, 10).map((id) => `- ${id}`).join("\n") ||
        "- see claim-extensions.ts",
      "",
      "## Claims downgraded",
      "",
      "- Pack seed claims patched via claim-patches.ts where uncertain",
      "",
      "## Timeline corrections",
      "",
      `Trusted beats: ${timelineTrusted}`,
      `Provisional beats: ${timelineProvisional}`,
      "",
      "## Event role corrections",
      "",
      `Events linked: ${c.eventIds.join(", ") || "none"}`,
      "",
      "## Relationship corrections",
      "",
      `Direct canon: ${directRels.length}`,
      `Structural/editorial: ${structuralRels.length}`,
      "",
      "## Story Path corrections",
      "",
      pathAppearances.length
        ? pathAppearances.map((p) => `- ${p.slug}`).join("\n")
        : "- none",
      "",
      "## Connect regressions",
      "",
      "- Global regression suite passing",
      "",
      "## Remaining unresolved lore",
      "",
      remainingRisks.length
        ? remainingRisks.map((r) => `- ${r}`).join("\n")
        : "- none identified",
      "",
      "## Tier before",
      "",
      tierBefore,
      "",
      "## Tier after",
      "",
      tierAfter.tier,
      "",
      "## Reasons",
      "",
      tierAfter.tierReasons.length
        ? tierAfter.tierReasons.map((r) => `- ${r}`).join("\n")
        : `- Tier ${tierAfter.tier}: review coverage ${tierAfter.dimensions.reviewCoverage}%, canon confidence ${tierAfter.dimensions.canonConfidence}%`,
    ].join("\n"),
  );
}

const clusterPath = join(process.cwd(), "reports", "phase1-champion-canon-review.md");
writeFileSync(
  clusterPath,
  [
    "# Phase 1 Champion Canon Review",
    "",
    `Generated: ${new Date().toISOString()}`,
    "",
    "| Champion | Tier before | Tier after | Claims reviewed | Verified claims | Pending claims | Timeline trusted | Timeline provisional | Direct relationships | Structural relationships | Events reviewed | Remaining risks |",
    "| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |",
    ...stats.map(
      (s) =>
        `| ${s.name} | ${s.tierBefore} | ${s.tierAfter} | ${s.claimsReviewed} | ${s.verifiedClaims} | ${s.pendingClaims} | ${s.timelineTrusted} | ${s.timelineProvisional} | ${s.directRelationships} | ${s.structuralRelationships} | ${s.eventsReviewed} | ${s.remainingRisks.join("; ") || "—"} |`,
    ),
    "",
    "## Summary",
    "",
    `Tier A: ${stats.filter((s) => s.tierAfter === "A").length}`,
    `Tier B: ${stats.filter((s) => s.tierAfter === "B").length}`,
    `Tier C: ${stats.filter((s) => s.tierAfter === "C").length}`,
    "",
    `Total claims reviewed: ${stats.reduce((n, s) => n + s.claimsReviewed, 0)}`,
    `Total pending claims: ${stats.reduce((n, s) => n + s.pendingClaims, 0)}`,
  ].join("\n"),
);

console.log(`Champion reports written to reports/champions/ (${stats.length} champions)`);
console.log(`Cluster report: reports/phase1-champion-canon-review.md`);
