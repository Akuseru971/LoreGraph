import type { NarrativeEvidenceClass, ReviewStatus } from "@/types";

const EDITORIAL_PATTERNS = [
  /\bthe bill finally came due\b/i,
  /\btwo answers to the same\b/i,
  /\ba war that taught\b/i,
  /\bthe relationship is the constant\b/i,
  /\bconfidence is what makes\b/i,
  /\belegant solution with a fatal dependency\b/i,
  /\bstructurally,?\s+the\b/i,
  /\bwhich is exactly as long as it sounds\b/i,
  /\bnobody .+ asked what happens\b/i,
  /\bthe label has outlived\b/i,
  /\bliving inside a family dispute\b/i,
  /\bnot through meeting other\b/i,
  /\bbelongs to this era as\b/i,
  /\bcurdles into\b/i,
  /\bturned into its emergency\b/i,
  /\bthe argument\b.+\bstill\b/i,
];

const INTERPRETATION_PATTERNS = [
  /\brepresent(s|ing)?\s+two\b/i,
  /\brepresent(s|ing)?\s+an?\b/i,
  /\bincompatible visions\b/i,
  /\bphilosophical\b/i,
  /\bthematic\b/i,
  /\bcan be read as\b/i,
  /\bsuggests that\b/i,
  /\bimplies\b/i,
  /\bthe lesson\b/i,
  /\bthe real question\b/i,
  /\bwhat .+ means for\b/i,
];

const TRANSITION_PATTERNS = [
  /^[A-Z][^.!?]{0,80}\.$/,
  /\bwhat follows is\b/i,
  /\bthat afternoon\b/i,
  /\bcenturies later\b/i,
  /\bthe next\b/i,
  /\bfrom there\b/i,
  /\bby then\b/i,
];

const SYNTHESIS_PATTERNS = [
  /\bconnects them across\b/i,
  /\bthe same pattern\b/i,
  /\bshares the\b.+\borigin\b/i,
  /\bboth\b.+\band\b.+\bstill\b/i,
  /\bacross very different eras\b/i,
  /\blineage of\b/i,
];

export interface ClassifyContext {
  chapterContentType?: "fact" | "editorial";
  isFirstParagraph?: boolean;
  isLastParagraph?: boolean;
}

/**
 * Deterministic paragraph classifier — no AI generation.
 */
export function classifyParagraph(
  text: string,
  ctx: ClassifyContext = {},
): NarrativeEvidenceClass {
  if (ctx.chapterContentType === "editorial") {
    if (INTERPRETATION_PATTERNS.some((p) => p.test(text))) return "INTERPRETATION";
    return "EDITORIAL_FRAMING";
  }

  if (EDITORIAL_PATTERNS.some((p) => p.test(text))) return "EDITORIAL_FRAMING";
  if (INTERPRETATION_PATTERNS.some((p) => p.test(text))) return "INTERPRETATION";
  if (TRANSITION_PATTERNS.some((p) => p.test(text)) && text.length < 120) {
    return "TRANSITION";
  }
  if (SYNTHESIS_PATTERNS.some((p) => p.test(text))) return "SUPPORTED_SYNTHESIS";

  return "FACT";
}

export function downgradeIfUnsupported(
  evidenceClass: NarrativeEvidenceClass,
  claimIds: string[],
  sourceIds: string[],
  reviewStatus?: ReviewStatus,
): NarrativeEvidenceClass {
  if (evidenceClass !== "FACT") return evidenceClass;

  const hasEvidence =
    claimIds.length > 0 &&
    sourceIds.length > 0 &&
    reviewStatus !== "PENDING";

  if (!hasEvidence) {
    if (claimIds.length > 0 || sourceIds.length > 0) return "SUPPORTED_SYNTHESIS";
    return "UNRESOLVED";
  }
  return "FACT";
}

export const EVIDENCE_CLASS_LABEL: Record<NarrativeEvidenceClass, string> = {
  FACT: "Riot-established fact",
  SUPPORTED_SYNTHESIS: "LoreGraph synthesis",
  EDITORIAL_FRAMING: "Editorial framing",
  INTERPRETATION: "LoreGraph interpretation",
  TRANSITION: "Narrative transition",
  UNRESOLVED: "Unresolved — needs review",
};
