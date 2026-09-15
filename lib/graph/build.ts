import {
  characters,
  events,
  factions,
  loreEntities,
  regions,
  relationships,
} from "@/data";
import { CATEGORY_PATH_COST } from "@/lib/truth/layer";
import type {
  ConnectionCategory,
  GraphEdge,
  GraphNode,
  LoreGraph,
} from "@/types";

const COST = {
  directSpread: 1.4,
  directBase: 1.0,
  genericRegion: 100,
} as const;

function directWeight(importance: number, category: ConnectionCategory): number {
  const normalised = Math.min(100, Math.max(0, importance)) / 100;
  const base = COST.directBase + (1 - normalised) * COST.directSpread;
  return base * (CATEGORY_PATH_COST[category] / CATEGORY_PATH_COST.DIRECT_CANON);
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

export function resetLoreGraphCache(): void {
  cached = null;
}

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

  for (const entity of loreEntities) {
    nodes.set(entity.id, {
      id: entity.id,
      type: "concept",
      name: entity.name,
      slug: entity.slug,
      importance: entity.importance,
      metadata: {
        accentColor: entity.accentColor,
        description: entity.shortDescription,
      },
    });
  }

  const edges: GraphEdge[] = [];
  const seen = new Set<string>();

  const pushEdge = (edge: GraphEdge) => {
    const key = [edge.source, edge.target].sort().join("::") + "::" + edge.label;
    if (seen.has(key)) return;
    if (!nodes.has(edge.source) || !nodes.has(edge.target)) return;
    seen.add(key);
    edges.push(edge);
  };

  for (const rel of relationships) {
    const isDirectCanon = rel.connectionType === "DIRECT_CANON" && rel.verified;
    pushEdge({
      id: rel.id,
      source: rel.sourceCharacterId,
      target: rel.targetCharacterId,
      relationship: rel.type,
      connectionCategory: rel.connectionType,
      confidence: rel.confidence,
      weight: directWeight(rel.importanceScore, rel.connectionType),
      importance: rel.importanceScore,
      description: rel.shortExplanation,
      connectionKind: isDirectCanon ? "direct" : "indirect",
      label: rel.label,
      canonStatus: rel.canonStatus,
      relationshipId: rel.id,
      verified: rel.verified,
      sourceIds: rel.sourceIds,
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
        connectionCategory: "SHARED_FACTION",
        confidence: "DERIVED",
        weight: CATEGORY_PATH_COST.SHARED_FACTION,
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
        connectionCategory: "SHARED_REGION",
        confidence: "DERIVED",
        weight:
          character.region === "runeterra"
            ? COST.genericRegion
            : CATEGORY_PATH_COST.SHARED_REGION,
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
      if (!nodes.has(characterId)) continue;
      pushEdge({
        id: `edge:event-${event.slug}-${characterId}`,
        source: characterId,
        target: event.id,
        relationship: "related",
        connectionCategory: "SHARED_EVENT",
        confidence: "STRONG",
        weight: CATEGORY_PATH_COST.SHARED_EVENT,
        importance: Math.round(event.importance * 0.7),
        description: event.description,
        connectionKind: "indirect",
        label: "Event",
        canonStatus: event.canonStatus,
        verified: event.verified,
      });
    }
  }

  for (const entity of loreEntities) {
    for (const slug of entity.characterSlugs) {
      const charId = `char:${slug}`;
      if (!nodes.has(charId)) continue;
      pushEdge({
        id: `edge:concept-${entity.slug}-${slug}`,
        source: charId,
        target: entity.id,
        relationship: "related",
        connectionCategory: "STRUCTURAL_LORE",
        confidence: "STRONG",
        weight: CATEGORY_PATH_COST.STRUCTURAL_LORE,
        importance: Math.round(entity.importance * 0.75),
        description: entity.shortDescription,
        connectionKind: "indirect",
        label: entity.name,
        canonStatus: "CANON",
        verified: true,
      });
    }
    for (const eventSlug of entity.eventSlugs) {
      const eventId = `event:${eventSlug}`;
      if (!nodes.has(eventId)) continue;
      pushEdge({
        id: `edge:concept-event-${entity.slug}-${eventSlug}`,
        source: entity.id,
        target: eventId,
        relationship: "related",
        connectionCategory: "STRUCTURAL_LORE",
        confidence: "DERIVED",
        weight: CATEGORY_PATH_COST.STRUCTURAL_LORE * 0.85,
        importance: Math.round(entity.importance * 0.6),
        description: `${entity.name} is central to ${events.find((e) => e.slug === eventSlug)?.title ?? eventSlug}.`,
        connectionKind: "indirect",
        label: "Lore",
        canonStatus: "CANON",
        verified: true,
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
