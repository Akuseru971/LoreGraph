/**
 * Discovers candidate lore sources for champions from official endpoints.
 * Run: npm run lore:discover
 */
import { writeFileSync } from "node:fs";
import { join } from "node:path";
import { ROSTER_ENTRIES } from "../../data/roster";

const WIKI_BASE = "https://wiki.leagueoflegends.com/en-us";
const RIOT_BIO_BASE = "https://www.leagueoflegends.com/en-us/champions";

interface DiscoveredSource {
  championSlug: string;
  riotBioUrl: string;
  wikiUrl: string;
  authorityTier: string;
}

async function main() {
  const discovered: DiscoveredSource[] = ROSTER_ENTRIES
    .filter((e) => e.active)
    .map((entry) => ({
      championSlug: entry.slug,
      riotBioUrl: `${RIOT_BIO_BASE}/${entry.slug}/`,
      wikiUrl: `${WIKI_BASE}/${entry.name.replace(/'/g, "%27")}`,
      authorityTier: "PRIMARY_OFFICIAL",
    }));

  const outDir = join(process.cwd(), "reports");
  const outPath = join(outDir, "discovered-sources.json");
  writeFileSync(outPath, JSON.stringify(discovered, null, 2), "utf8");
  console.log(`Discovered ${discovered.length} champion source candidates → ${outPath}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
