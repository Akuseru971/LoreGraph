import type { Claim } from "@/types";

/** Surgical claim patches — prefer explicit overrides over editing generated pack merges. */
export const CLAIM_PATCHES: Record<string, Partial<Claim>> = {
  "claim:yunara-aion-erna": {
    objectId: "artifact:aion-erna",
    predicate: "WIELDS",
    evidenceNote: "Riot bio establishes Yunara wields the legendary Kinkou relic Aion Er'na.",
  },
};

export function applyClaimPatches(claims: Claim[]): Claim[] {
  return claims.map((c) => {
    const patch = CLAIM_PATCHES[c.id];
    return patch ? { ...c, ...patch } : c;
  });
}
