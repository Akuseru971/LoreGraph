import type { EvidenceSeed } from "./phase1-seeds";

/** Batch 1 Ionia CORE evidence — excerpts verified against ionia-batch1 bio snapshots. */
export const batch1IoniaEvidenceSeeds: EvidenceSeed[] = [
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
  {
    claimId: "claim:ahri-spirit-identity-search",
    sourceId: "source:bio-ahri",
    normalizedFact: "Ahri works toward spirit identity rather than endless consumption.",
    shortExcerpt: "spirit identity",
  },

  // Akali
  {
    claimId: "claim:akali-former-kinkou-fist",
    sourceId: "source:bio-akali",
    normalizedFact: "Akali inherited the title Fist of Shadow from her mother in the Kinkou Order.",
    shortExcerpt: "inherited the title Fist of Shadow from her mother",
  },
  {
    claimId: "claim:akali-left-kinkou-independence",
    sourceId: "source:bio-akali",
    normalizedFact: "Akali left the Kinkou to act independently.",
    shortExcerpt: "left the Kinkou to act independently",
  },
  {
    claimId: "claim:akali-kinkou-shen-history",
    sourceId: "source:bio-akali",
    normalizedFact: "Akali's history with Shen and Kennen runs through the Kinkou.",
    shortExcerpt: "history with Shen and Kennen runs through the Kinkou",
  },
  {
    claimId: "claim:akali-shadow-assassin-method",
    sourceId: "source:bio-akali",
    normalizedFact: "Akali hunts Ionia's threats on her own authority.",
    shortExcerpt: "works alone, killing the people",
  },

  // Irelia
  {
    claimId: "claim:irelia-blade-dancer-resistance",
    sourceId: "source:bio-irelia",
    normalizedFact: "Irelia was a dancer from a family of Ionian bladesmiths.",
    shortExcerpt: "dancer from a family of Ionian bladesmiths",
  },
  {
    claimId: "claim:irelia-noxian-invasion-loss",
    sourceId: "source:bio-irelia",
    normalizedFact: "When Noxus invaded, Irelia's home was taken and her family scattered.",
    shortExcerpt: "When Noxus invaded",
  },
  {
    claimId: "claim:irelia-resistance-leader",
    sourceId: "source:bio-irelia",
    normalizedFact: "Irelia became a resistance leader and blade dancer during the invasion.",
    shortExcerpt: "became a resistance leader and blade dancer",
  },
  {
    claimId: "claim:irelia-severed-swain-arm",
    sourceId: "source:bio-irelia",
    normalizedFact: "Irelia severed Swain's arm during a confrontation in the Noxian invasion.",
    shortExcerpt: "severed Swain's arm",
  },

  // Jhin
  {
    claimId: "claim:jhin-khada-jhin-identity",
    sourceId: "source:bio-jhin",
    normalizedFact: "Khada Jhin was a stagehand before he was a killer.",
    shortExcerpt: "Khada Jhin was a stagehand",
  },
  {
    claimId: "claim:jhin-serial-killer-artist",
    sourceId: "source:bio-jhin",
    normalizedFact: "Jhin's crimes were designed, staged, and arranged as performance.",
    shortExcerpt: "crimes were designed: staged, timed, arranged",
  },
  {
    claimId: "claim:jhin-kinkou-capture",
    sourceId: "source:bio-jhin",
    normalizedFact: "Kusho, Shen, and Zed imprisoned Khada Jhin for years.",
    shortExcerpt: "imprisoned for years by Kusho, Shen, and Zed",
  },
  {
    claimId: "claim:jhin-released-weaponized",
    sourceId: "source:bio-jhin",
    normalizedFact: "Ionian factions released Jhin to be pointed at Noxus.",
    shortExcerpt: "released him to be pointed at Noxus",
  },

  // Karma
  {
    claimId: "claim:karma-spiritual-mantle-incarnation",
    sourceId: "source:bio-karma",
    normalizedFact: "Karma is the current incarnation of Ionia's spiritual mantle.",
    shortExcerpt: "current incarnation of a soul that has led Ionia",
  },
  {
    claimId: "claim:karma-darha-identity",
    sourceId: "source:bio-karma",
    normalizedFact: "Karma is known in this life as Darha.",
    shortExcerpt: "known in this life as Darha",
  },
  {
    claimId: "claim:karma-noxian-invasion-violence",
    sourceId: "source:bio-karma",
    normalizedFact: "Karma used her full power as a weapon against the Noxian invasion.",
    shortExcerpt: "used her full power as a weapon",
  },
  {
    claimId: "claim:karma-pacifism-challenged",
    sourceId: "source:bio-karma",
    normalizedFact: "Karma's pacifist tradition was challenged by the invasion.",
    shortExcerpt: "pacifist tradition was challenged by the invasion",
  },

  // Shen
  {
    claimId: "claim:shen-eye-of-twilight",
    sourceId: "source:bio-shen",
    normalizedFact: "Shen inherited the Eye of Twilight after his father Kusho was killed.",
    shortExcerpt: "inherited the Eye of Twilight",
  },
  {
    claimId: "claim:shen-kinkou-leader",
    sourceId: "source:bio-shen",
    normalizedFact: "Shen leads the Kinkou Order as Eye of Twilight.",
    shortExcerpt: "leads the Kinkou Order as Eye of Twilight",
  },
  {
    claimId: "claim:shen-son-of-kusho",
    sourceId: "source:bio-shen",
    normalizedFact: "Shen inherited the Eye of Twilight after his father Kusho was killed.",
    shortExcerpt: "his father Kusho was killed",
  },
  {
    claimId: "claim:shen-zed-kinkou-history",
    sourceId: "source:bio-shen",
    normalizedFact: "Shen's history with Zed runs through the Kinkou.",
    shortExcerpt: "history with Zed runs through the Kinkou",
  },
  {
    claimId: "claim:shen-spirit-balance-guardian",
    sourceId: "source:bio-shen",
    normalizedFact: "Shen maintains Ionia's spirit balance between material and spirit realms.",
    shortExcerpt: "spirit balance between the material and spirit realms",
  },

  // Zed
  {
    claimId: "claim:zed-order-of-shadow-leader",
    sourceId: "source:bio-zed",
    normalizedFact: "Zed leads the Order of Shadow.",
    shortExcerpt: "leads the Order of Shadow",
  },
  {
    claimId: "claim:zed-former-kinkou-student",
    sourceId: "source:bio-zed",
    normalizedFact: "Zed was once a Kinkou student alongside Shen.",
    shortExcerpt: "once a Kinkou student alongside Shen",
  },
  {
    claimId: "claim:zed-forbidden-shadow-magic",
    sourceId: "source:bio-zed",
    normalizedFact: "Zed unlocked forbidden shadow magic during the Noxian invasion.",
    shortExcerpt: "unlock forbidden shadow magic",
  },
  {
    claimId: "claim:zed-kusho-jhin-capture",
    sourceId: "source:bio-zed",
    normalizedFact: "Zed helped Kusho and Shen imprison Khada Jhin.",
    shortExcerpt: "helped Kusho and Shen capture Khada Jhin",
  },

  // Yasuo
  {
    claimId: "claim:yasuo-wind-prodigy",
    sourceId: "source:bio-yasuo",
    normalizedFact: "Yasuo was the only student of his generation to master the wind technique.",
    shortExcerpt: "only student of his generation to master the wind technique",
  },
  {
    claimId: "claim:yasuo-elder-souma-guard",
    sourceId: "source:bio-yasuo",
    normalizedFact: "Yasuo was assigned to guard Elder Souma during the Noxian invasion.",
    shortExcerpt: "assigned to guard Elder Souma",
  },
  {
    claimId: "claim:yasuo-blamed-elder-death",
    sourceId: "source:bio-yasuo",
    normalizedFact: "Yasuo was blamed for Souma's death and fled rather than accept a sentence.",
    shortExcerpt: "blamed for Souma's death",
  },
  {
    claimId: "claim:yasuo-killed-yone-duel",
    sourceId: "source:bio-yasuo",
    normalizedFact: "Yasuo killed Yone in a duel he could have avoided.",
    shortExcerpt: "Yasuo killed him",
  },

  // Yone
  {
    claimId: "claim:yone-yasuo-brother",
    sourceId: "source:bio-yone",
    normalizedFact: "Yone was Yasuo's older brother.",
    shortExcerpt: "Yasuo's older brother",
  },
  {
    claimId: "claim:yone-killed-by-yasuo",
    sourceId: "source:bio-yone",
    normalizedFact: "Yone was killed by Yasuo in mortal life during their duel.",
    shortExcerpt: "killed by Yasuo in mortal life",
  },
  {
    claimId: "claim:yone-azakana-mask",
    sourceId: "source:bio-yone",
    normalizedFact: "Yone killed an azakana and took its mask in the spirit realm.",
    shortExcerpt: "killed it and took its mask",
  },
  {
    claimId: "claim:yone-hunts-azakana",
    sourceId: "source:bio-yone",
    normalizedFact: "Yone hunts azakana between the material and spirit worlds.",
    shortExcerpt: "hunts azakana now",
  },

  // Yunara
  {
    claimId: "claim:yunara-kinkou-devotee",
    sourceId: "source:bio-yunara",
    normalizedFact: "Yunara is an Ionian devotee of the Kinkou and Ionia's balance.",
    shortExcerpt: "Ionian devotee whose faith in balance",
  },
  {
    claimId: "claim:yunara-centuries-spirit-realm",
    sourceId: "source:bio-yunara",
    normalizedFact: "Yunara spent centuries in the spirit realm training.",
    shortExcerpt: "spent centuries honing her skill",
  },
  {
    claimId: "claim:yunara-wields-aion-erna",
    sourceId: "source:bio-yunara",
    normalizedFact: "Yunara wields the Aion Er'na, a legendary Kinkou relic and artifact.",
    shortExcerpt: "Aion Er'na",
  },
  {
    claimId: "claim:yunara-returned-changed-ionia",
    sourceId: "source:bio-yunara",
    normalizedFact: "Yunara returned to a changed Ionia after centuries in the spirit realm.",
    shortExcerpt: "world she returns to is not the one she left",
  },

  // Xayah
  {
    claimId: "claim:xayah-vastayan-revolutionary",
    sourceId: "source:bio-xayah",
    normalizedFact: "Xayah is a vastayan revolutionary fighting for her people's survival.",
    shortExcerpt: "vastayan revolutionary who fights",
  },
  {
    claimId: "claim:xayah-partner-rakan",
    sourceId: "source:bio-xayah",
    normalizedFact: "Rakan is Xayah's partner in the vastayan resistance.",
    shortExcerpt: "Her partner Rakan",
  },
  {
    claimId: "claim:xayah-fights-vastayan-freedom",
    sourceId: "source:bio-xayah",
    normalizedFact: "Xayah fights for vastayan freedom and the survival of vastayan magic.",
    shortExcerpt: "fights for vastayan freedom",
  },
  {
    claimId: "claim:xayah-lhotlan-vastaya",
    sourceId: "source:bio-xayah",
    normalizedFact: "Xayah is Lhotlan vastaya.",
    shortExcerpt: "Lhotlan vastaya",
  },

  // Kayn
  {
    claimId: "claim:kayn-zed-student",
    sourceId: "source:bio-kayn",
    normalizedFact: "Zed took Kayn in and trained him in the Order of Shadow.",
    shortExcerpt: "before Zed took him in",
  },
  {
    claimId: "claim:kayn-order-of-shadow",
    sourceId: "source:bio-kayn",
    normalizedFact: "Kayn is a member of the Order of Shadow.",
    shortExcerpt: "member of the Order of Shadow",
  },
  {
    claimId: "claim:kayn-wields-rhaast",
    sourceId: "source:bio-kayn",
    normalizedFact: "Kayn wields the sentient darkin scythe Rhaast.",
    shortExcerpt: "wields the sentient darkin weapon Rhaast",
  },
  {
    claimId: "claim:kayn-rhaast-control-struggle",
    sourceId: "source:bio-kayn",
    normalizedFact: "Kayn battles Rhaast for control of his own body.",
    shortExcerpt: "struggle between Kayn and Rhaast",
  },

  // Master Yi
  {
    claimId: "claim:master-yi-wuju-master",
    sourceId: "source:bio-master-yi",
    normalizedFact: "Master Yi is the last master of Wuju.",
    shortExcerpt: "last master of Wuju",
  },
  {
    claimId: "claim:master-yi-noxian-devastation",
    sourceId: "source:bio-master-yi",
    normalizedFact: "The Noxian attack devastated Yi's people and nearly destroyed the Wuju order.",
    shortExcerpt: "Noxian attack devastated his people",
  },
  {
    claimId: "claim:master-yi-wuju-survivor",
    sourceId: "source:bio-master-yi",
    normalizedFact: "Yi survives as one of the last guardians of the Wuju tradition.",
    shortExcerpt: "survivors preserving what remains of the tradition",
  },
  {
    claimId: "claim:master-yi-trained-wukong",
    sourceId: "source:bio-master-yi",
    normalizedFact: "Master Yi trained Wukong in the Wuju arts.",
    shortExcerpt: "trained Wukong in the Wuju arts",
  },

  // Hwei
  {
    claimId: "claim:hwei-ionian-painter-mage",
    sourceId: "source:bio-hwei",
    normalizedFact: "Hwei is an Ionian painter and mage.",
    shortExcerpt: "Ionian painter and mage",
  },
  {
    claimId: "claim:hwei-art-emotional-magic",
    sourceId: "source:bio-hwei",
    normalizedFact: "Hwei's art serves as emotional and magical expression.",
    shortExcerpt: "emotional and magical expression",
  },
  {
    claimId: "claim:hwei-jhin-attack-trauma",
    sourceId: "source:bio-hwei",
    normalizedFact: "Jhin's attack is central to Hwei's trauma.",
    shortExcerpt: "Jhin's attack and his master's death",
  },
  {
    claimId: "claim:hwei-master-death",
    sourceId: "source:bio-hwei",
    normalizedFact: "Hwei's master's death in Jhin's attack haunts his compositions.",
    shortExcerpt: "his master's death",
  },

  // Kennen
  {
    claimId: "claim:kennen-yordle-kinkou",
    sourceId: "source:bio-kennen",
    normalizedFact: "Kennen is the only yordle member of the Kinkou Order.",
    shortExcerpt: "only yordle member of the Kinkou",
  },
  {
    claimId: "claim:kennen-heart-of-tempest",
    sourceId: "source:bio-kennen",
    normalizedFact: "Kennen is known as the Heart of the Tempest.",
    shortExcerpt: "Heart of the Tempest",
  },
  {
    claimId: "claim:kennen-kinkou-enforcer",
    sourceId: "source:bio-kennen",
    normalizedFact: "Kennen is a lightning-quick enforcer of Ionian balance.",
    shortExcerpt: "lightning-quick enforcer of Ionian balance",
  },
  {
    claimId: "claim:kennen-shen-akali-mentor",
    sourceId: "source:bio-kennen",
    normalizedFact: "Kennen works alongside Shen and trained Akali in the Kinkou.",
    shortExcerpt: "works alongside Shen as Kinkou leader and trained Akali",
  },
];
