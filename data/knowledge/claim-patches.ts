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
    evidenceNote: "Duplicate of claim:aatrox-fought-pantheon — reviewed.",
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
    evidenceNote: "Confirmed by claim:aatrox-participated-void-war.",
  },
  "claim:pack:00267": {
    reviewed: true,
    needsReview: false,
    predicate: "PARTICIPATED_IN",
    certainty: "DOCUMENTED",
    evidenceNote: "Confirmed by claim:aatrox-participated-darkin-war.",
  },
  "claim:pack:00315": {
    reviewed: true,
    needsReview: false,
    predicate: "PARTICIPATED_IN",
    certainty: "DOCUMENTED",
    evidenceNote: "Confirmed by claim:aatrox-fought-pantheon and event:aatrox-pantheon-duel.",
  },

  /* Phase 1 — Pantheon */
  "claim:pack:00100": {
    reviewed: true,
    needsReview: false,
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
    evidenceNote: "Confirmed by claim:pantheon-participated-aatrox-duel.",
  },

  /* Phase 1 — Varus */
  "claim:pack:00146": {
    reviewed: true,
    needsReview: false,
    evidenceNote: "Ancient Shurima origin; modern activity in Ionia per bio-varus.",
  },
  "claim:pack:00268": {
    reviewed: true,
    needsReview: false,
    predicate: "PARTICIPATED_IN",
    certainty: "DOCUMENTED",
    evidenceNote: "Confirmed by claim:varus-sealed-in-bow and Darkin War timeline.",
  },

  /* Phase 1 — Nasus */
  "claim:pack:00090": {
    reviewed: true,
    needsReview: false,
    evidenceNote: "Region confirmed by source:bio-nasus.",
  },
  "claim:pack:00181": {
    reviewed: true,
    needsReview: false,
    evidenceNote: "Confirmed by claim:nasus-brother-renekton.",
  },
  "claim:pack:00182": {
    reviewed: true,
    needsReview: false,
    evidenceNote: "Confirmed by claim:nasus-opposed-xerath.",
  },
  "claim:pack:00258": {
    reviewed: true,
    needsReview: false,
    predicate: "PARTICIPATED_IN",
    certainty: "STRONG",
    evidenceNote: "Confirmed by claim:nasus-participated-void-war.",
  },
  "claim:pack:00264": {
    reviewed: true,
    needsReview: false,
    objectId: "event:fall-of-shurima",
    predicate: "PARTICIPATED_IN",
    certainty: "DOCUMENTED",
    evidenceNote: "Confirmed by claim:nasus-participated-fall.",
  },
  "claim:pack:00289": {
    reviewed: true,
    needsReview: false,
    objectId: "event:shurima-risen",
    predicate: "PARTICIPATED_IN",
    certainty: "DOCUMENTED",
    evidenceNote: "Nasus present when Shurima rose again per bio-nasus.",
  },
  "claim:pack:00325": {
    reviewed: true,
    needsReview: false,
    predicate: "ACTIVE_DURING",
    certainty: "STRONG",
    evidenceNote: "Nasus served during Shurima's golden age as scholar and Ascended.",
  },

  /* Phase 1 — Renekton */
  "claim:pack:00110": {
    reviewed: true,
    needsReview: false,
    evidenceNote: "Region confirmed by source:bio-renekton.",
  },
  "claim:pack:00183": {
    reviewed: true,
    needsReview: false,
    evidenceNote: "Confirmed by claim:renekton-imprisoned-with-xerath.",
  },
  "claim:pack:00259": {
    reviewed: true,
    needsReview: false,
    predicate: "PARTICIPATED_IN",
    certainty: "STRONG",
    evidenceNote: "Renekton was Ascended during ancient Shurima's Void conflict.",
  },
  "claim:pack:00265": {
    reviewed: true,
    needsReview: false,
    objectId: "event:fall-of-shurima",
    predicate: "PARTICIPATED_IN",
    certainty: "DOCUMENTED",
    evidenceNote: "Renekton entered the tomb during the fall per bio-renekton.",
  },
  "claim:pack:00290": {
    reviewed: true,
    needsReview: false,
    objectId: "event:shurima-risen",
    predicate: "PARTICIPATED_IN",
    certainty: "DOCUMENTED",
    evidenceNote: "Renekton freed when Shurima rose again.",
  },
  "claim:pack:00326": {
    reviewed: true,
    needsReview: false,
    predicate: "ACTIVE_DURING",
    certainty: "STRONG",
    evidenceNote: "Renekton was Shurima's foremost warrior during the empire's height.",
  },

  /* Phase 1 — Azir */
  "claim:pack:00014": {
    reviewed: true,
    needsReview: false,
    evidenceNote: "Region confirmed by source:bio-azir.",
  },
  "claim:pack:00179": {
    reviewed: true,
    needsReview: false,
    evidenceNote: "Confirmed by claim:azir-betrayed-by-xerath.",
  },
  "claim:pack:00180": {
    reviewed: true,
    needsReview: false,
    evidenceNote: "Sivir's bloodline enables Azir's return per bio-azir.",
  },
  "claim:pack:00262": {
    reviewed: true,
    needsReview: false,
    objectId: "event:fall-of-shurima",
    predicate: "PARTICIPATED_IN",
    certainty: "DOCUMENTED",
    evidenceNote: "Confirmed by claim:azir-participated-fall.",
  },
  "claim:pack:00287": {
    reviewed: true,
    needsReview: false,
    objectId: "event:shurima-risen",
    predicate: "PARTICIPATED_IN",
    certainty: "DOCUMENTED",
    evidenceNote: "Confirmed by claim:azir-returned-ascended.",
  },
  "claim:pack:00324": {
    reviewed: true,
    needsReview: false,
    predicate: "ACTIVE_DURING",
    certainty: "DOCUMENTED",
    evidenceNote: "Azir ruled during Shurima's late imperial golden age.",
  },

  /* Phase 1 — Xerath */
  "claim:pack:00159": {
    reviewed: true,
    needsReview: false,
    evidenceNote: "Region confirmed by source:bio-xerath.",
  },
  "claim:pack:00243": {
    reviewed: true,
    needsReview: false,
    evidenceNote: "Confirmed by claim:xerath-betrayed-azir.",
  },
  "claim:pack:00263": {
    reviewed: true,
    needsReview: false,
    objectId: "event:fall-of-shurima",
    predicate: "PARTICIPATED_IN",
    certainty: "DOCUMENTED",
    evidenceNote: "Xerath caused the fall during Azir's Ascension.",
  },
  "claim:pack:00291": {
    reviewed: true,
    needsReview: false,
    objectId: "event:shurima-risen",
    predicate: "PARTICIPATED_IN",
    certainty: "DOCUMENTED",
    evidenceNote: "Xerath freed when Shurima rose again.",
  },
  "claim:pack:00327": {
    reviewed: true,
    needsReview: false,
    predicate: "ACTIVE_DURING",
    certainty: "STRONG",
    evidenceNote: "Xerath served Azir during Shurima's late imperial period.",
  },

  /* Phase 1 — Kai'Sa */
  "claim:pack:00208": {
    reviewed: true,
    needsReview: false,
    evidenceNote: "Confirmed by claim:kaisa-daughter-of-kassadin.",
  },

  /* Phase 1 — Kassadin */
  "claim:pack:00061": {
    reviewed: true,
    needsReview: false,
    evidenceNote: "Shuriman origin; Void hunter per bio-kassadin.",
  },
  "claim:pack:00242": {
    reviewed: true,
    needsReview: false,
    evidenceNote: "Kassadin opposes Malzahar's Void prophecy per bios.",
  },

  /* Phase 1 — Malzahar */
  "claim:pack:00080": {
    reviewed: true,
    needsReview: false,
    evidenceNote: "Shuriman origin; Void prophet per bio-malzahar.",
  },

  /* Phase 1 — Bel'Veth (pack uses bel-veth slug) */
  "claim:pack:00016": {
    subjectId: "char:belveth",
    reviewed: true,
    needsReview: false,
    evidenceNote: "Void region association confirmed; slug normalized to belveth.",
  },
  "claim:pack:00209": {
    subjectId: "char:belveth",
    reviewed: true,
    needsReview: false,
    evidenceNote: "Confirmed by claim:belveth-confronted-kaisa.",
  },

  /* Phase 1 — Aurelion Sol */
  "claim:pack:00012": {
    reviewed: true,
    needsReview: false,
    evidenceNote: "Bound to Targon per bio-aurelion-sol.",
  },

  /* Phase 1 — Leona */
  "claim:pack:00072": {
    reviewed: true,
    needsReview: false,
    evidenceNote: "Region confirmed by source:bio-leona.",
  },
  "claim:pack:00210": {
    reviewed: true,
    needsReview: false,
    evidenceNote: "Confirmed by claim:leona-childhood-friend-diana.",
  },

  /* Phase 1 — Diana */
  "claim:pack:00027": {
    reviewed: true,
    needsReview: false,
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
    evidenceNote: "Region confirmed by source:bio-zoe.",
  },
  "claim:pack:00255": {
    reviewed: true,
    needsReview: false,
    evidenceNote: "Confirmed by claim:zoe-knows-aurelion-sol.",
  },
};

export function applyClaimPatches(claims: Claim[]): Claim[] {
  return claims.map((c) => {
    const patch = CLAIM_PATCHES[c.id];
    return patch ? { ...c, ...patch } : c;
  });
}
