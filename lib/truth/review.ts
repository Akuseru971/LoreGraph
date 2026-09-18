import { normalizeConfidence } from "@/lib/canon/model";
import type { Relationship, ReviewStatus } from "@/types";

/** Derive whether a relationship still needs editorial review. */
export function deriveNeedsReview(rel: Relationship): boolean {
  if (rel.reviewStatus === "PENDING") return true;

  if (rel.reviewStatus === "APPROVED_EDITORIAL" || rel.reviewStatus === "VERIFIED_CANON") {
    if (rel.connectionType === "DIRECT_CANON" && rel.sourceIds.length === 0) {
      return true;
    }
    return false;
  }

  if (rel.reviewStatus === "REJECTED") return true;

  if (!rel.verified) return true;

  const confidence = normalizeConfidence(rel.confidence);
  if (confidence === "UNCERTAIN") return true;

  if (rel.connectionType === "AMBIGUOUS") return true;

  if (rel.connectionType === "DIRECT_CANON" && rel.sourceIds.length === 0) {
    return true;
  }

  if (!rel.shortExplanation || rel.shortExplanation.length < 12) return true;

  return false;
}

export function deriveReviewStatus(
  rel: Pick<Relationship, "verified" | "connectionType" | "reviewed"> & {
    reviewStatus?: ReviewStatus;
  },
): ReviewStatus {
  if (rel.reviewStatus) return rel.reviewStatus;
  if (rel.reviewed && rel.verified && rel.connectionType === "DIRECT_CANON") {
    return "VERIFIED_CANON";
  }
  if (rel.reviewed) return "APPROVED_EDITORIAL";
  return "PENDING";
}

export function reviewReason(rel: Relationship): string | null {
  if (!deriveNeedsReview(rel)) return null;

  if (rel.reviewStatus === "REJECTED") return "Marked rejected";
  if (!rel.verified) return "Not verified against official sources";
  if (normalizeConfidence(rel.confidence) === "UNCERTAIN") {
    return "Confidence is uncertain";
  }
  if (rel.connectionType === "AMBIGUOUS") {
    return "Ambiguous connection — not explicitly confirmed";
  }
  if (rel.connectionType === "DIRECT_CANON" && rel.sourceIds.length === 0) {
    return "Direct canon without source references";
  }
  if (!rel.shortExplanation) return "Missing summary";
  if (rel.editorialNote) return rel.editorialNote;
  return "Flagged for review";
}

/** @deprecated Use deriveNeedsReview */
export function needsReview(rel: Relationship): boolean {
  return deriveNeedsReview(rel);
}
