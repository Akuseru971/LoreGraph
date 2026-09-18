import { describe, expect, it } from "vitest";
import { characters, relationships } from "@/data";
import { isDailyEligibleEdge } from "@/lib/canon/model";
import { validateEvents } from "@/lib/events/validate";
import { buildLoreGraph, findNarrativePath, resetLoreGraphCache } from "@/lib/graph";
import { computeQuality } from "@/lib/knowledge/quality-matrix";
import { untrustedCoreTimelineBeats } from "@/lib/knowledge/tier-a-gate";
import { absoluteUrl, findForbiddenOrigins, getSiteUrl } from "@/lib/seo";
import { loreEntityById } from "@/data/lore-entities";
import { findDuplicateRelationships } from "@/lib/relationships/dedupe";
import { claimById, claims } from "@/data/knowledge/claims";
import { sourceEvidence } from "@/data/knowledge/evidence";
import { getSourceSnapshot } from "@/data/knowledge/source-snapshots";
import { isTrustedClaim, STRONG_PREDICATES } from "@/lib/knowledge/claim-evidence";
import { isActiveClaim, isSupersededClaim } from "@/lib/knowledge/claim-supersession";
import { resolveClaimEvidenceRefs } from "@/lib/knowledge/evidence-registry";
import {
  excerptFoundInSnapshot,
  hashContent,
  verifyEvidenceAgainstSnapshot,
} from "@/lib/knowledge/source-snapshot";
import { storyPaths } from "@/data/story-paths";
import { trustedBioParagraphs } from "@/lib/bio/blocks";
import { claimSourceAuthority } from "@/lib/knowledge/claim-trust";
import { isTrustedTimelineBeat } from "@/lib/timeline/trust";
import {
  supportsNarrativeBlock,
  validateFactPropositionSupport,
} from "@/lib/story-path/support";
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

  it("Phase 1 Tier A champions require zero provisional CORE timeline beats", () => {
    const phase1 = [
      "aatrox",
      "pantheon",
      "varus",
      "nasus",
      "renekton",
      "azir",
      "xerath",
      "kaisa",
      "kassadin",
      "malzahar",
      "belveth",
      "aurelion-sol",
      "leona",
      "diana",
      "zoe",
    ];
    for (const slug of phase1) {
      const c = characters.find((ch) => ch.slug === slug);
      expect(c).toBeDefined();
      const q = computeQuality(c!);
      if (!q.tierAEligible) continue;
      expect(q.tier).toBe("A");
      expect(q.dimensions.trustedTimelineCoverage).toBeGreaterThanOrEqual(70);
      expect(untrustedCoreTimelineBeats(c!).length).toBe(0);
    }
  });

  it("Nasus Void War participation is not evidence-trusted", () => {
    const claim = claimById.get("claim:nasus-participated-void-war");
    expect(claim).toBeDefined();
    expect(claim!.reviewed).toBe(false);
    expect(claim!.needsReview).toBe(true);
  });

  it("Renekton Void War participation remains pending without exact evidence", () => {
    const claim = claimById.get("claim:pack:00259");
    expect(claim).toBeDefined();
    expect(claim!.reviewed).toBe(false);
    expect(claim!.needsReview).toBe(true);
  });

  it("Trusted claims require evidenceRefs with source evidence support", () => {
    const trusted = [...claimById.values()].filter((c) => isTrustedClaim(c));
    expect(trusted.length).toBeGreaterThan(0);
    for (const claim of trusted) {
      expect(claim.evidenceRefs?.length).toBeGreaterThan(0);
    }
  });

  it("Skarner uses post-VGU Ixtal canon not legacy Crystal Scar framing", () => {
    const skarner = characters.find((c) => c.slug === "skarner");
    const bio = skarner?.longDescription.join(" ").toLowerCase() ?? "";
    expect(skarner?.region).toBe("ixtal");
    expect(skarner?.species).toBe("Brackern");
    expect(bio).toMatch(/yun tal|ixaocan|brackern/);
    expect(bio).not.toMatch(/powers hextech|crystal scar guardian|brackern crystals power/);
  });

  it("Trusted timeline beats require claimIds and proposition support", () => {
    const aatrox = characters.find((c) => c.slug === "aatrox");
    for (const beat of aatrox?.timeline ?? []) {
      if (isTrustedTimelineBeat(beat)) {
        expect(beat.claimIds?.length).toBeGreaterThan(0);
        expect(beat.reviewStatus).toBe("VERIFIED_CANON");
        expect(beat.evidenceClass).toBe("FACT");
      }
    }
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

  it("FACT blocks require proposition-level claim support", () => {
    expect(
      supportsNarrativeBlock(
        "Beings designed around an endless war found the peace intolerable.",
        ["claim:aatrox-was-ascended", "claim:aatrox-participated-void-war"],
      ),
    ).toBe(false);
    expect(
      supportsNarrativeBlock(
        "Aatrox was among the greatest Ascended.",
        ["claim:aatrox-was-ascended"],
      ),
    ).toBe(true);
  });

  it("Aatrox↔Varus duplicate structural relationships collapse", () => {
    const dupes = findDuplicateRelationships(relationships).filter((d) =>
      d.pair.includes("aatrox") && d.pair.includes("varus"),
    );
    expect(dupes).toHaveLength(0);
  });

  it("Aion Er'na resolves as artifact", () => {
    expect(loreEntityById.has("artifact:aion-erna")).toBe(true);
    expect(loreEntityById.has("concept:aion-erna")).toBe(false);
  });

  it("Varus timeline does not include Pantheon in Darkin War", () => {
    const varus = characters.find((c) => c.slug === "varus");
    const sealed = varus?.timeline.find((b) => b.title.includes("Sealed"));
    expect(sealed?.characterIds).not.toContain("char:pantheon");
  });

  it("Ascended institution is not described as created for the Void in Aatrox bio", () => {
    const aatrox = characters.find((c) => c.slug === "aatrox");
    const bio = aatrox?.longDescription.join(" ");
    expect(bio).not.toMatch(/created to fight the Void/i);
    expect(bio).toMatch(/later.*defenders against the Void/i);
  });

  it("Pantheon species is Human without Aspect fragment", () => {
    const pantheon = characters.find((c) => c.slug === "pantheon");
    expect(pantheon?.species).toBe("Human");
  });

  it("Kai'Sa must never participate in the ancient Void War", () => {
    const kaisa = characters.find((c) => c.slug === "kaisa");
    expect(kaisa?.eventIds).not.toContain("event:void-incursion");
  });

  it("Varus has no direct character edge to Pantheon", () => {
    const direct = relationships.find(
      (r) =>
        (r.sourceCharacterId === "char:varus" && r.targetCharacterId === "char:pantheon") ||
        (r.sourceCharacterId === "char:pantheon" && r.targetCharacterId === "char:varus"),
    );
    expect(direct).toBeUndefined();
  });

  it("Varus Void War participation is not trusted timeline", () => {
    const varus = characters.find((c) => c.slug === "varus");
    const voidBeat = varus?.timeline.find((b) => b.description.match(/void/i));
    expect(voidBeat).toBeUndefined();
    expect(varus?.eventIds).not.toContain("event:void-incursion");
  });

  it("Pantheon synthetic Aurelion shared-event timeline beat removed", () => {
    const pantheon = characters.find((c) => c.slug === "pantheon");
    const synthetic = pantheon?.timeline.find((b) =>
      b.characterIds.includes("char:aurelion-sol"),
    );
    expect(synthetic).toBeUndefined();
    expect(pantheon?.eventIds).not.toContain("event:targon-aurelion-loose");
  });

  it("UNKNOWN timeline beats are not treated as trusted", () => {
    const unknown = characters.flatMap((c) =>
      c.timeline.filter((b) => b.canonStatus === "UNKNOWN" && isTrustedTimelineBeat(b)),
    );
    expect(unknown).toHaveLength(0);
  });

  it("FACT blocks require proposition-level support", () => {
    const issues = validateFactPropositionSupport(
      "The Rite of Ascension was a public imperial institution.",
      ["claim:aatrox-was-ascended"],
    );
    expect(issues.some((i) => i.kind === "scope_mismatch" || i.kind === "incomplete_coverage")).toBe(true);
  });

  it("Aatrox became-Darkin claim cannot support 'needed the war to continue'", () => {
    expect(
      supportsNarrativeBlock(
        "The hero curdles into something that needs the war to continue.",
        ["claim:aatrox-became-darkin"],
      ),
    ).toBe(false);
  });

  it("Aatrox Ascended claim cannot support public Rite of Ascension ceremony", () => {
    expect(
      supportsNarrativeBlock(
        "The Rite of Ascension was a public ceremony.",
        ["claim:aatrox-was-ascended"],
      ),
    ).toBe(false);
  });

  it("Shurima Rite claim cannot automatically support public ceremony without matching claim", () => {
    expect(
      supportsNarrativeBlock(
        "The Rite of Ascension was a public ceremony.",
        ["claim:rite-elevates-ascended"],
      ),
    ).toBe(false);
  });

  it("Varus Ascended claim uses twilight and bio sources not wiki alone", () => {
    const claim = claimById.get("claim:varus-was-ascended");
    expect(claim?.sourceIds).toContain("source:twilight-of-the-gods");
    expect(claim?.sourceIds).toContain("source:bio-varus");
    expect(claim?.sourceIds).not.toContain("source:wiki-varus");
    expect(claimSourceAuthority(claim!)).toBe("PRIMARY_EXPLICIT");
  });

  it("VERIFIED timeline beats require reviewed trusted claims", () => {
    const aatrox = characters.find((c) => c.slug === "aatrox");
    const verified = aatrox?.timeline.filter((b) => b.reviewStatus === "VERIFIED_CANON");
    for (const beat of verified ?? []) {
      expect(beat.claimIds?.length).toBeGreaterThan(0);
      expect(isTrustedTimelineBeat(beat)).toBe(true);
    }
  });

  it("Editorial bio blocks do not enter SEO factual shell", () => {
    const aatrox = characters.find((c) => c.slug === "aatrox");
    const trusted = trustedBioParagraphs(aatrox!.bioBlocks!);
    expect(trusted.join(" ")).not.toMatch(/curdled into appetite/i);
    expect(trusted.join(" ")).not.toMatch(/world ending/i);
  });

  it("Aatrox bio SEO shell only includes VERIFIED_CANON FACT blocks", () => {
    const aatrox = characters.find((c) => c.slug === "aatrox");
    expect(aatrox?.bioBlocks?.length).toBeGreaterThan(0);
    const trusted = trustedBioParagraphs(aatrox!.bioBlocks!);
    expect(trusted.length).toBeGreaterThan(0);
    expect(trusted.join(" ")).toMatch(/Ascended/i);
    for (const block of aatrox!.bioBlocks!.filter((b) => trusted.includes(b.text))) {
      expect(block.evidenceClass).toBe("FACT");
      expect(block.reviewStatus).toBe("VERIFIED_CANON");
    }
  });

  it("Connect Varus to Pantheon routes without direct character edge", () => {
    resetLoreGraphCache();
    const graph = buildLoreGraph();
    const path = findNarrativePath("char:varus", "char:pantheon", graph);
    expect(path).not.toBeNull();
    const directCharEdge = path!.steps.some(
      (s) =>
        s.edge.connectionKind === "direct" &&
        ((s.from.id === "char:varus" && s.to.id === "char:pantheon") ||
          (s.from.id === "char:pantheon" && s.to.id === "char:varus")),
    );
    expect(directCharEdge).toBe(false);
  });

  it("rejects fake shortExcerpt not found in source snapshot", () => {
    const snapshot = getSourceSnapshot("source:bio-aatrox");
    expect(snapshot).toBeDefined();
    expect(excerptFoundInSnapshot(snapshot!, "this text never appeared in any riot source")).toBe(
      false,
    );
    const result = verifyEvidenceAgainstSnapshot(
      {
        id: "test-fake",
        sourceId: "source:bio-aatrox",
        normalizedFact: "fake",
        evidenceType: "DIRECT_STATEMENT",
        shortExcerpt: "this text never appeared in any riot source",
        sourceSnapshotHash: snapshot!.contentHash,
      },
      snapshot,
    );
    expect(result.reviewStatus).toBe("REJECTED");
  });

  it("accepts shortExcerpt found in source snapshot", () => {
    const snapshot = getSourceSnapshot("source:bio-aatrox");
    const result = verifyEvidenceAgainstSnapshot(
      {
        id: "test-real",
        sourceId: "source:bio-aatrox",
        normalizedFact: "Aatrox was Ascended",
        evidenceType: "DIRECT_STATEMENT",
        shortExcerpt: "raised by Shurima's Sun Disc into an Ascended god-warrior",
        sourceSnapshotHash: snapshot!.contentHash,
      },
      snapshot,
    );
    expect(result.reviewStatus).toBe("VERIFIED");
    expect(result.excerptVerified).toBe(true);
  });

  it("snapshot hash mismatch marks evidence REVIEW_REQUIRED", () => {
    const snapshot = getSourceSnapshot("source:bio-aatrox");
    const result = verifyEvidenceAgainstSnapshot(
      {
        id: "test-stale",
        sourceId: "source:bio-aatrox",
        normalizedFact: "Aatrox was Ascended",
        evidenceType: "DIRECT_STATEMENT",
        shortExcerpt: "raised by Shurima's Sun Disc into an Ascended god-warrior",
        sourceSnapshotHash: "deadbeef",
      },
      snapshot,
    );
    expect(result.reviewStatus).toBe("REVIEW_REQUIRED");
  });

  it("strong reviewed claims require VERIFIED evidence", () => {
    const strongReviewed = claims.filter(
      (c) =>
        isActiveClaim(c) &&
        c.reviewed &&
        !c.needsReview &&
        STRONG_PREDICATES.has(c.predicate),
    );
    for (const claim of strongReviewed) {
      const evidence = resolveClaimEvidenceRefs(claim);
      expect(evidence.some((e) => e.reviewStatus === "VERIFIED")).toBe(true);
    }
  });

  it("weak region claims may use lighter evidence path", () => {
    const regionClaim = claimById.get("claim:pack:00100");
    expect(regionClaim?.predicate).toBe("ASSOCIATED_WITH_REGION");
    expect(isTrustedClaim(regionClaim!)).toBe(true);
  });

  it("superseded pack claims are excluded from champion metrics", () => {
    const superseded = claims.filter((c) => c.claimStatus === "SUPERSEDED");
    expect(superseded.length).toBeGreaterThan(0);
    for (const claim of superseded) {
      expect(isTrustedClaim(claim)).toBe(false);
      expect(claim.subjectId).not.toBe("char:superseded-pack");
    }
  });

  it("superseded claims cannot feed Story Path blocks", () => {
    const supersededIds = new Set(
      claims.filter(isSupersededClaim).map((c) => c.id),
    );
    for (const path of storyPaths) {
      for (const chapter of path.chapters) {
        for (const block of chapter.blocks) {
          for (const cid of block.claimIds ?? []) {
            expect(supersededIds.has(cid)).toBe(false);
          }
        }
      }
    }
  });

  it("char:superseded-pack is fully removed", () => {
    expect(claims.some((c) => c.subjectId === "char:superseded-pack")).toBe(false);
    resetLoreGraphCache();
    const graph = buildLoreGraph();
    expect(graph.nodes.has("char:superseded-pack")).toBe(false);
  });

  it("Ahri has no artificial Vastaya rebellion participation", () => {
    const ahri = characters.find((c) => c.slug === "ahri");
    expect(ahri?.eventIds).not.toContain("event:vastaya-rebellion");
    const rebellionClaim = claims.find(
      (c) =>
        c.subjectId === "char:ahri" &&
        c.objectId === "event:vastaya-rebellion" &&
        isTrustedClaim(c),
    );
    expect(rebellionClaim).toBeUndefined();
  });

  it("verified source evidence records have snapshot hashes", () => {
    const verified = sourceEvidence.filter((e) => e.reviewStatus === "VERIFIED");
    expect(verified.length).toBeGreaterThan(0);
    for (const record of verified) {
      expect(record.sourceSnapshotHash).toBeTruthy();
      expect(record.excerptHash).toBeTruthy();
      const snapshot = getSourceSnapshot(record.sourceId);
      expect(record.sourceSnapshotHash).toBe(snapshot?.contentHash);
      expect(record.excerptHash).toBe(hashContent(record.shortExcerpt!));
    }
  });
});
