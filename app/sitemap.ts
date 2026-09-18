import type { MetadataRoute } from "next";
import { characters } from "@/data";
import { getSiteUrl, isProductionIndexable } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  if (!isProductionIndexable()) return [];

  const now = new Date();
  const origin = getSiteUrl();
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${origin}`, lastModified: now, changeFrequency: "daily", priority: 1 },
    { url: `${origin}/connect`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${origin}/me`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
  ];

  const championRoutes = characters.map((character) => ({
    url: `${origin}/champion/${character.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: character.featured ? 0.9 : 0.7,
  }));

  return [...staticRoutes, ...championRoutes];
}
