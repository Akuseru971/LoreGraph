/**
 * Claim source exactness validation — all reviewed/trusted claims, not extensions only.
 */
import { characters } from "../data/characters";
import { claims } from "../data/knowledge/claims";
import { sourceById } from "../data/sources";
import {
  detectCircularClaimChains,
  validateClaimEvidenceChain,
} from "../lib/knowledge/claim-circular";
import { isWikiOnlyClaim } from "../lib/knowledge/claim-trust";

const errors: string[] = [];
const warnings: string[] = [];

function isAuditedClaim(claim: { reviewed: boolean; needsReview: boolean }): boolean {
  return claim.reviewed || !claim.needsReview;
}

const auditedClaims = claims.filter(isAuditedClaim);

for (const claim of auditedClaims) {
  if (!claim.sourceIds.length) {
    errors.push(`${claim.id}: reviewed claim has no sources`);
  }
  for (const sid of claim.sourceIds) {
    if (!sourceById.has(sid)) {
      errors.push(`${claim.id}: unknown source ${sid}`);
    }
  }

  for (const issue of validateClaimEvidenceChain(claim)) {
    errors.push(`${claim.id}: ${issue.kind} — ${issue.detail}`);
  }

  if (
    claim.subjectId.startsWith("concept:") &&
    claim.sourceIds.length === 1 &&
    claim.sourceIds[0].startsWith("source:bio-")
  ) {
    warnings.push(
      `${claim.id}: civilization claim supported only by single champion bio (${claim.sourceIds[0]})`,
    );
  }

  if (isWikiOnlyClaim(claim) && claim.certainty === "DOCUMENTED") {
    warnings.push(`${claim.id}: wiki-only claim marked DOCUMENTED`);
  }

  if (claim.id === "claim:varus-was-ascended") {
    if (!claim.sourceIds.includes("source:twilight-of-the-gods")) {
      warnings.push(`${claim.id}: expected twilight-of-the-gods as primary historical source`);
    }
  }
}

for (const issue of detectCircularClaimChains(auditedClaims)) {
  errors.push(`${issue.claimId}: ${issue.kind} — ${issue.detail}`);
}

// Claims referenced by trusted bio/timeline surfaces must be audited
for (const character of characters) {
  for (const beat of character.timeline) {
    if (!beat.claimIds?.length) continue;
    for (const cid of beat.claimIds) {
      const claim = claims.find((c) => c.id === cid);
      if (!claim) {
        errors.push(`${character.slug} timeline beat references missing claim ${cid}`);
        continue;
      }
      if (!isAuditedClaim(claim)) {
        warnings.push(`${character.slug} timeline uses unreviewed claim ${cid}`);
      }
    }
    if (beat.reviewStatus === "VERIFIED_CANON" && !beat.claimIds.length) {
      errors.push(`${character.slug} VERIFIED_CANON timeline beat missing claimIds`);
    }
  }

  for (const block of character.bioBlocks ?? []) {
    for (const cid of block.claimIds ?? []) {
      const claim = claims.find((c) => c.id === cid);
      if (!claim) {
        errors.push(`${character.slug} bio block references missing claim ${cid}`);
      } else if (block.evidenceClass === "FACT" && !isAuditedClaim(claim)) {
        warnings.push(`${character.slug} FACT bio block uses unreviewed claim ${cid}`);
      }
    }
  }
}

console.log(`Claims audited: ${auditedClaims.length}`);
console.log(`Total claims in registry: ${claims.length}`);
for (const w of warnings) console.warn(`WARN: ${w}`);
for (const e of errors) console.error(`ERROR: ${e}`);

if (errors.length) {
  console.error(`\nvalidate:claims FAILED (${errors.length})`);
  process.exit(1);
}

console.log("\nvalidate:claims PASSED");
