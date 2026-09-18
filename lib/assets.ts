import { hashString, hexToRgba } from "./utils";
import {
  getChampionAsset,
  getChampionAssetUrl,
  getChampionAssets,
  championArtPosition,
  getEntityAsset,
  getEventAsset,
  getRegionAsset,
  getFactionAsset,
  getManifestIndex,
  hasLocalChampionAssets,
  type ChampionAssetType,
} from "./assets/registry";

export {
  getChampionAsset,
  getChampionAssetUrl,
  getChampionAssets,
  championArtPosition,
  getEntityAsset,
  getEventAsset,
  getRegionAsset,
  getFactionAsset,
  getManifestIndex,
  hasLocalChampionAssets,
  type ChampionAssetType,
};

/** @deprecated Use getChampionAssetUrl — local + CDN assets are always available. */
export const hasRemoteAssets = true;

export type AssetVariant = "portrait" | "splash" | "story" | "card" | "cinematic";

export function assetUrl(key: string, variant: AssetVariant): string | null {
  if (variant === "cinematic") return getChampionAssetUrl(key, "cinematic");
  if (variant === "card") return getChampionAssetUrl(key, "card");
  if (variant === "splash" || variant === "story") return getChampionAssetUrl(key, "splash");
  return getChampionAssetUrl(key, "portrait");
}

export function portraitUrl(key: string): string {
  return getChampionAssetUrl(key, "portrait");
}

export function splashUrl(key: string): string {
  return getChampionAssetUrl(key, "splash");
}

export function cardUrl(key: string): string {
  return getChampionAssetUrl(key, "card");
}

export function cinematicUrl(key: string): string {
  return getChampionAssetUrl(key, "cinematic");
}

export interface GeneratedArtwork {
  background: string;
  overlay: string;
  angle: number;
}

export function generateArtwork(
  key: string,
  accentColor: string,
  variant: AssetVariant = "portrait",
): GeneratedArtwork {
  const seed = hashString(`${key}:${variant}`);
  const angle = 120 + (seed % 120);
  const x = 20 + (seed % 55);
  const y = 10 + ((seed >> 3) % 45);
  const x2 = 60 + ((seed >> 5) % 35);
  const y2 = 55 + ((seed >> 7) % 40);

  const strong = hexToRgba(accentColor, variant === "splash" ? 0.5 : 0.62);
  const mid = hexToRgba(accentColor, 0.2);
  const faint = hexToRgba(accentColor, 0.08);

  return {
    angle,
    background: [
      `radial-gradient(120% 90% at ${x}% ${y}%, ${strong} 0%, transparent 58%)`,
      `radial-gradient(90% 70% at ${x2}% ${y2}%, ${mid} 0%, transparent 62%)`,
      `linear-gradient(${angle}deg, #101521 0%, #080B12 70%)`,
    ].join(", "),
    overlay: `radial-gradient(70% 55% at 50% 118%, ${faint} 0%, transparent 70%)`,
  };
}

export function generateRegionArtwork(
  slug: string,
  accentColor: string,
  secondaryColor: string,
): GeneratedArtwork {
  const seed = hashString(slug);
  const angle = 135 + (seed % 60);
  return {
    angle,
    background: [
      `radial-gradient(100% 120% at 15% 0%, ${hexToRgba(accentColor, 0.42)} 0%, transparent 60%)`,
      `linear-gradient(${angle}deg, ${hexToRgba(secondaryColor, 0.65)} 0%, #0B0F18 75%)`,
    ].join(", "),
    overlay: `radial-gradient(60% 60% at 80% 100%, ${hexToRgba(accentColor, 0.16)} 0%, transparent 70%)`,
  };
}
