import { claimById } from "@/data/knowledge/claims";
import { sourceById } from "@/data/sources";
import {
  canPromoteToVerifiedCanon,
  evaluateClaimsTrust,
  factBlockEvidenceAuthority,
  isWikiOnlyClaim,
} from "@/lib/knowledge/claim-trust";
import {
  BLOCK_PROPOSITION_CLAIMS,
  claimSupportsPropositionStrict,
  EDITORIAL_PROPOSITION_MARKERS,
  propositionFullySupported,
  splitPropositions,
} from "@/lib/knowledge/claim-propositions";
import type { Claim, NarrativeEvidenceClass } from "@/types";

export { BLOCK_PROPOSITION_CLAIMS as EXPLICIT_BLOCK_CLAIMS };

const CHAMPION_ONLY_CLAIMS = new Set([
  "claim:aatrox-was-ascended",
  "claim:varus-was-ascended",
  "claim:nasus-was-ascended",
]);

const INSTITUTION_CLAIMS = new Set([
  "claim:shurima-rite-of-ascension",
  "claim:shurima-sun-disc-ascension",
  "claim:rite-elevates-ascended",
]);

const CIVILIZATION_PROPOSITIONS: RegExp[] = [
  /\bthe rite of ascension was\b/i,
  /\ban imperial institution\b/i,
  /\bpublic ceremony\b/i,
  /\bdefenders of the empire\b/i,
  /\bformal shuriman institution\b/i,
  /\bfirst ascended were\b/i,
  /\bstatues were carved\b/i,
  /\bthe darkin could not be destroyed\b/i,
  /\btargon built the cages\b/i,
];

export interface PropositionSupportIssue {
  kind:
    | "no_claim"
    | "subject_mismatch"
    | "weak_predicate"
    | "scope_mismatch"
    | "source_mismatch"
    | "chronology_misuse"
    | "editorial_markers"
    | "incomplete_coverage";
  message: string;
}

export function blockKey(pathSlug: string, chapterIndex: number, paragraphIndex: number): string {
  return `${pathSlug}:${chapterIndex}:${paragraphIndex}`;
}

/** Guardrail only — not the final authority. */
export function claimSupportsText(claimId: string, text: string): boolean {
  return claimSupportsPropositionStrict(claimId, text);
}

function isCivilizationProposition(text: string): boolean {
  return CIVILIZATION_PROPOSITIONS.some((p) => p.test(text));
}

function claimSupportsProposition(claim: Claim, text: string): boolean {
  if (!claimSupportsPropositionStrict(claim.id, text)) return false;

  if (isCivilizationProposition(text)) {
    if (CHAMPION_ONLY_CLAIMS.has(claim.id) && !INSTITUTION_CLAIMS.has(claim.id)) {
      return false;
    }
  }

  if (claim.predicate === "PARTICIPATED_IN_OR_ASSOCIATED_WITH") {
    return false;
  }

  return true;
}

export function validateFactPropositionSupport(
  text: string,
  claimIds: string[],
): PropositionSupportIssue[] {
  const issues: PropositionSupportIssue[] = [];

  if (EDITORIAL_PROPOSITION_MARKERS.some((p) => p.test(text))) {
    issues.push({
      kind: "editorial_markers",
      message: "Text contains editorial/synthesis markers unsuitable for FACT",
    });
  }

  if (!claimIds.length) {
    issues.push({ kind: "no_claim", message: "FACT block has no attached claims" });
    return issues;
  }

  const resolved = claimIds.map((id) => claimById.get(id)).filter((c): c is Claim => Boolean(c));
  if (!resolved.length) {
    issues.push({ kind: "no_claim", message: "FACT block claims do not resolve" });
    return issues;
  }

  if (!propositionFullySupported(text, claimIds)) {
    const sentences = splitPropositions(text);
    const uncovered = sentences.filter(
      (s) => !claimIds.some((id) => claimSupportsPropositionStrict(id, s)),
    );
    issues.push({
      kind: "incomplete_coverage",
      message:
        uncovered.length > 0
          ? `Not all propositions have strict claim support: ${uncovered[0].slice(0, 60)}…`
          : "Attached claims do not fully support all propositions",
    });
  }

  if (isCivilizationProposition(text)) {
    const supporting = resolved.filter((c) => claimSupportsProposition(c, text));
    const hasInstitution = supporting.some((c) => INSTITUTION_CLAIMS.has(c.id));
    const onlyChampion = supporting.every((c) => CHAMPION_ONLY_CLAIMS.has(c.id));
    if (!hasInstitution && onlyChampion) {
      issues.push({
        kind: "scope_mismatch",
        message: "Champion-specific claim used for civilization-level proposition",
      });
    }
  }

  for (const claim of resolved) {
    for (const sid of claim.sourceIds) {
      if (!sourceById.has(sid)) {
        issues.push({
          kind: "source_mismatch",
          message: `Claim ${claim.id} references unknown source ${sid}`,
        });
      }
    }
  }

  return issues;
}

export function supportsNarrativeBlock(
  text: string,
  claimIds: string[],
  pathSlug?: string,
  chapterIndex?: number,
  paragraphIndex?: number,
): boolean {
  if (pathSlug !== undefined && chapterIndex !== undefined && paragraphIndex !== undefined) {
    const key = blockKey(pathSlug, chapterIndex, paragraphIndex);
    const required = BLOCK_PROPOSITION_CLAIMS[key];
    if (required?.length) {
      const allPresent = required.every((id) => claimIds.includes(id));
      const allStrict = required.every((id) => claimSupportsPropositionStrict(id, text));
      return allPresent && allStrict && propositionFullySupported(text, required);
    }
  }

  if (!claimIds.length) return false;
  return propositionFullySupported(text, claimIds);
}

export function resolveSupportingClaims(
  text: string,
  candidateClaimIds: string[],
  pathSlug?: string,
  chapterIndex?: number,
  paragraphIndex?: number,
): string[] {
  if (pathSlug !== undefined && chapterIndex !== undefined && paragraphIndex !== undefined) {
    const key = blockKey(pathSlug, chapterIndex, paragraphIndex);
    const required = BLOCK_PROPOSITION_CLAIMS[key];
    if (required?.length) {
      return required.filter(
        (id) => claimById.has(id) && claimSupportsPropositionStrict(id, text),
      );
    }
  }

  return candidateClaimIds.filter((id) => {
    const claim = claimById.get(id);
    return claim ? claimSupportsProposition(claim, text) : false;
  });
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
  continuity?: string,
): NarrativeEvidenceClass {
  if (evidenceClass !== "FACT") return evidenceClass;

  const propositionSupported = propositionFullySupported(text, claimIds);
  const issues = validateFactPropositionSupport(text, claimIds);

  if (
    !propositionSupported ||
    issues.some(
      (i) =>
        i.kind === "scope_mismatch" ||
        i.kind === "subject_mismatch" ||
        i.kind === "incomplete_coverage" ||
        i.kind === "editorial_markers",
    )
  ) {
    if (claimIds.length > 0) return "SUPPORTED_SYNTHESIS";
    return "UNRESOLVED";
  }

  if (
    !canPromoteToVerifiedCanon({
      text,
      claimIds,
      sourceIds: sourcesFromClaims(claimIds),
      propositionSupported,
    })
  ) {
    return "SUPPORTED_SYNTHESIS";
  }

  return "FACT";
}

export function reviewedClaims(claimIds: string[]): Claim[] {
  return claimIds
    .map((id) => claimById.get(id))
    .filter((c): c is Claim => Boolean(c && c.reviewed && !c.needsReview));
}

export function factEvidenceMetrics(claimIds: string[]) {
  const claims = claimIds
    .map((id) => claimById.get(id))
    .filter((c): c is Claim => Boolean(c));
  const authority = factBlockEvidenceAuthority(claimIds);
  const wikiOnly = claims.length > 0 && claims.every(isWikiOnlyClaim);
  return { authority, wikiOnly, claimCount: claims.length };
}
