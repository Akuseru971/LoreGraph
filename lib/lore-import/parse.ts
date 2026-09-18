import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { parseCsvRecords } from "./csv";
import type {
  ImportedAlias,
  ImportedArtifact,
  ImportedChampion,
  ImportedClaim,
  ImportedEvent,
  ImportedEventParticipant,
  ImportedFaction,
  ImportedLoreEntity,
  ImportedMedia,
  ImportedRegion,
  ImportedRelationship,
  ImportedResearchItem,
  ImportedSource,
  KnowledgePack,
} from "./types";

const PACK_DIR = join(process.cwd(), "data/import/loregraph-knowledge-pack-v1");

function findCsv(suffix: string): string {
  const files = readdirSync(PACK_DIR).filter(
    (f) => f.endsWith(".csv") && f.includes(suffix),
  );
  if (files.length === 0) {
    throw new Error(`Missing CSV matching *${suffix}* in ${PACK_DIR}`);
  }
  return join(PACK_DIR, files[0]);
}

function load<T>(suffix: string): T[] {
  const path = findCsv(suffix);
  const content = readFileSync(path, "utf8");
  return parseCsvRecords(content) as T[];
}

export function loadKnowledgePack(): KnowledgePack {
  return {
    champions: load<ImportedChampion>("champions"),
    claims: load<ImportedClaim>("claims"),
    relationships: load<ImportedRelationship>("relationships"),
    events: load<ImportedEvent>("events"),
    eventParticipants: load<ImportedEventParticipant>("event_participants"),
    sources: load<ImportedSource>("sources"),
    media: load<ImportedMedia>("media"),
    factions: load<ImportedFaction>("factions"),
    regions: load<ImportedRegion>("regions"),
    artifacts: load<ImportedArtifact>("artifacts"),
    loreEntities: load<ImportedLoreEntity>("lore_entities"),
    aliases: load<ImportedAlias>("aliases"),
    researchQueue: load<ImportedResearchItem>("research_queue"),
  };
}

export function packRowCounts(pack: KnowledgePack): Record<string, number> {
  return {
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
  };
}
