import manifestData from "@/data/assets/manifest-index.json";
import {
  getChampionAssetUrl as cdnChampionUrl,
  getChampionLoadingUrl as cdnLoadingUrl,
  ddragonChampionKey,
} from "./champion-assets";
import { getAssetObjectPosition } from "./focal-points";
import type { AssetManifestIndex, AssetRole, ChampionAssetIndex, FocalMode } from "./types";

export type ChampionAssetType =
  | "portrait"
  | "splash"
  | "card"
  | "avatar"
  | "hero"
  | "cinematic"
  | "loading";

const ROLE_MAP: Record<ChampionAssetType, AssetRole> = {
  portrait: "PORTRAIT",
  avatar: "PORTRAIT",
  card: "CARD",
  splash: "HERO",
  hero: "HERO",
  cinematic: "CINEMATIC",
  loading: "LOADING",
};

const index = manifestData as AssetManifestIndex;

function normalizeSlug(slug: string): string {
  return slug.toLowerCase().replace(/_/g, "-");
}

function championEntry(slug: string): ChampionAssetIndex | null {
  const key = normalizeSlug(slug);
  return index?.champions[key] ?? null;
}

function pathForRole(entry: ChampionAssetIndex, type: ChampionAssetType): string | null {
  switch (type) {
    case "portrait":
    case "avatar":
      return entry.portrait;
    case "card":
      return entry.card ?? entry.portrait;
    case "splash":
    case "hero":
      return entry.hero ?? entry.master;
    case "cinematic":
      return entry.cinematic;
    case "loading":
      return entry.loading;
    default:
      return null;
  }
}

/** CDN fallback when local materialized asset is unavailable. */
function cdnFallback(slug: string, type: ChampionAssetType): string {
  switch (type) {
    case "loading":
      return cdnLoadingUrl(slug);
    case "splash":
    case "hero":
    case "cinematic":
      return cdnChampionUrl(slug, "splash");
    case "card":
      return cdnChampionUrl(slug, "splash");
    case "portrait":
    case "avatar":
    default:
      return cdnChampionUrl(slug, "portrait");
  }
}

export function hasLocalChampionAssets(slug: string): boolean {
  const entry = championEntry(slug);
  return Boolean(entry?.portrait || entry?.card || entry?.hero);
}

export function getChampionAssetUrl(
  slug: string,
  type: ChampionAssetType = "portrait",
): string {
  const entry = championEntry(slug);
  const local = entry ? pathForRole(entry, type) : null;
  if (local) return local;
  return cdnFallback(slug, type);
}

export function getChampionAsset(
  champion: { slug: string; assetKey?: string },
  type: ChampionAssetType = "portrait",
): string {
  const slug = champion.assetKey ?? champion.slug;
  return getChampionAssetUrl(slug, type);
}

export function championArtPosition(
  slug: string,
  mode: FocalMode = "HERO",
): string {
  const entry = championEntry(slug);
  const focal = entry
    ? { desktop: entry.desktopFocal, mobile: entry.mobileFocal }
    : undefined;
  return getAssetObjectPosition(slug, mode, focal);
}

export function getChampionFocal(slug: string) {
  const entry = championEntry(slug);
  return entry
    ? { desktop: entry.desktopFocal, mobile: entry.mobileFocal }
    : null;
}

export function getChampionAssets(slug: string) {
  return {
    portraitUrl: getChampionAssetUrl(slug, "portrait"),
    splashUrl: getChampionAssetUrl(slug, "splash"),
    squareUrl: getChampionAssetUrl(slug, "avatar"),
    loadingUrl: getChampionAssetUrl(slug, "loading"),
    cardUrl: getChampionAssetUrl(slug, "card"),
    heroUrl: getChampionAssetUrl(slug, "hero"),
    cinematicUrl: getChampionAssetUrl(slug, "cinematic"),
    objectPosition: championArtPosition(slug, "HERO"),
    cardPosition: championArtPosition(slug, "CARD"),
    cinematicPosition: championArtPosition(slug, "CINEMATIC"),
    hasLocal: hasLocalChampionAssets(slug),
    qaStatus: championEntry(slug)?.qaStatus ?? "NEEDS_VISUAL_QA",
    sourceUrl: championEntry(slug)?.sourceUrl ?? null,
  };
}

export function getEntityAsset(
  entityId: string,
  role: AssetRole = "HERO",
): string | null {
  if (!index) return null;
  const slug = entityId.includes(":") ? entityId.split(":").slice(1).join(":") : entityId;

  if (entityId.startsWith("char:") || entityId.startsWith("champion:")) {
    const typeMap: Partial<Record<AssetRole, ChampionAssetType>> = {
      PORTRAIT: "portrait",
      CARD: "card",
      HERO: "hero",
      CINEMATIC: "cinematic",
      MASTER: "splash",
      LOADING: "loading",
    };
    const t = typeMap[role] ?? "hero";
    return getChampionAssetUrl(slug, t);
  }

  const collections = [
    index.events,
    index.regions,
    index.factions,
    index.artifacts,
  ] as const;

  for (const collection of collections) {
    const meta = collection[slug];
    if (meta?.publicPath) return meta.publicPath;
  }

  return null;
}

export function getEventAsset(eventSlug: string, role: AssetRole = "HERO"): string | null {
  return getEntityAsset(`event:${eventSlug}`, role);
}

export function getRegionAsset(regionSlug: string, role: AssetRole = "HERO"): string | null {
  return getEntityAsset(`region:${regionSlug}`, role);
}

export function getFactionAsset(factionSlug: string, role: AssetRole = "HERO"): string | null {
  const emblem = index?.factions[factionSlug];
  if (role === "EMBLEM" && emblem?.publicPath) return emblem.publicPath;
  const heroKey = Object.keys(index?.factions ?? {}).find((k) => k === factionSlug);
  if (heroKey && index?.factions[heroKey]?.publicPath) {
    return index.factions[heroKey].publicPath;
  }
  return null;
}

export function getManifestIndex() {
  return index;
}

export { ddragonChampionKey };
