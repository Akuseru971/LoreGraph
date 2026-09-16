import type { LoreGraph } from "@/types";

export interface PathEndpoints {
  start: string;
  end: string;
}

/** Whether a node may appear as an intermediate hop in Connect pathfinding. */
export function isConnectBridgeNode(
  graph: LoreGraph,
  nodeId: string,
  endpoints: PathEndpoints,
): boolean {
  if (nodeId === endpoints.start || nodeId === endpoints.end) return true;

  const node = graph.nodes.get(nodeId);
  if (!node) return false;
  if (node.type === "character") return true;

  return graph.connectEligible.get(nodeId) ?? false;
}
