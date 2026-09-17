import type { FactConfidence, ReviewStatus, TimelineBeat } from "@/types";

/** Whether a beat is safe for default public timeline / Daily / cinematic fact narration. */
export function isTrustedTimelineBeat(beat: TimelineBeat): boolean {
  if (!beat.sourceIds?.length) return false;
  if (beat.canonStatus === "UNKNOWN") return false;
  if (beat.reviewStatus === "PENDING" || beat.reviewStatus === "REJECTED") {
    return false;
  }
  if (beat.evidenceClass === "UNRESOLVED" || beat.evidenceClass === "INTERPRETATION") {
    return false;
  }
  return true;
}

export function trustedTimelineBeats(beats: TimelineBeat[]): TimelineBeat[] {
  return beats.filter(isTrustedTimelineBeat);
}

export function provisionalTimelineBeats(beats: TimelineBeat[]): TimelineBeat[] {
  return beats.filter((b) => !isTrustedTimelineBeat(b));
}

export function deriveTimelineReviewStatus(
  beat: Pick<TimelineBeat, "sourceIds" | "claimIds" | "canonStatus">,
): ReviewStatus | undefined {
  if (!beat.sourceIds?.length) return "PENDING";
  if (beat.canonStatus === "UNKNOWN") return "PENDING";
  if (beat.claimIds?.length) return "VERIFIED_CANON";
  return "REVIEWED";
}

export function deriveTimelineConfidence(
  beat: Pick<TimelineBeat, "claimIds" | "reviewStatus">,
): FactConfidence {
  if (beat.reviewStatus === "VERIFIED_CANON" && beat.claimIds?.length) {
    return "DOCUMENTED";
  }
  if (beat.reviewStatus === "REVIEWED") return "STRONG";
  return "UNCERTAIN";
}
