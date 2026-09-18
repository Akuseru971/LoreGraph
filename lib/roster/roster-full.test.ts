import { describe, expect, it } from "vitest";
import { characters, relationships, rosterSlugs } from "@/data";
import { buildLoreGraph, resetLoreGraphCache } from "@/lib/graph/build";
import { ddragonChampionKey } from "@/lib/assets/champion-assets";
import { EXPECTED_ROSTER_COUNT } from "@/data/roster";

describe("full roster integrity", () => {
  it("matches authoritative roster manifest", () => {
    expect(characters.length).toBe(EXPECTED_ROSTER_COUNT);
    expect(rosterSlugs.length).toBe(EXPECTED_ROSTER_COUNT);
  });

  it("resolves every active roster champion", () => {
    const bySlug = new Map(characters.map((c) => [c.slug, c]));
    for (const slug of rosterSlugs) {
      const c = bySlug.get(slug);
      expect(c, `missing ${slug}`).toBeDefined();
      expect(c!.name.length).toBeGreaterThan(0);
      expect(c!.shortDescription.length).toBeGreaterThan(10);
      expect(c!.region).toBeTruthy();
      expect(c!.assetKey).toBeTruthy();
      expect(c!.sourceIds.length).toBeGreaterThan(0);
      expect(() => ddragonChampionKey(slug)).not.toThrow();
    }
  });

  it("builds graph nodes for every champion without broken relationship refs", () => {
    resetLoreGraphCache();
    const graph = buildLoreGraph();
    const ids = new Set(characters.map((c) => c.id));

    for (const c of characters) {
      expect(graph.nodes.has(c.id), `no graph node for ${c.slug}`).toBe(true);
    }

    for (const rel of relationships) {
      expect(ids.has(rel.sourceCharacterId), rel.id).toBe(true);
      expect(ids.has(rel.targetCharacterId), rel.id).toBe(true);
    }
  });
});
