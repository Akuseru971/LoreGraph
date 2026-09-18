/**
 * Tier A integrity validation — ensures no champion is Tier A without earning it.
 */
import { characters } from "../data/characters";
import { computeQuality } from "../lib/knowledge/quality-matrix";
import {
  coreClaimEvidenceFailures,
  TIER_A_THRESHOLDS,
  untrustedCoreTimelineBeats,
} from "../lib/knowledge/tier-a-gate";
import { isTrustedTimelineBeat } from "../lib/timeline/trust";

const errors: string[] = [];
const warnings: string[] = [];

let tierACount = 0;

for (const character of characters) {
  const quality = computeQuality(character);

  if (quality.tier !== "A") continue;
  tierACount++;

  if (!quality.tierAEligible) {
    errors.push(
      `${character.slug}: Tier A but gate failed — ${quality.tierABlockers.join("; ")}`,
    );
  }

  if (quality.dimensions.trustedTimelineCoverage < TIER_A_THRESHOLDS.trustedTimelineCoverage) {
    errors.push(
      `${character.slug}: Tier A with trustedTimelineCoverage ${quality.dimensions.trustedTimelineCoverage}`,
    );
  }

  const provisionalCore = untrustedCoreTimelineBeats(character);
  if (provisionalCore.length) {
    errors.push(
      `${character.slug}: Tier A with provisional CORE beats: ${provisionalCore.map((b) => b.title).join(", ")}`,
    );
  }

  const coreEvidence = coreClaimEvidenceFailures(character);
  if (coreEvidence.length) {
    errors.push(
      `${character.slug}: Tier A with core claim evidence failures: ${coreEvidence.join("; ")}`,
    );
  }

  if (character.species === "Unknown") {
    errors.push(`${character.slug}: Tier A with species Unknown`);
  }

  if (!character.continuity) {
    errors.push(`${character.slug}: Tier A without continuity`);
  }
}

console.log(`Tier A champions: ${tierACount}`);
for (const w of warnings) console.warn(`WARN: ${w}`);
for (const e of errors) console.error(`ERROR: ${e}`);

if (errors.length) {
  console.error(`\nvalidate:tier-a FAILED (${errors.length})`);
  process.exit(1);
}

console.log("\nvalidate:tier-a PASSED");
