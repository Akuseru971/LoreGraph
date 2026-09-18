import type { Claim } from "@/types";

/** Proper claim lifecycle — replaces char:superseded-pack workaround. */
export const CLAIM_SUPERSESSION: Record<
  string,
  Pick<Claim, "claimStatus" | "supersededBy" | "reviewed" | "needsReview">
> = {
  "claim:pack:00002": {
    claimStatus: "SUPERSEDED",
    supersededBy: undefined,
    reviewed: false,
    needsReview: true,
  },
  "claim:pack:00257": {
    claimStatus: "SUPERSEDED",
    supersededBy: "claim:aatrox-participated-void-war",
    reviewed: false,
    needsReview: true,
  },
  "claim:pack:00267": {
    claimStatus: "SUPERSEDED",
    supersededBy: "claim:aatrox-participated-darkin-war",
    reviewed: false,
    needsReview: true,
  },
  "claim:pack:00315": {
    claimStatus: "SUPERSEDED",
    supersededBy: "claim:aatrox-fought-pantheon",
    reviewed: false,
    needsReview: true,
  },
  "claim:pack:00316": {
    claimStatus: "SUPERSEDED",
    supersededBy: "claim:pantheon-participated-aatrox-duel",
    reviewed: false,
    needsReview: true,
  },
  "claim:pack:00268": {
    claimStatus: "SUPERSEDED",
    supersededBy: "claim:varus-sealed-in-bow",
    reviewed: false,
    needsReview: true,
  },
  "claim:pack:00258": {
    claimStatus: "SUPERSEDED",
    supersededBy: undefined,
    reviewed: false,
    needsReview: true,
  },
  "claim:pack:00264": {
    claimStatus: "SUPERSEDED",
    supersededBy: "claim:nasus-participated-fall",
    reviewed: false,
    needsReview: true,
  },
  "claim:pack:00289": {
    claimStatus: "SUPERSEDED",
    supersededBy: "claim:pack:00325",
    reviewed: false,
    needsReview: true,
  },
  "claim:pack:00265": {
    claimStatus: "SUPERSEDED",
    supersededBy: "claim:renekton-imprisoned-with-xerath",
    reviewed: false,
    needsReview: true,
  },
  "claim:pack:00290": {
    claimStatus: "SUPERSEDED",
    supersededBy: "claim:renekton-returned-shurima-risen",
    reviewed: false,
    needsReview: true,
  },
  "claim:pack:00262": {
    claimStatus: "SUPERSEDED",
    supersededBy: "claim:azir-participated-fall",
    reviewed: false,
    needsReview: true,
  },
  "claim:pack:00287": {
    claimStatus: "SUPERSEDED",
    supersededBy: "claim:azir-returned-ascended",
    reviewed: false,
    needsReview: true,
  },
  "claim:pack:00263": {
    claimStatus: "SUPERSEDED",
    supersededBy: "claim:xerath-betrayed-azir",
    reviewed: false,
    needsReview: true,
  },
  "claim:pack:00291": {
    claimStatus: "SUPERSEDED",
    supersededBy: "claim:xerath-freed-shurima-risen",
    reviewed: false,
    needsReview: true,
  },
  "claim:pack:00208": {
    claimStatus: "SUPERSEDED",
    supersededBy: "claim:kaisa-daughter-of-kassadin",
    reviewed: false,
    needsReview: true,
  },
  "claim:pack:00209": {
    claimStatus: "SUPERSEDED",
    supersededBy: "claim:belveth-confronted-kaisa",
    reviewed: false,
    needsReview: true,
  },

  /* Batch 1 Ionia — supersede duplicate pack seeds */
  "claim:pack:00003": {
    claimStatus: "SUPERSEDED",
    supersededBy: undefined,
    reviewed: false,
    needsReview: true,
  },
  "claim:pack:00175": {
    claimStatus: "SUPERSEDED",
    supersededBy: "claim:akali-kinkou-shen-history",
    reviewed: false,
    needsReview: true,
  },
  "claim:pack:00176": {
    claimStatus: "SUPERSEDED",
    supersededBy: "claim:akali-kinkou-shen-history",
    reviewed: false,
    needsReview: true,
  },
  "claim:pack:00048": {
    claimStatus: "SUPERSEDED",
    supersededBy: undefined,
    reviewed: false,
    needsReview: true,
  },
  "claim:pack:00197": {
    claimStatus: "SUPERSEDED",
    supersededBy: "claim:irelia-severed-swain-arm",
    reviewed: false,
    needsReview: true,
  },
  "claim:pack:00279": {
    claimStatus: "SUPERSEDED",
    supersededBy: "claim:irelia-noxian-invasion-loss",
    reviewed: false,
    needsReview: true,
  },
  "claim:pack:00302": {
    claimStatus: "SUPERSEDED",
    supersededBy: undefined,
    reviewed: false,
    needsReview: true,
  },
  "claim:pack:00121": {
    claimStatus: "SUPERSEDED",
    supersededBy: undefined,
    reviewed: false,
    needsReview: true,
  },
  "claim:pack:00201": {
    claimStatus: "SUPERSEDED",
    supersededBy: "claim:kennen-shen-akali-mentor",
    reviewed: false,
    needsReview: true,
  },
  "claim:pack:00216": {
    claimStatus: "SUPERSEDED",
    supersededBy: "claim:shen-zed-kinkou-history",
    reviewed: false,
    needsReview: true,
  },
  "claim:pack:00286": {
    claimStatus: "SUPERSEDED",
    supersededBy: undefined,
    reviewed: false,
    needsReview: true,
  },
  "claim:pack:00168": {
    claimStatus: "SUPERSEDED",
    supersededBy: undefined,
    reviewed: false,
    needsReview: true,
  },
  "claim:pack:00199": {
    claimStatus: "SUPERSEDED",
    supersededBy: "claim:zed-former-kinkou-student",
    reviewed: false,
    needsReview: true,
  },
  "claim:pack:00200": {
    claimStatus: "SUPERSEDED",
    supersededBy: "claim:kayn-zed-student",
    reviewed: false,
    needsReview: true,
  },
  "claim:pack:00285": {
    claimStatus: "SUPERSEDED",
    supersededBy: undefined,
    reviewed: false,
    needsReview: true,
  },
  "claim:pack:00161": {
    claimStatus: "SUPERSEDED",
    supersededBy: undefined,
    reviewed: false,
    needsReview: true,
  },
  "claim:pack:00190": {
    claimStatus: "SUPERSEDED",
    supersededBy: "claim:yone-yasuo-brother",
    reviewed: false,
    needsReview: true,
  },
  "claim:pack:00282": {
    claimStatus: "SUPERSEDED",
    supersededBy: undefined,
    reviewed: false,
    needsReview: true,
  },
  "claim:pack:00311": {
    claimStatus: "SUPERSEDED",
    supersededBy: "claim:yasuo-killed-yone-duel",
    reviewed: false,
    needsReview: true,
  },
  "claim:pack:00162": {
    claimStatus: "SUPERSEDED",
    supersededBy: undefined,
    reviewed: false,
    needsReview: true,
  },
  "claim:pack:00312": {
    claimStatus: "SUPERSEDED",
    supersededBy: "claim:yone-killed-by-yasuo",
    reviewed: false,
    needsReview: true,
  },
  "claim:pack:00064": {
    claimStatus: "SUPERSEDED",
    supersededBy: undefined,
    reviewed: false,
    needsReview: true,
  },
  "claim:pack:00206": {
    claimStatus: "SUPERSEDED",
    supersededBy: "claim:kayn-zed-student",
    reviewed: false,
    needsReview: true,
  },
  "claim:pack:00207": {
    claimStatus: "SUPERSEDED",
    supersededBy: "claim:kayn-wields-rhaast",
    reviewed: false,
    needsReview: true,
  },
  "claim:pack:00284": {
    claimStatus: "SUPERSEDED",
    supersededBy: undefined,
    reviewed: false,
    needsReview: true,
  },
  "claim:pack:00082": {
    claimStatus: "SUPERSEDED",
    supersededBy: undefined,
    reviewed: false,
    needsReview: true,
  },
  "claim:pack:00239": {
    claimStatus: "SUPERSEDED",
    supersededBy: "claim:master-yi-trained-wukong",
    reviewed: false,
    needsReview: true,
  },
  "claim:pack:00283": {
    claimStatus: "SUPERSEDED",
    supersededBy: "claim:master-yi-noxian-devastation",
    reviewed: false,
    needsReview: true,
  },
  "claim:pack:00046": {
    claimStatus: "SUPERSEDED",
    supersededBy: undefined,
    reviewed: false,
    needsReview: true,
  },
  "claim:pack:00065": {
    claimStatus: "SUPERSEDED",
    supersededBy: undefined,
    reviewed: false,
    needsReview: true,
  },
  "claim:pack:00054": {
    claimStatus: "SUPERSEDED",
    supersededBy: undefined,
    reviewed: false,
    needsReview: true,
  },
  "claim:pack:00202": {
    claimStatus: "SUPERSEDED",
    supersededBy: "claim:jhin-kinkou-capture",
    reviewed: false,
    needsReview: true,
  },
  "claim:pack:00203": {
    claimStatus: "SUPERSEDED",
    supersededBy: "claim:zed-kusho-jhin-capture",
    reviewed: false,
    needsReview: true,
  },
  "claim:pack:00059": {
    claimStatus: "SUPERSEDED",
    supersededBy: undefined,
    reviewed: false,
    needsReview: true,
  },
  "claim:pack:00280": {
    claimStatus: "SUPERSEDED",
    supersededBy: "claim:karma-noxian-invasion-violence",
    reviewed: false,
    needsReview: true,
  },
  "claim:pack:00158": {
    claimStatus: "SUPERSEDED",
    supersededBy: undefined,
    reviewed: false,
    needsReview: true,
  },
  "claim:pack:00191": {
    claimStatus: "SUPERSEDED",
    supersededBy: "claim:xayah-partner-rakan",
    reviewed: false,
    needsReview: true,
  },
  "claim:yunara-kinkou-affiliation": {
    claimStatus: "SUPERSEDED",
    supersededBy: "claim:yunara-kinkou-devotee",
    reviewed: false,
    needsReview: true,
  },
  "claim:yunara-aion-erna": {
    claimStatus: "SUPERSEDED",
    supersededBy: "claim:yunara-wields-aion-erna",
    reviewed: false,
    needsReview: true,
  },
};

export function applyClaimSupersession(claim: Claim): Claim {
  const patch = CLAIM_SUPERSESSION[claim.id];
  if (!patch) return claim;
  return { ...claim, ...patch };
}
