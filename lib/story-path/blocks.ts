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

export interface BuildBlockContext {
  characterIds: string[];
  eventIds: string[];
  chapterContentType?: "fact" | "editorial";
}

function findClaimsForParagraph(
  text: string,
  ctx: BuildBlockContext,
): { claimIds: string[]; sourceIds: string[]; reviewStatus?: ReviewStatus } {
  const claimIds: string[] = [];
  const sourceIds = new Set<string>();
  let reviewStatus: ReviewStatus | undefined;

  const lower = text.toLowerCase();

  for (const claim of claims) {
    const subjectMatch = ctx.characterIds.includes(claim.subjectId);
    const eventMatch =
      claim.objectId && ctx.eventIds.includes(claim.objectId);
    const noteMatch =
      claim.evidenceNote &&
      lower.includes(claim.evidenceNote.toLowerCase().slice(0, 40));

    if (!subjectMatch && !eventMatch && !noteMatch) continue;

    if (claim.needsReview || !claim.reviewed) {
      if (!reviewStatus) reviewStatus = "PENDING";
      continue;
    }

    if (claim.canonStatus === "UNKNOWN" || claim.canonStatus === "THEMATIC_ONLY") {
      continue;
    }

    claimIds.push(claim.id);
    for (const sid of claim.sourceIds) sourceIds.add(sid);

    if (claim.reviewed) reviewStatus = "VERIFIED_CANON";
  }

  return {
    claimIds: [...new Set(claimIds)],
    sourceIds: [...sourceIds],
    reviewStatus,
  };
}

export function buildNarrativeBlocks(
  paragraphs: string[],
  ctx: BuildBlockContext,
): StoryNarrativeBlock[] {
  return paragraphs.map((text, index) => {
    const classifyCtx: ClassifyContext = {
      chapterContentType: ctx.chapterContentType,
      isFirstParagraph: index === 0,
      isLastParagraph: index === paragraphs.length - 1,
    };

    let evidenceClass = classifyParagraph(text, classifyCtx);
    const { claimIds, sourceIds, reviewStatus } = findClaimsForParagraph(text, ctx);

    evidenceClass = downgradeIfUnsupported(
      evidenceClass,
      claimIds,
      sourceIds,
      reviewStatus,
    );

    const block: StoryNarrativeBlock = {
      text,
      evidenceClass,
    };

    if (claimIds.length) block.claimIds = claimIds;
    if (sourceIds.length) block.sourceIds = sourceIds;
    if (reviewStatus) block.reviewStatus = reviewStatus;
    if (evidenceClass === "FACT") block.canonStatus = "CURRENT_CANON";
    if (evidenceClass === "UNRESOLVED") block.canonStatus = "UNKNOWN";

    return block;
  });
}

export function blocksToBody(blocks: StoryNarrativeBlock[]): string[] {
  return blocks.map((b) => b.text);
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
