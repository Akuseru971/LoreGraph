import type { EvidenceSeed } from "./phase1-seeds";

/** Source evidence for CURATED_PROVENANCE_GAP / FULL_TIER_A_BUILD remediations. */
export const curatedEvidenceSeeds: EvidenceSeed[] = [
  // Ahri
  {
    claimId: "claim:ahri-vastaya-essence-magic",
    sourceId: "source:bio-ahri",
    normalizedFact: "Ahri is a vastaya whose magic is tied to life essence and memories.",
    shortExcerpt: "vastaya whose magic is tied to life essence",
  },
  {
    claimId: "claim:ahri-struggles-consuming-essence",
    sourceId: "source:bio-ahri",
    normalizedFact: "Ahri drains essence from others and inherits what each taking carries.",
    shortExcerpt: "drain essence from others to learn who she is",
  },
  {
    claimId: "claim:ahri-seeks-origins",
    sourceId: "source:bio-ahri",
    normalizedFact: "Ahri seeks understanding of her origins among the vastaya.",
    shortExcerpt: "seeks understanding of her origins among the vastaya",
  },

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
