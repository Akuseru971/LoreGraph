import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { characterById, storyPathsForCharacter } from "@/data";
import { ChampionScreen } from "@/components/champion/champion-screen";
import type { CoreRelationship } from "@/components/champion/overview-panel";
import { loreRepository } from "@/lib/data/lore-repository";
import {
  buildLoreGraph,
  getCharacterGraph,
  getDirectRelationships,
  getNeighbors,
  relationshipCounterpart,
} from "@/lib/graph";
import { absoluteUrl } from "@/lib/seo";

export function generateStaticParams() {
  return loreRepository.listCharacters().map((character) => ({
    slug: character.slug,
  }));
}

export async function generateMetadata({
  params,
}: PageProps<"/champion/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const character = loreRepository.getCharacter(slug);
  if (!character) return { title: "Champion not found" };

  const title = `${character.name} Lore, Relationships & Timeline`;
  const description = `Explore ${character.name}'s story, relationships, timeline and connections across Runeterra.`;

  return {
    title,
    description,
    alternates: { canonical: `/champion/${character.slug}` },
    openGraph: {
      title: `${title} | LoreGraph`,
      description,
      url: absoluteUrl(`/champion/${character.slug}`),
      type: "profile",
    },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function ChampionPage({
  params,
}: PageProps<"/champion/[slug]">) {
  const { slug } = await params;
  const character = loreRepository.getCharacter(slug);
  if (!character) notFound();

  const graph = buildLoreGraph();
  const center = graph.nodes.get(character.id);
  const ego = getCharacterGraph(character.id, { maxNodes: 30 }, graph);
  if (!center || !ego) notFound();

  const neighbors = getNeighbors(character.id, {}, graph);

  // Edges strictly between the neighbours, so the ego network shows clusters.
  const included = new Set(neighbors.map((n) => n.node.id));
  const crossEdges = ego.edges.filter(
    (edge) =>
      edge.source !== character.id &&
      edge.target !== character.id &&
      included.has(edge.source) &&
      included.has(edge.target),
  );

  const core: CoreRelationship[] = getDirectRelationships(character.id)
    .slice(0, 6)
    .map((relationship) => {
      const other = characterById.get(
        relationshipCounterpart(relationship, character.id),
      );
      return other ? { relationship, other } : null;
    })
    .filter((entry): entry is CoreRelationship => entry !== null);

  const stories = storyPathsForCharacter(character.id);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: `${character.name} — ${character.title}`,
    description: character.shortDescription,
    about: {
      "@type": "Person",
      name: character.name,
      alternateName: character.aliases,
      description: character.shortDescription,
    },
    isPartOf: {
      "@type": "WebSite",
      name: "LoreGraph",
      url: absoluteUrl("/"),
    },
    url: absoluteUrl(`/champion/${character.slug}`),
  };

  return (
    <>
      <article className="sr-only" aria-label={`${character.name} lore summary`}>
        <h1>{character.name} — {character.title}</h1>
        <p>{character.shortDescription}</p>
        {character.longDescription.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </article>
      <script
        type="application/ld+json"
        // Derived from our own seed content, so there is nothing user-supplied here.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <Suspense fallback={null}>
        <ChampionScreen
          character={character}
          center={center}
          neighbors={neighbors}
          crossEdges={crossEdges}
          core={core}
          stories={stories}
        />
      </Suspense>
    </>
  );
}
