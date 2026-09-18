import { characters, events, factions, regions, storyPaths } from "@/data";
import { claims } from "@/data/knowledge/claims";
import { computeQuality } from "./quality-matrix";
import { isActiveClaim } from "./claim-supersession";
import { isTrustedClaim } from "./claim-evidence";
import { claimsForSubject } from "./claim-supersession";
import type { Character, Event, Faction, Region } from "@/types";

export const MAJOR_EVENT_SLUGS = [
  "void-incursion",
  "fall-of-shurima",
  "darkin-war",
  "noxian-invasion-ionia",
  "ruination",
  "blessed-isles-catastrophe",
  "kinkou-fracture",
  "jhin-released",
  "shurima-risen",
] as const;

export const MIN_EVENT_LONG_CHARS = 120;
export const MIN_FACTION_LONG_CHARS = 80;
export const MIN_REGION_HISTORY_CHARS = 100;
export const MIN_TIER_A_BIO_PARAGRAPHS = 3;
export const MIN_TIER_A_TIMELINE_BEATS = 3;
export const MIN_TIER_A_CLAIMS = 3;

export interface ContentDepthIssue {
  kind: string;
  entityId: string;
  entityLabel: string;
  detail: string;
}

export function eventDescriptionLong(event: Event): string {
  const meta = event.metadata as { descriptionLong?: string } | undefined;
  return meta?.descriptionLong ?? event.description;
}

export function auditMajorEvents(): ContentDepthIssue[] {
  const issues: ContentDepthIssue[] = [];
  for (const slug of MAJOR_EVENT_SLUGS) {
    const event = events.find((e) => e.slug === slug);
    if (!event) {
      issues.push({
        kind: "major_event_missing",
        entityId: `event:${slug}`,
        entityLabel: slug,
        detail: "major event slug not found in registry",
      });
      continue;
    }
    const long = eventDescriptionLong(event);
    if (long.length < MIN_EVENT_LONG_CHARS) {
      issues.push({
        kind: "major_event_thin",
        entityId: event.id,
        entityLabel: event.title,
        detail: `description too short (${long.length} chars)`,
      });
    }
    if (!event.sourceIds?.length) {
      issues.push({
        kind: "major_event_no_source",
        entityId: event.id,
        entityLabel: event.title,
        detail: "no primary sourceIds",
      });
    }
    const participants = (event.characterLinks ?? []).filter((l) => l.role === "PARTICIPANT");
    if (!participants.length && (event.characterLinks ?? []).length > 3) {
      issues.push({
        kind: "major_event_no_participants",
        entityId: event.id,
        entityLabel: event.title,
        detail: "has character links but no explicit PARTICIPANT roles",
      });
    }
  }
  return issues;
}

export function auditTierAChampions(): ContentDepthIssue[] {
  const issues: ContentDepthIssue[] = [];
  for (const c of characters) {
    const q = computeQuality(c);
    if (q.tier !== "A") continue;

    if (c.longDescription.length < MIN_TIER_A_BIO_PARAGRAPHS) {
      issues.push({
        kind: "tier_a_thin_bio",
        entityId: c.id,
        entityLabel: c.name,
        detail: `only ${c.longDescription.length} bio paragraphs`,
      });
    }
    if (c.timeline.length < MIN_TIER_A_TIMELINE_BEATS) {
      issues.push({
        kind: "tier_a_thin_timeline",
        entityId: c.id,
        entityLabel: c.name,
        detail: `only ${c.timeline.length} timeline beats`,
      });
    }
    const charClaims = claimsForSubject(claims, c.id).filter(isActiveClaim);
    const trusted = charClaims.filter(isTrustedClaim);
    if (trusted.length < MIN_TIER_A_CLAIMS) {
      issues.push({
        kind: "tier_a_few_claims",
        entityId: c.id,
        entityLabel: c.name,
        detail: `only ${trusted.length} trusted claims`,
      });
    }
  }
  return issues;
}

export function auditMajorFactions(): ContentDepthIssue[] {
  const major = ["kinkou", "order-of-shadow", "solari", "lunari", "navori-brotherhood"];
  const issues: ContentDepthIssue[] = [];
  for (const slug of major) {
    const faction = factions.find((f) => f.slug === slug);
    if (!faction) continue;
    const text = [faction.shortDescription, ...(faction.longDescription ?? [])].join(" ");
    if (text.length < MIN_FACTION_LONG_CHARS) {
      issues.push({
        kind: "faction_thin",
        entityId: faction.id,
        entityLabel: faction.name,
        detail: `description too short (${text.length} chars)`,
      });
    }
  }
  return issues;
}

export function auditMajorRegions(): ContentDepthIssue[] {
  const major = ["ionia", "noxus", "demacia", "shurima", "freljord", "targon"];
  const issues: ContentDepthIssue[] = [];
  for (const slug of major) {
    const region = regions.find((r) => r.slug === slug);
    if (!region) continue;
    const text = [region.shortDescription, ...(region.longDescription ?? [])].join(" ");
    if (text.length < MIN_REGION_HISTORY_CHARS) {
      issues.push({
        kind: "region_thin",
        entityId: region.id,
        entityLabel: region.name,
        detail: `history too short (${text.length} chars)`,
      });
    }
  }
  return issues;
}

export function auditStoryPaths(): ContentDepthIssue[] {
  const issues: ContentDepthIssue[] = [];
  for (const path of storyPaths) {
    const blocks = path.chapters.flatMap((c) => c.blocks);
    if (blocks.length < 3) {
      issues.push({
        kind: "story_path_thin",
        entityId: path.id,
        entityLabel: path.title,
        detail: `only ${blocks.length} narrative blocks`,
      });
    }
    const hasCharacters = path.chapters.some((c) => c.characterIds.length > 0);
    if (!hasCharacters) {
      issues.push({
        kind: "story_path_no_characters",
        entityId: path.id,
        entityLabel: path.title,
        detail: "no linked characters",
      });
    }
  }
  return issues;
}

export function runContentDepthAudit(): ContentDepthIssue[] {
  return [
    ...auditMajorEvents(),
    ...auditTierAChampions(),
    ...auditMajorFactions(),
    ...auditMajorRegions(),
    ...auditStoryPaths(),
  ];
}

export function contentDepthSummary() {
  const issues = runContentDepthAudit();
  const byKind = new Map<string, number>();
  for (const i of issues) {
    byKind.set(i.kind, (byKind.get(i.kind) ?? 0) + 1);
  }
  const tierA = characters.filter((c) => computeQuality(c).tier === "A").length;
  const thinChampions = characters.filter(
    (c) => c.longDescription.length < 2 && computeQuality(c).tier !== "C",
  ).length;
  return { issues, byKind, tierA, thinChampions };
}
