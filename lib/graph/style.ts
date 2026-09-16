import { edgeCategory } from "@/lib/truth/layer";
import type { ConnectionCategory, GraphEdge, RelationshipType } from "@/types";
import { hexToRgba } from "@/lib/utils";

/**
 * Edge semantics are carried by three independent channels — line style,
 * colour and an always-present text label — so colour is never the only cue.
 */
export const RELATIONSHIP_GROUPS = {
  hostile: ["enemy", "rival", "fought", "killed", "killedBy", "betrayed"],
  family: ["family", "lover"],
  allied: ["ally", "mentor", "student", "served", "formerAlly"],
  structural: ["faction", "political", "related", "creator", "createdBy", "imprisoned", "unknown"],
} as const satisfies Record<string, readonly RelationshipType[]>;

export type RelationshipGroup = keyof typeof RELATIONSHIP_GROUPS;

export function relationshipGroup(type: RelationshipType): RelationshipGroup {
  for (const [group, members] of Object.entries(RELATIONSHIP_GROUPS)) {
    if ((members as readonly RelationshipType[]).includes(type)) {
      return group as RelationshipGroup;
    }
  }
  return "structural";
}

export const GROUP_COLOR: Record<RelationshipGroup, string> = {
  hostile: "#A85059",
  family: "#C9A96E",
  allied: "#6FA88C",
  structural: "#6E82A8",
};

/** Human-readable labels — never expose camelCase in the UI. */
export const RELATIONSHIP_LABEL: Record<RelationshipType, string> = {
  ally: "Ally",
  enemy: "Enemy",
  rival: "Rival",
  family: "Family",
  mentor: "Mentor",
  student: "Student",
  lover: "Lover",
  formerAlly: "Former member of",
  faction: "Faction",
  fought: "Fought",
  killed: "Killed",
  killedBy: "Killed by",
  related: "Connected to",
  political: "Political tie",
  creator: "Creator",
  createdBy: "Created by",
  imprisoned: "Imprisoned",
  betrayed: "Betrayed",
  served: "Served",
  unknown: "Unclear link",
};

export const RELATIONSHIP_CATEGORY: Record<
  RelationshipType,
  "personal" | "conflict" | "organizational" | "origin" | "event" | "concept"
> = {
  ally: "personal",
  enemy: "conflict",
  rival: "conflict",
  family: "personal",
  mentor: "personal",
  student: "personal",
  lover: "personal",
  formerAlly: "origin",
  faction: "organizational",
  fought: "conflict",
  killed: "conflict",
  killedBy: "conflict",
  related: "concept",
  political: "organizational",
  creator: "origin",
  createdBy: "origin",
  imprisoned: "conflict",
  betrayed: "conflict",
  served: "organizational",
  unknown: "concept",
};

const CATEGORY_COLOR: Partial<Record<ConnectionCategory, string>> = {
  DIRECT_CANON: GROUP_COLOR.allied,
  SHARED_EVENT: "#C9A96E",
  STRUCTURAL_LORE: "#8B7FC7",
  SHARED_FACTION: GROUP_COLOR.structural,
  SHARED_REGION: "#647085",
  THEMATIC_PARALLEL: "#8F9AAD",
  AMBIGUOUS: GROUP_COLOR.hostile,
  LEGACY_CONNECTION: "#8C7748",
};

export function edgeStroke(edge: GraphEdge): string {
  const category = edgeCategory(edge);
  return CATEGORY_COLOR[category] ?? GROUP_COLOR[relationshipGroup(edge.relationship)];
}

export function edgeStyle(edge: GraphEdge, selected: boolean) {
  const color = edgeStroke(edge);
  const strength = 0.22 + (edge.importance / 100) * 0.45;
  return {
    stroke: selected ? "#C9A96E" : hexToRgba(color, strength),
    strokeWidth: selected ? 2.4 : 1 + (edge.importance / 100) * 1.4,
    strokeDasharray: edge.connectionKind === "indirect" ? "5 7" : undefined,
  };
}

export const NODE_SHAPE_HINT = {
  character: "Circle",
  region: "Hexagon",
  faction: "Crest",
  event: "Diamond",
  location: "Square",
  concept: "Circle",
} as const;
