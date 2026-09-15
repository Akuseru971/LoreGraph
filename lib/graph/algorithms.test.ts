import { describe, expect, it } from "vitest";
import { buildLoreGraph, resetLoreGraphCache } from "./build";

resetLoreGraphCache();
import {
  findNarrativePath,
  findPaths,
  findShortestPath,
  scorePath,
} from "./algorithms";

const graph = buildLoreGraph();

function id(slug: string) {
  return `char:${slug}`;
}

describe("findPaths", () => {
  it("returns a direct relationship when one exists", () => {
    const path = findNarrativePath(id("aatrox"), id("pantheon"), graph);
    expect(path).not.toBeNull();
    expect(path!.length).toBe(1);
    expect(path!.directOnly).toBe(true);
  });

  it("finds an indirect path between distant champions", () => {
    const path = findNarrativePath(id("lux"), id("mordekaiser"), graph);
    expect(path).not.toBeNull();
    expect(path!.length).toBeGreaterThan(1);
  });

  it("returns empty for same champion", () => {
    expect(findPaths(id("lux"), id("lux"), graph)).toEqual([]);
  });

  it("does not route through generic Runeterra region", () => {
    const path = findNarrativePath(id("yasuo"), id("viktor"), graph);
    expect(path).not.toBeNull();
    const usesRuneterra = path!.nodes.some((n) => n.slug === "runeterra");
    expect(usesRuneterra).toBe(false);
  });

  it("returns up to three distinct strategies", () => {
    const paths = findPaths(id("jinx"), id("swain"), graph);
    expect(paths.length).toBeGreaterThan(0);
    expect(paths.length).toBeLessThanOrEqual(3);
    const strategies = new Set(paths.map((p) => p.strategy));
    expect(strategies.size).toBe(paths.length);
  });

  it("scores direct paths higher than random long hops", () => {
    const direct = findNarrativePath(id("yasuo"), id("yone"), graph);
    expect(direct).not.toBeNull();
    expect(scorePath(direct!.steps)).toBeGreaterThan(40);
  });

  it("finds structural path for Aatrox to Kai'Sa without direct canon", () => {
    const path = findNarrativePath(id("aatrox"), id("kaisa"), graph);
    expect(path).not.toBeNull();
    const directCharEdge = path!.steps.some(
      (s) =>
        s.from.type === "character" &&
        s.to.type === "character" &&
        s.edge.connectionCategory === "DIRECT_CANON",
    );
    expect(directCharEdge).toBe(false);
  });

  it("terminates without infinite loop on cyclic graph", () => {
    const start = performance.now();
    findPaths(id("thresh"), id("aurelion-sol"), graph);
    expect(performance.now() - start).toBeLessThan(500);
  });
});

describe("findShortestPath", () => {
  it("minimises hop count", () => {
    const shortest = findShortestPath(id("lux"), id("sylas"), graph);
    const narrative = findNarrativePath(id("lux"), id("sylas"), graph);
    expect(shortest).not.toBeNull();
    expect(narrative).not.toBeNull();
    expect(shortest!.length).toBeLessThanOrEqual(narrative!.length);
  });
});
