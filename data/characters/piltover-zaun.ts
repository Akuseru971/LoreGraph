import type { CharacterSeed } from "./build";

export const piltoverZaunSeeds: CharacterSeed[] = [
  {
    slug: "jinx",
    name: "Jinx",
    title: "The Loose Cannon",
    region: "zaun",
    factions: [],
    roles: ["Criminal", "Inventor", "Anarchist"],
    status: "Alive",
    species: "Human",
    aliases: ["The Loose Cannon", "Powder"],
    accentColor: "#8A5FC9",
    releaseYear: 2013,
    complexity: 3,
    featured: true,
    importance: 84,
    popularity: 96,
    verified: true,
    events: ["zaun-sump-disaster", "piltover-zaun-crisis"],
    tags: ["zaun", "piltover", "chaos", "sisters", "arcane", "explosives"],
    sources: ["source:arcane"],
    short:
      "Zaun's most committed agent of chaos, who blows up Piltover partly for fun and mostly to be looked at.",
    long: [
      "Jinx is a genuinely brilliant engineer who builds weapons that work, aims them at the wealthiest city on the continent, and treats the resulting manhunt as attention rather than danger. The Wardens cannot catch her because they keep trying to predict a plan.",
      "Underneath the performance is a specific history: a child in the undercity, an accident she caused, and a sister who left. Whether Vi left, was taken, or simply could not come back is exactly the question Jinx cannot hold steady, and the instability is the character.",
      "Her chaos is not random. It is aimed — at Piltover, at the Wardens, and above all at Vi, who is the only person whose attention she actually wants.",
    ],
    timeline: [
      {
        era: "Modern Zaun",
        title: "The undercity child",
        description:
          "A gifted, anxious kid in Zaun's sump, growing up with a sister who did the protecting.",
        with: ["vi"],
      },
      {
        era: "Modern Zaun",
        title: "The accident",
        description:
          "Something she built goes wrong, people die, and the family around her does not survive it intact.",
        event: "zaun-sump-disaster",
        with: ["vi", "ekko"],
      },
      {
        era: "Modern Zaun",
        title: "Becoming Jinx",
        description:
          "She rebuilds herself around the version of events she can live with, and starts arming it.",
      },
      {
        era: "Modern Piltover",
        title: "War with the city above",
        description:
          "She turns Piltover into a target and its Wardens into a recurring audience.",
        event: "piltover-zaun-crisis",
        with: ["caitlyn", "vi"],
      },
    ],
  },
  {
    slug: "vi",
    name: "Vi",
    title: "The Piltover Enforcer",
    region: "piltover",
    factions: ["wardens"],
    roles: ["Enforcer", "Former Criminal"],
    status: "Alive",
    species: "Human",
    aliases: ["The Piltover Enforcer", "Violet"],
    accentColor: "#C9A34E",
    releaseYear: 2012,
    complexity: 3,
    featured: true,
    importance: 76,
    popularity: 82,
    verified: true,
    events: ["zaun-sump-disaster", "piltover-zaun-crisis", "hextech-revolution"],
    tags: ["piltover", "zaun", "wardens", "sisters", "arcane", "hextech-gauntlets"],
    sources: ["source:arcane"],
    short:
      "A Zaunite brawler who took a job with Piltover's Wardens, and has to arrest the undercity she came from.",
    long: [
      "Vi grew up in Zaun doing what the undercity required, then took the one offer that let her hit people legally: a badge in Piltover. It is a genuine improvement and a permanent compromise, and she knows it.",
      "Her hextech gauntlets are Piltovan technology in Zaunite hands, which is a reasonable summary of her entire situation. Caitlyn is her partner, her opposite and the person who keeps her employable.",
      "Everything she does is shadowed by Jinx. Vi is the only character in the cluster who could plausibly end that conflict, and the only one who will not.",
    ],
    timeline: [
      {
        era: "Modern Zaun",
        title: "The older sister",
        description:
          "She raises her sister in the sump and does the fighting so the younger one does not have to.",
        with: ["jinx"],
      },
      {
        era: "Modern Zaun",
        title: "The accident",
        description:
          "An undercity disaster takes their family, and the sisters end up on different sides of it.",
        event: "zaun-sump-disaster",
        with: ["jinx", "ekko"],
      },
      {
        era: "Modern Piltover",
        title: "Taking the badge",
        description:
          "She joins Piltover's Wardens, gains hextech gauntlets, and starts policing her own city.",
        event: "hextech-revolution",
        with: ["caitlyn"],
      },
      {
        era: "Modern Piltover",
        title: "Hunting her sister",
        description:
          "Her job requires her to pursue the one person she will not finish pursuing.",
        event: "piltover-zaun-crisis",
        with: ["jinx", "caitlyn"],
      },
    ],
  },
  {
    slug: "viktor",
    name: "Viktor",
    title: "The Machine Herald",
    region: "zaun",
    factions: ["glorious-evolution"],
    roles: ["Scientist", "Herald", "Augmented"],
    status: "Alive",
    species: "Human (augmented)",
    aliases: ["The Machine Herald"],
    accentColor: "#5FA86B",
    releaseYear: 2011,
    complexity: 4,
    featured: true,
    importance: 80,
    popularity: 70,
    verified: true,
    events: ["hextech-revolution", "glorious-evolution-begins"],
    tags: ["zaun", "piltover", "transhumanism", "evolution", "hextech", "arcane"],
    sources: ["source:arcane"],
    short:
      "A Zaunite scientist who decided that human frailty is a solvable engineering problem, and started with himself.",
    long: [
      "Viktor began as an idealist. He wanted to end suffering, and he had the intellect to make real progress on it — his early work was collaborative, celebrated and aimed squarely at helping people.",
      "Then his own body failed him, his collaborators diverged, and he arrived at a harder conclusion: that the flesh is the bug, not the environment. The Glorious Evolution is his answer — the replacement of human weakness with something deliberate.",
      "What makes him disturbing rather than villainous is that he is consistent. He applies the doctrine to himself first, and he is genuinely offering it rather than imposing it. The horror is that a lot of Zaun would say yes.",
    ],
    timeline: [
      {
        era: "Modern Zaun",
        title: "The idealist",
        description:
          "A brilliant Zaunite scientist working to reduce suffering with hextech rather than profit from it.",
        event: "hextech-revolution",
      },
      {
        era: "Modern Zaun",
        title: "The body fails",
        description:
          "His own physical decline reframes the problem: the flesh is not the patient, it is the defect.",
      },
      {
        era: "Modern Zaun",
        title: "The Glorious Evolution",
        description:
          "He begins replacing himself, and offers the same transformation to anyone tired of being fragile.",
        event: "glorious-evolution-begins",
        with: ["singed"],
      },
    ],
  },
  {
    slug: "caitlyn",
    name: "Caitlyn",
    title: "The Sheriff of Piltover",
    region: "piltover",
    factions: ["wardens"],
    roles: ["Sheriff", "Investigator", "Noble"],
    status: "Alive",
    species: "Human",
    aliases: ["The Sheriff of Piltover"],
    accentColor: "#C9A34E",
    releaseYear: 2011,
    complexity: 2,
    importance: 66,
    popularity: 74,
    verified: true,
    events: ["hextech-revolution", "piltover-zaun-crisis"],
    tags: ["piltover", "wardens", "law", "investigation", "arcane"],
    sources: ["source:arcane"],
    short:
      "Piltover's sheriff: born privileged, professionally excellent, and slowly learning that her city's law stops at the bridge.",
    long: [
      "Caitlyn came from Piltovan wealth and chose police work, which her family found eccentric. She is a genuinely superb investigator — patient, precise, and the best marksman in the city.",
      "Her partnership with Vi works because they are opposites who respect each other: Caitlyn has the procedure, Vi has the undercity. The friction between them is essentially Piltover and Zaun conducted at conversational volume.",
      "Her arc bends around Jinx. Pursuing someone who cannot be out-planned forces Caitlyn to confront how much of her authority is actually just infrastructure.",
    ],
    timeline: [
      {
        era: "Modern Piltover",
        title: "Choosing the badge",
        description:
          "A daughter of Piltovan wealth takes up police work instead of the career she was offered.",
      },
      {
        era: "Modern Piltover",
        title: "Sheriff",
        description:
          "She rises to lead the Wardens, and partners with a Zaunite brawler nobody else wanted.",
        event: "hextech-revolution",
        with: ["vi"],
      },
      {
        era: "Modern Piltover",
        title: "The case she cannot close",
        description:
          "Jinx is uncatchable by procedure, and Caitlyn has to decide what she is willing to become to win.",
        event: "piltover-zaun-crisis",
        with: ["jinx", "vi"],
      },
    ],
  },
  {
    slug: "ekko",
    name: "Ekko",
    title: "The Boy Who Shattered Time",
    region: "zaun",
    factions: ["firelights"],
    roles: ["Inventor", "Firelight Leader"],
    status: "Alive",
    species: "Human",
    aliases: ["The Boy Who Shattered Time"],
    accentColor: "#5FA86B",
    releaseYear: 2015,
    complexity: 3,
    importance: 64,
    popularity: 68,
    verified: true,
    events: ["zaun-sump-disaster", "hextech-revolution", "piltover-zaun-crisis"],
    tags: ["zaun", "firelights", "time", "invention", "arcane", "community"],
    sources: ["source:convergence-game", "source:arcane"],
    short:
      "A Zaunite inventor who built a device that rewinds time, and uses it mostly to protect the few streets he cares about.",
    long: [
      "Ekko is the best natural engineer in the undercity and the least interested in leaving it. Where Piltover's inventors want patents and Viktor wants transcendence, Ekko wants his neighbourhood to still be there next week.",
      "His Z-Drive lets him rewind a few seconds of time, which sounds small until you consider what a few seconds are worth in a fight. It also means he has lived through versions of events nobody else remembers, including ones he would rather not discuss.",
      "He leads the Firelights, who strike at chemtech traffickers and vanish, and he is one of the few people in the cluster who has a working relationship with both sisters.",
    ],
    timeline: [
      {
        era: "Modern Zaun",
        title: "Growing up in the sump",
        description:
          "A brilliant undercity kid building things out of what Piltover throws away.",
        with: ["jinx", "vi"],
      },
      {
        era: "Modern Zaun",
        title: "The accident",
        description:
          "He is close enough to the disaster to lose friends to it and to never fully let it go.",
        event: "zaun-sump-disaster",
        with: ["jinx"],
      },
      {
        era: "Modern Zaun",
        title: "The Z-Drive",
        description:
          "He builds a device that rewinds seconds, and quietly accumulates memories of timelines nobody else has.",
      },
      {
        era: "Modern Zaun",
        title: "The Firelights",
        description:
          "He organises the undercity's runaways into a crew that hits traffickers and disappears.",
        event: "piltover-zaun-crisis",
      },
    ],
  },
  {
    slug: "camille",
    name: "Camille",
    title: "The Steel Shadow",
    region: "piltover",
    factions: ["clan-ferros"],
    roles: ["Intelligence Officer", "Augmented", "Clan Enforcer"],
    status: "Alive",
    species: "Human (augmented)",
    aliases: ["The Steel Shadow", "Camille Ferros"],
    accentColor: "#C9A34E",
    releaseYear: 2016,
    complexity: 3,
    importance: 66,
    popularity: 52,
    verified: true,
    events: ["hextech-revolution", "piltover-zaun-crisis"],
    tags: ["piltover", "clan-ferros", "augmentation", "intelligence", "order", "arcane"],
    short:
      "Clan Ferros's intelligence officer, who had herself surgically rebuilt for efficiency and considers that a reasonable trade.",
    long: [
      "Camille handles the problems Piltover's clans cannot be seen handling. She is composed, exacting and entirely willing to do the unpleasant thing early rather than the catastrophic thing later.",
      "Her hextech augmentations are extreme and elective. Where Viktor's transformation is ideological, Camille's is professional: she identified her body as a limiting factor and removed the limitation.",
      "She believes in order, not in Piltover's self-image, which makes her the most clear-eyed person in the city and the most uncomfortable to be around.",
    ],
    timeline: [
      {
        era: "Modern Piltover",
        title: "Born to Clan Ferros",
        description:
          "Raised inside a hextech dynasty and trained to protect its interests rather than its reputation.",
      },
      {
        era: "Modern Piltover",
        title: "Choosing the augments",
        description:
          "She elects to have her body largely replaced, judging flesh an inefficiency rather than an identity.",
        event: "hextech-revolution",
      },
      {
        era: "Modern Piltover",
        title: "The Steel Shadow",
        description:
          "She becomes the city's quiet corrective, enforcing an order Piltover prefers not to discuss.",
        event: "piltover-zaun-crisis",
      },
    ],
  },
  {
    slug: "singed",
    name: "Singed",
    title: "The Mad Chemist",
    region: "zaun",
    factions: ["chem-barons"],
    roles: ["Chemist", "Weapons Developer"],
    status: "Alive",
    species: "Human (chem-altered)",
    aliases: ["The Mad Chemist"],
    accentColor: "#5FA86B",
    releaseYear: 2009,
    complexity: 3,
    importance: 66,
    popularity: 46,
    verified: true,
    events: ["noxian-invasion-ionia", "the-place-of-blood", "glorious-evolution-begins", "zaun-sump-disaster"],
    tags: ["zaun", "chemtech", "war-crime", "experiments", "ionian-war", "arcane"],
    short:
      "The chemist who armed Noxus's invasion of Ionia and regards ethics as an unhelpfully small sample size.",
    long: [
      "Singed is not driven by cruelty, which makes him worse. He is driven by curiosity with the safety rails removed: he wants to know what happens, and consent is a variable he does not weight.",
      "He supplied Noxus during the Ionian invasion, and the chemical weapon deployed in that campaign is his signature contribution to Runeterra's history — the same one that turned Riven against her own empire.",
      "He operates in Zaun now, where chem-barons pay for his output and nobody audits his methods. Several of the region's other stories begin as footnotes in his notebooks.",
    ],
    timeline: [
      {
        era: "Modern Zaun",
        title: "The chemist",
        description:
          "He masters Zaunite chemtech and discovers that his only real constraint is other people's squeamishness.",
      },
      {
        era: "Ionian War",
        title: "Arming Noxus",
        description:
          "He supplies the invasion of Ionia, and his chemical weapon is used on Noxus's own troops.",
        event: "the-place-of-blood",
        with: ["riven", "swain"],
      },
      {
        era: "Modern Zaun",
        title: "Back in the sump",
        description:
          "He returns to Zaun, where chem-barons fund the experiments and nobody checks the results.",
        event: "glorious-evolution-begins",
        with: ["viktor"],
      },
    ],
  },
];
