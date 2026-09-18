import { sources, bioSourceId } from "@/data/sources";
import { hashContent, normalizeTextForMatch } from "@/lib/knowledge/source-snapshot";
import type { SourceSnapshot } from "@/types";
import { allCharacterSeeds } from "./bio-seeds";
import { publicationSnapshotText } from "./publication-text";

const RETRIEVED_AT = "2026-03-18T00:00:00.000Z";

function buildSnapshots(): SourceSnapshot[] {
  const snapshots: SourceSnapshot[] = [];

  for (const seed of allCharacterSeeds()) {
    const sourceId = bioSourceId(seed.slug);
    const source = sources.find((s) => s.id === sourceId);
    if (!source) continue;

    const paragraphs = [seed.short, ...(seed.long ?? [])];
    const text = paragraphs.filter(Boolean).join("\n");
    if (!text.trim()) continue;

    snapshots.push({
      sourceId,
      contentHash: hashContent(text),
      retrievedAt: RETRIEVED_AT,
      sourceUrl: source.url,
      normalizedText: normalizeTextForMatch(text),
      factIndex: seed.long ?? [],
    });
  }

  for (const [sourceId, sentences] of Object.entries(publicationSnapshotText)) {
    const source = sources.find((s) => s.id === sourceId);
    if (!source) continue;
    const text = sentences.join(" ");
    snapshots.push({
      sourceId,
      contentHash: hashContent(text),
      retrievedAt: RETRIEVED_AT,
      sourceUrl: source.url,
      normalizedText: normalizeTextForMatch(text),
      factIndex: sentences,
    });
  }

  return snapshots;
}

let snapshotCache: SourceSnapshot[] | null = null;
let snapshotByIdCache: Map<string, SourceSnapshot> | null = null;

function ensureSnapshots(): void {
  if (!snapshotCache) {
    snapshotCache = buildSnapshots();
    snapshotByIdCache = new Map(snapshotCache.map((s) => [s.sourceId, s]));
  }
}

export function getSourceSnapshots(): SourceSnapshot[] {
  ensureSnapshots();
  return snapshotCache!;
}

export function getSourceSnapshot(sourceId: string): SourceSnapshot | undefined {
  ensureSnapshots();
  return snapshotByIdCache!.get(sourceId);
}

/** @deprecated Use getSourceSnapshots() — kept for report scripts. */
export const sourceSnapshots: SourceSnapshot[] = new Proxy([] as SourceSnapshot[], {
  get(_target, prop, receiver) {
    const snapshots = getSourceSnapshots();
    const value = Reflect.get(snapshots, prop, receiver);
    return typeof value === "function" ? value.bind(snapshots) : value;
  },
});

export const sourceSnapshotById = {
  get(sourceId: string): SourceSnapshot | undefined {
    return getSourceSnapshot(sourceId);
  },
  has(sourceId: string): boolean {
    return getSourceSnapshot(sourceId) !== undefined;
  },
};
