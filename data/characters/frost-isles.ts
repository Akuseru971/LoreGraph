import type { CharacterSeed } from "./build";

export const frostIslesSeeds: CharacterSeed[] = [
  {
    slug: "viego",
    name: "Viego",
    title: "The Ruined King",
    region: "shadow-isles",
    factions: ["harrowing"],
    roles: ["King", "Undead", "Possessor"],
    status: "Undead",
    species: "Revenant",
    aliases: ["The Ruined King", "Viego Santiarul Molach vol Kalah Heigaari"],
    accentColor: "#4FA88C",
    releaseYear: 2021,
    complexity: 4,
    featured: true,
    importance: 90,
    popularity: 68,
    verified: true,
    events: ["blessed-isles", "the-ruination", "viego-awakening"],
    tags: ["shadow-isles", "ruination", "black-mist", "possession", "grief", "isolde"],
    sources: ["source:ruination-novel", "source:ruined-king-game", "source:still-here"],
    short:
      "A king who refused his wife's death, broke the world's greatest archive of magic trying to reverse it, and turned an entire kingdom into an open wound.",
    long: [
      "Viego was the last king of Camavor, a young ruler with an empire's worth of power and no instruction in restraint. When his wife Isolde died, he did what he had always done: he demanded a solution and refused to hear that there wasn't one.",
      "The Blessed Isles held the Waters of Life, guarded by the Masks and studied by keepers who understood exactly why the thing he wanted was forbidden. Viego took it anyway. The magic did not resurrect Isolde; it inverted, drowned the Isles in Black Mist, and made death itself unreliable across the region.",
      "He is not a schemer. He is grief with a crown and an army, and his single unchanging objective is to find something — a body, a soul, a fragment — that can hold Isolde again. Everyone he possesses along the way is a container he is testing and discarding.",
      "Because he can seize bodies, Viego is structurally the most dangerous node in the graph: any character can suddenly become a route through him.",
    ],
    timeline: [
      {
        era: "The Blessed Isles",
        title: "The last king of Camavor",
        description:
          "A young monarch with total authority and no experience of being told no.",
      },
      {
        era: "The Blessed Isles",
        title: "Isolde",
        description:
          "He marries a woman his court considers beneath him, and builds his entire interior life around her.",
      },
      {
        era: "The Ruination",
        title: "Her death",
        description:
          "Isolde dies, and Viego treats it as a problem to be overruled rather than a fact to be accepted.",
        event: "the-ruination",
      },
      {
        era: "The Ruination",
        title: "The Ruination",
        description:
          "He forces the Waters of Life to undo her death. The magic inverts and the Isles drown in Black Mist.",
        event: "the-ruination",
        with: ["thresh", "kalista"],
      },
      {
        era: "The Ruination",
        title: "Centuries in the Mist",
        description:
          "He persists as a revenant, neither ruling nor resting, waiting for a door out of the Isles.",
      },
      {
        era: "Modern Runeterra",
        title: "The Ruined King walks",
        description:
          "He gets loose into the living world and starts trying bodies on, looking for one that can hold her.",
        event: "viego-awakening",
        with: ["senna", "thresh"],
      },
    ],
  },
  {
    slug: "thresh",
    name: "Thresh",
    title: "The Chain Warden",
    region: "shadow-isles",
    factions: ["harrowing"],
    roles: ["Warden", "Soul Collector", "Torturer"],
    status: "Undead",
    species: "Specter",
    aliases: ["The Chain Warden"],
    accentColor: "#4FA88C",
    releaseYear: 2013,
    complexity: 4,
    featured: true,
    importance: 84,
    popularity: 72,
    verified: true,
    events: ["blessed-isles", "the-ruination", "thresh-ascent", "senna-freed"],
    tags: ["shadow-isles", "ruination", "souls", "lantern", "cruelty", "wardens"],
    sources: ["source:ruination-novel"],
    short:
      "A warden of the Blessed Isles who was already cruel before undeath, and used the Ruination as a promotion.",
    long: [
      "Thresh was a keeper on the Blessed Isles — trusted with the archives, the relics and the discipline of the order. He was also, long before any Mist arrived, someone who enjoyed the part of the job that involved other people's suffering.",
      "When Viego shattered the Isles, most of the population became unwilling ghosts. Thresh became something closer to an artisan. He collects souls deliberately, keeps them in his lantern, and takes particular pleasure in breaking people who believe they cannot be broken.",
      "He is the Shadow Isles' most personal antagonist. Viego wants one thing and will step over anyone to reach it; Thresh wants you specifically, and he has time.",
      "His imprisonment of Senna, and her eventual escape from his lantern, is the clearest example of what he does and why it is so hard to undo.",
    ],
    timeline: [
      {
        era: "The Blessed Isles",
        title: "A warden of the archives",
        description:
          "Trusted with the Isles' relics and their prisoners, and quietly fond of the latter duty.",
        event: "blessed-isles",
      },
      {
        era: "The Ruination",
        title: "The Mist arrives",
        description:
          "Viego's catastrophe unmakes the Isles. Thresh does not resist it; he takes to it.",
        event: "the-ruination",
        with: ["viego"],
      },
      {
        era: "The Ruination",
        title: "The Chain Warden",
        description:
          "He begins collecting souls into his lantern, choosing targets for the quality of their despair.",
        event: "thresh-ascent",
      },
      {
        era: "Modern Runeterra",
        title: "Senna in the lantern",
        description:
          "He traps a Sentinel and holds her for years, specifically to work on the man hunting him.",
        event: "senna-freed",
        with: ["senna"],
      },
    ],
  },
  {
    slug: "senna",
    name: "Senna",
    title: "The Redeemer",
    region: "shadow-isles",
    factions: ["sentinels-of-light"],
    roles: ["Sentinel", "Marksman", "Survivor"],
    status: "Alive",
    species: "Human (Mist-touched)",
    aliases: ["The Redeemer"],
    accentColor: "#4FA88C",
    releaseYear: 2019,
    complexity: 3,
    importance: 72,
    popularity: 60,
    verified: true,
    events: ["the-ruination", "senna-freed", "viego-awakening", "akshan-sentinel"],
    tags: ["shadow-isles", "sentinels", "black-mist", "survival", "lantern", "redemption"],
    sources: ["source:ruined-king-game"],
    short:
      "A Sentinel who spent years inside Thresh's lantern and came back carrying the Mist she was fighting.",
    long: [
      "Senna was born into a family marked by the Black Mist and grew up as a Sentinel of Light, hunting the thing that had already claimed her relatives. Thresh took her personally, as he does, and held her soul in his lantern for years while her husband Lucian hunted him.",
      "She got out. But she did not come back clean: the Mist is inside her now, part of her power and part of her body, and she has to use the enemy's substance to fight it.",
      "That gives her the most interesting position in the Ruination cluster — the only major figure who has been on both sides of the lantern and can describe it.",
    ],
    timeline: [
      {
        era: "Modern Runeterra",
        title: "Born marked",
        description:
          "Her family is touched by the Black Mist, and she is raised to fight it as a Sentinel of Light.",
      },
      {
        era: "Modern Runeterra",
        title: "Taken by the Chain Warden",
        description: "Thresh traps her soul in his lantern, largely to torment the man who loves her.",
        event: "senna-freed",
        with: ["thresh"],
      },
      {
        era: "Modern Runeterra",
        title: "Pulled back out",
        description:
          "She returns to a body that now carries the Mist, using its power against its source.",
        event: "senna-freed",
      },
      {
        era: "Modern Runeterra",
        title: "Standing against the Ruined King",
        description:
          "When Viego breaks loose, she is one of the few who understands exactly what is walking.",
        event: "viego-awakening",
        with: ["viego", "akshan"],
      },
    ],
  },
  {
    slug: "kalista",
    name: "Kalista",
    title: "The Spear of Vengeance",
    region: "shadow-isles",
    factions: ["harrowing"],
    roles: ["Spectral General", "Oathkeeper"],
    status: "Undead",
    species: "Revenant",
    aliases: ["The Spear of Vengeance"],
    accentColor: "#4FA88C",
    releaseYear: 2014,
    complexity: 3,
    importance: 70,
    popularity: 42,
    verified: true,
    events: ["kalista-betrayal", "blessed-isles", "the-ruination", "iron-revenant-empire"],
    tags: ["shadow-isles", "vengeance", "oath", "betrayal", "camavor", "ruination"],
    short:
      "A loyal general murdered for telling her king an unwelcome truth, who returned as an oath that only answers to betrayal.",
    long: [
      "Kalista was Camavor's finest general and its most uncomfortable advisor. When she was sent to find a cure for the dying queen, she came back with the truth rather than the answer, and was killed for the difference.",
      "She returned from the Isles as a revenant bound to a single function: she answers those who swear an oath of vengeance against a betrayer, and she collects. It is not justice and she does not pretend it is.",
      "She was present for the Ruination, and her connection to Viego is the oldest grievance in the region — she warned him, and he killed the messenger before the catastrophe even started.",
    ],
    timeline: [
      {
        era: "Rune Wars",
        title: "Camavor's general",
        description: "The most capable soldier in the kingdom, and the least willing to flatter it.",
      },
      {
        era: "Rune Wars",
        title: "Killed for the truth",
        description:
          "Sent to find a cure and returning with an honest answer, she is murdered for refusing to lie.",
        event: "kalista-betrayal",
      },
      {
        era: "The Ruination",
        title: "The Spear of Vengeance",
        description:
          "She returns from the Isles as an oath-bound revenant who answers only calls for retribution.",
        event: "the-ruination",
        with: ["viego", "thresh"],
      },
    ],
  },
  {
    slug: "mordekaiser",
    name: "Mordekaiser",
    title: "The Iron Revenant",
    region: "shadow-isles",
    factions: ["iron-order"],
    roles: ["Warlord", "Necromancer", "Emperor"],
    status: "Undead",
    species: "Revenant",
    aliases: ["The Iron Revenant", "The Master of Metal"],
    accentColor: "#6A7A6A",
    releaseYear: 2010,
    complexity: 4,
    featured: true,
    importance: 84,
    popularity: 58,
    verified: true,
    events: ["rune-wars", "iron-revenant-empire", "mordekaiser-return"],
    tags: ["shadow-isles", "necromancy", "empire", "death-realm", "rune-wars", "tyranny"],
    short:
      "A warlord who conquered the living, was killed, and simply refused the result — building a second empire out of the souls he took.",
    long: [
      "Mordekaiser existed in the era of the Rune Wars, and even in that company he stood out for scale of ambition. He conquered, he ruled, and he was eventually killed by people who had every reason to think that would be the end of it.",
      "It was not. He came back, and he came back with an understanding of death as territory rather than a boundary. His second empire ran on conscripted souls: kill his enemies, bind them, and put them back to work in his own ranks.",
      "He was eventually stopped again — it took a coalition — and consigned to a realm of his own making. His modern return is the world's oldest tyranny showing up with its notes intact.",
      "In the graph he links the Rune Wars, the Shadow Isles and several immortals who would prefer not to be listed next to him.",
    ],
    timeline: [
      {
        era: "Rune Wars",
        title: "The warlord",
        description:
          "He conquers the living world during the Rune Wars with unusual thoroughness even for the era.",
        event: "rune-wars",
      },
      {
        era: "Rune Wars",
        title: "Killed, and unconvinced",
        description:
          "His enemies kill him. He returns with a working knowledge of what lies on the other side.",
        event: "iron-revenant-empire",
      },
      {
        era: "Rune Wars",
        title: "The empire of the dead",
        description:
          "He builds a second empire staffed by the souls of everyone who resisted the first one.",
        event: "iron-revenant-empire",
        with: ["kalista"],
      },
      {
        era: "Modern Runeterra",
        title: "The Iron Revenant returns",
        description:
          "He claws back into the living world and restarts the project from the beginning.",
        event: "mordekaiser-return",
        with: ["kayle"],
      },
    ],
  },
  {
    slug: "ryze",
    name: "Ryze",
    title: "The Rune Mage",
    region: "runeterra",
    factions: [],
    roles: ["Archmage", "Wanderer", "Guardian"],
    status: "Alive",
    species: "Human (rune-bound)",
    aliases: ["The Rune Mage", "The Rune Prison"],
    accentColor: "#5F8FC7",
    releaseYear: 2009,
    complexity: 4,
    importance: 76,
    popularity: 44,
    verified: true,
    events: ["rune-wars", "blessed-isles", "iron-revenant-empire"],
    tags: ["runeterra", "world-runes", "rune-wars", "immortal", "burden", "archmage"],
    sources: ["source:ryze-call-of-power"],
    short:
      "The archmage carrying the world's most dangerous objects, on the theory that nobody else should be allowed to.",
    long: [
      "Ryze has spent an unreasonable number of lifetimes collecting World Runes — objects capable of unmaking geography — specifically so that no nation, cult or immortal can assemble them. It is a job with no completion condition and no successor.",
      "He was there for the consequences of the Rune Wars, and he has watched every generation since rediscover the same temptation. His method is to keep moving, keep the Runes separated, and refuse to explain himself to anyone who might be tempted.",
      "That makes him the most widely-travelled node in the graph and one of the loneliest: he connects to almost every era and belongs to none of them.",
    ],
    timeline: [
      {
        era: "Rune Wars",
        title: "The wrong apprenticeship",
        description:
          "Trained by an archmage who understood the World Runes, he inherits the burden of them.",
        event: "rune-wars",
      },
      {
        era: "Rune Wars",
        title: "Watching the world break",
        description:
          "The Rune Wars unmake whole regions, and he concludes that the Runes must never be gathered again.",
        event: "rune-wars",
        with: ["mordekaiser"],
      },
      {
        era: "Modern Runeterra",
        title: "A job with no end",
        description:
          "He keeps collecting, keeps moving, and keeps refusing to explain why to anyone who asks.",
      },
    ],
  },
  {
    slug: "ashe",
    name: "Ashe",
    title: "The Frost Archer",
    region: "freljord",
    factions: ["avarosan"],
    roles: ["Warmother", "Archer", "Diplomat"],
    status: "Alive",
    species: "Human",
    aliases: ["The Frost Archer", "Warmother of the Avarosan"],
    accentColor: "#7FA8C7",
    releaseYear: 2009,
    complexity: 3,
    importance: 72,
    popularity: 64,
    verified: true,
    events: ["frostguard-sealing"],
    tags: ["freljord", "avarosan", "unification", "diplomacy", "true-ice", "leadership"],
    sources: ["source:ashe-warmother", "source:warriors-2020"],
    short:
      "The Freljord's most patient warmother, trying to unite the tribes by treaty in a place where that has never once worked.",
    long: [
      "Ashe leads the Avarosan, and her strategy is almost heretical by Freljordian standards: she would rather absorb a rival tribe than destroy it. She carries a bow of True Ice, and the legend attached to it gives her a legitimacy her diplomacy alone would not.",
      "The other claimants read her restraint as weakness, which is useful to her. The one who does not is Lissandra, who has been curating the Freljord's history for far longer than Ashe has been alive and has specific reasons to want the tribes divided.",
      "Ashe's arc is about whether a nation can be built on agreement in a region whose entire mythology is about conquest.",
    ],
    timeline: [
      {
        era: "Ancient Freljord",
        title: "The legend she inherits",
        description:
          "The Freljord's oldest story concerns three sisters, and Ashe's claim depends on which version is told.",
        event: "frostguard-sealing",
        with: ["lissandra"],
      },
      {
        era: "Modern Runeterra",
        title: "Warmother of the Avarosan",
        description:
          "She takes leadership of her tribe young, carrying a bow of True Ice and an unfashionable idea about peace.",
      },
      {
        era: "Modern Runeterra",
        title: "Unification by treaty",
        description:
          "She grows the Avarosan by absorbing rivals rather than erasing them, and makes enemies of everyone who prefers the old method.",
        with: ["lissandra"],
      },
    ],
  },
  {
    slug: "lissandra",
    name: "Lissandra",
    title: "The Ice Witch",
    region: "freljord",
    factions: ["frostguard"],
    roles: ["Ice Witch", "Frostguard Leader", "Archivist of Lies"],
    status: "Alive",
    species: "Human (Watcher-touched)",
    aliases: ["The Ice Witch", "Lissandra the Ice Witch"],
    accentColor: "#5F8FC7",
    releaseYear: 2013,
    complexity: 4,
    importance: 74,
    popularity: 40,
    verified: true,
    events: ["frostguard-sealing"],
    tags: ["freljord", "frostguard", "watchers", "deception", "history", "true-ice"],
    short:
      "The Freljord's oldest living liar: keeper of what was sealed beneath the ice, and author of the story everyone believes about it.",
    long: [
      "Lissandra leads the Frostguard, who present themselves as the Freljord's neutral keepers of tradition. In practice they are an intelligence apparatus and she is the region's editor — deciding which parts of its history survive to be retold.",
      "What she is concealing is beneath the ice, and it is older than the tribes. Her bargain with it bought her an extraordinary lifespan and cost her the ability to ever fully stop paying.",
      "She is the Freljord's most important node because almost every northern conflict is downstream of a story she curated.",
    ],
    timeline: [
      {
        era: "Ancient Freljord",
        title: "One of three",
        description:
          "The Freljord's founding legend involves three sisters. Lissandra is the one still alive to describe it.",
        event: "frostguard-sealing",
        with: ["ashe"],
      },
      {
        era: "Ancient Freljord",
        title: "The sealing",
        description:
          "Something ancient is buried under the ice, and she makes an arrangement with it that never ends.",
        event: "frostguard-sealing",
      },
      {
        era: "Modern Runeterra",
        title: "Editing the north",
        description:
          "Through the Frostguard she manages which version of Freljordian history is allowed to circulate.",
        with: ["ashe"],
      },
    ],
  },
  {
    slug: "kindred",
    name: "Kindred",
    title: "The Eternal Hunters",
    region: "runeterra",
    factions: [],
    roles: ["Death", "Hunter", "Spirit"],
    status: "Unknown",
    species: "Spirit",
    aliases: ["Lamb", "Wolf", "The Eternal Hunters"],
    accentColor: "#8FA8C7",
    releaseYear: 2015,
    complexity: 3,
    importance: 62,
    popularity: 54,
    verified: true,
    tags: ["runeterra", "death", "spirit", "duality", "inevitability"],
    short:
      "Death, arriving as two halves of one idea: the one who offers you a graceful end, and the one who takes it if you refuse.",
    long: [
      "Kindred is not a person and not quite a god. Lamb offers the arrow — a quiet, accepted death. Wolf offers the chase. Every mortal gets both options and the choice is essentially about dignity, not survival.",
      "They are relevant to LoreGraph's structure because they are the one entity the undead of the Shadow Isles have genuinely escaped. The Black Mist is offensive to Kindred in a way nothing else is: it is a region where their function has stopped working.",
      "Everything about them is deliberately ambiguous, and the data reflects that rather than resolving it.",
    ],
    timeline: [
      {
        era: "Before Reckoning",
        title: "Two halves of one function",
        description:
          "Lamb and Wolf appear wherever a mortal is about to die, offering the same choice in two forms.",
      },
      {
        era: "Modern Runeterra",
        title: "Refused",
        description:
          "In the Shadow Isles their offer is meaningless, because nothing there is permitted to finish dying.",
        with: ["viego", "thresh"],
      },
    ],
  },
];
