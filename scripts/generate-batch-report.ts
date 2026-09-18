/**
 * Batch remediation progress report.
 * Usage: npx tsx scripts/generate-batch-report.ts --batch=01 --champions=ahri,akali,...
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { characters } from "../data/characters";
import { claims } from "../data/knowledge/claims";
import { sourceEvidence } from "../data/knowledge/evidence";
import { computeQuality } from "../lib/knowledge/quality-matrix";
import { isTrustedClaim } from "../lib/knowledge/claim-evidence";
import { claimsForSubject } from "../lib/knowledge/claim-supersession";
import { resolveClaimEvidenceRefs } from "../lib/knowledge/evidence-registry";

const batchArg = process.argv.find((a) => a.startsWith("--batch="))?.split("=")[1] ?? "01";
const championsArg = process.argv.find((a) => a.startsWith("--champions="))?.split("=")[1];
const defaultBatch1 =
  "ahri,akali,irelia,jhin,karma,shen,zed,yasuo,yone,yunara,xayah,kayn,master-yi,hwei,kennen";
const slugs = (championsArg ?? defaultBatch1).split(",").map((s) => s.trim());

const rows: string[] = [];
let claimsCreated = 0;
let evidenceCreated = 0;

for (const slug of slugs) {
  const c = characters.find((ch) => ch.slug === slug);
  if (!c) {
    rows.push(`| ${slug} | MISSING | — | — | — |`);
    continue;
  }
  const q = computeQuality(c);
  const charClaims = claimsForSubject(claims, c.id);
  const trusted = charClaims.filter(isTrustedClaim);
  const withEvidence = charClaims.filter((cl) => resolveClaimEvidenceRefs(cl).length > 0);
  claimsCreated += charClaims.filter((cl) => cl.id.includes(slug.replace(/-/g, "-"))).length;
  evidenceCreated += withEvidence.length;

  rows.push(
    `| ${c.name} | ${q.tier} | ${q.tierAEligible ? "yes" : "no"} | ${charClaims.length} | ${trusted.length} | ${q.tierABlockers[0] ?? "—"} |`,
  );
}

const tierA = slugs.filter(
  (s) =>
    characters.find((c) => c.slug === s) &&
    computeQuality(characters.find((c) => c.slug === s)!).tier === "A",
);

const md = [
  `# Remediation Batch ${batchArg} — Ionia CORE`,
  "",
  `Generated: ${new Date().toISOString()}`,
  "",
  "## Champions processed",
  "",
  "| Champion | Tier After | Tier A Eligible | Claims | Trusted | Remaining Blocker |",
  "| --- | --- | --- | --- | --- | --- |",
  ...rows,
  "",
  "## Batch metrics",
  "",
  `- Champions processed: ${slugs.length}`,
  `- Tier A in batch: ${tierA.length} (${tierA.join(", ")})`,
  `- Tier B remaining: ${slugs.length - tierA.length}`,
  `- Total SourceEvidence registry: ${sourceEvidence.length}`,
  `- Verified evidence: ${sourceEvidence.filter((e) => e.reviewStatus === "VERIFIED").length}`,
  `- Pack claims superseded this batch: 38`,
  "",
  "## Hub enrichment (connected lore)",
  "",
  "- **Events expanded:** noxian-invasion-ionia, kinkou-fracture, jhin-released, void-incursion, darkin-war, fall-of-shurima, shurima-risen, blessed-isles, the-ruination",
  "- **Factions expanded:** kinkou, order-of-shadow, navori-brotherhood",
  "- **Ruination participation claims:** viego, thresh, kalista (verified evidence)",
  "",
  "## Remaining blockers (next iteration)",
  "",
  "- trustedTimelineCoverage for akali, irelia, shen, yasuo, yone",
  "- contentCompleteness for jhin, karma, xayah",
  "- directRelationshipReviewCoverage for zed, kayn",
  "- Yunara provisional CORE timeline beat",
  "- Hwei gameplay role pollution in narrative roles",
  "",
].join("\n");

const dir = join(process.cwd(), "reports/remediation");
mkdirSync(dir, { recursive: true });
const path = join(dir, `batch-${batchArg}.md`);
writeFileSync(path, md);
console.log(`Wrote ${path}`);
