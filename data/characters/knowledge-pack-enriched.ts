import type { CharacterSeed } from "./build";

/**
 * Champions enriched from Knowledge Pack v1 source registry.
 * Curated profiles that replace expansion stubs without overwriting Tier A roster.
 */
export const knowledgePackEnrichedSeeds: CharacterSeed[] = [
  {
    slug: "locke",
    name: "Locke",
    title: "The Ashen Exorcist",
    region: "demacia",
    factions: ["demacia"],
    roles: ["Exorcist", "Occultist", "Demacian Outcast"],
    gameplayRoles: ["Assassin", "Mage"],
    status: "Alive",
    species: "Human",
    aliases: ["Corvin Locke", "The Ashen Exorcist"],
    releaseYear: null,
    complexity: 4,
    featured: true,
    importance: 76,
    popularity: 68,
    verified: false,
    completenessTier: "B",
    needsResearch: true,
    sources: ["source:bio-locke", "source:wiki-locke"],
    tags: ["demacia", "exorcist", "occult", "demons", "mageseekers"],
    short:
      "A Demacian nail-slinging exorcist who learned that demons are often the consequence of human darkness, not its cause.",
    long: [
      "Corvin Locke was born into Demacian occultism — a world of hidden rites and public piety that taught him early to distrust both. His family traded in forbidden knowledge while preaching the kingdom's anti-magic doctrine, and Locke grew up understanding that hypocrisy is a kind of possession.",
      "He became an exorcist versed in rites Demacia would never officially sanction. His weapons are nails, ash, and a practitioner's contempt for easy answers. Where the Mageseekers see magic to be contained, Locke often sees trauma that invited something worse.",
      "His crusade is not against demons alone but against the lie that Demacia's cruelty is purely righteous. That makes him dangerous to the order he sometimes serves and indispensable to the people it fails.",
    ],
    timeline: [
      {
        era: "Modern Demacia",
        title: "Born into lies",
        description:
          "Raised among occultists who hid their craft behind the kingdom's anti-magic façade.",
      },
      {
        era: "Modern Demacia",
        title: "The ashen exorcist",
        description:
          "He hones forbidden rites into a profession — hunting what Demacia's laws created room for.",
      },
      {
        era: "Modern Demacia",
        title: "Demons as consequence",
        description:
          "Locke concludes that humanity's darkness invites infernal answers; exorcism is damage control, not salvation.",
      },
    ],
  },
  {
    slug: "zaahen",
    name: "Zaahen",
    title: "The Unsundered",
    region: "shurima",
    factions: ["darkin"],
    roles: ["Darkin", "Hunter of Darkin", "Former Ascended"],
    gameplayRoles: ["Fighter"],
    status: "Alive",
    species: "Darkin",
    aliases: ["The Unsundered"],
    releaseYear: null,
    complexity: 4,
    featured: true,
    importance: 80,
    popularity: 70,
    verified: false,
    completenessTier: "B",
    needsResearch: true,
    sources: ["source:bio-zaahen", "source:wiki-zaahen"],
    events: ["darkin-war", "darkin-corruption"],
    tags: ["shurima", "darkin", "ascended", "glaive", "corruption"],
    short:
      "A fallen god who sealed himself inside his glaive to resist Darkin madness — and now hunts the kin he once called brothers.",
    long: [
      "Zaahen was among the Ascended who survived Shurima's longest wars only to face a worse enemy: the corruption that turned heroes into Darkin. Where others embraced appetite, he chose imprisonment — willingly binding himself inside his weapon to stave off madness.",
      "He walked free again with his nobility intact and his purpose narrowed. The Unsundered now hunts fellow Darkin, treating each encounter as both execution and memorial for what the Ascended were meant to be.",
      "His story sits at the fracture between Shurima's golden age and its longest catastrophe. He remembers the empire that made him and refuses to let its horrors pretend they were always inevitable.",
    ],
    timeline: [
      {
        era: "Ancient Shurima",
        title: "Raised Ascended",
        description:
          "Elevated through Shurima's rites to fight threats mortal armies could not survive.",
        event: "ascension-ritual",
      },
      {
        era: "Ancient Shurima",
        title: "The Darkin turn",
        description:
          "As his kin curdled into weapons and appetites, Zaahen chooses self-imprisonment over surrender.",
        event: "darkin-corruption",
      },
      {
        era: "Ancient Shurima",
        title: "The Darkin War",
        description:
          "He fights in the war that forces Shurima and Targon to treat their own gods as enemies.",
        event: "darkin-war",
        with: ["aatrox", "varus"],
      },
      {
        era: "Modern Runeterra",
        title: "Hunter of the Unsundered",
        description:
          "Free again, he pursues Darkin not as a conqueror but as a survivor refusing the same fall.",
        with: ["aatrox", "varus"],
      },
    ],
  },
];
