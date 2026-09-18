import { claimById } from "@/data/knowledge/claims";
import {
  canPromoteToVerifiedCanon,
  evaluateClaimsTrust,
  type ClaimSourceAuthority,
} from "@/lib/knowledge/claim-trust";
import { propositionFullySupported } from "@/lib/knowledge/claim-propositions";
import type { FactConfidence, ReviewStatus, TimelineBeat } from "@/types";

/** Whether a beat is safe for default public timeline / Daily / cinematic fact narration. */
export function isTrustedTimelineBeat(beat: TimelineBeat): boolean {
  if (!beat.sourceIds?.length) return false;
  if (!beat.claimIds?.length) return false;
  if (beat.canonStatus === "UNKNOWN") return false;
  if (beat.reviewStatus !== "VERIFIED_CANON") return false;
  if (beat.evidenceClass !== "FACT") return false;
  if (!propositionFullySupported(beat.description, beat.claimIds)) return false;
  return true;
}

export function trustedTimelineBeats(beats: TimelineBeat[]): TimelineBeat[] {
  return beats.filter(isTrustedTimelineBeat);
}

export function provisionalTimelineBeats(beats: TimelineBeat[]): TimelineBeat[] {
  return beats.filter((b) => !isTrustedTimelineBeat(b));
}

export function deriveTimelineReviewStatus(
  beat: Pick<TimelineBeat, "description" | "sourceIds" | "claimIds" | "canonStatus" | "continuity">,
): ReviewStatus {
  if (!beat.sourceIds?.length) return "PENDING";
  if (beat.canonStatus === "UNKNOWN") return "PENDING";
  if (!beat.claimIds?.length) return "REVIEWED";

  const claimIds = beat.claimIds;
  const propositionSupported = propositionFullySupported(beat.description, claimIds);

  if (
    canPromoteToVerifiedCanon({
      text: beat.description,
      claimIds,
      sourceIds: beat.sourceIds,
      continuity: beat.continuity,
      propositionSupported,
    })
  ) {
    return "VERIFIED_CANON";
  }

  const trust = evaluateClaimsTrust(claimIds);
  if (trust.canBeFact && propositionSupported) return trust.reviewStatus;
  if (propositionSupported && trust.reviewStatus === "REVIEWED") return "REVIEWED";
  return "PENDING";
}

export function deriveTimelineConfidence(
  beat: Pick<TimelineBeat, "claimIds" | "reviewStatus" | "description">,
): FactConfidence {
  if (beat.reviewStatus === "VERIFIED_CANON" && beat.claimIds?.length) {
    const supported = propositionFullySupported(
      beat.description,
      beat.claimIds,
    );
    if (supported) return "DOCUMENTED";
  }
  if (beat.reviewStatus === "REVIEWED") return "STRONG";
  return "UNCERTAIN";
}

export function deriveTimelineEvidenceClass(
  beat: Pick<
    TimelineBeat,
    "description" | "sourceIds" | "claimIds" | "canonStatus" | "continuity" | "reviewStatus"
  >,
): TimelineBeat["evidenceClass"] {
  const reviewStatus = beat.reviewStatus ?? deriveTimelineReviewStatus(beat);
  if (reviewStatus === "VERIFIED_CANON") return "FACT";
  if (!beat.claimIds?.length) return "UNRESOLVED";
  if (propositionFullySupported(beat.description, beat.claimIds)) {
    return reviewStatus === "REVIEWED" ? "SUPPORTED_SYNTHESIS" : "UNRESOLVED";
  }
  return "SUPPORTED_SYNTHESIS";
}

export function timelineBeatAuthority(
  beat: Pick<TimelineBeat, "claimIds">,
): ClaimSourceAuthority {
  if (!beat.claimIds?.length) return "DERIVED";
  const trust = evaluateClaimsTrust(beat.claimIds);
  return trust.authority;
}
