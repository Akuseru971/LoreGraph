import { claimById, claims } from "@/data/knowledge/claims";
import type {
  CanonStatus,
  NarrativeEvidenceClass,
  ReviewStatus,
  StoryNarrativeBlock,
  StoryPathQuality,
} from "@/types";
import {
  classifyParagraph,
  downgradeIfUnsupported,
  type ClassifyContext,
} from "./classify";
import { canPromoteToVerifiedCanon } from "@/lib/knowledge/claim-trust";
import { propositionFullySupported } from "@/lib/knowledge/claim-propositions";
import {
  downgradeUnsupportedFact,
  resolveSupportingClaims,
  sourcesFromClaims,
} from "./support";

export interface BuildBlockContext {
  pathSlug: string;
  chapterIndex: number;
  characterIds: string[];
  eventIds: string[];
  chapterContentType?: "fact" | "editorial";
}

function findCandidateClaims(ctx: BuildBlockContext): string[] {
  const candidates: string[] = [];

  for (const claim of claims) {
    const subjectMatch = ctx.characterIds.includes(claim.subjectId);
    const eventMatch =
      claim.objectId && ctx.eventIds.includes(claim.objectId);

    if (!subjectMatch && !eventMatch) continue;
    if (claim.needsReview || !claim.reviewed) continue;
    if (claim.canonStatus === "UNKNOWN" || claim.canonStatus === "THEMATIC_ONLY") {
      continue;
    }

    candidates.push(claim.id);
  }

  return [...new Set(candidates)];
}

export function buildNarrativeBlocks(
  paragraphs: string[],
  ctx: BuildBlockContext,
): StoryNarrativeBlock[] {
  const candidates = findCandidateClaims(ctx);

  return paragraphs.map((text, index) => {
    const classifyCtx: ClassifyContext = {
      chapterContentType: ctx.chapterContentType,
      isFirstParagraph: index === 0,
      isLastParagraph: index === paragraphs.length - 1,
    };

    let evidenceClass = classifyParagraph(text, classifyCtx);

    const claimIds = resolveSupportingClaims(
      text,
      candidates,
      ctx.pathSlug,
      ctx.chapterIndex,
      index,
    );
    const sourceIds = sourcesFromClaims(claimIds);
    const propositionSupported = propositionFullySupported(text, claimIds);

    evidenceClass = downgradeUnsupportedFact(evidenceClass, text, claimIds);
    evidenceClass = downgradeIfUnsupported(
      evidenceClass,
      claimIds,
      sourceIds,
      canPromoteToVerifiedCanon({
        text,
        claimIds,
        sourceIds,
        propositionSupported,
      })
        ? "VERIFIED_CANON"
        : claimIds.length
          ? "REVIEWED"
          : undefined,
    );

    let reviewStatus: ReviewStatus | undefined;
    if (evidenceClass === "EDITORIAL_FRAMING" || evidenceClass === "INTERPRETATION") {
      reviewStatus = "APPROVED_EDITORIAL";
    } else if (
      evidenceClass === "FACT" &&
      canPromoteToVerifiedCanon({
        text,
        claimIds,
        sourceIds,
        propositionSupported,
      })
    ) {
      reviewStatus = "VERIFIED_CANON";
    } else if (claimIds.length > 0) {
      reviewStatus = "REVIEWED";
    }

    const block: StoryNarrativeBlock = {
      text,
      evidenceClass,
    };

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

export function blocksToBody(blocks: StoryNarrativeBlock[]): string[] {
  return blocks.map((b) => b.text);
}

/** Blocks safe for public trusted narration — excludes UNRESOLVED. */
export function publicNarrativeBlocks(blocks: StoryNarrativeBlock[]): StoryNarrativeBlock[] {
  return blocks.filter((b) => b.evidenceClass !== "UNRESOLVED");
}

export function computeStoryPathQuality(
  blocks: StoryNarrativeBlock[],
): StoryPathQuality {
  const blockCounts: Record<NarrativeEvidenceClass, number> = {
    FACT: 0,
    SUPPORTED_SYNTHESIS: 0,
    EDITORIAL_FRAMING: 0,
    INTERPRETATION: 0,
    TRANSITION: 0,
    UNRESOLVED: 0,
  };

  let reviewed = 0;
  let factual = 0;
  let sourced = 0;

  for (const block of blocks) {
    blockCounts[block.evidenceClass]++;
    if (block.reviewStatus === "VERIFIED_CANON" || block.reviewStatus === "APPROVED_EDITORIAL") {
      reviewed++;
    }
    if (block.evidenceClass === "FACT") factual++;
    if (block.sourceIds && block.sourceIds.length > 0) sourced++;
  }

  const total = blocks.length || 1;

  return {
    reviewCoverage: Math.round((reviewed / total) * 100),
    factCoverage: Math.round((factual / total) * 100),
    sourceCoverage: Math.round((sourced / total) * 100),
    containsInterpretation:
      blockCounts.INTERPRETATION > 0 || blockCounts.EDITORIAL_FRAMING > 0,
    containsUnresolved: blockCounts.UNRESOLVED > 0,
    blockCounts,
  };
}

export function resolveBlockClaims(block: StoryNarrativeBlock) {
  return (block.claimIds ?? [])
    .map((id) => claimById.get(id))
    .filter((c): c is NonNullable<typeof c> => Boolean(c));
}
