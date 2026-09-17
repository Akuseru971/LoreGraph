import { claimById } from "@/data/knowledge/claims";
import { sourceById } from "@/data/sources";
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
    /\bamong the (greatest|first)\b/i,
  ],
  "claim:aatrox-participated-void-war": [
    /\bvoid\b/i,
    /\bvoid war\b/i,
    /\bvoid incursion\b/i,
    /\bfought\b.*\bvoid\b/i,
    /\bheld the line\b/i,
    /\bdefenders against the void\b/i,
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
    /\bhunts\b/i,
  ],
  "claim:aatrox-sealed-in-blade": [
    /\bsealed\b/i,
    /\bimprisoned\b/i,
    /\bbound\b/i,
    /\bblade\b/i,
    /\bweapon\b/i,
  ],
  "claim:aatrox-possesses-host": [
    /\btakes the body\b/i,
    /\bwielder\b/i,
    /\bpicks up\b/i,
    /\blifts the blade\b/i,
    /\bwears\b/i,
  ],
  "claim:varus-was-ascended": [
    /\bascended\b/i,
    /\bgod-warrior/i,
    /\bsun disc\b/i,
    /\bshurima'?s ascended\b/i,
  ],
  "claim:varus-became-darkin": [
    /\bdarkin\b/i,
    /\bcorrupt/i,
    /\bappetite\b/i,
  ],
  "claim:varus-sealed-in-bow": [
    /\bbow\b/i,
    /\bsealed\b/i,
    /\bbound\b/i,
    /\bimprisoned\b/i,
  ],
  "claim:varus-possesses-valmar-kai": [
    /\bvalmar\b/i,
    /\bkai\b/i,
    /\blovers\b/i,
    /\bthree\b/i,
    /\bsharing\b/i,
  ],
  "claim:nasus-was-ascended": [
    /\bascended\b/i,
    /\bgod-warrior/i,
  ],
  "claim:nasus-scholar-archivist": [
    /\bscholar\b/i,
    /\barchivist\b/i,
    /\bstrategist\b/i,
  ],
  "claim:pantheon-hosted-aspect-of-war": [
    /\bhost/i,
    /\baspect of war\b/i,
    /\bclimbed\b/i,
    /\bchosen\b/i,
    /\bvessel\b/i,
  ],
  "claim:pantheon-aspect-destroyed": [
    /\bdestroyed\b/i,
    /\bkilled\b/i,
    /\bsurvived\b/i,
    /\bhollowed out\b/i,
    /\bfallen aspect\b/i,
  ],
  "claim:aspect-of-war-sealed-darkin": [
    /\baspect of war\b/i,
    /\bsealed\b/i,
    /\bdarkin war\b/i,
    /\bcampaign\b/i,
    /\bintervened\b/i,
  ],
  "claim:shurima-rite-of-ascension": [
    /\brite of ascension\b/i,
    /\bsun disc\b/i,
    /\binstitution\b/i,
    /\belevate\b/i,
    /\bgod-warrior/i,
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

/** Civilization-level propositions require institution claims, not champion-specific ones. */
const CIVILIZATION_PROPOSITIONS: RegExp[] = [
  /\bthe rite of ascension was\b/i,
  /\ban imperial institution\b/i,
  /\bpublic ceremony\b/i,
  /\bfirst ascended were\b/i,
  /\bstatues were carved\b/i,
  /\bthe darkin could not be destroyed\b/i,
  /\btargon built the cages\b/i,
  /\bcenturies of war had hollowed\b/i,
];

const CHAMPION_ONLY_CLAIMS = new Set([
  "claim:aatrox-was-ascended",
  "claim:varus-was-ascended",
  "claim:nasus-was-ascended",
]);

const INSTITUTION_CLAIMS = new Set([
  "claim:shurima-rite-of-ascension",
]);

/** Explicit block → claim mappings keyed by path:chapter:paragraph index. */
export const EXPLICIT_BLOCK_CLAIMS: Record<string, string[]> = {
  "the-darkin:0:0": ["claim:shurima-rite-of-ascension", "claim:aatrox-was-ascended"],
  "the-darkin:0:1": ["claim:shurima-rite-of-ascension"],
  "the-darkin:0:2": ["claim:aatrox-was-ascended"],
  "the-darkin:1:0": ["claim:aatrox-participated-void-war"],
  "the-darkin:3:0": ["claim:aatrox-became-darkin"],
  "the-darkin:3:1": ["claim:aspect-of-war-sealed-darkin"],
  "the-darkin:3:2": ["claim:aatrox-fought-pantheon"],
  "the-darkin:4:0": ["claim:aatrox-sealed-in-blade", "claim:varus-sealed-in-bow"],
  "the-darkin:6:0": ["claim:varus-possesses-valmar-kai"],
  "the-darkin:6:1": ["claim:varus-possesses-valmar-kai"],
  "targon-and-the-aspects:3:0": ["claim:pantheon-hosted-aspect-of-war"],
  "targon-and-the-aspects:3:1": ["claim:aspect-of-war-sealed-darkin"],
  "targon-and-the-aspects:4:0": ["claim:pantheon-aspect-destroyed", "claim:aatrox-fought-pantheon"],
  "targon-and-the-aspects:4:1": ["claim:pantheon-aspect-destroyed"],
  "targon-and-the-aspects:5:0": ["claim:pantheon-aspect-destroyed"],
};

export interface PropositionSupportIssue {
  kind:
    | "no_claim"
    | "subject_mismatch"
    | "weak_predicate"
    | "scope_mismatch"
    | "source_mismatch"
    | "chronology_misuse";
  message: string;
}

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

function isCivilizationProposition(text: string): boolean {
  return CIVILIZATION_PROPOSITIONS.some((p) => p.test(text));
}

function claimSupportsProposition(claim: Claim, text: string): boolean {
  if (!claimSupportsText(claim.id, text)) return false;

  if (isCivilizationProposition(text)) {
    if (CHAMPION_ONLY_CLAIMS.has(claim.id) && !INSTITUTION_CLAIMS.has(claim.id)) {
      return false;
    }
  }

  if (claim.predicate === "PARTICIPATED_IN_OR_ASSOCIATED_WITH") {
    return false;
  }

  if (
    /\bchronolog|\bcenturies\b|\bafter shurima\b/i.test(text) &&
    claim.claimType === "RELATIONSHIP" &&
    !claim.predicate.includes("PARTICIPATED")
  ) {
    return false;
  }

  return true;
}

export function validateFactPropositionSupport(
  text: string,
  claimIds: string[],
): PropositionSupportIssue[] {
  const issues: PropositionSupportIssue[] = [];

  if (!claimIds.length) {
    issues.push({ kind: "no_claim", message: "FACT block has no attached claims" });
    return issues;
  }

  const resolved = claimIds.map((id) => claimById.get(id)).filter((c): c is Claim => Boolean(c));
  if (!resolved.length) {
    issues.push({ kind: "no_claim", message: "FACT block claims do not resolve" });
    return issues;
  }

  const supporting = resolved.filter((c) => claimSupportsProposition(c, text));
  if (!supporting.length) {
    issues.push({
      kind: "subject_mismatch",
      message: "Attached claims do not semantically support the proposition",
    });
  }

  if (isCivilizationProposition(text)) {
    const hasInstitution = supporting.some((c) => INSTITUTION_CLAIMS.has(c.id));
    const onlyChampion = supporting.every((c) => CHAMPION_ONLY_CLAIMS.has(c.id));
    if (!hasInstitution && onlyChampion) {
      issues.push({
        kind: "scope_mismatch",
        message: "Champion-specific claim used for civilization-level proposition",
      });
    }
  }

  for (const claim of supporting) {
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
    const explicit = EXPLICIT_BLOCK_CLAIMS[blockKey(pathSlug, chapterIndex, paragraphIndex)];
    if (explicit?.length) {
      return explicit.every((id) => claimSupportsText(id, text));
    }
  }

  if (!claimIds.length) return false;
  return claimIds.some((id) => {
    const claim = claimById.get(id);
    return claim ? claimSupportsProposition(claim, text) : false;
  });
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
): NarrativeEvidenceClass {
  if (evidenceClass !== "FACT") return evidenceClass;
  if (!supportsNarrativeBlock(text, claimIds)) {
    if (claimIds.length > 0) return "SUPPORTED_SYNTHESIS";
    return "UNRESOLVED";
  }
  const issues = validateFactPropositionSupport(text, claimIds);
  if (issues.some((i) => i.kind === "scope_mismatch" || i.kind === "subject_mismatch")) {
    return "SUPPORTED_SYNTHESIS";
  }
  return "FACT";
}

export function reviewedClaims(claimIds: string[]): Claim[] {
  return claimIds
    .map((id) => claimById.get(id))
    .filter((c): c is Claim => Boolean(c && c.reviewed && !c.needsReview));
}
