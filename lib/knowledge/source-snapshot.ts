import { createHash } from "node:crypto";
import type { EvidenceReviewStatus, SourceEvidence, SourceSnapshot } from "@/types";

/** Normalize text for excerpt-in-snapshot matching (punctuation/unicode tolerant). */
export function normalizeTextForMatch(text: string): string {
  return text
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[''`]/g, "'")
    .replace(/[""]/g, '"')
    .replace(/[^a-z0-9'\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function hashContent(text: string): string {
  return createHash("sha256").update(normalizeTextForMatch(text)).digest("hex");
}

export function excerptFoundInSnapshot(
  snapshot: SourceSnapshot,
  excerpt: string,
): boolean {
  if (!excerpt?.trim()) return false;
  const haystack = normalizeTextForMatch(snapshot.normalizedText ?? "");
  const needle = normalizeTextForMatch(excerpt);
  if (!haystack || !needle) return false;
  return haystack.includes(needle);
}

export function normalizedFactFoundInSnapshot(
  snapshot: SourceSnapshot,
  fact: string,
): boolean {
  if (!fact?.trim()) return false;
  const haystack = normalizeTextForMatch(snapshot.normalizedText ?? "");
  const needle = normalizeTextForMatch(fact);
  if (!haystack || !needle) return false;
  if (haystack.includes(needle)) return true;
  // Allow fact-index lookup for manually curated publication snapshots.
  if (snapshot.factIndex?.length) {
    return snapshot.factIndex.some((entry) =>
      normalizeTextForMatch(entry).includes(needle) ||
      needle.includes(normalizeTextForMatch(entry)),
    );
  }
  return false;
}

export interface EvidenceSnapshotVerification {
  snapshot?: SourceSnapshot;
  excerptVerified: boolean;
  factVerified: boolean;
  hashMatch: boolean;
  reviewStatus: EvidenceReviewStatus;
  reason?: string;
}

export function verifyEvidenceAgainstSnapshot(
  evidence: SourceEvidence,
  snapshot: SourceSnapshot | undefined,
): EvidenceSnapshotVerification {
  if (!snapshot) {
    return {
      excerptVerified: false,
      factVerified: false,
      hashMatch: false,
      reviewStatus: "PENDING",
      reason: `no snapshot for source ${evidence.sourceId}`,
    };
  }

  const hashMatch =
    !evidence.sourceSnapshotHash ||
    evidence.sourceSnapshotHash === snapshot.contentHash;

  if (evidence.sourceSnapshotHash && !hashMatch) {
    return {
      snapshot,
      excerptVerified: false,
      factVerified: false,
      hashMatch: false,
      reviewStatus: "REVIEW_REQUIRED",
      reason: `snapshot hash mismatch for ${evidence.id}`,
    };
  }

  const excerptVerified = evidence.shortExcerpt
    ? excerptFoundInSnapshot(snapshot, evidence.shortExcerpt)
    : false;

  const factVerified = normalizedFactFoundInSnapshot(
    snapshot,
    evidence.normalizedFact,
  );

  // Manual review path (option C) — locator + explicit review metadata.
  if (
    evidence.reviewStatus === "VERIFIED" &&
    evidence.reviewMethod === "MANUAL_LOCATOR" &&
    evidence.sourceLocator
  ) {
    return {
      snapshot,
      excerptVerified,
      factVerified,
      hashMatch: true,
      reviewStatus: "VERIFIED",
    };
  }

  if (evidence.shortExcerpt) {
    if (!excerptVerified) {
      return {
        snapshot,
        excerptVerified: false,
        factVerified,
        hashMatch,
        reviewStatus: "REJECTED",
        reason: `shortExcerpt not found in snapshot for ${evidence.id}`,
      };
    }
    return {
      snapshot,
      excerptVerified: true,
      factVerified,
      hashMatch: true,
      reviewStatus: "VERIFIED",
    };
  }

  if (factVerified && evidence.sourceLocator) {
    return {
      snapshot,
      excerptVerified: false,
      factVerified: true,
      hashMatch: true,
      reviewStatus: "REVIEWED",
    };
  }

  return {
    snapshot,
    excerptVerified: false,
    factVerified,
    hashMatch,
    reviewStatus: "PENDING",
    reason: `insufficient snapshot proof for ${evidence.id}`,
  };
}

export function isEvidenceRecordVerified(
  evidence: SourceEvidence,
  snapshot: SourceSnapshot | undefined,
): boolean {
  const result = verifyEvidenceAgainstSnapshot(evidence, snapshot);
  return result.reviewStatus === "VERIFIED";
}
