import { claimById } from "@/data/knowledge/claims";
import { sourceById } from "@/data/sources";
import { storyPaths } from "@/data/story-paths";
import type { NarrativeEvidenceClass, StoryNarrativeBlock } from "@/types";
import type { ClaimSourceAuthority } from "@/lib/knowledge/claim-trust";
import { factEvidenceMetrics, supportsNarrativeBlock, validateFactPropositionSupport } from "./support";

export interface StoryPathValidationResult {
  errors: string[];
  warnings: string[];
  blockCounts: Record<NarrativeEvidenceClass, number>;
  factsWithoutEvidence: number;
  factEvidence: Record<ClaimSourceAuthority, number>;
}

function validateBlock(
  block: StoryNarrativeBlock,
  pathSlug: string,
  chapterId: string,
  errors: string[],
): void {
  if (block.evidenceClass === "FACT") {
    if (!block.claimIds?.length) {
      errors.push(`FACT block without claims: ${pathSlug}/${chapterId}`);
    } else {
      for (const cid of block.claimIds) {
        if (!claimById.has(cid)) {
          errors.push(`FACT block references unknown claim ${cid}: ${pathSlug}/${chapterId}`);
        }
      }
    }
    if (!block.sourceIds?.length) {
      errors.push(`FACT block without sources: ${pathSlug}/${chapterId}`);
    } else {
      for (const sid of block.sourceIds) {
        if (!sourceById.has(sid)) {
          errors.push(`FACT block references unknown source ${sid}: ${pathSlug}/${chapterId}`);
        }
      }
    }
    if (block.canonStatus === "UNKNOWN" || block.reviewStatus === "PENDING") {
      errors.push(`FACT block with unresolved evidence: ${pathSlug}/${chapterId}`);
    }
    if (!supportsNarrativeBlock(block.text, block.claimIds ?? [])) {
      errors.push(`FACT block claims do not semantically support text: ${pathSlug}/${chapterId}`);
    }
    for (const issue of validateFactPropositionSupport(block.text, block.claimIds ?? [])) {
      errors.push(
        `FACT block proposition issue (${issue.kind}): ${pathSlug}/${chapterId} — ${issue.message}`,
      );
    }
  }

  if (block.evidenceClass === "UNRESOLVED" && block.reviewStatus === "VERIFIED_CANON") {
    errors.push(`UNRESOLVED block marked verified: ${pathSlug}/${chapterId}`);
  }
}

export function validateStoryPaths(): StoryPathValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];
  const blockCounts: Record<NarrativeEvidenceClass, number> = {
    FACT: 0,
    SUPPORTED_SYNTHESIS: 0,
    EDITORIAL_FRAMING: 0,
    INTERPRETATION: 0,
    TRANSITION: 0,
    UNRESOLVED: 0,
  };
  let factsWithoutEvidence = 0;
  const factEvidence: Record<ClaimSourceAuthority, number> = {
    PRIMARY_EXPLICIT: 0,
    PRIMARY_COMBINED: 0,
    OFFICIAL_REFERENCE: 0,
    DERIVED: 0,
    EDITORIAL: 0,
  };

  for (const path of storyPaths) {
    const allBlocks = path.chapters.flatMap((c) => c.blocks ?? []);

    for (const block of allBlocks) {
      blockCounts[block.evidenceClass]++;
      if (block.evidenceClass === "FACT" && (!block.claimIds?.length || !block.sourceIds?.length)) {
        factsWithoutEvidence++;
      }
      if (block.evidenceClass === "FACT" && block.claimIds?.length) {
        const { authority, wikiOnly } = factEvidenceMetrics(block.claimIds);
        if (wikiOnly) {
          factEvidence.OFFICIAL_REFERENCE++;
        } else {
          factEvidence[authority]++;
        }
      }
    }

    for (const chapter of path.chapters) {
      for (const block of chapter.blocks ?? []) {
        validateBlock(block, path.slug, chapter.id, errors);
      }
    }

    if (path.verified && path.quality?.containsUnresolved) {
      errors.push(
        `Story path ${path.slug} marked verified but contains UNRESOLVED blocks`,
      );
    }
  }

  return { errors, warnings, blockCounts, factsWithoutEvidence, factEvidence };
}
