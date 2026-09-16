import { characters } from "@/data/characters";
import { claims as existingClaims } from "@/data/knowledge/claims";
import { sources as existingSources } from "@/data/sources";
import { coreEventSlugs } from "@/data/events-core-slugs";
import { relationships as existingRelationships } from "@/data/relationships";
import { normalizeCanonStatus } from "@/lib/canon/model";
import type {
  CanonStatus,
  Claim,
  ClaimType,
  ConnectionCategory,
  ConnectionConfidence,
  Continuity,
  EventAsset,
  FactConfidence,
  LoreEvent,
  Relationship,
  RelationshipType,
  ReviewStatus,
  Source,
  SourceAuthorityTier,
  SourceType,
} from "@/types";
import {
  buildAliasMap,
  mapSourceId,
  normalizeEntityId,
  normalizeSlug,
  parseBool,
  parsePipeList,
  regionSlugFromName,
  slugFromCharId,
  EVENT_ID_MAP,
} from "./normalize";
import type { ImportReport, KnowledgePack } from "./types";

const GAMEPLAY_CLASSES = new Set([
  "fighter", "assassin", "mage", "marksman", "tank", "support",
  "juggernaut", "diver", "skirmisher", "controller", "burst",
]);

function mapCanonStatus(raw: string): CanonStatus {
  const v = raw?.toUpperCase() ?? "";
  if (v.includes("RECONCILIATION")) return "RECONCILIATION_PENDING";
  if (v.includes("LEGACY")) return "LEGACY_LORE";
  if (v.includes("AMBIGUOUS")) return "AMBIGUOUS";
  if (v.includes("ALTERNATE")) return "ALTERNATE_UNIVERSE";
  if (v === "CURRENT_CANON") return "CURRENT_CANON";
  return "CURRENT_CANON";
}

function mapContinuity(raw: string): Continuity {
  const v = raw?.toUpperCase() ?? "MAIN_RUNETERRA";
  if (v.includes("ARCANE")) return "ARCANE";
  if (v.includes("SKIN")) return "SKIN_UNIVERSE";
  if (v.includes("LEGACY")) return "LEGACY";
  return "MAIN_RUNETERRA";
}

function mapConfidence(raw: string): ConnectionConfidence {
  const v = raw?.toUpperCase() ?? "";
  if (v === "DOCUMENTED") return "DOCUMENTED";
  if (v === "STRONG") return "STRONG";
  if (v === "DERIVED") return "DERIVED";
  if (v === "INTERPRETIVE") return "INTERPRETIVE";
  return "UNCERTAIN";
}

function mapClaimType(raw: string): ClaimType {
  const v = raw?.toUpperCase() ?? "";
  if (v.includes("PARTICIPATION") || v.includes("EVENT")) return "PARTICIPATION";
  if (v.includes("RELATIONSHIP")) return "RELATIONSHIP";
  if (v.includes("TRANSFORMATION") || v === "DARKIN") return "TRANSFORMATION";
  if (v.includes("AFFILIATION") || v.includes("REGION")) return "AFFILIATION";
  if (v.includes("CHRONOLOGY")) return "CHRONOLOGY";
  if (v.includes("OWNERSHIP")) return "OWNERSHIP";
  return "ATTRIBUTE";
}

function mapSourceType(raw: string): SourceType {
  const map: Record<string, SourceType> = {
    CHAMPION_BIO: "Champion Biography",
    WIKI_UNIVERSE: "Wiki Universe",
    WIKI_REFERENCE: "Wiki Reference",
    DATA_DRAGON: "Game",
    CINEMATIC: "Cinematic",
    SHORT_STORY: "Short Story",
    COMIC: "Comic",
    EVENT_PAGE: "Event Page",
    REGION_PAGE: "Region Page",
    FACTION_PAGE: "Faction Page",
  };
  return map[raw?.toUpperCase()] ?? "Other";
}

function mapAuthorityTier(raw: string): SourceAuthorityTier {
  const v = raw?.toUpperCase() ?? "";
  if (v.includes("PRIMARY_OFFICIAL")) return "PRIMARY_OFFICIAL";
  if (v.includes("COMMUNITY") || v.includes("WIKI")) return "OFFICIAL_COMMUNITY_REFERENCE";
  if (v.includes("PUBLISHED")) return "OFFICIAL_PUBLISHED";
  return "DISCOVERY_ONLY";
}

function mapRelationshipType(raw: string): RelationshipType {
  const v = raw?.toUpperCase() ?? "related";
  const map: Record<string, RelationshipType> = {
    ENEMY: "enemy",
    ENEMIES: "enemy",
    ALLY: "ally",
    ALLIES: "ally",
    FAMILY: "family",
    MENTOR_STUDENT: "mentor",
    RIVAL: "rival",
    RIVALS: "rival",
    LOVER: "lover",
    LOVERS: "lover",
    POLITICAL: "political",
    ADVERSARIES: "enemy",
    DARKIN: "faction",
    FACTION: "faction",
  };
  return map[v] ?? "related";
}

function mapConnectionCategory(raw: string): ConnectionCategory {
  const v = raw?.toUpperCase() ?? "";
  const map: Record<string, ConnectionCategory> = {
    DIRECT_CANON: "DIRECT_CANON",
    SHARED_EVENT: "SHARED_EVENT",
    SHARED_FACTION: "SHARED_FACTION",
    SHARED_REGION: "SHARED_REGION",
    STRUCTURAL_LORE: "STRUCTURAL_LORE",
    THEMATIC_PARALLEL: "THEMATIC_PARALLEL",
    AMBIGUOUS: "AMBIGUOUS",
    LEGACY_CONNECTION: "LEGACY_CONNECTION",
  };
  return map[v] ?? "STRUCTURAL_LORE";
}

function eventSlugFromPackId(eventId: string): string {
  const normalized = normalizeEntityId(eventId, new Map());
  return normalized.replace("event:", "");
}

function claimKey(c: Claim): string {
  return [
    c.subjectId,
    c.predicate,
    c.objectId ?? "",
    c.value ?? "",
    c.continuity,
  ].join("::");
}

function relPairKey(a: string, b: string, category: string): string {
  const pair = [a, b].sort().join("::");
  return `${pair}::${category}`;
}

function isRichProfile(slug: string): boolean {
  const c = characters.find((ch) => ch.slug === slug);
  if (!c) return false;
  if (c.verified && (c.completenessTier === "A" || c.timeline.length >= 3)) return true;
  if (c.longDescription.length >= 3 && c.timeline.length >= 3) return true;
  return false;
}

function shouldRejectRelationship(
  sourceId: string,
  targetId: string,
  category: ConnectionCategory,
): string | null {
  // Never create false Aatrox ↔ Kai'Sa direct canon
  const slugs = new Set([
    slugFromCharId(sourceId),
    slugFromCharId(targetId),
  ]);
  if (slugs.has("aatrox") && slugs.has("kaisa") && category === "DIRECT_CANON") {
    return "Aatrox and Kai'Sa must not have DIRECT_CANON — indirect structural only";
  }
  // Kai'Sa must not participate in ancient void war as direct event participant
  if (slugs.has("kaisa") && targetId.includes("void-incursion")) {
    return "Kai'Sa must not be linked to ancient Void incursion as participant";
  }
  return null;
}

export interface ReconciledOutput {
  claims: Claim[];
  sources: Source[];
  relationships: Relationship[];
  events: LoreEvent[];
  eventAssets: EventAsset[];
  eventParticipantMap: Record<string, string[]>;
  championSourceAdds: Record<string, string[]>;
  report: ImportReport;
}

export function reconcileKnowledgePack(pack: KnowledgePack): ReconciledOutput {
  const aliasMap = buildAliasMap(pack.aliases);
  const report: ImportReport = {
    generatedAt: new Date().toISOString(),
    packVersion: "v1",
    canonicalSource: "CSV (data/import/loregraph-knowledge-pack-v1/)",
    rowsRead: {
      champions: pack.champions.length,
      claims: pack.claims.length,
      relationships: pack.relationships.length,
      events: pack.events.length,
      event_participants: pack.eventParticipants.length,
      sources: pack.sources.length,
      media: pack.media.length,
      regions: pack.regions.length,
      factions: pack.factions.length,
      artifacts: pack.artifacts.length,
      lore_entities: pack.loreEntities.length,
      aliases: pack.aliases.length,
      research_queue: pack.researchQueue.length,
    },
    champions: { read: pack.champions.length, enriched: 0, skippedRich: 0, conflicts: [] },
    claims: { imported: 0, merged: 0, rejected: 0, totalAfter: 0 },
    sources: { imported: 0, merged: 0, totalAfter: 0 },
    relationships: {
      imported: 0,
      merged: 0,
      rejected: 0,
      requiresReview: 0,
      totalAfter: 0,
    },
    events: { imported: 0, merged: 0, totalAfter: 0 },
    eventParticipants: { imported: pack.eventParticipants.length, applied: 0 },
    media: { imported: pack.media.length, applied: 0 },
    factions: { imported: pack.factions.length, merged: 0 },
    regions: { imported: pack.regions.length, merged: 0 },
    artifacts: { imported: pack.artifacts.length, merged: 0 },
    loreEntities: { imported: pack.loreEntities.length, merged: 0 },
    invalidRecords: [],
    conflictsRequireReview: [],
    duplicateRelationships: [],
    researchQueueSize: pack.researchQueue.length,
    tierCounts: { A: 0, B: 0, C: 0 },
  };

  /* ----------------------------- Sources -------------------------------- */
  const sourceByUrl = new Map(existingSources.map((s) => [s.url, s]));
  const sourceById = new Map(existingSources.map((s) => [s.id, s]));
  const mergedSources: Source[] = [...existingSources];

  for (const row of pack.sources) {
    const mappedId = mapSourceId(row.source_id);
    const existing = sourceById.get(mappedId) ?? sourceByUrl.get(row.url);

    if (existing) {
      report.sources.merged++;
      continue;
    }

    const source: Source = {
      id: mappedId,
      title: row.title || row.source_id,
      type: mapSourceType(row.source_type),
      url: row.url,
      publisher: row.domain?.includes("wiki") ? "Riot Games Community Wiki" : "Riot Games",
      publicationDate: row.retrieved_at || null,
      canonStatus: mapCanonStatus(row.canon_status),
      authorityTier: mapAuthorityTier(row.authority_tier),
      domain: row.domain,
      continuity: mapContinuity(row.continuity),
      retrievedAt: row.retrieved_at || undefined,
      notes: row.notes || undefined,
      originalSourceId: mappedId !== row.source_id ? row.source_id : undefined,
    };

    mergedSources.push(source);
    sourceById.set(source.id, source);
    sourceByUrl.set(source.url, source);
    report.sources.imported++;
  }
  report.sources.totalAfter = mergedSources.length;

  /* ------------------------------ Claims -------------------------------- */
  const claimMap = new Map<string, Claim>();
  for (const c of existingClaims) {
    claimMap.set(claimKey(c), c);
  }

  for (const row of pack.claims) {
    const subjectId = normalizeEntityId(row.subject_id, aliasMap);
    const objectId = row.object_id
      ? normalizeEntityId(row.object_id, aliasMap)
      : undefined;

    // Skip low-value structural region seeds when reviewed claim exists
    if (
      row.predicate === "ASSOCIATED_WITH_REGION" &&
      parseBool(row.needs_review)
    ) {
      const existingForSubject = [...claimMap.values()].filter(
        (c) => c.subjectId === subjectId && c.reviewed,
      );
      if (existingForSubject.length > 0) {
        report.claims.rejected++;
        continue;
      }
    }

    const sourceIds = parsePipeList(row.source_ids).map(mapSourceId);
    const claim: Claim = {
      id: row.claim_id.replace(/^claim:/, "claim:pack:"),
      subjectId,
      predicate: row.predicate,
      objectId,
      value: row.object_value || undefined,
      claimType: mapClaimType(row.claim_type),
      certainty: mapConfidence(row.fact_confidence) as FactConfidence,
      canonStatus: mapCanonStatus(row.canon_status),
      continuity: mapContinuity(row.continuity),
      sourceIds,
      evidenceNote: row.evidence_note || undefined,
      reviewed: row.review_status === "VERIFIED",
      needsReview: parseBool(row.needs_review) || row.review_status === "PENDING",
    };

    const key = claimKey(claim);
    const existing = claimMap.get(key);
    if (existing) {
      existing.sourceIds = [...new Set([...existing.sourceIds, ...claim.sourceIds])];
      report.claims.merged++;
    } else {
      claimMap.set(key, claim);
      report.claims.imported++;
    }
  }
  const mergedClaims = [...claimMap.values()];
  report.claims.totalAfter = mergedClaims.length;

  /* --------------------------- Relationships --------------------------- */
  const existingRelKeys = new Set(
    existingRelationships.map((r) =>
      relPairKey(r.sourceCharacterId, r.targetCharacterId, r.connectionType),
    ),
  );
  const existingRelById = new Map(existingRelationships.map((r) => [r.id, r]));
  const packRelationships: Relationship[] = [];

  for (const row of pack.relationships) {
    const sourceId = normalizeEntityId(row.source_entity_id, aliasMap);
    const targetId = normalizeEntityId(row.target_entity_id, aliasMap);

    if (!sourceId.startsWith("char:") || !targetId.startsWith("char:")) {
      report.invalidRecords.push(`Relationship ${row.relationship_id}: non-character entity`);
      report.relationships.rejected++;
      continue;
    }

    const category = mapConnectionCategory(row.connection_category);
    const rejectReason = shouldRejectRelationship(sourceId, targetId, category);
    if (rejectReason) {
      report.relationships.rejected++;
      report.conflictsRequireReview.push(`${row.relationship_id}: ${rejectReason}`);
      continue;
    }

    const pairKey = relPairKey(sourceId, targetId, category);
    if (existingRelKeys.has(pairKey)) {
      report.relationships.merged++;
      continue;
    }

    const sourceIds = parsePipeList(row.source_ids).map(mapSourceId);
    const isPending = row.review_status === "PENDING" || parseBool(row.needs_review);
    const isVerified = row.source_verified === "TRUE" && !isPending;

    // Never auto-promote pack DIRECT_CANON to verified
    const verified = category === "DIRECT_CANON" ? false : isVerified;

    if (category === "DIRECT_CANON" && isPending) {
      report.relationships.requiresReview++;
    }

    const sourceSlug = slugFromCharId(sourceId);
    const targetSlug = slugFromCharId(targetId);
    if (!characters.some((c) => c.slug === sourceSlug)) {
      report.invalidRecords.push(`Relationship ${row.relationship_id}: unknown source ${sourceSlug}`);
      report.relationships.rejected++;
      continue;
    }
    if (!characters.some((c) => c.slug === targetSlug)) {
      report.invalidRecords.push(`Relationship ${row.relationship_id}: unknown target ${targetSlug}`);
      report.relationships.rejected++;
      continue;
    }

    const rel: Relationship = {
      id: row.relationship_id.replace(/^rel:/, "rel:pack:"),
      universeId: "runeterra",
      sourceCharacterId: sourceId,
      targetCharacterId: targetId,
      type: mapRelationshipType(row.relationship_type),
      connectionType: category,
      confidence: mapConfidence(row.confidence),
      label: row.relationship_type.replace(/_/g, " "),
      shortExplanation: row.short_explanation,
      longExplanation: row.short_explanation,
      importanceScore: category === "DIRECT_CANON" ? 75 : 55,
      canonStatus: mapCanonStatus(row.canon_status),
      sourceIds,
      eventIds: [],
      factionIds: [],
      regionIds: [],
      verified,
      reviewed: false,
      reviewStatus: isPending ? "PENDING" : "APPROVED_EDITORIAL",
      needsReview: isPending,
      editorialNote: row.notes || undefined,
    };

    packRelationships.push(rel);
    existingRelKeys.add(pairKey);
    report.relationships.imported++;
  }

  /* ------------------------------ Events -------------------------------- */
  const eventBySlug = new Map<string, LoreEvent>();
  const packEvents: LoreEvent[] = [];

  for (const row of pack.events) {
    const slug = eventSlugFromPackId(row.event_id);
    if (coreEventSlugs.has(slug)) {
      report.events.merged++;
      continue;
    }

    if (EVENT_ID_MAP[row.event_id]) {
      report.events.merged++;
      continue;
    }

    const event: LoreEvent = {
      id: `event:${slug}`,
      universeId: "runeterra",
      type: "event",
      slug,
      name: row.name,
      title: row.name,
      description: row.description_short || row.description_long || row.name,
      era: row.era || "Unknown",
      order: 500 + packEvents.length,
      importance: 60,
      characterIds: [],
      regionSlugs: [],
      canonStatus: mapCanonStatus(row.canon_status),
      continuity: mapContinuity(row.continuity),
      verified: parseBool(row.verified),
      connectEligible: true,
      sourceIds: parsePipeList(row.source_ids).map(mapSourceId),
    };
    packEvents.push(event);
    eventBySlug.set(slug, event);
    report.events.imported++;
  }

  // Apply event participants
  const participantAdds = new Map<string, Set<string>>();
  for (const row of pack.eventParticipants) {
    const eventSlug = eventSlugFromPackId(row.event_id);
    const entityId = normalizeEntityId(row.entity_id, aliasMap);
    if (!entityId.startsWith("char:")) continue;
    if (row.participation_status?.toUpperCase().includes("ASSOCIATED") &&
        !row.participation_status?.toUpperCase().includes("PARTICIPATED")) {
      continue; // skip broad associations
    }
    if (slugFromCharId(entityId) === "kaisa" && eventSlug === "void-incursion") {
      report.conflictsRequireReview.push(
        `Rejected Kai'Sa participation in void-incursion`,
      );
      continue;
    }
    if (!participantAdds.has(eventSlug)) participantAdds.set(eventSlug, new Set());
    participantAdds.get(eventSlug)!.add(entityId);
    report.eventParticipants.applied++;
  }

  const eventParticipantMap: Record<string, string[]> = {};
  for (const [slug, ids] of participantAdds) {
    eventParticipantMap[slug] = [...ids];
  }

  /* ------------------------------- Media -------------------------------- */
  const eventAssets: EventAsset[] = [];
  for (const row of pack.media) {
    if (row.entity_type !== "EVENT") continue;
    const eventSlug = eventSlugFromPackId(row.entity_id);
    const focalX = parseFloat(row.focal_point_x);
    const focalY = parseFloat(row.focal_point_y);
    eventAssets.push({
      eventId: `event:${eventSlug}`,
      primaryImageUrl: row.url || undefined,
      sourceUrl: row.source_url || undefined,
      focalPointX: Number.isFinite(focalX) ? focalX : undefined,
      focalPointY: Number.isFinite(focalY) ? focalY : undefined,
      focalPointMobileX: parseFloat(row.mobile_focal_point_x) || undefined,
      focalPointMobileY: parseFloat(row.mobile_focal_point_y) || undefined,
      copyrightOwner: row.authority?.includes("Riot") ? "Riot Games" : undefined,
      attribution: row.notes || undefined,
    });
    report.media.applied++;
  }

  /* --------------------------- Champion enrichment ---------------------- */
  const championSourceAdds: Record<string, string[]> = {};
  for (const row of pack.champions) {
    const slug = normalizeSlug(row.canonical_slug);
    if (isRichProfile(slug)) {
      report.champions.skippedRich++;
      continue;
    }

    const adds: string[] = [];
    if (row.wiki_universe_url) adds.push(`source:wiki-${slug}`);
    if (row.riot_champion_url) adds.push(`source:bio-${slug}`);
    championSourceAdds[slug] = adds;
    report.champions.enriched++;
  }

  /* ------------------------- Tier counts (current) ---------------------- */
  for (const c of characters) {
    const tier = c.completenessTier ?? "C";
    if (tier === "A") report.tierCounts.A++;
    else if (tier === "B") report.tierCounts.B++;
    else report.tierCounts.C++;
  }

  report.relationships.totalAfter =
    existingRelationships.length + packRelationships.length;

  return {
    claims: mergedClaims,
    sources: mergedSources,
    relationships: packRelationships,
    events: packEvents,
    eventAssets,
    eventParticipantMap,
    championSourceAdds,
    report,
  };
}

export function serializeClaim(c: Claim): string {
  return `  {
    id: ${JSON.stringify(c.id)},
    subjectId: ${JSON.stringify(c.subjectId)},
    predicate: ${JSON.stringify(c.predicate)},
    ${c.objectId ? `objectId: ${JSON.stringify(c.objectId)},` : ""}
    ${c.value ? `value: ${JSON.stringify(c.value)},` : ""}
    claimType: ${JSON.stringify(c.claimType)},
    certainty: ${JSON.stringify(c.certainty)},
    canonStatus: ${JSON.stringify(c.canonStatus)},
    continuity: ${JSON.stringify(c.continuity)},
    sourceIds: ${JSON.stringify(c.sourceIds)},
    ${c.evidenceNote ? `evidenceNote: ${JSON.stringify(c.evidenceNote)},` : ""}
    reviewed: ${c.reviewed},
    needsReview: ${c.needsReview},
  }`;
}
