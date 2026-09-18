/** Raw CSV row types for Knowledge Pack v1. */

export interface ImportedChampion {
  champion_id: string;
  name: string;
  canonical_slug: string;
  ddragon_id: string;
  region_primary: string;
  official_title: string;
  narrative_roles: string;
  species: string;
  status: string;
  aliases: string;
  completeness_tier: string;
  needs_research: string;
  riot_champion_url: string;
  wiki_universe_url: string;
  wiki_data_url: string;
  ddragon_json_url: string;
  portrait_url: string;
  splash_url: string;
  loading_url: string;
  source_verified_online: string;
  last_verified_at: string;
  notes: string;
}

export interface ImportedClaim {
  claim_id: string;
  subject_id: string;
  subject_name: string;
  predicate: string;
  object_id: string;
  object_value: string;
  claim_type: string;
  fact_confidence: string;
  canon_status: string;
  continuity: string;
  source_ids: string;
  evidence_note: string;
  review_status: string;
  needs_review: string;
}

export interface ImportedRelationship {
  relationship_id: string;
  source_entity_id: string;
  source_name: string;
  target_entity_id: string;
  target_name: string;
  relationship_type: string;
  connection_category: string;
  confidence: string;
  short_explanation: string;
  canon_status: string;
  continuity: string;
  source_ids: string;
  source_urls: string;
  source_verified: string;
  review_status: string;
  needs_review: string;
  notes: string;
}

export interface ImportedEvent {
  event_id: string;
  name: string;
  aliases: string;
  era: string;
  event_type: string;
  description_short: string;
  description_long: string;
  canon_status: string;
  continuity: string;
  verified: string;
  needs_review: string;
  wiki_url: string;
  primary_riot_url: string;
  source_ids: string;
  image_status: string;
  image_url: string;
  image_source_url: string;
  focal_point_x: string;
  focal_point_y: string;
  mobile_focal_point_x: string;
  mobile_focal_point_y: string;
  image_search_query: string;
  notes: string;
}

export interface ImportedEventParticipant {
  event_id: string;
  entity_id: string;
  entity_name: string;
  role_in_event: string;
  participation_status: string;
  source_ids: string;
  needs_review: string;
  notes: string;
}

export interface ImportedSource {
  source_id: string;
  entity_id: string;
  entity_type: string;
  title: string;
  url: string;
  domain: string;
  source_type: string;
  authority_tier: string;
  continuity: string;
  canon_status: string;
  fetch_status: string;
  retrieved_at: string;
  notes: string;
}

export interface ImportedMedia {
  media_id: string;
  entity_id: string;
  entity_type: string;
  media_type: string;
  url: string;
  source_url: string;
  authority: string;
  focal_point_x: string;
  focal_point_y: string;
  mobile_focal_point_x: string;
  mobile_focal_point_y: string;
  qa_status: string;
  notes: string;
}

export interface ImportedFaction {
  faction_id: string;
  name: string;
  region: string;
  description: string;
  canon_status: string;
  wiki_url: string;
  primary_riot_url: string;
  image_status: string;
  image_url: string;
  needs_review: string;
}

export interface ImportedRegion {
  region_id: string;
  name: string;
  realm: string;
  description: string;
  canon_status: string;
  wiki_url: string;
  primary_riot_url: string;
  image_status: string;
  image_url: string;
  needs_review: string;
}

export interface ImportedArtifact {
  artifact_id: string;
  name: string;
  region: string;
  description: string;
  canon_status: string;
  wiki_url: string;
  primary_riot_url: string;
  image_status: string;
  image_url: string;
  needs_review: string;
}

export interface ImportedLoreEntity {
  entity_id: string;
  name: string;
  entity_type: string;
  description: string;
  region: string;
  canon_status: string;
  needs_review: string;
  source_url: string;
}

export interface ImportedAlias {
  entity_id: string;
  canonical_name: string;
  alias: string;
  alias_type: string;
}

export interface ImportedResearchItem {
  entity_id: string;
  entity_name: string;
  entity_type: string;
  priority: string;
  issue_type: string;
  issue: string;
  missing_fields: string;
  candidate_source_urls: string;
  status: string;
  notes: string;
}

export interface KnowledgePack {
  champions: ImportedChampion[];
  claims: ImportedClaim[];
  relationships: ImportedRelationship[];
  events: ImportedEvent[];
  eventParticipants: ImportedEventParticipant[];
  sources: ImportedSource[];
  media: ImportedMedia[];
  factions: ImportedFaction[];
  regions: ImportedRegion[];
  artifacts: ImportedArtifact[];
  loreEntities: ImportedLoreEntity[];
  aliases: ImportedAlias[];
  researchQueue: ImportedResearchItem[];
}

export interface ImportReport {
  generatedAt: string;
  packVersion: string;
  canonicalSource: string;
  rowsRead: Record<string, number>;
  champions: {
    read: number;
    enriched: number;
    skippedRich: number;
    conflicts: string[];
  };
  claims: { imported: number; merged: number; rejected: number; totalAfter: number };
  sources: { imported: number; merged: number; totalAfter: number };
  relationships: {
    imported: number;
    merged: number;
    rejected: number;
    requiresReview: number;
    totalAfter: number;
  };
  events: { imported: number; merged: number; totalAfter: number };
  eventParticipants: { imported: number; applied: number };
  media: { imported: number; applied: number };
  factions: { imported: number; merged: number };
  regions: { imported: number; merged: number };
  artifacts: { imported: number; merged: number };
  loreEntities: { imported: number; merged: number };
  invalidRecords: string[];
  conflictsRequireReview: string[];
  duplicateRelationships: string[];
  researchQueueSize: number;
  tierCounts: { A: number; B: number; C: number };
}
