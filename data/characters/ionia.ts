import type { CharacterSeed } from "./build";

export const ioniaSeeds: CharacterSeed[] = [
  {
    slug: "yasuo",
    name: "Yasuo",
    title: "The Unforgiven",
    region: "ionia",
    factions: [],
    roles: ["Swordsman", "Wanderer", "Exile"],
    status: "Alive",
    species: "Human",
    aliases: ["The Unforgiven"],
    accentColor: "#8FA8C7",
    releaseYear: 2013,
    complexity: 4,
    featured: true,
    importance: 84,
    popularity: 90,
    verified: true,
    events: [
      "noxian-invasion-ionia",
      "elder-killing",
      "brothers-duel",
      "the-place-of-blood",
    ],
    tags: ["ionia", "wind-technique", "exile", "brothers", "noxian-war", "guilt"],
    sources: ["source:a-new-dawn"],
    short:
      "An Ionian swordsman convicted of a murder he did not commit, who then committed one that mattered more.",
    long: [
      "Yasuo was a prodigy — the only student of his generation to master the wind technique — and insufferable about it. When Noxus invaded, he was assigned to guard an Ionian elder. He left his post to fight in the battle he could hear happening, and came back to find the elder dead.",
      "The killing blow looked like wind magic, and he was the only wind practitioner present. He refused to explain himself, which he mistook for dignity, and fled rather than accept a sentence. Ionia sent someone to bring him in. That someone was his brother Yone.",
      "Yasuo killed him. Not in malice, not in self-defence exactly — in a duel he could have avoided if he had been willing to be humble for one conversation. Everything he has done since is an attempt to pay for those two minutes.",
      "Years later he learned who really killed the elder. It did not help as much as he expected, because the crime he actually needs forgiveness for is the one he definitely did.",
    ],
    timeline: [
      {
        era: "Ionian War",
        title: "The prodigy",
        description:
          "The only student of his generation to master the wind technique, and entirely unbearable about it.",
        with: ["yone"],
      },
      {
        era: "Ionian War",
        title: "Abandoning his post",
        description:
          "Assigned to guard an elder during the Noxian invasion, he leaves to join the fighting instead.",
        event: "noxian-invasion-ionia",
      },
      {
        era: "Ionian War",
        title: "Accused",
        description:
          "The elder is dead by a wind technique. Yasuo is the obvious suspect and refuses to defend himself.",
        event: "elder-killing",
        with: ["yone"],
      },
      {
        era: "Ionian War",
        title: "The duel with his brother",
        description:
          "Yone is sent to execute him. Yasuo wins, which is the worst possible outcome for both of them.",
        event: "brothers-duel",
        with: ["yone"],
      },
      {
        era: "Modern Ionia",
        title: "The wanderer",
        description:
          "He walks Ionia hunting the truth, drinking through it, and being refused shelter in his own country.",
      },
      {
        era: "Modern Ionia",
        title: "The truth, too late",
        description:
          "He finds out who actually killed the elder, and discovers that exoneration and forgiveness are different things.",
        with: ["riven"],
      },
    ],
  },
  {
    slug: "yone",
    name: "Yone",
    title: "The Unforgotten",
    region: "ionia",
    factions: [],
    roles: ["Swordsman", "Hunter", "Spirit"],
    status: "Undead",
    species: "Human (spirit-bound)",
    aliases: ["The Unforgotten"],
    accentColor: "#7FA8C7",
    releaseYear: 2020,
    complexity: 4,
    featured: true,
    importance: 76,
    popularity: 80,
    verified: true,
    events: ["elder-killing", "brothers-duel", "noxian-invasion-ionia"],
    tags: ["ionia", "brothers", "spirit-realm", "azakana", "duty", "undeath"],
    short:
      "The brother who was sent to execute Yasuo, lost, and came back from the spirit realm wearing the mask of what killed him.",
    long: [
      "Yone was the disciplined one. Where Yasuo had talent, Yone had duty — and when their village needed someone to bring in a suspected murderer, duty meant hunting his own brother.",
      "He lost the duel. He should have stayed dead. Instead he woke in the spirit realm and was attacked there by an azakana, a demon that feeds on human weakness. He killed it and took its mask, and the mask did not entirely come off.",
      "What returned is not quite alive. Yone hunts azakana now, moving between the material and spirit worlds, and he understands his own condition well enough to know that the thing he is becoming is the thing he kills.",
      "He has not forgiven Yasuo. He has, more unsettlingly, stopped needing to.",
    ],
    timeline: [
      {
        era: "Ionian War",
        title: "The dutiful brother",
        description:
          "Disciplined where Yasuo was brilliant, and the one their village actually relied on.",
        with: ["yasuo"],
      },
      {
        era: "Ionian War",
        title: "Sent to bring him in",
        description:
          "Tasked with executing his brother for the elder's murder, he accepts the assignment.",
        event: "elder-killing",
        with: ["yasuo"],
      },
      {
        era: "Ionian War",
        title: "Killed by his brother",
        description: "The duel goes the wrong way and Yone dies on Yasuo's blade.",
        event: "brothers-duel",
        with: ["yasuo"],
      },
      {
        era: "Modern Ionia",
        title: "The mask",
        description:
          "He wakes in the spirit realm, kills the azakana that comes for him, and takes its face.",
      },
      {
        era: "Modern Ionia",
        title: "The hunt",
        description:
          "He walks between worlds hunting demons, aware that he is becoming one of them.",
      },
    ],
  },
  {
    slug: "ahri",
    name: "Ahri",
    title: "The Nine-Tailed Fox",
    region: "ionia",
    factions: [],
    roles: ["Vastaya", "Mage", "Seeker"],
    status: "Alive",
    species: "Vastaya",
    aliases: ["The Nine-Tailed Fox"],
    accentColor: "#C77FA8",
    releaseYear: 2011,
    complexity: 3,
    importance: 70,
    popularity: 92,
    verified: true,
    events: ["vastaya-rebellion", "noxian-invasion-ionia"],
    tags: ["ionia", "vastaya", "memory", "identity", "spirit-magic"],
    short:
      "A vastayan mage who consumes memories to find her own, and keeps learning things she would rather not have.",
    long: [
      "Ahri can drain the life essence of others, and with it their memories. She began doing it out of instinct and continued out of need: she has no reliable account of where she came from, and other people's recollections are the only archive she can access.",
      "It works, in the sense that she learns things. It fails, in the sense that she also absorbs their grief, their cruelty and their last moments, and she cannot unread any of it. Her arc is the slow decision to stop taking.",
      "She sits in the graph as one of Ionia's most connected figures — not through allegiance, which she avoids, but through everyone whose memories she now carries.",
    ],
    timeline: [
      {
        era: "Modern Ionia",
        title: "No origin",
        description:
          "She wakes into the world without a past, surrounded by a spirit magic she did not ask for.",
      },
      {
        era: "Modern Ionia",
        title: "Taking memories",
        description:
          "She drains essence to learn who she is, and inherits everything else those people were carrying.",
      },
      {
        era: "Modern Ionia",
        title: "Choosing restraint",
        description:
          "She begins refusing the easy answer, and looks for her origins among the vastaya instead.",
        event: "vastaya-rebellion",
        with: ["xayah"],
      },
    ],
  },
  {
    slug: "irelia",
    name: "Irelia",
    title: "The Blade Dancer",
    region: "ionia",
    factions: ["navori-brotherhood"],
    roles: ["Dancer", "Commander", "Resistance Leader"],
    status: "Alive",
    species: "Human",
    aliases: ["The Blade Dancer", "Will of the Blades"],
    accentColor: "#C77FA8",
    releaseYear: 2010,
    complexity: 3,
    importance: 74,
    popularity: 60,
    verified: true,
    events: ["noxian-invasion-ionia"],
    tags: ["ionia", "resistance", "noxian-war", "dance", "leadership"],
    short:
      "A dancer who became a war leader at an age nobody should have to, using her family's bladework as a weapon.",
    long: [
      "Irelia was a dancer from a family of Ionian bladesmiths. When Noxus invaded, the adults who should have organised the resistance were dead or occupied, and she stepped into the gap because the gap was there.",
      "Her fighting style is literally her art: she moves blades through the air the way she was taught to move her body, and it is beautiful in a way that Noxian officers found genuinely unnerving.",
      "The war ended. Irelia did not stop being a commander, and Ionia has not fully decided what to do with a generation that learned leadership from an occupation.",
    ],
    timeline: [
      {
        era: "Ionian War",
        title: "A dancer's family",
        description: "Raised among bladesmiths, trained in an art rather than a discipline of war.",
      },
      {
        era: "Ionian War",
        title: "The invasion",
        description:
          "Noxus arrives. Her home is taken, her family scattered, and she is the one left standing.",
        event: "noxian-invasion-ionia",
        with: ["karma", "swain"],
      },
      {
        era: "Ionian War",
        title: "Will of the Blades",
        description:
          "She turns her family's bladework into a weapon and becomes a symbol the resistance can follow.",
        event: "noxian-invasion-ionia",
      },
      {
        era: "Modern Ionia",
        title: "After the war",
        description:
          "Peace arrives and she keeps commanding, because the occupation taught her that peace is a posture.",
      },
    ],
  },
  {
    slug: "karma",
    name: "Karma",
    title: "The Enlightened One",
    region: "ionia",
    factions: [],
    roles: ["Spiritual Leader", "Mage", "Reincarnation"],
    status: "Alive",
    species: "Human (reincarnated soul)",
    aliases: ["The Enlightened One", "Darha"],
    accentColor: "#5FA88C",
    releaseYear: 2011,
    complexity: 3,
    importance: 72,
    popularity: 46,
    verified: true,
    events: ["noxian-invasion-ionia", "syndra-unbound"],
    tags: ["ionia", "reincarnation", "balance", "leadership", "restraint"],
    short:
      "Ionia's spiritual leader, reborn across lifetimes, and the one who has to keep justifying the day she chose violence.",
    long: [
      "Karma is the current incarnation of a soul that has led Ionia for generations. She carries the memories of her predecessors, which makes her wise and also makes her tired in a way that is hard to explain to anyone in their first life.",
      "During the Noxian invasion she did something her past selves had never sanctioned: she used her full power as a weapon, destroying an enemy fleet and a great many people on it. It worked. Ionia survived. She has been living with the precedent ever since.",
      "Her entire modern arc is about whether restraint is a principle or a luxury — a question she is more honest about than most of the people who quote her.",
    ],
    timeline: [
      {
        era: "Ionian War",
        title: "The soul that returns",
        description:
          "Recognised as the next incarnation of Ionia's spiritual leader, carrying her predecessors' memories.",
      },
      {
        era: "Ionian War",
        title: "The fleet",
        description:
          "Faced with Noxian invasion, she unleashes her full power and ends thousands of lives to stop it.",
        event: "noxian-invasion-ionia",
        with: ["irelia", "swain"],
      },
      {
        era: "Modern Ionia",
        title: "Living with the precedent",
        description:
          "She leads a province that now knows what she is capable of, and cannot unlearn it.",
        with: ["syndra"],
      },
    ],
  },
  {
    slug: "akali",
    name: "Akali",
    title: "The Rogue Assassin",
    region: "ionia",
    factions: ["kinkou"],
    roles: ["Assassin", "Former Fist of Shadow"],
    status: "Alive",
    species: "Human",
    aliases: ["The Rogue Assassin", "Fist of Shadow"],
    accentColor: "#5FA86B",
    releaseYear: 2010,
    complexity: 2,
    importance: 66,
    popularity: 82,
    verified: true,
    events: ["kinkou-fracture", "noxian-invasion-ionia"],
    tags: ["ionia", "kinkou", "assassin", "independence", "balance"],
    short:
      "Raised to keep Ionia's balance, she quit the order that taught her because balance was being used as an excuse.",
    long: [
      "Akali trained in the Kinkou Order and inherited the title Fist of Shadow from her mother. The Order's doctrine required her to watch threats develop without intervening until the balance itself was at stake. She found that intolerable.",
      "So she left — not in disgrace but in disagreement — and now works alone, killing the people the Kinkou would have monitored. She is not reckless about it. She simply refuses to pretend that inaction is neutral.",
      "Her split from Shen is the cleanest ideological fracture in Ionia: two people who agree on the goal and cannot agree on whether the goal permits waiting.",
    ],
    timeline: [
      {
        era: "Ionian War",
        title: "Fist of Shadow",
        description:
          "Trained in the Kinkou Order and given her mother's title while still very young.",
        with: ["shen"],
      },
      {
        era: "Ionian War",
        title: "The fracture",
        description:
          "The Order's restraint starts looking like cowardice to her, and she says so out loud.",
        event: "kinkou-fracture",
        with: ["shen"],
      },
      {
        era: "Modern Ionia",
        title: "Working alone",
        description:
          "She abandons the Kinkou and hunts Ionia's threats on her own authority.",
      },
    ],
  },
  {
    slug: "shen",
    name: "Shen",
    title: "The Eye of Twilight",
    region: "ionia",
    factions: ["kinkou"],
    roles: ["Guardian", "Eye of Twilight", "Leader"],
    status: "Alive",
    species: "Human",
    aliases: ["The Eye of Twilight"],
    accentColor: "#5F8FC7",
    releaseYear: 2010,
    complexity: 3,
    importance: 66,
    popularity: 50,
    verified: true,
    events: ["kinkou-fracture", "jhin-released", "noxian-invasion-ionia"],
    tags: ["ionia", "kinkou", "balance", "spirit-realm", "duty"],
    short:
      "The Kinkou's leader, tasked with holding a balance that keeps asking him to watch people die neutrally.",
    long: [
      "Shen inherited the Eye of Twilight after his father was killed, and with it the responsibility for maintaining Ionia's spirit balance. The job requires him to set his own feelings aside so completely that people mistake it for not having any.",
      "He does have them. He simply believes that a guardian who acts on preference becomes another force that needs balancing. That conviction cost him Akali, and before her, Zed.",
      "In the graph Shen is a hinge: almost every Ionian thread runs through the Kinkou, and the Kinkou runs through him.",
    ],
    timeline: [
      {
        era: "Ionian War",
        title: "Inheriting the Eye",
        description:
          "His father's death makes him the Kinkou's leader before he is ready for it.",
      },
      {
        era: "Ionian War",
        title: "The Order splits",
        description:
          "Zed breaks away, then Akali. Shen holds the doctrine together by holding himself still.",
        event: "kinkou-fracture",
        with: ["akali"],
      },
      {
        era: "Modern Ionia",
        title: "The golden demon",
        description:
          "Ionia releases a killer he helped imprison, and he has to hunt what his own province let out.",
        event: "jhin-released",
        with: ["jhin"],
      },
    ],
  },
  {
    slug: "syndra",
    name: "Syndra",
    title: "The Dark Sovereign",
    region: "ionia",
    factions: [],
    roles: ["Mage", "Sovereign"],
    status: "Alive",
    species: "Human",
    aliases: ["The Dark Sovereign"],
    accentColor: "#8B7FC7",
    releaseYear: 2012,
    complexity: 3,
    importance: 64,
    popularity: 54,
    verified: true,
    events: ["syndra-unbound"],
    tags: ["ionia", "magic", "power", "containment", "resentment"],
    short:
      "An Ionian mage whose power terrified everyone tasked with guiding it, and who has drawn the obvious conclusion.",
    long: [
      "Syndra's magic was enormous from childhood, and the adults around her responded to it with fear disguised as care. She was contained, restrained and taught that her own capability was a hazard to be managed.",
      "She now rejects limits as a category. Not out of simple spite, but because every limit she has ever been offered was imposed by someone who benefited from her being smaller.",
      "Her conflict with Karma is the sharpest version of Ionia's central argument: who decides how much power a person is allowed to hold, and on what authority.",
    ],
    timeline: [
      {
        era: "Ionian War",
        title: "Too much, too young",
        description: "Her magic outgrows every teacher assigned to it, and frightens all of them.",
        event: "syndra-unbound",
      },
      {
        era: "Ionian War",
        title: "Contained",
        description:
          "Ionia's elders restrain her power for her own good, and teach her exactly what restraint is worth.",
        event: "syndra-unbound",
        with: ["karma"],
      },
      {
        era: "Modern Ionia",
        title: "The Dark Sovereign",
        description: "She breaks free and stops accepting any authority over what she can hold.",
      },
    ],
  },
  {
    slug: "jhin",
    name: "Jhin",
    title: "The Virtuoso",
    region: "ionia",
    factions: [],
    roles: ["Assassin", "Artist"],
    status: "Alive",
    species: "Human",
    aliases: ["The Virtuoso", "Khada Jhin", "The Golden Demon"],
    accentColor: "#C9A34E",
    releaseYear: 2016,
    complexity: 3,
    importance: 62,
    popularity: 66,
    verified: true,
    events: ["jhin-released", "noxian-invasion-ionia"],
    tags: ["ionia", "assassin", "art", "performance", "released-prisoner"],
    short:
      "A murderer who treats killing as composition, let out of prison by people who thought they could aim him.",
    long: [
      "Khada Jhin was a stagehand before he was a killer, and he never stopped thinking in acts and intermissions. His crimes were designed: staged, timed, arranged for an audience that did not consent to attend.",
      "He was caught and imprisoned for years. Then Ionia's more pragmatic factions decided a monster on a leash was worth the risk, and released him to be pointed at Noxus.",
      "He was not, it turns out, leashed. He is the most self-aware character in Ionia and the least troubled by it, and he is fully prepared to make his handlers part of the performance.",
    ],
    timeline: [
      {
        era: "Ionian War",
        title: "The stagehand",
        description:
          "He works in Ionian theatre and develops a taste for arrangement that nobody notices in time.",
      },
      {
        era: "Ionian War",
        title: "Caught",
        description: "The Kinkou and Ionia's elders imprison him, and the killings stop.",
        with: ["shen"],
      },
      {
        era: "Modern Ionia",
        title: "Released as a weapon",
        description:
          "Ionian factions free him to use against Noxus. He accepts the commission and reinterprets the brief.",
        event: "jhin-released",
      },
    ],
  },
  {
    slug: "yunara",
    name: "Yunara",
    title: "The Unbroken Faith",
    region: "ionia",
    factions: ["kinkou"],
    roles: ["Kinkou Guardian", "Spirit Realm Ascetic", "Relic Wielder"],
    gameplayRoles: ["Marksman"],
    status: "Alive",
    species: "Human",
    aliases: ["The Unbroken Faith"],
    accentColor: "#7FA8C7",
    releaseYear: 2025,
    releaseDate: "2025-07-16",
    complexity: 4,
    featured: true,
    importance: 78,
    popularity: 68,
    verified: true,
    completenessTier: "A",
    events: ["kinkou-fracture"],
    sources: ["source:wiki-yunara"],
    tags: ["ionia", "kinkou", "spirit-realm", "aion-erna", "balance", "faith"],
    short:
      "A Kinkou guardian who spent centuries in the spirit realm mastering the Aion Er'na, and emerged with her vow to end disharmony still intact.",
    long: [
      "Yunara's devotion to Ionia did not waver when the path required isolation. She withdrew into the spirit realm and spent centuries honing her skill with the Aion Er'na — a legendary Kinkou relic whose mastery demands patience most mortals do not possess.",
      "Her training was not retreat. It was preparation. The Kinkou guard balance between realms, and Yunara chose to meet that duty on the spirit realm's terms rather than Ionia's impatient surface politics.",
      "What she sacrificed in those centuries — ordinary life, ease, the company of the living world — she considers part of the vow. Her faith that Ionia can be rid of disharmony and strife has not broken.",
      "The world she returns to is not the one she left. Ancient threats have risen again, and the fractures within the Kinkou itself — between Shen's restraint and those who left it — form the political landscape she must now navigate with a weapon meant for a more patient age.",
    ],
    timeline: [
      {
        era: "Ancient Ionia",
        title: "The vow",
        description:
          "She commits to Ionia's balance and accepts a path that will take her out of the living world for centuries.",
      },
      {
        era: "Spirit Realm",
        title: "Centuries with the Aion Er'na",
        description:
          "Cloistered in the spirit realm, she trains with the legendary Kinkou relic until mastery becomes identity.",
      },
      {
        era: "Modern Ionia",
        title: "The Kinkou fractures",
        description:
          "While she is absent, the Order splits over whether balance requires watching threats or ending them.",
        event: "kinkou-fracture",
      },
      {
        era: "Modern Ionia",
        title: "Return to a changed land",
        description:
          "She emerges to find disharmony she vowed to end — and an ancient shadow testing whether centuries of faith were enough.",
      },
    ],
  },
  {
    slug: "lee-sin",
    name: "Lee Sin",
    title: "The Blind Monk",
    region: "ionia",
    factions: [],
    roles: ["Monk", "Martial Artist"],
    status: "Alive",
    species: "Human",
    aliases: ["The Blind Monk"],
    accentColor: "#C98A4E",
    releaseYear: 2011,
    complexity: 2,
    importance: 58,
    popularity: 68,
    events: ["noxian-invasion-ionia"],
    tags: ["ionia", "monk", "dragon-spirit", "penance", "discipline"],
    short:
      "A monk who blinded himself in penance and has spent every year since trying to be worth the gesture.",
    long: [
      "Lee Sin trained in an Ionian monastery and was, by all accounts, extraordinarily gifted and extraordinarily impatient. That combination produced a catastrophe: he reached for a power he had not earned and people died for it.",
      "His penance was to stare into the sun until it took his sight — a self-imposed sentence for an act his order had not even finished judging.",
      "What followed was not retirement. He fights, travels and intervenes constantly, as someone who has decided that atonement is an activity rather than a state.",
    ],
    timeline: [
      {
        era: "Ionian War",
        title: "The gifted student",
        description: "A monastery prodigy whose ambition outpaces his discipline.",
      },
      {
        era: "Ionian War",
        title: "The penance",
        description:
          "After a disaster of his own making, he blinds himself rather than wait to be judged.",
      },
      {
        era: "Modern Ionia",
        title: "Atonement in motion",
        description:
          "He walks Ionia intervening wherever he can, treating penance as something you do rather than are.",
      },
    ],
  },
  {
    slug: "xayah",
    name: "Xayah",
    title: "The Rebel",
    region: "ionia",
    factions: [],
    roles: ["Vastaya", "Rebel"],
    status: "Alive",
    species: "Vastaya",
    aliases: ["The Rebel", "Xayah the Rebel"],
    accentColor: "#A8434A",
    releaseYear: 2017,
    complexity: 2,
    importance: 54,
    popularity: 56,
    events: ["vastaya-rebellion"],
    tags: ["ionia", "vastaya", "rebellion", "lovers", "identity"],
    short:
      "A vastayan revolutionary who is fighting for her people's survival, and refuses to call it anything gentler.",
    long: [
      "Xayah is Lhotlan vastaya, and she has watched her people thinned out by human expansion, human war and human indifference. She does not accept that Ionia's spiritual harmony extends to her.",
      "Her methods are direct: she kills the people who threaten vastayan enclaves, and she does not soften the framing for Ionian audiences. Her partner Rakan, who is beloved by almost everyone, makes that position socially survivable.",
      "She is a good counterweight in the graph to Ahri — two vastaya with opposite relationships to their own heritage.",
    ],
    timeline: [
      {
        era: "Modern Ionia",
        title: "A thinning people",
        description: "She grows up watching vastayan enclaves shrink and Ionia decline to notice.",
      },
      {
        era: "Modern Ionia",
        title: "The rebel",
        description:
          "She starts killing to protect what remains, and refuses to use a kinder word for it.",
        event: "vastaya-rebellion",
      },
      {
        era: "Modern Ionia",
        title: "Not alone",
        description:
          "Rakan follows her into it, and the two become the most effective pair in the vastayan resistance.",
        with: ["ahri"],
      },
    ],
  },
];
