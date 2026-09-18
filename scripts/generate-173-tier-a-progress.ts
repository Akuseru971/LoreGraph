/**
 * Live 173-champion Tier A campaign progress matrix from audit baseline.
 */
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { characters } from "../data/characters";
import { claims } from "../data/knowledge/claims";
import { breakdownClaims } from "../lib/knowledge/claim-metrics";
import { computeQuality } from "../lib/knowledge/quality-matrix";
import { isTrustedTimelineBeat } from "../lib/timeline/trust";
import { relationships } from "../data/relationships";

interface AuditChampion {
  slug: string;
  name: string;
  region: string;
  audit_state: "PHASE1_REVALIDATE" | "CURATED_PROVENANCE_GAP" | "FULL_TIER_A_BUILD";
  current_assessment: string;
  tier_a_blockers: string[];
  required_content: string[];
  primary_source_id: string;
  primary_source_url: string;
  research_focus: string;
}

interface AuditFile {
  generated_for_commit: string;
  champion_count: number;
  audit_counts: Record<string, number>;
  champions: AuditChampion[];
}

const auditPath = join(process.cwd(), "data/audit/173-champion-tier-a-audit.json");
const audit = JSON.parse(readFileSync(auditPath, "utf8")) as AuditFile;

const reportsDir = join(process.cwd(), "reports");
mkdirSync(reportsDir, { recursive: true });

type Row = {
  slug: string;
  name: string;
  region: string;
  auditState: string;
  tierBefore: string;
  tierAfter: string;
  bioReviewed: boolean;
  atomicClaims: number;
  primarySources: number;
  trustedTimelinePct: number;
  directRelReviewedPct: number;
  eventsReviewed: number;
  continuity: string;
  p0Issues: number;
  p1Issues: number;
  researchTasks: number;
  tierAEligible: boolean;
  remainingBlocker: string;
};

const rows: Row[] = [];

for (const entry of audit.champions) {
  const c = characters.find((ch) => ch.slug === entry.slug);
  if (!c) continue;

  const q = computeQuality(c);
  const metrics = breakdownClaims(claims.filter((cl) => cl.subjectId === c.id));
  const charRels = relationships.filter(
    (r) => r.sourceCharacterId === c.id || r.targetCharacterId === c.id,
  );
  const directRels = charRels.filter((r) => r.connectionType === "DIRECT_CANON");
  const directReviewed =
    directRels.length === 0
      ? 100
      : Math.round(
          (directRels.filter((r) => r.reviewed && r.reviewStatus !== "PENDING").length /
            directRels.length) *
            100,
        );

  const trustedCount = c.timeline.filter(isTrustedTimelineBeat).length;
  const trustedPct =
    c.timeline.length === 0 ? 0 : Math.round((trustedCount / c.timeline.length) * 100);

  const tierBefore =
    entry.audit_state === "PHASE1_REVALIDATE"
      ? "A*"
      : entry.audit_state === "CURATED_PROVENANCE_GAP"
        ? "B"
        : "C";

  rows.push({
    slug: entry.slug,
    name: entry.name,
    region: entry.region,
    auditState: entry.audit_state,
    tierBefore,
    tierAfter: q.tier,
    bioReviewed: Boolean(c.bioBlocks?.length),
    atomicClaims: metrics.total,
    primarySources: c.sourceIds.length,
    trustedTimelinePct: trustedPct,
    directRelReviewedPct: directReviewed,
    eventsReviewed: c.eventIds.length,
    continuity: c.continuity ?? "MISSING",
    p0Issues: q.tierABlockers.filter((b) => b.includes("unsupported event")).length,
    p1Issues: q.tierABlockers.length,
    researchTasks: q.tierAEligible ? 0 : 1,
    tierAEligible: q.tierAEligible,
    remainingBlocker: q.tierABlockers[0] ?? "—",
  });
}

const md = [
  "# 173 Champion Tier A Progress",
  "",
  `Generated: ${new Date().toISOString()}`,
  `Audit baseline commit: ${audit.generated_for_commit}`,
  "",
  "## Queue summary",
  "",
  `- PHASE1_REVALIDATE: ${audit.audit_counts.PHASE1_REVALIDATE}`,
  `- CURATED_PROVENANCE_GAP: ${audit.audit_counts.CURATED_PROVENANCE_GAP}`,
  `- FULL_TIER_A_BUILD: ${audit.audit_counts.FULL_TIER_A_BUILD}`,
  "",
  "## Tier distribution (current gates)",
  "",
  `- Tier A: ${rows.filter((r) => r.tierAfter === "A").length}`,
  `- Tier B: ${rows.filter((r) => r.tierAfter === "B").length}`,
  `- Tier C: ${rows.filter((r) => r.tierAfter === "C").length}`,
  `- Tier A eligible: ${rows.filter((r) => r.tierAEligible).length}`,
  "",
  "| Champion | Region | Audit State | Tier Before | Tier After | Claims | Trusted TL % | Direct Rel % | Continuity | Tier A Eligible | Remaining Blocker |",
  "| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |",
  ...rows.map(
    (r) =>
      `| ${r.name} | ${r.region} | ${r.auditState} | ${r.tierBefore} | ${r.tierAfter} | ${r.atomicClaims} | ${r.trustedTimelinePct} | ${r.directRelReviewedPct} | ${r.continuity} | ${r.tierAEligible ? "yes" : "no"} | ${r.remainingBlocker} |`,
  ),
].join("\n");

writeFileSync(join(reportsDir, "173-champion-tier-a-progress.md"), md);
writeFileSync(join(reportsDir, "173-champion-tier-a-progress.json"), JSON.stringify(rows, null, 2));

console.log("Progress reports written:");
console.log("- reports/173-champion-tier-a-progress.md");
console.log("- reports/173-champion-tier-a-progress.json");
console.log(
  `Tier A: ${rows.filter((r) => r.tierAfter === "A").length} | eligible: ${rows.filter((r) => r.tierAEligible).length}`,
);
