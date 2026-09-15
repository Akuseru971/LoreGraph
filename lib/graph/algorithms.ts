import type {
  GraphEdge,
  GraphNode,
  GraphPath,
  LoreGraph,
  PathStep,
  PathStrategy,
} from "@/types";
import { buildLoreGraph, otherEnd } from "./build";

/**
 * Two objective functions over the same graph.
 *
 * - `shortest` minimises the number of connections. Ties are broken toward
 *   more important edges so we never surface a technically-shorter route made
 *   of trivia.
 * - `narrative` minimises a story-quality cost: important, direct, canonical
 *   relationships are cheap; generic region hops and weak edges are expensive.
 */

/** Large enough that hop count always dominates the importance tiebreak. */
const HOP_UNIT = 1000;

function shortestCost(edge: GraphEdge): number {
  return HOP_UNIT + (100 - edge.importance);
}

function narrativeCost(edge: GraphEdge, graph: LoreGraph): number {
  let cost = edge.weight;

  if (edge.connectionKind === "direct") {
    const bothCharacters =
      graph.nodes.get(edge.source)?.type === "character" &&
      graph.nodes.get(edge.target)?.type === "character";
    if (bothCharacters) cost *= 0.75;
  }

  // Penalise weak links hard: a 20-importance edge should almost never beat a
  // 90-importance one, even if it saves a hop.
  if (edge.importance < 40) cost += 2.2;
  else if (edge.importance < 60) cost += 0.8;

  if (edge.importance >= 85) cost -= 0.35;

  switch (edge.canonStatus) {
    case "AMBIGUOUS":
      cost += 0.6;
      break;
    case "OLD_LORE":
    case "RETCONNED":
      cost += 2.5;
      break;
    case "ALTERNATE_UNIVERSE":
      cost += 3.5;
      break;
    default:
      break;
  }

  if (!edge.verified) cost += 0.25;

  // Hub penalty on endpoints: generic entities must not become highways.
  const far = graph.nodes.get(edge.target);
  const near = graph.nodes.get(edge.source);
  for (const node of [far, near]) {
    if (!node) continue;
    if (node.type === "region" && node.slug === "runeterra") cost += 12;
    else if (node.type === "region") cost += 1.2;
    else if (node.type === "faction" && node.importance < 60) cost += 0.8;
    else if (node.type === "concept") cost += 8;
  }

  // Weak contextual direct links should lose to a slightly longer story route.
  if (edge.connectionKind === "direct" && edge.importance < 35) cost += 10;

  return Math.max(0.2, cost);
}

interface DijkstraResult {
  prevNode: Map<string, string>;
  prevEdge: Map<string, GraphEdge>;
  dist: Map<string, number>;
}

function dijkstra(
  graph: LoreGraph,
  start: string,
  cost: (edge: GraphEdge) => number,
  options: { blockedEdgeIds?: Set<string>; nodePenalty?: Map<string, number> } = {},
): DijkstraResult {
  const dist = new Map<string, number>([[start, 0]]);
  const prevNode = new Map<string, string>();
  const prevEdge = new Map<string, GraphEdge>();
  const visited = new Set<string>();

  // Small graph (hundreds of nodes): a linear-scan frontier is plenty and
  // keeps the implementation dependency-free.
  const frontier = new Set<string>([start]);

  while (frontier.size > 0) {
    let current: string | null = null;
    let best = Infinity;
    for (const id of frontier) {
      const d = dist.get(id) ?? Infinity;
      if (d < best) {
        best = d;
        current = id;
      }
    }
    if (current === null) break;

    frontier.delete(current);
    visited.add(current);

    for (const edge of graph.adjacency.get(current) ?? []) {
      if (options.blockedEdgeIds?.has(edge.id)) continue;
      const next = otherEnd(edge, current);
      if (visited.has(next)) continue;
      const penalty = options.nodePenalty?.get(next) ?? 0;
      const candidate = best + cost(edge) + penalty;
      if (candidate < (dist.get(next) ?? Infinity)) {
        dist.set(next, candidate);
        prevNode.set(next, current);
        prevEdge.set(next, edge);
        frontier.add(next);
      }
    }
  }

  return { prevNode, prevEdge, dist };
}

function reconstruct(
  graph: LoreGraph,
  result: DijkstraResult,
  start: string,
  end: string,
  strategy: PathStrategy,
): GraphPath | null {
  if (start === end) return null;
  if (!result.dist.has(end)) return null;

  const nodes: GraphNode[] = [];
  const steps: PathStep[] = [];
  let cursor = end;

  const guard = graph.nodes.size + 2;
  let iterations = 0;

  while (cursor !== start) {
    if (iterations++ > guard) return null;
    const previous = result.prevNode.get(cursor);
    const edge = result.prevEdge.get(cursor);
    if (!previous || !edge) return null;
    const toNode = graph.nodes.get(cursor);
    const fromNode = graph.nodes.get(previous);
    if (!toNode || !fromNode) return null;
    nodes.unshift(toNode);
    steps.unshift({ from: fromNode, to: toNode, edge });
    cursor = previous;
  }

  const startNode = graph.nodes.get(start);
  if (!startNode) return null;
  nodes.unshift(startNode);

  return {
    strategy,
    nodes,
    steps,
    length: steps.length,
    score: scorePath(steps),
    directOnly: steps.every((s) => s.edge.connectionKind === "direct"),
  };
}

/** 0–100 narrative quality. Rewards importance and direct links, punishes length. */
export function scorePath(steps: PathStep[]): number {
  if (steps.length === 0) return 0;
  const avgImportance =
    steps.reduce((sum, s) => sum + s.edge.importance, 0) / steps.length;
  const directRatio =
    steps.filter((s) => s.edge.connectionKind === "direct").length / steps.length;
  const canonRatio =
    steps.filter((s) => s.edge.canonStatus === "CANON").length / steps.length;
  const lengthPenalty = Math.max(0, steps.length - 2) * 6;
  const raw =
    avgImportance * 0.6 + directRatio * 28 + canonRatio * 12 - lengthPenalty;
  return Math.max(0, Math.min(100, Math.round(raw)));
}

export function findShortestPath(
  start: string,
  end: string,
  graph: LoreGraph = buildLoreGraph(),
): GraphPath | null {
  const result = dijkstra(graph, start, shortestCost);
  return reconstruct(graph, result, start, end, "shortest");
}

export function findNarrativePath(
  start: string,
  end: string,
  graph: LoreGraph = buildLoreGraph(),
): GraphPath | null {
  const result = dijkstra(graph, start, (edge) => narrativeCost(edge, graph));
  return reconstruct(graph, result, start, end, "narrative");
}

function pathKey(path: GraphPath): string {
  return path.nodes.map((n) => n.id).join(">");
}

/**
 * Returns up to three meaningfully different routes: the shortest, the best
 * narrative route, and one alternative produced by penalising the intermediate
 * nodes already used.
 */
export function findPaths(
  start: string,
  end: string,
  graph: LoreGraph = buildLoreGraph(),
): GraphPath[] {
  if (start === end) return [];

  const found: GraphPath[] = [];
  const keys = new Set<string>();

  const add = (path: GraphPath | null) => {
    if (!path) return;
    const key = pathKey(path);
    if (keys.has(key)) return;
    keys.add(key);
    found.push(path);
  };

  const narrative = findNarrativePath(start, end, graph);
  const shortest = findShortestPath(start, end, graph);
  add(narrative);
  add(shortest);

  const usedIntermediates = new Map<string, number>();
  for (const path of found) {
    for (const node of path.nodes.slice(1, -1)) {
      usedIntermediates.set(node.id, 6);
    }
  }

  if (usedIntermediates.size > 0) {
    const result = dijkstra(graph, start, (edge) => narrativeCost(edge, graph), {
      nodePenalty: usedIntermediates,
    });
    const alternative = reconstruct(graph, result, start, end, "alternative");
    add(alternative);
  }

  return found.slice(0, 3);
}

export { narrativeCost };
