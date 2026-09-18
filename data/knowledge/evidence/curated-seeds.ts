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
    normalizedFact: "Ahri drains life essence and struggles with the memories she inherits.",
    shortExcerpt: "drain the life essence of others, and with it their memories",
  },
  {
    claimId: "claim:ahri-seeks-origins",
    sourceId: "source:bio-ahri",
    normalizedFact: "Ahri seeks understanding of her origins among the vastaya.",
    shortExcerpt: "looks for her origins among the vastaya",
  },

  // Skarner (post-VGU)
  {
    claimId: "claim:skarner-yun-tal-founder",
    sourceId: "source:bio-skarner",
    normalizedFact:
      "Skarner is revered in Ixtal as a founding member of the Yun Tal ruling caste.",
    shortExcerpt: "founding members of its ruling caste, the Yun Tal",
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
    shortExcerpt: "keeping his nation safe from the rest of the world",
  },
  {
    claimId: "claim:pack:00126",
    sourceId: "source:bio-skarner",
    normalizedFact: "Skarner is associated with Ixtal per official biography.",
    shortExcerpt: "Ixtal",
    evidenceType: "CONTEXT_ONLY",
  },
];
