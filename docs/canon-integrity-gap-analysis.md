# LoreGraph Canon Integrity Gap Analysis

**Audit source:** `LoreGraph_Strict_Canon_Audit_2026-09-16.md`  
**Repository review date:** 2026-09-16  
**Branch:** `cursor/loregraph-canon-integrity-0ad4`

---

## Executive summary

The audit correctly identifies that LoreGraph's primary risk is **epistemic classification**, not missing data. Most P0 findings were **CONFIRMED** in the current codebase. This pass implements structural safeguards and corrects the highest-risk factual copy without redesigning the product.

---

## P0 findings

### P0.1 Ascended created specifically to fight the Void — **CONFIRMED**

| | |
|---|---|
| **Finding** | Copy claims Ascension was invented specifically for the Void war |
| **Current implementation** | `data/characters/shurima-targon.ts` (Aatrox bio), `data/relationships.ts`, `data/lore-entities.ts`, `data/factions.ts`, `data/story-paths.ts`, `data/quiz-questions.ts` |
| **Root cause** | Editorial synthesis treated institutional Ascension as Void-causality |
| **User-facing impact** | Champion profiles, Story Paths, Daily quiz, Connect explanations |
| **Proposed correction** | Global phrase rewrite; red-flag validator |
| **Risk** | Low — wording only |

### P0.2 Aatrox/Pantheon duel reversal — **CONFIRMED**

| | |
|---|---|
| **Finding** | Timeline/event copy says Aatrox killed the host; contradicts Riot Pantheon bio |
| **Current implementation** | `shurima-targon.ts` timeline beat; `data/events.ts` `aatrox-pantheon-duel` |
| **Root cause** | Legacy editorial conflation of host death with Aspect death |
| **Proposed correction** | Consistent: Aspect destroyed, Atreus survived |
| **Risk** | Low |

### P0.3 Aspect of War temporal identity — **PARTIALLY_CONFIRMED**

| | |
|---|---|
| **Finding** | Ancient Aspect history attached to modern `char:pantheon` |
| **Current implementation** | `concept:aspect-of-war` exists in `data/lore-entities.ts`; journey builder inserts concept step; darkin-war participants do NOT include pantheon in core data |
| **Root cause** | Pantheon bio references Aspect memory; timeline wording ambiguous |
| **Proposed correction** | Validator blocks `char:pantheon` on ancient events; clarify copy |
| **Status** | Validator added; concept entity already separated |

### P0.4 Aatrox ↔ Nasus DIRECT_CANON — **CONFIRMED**

| | |
|---|---|
| **Finding** | Promoted to direct documented relationship without interaction evidence |
| **Current implementation** | `rel:aatrox-nasus-*` in `data/relationships.ts` |
| **Proposed correction** | Reclassified to `STRUCTURAL_LORE` / `APPROVED_EDITORIAL` |
| **Status** | **FIXED** |

### P0.5 Daily Lore unsafe content — **CONFIRMED**

| | |
|---|---|
| **Finding** | Quiz contained Void-causality misinformation |
| **Current implementation** | `data/quiz-questions.ts`; `lib/canon/model.ts` Daily eligibility |
| **Proposed correction** | Fix quiz copy; tighten `isDailyEligibleEdge` to require reviewed status |
| **Status** | **FIXED** |

### P0.6 Unverified events connect-eligible — **CONFIRMED**

| | |
|---|---|
| **Finding** | Pack events imported with `connectEligible: true` while `verified: false` |
| **Current implementation** | `lib/lore-import/reconcile.ts`; `data/knowledge/generated/events-pack.ts` |
| **Proposed correction** | Default `connectEligible` from `verified`; runtime gate in `data/events.ts` |
| **Status** | **FIXED** |

### P0.7 "Documented as participant" copy — **CONFIRMED**

| | |
|---|---|
| **Finding** | Generic fallback overstates certainty |
| **Current implementation** | `lib/knowledge/edge-explanations.ts` |
| **Proposed correction** | Evidence-aware verbs; pending/unverified qualifiers |
| **Status** | **FIXED** |

### P0.8 `verified` semantics contradictory — **CONFIRMED**

| | |
|---|---|
| **Finding** | `verified: true` + `reviewStatus: PENDING` + `needsReview: false` |
| **Current implementation** | `lib/truth/review.ts`; relationship build in `data/relationships.ts` |
| **Proposed correction** | `PENDING` always implies `needsReview: true`; validator invariant |
| **Status** | **FIXED** |

### P0.9 Missing canon defaults to CURRENT_CANON — **CONFIRMED**

| | |
|---|---|
| **Finding** | `normalizeCanonStatus()` returned `CURRENT_CANON` when absent |
| **Current implementation** | `lib/canon/model.ts` |
| **Proposed correction** | Default `UNKNOWN`; `resolveSeedCanonStatus()` for verified curated seeds |
| **Status** | **FIXED** |

---

## P1 highlights

| Finding | Status | Notes |
|---------|--------|-------|
| Darkin War oversimplification | **PARTIALLY_FIXED** | Aatrox timeline rewritten; Story Path still editorial |
| Varus ancient history | **REQUIRES_CANON_RESEARCH** | Varus↔Pantheon/Nasus remain `needsReview` |
| Duplicate Aatrox↔Varus | **NOT_REPRODUCIBLE** | Only one structural edge in current data |
| Aatrox↔Azir chronology | **FIXED** | Structural framing corrected |
| Story Path THE DARKIN too factual | **PARTIALLY_FIXED** | `verified: false`; Void chapter → editorial |
| Pantheon "fragment" wording | **FIXED** | Aligned with Riot "own will" framing |
| Yunara Shen/Akali pollution | **FIXED** | Timeline co-participants removed; edges downgraded |
| Ambessa↔Swain structural | **FIXED** | `verified: false`, `APPROVED_EDITORIAL` |
| Era of Hextech as event | **PARTIALLY_FIXED** | Era nodes excluded from `connectEligible` |
| Completeness overstates quality | **PARTIALLY_FIXED** | Tier A capped at B when unverified/needsResearch |
| Stale knowledge report | **REQUIRES_CANON_RESEARCH** | Regenerate via `npm run lore:report` post-merge |

---

## P2 / deferred

- SEO canonical domain (`lore-graph.vercel.app`) — **NOT_ADDRESSED** (needs `NEXT_PUBLIC_SITE_URL` config)
- Editorial parallels visual separation — **NOT_ADDRESSED** (product/UI scope)
- Claim-level provenance model — **PARTIALLY_ADDRESSED** (types planned; full claim wiring deferred)
- Event participation roles (PARTICIPANT vs ACTIVE_DURING) — **NOT_ADDRESSED** (schema extension deferred)

---

## Structural changes implemented

| File | Change |
|------|--------|
| `lib/canon/model.ts` | `UNKNOWN` default; `resolveSeedCanonStatus`; stricter Daily eligibility |
| `lib/canon/red-flags.ts` | Build-time phrase scanning |
| `lib/truth/review.ts` | PENDING → needsReview invariant |
| `lib/truth/layer.ts` | Category inference uses resolved canon status |
| `lib/knowledge/edge-explanations.ts` | Evidence-aware copy |
| `lib/graph/build.ts` | `reviewStatus`/`needsReview` on graph edges |
| `data/events.ts` | connectEligible gated on verified; era exclusion |
| `lib/lore-import/reconcile.ts` | Pack events connectEligible from verified |
| `scripts/validate-lore.ts` | Hard failures for connectEligible, red flags, temporal identity |
| `lib/graph/connect-regression.test.ts` | Expanded regression pairs |

---

## Remaining research queue

1. **Varus** — Void War participation claims (Wiki vs Riot bio)
2. **Mel / Ambessa** — Arcane reconciliation continuity fields
3. **Viktor ↔ Singed / Jayce** — Arcane-specific source attribution
4. **Yunara** — Ingest Pilgrimage, Sanctuary, Battle of Koeshin (patch 25.14)
5. **Zaahen / Locke** — Promote to Tier A after primary-source QA
6. **Story Paths** — Sentence-level FACT/SYNTHESIS taxonomy (Targon, Piltover, Arcane paths)
7. **Knowledge report** — Regenerate counts from runtime dataset

---

## Validation status (post-fix)

```
npm run validate:lore  ✓
npm test               ✓ (42/42)
npm run typecheck      ✓
npm run build          ✓
```
