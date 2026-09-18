import type { CharacterSeed } from "./build";

export const noxusDemaciaSeeds: CharacterSeed[] = [
  {
    slug: "swain",
    name: "Swain",
    title: "The Noxian Grand General",
    region: "noxus",
    factions: ["trifarix"],
    roles: ["Grand General", "Strategist", "Demon-bound"],
    status: "Alive",
    species: "Human (demon-bound)",
    aliases: ["Jericho Swain", "The Noxian Grand General"],
    accentColor: "#A03041",
    releaseYear: 2011,
    complexity: 4,
    featured: true,
    importance: 88,
    popularity: 64,
    verified: true,
    events: [
      "noxian-rise",
      "swain-coup",
      "black-rose-resurgence",
      "noxian-invasion-ionia",
      "the-place-of-blood",
    ],
    tags: ["noxus", "trifarix", "strategy", "demon", "black-rose-conflict", "ionian-war"],
    short:
      "The general who lost Ionia, came back with a demon's arm, and took over Noxus to fight the enemy inside it.",
    long: [
      "Jericho Swain commanded the Noxian invasion of Ionia and failed. He lost his arm, his army and his standing, and Noxus does not forgive failure — it replaces it. He should have disappeared into the historical footnotes.",
      "Instead he came back with a demonic arm and a much better map of the problem. What Swain learned during that catastrophe was that Noxus was not simply a brutal meritocracy; it was being steered from underneath by the Black Rose, a cabal of mages who had been placing and removing its leaders for centuries.",
      "So he seized the position of Grand General, then immediately restructured the state to make his own office less important. The Trifarix — Might, Guile and Vision, no single ruler, no single target — exists specifically to be un-puppetable.",
      "His war is not really with Demacia or Ionia. It is with LeBlanc, and it is fought almost entirely out of public view.",
    ],
    timeline: [
      {
        era: "Ionian War",
        title: "The invasion of Ionia",
        description:
          "He commands Noxus's campaign into a land with no standing army, and loses anyway.",
        event: "noxian-invasion-ionia",
        with: ["irelia", "karma"],
      },
      {
        era: "Ionian War",
        title: "The arm",
        description:
          "Maimed and disgraced, he finds something in the aftermath willing to trade power for a foothold.",
        event: "swain-coup",
      },
      {
        era: "Modern Noxus",
        title: "Seizing Noxus",
        description:
          "He returns, removes the existing leadership and installs himself as Grand General.",
        event: "swain-coup",
        with: ["darius"],
      },
      {
        era: "Modern Noxus",
        title: "Building the Trifarix",
        description:
          "He deliberately fragments his own authority into three so that no cabal can capture it.",
        event: "noxian-rise",
        with: ["darius"],
      },
      {
        era: "Modern Noxus",
        title: "The quiet war",
        description:
          "He identifies the Black Rose as Noxus's real parasite and begins dismantling it from inside the state.",
        event: "black-rose-resurgence",
        with: ["leblanc", "mel"],
      },
    ],
  },
  {
    slug: "leblanc",
    name: "LeBlanc",
    title: "The Deceiver",
    region: "noxus",
    factions: ["black-rose"],
    roles: ["Matron of the Black Rose", "Mage", "Manipulator"],
    status: "Unknown",
    species: "Human (mage)",
    aliases: ["Emilia LeBlanc", "The Deceiver", "The Matron"],
    accentColor: "#8E2F55",
    releaseYear: 2010,
    complexity: 5,
    featured: true,
    importance: 86,
    popularity: 52,
    verified: true,
    events: ["black-rose-resurgence", "swain-coup", "noxian-rise"],
    tags: ["noxus", "black-rose", "deception", "immortality", "mirror-images"],
    short:
      "The Black Rose's matron, who has outlived every Noxian regime by never being the one on the throne.",
    long: [
      "LeBlanc leads the Black Rose, a cabal of mages that predates the modern Noxian state and has spent centuries installing, guiding and discarding its rulers. She has never held public office, which is the entire strategy.",
      "Her magic makes her difficult to pin down in the most literal sense: she produces copies, doubles and decoys, and nobody can say with confidence which LeBlanc they have ever spoken to — or whether 'Emilia LeBlanc' is a person rather than a role that keeps getting refilled.",
      "Swain is the first Grand General to identify her correctly, and their conflict is the closest thing Noxus has to a constitutional crisis. It is conducted in cellars and coded letters rather than on battlefields.",
      "Treat every LeBlanc fact as provisional. That is not a data limitation; that is the character.",
    ],
    timeline: [
      {
        era: "Modern Noxus",
        title: "Older than the empire",
        description:
          "The Black Rose is already ancient when Noxus becomes an empire, and it likes the arrangement.",
      },
      {
        era: "Modern Noxus",
        title: "Steering from underneath",
        description:
          "She places and removes Noxian leadership for generations without appearing in any of its records.",
        event: "noxian-rise",
      },
      {
        era: "Modern Noxus",
        title: "Miscalculating Swain",
        description:
          "She helps engineer his rise and discovers she has installed the one man who was looking for her.",
        event: "swain-coup",
        with: ["swain"],
      },
      {
        era: "Modern Noxus",
        title: "The quiet war",
        description:
          "Exposed at the top, the Black Rose retreats into a slower, more patient campaign.",
        event: "black-rose-resurgence",
        with: ["swain", "mel"],
      },
    ],
  },
  {
    slug: "mel",
    name: "Mel",
    title: "The Soul's Reflection",
    region: "noxus",
    factions: ["black-rose"],
    roles: ["Councillor", "Mage", "Diplomat"],
    status: "Alive",
    species: "Human (mage)",
    aliases: ["Mel Medarda"],
    accentColor: "#8E2F55",
    releaseYear: 2025,
    complexity: 3,
    importance: 60,
    popularity: 58,
    canonStatus: "RECONCILIATION_PENDING",
    verified: false,
    events: ["black-rose-resurgence", "piltover-zaun-crisis"],
    tags: ["noxus", "black-rose", "piltover", "politics", "arcane", "latent-magic"],
    short:
      "A Noxian noble turned Piltovan councillor, whose inherited magic makes her far more useful to the Black Rose than she wants to be.",
    long: [
      "Mel Medarda was raised inside a Noxian house that treats politics as a bloodline discipline, then established herself in Piltover — a city that valued her money and her competence and asked very few questions about her mother.",
      "Her magic is reflective: harm directed at her tends to come back. She did not train for it and did not choose it, and it ties her to a Noxian faction whose interest in her is entirely instrumental.",
      "She is the clearest bridge in the graph between Noxian court politics and the Piltover–Zaun conflict, which is why she matters structurally even where her lore is still settling.",
    ],
    timeline: [
      {
        era: "Modern Noxus",
        title: "A Medarda upbringing",
        description:
          "Raised in a Noxian house where diplomacy, leverage and family are the same subject.",
      },
      {
        era: "Modern Piltover",
        title: "Councillor in Piltover",
        description:
          "She builds real influence in the City of Progress, at a careful distance from her origins.",
        event: "piltover-zaun-crisis",
      },
      {
        era: "Modern Noxus",
        title: "Claimed",
        description:
          "Her latent magic surfaces, and the Black Rose takes an interest she cannot politely decline.",
        event: "black-rose-resurgence",
        with: ["leblanc"],
      },
    ],
  },
  {
    slug: "ambessa",
    name: "Ambessa",
    title: "Matriarch of War",
    region: "noxus",
    factions: ["medarda"],
    roles: ["Noxian General", "Medarda Matriarch", "Military Leader"],
    gameplayRoles: ["Fighter", "Assassin"],
    status: "Alive",
    species: "Human",
    aliases: ["Ambessa Medarda", "Matriarch of War"],
    accentColor: "#A03041",
    releaseYear: 2024,
    releaseDate: "2024-11-06",
    complexity: 4,
    featured: true,
    importance: 82,
    popularity: 72,
    verified: true,
    completenessTier: "A",
    events: ["noxian-rise", "black-rose-resurgence"],
    sources: ["source:wiki-ambessa"],
    tags: ["noxus", "medarda", "general", "matriarch", "military", "wolf"],
    short:
      "The Medarda matriarch and Noxian general who treats family legacy and battlefield command with the same ruthless clarity.",
    long: [
      "Ambessa Medarda leads a house whose name commands respect and fear across Noxus. She is both a general in the empire's wars and the matriarch who decides which Medardas survive the politics that follow them — two roles that require the same thing: no visible weakness.",
      "Her authority is built on strength and cunning in equal measure. She empowers the family line while tolerating no failure and no sentiment that might be mistaken for it. Noxian doctrine speaks of the Wolf; Ambessa has made that metaphor operational.",
      "Her relationship with Mel sits at the intersection of Noxian aristocracy and Piltover's council politics. In Arcane-era material their bond is defined by inheritance, rivalry, and a matriarch willing to sacrifice affection for legacy. Main-continuity reconciliation between those portrayals remains pending.",
      "At the highest level of Noxian power she intersects with Swain's statecraft — military might meeting the Trifarix's long game — while the Black Rose watches every mage-born advantage the Medarda bloodline might produce.",
    ],
    timeline: [
      {
        era: "Modern Noxus",
        title: "Matriarch of the Medardas",
        description:
          "She assumes leadership of a Noxian house whose influence is measured in generals, diplomats, and heirs trained never to show doubt.",
      },
      {
        era: "Modern Noxus",
        title: "General of the Wolf",
        description:
          "Her battlefield reputation matches her domestic one: decisive, merciless, and unwilling to leave outcomes to chance.",
        event: "noxian-rise",
      },
      {
        era: "Modern Noxus",
        title: "Legacy over affection",
        description:
          "She protects the Medarda name even when that protection costs her children's love — a price she has already decided is acceptable.",
        with: ["mel"],
      },
      {
        era: "Modern Noxus",
        title: "The state's machine",
        description:
          "Her military authority runs parallel to Swain's restructuring of Noxus — power shared, never surrendered.",
        event: "noxian-rise",
        with: ["swain"],
      },
    ],
  },
  {
    slug: "darius",
    name: "Darius",
    title: "The Hand of Noxus",
    region: "noxus",
    factions: ["trifarix"],
    roles: ["General", "Hand of Noxus", "Might"],
    status: "Alive",
    species: "Human",
    aliases: ["The Hand of Noxus"],
    accentColor: "#A03041",
    releaseYear: 2012,
    complexity: 3,
    importance: 76,
    popularity: 72,
    verified: true,
    events: ["noxian-rise", "swain-coup"],
    tags: ["noxus", "trifarix", "military", "merit", "brothers"],
    short:
      "Noxus's most feared commander, who believes in the empire's meritocracy precisely because it is the only thing that ever gave him anything.",
    long: [
      "Darius was born with nothing and rose on results alone, which is exactly the story Noxus tells about itself. He takes that story seriously — more seriously than most of the nobles who repeat it — and he despises the aristocratic rot that keeps trying to reassert itself.",
      "He commands the Trifarian Legion and serves as the Trifarix's Might. He backed Swain's coup because Swain was competent, and he would remove Swain the same day competence stopped being the criterion.",
      "His brother Draven is his one indefensible position: a preening showman whose career is built on the name Darius earned.",
    ],
    timeline: [
      {
        era: "Modern Noxus",
        title: "Nothing to inherit",
        description:
          "Orphaned and unremarkable by birth, he rises through the Noxian ranks on results alone.",
        with: ["draven"],
      },
      {
        era: "Modern Noxus",
        title: "The Hand of Noxus",
        description:
          "He becomes the empire's most feared commander and the living argument for its meritocracy.",
        event: "noxian-rise",
      },
      {
        era: "Modern Noxus",
        title: "Backing the coup",
        description:
          "He supports Swain's seizure of power because the alternative was noble incompetence.",
        event: "swain-coup",
        with: ["swain"],
      },
    ],
  },
  {
    slug: "draven",
    name: "Draven",
    title: "The Glorious Executioner",
    region: "noxus",
    factions: ["trifarix"],
    roles: ["Executioner", "Performer"],
    status: "Alive",
    species: "Human",
    aliases: ["The Glorious Executioner"],
    accentColor: "#A03041",
    releaseYear: 2012,
    complexity: 1,
    importance: 52,
    popularity: 60,
    events: ["noxian-rise"],
    tags: ["noxus", "executioner", "spectacle", "brothers", "ego"],
    short:
      "Noxus's favourite executioner, who turned state violence into a stage act and genuinely cannot tell the difference.",
    long: [
      "Draven discovered early that Noxian crowds will forgive almost anything if it is entertaining. He built a career on that insight: public executions performed as spectacle, with choreography, catchphrases and merchandise.",
      "It is easy to dismiss him, and Darius does. But Draven is genuinely dangerous, and his celebrity gives him a kind of political protection that his brother's competence never will.",
      "He is the cheapest node in the Noxian cluster and a useful reminder that not every connection in a universe has to be profound.",
    ],
    timeline: [
      {
        era: "Modern Noxus",
        title: "In his brother's shadow",
        description:
          "He grows up beside a brother the whole empire respects, and decides to be famous instead.",
        with: ["darius"],
      },
      {
        era: "Modern Noxus",
        title: "The Glorious Executioner",
        description:
          "He turns Noxian executions into performances and becomes the empire's most popular killer.",
        event: "noxian-rise",
      },
    ],
  },
  {
    slug: "katarina",
    name: "Katarina",
    title: "The Sinister Blade",
    region: "noxus",
    factions: ["trifarix"],
    roles: ["Assassin", "Du Couteau"],
    status: "Alive",
    species: "Human",
    aliases: ["The Sinister Blade", "Katarina Du Couteau"],
    accentColor: "#A03041",
    releaseYear: 2009,
    complexity: 2,
    importance: 60,
    popularity: 70,
    events: ["noxian-rise", "swain-coup"],
    tags: ["noxus", "assassin", "du-couteau", "family", "loyalty"],
    short:
      "Noxus's finest assassin, carrying a family name that vanished along with her father.",
    long: [
      "Katarina was raised by General Du Couteau to be a weapon, and she was good enough at it young enough that she never had to develop a second identity. Her competence is not in question anywhere in Noxus.",
      "Her father disappeared. No body, no explanation, and a suspicious amount of official disinterest in finding out why. That absence sits underneath everything she does, including her willingness to work for a regime that may have been involved.",
      "She operates within the Noxian state while quietly not trusting it, which makes her one of the more interesting Noxian nodes to traverse.",
    ],
    timeline: [
      {
        era: "Modern Noxus",
        title: "Raised as a blade",
        description: "Trained from childhood by General Du Couteau to be Noxus's sharpest instrument.",
      },
      {
        era: "Modern Noxus",
        title: "Her father disappears",
        description:
          "Du Couteau vanishes without explanation, and nobody in power seems especially curious.",
      },
      {
        era: "Modern Noxus",
        title: "Serving anyway",
        description:
          "She works for the new regime while privately treating it as a suspect.",
        event: "swain-coup",
        with: ["swain"],
      },
    ],
  },
  {
    slug: "riven",
    name: "Riven",
    title: "The Exile",
    region: "noxus",
    factions: [],
    roles: ["Former Noxian Commander", "Exile"],
    status: "Alive",
    species: "Human",
    aliases: ["The Exile"],
    accentColor: "#5FA88C",
    releaseYear: 2011,
    complexity: 3,
    importance: 68,
    popularity: 66,
    verified: true,
    events: ["noxian-invasion-ionia", "the-place-of-blood", "elder-killing"],
    tags: ["noxus", "ionia", "exile", "guilt", "broken-blade", "chemical-weapon"],
    short:
      "A Noxian commander who watched her own army gas the battlefield she was standing on, and shattered her sword rather than carry it home.",
    long: [
      "Riven was a true believer. Noxus took a girl with nothing and gave her rank, purpose and a rune blade, and she repaid it with absolute conviction — through the invasion of Ionia and every ugly order that came with it.",
      "Then her own side deployed a chemical weapon on a position she and her unit were holding. Noxus did not warn her. It did not need her. She survived, understood exactly what she was to the empire, and broke her blade.",
      "Now she wanders Ionia as an enemy of both countries: hunted by Noxus as a deserter, hated by Ionians for what she did there. She is also, by a grim coincidence, entangled in the murder Yasuo was blamed for.",
    ],
    timeline: [
      {
        era: "Ionian War",
        title: "A true believer",
        description:
          "Given rank and a rune blade by Noxus, she serves the invasion of Ionia without hesitation.",
        event: "noxian-invasion-ionia",
      },
      {
        era: "Ionian War",
        title: "Gassed by her own side",
        description:
          "Noxus deploys a chemical weapon onto her position without warning, and she finally sees her own value to it.",
        event: "the-place-of-blood",
        with: ["singed"],
      },
      {
        era: "Ionian War",
        title: "Breaking the blade",
        description:
          "She shatters her rune sword and disappears, a deserter to one country and a war criminal to the other.",
      },
      {
        era: "Modern Ionia",
        title: "Tangled in a murder",
        description:
          "Her path crosses the killing Yasuo was convicted of, and neither of them comes away clean.",
        event: "elder-killing",
        with: ["yasuo"],
      },
    ],
  },
  {
    slug: "lux",
    name: "Lux",
    title: "The Lady of Luminosity",
    region: "demacia",
    factions: ["crownguard"],
    roles: ["Mage", "Noble", "Spy"],
    status: "Alive",
    species: "Human (mage)",
    aliases: ["Luxanna Crownguard", "The Lady of Luminosity"],
    accentColor: "#D8B978",
    releaseYear: 2010,
    complexity: 3,
    featured: true,
    importance: 78,
    popularity: 86,
    verified: true,
    events: ["mage-rebellion-founding", "sylas-uprising"],
    tags: ["demacia", "crownguard", "light-magic", "secret", "mageseekers", "family"],
    sources: ["source:lux-comic"],
    short:
      "A Demacian noble with light magic in a kingdom that imprisons mages, hiding in the most visible family in the country.",
    long: [
      "Luxanna Crownguard belongs to one of Demacia's great military houses. She is charming, popular and constantly performing, because the alternative is being found out: Lux is a mage in a nation that treats magic as an infection.",
      "Her brother Garen is one of Demacia's most decorated soldiers and a sincere believer in its laws. Lux loves him and cannot tell him. That single unspoken fact is the most efficient summary of Demacia's problem available.",
      "As a child she was assigned to attend Sylas — a mage the Mageseekers used as a detector — and taught him more than either of them understood at the time. When he broke out, part of what he broke out with came from her.",
      "She is the graph's best Demacian hub: legally impeccable, structurally seditious.",
    ],
    timeline: [
      {
        era: "Modern Demacia",
        title: "A Crownguard child",
        description:
          "Born into one of Demacia's great houses, and into the only crime it cannot forgive.",
        with: ["garen"],
      },
      {
        era: "Modern Demacia",
        title: "The boy in the cell",
        description:
          "Assigned to attend a Mageseeker prisoner, she befriends Sylas and shares what she knows.",
        event: "sylas-uprising",
        with: ["sylas"],
      },
      {
        era: "Modern Demacia",
        title: "Hiding in plain sight",
        description:
          "She builds a public life bright enough that nobody looks for the magic underneath it.",
      },
      {
        era: "Modern Demacia",
        title: "The uprising",
        description:
          "Sylas escapes and forces the question she has spent her whole life avoiding.",
        event: "sylas-uprising",
        with: ["sylas", "garen"],
      },
    ],
  },
  {
    slug: "sylas",
    name: "Sylas",
    title: "The Unshackled",
    region: "demacia",
    factions: [],
    roles: ["Mage", "Revolutionary", "Former Prisoner"],
    status: "Alive",
    species: "Human (mage)",
    aliases: ["Sylas of Dregbourne", "The Unshackled"],
    accentColor: "#8B7FC7",
    releaseYear: 2019,
    complexity: 4,
    featured: true,
    importance: 82,
    popularity: 74,
    verified: true,
    events: ["sylas-uprising", "mage-rebellion-founding"],
    tags: ["demacia", "mage-rebellion", "mageseekers", "revolution", "petricite", "class"],
    short:
      "Demacia's most effective revolutionary: a mage who was used as a tool to hunt mages, and now steals the magic of anyone who stands in his way.",
    long: [
      "Sylas was born poor in Dregbourne with a gift that made him valuable rather than free: he can sense magic, and the Mageseekers put that ability to work identifying other mages. He was a child, and he was an instrument.",
      "He learned what that meant, and it broke something. He killed a Mageseeker, was imprisoned for years, and spent that time being visited by a noble girl who taught him about magic without understanding what she was arming.",
      "When he escaped, he came out with a stolen ability of his own — he can seize and wield the magic of others — and a clear political programme. Sylas is not interested in tolerance. He wants Demacia's foundations pulled out.",
      "He is the most ideologically coherent antagonist in the region, which is precisely why Demacia finds him unbearable.",
    ],
    timeline: [
      {
        era: "Modern Demacia",
        title: "Born in Dregbourne",
        description:
          "A poor Demacian child with a magical sensitivity the state considers useful.",
      },
      {
        era: "Modern Demacia",
        title: "The Mageseekers' hound",
        description:
          "He is used to detect other mages, and slowly understands what he is being used for.",
        event: "sylas-uprising",
      },
      {
        era: "Modern Demacia",
        title: "Imprisoned",
        description:
          "He kills a Mageseeker and spends years in a cell — visited by a noble girl who teaches him more than she should.",
        with: ["lux"],
      },
      {
        era: "Modern Demacia",
        title: "The escape",
        description:
          "He breaks out with the ability to steal others' magic, and sets about ending the kingdom that made him.",
        event: "sylas-uprising",
        with: ["garen", "lux"],
      },
    ],
  },
  {
    slug: "garen",
    name: "Garen",
    title: "The Might of Demacia",
    region: "demacia",
    factions: ["dauntless-vanguard", "crownguard"],
    roles: ["Soldier", "Vanguard Commander", "Noble"],
    status: "Alive",
    species: "Human",
    aliases: ["Garen Crownguard", "The Might of Demacia"],
    accentColor: "#D8B978",
    releaseYear: 2010,
    complexity: 2,
    importance: 70,
    popularity: 68,
    verified: true,
    events: ["mage-rebellion-founding", "sylas-uprising"],
    tags: ["demacia", "vanguard", "crownguard", "duty", "family", "law"],
    short:
      "Demacia's ideal soldier, whose sincerity is the reason his sister can never tell him the truth.",
    long: [
      "Garen Crownguard leads the Dauntless Vanguard and believes in Demacia without cynicism. That is not naivety — he has seen enough war to have earned his opinions — but it does make him structurally blind in one direction.",
      "He enforces laws that would destroy his sister. He does not know that, and the not-knowing is deliberate on her part and load-bearing for both of them.",
      "When Sylas's uprising begins, Garen is exactly the man Demacia sends, and exactly the man least able to process what the uprising is actually about.",
    ],
    timeline: [
      {
        era: "Modern Demacia",
        title: "Raised to serve",
        description:
          "Born into House Crownguard and into a sincere, uncomplicated devotion to Demacian law.",
        with: ["lux"],
      },
      {
        era: "Modern Demacia",
        title: "The Might of Demacia",
        description:
          "He rises to command the Dauntless Vanguard, the kingdom's answer to anything it cannot talk down.",
      },
      {
        era: "Modern Demacia",
        title: "Hunting the Unshackled",
        description:
          "Sent after Sylas, he collides with a rebellion whose grievance touches his own family.",
        event: "sylas-uprising",
        with: ["sylas", "lux"],
      },
    ],
  },
  {
    slug: "jarvan-iv",
    name: "Jarvan IV",
    title: "The Exemplar of Demacia",
    region: "demacia",
    factions: ["lightshield", "dauntless-vanguard"],
    roles: ["Prince", "Commander", "Heir"],
    status: "Alive",
    species: "Human",
    aliases: ["Jarvan Lightshield IV", "The Exemplar of Demacia"],
    accentColor: "#D8B978",
    releaseYear: 2011,
    complexity: 2,
    importance: 62,
    popularity: 48,
    events: ["sylas-uprising", "mage-rebellion-founding"],
    tags: ["demacia", "lightshield", "royalty", "duty", "expectation"],
    short:
      "The heir to Demacia's throne, raised to be a symbol and increasingly aware of what symbols cost.",
    long: [
      "Jarvan IV was born to rule and trained to embody. He has genuine military ability — he earned his command rather than inheriting it outright — but every victory is read as proof of the bloodline rather than of the man.",
      "His friendship with Garen is the one relationship where he is treated as a person, and his confrontation with Sylas's uprising is the first time the kingdom's founding contradiction lands on him personally.",
      "He is a useful Demacian node because he connects the military, the crown and the institutional response to the mage question.",
    ],
    timeline: [
      {
        era: "Modern Demacia",
        title: "Born to be a symbol",
        description: "Raised as the living proof of Demacia's ideals, with limited room to disagree.",
      },
      {
        era: "Modern Demacia",
        title: "Earning the command",
        description:
          "He proves himself in the field alongside the Vanguard rather than behind it.",
        with: ["garen"],
      },
      {
        era: "Modern Demacia",
        title: "The question he inherits",
        description:
          "The mage uprising forces the heir to a magic-fearing kingdom to decide what he actually believes.",
        event: "sylas-uprising",
        with: ["sylas"],
      },
    ],
  },
];
