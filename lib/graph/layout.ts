import type { GraphEdge, GraphNode } from "@/types";

export interface PositionedNode {
  node: GraphNode;
  x: number;
  y: number;
  /** Rendered diameter in px. */
  size: number;
  ring: number;
}

const SIZE = {
  center: 132,
  characterMin: 46,
  characterMax: 86,
  entityMin: 40,
  entityMax: 62,
} as const;

function sizeForNode(node: GraphNode, edgeImportance: number, isCenter: boolean) {
  if (isCenter) return SIZE.center;
  const weight = Math.min(100, Math.max(0, edgeImportance));
  if (node.type === "character") {
    return Math.round(
      SIZE.characterMin + (weight / 100) * (SIZE.characterMax - SIZE.characterMin),
    );
  }
  return Math.round(
    SIZE.entityMin + (weight / 100) * (SIZE.entityMax - SIZE.entityMin),
  );
}

/**
 * Deterministic radial layout.
 *
 * Physics simulations look impressive for four seconds and then become
 * unreadable, so positions are computed once: the most important relationships
 * sit closest to the centre on an inner ring, everything else goes outward.
 * Angles are distributed evenly and offset per-ring so rings never line up.
 */
export function radialLayout(
  center: GraphNode,
  neighbors: Array<{ node: GraphNode; edge: GraphEdge }>,
  options: { width: number; height: number } = { width: 900, height: 620 },
): { positioned: PositionedNode[]; byId: Map<string, PositionedNode> } {
  const compact = Math.min(options.width, options.height) < 520;
  const baseRadius = compact ? 132 : 190;
  const ringGap = compact ? 96 : 130;

  const sorted = [...neighbors].sort(
    (a, b) => b.edge.importance - a.edge.importance,
  );

  const innerCapacity = compact ? 6 : 8;
  const rings: Array<Array<{ node: GraphNode; edge: GraphEdge }>> = [];
  let index = 0;
  let ring = 0;
  while (index < sorted.length) {
    const capacity = innerCapacity + ring * (compact ? 4 : 5);
    rings.push(sorted.slice(index, index + capacity));
    index += capacity;
    ring += 1;
  }

  const positioned: PositionedNode[] = [
    {
      node: center,
      x: 0,
      y: 0,
      size: sizeForNode(center, 100, true),
      ring: 0,
    },
  ];

  rings.forEach((members, ringIndex) => {
    const radius = baseRadius + ringIndex * ringGap;
    const offset = (ringIndex % 2 === 0 ? 0 : Math.PI / members.length) - Math.PI / 2;
    members.forEach((member, memberIndex) => {
      const angle = offset + (memberIndex / members.length) * Math.PI * 2;
      // Slight vertical squash keeps wide viewports from feeling empty.
      positioned.push({
        node: member.node,
        x: Math.cos(angle) * radius,
        y: Math.sin(angle) * radius * (compact ? 1 : 0.82),
        size: sizeForNode(member.node, member.edge.importance, false),
        ring: ringIndex + 1,
      });
    });
  });

  return {
    positioned,
    byId: new Map(positioned.map((p) => [p.node.id, p])),
  };
}

/** Horizontal layout used by the Connect path view. */
export function pathLayout(
  nodes: GraphNode[],
  options: { width: number; compact: boolean },
): { positioned: PositionedNode[]; byId: Map<string, PositionedNode> } {
  const { compact } = options;
  const spacing = compact ? 130 : Math.max(180, Math.min(260, options.width / nodes.length));

  const positioned = nodes.map((node, i) => {
    const isEnd = i === 0 || i === nodes.length - 1;
    return {
      node,
      x: compact ? 0 : i * spacing,
      y: compact ? i * spacing : (i % 2 === 0 ? -1 : 1) * (nodes.length > 2 ? 34 : 0),
      size: isEnd ? (compact ? 78 : 96) : node.type === "character" ? 66 : 56,
      ring: i,
    };
  });

  return { positioned, byId: new Map(positioned.map((p) => [p.node.id, p])) };
}
