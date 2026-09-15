import type { Region } from "@/types";
import { RUNETERRA_ID } from "./universes";

/**
 * Region accents stay desaturated on purpose — they read as metal and pigment,
 * not neon. See app/globals.css for how they are consumed.
 */
export const regions: Region[] = [
  {
    id: "region:demacia",
    universeId: RUNETERRA_ID,
    type: "region",
    slug: "demacia",
    name: "Demacia",
    importance: 82,
    verified: true,
    shortDescription:
      "A proud, law-bound kingdom built on unity — and on the suppression of magic.",
    longDescription:
      "Demacia was founded by refugees of a mage war and grew into the most disciplined military power in Valoran. Its strength is its cohesion; its fault line is the petricite that keeps mages silent. When that silence broke, it broke from the inside.",
    accentColor: "#D8B978",
    secondaryColor: "#5B6A8C",
    icon: "shield",
  },
  {
    id: "region:noxus",
    universeId: RUNETERRA_ID,
    type: "region",
    slug: "noxus",
    name: "Noxus",
    importance: 88,
    verified: true,
    shortDescription:
      "A brutal meritocracy where strength is the only inheritance that counts.",
    longDescription:
      "Noxus does not care where you were born. It cares what you can take. Beneath the expansionist war machine sits a quieter power — the Black Rose — which has been steering the empire for far longer than most Noxians would believe.",
    accentColor: "#A03041",
    secondaryColor: "#3A1620",
    icon: "blade",
  },
  {
    id: "region:ionia",
    universeId: RUNETERRA_ID,
    type: "region",
    slug: "ionia",
    name: "Ionia",
    importance: 85,
    verified: true,
    shortDescription:
      "A land of spirit and balance, still bleeding from the war it was forced to fight.",
    longDescription:
      "Ionia was never meant to have an army. The Noxian invasion gave it one, and the province has never fully reconciled the peace it preaches with the violence it learned. Every Ionian champion is, in some way, an answer to that contradiction.",
    accentColor: "#C77FA8",
    secondaryColor: "#3E2A47",
    icon: "leaf",
  },
  {
    id: "region:piltover",
    universeId: RUNETERRA_ID,
    type: "region",
    slug: "piltover",
    name: "Piltover",
    importance: 80,
    verified: true,
    shortDescription:
      "The City of Progress — wealthy, inventive and built directly above its own consequences.",
    longDescription:
      "Piltover turned hextech into an economy. Its academies, clans and Wardens keep the surface orderly, but the city's prosperity is inseparable from the undercity it depends on and refuses to look at.",
    accentColor: "#C9A34E",
    secondaryColor: "#4A3A20",
    icon: "gear",
  },
  {
    id: "region:zaun",
    universeId: RUNETERRA_ID,
    type: "region",
    slug: "zaun",
    name: "Zaun",
    importance: 80,
    verified: true,
    shortDescription:
      "The undercity: unregulated, inventive, poisonous and fiercely alive.",
    longDescription:
      "Zaun has no council and no permission. What it has is chem-barons, back-alley genius and a population that learned to breathe the Gray. Most of Piltover's brightest ideas are only legal because Zaun tested them first.",
    accentColor: "#5FA86B",
    secondaryColor: "#1E3324",
    icon: "flask",
  },
  {
    id: "region:shurima",
    universeId: RUNETERRA_ID,
    type: "region",
    slug: "shurima",
    name: "Shurima",
    importance: 86,
    verified: true,
    shortDescription:
      "A fallen empire under the sand, whose immortals are waking up.",
    longDescription:
      "Shurima ascended mortals into gods and then lost everything in a single afternoon of betrayal. Its ruins are still radioactive with old power, and the beings who survived the fall are now competing to decide what rises next.",
    accentColor: "#D1A65C",
    secondaryColor: "#4C3A1C",
    icon: "sun",
  },
  {
    id: "region:targon",
    universeId: RUNETERRA_ID,
    type: "region",
    slug: "targon",
    name: "Targon",
    importance: 78,
    verified: true,
    shortDescription:
      "A mountain at the edge of the world where celestial beings borrow mortal bodies.",
    longDescription:
      "Mount Targon is less a place than a threshold. Those who climb it and survive may be chosen by an Aspect — a celestial intelligence that grants power and, in return, uses a life. Targon's conflicts are cosmic, and they spill downward.",
    accentColor: "#8B7FC7",
    secondaryColor: "#2B2545",
    icon: "star",
  },
  {
    id: "region:freljord",
    universeId: RUNETERRA_ID,
    type: "region",
    slug: "freljord",
    name: "Freljord",
    importance: 74,
    verified: true,
    shortDescription:
      "Three warring tribal claims over one frozen, ancient and dangerous inheritance.",
    longDescription:
      "The Freljord's clans fight over territory, but the real contest is over memory: who the Three Sisters were, what was sealed beneath the ice, and which version of that story gets to rule.",
    accentColor: "#7FA8C7",
    secondaryColor: "#20323F",
    icon: "snowflake",
  },
  {
    id: "region:shadow-isles",
    universeId: RUNETERRA_ID,
    type: "region",
    slug: "shadow-isles",
    name: "Shadow Isles",
    importance: 84,
    verified: true,
    shortDescription:
      "A drowned kingdom wrapped in the Black Mist, where nothing is allowed to finish dying.",
    longDescription:
      "Once the Blessed Isles, home to the world's greatest archive of magic. One king's refusal to accept a death turned it into a spreading undeath. The Ruination did not simply kill the Isles — it made them contagious.",
    accentColor: "#4FA88C",
    secondaryColor: "#123028",
    icon: "ghost",
  },
  {
    id: "region:void",
    universeId: RUNETERRA_ID,
    type: "region",
    slug: "void",
    name: "Void",
    importance: 76,
    verified: true,
    shortDescription:
      "Not a nation. A hunger beneath reality that keeps finding new doors.",
    longDescription:
      "The Void is the oldest antagonist in Runeterra's history — the reason mortals were ascended into gods in the first place. It does not negotiate, and the places where it has touched the world never fully close.",
    accentColor: "#8A5FC9",
    secondaryColor: "#2A1B44",
    icon: "eye",
  },
  {
    id: "region:ixtal",
    universeId: RUNETERRA_ID,
    type: "region",
    slug: "ixtal",
    name: "Ixtal",
    importance: 52,
    verified: true,
    shortDescription:
      "An isolationist elemental nation hidden inside the jungle it commands.",
    longDescription:
      "Ixtal withdrew from the world rather than share what it knows. Its elemental magic is among the most refined on the continent, and almost none of it leaves the canopy.",
    accentColor: "#6FA85C",
    secondaryColor: "#25341C",
    icon: "sprout",
  },
  {
    id: "region:bilgewater",
    universeId: RUNETERRA_ID,
    type: "region",
    slug: "bilgewater",
    name: "Bilgewater",
    importance: 58,
    verified: true,
    shortDescription:
      "A lawless port city that trades in everything, including the Shadow Isles' leftovers.",
    longDescription:
      "Bilgewater is close enough to the Shadow Isles that the Harrowing is a seasonal event rather than a legend. Fortune is made and lost here in the same night, and the city's politics are decided by whoever is still standing.",
    accentColor: "#C98A4E",
    secondaryColor: "#43281A",
    icon: "anchor",
  },
  {
    id: "region:bandle-city",
    universeId: RUNETERRA_ID,
    type: "region",
    slug: "bandle-city",
    name: "Bandle City",
    importance: 40,
    verified: true,
    shortDescription:
      "A spirit realm of yordles that overlaps Runeterra without quite belonging to it.",
    longDescription:
      "Bandle City exists alongside the material world rather than inside it. Yordles cross over freely; mortals almost never find the way in on purpose.",
    accentColor: "#B98FC7",
    secondaryColor: "#332740",
    icon: "sprout",
  },
  {
    id: "region:runeterra",
    universeId: RUNETERRA_ID,
    type: "region",
    slug: "runeterra",
    name: "Runeterra",
    importance: 30,
    verified: true,
    shortDescription: "Unbound to any single nation.",
    longDescription:
      "Some figures belong to the world rather than to a country — wanderers, cosmic entities and those whose homeland no longer exists in any recognisable form.",
    accentColor: "#C9A96E",
    secondaryColor: "#2A2A33",
    icon: "star",
  },
];

export const regionBySlug = new Map(regions.map((r) => [r.slug, r]));

/** Regions surfaced in the Discover "Explore by Region" rail, in order. */
export const featuredRegionSlugs = [
  "demacia",
  "noxus",
  "ionia",
  "piltover",
  "zaun",
  "shurima",
  "targon",
  "freljord",
  "shadow-isles",
  "void",
] as const;
