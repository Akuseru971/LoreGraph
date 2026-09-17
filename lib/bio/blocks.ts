import { claimById, claims } from "@/data/knowledge/claims";
import { bioSourceId } from "@/data/sources";
import type {
  BioNarrativeBlock,
  CanonStatus,
  NarrativeEvidenceClass,
  ReviewStatus,
} from "@/types";
import { classifyParagraph } from "@/lib/story-path/classify";
import {
  downgradeUnsupportedFact,
  resolveSupportingClaims,
  reviewedClaims,
  sourcesFromClaims,
} from "@/lib/story-path/support";

/** Per-champion editorial markers beyond the shared classifier. */
const BIO_EDITORIAL_PATTERNS: Record<string, RegExp[]> = {
  aatrox: [
    /\bstatues were carved\b/i,
    /\bsongs were written\b/i,
    /\bcurdled into appetite\b/i,
    /\bmost reliable exit\b/i,
    /\bconsequence with a grudge\b/i,
    /\bbuilt the cage\b/i,
  ],
  varus: [
    /\bdefender turned into something\b/i,
    /\bneeded the war to keep going\b/i,
    /\bmost intimate horror\b/i,
    /\bsharing a home\b/i,
  ],
  pantheon: [
    /\binteresting is what happened next\b/i,
    /\bneither of them is owed\b/i,
    /\brare figure\b/i,
  ],
  nasus: [
    /\bgrief is specific\b/i,
    /\bshapes most of what\b/i,
  ],
  azir: [
    /\bwhether anyone alive wants\b/i,
  ],
  kaisa: [
    /\bfor loregraph purposes\b/i,
  ],
};

function findCandidateClaims(characterId: string): string[] {
  return claims
    .filter(
      (c) =>
        c.subjectId === characterId &&
        c.reviewed &&
        !c.needsReview &&
        c.canonStatus !== "UNKNOWN" &&
        c.canonStatus !== "THEMATIC_ONLY",
    )
    .map((c) => c.id);
}

function classifyBioParagraph(
  slug: string,
  text: string,
  index: number,
): NarrativeEvidenceClass {
  const editorial = BIO_EDITORIAL_PATTERNS[slug];
  if (editorial?.some((p) => p.test(text))) {
    return "EDITORIAL_FRAMING";
  }
  return classifyParagraph(text, { isFirstParagraph: index === 0 });
}

export function buildBioBlocks(
  slug: string,
  paragraphs: string[],
): BioNarrativeBlock[] {
  const characterId = `char:${slug}`;
  const candidates = findCandidateClaims(characterId);
  const fallbackSource = bioSourceId(slug);

  return paragraphs.map((text, index) => {
    let evidenceClass = classifyBioParagraph(slug, text, index);
    const claimIds = resolveSupportingClaims(text, candidates);
    const sourceIds =
      sourcesFromClaims(claimIds).length > 0
        ? sourcesFromClaims(claimIds)
        : fallbackSource
          ? [fallbackSource]
          : [];
    const reviewed = reviewedClaims(claimIds);
    let reviewStatus: ReviewStatus | undefined;
    if (reviewed.length === claimIds.length && claimIds.length > 0) {
      reviewStatus = "VERIFIED_CANON";
    } else if (evidenceClass === "EDITORIAL_FRAMING" || evidenceClass === "INTERPRETATION") {
      reviewStatus = "APPROVED_EDITORIAL";
    } else if (claimIds.length > 0) {
      reviewStatus = "PENDING";
    }

    evidenceClass = downgradeUnsupportedFact(evidenceClass, text, claimIds);
    if (
      evidenceClass === "FACT" &&
      (!claimIds.length || reviewStatus === "PENDING")
    ) {
      evidenceClass = claimIds.length ? "SUPPORTED_SYNTHESIS" : "UNRESOLVED";
    }

    const block: BioNarrativeBlock = { text, evidenceClass };
    if (claimIds.length) block.claimIds = claimIds;
    if (sourceIds.length) block.sourceIds = sourceIds;
    if (reviewStatus) block.reviewStatus = reviewStatus;
    if (evidenceClass === "FACT") block.canonStatus = "CURRENT_CANON";
    if (evidenceClass === "UNRESOLVED") block.canonStatus = "UNKNOWN";
    return block;
  });
}

/** Bio paragraphs safe for SEO shell and crawler-visible factual summaries. */
export function trustedBioParagraphs(blocks: BioNarrativeBlock[]): string[] {
  return blocks
    .filter(
      (b) =>
        (b.evidenceClass === "FACT" || b.evidenceClass === "SUPPORTED_SYNTHESIS") &&
        b.reviewStatus !== "PENDING" &&
        b.canonStatus !== "UNKNOWN",
    )
    .map((b) => b.text);
}

export function resolveBioBlockClaims(block: BioNarrativeBlock) {
  return (block.claimIds ?? [])
    .map((id) => claimById.get(id))
    .filter((c): c is NonNullable<typeof c> => Boolean(c));
}
