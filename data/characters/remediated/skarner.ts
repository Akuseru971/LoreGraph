import type { CharacterSeed } from "../build";

/** Post-VGU Skarner — Ixtali Yun Tal founder, not legacy Crystal Scar hextech canon. */
export const skarnerRemediatedSeed: CharacterSeed = {
  slug: "skarner",
  name: "Skarner",
  continuity: "MAIN_RUNETERRA",
  title: "The Primordial Sovereign",
  region: "ixtal",
  factions: ["yun-tal", "ixtal"],
  roles: ["Brackern", "Guardian", "Founder"],
  status: "Alive",
  species: "Brackern",
  aliases: ["The Primordial Sovereign"],
  releaseYear: 2011,
  complexity: 3,
  importance: 72,
  popularity: 68,
  verified: true,
  events: ["ixtal-founding"],
  tags: ["ixtal", "brackern", "yun-tal", "guardian", "isolationist"],
  sources: ["source:bio-skarner"],
  short:
    "An ancient brackern who helped found the Yun Tal and now guards Ixtal from beneath Ixaocan.",
  long: [
    "Skarner is an ancient, colossal brackern revered in Ixtal as a founding member of the Yun Tal, the ruling caste that has kept the nation's magic hidden from the outside world.",
    "He dwells in a chamber beneath Ixaocan where he senses disturbances through the earth — a living early-warning system for threats to Ixtal's isolation.",
    "His worldview is isolationist and protective: he is devoted to keeping Ixtal safe from the rest of the world.",
    "Post-VGU canon positions Skarner as an Ixtali guardian rooted in earth magic and Yun Tal authority — not the legacy Crystal Scar hextech-soul narrative.",
  ],
  timeline: [
    {
      era: "Ancient Ixtal",
      title: "Founding the Yun Tal",
      description:
        "Skarner helps establish the Yun Tal as Ixtal's ruling caste, shaping the nation's isolationist foundations.",
      sourceIds: ["source:bio-skarner"],
      claimIds: ["claim:skarner-yun-tal-founder"],
      importance: "CORE",
      canonStatus: "CURRENT_CANON",
    },
    {
      era: "Ancient Ixtal",
      title: "Guardian beneath Ixaocan",
      description:
        "He dwells beneath Ixaocan, sensing threats to Ixtal through the earth.",
      sourceIds: ["source:bio-skarner"],
      claimIds: ["claim:skarner-guardian-ixaocan"],
      importance: "CORE",
      canonStatus: "CURRENT_CANON",
    },
      {
        era: "Modern Runeterra",
        title: "Isolationist protector",
        description:
          "Skarner remains devoted to keeping Ixtal safe from the rest of the world.",
      sourceIds: ["source:bio-skarner"],
      claimIds: ["claim:skarner-isolationist-protector"],
      importance: "CORE",
      canonStatus: "CURRENT_CANON",
    },
  ],
};
