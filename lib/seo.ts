/** Single source of truth for the public site origin. */
export function getSiteUrl(): string {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "");
  }
  if (process.env.VERCEL_ENV === "production" && process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  }
  return "http://localhost:3000";
}

/** Normalized production origin — prefer NEXT_PUBLIC_SITE_URL. */
export const SITE_URL = getSiteUrl();

/** @deprecated Use getSiteUrl() or SITE_URL */
export const siteUrl = SITE_URL;

export function absoluteUrl(path: string): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return new URL(normalized, getSiteUrl()).toString();
}

/** Production allows indexing; preview/staging deployments do not. */
export function isProductionIndexable(): boolean {
  if (process.env.VERCEL_ENV === "preview") return false;
  if (process.env.VERCEL_ENV === "development") return false;
  if (process.env.NODE_ENV !== "production") return false;
  return true;
}

export function robotsDirective(): { index: boolean; follow: boolean } {
  const indexable = isProductionIndexable();
  return { index: indexable, follow: indexable };
}

const FORBIDDEN_ORIGINS = [
  "lore-graph.vercel.app",
  "lore-graph-lovat.vercel.app",
];

/** Returns hardcoded legacy origins found in text (for validation). */
export function findForbiddenOrigins(text: string): string[] {
  return FORBIDDEN_ORIGINS.filter((origin) => text.includes(origin));
}
