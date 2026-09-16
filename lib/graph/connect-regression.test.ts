import { describe, expect, it } from "vitest";
import { edgeCategory } from "@/lib/truth/layer";
import { buildLoreGraph, resetLoreGraphCache } from "./build";
import { findNarrativePath, findPaths } from "./algorithms";

resetLoreGraphCache();
const graph = buildLoreGraph();

function id(slug: string) {
  return `char:${slug}`;
}

function pathBetween(a: string, b: string) {
  return findNarrativePath(id(a), id(b), graph);
}

describe("Connect regression pairs", () => {
  it("Aatrox → Pantheon has a direct documented path", () => {
    const path = pathBetween("aatrox", "pantheon");
    expect(path).not.toBeNull();
    expect(path!.directOnly).toBe(true);
    expect(path!.length).toBe(1);
  });

  it("Aatrox → Kai'Sa does not use ancient Void incursion as shared event", () => {
    const path = pathBetween("aatrox", "kaisa");
    expect(path).not.toBeNull();
    const badHop = path!.steps.some(
      (s) =>
        s.to.slug === "void-incursion" ||
        s.from.slug === "void-incursion" ||
        (s.from.slug === "void-incursion" &&
          s.to.slug === "kaisa" &&
          edgeCategory(s.edge) === "SHARED_EVENT"),
    );
    expect(badHop).toBe(false);
  });

  it("Yasuo → Yone prefers direct family relationship", () => {
    const path = pathBetween("yasuo", "yone");
    expect(path).not.toBeNull();
    expect(path!.directOnly).toBe(true);
  });

  it("Jinx → Vi prefers direct family relationship", () => {
    const path = pathBetween("jinx", "vi");
    expect(path).not.toBeNull();
    expect(path!.directOnly).toBe(true);
  });

  it("Lux → Sylas produces a meaningful path", () => {
    const path = pathBetween("lux", "sylas");
    expect(path).not.toBeNull();
    expect(path!.length).toBeGreaterThan(0);
  });

  it("Viego → Thresh produces a meaningful path", () => {
    const path = pathBetween("viego", "thresh");
    expect(path).not.toBeNull();
    expect(path!.length).toBeGreaterThan(0);
  });

  it("Mel → LeBlanc is not labeled direct canon", () => {
    const path = pathBetween("mel", "leblanc");
    expect(path).not.toBeNull();
    const directCanon = path!.steps.some(
      (s) =>
        edgeCategory(s.edge) === "DIRECT_CANON" &&
        s.edge.connectionKind === "direct",
    );
    expect(directCanon).toBe(false);
  });

  it("Morgana → Aurelion Sol does not shortcut through Celestial Age", () => {
    const path = pathBetween("morgana", "aurelion-sol");
    expect(path).not.toBeNull();
    const usesCelestialAge = path!.steps.some(
      (s) => s.to.slug === "celestial-age" || s.from.slug === "celestial-age",
    );
    expect(usesCelestialAge).toBe(false);
  });

  it("Swain → LeBlanc produces a path without thematic-only edges", () => {
    const paths = findPaths(id("swain"), id("leblanc"), graph);
    expect(paths.length).toBeGreaterThan(0);
    for (const path of paths) {
      const thematic = path.steps.some(
        (s) => edgeCategory(s.edge) === "THEMATIC_PARALLEL",
      );
      expect(thematic).toBe(false);
    }
  });

  it("Viktor → Jinx produces a path", () => {
    const path = pathBetween("viktor", "jinx");
    expect(path).not.toBeNull();
  });
});
