# LoreGraph Knowledge Pack v1

Generated: 2026-09-16

This pack is a **structured ingestion corpus**, not a verbatim mirror of Riot or the League of Legends Wiki.

It is designed for Cursor / LoreGraph to turn public lore sources into a provenance-aware knowledge graph.

## What is inside

- `173` champion registry rows
- `774` source registry rows
- `340` atomic claim seeds
- `83` relationship seeds
- `25` historical/event seeds
- `84` event participation seeds
- `16` regions
- `24` factions
- `10` artifacts
- `371` media records / asset work queue
- `180` research queue rows

## Source authority

1. `PRIMARY_OFFICIAL` — current Riot champion/lore/media pages.
2. `PRIMARY_OFFICIAL_STATIC` — Riot Data Dragon static data/assets.
3. `OFFICIAL_COMMUNITY_REFERENCE` — Riot-supported League of Legends Wiki.
4. Derived/editorial data must never be treated as direct canon without evidence.

## Important limitation

The official League Wiki blocks direct automated crawling in this environment. This pack therefore:
- registers the Wiki URLs Cursor should research,
- includes event/reference data discoverable through indexed pages,
- marks unverified data as `needs_review=TRUE`,
- avoids pretending that un-fetched Wiki text was verified.

Cursor should only crawl pages when technically permitted, respect robots.txt and rate limits, cache pages, and follow Wiki citations back to Riot primary sources whenever possible.

## Recommended ingestion order

1. `source_manifest.csv`
2. `champions.csv`
3. `sources.csv`
4. `regions.csv`, `factions.csv`, `lore_entities.csv`, `artifacts.csv`
5. `events.csv`
6. `event_participants.csv`
7. `relationships.csv`
8. `claims.csv`
9. `media.csv`
10. `research_queue.csv`

## Critical semantics

`source_verified` does **not** mean the relationship itself is canon.

Use separate fields in LoreGraph:
- source/evidence verified
- connection category
- confidence
- canon status
- review status

## Copyright / transformation

Do not ingest and republish entire biographies, short stories, comics, book chapters or Wiki articles.
Extract:
- atomic facts
- relationships
- events
- participants
- locations
- factions
- chronology
- source references
- short original summaries

Then write original LoreGraph prose.

## Suggested Cursor commands

Implement scripts equivalent to:

```bash
npm run lore:import
npm run lore:fetch
npm run lore:normalize
npm run lore:reconcile
npm run lore:validate
npm run lore:report
```

### Import safety rule

Never overwrite a richer reviewed LoreGraph record with a lower-quality imported row.

Use merge priority:

`HUMAN_REVIEWED > PRIMARY_RIOT > WIKI_REFERENCE > DERIVED > PLACEHOLDER`

## P0 review items

- Ambessa
- Yunara
- Zaahen
- Locke
- Viktor
- Pantheon / Atreus / Aspect of War
- Kai'Sa ancient Void chronology
- relationship duplicate detection
- event participant vs broad historical association
- event imagery and focal points

## Key external roots

- Riot champions: https://www.leagueoflegends.com/en-us/champions/
- Riot lore: https://www.leagueoflegends.com/en-us/news/lore/
- Riot media: https://www.leagueoflegends.com/en-us/news/media/
- Riot Developer / Data Dragon: https://developer.riotgames.com/docs/lol
- Official Wiki: https://wiki.leagueoflegends.com/
