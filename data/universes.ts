import type { Universe } from "@/types";

export const RUNETERRA_ID = "universe:runeterra";

export const universes: Universe[] = [
  {
    id: RUNETERRA_ID,
    slug: "runeterra",
    name: "Runeterra",
    displayName: "RUNETERRA",
    tagline: "Every character. Every conflict. Every connection.",
    description:
      "A world of warring nations, buried empires and magic that refuses to stay buried. Runeterra's stories rarely stay inside one border — which is exactly why they are worth mapping.",
    accentColor: "#C9A96E",
    active: true,
  },
];

export const activeUniverse = universes[0];
