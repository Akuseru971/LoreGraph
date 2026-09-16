import type {
  GraphEdge,
  GraphNode,
  GraphPath,
  LoreGraph,
  PathStep,
  PathStrategy,
} from "@/types";
import { isCurrentCanon, normalizeConfidence } from "@/lib/canon/model";
import { CATEGORY_PATH_COST, edgeCategory } from "@/lib/truth/layer";
import { buildLoreGraph, otherEnd } from "./build";

const HOP_UNIT = 1000;

function shortestCost(edge: GraphEdge): number {
  return HOP_UNIT + (100 - edge.importance);
}

interface PathQuery {
  start: string;
  end: string;
}

function narrativeCost(
  edge: GraphEdge,
  graph: LoreGraph,
  query?: PathQuery,
): number {
  const category = edgeCategory(edge);
  let cost = edge.weight * (CATEGORY_PATH_COST[category] ?? 8);

  const sourceNode = graph.nodes.get(edge.source);
  const targetNode = graph.nodes.get(edge.target);
  const bothCharacters =
    sourceNode?.type === "character" && targetNode?.type === "character";

  if (bothCharacters && category === "DIRECT_CANON" && query) {
    const connectsQueryPair =
      (edge.source === query.start && edge.target === query.end) ||
      (edge.source === query.end && edge.target === query.start);
    if (!connectsQueryPair) {
      cost += 18;
    }
  }

  if (category === "THEMATIC_PARALLEL" || category === "LEGACY_CONNECTION") cost += 10;
  if (category === "AMBIGUOUS") cost += 12;
  if (category === "SHARED_REGION") cost += 2;

  if (edge.importance < 40) cost += 2.5;
  else if (edge.importance < 60) cost += 0.9;
  if (edge.importance >= 85 && category === "DIRECT_CANON") cost -= 0.4;

  if (!isCurrentCanon(edge.canonStatus)) cost += 4;
  if (normalizeConfidence(edge.confidence) === "UNCERTAIN") cost += 6;
  if (!edge.verified) cost += 8;

  const far = graph.nodes.get(edge.target);
  const near = graph.nodes.get(edge.source);
  for (const node of [far, near]) {
    if (!node) continue;
    if (node.type === "region" && node.slug === "runeterra") cost += 12;
    else if (node.type === "region") cost += 1.5;
    else if (node.type === "faction" && node.importance < 60) cost += 0.8;
  }

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
  options: {
    blockedEdgeIds?: Set<string>;
    nodePenalty?: Map<string, number>;
    end?: string;
  } = {},
): DijkstraResult {
  const dist = new Map<string, number>([[start, 0]]);
  const prevNode = new Map<string, string>();
  const prevEdge = new Map<string, GraphEdge>();
  const visited = new Set<string>();
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
      const category = edgeCategory(edge);
      if (category === "THEMATIC_PARALLEL" || category === "LEGACY_CONNECTION") {
        continue;
      }
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
    directOnly: steps.every(
      (s) => edgeCategory(s.edge) === "DIRECT_CANON" && s.edge.connectionKind === "direct",
    ),
  };
}

export function scorePath(steps: PathStep[]): number {
  if (steps.length === 0) return 0;
  const avgImportance =
    steps.reduce((sum, s) => sum + s.edge.importance, 0) / steps.length;
  const directRatio =
    steps.filter((s) => edgeCategory(s.edge) === "DIRECT_CANON").length / steps.length;
  const canonRatio =
    steps.filter((s) => isCurrentCanon(s.edge.canonStatus)).length / steps.length;
  const lengthPenalty = Math.max(0, steps.length - 2) * 5;
  const raw =
    avgImportance * 0.55 + directRatio * 30 + canonRatio * 12 - lengthPenalty;
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
  const query: PathQuery = { start, end };
  const result = dijkstra(
    graph,
    start,
    (edge) => narrativeCost(edge, graph, query),
    { end },
  );
  return reconstruct(graph, result, start, end, "narrative");
}

function pathKey(path: GraphPath): string {
  return path.nodes.map((n) => n.id).join(">");
}

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
    const query: PathQuery = { start, end };
    const result = dijkstra(
      graph,
      start,
      (edge) => narrativeCost(edge, graph, query),
      { nodePenalty: usedIntermediates, end },
    );
    add(reconstruct(graph, result, start, end, "alternative"));
  }

  return found.slice(0, 3);
}

export { narrativeCost };
