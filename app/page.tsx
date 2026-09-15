import type { Metadata } from "next";
import { DiscoverScreen } from "@/components/discover/discover-screen";
import type { RegionSlug } from "@/types";

export const metadata: Metadata = {
  title: "Understand Runeterra",
  description:
    "Every character. Every conflict. Every connection. Explore Runeterra as an interactive network of champions, factions and stories.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "LoreGraph — Understand Runeterra",
    description:
      "Every character. Every conflict. Every connection. Explore Runeterra as an interactive network.",
    url: "/",
  },
};

export default async function DiscoverPage({
  searchParams,
}: PageProps<"/">) {
  const params = await searchParams;
  const region =
    typeof params.region === "string" ? (params.region as RegionSlug) : null;
  const faction = typeof params.faction === "string" ? params.faction : null;

  return <DiscoverScreen initialRegion={region} initialFaction={faction} />;
}
