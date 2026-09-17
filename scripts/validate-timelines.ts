/**
 * Timeline integrity validation.
 */
import { characters } from "../data/characters";
import { scanTextForRedFlags } from "../lib/canon/red-flags";
import { isTrustedTimelineBeat } from "../lib/timeline/trust";

const ANCIENT_ERAS = /ancient|before reckoning|fall of shurima|darkin|rune wars/i;
const errors: string[] = [];
const warnings: string[] = [];

for (const c of characters) {
  for (const beat of c.timeline) {
    for (const hit of scanTextForRedFlags(beat.description, `timeline:${c.slug}`)) {
      if (hit.severity === "error") errors.push(`${hit.context}: ${hit.message}`);
    }

    if (ANCIENT_ERAS.test(beat.era) && beat.characterIds.includes("char:pantheon")) {
      errors.push(`Ancient timeline beat includes char:pantheon: ${c.slug}/${beat.id}`);
    }

    for (const cid of beat.characterIds) {
      if (
        cid === "char:pantheon" &&
        ANCIENT_ERAS.test(beat.era) &&
        beat.eventId !== "event:aatrox-pantheon-duel"
      ) {
        errors.push(`Pantheon/Atreus in ancient beat without modern event: ${c.slug}/${beat.title}`);
      }
    }

    if (
      beat.evidenceClass === "FACT" &&
      beat.canonStatus === "UNKNOWN"
    ) {
      errors.push(`FACT timeline beat with UNKNOWN canon: ${c.slug}/${beat.id}`);
    }

    if (
      beat.evidenceClass === "FACT" &&
      (!beat.sourceIds?.length || beat.reviewStatus === "PENDING")
    ) {
      errors.push(`FACT timeline beat without trusted provenance: ${c.slug}/${beat.id}`);
    }

    if (
      c.slug === "varus" &&
      beat.eventId === "event:void-incursion"
    ) {
      errors.push(`Varus void-incursion beat remains trusted: ${beat.id}`);
    }

    if (
      beat.characterIds.length > 2 &&
      beat.eventId === "event:targon-aurelion-loose"
    ) {
      errors.push(`Synthetic shared-event timeline beat: ${c.slug}/${beat.id}`);
    }
  }

  const untrustedDisplayedAsFact = c.timeline.filter(
    (b) => b.evidenceClass === "FACT" && !isTrustedTimelineBeat(b),
  );
  if (untrustedDisplayedAsFact.length) {
    warnings.push(
      `${c.slug}: ${untrustedDisplayedAsFact.length} FACT beats fail trust check`,
    );
  }
}

for (const w of warnings) console.warn(`WARN: ${w}`);
for (const e of errors) console.error(`ERROR: ${e}`);

if (errors.length) {
  console.error(`\nvalidate:timelines FAILED (${errors.length})`);
  process.exit(1);
}

console.log("\nvalidate:timelines PASSED");
