import type { MetadataRoute } from "next";
import { characters } from "@/data";
import { siteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${siteUrl}`, lastModified: now, changeFrequency: "daily", priority: 1 },
    { url: `${siteUrl}/connect`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${siteUrl}/me`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
  ];

  const championRoutes = characters.map((character) => ({
    url: `${siteUrl}/champion/${character.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: character.featured ? 0.9 : 0.7,
  }));

  return [...staticRoutes, ...championRoutes];
}
