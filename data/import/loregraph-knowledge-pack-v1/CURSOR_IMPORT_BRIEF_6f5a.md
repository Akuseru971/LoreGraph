# Cursor Import Brief — LoreGraph Knowledge Pack v1

Treat this folder as an **input corpus**, not as already-approved production truth.

## Required behavior

1. Import every CSV into staging tables/types.
2. Preserve all existing richer human-reviewed LoreGraph data.
3. Resolve entities by canonical ID and aliases.
4. Fetch P0 primary Riot biography URLs first.
5. Fetch Wiki URLs only when permitted; respect robots/rate limits.
6. Parse sources into atomic claims, never copy long prose.
7. Follow Wiki references back to Riot sources when possible.
8. Set every imported seed with `reviewStatus=PENDING` until evidence is checked.
9. Never promote `STRUCTURAL_LORE`, `AMBIGUOUS`, or `THEMATIC` to `DIRECT_CANON` because a path exists.
10. Do not infer event participation merely from being alive/in the same region/era.

## Merge priority

HUMAN_REVIEWED
PRIMARY_RIOT
OFFICIAL_WIKI_REFERENCE
STRUCTURED_DERIVED
PLACEHOLDER

## Core checks

- no fake release-year defaults
- no accidental `...` truncation in public bios
- narrative roles != gameplay classes
- duplicate pair/category relationship warning
- participant edge must cite an event source
- direct canon must cite explicit evidence
- event asset must have source and focal-point QA
- `Kai'Sa` must not be an ancient Void War participant
- `Atreus` must not be conflated with the ancient Aspect of War
- source status and relationship canon status remain separate

## Deliverable after import

Produce a report with:
- champions Tier A/B/C
- sources fetched
- primary Riot sources
- Wiki sources
- claims generated
- relationships verified/downgraded
- event count
- event images found
- research queue remaining
- conflicts
- broken URLs
