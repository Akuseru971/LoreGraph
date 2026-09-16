import { normalizeCanonStatus } from "@/lib/canon/model";
import type { QuizQuestion, QuizQuestionKind, RegionSlug } from "@/types";
import { RUNETERRA_ID } from "./universes";

interface QSeed {
  kind: QuizQuestionKind;
  prompt: string;
  clues?: string[];
  options: string[];
  correct: number;
  explanation: string;
  chars: string[];
  regions?: RegionSlug[];
  difficulty?: 1 | 2 | 3 | 4 | 5;
  verified?: boolean;
  canonStatus?: string;
}

const seeds: QSeed[] = [
  /* ------------------------------------------------------------- WHO AM I */
  {
    kind: "WHO_AM_I",
    prompt: "Who am I?",
    clues: [
      "I was once an Ascended warrior, raised to fight the Void.",
      "Centuries of war hollowed me out, and my own empire turned against me.",
      "I could not be killed, so I was imprisoned inside my own weapon.",
    ],
    options: ["Aatrox", "Nasus", "Azir", "Pantheon"],
    correct: 0,
    explanation:
      "Aatrox was one of Shurima's first Ascended. After the Darkin corruption, Targon and Shurima could not destroy him, so he was sealed inside his own blade.",
    chars: ["aatrox"],
    regions: ["shurima"],
    verified: true,
  },
  {
    kind: "WHO_AM_I",
    prompt: "Who am I?",
    clues: [
      "I climbed a mountain as a nobody and came back carrying a god.",
      "The god was killed. I was not.",
      "I kept the spear anyway.",
    ],
    options: ["Pantheon", "Leona", "Diana", "Garen"],
    correct: 0,
    explanation:
      "Atreus carried the Aspect of War until Aatrox destroyed it. He survived, kept a fragment, and now fights as a mortal rather than a vessel.",
    chars: ["pantheon"],
    regions: ["targon"],
    verified: true,
  },
  {
    kind: "WHO_AM_I",
    prompt: "Who am I?",
    clues: [
      "I was the only student of my generation to master the wind technique.",
      "I left my post during an invasion, and an elder died.",
      "My brother was sent to bring me in.",
    ],
    options: ["Yasuo", "Yone", "Lee Sin", "Shen"],
    correct: 0,
    explanation:
      "Yasuo abandoned his post during the Noxian invasion, was blamed for the elder's murder, and killed his brother Yone in the duel that followed.",
    chars: ["yasuo", "yone"],
    regions: ["ionia"],
    verified: true,
  },
  {
    kind: "WHO_AM_I",
    prompt: "Who am I?",
    clues: [
      "I refused to accept my wife's death.",
      "I forced an archive of sacred magic to give her back.",
      "It did not work, and my kingdom has not been allowed to finish dying since.",
    ],
    options: ["Viego", "Mordekaiser", "Thresh", "Kalista"],
    correct: 0,
    explanation:
      "Viego's attempt to resurrect Isolde using the Waters of Life caused the Ruination, drowning the Blessed Isles in Black Mist.",
    chars: ["viego"],
    regions: ["shadow-isles"],
    verified: true,
  },
  {
    kind: "WHO_AM_I",
    prompt: "Who am I?",
    clues: [
      "I was born poor, and the state found my magic useful rather than criminal.",
      "They made me hunt others like me.",
      "I escaped with the ability to take the magic of anyone who stands against me.",
    ],
    options: ["Sylas", "Ryze", "Viktor", "Swain"],
    correct: 0,
    explanation:
      "Sylas of Dregbourne was used by the Mageseekers to detect other mages before being imprisoned. He escaped able to seize others' magic.",
    chars: ["sylas"],
    regions: ["demacia"],
    verified: true,
  },
  {
    kind: "WHO_AM_I",
    prompt: "Who am I?",
    clues: [
      "I lost an arm, an army and my reputation in a war I commanded.",
      "I came back with something else attached.",
      "I took power over my nation specifically so I could fight the thing running it.",
    ],
    options: ["Swain", "Darius", "Mordekaiser", "Viktor"],
    correct: 0,
    explanation:
      "Jericho Swain's defeat in Ionia let him see that the Black Rose had been steering Noxus. He seized the Grand Generalship and built the Trifarix to make the state harder to capture.",
    chars: ["swain"],
    regions: ["noxus"],
    verified: true,
  },
  {
    kind: "WHO_AM_I",
    prompt: "Who am I?",
    clues: [
      "I shaped stars before there were nations to notice.",
      "I was flattered into a bargain.",
      "My power is bound to a crown I did not ask for.",
    ],
    options: ["Aurelion Sol", "Kayle", "Kindred", "Ryze"],
    correct: 0,
    explanation:
      "The Aspects of Targon bound Aurelion Sol's power to a crown, turning the Star Forger into an instrument.",
    chars: ["aurelion-sol"],
    regions: ["targon"],
    verified: true,
  },
  {
    kind: "WHO_AM_I",
    prompt: "Who am I?",
    clues: [
      "I was a warden of an archive before the Mist came.",
      "Everyone else there became an unwilling ghost.",
      "I treated it as a promotion, and I keep what I take in a lantern.",
    ],
    options: ["Thresh", "Viego", "Mordekaiser", "Kalista"],
    correct: 0,
    explanation:
      "Thresh was a keeper on the Blessed Isles, already cruel before the Ruination. He collects souls deliberately rather than being merely cursed.",
    chars: ["thresh"],
    regions: ["shadow-isles"],
    verified: true,
  },
  {
    kind: "WHO_AM_I",
    prompt: "Who am I?",
    clues: [
      "I am a mage in a kingdom that imprisons mages.",
      "My brother enforces those laws.",
      "He does not know.",
    ],
    options: ["Lux", "Morgana", "Syndra", "Mel"],
    correct: 0,
    explanation:
      "Luxanna Crownguard hides her light magic inside one of Demacia's great military families. Her brother Garen leads the Dauntless Vanguard.",
    chars: ["lux", "garen"],
    regions: ["demacia"],
    verified: true,
  },
  {
    kind: "WHO_AM_I",
    prompt: "Who am I?",
    clues: [
      "My village was taken by something beneath the ground.",
      "I did not die in the dark.",
      "A second skin grew over me to keep me breathing, and it will not come off.",
    ],
    options: ["Kai'Sa", "Kalista", "Senna", "Kindred"],
    correct: 0,
    explanation:
      "Kai'Sa survived a Void incursion as a child. A Void symbiote fused to her, keeping her alive and marking her permanently on the surface.",
    chars: ["kaisa"],
    regions: ["void", "shurima"],
    verified: true,
  },
  {
    kind: "WHO_AM_I",
    prompt: "Who am I?",
    clues: [
      "I was my empire's finest general.",
      "My king asked for a miracle and I brought him the truth.",
      "He had me killed for it, and I came back as an oath.",
    ],
    options: ["Kalista", "Riven", "Irelia", "Senna"],
    correct: 0,
    explanation:
      "Kalista was murdered for telling Viego that his wife could not be saved. She returned as the Spear of Vengeance.",
    chars: ["kalista", "viego"],
    regions: ["shadow-isles"],
    verified: true,
  },
  {
    kind: "WHO_AM_I",
    prompt: "Who am I?",
    clues: [
      "I built weapons in an undercity nobody regulates.",
      "I aim them at the richest city on the continent.",
      "Mostly I want one specific person to look at me.",
    ],
    options: ["Jinx", "Ekko", "Viktor", "Singed"],
    correct: 0,
    explanation:
      "Jinx's campaign against Piltover is aimed at the city, the Wardens and above all at her sister Vi.",
    chars: ["jinx", "vi"],
    regions: ["zaun", "piltover"],
    verified: true,
  },
  {
    kind: "WHO_AM_I",
    prompt: "Who am I?",
    clues: [
      "I was an idealist trying to end suffering with science.",
      "Then my own body failed me.",
      "I concluded that the flesh is the defect, and I started with myself.",
    ],
    options: ["Viktor", "Singed", "Camille", "Ekko"],
    correct: 0,
    explanation:
      "Viktor's Glorious Evolution began as an attempt to relieve suffering and became a doctrine of replacing human frailty entirely.",
    chars: ["viktor"],
    regions: ["zaun"],
    verified: true,
  },
  {
    kind: "WHO_AM_I",
    prompt: "Who am I?",
    clues: [
      "I was raised inside a sun faith and found records it had buried.",
      "I climbed the mountain to settle the question.",
      "I came back carrying the thing they said did not exist.",
    ],
    options: ["Diana", "Leona", "Morgana", "Karma"],
    correct: 0,
    explanation:
      "Diana found evidence of the suppressed Lunari faith, climbed Targon, and returned as the Aspect of the Moon — which the Solari were obliged to call heresy.",
    chars: ["diana", "leona"],
    regions: ["targon"],
    verified: true,
  },
  {
    kind: "WHO_AM_I",
    prompt: "Who am I?",
    clues: [
      "I died at my brother's hand.",
      "I woke somewhere that was not the material world.",
      "Something attacked me there, and I am wearing its face.",
    ],
    options: ["Yone", "Yasuo", "Shen", "Kindred"],
    correct: 0,
    explanation:
      "Yone was killed by Yasuo, woke in the spirit realm, killed the azakana that attacked him, and returned wearing its mask.",
    chars: ["yone", "yasuo"],
    regions: ["ionia"],
    verified: true,
  },
  {
    kind: "WHO_AM_I",
    prompt: "Who am I?",
    clues: [
      "I was a true believer, given rank by an empire that had nothing to offer anyone else.",
      "My own side dropped a weapon on the ground I was standing on.",
      "I broke my sword.",
    ],
    options: ["Riven", "Katarina", "Irelia", "Darius"],
    correct: 0,
    explanation:
      "Riven served Noxus loyally until Singed's chemical weapon was deployed onto her own position. She shattered her rune blade and deserted.",
    chars: ["riven", "singed"],
    regions: ["noxus", "ionia"],
    verified: true,
  },
  {
    kind: "WHO_AM_I",
    prompt: "Who am I?",
    clues: [
      "I conquered the living and was killed for it.",
      "I declined to treat that as a conclusion.",
      "My second empire was staffed by the souls of everyone who resisted the first one.",
    ],
    options: ["Mordekaiser", "Viego", "Thresh", "Azir"],
    correct: 0,
    explanation:
      "Mordekaiser returned from death and built an empire out of conscripted souls before a coalition finally stopped him.",
    chars: ["mordekaiser"],
    regions: ["shadow-isles"],
    verified: true,
  },
  {
    kind: "WHO_AM_I",
    prompt: "Who am I?",
    clues: [
      "I carry objects capable of unmaking geography.",
      "I carry them so that nobody else can gather them.",
      "The job has no end and no successor.",
    ],
    options: ["Ryze", "Nasus", "Aurelion Sol", "Lissandra"],
    correct: 0,
    explanation:
      "Ryze collects and separates the World Runes, having concluded after the Rune Wars that they must never be assembled again.",
    chars: ["ryze"],
    regions: ["runeterra"],
    verified: true,
  },
  {
    kind: "WHO_AM_I",
    prompt: "Who am I?",
    clues: [
      "My soul was held in a lantern for years.",
      "I came back, but not clean.",
      "I fight the Black Mist using the Black Mist.",
    ],
    options: ["Senna", "Kalista", "Kai'Sa", "Morgana"],
    correct: 0,
    explanation:
      "Thresh trapped Senna in his lantern. She escaped carrying the Mist inside her, and now uses its power against its source.",
    chars: ["senna", "thresh"],
    regions: ["shadow-isles"],
    verified: true,
  },

  /* -------------------------------------------------------- TRUE OR FALSE */
  {
    kind: "TRUE_OR_FALSE",
    prompt: "Aatrox and Varus were both Shuriman Ascended before becoming Darkin.",
    options: ["True", "False"],
    correct: 0,
    explanation:
      "Both were raised by Shurima's Sun Disc to fight the Void, and both were later sealed inside their own weapons after the Darkin corruption.",
    chars: ["aatrox", "varus"],
    regions: ["shurima"],
    verified: true,
  },
  {
    kind: "TRUE_OR_FALSE",
    prompt: "Kayle and Morgana are twin sisters.",
    options: ["True", "False"],
    correct: 0,
    explanation:
      "They were born to a Targonian mother among the refugees who founded Demacia, and inherited identical celestial power before splitting over what justice requires.",
    chars: ["kayle", "morgana"],
    regions: ["demacia"],
    verified: true,
  },
  {
    kind: "TRUE_OR_FALSE",
    prompt: "Garen knows that his sister Lux is a mage.",
    options: ["True", "False"],
    correct: 1,
    explanation:
      "Lux hides her magic from her brother. His sincere belief in Demacian law is exactly why she cannot risk telling him.",
    chars: ["lux", "garen"],
    regions: ["demacia"],
    verified: true,
  },
  {
    kind: "TRUE_OR_FALSE",
    prompt: "Swain seized power in Noxus in order to concentrate authority in a single ruler.",
    options: ["True", "False"],
    correct: 1,
    explanation:
      "The opposite. Swain built the Trifarix — Might, Guile and Vision — so that no cabal could capture Noxus by capturing one office.",
    chars: ["swain"],
    regions: ["noxus"],
    verified: true,
  },
  {
    kind: "TRUE_OR_FALSE",
    prompt: "Viego destroyed the Blessed Isles deliberately, as an act of conquest.",
    options: ["True", "False"],
    correct: 1,
    explanation:
      "The Ruination was a catastrophic side effect. Viego forced the Waters of Life to resurrect Isolde; the magic inverted and the Mist poured out.",
    chars: ["viego"],
    regions: ["shadow-isles"],
    verified: true,
  },
  {
    kind: "TRUE_OR_FALSE",
    prompt: "Vi and Jinx are sisters.",
    options: ["True", "False"],
    correct: 0,
    explanation:
      "Vi raised her younger sister in Zaun's undercity. An accident separated them, and neither remembers it the same way.",
    chars: ["vi", "jinx"],
    regions: ["zaun", "piltover"],
    verified: true,
  },
  {
    kind: "TRUE_OR_FALSE",
    prompt: "Yasuo actually killed the Ionian elder he was accused of murdering.",
    options: ["True", "False"],
    correct: 1,
    explanation:
      "He was innocent of that killing — but guilty of abandoning his post, and later of killing his own brother in the duel that followed.",
    chars: ["yasuo", "yone"],
    regions: ["ionia"],
    verified: true,
  },
  {
    kind: "TRUE_OR_FALSE",
    prompt: "Karma used her full power to destroy a Noxian fleet during the invasion of Ionia.",
    options: ["True", "False"],
    correct: 0,
    explanation:
      "She did, and none of her previous incarnations had sanctioned anything like it. The precedent still shapes Ionian politics.",
    chars: ["karma", "swain"],
    regions: ["ionia"],
    verified: true,
  },
  {
    kind: "TRUE_OR_FALSE",
    prompt: "Pantheon is still the Aspect of War.",
    options: ["True", "False"],
    correct: 1,
    explanation:
      "Aatrox destroyed the Aspect. What remains is Atreus, a mortal carrying a fragment of a dead god — which is the entire point of the character.",
    chars: ["pantheon", "aatrox"],
    regions: ["targon"],
    verified: true,
  },
  {
    kind: "TRUE_OR_FALSE",
    prompt: "Akali left the Kinkou Order because she was expelled in disgrace.",
    options: ["True", "False"],
    correct: 1,
    explanation:
      "She left in disagreement, not disgrace. The Order's doctrine of watching threats develop had become intolerable to her.",
    chars: ["akali", "shen"],
    regions: ["ionia"],
    verified: true,
  },
  {
    kind: "TRUE_OR_FALSE",
    prompt: "Azir was betrayed at the moment of his own Ascension.",
    options: ["True", "False"],
    correct: 0,
    explanation:
      "Xerath sabotaged the ritual. Azir was destroyed, Xerath took the power, and Shurima's capital sank into the sand.",
    chars: ["azir", "nasus"],
    regions: ["shurima"],
    verified: true,
  },
  {
    kind: "TRUE_OR_FALSE",
    prompt: "Singed's chemical weapon was used against Noxus's own troops in Ionia.",
    options: ["True", "False"],
    correct: 0,
    explanation:
      "It was deployed onto ground Riven's unit was holding, without warning. That is why she deserted.",
    chars: ["singed", "riven"],
    regions: ["ionia", "noxus"],
    verified: true,
  },
  {
    kind: "TRUE_OR_FALSE",
    prompt: "Lissandra presents the Frostguard as neutral keepers of Freljordian tradition.",
    options: ["True", "False"],
    correct: 0,
    explanation:
      "They present as neutral. In practice they are an intelligence apparatus, and Lissandra decides which version of the north's history survives.",
    chars: ["lissandra", "ashe"],
    regions: ["freljord"],
    verified: true,
  },
  {
    kind: "TRUE_OR_FALSE",
    prompt: "Ekko's Z-Drive rewinds several hours of time.",
    options: ["True", "False"],
    correct: 1,
    explanation:
      "It rewinds seconds. That sounds small until you consider what a few seconds are worth in a fight.",
    chars: ["ekko"],
    regions: ["zaun"],
    verified: true,
  },
  {
    kind: "TRUE_OR_FALSE",
    prompt: "Varus shares a single body with two mortals who lifted his bow.",
    options: ["True", "False"],
    correct: 0,
    explanation:
      "Valmar and Kai took up the weapon together. Varus took them both, and they are still in there.",
    chars: ["varus"],
    regions: ["ionia", "shurima"],
    verified: true,
  },

  /* ----------------------------------------------------- WHO IS CONNECTED */
  {
    kind: "WHO_IS_CONNECTED",
    prompt: "Which champion is Aatrox's most direct mortal enemy?",
    options: ["Pantheon", "Nasus", "Ryze", "Mordekaiser"],
    correct: 0,
    explanation:
      "Pantheon's Aspect helped seal Aatrox into his blade. Aatrox returned and killed the Aspect — but not the man carrying it.",
    chars: ["aatrox", "pantheon"],
    verified: true,
  },
  {
    kind: "WHO_IS_CONNECTED",
    prompt: "Who taught Sylas about magic while he was imprisoned?",
    options: ["Lux", "Morgana", "Ryze", "Syndra"],
    correct: 0,
    explanation:
      "Lux was assigned to attend the Mageseeker prisoner as a child. Part of what Sylas escaped with came from those conversations.",
    chars: ["lux", "sylas"],
    verified: true,
  },
  {
    kind: "WHO_IS_CONNECTED",
    prompt: "Whose soul did Thresh keep in his lantern?",
    options: ["Senna", "Kalista", "Morgana", "Kindred"],
    correct: 0,
    explanation:
      "Thresh held Senna for years, largely to torment the man hunting him. She escaped carrying the Mist inside her.",
    chars: ["thresh", "senna"],
    verified: true,
  },
  {
    kind: "WHO_IS_CONNECTED",
    prompt: "Who is Swain's real adversary inside Noxus?",
    options: ["LeBlanc", "Darius", "Katarina", "Draven"],
    correct: 0,
    explanation:
      "The Black Rose has steered Noxus for centuries. Swain is the first Grand General to identify LeBlanc correctly, and their war is fought almost entirely out of public view.",
    chars: ["swain", "leblanc"],
    verified: true,
  },
  {
    kind: "WHO_IS_CONNECTED",
    prompt: "Which Noxian commander did Riven serve under during the invasion of Ionia?",
    options: ["Swain", "Darius", "Draven", "Katarina"],
    correct: 0,
    explanation:
      "Swain commanded the Ionian campaign. His defeat there began his own transformation; Riven's experience of it ended her service.",
    chars: ["riven", "swain"],
    verified: true,
  },
  {
    kind: "WHO_IS_CONNECTED",
    prompt: "Which champion is Caitlyn's partner in the Piltover Wardens?",
    options: ["Vi", "Camille", "Ekko", "Jinx"],
    correct: 0,
    explanation:
      "Caitlyn has the procedure; Vi has the undercity. It is the healthiest version of the Piltover–Zaun relationship anyone has managed.",
    chars: ["caitlyn", "vi"],
    verified: true,
  },
  {
    kind: "WHO_IS_CONNECTED",
    prompt: "Who is Nasus's closest ally in modern Shurima?",
    options: ["Azir", "Aatrox", "Akshan", "Kai'Sa"],
    correct: 0,
    explanation:
      "Nasus served Azir's empire and survived its fall. When Shurima rose again, he was the only institutional memory of the emperor's reign.",
    chars: ["nasus", "azir"],
    verified: true,
  },
  {
    kind: "WHO_IS_CONNECTED",
    prompt: "Which Kinkou leader did Akali break with?",
    options: ["Shen", "Karma", "Lee Sin", "Jhin"],
    correct: 0,
    explanation:
      "Shen holds the Kinkou's doctrine together by holding himself still. Akali left because that restraint had started to look like complicity.",
    chars: ["akali", "shen"],
    verified: true,
  },
  {
    kind: "WHO_IS_CONNECTED",
    prompt: "Who is Darius's brother?",
    options: ["Draven", "Swain", "Garen", "Jarvan IV"],
    correct: 0,
    explanation:
      "Darius earned the family name through results; Draven monetised it with public executions as spectacle.",
    chars: ["darius", "draven"],
    verified: true,
  },
  {
    kind: "WHO_IS_CONNECTED",
    prompt: "Which two champions are the clearest ideological rivals in Piltover and Zaun?",
    options: ["Viktor and Ekko", "Vi and Caitlyn", "Jinx and Camille", "Singed and Mel"],
    correct: 0,
    explanation:
      "Viktor wants to replace human frailty; Ekko wants his neighbourhood to still exist next week. Both are the undercity's best engineers.",
    chars: ["viktor", "ekko"],
    verified: true,
  },
  {
    kind: "WHO_IS_CONNECTED",
    prompt: "Who warned Viego that his wife could not be saved?",
    options: ["Kalista", "Thresh", "Senna", "Ryze"],
    correct: 0,
    explanation:
      "Camavor's finest general brought him the truth instead of a miracle, and was murdered for the difference.",
    chars: ["kalista", "viego"],
    verified: true,
  },
  {
    kind: "WHO_IS_CONNECTED",
    prompt: "Which champion restrained Syndra's power in Ionia?",
    options: [
      "Karma and Ionia's elders",
      "Shen and the Kinkou",
      "Irelia's resistance",
      "The Navori Brotherhood",
    ],
    correct: 0,
    explanation:
      "Ionia's elders, with Karma embodying that authority, contained Syndra's magic for her own good — and taught her exactly what restraint is worth.",
    chars: ["syndra", "karma"],
    verified: true,
  },
  {
    kind: "WHO_IS_CONNECTED",
    prompt: "Who is Demacia's Might, opposite the Hand of Noxus?",
    options: ["Garen", "Jarvan IV", "Sylas", "Lux"],
    correct: 0,
    explanation:
      "Garen leads the Dauntless Vanguard. His rivalry with Darius is the two nations' arguments about merit and duty, armed.",
    chars: ["garen", "darius"],
    verified: true,
  },
  {
    kind: "WHO_IS_CONNECTED",
    prompt: "Which champion did the Black Rose claim because of her latent magic?",
    options: ["Mel", "Katarina", "Lux", "Syndra"],
    correct: 0,
    explanation:
      "Mel Medarda's reflective magic made her useful to the Black Rose — a mage, a Medarda, and seated on Piltover's council.",
    chars: ["mel", "leblanc"],
  },

  /* -------------------------------------------------------------- TIMELINE */
  {
    kind: "TIMELINE",
    prompt: "Which happened first?",
    options: [
      "The Rite of Ascension",
      "The Darkin War",
      "The Fall of Shurima",
      "Shurima rises again",
    ],
    correct: 0,
    explanation:
      "Shurima's Ascension programme came first, then the Darkin corruption and war, then Azir's betrayal and the empire's fall, and only much later its return.",
    chars: ["aatrox", "azir", "nasus"],
    regions: ["shurima"],
    verified: true,
  },
  {
    kind: "TIMELINE",
    prompt: "Put these in order: which came last?",
    options: [
      "Aatrox kills the Aspect of War",
      "Aatrox is sealed into his blade",
      "The Darkin corruption",
      "The Void incursion",
    ],
    correct: 0,
    explanation:
      "The Void war came first, then the corruption, then the Darkin War and Aatrox's imprisonment. Killing the Aspect of War is a modern-era event.",
    chars: ["aatrox", "pantheon"],
    verified: true,
  },
  {
    kind: "TIMELINE",
    prompt: "Which of these happened before the others?",
    options: [
      "The Ruination",
      "Viego escapes into the living world",
      "Senna is freed from the lantern",
      "The Sentinels campaign against Viego",
    ],
    correct: 0,
    explanation:
      "The Ruination is the origin event. Everything else in the Shadow Isles storyline is downstream of it, centuries later.",
    chars: ["viego", "senna", "thresh"],
    verified: true,
  },
  {
    kind: "TIMELINE",
    prompt: "In Yasuo's story, what happened immediately after he was accused of the elder's murder?",
    options: [
      "He fled rather than explain himself",
      "He was imprisoned",
      "He killed Yone in a duel",
      "He found the real killer",
    ],
    correct: 0,
    explanation:
      "He refused to defend himself and fled. Yone was then sent to bring him in, and the duel followed.",
    chars: ["yasuo", "yone"],
    verified: true,
  },
  {
    kind: "TIMELINE",
    prompt: "Which came first in Swain's story?",
    options: [
      "The defeat in Ionia",
      "The coup in Noxus",
      "Building the Trifarix",
      "The quiet war with the Black Rose",
    ],
    correct: 0,
    explanation:
      "Losing Ionia cost him his arm and standing — and gave him the vantage point from which the Black Rose was visible.",
    chars: ["swain", "leblanc"],
    verified: true,
  },
  {
    kind: "TIMELINE",
    prompt: "Which of these is the oldest event in Runeterra's timeline?",
    options: [
      "Aurelion Sol is bound by the Aspects",
      "The Rune Wars",
      "The founding of Demacia",
      "The Noxian invasion of Ionia",
    ],
    correct: 0,
    explanation:
      "The Star Forger's binding belongs to the celestial age, long before the Rune Wars or any modern nation.",
    chars: ["aurelion-sol"],
    verified: true,
  },
  {
    kind: "TIMELINE",
    prompt: "In the Piltover and Zaun storyline, which comes first?",
    options: [
      "The undercity accident that separates Vi and Jinx",
      "Vi joins the Piltover Wardens",
      "Jinx's campaign against Piltover",
      "The crisis on the bridge",
    ],
    correct: 0,
    explanation:
      "The accident is the origin. Vi's badge, Jinx's war and the eventual crisis all follow from how differently the two sisters remember it.",
    chars: ["vi", "jinx"],
    verified: true,
  },
  {
    kind: "TIMELINE",
    prompt: "Which happened first for Sylas?",
    options: [
      "The Mageseekers used him to detect other mages",
      "He killed a Mageseeker",
      "He was imprisoned",
      "He escaped able to steal magic",
    ],
    correct: 0,
    explanation:
      "He was used as an instrument first. Understanding what he was being used for is what led to the killing, the cell and eventually the escape.",
    chars: ["sylas", "lux"],
    verified: true,
  },

  /* --------------------------------------------------------------- FACTION */
  {
    kind: "FACTION",
    prompt: "Which faction does LeBlanc lead?",
    options: ["The Black Rose", "The Trifarix", "The Mageseekers", "The Frostguard"],
    correct: 0,
    explanation:
      "The Black Rose is a centuries-old cabal of mages that has installed and discarded Noxian leadership from behind the throne.",
    chars: ["leblanc", "swain"],
    regions: ["noxus"],
    verified: true,
  },
  {
    kind: "FACTION",
    prompt: "Which order was Akali raised in?",
    options: ["Kinkou Order", "Navori Brotherhood", "Order of Shadow", "The Firelights"],
    correct: 0,
    explanation:
      "Akali inherited the title Fist of Shadow from her mother within the Kinkou, then left the order over its doctrine of restraint.",
    chars: ["akali", "shen"],
    regions: ["ionia"],
    verified: true,
  },
  {
    kind: "FACTION",
    prompt: "Which Demacian order hunts and contains mages?",
    options: ["The Mageseekers", "Dauntless Vanguard", "House Lightshield", "The Solari"],
    correct: 0,
    explanation:
      "The Mageseekers find, contain and 'manage' magic inside Demacia. Sylas was used as one of their instruments before becoming their worst outcome.",
    chars: ["sylas", "lux"],
    regions: ["demacia"],
    verified: true,
  },
  {
    kind: "FACTION",
    prompt: "Which faction is Viktor's project?",
    options: [
      "The Glorious Evolution",
      "The Chem-Barons",
      "The Firelights",
      "Clan Ferros",
    ],
    correct: 0,
    explanation:
      "The Glorious Evolution is Viktor's programme to free humanity from flesh by replacing it — applied to himself first.",
    chars: ["viktor"],
    regions: ["zaun"],
    verified: true,
  },
  {
    kind: "FACTION",
    prompt: "Which of these is Ashe's coalition in the Freljord?",
    options: ["Avarosan", "Frostguard", "Winter's Claw", "The Iron Order"],
    correct: 0,
    explanation:
      "Ashe leads the Avarosan, which grows by absorbing rival tribes rather than destroying them — an approach the north finds suspicious.",
    chars: ["ashe", "lissandra"],
    regions: ["freljord"],
    verified: true,
  },
  {
    kind: "FACTION",
    prompt: "Which faction do Senna and Akshan both belong to?",
    options: [
      "Sentinels of Light",
      "The Black Mist",
      "The Shuriman Empire",
      "The Kinkou Order",
    ],
    correct: 0,
    explanation:
      "The Sentinels of Light exist to push back the Black Mist. Senna is its hardest-won authority; Akshan treats its mandate as advisory.",
    chars: ["senna", "akshan"],
    regions: ["shadow-isles", "shurima"],
    verified: true,
  },
  {
    kind: "FACTION",
    prompt: "Which Noxian institution did Swain create to replace singular rule?",
    options: ["The Trifarix", "The Black Rose", "The Crimson Circle", "The Iron Order"],
    correct: 0,
    explanation:
      "Might, Guile and Vision. Three offices, no single ruler, and therefore no single target for a cabal to capture.",
    chars: ["swain", "darius"],
    regions: ["noxus"],
    verified: true,
  },
  {
    kind: "FACTION",
    prompt: "Ekko leads which undercity crew?",
    options: ["The Firelights", "The Chem-Barons", "The Wardens", "The Sump Snipes"],
    correct: 0,
    explanation:
      "The Firelights strike at chemtech traffickers and disappear. Ekko organised them to protect the few streets he actually cares about.",
    chars: ["ekko"],
    regions: ["zaun"],
    verified: true,
  },
  {
    kind: "FACTION",
    prompt: "Which Targonian faction suppressed the Lunari?",
    options: ["The Solari", "The Aspects", "The Rakkor", "The Celestials"],
    correct: 0,
    explanation:
      "The Solari consolidated power and wrote the moon faith out of Targon's scriptures. Diana's existence is the proof that it did not take.",
    chars: ["diana", "leona"],
    regions: ["targon"],
    verified: true,
  },

  /* --------------------------------------------------------- CANON OR NOT */
  {
    kind: "CANON_OR_NOT",
    prompt:
      "Aatrox's connection to Kayle and Morgana belongs to which part of League's lore?",
    options: [
      "Old lore, since replaced",
      "Current canon",
      "An alternate universe skin line",
      "Never existed",
    ],
    correct: 0,
    explanation:
      "Pre-2018 lore tied Aatrox to celestial conflict alongside Kayle and Morgana. His rewrite made him a Shuriman Darkin, so LoreGraph flags that edge OLD_LORE.",
    chars: ["aatrox", "kayle", "morgana"],
    verified: true,
    canonStatus: "LEGACY_LORE",
  },
  {
    kind: "CANON_OR_NOT",
    prompt: "How does LoreGraph classify Arcane relative to Runeterra's main timeline?",
    options: [
      "Partially reconciled with current Runeterra canon",
      "Fully identical canon",
      "Non-canonical fan work",
      "A prequel to the Rune Wars",
    ],
    correct: 0,
    explanation:
      "Arcane is not a wholly separate universe. Riot has reconciled some Arcane material into current canon while other details remain pending — LoreGraph marks those cases RECONCILIATION PENDING rather than pretending they are identical.",
    chars: ["jinx", "vi", "viktor", "mel"],
    verified: true,
  },
  {
    kind: "CANON_OR_NOT",
    prompt: "The relationship between Katarina and Garen is best described as:",
    options: [
      "Long-standing community reading, not stated fact",
      "Explicitly confirmed canon",
      "Officially denied",
      "An Arcane-only storyline",
    ],
    correct: 0,
    explanation:
      "It is heavily implied and widely accepted, but not stated outright. LoreGraph marks it AMBIGUOUS rather than asserting it.",
    chars: ["katarina", "garen"],
    verified: true,
  },
  {
    kind: "CANON_OR_NOT",
    prompt:
      "What is the status of the Black Rose's involvement in General Du Couteau's disappearance?",
    options: [
      "A strong inference, not a stated fact",
      "Confirmed in a champion biography",
      "Ruled out entirely",
      "Part of an alternate universe",
    ],
    correct: 0,
    explanation:
      "Du Couteau vanished without a body and with suspiciously little official curiosity. The Black Rose is the standard reading of that silence, and LoreGraph flags it as such.",
    chars: ["katarina", "leblanc"],
    verified: true,
  },
  {
    kind: "CANON_OR_NOT",
    prompt: "Which of these statements about Pantheon is current canon?",
    options: [
      "The Aspect of War was destroyed and the mortal host survived",
      "Pantheon is still purely a celestial vessel",
      "Pantheon and Aatrox have never met",
      "Pantheon is a Darkin",
    ],
    correct: 0,
    explanation:
      "Aatrox killed the Aspect. Atreus survived, kept a fragment, and now fights as a man — which is the whole point of the modern character.",
    chars: ["pantheon", "aatrox"],
    verified: true,
  },
  {
    kind: "CANON_OR_NOT",
    prompt: "In LoreGraph, what does an INDIRECT LORE CONNECTION mean?",
    options: [
      "Two characters are linked through a shared region, faction or event rather than a stated relationship",
      "The connection is non-canonical",
      "The connection was retconned",
      "The characters have never appeared in the same material",
    ],
    correct: 0,
    explanation:
      "Direct edges are explicit character-to-character relationships. Indirect edges are derived from shared regions, factions and events, and are always drawn differently so the two never get confused.",
    chars: ["aatrox", "pantheon"],
    verified: true,
  },
];

export const quizQuestions: QuizQuestion[] = seeds.map((s, i) => ({
  id: `quiz:${i + 1}`,
  universeId: RUNETERRA_ID,
  kind: s.kind,
  prompt: s.prompt,
  clues: s.clues ?? [],
  options: s.options,
  correctIndex: s.correct,
  explanation: s.explanation,
  characterIds: s.chars.map((c) => `char:${c}`),
  regionSlugs: s.regions ?? [],
  difficulty: s.difficulty ?? 2,
  xp: 25,
  verified: s.verified ?? false,
  canonStatus: normalizeCanonStatus(s.canonStatus),
}));

export const quizQuestionById = new Map(quizQuestions.map((q) => [q.id, q]));
