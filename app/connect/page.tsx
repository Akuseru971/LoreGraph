import type { Metadata } from "next";
import { Suspense } from "react";
import { ConnectExperience } from "@/components/connect/connect-experience";
import { parseConnectParams } from "@/lib/connect/inspiration";
import { dailyConnection } from "@/lib/data/daily";
import { loreRepository } from "@/lib/data/lore-repository";
import { findPaths } from "@/lib/graph";

export const metadata: Metadata = {
  title: "Connect any two champions",
  description:
    "Find the path between any two Runeterra champions — the shortest route and the one that reads like a story, with every step explained.",
  alternates: { canonical: "/connect" },
  openGraph: {
    title: "Connect any two champions | LoreGraph",
    description:
      "Discover the shortest path between two champions' stories, step by step.",
    url: "/connect",
  },
};

export default async function ConnectPage({
  searchParams,
}: PageProps<"/connect">) {
  const params = await searchParams;
  const { a: aSlug, b: bSlug } = parseConnectParams(params);

  const a = aSlug ? loreRepository.getCharacter(aSlug) : null;
  const b = bSlug ? loreRepository.getCharacter(bSlug) : null;

  // Server-computed so a shared link renders the result immediately; the
  // client recomputes locally for every pick after that.
  const paths = a && b && a.id !== b.id ? findPaths(a.id, b.id) : [];
  const daily = dailyConnection();

  return (
    <Suspense fallback={null}>
      <ConnectExperience
        initialA={a?.slug ?? null}
        initialB={b?.slug ?? null}
        initialPaths={paths}
        daily={daily}
      />
    </Suspense>
  );
}
