import { characterById, relationships } from "@/data";
import type {
  ConnectionKind,
  GraphEdge,
  GraphNode,
  GraphQueryOptions,
  LoreGraph,
  Relationship,
} from "@/types";
import { buildLoreGraph, otherEnd } from "./build";

export interface Neighbor {
  node: GraphNode;
  edge: GraphEdge;
}

export function getNeighbors(
  nodeId: string,
  options: GraphQueryOptions = {},
  graph: LoreGraph = buildLoreGraph(),
): Neighbor[] {
  const {
    includeIndirect = true,
    relationshipTypes,
    nodeTypes,
  } = options;

  const result: Neighbor[] = [];
  for (const edge of graph.adjacency.get(nodeId) ?? []) {
    if (!includeIndirect && edge.connectionKind === "indirect") continue;
    if (relationshipTypes && !relationshipTypes.includes(edge.relationship)) continue;
    const node = graph.nodes.get(otherEnd(edge, nodeId));
    if (!node) continue;
    if (nodeTypes && !nodeTypes.includes(node.type)) continue;
    result.push({ node, edge });
  }

  return result.sort((a, b) => b.edge.importance - a.edge.importance);
}

/** Explicit character-to-character relationships only. */
export function getDirectRelationships(characterId: string): Relationship[] {
  return relationships
    .filter(
      (r) =>
        r.sourceCharacterId === characterId || r.targetCharacterId === characterId,
    )
    .sort((a, b) => b.importanceScore - a.importanceScore);
}

export function relationshipCounterpart(
  relationship: Relationship,
  characterId: string,
): string {
  return relationship.sourceCharacterId === characterId
    ? relationship.targetCharacterId
    : relationship.sourceCharacterId;
}

export interface CharacterGraph {
  center: GraphNode;
  nodes: GraphNode[];
  edges: GraphEdge[];
}

/**
 * Ego network for a champion page: direct relationships at depth 1 plus the
 * entities (factions / regions / events) that explain indirect links.
 */
export function getCharacterGraph(
  characterId: string,
  options: { includeIndirect?: boolean; maxNodes?: number } = {},
  graph: LoreGraph = buildLoreGraph(),
): CharacterGraph | null {
  const center = graph.nodes.get(characterId);
  if (!center) return null;

  const { includeIndirect = true, maxNodes = 26 } = options;

  const neighbors = getNeighbors(characterId, { includeIndirect }, graph);

  const nodes = new Map<string, GraphNode>([[center.id, center]]);
  const edges: GraphEdge[] = [];

  for (const { node, edge } of neighbors) {
    if (nodes.size >= maxNodes && edge.connectionKind === "indirect") continue;
    nodes.set(node.id, node);
    edges.push(edge);
  }

  // Second ring: edges between the champion's neighbours, so clusters read as
  // clusters rather than a star.
  for (const edge of graph.edges) {
    if (edge.connectionKind !== "direct") continue;
    if (edge.source === characterId || edge.target === characterId) continue;
    if (nodes.has(edge.source) && nodes.has(edge.target)) edges.push(edge);
  }

  return {
    center,
    nodes: Array.from(nodes.values()),
    edges: dedupeEdges(edges),
  };
}

function dedupeEdges(edges: GraphEdge[]): GraphEdge[] {
  const seen = new Set<string>();
  return edges.filter((e) => {
    if (seen.has(e.id)) return false;
    seen.add(e.id);
    return true;
  });
}

export function getRegionCluster(
  regionSlug: string,
  graph: LoreGraph = buildLoreGraph(),
): CharacterGraph | null {
  const regionId = `region:${regionSlug}`;
  const center = graph.nodes.get(regionId);
  if (!center) return null;

  const nodes = new Map<string, GraphNode>([[center.id, center]]);
  const edges: GraphEdge[] = [];

  for (const { node, edge } of getNeighbors(regionId, {}, graph)) {
    nodes.set(node.id, node);
    edges.push(edge);
  }

  for (const edge of graph.edges) {
    if (edge.connectionKind !== "direct") continue;
    if (nodes.has(edge.source) && nodes.has(edge.target)) edges.push(edge);
  }

  return { center, nodes: Array.from(nodes.values()), edges: dedupeEdges(edges) };
}

export function connectionKindOf(edge: GraphEdge): ConnectionKind {
  return edge.connectionKind;
}

/** Lore connections visible in the graph (direct + structural). */
export function countConnections(
  characterId: string,
  graph: LoreGraph = buildLoreGraph(),
): number {
  return getNeighbors(characterId, { includeIndirect: true }, graph).length;
}

/** Verified direct canon relationships only. */
export function countDirectConnections(characterId: string): number {
  return getDirectRelationships(characterId).filter(
    (r) => r.connectionType === "DIRECT_CANON" && r.verified,
  ).length;
}

export function characterNameOf(id: string): string {
  return characterById.get(id)?.name ?? "Unknown";
}
