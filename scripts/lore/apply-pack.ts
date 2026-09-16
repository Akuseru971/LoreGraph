/**
 * Wires generated pack data into production data modules.
 * Run after: npm run lore:import-pack
 */
import { existsSync } from "node:fs";
import { join } from "node:path";

const GENERATED = join(process.cwd(), "data/knowledge/generated");

function main() {
  const required = [
    "claims-merged.ts",
    "sources-pack.ts",
    "relationships-pack.ts",
    "events-pack.ts",
    "event-assets-pack.ts",
  ];

  for (const f of required) {
    if (!existsSync(join(GENERATED, f))) {
      console.error(`Missing ${f}. Run npm run lore:import-pack first.`);
      process.exit(1);
    }
  }

  console.log("Generated pack files present. Data modules import them directly.");
  console.log("If data layer files were updated, run: npm run validate:lore && npm run build");
}

main();
