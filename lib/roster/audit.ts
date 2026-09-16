import type { Relationship } from "@/types";

export interface DuplicateRelationshipWarning {
  pair: string;
  connectionType: string;
  ids: string[];
  labels: string[];
}

/** Normalize an undirected champion pair for duplicate detection. */
export function normalizedPair(a: string, b: string): string {
  return [a, b].sort().join("::");
}

export function findPotentialDuplicateRelationships(
  relationships: Relationship[],
): DuplicateRelationshipWarning[] {
  const groups = new Map<string, DuplicateRelationshipWarning>();

  for (const rel of relationships) {
    const key = `${normalizedPair(rel.sourceCharacterId, rel.targetCharacterId)}::${rel.connectionType}`;
    const existing = groups.get(key);
    if (!existing) {
      groups.set(key, {
        pair: normalizedPair(rel.sourceCharacterId, rel.targetCharacterId),
        connectionType: rel.connectionType,
        ids: [rel.id],
        labels: [rel.label],
      });
      continue;
    }
    existing.ids.push(rel.id);
    existing.labels.push(rel.label);
  }

  return [...groups.values()].filter((g) => g.ids.length > 1);
}
