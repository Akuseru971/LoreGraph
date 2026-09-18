/**
 * Generate canon remediation audit reports.
 */
import { writeFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";
import { characters } from "../data/characters";
import { relationships } from "../data/relationships";
import { storyPaths } from "../data/story-paths";
import { events } from "../data/events";
import { validateStoryPaths } from "../lib/story-path/validate";
import { validateEvents } from "../lib/events/validate";
import { findDuplicateRelationships } from "../lib/relationships/dedupe";
import { computeQuality } from "../lib/knowledge/quality-matrix";
import { EXPLICIT_BLOCK_CLAIMS } from "../lib/story-path/support";
import { getSiteUrl, isProductionIndexable } from "../lib/seo";

const story = validateStoryPaths();
const eventResult = validateEvents();
const dupes = findDuplicateRelationships(relationships);

const tiers = { A: 0, B: 0, C: 0 };
for (const c of characters) {
  tiers[computeQuality(c).tier]++;
}

const participantLinks = (events.flatMap((e) => e.characterLinks ?? [])).filter(
  (l) => l.role === "PARTICIPANT",
);
const participantWithSources = participantLinks.filter((l) => l.sourceIds?.length);

mkdirSync(join(process.cwd(), "reports"), { recursive: true });

writeFileSync(
  join(process.cwd(), "reports/story-path-support-audit.md"),
  [
    "# Story Path Support Audit",
    "",
    `Generated: ${new Date().toISOString()}`,
    "",
    "## Block counts",
    ...Object.entries(story.blockCounts).map(([k, v]) => `- ${k}: ${v}`),
    "",
    `Explicit block→claim mappings: ${Object.keys(EXPLICIT_BLOCK_CLAIMS).length}`,
    `FACT without evidence: ${story.factsWithoutEvidence}`,
    `Validation errors: ${story.errors.length}`,
  ].join("\n"),
);

writeFileSync(
  join(process.cwd(), "reports/event-role-review.md"),
  [
    "# Event Role Review",
    "",
    `Generated: ${new Date().toISOString()}`,
    "",
    `PARTICIPANT links: ${participantLinks.length}`,
    `PARTICIPANT with primary sources: ${participantWithSources.length}`,
    `ASSOCIATED_WITH remaining: ${eventResult.roleCounts.ASSOCIATED_WITH ?? 0}`,
    "",
    "## Role breakdown",
    ...Object.entries(eventResult.roleCounts)
      .sort((a, b) => b[1] - a[1])
      .map(([k, v]) => `- ${k}: ${v}`),
  ].join("\n"),
);

writeFileSync(
  join(process.cwd(), "reports/relationship-duplicates.md"),
  [
    "# Relationship Duplicates",
    "",
    `Generated: ${new Date().toISOString()}`,
    "",
    dupes.length
      ? dupes.map((d) => `- ${d.label}: ${d.ids.join(", ")}`).join("\n")
      : "No duplicate semantic relationship groups detected.",
  ].join("\n"),
);

writeFileSync(
  join(process.cwd(), "reports/timeline-integrity.md"),
  [
    "# Timeline Integrity",
    "",
    `Generated: ${new Date().toISOString()}`,
    "",
    "Ancient Pantheon leakage checks run via validate:timelines.",
    "",
    `Champions with continuity set: ${characters.filter((c) => c.continuity).length}/${characters.length}`,
  ].join("\n"),
);

writeFileSync(
  join(process.cwd(), "reports/canon-review-phase-1.md"),
  [
    "# Canon Review Phase 1 — Shurima / Darkin / Void / Targon",
    "",
    `Generated: ${new Date().toISOString()}`,
    "",
    `Tier A: ${tiers.A} | Tier B: ${tiers.B} | Tier C: ${tiers.C}`,
    "",
    "## Priority champions",
    ...["aatrox", "pantheon", "varus", "nasus", "azir", "yunara", "kaisa", "leona", "diana", "aurelion-sol"].map(
      (slug) => {
        const c = characters.find((x) => x.slug === slug);
        if (!c) return `- ${slug}: not found`;
        const q = computeQuality(c);
        return `- **${c.name}**: Tier ${q.tier}, continuity ${c.continuity ?? "unset"}`;
      },
    ),
  ].join("\n"),
);

writeFileSync(
  join(process.cwd(), "reports/seo-canonical-audit.md"),
  [
    "# SEO Canonical Audit",
    "",
    `SITE_URL: ${getSiteUrl()}`,
    `Indexable: ${isProductionIndexable()}`,
    "Production must set NEXT_PUBLIC_SITE_URL to the live domain in Vercel.",
  ].join("\n"),
);

writeFileSync(
  join(process.cwd(), "reports/canon-review-phase-1.json"),
  JSON.stringify({ story, eventResult, dupes, tiers, siteUrl: getSiteUrl() }, null, 2),
);

console.log("Canon remediation reports generated");
