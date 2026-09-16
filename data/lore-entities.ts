import type { Entity } from "@/types";
import { RUNETERRA_ID } from "./universes";

export interface LoreEntity extends Entity {
  type: "concept";
  shortDescription: string;
  longDescription: string;
  /** Champion slugs with a documented structural link to this concept. */
  characterSlugs: string[];
  /** Optional event slugs that anchor this concept. */
  eventSlugs: string[];
  accentColor: string;
  connectEligible?: boolean;
}

const entitySeeds: Array<Omit<LoreEntity, "type" | "universeId" | "verified">> = [
  {
    id: "concept:ascended",
    slug: "ascended",
    name: "The Ascended",
    importance: 88,
    shortDescription:
      "Mortals elevated by Shurima's Sun Disc to fight the Void — the origin of both guardians and Darkin.",
    longDescription:
      "The Rite of Ascension created Runeterra's first god-warriors. Many were corrupted into Darkin; others, like Nasus and Renekton, remember the empire that made them.",
    characterSlugs: ["aatrox", "nasus", "azir", "varus", "renekton"],
    eventSlugs: ["ascension-ritual", "darkin-corruption", "void-incursion"],
    accentColor: "#D1A65C",
  },
  {
    id: "concept:void",
    slug: "void",
    name: "The Void",
    importance: 92,
    shortDescription:
      "An extradimensional hunger that broke through at Icathia and reshaped survivors into something else.",
    longDescription:
      "The Void is the through-line connecting Ascended wars, Kai'Sa's survival, and much of Runeterra's oldest catastrophes.",
    characterSlugs: ["aatrox", "kaisa", "nasus", "kog-maw"],
    eventSlugs: ["void-incursion", "void-breach-icathia"],
    accentColor: "#8A5FC9",
  },
  {
    id: "concept:darkin",
    slug: "darkin",
    name: "The Darkin",
    importance: 85,
    shortDescription:
      "Ascended who curdled into weapon-bound horrors and were sealed after the Darkin War.",
    longDescription:
      "Aatrox and Varus share this origin — not friendship, but the same catastrophic category of being.",
    characterSlugs: ["aatrox", "varus"],
    eventSlugs: ["darkin-corruption", "darkin-war"],
    accentColor: "#A8434A",
  },
  {
    id: "concept:mage-rebellion",
    slug: "mage-rebellion",
    name: "Mage Rebellion",
    importance: 78,
    shortDescription:
      "Demacia's crackdown on magic and the uprising Sylas led from inside its prisons.",
    longDescription:
      "Lux's privilege and Sylas's imprisonment are two faces of the same Demacian contradiction about magic.",
    characterSlugs: ["lux", "sylas", "garen", "morgana"],
    eventSlugs: ["mage-rebellion-founding", "sylas-uprising"],
    accentColor: "#D8B978",
  },
  {
    id: "concept:aspect-of-war",
    slug: "aspect-of-war",
    name: "Aspect of War",
    importance: 82,
    shortDescription:
      "The Targonian celestial that fought in the Darkin War — later hosted by Atreus, who survived its death.",
    longDescription:
      "The Aspect of War is not Atreus. It is the celestial entity that inhabited him for years, intervened in ancient conflicts including the sealing of the Darkin, and was destroyed millennia later when Aatrox returned.",
    characterSlugs: ["pantheon"],
    eventSlugs: ["darkin-war", "aatrox-pantheon-duel"],
    accentColor: "#8B7FC7",
    connectEligible: true,
  },
  {
    id: "concept:ruination",
    slug: "ruination",
    name: "The Ruination",
    importance: 86,
    shortDescription:
      "The Black Mist born when Viego shattered the Blessed Isles — undeath spread across the Shadow Isles.",
    longDescription:
      "Thresh, Senna, Viego and Kalista's stories converge on the same historical wound.",
    characterSlugs: ["thresh", "senna", "viego", "kalista"],
    eventSlugs: ["the-ruination", "viego-awakening"],
    accentColor: "#4FA88C",
  },
];

export const loreEntities: LoreEntity[] = entitySeeds.map((e) => ({
  ...e,
  type: "concept" as const,
  universeId: RUNETERRA_ID,
  verified: true,
  connectEligible: e.connectEligible ?? true,
}));

export const loreEntityById = new Map(loreEntities.map((e) => [e.id, e]));
export const loreEntityBySlug = new Map(loreEntities.map((e) => [e.slug, e]));
