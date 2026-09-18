import { claimById, claims } from "@/data/knowledge/claims";
import {
  canPromoteToVerifiedCanon,
  evaluateClaimsTrust,
} from "@/lib/knowledge/claim-trust";
import {
  EDITORIAL_PROPOSITION_MARKERS,
  propositionFullySupported,
} from "@/lib/knowledge/claim-propositions";
import { bioSourceId } from "@/data/sources";
import type {
  BioNarrativeBlock,
  NarrativeEvidenceClass,
  ReviewStatus,
} from "@/types";
import { classifyParagraph } from "@/lib/story-path/classify";
import {
  resolveSupportingClaims,
  sourcesFromClaims,
} from "@/lib/story-path/support";

/** Per-champion editorial markers beyond the shared classifier. */
const BIO_EDITORIAL_PATTERNS: Record<string, RegExp[]> = {
  aatrox: [
    /\bsomething in the ascended broke\b/i,
    /\bcurdled into appetite\b/i,
    /\bheroes who had saved shurima became the reason\b/i,
    /\bmortals who had built them fought back\b/i,
    /\btargon intervened\b/i,
    /\bcould not be killed\b/i,
    /\bmost reliable exit\b/i,
    /\bworld ending\b/i,
    /\bconsequence with a grudge\b/i,
    /\bbuilt the cage\b/i,
    /\bstatues were carved\b/i,
    /\bsongs were written\b/i,
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
    /\bfor years the arrangement worked\b/i,
    /\binherited its memory\b/i,
    /\bproperly, in a way that celestial beings\b/i,
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
  if (EDITORIAL_PROPOSITION_MARKERS.some((p) => p.test(text))) {
    return "EDITORIAL_FRAMING";
  }
  const editorial = BIO_EDITORIAL_PATTERNS[slug];
  if (editorial?.some((p) => p.test(text))) {
    return "EDITORIAL_FRAMING";
  }
  return classifyParagraph(text, { isFirstParagraph: index === 0 });
}

function resolveBioReviewStatus(
  text: string,
  claimIds: string[],
  sourceIds: string[],
  evidenceClass: NarrativeEvidenceClass,
): ReviewStatus | undefined {
  if (evidenceClass === "EDITORIAL_FRAMING" || evidenceClass === "INTERPRETATION") {
    return "APPROVED_EDITORIAL";
  }
  if (!claimIds.length) return undefined;

  const propositionSupported = propositionFullySupported(text, claimIds);
  if (
    canPromoteToVerifiedCanon({
      text,
      claimIds,
      sourceIds,
      propositionSupported,
    })
  ) {
    return "VERIFIED_CANON";
  }

  const trust = evaluateClaimsTrust(claimIds);
  if (trust.canBeFact && propositionSupported) return trust.reviewStatus;
  if (claimIds.length > 0) return "PENDING";
  return undefined;
}

export function buildBioBlocks(
  slug: string,
  paragraphs: string[],
): BioNarrativeBlock[] {
  const characterId = `char:${slug}`;
  const candidates = findCandidateClaims(characterId);

  return paragraphs.map((text, index) => {
    let evidenceClass = classifyBioParagraph(slug, text, index);
    const claimIds = resolveSupportingClaims(text, candidates);
    const sourceIds = sourcesFromClaims(claimIds);
    const reviewStatus = resolveBioReviewStatus(
      text,
      claimIds,
      sourceIds,
      evidenceClass,
    );

    if (evidenceClass === "FACT") {
      const propositionSupported = propositionFullySupported(text, claimIds);
      if (
        !propositionSupported ||
        reviewStatus !== "VERIFIED_CANON" ||
        !claimIds.length
      ) {
        evidenceClass = claimIds.length ? "SUPPORTED_SYNTHESIS" : "UNRESOLVED";
      }
    }

    const block: BioNarrativeBlock = { text, evidenceClass };
    if (claimIds.length) block.claimIds = claimIds;
    if (sourceIds.length) block.sourceIds = sourceIds;
    if (reviewStatus) block.reviewStatus = reviewStatus;
    if (evidenceClass === "FACT" && reviewStatus === "VERIFIED_CANON") {
      block.canonStatus = "CURRENT_CANON";
    }
    if (evidenceClass === "UNRESOLVED") block.canonStatus = "UNKNOWN";
    return block;
  });
}

/** Bio paragraphs safe for SEO shell and crawler-visible factual summaries. */
export function trustedBioParagraphs(blocks: BioNarrativeBlock[]): string[] {
  return blocks
    .filter(
      (b) =>
        b.evidenceClass === "FACT" &&
        b.reviewStatus === "VERIFIED_CANON" &&
        b.canonStatus !== "UNKNOWN",
    )
    .map((b) => b.text);
}

export function resolveBioBlockClaims(block: BioNarrativeBlock) {
  return (block.claimIds ?? [])
    .map((id) => claimById.get(id))
    .filter((c): c is NonNullable<typeof c> => Boolean(c));
}
