import { claimById } from "@/data/knowledge/claims";
import type { Claim, NarrativeEvidenceClass } from "@/types";

/** Predicate-level support rules — claim must match text semantics, not just subject. */
const CLAIM_SEMANTIC_RULES: Record<string, RegExp[]> = {
  "claim:aatrox-was-ascended": [
    /\bascended\b/i,
    /\bgod-warrior/i,
    /\bsun disc\b/i,
    /\brite of ascension\b/i,
    /\braised\b.*\bascend/i,
    /\belevated\b/i,
  ],
  "claim:aatrox-participated-void-war": [
    /\bvoid\b/i,
    /\bvoid war\b/i,
    /\bvoid incursion\b/i,
    /\bfought\b.*\bvoid\b/i,
    /\bheld the line\b/i,
  ],
  "claim:aatrox-became-darkin": [
    /\bdarkin\b/i,
    /\bcurdled\b/i,
    /\bcorrupt/i,
    /\bsealed\b/i,
    /\bweapon\b/i,
    /\bblade\b/i,
  ],
  "claim:aatrox-fought-pantheon": [
    /\bpantheon\b/i,
    /\batreus\b/i,
    /\baspect of war\b/i,
    /\bduel\b/i,
    /\bdestroyed\b.*\baspect\b/i,
  ],
  "claim:kaisa-survived-void": [
    /\bkaisa\b/i,
    /\bvoid\b/i,
    /\bsurvived\b/i,
    /\bmodern\b/i,
  ],
  "claim:yunara-aion-erna": [
    /\baion er'?na\b/i,
    /\brelic\b/i,
    /\bweapon\b/i,
  ],
  "claim:yunara-kinkou-affiliation": [
    /\bkinkou\b/i,
    /\bbalance\b/i,
    /\bguardian\b/i,
  ],
  "claim:yunara-spirit-realm-centuries": [
    /\bspirit realm\b/i,
    /\bcenturies\b/i,
    /\bcloistered\b/i,
  ],
};

/** Explicit block → claim mappings keyed by path:chapter:paragraph index. */
export const EXPLICIT_BLOCK_CLAIMS: Record<string, string[]> = {
  "the-darkin:0:0":
    ["claim:aatrox-was-ascended"],
  "the-darkin:0:1":
    ["claim:aatrox-was-ascended"],
  "the-darkin:1:0":
    ["claim:aatrox-participated-void-war"],
  "the-darkin:4:0":
    ["claim:aatrox-became-darkin"],
  "the-darkin:4:1":
    ["claim:aatrox-became-darkin"],
  "the-darkin:5:0":
    ["claim:aatrox-became-darkin"],
  "the-darkin:6:0":
    ["claim:aatrox-fought-pantheon"],
  "the-darkin:6:1":
    ["claim:aatrox-fought-pantheon"],
};

export function blockKey(pathSlug: string, chapterIndex: number, paragraphIndex: number): string {
  return `${pathSlug}:${chapterIndex}:${paragraphIndex}`;
}

export function claimSupportsText(claimId: string, text: string): boolean {
  const claim = claimById.get(claimId);
  if (!claim) return false;

  const rules = CLAIM_SEMANTIC_RULES[claimId];
  if (rules?.some((p) => p.test(text))) return true;

  if (claim.evidenceNote && text.toLowerCase().includes(claim.evidenceNote.toLowerCase().slice(0, 50))) {
    return true;
  }

  if (claim.predicate === "PARTICIPATED_IN" && claim.objectId?.includes("event:")) {
    const eventSlug = claim.objectId.replace("event:", "").replace(/-/g, " ");
    if (text.toLowerCase().includes(eventSlug)) return true;
  }

  if (claim.predicate === "WAS" && claim.objectId?.includes("concept:")) {
    const concept = claim.objectId.replace("concept:", "").replace(/-/g, " ");
    if (text.toLowerCase().includes(concept)) return true;
  }

  return false;
}

export function supportsNarrativeBlock(
  text: string,
  claimIds: string[],
  pathSlug?: string,
  chapterIndex?: number,
  paragraphIndex?: number,
): boolean {
  if (pathSlug !== undefined && chapterIndex !== undefined && paragraphIndex !== undefined) {
    const explicit = EXPLICIT_BLOCK_CLAIMS[blockKey(pathSlug, chapterIndex, paragraphIndex)];
    if (explicit?.length) {
      return explicit.every((id) => claimSupportsText(id, text));
    }
  }

  if (!claimIds.length) return false;
  return claimIds.some((id) => claimSupportsText(id, text));
}

export function resolveSupportingClaims(
  text: string,
  candidateClaimIds: string[],
  pathSlug?: string,
  chapterIndex?: number,
  paragraphIndex?: number,
): string[] {
  if (pathSlug !== undefined && chapterIndex !== undefined && paragraphIndex !== undefined) {
    const explicit = EXPLICIT_BLOCK_CLAIMS[blockKey(pathSlug, chapterIndex, paragraphIndex)];
    if (explicit?.length) {
      return explicit.filter((id) => claimById.has(id) && claimSupportsText(id, text));
    }
  }

  return candidateClaimIds.filter((id) => claimSupportsText(id, text));
}

export function sourcesFromClaims(claimIds: string[]): string[] {
  const ids = new Set<string>();
  for (const cid of claimIds) {
    const claim = claimById.get(cid);
    if (claim) for (const sid of claim.sourceIds) ids.add(sid);
  }
  return [...ids];
}

export function downgradeUnsupportedFact(
  evidenceClass: NarrativeEvidenceClass,
  text: string,
  claimIds: string[],
): NarrativeEvidenceClass {
  if (evidenceClass !== "FACT") return evidenceClass;
  if (!supportsNarrativeBlock(text, claimIds)) {
    if (claimIds.length > 0) return "SUPPORTED_SYNTHESIS";
    return "UNRESOLVED";
  }
  return "FACT";
}

export function reviewedClaims(claimIds: string[]): Claim[] {
  return claimIds
    .map((id) => claimById.get(id))
    .filter((c): c is Claim => Boolean(c && c.reviewed && !c.needsReview));
}
