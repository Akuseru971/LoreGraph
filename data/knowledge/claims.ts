/**
 * Claim-level knowledge layer.
 * Core reviewed claims are preserved; pack v1 claims merged via import pipeline.
 */
import { claimEvidenceBindings } from "./evidence";
import { mergedClaims } from "./generated/claims-merged";
import { applyClaimPatches } from "./claim-patches";
import { applyClaimSupersession } from "./claim-supersession";
import { claimExtensions } from "./claim-extensions";
import { ioniaBatch1Claims } from "./claim-extensions-ionia-batch1";
import type { Claim } from "@/types";

function attachEvidenceRefs(claim: Claim): Claim {
  const refs = claim.evidenceRefs ?? claimEvidenceBindings[claim.id];
  if (!refs?.length) return claim;
  const sourceIds = claim.sourceIds.length
    ? claim.sourceIds
    : [...new Set(refs.map((r) => r.split("--")[1]).filter(Boolean))];
  return {
    ...claim,
    evidenceRefs: refs,
    sourceIds: claim.sourceIds.length ? claim.sourceIds : sourceIds,
  };
}

const mergedById = new Map(
  applyClaimPatches(mergedClaims)
    .map(applyClaimSupersession)
    .map((c) => [c.id, attachEvidenceRefs(c)]),
);
for (const ext of claimExtensions) {
  mergedById.set(ext.id, attachEvidenceRefs(ext));
}
for (const ext of ioniaBatch1Claims) {
  mergedById.set(ext.id, attachEvidenceRefs(ext));
}
export const claims: Claim[] = [...mergedById.values()];
export const claimById = new Map(claims.map((c) => [c.id, c]));
