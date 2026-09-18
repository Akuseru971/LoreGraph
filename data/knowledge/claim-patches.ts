import type { Claim } from "@/types";

/** Surgical claim patches — prefer explicit overrides over editing generated pack merges. */
export const CLAIM_PATCHES: Record<string, Partial<Claim>> = {
  "claim:yunara-aion-erna": {
    objectId: "artifact:aion-erna",
    predicate: "WIELDS",
    evidenceNote: "Riot bio establishes Yunara wields the legendary Kinkou relic Aion Er'na.",
  },

  /* Phase 1 — Aatrox */
  "claim:pack:00174": {
    reviewed: true,
    needsReview: false,
    evidenceNote: "Duplicate participation edge; primary evidence in claim:aatrox-fought-pantheon per source:bio-aatrox.",
  },
  "claim:pack:00204": {
    reviewed: true,
    needsReview: false,
    evidenceNote: "Structural Darkin category link — no documented personal alliance.",
  },
  "claim:pack:00205": {
    reviewed: true,
    needsReview: false,
    evidenceNote: "Structural Darkin category link — no documented personal alliance.",
  },
  "claim:pack:00257": {
    reviewed: true,
    needsReview: false,
    predicate: "PARTICIPATED_IN",
    certainty: "DOCUMENTED",
    sourceIds: ["source:bio-aatrox"],
    evidenceNote: "Aatrox bio establishes he fought as a Shuriman defender against the Void.",
  },
  "claim:pack:00267": {
    reviewed: true,
    needsReview: false,
    predicate: "PARTICIPATED_IN",
    certainty: "DOCUMENTED",
    sourceIds: ["source:bio-aatrox", "source:twilight-of-the-gods"],
    evidenceNote: "Aatrox bio and Twilight of the Gods establish Darkin War participation.",
  },
  "claim:pack:00315": {
    reviewed: true,
    needsReview: false,
    predicate: "PARTICIPATED_IN",
    certainty: "DOCUMENTED",
    sourceIds: ["source:bio-aatrox", "source:bio-pantheon"],
    evidenceNote: "Bios establish Aatrox destroyed the Aspect of War within Atreus.",
  },

  /* Phase 1 — Pantheon */
  "claim:pack:00100": {
    reviewed: true,
    needsReview: false,
    sourceIds: ["source:bio-pantheon"],
    evidenceNote: "Region confirmed by source:bio-pantheon.",
  },
  "claim:pack:00256": {
    reviewed: true,
    needsReview: false,
    certainty: "DERIVED",
    evidenceNote: "Structural Targonian celestial link — not a direct personal relationship.",
  },
  "claim:pack:00316": {
    reviewed: true,
    needsReview: false,
    predicate: "PARTICIPATED_IN",
    certainty: "DOCUMENTED",
    sourceIds: ["source:bio-pantheon", "source:bio-aatrox"],
    evidenceNote: "Pantheon bio establishes Atreus fought Aatrox; the Aspect was destroyed.",
  },

  /* Phase 1 — Varus */
  "claim:pack:00146": {
    reviewed: true,
    needsReview: false,
    sourceIds: ["source:bio-varus"],
    evidenceNote: "Ancient Shurima origin; modern activity in Ionia per source:bio-varus.",
  },
  "claim:pack:00268": {
    reviewed: true,
    needsReview: false,
    predicate: "PARTICIPATED_IN",
    certainty: "DOCUMENTED",
    sourceIds: ["source:bio-varus"],
    evidenceNote: "Varus bio establishes imprisonment in his bow after the Darkin War.",
  },

  /* Phase 1 — Nasus */
  "claim:pack:00090": {
    reviewed: true,
    needsReview: false,
    sourceIds: ["source:bio-nasus"],
    evidenceNote: "Region confirmed by source:bio-nasus.",
  },
  "claim:pack:00181": {
    reviewed: true,
    needsReview: false,
    sourceIds: ["source:bio-nasus", "source:bio-renekton"],
    evidenceNote: "Nasus and Renekton bios establish they are brothers.",
  },
  "claim:pack:00182": {
    reviewed: true,
    needsReview: false,
    sourceIds: ["source:bio-nasus", "source:bio-xerath"],
    evidenceNote: "Nasus bio establishes he helped imprison Xerath after the fall.",
  },
  "claim:pack:00258": {
    reviewed: true,
    needsReview: false,
    predicate: "PARTICIPATED_IN",
    certainty: "STRONG",
    sourceIds: ["source:bio-nasus"],
    evidenceNote: "Nasus bio establishes he was Ascended when Shurima fought the Void.",
  },
  "claim:pack:00264": {
    reviewed: true,
    needsReview: false,
    objectId: "event:fall-of-shurima",
    predicate: "PARTICIPATED_IN",
    certainty: "DOCUMENTED",
    sourceIds: ["source:bio-nasus"],
    evidenceNote: "Nasus bio establishes he sealed Xerath during the fall of Shurima.",
  },
  "claim:pack:00289": {
    reviewed: true,
    needsReview: false,
    objectId: "event:shurima-risen",
    predicate: "PARTICIPATED_IN",
    certainty: "DOCUMENTED",
    sourceIds: ["source:bio-nasus"],
    evidenceNote: "Nasus present when Shurima rose again per source:bio-nasus.",
  },
  "claim:pack:00325": {
    reviewed: true,
    needsReview: false,
    predicate: "ACTIVE_DURING",
    certainty: "STRONG",
    sourceIds: ["source:bio-nasus"],
    evidenceNote: "Nasus served during Shurima's golden age as scholar and Ascended.",
  },

  /* Phase 1 — Renekton */
  "claim:pack:00110": {
    reviewed: true,
    needsReview: false,
    sourceIds: ["source:bio-renekton"],
    evidenceNote: "Region confirmed by source:bio-renekton.",
  },
  "claim:pack:00183": {
    reviewed: true,
    needsReview: false,
    sourceIds: ["source:bio-renekton", "source:bio-xerath"],
    evidenceNote: "Renekton bio establishes he was entombed guarding Xerath.",
  },
  "claim:pack:00259": {
    reviewed: false,
    needsReview: true,
    predicate: "PARTICIPATED_IN",
    certainty: "STRONG",
    sourceIds: ["source:bio-renekton"],
    evidenceNote:
      "Renekton was Ascended during ancient Shurima; Void War participation not explicitly documented in primary sources.",
  },
  "claim:pack:00265": {
    reviewed: true,
    needsReview: false,
    objectId: "event:fall-of-shurima",
    predicate: "PARTICIPATED_IN",
    certainty: "DOCUMENTED",
    sourceIds: ["source:bio-renekton"],
    evidenceNote: "Renekton entered the tomb during the fall per source:bio-renekton.",
  },
  "claim:pack:00290": {
    reviewed: true,
    needsReview: false,
    objectId: "event:shurima-risen",
    predicate: "PARTICIPATED_IN",
    certainty: "DOCUMENTED",
    sourceIds: ["source:bio-renekton"],
    evidenceNote: "Renekton freed when Shurima rose again per source:bio-renekton.",
  },
  "claim:pack:00326": {
    reviewed: true,
    needsReview: false,
    predicate: "ACTIVE_DURING",
    certainty: "STRONG",
    sourceIds: ["source:bio-renekton"],
    evidenceNote: "Renekton was Shurima's foremost warrior during the empire's height.",
  },

  /* Phase 1 — Azir */
  "claim:pack:00014": {
    reviewed: true,
    needsReview: false,
    sourceIds: ["source:bio-azir"],
    evidenceNote: "Region confirmed by source:bio-azir.",
  },
  "claim:pack:00179": {
    reviewed: true,
    needsReview: false,
    sourceIds: ["source:bio-azir", "source:bio-xerath"],
    evidenceNote: "Azir and Xerath bios establish Xerath's betrayal at Ascension.",
  },
  "claim:pack:00180": {
    reviewed: true,
    needsReview: false,
    sourceIds: ["source:bio-azir"],
    evidenceNote: "Sivir's bloodline enables Azir's return per source:bio-azir.",
  },
  "claim:pack:00262": {
    reviewed: true,
    needsReview: false,
    objectId: "event:fall-of-shurima",
    predicate: "PARTICIPATED_IN",
    certainty: "DOCUMENTED",
    sourceIds: ["source:bio-azir", "source:rise"],
    evidenceNote: "Azir was killed during his Ascension when Xerath betrayed him.",
  },
  "claim:pack:00287": {
    reviewed: true,
    needsReview: false,
    objectId: "event:shurima-risen",
    predicate: "PARTICIPATED_IN",
    certainty: "DOCUMENTED",
    sourceIds: ["source:bio-azir", "source:rise"],
    evidenceNote: "Azir returned Ascended when Shurima rose again.",
  },
  "claim:pack:00324": {
    reviewed: true,
    needsReview: false,
    predicate: "ACTIVE_DURING",
    certainty: "DOCUMENTED",
    sourceIds: ["source:bio-azir"],
    evidenceNote: "Azir ruled during Shurima's late imperial golden age.",
  },

  /* Phase 1 — Xerath */
  "claim:pack:00159": {
    reviewed: true,
    needsReview: false,
    sourceIds: ["source:bio-xerath"],
    evidenceNote: "Region confirmed by source:bio-xerath.",
  },
  "claim:pack:00243": {
    reviewed: true,
    needsReview: false,
    sourceIds: ["source:bio-xerath", "source:bio-azir"],
    evidenceNote: "Xerath bio establishes his betrayal of Azir at Ascension.",
  },
  "claim:pack:00263": {
    reviewed: true,
    needsReview: false,
    objectId: "event:fall-of-shurima",
    predicate: "PARTICIPATED_IN",
    certainty: "DOCUMENTED",
    sourceIds: ["source:bio-xerath", "source:bio-azir"],
    evidenceNote: "Xerath caused the fall during Azir's Ascension.",
  },
  "claim:pack:00291": {
    reviewed: true,
    needsReview: false,
    objectId: "event:shurima-risen",
    predicate: "PARTICIPATED_IN",
    certainty: "DOCUMENTED",
    sourceIds: ["source:bio-xerath"],
    evidenceNote: "Xerath freed when Shurima rose again per source:bio-xerath.",
  },
  "claim:pack:00327": {
    reviewed: true,
    needsReview: false,
    predicate: "ACTIVE_DURING",
    certainty: "STRONG",
    sourceIds: ["source:bio-xerath", "source:bio-azir"],
    evidenceNote: "Xerath served Azir during Shurima's late imperial period.",
  },

  /* Phase 1 — Kai'Sa */
  "claim:pack:00208": {
    reviewed: true,
    needsReview: false,
    sourceIds: ["source:bio-kaisa", "source:bio-kassadin"],
    evidenceNote: "Kai'Sa and Kassadin bios establish their parent-child relationship.",
  },

  /* Phase 1 — Kassadin */
  "claim:pack:00061": {
    reviewed: true,
    needsReview: false,
    sourceIds: ["source:bio-kassadin"],
    evidenceNote: "Shuriman origin; Void hunter per source:bio-kassadin.",
  },
  "claim:pack:00242": {
    reviewed: true,
    needsReview: false,
    sourceIds: ["source:bio-kassadin", "source:bio-malzahar"],
    evidenceNote: "Kassadin opposes Malzahar's Void prophecy per bios.",
  },

  /* Phase 1 — Malzahar */
  "claim:pack:00080": {
    reviewed: true,
    needsReview: false,
    sourceIds: ["source:bio-malzahar"],
    evidenceNote: "Shuriman origin; Void prophet per source:bio-malzahar.",
  },

  /* Phase 1 — Bel'Veth (pack uses bel-veth slug) */
  "claim:pack:00016": {
    subjectId: "char:belveth",
    reviewed: true,
    needsReview: false,
    sourceIds: ["source:bio-belveth"],
    evidenceNote: "Void region association confirmed per source:bio-belveth.",
  },
  "claim:pack:00209": {
    subjectId: "char:belveth",
    reviewed: true,
    needsReview: false,
    sourceIds: ["source:bio-belveth", "source:bio-kaisa"],
    evidenceNote: "Bel'Veth bio establishes direct confrontation with Kai'Sa.",
  },

  /* Phase 1 — Aurelion Sol */
  "claim:pack:00012": {
    reviewed: true,
    needsReview: false,
    sourceIds: ["source:bio-aurelion-sol"],
    evidenceNote: "Bound to Targon per source:bio-aurelion-sol.",
  },

  /* Phase 1 — Leona */
  "claim:pack:00072": {
    reviewed: true,
    needsReview: false,
    sourceIds: ["source:bio-leona"],
    evidenceNote: "Region confirmed by source:bio-leona.",
  },
  "claim:pack:00210": {
    reviewed: true,
    needsReview: false,
    sourceIds: ["source:bio-leona", "source:bio-diana"],
    evidenceNote: "Leona and Diana bios establish they grew up together.",
  },

  /* Phase 1 — Diana */
  "claim:pack:00027": {
    reviewed: true,
    needsReview: false,
    sourceIds: ["source:bio-diana"],
    evidenceNote: "Region confirmed by source:bio-diana.",
  },
  "claim:pack:00226": {
    reviewed: true,
    needsReview: false,
    certainty: "STRONG",
    evidenceNote: "Structural Lunari faith link — not a documented personal alliance with Aphelios.",
  },
  "claim:pack:00301": {
    reviewed: true,
    needsReview: false,
    certainty: "UNCERTAIN",
    canonStatus: "AMBIGUOUS",
    evidenceNote: "No documented Ruination participation in primary Diana sources — seed rejected.",
  },

  /* Phase 1 — Zoe */
  "claim:pack:00172": {
    reviewed: true,
    needsReview: false,
    sourceIds: ["source:bio-zoe"],
    evidenceNote: "Region confirmed by source:bio-zoe.",
  },
  "claim:pack:00255": {
    reviewed: true,
    needsReview: false,
    sourceIds: ["source:bio-zoe", "source:bio-aurelion-sol"],
    evidenceNote: "Zoe bio establishes interaction with Aurelion Sol as a celestial figure.",
  },
};

export function applyClaimPatches(claims: Claim[]): Claim[] {
  return claims.map((c) => {
    const patch = CLAIM_PATCHES[c.id];
    return patch ? { ...c, ...patch } : c;
  });
}
