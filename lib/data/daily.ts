import { characters } from "@/data";
import { findNarrativePath } from "@/lib/graph";
import { seededShuffle, todayKey } from "@/lib/utils";
import type { GraphPath } from "@/types";

export interface DailyConnectionChallenge {
  date: string;
  aSlug: string;
  bSlug: string;
  path: GraphPath | null;
}

/**
 * Deterministic daily pair: same challenge for everyone, and interesting by
 * construction — pairs that are already one hop apart are skipped in favour of
 * something worth guessing.
 */
export function dailyConnection(date = todayKey()): DailyConnectionChallenge {
  const pool = seededShuffle(characters, `connect-challenge:${date}`);

  for (let i = 0; i < pool.length - 1; i += 2) {
    const a = pool[i];
    const b = pool[i + 1];
    const path = findNarrativePath(a.id, b.id);
    if (path && path.length >= 2 && path.length <= 5) {
      return { date, aSlug: a.slug, bSlug: b.slug, path };
    }
  }

  const [a, b] = pool;
  return {
    date,
    aSlug: a.slug,
    bSlug: b.slug,
    path: findNarrativePath(a.id, b.id),
  };
}
