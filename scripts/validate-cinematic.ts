/**
 * Cinematic Journey V3 validator.
 */
import { characters } from "../data/characters";
import {
  buildChampionJourneyV3,
  buildConnectionJourneyV3,
  isCinematicReady,
  SHOWCASE_CHAMPION_SLUGS,
  SHOWCASE_CONNECTION_PAIRS,
  validateCinematicJourney,
} from "../lib/cinematic-v3";

const errors: string[] = [];
const warnings: string[] = [];

for (const slug of SHOWCASE_CHAMPION_SLUGS) {
  const c = characters.find((ch) => ch.slug === slug);
  if (!c) {
    errors.push(`missing showcase champion: ${slug}`);
    continue;
  }
  const journey = buildChampionJourneyV3(c);
  const ready = isCinematicReady(c);
  for (const issue of validateCinematicJourney(journey)) {
    if (!ready && issue.kind === "too_few_meaningful_scenes") continue;
    const line = `${slug} / ${issue.sceneId ?? journey.id}: ${issue.message}`;
    if (issue.level === "ERROR") errors.push(`${issue.kind}: ${line}`);
    else warnings.push(`${issue.kind}: ${line}`);
  }
  if (ready && journey.scenes.length < 3) {
    errors.push(`cinematic_ready_but_thin: ${slug} has only ${journey.scenes.length} scenes`);
  }
}

for (const [a, b] of SHOWCASE_CONNECTION_PAIRS) {
  const source = characters.find((c) => c.slug === a);
  const target = characters.find((c) => c.slug === b);
  if (!source || !target) continue;
  const journey = buildConnectionJourneyV3(source, target);
  if (!journey) {
    errors.push(`connection_build_failed: ${a} ↔ ${b}`);
    continue;
  }
  for (const issue of validateCinematicJourney(journey)) {
    const line = `${a}↔${b} / ${issue.sceneId ?? journey.id}: ${issue.message}`;
    if (issue.level === "ERROR") errors.push(`${issue.kind}: ${line}`);
    else warnings.push(`${issue.kind}: ${line}`);
  }
}

console.log(`Cinematic validation: ${errors.length} errors, ${warnings.length} warnings`);
for (const w of warnings) console.warn(`WARN: ${w}`);
for (const e of errors) console.error(`ERROR: ${e}`);

if (errors.length) {
  console.error(`\nvalidate:cinematic FAILED (${errors.length})`);
  process.exit(1);
}

console.log("\nvalidate:cinematic PASSED");
