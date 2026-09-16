import { describe, expect, it } from "vitest";
import { characters } from "@/data";
import { isDailyEligibleEdge } from "@/lib/canon/model";
import { validateEvents } from "@/lib/events/validate";
import { buildLoreGraph, findNarrativePath, resetLoreGraphCache } from "@/lib/graph";
import { computeQuality } from "@/lib/knowledge/quality-matrix";
import { absoluteUrl, findForbiddenOrigins, getSiteUrl } from "@/lib/seo";
import { validateStoryPaths } from "@/lib/story-path/validate";
import type { GraphEdge } from "@/types";

describe("Canon hardening regression", () => {
  it("FACT blocks cannot exist without claim/source support", () => {
    const result = validateStoryPaths();
    const factErrors = result.errors.filter((e) => e.includes("FACT block"));
    expect(factErrors).toHaveLength(0);
  });

  it("ERA events cannot have PARTICIPANT role", () => {
    const result = validateEvents();
    expect(result.eraParticipantViolations).toBe(0);
  });

  it("EDITORIAL_CONTEXT event role cannot appear in Daily", () => {
    const edge: GraphEdge = {
      id: "test",
      source: "char:a",
      target: "event:b",
      relationship: "related",
      connectionCategory: "SHARED_EVENT",
      confidence: "STRONG",
      weight: 1,
      importance: 50,
      description: "test",
      connectionKind: "indirect",
      label: "Event",
      canonStatus: "CURRENT_CANON",
      verified: true,
      reviewStatus: "VERIFIED_CANON",
      eventRole: "EDITORIAL_CONTEXT",
    };
    expect(isDailyEligibleEdge(edge)).toBe(false);
  });

  it("ASSOCIATED_WITH should not beat a stronger factual path", () => {
    resetLoreGraphCache();
    const graph = buildLoreGraph();
    const path = findNarrativePath("char:aatrox", "char:pantheon", graph);
    expect(path).not.toBeNull();
    const weakOnly = path!.steps.every(
      (s) => s.edge.eventRole === "ASSOCIATED_WITH" || s.edge.eventRole === "ACTIVE_DURING",
    );
    expect(weakOnly).toBe(false);
  });

  it("Champion with unresolved core relationship cannot receive Tier A", () => {
    const withUnresolved = characters.find((c) => {
      const q = computeQuality(c);
      return (
        q.dimensions.criticalMissing.includes("unresolved_core_relationship") &&
        q.tier === "A"
      );
    });
    expect(withUnresolved).toBeUndefined();
  });

  it("Champion missing continuity cannot receive Tier A", () => {
    const missingContinuity = characters.filter(
      (c) => !c.continuity && computeQuality(c).tier === "A",
    );
    expect(missingContinuity).toHaveLength(0);
  });

  it("No production metadata contains old hardcoded Vercel origin", () => {
    const url = absoluteUrl("/champion/aatrox");
    expect(findForbiddenOrigins(url)).toHaveLength(0);
    expect(getSiteUrl()).not.toContain("lore-graph.vercel.app");
  });

  it("Champion canonical URL comes from SITE_URL", () => {
    const url = absoluteUrl("/champion/aatrox");
    expect(url.startsWith(getSiteUrl())).toBe(true);
  });
});
