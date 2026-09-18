import type { Claim } from "@/types";

/** Surgical claim patches — prefer explicit overrides over editing generated pack merges. */
export const CLAIM_PATCHES: Record<string, Partial<Claim>> = {
  "claim:yunara-aion-erna": {
    objectId: "artifact:aion-erna",
    predicate: "WIELDS",
    reviewed: false,
    needsReview: true,
    evidenceNote: "Pending proposition patterns — Riot bio establishes Yunara wields Aion Er'na.",
  },
  "claim:yunara-kinkou-affiliation": {
    reviewed: false,
    needsReview: true,
    certainty: "UNCERTAIN",
    evidenceNote:
      "Pending proposition patterns — Kinkou affiliation requires explicit bio support beyond wiki reference.",
  },

  /* Phase 1 — Aatrox core claims */
  "claim:aatrox-became-darkin": {
    evidenceNote:
      "Aatrox became Darkin as corruption spread among surviving Ascended per source:bio-aatrox.",
  },
  "claim:aatrox-fought-pantheon": {
    evidenceNote:
      "Aatrox destroyed the celestial Aspect of War within Atreus during their duel per bios.",
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
    subjectId: "char:superseded-pack",
    reviewed: false,
    needsReview: true,
    predicate: "PARTICIPATED_IN",
    certainty: "DOCUMENTED",
    sourceIds: ["source:bio-aatrox"],
    evidenceNote: "Duplicate of claim:aatrox-participated-void-war — use extension claim for trust.",
  },
  "claim:pack:00267": {
    subjectId: "char:superseded-pack",
    reviewed: false,
    needsReview: true,
    predicate: "PARTICIPATED_IN",
    certainty: "DOCUMENTED",
    sourceIds: ["source:bio-aatrox", "source:twilight-of-the-gods"],
    evidenceNote: "Duplicate of claim:aatrox-participated-darkin-war — use extension claim for trust.",
  },
  "claim:pack:00315": {
    subjectId: "char:superseded-pack",
    reviewed: false,
    needsReview: true,
    predicate: "PARTICIPATED_IN",
    certainty: "DOCUMENTED",
    sourceIds: ["source:bio-aatrox", "source:bio-pantheon"],
    evidenceNote: "Duplicate of claim:aatrox-fought-pantheon — use core relationship claim for trust.",
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
    subjectId: "char:superseded-pack",
    reviewed: false,
    needsReview: true,
    predicate: "PARTICIPATED_IN",
    certainty: "DOCUMENTED",
    sourceIds: ["source:bio-pantheon", "source:bio-aatrox"],
    evidenceNote: "Duplicate of claim:pantheon-participated-aatrox-duel — use extension claim for trust.",
  },

  /* Phase 1 — Varus */
  "claim:pack:00146": {
    reviewed: true,
    needsReview: false,
    sourceIds: ["source:bio-varus"],
    evidenceNote: "Ancient Shurima origin; modern activity in Ionia per source:bio-varus.",
  },
  "claim:pack:00268": {
    subjectId: "char:superseded-pack",
    reviewed: false,
    needsReview: true,
    predicate: "PARTICIPATED_IN",
    certainty: "DOCUMENTED",
    sourceIds: ["source:bio-varus"],
    evidenceNote: "Duplicate of claim:varus-sealed-in-bow — imprisonment is not participation.",
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
    subjectId: "char:superseded-pack",
    reviewed: false,
    needsReview: true,
    predicate: "PARTICIPATED_IN",
    certainty: "UNCERTAIN",
    canonStatus: "AMBIGUOUS",
    sourceIds: ["source:bio-nasus"],
    evidenceNote:
      "No exact primary source for Nasus Void incursion participation — Ascended status during the era is insufficient.",
  },
  "claim:pack:00264": {
    subjectId: "char:superseded-pack",
    reviewed: false,
    needsReview: true,
    objectId: "event:fall-of-shurima",
    predicate: "PARTICIPATED_IN",
    certainty: "DOCUMENTED",
    sourceIds: ["source:bio-nasus"],
    evidenceNote: "Use claim:nasus-participated-fall for trusted fall participation.",
  },
  "claim:pack:00289": {
    subjectId: "char:superseded-pack",
    reviewed: false,
    needsReview: true,
    objectId: "event:shurima-risen",
    predicate: "ACTIVE_DURING",
    certainty: "STRONG",
    sourceIds: ["source:bio-nasus"],
    evidenceNote: "Nasus present when Shurima rose — ACTIVE_DURING unless explicit participation is sourced.",
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
    subjectId: "char:superseded-pack",
    reviewed: false,
    needsReview: true,
    objectId: "event:fall-of-shurima",
    predicate: "PARTICIPATED_IN",
    certainty: "DOCUMENTED",
    sourceIds: ["source:bio-renekton"],
    evidenceNote: "Use claim:renekton-imprisoned-with-xerath for trusted fall-of-shurima link.",
  },
  "claim:pack:00290": {
    subjectId: "char:superseded-pack",
    reviewed: false,
    needsReview: true,
    objectId: "event:shurima-risen",
    predicate: "PARTICIPATED_IN",
    certainty: "DOCUMENTED",
    sourceIds: ["source:bio-renekton"],
    evidenceNote: "Use claim:renekton-returned-shurima-risen for trusted shurima-risen participation.",
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
    subjectId: "char:superseded-pack",
    reviewed: false,
    needsReview: true,
    objectId: "event:fall-of-shurima",
    predicate: "PARTICIPATED_IN",
    certainty: "DOCUMENTED",
    sourceIds: ["source:bio-azir", "source:rise"],
    evidenceNote: "Use claim:azir-participated-fall for trusted fall participation.",
  },
  "claim:pack:00287": {
    subjectId: "char:superseded-pack",
    reviewed: false,
    needsReview: true,
    objectId: "event:shurima-risen",
    predicate: "PARTICIPATED_IN",
    certainty: "DOCUMENTED",
    sourceIds: ["source:bio-azir", "source:rise"],
    evidenceNote: "Use claim:azir-returned-ascended for trusted shurima-risen participation.",
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
    subjectId: "char:superseded-pack",
    reviewed: false,
    needsReview: true,
    objectId: "event:fall-of-shurima",
    predicate: "INSTIGATOR",
    certainty: "DOCUMENTED",
    sourceIds: ["source:bio-xerath", "source:bio-azir"],
    evidenceNote: "Use claim:xerath-betrayed-azir — Xerath instigated the fall, not a generic participant.",
  },
  "claim:pack:00291": {
    subjectId: "char:superseded-pack",
    reviewed: false,
    needsReview: true,
    objectId: "event:shurima-risen",
    predicate: "PARTICIPATED_IN",
    certainty: "DOCUMENTED",
    sourceIds: ["source:bio-xerath"],
    evidenceNote: "Use claim:xerath-freed-shurima-risen for trusted shurima-risen participation.",
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
    subjectId: "char:superseded-pack",
    reviewed: false,
    needsReview: true,
    sourceIds: ["source:bio-kaisa", "source:bio-kassadin"],
    evidenceNote: "Use claim:kaisa-daughter-of-kassadin for trusted parent-child link.",
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
    subjectId: "char:superseded-pack",
    reviewed: false,
    needsReview: true,
    sourceIds: ["source:bio-belveth", "source:bio-kaisa"],
    evidenceNote: "Use claim:belveth-confronted-kaisa for trusted confrontation link.",
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
    reviewed: false,
    needsReview: true,
    sourceIds: ["source:bio-zoe", "source:bio-aurelion-sol"],
    evidenceNote: "Use claim:zoe-knows-aurelion-sol for trusted celestial interaction.",
  },

  /* Superseded duplicate pack claim — removed from champion metrics */
  "claim:pack:00002": { subjectId: "char:superseded-pack" },
  "claim:pack:00126": {
    value: "Ixtal",
    sourceIds: ["source:bio-skarner"],
    reviewed: true,
    needsReview: false,
    evidenceNote: "Skarner is associated with Ixtal per post-VGU official biography.",
  },
};

export function applyClaimPatches(claims: Claim[]): Claim[] {
  return claims.map((c) => {
    const patch = CLAIM_PATCHES[c.id];
    return patch ? { ...c, ...patch } : c;
  });
}
