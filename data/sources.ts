import { normalizeCanonStatus } from "@/lib/canon/model";
import type { Source } from "@/types";
import { rosterBySlug, rosterSlugs } from "./roster";

/**
 * Sources are deliberately conservative: we reference the canonical publications
 * a fact *can* be checked against rather than asserting page-level citations.
 * Everything unverified in the seed is marked so an editor can review it later.
 */

export const championSlugs = rosterSlugs;

export type ChampionSlug = string;

export const bioSourceId = (slug: string) => `source:bio-${slug}`;

const displayName = (slug: string) =>
  rosterBySlug.get(slug)?.name ??
  slug
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");

const biographies: Source[] = championSlugs.map((slug) => ({
  id: bioSourceId(slug),
  title: `${displayName(slug)} — Champion Biography`,
  type: "Champion Biography",
  url: `https://www.leagueoflegends.com/en-us/champions/${slug}/`,
  publisher: "Riot Games",
  publicationDate: null,
  canonStatus: "CURRENT_CANON",
  authorityTier: "PRIMARY_OFFICIAL" as const,
  domain: "leagueoflegends.com",
  mediaType: "web",
  continuity: "MAIN_RUNETERRA" as const,
}));

const publications: Source[] = [
  {
    id: "source:universe",
    title: "Runeterra Universe — Regions & Factions",
    type: "Developer Post",
    url: "https://universe.leagueoflegends.com/en_US/",
    publisher: "Riot Games",
    publicationDate: null,
    canonStatus: "CURRENT_CANON",
  },
  {
    id: "source:arcane",
    title: "Arcane",
    type: "Series",
    url: "https://www.netflix.com/title/81435684",
    publisher: "Riot Games / Fortiche / Netflix",
    publicationDate: "2021-11-06",
    canonStatus: "RECONCILIATION_PENDING",
  },
  {
    id: "source:ruination-novel",
    title: "Ruination: A League of Legends Novel",
    type: "Novel",
    url: "https://universe.leagueoflegends.com/en_US/story/ruination/",
    publisher: "Orbit / Riot Games",
    publicationDate: "2022-09-13",
    canonStatus: "CURRENT_CANON",
  },
  {
    id: "source:ruined-king-game",
    title: "Ruined King: A League of Legends Story",
    type: "Game",
    url: "https://www.riotgames.com/en/news/ruined-king-a-league-of-legends-story",
    publisher: "Airship Syndicate / Riot Forge",
    publicationDate: "2021-11-16",
    canonStatus: "CURRENT_CANON",
  },
  {
    id: "source:convergence-game",
    title: "Conv/rgence: A League of Legends Story",
    type: "Game",
    url: "https://www.riotgames.com/en/news/convergence-a-league-of-legends-story",
    publisher: "Double Stallion / Riot Forge",
    publicationDate: "2023-05-23",
    canonStatus: "CURRENT_CANON",
  },
  {
    id: "source:lor",
    title: "Legends of Runeterra — Card Lore",
    type: "Game",
    url: "https://playruneterra.com/",
    publisher: "Riot Games",
    publicationDate: null,
    canonStatus: "CURRENT_CANON",
  },
  {
    id: "source:league-game",
    title: "League of Legends",
    type: "Game",
    url: "https://www.leagueoflegends.com/",
    publisher: "Riot Games",
    publicationDate: null,
    canonStatus: "CURRENT_CANON",
  },
  {
    id: "source:awaken",
    title: "Awaken",
    type: "Cinematic",
    url: "https://www.youtube.com/watch?v=pAnKsFmVn4g",
    publisher: "Riot Games",
    publicationDate: "2019-01-11",
    canonStatus: "CURRENT_CANON",
  },
  {
    id: "source:warriors-2020",
    title: "Warriors",
    type: "Cinematic",
    url: "https://www.youtube.com/watch?v=gJKNZmb1jeM",
    publisher: "Riot Games",
    publicationDate: "2020-01-09",
    canonStatus: "CURRENT_CANON",
  },
  {
    id: "source:a-new-dawn",
    title: "A New Dawn",
    type: "Cinematic",
    url: "https://www.youtube.com/watch?v=vzHrjOMfHPY",
    publisher: "Riot Games",
    publicationDate: "2014-08-22",
    canonStatus: "LEGACY_LORE",
  },
  {
    id: "source:rise",
    title: "Rise",
    type: "Cinematic",
    url: "https://www.youtube.com/watch?v=fB8TyLTD7EE",
    publisher: "Riot Games",
    publicationDate: "2018-09-22",
    canonStatus: "CURRENT_CANON",
  },
  {
    id: "source:still-here",
    title: "Still Here",
    type: "Cinematic",
    url: "https://www.youtube.com/watch?v=k3Wu4vrtTZE",
    publisher: "Riot Games",
    publicationDate: "2021-01-08",
    canonStatus: "CURRENT_CANON",
  },
  {
    id: "source:ashe-warmother",
    title: "Ashe: Warmother",
    type: "Comic",
    url: "https://universe.leagueoflegends.com/en_US/comic/ashe-warmother/",
    publisher: "Riot Games / Marvel",
    publicationDate: "2017-11-14",
    canonStatus: "CURRENT_CANON",
  },
  {
    id: "source:lux-comic",
    title: "Lux",
    type: "Comic",
    url: "https://universe.leagueoflegends.com/en_US/comic/lux/",
    publisher: "Riot Games / Marvel",
    publicationDate: "2019-01-16",
    canonStatus: "CURRENT_CANON",
  },
  {
    id: "source:zed-comic",
    title: "Zed",
    type: "Comic",
    url: "https://universe.leagueoflegends.com/en_US/comic/zed/",
    publisher: "Riot Games / Marvel",
    publicationDate: "2019-08-14",
    canonStatus: "CURRENT_CANON",
  },
  {
    id: "source:ryze-call-of-power",
    title: "Ryze: Call of Power",
    type: "Series",
    url: "https://universe.leagueoflegends.com/en_US/story/ryze-call-of-power/",
    publisher: "Riot Games",
    publicationDate: "2016-11-15",
    canonStatus: "CURRENT_CANON",
  },
  {
    id: "source:twilight-of-the-gods",
    title: "Twilight of the Gods",
    type: "Short Story",
    url: "https://universe.leagueoflegends.com/en_US/story/twilight-of-the-gods/",
    publisher: "Riot Games",
    publicationDate: "2018-01-11",
    canonStatus: "CURRENT_CANON",
  },
  {
    id: "source:editor-review",
    title: "LoreGraph Editorial Summary (pending review)",
    type: "Developer Post",
    url: "/about#editorial",
    publisher: "LoreGraph",
    publicationDate: null,
    canonStatus: "AMBIGUOUS",
    authorityTier: "DISCOVERY_ONLY",
  },
  {
    id: "source:wiki-ambessa",
    title: "League of Legends Wiki — Ambessa",
    type: "Wiki Universe",
    url: "https://wiki.leagueoflegends.com/en-us/Ambessa",
    publisher: "Riot Games Community Wiki",
    publicationDate: null,
    canonStatus: "CURRENT_CANON",
    authorityTier: "OFFICIAL_COMMUNITY_REFERENCE",
    domain: "wiki.leagueoflegends.com",
    mediaType: "web",
    originalSourceId: "source:bio-ambessa",
  },
  {
    id: "source:wiki-yunara",
    title: "League of Legends Wiki — Yunara",
    type: "Wiki Universe",
    url: "https://wiki.leagueoflegends.com/en-us/Yunara",
    publisher: "Riot Games Community Wiki",
    publicationDate: null,
    canonStatus: "CURRENT_CANON",
    authorityTier: "OFFICIAL_COMMUNITY_REFERENCE",
    domain: "wiki.leagueoflegends.com",
    mediaType: "web",
    originalSourceId: "source:bio-yunara",
  },
];

function enrichSource(s: Source): Source {
  const authorityTier =
    s.authorityTier ??
    (s.publisher === "Riot Games" || s.publisher.includes("Riot")
      ? "PRIMARY_OFFICIAL"
      : s.type === "Wiki Universe" || s.type === "Wiki Reference"
        ? "OFFICIAL_COMMUNITY_REFERENCE"
        : "OFFICIAL_PUBLISHED");
  return {
    ...s,
    canonStatus: normalizeCanonStatus(s.canonStatus),
    authorityTier,
    domain: s.domain ?? (() => {
      try {
        return new URL(s.url).hostname;
      } catch {
        return undefined;
      }
    })(),
  };
}

export const sources: Source[] = [...publications, ...biographies].map(enrichSource);
export const sourceById = new Map(sources.map((s) => [s.id, s]));
