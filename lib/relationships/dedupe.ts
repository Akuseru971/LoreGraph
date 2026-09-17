import type { ConnectionCategory, Relationship } from "@/types";

export interface RelSeedLike {
  a: string;
  b: string;
  label: string;
  short: string;
  long: string;
  connectionType?: ConnectionCategory;
  importance: number;
  verified?: boolean;
  sources?: string[];
  events?: string[];
  reviewed?: boolean;
  reviewStatus?: Relationship["reviewStatus"];
}

function pairKey(a: string, b: string): string {
  return [a, b].sort().join("::");
}

function facetKey(seed: RelSeedLike): string {
  const type = seed.connectionType ?? "AMBIGUOUS";
  const label = seed.label.toLowerCase().replace(/\s+/g, "-");
  return `${type}::${label}`;
}

function score(seed: RelSeedLike): number {
  let s = seed.importance;
  if (seed.verified) s += 20;
  if (seed.reviewed) s += 10;
  if (seed.sources?.length) s += seed.sources.length * 2;
  if (seed.events?.length) s += seed.events.length;
  if (seed.long.length > seed.short.length) s += 5;
  return s;
}

/**
 * Collapse duplicate semantic relationship seeds, keeping the stronger record.
 */
export function dedupeRelationshipSeeds<T extends RelSeedLike>(seeds: T[]): T[] {
  const best = new Map<string, T>();

  for (const seed of seeds) {
    const key = `${pairKey(seed.a, seed.b)}::${facetKey(seed)}`;
    const existing = best.get(key);
    if (!existing || score(seed) > score(existing)) {
      best.set(key, seed);
    }
  }

  return [...best.values()];
}

export function findDuplicateRelationships(relationships: Relationship[]): Array<{
  pair: string;
  ids: string[];
  label: string;
}> {
  const groups = new Map<string, Relationship[]>();

  for (const rel of relationships) {
    const key = `${pairKey(
      rel.sourceCharacterId.replace("char:", ""),
      rel.targetCharacterId.replace("char:", ""),
    )}::${rel.connectionType}::${rel.label.toLowerCase()}`;
    const list = groups.get(key) ?? [];
    list.push(rel);
    groups.set(key, list);
  }

  return [...groups.entries()]
    .filter(([, list]) => list.length > 1)
    .map(([key, list]) => ({
      pair: key,
      ids: list.map((r) => r.id),
      label: list[0].label,
    }));
}
