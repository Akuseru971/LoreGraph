/**
 * Source evidence coverage report — uses runtime evidence registry and snapshot verification.
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { claims } from "../data/knowledge/claims";
import { sourceEvidence } from "../data/knowledge/evidence";
import { getSourceSnapshots } from "../data/knowledge/source-snapshots";
import { isTrustedClaim, STRONG_PREDICATES } from "../lib/knowledge/claim-evidence";
import { isActiveClaim } from "../lib/knowledge/claim-supersession";
import { resolveClaimEvidenceRefs } from "../lib/knowledge/evidence-registry";
import { verifyEvidenceAgainstSnapshot } from "../lib/knowledge/source-snapshot";

const snapshots = getSourceSnapshots();
const snapshotById = new Map(snapshots.map((s) => [s.sourceId, s]));

let verified = 0;
let pending = 0;
let rejected = 0;
let reviewRequired = 0;
let verifiedExcerpts = 0;
let withoutSnapshots = 0;
let staleSnapshots = 0;

for (const record of sourceEvidence) {
  const snapshot = snapshotById.get(record.sourceId);
  if (!snapshot) withoutSnapshots++;
  const v = verifyEvidenceAgainstSnapshot(record, snapshot);
  switch (v.reviewStatus) {
    case "VERIFIED":
      verified++;
      if (v.excerptVerified) verifiedExcerpts++;
      break;
    case "PENDING":
      pending++;
      break;
    case "REJECTED":
      rejected++;
      break;
    case "REVIEW_REQUIRED":
      reviewRequired++;
      staleSnapshots++;
      break;
    default:
      break;
  }
}

const claimsWithEvidenceRefs = claims.filter(
  (c) => isActiveClaim(c) && (c.evidenceRefs?.length ?? 0) > 0,
).length;

const trustedWithVerified = claims.filter((c) => {
  if (!isActiveClaim(c) || !isTrustedClaim(c)) return false;
  return resolveClaimEvidenceRefs(c).some((e) => e.reviewStatus === "VERIFIED");
}).length;

const strongLackingVerified = claims.filter((c) => {
  if (!isActiveClaim(c) || !c.reviewed || c.needsReview) return false;
  if (!STRONG_PREDICATES.has(c.predicate)) return false;
  const evidence = resolveClaimEvidenceRefs(c);
  return !evidence.some((e) => e.reviewStatus === "VERIFIED");
}).length;

const md = [
  "# Source Evidence Coverage",
  "",
  `Generated: ${new Date().toISOString()}`,
  "",
  "## Registry metrics",
  "",
  `- Total SourceEvidence records: ${sourceEvidence.length}`,
  `- Verified SourceEvidence: ${verified}`,
  `- Pending SourceEvidence: ${pending}`,
  `- Rejected SourceEvidence: ${rejected}`,
  `- Review required (stale snapshot): ${reviewRequired}`,
  `- SourceEvidence with verified excerpts: ${verifiedExcerpts}`,
  `- SourceEvidence without snapshots: ${withoutSnapshots}`,
  `- Source snapshots: ${snapshots.length}`,
  `- Stale snapshots (hash mismatch): ${staleSnapshots}`,
  "",
  "## Claim linkage",
  "",
  `- Active claims with evidenceRefs: ${claimsWithEvidenceRefs}`,
  `- Trusted claims with verified evidence: ${trustedWithVerified}`,
  `- Strong reviewed claims lacking verified evidence: ${strongLackingVerified}`,
  "",
  "## Verification chain",
  "",
  "SOURCE SNAPSHOT → verified shortExcerpt → SourceEvidence (VERIFIED) → trusted claim → CORE lore",
  "",
].join("\n");

const reportsDir = join(process.cwd(), "reports");
mkdirSync(reportsDir, { recursive: true });
writeFileSync(join(reportsDir, "source-evidence-coverage.md"), md);
console.log("Wrote reports/source-evidence-coverage.md");
