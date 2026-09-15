import {
  characters,
  events,
  factions,
  regions,
  relationships,
} from "@/data";
import type { GraphEdge, GraphNode, LoreGraph } from "@/types";

/**
 * Edge cost model.
 *
 * Direct character relationships are cheap and get cheaper the more important
 * they are. Indirect connections (shared faction / region / event) are
 * deliberately expensive so a path never prefers "both are technically people
 * from Runeterra" over an actual documented relationship.
 */
const COST = {
  /** Multiplier applied to (100 - importance)/100 for direct edges. */
  directSpread: 1.4,
  directBase: 1.0,
  faction: 3.2,
  event: 2.6,
  region: 4.2,
  /** The catch-all "Runeterra" region must never be a useful shortcut. */
  genericRegion: 9,
} as const;

function directWeight(importance: number): number {
  const normalised = Math.min(100, Math.max(0, importance)) / 100;
  return COST.directBase + (1 - normalised) * COST.directSpread;
}

function characterNode(id: string): GraphNode | null {
  const character = characters.find((c) => c.id === id);
  if (!character) return null;
  return {
    id: character.id,
    type: "character",
    name: character.name,
    slug: character.slug,
    importance: character.importance,
    metadata: {
      title: character.title,
      region: character.region,
      accentColor: character.accentColor,
      assetKey: character.assetKey,
      factions: character.factions,
      description: character.shortDescription,
    },
  };
}

let cached: LoreGraph | null = null;

/**
 * Builds the full universe graph. Pure and memoised — safe to call from server
 * components, route handlers and the client bundle alike.
 */
export function buildLoreGraph(): LoreGraph {
  if (cached) return cached;

  const nodes = new Map<string, GraphNode>();

  for (const character of characters) {
    const node = characterNode(character.id);
    if (node) nodes.set(node.id, node);
  }

  for (const region of regions) {
    nodes.set(region.id, {
      id: region.id,
      type: "region",
      name: region.name,
      slug: region.slug,
      importance: region.importance,
      metadata: {
        accentColor: region.accentColor,
        description: region.shortDescription,
        region: region.slug,
      },
    });
  }

  for (const faction of factions) {
    nodes.set(faction.id, {
      id: faction.id,
      type: "faction",
      name: faction.name,
      slug: faction.slug,
      importance: faction.importance,
      metadata: {
        accentColor: faction.accentColor,
        description: faction.shortDescription,
        region: faction.regionSlug ?? undefined,
      },
    });
  }

  for (const event of events) {
    nodes.set(event.id, {
      id: event.id,
      type: "event",
      name: event.title,
      slug: event.slug,
      importance: event.importance,
      metadata: {
        accentColor: "#C9A96E",
        description: event.description,
        era: event.era,
      },
    });
  }

  const edges: GraphEdge[] = [];
  const seen = new Set<string>();

  const pushEdge = (edge: GraphEdge) => {
    // Undirected graph: one edge per unordered pair + relationship kind.
    const key = [edge.source, edge.target].sort().join("::") + "::" + edge.label;
    if (seen.has(key)) return;
    if (!nodes.has(edge.source) || !nodes.has(edge.target)) return;
    seen.add(key);
    edges.push(edge);
  };

  for (const rel of relationships) {
    pushEdge({
      id: rel.id,
      source: rel.sourceCharacterId,
      target: rel.targetCharacterId,
      relationship: rel.type,
      weight: directWeight(rel.importanceScore),
      importance: rel.importanceScore,
      description: rel.shortExplanation,
      connectionKind: "direct",
      label: rel.label,
      canonStatus: rel.canonStatus,
      relationshipId: rel.id,
      verified: rel.verified,
    });
  }

  for (const character of characters) {
    for (const factionId of character.factions) {
      const faction = factions.find((f) => f.id === factionId);
      if (!faction) continue;
      pushEdge({
        id: `edge:faction-${character.slug}-${faction.slug}`,
        source: character.id,
        target: faction.id,
        relationship: "faction",
        weight: COST.faction,
        importance: Math.round(faction.importance * 0.6),
        description: `${character.name} is associated with ${faction.name}.`,
        connectionKind: "indirect",
        label: "Faction",
        canonStatus: "CANON",
        verified: true,
      });
    }

    const regionNodeId = `region:${character.region}`;
    if (nodes.has(regionNodeId)) {
      pushEdge({
        id: `edge:region-${character.slug}`,
        source: character.id,
        target: regionNodeId,
        relationship: "related",
        weight: character.region === "runeterra" ? COST.genericRegion : COST.region,
        importance: 30,
        description: `${character.name} is tied to ${
          regions.find((r) => r.slug === character.region)?.name ?? character.region
        }.`,
        connectionKind: "indirect",
        label: "Region",
        canonStatus: "CANON",
        verified: true,
      });
    }
  }

  for (const event of events) {
    for (const characterId of event.characterIds) {
      // Events intentionally name figures outside the 50-champion seed; those
      // references are skipped rather than creating dangling nodes.
      if (!nodes.has(characterId)) continue;
      pushEdge({
        id: `edge:event-${event.slug}-${characterId}`,
        source: characterId,
        target: event.id,
        relationship: "related",
        weight: COST.event,
        importance: Math.round(event.importance * 0.7),
        description: `Present in ${event.title}.`,
        connectionKind: "indirect",
        label: "Event",
        canonStatus: event.canonStatus,
        verified: event.verified,
      });
    }
  }

  const adjacency = new Map<string, GraphEdge[]>();
  for (const edge of edges) {
    if (!adjacency.has(edge.source)) adjacency.set(edge.source, []);
    if (!adjacency.has(edge.target)) adjacency.set(edge.target, []);
    adjacency.get(edge.source)!.push(edge);
    adjacency.get(edge.target)!.push(edge);
  }

  cached = { nodes, edges, adjacency };
  return cached;
}

export function otherEnd(edge: GraphEdge, nodeId: string): string {
  return edge.source === nodeId ? edge.target : edge.source;
}
