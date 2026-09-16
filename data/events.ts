import { normalizeCanonStatus } from "@/lib/canon/model";
import type { LoreEvent, RegionSlug } from "@/types";
import { RUNETERRA_ID } from "./universes";

export const charId = (slug: string) => `char:${slug}`;
export const eventId = (slug: string) => `event:${slug}`;

interface EventSeed {
  slug: string;
  title: string;
  description: string;
  era: string;
  order: number;
  importance: number;
  characters: string[];
  regions: RegionSlug[];
  canonStatus?: LoreEvent["canonStatus"];
  verified?: boolean;
  connectEligible?: boolean;
}

/**
 * A single shared spine of eras. Character timelines reference these so that
 * "when did this happen relative to that" is answerable across the graph.
 */
const seeds: EventSeed[] = [
  {
    slug: "celestial-age",
    title: "The Celestial Age",
    description:
      "Before nations, before names. Cosmic entities shape and argue over the stars, long before mortals are in a position to notice.",
    era: "Before Reckoning",
    order: 10,
    importance: 70,
    characters: ["aurelion-sol", "kayle", "morgana"],
    regions: ["targon", "runeterra"],
    connectEligible: false,
  },
  {
    slug: "star-forger-bound",
    title: "The Star Forger is Bound",
    description:
      "The Aspects of Targon trick a star-shaping dragon into service, binding his power to a crown and using him as an instrument.",
    era: "Before Reckoning",
    order: 20,
    importance: 78,
    characters: ["aurelion-sol"],
    regions: ["targon"],
  },
  {
    slug: "void-incursion",
    title: "The First Void Incursion",
    description:
      "Something beneath the world tears through into it. Mortal armies fail, and Shurima is forced to answer with something other than soldiers.",
    era: "Ancient Shurima",
    order: 30,
    importance: 88,
    characters: ["aatrox", "nasus", "varus"],
    regions: ["shurima", "void"],
  },
  {
    slug: "ascension-ritual",
    title: "The Rite of Ascension",
    description:
      "Shurima's Sun Disc elevates its greatest champions into god-warriors. The Ascended win the war and become the empire's living monuments.",
    era: "Ancient Shurima",
    order: 40,
    importance: 90,
    characters: ["aatrox", "nasus", "azir", "renekton"],
    regions: ["shurima"],
  },
  {
    slug: "darkin-corruption",
    title: "The Darkin Turn",
    description:
      "Centuries of unending war hollow out some of the Ascended. Immortality curdles into appetite, and Shurima's heroes become its problem.",
    era: "Ancient Shurima",
    order: 50,
    importance: 92,
    characters: ["aatrox", "varus"],
    regions: ["shurima"],
  },
  {
    slug: "darkin-war",
    title: "The Darkin War",
    description:
      "The empire turns on its own gods. Targon intervenes, and the surviving Darkin are not killed but sealed inside the weapons they fought with.",
    era: "Ancient Shurima",
    order: 60,
    importance: 95,
    characters: ["aatrox", "varus", "nasus"],
    regions: ["shurima", "targon"],
  },
  {
    slug: "fall-of-shurima",
    title: "The Fall of Shurima",
    description:
      "On the day of Azir's own Ascension, his most trusted general betrays him. The ritual misfires, the capital sinks, and an empire ends in an afternoon.",
    era: "Fall of Shurima",
    order: 70,
    importance: 94,
    characters: ["azir", "nasus", "xerath", "renekton"],
    regions: ["shurima"],
  },
  {
    slug: "rune-wars",
    title: "The Rune Wars",
    description:
      "World Runes are used as weapons. Whole regions are unmade, and the survivors agree — mostly — that the Runes must never be gathered again.",
    era: "Rune Wars",
    order: 80,
    importance: 86,
    characters: ["ryze", "mordekaiser"],
    regions: ["runeterra", "void"],
  },
  {
    slug: "iron-revenant-empire",
    title: "The Iron Revenant's First Empire",
    description:
      "A warlord conquers the living, is killed, and refuses the consequence — returning with an army made from the souls he took.",
    era: "Rune Wars",
    order: 90,
    importance: 84,
    characters: ["mordekaiser", "ryze", "kalista"],
    regions: ["runeterra", "shadow-isles"],
  },
  {
    slug: "kalista-betrayal",
    title: "The Spear of Vengeance",
    description:
      "A loyal general is murdered for insisting on an uncomfortable truth, and returns as an oath-bound engine of retribution.",
    era: "Rune Wars",
    order: 100,
    importance: 76,
    characters: ["kalista", "thresh"],
    regions: ["shadow-isles"],
  },
  {
    slug: "blessed-isles",
    title: "The Blessed Isles",
    description:
      "An island kingdom becomes the world's greatest archive of magic, its Waters of Life guarded by the Masks and studied by its keepers.",
    era: "The Blessed Isles",
    order: 110,
    importance: 82,
    characters: ["viego", "thresh", "kalista", "ryze"],
    regions: ["shadow-isles"],
  },
  {
    slug: "the-ruination",
    title: "The Ruination",
    description:
      "A king refuses his wife's death and forces the Waters of Life to undo it. The magic inverts, the Isles drown in Black Mist, and nothing there is allowed to finish dying.",
    era: "The Ruination",
    order: 120,
    importance: 96,
    characters: ["viego", "thresh", "kalista", "senna", "lucian", "yorick"],
    regions: ["shadow-isles"],
  },
  {
    slug: "thresh-ascent",
    title: "The Chain Warden",
    description:
      "A warden of the Isles' archives, already cruel before the Mist, becomes its most deliberate torturer — collecting souls rather than merely taking them.",
    era: "The Ruination",
    order: 130,
    importance: 80,
    characters: ["thresh", "senna", "lucian"],
    regions: ["shadow-isles"],
  },
  {
    slug: "frostguard-sealing",
    title: "What Was Sealed Beneath the Ice",
    description:
      "The Freljord's oldest conflict ends with something buried and a version of the story agreed upon. One of the Three Sisters keeps the key.",
    era: "Ancient Freljord",
    order: 140,
    importance: 78,
    characters: ["lissandra", "ashe", "trundle"],
    regions: ["freljord"],
  },
  {
    slug: "targon-solari-purge",
    title: "The Solari Ascendancy",
    description:
      "Targon's sun faith consolidates power and writes the moon faith out of its scriptures — violently, and not entirely successfully.",
    era: "Old Targon",
    order: 150,
    importance: 72,
    characters: ["leona", "diana"],
    regions: ["targon"],
  },
  {
    slug: "mage-rebellion-founding",
    title: "The Founding of Demacia",
    description:
      "Refugees from a mage war build a kingdom on petricite and unity, and encode their fear of magic into its walls.",
    era: "Founding of Demacia",
    order: 160,
    importance: 80,
    characters: ["garen", "lux", "sylas"],
    regions: ["demacia"],
  },
  {
    slug: "kayle-morgana-split",
    title: "The War of the Sisters",
    description:
      "Two winged protectors of the same city disagree about what justice is owed to the people they guard, and stop speaking with words.",
    era: "Founding of Demacia",
    order: 170,
    importance: 84,
    characters: ["kayle", "morgana"],
    regions: ["demacia", "targon"],
  },
  {
    slug: "noxian-rise",
    title: "The Rise of Noxus",
    description:
      "A city-state built on merit turns its meritocracy outward. Conquest becomes the national industry, and generals become the aristocracy.",
    era: "Modern Noxus",
    order: 180,
    importance: 84,
    characters: ["swain", "darius", "katarina", "draven"],
    regions: ["noxus"],
  },
  {
    slug: "swain-coup",
    title: "The Grand General's Coup",
    description:
      "A disgraced general returns from a catastrophic defeat with a demon's arm and a better idea of who Noxus's real enemy is.",
    era: "Modern Noxus",
    order: 190,
    importance: 88,
    characters: ["swain", "leblanc", "darius"],
    regions: ["noxus"],
  },
  {
    slug: "black-rose-resurgence",
    title: "The Black Rose Moves",
    description:
      "The cabal that has steered Noxus for centuries is finally recognised by the man it tried to install, and the two begin a much quieter war.",
    era: "Modern Noxus",
    order: 200,
    importance: 90,
    characters: ["leblanc", "swain", "mel", "vladimir"],
    regions: ["noxus"],
  },
  {
    slug: "noxian-invasion-ionia",
    title: "The Noxian Invasion of Ionia",
    description:
      "Noxus invades a land with no standing army. Ionia wins, eventually, by becoming something it had spent centuries avoiding.",
    era: "Ionian War",
    order: 210,
    importance: 92,
    characters: [
      "irelia",
      "karma",
      "swain",
      "riven",
      "yasuo",
      "singed",
      "akali",
      "shen",
      "kennen",
      "jhin",
    ],
    regions: ["ionia", "noxus"],
  },
  {
    slug: "the-place-of-blood",
    title: "A Weapon Turned on Its Own Army",
    description:
      "A Noxian commander watches her own side deploy a chemical weapon on the battlefield she stands on, and breaks her sword rather than carry it further.",
    era: "Ionian War",
    order: 220,
    importance: 82,
    characters: ["riven", "singed", "swain", "yasuo"],
    regions: ["ionia", "noxus"],
  },
  {
    slug: "elder-killing",
    title: "The Death of an Elder",
    description:
      "An Ionian elder is murdered, the wrong student is blamed, and two brothers end up on opposite sides of a judgement neither of them chose.",
    era: "Ionian War",
    order: 230,
    importance: 86,
    characters: ["yasuo", "yone", "riven"],
    regions: ["ionia"],
  },
  {
    slug: "brothers-duel",
    title: "The Brothers' Duel",
    description:
      "A brother hunts a brother for an execution, and the wrong one survives the encounter.",
    era: "Ionian War",
    order: 240,
    importance: 88,
    characters: ["yasuo", "yone"],
    regions: ["ionia"],
  },
  {
    slug: "kinkou-fracture",
    title: "The Fracture of the Kinkou",
    description:
      "The Order that guards Ionia's balance splits over whether balance can be defended passively while the province burns.",
    era: "Ionian War",
    order: 250,
    importance: 74,
    characters: ["shen", "akali", "zed", "kennen"],
    regions: ["ionia"],
  },
  {
    slug: "syndra-unbound",
    title: "A Power Nobody Agreed to Teach",
    description:
      "An Ionian girl's raw magic frightens everyone tasked with guiding it, and the containment they choose becomes the reason she stops accepting limits.",
    era: "Ionian War",
    order: 260,
    importance: 72,
    characters: ["syndra", "karma"],
    regions: ["ionia"],
  },
  {
    slug: "hextech-revolution",
    title: "The Hextech Revolution",
    description:
      "Piltover industrialises magic. The city floats on the profits; the undercity absorbs the runoff.",
    era: "Modern Piltover",
    order: 270,
    importance: 84,
    characters: ["viktor", "jayce", "caitlyn", "camille", "ekko"],
    regions: ["piltover", "zaun"],
  },
  {
    slug: "zaun-sump-disaster",
    title: "The Accident in the Sump",
    description:
      "An experiment in the undercity goes wrong, kills people who were never consulted, and rearranges several lives around a single afternoon.",
    era: "Modern Zaun",
    order: 280,
    importance: 78,
    characters: ["ekko", "jinx", "vi", "singed"],
    regions: ["zaun"],
  },
  {
    slug: "glorious-evolution-begins",
    title: "The Glorious Evolution Begins",
    description:
      "A Zaunite scientist concludes that human frailty is the problem to be solved, and begins solving it on himself.",
    era: "Modern Zaun",
    order: 290,
    importance: 82,
    characters: ["viktor", "singed", "jayce"],
    regions: ["zaun", "piltover"],
  },
  {
    slug: "piltover-zaun-crisis",
    title: "The Piltover–Zaun Crisis",
    description:
      "A bomb, a bridge and a pair of sisters. The council's authority and the undercity's patience run out at the same time.",
    era: "Modern Piltover",
    order: 300,
    importance: 86,
    characters: ["jinx", "vi", "caitlyn", "ekko", "camille"],
    regions: ["piltover", "zaun"],
    canonStatus: "AMBIGUOUS",
    verified: false,
  },
  {
    slug: "shurima-risen",
    title: "Shurima Rises",
    description:
      "The buried capital pulls itself out of the sand, and the ruler who died beneath it comes back with a claim nobody living recognises.",
    era: "Modern Shurima",
    order: 310,
    importance: 90,
    characters: ["azir", "nasus", "xerath", "sivir", "renekton"],
    regions: ["shurima"],
  },
  {
    slug: "void-breach-icathia",
    title: "The Void Breach Widens",
    description:
      "The old wound in Shurima's south reopens. Survivors are rare, and the ones who come back are not unchanged.",
    era: "Modern Shurima",
    order: 320,
    importance: 84,
    characters: ["kaisa", "malzahar", "kassadin"],
    regions: ["shurima", "void"],
  },
  {
    slug: "sylas-uprising",
    title: "The Mage Uprising",
    description:
      "A mage raised as a hunting dog by the Mageseekers breaks out with the power he was taught to detect, and Demacia's fault line finally opens.",
    era: "Modern Demacia",
    order: 330,
    importance: 88,
    characters: ["sylas", "lux", "garen", "jarvan-iv"],
    regions: ["demacia"],
  },
  {
    slug: "aatrox-return",
    title: "The Return of the Darkin Blade",
    description:
      "A sword is picked up by someone who should not have picked it up, and the thing inside it starts walking again.",
    era: "Modern Runeterra",
    order: 340,
    importance: 92,
    characters: ["aatrox", "pantheon"],
    regions: ["runeterra", "shurima"],
  },
  {
    slug: "aatrox-pantheon-duel",
    title: "The Aspect Who Died Standing",
    description:
      "The Darkin Blade hunts down the Aspect of War who helped seal him and kills the mortal host — which turns out to be a different thing from killing the Aspect.",
    era: "Modern Runeterra",
    order: 350,
    importance: 90,
    characters: ["aatrox", "pantheon"],
    regions: ["targon", "runeterra"],
  },
  {
    slug: "pantheon-reborn",
    title: "A Mortal Keeps the Spear",
    description:
      "The host survives what the Aspect did not, and the fragment left behind belongs to the man rather than the star.",
    era: "Modern Runeterra",
    order: 360,
    importance: 86,
    characters: ["pantheon", "aatrox"],
    regions: ["targon"],
  },
  {
    slug: "viego-awakening",
    title: "The Ruined King Wakes",
    description:
      "The Mist finds a door and the king inside it steps through. What follows is not a war of conquest but of possession.",
    era: "Modern Runeterra",
    order: 370,
    importance: 94,
    characters: ["viego", "senna", "thresh", "kalista", "lucian"],
    regions: ["shadow-isles", "bilgewater", "runeterra"],
  },
  {
    slug: "senna-freed",
    title: "The Soul Taken Out of the Lantern",
    description:
      "A Sentinel trapped inside the Chain Warden's lantern is pulled back out into a body that carries the Mist with it.",
    era: "Modern Runeterra",
    order: 380,
    importance: 84,
    characters: ["senna", "thresh", "lucian"],
    regions: ["shadow-isles"],
  },
  {
    slug: "mordekaiser-return",
    title: "The Iron Revenant Returns",
    description:
      "The tyrant who built a kingdom out of the dead claws back into the living world, and starts the project again from the beginning.",
    era: "Modern Runeterra",
    order: 390,
    importance: 88,
    characters: ["mordekaiser", "kayle", "viego"],
    regions: ["shadow-isles", "noxus"],
  },
  {
    slug: "akshan-sentinel",
    title: "The Absolver's Keeper",
    description:
      "A Shuriman rogue inherits a weapon capable of undoing a death, and a job description he mostly ignores.",
    era: "Modern Shurima",
    order: 400,
    importance: 66,
    characters: ["akshan", "senna"],
    regions: ["shurima"],
  },
  {
    slug: "vastaya-rebellion",
    title: "The Vastayan Question",
    description:
      "Ionia's vastaya decide that surviving the war does not obligate them to accept the peace that followed it.",
    era: "Modern Ionia",
    order: 410,
    importance: 64,
    characters: ["xayah", "ahri", "rakan"],
    regions: ["ionia"],
  },
  {
    slug: "jhin-released",
    title: "The Golden Demon is Released",
    description:
      "Ionia's most disciplined murderer is let out of prison by people who think he can be pointed at an enemy.",
    era: "Modern Ionia",
    order: 420,
    importance: 70,
    characters: ["jhin", "shen", "zed"],
    regions: ["ionia"],
  },
  {
    slug: "targon-aurelion-loose",
    title: "The Star Forger Slips the Leash",
    description:
      "The dragon Targon used as a tool begins working out how much of his binding is actually load-bearing.",
    era: "Modern Runeterra",
    order: 430,
    importance: 74,
    characters: ["aurelion-sol", "leona", "diana", "pantheon"],
    regions: ["targon", "runeterra"],
  },
];

export const events: LoreEvent[] = seeds.map((s) => ({
  id: eventId(s.slug),
  universeId: RUNETERRA_ID,
  type: "event",
  slug: s.slug,
  name: s.title,
  title: s.title,
  description: s.description,
  era: s.era,
  order: s.order,
  importance: s.importance,
  characterIds: s.characters.map(charId),
  regionSlugs: s.regions,
  canonStatus: normalizeCanonStatus(s.canonStatus),
  verified: s.verified ?? true,
  connectEligible: s.connectEligible ?? s.slug !== "celestial-age",
}));

export const eventById = new Map(events.map((e) => [e.id, e]));
export const eventBySlug = new Map(events.map((e) => [e.slug, e]));

/** Chronological era order, used by timelines and the Connect narrative scorer. */
export const eras: string[] = Array.from(
  events
    .slice()
    .sort((a, b) => a.order - b.order)
    .reduce((acc, e) => {
      if (!acc.has(e.era)) acc.set(e.era, true);
      return acc;
    }, new Map<string, boolean>())
    .keys(),
);
