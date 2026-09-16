# LoreGraph Knowledge Pack — Data Dictionary

## champions.csv
Canonical roster registry. One row per champion. Source URLs are discovery pointers, not proof that every field is verified.

## sources.csv
Provenance registry. `authority_tier` is crucial:
- PRIMARY_OFFICIAL
- PRIMARY_OFFICIAL_STATIC
- OFFICIAL_COMMUNITY_REFERENCE

## claims.csv
Atomic facts and derived facts. This should become the canonical staging layer before graph construction.

## relationships.csv
Seed graph relationships. All rows are PENDING and must be checked against evidence.

## events.csv
Historical/event objects. Event images are deliberately not fabricated; `image_status` identifies asset work remaining.

## event_participants.csv
Seed event participation/association table. The importer MUST verify actual participation.

## media.csv
Champion Riot Data Dragon assets + event asset discovery queue. Focal points are explicit fields so cinematic/mobile crop can be art-directed.

## research_queue.csv
Work queue for Cursor / human review.

## source_manifest.csv
Fetch plan for ingestion automation.

### Boolean/string conventions
CSV values intentionally use text such as TRUE/FALSE/PENDING so imports remain database-agnostic.

### Critical merge rule
Never overwrite reviewed production lore with lower-authority imported data.
