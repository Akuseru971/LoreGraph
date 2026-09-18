/**
 * Phase 1 source evidence seeds — normalized facts derived from Riot primary sources.
 * Each record must be traceable to an actual source; evidenceNote alone is not proof.
 */
export interface EvidenceSeed {
  claimId: string;
  sourceId: string;
  normalizedFact: string;
  shortExcerpt: string;
  evidenceType?: "DIRECT_STATEMENT" | "COMBINED_PRIMARY" | "OFFICIAL_REFERENCE" | "CONTEXT_ONLY";
}

export const phase1EvidenceSeeds: EvidenceSeed[] = [
  // ── Aatrox ──────────────────────────────────────────────────────────────
  {
    claimId: "claim:aatrox-was-ascended",
    sourceId: "source:bio-aatrox",
    normalizedFact:
      "Aatrox was among the first mortals raised by Shurima's Sun Disc into an Ascended god-warrior.",
    shortExcerpt: "raised by Shurima's Sun Disc into an Ascended god-warrior",
  },
  {
    claimId: "claim:aatrox-participated-void-war",
    sourceId: "source:bio-aatrox",
    normalizedFact:
      "Aatrox fought as one of Shurima's defenders against the Void during the ancient incursion.",
    shortExcerpt: "fought as one of Shurima's defenders against the Void",
  },
  {
    claimId: "claim:aatrox-became-darkin",
    sourceId: "source:bio-aatrox",
    normalizedFact:
      "Aatrox became Darkin as corruption spread among surviving Ascended after centuries of war.",
    shortExcerpt: "heroes who had saved Shurima became the reason it needed saving again",
  },
  {
    claimId: "claim:aatrox-participated-darkin-war",
    sourceId: "source:bio-aatrox",
    normalizedFact: "Aatrox fought among the corrupted Ascended during the Darkin War.",
    shortExcerpt: "sealed inside his own weapon after the Darkin War",
  },
  {
    claimId: "claim:aatrox-sealed-in-blade",
    sourceId: "source:bio-aatrox",
    normalizedFact: "Aatrox was sealed inside his own weapon after the Darkin War.",
    shortExcerpt: "sealed inside his own weapon after the Darkin War",
  },
  {
    claimId: "claim:aatrox-possesses-host",
    sourceId: "source:bio-aatrox",
    normalizedFact:
      "When a mortal picks up Aatrox's blade, he takes the body and remakes it.",
    shortExcerpt: "takes the body and remakes it into a shape he recognises",
  },
  {
    claimId: "claim:aatrox-fought-pantheon",
    sourceId: "source:bio-pantheon",
    normalizedFact: "Aatrox destroyed the celestial Aspect of War within Atreus; the mortal survived.",
    shortExcerpt: "Aatrox destroyed the celestial Aspect of War within Atreus",
    evidenceType: "COMBINED_PRIMARY",
  },
  {
    claimId: "claim:aatrox-aspect-war-destroyed",
    sourceId: "source:bio-pantheon",
    normalizedFact: "Aatrox destroyed the celestial Aspect of War within Atreus.",
    shortExcerpt: "Aatrox destroyed the celestial Aspect of War within Atreus",
  },
  {
    claimId: "claim:pack:00174",
    sourceId: "source:bio-pantheon",
    normalizedFact: "Aatrox and Pantheon are enemies after Aatrox destroyed the Aspect of War within Atreus.",
    shortExcerpt: "Aatrox destroyed the celestial Aspect of War within Atreus",
  },
  {
    claimId: "claim:pack:00204",
    sourceId: "source:bio-aatrox",
    normalizedFact: "Aatrox is a Darkin, a corrupted former Ascended.",
    shortExcerpt: "heroes who had saved Shurima became the reason it needed saving again",
    evidenceType: "CONTEXT_ONLY",
  },
  {
    claimId: "claim:pack:00205",
    sourceId: "source:bio-aatrox",
    normalizedFact: "Aatrox belongs to the Darkin category of corrupted Ascended.",
    shortExcerpt: "Darkin",
    evidenceType: "CONTEXT_ONLY",
  },

  // ── Pantheon ────────────────────────────────────────────────────────────
  {
    claimId: "claim:pantheon-hosted-aspect-of-war",
    sourceId: "source:bio-pantheon",
    normalizedFact: "Atreus climbed Mount Targon and became host to the Aspect of War.",
    shortExcerpt: "became host to the Aspect of War",
  },
  {
    claimId: "claim:pantheon-aspect-destroyed",
    sourceId: "source:bio-pantheon",
    normalizedFact: "Aatrox destroyed the celestial Aspect of War within Atreus; the mortal host survived.",
    shortExcerpt: "destroyed the celestial Aspect of War within Atreus",
  },
  {
    claimId: "claim:pantheon-climbed-targon",
    sourceId: "source:bio-pantheon",
    normalizedFact: "Atreus climbed Mount Targon and was chosen by the Aspect of War.",
    shortExcerpt: "climbed Mount Targon",
  },
  {
    claimId: "claim:pantheon-rakkor-origin",
    sourceId: "source:bio-pantheon",
    normalizedFact: "Atreus is a Rakkor from Mount Targon.",
    shortExcerpt: "Atreus climbed Mount Targon",
    evidenceType: "CONTEXT_ONLY",
  },
  {
    claimId: "claim:pantheon-participated-aatrox-duel",
    sourceId: "source:bio-pantheon",
    normalizedFact: "Atreus participated in the duel where Aatrox destroyed the Aspect of War within him.",
    shortExcerpt: "Aatrox destroyed the celestial Aspect of War within Atreus",
  },
  {
    claimId: "claim:pack:00100",
    sourceId: "source:bio-pantheon",
    normalizedFact: "Pantheon is associated with the Targon region per official biography.",
    shortExcerpt: "Mount Targon",
    evidenceType: "CONTEXT_ONLY",
  },
  {
    claimId: "claim:pack:00256",
    sourceId: "source:bio-pantheon",
    normalizedFact: "Pantheon exists within the Targonian celestial system alongside other Aspects.",
    shortExcerpt: "Aspect of War",
    evidenceType: "CONTEXT_ONLY",
  },

  // ── Varus ───────────────────────────────────────────────────────────────
  {
    claimId: "claim:varus-was-ascended",
    sourceId: "source:twilight-of-the-gods",
    normalizedFact: "Varus was a Shuriman Ascended before Darkin corruption.",
    shortExcerpt: "Shuriman Ascended",
    evidenceType: "COMBINED_PRIMARY",
  },
  {
    claimId: "claim:varus-was-ascended",
    sourceId: "source:bio-varus",
    normalizedFact: "Varus was elevated through Shurima's Sun Disc into an Ascended.",
    shortExcerpt: "one of Shurima's Ascended",
  },
  {
    claimId: "claim:varus-became-darkin",
    sourceId: "source:bio-varus",
    normalizedFact: "Varus became a Darkin as corruption spread among surviving Ascended.",
    shortExcerpt: "later became Darkin",
  },
  {
    claimId: "claim:varus-sealed-in-bow",
    sourceId: "source:bio-varus",
    normalizedFact: "Varus was bound into his bow after the Darkin War.",
    shortExcerpt: "bound into his bow and hidden away",
  },
  {
    claimId: "claim:varus-possesses-valmar-kai",
    sourceId: "source:bio-varus",
    normalizedFact: "Valmar and Kai share one body with Varus inside the bow.",
    shortExcerpt: "one body with three sets of memories",
  },
  {
    claimId: "claim:pack:00146",
    sourceId: "source:bio-varus",
    normalizedFact: "Varus is associated with Ionia and Shurima per official biography.",
    shortExcerpt: "Shurima",
    evidenceType: "CONTEXT_ONLY",
  },

  // ── Nasus ───────────────────────────────────────────────────────────────
  {
    claimId: "claim:nasus-was-ascended",
    sourceId: "source:bio-nasus",
    normalizedFact: "Nasus was Ascended into a Shuriman god-warrior.",
    shortExcerpt: "Ascension gave him the strength",
  },
  {
    claimId: "claim:nasus-scholar-archivist",
    sourceId: "source:bio-nasus",
    normalizedFact: "Nasus was a strategist and archivist before Ascension.",
    shortExcerpt: "strategist and archivist before he was a god-warrior",
  },
  {
    claimId: "claim:nasus-brother-renekton",
    sourceId: "source:bio-nasus",
    normalizedFact: "Renekton is Nasus's brother; both were raised together.",
    shortExcerpt: "his brother Renekton",
  },
  {
    claimId: "claim:nasus-opposed-xerath",
    sourceId: "source:bio-nasus",
    normalizedFact: "Nasus opposed Xerath during the fall of Shurima.",
    shortExcerpt: "helped seal Xerath within the Tomb of the Emperors",
  },
  {
    claimId: "claim:nasus-participated-fall",
    sourceId: "source:bio-nasus",
    normalizedFact: "During the fall of Shurima, Nasus sealed Xerath away in the Tomb of the Emperors.",
    shortExcerpt: "helped seal Xerath within the Tomb of the Emperors",
  },
  {
    claimId: "claim:nasus-guards-shuriman-knowledge",
    sourceId: "source:bio-nasus",
    normalizedFact: "Nasus guards what remains of Shurima's knowledge after the fall.",
    shortExcerpt: "guarding what was left of Shurima's knowledge",
  },
  {
    claimId: "claim:pack:00090",
    sourceId: "source:bio-nasus",
    normalizedFact: "Nasus is associated with Shurima per official biography.",
    shortExcerpt: "Shurima",
    evidenceType: "CONTEXT_ONLY",
  },
  {
    claimId: "claim:pack:00181",
    sourceId: "source:bio-nasus",
    normalizedFact: "Nasus and Renekton are brothers per official biography.",
    shortExcerpt: "brother Renekton",
  },
  {
    claimId: "claim:pack:00182",
    sourceId: "source:bio-nasus",
    normalizedFact: "Nasus and Xerath are enemies after Xerath's betrayal.",
    shortExcerpt: "helped seal Xerath within the Tomb of the Emperors",
  },
  {
    claimId: "claim:pack:00325",
    sourceId: "source:bio-nasus",
    normalizedFact: "Nasus was active during Shurima's golden age as an Ascended scholar.",
    shortExcerpt: "strategist and archivist",
    evidenceType: "CONTEXT_ONLY",
  },

  // ── Renekton ──────────────────────────────────────────────────────────────
  {
    claimId: "claim:renekton-was-ascended",
    sourceId: "source:bio-renekton",
    normalizedFact: "Renekton Ascended alongside Nasus as one of Shurima's god-warriors.",
    shortExcerpt: "Both brothers Ascended to defend the empire",
  },
  {
    claimId: "claim:renekton-brother-nasus",
    sourceId: "source:bio-renekton",
    normalizedFact: "Renekton was Nasus's younger brother raised alongside him.",
    shortExcerpt: "Nasus's younger brother",
  },
  {
    claimId: "claim:renekton-imprisoned-with-xerath",
    sourceId: "source:bio-renekton",
    normalizedFact: "Renekton followed Nasus into the Tomb to imprison Xerath beneath the ruins.",
    shortExcerpt: "followed Nasus into the Tomb of the Emperors",
  },
  {
    claimId: "claim:renekton-returned-shurima-risen",
    sourceId: "source:bio-renekton",
    normalizedFact: "Renekton was freed when Shurima rose again.",
    shortExcerpt: "When Shurima rose again, Renekton returned",
  },
  {
    claimId: "claim:pack:00110",
    sourceId: "source:bio-renekton",
    normalizedFact: "Renekton is associated with Shurima per official biography.",
    shortExcerpt: "Shurima",
    evidenceType: "CONTEXT_ONLY",
  },
  {
    claimId: "claim:pack:00183",
    sourceId: "source:bio-renekton",
    normalizedFact: "Renekton hunts Xerath after being freed from the tomb.",
    shortExcerpt: "still hunting Xerath",
  },
  {
    claimId: "claim:pack:00326",
    sourceId: "source:bio-renekton",
    normalizedFact: "Renekton was active during ancient Shurima as an Ascended warrior.",
    shortExcerpt: "Shurima's most celebrated warrior",
    evidenceType: "CONTEXT_ONLY",
  },

  // ── Azir ────────────────────────────────────────────────────────────────
  {
    claimId: "claim:azir-emperor-shurima",
    sourceId: "source:bio-azir",
    normalizedFact: "Azir was the last emperor of Shurima who inherited an empire at its height.",
    shortExcerpt: "inherited an empire at its height",
  },
  {
    claimId: "claim:azir-betrayed-by-xerath",
    sourceId: "source:bio-azir",
    normalizedFact: "Xerath sabotaged Azir's Ascension and destroyed him.",
    shortExcerpt: "Xerath sabotaged it",
  },
  {
    claimId: "claim:azir-participated-fall",
    sourceId: "source:bio-azir",
    normalizedFact: "Azir participated in the fall of Shurima when his Ascension was sabotaged.",
    shortExcerpt: "ritual misfired, Azir was destroyed",
  },
  {
    claimId: "claim:azir-returned-ascended",
    sourceId: "source:bio-azir",
    normalizedFact: "Azir returned Ascended when Shurima rose again.",
    shortExcerpt: "Azir returned — Ascended at last",
  },
  {
    claimId: "claim:pack:00014",
    sourceId: "source:bio-azir",
    normalizedFact: "Azir is associated with Shurima per official biography.",
    shortExcerpt: "Shurima",
    evidenceType: "CONTEXT_ONLY",
  },
  {
    claimId: "claim:pack:00179",
    sourceId: "source:bio-azir",
    normalizedFact: "Azir and Xerath are enemies after Xerath's betrayal.",
    shortExcerpt: "Xerath sabotaged it",
  },
  {
    claimId: "claim:pack:00180",
    sourceId: "source:bio-azir",
    normalizedFact: "Azir is ancestor to modern Shuriman bloodlines including Sivir.",
    shortExcerpt: "descendants who remember him",
    evidenceType: "CONTEXT_ONLY",
  },
  {
    claimId: "claim:pack:00324",
    sourceId: "source:bio-azir",
    normalizedFact: "Azir ruled during Shurima's golden age.",
    shortExcerpt: "empire at its height",
    evidenceType: "CONTEXT_ONLY",
  },

  // ── Xerath ──────────────────────────────────────────────────────────────
  {
    claimId: "claim:xerath-served-azir",
    sourceId: "source:bio-xerath",
    normalizedFact: "Xerath was Azir's closest advisor, a slave-born magus who earned proximity.",
    shortExcerpt: "emperor's closest advisor",
  },
  {
    claimId: "claim:xerath-betrayed-azir",
    sourceId: "source:bio-xerath",
    normalizedFact: "Xerath sabotaged Azir's Ascension and triggered the collapse of Shurima.",
    shortExcerpt: "sabotaged the ritual, took the power",
  },
  {
    claimId: "claim:xerath-freed-shurima-risen",
    sourceId: "source:bio-xerath",
    normalizedFact: "Xerath was freed from the Tomb when Shurima rose again.",
    shortExcerpt: "Shurima's return freed him from the sarcophagus",
  },
  {
    claimId: "claim:pack:00159",
    sourceId: "source:bio-xerath",
    normalizedFact: "Xerath is associated with Shurima per official biography.",
    shortExcerpt: "Shurima",
    evidenceType: "CONTEXT_ONLY",
  },
  {
    claimId: "claim:pack:00243",
    sourceId: "source:bio-xerath",
    normalizedFact: "Xerath and Azir are enemies after the betrayal at the Sun Disc.",
    shortExcerpt: "sabotaged the ritual",
  },
  {
    claimId: "claim:pack:00327",
    sourceId: "source:bio-xerath",
    normalizedFact: "Xerath served during ancient Shurima's golden age.",
    shortExcerpt: "slave-born magus",
    evidenceType: "CONTEXT_ONLY",
  },

  // ── Kai'Sa ──────────────────────────────────────────────────────────────
  {
    claimId: "claim:kaisa-survived-void",
    sourceId: "source:bio-kaisa",
    normalizedFact: "Kai'Sa survived a Void incursion that consumed her village.",
    shortExcerpt: "She should have died in the dark like everybody else",
  },
  {
    claimId: "claim:kaisa-survived-void-breach",
    sourceId: "source:bio-kaisa",
    normalizedFact: "Kai'Sa was taken by a Void breach beneath modern Shurima.",
    shortExcerpt: "the ground opened and took her village",
  },
  {
    claimId: "claim:kaisa-daughter-of-kassadin",
    sourceId: "source:bio-kassadin",
    normalizedFact: "Kai'Sa is Kassadin's daughter.",
    shortExcerpt: "his daughter Kaisa was among those taken",
  },
  {
    claimId: "claim:kaisa-void-symbiote",
    sourceId: "source:bio-kaisa",
    normalizedFact: "A Void symbiote fused to Kai'Sa as a second skin keeping her alive.",
    shortExcerpt: "symbiotic second skin grew over her",
  },
  {
    claimId: "claim:kaisa-hunts-void",
    sourceId: "source:bio-kaisa",
    normalizedFact: "Kai'Sa hunts Void creatures on the surface.",
    shortExcerpt: "hunts Void creatures",
  },
  {
    claimId: "claim:kaisa-bonded-carapace",
    sourceId: "source:bio-kaisa",
    normalizedFact: "Kai'Sa bonded with a Voidborn carapace fused to her as a second skin.",
    shortExcerpt: "symbiotic second skin grew over her",
  },

  // ── Kassadin ────────────────────────────────────────────────────────────
  {
    claimId: "claim:kassadin-lost-daughter-kaisa",
    sourceId: "source:bio-kassadin",
    normalizedFact: "Kassadin's daughter Kai'Sa was taken by a Void incursion.",
    shortExcerpt: "his daughter Kaisa was among those taken",
  },
  {
    claimId: "claim:kassadin-void-altered",
    sourceId: "source:bio-kassadin",
    normalizedFact: "Kassadin returned from the Void altered by Void-touched relics.",
    shortExcerpt: "walked back into the darkness",
  },
  {
    claimId: "claim:pack:00061",
    sourceId: "source:bio-kassadin",
    normalizedFact: "Kassadin is associated with Shurima and the Void per official biography.",
    shortExcerpt: "Shuriman guide",
    evidenceType: "CONTEXT_ONLY",
  },
  {
    claimId: "claim:pack:00242",
    sourceId: "source:bio-kassadin",
    normalizedFact: "Kassadin considers Malzahar an enemy who welcomes the Void.",
    shortExcerpt: "Malzahar, the prophet who welcomes what Kassadin would burn",
  },

  // ── Malzahar ────────────────────────────────────────────────────────────
  {
    claimId: "claim:malzahar-void-prophet",
    sourceId: "source:bio-malzahar",
    normalizedFact: "Malzahar is a prophet who heard the Void's whispers and preaches its doctrine.",
    shortExcerpt: "mortal prophet who chose corruption",
  },
  {
    claimId: "claim:malzahar-spreads-void-doctrine",
    sourceId: "source:bio-malzahar",
    normalizedFact: "Malzahar spreads Void doctrine across Runeterra.",
    shortExcerpt: "preaches the end of Runeterra",
  },
  {
    claimId: "claim:pack:00080",
    sourceId: "source:bio-malzahar",
    normalizedFact: "Malzahar is associated with Shurima and the Void per official biography.",
    shortExcerpt: "desert seer",
    evidenceType: "CONTEXT_ONLY",
  },

  // ── Bel'Veth ────────────────────────────────────────────────────────────
  {
    claimId: "claim:belveth-void-empress",
    sourceId: "source:bio-belveth",
    normalizedFact: "Bel'Veth is a Void empress created when the Void consumed a city whole.",
    shortExcerpt: "Void empress built from the devoured remains",
  },
  {
    claimId: "claim:belveth-confronted-kaisa",
    sourceId: "source:bio-belveth",
    normalizedFact: "Bel'Veth confronted Kai'Sa among survivors who resist the Void.",
    shortExcerpt: "faced her directly",
  },
  {
    claimId: "claim:pack:00016",
    sourceId: "source:bio-belveth",
    normalizedFact: "Bel'Veth is associated with the Void per official biography.",
    shortExcerpt: "Void",
    evidenceType: "CONTEXT_ONLY",
  },

  // ── Aurelion Sol ────────────────────────────────────────────────────────
  {
    claimId: "claim:aurelion-sol-star-forger",
    sourceId: "source:bio-aurelion-sol",
    normalizedFact: "Aurelion Sol shaped stars across the void before any mortal nations existed.",
    shortExcerpt: "shaped stars because he could",
  },
  {
    claimId: "claim:aurelion-sol-bound-by-targon",
    sourceId: "source:bio-aurelion-sol",
    normalizedFact: "The Aspects of Targon bound Aurelion Sol's power to a crown.",
    shortExcerpt: "bound his power to a crown",
  },
  {
    claimId: "claim:aurelion-sol-still-bound",
    sourceId: "source:bio-aurelion-sol",
    normalizedFact: "Aurelion Sol remains bound by the Targon crown in the modern era.",
    shortExcerpt: "bound his power to a crown",
  },
  {
    claimId: "claim:pack:00012",
    sourceId: "source:bio-aurelion-sol",
    normalizedFact: "Aurelion Sol is associated with Targon per official biography.",
    shortExcerpt: "Aspects of Targon",
    evidenceType: "CONTEXT_ONLY",
  },

  // ── Leona ───────────────────────────────────────────────────────────────
  {
    claimId: "claim:leona-hosted-aspect-of-sun",
    sourceId: "source:bio-leona",
    normalizedFact: "Leona was chosen as the Aspect of the Sun after climbing Targon.",
    shortExcerpt: "Chosen as the Aspect of the Sun",
  },
  {
    claimId: "claim:leona-childhood-friend-diana",
    sourceId: "source:bio-leona",
    normalizedFact: "Leona grew up in the Solari alongside her childhood friend Diana.",
    shortExcerpt: "childhood friend",
  },
  {
    claimId: "claim:pack:00072",
    sourceId: "source:bio-leona",
    normalizedFact: "Leona is associated with Targon per official biography.",
    shortExcerpt: "Targon",
    evidenceType: "CONTEXT_ONLY",
  },
  {
    claimId: "claim:pack:00210",
    sourceId: "source:bio-leona",
    normalizedFact: "Leona and Diana are rivals after Diana returned as the Aspect of the Moon.",
    shortExcerpt: "long conflict with Diana",
  },

  // ── Diana ───────────────────────────────────────────────────────────────
  {
    claimId: "claim:diana-hosted-aspect-of-moon",
    sourceId: "source:bio-diana",
    normalizedFact: "Diana climbed Targon and returned as the Aspect of the Moon.",
    shortExcerpt: "came back as the Aspect of the Moon",
  },
  {
    claimId: "claim:pack:00027",
    sourceId: "source:bio-diana",
    normalizedFact: "Diana is associated with Targon per official biography.",
    shortExcerpt: "Targon",
    evidenceType: "CONTEXT_ONLY",
  },
  {
    claimId: "claim:pack:00226",
    sourceId: "source:bio-diana",
    normalizedFact: "Diana is Lunari, a faith the Solari suppressed.",
    shortExcerpt: "Lunari",
    evidenceType: "CONTEXT_ONLY",
  },
  // claim:pack:00301 — Ruination participation rejected; no positive evidence seed.

  // ── Zoe ─────────────────────────────────────────────────────────────────
  {
    claimId: "claim:zoe-aspect-of-twilight",
    sourceId: "source:bio-zoe",
    normalizedFact: "Zoe is the Aspect of Twilight, a cosmic messenger of Targon.",
    shortExcerpt: "Aspect of Twilight",
  },
  {
    claimId: "claim:zoe-knows-aurelion-sol",
    sourceId: "source:bio-zoe",
    normalizedFact: "Zoe interacts with celestial powers including Aurelion Sol.",
    shortExcerpt: "interacts with other celestial powers including Aurelion Sol",
  },
  {
    claimId: "claim:pack:00172",
    sourceId: "source:bio-zoe",
    normalizedFact: "Zoe is associated with Targon per official biography.",
    shortExcerpt: "Targon",
    evidenceType: "CONTEXT_ONLY",
  },

  // ── Concept / institution claims ────────────────────────────────────────
  {
    claimId: "claim:aspect-of-war-sealed-darkin",
    sourceId: "source:bio-pantheon",
    normalizedFact:
      "The celestial Aspect of War intervened in the campaign that sealed the Darkin.",
    shortExcerpt: "Aspect of War",
    evidenceType: "COMBINED_PRIMARY",
  },
  {
    claimId: "claim:shurima-sun-disc-ascension",
    sourceId: "source:bio-aatrox",
    normalizedFact: "Shurima's Sun Disc elevated mortals into Ascended god-warriors.",
    shortExcerpt: "raised by Shurima's Sun Disc into an Ascended god-warrior",
  },
  {
    claimId: "claim:rite-elevates-ascended",
    sourceId: "source:bio-aatrox",
    normalizedFact: "The Rite of Ascension elevated mortals into Ascended god-warriors.",
    shortExcerpt: "raised by Shurima's Sun Disc into an Ascended god-warrior",
  },
  {
    claimId: "claim:shurima-rite-of-ascension",
    sourceId: "source:bio-azir",
    normalizedFact: "Azir chose to undergo the Rite of Ascension as emperor of Shurima.",
    shortExcerpt: "undergo the Rite of Ascension",
  },

  // ── Curated provenance gap (pending review — evidence attached, not promoted) ─
  {
    claimId: "claim:yunara-spirit-realm-centuries",
    sourceId: "source:bio-yunara",
    normalizedFact: "Yunara spent centuries in the spirit realm before returning.",
    shortExcerpt: "spirit realm",
    evidenceType: "OFFICIAL_REFERENCE",
  },
  {
    claimId: "claim:ambessa-medarda-matriarch",
    sourceId: "source:bio-ambessa",
    normalizedFact: "Ambessa Medarda is matriarch of the Medarda family in Noxus.",
    shortExcerpt: "Medarda",
    evidenceType: "OFFICIAL_REFERENCE",
  },
  {
    claimId: "claim:ambessa-noxian-general",
    sourceId: "source:bio-ambessa",
    normalizedFact: "Ambessa is a Noxian general and warrior leader.",
    shortExcerpt: "Noxian",
    evidenceType: "OFFICIAL_REFERENCE",
  },
];
