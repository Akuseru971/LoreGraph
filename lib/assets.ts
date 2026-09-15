import { hashString, hexToRgba } from "./utils";

/**
 * Asset abstraction.
 *
 * LoreGraph ships with no third-party artwork. Every visual is generated from
 * the champion's accent colour and slug, which means the product looks
 * finished without hotlinking anyone's images.
 *
 * When you have permission to use official assets (Data Dragon,
 * CommunityDragon, or your own uploads), set NEXT_PUBLIC_ASSET_BASE_URL and the
 * UI switches over without any component changes. Expected layout:
 *
 *   {base}/portrait/{assetKey}.jpg
 *   {base}/splash/{assetKey}.jpg
 *   {base}/story/{assetKey}.jpg
 */

const base = process.env.NEXT_PUBLIC_ASSET_BASE_URL?.replace(/\/$/, "") ?? "";

export const hasRemoteAssets = base.length > 0;

export type AssetVariant = "portrait" | "splash" | "story";

export function assetUrl(key: string, variant: AssetVariant): string | null {
  if (!hasRemoteAssets) return null;
  return `${base}/${variant}/${key}.jpg`;
}

export function portraitUrl(key: string): string | null {
  return assetUrl(key, "portrait");
}

export function splashUrl(key: string): string | null {
  return assetUrl(key, "splash");
}

export interface GeneratedArtwork {
  /** CSS background value, ready to drop into a style prop. */
  background: string;
  /** A second layer that adds depth without extra DOM noise. */
  overlay: string;
  angle: number;
}

/**
 * Deterministic "cinematic" gradient per entity. Two entities never look the
 * same, and the same entity always looks identical across renders.
 */
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

/** Region crest-ish gradient for region and faction cards. */
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
