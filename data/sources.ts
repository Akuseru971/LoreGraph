import type { Source } from "@/types";

/**
 * Sources are deliberately conservative: we reference the canonical publications
 * a fact *can* be checked against rather than asserting page-level citations.
 * Everything unverified in the seed is marked so an editor can review it later.
 */

export const championSlugs = [
  "aatrox",
  "ahri",
  "akali",
  "akshan",
  "ashe",
  "aurelion-sol",
  "azir",
  "caitlyn",
  "camille",
  "darius",
  "diana",
  "draven",
  "ekko",
  "garen",
  "irelia",
  "jarvan-iv",
  "jhin",
  "jinx",
  "kaisa",
  "kalista",
  "karma",
  "katarina",
  "kayle",
  "kindred",
  "leblanc",
  "lee-sin",
  "leona",
  "lissandra",
  "lux",
  "mel",
  "mordekaiser",
  "morgana",
  "nasus",
  "pantheon",
  "riven",
  "ryze",
  "senna",
  "shen",
  "singed",
  "swain",
  "sylas",
  "syndra",
  "thresh",
  "varus",
  "vi",
  "viego",
  "viktor",
  "xayah",
  "yasuo",
  "yone",
] as const;

export type ChampionSlug = (typeof championSlugs)[number];

export const bioSourceId = (slug: string) => `source:bio-${slug}`;

const displayName = (slug: string) =>
  slug
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ")
    .replace("Kaisa", "Kai'Sa")
    .replace("Jarvan Iv", "Jarvan IV")
    .replace("Leblanc", "LeBlanc")
    .replace("Aurelion Sol", "Aurelion Sol");

const biographies: Source[] = championSlugs.map((slug) => ({
  id: bioSourceId(slug),
  title: `${displayName(slug)} — Champion Biography`,
  type: "Champion Biography",
  url: `https://universe.leagueoflegends.com/en_US/champion/${slug}/`,
  publisher: "Riot Games",
  publicationDate: null,
  canonStatus: "CANON",
}));

const publications: Source[] = [
  {
    id: "source:universe",
    title: "Runeterra Universe — Regions & Factions",
    type: "Developer Post",
    url: "https://universe.leagueoflegends.com/en_US/",
    publisher: "Riot Games",
    publicationDate: null,
    canonStatus: "CANON",
  },
  {
    id: "source:arcane",
    title: "Arcane",
    type: "Series",
    url: "https://www.netflix.com/title/81435684",
    publisher: "Riot Games / Fortiche / Netflix",
    publicationDate: "2021-11-06",
    canonStatus: "ALTERNATE_UNIVERSE",
  },
  {
    id: "source:ruination-novel",
    title: "Ruination: A League of Legends Novel",
    type: "Novel",
    url: "https://universe.leagueoflegends.com/en_US/story/ruination/",
    publisher: "Orbit / Riot Games",
    publicationDate: "2022-09-13",
    canonStatus: "CANON",
  },
  {
    id: "source:ruined-king-game",
    title: "Ruined King: A League of Legends Story",
    type: "Game",
    url: "https://www.riotgames.com/en/news/ruined-king-a-league-of-legends-story",
    publisher: "Airship Syndicate / Riot Forge",
    publicationDate: "2021-11-16",
    canonStatus: "CANON",
  },
  {
    id: "source:convergence-game",
    title: "Conv/rgence: A League of Legends Story",
    type: "Game",
    url: "https://www.riotgames.com/en/news/convergence-a-league-of-legends-story",
    publisher: "Double Stallion / Riot Forge",
    publicationDate: "2023-05-23",
    canonStatus: "CANON",
  },
  {
    id: "source:lor",
    title: "Legends of Runeterra — Card Lore",
    type: "Game",
    url: "https://playruneterra.com/",
    publisher: "Riot Games",
    publicationDate: null,
    canonStatus: "CANON",
  },
  {
    id: "source:league-game",
    title: "League of Legends",
    type: "Game",
    url: "https://www.leagueoflegends.com/",
    publisher: "Riot Games",
    publicationDate: null,
    canonStatus: "CANON",
  },
  {
    id: "source:awaken",
    title: "Awaken",
    type: "Cinematic",
    url: "https://www.youtube.com/watch?v=pAnKsFmVn4g",
    publisher: "Riot Games",
    publicationDate: "2019-01-11",
    canonStatus: "CANON",
  },
  {
    id: "source:warriors-2020",
    title: "Warriors",
    type: "Cinematic",
    url: "https://www.youtube.com/watch?v=gJKNZmb1jeM",
    publisher: "Riot Games",
    publicationDate: "2020-01-09",
    canonStatus: "CANON",
  },
  {
    id: "source:a-new-dawn",
    title: "A New Dawn",
    type: "Cinematic",
    url: "https://www.youtube.com/watch?v=vzHrjOMfHPY",
    publisher: "Riot Games",
    publicationDate: "2014-08-22",
    canonStatus: "OLD_LORE",
  },
  {
    id: "source:rise",
    title: "Rise",
    type: "Cinematic",
    url: "https://www.youtube.com/watch?v=fB8TyLTD7EE",
    publisher: "Riot Games",
    publicationDate: "2018-09-22",
    canonStatus: "CANON",
  },
  {
    id: "source:still-here",
    title: "Still Here",
    type: "Cinematic",
    url: "https://www.youtube.com/watch?v=k3Wu4vrtTZE",
    publisher: "Riot Games",
    publicationDate: "2021-01-08",
    canonStatus: "CANON",
  },
  {
    id: "source:ashe-warmother",
    title: "Ashe: Warmother",
    type: "Comic",
    url: "https://universe.leagueoflegends.com/en_US/comic/ashe-warmother/",
    publisher: "Riot Games / Marvel",
    publicationDate: "2017-11-14",
    canonStatus: "CANON",
  },
  {
    id: "source:lux-comic",
    title: "Lux",
    type: "Comic",
    url: "https://universe.leagueoflegends.com/en_US/comic/lux/",
    publisher: "Riot Games / Marvel",
    publicationDate: "2019-01-16",
    canonStatus: "CANON",
  },
  {
    id: "source:zed-comic",
    title: "Zed",
    type: "Comic",
    url: "https://universe.leagueoflegends.com/en_US/comic/zed/",
    publisher: "Riot Games / Marvel",
    publicationDate: "2019-08-14",
    canonStatus: "CANON",
  },
  {
    id: "source:ryze-call-of-power",
    title: "Ryze: Call of Power",
    type: "Series",
    url: "https://universe.leagueoflegends.com/en_US/story/ryze-call-of-power/",
    publisher: "Riot Games",
    publicationDate: "2016-11-15",
    canonStatus: "CANON",
  },
  {
    id: "source:twilight-of-the-gods",
    title: "Twilight of the Gods",
    type: "Short Story",
    url: "https://universe.leagueoflegends.com/en_US/story/twilight-of-the-gods/",
    publisher: "Riot Games",
    publicationDate: "2018-01-11",
    canonStatus: "CANON",
  },
  {
    id: "source:editor-review",
    title: "LoreGraph Editorial Summary (pending review)",
    type: "Developer Post",
    url: "/about#editorial",
    publisher: "LoreGraph",
    publicationDate: null,
    canonStatus: "AMBIGUOUS",
  },
];

export const sources: Source[] = [...publications, ...biographies];
export const sourceById = new Map(sources.map((s) => [s.id, s]));
