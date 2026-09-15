import type { StoryPath, StoryPathChapter } from "@/types";
import { RUNETERRA_ID } from "./universes";

interface ChapterSeed {
  title: string;
  subtitle: string;
  body: string[];
  chars: string[];
  events?: string[];
  minutes?: number;
  asset?: string;
}

interface PathSeed {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  accentColor: string;
  featured?: boolean;
  verified?: boolean;
  chapters: ChapterSeed[];
}

const seeds: PathSeed[] = [
  {
    slug: "the-darkin",
    title: "THE DARKIN",
    subtitle: "How Shurima's greatest heroes became its worst mistake",
    description:
      "Shurima manufactured gods to survive the Void. It worked, and then it kept working long after the war was over. This is the story of what immortality does to a purpose.",
    accentColor: "#A8434A",
    featured: true,
    verified: true,
    chapters: [
      {
        title: "THE ASCENDED",
        subtitle: "Mortals made into god-warriors",
        body: [
          "Shurima's Sun Disc could elevate a mortal into something else entirely: stronger, longer-lived, and built for a war the empire could not otherwise win. The Rite of Ascension was an honour, a public ceremony, and a weapons programme.",
          "The first Ascended were genuine heroes. Statues were carved for them. Aatrox was among the greatest — the empire's answer to a problem that armies had already failed to solve.",
        ],
        chars: ["aatrox", "nasus", "azir"],
        events: ["ascension-ritual"],
      },
      {
        title: "THE VOID WAR",
        subtitle: "An enemy with no reason to stop",
        body: [
          "The Void did not negotiate, did not tire and did not run out. Shurima's god-warriors held the line for centuries, which is exactly as long as it sounds.",
          "Winning a war like that requires becoming something that can fight it indefinitely. Nobody in the empire asked what happens to that something once the fighting ends.",
        ],
        chars: ["aatrox", "varus", "nasus", "kaisa"],
        events: ["void-incursion"],
      },
      {
        title: "THE FALL",
        subtitle: "Immortality curdles into appetite",
        body: [
          "Victory arrived and changed nothing about what the Ascended had become. Beings designed around an endless war found the peace intolerable, and some of them started generating conflict rather than ending it.",
          "Shurima's monuments turned into its emergency. The empire that had built gods now had to work out how to un-build them.",
        ],
        chars: ["aatrox", "varus"],
        events: ["darkin-corruption"],
      },
      {
        title: "THE DARKIN WAR",
        subtitle: "An empire turns on its own gods",
        body: [
          "Mortal Shurima went to war against the beings it had made, and it could not have won alone. Targon intervened, bringing celestial power to a conflict that was already apocalyptic.",
          "The Aspect of War fought in that campaign. Millennia later, the man who carried it would learn exactly how long a Darkin's memory is.",
        ],
        chars: ["aatrox", "pantheon", "varus", "leona"],
        events: ["darkin-war"],
      },
      {
        title: "THE WEAPONS",
        subtitle: "If you cannot kill it, contain it",
        body: [
          "The Darkin could not be destroyed. So they were sealed — each one bound into the weapon it had fought with, then hidden, buried or forgotten.",
          "It is an elegant solution with a fatal dependency: it only holds as long as nobody picks the weapon up.",
        ],
        chars: ["aatrox", "varus", "pantheon"],
        events: ["darkin-war"],
      },
      {
        title: "AATROX",
        subtitle: "The sword that wears people",
        body: [
          "When a mortal lifts Aatrox's blade, he takes the body and remakes it into a shape he recognises. The wielder does not survive the experience in any meaningful sense.",
          "He is not trying to rule Runeterra. He wants out of an existence Targon designed to have no exit, and he has concluded that the world ending is the most reliable door.",
        ],
        chars: ["aatrox"],
        events: ["aatrox-return", "aatrox-pantheon-duel"],
      },
      {
        title: "VARUS",
        subtitle: "Three people, one body",
        body: [
          "Varus's bow was found in Ionia by two young lovers looking for a way to save each other. They took it up together, and he took them both.",
          "What walks now is a single body containing a Darkin and the two mortals who let him in — and the mortals are still in there, still arguing.",
        ],
        chars: ["varus"],
        events: ["darkin-war"],
      },
      {
        title: "THE MODERN DARKIN",
        subtitle: "Loose objects with very long memories",
        body: [
          "The seals are failing one at a time, and every release follows the same pattern: someone finds a remarkable weapon, and the weapon finds a use for them.",
          "Targon built the cages. That makes every Aspect, priest and mortal host a legitimate target in the eyes of whatever comes out of them.",
        ],
        chars: ["aatrox", "varus", "pantheon", "kaisa"],
        events: ["aatrox-return"],
      },
    ],
  },
  {
    slug: "the-fall-of-shurima",
    title: "THE FALL OF SHURIMA",
    subtitle: "An empire lost in a single afternoon",
    description:
      "Shurima did not decline. It ended, on a specific day, because of one man's betrayal at the exact moment the empire was most exposed.",
    accentColor: "#D1A65C",
    featured: true,
    verified: true,
    chapters: [
      {
        title: "THE GREATEST EMPIRE",
        subtitle: "Shurima at its height",
        body: [
          "At its peak, Shurima spanned a continent and treated Ascension as a state institution. Its capital was the centre of the known world, and its confidence was total.",
          "Confidence is what makes an afternoon like the one coming possible.",
        ],
        chars: ["azir", "nasus"],
        events: ["ascension-ritual"],
      },
      {
        title: "THE EMPEROR AND THE SLAVE",
        subtitle: "Azir and Xerath",
        body: [
          "Azir intended to be remembered as the emperor who made Shurima just, starting with the abolition of slavery. His court considered this dangerously sentimental.",
          "His closest confidant was Xerath, a slave-born magus whose brilliance had earned him proximity to power but not freedom from it. That distinction mattered more than Azir ever understood.",
        ],
        chars: ["azir", "nasus"],
      },
      {
        title: "THE RITE",
        subtitle: "An emperor chooses to Ascend",
        body: [
          "Azir decided to undergo the Rite of Ascension himself — an honour normally conferred on others, and a demonstration that the throne would share the burden it imposed.",
          "The ritual required absolute precision, total exposure, and someone trustworthy standing next to him.",
        ],
        chars: ["azir"],
        events: ["fall-of-shurima"],
      },
      {
        title: "THE BETRAYAL",
        subtitle: "The moment everything stopped",
        body: [
          "Xerath sabotaged the ritual. Azir was destroyed, Xerath took the power meant for his emperor, and the ceremony's failure tore through the capital.",
          "The city sank. An empire that had stood for millennia was gone before the dust settled.",
        ],
        chars: ["azir", "nasus"],
        events: ["fall-of-shurima"],
      },
      {
        title: "THE BROTHERS",
        subtitle: "What Nasus lost in the chaos",
        body: [
          "In the collapse, Nasus and his brother Renekton went into the Tomb of the Emperors to contain a catastrophe. Only one of them came back recognisable.",
          "Everything Nasus has done in the millennia since is shaped by that single decision.",
        ],
        chars: ["nasus"],
        events: ["fall-of-shurima"],
      },
      {
        title: "THE SANDS",
        subtitle: "Millennia of nothing",
        body: [
          "What followed was not a dark age but an absence. The desert took the cities, the records and eventually the memory, and the descendants of the empire became tribes with legends.",
          "Nasus stayed, guarding an archive nobody was coming to read.",
        ],
        chars: ["nasus", "akshan", "kaisa"],
      },
      {
        title: "SHURIMA RISES",
        subtitle: "A claim nobody living recognises",
        body: [
          "The buried capital pulled itself out of the sand, and its emperor returned Ascended at last — to a continent that had moved on entirely.",
          "Azir intends to rebuild. Whether anyone alive wants a god-emperor back is the question modern Shurima is actually about.",
        ],
        chars: ["azir", "nasus", "akshan"],
        events: ["shurima-risen"],
      },
    ],
  },
  {
    slug: "the-ruination",
    title: "THE RUINATION",
    subtitle: "A king who refused one death and broke the world's archive",
    description:
      "The Blessed Isles held the greatest collection of magic in Runeterra. One man's grief turned it into a spreading undeath that is still expanding.",
    accentColor: "#4FA88C",
    featured: true,
    verified: true,
    chapters: [
      {
        title: "THE BLESSED ISLES",
        subtitle: "The world's archive of magic",
        body: [
          "The Isles were a scholarly sanctuary: an island kingdom that collected, studied and guarded magic other nations could not handle safely.",
          "At its centre were the Waters of Life, protected by the Masks and hedged with rules that existed for excellent reasons.",
        ],
        chars: ["thresh", "kalista", "ryze"],
        events: ["blessed-isles"],
      },
      {
        title: "THE KING OF CAMAVOR",
        subtitle: "Viego, and a word he had never heard",
        body: [
          "Viego inherited an empire's worth of power and no instruction in restraint. He had never been told no by anyone whose opinion could be enforced.",
          "Then he married Isolde, and built his entire interior life around a single person.",
        ],
        chars: ["viego"],
      },
      {
        title: "ISOLDE",
        subtitle: "A death he would not accept",
        body: [
          "Isolde died. Viego's response was not grief in any recognisable shape; it was the assumption that death was an administrative obstacle and that someone was withholding the solution.",
          "The Isles told him the truth. Kalista, Camavor's finest general, told him the truth. Neither outcome went well.",
        ],
        chars: ["viego", "kalista"],
        events: ["kalista-betrayal"],
      },
      {
        title: "THE WARNING",
        subtitle: "Kalista is killed for honesty",
        body: [
          "Sent to find a cure, Kalista returned with an answer instead of a miracle and was murdered for the difference.",
          "She came back from the Isles as the Spear of Vengeance — an oath-bound revenant who answers only calls for retribution. The catastrophe had not even started yet.",
        ],
        chars: ["kalista", "viego"],
        events: ["kalista-betrayal"],
      },
      {
        title: "THE RUINATION",
        subtitle: "The magic inverts",
        body: [
          "Viego forced the Waters of Life to undo Isolde's death. The magic did not resurrect her; it inverted, and the Black Mist poured out across the Isles.",
          "Every living thing there was killed and then prevented from finishing the process. The Blessed Isles became the Shadow Isles in an afternoon.",
        ],
        chars: ["viego", "thresh", "kalista"],
        events: ["the-ruination"],
      },
      {
        title: "THE CHAIN WARDEN",
        subtitle: "The one who was already like this",
        body: [
          "Thresh had been a warden of the Isles' archives and prisoners, and he had enjoyed the second part of that job long before any Mist arrived.",
          "Where the rest of the population became unwilling ghosts, Thresh treated undeath as a promotion — and began collecting souls individually, for the experience.",
        ],
        chars: ["thresh"],
        events: ["thresh-ascent"],
      },
      {
        title: "THE HARROWINGS",
        subtitle: "The Mist learns to travel",
        body: [
          "The Black Mist does not stay put. It rolls out across the water, takes coastlines, and returns with them. Bilgewater treats the Harrowing as a season rather than a legend.",
          "Every Harrowing expands the Isles' population, which is the part that should worry everyone else.",
        ],
        chars: ["thresh", "viego", "senna"],
      },
      {
        title: "THE LANTERN",
        subtitle: "Senna, held past her death",
        body: [
          "Thresh took Senna's soul into his lantern and kept it for years, largely to work on the man hunting him.",
          "She got out. But the Mist came with her, and she now fights it using its own substance — the only major figure who has been on both sides of that lantern.",
        ],
        chars: ["senna", "thresh"],
        events: ["senna-freed"],
      },
      {
        title: "THE RUINED KING WALKS",
        subtitle: "Grief with an army",
        body: [
          "Viego eventually found a door out of the Isles. What came through was not a conqueror with a strategy but a single unchanging objective: find something that can hold Isolde again.",
          "Because he can seize bodies, anyone can suddenly become a route through him. That is what makes him the most dangerous node in the graph.",
        ],
        chars: ["viego", "senna", "akshan"],
        events: ["viego-awakening"],
      },
      {
        title: "THE SENTINELS",
        subtitle: "What pushing back actually costs",
        body: [
          "The Sentinels of Light exist to hold the Mist. They are scattered, under-resourced and staffed largely by people it has already taken something from.",
          "Senna, Akshan and Kalista represent three different answers to the same question: what do you become in order to fight this.",
        ],
        chars: ["senna", "akshan", "kalista", "kindred"],
        events: ["viego-awakening"],
      },
    ],
  },
  {
    slug: "the-black-rose",
    title: "THE BLACK ROSE",
    subtitle: "Who has actually been running Noxus",
    description:
      "Noxus believes it is a meritocracy. For centuries it has been a managed one. This is the story of the cabal underneath the empire and the general who found it.",
    accentColor: "#8E2F55",
    featured: true,
    verified: true,
    chapters: [
      {
        title: "THE EMPIRE OF STRENGTH",
        subtitle: "What Noxus says about itself",
        body: [
          "Noxus does not care where you were born; it cares what you can take. That story is real enough to have produced Darius, who rose from nothing on results alone.",
          "It is also extremely convenient for anyone who would prefer that nobody ask who selects the people at the top.",
        ],
        chars: ["darius", "draven", "katarina"],
        events: ["noxian-rise"],
      },
      {
        title: "THE CABAL",
        subtitle: "Older than the empire",
        body: [
          "The Black Rose is a society of mages that predates the modern Noxian state and has installed, guided and discarded its rulers ever since.",
          "Its matron has never held public office. That is not modesty; it is the entire operational doctrine.",
        ],
        chars: ["leblanc"],
      },
      {
        title: "THE DECEIVER",
        subtitle: "Which LeBlanc did you meet?",
        body: [
          "LeBlanc produces copies, doubles and decoys, and nobody can say with confidence which of her they have ever spoken to — or whether 'Emilia LeBlanc' is a person rather than a role that keeps being refilled.",
          "Treat every fact about her as provisional. That is not a gap in the record; that is the character.",
        ],
        chars: ["leblanc"],
      },
      {
        title: "THE DEFEAT IN IONIA",
        subtitle: "How Swain learned to look down",
        body: [
          "Swain commanded Noxus's invasion of Ionia and lost his arm, his army and his standing. Noxus does not forgive failure; it replaces it.",
          "From the floor, he got a clearer view of the machinery. What he saw was that the empire was being steered from underneath.",
        ],
        chars: ["swain", "karma", "irelia"],
        events: ["noxian-invasion-ionia"],
      },
      {
        title: "THE COUP",
        subtitle: "Taking power in order to break it",
        body: [
          "Swain returned with a demon's arm and seized the Grand General's seat. Then he did the thing nobody expected: he dismantled its authority.",
          "The Trifarix — Might, Guile and Vision — exists so that capturing Noxus requires capturing three offices instead of one. Darius backed it because it was competent.",
        ],
        chars: ["swain", "darius"],
        events: ["swain-coup"],
      },
      {
        title: "THE QUIET WAR",
        subtitle: "Noxus's real conflict",
        body: [
          "Swain's war is not with Demacia or Ionia. It is with LeBlanc, and it is fought in cellars, ledgers and coded letters, almost entirely out of public view.",
          "The Black Rose is still recruiting — including a Medarda councillor in Piltover whose latent magic made the offer non-optional.",
        ],
        chars: ["swain", "leblanc", "mel", "katarina"],
        events: ["black-rose-resurgence"],
      },
    ],
  },
  {
    slug: "demacia-and-the-mage-rebellion",
    title: "DEMACIA AND THE MAGE REBELLION",
    subtitle: "A kingdom built on a fear it cannot admit",
    description:
      "Demacia was founded by refugees of a mage war and encoded that fear into its walls. Then the walls started arguing back.",
    accentColor: "#D8B978",
    featured: true,
    verified: true,
    chapters: [
      {
        title: "THE FOUNDING",
        subtitle: "Refugees, petricite and two celestial sisters",
        body: [
          "Demacia was built by people fleeing magic, under the protection of two winged beings who had plenty of it. The kingdom's walls are petricite, which absorbs magic and silences mages.",
          "That contradiction is load-bearing. Demacia venerates Kayle while imprisoning anyone born the way she was.",
        ],
        chars: ["kayle", "morgana", "garen"],
        events: ["mage-rebellion-founding"],
      },
      {
        title: "THE MAGESEEKERS",
        subtitle: "An order for managing people",
        body: [
          "The Mageseekers find, contain and 'manage' magic inside Demacia. In practice that means detention, and in practice detention means children.",
          "One of those children could sense magic, which made him useful rather than free.",
        ],
        chars: ["sylas"],
        events: ["sylas-uprising"],
      },
      {
        title: "THE BOY FROM DREGBOURNE",
        subtitle: "Sylas, used as an instrument",
        body: [
          "Sylas was born poor with a gift the state could deploy. He was put to work identifying other mages before he was old enough to understand what he was doing.",
          "When he understood, he killed a Mageseeker, and Demacia put him in a cell for years.",
        ],
        chars: ["sylas"],
        events: ["sylas-uprising"],
      },
      {
        title: "THE GIRL AT THE CELL DOOR",
        subtitle: "Lux, and the most consequential kindness in Demacia",
        body: [
          "A young noble was assigned to attend the prisoner. She was the only person who treated him as a person, and she talked to him about magic — including, carefully, her own.",
          "Lux is a mage from one of Demacia's great military houses. Her brother enforces the laws that would destroy her. He does not know.",
        ],
        chars: ["lux", "sylas", "garen"],
        events: ["sylas-uprising"],
      },
      {
        title: "THE ESCAPE",
        subtitle: "The Unshackled",
        body: [
          "Sylas broke out with an ability of his own: he can seize and wield the magic of anyone who comes at him. Part of what he escaped with came from those conversations.",
          "He is not asking for tolerance. He wants Demacia's foundations pulled out, and he has the clearest political programme of anyone in the region.",
        ],
        chars: ["sylas", "garen", "jarvan-iv"],
        events: ["sylas-uprising"],
      },
      {
        title: "THE KINGDOM ARGUES WITH ITSELF",
        subtitle: "Garen, Jarvan and the question they inherit",
        body: [
          "Demacia sent its most sincere soldier after the one revolutionary whose grievance is unanswerable. Garen is exactly the right man and exactly the wrong one.",
          "Jarvan IV inherits a kingdom that now requires its heir to have an actual opinion about magic rather than a ceremonial one.",
        ],
        chars: ["garen", "jarvan-iv", "sylas", "lux"],
        events: ["sylas-uprising"],
      },
    ],
  },
  {
    slug: "piltover-and-zaun",
    title: "PILTOVER & ZAUN",
    subtitle: "One city, two altitudes",
    description:
      "Piltover industrialised magic and became the richest city on the continent. Zaun absorbed the runoff. Everything that follows is a consequence of that arrangement.",
    accentColor: "#5FA86B",
    featured: true,
    verified: true,
    chapters: [
      {
        title: "THE CITY OF PROGRESS",
        subtitle: "What hextech bought",
        body: [
          "Piltover turned magic into an economy: patents, clans, academies and an enormous amount of money. Its Wardens keep the surface orderly.",
          "None of it works without the undercity beneath it, which Piltover depends on and declines to look at.",
        ],
        chars: ["caitlyn", "camille", "viktor"],
        events: ["hextech-revolution"],
      },
      {
        title: "THE UNDERCITY",
        subtitle: "Zaun, unregulated and inventive",
        body: [
          "Zaun has no council and no permission. It has chem-barons, back-alley genius, and a population that learned to breathe the Gray.",
          "Most of Piltover's brightest ideas are only legal because Zaun tested them first.",
        ],
        chars: ["ekko", "singed", "jinx"],
      },
      {
        title: "TWO SISTERS",
        subtitle: "Vi and the girl who became Jinx",
        body: [
          "Vi did the protecting and the fighting so her younger sister would not have to. Then something the younger one built went wrong and people died.",
          "Whether Vi left, was taken, or simply could not come back is the question Jinx cannot hold steady. That instability is the character.",
        ],
        chars: ["vi", "jinx", "ekko"],
        events: ["zaun-sump-disaster"],
      },
      {
        title: "THE ENFORCER AND THE SHERIFF",
        subtitle: "A partnership that shouldn't work",
        body: [
          "Vi took a badge and hextech gauntlets: Piltovan technology in Zaunite hands, which is a fair summary of her whole situation.",
          "Caitlyn has the procedure and the best aim in the city. The friction between them is the Piltover–Zaun relationship at conversational volume.",
        ],
        chars: ["vi", "caitlyn"],
        events: ["hextech-revolution"],
      },
      {
        title: "THE MACHINE HERALD",
        subtitle: "Viktor decides flesh is the defect",
        body: [
          "Viktor began as an idealist trying to end suffering with hextech. Then his own body failed him and he arrived at a harder conclusion.",
          "The Glorious Evolution applies the doctrine to himself first. The horror is not that he imposes it — it is that a lot of Zaun would say yes.",
        ],
        chars: ["viktor", "singed"],
        events: ["glorious-evolution-begins"],
      },
      {
        title: "THE BOY WHO SHATTERED TIME",
        subtitle: "Ekko's much smaller ambition",
        body: [
          "Ekko is the best natural engineer in the undercity and the least interested in leaving it. His Z-Drive rewinds seconds, which is worth more in a fight than it sounds.",
          "Where Viktor wants transcendence, Ekko wants his neighbourhood to still be there next week. The Firelights exist for exactly that.",
        ],
        chars: ["ekko", "viktor"],
      },
      {
        title: "THE CRISIS",
        subtitle: "When both cities run out of patience",
        body: [
          "A bomb, a bridge and a pair of sisters. The council's authority and the undercity's tolerance expire at roughly the same time.",
          "Camille handles what the law cannot be seen touching. Caitlyn has to decide what she is willing to become to win. Nobody involved gets a clean version of this.",
        ],
        chars: ["jinx", "vi", "caitlyn", "camille", "ekko", "mel"],
        events: ["piltover-zaun-crisis"],
      },
    ],
  },
  {
    slug: "targon-and-the-aspects",
    title: "TARGON AND THE ASPECTS",
    subtitle: "What it costs to carry a god",
    description:
      "Mount Targon is a threshold. Climb it, survive, and a celestial intelligence may decide to use your life. This is what that arrangement actually involves.",
    accentColor: "#8B7FC7",
    featured: true,
    verified: true,
    chapters: [
      {
        title: "THE MOUNTAIN",
        subtitle: "A threshold, not a place",
        body: [
          "Targon is less a region than a doorway. Those who climb it and survive may be chosen by an Aspect — a celestial being that grants power and, in return, uses a body.",
          "Most climbers do not come back. The ones who do are no longer entirely the people who left.",
        ],
        chars: ["pantheon", "leona", "diana"],
      },
      {
        title: "THE STAR FORGER",
        subtitle: "How the Aspects got their leverage",
        body: [
          "Aurelion Sol shaped stars because he could, long before mortals existed to be impressed. Then the Aspects flattered him into a bargain and bound his power to a crown.",
          "Targon's celestial authority rests partly on that deception, which is why the dragon is the region's most embarrassing open secret.",
        ],
        chars: ["aurelion-sol"],
        events: ["star-forger-bound"],
      },
      {
        title: "SUN AND MOON",
        subtitle: "Leona, Diana, and a suppressed faith",
        body: [
          "The Solari consolidated power and wrote the Lunari out of Targon's scriptures. Diana found the records anyway and climbed to settle it.",
          "She came back as the Aspect of the Moon, which the order was obliged to call heresy. Leona, her childhood friend, came back as the Sun.",
        ],
        chars: ["leona", "diana"],
        events: ["targon-solari-purge"],
      },
      {
        title: "THE ASPECT OF WAR",
        subtitle: "Atreus, used as armour",
        body: [
          "A Rakkor boy climbed the mountain and came down carrying the Aspect of War. The arrangement worked the way Targon's arrangements usually do: the celestial decided, the mortal supplied the body.",
          "As the Aspect of War, he fought in the Darkin War and helped seal Aatrox into his own blade.",
        ],
        chars: ["pantheon", "aatrox"],
        events: ["darkin-war"],
      },
      {
        title: "THE GOD THAT DIED",
        subtitle: "Aatrox comes back for him",
        body: [
          "The Darkin Blade hunted down the Aspect of War and destroyed it — properly, in a way celestials are not supposed to be destructible.",
          "Atreus was left alive on the ground, hollowed out and no longer anybody's vessel.",
        ],
        chars: ["pantheon", "aatrox"],
        events: ["aatrox-pantheon-duel"],
      },
      {
        title: "A MORTAL KEEPS THE SPEAR",
        subtitle: "The most important thing anyone has done to Targon",
        body: [
          "Pantheon got up. He kept a fragment of the dead Aspect and made a choice the celestials had never needed from him: to fight as a man rather than as a mount.",
          "He is now the only figure who has looked at both a god and a Darkin and concluded that neither is owed his obedience. Aurelion Sol finds that precedent extremely encouraging.",
        ],
        chars: ["pantheon", "aurelion-sol", "leona", "diana"],
        events: ["pantheon-reborn", "targon-aurelion-loose"],
      },
    ],
  },
  {
    slug: "yasuo-and-yone",
    title: "YASUO & YONE",
    subtitle: "Two minutes that ruined two lives",
    description:
      "An elder was murdered, the wrong brother was blamed, and the other brother was sent to carry out the sentence. This is the shortest tragedy in Runeterra.",
    accentColor: "#8FA8C7",
    featured: true,
    verified: true,
    chapters: [
      {
        title: "THE PRODIGY AND THE DUTIFUL ONE",
        subtitle: "Two brothers in one village",
        body: [
          "Yasuo was the only student of his generation to master the wind technique, and insufferable about it. Yone had discipline instead, and was the one their village actually relied on.",
          "Neither arrangement was a problem until the war arrived.",
        ],
        chars: ["yasuo", "yone"],
      },
      {
        title: "THE POST HE LEFT",
        subtitle: "Noxus invades Ionia",
        body: [
          "Yasuo was assigned to guard an Ionian elder during the Noxian invasion. He could hear the battle happening and he left to join it.",
          "He came back to find the elder dead.",
        ],
        chars: ["yasuo", "swain"],
        events: ["noxian-invasion-ionia"],
      },
      {
        title: "THE ACCUSATION",
        subtitle: "The only wind practitioner present",
        body: [
          "The killing blow looked like wind magic, and Yasuo was the obvious suspect. He refused to explain himself, which he mistook for dignity, and fled instead of accepting judgement.",
          "Ionia sent someone to bring him in.",
        ],
        chars: ["yasuo", "yone"],
        events: ["elder-killing"],
      },
      {
        title: "THE DUEL",
        subtitle: "The wrong brother survives",
        body: [
          "Yone accepted the assignment because duty meant accepting it. Yasuo won.",
          "Everything either of them has done since is downstream of two minutes that one humble conversation would have prevented.",
        ],
        chars: ["yasuo", "yone"],
        events: ["brothers-duel"],
      },
      {
        title: "AFTER",
        subtitle: "A wanderer and a mask",
        body: [
          "Yasuo walked Ionia hunting the truth and being refused shelter in his own country. He eventually found who really killed the elder — and learned that exoneration and forgiveness are different things.",
          "Yone woke in the spirit realm, killed the azakana that came for him, and took its face. He has not forgiven his brother. More unsettlingly, he has stopped needing to.",
        ],
        chars: ["yasuo", "yone", "riven"],
        events: ["elder-killing"],
      },
    ],
  },
  {
    slug: "the-war-in-ionia",
    title: "THE WAR IN IONIA",
    subtitle: "What a peaceful province becomes when it wins",
    description:
      "Ionia had no standing army. Noxus gave it one. The province is still arguing about everything it had to become in order to survive.",
    accentColor: "#C77FA8",
    featured: true,
    verified: true,
    chapters: [
      {
        title: "A LAND WITHOUT AN ARMY",
        subtitle: "Ionia before the invasion",
        body: [
          "Ionia's spiritual traditions treated force as a last resort and had no institution for organising it. That was a genuine philosophical position, not naivety.",
          "It also meant that when Noxus arrived, there was nothing in place to stop it.",
        ],
        chars: ["karma", "shen", "irelia"],
      },
      {
        title: "THE INVASION",
        subtitle: "Swain's campaign",
        body: [
          "Noxus expected a short war. Ionia's provinces were taken quickly, and its leadership had no mechanism for coordinated response.",
          "The people who stepped into that gap were mostly far too young for it.",
        ],
        chars: ["swain", "irelia", "yasuo"],
        events: ["noxian-invasion-ionia"],
      },
      {
        title: "THE BLADE DANCER",
        subtitle: "Irelia becomes a commander",
        body: [
          "Irelia was a dancer from a family of bladesmiths. She turned her family's art into a weapon and became a symbol the resistance could follow.",
          "Ionia venerates her for it. It has never fully reckoned with the fact that a generation learned leadership from an occupation.",
        ],
        chars: ["irelia"],
        events: ["noxian-invasion-ionia"],
      },
      {
        title: "THE CHEMICAL WEAPON",
        subtitle: "Singed, and the commander who broke her sword",
        body: [
          "Noxus bought Zaunite chemtech and deployed it in Ionia — including onto ground its own troops were holding.",
          "Riven survived that, understood exactly what she was worth to the empire, and shattered her rune blade. She has been an enemy of both countries ever since.",
        ],
        chars: ["singed", "riven", "swain", "irelia"],
        events: ["the-place-of-blood"],
      },
      {
        title: "THE FLEET",
        subtitle: "Karma crosses a line",
        body: [
          "Facing the invasion, Ionia's spiritual leader unleashed her full power and destroyed a Noxian fleet, ending thousands of lives at once.",
          "It worked. Ionia survived. Karma has spent every year since living with the precedent, and every Ionian compromise now gets defended by pointing at her.",
        ],
        chars: ["karma", "swain"],
        events: ["noxian-invasion-ionia"],
      },
      {
        title: "THE ORDER FRACTURES",
        subtitle: "Shen, Akali and the cost of balance",
        body: [
          "The Kinkou guard Ionia's spirit balance, which requires watching threats develop rather than acting on them. Under occupation, that doctrine became unbearable to some of its own members.",
          "Zed broke away first. Akali left later — not in disgrace but in disagreement. Shen holds the doctrine together by holding himself still.",
        ],
        chars: ["shen", "akali"],
        events: ["kinkou-fracture"],
      },
      {
        title: "WHAT IONIA KEPT",
        subtitle: "The province after the war",
        body: [
          "Peace arrived and the new instruments did not go away: commanders, assassins, a released murderer, and a spiritual leader who has demonstrated what she can do.",
          "Syndra rejects any limit imposed by people who benefited from her being smaller. Xayah points out that Ionian harmony never included the vastaya. Neither argument has an agreed answer.",
        ],
        chars: ["syndra", "xayah", "jhin", "karma", "ahri"],
        events: ["jhin-released", "vastaya-rebellion"],
      },
    ],
  },
  {
    slug: "the-rise-of-noxus",
    title: "THE RISE OF NOXUS",
    subtitle: "How a meritocracy becomes an industry",
    description:
      "Noxus rewards results and nothing else. That produced the most effective army in Valoran, and a state that treats its own people as consumable.",
    accentColor: "#A03041",
    featured: true,
    verified: true,
    chapters: [
      {
        title: "THE PROMISE",
        subtitle: "Strength is the only inheritance",
        body: [
          "Noxus offers something genuinely rare: it does not care about your birth. Darius was an orphan with nothing and became the most feared commander on the continent.",
          "That promise is real, and it is the empire's most effective recruitment tool.",
        ],
        chars: ["darius", "katarina", "draven"],
        events: ["noxian-rise"],
      },
      {
        title: "THE MACHINE",
        subtitle: "Conquest as a national industry",
        body: [
          "Noxian expansion is not ideological; it is economic. Territory, labour and resources flow inward, and the army is the mechanism.",
          "Every general's career depends on there being another campaign.",
        ],
        chars: ["darius", "swain"],
        events: ["noxian-rise"],
      },
      {
        title: "THE SPECTACLE",
        subtitle: "Draven, and what the crowd needs",
        body: [
          "A population at permanent war needs to feel it is winning. Draven turned executions into performances and became the empire's most popular killer.",
          "Swain does not respect him and does not need to. Entertainment is a governing instrument.",
        ],
        chars: ["draven", "darius", "swain"],
      },
      {
        title: "THE COST",
        subtitle: "Riven, and the meaning of expendable",
        body: [
          "Riven was maximally meritorious: a girl with nothing given rank, purpose and a rune blade, who served without hesitation.",
          "Noxus gassed her position anyway. The meritocracy rewards results, and results are not the same as people.",
        ],
        chars: ["riven", "singed", "darius"],
        events: ["the-place-of-blood"],
      },
      {
        title: "THE DEFEAT",
        subtitle: "Ionia, and what Swain saw",
        body: [
          "The invasion of Ionia failed, and it cost Swain his arm, his army and his standing. Noxus does not forgive failure.",
          "It also gave him the only vantage point from which the Black Rose is visible.",
        ],
        chars: ["swain", "karma", "irelia"],
        events: ["noxian-invasion-ionia"],
      },
      {
        title: "THE TRIFARIX",
        subtitle: "A state designed to resist capture",
        body: [
          "Swain seized the Grand General's seat and then split its authority into three: Might, Guile and Vision. No single ruler, no single target.",
          "It is the most sophisticated piece of political engineering in Runeterra, and it exists because one man worked out who had really been in charge.",
        ],
        chars: ["swain", "darius", "leblanc"],
        events: ["swain-coup", "black-rose-resurgence"],
      },
    ],
  },
  {
    slug: "arcane-what-happened-next",
    title: "ARCANE: WHAT HAPPENED NEXT?",
    subtitle: "Where the series ends and Runeterra continues",
    description:
      "If you arrived through Arcane, this is the bridge: which threads continue into the wider universe, which characters are waiting, and where the two continuities diverge.",
    accentColor: "#8A5FC9",
    featured: true,
    verified: false,
    chapters: [
      {
        title: "TWO CONTINUITIES",
        subtitle: "Read this first",
        body: [
          "Arcane is its own continuity. It shares characters with Runeterra's main timeline but not every event, and Riot has been explicit that the two are not identical.",
          "LoreGraph marks Arcane-derived connections as ALTERNATE_UNIVERSE or AMBIGUOUS so you always know which body of material a claim comes from.",
        ],
        chars: ["jinx", "vi", "viktor", "mel"],
      },
      {
        title: "THE SISTERS",
        subtitle: "Vi and Jinx, either way",
        body: [
          "Both continuities agree on the essentials: two sisters from the undercity, an accident, and a separation that neither of them narrates the same way.",
          "In the main timeline Vi is a Warden with hextech gauntlets and Jinx is Piltover's most committed problem. The relationship is the constant.",
        ],
        chars: ["vi", "jinx", "caitlyn"],
        events: ["zaun-sump-disaster", "piltover-zaun-crisis"],
      },
      {
        title: "THE SHERIFF",
        subtitle: "Caitlyn after the crisis",
        body: [
          "Caitlyn's arc in both versions is about what enforcement becomes when procedure stops working.",
          "The main timeline's Sheriff of Piltover is the most capable investigator in the city and the most constrained by its boundaries.",
        ],
        chars: ["caitlyn", "vi", "camille"],
      },
      {
        title: "THE MACHINE HERALD",
        subtitle: "Viktor's two versions",
        body: [
          "Arcane's Viktor and Runeterra's Machine Herald begin from the same place: a brilliant scientist whose own body is failing.",
          "The main timeline takes the Glorious Evolution much further. It is a doctrine, it recruits, and Zaun is full of people with reasons to listen.",
        ],
        chars: ["viktor", "singed", "ekko"],
        events: ["glorious-evolution-begins"],
      },
      {
        title: "THE CHEMIST",
        subtitle: "Singed goes much further back",
        body: [
          "Singed's main-timeline record is longer and worse: he armed Noxus during the invasion of Ionia, and his chemical weapon is the reason a Noxian commander deserted.",
          "He is the thread that connects the undercity to a continental war.",
        ],
        chars: ["singed", "riven", "swain", "irelia"],
        events: ["the-place-of-blood"],
      },
      {
        title: "THE COUNCILLOR",
        subtitle: "Mel, and the Noxian thread",
        body: [
          "Mel Medarda is the bridge out of Piltover's politics and into Noxus's. A Medarda with latent magic on Piltover's council is exactly the kind of asset the Black Rose collects.",
          "This is the single most direct route from the Arcane material into the wider continent.",
        ],
        chars: ["mel", "leblanc", "swain"],
        events: ["black-rose-resurgence"],
      },
      {
        title: "THE UNDERCITY KEEPS GOING",
        subtitle: "Ekko, the Firelights and Camille",
        body: [
          "Ekko's Z-Drive, the Firelights and the clans' quiet enforcement are all live in the main timeline.",
          "Camille is the part of Piltover that Arcane viewers tend to underestimate: the clans have their own instrument, and it is not the Wardens.",
        ],
        chars: ["ekko", "camille", "vi"],
      },
      {
        title: "WHERE TO GO NEXT",
        subtitle: "Three doors out of Piltover",
        body: [
          "Follow Mel into Noxus and the Black Rose. Follow Singed into the Ionian war. Follow Viktor into the question of what Zaun becomes.",
          "Each of those is a different region, and each of them connects back to the two sisters within three steps.",
        ],
        chars: ["mel", "singed", "viktor", "swain", "irelia"],
      },
    ],
  },
  {
    slug: "war-of-the-sisters",
    title: "WAR OF THE SISTERS",
    subtitle: "Kayle, Morgana, and an argument older than Demacia",
    description:
      "Two sisters with identical power reached opposite conclusions about what people deserve. The kingdom they protected is still living inside their disagreement.",
    accentColor: "#8B7FC7",
    featured: false,
    verified: true,
    chapters: [
      {
        title: "TWO OF THE SAME",
        subtitle: "Born with celestial power",
        body: [
          "Kayle and Morgana were twins born to a Targonian mother among the refugees who would found Demacia. Both inherited the same celestial inheritance.",
          "Both used it to defend the settlement. That is where the agreement ends.",
        ],
        chars: ["kayle", "morgana"],
        events: ["mage-rebellion-founding"],
      },
      {
        title: "THE PROTECTORS",
        subtitle: "A settlement that needed defending",
        body: [
          "For a long time the arrangement worked. Two winged guardians, one vulnerable population, and a clear external threat.",
          "Problems arrive when the threat becomes internal and you have to decide what your own people deserve.",
        ],
        chars: ["kayle", "morgana", "garen"],
      },
      {
        title: "PURITY",
        subtitle: "Kayle's answer",
        body: [
          "Kayle's justice hardened into something absolute: pre-emptive, unmoved by circumstance, indifferent to intent.",
          "From inside that framework, mercy is indistinguishable from complicity.",
        ],
        chars: ["kayle"],
        events: ["kayle-morgana-split"],
      },
      {
        title: "MERCY",
        subtitle: "Morgana's answer",
        body: [
          "Morgana concluded that the people they protected were flawed, would remain flawed, and deserved protecting anyway.",
          "She bound part of her celestial nature to stay close to mortals. Her sister named that a fall, and the label has outlived every attempt to correct it.",
        ],
        chars: ["morgana"],
        events: ["kayle-morgana-split"],
      },
      {
        title: "THE KINGDOM IN BETWEEN",
        subtitle: "Demacia inherits the argument",
        body: [
          "Demacia venerates Kayle and built petricite walls to silence mages. It is, structurally, the sister who chose purity.",
          "Morgana's position — that the imprisoned still deserve consideration — is the argument Sylas is now making with weapons.",
        ],
        chars: ["kayle", "morgana", "sylas", "lux"],
        events: ["sylas-uprising"],
      },
      {
        title: "STILL UNFINISHED",
        subtitle: "Neither sister has conceded",
        body: [
          "Kayle eventually ascended past mortal concerns, which resolved the argument by removing her from it rather than by winning it.",
          "Morgana stayed. Centuries later both are still armed, and Demacia is still living inside a family dispute it never fully understood.",
        ],
        chars: ["kayle", "morgana"],
      },
    ],
  },
];

function buildChapters(pathSlug: string, chapters: ChapterSeed[]): StoryPathChapter[] {
  return chapters.map((c, i) => ({
    id: `chapter:${pathSlug}-${i + 1}`,
    order: i + 1,
    title: c.title,
    subtitle: c.subtitle,
    body: c.body,
    characterIds: c.chars.map((s) => `char:${s}`),
    eventIds: (c.events ?? []).map((s) => `event:${s}`),
    estimatedMinutes: c.minutes ?? 2,
    assetKey: c.asset ?? c.chars[0] ?? pathSlug,
  }));
}

export const storyPaths: StoryPath[] = seeds.map((s) => {
  const chapters = buildChapters(s.slug, s.chapters);
  const characterIds = Array.from(
    new Set(chapters.flatMap((c) => c.characterIds)),
  );
  return {
    id: `story:${s.slug}`,
    universeId: RUNETERRA_ID,
    slug: s.slug,
    title: s.title,
    subtitle: s.subtitle,
    description: s.description,
    accentColor: s.accentColor,
    characterIds,
    chapters,
    estimatedMinutes: chapters.reduce((sum, c) => sum + c.estimatedMinutes, 0),
    featured: s.featured ?? false,
    verified: s.verified ?? false,
  };
});

export const storyPathBySlug = new Map(storyPaths.map((s) => [s.slug, s]));

export function storyPathsForCharacter(characterId: string): StoryPath[] {
  return storyPaths.filter((p) => p.characterIds.includes(characterId));
}
