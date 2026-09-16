import { characterById, factionBySlug, regionBySlug } from "@/data";
import { contextualEdgeDescription } from "@/lib/knowledge/edge-explanations";
import type { GraphEdge, GraphNode, PathStep } from "@/types";

/**
 * One-sentence explanation for each hop in a connection path.
 * Character nodes get their short bio; entities get contextual copy.
 */
export function explainNode(node: GraphNode): string {
  if (node.type === "character") {
    const character = characterById.get(node.id);
    if (character) return character.shortDescription;
    return node.metadata.description ?? `${node.name} in Runeterra's lore.`;
  }

  if (node.type === "region") {
    const region = regionBySlug.get(node.slug as Parameters<typeof regionBySlug.get>[0]);
    if (region) return region.shortDescription;
    return node.metadata.description ?? `A region of Runeterra.`;
  }

  if (node.type === "faction") {
    const faction = factionBySlug.get(node.slug);
    if (faction) return faction.shortDescription;
    return node.metadata.description ?? `A faction shaping Runeterra's politics.`;
  }

  if (node.type === "event") {
    return node.metadata.description ?? `A pivotal moment in Runeterra's history.`;
  }

  return node.metadata.description ?? `${node.name}.`;
}

export function explainStep(step: PathStep): {
  headline: string;
  body: string;
  kind: "direct" | "indirect";
} {
  const { from, to, edge } = step;

  if (edge.connectionKind === "direct") {
    return {
      headline: `${from.name} → ${to.name}`,
      body: edge.description,
      kind: "direct",
    };
  }

  if (from.type === "character" && to.type === "region") {
    const region = regionBySlug.get(to.slug as Parameters<typeof regionBySlug.get>[0]);
    return {
      headline: to.name.toUpperCase(),
      body: region?.shortDescription ?? edge.description,
      kind: "indirect",
    };
  }

  if (from.type === "character" && to.type === "faction") {
    const faction = factionBySlug.get(to.slug);
    return {
      headline: to.name.toUpperCase(),
      body: faction?.shortDescription ?? edge.description,
      kind: "indirect",
    };
  }

  if (to.type === "event") {
    return {
      headline: to.name.toUpperCase(),
      body: contextualEdgeDescription(edge, from, to),
      kind: "indirect",
    };
  }

  return {
    headline: `${from.name} → ${to.name}`,
    body: contextualEdgeDescription(edge, from, to),
    kind: "indirect",
  };
}

/** Build a display path: one node explanation per hop endpoint, deduped. */
export function pathNarrative(steps: PathStep[]): Array<{
  node: GraphNode;
  explanation: string;
  edge?: GraphEdge;
}> {
  if (steps.length === 0) return [];

  const items: Array<{ node: GraphNode; explanation: string; edge?: GraphEdge }> = [
    { node: steps[0].from, explanation: explainNode(steps[0].from) },
  ];

  for (const step of steps) {
    items.push({
      node: step.to,
      explanation: explainStep(step).body,
      edge: step.edge,
    });
  }

  return items;
}
