import type { CharacterSeed } from "./build";

export const shurimaTargonSeeds: CharacterSeed[] = [
  {
    slug: "aatrox",
    name: "Aatrox",
    title: "The Darkin Blade",
    region: "shurima",
    factions: ["darkin", "ascended"],
    roles: ["Warrior", "Former Ascended", "Weapon"],
    status: "Imprisoned",
    species: "Darkin",
    aliases: ["The World Ender", "The Darkin Blade"],
    accentColor: "#A8434A",
    releaseYear: 2013,
    complexity: 4,
    featured: true,
    importance: 96,
    popularity: 88,
    verified: true,
    events: [
      "void-incursion",
      "ascension-ritual",
      "darkin-corruption",
      "darkin-war",
      "aatrox-return",
      "aatrox-pantheon-duel",
    ],
    tags: ["darkin", "ascended", "immortal", "sword", "targon-conflict", "void-war"],
    sources: ["source:twilight-of-the-gods", "source:awaken"],
    short:
      "Once Shurima's greatest champion, now the thing left inside his own sword — and the closest Runeterra has to an ending.",
    long: [
      "Aatrox was among the first mortals raised by Shurima's Sun Disc into an Ascended: a god-warrior who would later become one of Shurima's honored defenders against the Void. For a while, he was exactly what the empire needed. Statues were carved. Songs were written. The war went on long enough that neither stopped mattering, and then long enough that both did.",
      "Something in the Ascended broke during those centuries. Immortality without an end condition curdled into appetite, and the heroes who had saved Shurima became the reason it needed saving again. The mortals who had built them fought back, and Targon intervened — but killing a being like Aatrox turned out to be impossible. Instead he was sealed inside his own weapon, which is a very different kind of solution.",
      "Every sword needs a hand. When a mortal picks up Aatrox's blade, he takes the body and remakes it into a shape he recognises, wearing the wielder until there is nothing left to wear. He is not trying to conquer Runeterra. He wants out, and he has concluded that the world ending is the most reliable exit.",
      "That makes him less a villain with a plan than a consequence with a grudge — and it puts him permanently at odds with Targon, who built the cage.",
    ],
    timeline: [
      {
        era: "Ancient Shurima",
        title: "Raised as an Ascended",
        description:
          "Chosen as one of Shurima's god-warriors, given power by the Sun Disc long before the Void catastrophe would test that institution.",
        event: "ascension-ritual",
        with: ["nasus", "azir"],
      },
      {
        era: "Ancient Shurima",
        title: "The war against the Void",
        description:
          "Centuries at the front line against an enemy with no interest in surrender, and no reason to stop arriving.",
        event: "void-incursion",
        with: ["varus", "nasus"],
      },
      {
        era: "Ancient Shurima",
        title: "The Darkin turn",
        description:
          "Victory arrives and changes nothing. The hero curdles into something that needs the war to continue.",
        event: "darkin-corruption",
        with: ["varus"],
      },
      {
        era: "Ancient Shurima",
        title: "The Darkin War",
        description:
          "After Shurima's fall, surviving Ascended war among themselves. Mortals and Targonian Aspects join the effort to defeat or seal the Darkin.",
        event: "darkin-war",
        with: ["varus", "nasus"],
      },
      {
        era: "Ancient Shurima",
        title: "Sealed inside the blade",
        description:
          "Unkillable, so instead imprisoned — bound into the sword he fought with after Targon and the Aspect of War intervened.",
        event: "darkin-war",
      },
      {
        era: "Modern Runeterra",
        title: "The sword is picked up",
        description:
          "A mortal lifts the blade expecting a weapon. Aatrox takes the body and starts walking again.",
        event: "aatrox-return",
      },
      {
        era: "Modern Runeterra",
        title: "The duel with the Aspect of War",
        description:
          "He hunts down the Aspect who helped cage him and destroys the celestial power within Atreus — while the mortal host survives.",
        event: "aatrox-pantheon-duel",
        with: ["pantheon"],
      },
    ],
  },
  {
    slug: "pantheon",
    name: "Pantheon",
    title: "The Unbreakable Spear",
    region: "targon",
    factions: ["aspects", "solari"],
    roles: ["Warrior", "Aspect Host", "Mortal"],
    status: "Alive",
    species: "Human (Aspect fragment)",
    aliases: ["Atreus"],
    accentColor: "#8B7FC7",
    releaseYear: 2010,
    complexity: 4,
    featured: true,
    importance: 88,
    popularity: 74,
    verified: true,
    events: [
      "aatrox-pantheon-duel",
      "pantheon-reborn",
      "targon-aurelion-loose",
    ],
    tags: ["targon", "aspect", "celestial", "darkin-conflict", "mortal-defiance"],
    sources: ["source:twilight-of-the-gods"],
    short:
      "A mortal who was used as a god's armour, survived the god's death, and kept the spear anyway.",
    long: [
      "Atreus climbed Mount Targon as a nobody and came back down carrying the Aspect of War. For years the arrangement worked the way Targon's arrangements usually do: the celestial made the decisions, the mortal supplied the body, and the results were spectacular. The Aspect he hosted had already fought in the Darkin War long before Atreus was born — but Atreus inherited its memory, its enemies, and eventually its death.",
      "Then Aatrox came back for him. The Darkin Blade found the Aspect of War and killed it — properly, in a way that celestial beings are not supposed to be killable. Atreus was left alive on the ground, hollowed out, no longer anybody's vessel.",
      "What makes Pantheon interesting is what happened next. He should have been finished. Instead he got up and made a choice the celestials had never needed from him before: to fight as a man rather than as a mount, still able to wield the fallen Aspect's weapons through his own will.",
      "He is now the rare figure in Runeterra who has looked directly at both a god and a Darkin and concluded that neither of them is owed his obedience.",
    ],
    timeline: [
      {
        era: "Old Targon",
        title: "The climb",
        description:
          "A Rakkor boy climbs Mount Targon, survives the summit, and is chosen by the Aspect of War.",
      },
      {
        era: "Old Targon",
        title: "Hosting the Aspect of War",
        description:
          "Atreus becomes the mortal vessel for a celestial that already sealed Darkin in ancient Shurima — centuries before his own birth.",
      },
      {
        era: "Modern Runeterra",
        title: "The Aspect is killed",
        description:
          "Aatrox hunts him down and destroys the celestial riding him. The mortal host is left behind, alive.",
        event: "aatrox-pantheon-duel",
        with: ["aatrox"],
      },
      {
        era: "Modern Runeterra",
        title: "Atreus stands up",
        description:
          "He takes up the fallen Aspect's weapons through his own will — no longer a vessel, still a warrior.",
        event: "pantheon-reborn",
      },
      {
        era: "Modern Runeterra",
        title: "War against the heavens",
        description:
          "Having buried one god, he stops assuming the rest are entitled to anything from him either.",
        event: "targon-aurelion-loose",
        with: ["aurelion-sol", "leona", "diana"],
      },
    ],
  },
  {
    slug: "aurelion-sol",
    name: "Aurelion Sol",
    title: "The Star Forger",
    region: "targon",
    factions: ["celestials"],
    roles: ["Celestial Dragon", "Star Forger"],
    status: "Celestial",
    species: "Celestial Dragon",
    aliases: ["The Star Forger", "Ao Shin"],
    accentColor: "#8B7FC7",
    releaseYear: 2016,
    complexity: 4,
    featured: true,
    importance: 82,
    popularity: 62,
    verified: true,
    events: ["celestial-age", "star-forger-bound", "targon-aurelion-loose"],
    tags: ["celestial", "targon", "cosmic", "dragon", "bound-power"],
    short:
      "A dragon who used to make stars for fun, tricked into working for beings he considers interior decorators.",
    long: [
      "Aurelion Sol shaped stars because he could, scattering them across the sky with the casual authority of something that predates the concept of permission. He was not a servant of anyone. He was barely aware that 'anyone' was a category that could apply to him.",
      "Then the Aspects of Targon got involved. They flattered him, made him an offer, and bound his power to a crown — and the being who lit the heavens found himself running errands for a mountain. The indignity is arguably worse for him than the imprisonment.",
      "He is not, strictly speaking, evil. He is vast, vain, extremely old and entirely uninterested in mortal moral frameworks. He wants his freedom back, and he is prepared to be patient about it, because time is the one resource he has never had to budget.",
      "For LoreGraph purposes he is a useful node: almost every Targonian thread eventually touches him, because the Aspects' authority is partly built on what they took from him.",
    ],
    timeline: [
      {
        era: "Before Reckoning",
        title: "Forging stars",
        description:
          "Long before nations or names, he shapes stars across the void for no reason other than that he can.",
        event: "celestial-age",
      },
      {
        era: "Before Reckoning",
        title: "The bargain",
        description:
          "The Aspects of Targon flatter him into an agreement and bind his power to a crown he cannot remove.",
        event: "star-forger-bound",
      },
      {
        era: "Modern Runeterra",
        title: "Working the leash",
        description:
          "Bound but not obedient, he spends the modern era testing exactly how much of his cage is real.",
        event: "targon-aurelion-loose",
        with: ["pantheon", "leona", "diana"],
      },
    ],
  },
  {
    slug: "azir",
    name: "Azir",
    title: "The Emperor of the Sands",
    region: "shurima",
    factions: ["ascended", "shuriman-empire"],
    roles: ["Emperor", "Ascended"],
    status: "Ascended",
    aliases: ["The Emperor of the Sands"],
    species: "Ascended",
    releaseYear: 2014,
    complexity: 3,
    importance: 84,
    popularity: 58,
    verified: true,
    events: ["ascension-ritual", "fall-of-shurima", "shurima-risen"],
    tags: ["shurima", "ascended", "empire", "betrayal", "resurrection"],
    sources: ["source:rise"],
    short:
      "The last emperor of Shurima, betrayed at the moment of his Ascension and returned millennia later to a country that has moved on.",
    long: [
      "Azir inherited an empire at its height and wanted to be remembered as the ruler who made it just — beginning with the abolition of slavery, a policy his court considered dangerously sentimental. His closest confidant was Xerath, a slave-born magus whose brilliance had earned him proximity but not freedom.",
      "Azir chose to undergo the Rite of Ascension himself, an honour normally reserved for others. Xerath sabotaged it. The ritual misfired, Azir was destroyed, Xerath took the power, and Shurima's capital sank into the sand in a single afternoon.",
      "Millennia later Azir returned — Ascended at last, emperor of nothing, standing in a risen city surrounded by descendants who remember him as a myth rather than a monarch. He intends to rebuild. Whether anyone alive wants a god-emperor back is a separate question.",
    ],
    timeline: [
      {
        era: "Ancient Shurima",
        title: "Heir to an empire",
        description:
          "Raised to rule the largest empire Runeterra has produced, and quietly intent on reforming it.",
      },
      {
        era: "Fall of Shurima",
        title: "Betrayed at the Sun Disc",
        description:
          "His own Ascension is sabotaged by the man he trusted most. The ritual kills him and drowns the capital.",
        event: "fall-of-shurima",
        with: ["nasus"],
      },
      {
        era: "Modern Shurima",
        title: "Shurima rises",
        description:
          "He returns Ascended into a world that buried him, and begins reassembling a claim nobody living recognises.",
        event: "shurima-risen",
        with: ["nasus"],
      },
    ],
  },
  {
    slug: "nasus",
    name: "Nasus",
    title: "The Curator of the Sands",
    region: "shurima",
    factions: ["ascended", "shuriman-empire"],
    roles: ["Scholar", "Ascended", "Curator"],
    status: "Ascended",
    species: "Ascended",
    aliases: ["The Curator of the Sands"],
    releaseYear: 2009,
    complexity: 3,
    importance: 76,
    popularity: 52,
    verified: true,
    events: ["ascension-ritual", "void-incursion", "fall-of-shurima", "shurima-risen"],
    tags: ["shurima", "ascended", "scholar", "archive", "grief"],
    short:
      "Shurima's greatest scholar, Ascended into a war he did not want and left to curate the ruins of everything he tried to protect.",
    long: [
      "Nasus was a strategist and archivist before he was a god-warrior, and he never entirely stopped being the former. Ascension gave him the strength to defend the empire and the lifespan to watch it fail anyway.",
      "After the fall he stayed. Where other Ascended went mad, went missing, or went to war, Nasus took on the job of remembering — guarding what was left of Shurima's knowledge from looters, from the desert, and from the empire's own worst impulses.",
      "His grief is specific: his brother Renekton went into the Tomb of the Emperors with him and did not come out the same. That one decision shapes most of what Nasus has done since.",
    ],
    timeline: [
      {
        era: "Ancient Shurima",
        title: "Scholar before soldier",
        description:
          "Shurima's finest strategist and archivist, valued for his mind long before his strength.",
      },
      {
        era: "Ancient Shurima",
        title: "Ascended against the Void",
        description:
          "Raised by the Sun Disc and sent to the front. He wins, and keeps records of the cost.",
        event: "void-incursion",
        with: ["aatrox"],
      },
      {
        era: "Fall of Shurima",
        title: "The tomb",
        description:
          "In the chaos of the fall he seals a catastrophe away, and loses his brother to it in the process.",
        event: "fall-of-shurima",
        with: ["azir"],
      },
      {
        era: "Modern Shurima",
        title: "Curator of the sands",
        description:
          "He guards what remains of Shuriman knowledge while his emperor returns to rebuild the rest.",
        event: "shurima-risen",
        with: ["azir"],
      },
    ],
  },
  {
    slug: "varus",
    name: "Varus",
    title: "The Arrow of Retribution",
    region: "shurima",
    factions: ["darkin"],
    roles: ["Archer", "Darkin", "Weapon"],
    status: "Imprisoned",
    species: "Darkin",
    aliases: ["The Arrow of Retribution", "Valmar", "Kai"],
    accentColor: "#A8434A",
    releaseYear: 2012,
    complexity: 4,
    importance: 74,
    popularity: 50,
    verified: true,
    events: ["void-incursion", "darkin-corruption", "darkin-war"],
    tags: ["darkin", "ascended", "immortal", "bow", "possession", "ionia"],
    short:
      "A Darkin sealed inside a bow, sharing one body with the two lovers who were foolish enough to pick it up.",
    long: [
      "Like Aatrox, Varus was one of Shurima's Ascended — a defender turned into something that needed the war to keep going. When the Darkin were defeated he was bound into his bow and hidden away, and for centuries the arrangement held.",
      "It ended in Ionia. Two young lovers, Valmar and Kai, found the weapon while looking for a way to save each other. They took it up together, and Varus took them both. What walks now is one body with three sets of memories inside it, and the two mortals are still in there, arguing.",
      "That makes Varus the most intimate horror among the Darkin: not a monster wearing a corpse, but a monster sharing a home.",
    ],
    timeline: [
      {
        era: "Ancient Shurima",
        title: "Ascended defender",
        description: "Raised to fight the Void alongside Shurima's other god-warriors.",
        event: "void-incursion",
        with: ["aatrox"],
      },
      {
        era: "Ancient Shurima",
        title: "Corrupted",
        description: "Like the other Darkin, he outlives his purpose and becomes appetite.",
        event: "darkin-corruption",
        with: ["aatrox"],
      },
      {
        era: "Ancient Shurima",
        title: "Sealed into the bow",
        description: "Defeated in the Darkin War and imprisoned inside his own weapon.",
        event: "darkin-war",
        with: ["aatrox", "pantheon"],
      },
      {
        era: "Modern Ionia",
        title: "Two lovers, one body",
        description:
          "Valmar and Kai lift the bow to save each other. Varus takes the offer, and both of them with it.",
      },
    ],
  },
  {
    slug: "akshan",
    name: "Akshan",
    title: "The Rogue Sentinel",
    region: "shurima",
    factions: ["sentinels-of-light"],
    roles: ["Rogue", "Sentinel"],
    status: "Alive",
    species: "Human",
    aliases: ["The Rogue Sentinel"],
    releaseYear: 2021,
    complexity: 2,
    importance: 58,
    popularity: 44,
    events: ["akshan-sentinel", "shurima-risen"],
    tags: ["shurima", "sentinel", "rogue", "absolver", "resurrection"],
    short:
      "A Shuriman thief with a weapon that can undo a murder, and absolutely no interest in the paperwork that comes with it.",
    long: [
      "Akshan was raised in Shurima's slums and recruited into the Sentinels of Light, an order dedicated to fighting the Black Mist. He was not an obvious fit. He is flippant where they are solemn, improvisational where they are doctrinal, and allergic to hierarchy.",
      "He carries the Absolver, a relic that can reverse a death if he kills the one responsible for it. It is an extraordinary thing to hand to someone with his temperament, and he uses it exactly as you would expect: personally.",
      "In graph terms Akshan is a useful bridge — a modern Shuriman who is also plugged directly into the Sentinels and the Ruination storyline.",
    ],
    timeline: [
      {
        era: "Modern Shurima",
        title: "Raised in the slums",
        description: "Grows up stealing in Shurima's underclass, then loses the people who raised him.",
      },
      {
        era: "Modern Shurima",
        title: "The Absolver",
        description:
          "He inherits a weapon that can undo a death by ending the one who caused it — and a mandate he treats as optional.",
        event: "akshan-sentinel",
      },
      {
        era: "Modern Runeterra",
        title: "Sentinel, technically",
        description: "He works with the Sentinels of Light on his own terms, which is to say barely.",
        event: "viego-awakening",
        with: ["senna"],
      },
    ],
  },
  {
    slug: "kaisa",
    name: "Kai'Sa",
    title: "Daughter of the Void",
    region: "void",
    factions: ["void-touched"],
    roles: ["Hunter", "Survivor"],
    status: "Alive",
    species: "Human (Void-altered)",
    aliases: ["Kaisa", "Daughter of the Void"],
    accentColor: "#8A5FC9",
    releaseYear: 2018,
    complexity: 3,
    importance: 64,
    popularity: 78,
    verified: true,
    events: ["void-breach-icathia", "void-incursion"],
    tags: ["void", "shurima", "survivor", "symbiote", "hunter"],
    short:
      "Swallowed by the Void as a child and still alive — wearing a living second skin that keeps her breathing and won't come off.",
    long: [
      "Kai'Sa was Kaisa, a Shuriman girl, when the ground opened and took her village. She should have died in the dark like everybody else. Instead she survived long enough for the Void to adapt to her, and a symbiotic second skin grew over her to keep her alive.",
      "She hunts Void creatures now, mostly to stay alive and partly because it is the only thing she was ever taught. Her problem is not the Void; she has made a working peace with that. Her problem is the surface, where anyone who sees her assumes she is what she kills.",
      "She is one of the clearest bridges in the graph between Shurima and the Void — a human connection to a region that otherwise has no politics to connect to.",
    ],
    timeline: [
      {
        era: "Modern Shurima",
        title: "The ground opens",
        description:
          "Her village is taken by a Void incursion. She is the only one who does not stop moving.",
        event: "void-breach-icathia",
      },
      {
        era: "Modern Shurima",
        title: "The second skin",
        description:
          "A Void symbiote fuses to her, keeping her alive in the dark and marking her forever on the surface.",
      },
      {
        era: "Modern Runeterra",
        title: "Hunting her own reflection",
        description:
          "She kills Void creatures for a world that cannot tell the difference between her and them.",
      },
    ],
  },
  {
    slug: "leona",
    name: "Leona",
    title: "The Radiant Dawn",
    region: "targon",
    factions: ["solari", "aspects"],
    roles: ["Warrior", "Aspect Host", "Priestess"],
    status: "Alive",
    species: "Human (Aspect host)",
    aliases: ["The Radiant Dawn", "Aspect of the Sun"],
    releaseYear: 2011,
    complexity: 3,
    importance: 70,
    popularity: 56,
    verified: true,
    events: ["targon-solari-purge", "darkin-war", "targon-aurelion-loose"],
    tags: ["targon", "solari", "aspect", "faith", "duty"],
    short:
      "The Aspect of the Sun, and the most devout member of an order whose devotion she keeps having to reinterpret.",
    long: [
      "Leona was raised in the Solari and believed in it completely — right up to the point where believing in it required her to condemn a childhood friend. Her instinct then, and every time since, has been to take the hit herself rather than pass it on.",
      "Chosen as the Aspect of the Sun, she carries a celestial power that Targon treats as proof of orthodoxy. She increasingly treats it as a responsibility that does not answer to the priesthood.",
      "Her long conflict with Diana is not really theological. It is two people who grew up together being handed incompatible gods.",
    ],
    timeline: [
      {
        era: "Old Targon",
        title: "Raised Solari",
        description: "Trained as a warrior of the sun faith, and its most convincing believer.",
        with: ["diana"],
      },
      {
        era: "Old Targon",
        title: "Chosen by the Sun",
        description:
          "She climbs, survives, and returns bearing the Aspect of the Sun — and an authority the priesthood cannot overrule.",
      },
      {
        era: "Modern Runeterra",
        title: "Sun against Moon",
        description:
          "Her oldest friend returns carrying the faith the Solari erased, and Leona has to choose between them.",
        with: ["diana"],
      },
    ],
  },
  {
    slug: "diana",
    name: "Diana",
    title: "Scorn of the Moon",
    region: "targon",
    factions: ["lunari", "aspects"],
    roles: ["Warrior", "Aspect Host", "Heretic"],
    status: "Alive",
    species: "Human (Aspect host)",
    aliases: ["Scorn of the Moon", "Aspect of the Moon"],
    accentColor: "#7F8FC7",
    releaseYear: 2012,
    complexity: 3,
    importance: 68,
    popularity: 58,
    verified: true,
    events: ["targon-solari-purge", "targon-aurelion-loose"],
    tags: ["targon", "lunari", "aspect", "heresy", "truth"],
    short:
      "Raised by the Solari, chosen by the Moon, and now the walking proof that Targon's official history is a lie.",
    long: [
      "Diana grew up inside the Solari and asked the wrong questions. The answers she found pointed to the Lunari — a faith the sun priesthood had spent generations writing out of Targon's scriptures.",
      "She climbed the mountain to settle it, and came back as the Aspect of the Moon. The Solari called that heresy, which was the only response available to them, because the alternative was admitting they had been suppressing something true.",
      "Her violence is real and she does not apologise for it. But her core grievance is archival: she was lied to about her own history by the institution that raised her.",
    ],
    timeline: [
      {
        era: "Old Targon",
        title: "The wrong questions",
        description: "A Solari initiate finds records the order had buried, and refuses to stop reading.",
        with: ["leona"],
      },
      {
        era: "Old Targon",
        title: "Chosen by the Moon",
        description:
          "She climbs Targon and returns carrying the Aspect the Solari insist does not exist.",
      },
      {
        era: "Modern Runeterra",
        title: "Heresy with a sword",
        description:
          "Branded a heretic, she starts dismantling the order's authority — and collides with Leona.",
        with: ["leona"],
      },
    ],
  },
  {
    slug: "kayle",
    name: "Kayle",
    title: "The Righteous",
    region: "demacia",
    factions: ["aspects", "celestials"],
    roles: ["Judicator", "Aspect", "Protector"],
    status: "Celestial",
    species: "Aspect-descended",
    aliases: ["The Righteous", "The Judicator"],
    accentColor: "#D8B978",
    releaseYear: 2009,
    complexity: 3,
    importance: 72,
    popularity: 48,
    verified: true,
    events: ["celestial-age", "kayle-morgana-split", "mage-rebellion-founding", "mordekaiser-return"],
    tags: ["demacia", "targon", "aspect", "justice", "sisters"],
    short:
      "A winged protector who kept escalating her definition of justice until it stopped resembling protection.",
    long: [
      "Kayle and her twin sister Morgana were born to a Targonian mother and raised among the refugees who would found Demacia. Both inherited celestial power. Both used it to defend the settlement. That is where the agreement ends.",
      "Kayle's answer to wrongdoing became purity: pre-emptive, absolute, unmoved by circumstance. Morgana's answer became mercy, including for people Kayle had already condemned. The two spent centuries escalating against each other while the kingdom they built grew up around the argument.",
      "Kayle eventually ascended past mortal concerns entirely — which resolved the argument by removing her from it rather than by winning it.",
    ],
    timeline: [
      {
        era: "Founding of Demacia",
        title: "Two sisters, one duty",
        description:
          "Born with celestial power among refugees, she and Morgana defend the settlement that becomes Demacia.",
        event: "mage-rebellion-founding",
        with: ["morgana"],
      },
      {
        era: "Founding of Demacia",
        title: "Justice hardens",
        description:
          "Her judgement grows absolute. Mercy starts to look to her like complicity.",
        event: "kayle-morgana-split",
        with: ["morgana"],
      },
      {
        era: "Modern Runeterra",
        title: "Ascension",
        description:
          "She sheds what remained of her mortality, becoming something Demacia can pray to but not argue with.",
        with: ["morgana"],
      },
    ],
  },
  {
    slug: "morgana",
    name: "Morgana",
    title: "The Fallen",
    region: "demacia",
    factions: ["aspects", "celestials"],
    roles: ["Fallen Angel", "Protector", "Exile"],
    status: "Celestial",
    species: "Aspect-descended",
    aliases: ["The Fallen", "Mercy"],
    accentColor: "#8B7FC7",
    releaseYear: 2009,
    complexity: 3,
    importance: 70,
    popularity: 54,
    verified: true,
    events: ["celestial-age", "kayle-morgana-split", "mage-rebellion-founding"],
    tags: ["demacia", "aspect", "mercy", "sisters", "exile"],
    short:
      "Kayle's twin, who chose the people over the principle and was called fallen for it.",
    long: [
      "Morgana had the same power and the same job as her sister. She reached a different conclusion: that the people they were protecting were flawed, would stay flawed, and deserved protecting anyway.",
      "She bound away part of her own celestial nature to stay close to mortals, which Kayle read as corruption. The label stuck. 'The Fallen' is her sister's word for her, and it has outlived every attempt to correct it.",
      "She is, in practice, the more human of the two — and the more dangerous to Demacia's self-image, because her existence implies the kingdom's founding virtue had a dissenting author.",
    ],
    timeline: [
      {
        era: "Founding of Demacia",
        title: "The same gift",
        description: "She and Kayle defend the refugee settlement together with identical power.",
        event: "mage-rebellion-founding",
        with: ["kayle"],
      },
      {
        era: "Founding of Demacia",
        title: "Choosing mercy",
        description:
          "She binds part of her celestial self to stay with mortals, and her sister names it a fall.",
        event: "kayle-morgana-split",
        with: ["kayle"],
      },
      {
        era: "Modern Runeterra",
        title: "The unfinished argument",
        description:
          "Centuries later the disagreement is still live, and both sisters are still armed.",
        with: ["kayle"],
      },
    ],
  },
];
