# LoreGraph — 173 Champion Exact Tier A Remediation Master

Baseline production commit audited: `a7664c8d2810a07a0509d36fc3bb15181b3ec4ad`

## What this file is

This is the champion-by-champion implementation backlog for Cursor. It identifies what is currently unsafe or missing, what canonical information must be present, and what Cursor must build before a champion may receive Tier A.

## Non-negotiable evidence chain

`PUBLIC STATEMENT → ATOMIC CLAIM → SOURCE FACT / EVIDENCE EXTRACT → ACTUAL RIOT SOURCE`

A `sourceId`, an `evidenceNote`, or a regex that matches the claim text does **not** prove the claim. Cursor must verify each CORE proposition against evidence extracted from the actual source content.

## Strict Tier A exit gate

- `contentCompleteness >= 85`
- `sourceCoverage >= 80`
- `canonConfidence >= 85`
- `reviewCoverage >= 90`
- `trustedTimelineCoverage >= 70`
- 100% of CORE timeline beats trusted
- direct relationship review coverage >= 80 when applicable
- no unsupported PARTICIPANT link
- continuity and species classified
- no P0/P1 canon contradiction

## Current production truth

- Current Tier A under the strict gate: **Aurelion Sol, Diana, Kassadin, Leona, Malzahar**.
- All other profiles must remain B/C until their own evidence chains pass.
- Sparse-canon champions may become Tier A with fewer facts if those facts exhaust the available reliable canon. Do not invent richness.

## Champion-by-champion remediation

### Aatrox — `aatrox`

**Current state:** Tier B · `PHASE1_REVALIDATE`
**Current blocker:** canonConfidence 79 < 85

**False / unsafe / must be removed, downgraded or kept pending**
- Do not promote editorial lines such as 'Targon built the cages', universalized Ascended-corruption psychology, or 'world ending is the most reliable exit' to FACT without exact evidence.

**Canonical information that must exist as sourced claims / bio facts**
- Former Shuriman Ascended
- later fought the Void
- became Darkin after Shurima's fall
- trapped in his sword
- possesses/remakes mortal wielders
- destroyed the celestial Aspect of War within Atreus while Atreus survived.

**Exactly what Cursor must add / repair**
- Primary Riot bio: `https://www.leagueoflegends.com/en-us/champions/aatrox/`
- Set continuity explicitly at champion, claim and timeline level.
- Create 3–5 internal bioBlocks: FACT / SUPPORTED_SYNTHESIS / EDITORIAL_FRAMING as appropriate.
- Turn each factual item above into one atomic claim only if a real Riot source supports that exact proposition.
- For each CORE claim create an evidenceRef/sourceFact derived from the actual source content; never validate using only evidenceNote or claim regex.
- Create 3–5 meaningful timeline beats where canon supports them. Every CORE beat needs trusted claimIds + sourceIds + evidenceRefs.
- Audit all DIRECT_CANON relationships. Shared region/faction/history remains STRUCTURAL_LORE unless explicit interaction/kinship is documented.
- Audit event links with exact EventRelationRole. PARTICIPANT requires trusted PARTICIPATED_IN evidence for that exact event.
- Recompute Tier A. Never flip reviewed/verified flags just to pass the gate.

**Suggested atomic-claim queue**
- `claim:aatrox:core:01` → Former Shuriman Ascended
- `claim:aatrox:core:02` → later fought the Void
- `claim:aatrox:core:03` → became Darkin after Shurima's fall
- `claim:aatrox:core:04` → trapped in his sword
- `claim:aatrox:core:05` → possesses/remakes mortal wielders
- `claim:aatrox:core:06` → destroyed the celestial Aspect of War within Atreus while Atreus survived.

### Ahri — `ahri`

**Current state:** Tier C · `CURATED_PROVENANCE_GAP`
**Current blocker:** Existing curated profile lacks enough exact source-backed claims/timeline/continuity coverage for Tier A.

**False / unsafe / must be removed, downgraded or kept pending**
- No specific contradiction confirmed in this pass; treat every unsourced existing statement as UNVERIFIED until checked against a real Riot source.

**Canonical information that must exist as sourced claims / bio facts**
- Vastaya with magic tied to life essence and memories
- struggles with consuming essence
- seeks understanding of her origins
- keep direct relationships/story beats only where Riot stories explicitly show them.

**Exactly what Cursor must add / repair**
- Primary Riot bio: `https://www.leagueoflegends.com/en-us/champions/ahri/`
- Set continuity explicitly at champion, claim and timeline level.
- Create 3–5 internal bioBlocks: FACT / SUPPORTED_SYNTHESIS / EDITORIAL_FRAMING as appropriate.
- Turn each factual item above into one atomic claim only if a real Riot source supports that exact proposition.
- For each CORE claim create an evidenceRef/sourceFact derived from the actual source content; never validate using only evidenceNote or claim regex.
- Create 3–5 meaningful timeline beats where canon supports them. Every CORE beat needs trusted claimIds + sourceIds + evidenceRefs.
- Audit all DIRECT_CANON relationships. Shared region/faction/history remains STRUCTURAL_LORE unless explicit interaction/kinship is documented.
- Audit event links with exact EventRelationRole. PARTICIPANT requires trusted PARTICIPATED_IN evidence for that exact event.
- Recompute Tier A. Never flip reviewed/verified flags just to pass the gate.

**Suggested atomic-claim queue**
- `claim:ahri:core:01` → Vastaya with magic tied to life essence and memories
- `claim:ahri:core:02` → struggles with consuming essence
- `claim:ahri:core:03` → seeks understanding of her origins
- `claim:ahri:core:04` → keep direct relationships/story beats only where Riot stories explicitly show them.

### Akali — `akali`

**Current state:** Tier C · `CURATED_PROVENANCE_GAP`
**Current blocker:** Existing curated profile lacks enough exact source-backed claims/timeline/continuity coverage for Tier A.

**False / unsafe / must be removed, downgraded or kept pending**
- No specific contradiction confirmed in this pass; treat every unsourced existing statement as UNVERIFIED until checked against a real Riot source.

**Canonical information that must exist as sourced claims / bio facts**
- Former Kinkou acolyte
- left the Kinkou to act independently
- direct history with Shen and Kennen
- do not treat her as current formal Kinkou leadership.

**Exactly what Cursor must add / repair**
- Primary Riot bio: `https://www.leagueoflegends.com/en-us/champions/akali/`
- Set continuity explicitly at champion, claim and timeline level.
- Create 3–5 internal bioBlocks: FACT / SUPPORTED_SYNTHESIS / EDITORIAL_FRAMING as appropriate.
- Turn each factual item above into one atomic claim only if a real Riot source supports that exact proposition.
- For each CORE claim create an evidenceRef/sourceFact derived from the actual source content; never validate using only evidenceNote or claim regex.
- Create 3–5 meaningful timeline beats where canon supports them. Every CORE beat needs trusted claimIds + sourceIds + evidenceRefs.
- Audit all DIRECT_CANON relationships. Shared region/faction/history remains STRUCTURAL_LORE unless explicit interaction/kinship is documented.
- Audit event links with exact EventRelationRole. PARTICIPANT requires trusted PARTICIPATED_IN evidence for that exact event.
- Recompute Tier A. Never flip reviewed/verified flags just to pass the gate.

**Suggested atomic-claim queue**
- `claim:akali:core:01` → Former Kinkou acolyte
- `claim:akali:core:02` → left the Kinkou to act independently
- `claim:akali:core:03` → direct history with Shen and Kennen
- `claim:akali:core:04` → do not treat her as current formal Kinkou leadership.

### Akshan — `akshan`

**Current state:** Tier C · `CURATED_PROVENANCE_GAP`
**Current blocker:** Existing curated profile lacks enough exact source-backed claims/timeline/continuity coverage for Tier A.

**False / unsafe / must be removed, downgraded or kept pending**
- No specific contradiction confirmed in this pass; treat every unsourced existing statement as UNVERIFIED until checked against a real Riot source.

**Canonical information that must exist as sourced claims / bio facts**
- Shuriman Sentinel of Light
- trained by Shadya
- wields the Absolver
- distinguish Sentinel membership from specific Ruination event participation unless sourced.

**Exactly what Cursor must add / repair**
- Primary Riot bio: `https://www.leagueoflegends.com/en-us/champions/akshan/`
- Set continuity explicitly at champion, claim and timeline level.
- Create 3–5 internal bioBlocks: FACT / SUPPORTED_SYNTHESIS / EDITORIAL_FRAMING as appropriate.
- Turn each factual item above into one atomic claim only if a real Riot source supports that exact proposition.
- For each CORE claim create an evidenceRef/sourceFact derived from the actual source content; never validate using only evidenceNote or claim regex.
- Create 3–5 meaningful timeline beats where canon supports them. Every CORE beat needs trusted claimIds + sourceIds + evidenceRefs.
- Audit all DIRECT_CANON relationships. Shared region/faction/history remains STRUCTURAL_LORE unless explicit interaction/kinship is documented.
- Audit event links with exact EventRelationRole. PARTICIPANT requires trusted PARTICIPATED_IN evidence for that exact event.
- Recompute Tier A. Never flip reviewed/verified flags just to pass the gate.

**Suggested atomic-claim queue**
- `claim:akshan:core:01` → Shuriman Sentinel of Light
- `claim:akshan:core:02` → trained by Shadya
- `claim:akshan:core:03` → wields the Absolver
- `claim:akshan:core:04` → distinguish Sentinel membership from specific Ruination event participation unless sourced.

### Alistar — `alistar`

**Current state:** Tier C · `FULL_TIER_A_BUILD`
**Current blocker:** Minimal/incomplete profile: biography depth, continuity, atomic claims, trusted timeline, events and relations are insufficient.

**False / unsafe / must be removed, downgraded or kept pending**
- No specific contradiction confirmed in this pass; treat every unsourced existing statement as UNVERIFIED until checked against a real Riot source.

**Canonical information that must exist as sourced claims / bio facts**
- Minotaur captured and enslaved by Noxians
- forced into arenas
- escaped
- seeks justice/revenge
- avoid invented present-day named relationships.

**Exactly what Cursor must add / repair**
- Primary Riot bio: `https://www.leagueoflegends.com/en-us/champions/alistar/`
- Set continuity explicitly at champion, claim and timeline level.
- Create 3–5 internal bioBlocks: FACT / SUPPORTED_SYNTHESIS / EDITORIAL_FRAMING as appropriate.
- Turn each factual item above into one atomic claim only if a real Riot source supports that exact proposition.
- For each CORE claim create an evidenceRef/sourceFact derived from the actual source content; never validate using only evidenceNote or claim regex.
- Create 3–5 meaningful timeline beats where canon supports them. Every CORE beat needs trusted claimIds + sourceIds + evidenceRefs.
- Audit all DIRECT_CANON relationships. Shared region/faction/history remains STRUCTURAL_LORE unless explicit interaction/kinship is documented.
- Audit event links with exact EventRelationRole. PARTICIPANT requires trusted PARTICIPATED_IN evidence for that exact event.
- Recompute Tier A. Never flip reviewed/verified flags just to pass the gate.

**Suggested atomic-claim queue**
- `claim:alistar:core:01` → Minotaur captured and enslaved by Noxians
- `claim:alistar:core:02` → forced into arenas
- `claim:alistar:core:03` → escaped
- `claim:alistar:core:04` → seeks justice/revenge
- `claim:alistar:core:05` → avoid invented present-day named relationships.

### Ambessa — `ambessa`

**Current state:** Tier B · `CURATED_PROVENANCE_GAP`
**Current blocker:** Existing curated profile lacks enough exact source-backed claims/timeline/continuity coverage for Tier A.

**False / unsafe / must be removed, downgraded or kept pending**
- Do not infer a direct Swain relationship from Noxian/Black Rose context.

**Canonical information that must exist as sourced claims / bio facts**
- Noxian general and Medarda matriarch
- follows the Wolf ideal
- direct family relationship to Mel
- Arcane-specific events must remain continuity-labeled.

**Exactly what Cursor must add / repair**
- Primary Riot bio: `https://www.leagueoflegends.com/en-us/champions/ambessa/`
- Set continuity explicitly at champion, claim and timeline level.
- Create 3–5 internal bioBlocks: FACT / SUPPORTED_SYNTHESIS / EDITORIAL_FRAMING as appropriate.
- Turn each factual item above into one atomic claim only if a real Riot source supports that exact proposition.
- For each CORE claim create an evidenceRef/sourceFact derived from the actual source content; never validate using only evidenceNote or claim regex.
- Create 3–5 meaningful timeline beats where canon supports them. Every CORE beat needs trusted claimIds + sourceIds + evidenceRefs.
- Audit all DIRECT_CANON relationships. Shared region/faction/history remains STRUCTURAL_LORE unless explicit interaction/kinship is documented.
- Audit event links with exact EventRelationRole. PARTICIPANT requires trusted PARTICIPATED_IN evidence for that exact event.
- Recompute Tier A. Never flip reviewed/verified flags just to pass the gate.

**Suggested atomic-claim queue**
- `claim:ambessa:core:01` → Noxian general and Medarda matriarch
- `claim:ambessa:core:02` → follows the Wolf ideal
- `claim:ambessa:core:03` → direct family relationship to Mel
- `claim:ambessa:core:04` → Arcane-specific events must remain continuity-labeled.

### Amumu — `amumu`

**Current state:** Tier C · `FULL_TIER_A_BUILD`
**Current blocker:** Minimal/incomplete profile: biography depth, continuity, atomic claims, trusted timeline, events and relations are insufficient.

**False / unsafe / must be removed, downgraded or kept pending**
- Do not select one contradictory origin story as VERIFIED_CANON.

**Canonical information that must exist as sourced claims / bio facts**
- Ancient Shuriman mummy-like cursed figure
- eternal loneliness is core
- origin is intentionally contradictory/uncertain, so no single origin theory may be VERIFIED_CANON.

**Exactly what Cursor must add / repair**
- Primary Riot bio: `https://www.leagueoflegends.com/en-us/champions/amumu/`
- Set continuity explicitly at champion, claim and timeline level.
- Create 3–5 internal bioBlocks: FACT / SUPPORTED_SYNTHESIS / EDITORIAL_FRAMING as appropriate.
- Turn each factual item above into one atomic claim only if a real Riot source supports that exact proposition.
- For each CORE claim create an evidenceRef/sourceFact derived from the actual source content; never validate using only evidenceNote or claim regex.
- Create 3–5 meaningful timeline beats where canon supports them. Every CORE beat needs trusted claimIds + sourceIds + evidenceRefs.
- Audit all DIRECT_CANON relationships. Shared region/faction/history remains STRUCTURAL_LORE unless explicit interaction/kinship is documented.
- Audit event links with exact EventRelationRole. PARTICIPANT requires trusted PARTICIPATED_IN evidence for that exact event.
- Recompute Tier A. Never flip reviewed/verified flags just to pass the gate.

**Suggested atomic-claim queue**
- `claim:amumu:core:01` → Ancient Shuriman mummy-like cursed figure
- `claim:amumu:core:02` → eternal loneliness is core
- `claim:amumu:core:03` → origin is intentionally contradictory/uncertain, so no single origin theory may be VERIFIED_CANON.

### Anivia — `anivia`

**Current state:** Tier C · `FULL_TIER_A_BUILD`
**Current blocker:** Minimal/incomplete profile: biography depth, continuity, atomic claims, trusted timeline, events and relations are insufficient.

**False / unsafe / must be removed, downgraded or kept pending**
- No specific contradiction confirmed in this pass; treat every unsourced existing statement as UNVERIFIED until checked against a real Riot source.

**Canonical information that must exist as sourced claims / bio facts**
- Freljordian demigod/spirit of winter and rebirth
- protector of the Freljord
- sibling mythology with Ornn/Volibear only where current sources support it.

**Exactly what Cursor must add / repair**
- Primary Riot bio: `https://www.leagueoflegends.com/en-us/champions/anivia/`
- Set continuity explicitly at champion, claim and timeline level.
- Create 3–5 internal bioBlocks: FACT / SUPPORTED_SYNTHESIS / EDITORIAL_FRAMING as appropriate.
- Turn each factual item above into one atomic claim only if a real Riot source supports that exact proposition.
- For each CORE claim create an evidenceRef/sourceFact derived from the actual source content; never validate using only evidenceNote or claim regex.
- Create 3–5 meaningful timeline beats where canon supports them. Every CORE beat needs trusted claimIds + sourceIds + evidenceRefs.
- Audit all DIRECT_CANON relationships. Shared region/faction/history remains STRUCTURAL_LORE unless explicit interaction/kinship is documented.
- Audit event links with exact EventRelationRole. PARTICIPANT requires trusted PARTICIPATED_IN evidence for that exact event.
- Recompute Tier A. Never flip reviewed/verified flags just to pass the gate.

**Suggested atomic-claim queue**
- `claim:anivia:core:01` → Freljordian demigod/spirit of winter and rebirth
- `claim:anivia:core:02` → protector of the Freljord
- `claim:anivia:core:03` → sibling mythology with Ornn/Volibear only where current sources support it.

### Annie — `annie`

**Current state:** Tier C · `FULL_TIER_A_BUILD`
**Current blocker:** Minimal/incomplete profile: biography depth, continuity, atomic claims, trusted timeline, events and relations are insufficient.

**False / unsafe / must be removed, downgraded or kept pending**
- No specific contradiction confirmed in this pass; treat every unsourced existing statement as UNVERIFIED until checked against a real Riot source.

**Canonical information that must exist as sourced claims / bio facts**
- Child pyromancer
- Tibbers central to her magic and family history
- parents Gregori/Amoline where supported
- do not infer Noxian military or political membership.

**Exactly what Cursor must add / repair**
- Primary Riot bio: `https://www.leagueoflegends.com/en-us/champions/annie/`
- Set continuity explicitly at champion, claim and timeline level.
- Create 3–5 internal bioBlocks: FACT / SUPPORTED_SYNTHESIS / EDITORIAL_FRAMING as appropriate.
- Turn each factual item above into one atomic claim only if a real Riot source supports that exact proposition.
- For each CORE claim create an evidenceRef/sourceFact derived from the actual source content; never validate using only evidenceNote or claim regex.
- Create 3–5 meaningful timeline beats where canon supports them. Every CORE beat needs trusted claimIds + sourceIds + evidenceRefs.
- Audit all DIRECT_CANON relationships. Shared region/faction/history remains STRUCTURAL_LORE unless explicit interaction/kinship is documented.
- Audit event links with exact EventRelationRole. PARTICIPANT requires trusted PARTICIPATED_IN evidence for that exact event.
- Recompute Tier A. Never flip reviewed/verified flags just to pass the gate.

**Suggested atomic-claim queue**
- `claim:annie:core:01` → Child pyromancer
- `claim:annie:core:02` → Tibbers central to her magic and family history
- `claim:annie:core:03` → parents Gregori/Amoline where supported
- `claim:annie:core:04` → do not infer Noxian military or political membership.

### Aphelios — `aphelios`

**Current state:** Tier C · `FULL_TIER_A_BUILD`
**Current blocker:** Minimal/incomplete profile: biography depth, continuity, atomic claims, trusted timeline, events and relations are insufficient.

**False / unsafe / must be removed, downgraded or kept pending**
- No specific contradiction confirmed in this pass; treat every unsourced existing statement as UNVERIFIED until checked against a real Riot source.

**Canonical information that must exist as sourced claims / bio facts**
- Lunari weapon of faith
- Alune is twin sister in spirit realm
- noctum connects them
- Solari conflict must be sourced as actual persecution/events, not generic Targon proximity.

**Exactly what Cursor must add / repair**
- Primary Riot bio: `https://www.leagueoflegends.com/en-us/champions/aphelios/`
- Set continuity explicitly at champion, claim and timeline level.
- Create 3–5 internal bioBlocks: FACT / SUPPORTED_SYNTHESIS / EDITORIAL_FRAMING as appropriate.
- Turn each factual item above into one atomic claim only if a real Riot source supports that exact proposition.
- For each CORE claim create an evidenceRef/sourceFact derived from the actual source content; never validate using only evidenceNote or claim regex.
- Create 3–5 meaningful timeline beats where canon supports them. Every CORE beat needs trusted claimIds + sourceIds + evidenceRefs.
- Audit all DIRECT_CANON relationships. Shared region/faction/history remains STRUCTURAL_LORE unless explicit interaction/kinship is documented.
- Audit event links with exact EventRelationRole. PARTICIPANT requires trusted PARTICIPATED_IN evidence for that exact event.
- Recompute Tier A. Never flip reviewed/verified flags just to pass the gate.

**Suggested atomic-claim queue**
- `claim:aphelios:core:01` → Lunari weapon of faith
- `claim:aphelios:core:02` → Alune is twin sister in spirit realm
- `claim:aphelios:core:03` → noctum connects them
- `claim:aphelios:core:04` → Solari conflict must be sourced as actual persecution/events, not generic Targon proximity.

### Ashe — `ashe`

**Current state:** Tier C · `CURATED_PROVENANCE_GAP`
**Current blocker:** Existing curated profile lacks enough exact source-backed claims/timeline/continuity coverage for Tier A.

**False / unsafe / must be removed, downgraded or kept pending**
- No specific contradiction confirmed in this pass; treat every unsourced existing statement as UNVERIFIED until checked against a real Riot source.

**Canonical information that must exist as sourced claims / bio facts**
- Avarosan Warmother
- Iceborn archer
- claims descent from Avarosa
- political marriage/alliance with Tryndamere
- seeks Freljordian unification.

**Exactly what Cursor must add / repair**
- Primary Riot bio: `https://www.leagueoflegends.com/en-us/champions/ashe/`
- Set continuity explicitly at champion, claim and timeline level.
- Create 3–5 internal bioBlocks: FACT / SUPPORTED_SYNTHESIS / EDITORIAL_FRAMING as appropriate.
- Turn each factual item above into one atomic claim only if a real Riot source supports that exact proposition.
- For each CORE claim create an evidenceRef/sourceFact derived from the actual source content; never validate using only evidenceNote or claim regex.
- Create 3–5 meaningful timeline beats where canon supports them. Every CORE beat needs trusted claimIds + sourceIds + evidenceRefs.
- Audit all DIRECT_CANON relationships. Shared region/faction/history remains STRUCTURAL_LORE unless explicit interaction/kinship is documented.
- Audit event links with exact EventRelationRole. PARTICIPANT requires trusted PARTICIPATED_IN evidence for that exact event.
- Recompute Tier A. Never flip reviewed/verified flags just to pass the gate.

**Suggested atomic-claim queue**
- `claim:ashe:core:01` → Avarosan Warmother
- `claim:ashe:core:02` → Iceborn archer
- `claim:ashe:core:03` → claims descent from Avarosa
- `claim:ashe:core:04` → political marriage/alliance with Tryndamere
- `claim:ashe:core:05` → seeks Freljordian unification.

### Aurelion Sol — `aurelion-sol`

**Current state:** Tier A · `PHASE1_REVALIDATE`
**Current blocker:** Currently Tier A under strict gate; still requires real source-extract verification before considering the profile source-audited.

**False / unsafe / must be removed, downgraded or kept pending**
- No specific contradiction confirmed in this pass; treat every unsourced existing statement as UNVERIFIED until checked against a real Riot source.

**Canonical information that must exist as sourced claims / bio facts**
- Celestial dragon and star forger
- created stars
- bound by Targonian Aspects through a crown
- seeks freedom
- avoid synthetic direct relationships with modern Targonians.

**Exactly what Cursor must add / repair**
- Primary Riot bio: `https://www.leagueoflegends.com/en-us/champions/aurelion-sol/`
- Set continuity explicitly at champion, claim and timeline level.
- Create 3–5 internal bioBlocks: FACT / SUPPORTED_SYNTHESIS / EDITORIAL_FRAMING as appropriate.
- Turn each factual item above into one atomic claim only if a real Riot source supports that exact proposition.
- For each CORE claim create an evidenceRef/sourceFact derived from the actual source content; never validate using only evidenceNote or claim regex.
- Create 3–5 meaningful timeline beats where canon supports them. Every CORE beat needs trusted claimIds + sourceIds + evidenceRefs.
- Audit all DIRECT_CANON relationships. Shared region/faction/history remains STRUCTURAL_LORE unless explicit interaction/kinship is documented.
- Audit event links with exact EventRelationRole. PARTICIPANT requires trusted PARTICIPATED_IN evidence for that exact event.
- Recompute Tier A. Never flip reviewed/verified flags just to pass the gate.

**Suggested atomic-claim queue**
- `claim:aurelion-sol:core:01` → Celestial dragon and star forger
- `claim:aurelion-sol:core:02` → created stars
- `claim:aurelion-sol:core:03` → bound by Targonian Aspects through a crown
- `claim:aurelion-sol:core:04` → seeks freedom
- `claim:aurelion-sol:core:05` → avoid synthetic direct relationships with modern Targonians.

### Aurora — `aurora`

**Current state:** Tier C · `FULL_TIER_A_BUILD`
**Current blocker:** Minimal/incomplete profile: biography depth, continuity, atomic claims, trusted timeline, events and relations are insufficient.

**False / unsafe / must be removed, downgraded or kept pending**
- No specific contradiction confirmed in this pass; treat every unsourced existing statement as UNVERIFIED until checked against a real Riot source.

**Canonical information that must exist as sourced claims / bio facts**
- Freljordian Vastaya able to perceive/interact with spirits
- direct Ornn connection where Riot release lore supports it
- build journey beats from current official stories only.

**Exactly what Cursor must add / repair**
- Primary Riot bio: `https://www.leagueoflegends.com/en-us/champions/aurora/`
- Set continuity explicitly at champion, claim and timeline level.
- Create 3–5 internal bioBlocks: FACT / SUPPORTED_SYNTHESIS / EDITORIAL_FRAMING as appropriate.
- Turn each factual item above into one atomic claim only if a real Riot source supports that exact proposition.
- For each CORE claim create an evidenceRef/sourceFact derived from the actual source content; never validate using only evidenceNote or claim regex.
- Create 3–5 meaningful timeline beats where canon supports them. Every CORE beat needs trusted claimIds + sourceIds + evidenceRefs.
- Audit all DIRECT_CANON relationships. Shared region/faction/history remains STRUCTURAL_LORE unless explicit interaction/kinship is documented.
- Audit event links with exact EventRelationRole. PARTICIPANT requires trusted PARTICIPATED_IN evidence for that exact event.
- Recompute Tier A. Never flip reviewed/verified flags just to pass the gate.

**Suggested atomic-claim queue**
- `claim:aurora:core:01` → Freljordian Vastaya able to perceive/interact with spirits
- `claim:aurora:core:02` → direct Ornn connection where Riot release lore supports it
- `claim:aurora:core:03` → build journey beats from current official stories only.

### Azir — `azir`

**Current state:** Tier B · `PHASE1_REVALIDATE`
**Current blocker:** canonConfidence 80 < 85

**False / unsafe / must be removed, downgraded or kept pending**
- No specific contradiction confirmed in this pass; treat every unsourced existing statement as UNVERIFIED until checked against a real Riot source.

**Canonical information that must exist as sourced claims / bio facts**
- Last emperor of ancient Shurima
- betrayed by Xerath during Ascension
- died in the Fall
- returned as Ascended in modern era
- Sivir's bloodline is central to his return.

**Exactly what Cursor must add / repair**
- Primary Riot bio: `https://www.leagueoflegends.com/en-us/champions/azir/`
- Set continuity explicitly at champion, claim and timeline level.
- Create 3–5 internal bioBlocks: FACT / SUPPORTED_SYNTHESIS / EDITORIAL_FRAMING as appropriate.
- Turn each factual item above into one atomic claim only if a real Riot source supports that exact proposition.
- For each CORE claim create an evidenceRef/sourceFact derived from the actual source content; never validate using only evidenceNote or claim regex.
- Create 3–5 meaningful timeline beats where canon supports them. Every CORE beat needs trusted claimIds + sourceIds + evidenceRefs.
- Audit all DIRECT_CANON relationships. Shared region/faction/history remains STRUCTURAL_LORE unless explicit interaction/kinship is documented.
- Audit event links with exact EventRelationRole. PARTICIPANT requires trusted PARTICIPATED_IN evidence for that exact event.
- Recompute Tier A. Never flip reviewed/verified flags just to pass the gate.

**Suggested atomic-claim queue**
- `claim:azir:core:01` → Last emperor of ancient Shurima
- `claim:azir:core:02` → betrayed by Xerath during Ascension
- `claim:azir:core:03` → died in the Fall
- `claim:azir:core:04` → returned as Ascended in modern era
- `claim:azir:core:05` → Sivir's bloodline is central to his return.

### Bard — `bard`

**Current state:** Tier C · `FULL_TIER_A_BUILD`
**Current blocker:** Minimal/incomplete profile: biography depth, continuity, atomic claims, trusted timeline, events and relations are insufficient.

**False / unsafe / must be removed, downgraded or kept pending**
- No specific contradiction confirmed in this pass; treat every unsourced existing statement as UNVERIFIED until checked against a real Riot source.

**Canonical information that must exist as sourced claims / bio facts**
- Celestial caretaker/traveler protecting cosmic balance
- gathers powerful artifacts/chimes
- motives remain deliberately mysterious, so keep chronology conservative.

**Exactly what Cursor must add / repair**
- Primary Riot bio: `https://www.leagueoflegends.com/en-us/champions/bard/`
- Set continuity explicitly at champion, claim and timeline level.
- Create 3–5 internal bioBlocks: FACT / SUPPORTED_SYNTHESIS / EDITORIAL_FRAMING as appropriate.
- Turn each factual item above into one atomic claim only if a real Riot source supports that exact proposition.
- For each CORE claim create an evidenceRef/sourceFact derived from the actual source content; never validate using only evidenceNote or claim regex.
- Create 3–5 meaningful timeline beats where canon supports them. Every CORE beat needs trusted claimIds + sourceIds + evidenceRefs.
- Audit all DIRECT_CANON relationships. Shared region/faction/history remains STRUCTURAL_LORE unless explicit interaction/kinship is documented.
- Audit event links with exact EventRelationRole. PARTICIPANT requires trusted PARTICIPATED_IN evidence for that exact event.
- Recompute Tier A. Never flip reviewed/verified flags just to pass the gate.

**Suggested atomic-claim queue**
- `claim:bard:core:01` → Celestial caretaker/traveler protecting cosmic balance
- `claim:bard:core:02` → gathers powerful artifacts/chimes
- `claim:bard:core:03` → motives remain deliberately mysterious, so keep chronology conservative.

### Bel'Veth — `belveth`

**Current state:** Tier B · `PHASE1_REVALIDATE`
**Current blocker:** canonConfidence 75 < 85

**False / unsafe / must be removed, downgraded or kept pending**
- Do not reduce Bel'Veth to a servant of the old Void/Watchers; her agenda is distinct.

**Canonical information that must exist as sourced claims / bio facts**
- Void empress born from a devoured city
- contains assimilated memories/history
- wants a reality of her own design
- agenda differs from old Void/Watchers
- Kai'Sa confrontation needs exact source.

**Exactly what Cursor must add / repair**
- Primary Riot bio: `https://www.leagueoflegends.com/en-us/champions/belveth/`
- Set continuity explicitly at champion, claim and timeline level.
- Create 3–5 internal bioBlocks: FACT / SUPPORTED_SYNTHESIS / EDITORIAL_FRAMING as appropriate.
- Turn each factual item above into one atomic claim only if a real Riot source supports that exact proposition.
- For each CORE claim create an evidenceRef/sourceFact derived from the actual source content; never validate using only evidenceNote or claim regex.
- Create 3–5 meaningful timeline beats where canon supports them. Every CORE beat needs trusted claimIds + sourceIds + evidenceRefs.
- Audit all DIRECT_CANON relationships. Shared region/faction/history remains STRUCTURAL_LORE unless explicit interaction/kinship is documented.
- Audit event links with exact EventRelationRole. PARTICIPANT requires trusted PARTICIPATED_IN evidence for that exact event.
- Recompute Tier A. Never flip reviewed/verified flags just to pass the gate.

**Suggested atomic-claim queue**
- `claim:belveth:core:01` → Void empress born from a devoured city
- `claim:belveth:core:02` → contains assimilated memories/history
- `claim:belveth:core:03` → wants a reality of her own design
- `claim:belveth:core:04` → agenda differs from old Void/Watchers
- `claim:belveth:core:05` → Kai'Sa confrontation needs exact source.

### Blitzcrank — `blitzcrank`

**Current state:** Tier C · `FULL_TIER_A_BUILD`
**Current blocker:** Minimal/incomplete profile: biography depth, continuity, atomic claims, trusted timeline, events and relations are insufficient.

**False / unsafe / must be removed, downgraded or kept pending**
- No specific contradiction confirmed in this pass; treat every unsourced existing statement as UNVERIFIED until checked against a real Riot source.

**Canonical information that must exist as sourced claims / bio facts**
- Self-aware Zaunite automaton/golem
- created to help with hazardous conditions
- developed autonomy
- Viktor creator/history must follow current canon wording after revisions.

**Exactly what Cursor must add / repair**
- Primary Riot bio: `https://www.leagueoflegends.com/en-us/champions/blitzcrank/`
- Set continuity explicitly at champion, claim and timeline level.
- Create 3–5 internal bioBlocks: FACT / SUPPORTED_SYNTHESIS / EDITORIAL_FRAMING as appropriate.
- Turn each factual item above into one atomic claim only if a real Riot source supports that exact proposition.
- For each CORE claim create an evidenceRef/sourceFact derived from the actual source content; never validate using only evidenceNote or claim regex.
- Create 3–5 meaningful timeline beats where canon supports them. Every CORE beat needs trusted claimIds + sourceIds + evidenceRefs.
- Audit all DIRECT_CANON relationships. Shared region/faction/history remains STRUCTURAL_LORE unless explicit interaction/kinship is documented.
- Audit event links with exact EventRelationRole. PARTICIPANT requires trusted PARTICIPATED_IN evidence for that exact event.
- Recompute Tier A. Never flip reviewed/verified flags just to pass the gate.

**Suggested atomic-claim queue**
- `claim:blitzcrank:core:01` → Self-aware Zaunite automaton/golem
- `claim:blitzcrank:core:02` → created to help with hazardous conditions
- `claim:blitzcrank:core:03` → developed autonomy
- `claim:blitzcrank:core:04` → Viktor creator/history must follow current canon wording after revisions.

### Brand — `brand`

**Current state:** Tier C · `FULL_TIER_A_BUILD`
**Current blocker:** Minimal/incomplete profile: biography depth, continuity, atomic claims, trusted timeline, events and relations are insufficient.

**False / unsafe / must be removed, downgraded or kept pending**
- No specific contradiction confirmed in this pass; treat every unsourced existing statement as UNVERIFIED until checked against a real Riot source.

**Canonical information that must exist as sourced claims / bio facts**
- Born Kegan Rodhe
- transformed/corrupted by World Rune power
- former connection to Ryze where current lore supports
- seeks greater rune power.

**Exactly what Cursor must add / repair**
- Primary Riot bio: `https://www.leagueoflegends.com/en-us/champions/brand/`
- Set continuity explicitly at champion, claim and timeline level.
- Create 3–5 internal bioBlocks: FACT / SUPPORTED_SYNTHESIS / EDITORIAL_FRAMING as appropriate.
- Turn each factual item above into one atomic claim only if a real Riot source supports that exact proposition.
- For each CORE claim create an evidenceRef/sourceFact derived from the actual source content; never validate using only evidenceNote or claim regex.
- Create 3–5 meaningful timeline beats where canon supports them. Every CORE beat needs trusted claimIds + sourceIds + evidenceRefs.
- Audit all DIRECT_CANON relationships. Shared region/faction/history remains STRUCTURAL_LORE unless explicit interaction/kinship is documented.
- Audit event links with exact EventRelationRole. PARTICIPANT requires trusted PARTICIPATED_IN evidence for that exact event.
- Recompute Tier A. Never flip reviewed/verified flags just to pass the gate.

**Suggested atomic-claim queue**
- `claim:brand:core:01` → Born Kegan Rodhe
- `claim:brand:core:02` → transformed/corrupted by World Rune power
- `claim:brand:core:03` → former connection to Ryze where current lore supports
- `claim:brand:core:04` → seeks greater rune power.

### Braum — `braum`

**Current state:** Tier C · `FULL_TIER_A_BUILD`
**Current blocker:** Minimal/incomplete profile: biography depth, continuity, atomic claims, trusted timeline, events and relations are insufficient.

**False / unsafe / must be removed, downgraded or kept pending**
- No specific contradiction confirmed in this pass; treat every unsourced existing statement as UNVERIFIED until checked against a real Riot source.

**Canonical information that must exist as sourced claims / bio facts**
- Freljordian folk hero
- enormous door/shield
- protects people
- separate folkloric exaggeration from historical fact.

**Exactly what Cursor must add / repair**
- Primary Riot bio: `https://www.leagueoflegends.com/en-us/champions/braum/`
- Set continuity explicitly at champion, claim and timeline level.
- Create 3–5 internal bioBlocks: FACT / SUPPORTED_SYNTHESIS / EDITORIAL_FRAMING as appropriate.
- Turn each factual item above into one atomic claim only if a real Riot source supports that exact proposition.
- For each CORE claim create an evidenceRef/sourceFact derived from the actual source content; never validate using only evidenceNote or claim regex.
- Create 3–5 meaningful timeline beats where canon supports them. Every CORE beat needs trusted claimIds + sourceIds + evidenceRefs.
- Audit all DIRECT_CANON relationships. Shared region/faction/history remains STRUCTURAL_LORE unless explicit interaction/kinship is documented.
- Audit event links with exact EventRelationRole. PARTICIPANT requires trusted PARTICIPATED_IN evidence for that exact event.
- Recompute Tier A. Never flip reviewed/verified flags just to pass the gate.

**Suggested atomic-claim queue**
- `claim:braum:core:01` → Freljordian folk hero
- `claim:braum:core:02` → enormous door/shield
- `claim:braum:core:03` → protects people
- `claim:braum:core:04` → separate folkloric exaggeration from historical fact.

### Briar — `briar`

**Current state:** Tier C · `FULL_TIER_A_BUILD`
**Current blocker:** Minimal/incomplete profile: biography depth, continuity, atomic claims, trusted timeline, events and relations are insufficient.

**False / unsafe / must be removed, downgraded or kept pending**
- No specific contradiction confirmed in this pass; treat every unsourced existing statement as UNVERIFIED until checked against a real Riot source.

**Canonical information that must exist as sourced claims / bio facts**
- Failed Black Rose experiment
- living weapon with uncontrollable bloodlust
- pillory focuses/restrains frenzy
- escaped confinement
- now pursues knowledge and blood independently.

**Exactly what Cursor must add / repair**
- Primary Riot bio: `https://www.leagueoflegends.com/en-us/champions/briar/`
- Set continuity explicitly at champion, claim and timeline level.
- Create 3–5 internal bioBlocks: FACT / SUPPORTED_SYNTHESIS / EDITORIAL_FRAMING as appropriate.
- Turn each factual item above into one atomic claim only if a real Riot source supports that exact proposition.
- For each CORE claim create an evidenceRef/sourceFact derived from the actual source content; never validate using only evidenceNote or claim regex.
- Create 3–5 meaningful timeline beats where canon supports them. Every CORE beat needs trusted claimIds + sourceIds + evidenceRefs.
- Audit all DIRECT_CANON relationships. Shared region/faction/history remains STRUCTURAL_LORE unless explicit interaction/kinship is documented.
- Audit event links with exact EventRelationRole. PARTICIPANT requires trusted PARTICIPATED_IN evidence for that exact event.
- Recompute Tier A. Never flip reviewed/verified flags just to pass the gate.

**Suggested atomic-claim queue**
- `claim:briar:core:01` → Failed Black Rose experiment
- `claim:briar:core:02` → living weapon with uncontrollable bloodlust
- `claim:briar:core:03` → pillory focuses/restrains frenzy
- `claim:briar:core:04` → escaped confinement
- `claim:briar:core:05` → now pursues knowledge and blood independently.

### Caitlyn — `caitlyn`

**Current state:** Tier C · `CURATED_PROVENANCE_GAP`
**Current blocker:** Existing curated profile lacks enough exact source-backed claims/timeline/continuity coverage for Tier A.

**False / unsafe / must be removed, downgraded or kept pending**
- No specific contradiction confirmed in this pass; treat every unsourced existing statement as UNVERIFIED until checked against a real Riot source.

**Canonical information that must exist as sourced claims / bio facts**
- Piltover sheriff/investigator
- direct Vi partnership
- Kiramman/family and Jinx/Vi material must be continuity-aware between MAIN_RUNETERRA and ARCANE.

**Exactly what Cursor must add / repair**
- Primary Riot bio: `https://www.leagueoflegends.com/en-us/champions/caitlyn/`
- Set continuity explicitly at champion, claim and timeline level.
- Create 3–5 internal bioBlocks: FACT / SUPPORTED_SYNTHESIS / EDITORIAL_FRAMING as appropriate.
- Turn each factual item above into one atomic claim only if a real Riot source supports that exact proposition.
- For each CORE claim create an evidenceRef/sourceFact derived from the actual source content; never validate using only evidenceNote or claim regex.
- Create 3–5 meaningful timeline beats where canon supports them. Every CORE beat needs trusted claimIds + sourceIds + evidenceRefs.
- Audit all DIRECT_CANON relationships. Shared region/faction/history remains STRUCTURAL_LORE unless explicit interaction/kinship is documented.
- Audit event links with exact EventRelationRole. PARTICIPANT requires trusted PARTICIPATED_IN evidence for that exact event.
- Recompute Tier A. Never flip reviewed/verified flags just to pass the gate.

**Suggested atomic-claim queue**
- `claim:caitlyn:core:01` → Piltover sheriff/investigator
- `claim:caitlyn:core:02` → direct Vi partnership
- `claim:caitlyn:core:03` → Kiramman/family and Jinx/Vi material must be continuity-aware between MAIN_RUNETERRA and ARCANE.

### Camille — `camille`

**Current state:** Tier C · `CURATED_PROVENANCE_GAP`
**Current blocker:** Existing curated profile lacks enough exact source-backed claims/timeline/continuity coverage for Tier A.

**False / unsafe / must be removed, downgraded or kept pending**
- No specific contradiction confirmed in this pass; treat every unsourced existing statement as UNVERIFIED until checked against a real Riot source.

**Canonical information that must exist as sourced claims / bio facts**
- Clan Ferros operative
- extensively augmented
- protects family/Piltover interests
- avoid importing Arcane family details unless officially merged.

**Exactly what Cursor must add / repair**
- Primary Riot bio: `https://www.leagueoflegends.com/en-us/champions/camille/`
- Set continuity explicitly at champion, claim and timeline level.
- Create 3–5 internal bioBlocks: FACT / SUPPORTED_SYNTHESIS / EDITORIAL_FRAMING as appropriate.
- Turn each factual item above into one atomic claim only if a real Riot source supports that exact proposition.
- For each CORE claim create an evidenceRef/sourceFact derived from the actual source content; never validate using only evidenceNote or claim regex.
- Create 3–5 meaningful timeline beats where canon supports them. Every CORE beat needs trusted claimIds + sourceIds + evidenceRefs.
- Audit all DIRECT_CANON relationships. Shared region/faction/history remains STRUCTURAL_LORE unless explicit interaction/kinship is documented.
- Audit event links with exact EventRelationRole. PARTICIPANT requires trusted PARTICIPATED_IN evidence for that exact event.
- Recompute Tier A. Never flip reviewed/verified flags just to pass the gate.

**Suggested atomic-claim queue**
- `claim:camille:core:01` → Clan Ferros operative
- `claim:camille:core:02` → extensively augmented
- `claim:camille:core:03` → protects family/Piltover interests
- `claim:camille:core:04` → avoid importing Arcane family details unless officially merged.

### Cassiopeia — `cassiopeia`

**Current state:** Tier C · `FULL_TIER_A_BUILD`
**Current blocker:** Minimal/incomplete profile: biography depth, continuity, atomic claims, trusted timeline, events and relations are insufficient.

**False / unsafe / must be removed, downgraded or kept pending**
- No specific contradiction confirmed in this pass; treat every unsourced existing statement as UNVERIFIED until checked against a real Riot source.

**Canonical information that must exist as sourced claims / bio facts**
- Noxian noble of House Du Couteau
- sister of Katarina
- transformed into serpentine form after Shuriman tomb/curse event
- Black Rose ties require exact source.

**Exactly what Cursor must add / repair**
- Primary Riot bio: `https://www.leagueoflegends.com/en-us/champions/cassiopeia/`
- Set continuity explicitly at champion, claim and timeline level.
- Create 3–5 internal bioBlocks: FACT / SUPPORTED_SYNTHESIS / EDITORIAL_FRAMING as appropriate.
- Turn each factual item above into one atomic claim only if a real Riot source supports that exact proposition.
- For each CORE claim create an evidenceRef/sourceFact derived from the actual source content; never validate using only evidenceNote or claim regex.
- Create 3–5 meaningful timeline beats where canon supports them. Every CORE beat needs trusted claimIds + sourceIds + evidenceRefs.
- Audit all DIRECT_CANON relationships. Shared region/faction/history remains STRUCTURAL_LORE unless explicit interaction/kinship is documented.
- Audit event links with exact EventRelationRole. PARTICIPANT requires trusted PARTICIPATED_IN evidence for that exact event.
- Recompute Tier A. Never flip reviewed/verified flags just to pass the gate.

**Suggested atomic-claim queue**
- `claim:cassiopeia:core:01` → Noxian noble of House Du Couteau
- `claim:cassiopeia:core:02` → sister of Katarina
- `claim:cassiopeia:core:03` → transformed into serpentine form after Shuriman tomb/curse event
- `claim:cassiopeia:core:04` → Black Rose ties require exact source.

### Cho'Gath — `chogath`

**Current state:** Tier C · `FULL_TIER_A_BUILD`
**Current blocker:** Minimal/incomplete profile: biography depth, continuity, atomic claims, trusted timeline, events and relations are insufficient.

**False / unsafe / must be removed, downgraded or kept pending**
- Sparse canon: do not invent detailed history merely to satisfy completeness metrics.

**Canonical information that must exist as sourced claims / bio facts**
- Voidborn monster with intentionally sparse canon
- do not invent Icathian wars, Watcher service, or named champion meetings to inflate completeness.

**Exactly what Cursor must add / repair**
- Primary Riot bio: `https://www.leagueoflegends.com/en-us/champions/chogath/`
- Set continuity explicitly at champion, claim and timeline level.
- Create 3–5 internal bioBlocks: FACT / SUPPORTED_SYNTHESIS / EDITORIAL_FRAMING as appropriate.
- Turn each factual item above into one atomic claim only if a real Riot source supports that exact proposition.
- For each CORE claim create an evidenceRef/sourceFact derived from the actual source content; never validate using only evidenceNote or claim regex.
- Create 3–5 meaningful timeline beats where canon supports them. Every CORE beat needs trusted claimIds + sourceIds + evidenceRefs.
- Audit all DIRECT_CANON relationships. Shared region/faction/history remains STRUCTURAL_LORE unless explicit interaction/kinship is documented.
- Audit event links with exact EventRelationRole. PARTICIPANT requires trusted PARTICIPATED_IN evidence for that exact event.
- Recompute Tier A. Never flip reviewed/verified flags just to pass the gate.

**Suggested atomic-claim queue**
- `claim:chogath:core:01` → Voidborn monster with intentionally sparse canon
- `claim:chogath:core:02` → do not invent Icathian wars, Watcher service, or named champion meetings to inflate completeness.

### Corki — `corki`

**Current state:** Tier C · `FULL_TIER_A_BUILD`
**Current blocker:** Minimal/incomplete profile: biography depth, continuity, atomic claims, trusted timeline, events and relations are insufficient.

**False / unsafe / must be removed, downgraded or kept pending**
- No specific contradiction confirmed in this pass; treat every unsourced existing statement as UNVERIFIED until checked against a real Riot source.

**Canonical information that must exist as sourced claims / bio facts**
- Yordle aviator/pilot associated with Bandle City
- current primary lore is sparse
- do not fabricate Piltover/Zaun military history.

**Exactly what Cursor must add / repair**
- Primary Riot bio: `https://www.leagueoflegends.com/en-us/champions/corki/`
- Set continuity explicitly at champion, claim and timeline level.
- Create 3–5 internal bioBlocks: FACT / SUPPORTED_SYNTHESIS / EDITORIAL_FRAMING as appropriate.
- Turn each factual item above into one atomic claim only if a real Riot source supports that exact proposition.
- For each CORE claim create an evidenceRef/sourceFact derived from the actual source content; never validate using only evidenceNote or claim regex.
- Create 3–5 meaningful timeline beats where canon supports them. Every CORE beat needs trusted claimIds + sourceIds + evidenceRefs.
- Audit all DIRECT_CANON relationships. Shared region/faction/history remains STRUCTURAL_LORE unless explicit interaction/kinship is documented.
- Audit event links with exact EventRelationRole. PARTICIPANT requires trusted PARTICIPATED_IN evidence for that exact event.
- Recompute Tier A. Never flip reviewed/verified flags just to pass the gate.

**Suggested atomic-claim queue**
- `claim:corki:core:01` → Yordle aviator/pilot associated with Bandle City
- `claim:corki:core:02` → current primary lore is sparse
- `claim:corki:core:03` → do not fabricate Piltover/Zaun military history.

### Darius — `darius`

**Current state:** Tier C · `CURATED_PROVENANCE_GAP`
**Current blocker:** Existing curated profile lacks enough exact source-backed claims/timeline/continuity coverage for Tier A.

**False / unsafe / must be removed, downgraded or kept pending**
- No specific contradiction confirmed in this pass; treat every unsourced existing statement as UNVERIFIED until checked against a real Riot source.

**Canonical information that must exist as sourced claims / bio facts**
- Noxian military leader and Hand of Noxus
- brother of Draven
- rose from poverty/war
- Trifarix role where current canon supports
- campaign history sourced event by event.

**Exactly what Cursor must add / repair**
- Primary Riot bio: `https://www.leagueoflegends.com/en-us/champions/darius/`
- Set continuity explicitly at champion, claim and timeline level.
- Create 3–5 internal bioBlocks: FACT / SUPPORTED_SYNTHESIS / EDITORIAL_FRAMING as appropriate.
- Turn each factual item above into one atomic claim only if a real Riot source supports that exact proposition.
- For each CORE claim create an evidenceRef/sourceFact derived from the actual source content; never validate using only evidenceNote or claim regex.
- Create 3–5 meaningful timeline beats where canon supports them. Every CORE beat needs trusted claimIds + sourceIds + evidenceRefs.
- Audit all DIRECT_CANON relationships. Shared region/faction/history remains STRUCTURAL_LORE unless explicit interaction/kinship is documented.
- Audit event links with exact EventRelationRole. PARTICIPANT requires trusted PARTICIPATED_IN evidence for that exact event.
- Recompute Tier A. Never flip reviewed/verified flags just to pass the gate.

**Suggested atomic-claim queue**
- `claim:darius:core:01` → Noxian military leader and Hand of Noxus
- `claim:darius:core:02` → brother of Draven
- `claim:darius:core:03` → rose from poverty/war
- `claim:darius:core:04` → Trifarix role where current canon supports
- `claim:darius:core:05` → campaign history sourced event by event.

### Diana — `diana`

**Current state:** Tier A · `PHASE1_REVALIDATE`
**Current blocker:** Currently Tier A under strict gate; still requires real source-extract verification before considering the profile source-audited.

**False / unsafe / must be removed, downgraded or kept pending**
- No specific contradiction confirmed in this pass; treat every unsourced existing statement as UNVERIFIED until checked against a real Riot source.

**Canonical information that must exist as sourced claims / bio facts**
- Lunari and Aspect of the Moon
- raised in Solari orthodoxy before rejecting it
- climbed Targon
- direct relationship with Leona is core.

**Exactly what Cursor must add / repair**
- Primary Riot bio: `https://www.leagueoflegends.com/en-us/champions/diana/`
- Set continuity explicitly at champion, claim and timeline level.
- Create 3–5 internal bioBlocks: FACT / SUPPORTED_SYNTHESIS / EDITORIAL_FRAMING as appropriate.
- Turn each factual item above into one atomic claim only if a real Riot source supports that exact proposition.
- For each CORE claim create an evidenceRef/sourceFact derived from the actual source content; never validate using only evidenceNote or claim regex.
- Create 3–5 meaningful timeline beats where canon supports them. Every CORE beat needs trusted claimIds + sourceIds + evidenceRefs.
- Audit all DIRECT_CANON relationships. Shared region/faction/history remains STRUCTURAL_LORE unless explicit interaction/kinship is documented.
- Audit event links with exact EventRelationRole. PARTICIPANT requires trusted PARTICIPATED_IN evidence for that exact event.
- Recompute Tier A. Never flip reviewed/verified flags just to pass the gate.

**Suggested atomic-claim queue**
- `claim:diana:core:01` → Lunari and Aspect of the Moon
- `claim:diana:core:02` → raised in Solari orthodoxy before rejecting it
- `claim:diana:core:03` → climbed Targon
- `claim:diana:core:04` → direct relationship with Leona is core.

### Dr. Mundo — `dr-mundo`

**Current state:** Tier C · `FULL_TIER_A_BUILD`
**Current blocker:** Minimal/incomplete profile: biography depth, continuity, atomic claims, trusted timeline, events and relations are insufficient.

**False / unsafe / must be removed, downgraded or kept pending**
- No specific contradiction confirmed in this pass; treat every unsourced existing statement as UNVERIFIED until checked against a real Riot source.

**Canonical information that must exist as sourced claims / bio facts**
- Zaunite mutated brute who believes himself a doctor
- current origin involves asylum/institutional experimentation
- old pre-rework details must be LEGACY if retained.

**Exactly what Cursor must add / repair**
- Primary Riot bio: `https://www.leagueoflegends.com/en-us/champions/dr-mundo/`
- Set continuity explicitly at champion, claim and timeline level.
- Create 3–5 internal bioBlocks: FACT / SUPPORTED_SYNTHESIS / EDITORIAL_FRAMING as appropriate.
- Turn each factual item above into one atomic claim only if a real Riot source supports that exact proposition.
- For each CORE claim create an evidenceRef/sourceFact derived from the actual source content; never validate using only evidenceNote or claim regex.
- Create 3–5 meaningful timeline beats where canon supports them. Every CORE beat needs trusted claimIds + sourceIds + evidenceRefs.
- Audit all DIRECT_CANON relationships. Shared region/faction/history remains STRUCTURAL_LORE unless explicit interaction/kinship is documented.
- Audit event links with exact EventRelationRole. PARTICIPANT requires trusted PARTICIPATED_IN evidence for that exact event.
- Recompute Tier A. Never flip reviewed/verified flags just to pass the gate.

**Suggested atomic-claim queue**
- `claim:dr-mundo:core:01` → Zaunite mutated brute who believes himself a doctor
- `claim:dr-mundo:core:02` → current origin involves asylum/institutional experimentation
- `claim:dr-mundo:core:03` → old pre-rework details must be LEGACY if retained.

### Draven — `draven`

**Current state:** Tier C · `CURATED_PROVENANCE_GAP`
**Current blocker:** Existing curated profile lacks enough exact source-backed claims/timeline/continuity coverage for Tier A.

**False / unsafe / must be removed, downgraded or kept pending**
- No specific contradiction confirmed in this pass; treat every unsourced existing statement as UNVERIFIED until checked against a real Riot source.

**Canonical information that must exist as sourced claims / bio facts**
- Noxian executioner/showman
- brother of Darius
- public spectacle central
- do not infer Trifarix membership or major political authority.

**Exactly what Cursor must add / repair**
- Primary Riot bio: `https://www.leagueoflegends.com/en-us/champions/draven/`
- Set continuity explicitly at champion, claim and timeline level.
- Create 3–5 internal bioBlocks: FACT / SUPPORTED_SYNTHESIS / EDITORIAL_FRAMING as appropriate.
- Turn each factual item above into one atomic claim only if a real Riot source supports that exact proposition.
- For each CORE claim create an evidenceRef/sourceFact derived from the actual source content; never validate using only evidenceNote or claim regex.
- Create 3–5 meaningful timeline beats where canon supports them. Every CORE beat needs trusted claimIds + sourceIds + evidenceRefs.
- Audit all DIRECT_CANON relationships. Shared region/faction/history remains STRUCTURAL_LORE unless explicit interaction/kinship is documented.
- Audit event links with exact EventRelationRole. PARTICIPANT requires trusted PARTICIPATED_IN evidence for that exact event.
- Recompute Tier A. Never flip reviewed/verified flags just to pass the gate.

**Suggested atomic-claim queue**
- `claim:draven:core:01` → Noxian executioner/showman
- `claim:draven:core:02` → brother of Darius
- `claim:draven:core:03` → public spectacle central
- `claim:draven:core:04` → do not infer Trifarix membership or major political authority.

### Ekko — `ekko`

**Current state:** Tier C · `CURATED_PROVENANCE_GAP`
**Current blocker:** Existing curated profile lacks enough exact source-backed claims/timeline/continuity coverage for Tier A.

**False / unsafe / must be removed, downgraded or kept pending**
- No specific contradiction confirmed in this pass; treat every unsourced existing statement as UNVERIFIED until checked against a real Riot source.

**Canonical information that must exist as sourced claims / bio facts**
- Zaunite prodigy
- created/uses Z-Drive to manipulate short time loops
- protects his community
- Arcane childhood relationships continuity-labeled.

**Exactly what Cursor must add / repair**
- Primary Riot bio: `https://www.leagueoflegends.com/en-us/champions/ekko/`
- Set continuity explicitly at champion, claim and timeline level.
- Create 3–5 internal bioBlocks: FACT / SUPPORTED_SYNTHESIS / EDITORIAL_FRAMING as appropriate.
- Turn each factual item above into one atomic claim only if a real Riot source supports that exact proposition.
- For each CORE claim create an evidenceRef/sourceFact derived from the actual source content; never validate using only evidenceNote or claim regex.
- Create 3–5 meaningful timeline beats where canon supports them. Every CORE beat needs trusted claimIds + sourceIds + evidenceRefs.
- Audit all DIRECT_CANON relationships. Shared region/faction/history remains STRUCTURAL_LORE unless explicit interaction/kinship is documented.
- Audit event links with exact EventRelationRole. PARTICIPANT requires trusted PARTICIPATED_IN evidence for that exact event.
- Recompute Tier A. Never flip reviewed/verified flags just to pass the gate.

**Suggested atomic-claim queue**
- `claim:ekko:core:01` → Zaunite prodigy
- `claim:ekko:core:02` → created/uses Z-Drive to manipulate short time loops
- `claim:ekko:core:03` → protects his community
- `claim:ekko:core:04` → Arcane childhood relationships continuity-labeled.

### Elise — `elise`

**Current state:** Tier C · `FULL_TIER_A_BUILD`
**Current blocker:** Minimal/incomplete profile: biography depth, continuity, atomic claims, trusted timeline, events and relations are insufficient.

**False / unsafe / must be removed, downgraded or kept pending**
- No specific contradiction confirmed in this pass; treat every unsourced existing statement as UNVERIFIED until checked against a real Riot source.

**Canonical information that must exist as sourced claims / bio facts**
- Noxian noble transformed by spider god/entity
- serves Vilemaw and lures victims
- Black Rose relation where sourced
- distinguish travel to Shadow Isles from faction membership.

**Exactly what Cursor must add / repair**
- Primary Riot bio: `https://www.leagueoflegends.com/en-us/champions/elise/`
- Set continuity explicitly at champion, claim and timeline level.
- Create 3–5 internal bioBlocks: FACT / SUPPORTED_SYNTHESIS / EDITORIAL_FRAMING as appropriate.
- Turn each factual item above into one atomic claim only if a real Riot source supports that exact proposition.
- For each CORE claim create an evidenceRef/sourceFact derived from the actual source content; never validate using only evidenceNote or claim regex.
- Create 3–5 meaningful timeline beats where canon supports them. Every CORE beat needs trusted claimIds + sourceIds + evidenceRefs.
- Audit all DIRECT_CANON relationships. Shared region/faction/history remains STRUCTURAL_LORE unless explicit interaction/kinship is documented.
- Audit event links with exact EventRelationRole. PARTICIPANT requires trusted PARTICIPATED_IN evidence for that exact event.
- Recompute Tier A. Never flip reviewed/verified flags just to pass the gate.

**Suggested atomic-claim queue**
- `claim:elise:core:01` → Noxian noble transformed by spider god/entity
- `claim:elise:core:02` → serves Vilemaw and lures victims
- `claim:elise:core:03` → Black Rose relation where sourced
- `claim:elise:core:04` → distinguish travel to Shadow Isles from faction membership.

### Evelynn — `evelynn`

**Current state:** Tier C · `FULL_TIER_A_BUILD`
**Current blocker:** Minimal/incomplete profile: biography depth, continuity, atomic claims, trusted timeline, events and relations are insufficient.

**False / unsafe / must be removed, downgraded or kept pending**
- No specific contradiction confirmed in this pass; treat every unsourced existing statement as UNVERIFIED until checked against a real Riot source.

**Canonical information that must exist as sourced claims / bio facts**
- Demon feeding on agony
- learned alluring humanoid form
- origin tied to mass suffering
- avoid invented direct champion kills/relationships.

**Exactly what Cursor must add / repair**
- Primary Riot bio: `https://www.leagueoflegends.com/en-us/champions/evelynn/`
- Set continuity explicitly at champion, claim and timeline level.
- Create 3–5 internal bioBlocks: FACT / SUPPORTED_SYNTHESIS / EDITORIAL_FRAMING as appropriate.
- Turn each factual item above into one atomic claim only if a real Riot source supports that exact proposition.
- For each CORE claim create an evidenceRef/sourceFact derived from the actual source content; never validate using only evidenceNote or claim regex.
- Create 3–5 meaningful timeline beats where canon supports them. Every CORE beat needs trusted claimIds + sourceIds + evidenceRefs.
- Audit all DIRECT_CANON relationships. Shared region/faction/history remains STRUCTURAL_LORE unless explicit interaction/kinship is documented.
- Audit event links with exact EventRelationRole. PARTICIPANT requires trusted PARTICIPATED_IN evidence for that exact event.
- Recompute Tier A. Never flip reviewed/verified flags just to pass the gate.

**Suggested atomic-claim queue**
- `claim:evelynn:core:01` → Demon feeding on agony
- `claim:evelynn:core:02` → learned alluring humanoid form
- `claim:evelynn:core:03` → origin tied to mass suffering
- `claim:evelynn:core:04` → avoid invented direct champion kills/relationships.

### Ezreal — `ezreal`

**Current state:** Tier C · `FULL_TIER_A_BUILD`
**Current blocker:** Minimal/incomplete profile: biography depth, continuity, atomic claims, trusted timeline, events and relations are insufficient.

**False / unsafe / must be removed, downgraded or kept pending**
- No specific contradiction confirmed in this pass; treat every unsourced existing statement as UNVERIFIED until checked against a real Riot source.

**Canonical information that must exist as sourced claims / bio facts**
- Piltover-born explorer
- uses magical Shuriman gauntlet
- searches for missing parents
- avoid false institutional affiliations.

**Exactly what Cursor must add / repair**
- Primary Riot bio: `https://www.leagueoflegends.com/en-us/champions/ezreal/`
- Set continuity explicitly at champion, claim and timeline level.
- Create 3–5 internal bioBlocks: FACT / SUPPORTED_SYNTHESIS / EDITORIAL_FRAMING as appropriate.
- Turn each factual item above into one atomic claim only if a real Riot source supports that exact proposition.
- For each CORE claim create an evidenceRef/sourceFact derived from the actual source content; never validate using only evidenceNote or claim regex.
- Create 3–5 meaningful timeline beats where canon supports them. Every CORE beat needs trusted claimIds + sourceIds + evidenceRefs.
- Audit all DIRECT_CANON relationships. Shared region/faction/history remains STRUCTURAL_LORE unless explicit interaction/kinship is documented.
- Audit event links with exact EventRelationRole. PARTICIPANT requires trusted PARTICIPATED_IN evidence for that exact event.
- Recompute Tier A. Never flip reviewed/verified flags just to pass the gate.

**Suggested atomic-claim queue**
- `claim:ezreal:core:01` → Piltover-born explorer
- `claim:ezreal:core:02` → uses magical Shuriman gauntlet
- `claim:ezreal:core:03` → searches for missing parents
- `claim:ezreal:core:04` → avoid false institutional affiliations.

### Fiddlesticks — `fiddlesticks`

**Current state:** Tier C · `FULL_TIER_A_BUILD`
**Current blocker:** Minimal/incomplete profile: biography depth, continuity, atomic claims, trusted timeline, events and relations are insufficient.

**False / unsafe / must be removed, downgraded or kept pending**
- Do not resolve primordial-demon/Ten Kings mysteries beyond explicit Riot material.

**Canonical information that must exist as sourced claims / bio facts**
- Ancient primordial demon of fear
- mimics voices/memories
- origin hierarchy remains mysterious
- do not over-resolve Ten Kings material.

**Exactly what Cursor must add / repair**
- Primary Riot bio: `https://www.leagueoflegends.com/en-us/champions/fiddlesticks/`
- Set continuity explicitly at champion, claim and timeline level.
- Create 3–5 internal bioBlocks: FACT / SUPPORTED_SYNTHESIS / EDITORIAL_FRAMING as appropriate.
- Turn each factual item above into one atomic claim only if a real Riot source supports that exact proposition.
- For each CORE claim create an evidenceRef/sourceFact derived from the actual source content; never validate using only evidenceNote or claim regex.
- Create 3–5 meaningful timeline beats where canon supports them. Every CORE beat needs trusted claimIds + sourceIds + evidenceRefs.
- Audit all DIRECT_CANON relationships. Shared region/faction/history remains STRUCTURAL_LORE unless explicit interaction/kinship is documented.
- Audit event links with exact EventRelationRole. PARTICIPANT requires trusted PARTICIPATED_IN evidence for that exact event.
- Recompute Tier A. Never flip reviewed/verified flags just to pass the gate.

**Suggested atomic-claim queue**
- `claim:fiddlesticks:core:01` → Ancient primordial demon of fear
- `claim:fiddlesticks:core:02` → mimics voices/memories
- `claim:fiddlesticks:core:03` → origin hierarchy remains mysterious
- `claim:fiddlesticks:core:04` → do not over-resolve Ten Kings material.

### Fiora — `fiora`

**Current state:** Tier C · `FULL_TIER_A_BUILD`
**Current blocker:** Minimal/incomplete profile: biography depth, continuity, atomic claims, trusted timeline, events and relations are insufficient.

**False / unsafe / must be removed, downgraded or kept pending**
- No specific contradiction confirmed in this pass; treat every unsourced existing statement as UNVERIFIED until checked against a real Riot source.

**Canonical information that must exist as sourced claims / bio facts**
- Head of House Laurent
- elite Demacian duelist
- family scandal/duel shaped leadership
- no Mage Rebellion participation without direct evidence.

**Exactly what Cursor must add / repair**
- Primary Riot bio: `https://www.leagueoflegends.com/en-us/champions/fiora/`
- Set continuity explicitly at champion, claim and timeline level.
- Create 3–5 internal bioBlocks: FACT / SUPPORTED_SYNTHESIS / EDITORIAL_FRAMING as appropriate.
- Turn each factual item above into one atomic claim only if a real Riot source supports that exact proposition.
- For each CORE claim create an evidenceRef/sourceFact derived from the actual source content; never validate using only evidenceNote or claim regex.
- Create 3–5 meaningful timeline beats where canon supports them. Every CORE beat needs trusted claimIds + sourceIds + evidenceRefs.
- Audit all DIRECT_CANON relationships. Shared region/faction/history remains STRUCTURAL_LORE unless explicit interaction/kinship is documented.
- Audit event links with exact EventRelationRole. PARTICIPANT requires trusted PARTICIPATED_IN evidence for that exact event.
- Recompute Tier A. Never flip reviewed/verified flags just to pass the gate.

**Suggested atomic-claim queue**
- `claim:fiora:core:01` → Head of House Laurent
- `claim:fiora:core:02` → elite Demacian duelist
- `claim:fiora:core:03` → family scandal/duel shaped leadership
- `claim:fiora:core:04` → no Mage Rebellion participation without direct evidence.

### Fizz — `fizz`

**Current state:** Tier C · `FULL_TIER_A_BUILD`
**Current blocker:** Minimal/incomplete profile: biography depth, continuity, atomic claims, trusted timeline, events and relations are insufficient.

**False / unsafe / must be removed, downgraded or kept pending**
- No specific contradiction confirmed in this pass; treat every unsourced existing statement as UNVERIFIED until checked against a real Riot source.

**Canonical information that must exist as sourced claims / bio facts**
- Amphibious yordle/trickster associated with Bilgewater
- survivor of ancient underwater people where current bio supports
- no invented personal Bilgewater champion relations.

**Exactly what Cursor must add / repair**
- Primary Riot bio: `https://www.leagueoflegends.com/en-us/champions/fizz/`
- Set continuity explicitly at champion, claim and timeline level.
- Create 3–5 internal bioBlocks: FACT / SUPPORTED_SYNTHESIS / EDITORIAL_FRAMING as appropriate.
- Turn each factual item above into one atomic claim only if a real Riot source supports that exact proposition.
- For each CORE claim create an evidenceRef/sourceFact derived from the actual source content; never validate using only evidenceNote or claim regex.
- Create 3–5 meaningful timeline beats where canon supports them. Every CORE beat needs trusted claimIds + sourceIds + evidenceRefs.
- Audit all DIRECT_CANON relationships. Shared region/faction/history remains STRUCTURAL_LORE unless explicit interaction/kinship is documented.
- Audit event links with exact EventRelationRole. PARTICIPANT requires trusted PARTICIPATED_IN evidence for that exact event.
- Recompute Tier A. Never flip reviewed/verified flags just to pass the gate.

**Suggested atomic-claim queue**
- `claim:fizz:core:01` → Amphibious yordle/trickster associated with Bilgewater
- `claim:fizz:core:02` → survivor of ancient underwater people where current bio supports
- `claim:fizz:core:03` → no invented personal Bilgewater champion relations.

### Galio — `galio`

**Current state:** Tier C · `FULL_TIER_A_BUILD`
**Current blocker:** Minimal/incomplete profile: biography depth, continuity, atomic claims, trusted timeline, events and relations are insufficient.

**False / unsafe / must be removed, downgraded or kept pending**
- No specific contradiction confirmed in this pass; treat every unsourced existing statement as UNVERIFIED until checked against a real Riot source.

**Canonical information that must exist as sourced claims / bio facts**
- Colossal petricite construct made to counter magic
- awakens in presence of magic
- institution links structural unless direct scenes exist.

**Exactly what Cursor must add / repair**
- Primary Riot bio: `https://www.leagueoflegends.com/en-us/champions/galio/`
- Set continuity explicitly at champion, claim and timeline level.
- Create 3–5 internal bioBlocks: FACT / SUPPORTED_SYNTHESIS / EDITORIAL_FRAMING as appropriate.
- Turn each factual item above into one atomic claim only if a real Riot source supports that exact proposition.
- For each CORE claim create an evidenceRef/sourceFact derived from the actual source content; never validate using only evidenceNote or claim regex.
- Create 3–5 meaningful timeline beats where canon supports them. Every CORE beat needs trusted claimIds + sourceIds + evidenceRefs.
- Audit all DIRECT_CANON relationships. Shared region/faction/history remains STRUCTURAL_LORE unless explicit interaction/kinship is documented.
- Audit event links with exact EventRelationRole. PARTICIPANT requires trusted PARTICIPATED_IN evidence for that exact event.
- Recompute Tier A. Never flip reviewed/verified flags just to pass the gate.

**Suggested atomic-claim queue**
- `claim:galio:core:01` → Colossal petricite construct made to counter magic
- `claim:galio:core:02` → awakens in presence of magic
- `claim:galio:core:03` → institution links structural unless direct scenes exist.

### Gangplank — `gangplank`

**Current state:** Tier C · `FULL_TIER_A_BUILD`
**Current blocker:** Minimal/incomplete profile: biography depth, continuity, atomic claims, trusted timeline, events and relations are insufficient.

**False / unsafe / must be removed, downgraded or kept pending**
- No specific contradiction confirmed in this pass; treat every unsourced existing statement as UNVERIFIED until checked against a real Riot source.

**Canonical information that must exist as sourced claims / bio facts**
- Former ruler/pirate king of Bilgewater
- overthrown in Burning Tides
- survived and seeks return
- Miss Fortune conflict is direct and central.

**Exactly what Cursor must add / repair**
- Primary Riot bio: `https://www.leagueoflegends.com/en-us/champions/gangplank/`
- Set continuity explicitly at champion, claim and timeline level.
- Create 3–5 internal bioBlocks: FACT / SUPPORTED_SYNTHESIS / EDITORIAL_FRAMING as appropriate.
- Turn each factual item above into one atomic claim only if a real Riot source supports that exact proposition.
- For each CORE claim create an evidenceRef/sourceFact derived from the actual source content; never validate using only evidenceNote or claim regex.
- Create 3–5 meaningful timeline beats where canon supports them. Every CORE beat needs trusted claimIds + sourceIds + evidenceRefs.
- Audit all DIRECT_CANON relationships. Shared region/faction/history remains STRUCTURAL_LORE unless explicit interaction/kinship is documented.
- Audit event links with exact EventRelationRole. PARTICIPANT requires trusted PARTICIPATED_IN evidence for that exact event.
- Recompute Tier A. Never flip reviewed/verified flags just to pass the gate.

**Suggested atomic-claim queue**
- `claim:gangplank:core:01` → Former ruler/pirate king of Bilgewater
- `claim:gangplank:core:02` → overthrown in Burning Tides
- `claim:gangplank:core:03` → survived and seeks return
- `claim:gangplank:core:04` → Miss Fortune conflict is direct and central.

### Garen — `garen`

**Current state:** Tier C · `CURATED_PROVENANCE_GAP`
**Current blocker:** Existing curated profile lacks enough exact source-backed claims/timeline/continuity coverage for Tier A.

**False / unsafe / must be removed, downgraded or kept pending**
- No specific contradiction confirmed in this pass; treat every unsourced existing statement as UNVERIFIED until checked against a real Riot source.

**Canonical information that must exist as sourced claims / bio facts**
- Crownguard warrior
- brother of Lux
- serves crown/Dauntless Vanguard
- duty vs Lux's magic should be source-backed rather than editorialized.

**Exactly what Cursor must add / repair**
- Primary Riot bio: `https://www.leagueoflegends.com/en-us/champions/garen/`
- Set continuity explicitly at champion, claim and timeline level.
- Create 3–5 internal bioBlocks: FACT / SUPPORTED_SYNTHESIS / EDITORIAL_FRAMING as appropriate.
- Turn each factual item above into one atomic claim only if a real Riot source supports that exact proposition.
- For each CORE claim create an evidenceRef/sourceFact derived from the actual source content; never validate using only evidenceNote or claim regex.
- Create 3–5 meaningful timeline beats where canon supports them. Every CORE beat needs trusted claimIds + sourceIds + evidenceRefs.
- Audit all DIRECT_CANON relationships. Shared region/faction/history remains STRUCTURAL_LORE unless explicit interaction/kinship is documented.
- Audit event links with exact EventRelationRole. PARTICIPANT requires trusted PARTICIPATED_IN evidence for that exact event.
- Recompute Tier A. Never flip reviewed/verified flags just to pass the gate.

**Suggested atomic-claim queue**
- `claim:garen:core:01` → Crownguard warrior
- `claim:garen:core:02` → brother of Lux
- `claim:garen:core:03` → serves crown/Dauntless Vanguard
- `claim:garen:core:04` → duty vs Lux's magic should be source-backed rather than editorialized.

### Gnar — `gnar`

**Current state:** Tier C · `FULL_TIER_A_BUILD`
**Current blocker:** Minimal/incomplete profile: biography depth, continuity, atomic claims, trusted timeline, events and relations are insufficient.

**False / unsafe / must be removed, downgraded or kept pending**
- No specific contradiction confirmed in this pass; treat every unsourced existing statement as UNVERIFIED until checked against a real Riot source.

**Canonical information that must exist as sourced claims / bio facts**
- Prehistoric yordle
- frozen in True Ice and awakened in modern Freljord
- transforms into Mega Gnar
- no modern tribal membership unless sourced.

**Exactly what Cursor must add / repair**
- Primary Riot bio: `https://www.leagueoflegends.com/en-us/champions/gnar/`
- Set continuity explicitly at champion, claim and timeline level.
- Create 3–5 internal bioBlocks: FACT / SUPPORTED_SYNTHESIS / EDITORIAL_FRAMING as appropriate.
- Turn each factual item above into one atomic claim only if a real Riot source supports that exact proposition.
- For each CORE claim create an evidenceRef/sourceFact derived from the actual source content; never validate using only evidenceNote or claim regex.
- Create 3–5 meaningful timeline beats where canon supports them. Every CORE beat needs trusted claimIds + sourceIds + evidenceRefs.
- Audit all DIRECT_CANON relationships. Shared region/faction/history remains STRUCTURAL_LORE unless explicit interaction/kinship is documented.
- Audit event links with exact EventRelationRole. PARTICIPANT requires trusted PARTICIPATED_IN evidence for that exact event.
- Recompute Tier A. Never flip reviewed/verified flags just to pass the gate.

**Suggested atomic-claim queue**
- `claim:gnar:core:01` → Prehistoric yordle
- `claim:gnar:core:02` → frozen in True Ice and awakened in modern Freljord
- `claim:gnar:core:03` → transforms into Mega Gnar
- `claim:gnar:core:04` → no modern tribal membership unless sourced.

### Gragas — `gragas`

**Current state:** Tier C · `FULL_TIER_A_BUILD`
**Current blocker:** Minimal/incomplete profile: biography depth, continuity, atomic claims, trusted timeline, events and relations are insufficient.

**False / unsafe / must be removed, downgraded or kept pending**
- No specific contradiction confirmed in this pass; treat every unsourced existing statement as UNVERIFIED until checked against a real Riot source.

**Canonical information that must exist as sourced claims / bio facts**
- Freljordian brewer seeking perfect ingredients
- True Ice brewing lore where supported
- avoid forced participation in major conflicts.

**Exactly what Cursor must add / repair**
- Primary Riot bio: `https://www.leagueoflegends.com/en-us/champions/gragas/`
- Set continuity explicitly at champion, claim and timeline level.
- Create 3–5 internal bioBlocks: FACT / SUPPORTED_SYNTHESIS / EDITORIAL_FRAMING as appropriate.
- Turn each factual item above into one atomic claim only if a real Riot source supports that exact proposition.
- For each CORE claim create an evidenceRef/sourceFact derived from the actual source content; never validate using only evidenceNote or claim regex.
- Create 3–5 meaningful timeline beats where canon supports them. Every CORE beat needs trusted claimIds + sourceIds + evidenceRefs.
- Audit all DIRECT_CANON relationships. Shared region/faction/history remains STRUCTURAL_LORE unless explicit interaction/kinship is documented.
- Audit event links with exact EventRelationRole. PARTICIPANT requires trusted PARTICIPATED_IN evidence for that exact event.
- Recompute Tier A. Never flip reviewed/verified flags just to pass the gate.

**Suggested atomic-claim queue**
- `claim:gragas:core:01` → Freljordian brewer seeking perfect ingredients
- `claim:gragas:core:02` → True Ice brewing lore where supported
- `claim:gragas:core:03` → avoid forced participation in major conflicts.

### Graves — `graves`

**Current state:** Tier C · `FULL_TIER_A_BUILD`
**Current blocker:** Minimal/incomplete profile: biography depth, continuity, atomic claims, trusted timeline, events and relations are insufficient.

**False / unsafe / must be removed, downgraded or kept pending**
- No specific contradiction confirmed in this pass; treat every unsourced existing statement as UNVERIFIED until checked against a real Riot source.

**Canonical information that must exist as sourced claims / bio facts**
- Bilgewater outlaw/mercenary
- long history with Twisted Fate
- betrayal/reconciliation core
- Sentinel participation sourced event-specifically.

**Exactly what Cursor must add / repair**
- Primary Riot bio: `https://www.leagueoflegends.com/en-us/champions/graves/`
- Set continuity explicitly at champion, claim and timeline level.
- Create 3–5 internal bioBlocks: FACT / SUPPORTED_SYNTHESIS / EDITORIAL_FRAMING as appropriate.
- Turn each factual item above into one atomic claim only if a real Riot source supports that exact proposition.
- For each CORE claim create an evidenceRef/sourceFact derived from the actual source content; never validate using only evidenceNote or claim regex.
- Create 3–5 meaningful timeline beats where canon supports them. Every CORE beat needs trusted claimIds + sourceIds + evidenceRefs.
- Audit all DIRECT_CANON relationships. Shared region/faction/history remains STRUCTURAL_LORE unless explicit interaction/kinship is documented.
- Audit event links with exact EventRelationRole. PARTICIPANT requires trusted PARTICIPATED_IN evidence for that exact event.
- Recompute Tier A. Never flip reviewed/verified flags just to pass the gate.

**Suggested atomic-claim queue**
- `claim:graves:core:01` → Bilgewater outlaw/mercenary
- `claim:graves:core:02` → long history with Twisted Fate
- `claim:graves:core:03` → betrayal/reconciliation core
- `claim:graves:core:04` → Sentinel participation sourced event-specifically.

### Gwen — `gwen`

**Current state:** Tier C · `FULL_TIER_A_BUILD`
**Current blocker:** Minimal/incomplete profile: biography depth, continuity, atomic claims, trusted timeline, events and relations are insufficient.

**False / unsafe / must be removed, downgraded or kept pending**
- No specific contradiction confirmed in this pass; treat every unsourced existing statement as UNVERIFIED until checked against a real Riot source.

**Canonical information that must exist as sourced claims / bio facts**
- Doll created by Isolde and animated by Hallowed Mist
- scissors/needles tied to maker
- opposes Black Mist/Viego
- Ruination/Sentinel roles source precisely.

**Exactly what Cursor must add / repair**
- Primary Riot bio: `https://www.leagueoflegends.com/en-us/champions/gwen/`
- Set continuity explicitly at champion, claim and timeline level.
- Create 3–5 internal bioBlocks: FACT / SUPPORTED_SYNTHESIS / EDITORIAL_FRAMING as appropriate.
- Turn each factual item above into one atomic claim only if a real Riot source supports that exact proposition.
- For each CORE claim create an evidenceRef/sourceFact derived from the actual source content; never validate using only evidenceNote or claim regex.
- Create 3–5 meaningful timeline beats where canon supports them. Every CORE beat needs trusted claimIds + sourceIds + evidenceRefs.
- Audit all DIRECT_CANON relationships. Shared region/faction/history remains STRUCTURAL_LORE unless explicit interaction/kinship is documented.
- Audit event links with exact EventRelationRole. PARTICIPANT requires trusted PARTICIPATED_IN evidence for that exact event.
- Recompute Tier A. Never flip reviewed/verified flags just to pass the gate.

**Suggested atomic-claim queue**
- `claim:gwen:core:01` → Doll created by Isolde and animated by Hallowed Mist
- `claim:gwen:core:02` → scissors/needles tied to maker
- `claim:gwen:core:03` → opposes Black Mist/Viego
- `claim:gwen:core:04` → Ruination/Sentinel roles source precisely.

### Hecarim — `hecarim`

**Current state:** Tier C · `FULL_TIER_A_BUILD`
**Current blocker:** Minimal/incomplete profile: biography depth, continuity, atomic claims, trusted timeline, events and relations are insufficient.

**False / unsafe / must be removed, downgraded or kept pending**
- No specific contradiction confirmed in this pass; treat every unsourced existing statement as UNVERIFIED until checked against a real Riot source.

**Canonical information that must exist as sourced claims / bio facts**
- Camavoran/Blessed Isles-era knight
- betrayed Kalista
- became spectral rider in Black Mist
- Ruination event roles explicit.

**Exactly what Cursor must add / repair**
- Primary Riot bio: `https://www.leagueoflegends.com/en-us/champions/hecarim/`
- Set continuity explicitly at champion, claim and timeline level.
- Create 3–5 internal bioBlocks: FACT / SUPPORTED_SYNTHESIS / EDITORIAL_FRAMING as appropriate.
- Turn each factual item above into one atomic claim only if a real Riot source supports that exact proposition.
- For each CORE claim create an evidenceRef/sourceFact derived from the actual source content; never validate using only evidenceNote or claim regex.
- Create 3–5 meaningful timeline beats where canon supports them. Every CORE beat needs trusted claimIds + sourceIds + evidenceRefs.
- Audit all DIRECT_CANON relationships. Shared region/faction/history remains STRUCTURAL_LORE unless explicit interaction/kinship is documented.
- Audit event links with exact EventRelationRole. PARTICIPANT requires trusted PARTICIPATED_IN evidence for that exact event.
- Recompute Tier A. Never flip reviewed/verified flags just to pass the gate.

**Suggested atomic-claim queue**
- `claim:hecarim:core:01` → Camavoran/Blessed Isles-era knight
- `claim:hecarim:core:02` → betrayed Kalista
- `claim:hecarim:core:03` → became spectral rider in Black Mist
- `claim:hecarim:core:04` → Ruination event roles explicit.

### Heimerdinger — `heimerdinger`

**Current state:** Tier C · `FULL_TIER_A_BUILD`
**Current blocker:** Minimal/incomplete profile: biography depth, continuity, atomic claims, trusted timeline, events and relations are insufficient.

**False / unsafe / must be removed, downgraded or kept pending**
- Do not silently import ARCANE events into MAIN_RUNETERRA.

**Canonical information that must exist as sourced claims / bio facts**
- Yordle scientist/inventor associated with Piltover
- cautious science
- MAIN_RUNETERRA and ARCANE characterization/events separated.

**Exactly what Cursor must add / repair**
- Primary Riot bio: `https://www.leagueoflegends.com/en-us/champions/heimerdinger/`
- Set continuity explicitly at champion, claim and timeline level.
- Create 3–5 internal bioBlocks: FACT / SUPPORTED_SYNTHESIS / EDITORIAL_FRAMING as appropriate.
- Turn each factual item above into one atomic claim only if a real Riot source supports that exact proposition.
- For each CORE claim create an evidenceRef/sourceFact derived from the actual source content; never validate using only evidenceNote or claim regex.
- Create 3–5 meaningful timeline beats where canon supports them. Every CORE beat needs trusted claimIds + sourceIds + evidenceRefs.
- Audit all DIRECT_CANON relationships. Shared region/faction/history remains STRUCTURAL_LORE unless explicit interaction/kinship is documented.
- Audit event links with exact EventRelationRole. PARTICIPANT requires trusted PARTICIPATED_IN evidence for that exact event.
- Recompute Tier A. Never flip reviewed/verified flags just to pass the gate.

**Suggested atomic-claim queue**
- `claim:heimerdinger:core:01` → Yordle scientist/inventor associated with Piltover
- `claim:heimerdinger:core:02` → cautious science
- `claim:heimerdinger:core:03` → MAIN_RUNETERRA and ARCANE characterization/events separated.

### Hwei — `hwei`

**Current state:** Tier C · `FULL_TIER_A_BUILD`
**Current blocker:** Minimal/incomplete profile: biography depth, continuity, atomic claims, trusted timeline, events and relations are insufficient.

**False / unsafe / must be removed, downgraded or kept pending**
- No specific contradiction confirmed in this pass; treat every unsourced existing statement as UNVERIFIED until checked against a real Riot source.

**Canonical information that must exist as sourced claims / bio facts**
- Ionian painter/mage
- art as emotional/magical expression
- Jhin's attack and master's death central where release narrative supports
- direct Jhin edge sourced.

**Exactly what Cursor must add / repair**
- Primary Riot bio: `https://www.leagueoflegends.com/en-us/champions/hwei/`
- Set continuity explicitly at champion, claim and timeline level.
- Create 3–5 internal bioBlocks: FACT / SUPPORTED_SYNTHESIS / EDITORIAL_FRAMING as appropriate.
- Turn each factual item above into one atomic claim only if a real Riot source supports that exact proposition.
- For each CORE claim create an evidenceRef/sourceFact derived from the actual source content; never validate using only evidenceNote or claim regex.
- Create 3–5 meaningful timeline beats where canon supports them. Every CORE beat needs trusted claimIds + sourceIds + evidenceRefs.
- Audit all DIRECT_CANON relationships. Shared region/faction/history remains STRUCTURAL_LORE unless explicit interaction/kinship is documented.
- Audit event links with exact EventRelationRole. PARTICIPANT requires trusted PARTICIPATED_IN evidence for that exact event.
- Recompute Tier A. Never flip reviewed/verified flags just to pass the gate.

**Suggested atomic-claim queue**
- `claim:hwei:core:01` → Ionian painter/mage
- `claim:hwei:core:02` → art as emotional/magical expression
- `claim:hwei:core:03` → Jhin's attack and master's death central where release narrative supports
- `claim:hwei:core:04` → direct Jhin edge sourced.

### Illaoi — `illaoi`

**Current state:** Tier C · `FULL_TIER_A_BUILD`
**Current blocker:** Minimal/incomplete profile: biography depth, continuity, atomic claims, trusted timeline, events and relations are insufficient.

**False / unsafe / must be removed, downgraded or kept pending**
- No specific contradiction confirmed in this pass; treat every unsourced existing statement as UNVERIFIED until checked against a real Riot source.

**Canonical information that must exist as sourced claims / bio facts**
- Truth Bearer of Nagakabouros
- Buhru priestess/leader
- tests souls with Eye of God
- past relationship with Gangplank is direct canon.

**Exactly what Cursor must add / repair**
- Primary Riot bio: `https://www.leagueoflegends.com/en-us/champions/illaoi/`
- Set continuity explicitly at champion, claim and timeline level.
- Create 3–5 internal bioBlocks: FACT / SUPPORTED_SYNTHESIS / EDITORIAL_FRAMING as appropriate.
- Turn each factual item above into one atomic claim only if a real Riot source supports that exact proposition.
- For each CORE claim create an evidenceRef/sourceFact derived from the actual source content; never validate using only evidenceNote or claim regex.
- Create 3–5 meaningful timeline beats where canon supports them. Every CORE beat needs trusted claimIds + sourceIds + evidenceRefs.
- Audit all DIRECT_CANON relationships. Shared region/faction/history remains STRUCTURAL_LORE unless explicit interaction/kinship is documented.
- Audit event links with exact EventRelationRole. PARTICIPANT requires trusted PARTICIPATED_IN evidence for that exact event.
- Recompute Tier A. Never flip reviewed/verified flags just to pass the gate.

**Suggested atomic-claim queue**
- `claim:illaoi:core:01` → Truth Bearer of Nagakabouros
- `claim:illaoi:core:02` → Buhru priestess/leader
- `claim:illaoi:core:03` → tests souls with Eye of God
- `claim:illaoi:core:04` → past relationship with Gangplank is direct canon.

### Irelia — `irelia`

**Current state:** Tier C · `CURATED_PROVENANCE_GAP`
**Current blocker:** Existing curated profile lacks enough exact source-backed claims/timeline/continuity coverage for Tier A.

**False / unsafe / must be removed, downgraded or kept pending**
- No specific contradiction confirmed in this pass; treat every unsourced existing statement as UNVERIFIED until checked against a real Riot source.

**Canonical information that must exist as sourced claims / bio facts**
- Ionian resistance leader/blade dancer
- family/community loss during Noxian invasion
- severed Swain's arm in confrontation
- not ruler of all Ionia.

**Exactly what Cursor must add / repair**
- Primary Riot bio: `https://www.leagueoflegends.com/en-us/champions/irelia/`
- Set continuity explicitly at champion, claim and timeline level.
- Create 3–5 internal bioBlocks: FACT / SUPPORTED_SYNTHESIS / EDITORIAL_FRAMING as appropriate.
- Turn each factual item above into one atomic claim only if a real Riot source supports that exact proposition.
- For each CORE claim create an evidenceRef/sourceFact derived from the actual source content; never validate using only evidenceNote or claim regex.
- Create 3–5 meaningful timeline beats where canon supports them. Every CORE beat needs trusted claimIds + sourceIds + evidenceRefs.
- Audit all DIRECT_CANON relationships. Shared region/faction/history remains STRUCTURAL_LORE unless explicit interaction/kinship is documented.
- Audit event links with exact EventRelationRole. PARTICIPANT requires trusted PARTICIPATED_IN evidence for that exact event.
- Recompute Tier A. Never flip reviewed/verified flags just to pass the gate.

**Suggested atomic-claim queue**
- `claim:irelia:core:01` → Ionian resistance leader/blade dancer
- `claim:irelia:core:02` → family/community loss during Noxian invasion
- `claim:irelia:core:03` → severed Swain's arm in confrontation
- `claim:irelia:core:04` → not ruler of all Ionia.

### Ivern — `ivern`

**Current state:** Tier C · `FULL_TIER_A_BUILD`
**Current blocker:** Minimal/incomplete profile: biography depth, continuity, atomic claims, trusted timeline, events and relations are insufficient.

**False / unsafe / must be removed, downgraded or kept pending**
- No specific contradiction confirmed in this pass; treat every unsourced existing statement as UNVERIFIED until checked against a real Riot source.

**Canonical information that must exist as sourced claims / bio facts**
- Former Freljordian warlord Ivern the Cruel
- cut God-Willow in Ionia
- transformed into nature spirit Green Father
- modern protector of nature.

**Exactly what Cursor must add / repair**
- Primary Riot bio: `https://www.leagueoflegends.com/en-us/champions/ivern/`
- Set continuity explicitly at champion, claim and timeline level.
- Create 3–5 internal bioBlocks: FACT / SUPPORTED_SYNTHESIS / EDITORIAL_FRAMING as appropriate.
- Turn each factual item above into one atomic claim only if a real Riot source supports that exact proposition.
- For each CORE claim create an evidenceRef/sourceFact derived from the actual source content; never validate using only evidenceNote or claim regex.
- Create 3–5 meaningful timeline beats where canon supports them. Every CORE beat needs trusted claimIds + sourceIds + evidenceRefs.
- Audit all DIRECT_CANON relationships. Shared region/faction/history remains STRUCTURAL_LORE unless explicit interaction/kinship is documented.
- Audit event links with exact EventRelationRole. PARTICIPANT requires trusted PARTICIPATED_IN evidence for that exact event.
- Recompute Tier A. Never flip reviewed/verified flags just to pass the gate.

**Suggested atomic-claim queue**
- `claim:ivern:core:01` → Former Freljordian warlord Ivern the Cruel
- `claim:ivern:core:02` → cut God-Willow in Ionia
- `claim:ivern:core:03` → transformed into nature spirit Green Father
- `claim:ivern:core:04` → modern protector of nature.

### Janna — `janna`

**Current state:** Tier C · `FULL_TIER_A_BUILD`
**Current blocker:** Minimal/incomplete profile: biography depth, continuity, atomic claims, trusted timeline, events and relations are insufficient.

**False / unsafe / must be removed, downgraded or kept pending**
- No specific contradiction confirmed in this pass; treat every unsourced existing statement as UNVERIFIED until checked against a real Riot source.

**Canonical information that must exist as sourced claims / bio facts**
- Ancient wind spirit/deity strengthened by prayer
- long connection to Zaun/Shuriman trade
- protects vulnerable people
- no modern political faction membership unless explicit.

**Exactly what Cursor must add / repair**
- Primary Riot bio: `https://www.leagueoflegends.com/en-us/champions/janna/`
- Set continuity explicitly at champion, claim and timeline level.
- Create 3–5 internal bioBlocks: FACT / SUPPORTED_SYNTHESIS / EDITORIAL_FRAMING as appropriate.
- Turn each factual item above into one atomic claim only if a real Riot source supports that exact proposition.
- For each CORE claim create an evidenceRef/sourceFact derived from the actual source content; never validate using only evidenceNote or claim regex.
- Create 3–5 meaningful timeline beats where canon supports them. Every CORE beat needs trusted claimIds + sourceIds + evidenceRefs.
- Audit all DIRECT_CANON relationships. Shared region/faction/history remains STRUCTURAL_LORE unless explicit interaction/kinship is documented.
- Audit event links with exact EventRelationRole. PARTICIPANT requires trusted PARTICIPATED_IN evidence for that exact event.
- Recompute Tier A. Never flip reviewed/verified flags just to pass the gate.

**Suggested atomic-claim queue**
- `claim:janna:core:01` → Ancient wind spirit/deity strengthened by prayer
- `claim:janna:core:02` → long connection to Zaun/Shuriman trade
- `claim:janna:core:03` → protects vulnerable people
- `claim:janna:core:04` → no modern political faction membership unless explicit.

### Jarvan IV — `jarvan-iv`

**Current state:** Tier C · `CURATED_PROVENANCE_GAP`
**Current blocker:** Existing curated profile lacks enough exact source-backed claims/timeline/continuity coverage for Tier A.

**False / unsafe / must be removed, downgraded or kept pending**
- No specific contradiction confirmed in this pass; treat every unsourced existing statement as UNVERIFIED until checked against a real Riot source.

**Canonical information that must exist as sourced claims / bio facts**
- Demacian prince, son of Jarvan III
- military leader
- Shyvana association and Mage Rebellion chronology need exact sources.

**Exactly what Cursor must add / repair**
- Primary Riot bio: `https://www.leagueoflegends.com/en-us/champions/jarvan-iv/`
- Set continuity explicitly at champion, claim and timeline level.
- Create 3–5 internal bioBlocks: FACT / SUPPORTED_SYNTHESIS / EDITORIAL_FRAMING as appropriate.
- Turn each factual item above into one atomic claim only if a real Riot source supports that exact proposition.
- For each CORE claim create an evidenceRef/sourceFact derived from the actual source content; never validate using only evidenceNote or claim regex.
- Create 3–5 meaningful timeline beats where canon supports them. Every CORE beat needs trusted claimIds + sourceIds + evidenceRefs.
- Audit all DIRECT_CANON relationships. Shared region/faction/history remains STRUCTURAL_LORE unless explicit interaction/kinship is documented.
- Audit event links with exact EventRelationRole. PARTICIPANT requires trusted PARTICIPATED_IN evidence for that exact event.
- Recompute Tier A. Never flip reviewed/verified flags just to pass the gate.

**Suggested atomic-claim queue**
- `claim:jarvan-iv:core:01` → Demacian prince, son of Jarvan III
- `claim:jarvan-iv:core:02` → military leader
- `claim:jarvan-iv:core:03` → Shyvana association and Mage Rebellion chronology need exact sources.

### Jax — `jax`

**Current state:** Tier C · `FULL_TIER_A_BUILD`
**Current blocker:** Minimal/incomplete profile: biography depth, continuity, atomic claims, trusted timeline, events and relations are insufficient.

**False / unsafe / must be removed, downgraded or kept pending**
- No specific contradiction confirmed in this pass; treat every unsourced existing statement as UNVERIFIED until checked against a real Riot source.

**Canonical information that must exist as sourced claims / bio facts**
- Icathian survivor
- shaped by Icathia's fall/Void catastrophe
- seeks warriors to resist Void
- not an Ascended institution member.

**Exactly what Cursor must add / repair**
- Primary Riot bio: `https://www.leagueoflegends.com/en-us/champions/jax/`
- Set continuity explicitly at champion, claim and timeline level.
- Create 3–5 internal bioBlocks: FACT / SUPPORTED_SYNTHESIS / EDITORIAL_FRAMING as appropriate.
- Turn each factual item above into one atomic claim only if a real Riot source supports that exact proposition.
- For each CORE claim create an evidenceRef/sourceFact derived from the actual source content; never validate using only evidenceNote or claim regex.
- Create 3–5 meaningful timeline beats where canon supports them. Every CORE beat needs trusted claimIds + sourceIds + evidenceRefs.
- Audit all DIRECT_CANON relationships. Shared region/faction/history remains STRUCTURAL_LORE unless explicit interaction/kinship is documented.
- Audit event links with exact EventRelationRole. PARTICIPANT requires trusted PARTICIPATED_IN evidence for that exact event.
- Recompute Tier A. Never flip reviewed/verified flags just to pass the gate.

**Suggested atomic-claim queue**
- `claim:jax:core:01` → Icathian survivor
- `claim:jax:core:02` → shaped by Icathia's fall/Void catastrophe
- `claim:jax:core:03` → seeks warriors to resist Void
- `claim:jax:core:04` → not an Ascended institution member.

### Jayce — `jayce`

**Current state:** Tier C · `FULL_TIER_A_BUILD`
**Current blocker:** Minimal/incomplete profile: biography depth, continuity, atomic claims, trusted timeline, events and relations are insufficient.

**False / unsafe / must be removed, downgraded or kept pending**
- Do not silently merge ARCANE chronology with MAIN_RUNETERRA.

**Canonical information that must exist as sourced claims / bio facts**
- Piltover inventor/defender
- Viktor relationship differs by continuity
- hextech history and Arcane events must not be silently merged.

**Exactly what Cursor must add / repair**
- Primary Riot bio: `https://www.leagueoflegends.com/en-us/champions/jayce/`
- Set continuity explicitly at champion, claim and timeline level.
- Create 3–5 internal bioBlocks: FACT / SUPPORTED_SYNTHESIS / EDITORIAL_FRAMING as appropriate.
- Turn each factual item above into one atomic claim only if a real Riot source supports that exact proposition.
- For each CORE claim create an evidenceRef/sourceFact derived from the actual source content; never validate using only evidenceNote or claim regex.
- Create 3–5 meaningful timeline beats where canon supports them. Every CORE beat needs trusted claimIds + sourceIds + evidenceRefs.
- Audit all DIRECT_CANON relationships. Shared region/faction/history remains STRUCTURAL_LORE unless explicit interaction/kinship is documented.
- Audit event links with exact EventRelationRole. PARTICIPANT requires trusted PARTICIPATED_IN evidence for that exact event.
- Recompute Tier A. Never flip reviewed/verified flags just to pass the gate.

**Suggested atomic-claim queue**
- `claim:jayce:core:01` → Piltover inventor/defender
- `claim:jayce:core:02` → Viktor relationship differs by continuity
- `claim:jayce:core:03` → hextech history and Arcane events must not be silently merged.

### Jhin — `jhin`

**Current state:** Tier C · `CURATED_PROVENANCE_GAP`
**Current blocker:** Existing curated profile lacks enough exact source-backed claims/timeline/continuity coverage for Tier A.

**False / unsafe / must be removed, downgraded or kept pending**
- No specific contradiction confirmed in this pass; treat every unsourced existing statement as UNVERIFIED until checked against a real Riot source.

**Canonical information that must exist as sourced claims / bio facts**
- Ionian serial killer/artist
- Khada Jhin identity
- capture by Kusho/Shen/Zed history where sourced
- later freed/weaponized by patrons
- direct edges sourced per actual encounters.

**Exactly what Cursor must add / repair**
- Primary Riot bio: `https://www.leagueoflegends.com/en-us/champions/jhin/`
- Set continuity explicitly at champion, claim and timeline level.
- Create 3–5 internal bioBlocks: FACT / SUPPORTED_SYNTHESIS / EDITORIAL_FRAMING as appropriate.
- Turn each factual item above into one atomic claim only if a real Riot source supports that exact proposition.
- For each CORE claim create an evidenceRef/sourceFact derived from the actual source content; never validate using only evidenceNote or claim regex.
- Create 3–5 meaningful timeline beats where canon supports them. Every CORE beat needs trusted claimIds + sourceIds + evidenceRefs.
- Audit all DIRECT_CANON relationships. Shared region/faction/history remains STRUCTURAL_LORE unless explicit interaction/kinship is documented.
- Audit event links with exact EventRelationRole. PARTICIPANT requires trusted PARTICIPATED_IN evidence for that exact event.
- Recompute Tier A. Never flip reviewed/verified flags just to pass the gate.

**Suggested atomic-claim queue**
- `claim:jhin:core:01` → Ionian serial killer/artist
- `claim:jhin:core:02` → Khada Jhin identity
- `claim:jhin:core:03` → capture by Kusho/Shen/Zed history where sourced
- `claim:jhin:core:04` → later freed/weaponized by patrons
- `claim:jhin:core:05` → direct edges sourced per actual encounters.

### Jinx — `jinx`

**Current state:** Tier C · `CURATED_PROVENANCE_GAP`
**Current blocker:** Existing curated profile lacks enough exact source-backed claims/timeline/continuity coverage for Tier A.

**False / unsafe / must be removed, downgraded or kept pending**
- Do not silently import ARCANE childhood/family chronology into MAIN_RUNETERRA.

**Canonical information that must exist as sourced claims / bio facts**
- Zaunite criminal/inventor
- Vi relation continuity-sensitive
- Piltover attacks core
- Arcane childhood/family details stay ARCANE unless officially merged.

**Exactly what Cursor must add / repair**
- Primary Riot bio: `https://www.leagueoflegends.com/en-us/champions/jinx/`
- Set continuity explicitly at champion, claim and timeline level.
- Create 3–5 internal bioBlocks: FACT / SUPPORTED_SYNTHESIS / EDITORIAL_FRAMING as appropriate.
- Turn each factual item above into one atomic claim only if a real Riot source supports that exact proposition.
- For each CORE claim create an evidenceRef/sourceFact derived from the actual source content; never validate using only evidenceNote or claim regex.
- Create 3–5 meaningful timeline beats where canon supports them. Every CORE beat needs trusted claimIds + sourceIds + evidenceRefs.
- Audit all DIRECT_CANON relationships. Shared region/faction/history remains STRUCTURAL_LORE unless explicit interaction/kinship is documented.
- Audit event links with exact EventRelationRole. PARTICIPANT requires trusted PARTICIPATED_IN evidence for that exact event.
- Recompute Tier A. Never flip reviewed/verified flags just to pass the gate.

**Suggested atomic-claim queue**
- `claim:jinx:core:01` → Zaunite criminal/inventor
- `claim:jinx:core:02` → Vi relation continuity-sensitive
- `claim:jinx:core:03` → Piltover attacks core
- `claim:jinx:core:04` → Arcane childhood/family details stay ARCANE unless officially merged.

### K'Sante — `ksante`

**Current state:** Tier C · `FULL_TIER_A_BUILD`
**Current blocker:** Minimal/incomplete profile: biography depth, continuity, atomic claims, trusted timeline, events and relations are insufficient.

**False / unsafe / must be removed, downgraded or kept pending**
- No specific contradiction confirmed in this pass; treat every unsourced existing statement as UNVERIFIED until checked against a real Riot source.

**Canonical information that must exist as sourced claims / bio facts**
- Warrior of Nazumah
- hunts colossal beasts/Ascended threats
- former partner Tope central
- pride/obsession arc and leadership responsibility.

**Exactly what Cursor must add / repair**
- Primary Riot bio: `https://www.leagueoflegends.com/en-us/champions/ksante/`
- Set continuity explicitly at champion, claim and timeline level.
- Create 3–5 internal bioBlocks: FACT / SUPPORTED_SYNTHESIS / EDITORIAL_FRAMING as appropriate.
- Turn each factual item above into one atomic claim only if a real Riot source supports that exact proposition.
- For each CORE claim create an evidenceRef/sourceFact derived from the actual source content; never validate using only evidenceNote or claim regex.
- Create 3–5 meaningful timeline beats where canon supports them. Every CORE beat needs trusted claimIds + sourceIds + evidenceRefs.
- Audit all DIRECT_CANON relationships. Shared region/faction/history remains STRUCTURAL_LORE unless explicit interaction/kinship is documented.
- Audit event links with exact EventRelationRole. PARTICIPANT requires trusted PARTICIPATED_IN evidence for that exact event.
- Recompute Tier A. Never flip reviewed/verified flags just to pass the gate.

**Suggested atomic-claim queue**
- `claim:ksante:core:01` → Warrior of Nazumah
- `claim:ksante:core:02` → hunts colossal beasts/Ascended threats
- `claim:ksante:core:03` → former partner Tope central
- `claim:ksante:core:04` → pride/obsession arc and leadership responsibility.

### Kai'Sa — `kaisa`

**Current state:** Tier B · `PHASE1_REVALIDATE`
**Current blocker:** reviewCoverage 86 < 90

**False / unsafe / must be removed, downgraded or kept pending**
- Never attach Kai'Sa to the ancient Icathian Void War; her Void incursion is a modern personal event.

**Canonical information that must exist as sourced claims / bio facts**
- Shuriman girl lost to modern Void incursion
- bonded with Voidborn carapace
- hunts Void creatures
- daughter of Kassadin where exact source supports
- never ancient Void War participant.

**Exactly what Cursor must add / repair**
- Primary Riot bio: `https://www.leagueoflegends.com/en-us/champions/kaisa/`
- Set continuity explicitly at champion, claim and timeline level.
- Create 3–5 internal bioBlocks: FACT / SUPPORTED_SYNTHESIS / EDITORIAL_FRAMING as appropriate.
- Turn each factual item above into one atomic claim only if a real Riot source supports that exact proposition.
- For each CORE claim create an evidenceRef/sourceFact derived from the actual source content; never validate using only evidenceNote or claim regex.
- Create 3–5 meaningful timeline beats where canon supports them. Every CORE beat needs trusted claimIds + sourceIds + evidenceRefs.
- Audit all DIRECT_CANON relationships. Shared region/faction/history remains STRUCTURAL_LORE unless explicit interaction/kinship is documented.
- Audit event links with exact EventRelationRole. PARTICIPANT requires trusted PARTICIPATED_IN evidence for that exact event.
- Recompute Tier A. Never flip reviewed/verified flags just to pass the gate.

**Suggested atomic-claim queue**
- `claim:kaisa:core:01` → Shuriman girl lost to modern Void incursion
- `claim:kaisa:core:02` → bonded with Voidborn carapace
- `claim:kaisa:core:03` → hunts Void creatures
- `claim:kaisa:core:04` → daughter of Kassadin where exact source supports
- `claim:kaisa:core:05` → never ancient Void War participant.

### Kalista — `kalista`

**Current state:** Tier C · `CURATED_PROVENANCE_GAP`
**Current blocker:** Existing curated profile lacks enough exact source-backed claims/timeline/continuity coverage for Tier A.

**False / unsafe / must be removed, downgraded or kept pending**
- No specific contradiction confirmed in this pass; treat every unsourced existing statement as UNVERIFIED until checked against a real Riot source.

**Canonical information that must exist as sourced claims / bio facts**
- Camavoran general/royal kin where novel/current canon supports
- betrayed by Hecarim
- became Spear of Vengeance
- pre/post Ruination roles separated.

**Exactly what Cursor must add / repair**
- Primary Riot bio: `https://www.leagueoflegends.com/en-us/champions/kalista/`
- Set continuity explicitly at champion, claim and timeline level.
- Create 3–5 internal bioBlocks: FACT / SUPPORTED_SYNTHESIS / EDITORIAL_FRAMING as appropriate.
- Turn each factual item above into one atomic claim only if a real Riot source supports that exact proposition.
- For each CORE claim create an evidenceRef/sourceFact derived from the actual source content; never validate using only evidenceNote or claim regex.
- Create 3–5 meaningful timeline beats where canon supports them. Every CORE beat needs trusted claimIds + sourceIds + evidenceRefs.
- Audit all DIRECT_CANON relationships. Shared region/faction/history remains STRUCTURAL_LORE unless explicit interaction/kinship is documented.
- Audit event links with exact EventRelationRole. PARTICIPANT requires trusted PARTICIPATED_IN evidence for that exact event.
- Recompute Tier A. Never flip reviewed/verified flags just to pass the gate.

**Suggested atomic-claim queue**
- `claim:kalista:core:01` → Camavoran general/royal kin where novel/current canon supports
- `claim:kalista:core:02` → betrayed by Hecarim
- `claim:kalista:core:03` → became Spear of Vengeance
- `claim:kalista:core:04` → pre/post Ruination roles separated.

### Karma — `karma`

**Current state:** Tier C · `CURATED_PROVENANCE_GAP`
**Current blocker:** Existing curated profile lacks enough exact source-backed claims/timeline/continuity coverage for Tier A.

**False / unsafe / must be removed, downgraded or kept pending**
- No specific contradiction confirmed in this pass; treat every unsourced existing statement as UNVERIFIED until checked against a real Riot source.

**Canonical information that must exist as sourced claims / bio facts**
- Current incarnation of Ionian spiritual mantle
- Darha identity where supported
- pacifist tradition challenged by Noxian invasion
- not political ruler of all Ionia.

**Exactly what Cursor must add / repair**
- Primary Riot bio: `https://www.leagueoflegends.com/en-us/champions/karma/`
- Set continuity explicitly at champion, claim and timeline level.
- Create 3–5 internal bioBlocks: FACT / SUPPORTED_SYNTHESIS / EDITORIAL_FRAMING as appropriate.
- Turn each factual item above into one atomic claim only if a real Riot source supports that exact proposition.
- For each CORE claim create an evidenceRef/sourceFact derived from the actual source content; never validate using only evidenceNote or claim regex.
- Create 3–5 meaningful timeline beats where canon supports them. Every CORE beat needs trusted claimIds + sourceIds + evidenceRefs.
- Audit all DIRECT_CANON relationships. Shared region/faction/history remains STRUCTURAL_LORE unless explicit interaction/kinship is documented.
- Audit event links with exact EventRelationRole. PARTICIPANT requires trusted PARTICIPATED_IN evidence for that exact event.
- Recompute Tier A. Never flip reviewed/verified flags just to pass the gate.

**Suggested atomic-claim queue**
- `claim:karma:core:01` → Current incarnation of Ionian spiritual mantle
- `claim:karma:core:02` → Darha identity where supported
- `claim:karma:core:03` → pacifist tradition challenged by Noxian invasion
- `claim:karma:core:04` → not political ruler of all Ionia.

### Karthus — `karthus`

**Current state:** Tier C · `FULL_TIER_A_BUILD`
**Current blocker:** Minimal/incomplete profile: biography depth, continuity, atomic claims, trusted timeline, events and relations are insufficient.

**False / unsafe / must be removed, downgraded or kept pending**
- No specific contradiction confirmed in this pass; treat every unsourced existing statement as UNVERIFIED until checked against a real Riot source.

**Canonical information that must exist as sourced claims / bio facts**
- Mortal obsessed with death who came to Shadow Isles
- embraced undeath
- no participation in original Ruination unless directly sourced.

**Exactly what Cursor must add / repair**
- Primary Riot bio: `https://www.leagueoflegends.com/en-us/champions/karthus/`
- Set continuity explicitly at champion, claim and timeline level.
- Create 3–5 internal bioBlocks: FACT / SUPPORTED_SYNTHESIS / EDITORIAL_FRAMING as appropriate.
- Turn each factual item above into one atomic claim only if a real Riot source supports that exact proposition.
- For each CORE claim create an evidenceRef/sourceFact derived from the actual source content; never validate using only evidenceNote or claim regex.
- Create 3–5 meaningful timeline beats where canon supports them. Every CORE beat needs trusted claimIds + sourceIds + evidenceRefs.
- Audit all DIRECT_CANON relationships. Shared region/faction/history remains STRUCTURAL_LORE unless explicit interaction/kinship is documented.
- Audit event links with exact EventRelationRole. PARTICIPANT requires trusted PARTICIPATED_IN evidence for that exact event.
- Recompute Tier A. Never flip reviewed/verified flags just to pass the gate.

**Suggested atomic-claim queue**
- `claim:karthus:core:01` → Mortal obsessed with death who came to Shadow Isles
- `claim:karthus:core:02` → embraced undeath
- `claim:karthus:core:03` → no participation in original Ruination unless directly sourced.

### Kassadin — `kassadin`

**Current state:** Tier A · `PHASE1_REVALIDATE`
**Current blocker:** Currently Tier A under strict gate; still requires real source-extract verification before considering the profile source-audited.

**False / unsafe / must be removed, downgraded or kept pending**
- No specific contradiction confirmed in this pass; treat every unsourced existing statement as UNVERIFIED until checked against a real Riot source.

**Canonical information that must exist as sourced claims / bio facts**
- Shuriman guide/adventurer
- lost family/home to Void disaster
- father of Kai'Sa where exact source supports
- armed with relics to fight Void
- no ancient-war participation.

**Exactly what Cursor must add / repair**
- Primary Riot bio: `https://www.leagueoflegends.com/en-us/champions/kassadin/`
- Set continuity explicitly at champion, claim and timeline level.
- Create 3–5 internal bioBlocks: FACT / SUPPORTED_SYNTHESIS / EDITORIAL_FRAMING as appropriate.
- Turn each factual item above into one atomic claim only if a real Riot source supports that exact proposition.
- For each CORE claim create an evidenceRef/sourceFact derived from the actual source content; never validate using only evidenceNote or claim regex.
- Create 3–5 meaningful timeline beats where canon supports them. Every CORE beat needs trusted claimIds + sourceIds + evidenceRefs.
- Audit all DIRECT_CANON relationships. Shared region/faction/history remains STRUCTURAL_LORE unless explicit interaction/kinship is documented.
- Audit event links with exact EventRelationRole. PARTICIPANT requires trusted PARTICIPATED_IN evidence for that exact event.
- Recompute Tier A. Never flip reviewed/verified flags just to pass the gate.

**Suggested atomic-claim queue**
- `claim:kassadin:core:01` → Shuriman guide/adventurer
- `claim:kassadin:core:02` → lost family/home to Void disaster
- `claim:kassadin:core:03` → father of Kai'Sa where exact source supports
- `claim:kassadin:core:04` → armed with relics to fight Void
- `claim:kassadin:core:05` → no ancient-war participation.

### Katarina — `katarina`

**Current state:** Tier C · `CURATED_PROVENANCE_GAP`
**Current blocker:** Existing curated profile lacks enough exact source-backed claims/timeline/continuity coverage for Tier A.

**False / unsafe / must be removed, downgraded or kept pending**
- No specific contradiction confirmed in this pass; treat every unsourced existing statement as UNVERIFIED until checked against a real Riot source.

**Canonical information that must exist as sourced claims / bio facts**
- Noxian assassin of House Du Couteau
- daughter of General Du Couteau
- sister of Cassiopeia
- Garen relationship must be source-precise
- recent comic continuity checked.

**Exactly what Cursor must add / repair**
- Primary Riot bio: `https://www.leagueoflegends.com/en-us/champions/katarina/`
- Set continuity explicitly at champion, claim and timeline level.
- Create 3–5 internal bioBlocks: FACT / SUPPORTED_SYNTHESIS / EDITORIAL_FRAMING as appropriate.
- Turn each factual item above into one atomic claim only if a real Riot source supports that exact proposition.
- For each CORE claim create an evidenceRef/sourceFact derived from the actual source content; never validate using only evidenceNote or claim regex.
- Create 3–5 meaningful timeline beats where canon supports them. Every CORE beat needs trusted claimIds + sourceIds + evidenceRefs.
- Audit all DIRECT_CANON relationships. Shared region/faction/history remains STRUCTURAL_LORE unless explicit interaction/kinship is documented.
- Audit event links with exact EventRelationRole. PARTICIPANT requires trusted PARTICIPATED_IN evidence for that exact event.
- Recompute Tier A. Never flip reviewed/verified flags just to pass the gate.

**Suggested atomic-claim queue**
- `claim:katarina:core:01` → Noxian assassin of House Du Couteau
- `claim:katarina:core:02` → daughter of General Du Couteau
- `claim:katarina:core:03` → sister of Cassiopeia
- `claim:katarina:core:04` → Garen relationship must be source-precise
- `claim:katarina:core:05` → recent comic continuity checked.

### Kayle — `kayle`

**Current state:** Tier C · `CURATED_PROVENANCE_GAP`
**Current blocker:** Existing curated profile lacks enough exact source-backed claims/timeline/continuity coverage for Tier A.

**False / unsafe / must be removed, downgraded or kept pending**
- No specific contradiction confirmed in this pass; treat every unsourced existing statement as UNVERIFIED until checked against a real Riot source.

**Canonical information that must exist as sourced claims / bio facts**
- Daughter of Mihira/Kilam
- sister of Morgana
- celestial Justice heritage
- conflict with Morgana shaped Demacia
- later left for celestial/Targon pursuit where sourced.

**Exactly what Cursor must add / repair**
- Primary Riot bio: `https://www.leagueoflegends.com/en-us/champions/kayle/`
- Set continuity explicitly at champion, claim and timeline level.
- Create 3–5 internal bioBlocks: FACT / SUPPORTED_SYNTHESIS / EDITORIAL_FRAMING as appropriate.
- Turn each factual item above into one atomic claim only if a real Riot source supports that exact proposition.
- For each CORE claim create an evidenceRef/sourceFact derived from the actual source content; never validate using only evidenceNote or claim regex.
- Create 3–5 meaningful timeline beats where canon supports them. Every CORE beat needs trusted claimIds + sourceIds + evidenceRefs.
- Audit all DIRECT_CANON relationships. Shared region/faction/history remains STRUCTURAL_LORE unless explicit interaction/kinship is documented.
- Audit event links with exact EventRelationRole. PARTICIPANT requires trusted PARTICIPATED_IN evidence for that exact event.
- Recompute Tier A. Never flip reviewed/verified flags just to pass the gate.

**Suggested atomic-claim queue**
- `claim:kayle:core:01` → Daughter of Mihira/Kilam
- `claim:kayle:core:02` → sister of Morgana
- `claim:kayle:core:03` → celestial Justice heritage
- `claim:kayle:core:04` → conflict with Morgana shaped Demacia
- `claim:kayle:core:05` → later left for celestial/Targon pursuit where sourced.

### Kayn — `kayn`

**Current state:** Tier C · `FULL_TIER_A_BUILD`
**Current blocker:** Minimal/incomplete profile: biography depth, continuity, atomic claims, trusted timeline, events and relations are insufficient.

**False / unsafe / must be removed, downgraded or kept pending**
- No specific contradiction confirmed in this pass; treat every unsourced existing statement as UNVERIFIED until checked against a real Riot source.

**Canonical information that must exist as sourced claims / bio facts**
- Noxian-born child soldier taken in by Zed
- Order of Shadow member
- wields Darkin scythe Rhaast
- ongoing control struggle.

**Exactly what Cursor must add / repair**
- Primary Riot bio: `https://www.leagueoflegends.com/en-us/champions/kayn/`
- Set continuity explicitly at champion, claim and timeline level.
- Create 3–5 internal bioBlocks: FACT / SUPPORTED_SYNTHESIS / EDITORIAL_FRAMING as appropriate.
- Turn each factual item above into one atomic claim only if a real Riot source supports that exact proposition.
- For each CORE claim create an evidenceRef/sourceFact derived from the actual source content; never validate using only evidenceNote or claim regex.
- Create 3–5 meaningful timeline beats where canon supports them. Every CORE beat needs trusted claimIds + sourceIds + evidenceRefs.
- Audit all DIRECT_CANON relationships. Shared region/faction/history remains STRUCTURAL_LORE unless explicit interaction/kinship is documented.
- Audit event links with exact EventRelationRole. PARTICIPANT requires trusted PARTICIPATED_IN evidence for that exact event.
- Recompute Tier A. Never flip reviewed/verified flags just to pass the gate.

**Suggested atomic-claim queue**
- `claim:kayn:core:01` → Noxian-born child soldier taken in by Zed
- `claim:kayn:core:02` → Order of Shadow member
- `claim:kayn:core:03` → wields Darkin scythe Rhaast
- `claim:kayn:core:04` → ongoing control struggle.

### Kennen — `kennen`

**Current state:** Tier C · `FULL_TIER_A_BUILD`
**Current blocker:** Minimal/incomplete profile: biography depth, continuity, atomic claims, trusted timeline, events and relations are insufficient.

**False / unsafe / must be removed, downgraded or kept pending**
- No specific contradiction confirmed in this pass; treat every unsourced existing statement as UNVERIFIED until checked against a real Riot source.

**Canonical information that must exist as sourced claims / bio facts**
- Yordle Kinkou member
- Heart of the Tempest
- long-term mediator/guardian
- direct Shen/Akali relations only from actual Kinkou material.

**Exactly what Cursor must add / repair**
- Primary Riot bio: `https://www.leagueoflegends.com/en-us/champions/kennen/`
- Set continuity explicitly at champion, claim and timeline level.
- Create 3–5 internal bioBlocks: FACT / SUPPORTED_SYNTHESIS / EDITORIAL_FRAMING as appropriate.
- Turn each factual item above into one atomic claim only if a real Riot source supports that exact proposition.
- For each CORE claim create an evidenceRef/sourceFact derived from the actual source content; never validate using only evidenceNote or claim regex.
- Create 3–5 meaningful timeline beats where canon supports them. Every CORE beat needs trusted claimIds + sourceIds + evidenceRefs.
- Audit all DIRECT_CANON relationships. Shared region/faction/history remains STRUCTURAL_LORE unless explicit interaction/kinship is documented.
- Audit event links with exact EventRelationRole. PARTICIPANT requires trusted PARTICIPATED_IN evidence for that exact event.
- Recompute Tier A. Never flip reviewed/verified flags just to pass the gate.

**Suggested atomic-claim queue**
- `claim:kennen:core:01` → Yordle Kinkou member
- `claim:kennen:core:02` → Heart of the Tempest
- `claim:kennen:core:03` → long-term mediator/guardian
- `claim:kennen:core:04` → direct Shen/Akali relations only from actual Kinkou material.

### Kha'Zix — `khazix`

**Current state:** Tier C · `FULL_TIER_A_BUILD`
**Current blocker:** Minimal/incomplete profile: biography depth, continuity, atomic claims, trusted timeline, events and relations are insufficient.

**False / unsafe / must be removed, downgraded or kept pending**
- No specific contradiction confirmed in this pass; treat every unsourced existing statement as UNVERIFIED until checked against a real Riot source.

**Canonical information that must exist as sourced claims / bio facts**
- Voidborn predator that evolves through hunting
- Rengar rivalry explicit
- no automatic allegiance to Bel'Veth/Watchers.

**Exactly what Cursor must add / repair**
- Primary Riot bio: `https://www.leagueoflegends.com/en-us/champions/khazix/`
- Set continuity explicitly at champion, claim and timeline level.
- Create 3–5 internal bioBlocks: FACT / SUPPORTED_SYNTHESIS / EDITORIAL_FRAMING as appropriate.
- Turn each factual item above into one atomic claim only if a real Riot source supports that exact proposition.
- For each CORE claim create an evidenceRef/sourceFact derived from the actual source content; never validate using only evidenceNote or claim regex.
- Create 3–5 meaningful timeline beats where canon supports them. Every CORE beat needs trusted claimIds + sourceIds + evidenceRefs.
- Audit all DIRECT_CANON relationships. Shared region/faction/history remains STRUCTURAL_LORE unless explicit interaction/kinship is documented.
- Audit event links with exact EventRelationRole. PARTICIPANT requires trusted PARTICIPATED_IN evidence for that exact event.
- Recompute Tier A. Never flip reviewed/verified flags just to pass the gate.

**Suggested atomic-claim queue**
- `claim:khazix:core:01` → Voidborn predator that evolves through hunting
- `claim:khazix:core:02` → Rengar rivalry explicit
- `claim:khazix:core:03` → no automatic allegiance to Bel'Veth/Watchers.

### Kindred — `kindred`

**Current state:** Tier C · `CURATED_PROVENANCE_GAP`
**Current blocker:** Existing curated profile lacks enough exact source-backed claims/timeline/continuity coverage for Tier A.

**False / unsafe / must be removed, downgraded or kept pending**
- Do not flatten cultural myths into a single literal historical origin.

**Canonical information that must exist as sourced claims / bio facts**
- Lamb and Wolf as cultural personifications of death
- regional myths vary
- Gray Man is myth/legend, not necessarily literal historical fact.

**Exactly what Cursor must add / repair**
- Primary Riot bio: `https://www.leagueoflegends.com/en-us/champions/kindred/`
- Set continuity explicitly at champion, claim and timeline level.
- Create 3–5 internal bioBlocks: FACT / SUPPORTED_SYNTHESIS / EDITORIAL_FRAMING as appropriate.
- Turn each factual item above into one atomic claim only if a real Riot source supports that exact proposition.
- For each CORE claim create an evidenceRef/sourceFact derived from the actual source content; never validate using only evidenceNote or claim regex.
- Create 3–5 meaningful timeline beats where canon supports them. Every CORE beat needs trusted claimIds + sourceIds + evidenceRefs.
- Audit all DIRECT_CANON relationships. Shared region/faction/history remains STRUCTURAL_LORE unless explicit interaction/kinship is documented.
- Audit event links with exact EventRelationRole. PARTICIPANT requires trusted PARTICIPATED_IN evidence for that exact event.
- Recompute Tier A. Never flip reviewed/verified flags just to pass the gate.

**Suggested atomic-claim queue**
- `claim:kindred:core:01` → Lamb and Wolf as cultural personifications of death
- `claim:kindred:core:02` → regional myths vary
- `claim:kindred:core:03` → Gray Man is myth/legend, not necessarily literal historical fact.

### Kled — `kled`

**Current state:** Tier C · `FULL_TIER_A_BUILD`
**Current blocker:** Minimal/incomplete profile: biography depth, continuity, atomic claims, trusted timeline, events and relations are insufficient.

**False / unsafe / must be removed, downgraded or kept pending**
- No specific contradiction confirmed in this pass; treat every unsourced existing statement as UNVERIFIED until checked against a real Riot source.

**Canonical information that must exist as sourced claims / bio facts**
- Noxian yordle soldier with Skaarl
- boasts vast military history/land claims
- distinguish unreliable boasts from verified events.

**Exactly what Cursor must add / repair**
- Primary Riot bio: `https://www.leagueoflegends.com/en-us/champions/kled/`
- Set continuity explicitly at champion, claim and timeline level.
- Create 3–5 internal bioBlocks: FACT / SUPPORTED_SYNTHESIS / EDITORIAL_FRAMING as appropriate.
- Turn each factual item above into one atomic claim only if a real Riot source supports that exact proposition.
- For each CORE claim create an evidenceRef/sourceFact derived from the actual source content; never validate using only evidenceNote or claim regex.
- Create 3–5 meaningful timeline beats where canon supports them. Every CORE beat needs trusted claimIds + sourceIds + evidenceRefs.
- Audit all DIRECT_CANON relationships. Shared region/faction/history remains STRUCTURAL_LORE unless explicit interaction/kinship is documented.
- Audit event links with exact EventRelationRole. PARTICIPANT requires trusted PARTICIPATED_IN evidence for that exact event.
- Recompute Tier A. Never flip reviewed/verified flags just to pass the gate.

**Suggested atomic-claim queue**
- `claim:kled:core:01` → Noxian yordle soldier with Skaarl
- `claim:kled:core:02` → boasts vast military history/land claims
- `claim:kled:core:03` → distinguish unreliable boasts from verified events.

### Kog'Maw — `kog-maw`

**Current state:** Tier C · `FULL_TIER_A_BUILD`
**Current blocker:** Minimal/incomplete profile: biography depth, continuity, atomic claims, trusted timeline, events and relations are insufficient.

**False / unsafe / must be removed, downgraded or kept pending**
- Sparse canon: verify any Malzahar or Void-hierarchy link before marking it direct.

**Canonical information that must exist as sourced claims / bio facts**
- Voidborn driven by curiosity/hunger
- canon sparse
- verify any Malzahar or hierarchy relation before making direct.

**Exactly what Cursor must add / repair**
- Primary Riot bio: `https://www.leagueoflegends.com/en-us/champions/kog-maw/`
- Set continuity explicitly at champion, claim and timeline level.
- Create 3–5 internal bioBlocks: FACT / SUPPORTED_SYNTHESIS / EDITORIAL_FRAMING as appropriate.
- Turn each factual item above into one atomic claim only if a real Riot source supports that exact proposition.
- For each CORE claim create an evidenceRef/sourceFact derived from the actual source content; never validate using only evidenceNote or claim regex.
- Create 3–5 meaningful timeline beats where canon supports them. Every CORE beat needs trusted claimIds + sourceIds + evidenceRefs.
- Audit all DIRECT_CANON relationships. Shared region/faction/history remains STRUCTURAL_LORE unless explicit interaction/kinship is documented.
- Audit event links with exact EventRelationRole. PARTICIPANT requires trusted PARTICIPATED_IN evidence for that exact event.
- Recompute Tier A. Never flip reviewed/verified flags just to pass the gate.

**Suggested atomic-claim queue**
- `claim:kog-maw:core:01` → Voidborn driven by curiosity/hunger
- `claim:kog-maw:core:02` → canon sparse
- `claim:kog-maw:core:03` → verify any Malzahar or hierarchy relation before making direct.

### LeBlanc — `leblanc`

**Current state:** Tier C · `CURATED_PROVENANCE_GAP`
**Current blocker:** Existing curated profile lacks enough exact source-backed claims/timeline/continuity coverage for Tier A.

**False / unsafe / must be removed, downgraded or kept pending**
- No specific contradiction confirmed in this pass; treat every unsourced existing statement as UNVERIFIED until checked against a real Riot source.

**Canonical information that must exist as sourced claims / bio facts**
- Central Black Rose figure
- ancient illusionist/shapeshifter
- Mordekaiser/Swain opposition source-specific
- identity chronology intentionally secretive.

**Exactly what Cursor must add / repair**
- Primary Riot bio: `https://www.leagueoflegends.com/en-us/champions/leblanc/`
- Set continuity explicitly at champion, claim and timeline level.
- Create 3–5 internal bioBlocks: FACT / SUPPORTED_SYNTHESIS / EDITORIAL_FRAMING as appropriate.
- Turn each factual item above into one atomic claim only if a real Riot source supports that exact proposition.
- For each CORE claim create an evidenceRef/sourceFact derived from the actual source content; never validate using only evidenceNote or claim regex.
- Create 3–5 meaningful timeline beats where canon supports them. Every CORE beat needs trusted claimIds + sourceIds + evidenceRefs.
- Audit all DIRECT_CANON relationships. Shared region/faction/history remains STRUCTURAL_LORE unless explicit interaction/kinship is documented.
- Audit event links with exact EventRelationRole. PARTICIPANT requires trusted PARTICIPATED_IN evidence for that exact event.
- Recompute Tier A. Never flip reviewed/verified flags just to pass the gate.

**Suggested atomic-claim queue**
- `claim:leblanc:core:01` → Central Black Rose figure
- `claim:leblanc:core:02` → ancient illusionist/shapeshifter
- `claim:leblanc:core:03` → Mordekaiser/Swain opposition source-specific
- `claim:leblanc:core:04` → identity chronology intentionally secretive.

### Lee Sin — `lee-sin`

**Current state:** Tier C · `CURATED_PROVENANCE_GAP`
**Current blocker:** Existing curated profile lacks enough exact source-backed claims/timeline/continuity coverage for Tier A.

**False / unsafe / must be removed, downgraded or kept pending**
- No specific contradiction confirmed in this pass; treat every unsourced existing statement as UNVERIFIED until checked against a real Riot source.

**Canonical information that must exist as sourced claims / bio facts**
- Ionian monk
- dangerous dragon spirit power and later disciplined mastery
- Shojin monastery
- invasion events only from exact stories.

**Exactly what Cursor must add / repair**
- Primary Riot bio: `https://www.leagueoflegends.com/en-us/champions/lee-sin/`
- Set continuity explicitly at champion, claim and timeline level.
- Create 3–5 internal bioBlocks: FACT / SUPPORTED_SYNTHESIS / EDITORIAL_FRAMING as appropriate.
- Turn each factual item above into one atomic claim only if a real Riot source supports that exact proposition.
- For each CORE claim create an evidenceRef/sourceFact derived from the actual source content; never validate using only evidenceNote or claim regex.
- Create 3–5 meaningful timeline beats where canon supports them. Every CORE beat needs trusted claimIds + sourceIds + evidenceRefs.
- Audit all DIRECT_CANON relationships. Shared region/faction/history remains STRUCTURAL_LORE unless explicit interaction/kinship is documented.
- Audit event links with exact EventRelationRole. PARTICIPANT requires trusted PARTICIPATED_IN evidence for that exact event.
- Recompute Tier A. Never flip reviewed/verified flags just to pass the gate.

**Suggested atomic-claim queue**
- `claim:lee-sin:core:01` → Ionian monk
- `claim:lee-sin:core:02` → dangerous dragon spirit power and later disciplined mastery
- `claim:lee-sin:core:03` → Shojin monastery
- `claim:lee-sin:core:04` → invasion events only from exact stories.

### Leona — `leona`

**Current state:** Tier A · `PHASE1_REVALIDATE`
**Current blocker:** Currently Tier A under strict gate; still requires real source-extract verification before considering the profile source-audited.

**False / unsafe / must be removed, downgraded or kept pending**
- No specific contradiction confirmed in this pass; treat every unsourced existing statement as UNVERIFIED until checked against a real Riot source.

**Canonical information that must exist as sourced claims / bio facts**
- Solari warrior
- Aspect of the Sun
- direct personal history with Diana
- Solari leadership/persecution context not generic participation in all Targon events.

**Exactly what Cursor must add / repair**
- Primary Riot bio: `https://www.leagueoflegends.com/en-us/champions/leona/`
- Set continuity explicitly at champion, claim and timeline level.
- Create 3–5 internal bioBlocks: FACT / SUPPORTED_SYNTHESIS / EDITORIAL_FRAMING as appropriate.
- Turn each factual item above into one atomic claim only if a real Riot source supports that exact proposition.
- For each CORE claim create an evidenceRef/sourceFact derived from the actual source content; never validate using only evidenceNote or claim regex.
- Create 3–5 meaningful timeline beats where canon supports them. Every CORE beat needs trusted claimIds + sourceIds + evidenceRefs.
- Audit all DIRECT_CANON relationships. Shared region/faction/history remains STRUCTURAL_LORE unless explicit interaction/kinship is documented.
- Audit event links with exact EventRelationRole. PARTICIPANT requires trusted PARTICIPATED_IN evidence for that exact event.
- Recompute Tier A. Never flip reviewed/verified flags just to pass the gate.

**Suggested atomic-claim queue**
- `claim:leona:core:01` → Solari warrior
- `claim:leona:core:02` → Aspect of the Sun
- `claim:leona:core:03` → direct personal history with Diana
- `claim:leona:core:04` → Solari leadership/persecution context not generic participation in all Targon events.

### Lillia — `lillia`

**Current state:** Tier C · `FULL_TIER_A_BUILD`
**Current blocker:** Minimal/incomplete profile: biography depth, continuity, atomic claims, trusted timeline, events and relations are insufficient.

**False / unsafe / must be removed, downgraded or kept pending**
- No specific contradiction confirmed in this pass; treat every unsourced existing statement as UNVERIFIED until checked against a real Riot source.

**Canonical information that must exist as sourced claims / bio facts**
- Dream fawn born from Dreaming Tree
- connected to dreams
- left forest to help/understand mortals
- no automatic Spirit Blossom event participation.

**Exactly what Cursor must add / repair**
- Primary Riot bio: `https://www.leagueoflegends.com/en-us/champions/lillia/`
- Set continuity explicitly at champion, claim and timeline level.
- Create 3–5 internal bioBlocks: FACT / SUPPORTED_SYNTHESIS / EDITORIAL_FRAMING as appropriate.
- Turn each factual item above into one atomic claim only if a real Riot source supports that exact proposition.
- For each CORE claim create an evidenceRef/sourceFact derived from the actual source content; never validate using only evidenceNote or claim regex.
- Create 3–5 meaningful timeline beats where canon supports them. Every CORE beat needs trusted claimIds + sourceIds + evidenceRefs.
- Audit all DIRECT_CANON relationships. Shared region/faction/history remains STRUCTURAL_LORE unless explicit interaction/kinship is documented.
- Audit event links with exact EventRelationRole. PARTICIPANT requires trusted PARTICIPATED_IN evidence for that exact event.
- Recompute Tier A. Never flip reviewed/verified flags just to pass the gate.

**Suggested atomic-claim queue**
- `claim:lillia:core:01` → Dream fawn born from Dreaming Tree
- `claim:lillia:core:02` → connected to dreams
- `claim:lillia:core:03` → left forest to help/understand mortals
- `claim:lillia:core:04` → no automatic Spirit Blossom event participation.

### Lissandra — `lissandra`

**Current state:** Tier C · `CURATED_PROVENANCE_GAP`
**Current blocker:** Existing curated profile lacks enough exact source-backed claims/timeline/continuity coverage for Tier A.

**False / unsafe / must be removed, downgraded or kept pending**
- No specific contradiction confirmed in this pass; treat every unsourced existing statement as UNVERIFIED until checked against a real Riot source.

**Canonical information that must exist as sourced claims / bio facts**
- Frostguard leader and ancient Three Sister
- pact with Watchers then trapped them beneath True Ice
- manipulates history to contain threat
- Ashe/Sejuani links mostly political unless direct.

**Exactly what Cursor must add / repair**
- Primary Riot bio: `https://www.leagueoflegends.com/en-us/champions/lissandra/`
- Set continuity explicitly at champion, claim and timeline level.
- Create 3–5 internal bioBlocks: FACT / SUPPORTED_SYNTHESIS / EDITORIAL_FRAMING as appropriate.
- Turn each factual item above into one atomic claim only if a real Riot source supports that exact proposition.
- For each CORE claim create an evidenceRef/sourceFact derived from the actual source content; never validate using only evidenceNote or claim regex.
- Create 3–5 meaningful timeline beats where canon supports them. Every CORE beat needs trusted claimIds + sourceIds + evidenceRefs.
- Audit all DIRECT_CANON relationships. Shared region/faction/history remains STRUCTURAL_LORE unless explicit interaction/kinship is documented.
- Audit event links with exact EventRelationRole. PARTICIPANT requires trusted PARTICIPATED_IN evidence for that exact event.
- Recompute Tier A. Never flip reviewed/verified flags just to pass the gate.

**Suggested atomic-claim queue**
- `claim:lissandra:core:01` → Frostguard leader and ancient Three Sister
- `claim:lissandra:core:02` → pact with Watchers then trapped them beneath True Ice
- `claim:lissandra:core:03` → manipulates history to contain threat
- `claim:lissandra:core:04` → Ashe/Sejuani links mostly political unless direct.

### Locke — `locke`

**Current state:** Tier C · `CURATED_PROVENANCE_GAP`
**Current blocker:** Existing curated profile lacks enough exact source-backed claims/timeline/continuity coverage for Tier A.

**False / unsafe / must be removed, downgraded or kept pending**
- Do not invent Mageseeker membership, royal service, or ties to existing Demacian champions.

**Canonical information that must exist as sourced claims / bio facts**
- Corvin Locke is Demacian exorcist/occultist
- descendant of Demacian occultists
- uses forbidden rites/soul exorcism
- no invented Mageseeker or royal service.

**Exactly what Cursor must add / repair**
- Primary Riot bio: `https://www.leagueoflegends.com/en-us/champions/locke/`
- Set continuity explicitly at champion, claim and timeline level.
- Create 3–5 internal bioBlocks: FACT / SUPPORTED_SYNTHESIS / EDITORIAL_FRAMING as appropriate.
- Turn each factual item above into one atomic claim only if a real Riot source supports that exact proposition.
- For each CORE claim create an evidenceRef/sourceFact derived from the actual source content; never validate using only evidenceNote or claim regex.
- Create 3–5 meaningful timeline beats where canon supports them. Every CORE beat needs trusted claimIds + sourceIds + evidenceRefs.
- Audit all DIRECT_CANON relationships. Shared region/faction/history remains STRUCTURAL_LORE unless explicit interaction/kinship is documented.
- Audit event links with exact EventRelationRole. PARTICIPANT requires trusted PARTICIPATED_IN evidence for that exact event.
- Recompute Tier A. Never flip reviewed/verified flags just to pass the gate.

**Suggested atomic-claim queue**
- `claim:locke:core:01` → Corvin Locke is Demacian exorcist/occultist
- `claim:locke:core:02` → descendant of Demacian occultists
- `claim:locke:core:03` → uses forbidden rites/soul exorcism
- `claim:locke:core:04` → no invented Mageseeker or royal service.

### Lucian — `lucian`

**Current state:** Tier C · `FULL_TIER_A_BUILD`
**Current blocker:** Minimal/incomplete profile: biography depth, continuity, atomic claims, trusted timeline, events and relations are insufficient.

**False / unsafe / must be removed, downgraded or kept pending**
- No specific contradiction confirmed in this pass; treat every unsourced existing statement as UNVERIFIED until checked against a real Riot source.

**Canonical information that must exist as sourced claims / bio facts**
- Sentinel of Light
- husband/partner of Senna
- fought Thresh after her soul capture
- continued Sentinel work after return
- Ruination participation direct where sourced.

**Exactly what Cursor must add / repair**
- Primary Riot bio: `https://www.leagueoflegends.com/en-us/champions/lucian/`
- Set continuity explicitly at champion, claim and timeline level.
- Create 3–5 internal bioBlocks: FACT / SUPPORTED_SYNTHESIS / EDITORIAL_FRAMING as appropriate.
- Turn each factual item above into one atomic claim only if a real Riot source supports that exact proposition.
- For each CORE claim create an evidenceRef/sourceFact derived from the actual source content; never validate using only evidenceNote or claim regex.
- Create 3–5 meaningful timeline beats where canon supports them. Every CORE beat needs trusted claimIds + sourceIds + evidenceRefs.
- Audit all DIRECT_CANON relationships. Shared region/faction/history remains STRUCTURAL_LORE unless explicit interaction/kinship is documented.
- Audit event links with exact EventRelationRole. PARTICIPANT requires trusted PARTICIPATED_IN evidence for that exact event.
- Recompute Tier A. Never flip reviewed/verified flags just to pass the gate.

**Suggested atomic-claim queue**
- `claim:lucian:core:01` → Sentinel of Light
- `claim:lucian:core:02` → husband/partner of Senna
- `claim:lucian:core:03` → fought Thresh after her soul capture
- `claim:lucian:core:04` → continued Sentinel work after return
- `claim:lucian:core:05` → Ruination participation direct where sourced.

### Lulu — `lulu`

**Current state:** Tier C · `FULL_TIER_A_BUILD`
**Current blocker:** Minimal/incomplete profile: biography depth, continuity, atomic claims, trusted timeline, events and relations are insufficient.

**False / unsafe / must be removed, downgraded or kept pending**
- No specific contradiction confirmed in this pass; treat every unsourced existing statement as UNVERIFIED until checked against a real Riot source.

**Canonical information that must exist as sourced claims / bio facts**
- Bandle yordle sorceress
- Pix companion
- long time in Glade/fae realm where supported
- no arbitrary yordle direct edges.

**Exactly what Cursor must add / repair**
- Primary Riot bio: `https://www.leagueoflegends.com/en-us/champions/lulu/`
- Set continuity explicitly at champion, claim and timeline level.
- Create 3–5 internal bioBlocks: FACT / SUPPORTED_SYNTHESIS / EDITORIAL_FRAMING as appropriate.
- Turn each factual item above into one atomic claim only if a real Riot source supports that exact proposition.
- For each CORE claim create an evidenceRef/sourceFact derived from the actual source content; never validate using only evidenceNote or claim regex.
- Create 3–5 meaningful timeline beats where canon supports them. Every CORE beat needs trusted claimIds + sourceIds + evidenceRefs.
- Audit all DIRECT_CANON relationships. Shared region/faction/history remains STRUCTURAL_LORE unless explicit interaction/kinship is documented.
- Audit event links with exact EventRelationRole. PARTICIPANT requires trusted PARTICIPATED_IN evidence for that exact event.
- Recompute Tier A. Never flip reviewed/verified flags just to pass the gate.

**Suggested atomic-claim queue**
- `claim:lulu:core:01` → Bandle yordle sorceress
- `claim:lulu:core:02` → Pix companion
- `claim:lulu:core:03` → long time in Glade/fae realm where supported
- `claim:lulu:core:04` → no arbitrary yordle direct edges.

### Lux — `lux`

**Current state:** Tier C · `CURATED_PROVENANCE_GAP`
**Current blocker:** Existing curated profile lacks enough exact source-backed claims/timeline/continuity coverage for Tier A.

**False / unsafe / must be removed, downgraded or kept pending**
- No specific contradiction confirmed in this pass; treat every unsourced existing statement as UNVERIFIED until checked against a real Riot source.

**Canonical information that must exist as sourced claims / bio facts**
- Demacian Crownguard mage
- sister of Garen
- hid magic
- Sylas/Mage Rebellion relation central with exact chronology
- no unsupported leadership claim.

**Exactly what Cursor must add / repair**
- Primary Riot bio: `https://www.leagueoflegends.com/en-us/champions/lux/`
- Set continuity explicitly at champion, claim and timeline level.
- Create 3–5 internal bioBlocks: FACT / SUPPORTED_SYNTHESIS / EDITORIAL_FRAMING as appropriate.
- Turn each factual item above into one atomic claim only if a real Riot source supports that exact proposition.
- For each CORE claim create an evidenceRef/sourceFact derived from the actual source content; never validate using only evidenceNote or claim regex.
- Create 3–5 meaningful timeline beats where canon supports them. Every CORE beat needs trusted claimIds + sourceIds + evidenceRefs.
- Audit all DIRECT_CANON relationships. Shared region/faction/history remains STRUCTURAL_LORE unless explicit interaction/kinship is documented.
- Audit event links with exact EventRelationRole. PARTICIPANT requires trusted PARTICIPATED_IN evidence for that exact event.
- Recompute Tier A. Never flip reviewed/verified flags just to pass the gate.

**Suggested atomic-claim queue**
- `claim:lux:core:01` → Demacian Crownguard mage
- `claim:lux:core:02` → sister of Garen
- `claim:lux:core:03` → hid magic
- `claim:lux:core:04` → Sylas/Mage Rebellion relation central with exact chronology
- `claim:lux:core:05` → no unsupported leadership claim.

### Malphite — `malphite`

**Current state:** Tier C · `FULL_TIER_A_BUILD`
**Current blocker:** Minimal/incomplete profile: biography depth, continuity, atomic claims, trusted timeline, events and relations are insufficient.

**False / unsafe / must be removed, downgraded or kept pending**
- No specific contradiction confirmed in this pass; treat every unsourced existing statement as UNVERIFIED until checked against a real Riot source.

**Canonical information that must exist as sourced claims / bio facts**
- Living shard/construct of the Monolith
- anti-Void/Ixtal origin in current canon
- survived larger structure's destruction
- use post-Ixtal canon not old generic lore.

**Exactly what Cursor must add / repair**
- Primary Riot bio: `https://www.leagueoflegends.com/en-us/champions/malphite/`
- Set continuity explicitly at champion, claim and timeline level.
- Create 3–5 internal bioBlocks: FACT / SUPPORTED_SYNTHESIS / EDITORIAL_FRAMING as appropriate.
- Turn each factual item above into one atomic claim only if a real Riot source supports that exact proposition.
- For each CORE claim create an evidenceRef/sourceFact derived from the actual source content; never validate using only evidenceNote or claim regex.
- Create 3–5 meaningful timeline beats where canon supports them. Every CORE beat needs trusted claimIds + sourceIds + evidenceRefs.
- Audit all DIRECT_CANON relationships. Shared region/faction/history remains STRUCTURAL_LORE unless explicit interaction/kinship is documented.
- Audit event links with exact EventRelationRole. PARTICIPANT requires trusted PARTICIPATED_IN evidence for that exact event.
- Recompute Tier A. Never flip reviewed/verified flags just to pass the gate.

**Suggested atomic-claim queue**
- `claim:malphite:core:01` → Living shard/construct of the Monolith
- `claim:malphite:core:02` → anti-Void/Ixtal origin in current canon
- `claim:malphite:core:03` → survived larger structure's destruction
- `claim:malphite:core:04` → use post-Ixtal canon not old generic lore.

### Malzahar — `malzahar`

**Current state:** Tier A · `PHASE1_REVALIDATE`
**Current blocker:** Currently Tier A under strict gate; still requires real source-extract verification before considering the profile source-audited.

**False / unsafe / must be removed, downgraded or kept pending**
- No specific contradiction confirmed in this pass; treat every unsourced existing statement as UNVERIFIED until checked against a real Riot source.

**Canonical information that must exist as sourced claims / bio facts**
- Shuriman seer/prophet
- drawn to Icathia/Void
- became herald believing Void is salvation
- spreads doctrine
- not participant in every Void event.

**Exactly what Cursor must add / repair**
- Primary Riot bio: `https://www.leagueoflegends.com/en-us/champions/malzahar/`
- Set continuity explicitly at champion, claim and timeline level.
- Create 3–5 internal bioBlocks: FACT / SUPPORTED_SYNTHESIS / EDITORIAL_FRAMING as appropriate.
- Turn each factual item above into one atomic claim only if a real Riot source supports that exact proposition.
- For each CORE claim create an evidenceRef/sourceFact derived from the actual source content; never validate using only evidenceNote or claim regex.
- Create 3–5 meaningful timeline beats where canon supports them. Every CORE beat needs trusted claimIds + sourceIds + evidenceRefs.
- Audit all DIRECT_CANON relationships. Shared region/faction/history remains STRUCTURAL_LORE unless explicit interaction/kinship is documented.
- Audit event links with exact EventRelationRole. PARTICIPANT requires trusted PARTICIPATED_IN evidence for that exact event.
- Recompute Tier A. Never flip reviewed/verified flags just to pass the gate.

**Suggested atomic-claim queue**
- `claim:malzahar:core:01` → Shuriman seer/prophet
- `claim:malzahar:core:02` → drawn to Icathia/Void
- `claim:malzahar:core:03` → became herald believing Void is salvation
- `claim:malzahar:core:04` → spreads doctrine
- `claim:malzahar:core:05` → not participant in every Void event.

### Maokai — `maokai`

**Current state:** Tier C · `FULL_TIER_A_BUILD`
**Current blocker:** Minimal/incomplete profile: biography depth, continuity, atomic claims, trusted timeline, events and relations are insufficient.

**False / unsafe / must be removed, downgraded or kept pending**
- No specific contradiction confirmed in this pass; treat every unsourced existing statement as UNVERIFIED until checked against a real Riot source.

**Canonical information that must exist as sourced claims / bio facts**
- Blessed Isles nature spirit/treant
- survived Ruination using Waters of Life
- opposes Black Mist and seeks restoration
- role may be AFFECTED_BY/survivor unless direct participation shown.

**Exactly what Cursor must add / repair**
- Primary Riot bio: `https://www.leagueoflegends.com/en-us/champions/maokai/`
- Set continuity explicitly at champion, claim and timeline level.
- Create 3–5 internal bioBlocks: FACT / SUPPORTED_SYNTHESIS / EDITORIAL_FRAMING as appropriate.
- Turn each factual item above into one atomic claim only if a real Riot source supports that exact proposition.
- For each CORE claim create an evidenceRef/sourceFact derived from the actual source content; never validate using only evidenceNote or claim regex.
- Create 3–5 meaningful timeline beats where canon supports them. Every CORE beat needs trusted claimIds + sourceIds + evidenceRefs.
- Audit all DIRECT_CANON relationships. Shared region/faction/history remains STRUCTURAL_LORE unless explicit interaction/kinship is documented.
- Audit event links with exact EventRelationRole. PARTICIPANT requires trusted PARTICIPATED_IN evidence for that exact event.
- Recompute Tier A. Never flip reviewed/verified flags just to pass the gate.

**Suggested atomic-claim queue**
- `claim:maokai:core:01` → Blessed Isles nature spirit/treant
- `claim:maokai:core:02` → survived Ruination using Waters of Life
- `claim:maokai:core:03` → opposes Black Mist and seeks restoration
- `claim:maokai:core:04` → role may be AFFECTED_BY/survivor unless direct participation shown.

### Master Yi — `master-yi`

**Current state:** Tier C · `FULL_TIER_A_BUILD`
**Current blocker:** Minimal/incomplete profile: biography depth, continuity, atomic claims, trusted timeline, events and relations are insufficient.

**False / unsafe / must be removed, downgraded or kept pending**
- No specific contradiction confirmed in this pass; treat every unsourced existing statement as UNVERIFIED until checked against a real Riot source.

**Canonical information that must exist as sourced claims / bio facts**
- Wuju master
- Noxian attack devastated his people/order
- survivor preserving Wuju
- trained Wukong where current canon supports.

**Exactly what Cursor must add / repair**
- Primary Riot bio: `https://www.leagueoflegends.com/en-us/champions/master-yi/`
- Set continuity explicitly at champion, claim and timeline level.
- Create 3–5 internal bioBlocks: FACT / SUPPORTED_SYNTHESIS / EDITORIAL_FRAMING as appropriate.
- Turn each factual item above into one atomic claim only if a real Riot source supports that exact proposition.
- For each CORE claim create an evidenceRef/sourceFact derived from the actual source content; never validate using only evidenceNote or claim regex.
- Create 3–5 meaningful timeline beats where canon supports them. Every CORE beat needs trusted claimIds + sourceIds + evidenceRefs.
- Audit all DIRECT_CANON relationships. Shared region/faction/history remains STRUCTURAL_LORE unless explicit interaction/kinship is documented.
- Audit event links with exact EventRelationRole. PARTICIPANT requires trusted PARTICIPATED_IN evidence for that exact event.
- Recompute Tier A. Never flip reviewed/verified flags just to pass the gate.

**Suggested atomic-claim queue**
- `claim:master-yi:core:01` → Wuju master
- `claim:master-yi:core:02` → Noxian attack devastated his people/order
- `claim:master-yi:core:03` → survivor preserving Wuju
- `claim:master-yi:core:04` → trained Wukong where current canon supports.

### Mel — `mel`

**Current state:** Tier C · `CURATED_PROVENANCE_GAP`
**Current blocker:** Existing curated profile lacks enough exact source-backed claims/timeline/continuity coverage for Tier A.

**False / unsafe / must be removed, downgraded or kept pending**
- Do not copy Arcane episode chronology into MAIN_RUNETERRA without continuity labels.

**Canonical information that must exist as sourced claims / bio facts**
- Mel Medarda
- direct daughter of Ambessa
- current champion magical identity/status from Riot champion sources
- Arcane episode chronology remains ARCANE unless explicitly merged.

**Exactly what Cursor must add / repair**
- Primary Riot bio: `https://www.leagueoflegends.com/en-us/champions/mel/`
- Set continuity explicitly at champion, claim and timeline level.
- Create 3–5 internal bioBlocks: FACT / SUPPORTED_SYNTHESIS / EDITORIAL_FRAMING as appropriate.
- Turn each factual item above into one atomic claim only if a real Riot source supports that exact proposition.
- For each CORE claim create an evidenceRef/sourceFact derived from the actual source content; never validate using only evidenceNote or claim regex.
- Create 3–5 meaningful timeline beats where canon supports them. Every CORE beat needs trusted claimIds + sourceIds + evidenceRefs.
- Audit all DIRECT_CANON relationships. Shared region/faction/history remains STRUCTURAL_LORE unless explicit interaction/kinship is documented.
- Audit event links with exact EventRelationRole. PARTICIPANT requires trusted PARTICIPATED_IN evidence for that exact event.
- Recompute Tier A. Never flip reviewed/verified flags just to pass the gate.

**Suggested atomic-claim queue**
- `claim:mel:core:01` → Mel Medarda
- `claim:mel:core:02` → direct daughter of Ambessa
- `claim:mel:core:03` → current champion magical identity/status from Riot champion sources
- `claim:mel:core:04` → Arcane episode chronology remains ARCANE unless explicitly merged.

### Milio — `milio`

**Current state:** Tier C · `FULL_TIER_A_BUILD`
**Current blocker:** Minimal/incomplete profile: biography depth, continuity, atomic claims, trusted timeline, events and relations are insufficient.

**False / unsafe / must be removed, downgraded or kept pending**
- No specific contradiction confirmed in this pass; treat every unsourced existing statement as UNVERIFIED until checked against a real Riot source.

**Canonical information that must exist as sourced claims / bio facts**
- Ixtali boy
- mastered fire axiom and soothing fire
- family exiled due grandmother's history
- travels to Ixaocan for Vidalion/Yun Tal trial.

**Exactly what Cursor must add / repair**
- Primary Riot bio: `https://www.leagueoflegends.com/en-us/champions/milio/`
- Set continuity explicitly at champion, claim and timeline level.
- Create 3–5 internal bioBlocks: FACT / SUPPORTED_SYNTHESIS / EDITORIAL_FRAMING as appropriate.
- Turn each factual item above into one atomic claim only if a real Riot source supports that exact proposition.
- For each CORE claim create an evidenceRef/sourceFact derived from the actual source content; never validate using only evidenceNote or claim regex.
- Create 3–5 meaningful timeline beats where canon supports them. Every CORE beat needs trusted claimIds + sourceIds + evidenceRefs.
- Audit all DIRECT_CANON relationships. Shared region/faction/history remains STRUCTURAL_LORE unless explicit interaction/kinship is documented.
- Audit event links with exact EventRelationRole. PARTICIPANT requires trusted PARTICIPATED_IN evidence for that exact event.
- Recompute Tier A. Never flip reviewed/verified flags just to pass the gate.

**Suggested atomic-claim queue**
- `claim:milio:core:01` → Ixtali boy
- `claim:milio:core:02` → mastered fire axiom and soothing fire
- `claim:milio:core:03` → family exiled due grandmother's history
- `claim:milio:core:04` → travels to Ixaocan for Vidalion/Yun Tal trial.

### Miss Fortune — `miss-fortune`

**Current state:** Tier C · `FULL_TIER_A_BUILD`
**Current blocker:** Minimal/incomplete profile: biography depth, continuity, atomic claims, trusted timeline, events and relations are insufficient.

**False / unsafe / must be removed, downgraded or kept pending**
- No specific contradiction confirmed in this pass; treat every unsourced existing statement as UNVERIFIED until checked against a real Riot source.

**Canonical information that must exist as sourced claims / bio facts**
- Sarah Fortune
- parents killed by Gangplank
- orchestrated his downfall in Burning Tides
- major Bilgewater power
- Ruination role sourced separately.

**Exactly what Cursor must add / repair**
- Primary Riot bio: `https://www.leagueoflegends.com/en-us/champions/miss-fortune/`
- Set continuity explicitly at champion, claim and timeline level.
- Create 3–5 internal bioBlocks: FACT / SUPPORTED_SYNTHESIS / EDITORIAL_FRAMING as appropriate.
- Turn each factual item above into one atomic claim only if a real Riot source supports that exact proposition.
- For each CORE claim create an evidenceRef/sourceFact derived from the actual source content; never validate using only evidenceNote or claim regex.
- Create 3–5 meaningful timeline beats where canon supports them. Every CORE beat needs trusted claimIds + sourceIds + evidenceRefs.
- Audit all DIRECT_CANON relationships. Shared region/faction/history remains STRUCTURAL_LORE unless explicit interaction/kinship is documented.
- Audit event links with exact EventRelationRole. PARTICIPANT requires trusted PARTICIPATED_IN evidence for that exact event.
- Recompute Tier A. Never flip reviewed/verified flags just to pass the gate.

**Suggested atomic-claim queue**
- `claim:miss-fortune:core:01` → Sarah Fortune
- `claim:miss-fortune:core:02` → parents killed by Gangplank
- `claim:miss-fortune:core:03` → orchestrated his downfall in Burning Tides
- `claim:miss-fortune:core:04` → major Bilgewater power
- `claim:miss-fortune:core:05` → Ruination role sourced separately.

### Mordekaiser — `mordekaiser`

**Current state:** Tier C · `CURATED_PROVENANCE_GAP`
**Current blocker:** Existing curated profile lacks enough exact source-backed claims/timeline/continuity coverage for Tier A.

**False / unsafe / must be removed, downgraded or kept pending**
- No specific contradiction confirmed in this pass; treat every unsourced existing statement as UNVERIFIED until checked against a real Riot source.

**Canonical information that must exist as sourced claims / bio facts**
- Ancient warlord Sahn-Uzal became Mordekaiser
- returned from death
- built empire around Immortal Bastion
- death-realm mastery
- Black Rose/LeBlanc opposition source precisely.

**Exactly what Cursor must add / repair**
- Primary Riot bio: `https://www.leagueoflegends.com/en-us/champions/mordekaiser/`
- Set continuity explicitly at champion, claim and timeline level.
- Create 3–5 internal bioBlocks: FACT / SUPPORTED_SYNTHESIS / EDITORIAL_FRAMING as appropriate.
- Turn each factual item above into one atomic claim only if a real Riot source supports that exact proposition.
- For each CORE claim create an evidenceRef/sourceFact derived from the actual source content; never validate using only evidenceNote or claim regex.
- Create 3–5 meaningful timeline beats where canon supports them. Every CORE beat needs trusted claimIds + sourceIds + evidenceRefs.
- Audit all DIRECT_CANON relationships. Shared region/faction/history remains STRUCTURAL_LORE unless explicit interaction/kinship is documented.
- Audit event links with exact EventRelationRole. PARTICIPANT requires trusted PARTICIPATED_IN evidence for that exact event.
- Recompute Tier A. Never flip reviewed/verified flags just to pass the gate.

**Suggested atomic-claim queue**
- `claim:mordekaiser:core:01` → Ancient warlord Sahn-Uzal became Mordekaiser
- `claim:mordekaiser:core:02` → returned from death
- `claim:mordekaiser:core:03` → built empire around Immortal Bastion
- `claim:mordekaiser:core:04` → death-realm mastery
- `claim:mordekaiser:core:05` → Black Rose/LeBlanc opposition source precisely.

### Morgana — `morgana`

**Current state:** Tier C · `CURATED_PROVENANCE_GAP`
**Current blocker:** Existing curated profile lacks enough exact source-backed claims/timeline/continuity coverage for Tier A.

**False / unsafe / must be removed, downgraded or kept pending**
- No specific contradiction confirmed in this pass; treat every unsourced existing statement as UNVERIFIED until checked against a real Riot source.

**Canonical information that must exist as sourced claims / bio facts**
- Daughter of Mihira/Kilam
- sister of Kayle
- shares Justice heritage but embraces mortal compassion
- Kayle conflict shaped early Demacia.

**Exactly what Cursor must add / repair**
- Primary Riot bio: `https://www.leagueoflegends.com/en-us/champions/morgana/`
- Set continuity explicitly at champion, claim and timeline level.
- Create 3–5 internal bioBlocks: FACT / SUPPORTED_SYNTHESIS / EDITORIAL_FRAMING as appropriate.
- Turn each factual item above into one atomic claim only if a real Riot source supports that exact proposition.
- For each CORE claim create an evidenceRef/sourceFact derived from the actual source content; never validate using only evidenceNote or claim regex.
- Create 3–5 meaningful timeline beats where canon supports them. Every CORE beat needs trusted claimIds + sourceIds + evidenceRefs.
- Audit all DIRECT_CANON relationships. Shared region/faction/history remains STRUCTURAL_LORE unless explicit interaction/kinship is documented.
- Audit event links with exact EventRelationRole. PARTICIPANT requires trusted PARTICIPATED_IN evidence for that exact event.
- Recompute Tier A. Never flip reviewed/verified flags just to pass the gate.

**Suggested atomic-claim queue**
- `claim:morgana:core:01` → Daughter of Mihira/Kilam
- `claim:morgana:core:02` → sister of Kayle
- `claim:morgana:core:03` → shares Justice heritage but embraces mortal compassion
- `claim:morgana:core:04` → Kayle conflict shaped early Demacia.

### Naafiri — `naafiri`

**Current state:** Tier C · `FULL_TIER_A_BUILD`
**Current blocker:** Minimal/incomplete profile: biography depth, continuity, atomic claims, trusted timeline, events and relations are insufficient.

**False / unsafe / must be removed, downgraded or kept pending**
- No specific contradiction confirmed in this pass; treat every unsourced existing statement as UNVERIFIED until checked against a real Riot source.

**Canonical information that must exist as sourced claims / bio facts**
- Darkin sealed in dagger
- released in Shurima
- consciousness/body distributed through dune-hound pack
- not conventional single humanoid-host Darkin.

**Exactly what Cursor must add / repair**
- Primary Riot bio: `https://www.leagueoflegends.com/en-us/champions/naafiri/`
- Set continuity explicitly at champion, claim and timeline level.
- Create 3–5 internal bioBlocks: FACT / SUPPORTED_SYNTHESIS / EDITORIAL_FRAMING as appropriate.
- Turn each factual item above into one atomic claim only if a real Riot source supports that exact proposition.
- For each CORE claim create an evidenceRef/sourceFact derived from the actual source content; never validate using only evidenceNote or claim regex.
- Create 3–5 meaningful timeline beats where canon supports them. Every CORE beat needs trusted claimIds + sourceIds + evidenceRefs.
- Audit all DIRECT_CANON relationships. Shared region/faction/history remains STRUCTURAL_LORE unless explicit interaction/kinship is documented.
- Audit event links with exact EventRelationRole. PARTICIPANT requires trusted PARTICIPATED_IN evidence for that exact event.
- Recompute Tier A. Never flip reviewed/verified flags just to pass the gate.

**Suggested atomic-claim queue**
- `claim:naafiri:core:01` → Darkin sealed in dagger
- `claim:naafiri:core:02` → released in Shurima
- `claim:naafiri:core:03` → consciousness/body distributed through dune-hound pack
- `claim:naafiri:core:04` → not conventional single humanoid-host Darkin.

### Nami — `nami`

**Current state:** Tier C · `FULL_TIER_A_BUILD`
**Current blocker:** Minimal/incomplete profile: biography depth, continuity, atomic claims, trusted timeline, events and relations are insufficient.

**False / unsafe / must be removed, downgraded or kept pending**
- No specific contradiction confirmed in this pass; treat every unsourced existing statement as UNVERIFIED until checked against a real Riot source.

**Canonical information that must exist as sourced claims / bio facts**
- Marai Tidecaller
- seeks moonstone to protect people
- journey connects Marai and Lunari/Targon
- Diana direct relation only if they actually meet.

**Exactly what Cursor must add / repair**
- Primary Riot bio: `https://www.leagueoflegends.com/en-us/champions/nami/`
- Set continuity explicitly at champion, claim and timeline level.
- Create 3–5 internal bioBlocks: FACT / SUPPORTED_SYNTHESIS / EDITORIAL_FRAMING as appropriate.
- Turn each factual item above into one atomic claim only if a real Riot source supports that exact proposition.
- For each CORE claim create an evidenceRef/sourceFact derived from the actual source content; never validate using only evidenceNote or claim regex.
- Create 3–5 meaningful timeline beats where canon supports them. Every CORE beat needs trusted claimIds + sourceIds + evidenceRefs.
- Audit all DIRECT_CANON relationships. Shared region/faction/history remains STRUCTURAL_LORE unless explicit interaction/kinship is documented.
- Audit event links with exact EventRelationRole. PARTICIPANT requires trusted PARTICIPATED_IN evidence for that exact event.
- Recompute Tier A. Never flip reviewed/verified flags just to pass the gate.

**Suggested atomic-claim queue**
- `claim:nami:core:01` → Marai Tidecaller
- `claim:nami:core:02` → seeks moonstone to protect people
- `claim:nami:core:03` → journey connects Marai and Lunari/Targon
- `claim:nami:core:04` → Diana direct relation only if they actually meet.

### Nasus — `nasus`

**Current state:** Tier B · `PHASE1_REVALIDATE`
**Current blocker:** canonConfidence 71 < 85

**False / unsafe / must be removed, downgraded or kept pending**
- Keep `Nasus -> PARTICIPATED_IN -> Void War` pending/removed unless an exact Riot primary source is found.

**Canonical information that must exist as sourced claims / bio facts**
- Shuriman scholar/strategist
- Ascended
- brother of Renekton
- helped contain Xerath during Fall
- guards knowledge
- Void War participation stays pending without exact primary evidence.

**Exactly what Cursor must add / repair**
- Primary Riot bio: `https://www.leagueoflegends.com/en-us/champions/nasus/`
- Set continuity explicitly at champion, claim and timeline level.
- Create 3–5 internal bioBlocks: FACT / SUPPORTED_SYNTHESIS / EDITORIAL_FRAMING as appropriate.
- Turn each factual item above into one atomic claim only if a real Riot source supports that exact proposition.
- For each CORE claim create an evidenceRef/sourceFact derived from the actual source content; never validate using only evidenceNote or claim regex.
- Create 3–5 meaningful timeline beats where canon supports them. Every CORE beat needs trusted claimIds + sourceIds + evidenceRefs.
- Audit all DIRECT_CANON relationships. Shared region/faction/history remains STRUCTURAL_LORE unless explicit interaction/kinship is documented.
- Audit event links with exact EventRelationRole. PARTICIPANT requires trusted PARTICIPATED_IN evidence for that exact event.
- Recompute Tier A. Never flip reviewed/verified flags just to pass the gate.

**Suggested atomic-claim queue**
- `claim:nasus:core:01` → Shuriman scholar/strategist
- `claim:nasus:core:02` → Ascended
- `claim:nasus:core:03` → brother of Renekton
- `claim:nasus:core:04` → helped contain Xerath during Fall
- `claim:nasus:core:05` → guards knowledge
- `claim:nasus:core:06` → Void War participation stays pending without exact primary evidence.

### Nautilus — `nautilus`

**Current state:** Tier C · `FULL_TIER_A_BUILD`
**Current blocker:** Minimal/incomplete profile: biography depth, continuity, atomic claims, trusted timeline, events and relations are insufficient.

**False / unsafe / must be removed, downgraded or kept pending**
- No specific contradiction confirmed in this pass; treat every unsourced existing statement as UNVERIFIED until checked against a real Riot source.

**Canonical information that must exist as sourced claims / bio facts**
- Former sailor/diver transformed by supernatural depths
- enforces mysterious tithe/debt
- origin deliberately folkloric/ambiguous
- no forced deity identity.

**Exactly what Cursor must add / repair**
- Primary Riot bio: `https://www.leagueoflegends.com/en-us/champions/nautilus/`
- Set continuity explicitly at champion, claim and timeline level.
- Create 3–5 internal bioBlocks: FACT / SUPPORTED_SYNTHESIS / EDITORIAL_FRAMING as appropriate.
- Turn each factual item above into one atomic claim only if a real Riot source supports that exact proposition.
- For each CORE claim create an evidenceRef/sourceFact derived from the actual source content; never validate using only evidenceNote or claim regex.
- Create 3–5 meaningful timeline beats where canon supports them. Every CORE beat needs trusted claimIds + sourceIds + evidenceRefs.
- Audit all DIRECT_CANON relationships. Shared region/faction/history remains STRUCTURAL_LORE unless explicit interaction/kinship is documented.
- Audit event links with exact EventRelationRole. PARTICIPANT requires trusted PARTICIPATED_IN evidence for that exact event.
- Recompute Tier A. Never flip reviewed/verified flags just to pass the gate.

**Suggested atomic-claim queue**
- `claim:nautilus:core:01` → Former sailor/diver transformed by supernatural depths
- `claim:nautilus:core:02` → enforces mysterious tithe/debt
- `claim:nautilus:core:03` → origin deliberately folkloric/ambiguous
- `claim:nautilus:core:04` → no forced deity identity.

### Neeko — `neeko`

**Current state:** Tier C · `FULL_TIER_A_BUILD`
**Current blocker:** Minimal/incomplete profile: biography depth, continuity, atomic claims, trusted timeline, events and relations are insufficient.

**False / unsafe / must be removed, downgraded or kept pending**
- No specific contradiction confirmed in this pass; treat every unsourced existing statement as UNVERIFIED until checked against a real Riot source.

**Canonical information that must exist as sourced claims / bio facts**
- Oovi-kat vastaya
- separated from destroyed/lost people
- mimics appearances and reads sho'ma
- Nidalee relationship direct where sourced.

**Exactly what Cursor must add / repair**
- Primary Riot bio: `https://www.leagueoflegends.com/en-us/champions/neeko/`
- Set continuity explicitly at champion, claim and timeline level.
- Create 3–5 internal bioBlocks: FACT / SUPPORTED_SYNTHESIS / EDITORIAL_FRAMING as appropriate.
- Turn each factual item above into one atomic claim only if a real Riot source supports that exact proposition.
- For each CORE claim create an evidenceRef/sourceFact derived from the actual source content; never validate using only evidenceNote or claim regex.
- Create 3–5 meaningful timeline beats where canon supports them. Every CORE beat needs trusted claimIds + sourceIds + evidenceRefs.
- Audit all DIRECT_CANON relationships. Shared region/faction/history remains STRUCTURAL_LORE unless explicit interaction/kinship is documented.
- Audit event links with exact EventRelationRole. PARTICIPANT requires trusted PARTICIPATED_IN evidence for that exact event.
- Recompute Tier A. Never flip reviewed/verified flags just to pass the gate.

**Suggested atomic-claim queue**
- `claim:neeko:core:01` → Oovi-kat vastaya
- `claim:neeko:core:02` → separated from destroyed/lost people
- `claim:neeko:core:03` → mimics appearances and reads sho'ma
- `claim:neeko:core:04` → Nidalee relationship direct where sourced.

### Nidalee — `nidalee`

**Current state:** Tier C · `FULL_TIER_A_BUILD`
**Current blocker:** Minimal/incomplete profile: biography depth, continuity, atomic claims, trusted timeline, events and relations are insufficient.

**False / unsafe / must be removed, downgraded or kept pending**
- No specific contradiction confirmed in this pass; treat every unsourced existing statement as UNVERIFIED until checked against a real Riot source.

**Canonical information that must exist as sourced claims / bio facts**
- Shapeshifting huntress of Ixtal jungles
- pakaa/cougar connection
- direct Neeko relationship in modern lore
- no invented political affiliation.

**Exactly what Cursor must add / repair**
- Primary Riot bio: `https://www.leagueoflegends.com/en-us/champions/nidalee/`
- Set continuity explicitly at champion, claim and timeline level.
- Create 3–5 internal bioBlocks: FACT / SUPPORTED_SYNTHESIS / EDITORIAL_FRAMING as appropriate.
- Turn each factual item above into one atomic claim only if a real Riot source supports that exact proposition.
- For each CORE claim create an evidenceRef/sourceFact derived from the actual source content; never validate using only evidenceNote or claim regex.
- Create 3–5 meaningful timeline beats where canon supports them. Every CORE beat needs trusted claimIds + sourceIds + evidenceRefs.
- Audit all DIRECT_CANON relationships. Shared region/faction/history remains STRUCTURAL_LORE unless explicit interaction/kinship is documented.
- Audit event links with exact EventRelationRole. PARTICIPANT requires trusted PARTICIPATED_IN evidence for that exact event.
- Recompute Tier A. Never flip reviewed/verified flags just to pass the gate.

**Suggested atomic-claim queue**
- `claim:nidalee:core:01` → Shapeshifting huntress of Ixtal jungles
- `claim:nidalee:core:02` → pakaa/cougar connection
- `claim:nidalee:core:03` → direct Neeko relationship in modern lore
- `claim:nidalee:core:04` → no invented political affiliation.

### Nilah — `nilah`

**Current state:** Tier C · `FULL_TIER_A_BUILD`
**Current blocker:** Minimal/incomplete profile: biography depth, continuity, atomic claims, trusted timeline, events and relations are insufficient.

**False / unsafe / must be removed, downgraded or kept pending**
- No specific contradiction confirmed in this pass; treat every unsourced existing statement as UNVERIFIED until checked against a real Riot source.

**Canonical information that must exist as sourced claims / bio facts**
- Warrior from Kathkan region
- bound to Ashlesh demon of joy
- sacrificed former identity/emotional range
- hunts great threats
- bond is not generic worship.

**Exactly what Cursor must add / repair**
- Primary Riot bio: `https://www.leagueoflegends.com/en-us/champions/nilah/`
- Set continuity explicitly at champion, claim and timeline level.
- Create 3–5 internal bioBlocks: FACT / SUPPORTED_SYNTHESIS / EDITORIAL_FRAMING as appropriate.
- Turn each factual item above into one atomic claim only if a real Riot source supports that exact proposition.
- For each CORE claim create an evidenceRef/sourceFact derived from the actual source content; never validate using only evidenceNote or claim regex.
- Create 3–5 meaningful timeline beats where canon supports them. Every CORE beat needs trusted claimIds + sourceIds + evidenceRefs.
- Audit all DIRECT_CANON relationships. Shared region/faction/history remains STRUCTURAL_LORE unless explicit interaction/kinship is documented.
- Audit event links with exact EventRelationRole. PARTICIPANT requires trusted PARTICIPATED_IN evidence for that exact event.
- Recompute Tier A. Never flip reviewed/verified flags just to pass the gate.

**Suggested atomic-claim queue**
- `claim:nilah:core:01` → Warrior from Kathkan region
- `claim:nilah:core:02` → bound to Ashlesh demon of joy
- `claim:nilah:core:03` → sacrificed former identity/emotional range
- `claim:nilah:core:04` → hunts great threats
- `claim:nilah:core:05` → bond is not generic worship.

### Nocturne — `nocturne`

**Current state:** Tier C · `FULL_TIER_A_BUILD`
**Current blocker:** Minimal/incomplete profile: biography depth, continuity, atomic claims, trusted timeline, events and relations are insufficient.

**False / unsafe / must be removed, downgraded or kept pending**
- No specific contradiction confirmed in this pass; treat every unsourced existing statement as UNVERIFIED until checked against a real Riot source.

**Canonical information that must exist as sourced claims / bio facts**
- Demon/spirit of nightmares
- tied to nightmare/shadow-magic phenomena
- feeds on fear
- no direct Zed/Kayn connection without source.

**Exactly what Cursor must add / repair**
- Primary Riot bio: `https://www.leagueoflegends.com/en-us/champions/nocturne/`
- Set continuity explicitly at champion, claim and timeline level.
- Create 3–5 internal bioBlocks: FACT / SUPPORTED_SYNTHESIS / EDITORIAL_FRAMING as appropriate.
- Turn each factual item above into one atomic claim only if a real Riot source supports that exact proposition.
- For each CORE claim create an evidenceRef/sourceFact derived from the actual source content; never validate using only evidenceNote or claim regex.
- Create 3–5 meaningful timeline beats where canon supports them. Every CORE beat needs trusted claimIds + sourceIds + evidenceRefs.
- Audit all DIRECT_CANON relationships. Shared region/faction/history remains STRUCTURAL_LORE unless explicit interaction/kinship is documented.
- Audit event links with exact EventRelationRole. PARTICIPANT requires trusted PARTICIPATED_IN evidence for that exact event.
- Recompute Tier A. Never flip reviewed/verified flags just to pass the gate.

**Suggested atomic-claim queue**
- `claim:nocturne:core:01` → Demon/spirit of nightmares
- `claim:nocturne:core:02` → tied to nightmare/shadow-magic phenomena
- `claim:nocturne:core:03` → feeds on fear
- `claim:nocturne:core:04` → no direct Zed/Kayn connection without source.

### Nunu & Willump — `nunu-willump`

**Current state:** Tier C · `FULL_TIER_A_BUILD`
**Current blocker:** Minimal/incomplete profile: biography depth, continuity, atomic claims, trusted timeline, events and relations are insufficient.

**False / unsafe / must be removed, downgraded or kept pending**
- No specific contradiction confirmed in this pass; treat every unsourced existing statement as UNVERIFIED until checked against a real Riot source.

**Canonical information that must exist as sourced claims / bio facts**
- Nunu and yeti Willump
- search for Nunu's mother
- Willump tied to ancient yeti magic
- friendship/imagination core
- avoid tribal politics.

**Exactly what Cursor must add / repair**
- Primary Riot bio: `https://www.leagueoflegends.com/en-us/champions/nunu-willump/`
- Set continuity explicitly at champion, claim and timeline level.
- Create 3–5 internal bioBlocks: FACT / SUPPORTED_SYNTHESIS / EDITORIAL_FRAMING as appropriate.
- Turn each factual item above into one atomic claim only if a real Riot source supports that exact proposition.
- For each CORE claim create an evidenceRef/sourceFact derived from the actual source content; never validate using only evidenceNote or claim regex.
- Create 3–5 meaningful timeline beats where canon supports them. Every CORE beat needs trusted claimIds + sourceIds + evidenceRefs.
- Audit all DIRECT_CANON relationships. Shared region/faction/history remains STRUCTURAL_LORE unless explicit interaction/kinship is documented.
- Audit event links with exact EventRelationRole. PARTICIPANT requires trusted PARTICIPATED_IN evidence for that exact event.
- Recompute Tier A. Never flip reviewed/verified flags just to pass the gate.

**Suggested atomic-claim queue**
- `claim:nunu-willump:core:01` → Nunu and yeti Willump
- `claim:nunu-willump:core:02` → search for Nunu's mother
- `claim:nunu-willump:core:03` → Willump tied to ancient yeti magic
- `claim:nunu-willump:core:04` → friendship/imagination core
- `claim:nunu-willump:core:05` → avoid tribal politics.

### Olaf — `olaf`

**Current state:** Tier C · `FULL_TIER_A_BUILD`
**Current blocker:** Minimal/incomplete profile: biography depth, continuity, atomic claims, trusted timeline, events and relations are insufficient.

**False / unsafe / must be removed, downgraded or kept pending**
- No specific contradiction confirmed in this pass; treat every unsourced existing statement as UNVERIFIED until checked against a real Riot source.

**Canonical information that must exist as sourced claims / bio facts**
- Berserker of Lokfar
- prophecy says peaceful death, so seeks glorious death
- Winter's Claw association where sourced
- Ruination/Sentinel role continuity-specific.

**Exactly what Cursor must add / repair**
- Primary Riot bio: `https://www.leagueoflegends.com/en-us/champions/olaf/`
- Set continuity explicitly at champion, claim and timeline level.
- Create 3–5 internal bioBlocks: FACT / SUPPORTED_SYNTHESIS / EDITORIAL_FRAMING as appropriate.
- Turn each factual item above into one atomic claim only if a real Riot source supports that exact proposition.
- For each CORE claim create an evidenceRef/sourceFact derived from the actual source content; never validate using only evidenceNote or claim regex.
- Create 3–5 meaningful timeline beats where canon supports them. Every CORE beat needs trusted claimIds + sourceIds + evidenceRefs.
- Audit all DIRECT_CANON relationships. Shared region/faction/history remains STRUCTURAL_LORE unless explicit interaction/kinship is documented.
- Audit event links with exact EventRelationRole. PARTICIPANT requires trusted PARTICIPATED_IN evidence for that exact event.
- Recompute Tier A. Never flip reviewed/verified flags just to pass the gate.

**Suggested atomic-claim queue**
- `claim:olaf:core:01` → Berserker of Lokfar
- `claim:olaf:core:02` → prophecy says peaceful death, so seeks glorious death
- `claim:olaf:core:03` → Winter's Claw association where sourced
- `claim:olaf:core:04` → Ruination/Sentinel role continuity-specific.

### Orianna — `orianna`

**Current state:** Tier C · `FULL_TIER_A_BUILD`
**Current blocker:** Minimal/incomplete profile: biography depth, continuity, atomic claims, trusted timeline, events and relations are insufficient.

**False / unsafe / must be removed, downgraded or kept pending**
- Do not merge classic transformation lore and ARCANE transformation into one chronology without explicit continuity reconciliation.

**Canonical information that must exist as sourced claims / bio facts**
- Piltover/Zaun woman whose body became mechanical over time in classic canon
- current Arcane-related revisions must be continuity-labeled and checked against current Riot bio.

**Exactly what Cursor must add / repair**
- Primary Riot bio: `https://www.leagueoflegends.com/en-us/champions/orianna/`
- Set continuity explicitly at champion, claim and timeline level.
- Create 3–5 internal bioBlocks: FACT / SUPPORTED_SYNTHESIS / EDITORIAL_FRAMING as appropriate.
- Turn each factual item above into one atomic claim only if a real Riot source supports that exact proposition.
- For each CORE claim create an evidenceRef/sourceFact derived from the actual source content; never validate using only evidenceNote or claim regex.
- Create 3–5 meaningful timeline beats where canon supports them. Every CORE beat needs trusted claimIds + sourceIds + evidenceRefs.
- Audit all DIRECT_CANON relationships. Shared region/faction/history remains STRUCTURAL_LORE unless explicit interaction/kinship is documented.
- Audit event links with exact EventRelationRole. PARTICIPANT requires trusted PARTICIPATED_IN evidence for that exact event.
- Recompute Tier A. Never flip reviewed/verified flags just to pass the gate.

**Suggested atomic-claim queue**
- `claim:orianna:core:01` → Piltover/Zaun woman whose body became mechanical over time in classic canon
- `claim:orianna:core:02` → current Arcane-related revisions must be continuity-labeled and checked against current Riot bio.

### Ornn — `ornn`

**Current state:** Tier C · `FULL_TIER_A_BUILD`
**Current blocker:** Minimal/incomplete profile: biography depth, continuity, atomic claims, trusted timeline, events and relations are insufficient.

**False / unsafe / must be removed, downgraded or kept pending**
- No specific contradiction confirmed in this pass; treat every unsourced existing statement as UNVERIFIED until checked against a real Riot source.

**Canonical information that must exist as sourced claims / bio facts**
- Freljordian forge demigod
- sibling/rival mythology with Volibear/Anivia
- hearth-home followers and Volibear conflict where sourced
- folktales labeled as such.

**Exactly what Cursor must add / repair**
- Primary Riot bio: `https://www.leagueoflegends.com/en-us/champions/ornn/`
- Set continuity explicitly at champion, claim and timeline level.
- Create 3–5 internal bioBlocks: FACT / SUPPORTED_SYNTHESIS / EDITORIAL_FRAMING as appropriate.
- Turn each factual item above into one atomic claim only if a real Riot source supports that exact proposition.
- For each CORE claim create an evidenceRef/sourceFact derived from the actual source content; never validate using only evidenceNote or claim regex.
- Create 3–5 meaningful timeline beats where canon supports them. Every CORE beat needs trusted claimIds + sourceIds + evidenceRefs.
- Audit all DIRECT_CANON relationships. Shared region/faction/history remains STRUCTURAL_LORE unless explicit interaction/kinship is documented.
- Audit event links with exact EventRelationRole. PARTICIPANT requires trusted PARTICIPATED_IN evidence for that exact event.
- Recompute Tier A. Never flip reviewed/verified flags just to pass the gate.

**Suggested atomic-claim queue**
- `claim:ornn:core:01` → Freljordian forge demigod
- `claim:ornn:core:02` → sibling/rival mythology with Volibear/Anivia
- `claim:ornn:core:03` → hearth-home followers and Volibear conflict where sourced
- `claim:ornn:core:04` → folktales labeled as such.

### Pantheon — `pantheon`

**Current state:** Tier B · `PHASE1_REVALIDATE`
**Current blocker:** reviewCoverage 88 < 90

**False / unsafe / must be removed, downgraded or kept pending**
- Modern Atreus must never be inserted into ancient Darkin War events; use the ancient Aspect of War as a separate entity.

**Canonical information that must exist as sourced claims / bio facts**
- Atreus is mortal Rakkor
- host of Aspect of War
- Aatrox destroyed the celestial Aspect, not Atreus
- Atreus survived and wields weapons by mortal will
- ancient Aspect separate entity.

**Exactly what Cursor must add / repair**
- Primary Riot bio: `https://www.leagueoflegends.com/en-us/champions/pantheon/`
- Set continuity explicitly at champion, claim and timeline level.
- Create 3–5 internal bioBlocks: FACT / SUPPORTED_SYNTHESIS / EDITORIAL_FRAMING as appropriate.
- Turn each factual item above into one atomic claim only if a real Riot source supports that exact proposition.
- For each CORE claim create an evidenceRef/sourceFact derived from the actual source content; never validate using only evidenceNote or claim regex.
- Create 3–5 meaningful timeline beats where canon supports them. Every CORE beat needs trusted claimIds + sourceIds + evidenceRefs.
- Audit all DIRECT_CANON relationships. Shared region/faction/history remains STRUCTURAL_LORE unless explicit interaction/kinship is documented.
- Audit event links with exact EventRelationRole. PARTICIPANT requires trusted PARTICIPATED_IN evidence for that exact event.
- Recompute Tier A. Never flip reviewed/verified flags just to pass the gate.

**Suggested atomic-claim queue**
- `claim:pantheon:core:01` → Atreus is mortal Rakkor
- `claim:pantheon:core:02` → host of Aspect of War
- `claim:pantheon:core:03` → Aatrox destroyed the celestial Aspect, not Atreus
- `claim:pantheon:core:04` → Atreus survived and wields weapons by mortal will
- `claim:pantheon:core:05` → ancient Aspect separate entity.

### Poppy — `poppy`

**Current state:** Tier C · `FULL_TIER_A_BUILD`
**Current blocker:** Minimal/incomplete profile: biography depth, continuity, atomic claims, trusted timeline, events and relations are insufficient.

**False / unsafe / must be removed, downgraded or kept pending**
- No specific contradiction confirmed in this pass; treat every unsourced existing statement as UNVERIFIED until checked against a real Riot source.

**Canonical information that must exist as sourced claims / bio facts**
- Yordle carrying Orlon's legendary hammer
- searches for Hero of Demacia
- long-lived witness to founding era
- no formal rule/command unless sourced.

**Exactly what Cursor must add / repair**
- Primary Riot bio: `https://www.leagueoflegends.com/en-us/champions/poppy/`
- Set continuity explicitly at champion, claim and timeline level.
- Create 3–5 internal bioBlocks: FACT / SUPPORTED_SYNTHESIS / EDITORIAL_FRAMING as appropriate.
- Turn each factual item above into one atomic claim only if a real Riot source supports that exact proposition.
- For each CORE claim create an evidenceRef/sourceFact derived from the actual source content; never validate using only evidenceNote or claim regex.
- Create 3–5 meaningful timeline beats where canon supports them. Every CORE beat needs trusted claimIds + sourceIds + evidenceRefs.
- Audit all DIRECT_CANON relationships. Shared region/faction/history remains STRUCTURAL_LORE unless explicit interaction/kinship is documented.
- Audit event links with exact EventRelationRole. PARTICIPANT requires trusted PARTICIPATED_IN evidence for that exact event.
- Recompute Tier A. Never flip reviewed/verified flags just to pass the gate.

**Suggested atomic-claim queue**
- `claim:poppy:core:01` → Yordle carrying Orlon's legendary hammer
- `claim:poppy:core:02` → searches for Hero of Demacia
- `claim:poppy:core:03` → long-lived witness to founding era
- `claim:poppy:core:04` → no formal rule/command unless sourced.

### Pyke — `pyke`

**Current state:** Tier C · `FULL_TIER_A_BUILD`
**Current blocker:** Minimal/incomplete profile: biography depth, continuity, atomic claims, trusted timeline, events and relations are insufficient.

**False / unsafe / must be removed, downgraded or kept pending**
- No specific contradiction confirmed in this pass; treat every unsourced existing statement as UNVERIFIED until checked against a real Riot source.

**Canonical information that must exist as sourced claims / bio facts**
- Bilgewater harpooner abandoned during monster hunt
- returned altered with magical list
- unreliable memories
- Sentinel role from exact Ruination source.

**Exactly what Cursor must add / repair**
- Primary Riot bio: `https://www.leagueoflegends.com/en-us/champions/pyke/`
- Set continuity explicitly at champion, claim and timeline level.
- Create 3–5 internal bioBlocks: FACT / SUPPORTED_SYNTHESIS / EDITORIAL_FRAMING as appropriate.
- Turn each factual item above into one atomic claim only if a real Riot source supports that exact proposition.
- For each CORE claim create an evidenceRef/sourceFact derived from the actual source content; never validate using only evidenceNote or claim regex.
- Create 3–5 meaningful timeline beats where canon supports them. Every CORE beat needs trusted claimIds + sourceIds + evidenceRefs.
- Audit all DIRECT_CANON relationships. Shared region/faction/history remains STRUCTURAL_LORE unless explicit interaction/kinship is documented.
- Audit event links with exact EventRelationRole. PARTICIPANT requires trusted PARTICIPATED_IN evidence for that exact event.
- Recompute Tier A. Never flip reviewed/verified flags just to pass the gate.

**Suggested atomic-claim queue**
- `claim:pyke:core:01` → Bilgewater harpooner abandoned during monster hunt
- `claim:pyke:core:02` → returned altered with magical list
- `claim:pyke:core:03` → unreliable memories
- `claim:pyke:core:04` → Sentinel role from exact Ruination source.

### Qiyana — `qiyana`

**Current state:** Tier C · `FULL_TIER_A_BUILD`
**Current blocker:** Minimal/incomplete profile: biography depth, continuity, atomic claims, trusted timeline, events and relations are insufficient.

**False / unsafe / must be removed, downgraded or kept pending**
- No specific contradiction confirmed in this pass; treat every unsourced existing statement as UNVERIFIED until checked against a real Riot source.

**Canonical information that must exist as sourced claims / bio facts**
- Ixtali royal/Yun Tal prodigy
- many royal siblings
- elemental master
- seeks throne/recognition
- distinguish royal family from Yun Tal caste nuances.

**Exactly what Cursor must add / repair**
- Primary Riot bio: `https://www.leagueoflegends.com/en-us/champions/qiyana/`
- Set continuity explicitly at champion, claim and timeline level.
- Create 3–5 internal bioBlocks: FACT / SUPPORTED_SYNTHESIS / EDITORIAL_FRAMING as appropriate.
- Turn each factual item above into one atomic claim only if a real Riot source supports that exact proposition.
- For each CORE claim create an evidenceRef/sourceFact derived from the actual source content; never validate using only evidenceNote or claim regex.
- Create 3–5 meaningful timeline beats where canon supports them. Every CORE beat needs trusted claimIds + sourceIds + evidenceRefs.
- Audit all DIRECT_CANON relationships. Shared region/faction/history remains STRUCTURAL_LORE unless explicit interaction/kinship is documented.
- Audit event links with exact EventRelationRole. PARTICIPANT requires trusted PARTICIPATED_IN evidence for that exact event.
- Recompute Tier A. Never flip reviewed/verified flags just to pass the gate.

**Suggested atomic-claim queue**
- `claim:qiyana:core:01` → Ixtali royal/Yun Tal prodigy
- `claim:qiyana:core:02` → many royal siblings
- `claim:qiyana:core:03` → elemental master
- `claim:qiyana:core:04` → seeks throne/recognition
- `claim:qiyana:core:05` → distinguish royal family from Yun Tal caste nuances.

### Quinn — `quinn`

**Current state:** Tier C · `FULL_TIER_A_BUILD`
**Current blocker:** Minimal/incomplete profile: biography depth, continuity, atomic claims, trusted timeline, events and relations are insufficient.

**False / unsafe / must be removed, downgraded or kept pending**
- No specific contradiction confirmed in this pass; treat every unsourced existing statement as UNVERIFIED until checked against a real Riot source.

**Canonical information that must exist as sourced claims / bio facts**
- Demacian ranger/scout
- Valor partner
- twin brother Caleb's death core
- serves Demacia beyond front lines.

**Exactly what Cursor must add / repair**
- Primary Riot bio: `https://www.leagueoflegends.com/en-us/champions/quinn/`
- Set continuity explicitly at champion, claim and timeline level.
- Create 3–5 internal bioBlocks: FACT / SUPPORTED_SYNTHESIS / EDITORIAL_FRAMING as appropriate.
- Turn each factual item above into one atomic claim only if a real Riot source supports that exact proposition.
- For each CORE claim create an evidenceRef/sourceFact derived from the actual source content; never validate using only evidenceNote or claim regex.
- Create 3–5 meaningful timeline beats where canon supports them. Every CORE beat needs trusted claimIds + sourceIds + evidenceRefs.
- Audit all DIRECT_CANON relationships. Shared region/faction/history remains STRUCTURAL_LORE unless explicit interaction/kinship is documented.
- Audit event links with exact EventRelationRole. PARTICIPANT requires trusted PARTICIPATED_IN evidence for that exact event.
- Recompute Tier A. Never flip reviewed/verified flags just to pass the gate.

**Suggested atomic-claim queue**
- `claim:quinn:core:01` → Demacian ranger/scout
- `claim:quinn:core:02` → Valor partner
- `claim:quinn:core:03` → twin brother Caleb's death core
- `claim:quinn:core:04` → serves Demacia beyond front lines.

### Rakan — `rakan`

**Current state:** Tier C · `FULL_TIER_A_BUILD`
**Current blocker:** Minimal/incomplete profile: biography depth, continuity, atomic claims, trusted timeline, events and relations are insufficient.

**False / unsafe / must be removed, downgraded or kept pending**
- No specific contradiction confirmed in this pass; treat every unsourced existing statement as UNVERIFIED until checked against a real Riot source.

**Canonical information that must exist as sourced claims / bio facts**
- Vastayan battle-dancer
- lover/partner of Xayah
- fights for vastayan freedom
- Xayah direct, other Ionia links mostly structural.

**Exactly what Cursor must add / repair**
- Primary Riot bio: `https://www.leagueoflegends.com/en-us/champions/rakan/`
- Set continuity explicitly at champion, claim and timeline level.
- Create 3–5 internal bioBlocks: FACT / SUPPORTED_SYNTHESIS / EDITORIAL_FRAMING as appropriate.
- Turn each factual item above into one atomic claim only if a real Riot source supports that exact proposition.
- For each CORE claim create an evidenceRef/sourceFact derived from the actual source content; never validate using only evidenceNote or claim regex.
- Create 3–5 meaningful timeline beats where canon supports them. Every CORE beat needs trusted claimIds + sourceIds + evidenceRefs.
- Audit all DIRECT_CANON relationships. Shared region/faction/history remains STRUCTURAL_LORE unless explicit interaction/kinship is documented.
- Audit event links with exact EventRelationRole. PARTICIPANT requires trusted PARTICIPATED_IN evidence for that exact event.
- Recompute Tier A. Never flip reviewed/verified flags just to pass the gate.

**Suggested atomic-claim queue**
- `claim:rakan:core:01` → Vastayan battle-dancer
- `claim:rakan:core:02` → lover/partner of Xayah
- `claim:rakan:core:03` → fights for vastayan freedom
- `claim:rakan:core:04` → Xayah direct, other Ionia links mostly structural.

### Rammus — `rammus`

**Current state:** Tier C · `FULL_TIER_A_BUILD`
**Current blocker:** Minimal/incomplete profile: biography depth, continuity, atomic claims, trusted timeline, events and relations are insufficient.

**False / unsafe / must be removed, downgraded or kept pending**
- Do not promote folk theories about Rammus's identity to canon fact.

**Canonical information that must exist as sourced claims / bio facts**
- Mysterious Shuriman armordillo-like being
- contradictory folk beliefs
- real identity intentionally unclear
- do not verify legends as fact.

**Exactly what Cursor must add / repair**
- Primary Riot bio: `https://www.leagueoflegends.com/en-us/champions/rammus/`
- Set continuity explicitly at champion, claim and timeline level.
- Create 3–5 internal bioBlocks: FACT / SUPPORTED_SYNTHESIS / EDITORIAL_FRAMING as appropriate.
- Turn each factual item above into one atomic claim only if a real Riot source supports that exact proposition.
- For each CORE claim create an evidenceRef/sourceFact derived from the actual source content; never validate using only evidenceNote or claim regex.
- Create 3–5 meaningful timeline beats where canon supports them. Every CORE beat needs trusted claimIds + sourceIds + evidenceRefs.
- Audit all DIRECT_CANON relationships. Shared region/faction/history remains STRUCTURAL_LORE unless explicit interaction/kinship is documented.
- Audit event links with exact EventRelationRole. PARTICIPANT requires trusted PARTICIPATED_IN evidence for that exact event.
- Recompute Tier A. Never flip reviewed/verified flags just to pass the gate.

**Suggested atomic-claim queue**
- `claim:rammus:core:01` → Mysterious Shuriman armordillo-like being
- `claim:rammus:core:02` → contradictory folk beliefs
- `claim:rammus:core:03` → real identity intentionally unclear
- `claim:rammus:core:04` → do not verify legends as fact.

### Rek'Sai — `reksai`

**Current state:** Tier C · `FULL_TIER_A_BUILD`
**Current blocker:** Minimal/incomplete profile: biography depth, continuity, atomic claims, trusted timeline, events and relations are insufficient.

**False / unsafe / must be removed, downgraded or kept pending**
- No specific contradiction confirmed in this pass; treat every unsourced existing statement as UNVERIFIED until checked against a real Riot source.

**Canonical information that must exist as sourced claims / bio facts**
- Voidborn matriarch/queen of Xer'Sai
- burrows under Shuriman desert
- territorial predator
- no automatic Bel'Veth/Watcher allegiance.

**Exactly what Cursor must add / repair**
- Primary Riot bio: `https://www.leagueoflegends.com/en-us/champions/reksai/`
- Set continuity explicitly at champion, claim and timeline level.
- Create 3–5 internal bioBlocks: FACT / SUPPORTED_SYNTHESIS / EDITORIAL_FRAMING as appropriate.
- Turn each factual item above into one atomic claim only if a real Riot source supports that exact proposition.
- For each CORE claim create an evidenceRef/sourceFact derived from the actual source content; never validate using only evidenceNote or claim regex.
- Create 3–5 meaningful timeline beats where canon supports them. Every CORE beat needs trusted claimIds + sourceIds + evidenceRefs.
- Audit all DIRECT_CANON relationships. Shared region/faction/history remains STRUCTURAL_LORE unless explicit interaction/kinship is documented.
- Audit event links with exact EventRelationRole. PARTICIPANT requires trusted PARTICIPATED_IN evidence for that exact event.
- Recompute Tier A. Never flip reviewed/verified flags just to pass the gate.

**Suggested atomic-claim queue**
- `claim:reksai:core:01` → Voidborn matriarch/queen of Xer'Sai
- `claim:reksai:core:02` → burrows under Shuriman desert
- `claim:reksai:core:03` → territorial predator
- `claim:reksai:core:04` → no automatic Bel'Veth/Watcher allegiance.

### Rell — `rell`

**Current state:** Tier C · `FULL_TIER_A_BUILD`
**Current blocker:** Minimal/incomplete profile: biography depth, continuity, atomic claims, trusted timeline, events and relations are insufficient.

**False / unsafe / must be removed, downgraded or kept pending**
- No specific contradiction confirmed in this pass; treat every unsourced existing statement as UNVERIFIED until checked against a real Riot source.

**Canonical information that must exist as sourced claims / bio facts**
- Noxian ferromancer
- Black Rose academy weaponized/abused her and other children
- escaped and attacks Noxian/Black Rose interests
- anti-Mordekaiser purpose only if sourced.

**Exactly what Cursor must add / repair**
- Primary Riot bio: `https://www.leagueoflegends.com/en-us/champions/rell/`
- Set continuity explicitly at champion, claim and timeline level.
- Create 3–5 internal bioBlocks: FACT / SUPPORTED_SYNTHESIS / EDITORIAL_FRAMING as appropriate.
- Turn each factual item above into one atomic claim only if a real Riot source supports that exact proposition.
- For each CORE claim create an evidenceRef/sourceFact derived from the actual source content; never validate using only evidenceNote or claim regex.
- Create 3–5 meaningful timeline beats where canon supports them. Every CORE beat needs trusted claimIds + sourceIds + evidenceRefs.
- Audit all DIRECT_CANON relationships. Shared region/faction/history remains STRUCTURAL_LORE unless explicit interaction/kinship is documented.
- Audit event links with exact EventRelationRole. PARTICIPANT requires trusted PARTICIPATED_IN evidence for that exact event.
- Recompute Tier A. Never flip reviewed/verified flags just to pass the gate.

**Suggested atomic-claim queue**
- `claim:rell:core:01` → Noxian ferromancer
- `claim:rell:core:02` → Black Rose academy weaponized/abused her and other children
- `claim:rell:core:03` → escaped and attacks Noxian/Black Rose interests
- `claim:rell:core:04` → anti-Mordekaiser purpose only if sourced.

### Renata Glasc — `renata-glasc`

**Current state:** Tier C · `FULL_TIER_A_BUILD`
**Current blocker:** Minimal/incomplete profile: biography depth, continuity, atomic claims, trusted timeline, events and relations are insufficient.

**False / unsafe / must be removed, downgraded or kept pending**
- No specific contradiction confirmed in this pass; treat every unsourced existing statement as UNVERIFIED until checked against a real Riot source.

**Canonical information that must exist as sourced claims / bio facts**
- Zaunite chem-baron/industrialist
- built Glasc empire via products/leverage
- seeks control over Piltover/Zaun
- no Arcane events unless official.

**Exactly what Cursor must add / repair**
- Primary Riot bio: `https://www.leagueoflegends.com/en-us/champions/renata-glasc/`
- Set continuity explicitly at champion, claim and timeline level.
- Create 3–5 internal bioBlocks: FACT / SUPPORTED_SYNTHESIS / EDITORIAL_FRAMING as appropriate.
- Turn each factual item above into one atomic claim only if a real Riot source supports that exact proposition.
- For each CORE claim create an evidenceRef/sourceFact derived from the actual source content; never validate using only evidenceNote or claim regex.
- Create 3–5 meaningful timeline beats where canon supports them. Every CORE beat needs trusted claimIds + sourceIds + evidenceRefs.
- Audit all DIRECT_CANON relationships. Shared region/faction/history remains STRUCTURAL_LORE unless explicit interaction/kinship is documented.
- Audit event links with exact EventRelationRole. PARTICIPANT requires trusted PARTICIPATED_IN evidence for that exact event.
- Recompute Tier A. Never flip reviewed/verified flags just to pass the gate.

**Suggested atomic-claim queue**
- `claim:renata-glasc:core:01` → Zaunite chem-baron/industrialist
- `claim:renata-glasc:core:02` → built Glasc empire via products/leverage
- `claim:renata-glasc:core:03` → seeks control over Piltover/Zaun
- `claim:renata-glasc:core:04` → no Arcane events unless official.

### Renekton — `renekton`

**Current state:** Tier B · `PHASE1_REVALIDATE`
**Current blocker:** canonConfidence 70 < 85

**False / unsafe / must be removed, downgraded or kept pending**
- Do not infer Void War participation from being an ancient Ascended.

**Canonical information that must exist as sourced claims / bio facts**
- Shuriman Ascended
- brother of Nasus
- sealed with Xerath
- manipulated by Xerath
- returned enraged
- Void War participation remains untrusted without exact source.

**Exactly what Cursor must add / repair**
- Primary Riot bio: `https://www.leagueoflegends.com/en-us/champions/renekton/`
- Set continuity explicitly at champion, claim and timeline level.
- Create 3–5 internal bioBlocks: FACT / SUPPORTED_SYNTHESIS / EDITORIAL_FRAMING as appropriate.
- Turn each factual item above into one atomic claim only if a real Riot source supports that exact proposition.
- For each CORE claim create an evidenceRef/sourceFact derived from the actual source content; never validate using only evidenceNote or claim regex.
- Create 3–5 meaningful timeline beats where canon supports them. Every CORE beat needs trusted claimIds + sourceIds + evidenceRefs.
- Audit all DIRECT_CANON relationships. Shared region/faction/history remains STRUCTURAL_LORE unless explicit interaction/kinship is documented.
- Audit event links with exact EventRelationRole. PARTICIPANT requires trusted PARTICIPATED_IN evidence for that exact event.
- Recompute Tier A. Never flip reviewed/verified flags just to pass the gate.

**Suggested atomic-claim queue**
- `claim:renekton:core:01` → Shuriman Ascended
- `claim:renekton:core:02` → brother of Nasus
- `claim:renekton:core:03` → sealed with Xerath
- `claim:renekton:core:04` → manipulated by Xerath
- `claim:renekton:core:05` → returned enraged
- `claim:renekton:core:06` → Void War participation remains untrusted without exact source.

### Rengar — `rengar`

**Current state:** Tier C · `FULL_TIER_A_BUILD`
**Current blocker:** Minimal/incomplete profile: biography depth, continuity, atomic claims, trusted timeline, events and relations are insufficient.

**False / unsafe / must be removed, downgraded or kept pending**
- No specific contradiction confirmed in this pass; treat every unsourced existing statement as UNVERIFIED until checked against a real Riot source.

**Canonical information that must exist as sourced claims / bio facts**
- Kiilash hunter seeking worthy prey
- Kha'Zix rivalry explicit
- no Ixtali political role unless sourced.

**Exactly what Cursor must add / repair**
- Primary Riot bio: `https://www.leagueoflegends.com/en-us/champions/rengar/`
- Set continuity explicitly at champion, claim and timeline level.
- Create 3–5 internal bioBlocks: FACT / SUPPORTED_SYNTHESIS / EDITORIAL_FRAMING as appropriate.
- Turn each factual item above into one atomic claim only if a real Riot source supports that exact proposition.
- For each CORE claim create an evidenceRef/sourceFact derived from the actual source content; never validate using only evidenceNote or claim regex.
- Create 3–5 meaningful timeline beats where canon supports them. Every CORE beat needs trusted claimIds + sourceIds + evidenceRefs.
- Audit all DIRECT_CANON relationships. Shared region/faction/history remains STRUCTURAL_LORE unless explicit interaction/kinship is documented.
- Audit event links with exact EventRelationRole. PARTICIPANT requires trusted PARTICIPATED_IN evidence for that exact event.
- Recompute Tier A. Never flip reviewed/verified flags just to pass the gate.

**Suggested atomic-claim queue**
- `claim:rengar:core:01` → Kiilash hunter seeking worthy prey
- `claim:rengar:core:02` → Kha'Zix rivalry explicit
- `claim:rengar:core:03` → no Ixtali political role unless sourced.

### Riven — `riven`

**Current state:** Tier C · `CURATED_PROVENANCE_GAP`
**Current blocker:** Existing curated profile lacks enough exact source-backed claims/timeline/continuity coverage for Tier A.

**False / unsafe / must be removed, downgraded or kept pending**
- No specific contradiction confirmed in this pass; treat every unsourced existing statement as UNVERIFIED until checked against a real Riot source.

**Canonical information that must exist as sourced claims / bio facts**
- Noxian soldier in Ionian invasion
- disillusioned by war/chemical attack
- broke sword and remained in Ionia
- Yasuo accusation/exoneration and later capture sourced precisely.

**Exactly what Cursor must add / repair**
- Primary Riot bio: `https://www.leagueoflegends.com/en-us/champions/riven/`
- Set continuity explicitly at champion, claim and timeline level.
- Create 3–5 internal bioBlocks: FACT / SUPPORTED_SYNTHESIS / EDITORIAL_FRAMING as appropriate.
- Turn each factual item above into one atomic claim only if a real Riot source supports that exact proposition.
- For each CORE claim create an evidenceRef/sourceFact derived from the actual source content; never validate using only evidenceNote or claim regex.
- Create 3–5 meaningful timeline beats where canon supports them. Every CORE beat needs trusted claimIds + sourceIds + evidenceRefs.
- Audit all DIRECT_CANON relationships. Shared region/faction/history remains STRUCTURAL_LORE unless explicit interaction/kinship is documented.
- Audit event links with exact EventRelationRole. PARTICIPANT requires trusted PARTICIPATED_IN evidence for that exact event.
- Recompute Tier A. Never flip reviewed/verified flags just to pass the gate.

**Suggested atomic-claim queue**
- `claim:riven:core:01` → Noxian soldier in Ionian invasion
- `claim:riven:core:02` → disillusioned by war/chemical attack
- `claim:riven:core:03` → broke sword and remained in Ionia
- `claim:riven:core:04` → Yasuo accusation/exoneration and later capture sourced precisely.

### Rumble — `rumble`

**Current state:** Tier C · `FULL_TIER_A_BUILD`
**Current blocker:** Minimal/incomplete profile: biography depth, continuity, atomic claims, trusted timeline, events and relations are insufficient.

**False / unsafe / must be removed, downgraded or kept pending**
- No specific contradiction confirmed in this pass; treat every unsourced existing statement as UNVERIFIED until checked against a real Riot source.

**Canonical information that must exist as sourced claims / bio facts**
- Yordle inventor
- builds mech Tristy
- Bandle/yordle tech context
- no Piltover/Zaun citizenship unless current source says so.

**Exactly what Cursor must add / repair**
- Primary Riot bio: `https://www.leagueoflegends.com/en-us/champions/rumble/`
- Set continuity explicitly at champion, claim and timeline level.
- Create 3–5 internal bioBlocks: FACT / SUPPORTED_SYNTHESIS / EDITORIAL_FRAMING as appropriate.
- Turn each factual item above into one atomic claim only if a real Riot source supports that exact proposition.
- For each CORE claim create an evidenceRef/sourceFact derived from the actual source content; never validate using only evidenceNote or claim regex.
- Create 3–5 meaningful timeline beats where canon supports them. Every CORE beat needs trusted claimIds + sourceIds + evidenceRefs.
- Audit all DIRECT_CANON relationships. Shared region/faction/history remains STRUCTURAL_LORE unless explicit interaction/kinship is documented.
- Audit event links with exact EventRelationRole. PARTICIPANT requires trusted PARTICIPATED_IN evidence for that exact event.
- Recompute Tier A. Never flip reviewed/verified flags just to pass the gate.

**Suggested atomic-claim queue**
- `claim:rumble:core:01` → Yordle inventor
- `claim:rumble:core:02` → builds mech Tristy
- `claim:rumble:core:03` → Bandle/yordle tech context
- `claim:rumble:core:04` → no Piltover/Zaun citizenship unless current source says so.

### Ryze — `ryze`

**Current state:** Tier C · `CURATED_PROVENANCE_GAP`
**Current blocker:** Existing curated profile lacks enough exact source-backed claims/timeline/continuity coverage for Tier A.

**False / unsafe / must be removed, downgraded or kept pending**
- No specific contradiction confirmed in this pass; treat every unsourced existing statement as UNVERIFIED until checked against a real Riot source.

**Canonical information that must exist as sourced claims / bio facts**
- Ancient wandering mage
- guards World Runes after Rune Wars
- ties to Tyrus/Brand where sourced
- no fabricated direct Mordekaiser rivalry from thematic contrast.

**Exactly what Cursor must add / repair**
- Primary Riot bio: `https://www.leagueoflegends.com/en-us/champions/ryze/`
- Set continuity explicitly at champion, claim and timeline level.
- Create 3–5 internal bioBlocks: FACT / SUPPORTED_SYNTHESIS / EDITORIAL_FRAMING as appropriate.
- Turn each factual item above into one atomic claim only if a real Riot source supports that exact proposition.
- For each CORE claim create an evidenceRef/sourceFact derived from the actual source content; never validate using only evidenceNote or claim regex.
- Create 3–5 meaningful timeline beats where canon supports them. Every CORE beat needs trusted claimIds + sourceIds + evidenceRefs.
- Audit all DIRECT_CANON relationships. Shared region/faction/history remains STRUCTURAL_LORE unless explicit interaction/kinship is documented.
- Audit event links with exact EventRelationRole. PARTICIPANT requires trusted PARTICIPATED_IN evidence for that exact event.
- Recompute Tier A. Never flip reviewed/verified flags just to pass the gate.

**Suggested atomic-claim queue**
- `claim:ryze:core:01` → Ancient wandering mage
- `claim:ryze:core:02` → guards World Runes after Rune Wars
- `claim:ryze:core:03` → ties to Tyrus/Brand where sourced
- `claim:ryze:core:04` → no fabricated direct Mordekaiser rivalry from thematic contrast.

### Samira — `samira`

**Current state:** Tier C · `FULL_TIER_A_BUILD`
**Current blocker:** Minimal/incomplete profile: biography depth, continuity, atomic claims, trusted timeline, events and relations are insufficient.

**False / unsafe / must be removed, downgraded or kept pending**
- No specific contradiction confirmed in this pass; treat every unsourced existing statement as UNVERIFIED until checked against a real Riot source.

**Canonical information that must exist as sourced claims / bio facts**
- Shuriman-born refugee raised in Noxus
- mercenary/agent taking dangerous jobs
- lost home to conflict
- no assumed command rank.

**Exactly what Cursor must add / repair**
- Primary Riot bio: `https://www.leagueoflegends.com/en-us/champions/samira/`
- Set continuity explicitly at champion, claim and timeline level.
- Create 3–5 internal bioBlocks: FACT / SUPPORTED_SYNTHESIS / EDITORIAL_FRAMING as appropriate.
- Turn each factual item above into one atomic claim only if a real Riot source supports that exact proposition.
- For each CORE claim create an evidenceRef/sourceFact derived from the actual source content; never validate using only evidenceNote or claim regex.
- Create 3–5 meaningful timeline beats where canon supports them. Every CORE beat needs trusted claimIds + sourceIds + evidenceRefs.
- Audit all DIRECT_CANON relationships. Shared region/faction/history remains STRUCTURAL_LORE unless explicit interaction/kinship is documented.
- Audit event links with exact EventRelationRole. PARTICIPANT requires trusted PARTICIPATED_IN evidence for that exact event.
- Recompute Tier A. Never flip reviewed/verified flags just to pass the gate.

**Suggested atomic-claim queue**
- `claim:samira:core:01` → Shuriman-born refugee raised in Noxus
- `claim:samira:core:02` → mercenary/agent taking dangerous jobs
- `claim:samira:core:03` → lost home to conflict
- `claim:samira:core:04` → no assumed command rank.

### Sejuani — `sejuani`

**Current state:** Tier C · `FULL_TIER_A_BUILD`
**Current blocker:** Minimal/incomplete profile: biography depth, continuity, atomic claims, trusted timeline, events and relations are insufficient.

**False / unsafe / must be removed, downgraded or kept pending**
- No specific contradiction confirmed in this pass; treat every unsourced existing statement as UNVERIFIED until checked against a real Riot source.

**Canonical information that must exist as sourced claims / bio facts**
- Warmother of Winter's Claw
- Iceborn
- political rival/counterpoint to Ashe
- Udyr relation where current canon supports.

**Exactly what Cursor must add / repair**
- Primary Riot bio: `https://www.leagueoflegends.com/en-us/champions/sejuani/`
- Set continuity explicitly at champion, claim and timeline level.
- Create 3–5 internal bioBlocks: FACT / SUPPORTED_SYNTHESIS / EDITORIAL_FRAMING as appropriate.
- Turn each factual item above into one atomic claim only if a real Riot source supports that exact proposition.
- For each CORE claim create an evidenceRef/sourceFact derived from the actual source content; never validate using only evidenceNote or claim regex.
- Create 3–5 meaningful timeline beats where canon supports them. Every CORE beat needs trusted claimIds + sourceIds + evidenceRefs.
- Audit all DIRECT_CANON relationships. Shared region/faction/history remains STRUCTURAL_LORE unless explicit interaction/kinship is documented.
- Audit event links with exact EventRelationRole. PARTICIPANT requires trusted PARTICIPATED_IN evidence for that exact event.
- Recompute Tier A. Never flip reviewed/verified flags just to pass the gate.

**Suggested atomic-claim queue**
- `claim:sejuani:core:01` → Warmother of Winter's Claw
- `claim:sejuani:core:02` → Iceborn
- `claim:sejuani:core:03` → political rival/counterpoint to Ashe
- `claim:sejuani:core:04` → Udyr relation where current canon supports.

### Senna — `senna`

**Current state:** Tier C · `CURATED_PROVENANCE_GAP`
**Current blocker:** Existing curated profile lacks enough exact source-backed claims/timeline/continuity coverage for Tier A.

**False / unsafe / must be removed, downgraded or kept pending**
- No specific contradiction confirmed in this pass; treat every unsourced existing statement as UNVERIFIED until checked against a real Riot source.

**Canonical information that must exist as sourced claims / bio facts**
- Sentinel of Light
- partner/wife of Lucian
- soul trapped by Thresh then returned
- carries/uses Black Mist power against threat
- Ruination direct.

**Exactly what Cursor must add / repair**
- Primary Riot bio: `https://www.leagueoflegends.com/en-us/champions/senna/`
- Set continuity explicitly at champion, claim and timeline level.
- Create 3–5 internal bioBlocks: FACT / SUPPORTED_SYNTHESIS / EDITORIAL_FRAMING as appropriate.
- Turn each factual item above into one atomic claim only if a real Riot source supports that exact proposition.
- For each CORE claim create an evidenceRef/sourceFact derived from the actual source content; never validate using only evidenceNote or claim regex.
- Create 3–5 meaningful timeline beats where canon supports them. Every CORE beat needs trusted claimIds + sourceIds + evidenceRefs.
- Audit all DIRECT_CANON relationships. Shared region/faction/history remains STRUCTURAL_LORE unless explicit interaction/kinship is documented.
- Audit event links with exact EventRelationRole. PARTICIPANT requires trusted PARTICIPATED_IN evidence for that exact event.
- Recompute Tier A. Never flip reviewed/verified flags just to pass the gate.

**Suggested atomic-claim queue**
- `claim:senna:core:01` → Sentinel of Light
- `claim:senna:core:02` → partner/wife of Lucian
- `claim:senna:core:03` → soul trapped by Thresh then returned
- `claim:senna:core:04` → carries/uses Black Mist power against threat
- `claim:senna:core:05` → Ruination direct.

### Seraphine — `seraphine`

**Current state:** Tier C · `FULL_TIER_A_BUILD`
**Current blocker:** Minimal/incomplete profile: biography depth, continuity, atomic claims, trusted timeline, events and relations are insufficient.

**False / unsafe / must be removed, downgraded or kept pending**
- Do not restore obsolete Brackern-soul implications without current-source support.

**Canonical information that must exist as sourced claims / bio facts**
- Piltover/Zaun singer with empathic magical hearing
- hextech stage tech in classic canon
- wants emotional bridge between cities
- old Brackern-soul implication must be current-source checked.

**Exactly what Cursor must add / repair**
- Primary Riot bio: `https://www.leagueoflegends.com/en-us/champions/seraphine/`
- Set continuity explicitly at champion, claim and timeline level.
- Create 3–5 internal bioBlocks: FACT / SUPPORTED_SYNTHESIS / EDITORIAL_FRAMING as appropriate.
- Turn each factual item above into one atomic claim only if a real Riot source supports that exact proposition.
- For each CORE claim create an evidenceRef/sourceFact derived from the actual source content; never validate using only evidenceNote or claim regex.
- Create 3–5 meaningful timeline beats where canon supports them. Every CORE beat needs trusted claimIds + sourceIds + evidenceRefs.
- Audit all DIRECT_CANON relationships. Shared region/faction/history remains STRUCTURAL_LORE unless explicit interaction/kinship is documented.
- Audit event links with exact EventRelationRole. PARTICIPANT requires trusted PARTICIPATED_IN evidence for that exact event.
- Recompute Tier A. Never flip reviewed/verified flags just to pass the gate.

**Suggested atomic-claim queue**
- `claim:seraphine:core:01` → Piltover/Zaun singer with empathic magical hearing
- `claim:seraphine:core:02` → hextech stage tech in classic canon
- `claim:seraphine:core:03` → wants emotional bridge between cities
- `claim:seraphine:core:04` → old Brackern-soul implication must be current-source checked.

### Sett — `sett`

**Current state:** Tier C · `FULL_TIER_A_BUILD`
**Current blocker:** Minimal/incomplete profile: biography depth, continuity, atomic claims, trusted timeline, events and relations are insufficient.

**False / unsafe / must be removed, downgraded or kept pending**
- No specific contradiction confirmed in this pass; treat every unsourced existing statement as UNVERIFIED until checked against a real Riot source.

**Canonical information that must exist as sourced claims / bio facts**
- Ionian mixed vastaya-human heritage
- rose from pit fighter to arena boss
- mother/father family history core
- not Noxian state member because father Noxian.

**Exactly what Cursor must add / repair**
- Primary Riot bio: `https://www.leagueoflegends.com/en-us/champions/sett/`
- Set continuity explicitly at champion, claim and timeline level.
- Create 3–5 internal bioBlocks: FACT / SUPPORTED_SYNTHESIS / EDITORIAL_FRAMING as appropriate.
- Turn each factual item above into one atomic claim only if a real Riot source supports that exact proposition.
- For each CORE claim create an evidenceRef/sourceFact derived from the actual source content; never validate using only evidenceNote or claim regex.
- Create 3–5 meaningful timeline beats where canon supports them. Every CORE beat needs trusted claimIds + sourceIds + evidenceRefs.
- Audit all DIRECT_CANON relationships. Shared region/faction/history remains STRUCTURAL_LORE unless explicit interaction/kinship is documented.
- Audit event links with exact EventRelationRole. PARTICIPANT requires trusted PARTICIPATED_IN evidence for that exact event.
- Recompute Tier A. Never flip reviewed/verified flags just to pass the gate.

**Suggested atomic-claim queue**
- `claim:sett:core:01` → Ionian mixed vastaya-human heritage
- `claim:sett:core:02` → rose from pit fighter to arena boss
- `claim:sett:core:03` → mother/father family history core
- `claim:sett:core:04` → not Noxian state member because father Noxian.

### Shaco — `shaco`

**Current state:** Tier C · `FULL_TIER_A_BUILD`
**Current blocker:** Minimal/incomplete profile: biography depth, continuity, atomic claims, trusted timeline, events and relations are insufficient.

**False / unsafe / must be removed, downgraded or kept pending**
- Do not classify Shaco as a demon or invent a historical origin without current source support.

**Canonical information that must exist as sourced claims / bio facts**
- Mysterious enchanted marionette/jester in current short bio
- canon extremely sparse
- no demon classification/origin kingdom/direct relations without source.

**Exactly what Cursor must add / repair**
- Primary Riot bio: `https://www.leagueoflegends.com/en-us/champions/shaco/`
- Set continuity explicitly at champion, claim and timeline level.
- Create 3–5 internal bioBlocks: FACT / SUPPORTED_SYNTHESIS / EDITORIAL_FRAMING as appropriate.
- Turn each factual item above into one atomic claim only if a real Riot source supports that exact proposition.
- For each CORE claim create an evidenceRef/sourceFact derived from the actual source content; never validate using only evidenceNote or claim regex.
- Create 3–5 meaningful timeline beats where canon supports them. Every CORE beat needs trusted claimIds + sourceIds + evidenceRefs.
- Audit all DIRECT_CANON relationships. Shared region/faction/history remains STRUCTURAL_LORE unless explicit interaction/kinship is documented.
- Audit event links with exact EventRelationRole. PARTICIPANT requires trusted PARTICIPATED_IN evidence for that exact event.
- Recompute Tier A. Never flip reviewed/verified flags just to pass the gate.

**Suggested atomic-claim queue**
- `claim:shaco:core:01` → Mysterious enchanted marionette/jester in current short bio
- `claim:shaco:core:02` → canon extremely sparse
- `claim:shaco:core:03` → no demon classification/origin kingdom/direct relations without source.

### Shen — `shen`

**Current state:** Tier C · `CURATED_PROVENANCE_GAP`
**Current blocker:** Existing curated profile lacks enough exact source-backed claims/timeline/continuity coverage for Tier A.

**False / unsafe / must be removed, downgraded or kept pending**
- No specific contradiction confirmed in this pass; treat every unsourced existing statement as UNVERIFIED until checked against a real Riot source.

**Canonical information that must exist as sourced claims / bio facts**
- Eye of Twilight and Kinkou leader
- son of Kusho
- history with Zed
- mentor/leader relation to Akali/Kennen
- balances spirit/material realms.

**Exactly what Cursor must add / repair**
- Primary Riot bio: `https://www.leagueoflegends.com/en-us/champions/shen/`
- Set continuity explicitly at champion, claim and timeline level.
- Create 3–5 internal bioBlocks: FACT / SUPPORTED_SYNTHESIS / EDITORIAL_FRAMING as appropriate.
- Turn each factual item above into one atomic claim only if a real Riot source supports that exact proposition.
- For each CORE claim create an evidenceRef/sourceFact derived from the actual source content; never validate using only evidenceNote or claim regex.
- Create 3–5 meaningful timeline beats where canon supports them. Every CORE beat needs trusted claimIds + sourceIds + evidenceRefs.
- Audit all DIRECT_CANON relationships. Shared region/faction/history remains STRUCTURAL_LORE unless explicit interaction/kinship is documented.
- Audit event links with exact EventRelationRole. PARTICIPANT requires trusted PARTICIPATED_IN evidence for that exact event.
- Recompute Tier A. Never flip reviewed/verified flags just to pass the gate.

**Suggested atomic-claim queue**
- `claim:shen:core:01` → Eye of Twilight and Kinkou leader
- `claim:shen:core:02` → son of Kusho
- `claim:shen:core:03` → history with Zed
- `claim:shen:core:04` → mentor/leader relation to Akali/Kennen
- `claim:shen:core:05` → balances spirit/material realms.

### Shyvana — `shyvana`

**Current state:** Tier C · `FULL_TIER_A_BUILD`
**Current blocker:** Minimal/incomplete profile: biography depth, continuity, atomic claims, trusted timeline, events and relations are insufficient.

**False / unsafe / must be removed, downgraded or kept pending**
- No specific contradiction confirmed in this pass; treat every unsourced existing statement as UNVERIFIED until checked against a real Riot source.

**Canonical information that must exist as sourced claims / bio facts**
- Half-dragon/dragon-blooded Demacian ally
- saved/served Jarvan IV in classic canon
- faces prejudice
- current status and any romance source-check.

**Exactly what Cursor must add / repair**
- Primary Riot bio: `https://www.leagueoflegends.com/en-us/champions/shyvana/`
- Set continuity explicitly at champion, claim and timeline level.
- Create 3–5 internal bioBlocks: FACT / SUPPORTED_SYNTHESIS / EDITORIAL_FRAMING as appropriate.
- Turn each factual item above into one atomic claim only if a real Riot source supports that exact proposition.
- For each CORE claim create an evidenceRef/sourceFact derived from the actual source content; never validate using only evidenceNote or claim regex.
- Create 3–5 meaningful timeline beats where canon supports them. Every CORE beat needs trusted claimIds + sourceIds + evidenceRefs.
- Audit all DIRECT_CANON relationships. Shared region/faction/history remains STRUCTURAL_LORE unless explicit interaction/kinship is documented.
- Audit event links with exact EventRelationRole. PARTICIPANT requires trusted PARTICIPATED_IN evidence for that exact event.
- Recompute Tier A. Never flip reviewed/verified flags just to pass the gate.

**Suggested atomic-claim queue**
- `claim:shyvana:core:01` → Half-dragon/dragon-blooded Demacian ally
- `claim:shyvana:core:02` → saved/served Jarvan IV in classic canon
- `claim:shyvana:core:03` → faces prejudice
- `claim:shyvana:core:04` → current status and any romance source-check.

### Singed — `singed`

**Current state:** Tier C · `CURATED_PROVENANCE_GAP`
**Current blocker:** Existing curated profile lacks enough exact source-backed claims/timeline/continuity coverage for Tier A.

**False / unsafe / must be removed, downgraded or kept pending**
- ARCANE family/personal relationships remain ARCANE unless current Riot material explicitly merges them.

**Canonical information that must exist as sourced claims / bio facts**
- Zaunite chemist/alchemist
- chemical weapons used in Ionia
- experimentation central
- Arcane family/Viktor/Jinx ties stay ARCANE unless merged.

**Exactly what Cursor must add / repair**
- Primary Riot bio: `https://www.leagueoflegends.com/en-us/champions/singed/`
- Set continuity explicitly at champion, claim and timeline level.
- Create 3–5 internal bioBlocks: FACT / SUPPORTED_SYNTHESIS / EDITORIAL_FRAMING as appropriate.
- Turn each factual item above into one atomic claim only if a real Riot source supports that exact proposition.
- For each CORE claim create an evidenceRef/sourceFact derived from the actual source content; never validate using only evidenceNote or claim regex.
- Create 3–5 meaningful timeline beats where canon supports them. Every CORE beat needs trusted claimIds + sourceIds + evidenceRefs.
- Audit all DIRECT_CANON relationships. Shared region/faction/history remains STRUCTURAL_LORE unless explicit interaction/kinship is documented.
- Audit event links with exact EventRelationRole. PARTICIPANT requires trusted PARTICIPATED_IN evidence for that exact event.
- Recompute Tier A. Never flip reviewed/verified flags just to pass the gate.

**Suggested atomic-claim queue**
- `claim:singed:core:01` → Zaunite chemist/alchemist
- `claim:singed:core:02` → chemical weapons used in Ionia
- `claim:singed:core:03` → experimentation central
- `claim:singed:core:04` → Arcane family/Viktor/Jinx ties stay ARCANE unless merged.

### Sion — `sion`

**Current state:** Tier C · `FULL_TIER_A_BUILD`
**Current blocker:** Minimal/incomplete profile: biography depth, continuity, atomic claims, trusted timeline, events and relations are insufficient.

**False / unsafe / must be removed, downgraded or kept pending**
- No specific contradiction confirmed in this pass; treat every unsourced existing statement as UNVERIFIED until checked against a real Riot source.

**Canonical information that must exist as sourced claims / bio facts**
- Ancient Noxian warrior who killed King Jarvan I
- resurrected through blood magic/necromancy
- modern undead war weapon, not political leader.

**Exactly what Cursor must add / repair**
- Primary Riot bio: `https://www.leagueoflegends.com/en-us/champions/sion/`
- Set continuity explicitly at champion, claim and timeline level.
- Create 3–5 internal bioBlocks: FACT / SUPPORTED_SYNTHESIS / EDITORIAL_FRAMING as appropriate.
- Turn each factual item above into one atomic claim only if a real Riot source supports that exact proposition.
- For each CORE claim create an evidenceRef/sourceFact derived from the actual source content; never validate using only evidenceNote or claim regex.
- Create 3–5 meaningful timeline beats where canon supports them. Every CORE beat needs trusted claimIds + sourceIds + evidenceRefs.
- Audit all DIRECT_CANON relationships. Shared region/faction/history remains STRUCTURAL_LORE unless explicit interaction/kinship is documented.
- Audit event links with exact EventRelationRole. PARTICIPANT requires trusted PARTICIPATED_IN evidence for that exact event.
- Recompute Tier A. Never flip reviewed/verified flags just to pass the gate.

**Suggested atomic-claim queue**
- `claim:sion:core:01` → Ancient Noxian warrior who killed King Jarvan I
- `claim:sion:core:02` → resurrected through blood magic/necromancy
- `claim:sion:core:03` → modern undead war weapon, not political leader.

### Sivir — `sivir`

**Current state:** Tier C · `FULL_TIER_A_BUILD`
**Current blocker:** Minimal/incomplete profile: biography depth, continuity, atomic claims, trusted timeline, events and relations are insufficient.

**False / unsafe / must be removed, downgraded or kept pending**
- No specific contradiction confirmed in this pass; treat every unsourced existing statement as UNVERIFIED until checked against a real Riot source.

**Canonical information that must exist as sourced claims / bio facts**
- Shuriman mercenary
- Azir bloodline
- blood helped trigger Azir return
- wields Chalicar
- Cassiopeia tomb expedition sourced.

**Exactly what Cursor must add / repair**
- Primary Riot bio: `https://www.leagueoflegends.com/en-us/champions/sivir/`
- Set continuity explicitly at champion, claim and timeline level.
- Create 3–5 internal bioBlocks: FACT / SUPPORTED_SYNTHESIS / EDITORIAL_FRAMING as appropriate.
- Turn each factual item above into one atomic claim only if a real Riot source supports that exact proposition.
- For each CORE claim create an evidenceRef/sourceFact derived from the actual source content; never validate using only evidenceNote or claim regex.
- Create 3–5 meaningful timeline beats where canon supports them. Every CORE beat needs trusted claimIds + sourceIds + evidenceRefs.
- Audit all DIRECT_CANON relationships. Shared region/faction/history remains STRUCTURAL_LORE unless explicit interaction/kinship is documented.
- Audit event links with exact EventRelationRole. PARTICIPANT requires trusted PARTICIPATED_IN evidence for that exact event.
- Recompute Tier A. Never flip reviewed/verified flags just to pass the gate.

**Suggested atomic-claim queue**
- `claim:sivir:core:01` → Shuriman mercenary
- `claim:sivir:core:02` → Azir bloodline
- `claim:sivir:core:03` → blood helped trigger Azir return
- `claim:sivir:core:04` → wields Chalicar
- `claim:sivir:core:05` → Cassiopeia tomb expedition sourced.

### Skarner — `skarner`

**Current state:** Tier C · `FULL_TIER_A_BUILD`
**Current blocker:** Minimal/incomplete profile: biography depth, continuity, atomic claims, trusted timeline, events and relations are insufficient.

**False / unsafe / must be removed, downgraded or kept pending**
- Remove or LEGACY-label old Crystal Scar/hextech-soul Brackern lore from MAIN_RUNETERRA. Current Skarner is an Ixtali founding Yun Tal brackern.

**Canonical information that must exist as sourced claims / bio facts**
- POST-VGU: ancient brackern and founding Yun Tal figure in Ixtal
- beneath Ixaocan sensing earth
- isolationist/paranoid protector
- old crystal-soul/hextech Brackern canon must be removed or LEGACY.

**Exactly what Cursor must add / repair**
- Primary Riot bio: `https://www.leagueoflegends.com/en-us/champions/skarner/`
- Set continuity explicitly at champion, claim and timeline level.
- Create 3–5 internal bioBlocks: FACT / SUPPORTED_SYNTHESIS / EDITORIAL_FRAMING as appropriate.
- Turn each factual item above into one atomic claim only if a real Riot source supports that exact proposition.
- For each CORE claim create an evidenceRef/sourceFact derived from the actual source content; never validate using only evidenceNote or claim regex.
- Create 3–5 meaningful timeline beats where canon supports them. Every CORE beat needs trusted claimIds + sourceIds + evidenceRefs.
- Audit all DIRECT_CANON relationships. Shared region/faction/history remains STRUCTURAL_LORE unless explicit interaction/kinship is documented.
- Audit event links with exact EventRelationRole. PARTICIPANT requires trusted PARTICIPATED_IN evidence for that exact event.
- Recompute Tier A. Never flip reviewed/verified flags just to pass the gate.

**Suggested atomic-claim queue**
- `claim:skarner:core:01` → POST-VGU: ancient brackern and founding Yun Tal figure in Ixtal
- `claim:skarner:core:02` → beneath Ixaocan sensing earth
- `claim:skarner:core:03` → isolationist/paranoid protector
- `claim:skarner:core:04` → old crystal-soul/hextech Brackern canon must be removed or LEGACY.

### Smolder — `smolder`

**Current state:** Tier C · `FULL_TIER_A_BUILD`
**Current blocker:** Minimal/incomplete profile: biography depth, continuity, atomic claims, trusted timeline, events and relations are insufficient.

**False / unsafe / must be removed, downgraded or kept pending**
- No specific contradiction confirmed in this pass; treat every unsourced existing statement as UNVERIFIED until checked against a real Riot source.

**Canonical information that must exist as sourced claims / bio facts**
- Young dragon
- heir to Camavoran imperial dragon lineage
- trains near Noxian frontier under mother's watch
- not Noxian military/faction member.

**Exactly what Cursor must add / repair**
- Primary Riot bio: `https://www.leagueoflegends.com/en-us/champions/smolder/`
- Set continuity explicitly at champion, claim and timeline level.
- Create 3–5 internal bioBlocks: FACT / SUPPORTED_SYNTHESIS / EDITORIAL_FRAMING as appropriate.
- Turn each factual item above into one atomic claim only if a real Riot source supports that exact proposition.
- For each CORE claim create an evidenceRef/sourceFact derived from the actual source content; never validate using only evidenceNote or claim regex.
- Create 3–5 meaningful timeline beats where canon supports them. Every CORE beat needs trusted claimIds + sourceIds + evidenceRefs.
- Audit all DIRECT_CANON relationships. Shared region/faction/history remains STRUCTURAL_LORE unless explicit interaction/kinship is documented.
- Audit event links with exact EventRelationRole. PARTICIPANT requires trusted PARTICIPATED_IN evidence for that exact event.
- Recompute Tier A. Never flip reviewed/verified flags just to pass the gate.

**Suggested atomic-claim queue**
- `claim:smolder:core:01` → Young dragon
- `claim:smolder:core:02` → heir to Camavoran imperial dragon lineage
- `claim:smolder:core:03` → trains near Noxian frontier under mother's watch
- `claim:smolder:core:04` → not Noxian military/faction member.

### Sona — `sona`

**Current state:** Tier C · `FULL_TIER_A_BUILD`
**Current blocker:** Minimal/incomplete profile: biography depth, continuity, atomic claims, trusted timeline, events and relations are insufficient.

**False / unsafe / must be removed, downgraded or kept pending**
- No specific contradiction confirmed in this pass; treat every unsourced existing statement as UNVERIFIED until checked against a real Riot source.

**Canonical information that must exist as sourced claims / bio facts**
- Musician raised by Buvelle family
- magical etwahl
- magic secret/dangerous in Demacia
- no Mage Rebellion participation unless direct.

**Exactly what Cursor must add / repair**
- Primary Riot bio: `https://www.leagueoflegends.com/en-us/champions/sona/`
- Set continuity explicitly at champion, claim and timeline level.
- Create 3–5 internal bioBlocks: FACT / SUPPORTED_SYNTHESIS / EDITORIAL_FRAMING as appropriate.
- Turn each factual item above into one atomic claim only if a real Riot source supports that exact proposition.
- For each CORE claim create an evidenceRef/sourceFact derived from the actual source content; never validate using only evidenceNote or claim regex.
- Create 3–5 meaningful timeline beats where canon supports them. Every CORE beat needs trusted claimIds + sourceIds + evidenceRefs.
- Audit all DIRECT_CANON relationships. Shared region/faction/history remains STRUCTURAL_LORE unless explicit interaction/kinship is documented.
- Audit event links with exact EventRelationRole. PARTICIPANT requires trusted PARTICIPATED_IN evidence for that exact event.
- Recompute Tier A. Never flip reviewed/verified flags just to pass the gate.

**Suggested atomic-claim queue**
- `claim:sona:core:01` → Musician raised by Buvelle family
- `claim:sona:core:02` → magical etwahl
- `claim:sona:core:03` → magic secret/dangerous in Demacia
- `claim:sona:core:04` → no Mage Rebellion participation unless direct.

### Soraka — `soraka`

**Current state:** Tier C · `FULL_TIER_A_BUILD`
**Current blocker:** Minimal/incomplete profile: biography depth, continuity, atomic claims, trusted timeline, events and relations are insufficient.

**False / unsafe / must be removed, downgraded or kept pending**
- No specific contradiction confirmed in this pass; treat every unsourced existing statement as UNVERIFIED until checked against a real Riot source.

**Canonical information that must exist as sourced claims / bio facts**
- Celestial being who took mortal form
- wanders healing/helping mortals
- sacrificed celestial status/power for material intervention where supported
- no automatic Targon faction membership.

**Exactly what Cursor must add / repair**
- Primary Riot bio: `https://www.leagueoflegends.com/en-us/champions/soraka/`
- Set continuity explicitly at champion, claim and timeline level.
- Create 3–5 internal bioBlocks: FACT / SUPPORTED_SYNTHESIS / EDITORIAL_FRAMING as appropriate.
- Turn each factual item above into one atomic claim only if a real Riot source supports that exact proposition.
- For each CORE claim create an evidenceRef/sourceFact derived from the actual source content; never validate using only evidenceNote or claim regex.
- Create 3–5 meaningful timeline beats where canon supports them. Every CORE beat needs trusted claimIds + sourceIds + evidenceRefs.
- Audit all DIRECT_CANON relationships. Shared region/faction/history remains STRUCTURAL_LORE unless explicit interaction/kinship is documented.
- Audit event links with exact EventRelationRole. PARTICIPANT requires trusted PARTICIPATED_IN evidence for that exact event.
- Recompute Tier A. Never flip reviewed/verified flags just to pass the gate.

**Suggested atomic-claim queue**
- `claim:soraka:core:01` → Celestial being who took mortal form
- `claim:soraka:core:02` → wanders healing/helping mortals
- `claim:soraka:core:03` → sacrificed celestial status/power for material intervention where supported
- `claim:soraka:core:04` → no automatic Targon faction membership.

### Swain — `swain`

**Current state:** Tier C · `CURATED_PROVENANCE_GAP`
**Current blocker:** Existing curated profile lacks enough exact source-backed claims/timeline/continuity coverage for Tier A.

**False / unsafe / must be removed, downgraded or kept pending**
- No specific contradiction confirmed in this pass; treat every unsourced existing statement as UNVERIFIED until checked against a real Riot source.

**Canonical information that must exist as sourced claims / bio facts**
- Noxian Grand General
- lost arm to Irelia in Ionia
- coup/Trifarix rule
- controls demon Raum
- Black Rose opposition central.

**Exactly what Cursor must add / repair**
- Primary Riot bio: `https://www.leagueoflegends.com/en-us/champions/swain/`
- Set continuity explicitly at champion, claim and timeline level.
- Create 3–5 internal bioBlocks: FACT / SUPPORTED_SYNTHESIS / EDITORIAL_FRAMING as appropriate.
- Turn each factual item above into one atomic claim only if a real Riot source supports that exact proposition.
- For each CORE claim create an evidenceRef/sourceFact derived from the actual source content; never validate using only evidenceNote or claim regex.
- Create 3–5 meaningful timeline beats where canon supports them. Every CORE beat needs trusted claimIds + sourceIds + evidenceRefs.
- Audit all DIRECT_CANON relationships. Shared region/faction/history remains STRUCTURAL_LORE unless explicit interaction/kinship is documented.
- Audit event links with exact EventRelationRole. PARTICIPANT requires trusted PARTICIPATED_IN evidence for that exact event.
- Recompute Tier A. Never flip reviewed/verified flags just to pass the gate.

**Suggested atomic-claim queue**
- `claim:swain:core:01` → Noxian Grand General
- `claim:swain:core:02` → lost arm to Irelia in Ionia
- `claim:swain:core:03` → coup/Trifarix rule
- `claim:swain:core:04` → controls demon Raum
- `claim:swain:core:05` → Black Rose opposition central.

### Sylas — `sylas`

**Current state:** Tier C · `CURATED_PROVENANCE_GAP`
**Current blocker:** Existing curated profile lacks enough exact source-backed claims/timeline/continuity coverage for Tier A.

**False / unsafe / must be removed, downgraded or kept pending**
- No specific contradiction confirmed in this pass; treat every unsourced existing statement as UNVERIFIED until checked against a real Riot source.

**Canonical information that must exist as sourced claims / bio facts**
- Demacian mage used by Mageseekers then imprisoned
- escaped via Lux interaction
- led mage rebellion
- Freljord journey source separately.

**Exactly what Cursor must add / repair**
- Primary Riot bio: `https://www.leagueoflegends.com/en-us/champions/sylas/`
- Set continuity explicitly at champion, claim and timeline level.
- Create 3–5 internal bioBlocks: FACT / SUPPORTED_SYNTHESIS / EDITORIAL_FRAMING as appropriate.
- Turn each factual item above into one atomic claim only if a real Riot source supports that exact proposition.
- For each CORE claim create an evidenceRef/sourceFact derived from the actual source content; never validate using only evidenceNote or claim regex.
- Create 3–5 meaningful timeline beats where canon supports them. Every CORE beat needs trusted claimIds + sourceIds + evidenceRefs.
- Audit all DIRECT_CANON relationships. Shared region/faction/history remains STRUCTURAL_LORE unless explicit interaction/kinship is documented.
- Audit event links with exact EventRelationRole. PARTICIPANT requires trusted PARTICIPATED_IN evidence for that exact event.
- Recompute Tier A. Never flip reviewed/verified flags just to pass the gate.

**Suggested atomic-claim queue**
- `claim:sylas:core:01` → Demacian mage used by Mageseekers then imprisoned
- `claim:sylas:core:02` → escaped via Lux interaction
- `claim:sylas:core:03` → led mage rebellion
- `claim:sylas:core:04` → Freljord journey source separately.

### Syndra — `syndra`

**Current state:** Tier C · `CURATED_PROVENANCE_GAP`
**Current blocker:** Existing curated profile lacks enough exact source-backed claims/timeline/continuity coverage for Tier A.

**False / unsafe / must be removed, downgraded or kept pending**
- No specific contradiction confirmed in this pass; treat every unsourced existing statement as UNVERIFIED until checked against a real Riot source.

**Canonical information that must exist as sourced claims / bio facts**
- Ionian mage of immense power
- harmed by attempts to suppress her
- placed in magical sleep/confinement then awakened
- current motives/location kept conservative.

**Exactly what Cursor must add / repair**
- Primary Riot bio: `https://www.leagueoflegends.com/en-us/champions/syndra/`
- Set continuity explicitly at champion, claim and timeline level.
- Create 3–5 internal bioBlocks: FACT / SUPPORTED_SYNTHESIS / EDITORIAL_FRAMING as appropriate.
- Turn each factual item above into one atomic claim only if a real Riot source supports that exact proposition.
- For each CORE claim create an evidenceRef/sourceFact derived from the actual source content; never validate using only evidenceNote or claim regex.
- Create 3–5 meaningful timeline beats where canon supports them. Every CORE beat needs trusted claimIds + sourceIds + evidenceRefs.
- Audit all DIRECT_CANON relationships. Shared region/faction/history remains STRUCTURAL_LORE unless explicit interaction/kinship is documented.
- Audit event links with exact EventRelationRole. PARTICIPANT requires trusted PARTICIPATED_IN evidence for that exact event.
- Recompute Tier A. Never flip reviewed/verified flags just to pass the gate.

**Suggested atomic-claim queue**
- `claim:syndra:core:01` → Ionian mage of immense power
- `claim:syndra:core:02` → harmed by attempts to suppress her
- `claim:syndra:core:03` → placed in magical sleep/confinement then awakened
- `claim:syndra:core:04` → current motives/location kept conservative.

### Tahm Kench — `tahm-kench`

**Current state:** Tier C · `FULL_TIER_A_BUILD`
**Current blocker:** Minimal/incomplete profile: biography depth, continuity, atomic claims, trusted timeline, events and relations are insufficient.

**False / unsafe / must be removed, downgraded or kept pending**
- No specific contradiction confirmed in this pass; treat every unsourced existing statement as UNVERIFIED until checked against a real Riot source.

**Canonical information that must exist as sourced claims / bio facts**
- Demon of addiction/greed
- makes bargains and consumes victims
- many cultural names
- Bilgewater association not citizenship/faction.

**Exactly what Cursor must add / repair**
- Primary Riot bio: `https://www.leagueoflegends.com/en-us/champions/tahm-kench/`
- Set continuity explicitly at champion, claim and timeline level.
- Create 3–5 internal bioBlocks: FACT / SUPPORTED_SYNTHESIS / EDITORIAL_FRAMING as appropriate.
- Turn each factual item above into one atomic claim only if a real Riot source supports that exact proposition.
- For each CORE claim create an evidenceRef/sourceFact derived from the actual source content; never validate using only evidenceNote or claim regex.
- Create 3–5 meaningful timeline beats where canon supports them. Every CORE beat needs trusted claimIds + sourceIds + evidenceRefs.
- Audit all DIRECT_CANON relationships. Shared region/faction/history remains STRUCTURAL_LORE unless explicit interaction/kinship is documented.
- Audit event links with exact EventRelationRole. PARTICIPANT requires trusted PARTICIPATED_IN evidence for that exact event.
- Recompute Tier A. Never flip reviewed/verified flags just to pass the gate.

**Suggested atomic-claim queue**
- `claim:tahm-kench:core:01` → Demon of addiction/greed
- `claim:tahm-kench:core:02` → makes bargains and consumes victims
- `claim:tahm-kench:core:03` → many cultural names
- `claim:tahm-kench:core:04` → Bilgewater association not citizenship/faction.

### Taliyah — `taliyah`

**Current state:** Tier C · `FULL_TIER_A_BUILD`
**Current blocker:** Minimal/incomplete profile: biography depth, continuity, atomic claims, trusted timeline, events and relations are insufficient.

**False / unsafe / must be removed, downgraded or kept pending**
- No specific contradiction confirmed in this pass; treat every unsourced existing statement as UNVERIFIED until checked against a real Riot source.

**Canonical information that must exist as sourced claims / bio facts**
- Shuriman stoneweaver
- studied under Yasuo
- returned to protect home/people from imperial danger
- not broadly anti-Shurima.

**Exactly what Cursor must add / repair**
- Primary Riot bio: `https://www.leagueoflegends.com/en-us/champions/taliyah/`
- Set continuity explicitly at champion, claim and timeline level.
- Create 3–5 internal bioBlocks: FACT / SUPPORTED_SYNTHESIS / EDITORIAL_FRAMING as appropriate.
- Turn each factual item above into one atomic claim only if a real Riot source supports that exact proposition.
- For each CORE claim create an evidenceRef/sourceFact derived from the actual source content; never validate using only evidenceNote or claim regex.
- Create 3–5 meaningful timeline beats where canon supports them. Every CORE beat needs trusted claimIds + sourceIds + evidenceRefs.
- Audit all DIRECT_CANON relationships. Shared region/faction/history remains STRUCTURAL_LORE unless explicit interaction/kinship is documented.
- Audit event links with exact EventRelationRole. PARTICIPANT requires trusted PARTICIPATED_IN evidence for that exact event.
- Recompute Tier A. Never flip reviewed/verified flags just to pass the gate.

**Suggested atomic-claim queue**
- `claim:taliyah:core:01` → Shuriman stoneweaver
- `claim:taliyah:core:02` → studied under Yasuo
- `claim:taliyah:core:03` → returned to protect home/people from imperial danger
- `claim:taliyah:core:04` → not broadly anti-Shurima.

### Talon — `talon`

**Current state:** Tier C · `FULL_TIER_A_BUILD`
**Current blocker:** Minimal/incomplete profile: biography depth, continuity, atomic claims, trusted timeline, events and relations are insufficient.

**False / unsafe / must be removed, downgraded or kept pending**
- No specific contradiction confirmed in this pass; treat every unsourced existing statement as UNVERIFIED until checked against a real Riot source.

**Canonical information that must exist as sourced claims / bio facts**
- Noxian assassin adopted/trained by General Du Couteau
- tied to Katarina family
- recent comic continuity checked before claims.

**Exactly what Cursor must add / repair**
- Primary Riot bio: `https://www.leagueoflegends.com/en-us/champions/talon/`
- Set continuity explicitly at champion, claim and timeline level.
- Create 3–5 internal bioBlocks: FACT / SUPPORTED_SYNTHESIS / EDITORIAL_FRAMING as appropriate.
- Turn each factual item above into one atomic claim only if a real Riot source supports that exact proposition.
- For each CORE claim create an evidenceRef/sourceFact derived from the actual source content; never validate using only evidenceNote or claim regex.
- Create 3–5 meaningful timeline beats where canon supports them. Every CORE beat needs trusted claimIds + sourceIds + evidenceRefs.
- Audit all DIRECT_CANON relationships. Shared region/faction/history remains STRUCTURAL_LORE unless explicit interaction/kinship is documented.
- Audit event links with exact EventRelationRole. PARTICIPANT requires trusted PARTICIPATED_IN evidence for that exact event.
- Recompute Tier A. Never flip reviewed/verified flags just to pass the gate.

**Suggested atomic-claim queue**
- `claim:talon:core:01` → Noxian assassin adopted/trained by General Du Couteau
- `claim:talon:core:02` → tied to Katarina family
- `claim:talon:core:03` → recent comic continuity checked before claims.

### Taric — `taric`

**Current state:** Tier C · `FULL_TIER_A_BUILD`
**Current blocker:** Minimal/incomplete profile: biography depth, continuity, atomic claims, trusted timeline, events and relations are insufficient.

**False / unsafe / must be removed, downgraded or kept pending**
- No specific contradiction confirmed in this pass; treat every unsourced existing statement as UNVERIFIED until checked against a real Riot source.

**Canonical information that must exist as sourced claims / bio facts**
- Demacian exile who climbed Targon
- became Aspect of Protector
- protects life/beauty
- military history/exile sourced.

**Exactly what Cursor must add / repair**
- Primary Riot bio: `https://www.leagueoflegends.com/en-us/champions/taric/`
- Set continuity explicitly at champion, claim and timeline level.
- Create 3–5 internal bioBlocks: FACT / SUPPORTED_SYNTHESIS / EDITORIAL_FRAMING as appropriate.
- Turn each factual item above into one atomic claim only if a real Riot source supports that exact proposition.
- For each CORE claim create an evidenceRef/sourceFact derived from the actual source content; never validate using only evidenceNote or claim regex.
- Create 3–5 meaningful timeline beats where canon supports them. Every CORE beat needs trusted claimIds + sourceIds + evidenceRefs.
- Audit all DIRECT_CANON relationships. Shared region/faction/history remains STRUCTURAL_LORE unless explicit interaction/kinship is documented.
- Audit event links with exact EventRelationRole. PARTICIPANT requires trusted PARTICIPATED_IN evidence for that exact event.
- Recompute Tier A. Never flip reviewed/verified flags just to pass the gate.

**Suggested atomic-claim queue**
- `claim:taric:core:01` → Demacian exile who climbed Targon
- `claim:taric:core:02` → became Aspect of Protector
- `claim:taric:core:03` → protects life/beauty
- `claim:taric:core:04` → military history/exile sourced.

### Teemo — `teemo`

**Current state:** Tier C · `FULL_TIER_A_BUILD`
**Current blocker:** Minimal/incomplete profile: biography depth, continuity, atomic claims, trusted timeline, events and relations are insufficient.

**False / unsafe / must be removed, downgraded or kept pending**
- No specific contradiction confirmed in this pass; treat every unsourced existing statement as UNVERIFIED until checked against a real Riot source.

**Canonical information that must exist as sourced claims / bio facts**
- Bandle yordle scout
- Bandle Scouts member
- cheerful persona vs efficient field work
- no invented wars/kill counts.

**Exactly what Cursor must add / repair**
- Primary Riot bio: `https://www.leagueoflegends.com/en-us/champions/teemo/`
- Set continuity explicitly at champion, claim and timeline level.
- Create 3–5 internal bioBlocks: FACT / SUPPORTED_SYNTHESIS / EDITORIAL_FRAMING as appropriate.
- Turn each factual item above into one atomic claim only if a real Riot source supports that exact proposition.
- For each CORE claim create an evidenceRef/sourceFact derived from the actual source content; never validate using only evidenceNote or claim regex.
- Create 3–5 meaningful timeline beats where canon supports them. Every CORE beat needs trusted claimIds + sourceIds + evidenceRefs.
- Audit all DIRECT_CANON relationships. Shared region/faction/history remains STRUCTURAL_LORE unless explicit interaction/kinship is documented.
- Audit event links with exact EventRelationRole. PARTICIPANT requires trusted PARTICIPATED_IN evidence for that exact event.
- Recompute Tier A. Never flip reviewed/verified flags just to pass the gate.

**Suggested atomic-claim queue**
- `claim:teemo:core:01` → Bandle yordle scout
- `claim:teemo:core:02` → Bandle Scouts member
- `claim:teemo:core:03` → cheerful persona vs efficient field work
- `claim:teemo:core:04` → no invented wars/kill counts.

### Thresh — `thresh`

**Current state:** Tier C · `CURATED_PROVENANCE_GAP`
**Current blocker:** Existing curated profile lacks enough exact source-backed claims/timeline/continuity coverage for Tier A.

**False / unsafe / must be removed, downgraded or kept pending**
- No specific contradiction confirmed in this pass; treat every unsourced existing statement as UNVERIFIED until checked against a real Riot source.

**Canonical information that must exist as sourced claims / bio facts**
- Former Blessed Isles custodian
- embraced cruelty/Black Mist during Ruination
- imprisoned Senna and many souls
- later post-Ruination status source precisely.

**Exactly what Cursor must add / repair**
- Primary Riot bio: `https://www.leagueoflegends.com/en-us/champions/thresh/`
- Set continuity explicitly at champion, claim and timeline level.
- Create 3–5 internal bioBlocks: FACT / SUPPORTED_SYNTHESIS / EDITORIAL_FRAMING as appropriate.
- Turn each factual item above into one atomic claim only if a real Riot source supports that exact proposition.
- For each CORE claim create an evidenceRef/sourceFact derived from the actual source content; never validate using only evidenceNote or claim regex.
- Create 3–5 meaningful timeline beats where canon supports them. Every CORE beat needs trusted claimIds + sourceIds + evidenceRefs.
- Audit all DIRECT_CANON relationships. Shared region/faction/history remains STRUCTURAL_LORE unless explicit interaction/kinship is documented.
- Audit event links with exact EventRelationRole. PARTICIPANT requires trusted PARTICIPATED_IN evidence for that exact event.
- Recompute Tier A. Never flip reviewed/verified flags just to pass the gate.

**Suggested atomic-claim queue**
- `claim:thresh:core:01` → Former Blessed Isles custodian
- `claim:thresh:core:02` → embraced cruelty/Black Mist during Ruination
- `claim:thresh:core:03` → imprisoned Senna and many souls
- `claim:thresh:core:04` → later post-Ruination status source precisely.

### Tristana — `tristana`

**Current state:** Tier C · `FULL_TIER_A_BUILD`
**Current blocker:** Minimal/incomplete profile: biography depth, continuity, atomic claims, trusted timeline, events and relations are insufficient.

**False / unsafe / must be removed, downgraded or kept pending**
- No specific contradiction confirmed in this pass; treat every unsourced existing statement as UNVERIFIED until checked against a real Riot source.

**Canonical information that must exist as sourced claims / bio facts**
- Bandle yordle gunner
- leads/founded Bandle Gunners where current bio supports
- Rumble relation not assumed romantic unless explicit.

**Exactly what Cursor must add / repair**
- Primary Riot bio: `https://www.leagueoflegends.com/en-us/champions/tristana/`
- Set continuity explicitly at champion, claim and timeline level.
- Create 3–5 internal bioBlocks: FACT / SUPPORTED_SYNTHESIS / EDITORIAL_FRAMING as appropriate.
- Turn each factual item above into one atomic claim only if a real Riot source supports that exact proposition.
- For each CORE claim create an evidenceRef/sourceFact derived from the actual source content; never validate using only evidenceNote or claim regex.
- Create 3–5 meaningful timeline beats where canon supports them. Every CORE beat needs trusted claimIds + sourceIds + evidenceRefs.
- Audit all DIRECT_CANON relationships. Shared region/faction/history remains STRUCTURAL_LORE unless explicit interaction/kinship is documented.
- Audit event links with exact EventRelationRole. PARTICIPANT requires trusted PARTICIPATED_IN evidence for that exact event.
- Recompute Tier A. Never flip reviewed/verified flags just to pass the gate.

**Suggested atomic-claim queue**
- `claim:tristana:core:01` → Bandle yordle gunner
- `claim:tristana:core:02` → leads/founded Bandle Gunners where current bio supports
- `claim:tristana:core:03` → Rumble relation not assumed romantic unless explicit.

### Trundle — `trundle`

**Current state:** Tier C · `FULL_TIER_A_BUILD`
**Current blocker:** Minimal/incomplete profile: biography depth, continuity, atomic claims, trusted timeline, events and relations are insufficient.

**False / unsafe / must be removed, downgraded or kept pending**
- No specific contradiction confirmed in this pass; treat every unsourced existing statement as UNVERIFIED until checked against a real Riot source.

**Canonical information that must exist as sourced claims / bio facts**
- Troll king/chieftain
- wields True Ice club Boneshiver
- alliance/subordination to Lissandra where supported
- not representative of all trolls.

**Exactly what Cursor must add / repair**
- Primary Riot bio: `https://www.leagueoflegends.com/en-us/champions/trundle/`
- Set continuity explicitly at champion, claim and timeline level.
- Create 3–5 internal bioBlocks: FACT / SUPPORTED_SYNTHESIS / EDITORIAL_FRAMING as appropriate.
- Turn each factual item above into one atomic claim only if a real Riot source supports that exact proposition.
- For each CORE claim create an evidenceRef/sourceFact derived from the actual source content; never validate using only evidenceNote or claim regex.
- Create 3–5 meaningful timeline beats where canon supports them. Every CORE beat needs trusted claimIds + sourceIds + evidenceRefs.
- Audit all DIRECT_CANON relationships. Shared region/faction/history remains STRUCTURAL_LORE unless explicit interaction/kinship is documented.
- Audit event links with exact EventRelationRole. PARTICIPANT requires trusted PARTICIPATED_IN evidence for that exact event.
- Recompute Tier A. Never flip reviewed/verified flags just to pass the gate.

**Suggested atomic-claim queue**
- `claim:trundle:core:01` → Troll king/chieftain
- `claim:trundle:core:02` → wields True Ice club Boneshiver
- `claim:trundle:core:03` → alliance/subordination to Lissandra where supported
- `claim:trundle:core:04` → not representative of all trolls.

### Tryndamere — `tryndamere`

**Current state:** Tier C · `FULL_TIER_A_BUILD`
**Current blocker:** Minimal/incomplete profile: biography depth, continuity, atomic claims, trusted timeline, events and relations are insufficient.

**False / unsafe / must be removed, downgraded or kept pending**
- No specific contradiction confirmed in this pass; treat every unsourced existing statement as UNVERIFIED until checked against a real Riot source.

**Canonical information that must exist as sourced claims / bio facts**
- Freljordian warrior/king
- tribe massacre tied to Aatrox in current lore
- marriage/political alliance with Ashe
- rage/undying state not over-explained beyond source.

**Exactly what Cursor must add / repair**
- Primary Riot bio: `https://www.leagueoflegends.com/en-us/champions/tryndamere/`
- Set continuity explicitly at champion, claim and timeline level.
- Create 3–5 internal bioBlocks: FACT / SUPPORTED_SYNTHESIS / EDITORIAL_FRAMING as appropriate.
- Turn each factual item above into one atomic claim only if a real Riot source supports that exact proposition.
- For each CORE claim create an evidenceRef/sourceFact derived from the actual source content; never validate using only evidenceNote or claim regex.
- Create 3–5 meaningful timeline beats where canon supports them. Every CORE beat needs trusted claimIds + sourceIds + evidenceRefs.
- Audit all DIRECT_CANON relationships. Shared region/faction/history remains STRUCTURAL_LORE unless explicit interaction/kinship is documented.
- Audit event links with exact EventRelationRole. PARTICIPANT requires trusted PARTICIPATED_IN evidence for that exact event.
- Recompute Tier A. Never flip reviewed/verified flags just to pass the gate.

**Suggested atomic-claim queue**
- `claim:tryndamere:core:01` → Freljordian warrior/king
- `claim:tryndamere:core:02` → tribe massacre tied to Aatrox in current lore
- `claim:tryndamere:core:03` → marriage/political alliance with Ashe
- `claim:tryndamere:core:04` → rage/undying state not over-explained beyond source.

### Twisted Fate — `twisted-fate`

**Current state:** Tier C · `FULL_TIER_A_BUILD`
**Current blocker:** Minimal/incomplete profile: biography depth, continuity, atomic claims, trusted timeline, events and relations are insufficient.

**False / unsafe / must be removed, downgraded or kept pending**
- No specific contradiction confirmed in this pass; treat every unsourced existing statement as UNVERIFIED until checked against a real Riot source.

**Canonical information that must exist as sourced claims / bio facts**
- Bilgewater cardsharp/mage
- long partnership with Graves
- betrayal/reconciliation core
- origins/magic from current bio.

**Exactly what Cursor must add / repair**
- Primary Riot bio: `https://www.leagueoflegends.com/en-us/champions/twisted-fate/`
- Set continuity explicitly at champion, claim and timeline level.
- Create 3–5 internal bioBlocks: FACT / SUPPORTED_SYNTHESIS / EDITORIAL_FRAMING as appropriate.
- Turn each factual item above into one atomic claim only if a real Riot source supports that exact proposition.
- For each CORE claim create an evidenceRef/sourceFact derived from the actual source content; never validate using only evidenceNote or claim regex.
- Create 3–5 meaningful timeline beats where canon supports them. Every CORE beat needs trusted claimIds + sourceIds + evidenceRefs.
- Audit all DIRECT_CANON relationships. Shared region/faction/history remains STRUCTURAL_LORE unless explicit interaction/kinship is documented.
- Audit event links with exact EventRelationRole. PARTICIPANT requires trusted PARTICIPATED_IN evidence for that exact event.
- Recompute Tier A. Never flip reviewed/verified flags just to pass the gate.

**Suggested atomic-claim queue**
- `claim:twisted-fate:core:01` → Bilgewater cardsharp/mage
- `claim:twisted-fate:core:02` → long partnership with Graves
- `claim:twisted-fate:core:03` → betrayal/reconciliation core
- `claim:twisted-fate:core:04` → origins/magic from current bio.

### Twitch — `twitch`

**Current state:** Tier C · `FULL_TIER_A_BUILD`
**Current blocker:** Minimal/incomplete profile: biography depth, continuity, atomic claims, trusted timeline, events and relations are insufficient.

**False / unsafe / must be removed, downgraded or kept pending**
- No specific contradiction confirmed in this pass; treat every unsourced existing statement as UNVERIFIED until checked against a real Riot source.

**Canonical information that must exist as sourced claims / bio facts**
- Mutated plague rat of Zaun
- scavenged weapons/filth obsession
- canon sparse
- no Singed creation unless current source says so.

**Exactly what Cursor must add / repair**
- Primary Riot bio: `https://www.leagueoflegends.com/en-us/champions/twitch/`
- Set continuity explicitly at champion, claim and timeline level.
- Create 3–5 internal bioBlocks: FACT / SUPPORTED_SYNTHESIS / EDITORIAL_FRAMING as appropriate.
- Turn each factual item above into one atomic claim only if a real Riot source supports that exact proposition.
- For each CORE claim create an evidenceRef/sourceFact derived from the actual source content; never validate using only evidenceNote or claim regex.
- Create 3–5 meaningful timeline beats where canon supports them. Every CORE beat needs trusted claimIds + sourceIds + evidenceRefs.
- Audit all DIRECT_CANON relationships. Shared region/faction/history remains STRUCTURAL_LORE unless explicit interaction/kinship is documented.
- Audit event links with exact EventRelationRole. PARTICIPANT requires trusted PARTICIPATED_IN evidence for that exact event.
- Recompute Tier A. Never flip reviewed/verified flags just to pass the gate.

**Suggested atomic-claim queue**
- `claim:twitch:core:01` → Mutated plague rat of Zaun
- `claim:twitch:core:02` → scavenged weapons/filth obsession
- `claim:twitch:core:03` → canon sparse
- `claim:twitch:core:04` → no Singed creation unless current source says so.

### Udyr — `udyr`

**Current state:** Tier C · `FULL_TIER_A_BUILD`
**Current blocker:** Minimal/incomplete profile: biography depth, continuity, atomic claims, trusted timeline, events and relations are insufficient.

**False / unsafe / must be removed, downgraded or kept pending**
- No specific contradiction confirmed in this pass; treat every unsourced existing statement as UNVERIFIED until checked against a real Riot source.

**Canonical information that must exist as sourced claims / bio facts**
- Freljordian spirit walker
- connects with animal spirits
- father of Sejuani where current canon supports
- trained/spent time in Ionia with Lee Sin.

**Exactly what Cursor must add / repair**
- Primary Riot bio: `https://www.leagueoflegends.com/en-us/champions/udyr/`
- Set continuity explicitly at champion, claim and timeline level.
- Create 3–5 internal bioBlocks: FACT / SUPPORTED_SYNTHESIS / EDITORIAL_FRAMING as appropriate.
- Turn each factual item above into one atomic claim only if a real Riot source supports that exact proposition.
- For each CORE claim create an evidenceRef/sourceFact derived from the actual source content; never validate using only evidenceNote or claim regex.
- Create 3–5 meaningful timeline beats where canon supports them. Every CORE beat needs trusted claimIds + sourceIds + evidenceRefs.
- Audit all DIRECT_CANON relationships. Shared region/faction/history remains STRUCTURAL_LORE unless explicit interaction/kinship is documented.
- Audit event links with exact EventRelationRole. PARTICIPANT requires trusted PARTICIPATED_IN evidence for that exact event.
- Recompute Tier A. Never flip reviewed/verified flags just to pass the gate.

**Suggested atomic-claim queue**
- `claim:udyr:core:01` → Freljordian spirit walker
- `claim:udyr:core:02` → connects with animal spirits
- `claim:udyr:core:03` → father of Sejuani where current canon supports
- `claim:udyr:core:04` → trained/spent time in Ionia with Lee Sin.

### Urgot — `urgot`

**Current state:** Tier C · `FULL_TIER_A_BUILD`
**Current blocker:** Minimal/incomplete profile: biography depth, continuity, atomic claims, trusted timeline, events and relations are insufficient.

**False / unsafe / must be removed, downgraded or kept pending**
- No specific contradiction confirmed in this pass; treat every unsourced existing statement as UNVERIFIED until checked against a real Riot source.

**Canonical information that must exist as sourced claims / bio facts**
- Former Noxian executioner sent to Zaun
- imprisoned/transformed
- became Zaunite revolutionary/cult figure
- Swain involvement source precisely.

**Exactly what Cursor must add / repair**
- Primary Riot bio: `https://www.leagueoflegends.com/en-us/champions/urgot/`
- Set continuity explicitly at champion, claim and timeline level.
- Create 3–5 internal bioBlocks: FACT / SUPPORTED_SYNTHESIS / EDITORIAL_FRAMING as appropriate.
- Turn each factual item above into one atomic claim only if a real Riot source supports that exact proposition.
- For each CORE claim create an evidenceRef/sourceFact derived from the actual source content; never validate using only evidenceNote or claim regex.
- Create 3–5 meaningful timeline beats where canon supports them. Every CORE beat needs trusted claimIds + sourceIds + evidenceRefs.
- Audit all DIRECT_CANON relationships. Shared region/faction/history remains STRUCTURAL_LORE unless explicit interaction/kinship is documented.
- Audit event links with exact EventRelationRole. PARTICIPANT requires trusted PARTICIPATED_IN evidence for that exact event.
- Recompute Tier A. Never flip reviewed/verified flags just to pass the gate.

**Suggested atomic-claim queue**
- `claim:urgot:core:01` → Former Noxian executioner sent to Zaun
- `claim:urgot:core:02` → imprisoned/transformed
- `claim:urgot:core:03` → became Zaunite revolutionary/cult figure
- `claim:urgot:core:04` → Swain involvement source precisely.

### Varus — `varus`

**Current state:** Tier B · `PHASE1_REVALIDATE`
**Current blocker:** canonConfidence 83 < 85

**False / unsafe / must be removed, downgraded or kept pending**
- Do not infer Void War participation; do not create a direct Varus↔Pantheon character edge.

**Canonical information that must exist as sourced claims / bio facts**
- Darkin imprisoned in bow
- current body from Valmar/Kai
- ancient Ascended status from broader Darkin/Twilight evidence rather than short bio alone
- no Void War claim without exact source
- no direct Pantheon edge.

**Exactly what Cursor must add / repair**
- Primary Riot bio: `https://www.leagueoflegends.com/en-us/champions/varus/`
- Set continuity explicitly at champion, claim and timeline level.
- Create 3–5 internal bioBlocks: FACT / SUPPORTED_SYNTHESIS / EDITORIAL_FRAMING as appropriate.
- Turn each factual item above into one atomic claim only if a real Riot source supports that exact proposition.
- For each CORE claim create an evidenceRef/sourceFact derived from the actual source content; never validate using only evidenceNote or claim regex.
- Create 3–5 meaningful timeline beats where canon supports them. Every CORE beat needs trusted claimIds + sourceIds + evidenceRefs.
- Audit all DIRECT_CANON relationships. Shared region/faction/history remains STRUCTURAL_LORE unless explicit interaction/kinship is documented.
- Audit event links with exact EventRelationRole. PARTICIPANT requires trusted PARTICIPATED_IN evidence for that exact event.
- Recompute Tier A. Never flip reviewed/verified flags just to pass the gate.

**Suggested atomic-claim queue**
- `claim:varus:core:01` → Darkin imprisoned in bow
- `claim:varus:core:02` → current body from Valmar/Kai
- `claim:varus:core:03` → ancient Ascended status from broader Darkin/Twilight evidence rather than short bio alone
- `claim:varus:core:04` → no Void War claim without exact source
- `claim:varus:core:05` → no direct Pantheon edge.

### Vayne — `vayne`

**Current state:** Tier C · `FULL_TIER_A_BUILD`
**Current blocker:** Minimal/incomplete profile: biography depth, continuity, atomic claims, trusted timeline, events and relations are insufficient.

**False / unsafe / must be removed, downgraded or kept pending**
- No specific contradiction confirmed in this pass; treat every unsourced existing statement as UNVERIFIED until checked against a real Riot source.

**Canonical information that must exist as sourced claims / bio facts**
- Demacian monster hunter
- parents killed by Evelynn
- trained by Frey then killed Frey after discovering shapeshifting
- Sentinel role sourced separately.

**Exactly what Cursor must add / repair**
- Primary Riot bio: `https://www.leagueoflegends.com/en-us/champions/vayne/`
- Set continuity explicitly at champion, claim and timeline level.
- Create 3–5 internal bioBlocks: FACT / SUPPORTED_SYNTHESIS / EDITORIAL_FRAMING as appropriate.
- Turn each factual item above into one atomic claim only if a real Riot source supports that exact proposition.
- For each CORE claim create an evidenceRef/sourceFact derived from the actual source content; never validate using only evidenceNote or claim regex.
- Create 3–5 meaningful timeline beats where canon supports them. Every CORE beat needs trusted claimIds + sourceIds + evidenceRefs.
- Audit all DIRECT_CANON relationships. Shared region/faction/history remains STRUCTURAL_LORE unless explicit interaction/kinship is documented.
- Audit event links with exact EventRelationRole. PARTICIPANT requires trusted PARTICIPATED_IN evidence for that exact event.
- Recompute Tier A. Never flip reviewed/verified flags just to pass the gate.

**Suggested atomic-claim queue**
- `claim:vayne:core:01` → Demacian monster hunter
- `claim:vayne:core:02` → parents killed by Evelynn
- `claim:vayne:core:03` → trained by Frey then killed Frey after discovering shapeshifting
- `claim:vayne:core:04` → Sentinel role sourced separately.

### Veigar — `veigar`

**Current state:** Tier C · `FULL_TIER_A_BUILD`
**Current blocker:** Minimal/incomplete profile: biography depth, continuity, atomic claims, trusted timeline, events and relations are insufficient.

**False / unsafe / must be removed, downgraded or kept pending**
- No specific contradiction confirmed in this pass; treat every unsourced existing statement as UNVERIFIED until checked against a real Riot source.

**Canonical information that must exist as sourced claims / bio facts**
- Yordle sorcerer captured/twisted by Mordekaiser
- tries to prove evil while often failing comically
- historical Mordekaiser link direct.

**Exactly what Cursor must add / repair**
- Primary Riot bio: `https://www.leagueoflegends.com/en-us/champions/veigar/`
- Set continuity explicitly at champion, claim and timeline level.
- Create 3–5 internal bioBlocks: FACT / SUPPORTED_SYNTHESIS / EDITORIAL_FRAMING as appropriate.
- Turn each factual item above into one atomic claim only if a real Riot source supports that exact proposition.
- For each CORE claim create an evidenceRef/sourceFact derived from the actual source content; never validate using only evidenceNote or claim regex.
- Create 3–5 meaningful timeline beats where canon supports them. Every CORE beat needs trusted claimIds + sourceIds + evidenceRefs.
- Audit all DIRECT_CANON relationships. Shared region/faction/history remains STRUCTURAL_LORE unless explicit interaction/kinship is documented.
- Audit event links with exact EventRelationRole. PARTICIPANT requires trusted PARTICIPATED_IN evidence for that exact event.
- Recompute Tier A. Never flip reviewed/verified flags just to pass the gate.

**Suggested atomic-claim queue**
- `claim:veigar:core:01` → Yordle sorcerer captured/twisted by Mordekaiser
- `claim:veigar:core:02` → tries to prove evil while often failing comically
- `claim:veigar:core:03` → historical Mordekaiser link direct.

### Vel'Koz — `velkoz`

**Current state:** Tier C · `FULL_TIER_A_BUILD`
**Current blocker:** Minimal/incomplete profile: biography depth, continuity, atomic claims, trusted timeline, events and relations are insufficient.

**False / unsafe / must be removed, downgraded or kept pending**
- No specific contradiction confirmed in this pass; treat every unsourced existing statement as UNVERIFIED until checked against a real Riot source.

**Canonical information that must exist as sourced claims / bio facts**
- Voidborn analyzer that disintegrates matter to learn
- tied to knowledge-gathering Void agenda where supported
- no Bel'Veth allegiance unless explicit.

**Exactly what Cursor must add / repair**
- Primary Riot bio: `https://www.leagueoflegends.com/en-us/champions/velkoz/`
- Set continuity explicitly at champion, claim and timeline level.
- Create 3–5 internal bioBlocks: FACT / SUPPORTED_SYNTHESIS / EDITORIAL_FRAMING as appropriate.
- Turn each factual item above into one atomic claim only if a real Riot source supports that exact proposition.
- For each CORE claim create an evidenceRef/sourceFact derived from the actual source content; never validate using only evidenceNote or claim regex.
- Create 3–5 meaningful timeline beats where canon supports them. Every CORE beat needs trusted claimIds + sourceIds + evidenceRefs.
- Audit all DIRECT_CANON relationships. Shared region/faction/history remains STRUCTURAL_LORE unless explicit interaction/kinship is documented.
- Audit event links with exact EventRelationRole. PARTICIPANT requires trusted PARTICIPATED_IN evidence for that exact event.
- Recompute Tier A. Never flip reviewed/verified flags just to pass the gate.

**Suggested atomic-claim queue**
- `claim:velkoz:core:01` → Voidborn analyzer that disintegrates matter to learn
- `claim:velkoz:core:02` → tied to knowledge-gathering Void agenda where supported
- `claim:velkoz:core:03` → no Bel'Veth allegiance unless explicit.

### Vex — `vex`

**Current state:** Tier C · `FULL_TIER_A_BUILD`
**Current blocker:** Minimal/incomplete profile: biography depth, continuity, atomic claims, trusted timeline, events and relations are insufficient.

**False / unsafe / must be removed, downgraded or kept pending**
- No specific contradiction confirmed in this pass; treat every unsourced existing statement as UNVERIFIED until checked against a real Riot source.

**Canonical information that must exist as sourced claims / bio facts**
- Bandle yordle drawn to Shadow Isles gloom
- shadow companion/power
- assisted Viego then became disillusioned
- Ruination role direct where sourced.

**Exactly what Cursor must add / repair**
- Primary Riot bio: `https://www.leagueoflegends.com/en-us/champions/vex/`
- Set continuity explicitly at champion, claim and timeline level.
- Create 3–5 internal bioBlocks: FACT / SUPPORTED_SYNTHESIS / EDITORIAL_FRAMING as appropriate.
- Turn each factual item above into one atomic claim only if a real Riot source supports that exact proposition.
- For each CORE claim create an evidenceRef/sourceFact derived from the actual source content; never validate using only evidenceNote or claim regex.
- Create 3–5 meaningful timeline beats where canon supports them. Every CORE beat needs trusted claimIds + sourceIds + evidenceRefs.
- Audit all DIRECT_CANON relationships. Shared region/faction/history remains STRUCTURAL_LORE unless explicit interaction/kinship is documented.
- Audit event links with exact EventRelationRole. PARTICIPANT requires trusted PARTICIPATED_IN evidence for that exact event.
- Recompute Tier A. Never flip reviewed/verified flags just to pass the gate.

**Suggested atomic-claim queue**
- `claim:vex:core:01` → Bandle yordle drawn to Shadow Isles gloom
- `claim:vex:core:02` → shadow companion/power
- `claim:vex:core:03` → assisted Viego then became disillusioned
- `claim:vex:core:04` → Ruination role direct where sourced.

### Vi — `vi`

**Current state:** Tier C · `CURATED_PROVENANCE_GAP`
**Current blocker:** Existing curated profile lacks enough exact source-backed claims/timeline/continuity coverage for Tier A.

**False / unsafe / must be removed, downgraded or kept pending**
- Do not silently import ARCANE childhood/family chronology into MAIN_RUNETERRA.

**Canonical information that must exist as sourced claims / bio facts**
- Piltover Enforcer with Zaunite origins
- Caitlyn partnership direct but continuity-sensitive
- Jinx sisterhood ARCANE-explicit and not silently MAIN_RUNETERRA unless merged.

**Exactly what Cursor must add / repair**
- Primary Riot bio: `https://www.leagueoflegends.com/en-us/champions/vi/`
- Set continuity explicitly at champion, claim and timeline level.
- Create 3–5 internal bioBlocks: FACT / SUPPORTED_SYNTHESIS / EDITORIAL_FRAMING as appropriate.
- Turn each factual item above into one atomic claim only if a real Riot source supports that exact proposition.
- For each CORE claim create an evidenceRef/sourceFact derived from the actual source content; never validate using only evidenceNote or claim regex.
- Create 3–5 meaningful timeline beats where canon supports them. Every CORE beat needs trusted claimIds + sourceIds + evidenceRefs.
- Audit all DIRECT_CANON relationships. Shared region/faction/history remains STRUCTURAL_LORE unless explicit interaction/kinship is documented.
- Audit event links with exact EventRelationRole. PARTICIPANT requires trusted PARTICIPATED_IN evidence for that exact event.
- Recompute Tier A. Never flip reviewed/verified flags just to pass the gate.

**Suggested atomic-claim queue**
- `claim:vi:core:01` → Piltover Enforcer with Zaunite origins
- `claim:vi:core:02` → Caitlyn partnership direct but continuity-sensitive
- `claim:vi:core:03` → Jinx sisterhood ARCANE-explicit and not silently MAIN_RUNETERRA unless merged.

### Viego — `viego`

**Current state:** Tier C · `CURATED_PROVENANCE_GAP`
**Current blocker:** Existing curated profile lacks enough exact source-backed claims/timeline/continuity coverage for Tier A.

**False / unsafe / must be removed, downgraded or kept pending**
- No specific contradiction confirmed in this pass; treat every unsourced existing statement as UNVERIFIED until checked against a real Riot source.

**Canonical information that must exist as sourced claims / bio facts**
- Camavoran king
- husband of Isolde
- revival attempt caused Ruination
- became Ruined King
- modern campaign/defeat reconcile Riot Forge and Sentinels continuity.

**Exactly what Cursor must add / repair**
- Primary Riot bio: `https://www.leagueoflegends.com/en-us/champions/viego/`
- Set continuity explicitly at champion, claim and timeline level.
- Create 3–5 internal bioBlocks: FACT / SUPPORTED_SYNTHESIS / EDITORIAL_FRAMING as appropriate.
- Turn each factual item above into one atomic claim only if a real Riot source supports that exact proposition.
- For each CORE claim create an evidenceRef/sourceFact derived from the actual source content; never validate using only evidenceNote or claim regex.
- Create 3–5 meaningful timeline beats where canon supports them. Every CORE beat needs trusted claimIds + sourceIds + evidenceRefs.
- Audit all DIRECT_CANON relationships. Shared region/faction/history remains STRUCTURAL_LORE unless explicit interaction/kinship is documented.
- Audit event links with exact EventRelationRole. PARTICIPANT requires trusted PARTICIPATED_IN evidence for that exact event.
- Recompute Tier A. Never flip reviewed/verified flags just to pass the gate.

**Suggested atomic-claim queue**
- `claim:viego:core:01` → Camavoran king
- `claim:viego:core:02` → husband of Isolde
- `claim:viego:core:03` → revival attempt caused Ruination
- `claim:viego:core:04` → became Ruined King
- `claim:viego:core:05` → modern campaign/defeat reconcile Riot Forge and Sentinels continuity.

### Viktor — `viktor`

**Current state:** Tier C · `CURATED_PROVENANCE_GAP`
**Current blocker:** Existing curated profile lacks enough exact source-backed claims/timeline/continuity coverage for Tier A.

**False / unsafe / must be removed, downgraded or kept pending**
- Remove obsolete pre-update facts that conflict with current official Viktor canon; do not silently merge ARCANE into MAIN_RUNETERRA.

**Canonical information that must exist as sourced claims / bio facts**
- Current official canon substantially revised
- audit title/body transformation/Hexcore/Glorious Evolution against current Riot bio
- Jayce relation continuity-specific
- remove obsolete conflicting pre-update facts.

**Exactly what Cursor must add / repair**
- Primary Riot bio: `https://www.leagueoflegends.com/en-us/champions/viktor/`
- Set continuity explicitly at champion, claim and timeline level.
- Create 3–5 internal bioBlocks: FACT / SUPPORTED_SYNTHESIS / EDITORIAL_FRAMING as appropriate.
- Turn each factual item above into one atomic claim only if a real Riot source supports that exact proposition.
- For each CORE claim create an evidenceRef/sourceFact derived from the actual source content; never validate using only evidenceNote or claim regex.
- Create 3–5 meaningful timeline beats where canon supports them. Every CORE beat needs trusted claimIds + sourceIds + evidenceRefs.
- Audit all DIRECT_CANON relationships. Shared region/faction/history remains STRUCTURAL_LORE unless explicit interaction/kinship is documented.
- Audit event links with exact EventRelationRole. PARTICIPANT requires trusted PARTICIPATED_IN evidence for that exact event.
- Recompute Tier A. Never flip reviewed/verified flags just to pass the gate.

**Suggested atomic-claim queue**
- `claim:viktor:core:01` → Current official canon substantially revised
- `claim:viktor:core:02` → audit title/body transformation/Hexcore/Glorious Evolution against current Riot bio
- `claim:viktor:core:03` → Jayce relation continuity-specific
- `claim:viktor:core:04` → remove obsolete conflicting pre-update facts.

### Vladimir — `vladimir`

**Current state:** Tier C · `FULL_TIER_A_BUILD`
**Current blocker:** Minimal/incomplete profile: biography depth, continuity, atomic claims, trusted timeline, events and relations are insufficient.

**False / unsafe / must be removed, downgraded or kept pending**
- No specific contradiction confirmed in this pass; treat every unsourced existing statement as UNVERIFIED until checked against a real Riot source.

**Canonical information that must exist as sourced claims / bio facts**
- Ancient hemomancer from Camavoran royal line
- relative/uncle of Viego in current canon
- learned blood magic from Darkin masters
- not a Darkin.

**Exactly what Cursor must add / repair**
- Primary Riot bio: `https://www.leagueoflegends.com/en-us/champions/vladimir/`
- Set continuity explicitly at champion, claim and timeline level.
- Create 3–5 internal bioBlocks: FACT / SUPPORTED_SYNTHESIS / EDITORIAL_FRAMING as appropriate.
- Turn each factual item above into one atomic claim only if a real Riot source supports that exact proposition.
- For each CORE claim create an evidenceRef/sourceFact derived from the actual source content; never validate using only evidenceNote or claim regex.
- Create 3–5 meaningful timeline beats where canon supports them. Every CORE beat needs trusted claimIds + sourceIds + evidenceRefs.
- Audit all DIRECT_CANON relationships. Shared region/faction/history remains STRUCTURAL_LORE unless explicit interaction/kinship is documented.
- Audit event links with exact EventRelationRole. PARTICIPANT requires trusted PARTICIPATED_IN evidence for that exact event.
- Recompute Tier A. Never flip reviewed/verified flags just to pass the gate.

**Suggested atomic-claim queue**
- `claim:vladimir:core:01` → Ancient hemomancer from Camavoran royal line
- `claim:vladimir:core:02` → relative/uncle of Viego in current canon
- `claim:vladimir:core:03` → learned blood magic from Darkin masters
- `claim:vladimir:core:04` → not a Darkin.

### Volibear — `volibear`

**Current state:** Tier C · `FULL_TIER_A_BUILD`
**Current blocker:** Minimal/incomplete profile: biography depth, continuity, atomic claims, trusted timeline, events and relations are insufficient.

**False / unsafe / must be removed, downgraded or kept pending**
- No specific contradiction confirmed in this pass; treat every unsourced existing statement as UNVERIFIED until checked against a real Riot source.

**Canonical information that must exist as sourced claims / bio facts**
- Freljordian demigod of storms/wilderness
- sibling/rival mythology with Ornn/Anivia
- opposes civilization
- Lissandra conflict and myths source/labeled carefully.

**Exactly what Cursor must add / repair**
- Primary Riot bio: `https://www.leagueoflegends.com/en-us/champions/volibear/`
- Set continuity explicitly at champion, claim and timeline level.
- Create 3–5 internal bioBlocks: FACT / SUPPORTED_SYNTHESIS / EDITORIAL_FRAMING as appropriate.
- Turn each factual item above into one atomic claim only if a real Riot source supports that exact proposition.
- For each CORE claim create an evidenceRef/sourceFact derived from the actual source content; never validate using only evidenceNote or claim regex.
- Create 3–5 meaningful timeline beats where canon supports them. Every CORE beat needs trusted claimIds + sourceIds + evidenceRefs.
- Audit all DIRECT_CANON relationships. Shared region/faction/history remains STRUCTURAL_LORE unless explicit interaction/kinship is documented.
- Audit event links with exact EventRelationRole. PARTICIPANT requires trusted PARTICIPATED_IN evidence for that exact event.
- Recompute Tier A. Never flip reviewed/verified flags just to pass the gate.

**Suggested atomic-claim queue**
- `claim:volibear:core:01` → Freljordian demigod of storms/wilderness
- `claim:volibear:core:02` → sibling/rival mythology with Ornn/Anivia
- `claim:volibear:core:03` → opposes civilization
- `claim:volibear:core:04` → Lissandra conflict and myths source/labeled carefully.

### Warwick — `warwick`

**Current state:** Tier C · `FULL_TIER_A_BUILD`
**Current blocker:** Minimal/incomplete profile: biography depth, continuity, atomic claims, trusted timeline, events and relations are insufficient.

**False / unsafe / must be removed, downgraded or kept pending**
- Do not assert ARCANE identity details as MAIN_RUNETERRA unless Riot explicitly reconciles them.

**Canonical information that must exist as sourced claims / bio facts**
- Zaunite monster created by agonizing experimentation
- hunts blood while retaining human fragments
- Singed link direct in classic canon
- Arcane identity details continuity-labeled.

**Exactly what Cursor must add / repair**
- Primary Riot bio: `https://www.leagueoflegends.com/en-us/champions/warwick/`
- Set continuity explicitly at champion, claim and timeline level.
- Create 3–5 internal bioBlocks: FACT / SUPPORTED_SYNTHESIS / EDITORIAL_FRAMING as appropriate.
- Turn each factual item above into one atomic claim only if a real Riot source supports that exact proposition.
- For each CORE claim create an evidenceRef/sourceFact derived from the actual source content; never validate using only evidenceNote or claim regex.
- Create 3–5 meaningful timeline beats where canon supports them. Every CORE beat needs trusted claimIds + sourceIds + evidenceRefs.
- Audit all DIRECT_CANON relationships. Shared region/faction/history remains STRUCTURAL_LORE unless explicit interaction/kinship is documented.
- Audit event links with exact EventRelationRole. PARTICIPANT requires trusted PARTICIPATED_IN evidence for that exact event.
- Recompute Tier A. Never flip reviewed/verified flags just to pass the gate.

**Suggested atomic-claim queue**
- `claim:warwick:core:01` → Zaunite monster created by agonizing experimentation
- `claim:warwick:core:02` → hunts blood while retaining human fragments
- `claim:warwick:core:03` → Singed link direct in classic canon
- `claim:warwick:core:04` → Arcane identity details continuity-labeled.

### Wukong — `wukong`

**Current state:** Tier C · `FULL_TIER_A_BUILD`
**Current blocker:** Minimal/incomplete profile: biography depth, continuity, atomic claims, trusted timeline, events and relations are insufficient.

**False / unsafe / must be removed, downgraded or kept pending**
- No specific contradiction confirmed in this pass; treat every unsourced existing statement as UNVERIFIED until checked against a real Riot source.

**Canonical information that must exist as sourced claims / bio facts**
- Shimon vastaya from Ionia
- trained by Master Yi in Wuju
- took Wukong name/title where sourced
- no Journey-to-the-West assumptions.

**Exactly what Cursor must add / repair**
- Primary Riot bio: `https://www.leagueoflegends.com/en-us/champions/wukong/`
- Set continuity explicitly at champion, claim and timeline level.
- Create 3–5 internal bioBlocks: FACT / SUPPORTED_SYNTHESIS / EDITORIAL_FRAMING as appropriate.
- Turn each factual item above into one atomic claim only if a real Riot source supports that exact proposition.
- For each CORE claim create an evidenceRef/sourceFact derived from the actual source content; never validate using only evidenceNote or claim regex.
- Create 3–5 meaningful timeline beats where canon supports them. Every CORE beat needs trusted claimIds + sourceIds + evidenceRefs.
- Audit all DIRECT_CANON relationships. Shared region/faction/history remains STRUCTURAL_LORE unless explicit interaction/kinship is documented.
- Audit event links with exact EventRelationRole. PARTICIPANT requires trusted PARTICIPATED_IN evidence for that exact event.
- Recompute Tier A. Never flip reviewed/verified flags just to pass the gate.

**Suggested atomic-claim queue**
- `claim:wukong:core:01` → Shimon vastaya from Ionia
- `claim:wukong:core:02` → trained by Master Yi in Wuju
- `claim:wukong:core:03` → took Wukong name/title where sourced
- `claim:wukong:core:04` → no Journey-to-the-West assumptions.

### Xayah — `xayah`

**Current state:** Tier C · `CURATED_PROVENANCE_GAP`
**Current blocker:** Existing curated profile lacks enough exact source-backed claims/timeline/continuity coverage for Tier A.

**False / unsafe / must be removed, downgraded or kept pending**
- No specific contradiction confirmed in this pass; treat every unsourced existing statement as UNVERIFIED until checked against a real Riot source.

**Canonical information that must exist as sourced claims / bio facts**
- Vastayan revolutionary
- partner of Rakan
- fights for vastayan freedom and magic
- Rakan direct, other Ionian links structural unless sourced.

**Exactly what Cursor must add / repair**
- Primary Riot bio: `https://www.leagueoflegends.com/en-us/champions/xayah/`
- Set continuity explicitly at champion, claim and timeline level.
- Create 3–5 internal bioBlocks: FACT / SUPPORTED_SYNTHESIS / EDITORIAL_FRAMING as appropriate.
- Turn each factual item above into one atomic claim only if a real Riot source supports that exact proposition.
- For each CORE claim create an evidenceRef/sourceFact derived from the actual source content; never validate using only evidenceNote or claim regex.
- Create 3–5 meaningful timeline beats where canon supports them. Every CORE beat needs trusted claimIds + sourceIds + evidenceRefs.
- Audit all DIRECT_CANON relationships. Shared region/faction/history remains STRUCTURAL_LORE unless explicit interaction/kinship is documented.
- Audit event links with exact EventRelationRole. PARTICIPANT requires trusted PARTICIPATED_IN evidence for that exact event.
- Recompute Tier A. Never flip reviewed/verified flags just to pass the gate.

**Suggested atomic-claim queue**
- `claim:xayah:core:01` → Vastayan revolutionary
- `claim:xayah:core:02` → partner of Rakan
- `claim:xayah:core:03` → fights for vastayan freedom and magic
- `claim:xayah:core:04` → Rakan direct, other Ionian links structural unless sourced.

### Xerath — `xerath`

**Current state:** Tier B · `PHASE1_REVALIDATE`
**Current blocker:** canonConfidence 75 < 85

**False / unsafe / must be removed, downgraded or kept pending**
- No specific contradiction confirmed in this pass; treat every unsourced existing statement as UNVERIFIED until checked against a real Riot source.

**Canonical information that must exist as sourced claims / bio facts**
- Born enslaved in ancient Shurima
- close to Azir
- betrayed Azir at Ascension and took power
- imprisoned with Renekton
- escaped in modern era.

**Exactly what Cursor must add / repair**
- Primary Riot bio: `https://www.leagueoflegends.com/en-us/champions/xerath/`
- Set continuity explicitly at champion, claim and timeline level.
- Create 3–5 internal bioBlocks: FACT / SUPPORTED_SYNTHESIS / EDITORIAL_FRAMING as appropriate.
- Turn each factual item above into one atomic claim only if a real Riot source supports that exact proposition.
- For each CORE claim create an evidenceRef/sourceFact derived from the actual source content; never validate using only evidenceNote or claim regex.
- Create 3–5 meaningful timeline beats where canon supports them. Every CORE beat needs trusted claimIds + sourceIds + evidenceRefs.
- Audit all DIRECT_CANON relationships. Shared region/faction/history remains STRUCTURAL_LORE unless explicit interaction/kinship is documented.
- Audit event links with exact EventRelationRole. PARTICIPANT requires trusted PARTICIPATED_IN evidence for that exact event.
- Recompute Tier A. Never flip reviewed/verified flags just to pass the gate.

**Suggested atomic-claim queue**
- `claim:xerath:core:01` → Born enslaved in ancient Shurima
- `claim:xerath:core:02` → close to Azir
- `claim:xerath:core:03` → betrayed Azir at Ascension and took power
- `claim:xerath:core:04` → imprisoned with Renekton
- `claim:xerath:core:05` → escaped in modern era.

### Xin Zhao — `xin-zhao`

**Current state:** Tier C · `FULL_TIER_A_BUILD`
**Current blocker:** Minimal/incomplete profile: biography depth, continuity, atomic claims, trusted timeline, events and relations are insufficient.

**False / unsafe / must be removed, downgraded or kept pending**
- No specific contradiction confirmed in this pass; treat every unsourced existing statement as UNVERIFIED until checked against a real Riot source.

**Canonical information that must exist as sourced claims / bio facts**
- Demacian seneschal/warrior
- former Noxian arena fighter/prisoner
- served Jarvan dynasty after liberation
- exact royal relationships/dates sourced.

**Exactly what Cursor must add / repair**
- Primary Riot bio: `https://www.leagueoflegends.com/en-us/champions/xin-zhao/`
- Set continuity explicitly at champion, claim and timeline level.
- Create 3–5 internal bioBlocks: FACT / SUPPORTED_SYNTHESIS / EDITORIAL_FRAMING as appropriate.
- Turn each factual item above into one atomic claim only if a real Riot source supports that exact proposition.
- For each CORE claim create an evidenceRef/sourceFact derived from the actual source content; never validate using only evidenceNote or claim regex.
- Create 3–5 meaningful timeline beats where canon supports them. Every CORE beat needs trusted claimIds + sourceIds + evidenceRefs.
- Audit all DIRECT_CANON relationships. Shared region/faction/history remains STRUCTURAL_LORE unless explicit interaction/kinship is documented.
- Audit event links with exact EventRelationRole. PARTICIPANT requires trusted PARTICIPATED_IN evidence for that exact event.
- Recompute Tier A. Never flip reviewed/verified flags just to pass the gate.

**Suggested atomic-claim queue**
- `claim:xin-zhao:core:01` → Demacian seneschal/warrior
- `claim:xin-zhao:core:02` → former Noxian arena fighter/prisoner
- `claim:xin-zhao:core:03` → served Jarvan dynasty after liberation
- `claim:xin-zhao:core:04` → exact royal relationships/dates sourced.

### Yasuo — `yasuo`

**Current state:** Tier C · `CURATED_PROVENANCE_GAP`
**Current blocker:** Existing curated profile lacks enough exact source-backed claims/timeline/continuity coverage for Tier A.

**False / unsafe / must be removed, downgraded or kept pending**
- No specific contradiction confirmed in this pass; treat every unsourced existing statement as UNVERIFIED until checked against a real Riot source.

**Canonical information that must exist as sourced claims / bio facts**
- Ionian swordsman tasked to protect Elder Souma
- left post during invasion
- blamed for Souma death
- killed Yone in duel
- later truth/exoneration and Taliyah mentorship source precisely.

**Exactly what Cursor must add / repair**
- Primary Riot bio: `https://www.leagueoflegends.com/en-us/champions/yasuo/`
- Set continuity explicitly at champion, claim and timeline level.
- Create 3–5 internal bioBlocks: FACT / SUPPORTED_SYNTHESIS / EDITORIAL_FRAMING as appropriate.
- Turn each factual item above into one atomic claim only if a real Riot source supports that exact proposition.
- For each CORE claim create an evidenceRef/sourceFact derived from the actual source content; never validate using only evidenceNote or claim regex.
- Create 3–5 meaningful timeline beats where canon supports them. Every CORE beat needs trusted claimIds + sourceIds + evidenceRefs.
- Audit all DIRECT_CANON relationships. Shared region/faction/history remains STRUCTURAL_LORE unless explicit interaction/kinship is documented.
- Audit event links with exact EventRelationRole. PARTICIPANT requires trusted PARTICIPATED_IN evidence for that exact event.
- Recompute Tier A. Never flip reviewed/verified flags just to pass the gate.

**Suggested atomic-claim queue**
- `claim:yasuo:core:01` → Ionian swordsman tasked to protect Elder Souma
- `claim:yasuo:core:02` → left post during invasion
- `claim:yasuo:core:03` → blamed for Souma death
- `claim:yasuo:core:04` → killed Yone in duel
- `claim:yasuo:core:05` → later truth/exoneration and Taliyah mentorship source precisely.

### Yone — `yone`

**Current state:** Tier C · `CURATED_PROVENANCE_GAP`
**Current blocker:** Existing curated profile lacks enough exact source-backed claims/timeline/continuity coverage for Tier A.

**False / unsafe / must be removed, downgraded or kept pending**
- No specific contradiction confirmed in this pass; treat every unsourced existing statement as UNVERIFIED until checked against a real Riot source.

**Canonical information that must exist as sourced claims / bio facts**
- Yasuo's older brother
- killed by Yasuo in mortal life
- returned after azakana encounter/bond
- hunts azakana
- not simple undead.

**Exactly what Cursor must add / repair**
- Primary Riot bio: `https://www.leagueoflegends.com/en-us/champions/yone/`
- Set continuity explicitly at champion, claim and timeline level.
- Create 3–5 internal bioBlocks: FACT / SUPPORTED_SYNTHESIS / EDITORIAL_FRAMING as appropriate.
- Turn each factual item above into one atomic claim only if a real Riot source supports that exact proposition.
- For each CORE claim create an evidenceRef/sourceFact derived from the actual source content; never validate using only evidenceNote or claim regex.
- Create 3–5 meaningful timeline beats where canon supports them. Every CORE beat needs trusted claimIds + sourceIds + evidenceRefs.
- Audit all DIRECT_CANON relationships. Shared region/faction/history remains STRUCTURAL_LORE unless explicit interaction/kinship is documented.
- Audit event links with exact EventRelationRole. PARTICIPANT requires trusted PARTICIPATED_IN evidence for that exact event.
- Recompute Tier A. Never flip reviewed/verified flags just to pass the gate.

**Suggested atomic-claim queue**
- `claim:yone:core:01` → Yasuo's older brother
- `claim:yone:core:02` → killed by Yasuo in mortal life
- `claim:yone:core:03` → returned after azakana encounter/bond
- `claim:yone:core:04` → hunts azakana
- `claim:yone:core:05` → not simple undead.

### Yorick — `yorick`

**Current state:** Tier C · `FULL_TIER_A_BUILD`
**Current blocker:** Minimal/incomplete profile: biography depth, continuity, atomic claims, trusted timeline, events and relations are insufficient.

**False / unsafe / must be removed, downgraded or kept pending**
- No specific contradiction confirmed in this pass; treat every unsourced existing statement as UNVERIFIED until checked against a real Riot source.

**Canonical information that must exist as sourced claims / bio facts**
- Blessed Isles monk who communes with dead
- survived Ruination via holy water/vial lore
- commands Mist Walkers/Maiden-like entity
- seeks end of curse.

**Exactly what Cursor must add / repair**
- Primary Riot bio: `https://www.leagueoflegends.com/en-us/champions/yorick/`
- Set continuity explicitly at champion, claim and timeline level.
- Create 3–5 internal bioBlocks: FACT / SUPPORTED_SYNTHESIS / EDITORIAL_FRAMING as appropriate.
- Turn each factual item above into one atomic claim only if a real Riot source supports that exact proposition.
- For each CORE claim create an evidenceRef/sourceFact derived from the actual source content; never validate using only evidenceNote or claim regex.
- Create 3–5 meaningful timeline beats where canon supports them. Every CORE beat needs trusted claimIds + sourceIds + evidenceRefs.
- Audit all DIRECT_CANON relationships. Shared region/faction/history remains STRUCTURAL_LORE unless explicit interaction/kinship is documented.
- Audit event links with exact EventRelationRole. PARTICIPANT requires trusted PARTICIPATED_IN evidence for that exact event.
- Recompute Tier A. Never flip reviewed/verified flags just to pass the gate.

**Suggested atomic-claim queue**
- `claim:yorick:core:01` → Blessed Isles monk who communes with dead
- `claim:yorick:core:02` → survived Ruination via holy water/vial lore
- `claim:yorick:core:03` → commands Mist Walkers/Maiden-like entity
- `claim:yorick:core:04` → seeks end of curse.

### Yunara — `yunara`

**Current state:** Tier B · `CURATED_PROVENANCE_GAP`
**Current blocker:** Existing curated profile lacks enough exact source-backed claims/timeline/continuity coverage for Tier A.

**False / unsafe / must be removed, downgraded or kept pending**
- Aion Er'na is an ARTIFACT. Kinkou association does not prove personal interaction with Shen or Akali.

**Canonical information that must exist as sourced claims / bio facts**
- Ionian devotee
- centuries in spirit realm
- wields Aion Er'na as ARTIFACT
- returned to changed Ionia
- Pilgrimage/Sanctuary/Battle of Koeshin only when official source supports
- Shen/Akali not direct without interaction.

**Exactly what Cursor must add / repair**
- Primary Riot bio: `https://www.leagueoflegends.com/en-us/champions/yunara/`
- Set continuity explicitly at champion, claim and timeline level.
- Create 3–5 internal bioBlocks: FACT / SUPPORTED_SYNTHESIS / EDITORIAL_FRAMING as appropriate.
- Turn each factual item above into one atomic claim only if a real Riot source supports that exact proposition.
- For each CORE claim create an evidenceRef/sourceFact derived from the actual source content; never validate using only evidenceNote or claim regex.
- Create 3–5 meaningful timeline beats where canon supports them. Every CORE beat needs trusted claimIds + sourceIds + evidenceRefs.
- Audit all DIRECT_CANON relationships. Shared region/faction/history remains STRUCTURAL_LORE unless explicit interaction/kinship is documented.
- Audit event links with exact EventRelationRole. PARTICIPANT requires trusted PARTICIPATED_IN evidence for that exact event.
- Recompute Tier A. Never flip reviewed/verified flags just to pass the gate.

**Suggested atomic-claim queue**
- `claim:yunara:core:01` → Ionian devotee
- `claim:yunara:core:02` → centuries in spirit realm
- `claim:yunara:core:03` → wields Aion Er'na as ARTIFACT
- `claim:yunara:core:04` → returned to changed Ionia
- `claim:yunara:core:05` → Pilgrimage/Sanctuary/Battle of Koeshin only when official source supports
- `claim:yunara:core:06` → Shen/Akali not direct without interaction.

### Yuumi — `yuumi`

**Current state:** Tier C · `FULL_TIER_A_BUILD`
**Current blocker:** Minimal/incomplete profile: biography depth, continuity, atomic claims, trusted timeline, events and relations are insufficient.

**False / unsafe / must be removed, downgraded or kept pending**
- No specific contradiction confirmed in this pass; treat every unsourced existing statement as UNVERIFIED until checked against a real Riot source.

**Canonical information that must exist as sourced claims / bio facts**
- Magical cat familiar of Norra
- travels with Book of Thresholds searching for Norra
- Bandle portal travel core
- no gameplay-derived friendships.

**Exactly what Cursor must add / repair**
- Primary Riot bio: `https://www.leagueoflegends.com/en-us/champions/yuumi/`
- Set continuity explicitly at champion, claim and timeline level.
- Create 3–5 internal bioBlocks: FACT / SUPPORTED_SYNTHESIS / EDITORIAL_FRAMING as appropriate.
- Turn each factual item above into one atomic claim only if a real Riot source supports that exact proposition.
- For each CORE claim create an evidenceRef/sourceFact derived from the actual source content; never validate using only evidenceNote or claim regex.
- Create 3–5 meaningful timeline beats where canon supports them. Every CORE beat needs trusted claimIds + sourceIds + evidenceRefs.
- Audit all DIRECT_CANON relationships. Shared region/faction/history remains STRUCTURAL_LORE unless explicit interaction/kinship is documented.
- Audit event links with exact EventRelationRole. PARTICIPANT requires trusted PARTICIPATED_IN evidence for that exact event.
- Recompute Tier A. Never flip reviewed/verified flags just to pass the gate.

**Suggested atomic-claim queue**
- `claim:yuumi:core:01` → Magical cat familiar of Norra
- `claim:yuumi:core:02` → travels with Book of Thresholds searching for Norra
- `claim:yuumi:core:03` → Bandle portal travel core
- `claim:yuumi:core:04` → no gameplay-derived friendships.

### Zaahen — `zaahen`

**Current state:** Tier C · `CURATED_PROVENANCE_GAP`
**Current blocker:** Existing curated profile lacks enough exact source-backed claims/timeline/continuity coverage for Tier A.

**False / unsafe / must be removed, downgraded or kept pending**
- Do not use the generic Darkin involuntary-host template; voluntary sealing in his glaive is defining current canon.

**Canonical information that must exist as sourced claims / bio facts**
- Fallen god/Darkin-related being
- hunts fellow Darkin
- voluntarily sealed in glaive to resist corruption/madness
- now free
- do not apply generic involuntary-host Darkin template.

**Exactly what Cursor must add / repair**
- Primary Riot bio: `https://www.leagueoflegends.com/en-us/champions/zaahen/`
- Set continuity explicitly at champion, claim and timeline level.
- Create 3–5 internal bioBlocks: FACT / SUPPORTED_SYNTHESIS / EDITORIAL_FRAMING as appropriate.
- Turn each factual item above into one atomic claim only if a real Riot source supports that exact proposition.
- For each CORE claim create an evidenceRef/sourceFact derived from the actual source content; never validate using only evidenceNote or claim regex.
- Create 3–5 meaningful timeline beats where canon supports them. Every CORE beat needs trusted claimIds + sourceIds + evidenceRefs.
- Audit all DIRECT_CANON relationships. Shared region/faction/history remains STRUCTURAL_LORE unless explicit interaction/kinship is documented.
- Audit event links with exact EventRelationRole. PARTICIPANT requires trusted PARTICIPATED_IN evidence for that exact event.
- Recompute Tier A. Never flip reviewed/verified flags just to pass the gate.

**Suggested atomic-claim queue**
- `claim:zaahen:core:01` → Fallen god/Darkin-related being
- `claim:zaahen:core:02` → hunts fellow Darkin
- `claim:zaahen:core:03` → voluntarily sealed in glaive to resist corruption/madness
- `claim:zaahen:core:04` → now free
- `claim:zaahen:core:05` → do not apply generic involuntary-host Darkin template.

### Zac — `zac`

**Current state:** Tier C · `FULL_TIER_A_BUILD`
**Current blocker:** Minimal/incomplete profile: biography depth, continuity, atomic claims, trusted timeline, events and relations are insufficient.

**False / unsafe / must be removed, downgraded or kept pending**
- No specific contradiction confirmed in this pass; treat every unsourced existing statement as UNVERIFIED until checked against a real Riot source.

**Canonical information that must exist as sourced claims / bio facts**
- Zaunite amorphous being created from toxic/chemical experiment
- raised by caring scientists/parents in classic lore
- protects people
- check current retcons.

**Exactly what Cursor must add / repair**
- Primary Riot bio: `https://www.leagueoflegends.com/en-us/champions/zac/`
- Set continuity explicitly at champion, claim and timeline level.
- Create 3–5 internal bioBlocks: FACT / SUPPORTED_SYNTHESIS / EDITORIAL_FRAMING as appropriate.
- Turn each factual item above into one atomic claim only if a real Riot source supports that exact proposition.
- For each CORE claim create an evidenceRef/sourceFact derived from the actual source content; never validate using only evidenceNote or claim regex.
- Create 3–5 meaningful timeline beats where canon supports them. Every CORE beat needs trusted claimIds + sourceIds + evidenceRefs.
- Audit all DIRECT_CANON relationships. Shared region/faction/history remains STRUCTURAL_LORE unless explicit interaction/kinship is documented.
- Audit event links with exact EventRelationRole. PARTICIPANT requires trusted PARTICIPATED_IN evidence for that exact event.
- Recompute Tier A. Never flip reviewed/verified flags just to pass the gate.

**Suggested atomic-claim queue**
- `claim:zac:core:01` → Zaunite amorphous being created from toxic/chemical experiment
- `claim:zac:core:02` → raised by caring scientists/parents in classic lore
- `claim:zac:core:03` → protects people
- `claim:zac:core:04` → check current retcons.

### Zed — `zed`

**Current state:** Tier C · `FULL_TIER_A_BUILD`
**Current blocker:** Minimal/incomplete profile: biography depth, continuity, atomic claims, trusted timeline, events and relations are insufficient.

**False / unsafe / must be removed, downgraded or kept pending**
- No specific contradiction confirmed in this pass; treat every unsourced existing statement as UNVERIFIED until checked against a real Riot source.

**Canonical information that must exist as sourced claims / bio facts**
- Leader of Order of Shadow
- former Kinkou student with Shen
- Kusho/Jhin history central
- forbidden shadow magic
- invasion/Kinkou split timeline sourced.

**Exactly what Cursor must add / repair**
- Primary Riot bio: `https://www.leagueoflegends.com/en-us/champions/zed/`
- Set continuity explicitly at champion, claim and timeline level.
- Create 3–5 internal bioBlocks: FACT / SUPPORTED_SYNTHESIS / EDITORIAL_FRAMING as appropriate.
- Turn each factual item above into one atomic claim only if a real Riot source supports that exact proposition.
- For each CORE claim create an evidenceRef/sourceFact derived from the actual source content; never validate using only evidenceNote or claim regex.
- Create 3–5 meaningful timeline beats where canon supports them. Every CORE beat needs trusted claimIds + sourceIds + evidenceRefs.
- Audit all DIRECT_CANON relationships. Shared region/faction/history remains STRUCTURAL_LORE unless explicit interaction/kinship is documented.
- Audit event links with exact EventRelationRole. PARTICIPANT requires trusted PARTICIPATED_IN evidence for that exact event.
- Recompute Tier A. Never flip reviewed/verified flags just to pass the gate.

**Suggested atomic-claim queue**
- `claim:zed:core:01` → Leader of Order of Shadow
- `claim:zed:core:02` → former Kinkou student with Shen
- `claim:zed:core:03` → Kusho/Jhin history central
- `claim:zed:core:04` → forbidden shadow magic
- `claim:zed:core:05` → invasion/Kinkou split timeline sourced.

### Zeri — `zeri`

**Current state:** Tier C · `FULL_TIER_A_BUILD`
**Current blocker:** Minimal/incomplete profile: biography depth, continuity, atomic claims, trusted timeline, events and relations are insufficient.

**False / unsafe / must be removed, downgraded or kept pending**
- No specific contradiction confirmed in this pass; treat every unsourced existing statement as UNVERIFIED until checked against a real Riot source.

**Canonical information that must exist as sourced claims / bio facts**
- Zaunite young woman with electric magic
- uses homemade equipment/gun
- protects community from chem-baron exploitation
- no Arcane insertion without official source.

**Exactly what Cursor must add / repair**
- Primary Riot bio: `https://www.leagueoflegends.com/en-us/champions/zeri/`
- Set continuity explicitly at champion, claim and timeline level.
- Create 3–5 internal bioBlocks: FACT / SUPPORTED_SYNTHESIS / EDITORIAL_FRAMING as appropriate.
- Turn each factual item above into one atomic claim only if a real Riot source supports that exact proposition.
- For each CORE claim create an evidenceRef/sourceFact derived from the actual source content; never validate using only evidenceNote or claim regex.
- Create 3–5 meaningful timeline beats where canon supports them. Every CORE beat needs trusted claimIds + sourceIds + evidenceRefs.
- Audit all DIRECT_CANON relationships. Shared region/faction/history remains STRUCTURAL_LORE unless explicit interaction/kinship is documented.
- Audit event links with exact EventRelationRole. PARTICIPANT requires trusted PARTICIPATED_IN evidence for that exact event.
- Recompute Tier A. Never flip reviewed/verified flags just to pass the gate.

**Suggested atomic-claim queue**
- `claim:zeri:core:01` → Zaunite young woman with electric magic
- `claim:zeri:core:02` → uses homemade equipment/gun
- `claim:zeri:core:03` → protects community from chem-baron exploitation
- `claim:zeri:core:04` → no Arcane insertion without official source.

### Ziggs — `ziggs`

**Current state:** Tier C · `FULL_TIER_A_BUILD`
**Current blocker:** Minimal/incomplete profile: biography depth, continuity, atomic claims, trusted timeline, events and relations are insufficient.

**False / unsafe / must be removed, downgraded or kept pending**
- No specific contradiction confirmed in this pass; treat every unsourced existing statement as UNVERIFIED until checked against a real Riot source.

**Canonical information that must exist as sourced claims / bio facts**
- Yordle explosives expert
- associated with Piltover/Zaun
- Heimerdinger friendship from older lore must be current-status checked
- no overstated political role.

**Exactly what Cursor must add / repair**
- Primary Riot bio: `https://www.leagueoflegends.com/en-us/champions/ziggs/`
- Set continuity explicitly at champion, claim and timeline level.
- Create 3–5 internal bioBlocks: FACT / SUPPORTED_SYNTHESIS / EDITORIAL_FRAMING as appropriate.
- Turn each factual item above into one atomic claim only if a real Riot source supports that exact proposition.
- For each CORE claim create an evidenceRef/sourceFact derived from the actual source content; never validate using only evidenceNote or claim regex.
- Create 3–5 meaningful timeline beats where canon supports them. Every CORE beat needs trusted claimIds + sourceIds + evidenceRefs.
- Audit all DIRECT_CANON relationships. Shared region/faction/history remains STRUCTURAL_LORE unless explicit interaction/kinship is documented.
- Audit event links with exact EventRelationRole. PARTICIPANT requires trusted PARTICIPATED_IN evidence for that exact event.
- Recompute Tier A. Never flip reviewed/verified flags just to pass the gate.

**Suggested atomic-claim queue**
- `claim:ziggs:core:01` → Yordle explosives expert
- `claim:ziggs:core:02` → associated with Piltover/Zaun
- `claim:ziggs:core:03` → Heimerdinger friendship from older lore must be current-status checked
- `claim:ziggs:core:04` → no overstated political role.

### Zilean — `zilean`

**Current state:** Tier C · `FULL_TIER_A_BUILD`
**Current blocker:** Minimal/incomplete profile: biography depth, continuity, atomic claims, trusted timeline, events and relations are insufficient.

**False / unsafe / must be removed, downgraded or kept pending**
- No specific contradiction confirmed in this pass; treat every unsourced existing statement as UNVERIFIED until checked against a real Riot source.

**Canonical information that must exist as sourced claims / bio facts**
- Icathian chronomancer
- survived/escaped Icathia catastrophe via temporal magic
- seeks to undo/prevent Void destruction
- no combat participation in Void War unless explicit.

**Exactly what Cursor must add / repair**
- Primary Riot bio: `https://www.leagueoflegends.com/en-us/champions/zilean/`
- Set continuity explicitly at champion, claim and timeline level.
- Create 3–5 internal bioBlocks: FACT / SUPPORTED_SYNTHESIS / EDITORIAL_FRAMING as appropriate.
- Turn each factual item above into one atomic claim only if a real Riot source supports that exact proposition.
- For each CORE claim create an evidenceRef/sourceFact derived from the actual source content; never validate using only evidenceNote or claim regex.
- Create 3–5 meaningful timeline beats where canon supports them. Every CORE beat needs trusted claimIds + sourceIds + evidenceRefs.
- Audit all DIRECT_CANON relationships. Shared region/faction/history remains STRUCTURAL_LORE unless explicit interaction/kinship is documented.
- Audit event links with exact EventRelationRole. PARTICIPANT requires trusted PARTICIPATED_IN evidence for that exact event.
- Recompute Tier A. Never flip reviewed/verified flags just to pass the gate.

**Suggested atomic-claim queue**
- `claim:zilean:core:01` → Icathian chronomancer
- `claim:zilean:core:02` → survived/escaped Icathia catastrophe via temporal magic
- `claim:zilean:core:03` → seeks to undo/prevent Void destruction
- `claim:zilean:core:04` → no combat participation in Void War unless explicit.

### Zoe — `zoe`

**Current state:** Tier B · `PHASE1_REVALIDATE`
**Current blocker:** canonConfidence 75 < 85

**False / unsafe / must be removed, downgraded or kept pending**
- Do not conflate Zoe with Myisha, the prior Aspect of Twilight host.

**Canonical information that must exist as sourced claims / bio facts**
- Host of Aspect of Twilight
- chosen as child
- cosmic messenger/traveler
- Aurelion Sol interaction only from exact source
- do not conflate Zoe with prior host Myisha.

**Exactly what Cursor must add / repair**
- Primary Riot bio: `https://www.leagueoflegends.com/en-us/champions/zoe/`
- Set continuity explicitly at champion, claim and timeline level.
- Create 3–5 internal bioBlocks: FACT / SUPPORTED_SYNTHESIS / EDITORIAL_FRAMING as appropriate.
- Turn each factual item above into one atomic claim only if a real Riot source supports that exact proposition.
- For each CORE claim create an evidenceRef/sourceFact derived from the actual source content; never validate using only evidenceNote or claim regex.
- Create 3–5 meaningful timeline beats where canon supports them. Every CORE beat needs trusted claimIds + sourceIds + evidenceRefs.
- Audit all DIRECT_CANON relationships. Shared region/faction/history remains STRUCTURAL_LORE unless explicit interaction/kinship is documented.
- Audit event links with exact EventRelationRole. PARTICIPANT requires trusted PARTICIPATED_IN evidence for that exact event.
- Recompute Tier A. Never flip reviewed/verified flags just to pass the gate.

**Suggested atomic-claim queue**
- `claim:zoe:core:01` → Host of Aspect of Twilight
- `claim:zoe:core:02` → chosen as child
- `claim:zoe:core:03` → cosmic messenger/traveler
- `claim:zoe:core:04` → Aurelion Sol interaction only from exact source
- `claim:zoe:core:05` → do not conflate Zoe with prior host Myisha.

### Zyra — `zyra`

**Current state:** Tier C · `FULL_TIER_A_BUILD`
**Current blocker:** Minimal/incomplete profile: biography depth, continuity, atomic claims, trusted timeline, events and relations are insufficient.

**False / unsafe / must be removed, downgraded or kept pending**
- No specific contradiction confirmed in this pass; treat every unsourced existing statement as UNVERIFIED until checked against a real Riot source.

**Canonical information that must exist as sourced claims / bio facts**
- Ancient magical plant consciousness/lifeform awakened through catastrophe
- spreads aggressive flora
- lore sparse
- no invented Ixtal political membership or human origin.

**Exactly what Cursor must add / repair**
- Primary Riot bio: `https://www.leagueoflegends.com/en-us/champions/zyra/`
- Set continuity explicitly at champion, claim and timeline level.
- Create 3–5 internal bioBlocks: FACT / SUPPORTED_SYNTHESIS / EDITORIAL_FRAMING as appropriate.
- Turn each factual item above into one atomic claim only if a real Riot source supports that exact proposition.
- For each CORE claim create an evidenceRef/sourceFact derived from the actual source content; never validate using only evidenceNote or claim regex.
- Create 3–5 meaningful timeline beats where canon supports them. Every CORE beat needs trusted claimIds + sourceIds + evidenceRefs.
- Audit all DIRECT_CANON relationships. Shared region/faction/history remains STRUCTURAL_LORE unless explicit interaction/kinship is documented.
- Audit event links with exact EventRelationRole. PARTICIPANT requires trusted PARTICIPATED_IN evidence for that exact event.
- Recompute Tier A. Never flip reviewed/verified flags just to pass the gate.

**Suggested atomic-claim queue**
- `claim:zyra:core:01` → Ancient magical plant consciousness/lifeform awakened through catastrophe
- `claim:zyra:core:02` → spreads aggressive flora
- `claim:zyra:core:03` → lore sparse
- `claim:zyra:core:04` → no invented Ixtal political membership or human origin.

## Final Cursor deliverable

For all 173 champions return: Tier before/after; claims created/corrected; exact sourceIds and evidenceRefs; CORE timeline beats/trust; DIRECT_CANON relations reviewed/downgraded; PARTICIPANT links reviewed/downgraded; continuity; legacy/false statements removed; remaining research tasks; exact blocker for every non-Tier-A champion.

## Success condition

The goal is not “173 green badges”. The goal is that **every champion that reaches Tier A can defend every important public factual statement against actual source evidence**. If evidence is missing, keep the champion below Tier A and create a research task.