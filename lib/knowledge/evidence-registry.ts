import {
  claimEvidenceBindings,
  sourceEvidence,
  sourceEvidenceById,
} from "@/data/knowledge/evidence";
import type { Claim, SourceEvidence } from "@/types";

export function getSourceEvidence(id: string): SourceEvidence | undefined {
  return sourceEvidenceById.get(id);
}

export function evidenceForClaim(claimId: string): SourceEvidence[] {
  const refs = claimEvidenceBindings[claimId] ?? [];
  return refs.map((id) => sourceEvidenceById.get(id)).filter(Boolean) as SourceEvidence[];
}

export function resolveClaimEvidenceRefs(claim: Claim): SourceEvidence[] {
  const refs = claim.evidenceRefs ?? claimEvidenceBindings[claim.id] ?? [];
  return refs.map((id) => sourceEvidenceById.get(id)).filter(Boolean) as SourceEvidence[];
}

export function allSourceEvidence(): SourceEvidence[] {
  return sourceEvidence;
}
