import { characters } from "@/data";
import { isDailyEligiblePath } from "@/lib/canon/model";
import { findNarrativePath, findPaths } from "@/lib/graph";
import { seededShuffle, todayKey } from "@/lib/utils";
import type { GraphPath } from "@/types";

export interface DailyConnectionChallenge {
  date: string;
  aSlug: string;
  bSlug: string;
  path: GraphPath | null;
}

function findEligibleDailyPath(startId: string, endId: string): GraphPath | null {
  const candidates = findPaths(startId, endId);
  for (const path of candidates) {
    if (isDailyEligiblePath(path.steps.map((step) => step.edge))) {
      return path;
    }
  }
  const narrative = findNarrativePath(startId, endId);
  if (
    narrative &&
    isDailyEligiblePath(narrative.steps.map((step) => step.edge))
  ) {
    return narrative;
  }
  return null;
}

/**
 * Deterministic daily pair: same challenge for everyone, built only from
 * verified current-canon edges that pass the Truth Layer daily filter.
 */
export function dailyConnection(date = todayKey()): DailyConnectionChallenge {
  const pool = seededShuffle(characters, `connect-challenge:${date}`);

  for (let i = 0; i < pool.length - 1; i += 2) {
    const a = pool[i];
    const b = pool[i + 1];
    const path = findEligibleDailyPath(a.id, b.id);
    if (path && path.length >= 2 && path.length <= 5) {
      return { date, aSlug: a.slug, bSlug: b.slug, path };
    }
  }

  for (let i = 0; i < pool.length; i++) {
    for (let j = i + 1; j < pool.length; j++) {
      const a = pool[i];
      const b = pool[j];
      const path = findEligibleDailyPath(a.id, b.id);
      if (path && path.length >= 2 && path.length <= 5) {
        return { date, aSlug: a.slug, bSlug: b.slug, path };
      }
    }
  }

  const [a, b] = pool;
  return {
    date,
    aSlug: a.slug,
    bSlug: b.slug,
    path: findEligibleDailyPath(a.id, b.id),
  };
}
