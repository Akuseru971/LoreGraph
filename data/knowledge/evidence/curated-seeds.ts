import type { EvidenceSeed } from "./phase1-seeds";

/** Source evidence for CURATED_PROVENANCE_GAP / FULL_TIER_A_BUILD remediations. */
export const curatedEvidenceSeeds: EvidenceSeed[] = [
  // Skarner (post-VGU)
  {
    claimId: "claim:skarner-yun-tal-founder",
    sourceId: "source:bio-skarner",
    normalizedFact:
      "Skarner is revered in Ixtal as a founding member of the Yun Tal ruling caste.",
    shortExcerpt: "founding member of the Yun Tal",
  },
  {
    claimId: "claim:skarner-guardian-ixaocan",
    sourceId: "source:bio-skarner",
    normalizedFact: "Skarner dwells in a chamber beneath Ixaocan where he can hear disturbances through the earth.",
    shortExcerpt: "dwells in a chamber beneath Ixaocan",
  },
  {
    claimId: "claim:skarner-isolationist-protector",
    sourceId: "source:bio-skarner",
    normalizedFact: "Skarner is devoted to keeping Ixtal safe from the rest of the world.",
    shortExcerpt: "keeping Ixtal safe from the rest of the world",
  },
  {
    claimId: "claim:pack:00126",
    sourceId: "source:bio-skarner",
    normalizedFact: "Skarner is associated with Ixtal per official biography.",
    shortExcerpt: "Ixtal",
    evidenceType: "CONTEXT_ONLY",
  },
];
