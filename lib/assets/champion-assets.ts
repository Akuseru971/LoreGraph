/**
 * Official Riot Data Dragon champion artwork.
 * @see https://developer.riotgames.com/docs/lol#data-dragon
 *
 * Splash and loading art are served from Riot's CDN. LoreGraph uses them as
 * fallbacks-first display with generated gradients only when a mapping fails.
 */

export type ChampionAssetType = "portrait" | "splash" | "card" | "avatar";

/** Pin a stable Data Dragon patch for square icons; splash/loading paths are versionless. */
const DDRAGON_VERSION = "14.24.1";
const DDRAGON_CDN = "https://ddragon.leagueoflegends.com/cdn";

/** Slug → Data Dragon champion key (only exceptions; default is derived). */
const DDRAGON_KEY: Record<string, string> = {
  "aurelion-sol": "AurelionSol",
  "jarvan-iv": "JarvanIV",
  "lee-sin": "LeeSin",
  leblanc: "Leblanc",
  kaisa: "KaiSa",
  nunu: "Nunu",
  "tahm-kench": "TahmKench",
  "cho-gath": "Chogath",
  "kog-maw": "KogMaw",
  "miss-fortune": "MissFortune",
  "master-yi": "MasterYi",
  "twisted-fate": "TwistedFate",
  "dr-mundo": "DrMundo",
  "rek-sai": "RekSai",
  "bel-veth": "Belveth",
};

/** Optional per-champion splash focal point (CSS object-position). */
const ART_POSITION: Record<string, string> = {
  aatrox: "50% 20%",
  pantheon: "50% 25%",
  thresh: "50% 30%",
  jinx: "50% 35%",
  yasuo: "50% 28%",
  lux: "50% 30%",
  mordekaiser: "50% 22%",
};

export function ddragonChampionKey(slug: string): string {
  if (DDRAGON_KEY[slug]) return DDRAGON_KEY[slug];
  return slug
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join("");
}

export function championArtPosition(slug: string): string {
  return ART_POSITION[slug] ?? "50% 30%";
}

export function getChampionAssetUrl(
  slug: string,
  type: ChampionAssetType = "portrait",
): string {
  const key = ddragonChampionKey(slug);
  switch (type) {
    case "splash":
      return `${DDRAGON_CDN}/img/champion/splash/${key}_0.jpg`;
    case "card":
    case "avatar":
    case "portrait":
    default:
      return `${DDRAGON_CDN}/${DDRAGON_VERSION}/img/champion/${key}.png`;
  }
}

export function getChampionLoadingUrl(slug: string): string {
  const key = ddragonChampionKey(slug);
  return `${DDRAGON_CDN}/img/champion/loading/${key}_0.jpg`;
}

export interface ChampionAssetSet {
  portraitUrl: string;
  splashUrl: string;
  squareUrl: string;
  loadingUrl: string;
  objectPosition: string;
}

export function getChampionAssets(slug: string): ChampionAssetSet {
  return {
    portraitUrl: getChampionAssetUrl(slug, "portrait"),
    splashUrl: getChampionAssetUrl(slug, "splash"),
    squareUrl: getChampionAssetUrl(slug, "avatar"),
    loadingUrl: getChampionLoadingUrl(slug),
    objectPosition: championArtPosition(slug),
  };
}

/** Resolve asset URL for a character-like object. */
export function getChampionAsset(
  champion: { slug: string; assetKey?: string },
  type: ChampionAssetType = "portrait",
): string {
  const slug = champion.assetKey ?? champion.slug;
  return getChampionAssetUrl(slug, type);
}
