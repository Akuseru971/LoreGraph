/**
 * Syncs champion release years from Meraki Analytics into data/roster.ts.
 * Run: npx tsx scripts/lore/sync-release-years.ts
 */
import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { ddragonKeyForSlug, ROSTER_ENTRIES, type RosterEntry } from "../../data/roster";

const MERAKI_URL =
  "https://cdn.merakianalytics.com/riot/lol/resources/latest/en-US/champions.json";

interface MerakiChampion {
  key: string;
  releaseDate?: string;
}

function serializeEntry(entry: RosterEntry): string {
  const lines = [
    "  {",
    `    "slug": "${entry.slug}",`,
    `    "name": "${entry.name}",`,
    `    "title": "${entry.title}",`,
    `    "assetKey": "${entry.assetKey}",`,
    `    "region": "${entry.region}",`,
    `    "active": ${entry.active},`,
    `    "tier": "${entry.tier}",`,
    entry.releaseYear != null
      ? `    "releaseYear": ${entry.releaseYear},`
      : `    "releaseYear": undefined,`,
    `    "factions": ${JSON.stringify(entry.factions)},`,
    entry.species != null
      ? `    "species": "${entry.species}",`
      : `    "species": undefined,`,
    entry.era != null
      ? `    "era": "${entry.era}",`
      : `    "era": undefined`,
    "  }",
  ];
  return lines.join("\n");
}

async function main() {
  const res = await fetch(MERAKI_URL);
  if (!res.ok) throw new Error(`Meraki fetch failed: ${res.status}`);
  const data = (await res.json()) as Record<string, MerakiChampion>;

  const updated: RosterEntry[] = ROSTER_ENTRIES.map((entry) => {
    const key = ddragonKeyForSlug(entry.slug);
    const meraki = data[key];
    let releaseYear = entry.releaseYear;
    if (meraki?.releaseDate) {
      const year = Number.parseInt(meraki.releaseDate.slice(0, 4), 10);
      if (Number.isFinite(year)) releaseYear = year;
    }
    return {
      ...entry,
      releaseYear,
      species: typeof entry.species === "string" ? entry.species : undefined,
      era: typeof entry.era === "string" ? entry.era : undefined,
    };
  });

  const rosterPath = join(process.cwd(), "data/roster.ts");
  const original = readFileSync(rosterPath, "utf8");
  const headerEnd = original.indexOf("export const ROSTER_ENTRIES");
  const header = original.slice(0, headerEnd);

  const body = `export const ROSTER_ENTRIES: RosterEntry[] = \n[\n${updated.map(serializeEntry).join(",\n")}\n];\n`;

  const footerStart = original.indexOf("export const ACTIVE_ROSTER");
  const footer =
    footerStart >= 0
      ? original.slice(footerStart)
      : `export const ACTIVE_ROSTER = ROSTER_ENTRIES.filter((e) => e.active);
export const EXPECTED_ROSTER_COUNT = ACTIVE_ROSTER.length;
export const rosterBySlug = new Map(ROSTER_ENTRIES.map((e) => [e.slug, e]));
export const rosterSlugs = ACTIVE_ROSTER.map((e) => e.slug);
`;

  writeFileSync(rosterPath, header + body + "\n" + footer, "utf8");

  const withYear = updated.filter((e) => e.releaseYear != null).length;
  console.log(`Updated ${rosterPath}`);
  console.log(`  ${withYear}/${updated.length} champions with release years`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
