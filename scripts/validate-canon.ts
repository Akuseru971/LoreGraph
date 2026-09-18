/**
 * Cross-cutting canon remediation validation.
 */
import { storyPaths } from "../data/story-paths";
import { validateStoryPaths } from "../lib/story-path/validate";
import { validateEvents } from "../lib/events/validate";
import { findDuplicateRelationships } from "../lib/relationships/dedupe";
import { relationships } from "../data/relationships";
import { loreEntityById } from "../data/lore-entities";

const errors: string[] = [];

const story = validateStoryPaths();
errors.push(...story.errors);

const events = validateEvents();
errors.push(...events.errors);

const dupes = findDuplicateRelationships(relationships);
if (dupes.length) {
  errors.push(`Relationship duplicates remain: ${dupes.map((d) => d.ids.join("/")).join("; ")}`);
}

if (!loreEntityById.has("artifact:aion-erna")) {
  errors.push("Aion Er'na not registered as artifact:aion-erna");
}
if (loreEntityById.has("concept:aion-erna")) {
  errors.push("Legacy concept:aion-erna still present");
}

for (const path of storyPaths) {
  for (const chapter of path.chapters) {
    for (const block of chapter.blocks ?? []) {
      if (block.evidenceClass === "UNRESOLVED" && block.reviewStatus === "VERIFIED_CANON") {
        errors.push(`UNRESOLVED block marked verified: ${path.slug}`);
      }
    }
  }
}

for (const e of errors) console.error(`ERROR: ${e}`);

if (errors.length) {
  console.error(`\nvalidate:canon FAILED (${errors.length})`);
  process.exit(1);
}

console.log("validate:canon PASSED");
