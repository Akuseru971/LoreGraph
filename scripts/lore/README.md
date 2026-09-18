# LoreGraph Ingestion Pipeline

Maintainable research pipeline for the Runeterra knowledge engine.

## Flow

```
SOURCE → RAW RESEARCH → STRUCTURED CLAIMS → NORMALIZED ENTITIES → RECONCILIATION → KNOWLEDGE GRAPH → PUBLIC PRESENTATION
```

## Commands

| Command | Description |
|---------|-------------|
| `npm run lore:discover` | Discover candidate Riot + Wiki source URLs per champion |
| `npm run lore:sync-years` | Sync release years from Meraki Analytics into `data/roster.ts` |
| `npm run lore:import-pack` | Import Knowledge Pack v1 from staging CSVs |
| `npm run lore:reconcile` | Alias for `lore:import-pack` |
| `npm run lore:build` | Sync years + regenerate expansion seeds |
| `npm run lore:validate` | Extended quality checks → `reports/lore-review.json` |
| `npm run lore:report` | Generate `docs/lore-knowledge-report.md` |
| `npm run validate:lore` | Canon model + graph integrity validation |

## Source Authority

1. **PRIMARY_OFFICIAL** — Riot first-party (bios, cinematics, stories)
2. **OFFICIAL_COMMUNITY_REFERENCE** — League Wiki Universe pages
3. **OFFICIAL_PUBLISHED** — Books, Forge games with documented canon
4. **DISCOVERY_ONLY** — Third-party references for research, not auto-canon

## Legal / Fetching Rules

- Respect robots.txt and rate limits
- Cache fetched pages locally during pipeline runs
- Never store long copyrighted text — extract facts and short evidence only
- Mark unavailable sources as research tasks rather than fabricating content

## Data Layers

- `data/knowledge/claims.ts` — Atomic claim-level facts
- `data/knowledge/event-assets.ts` — Event imagery and focal points
- `lib/knowledge/completeness.ts` — Profile tier scoring (A/B/C)
- `lib/knowledge/edge-explanations.ts` — Character-specific Connect copy
