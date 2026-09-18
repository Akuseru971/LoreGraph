/**
 * Strict proposition allowlists — the final authority for what a claim may prove.
 * Regex in support.ts is a guardrail only; these patterns define exact support.
 */
export const CLAIM_PROPOSITION_PATTERNS: Record<string, RegExp[]> = {
  "claim:aatrox-was-ascended": [
    /\baatrox\b/i,
    /\b(raised|among the first|among shurima'?s).*\bascended\b/i,
    /\bascended god-warrior\b/i,
    /\bsun disc\b/i,
    /\bchosen as one of shurima'?s god-warriors\b/i,
  ],
  "claim:aatrox-participated-void-war": [
    /\bfought\b.*\bvoid\b/i,
    /\bdefenders against the void\b/i,
    /\bwar against the void\b/i,
    /\bvoid incursion\b/i,
  ],
  "claim:aatrox-became-darkin": [
    /\bbecame darkin\b/i,
    /\bcurdled\b/i,
    /\bcorrupt/i,
    /\bdarkin turn\b/i,
    /\bsurviving corrupted ascended\b/i,
  ],
  "claim:aatrox-fought-pantheon": [
    /\bdestroyed\b.*\baspect\b/i,
    /\bhunts\b/i,
    /\bduel\b/i,
    /\bmortal host survives\b/i,
    /\bcelestial power within atreus\b/i,
  ],
  "claim:aatrox-sealed-in-blade": [
    /\bsealed inside\b/i,
    /\bimprisoned\b/i,
    /\bbound into the (sword|blade|weapon)\b/i,
    /\bsealed inside the weapons\b/i,
    /\binto his blade\b/i,
  ],
  "claim:aatrox-possesses-host": [
    /\btakes the body\b/i,
    /\blifts the blade\b/i,
    /\bpicks up\b/i,
    /\bwielder\b/i,
  ],
  "claim:varus-was-ascended": [
    /\bvarus\b.*\bascended\b/i,
    /\bascended through shurima'?s sun disc\b/i,
    /\bshurima'?s ascended\b/i,
    /\belevate mortals into ascended\b/i,
  ],
  "claim:varus-became-darkin": [
    /\bvarus\b.*\bdarkin\b/i,
    /\bbecame darkin\b/i,
    /\bcorrupted\b/i,
    /\boutlives his purpose\b/i,
  ],
  "claim:varus-sealed-in-bow": [
    /\bsealed into the bow\b/i,
    /\bvarus into his bow\b/i,
    /\bimprisoned inside his own weapon\b/i,
    /\bdefeated darkin were sealed\b/i,
  ],
  "claim:varus-possesses-valmar-kai": [
    /\bvalmar\b/i,
    /\bkai\b/i,
    /\btwo (young )?lovers\b/i,
    /\bthree sets of memories\b/i,
    /\bsharing one body\b/i,
  ],
  "claim:nasus-was-ascended": [
    /\bnasus\b.*\bascended\b/i,
    /\balready ascended\b/i,
    /\bgod-warriors\b/i,
  ],
  "claim:nasus-scholar-archivist": [
    /\bscholar\b/i,
    /\barchivist\b/i,
    /\bstrategist\b/i,
  ],
  "claim:pantheon-hosted-aspect-of-war": [
    /\batreus\b.*\bclimbed\b/i,
    /\bhost(ed|ing)\b.*\baspect of war\b/i,
    /\bchosen by the aspect of war\b/i,
    /\bmortal vessel for the aspect of war\b/i,
  ],
  "claim:pantheon-aspect-destroyed": [
    /\baspect\b.*\b(destroyed|killed)\b/i,
    /\batreus\b.*\bsurvived\b/i,
    /\bmortal host\b.*\balive\b/i,
    /\bwielded the fallen aspect'?s weapons\b/i,
    /\btakes up the fallen aspect'?s weapons\b/i,
  ],
  "claim:aspect-of-war-sealed-darkin": [
    /\baspect of war\b.*\b(sealed|campaign|darkin war|intervened)\b/i,
    /\bcelestial aspect of war fought\b/i,
    /\btargon intervened\b/i,
  ],
  "claim:shurima-sun-disc-ascension": [
    /\bsun disc\b.*\belevat/i,
    /\belevate mortals into ascended\b/i,
    /\bsun disc could elevate\b/i,
  ],
  "claim:rite-elevates-ascended": [
    /\brite of ascension\b/i,
    /\bused the rite of ascension\b/i,
    /\brite\b.*\belevat/i,
  ],
  "claim:shurima-rite-of-ascension": [
    /\brite of ascension\b/i,
    /\bsun disc\b/i,
  ],
  "claim:kaisa-survived-void": [
    /\bkaisa\b.*\bvoid\b/i,
    /\bsurvived\b.*\bvoid\b/i,
  ],
};

/** Sentence fragments that cannot be FACT from transformation/participation claims alone. */
export const EDITORIAL_PROPOSITION_MARKERS: RegExp[] = [
  /\bneeded the war to continue\b/i,
  /\bvictory arrives and changes nothing\b/i,
  /\bcenturies at the front line\b/i,
  /\bcenturies of war had hollowed\b/i,
  /\bpublic ceremony\b/i,
  /\bdefenders of the empire\b/i,
  /\bformal shuriman institution\b/i,
  /\bsomething in the ascended broke\b/i,
  /\bcurdled into appetite\b/i,
  /\bheroes who had saved shurima became the reason\b/i,
  /\bmortals who had built them fought back\b/i,
  /\btargon intervened\b/i,
  /\bcould not be killed\b/i,
  /\bmost reliable exit\b/i,
  /\bworld ending\b/i,
  /\bseals are failing\b/i,
  /\btargon built the cages\b/i,
  /\binteresting is what happened next\b/i,
  /\bneither of them is owed\b/i,
  /\bwinning a war like that requires\b/i,
  /\bnobody in the empire asked\b/i,
];

export function splitPropositions(text: string): string[] {
  return text
    .split(/(?<=[.!?])\s+/)
    .map((s) => s.trim())
    .filter(Boolean);
}

export function claimSupportsPropositionStrict(claimId: string, text: string): boolean {
  const patterns = CLAIM_PROPOSITION_PATTERNS[claimId];
  if (!patterns?.length) return false;
  return patterns.some((p) => p.test(text));
}

export function propositionFullySupported(text: string, claimIds: string[]): boolean {
  if (EDITORIAL_PROPOSITION_MARKERS.some((p) => p.test(text))) {
    return false;
  }

  const sentences = splitPropositions(text);
  if (!sentences.length) return false;

  return sentences.every((sentence) =>
    claimIds.some((id) => claimSupportsPropositionStrict(id, sentence)),
  );
}

export function claimsForBlockKey(blockKey: string): string[] | undefined {
  return BLOCK_PROPOSITION_CLAIMS[blockKey];
}

/** Required claims per story-path block — each must strictly support the block text. */
export const BLOCK_PROPOSITION_CLAIMS: Record<string, string[]> = {
  "the-darkin:0:0": ["claim:shurima-sun-disc-ascension"],
  "the-darkin:0:1": ["claim:rite-elevates-ascended"],
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
