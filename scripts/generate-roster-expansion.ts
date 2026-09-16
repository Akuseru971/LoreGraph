/**
 * Generates minimal CharacterSeed entries for champions not yet in regional seed files.
 * Run: npx tsx scripts/generate-roster-expansion.ts
 */
import { writeFileSync } from "node:fs";
import { join } from "node:path";
import { frostIslesSeeds } from "../data/characters/frost-isles";
import { ioniaSeeds } from "../data/characters/ionia";
import { noxusDemaciaSeeds } from "../data/characters/noxus-demacia";
import { piltoverZaunSeeds } from "../data/characters/piltover-zaun";
import { shurimaTargonSeeds } from "../data/characters/shurima-targon";

const existingSeeds = [
  ...shurimaTargonSeeds,
  ...ioniaSeeds,
  ...noxusDemaciaSeeds,
  ...piltoverZaunSeeds,
  ...frostIslesSeeds,
];
import type { CharacterSeed } from "../data/characters/build";
import type { RegionSlug } from "../types";
import { ROSTER_ENTRIES, ddragonKeyForSlug } from "../data/roster";

const DDRAGON_VERSION = "16.18.1";

interface DDragonChampion {
  id: string;
  name: string;
  title: string;
  blurb: string;
  tags: string[];
}

const REGION_FACTIONS: Partial<Record<RegionSlug, string[]>> = {
  demacia: ["demacia"],
  noxus: ["noxus"],
  ionia: ["ionia"],
  piltover: ["piltover"],
  zaun: ["zaun"],
  shurima: ["shurima"],
  targon: ["aspects"],
  freljord: ["freljord"],
  "shadow-isles": ["shadow-isles"],
  bilgewater: ["bilgewater"],
  ixtal: ["ixtal"],
  "bandle-city": ["yordle"],
  void: ["void"],
  runeterra: [],
};

const TIER_A = new Set([
  "renekton", "xerath", "ornn", "zed", "shen", "akali", "lucian", "gwen",
  "hecarim", "yorick", "vladimir", "volibear", "brand", "gangplank",
  "miss-fortune", "pyke", "illaoi", "nilah", "evelynn", "tahm-kench",
  "fiddlesticks", "nocturne", "bel-veth", "malzahar", "kassadin", "ksante",
  "sejuani", "tryndamere", "trundle", "olaf", "anivia", "lillia", "udyr",
  "ivern", "gnar", "gragas", "braum", "taric", "aphelios", "zoe", "taric",
  "kayn", "janna", "syndra", "karma", "kennen", "wukong", "sett", "yuumi",
  "rakan", "lulu", "tristana", "teemo", "veigar", "corki", "heimerdinger",
  "orianna", "jayce", "warwick", "zeri", "renata-glasc", "ambessa", "aurora",
  "hwei", "yunara", "zaahen", "locke", "smolder", "briar", "naafiri", "milio",
  "qiyana", "neeko", "nidalee", "taliyah", "sivir", "skarner", "rammus",
  "amumu", "cassiopeia", "dr-mundo", "urgot", "singed", "blitzcrank", "zac",
  "ziggs", "rumble", "twitch", "heimerdinger", "caitlyn", "camille", "ekko",
  "jinx", "vi", "viktor", "mel",
]);

function capitalizeTitle(raw: string): string {
  return raw
    .split(" ")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

function trimWords(text: string, maxWords: number): string {
  const words = text.replace(/\s+/g, " ").trim().split(" ");
  if (words.length <= maxWords) return words.join(" ");
  return `${words.slice(0, maxWords).join(" ")}…`;
}

function buildSeed(
  entry: (typeof ROSTER_ENTRIES)[number],
  ddragon: DDragonChampion,
): CharacterSeed {
  const tier = TIER_A.has(entry.slug) ? "A" : entry.tier;
  const region = entry.region;
  const factions = entry.factions.length
    ? entry.factions
    : REGION_FACTIONS[region] ?? [];

  const blurb = ddragon.blurb?.trim() ?? "";
  const short = blurb
    ? trimWords(blurb, 42)
    : `${ddragon.name} is a champion whose story is tied to ${region.replace("-", " ")}.`;

  const longParagraph = blurb
    ? blurb.length > 280
      ? blurb
      : `${blurb} LoreGraph keeps this profile conservative until additional official sources are reviewed.`
    : `${ddragon.name} appears in Runeterra's current champion roster. This profile records what is reliably established without inventing undocumented connections.`;

  const importance = tier === "A" ? 72 : tier === "B" ? 58 : 42;
  const popularity = tier === "A" ? 68 : tier === "B" ? 52 : 38;
  const complexity = tier === "A" ? 3 : tier === "B" ? 2 : 2;

  const aliases: string[] = [];
  if (entry.slug === "nunu-willump") aliases.push("Nunu", "Willump");
  if (entry.slug === "kaisa") aliases.push("Kaisa", "Kai-Sa");
  if (entry.slug === "belveth") aliases.push("Bel'Veth", "Belveth");
  if (entry.slug === "ksante") aliases.push("K'Sante", "KSante");
  if (entry.slug === "chogath") aliases.push("Cho'Gath", "Chogath");
  if (entry.slug === "khazix") aliases.push("Kha'Zix", "Khazix");
  if (entry.slug === "reksai") aliases.push("Rek'Sai", "Reksai");
  if (entry.slug === "velkoz") aliases.push("Vel'Koz", "Velkoz");
  if (entry.slug === "dr-mundo") aliases.push("Dr. Mundo", "Mundo");
  if (entry.slug === "twisted-fate") aliases.push("TF", "Twisted Fate");
  if (entry.slug === "miss-fortune") aliases.push("MF", "Miss Fortune");
  if (entry.slug === "aurelion-sol") aliases.push("A Sol", "Aurelion");
  if (entry.slug === "jarvan-iv") aliases.push("Jarvan");
  if (entry.slug === "xin-zhao") aliases.push("Xin");
  if (entry.slug === "master-yi") aliases.push("Yi");
  if (entry.slug === "tahm-kench") aliases.push("Tahm", "Tahm Kench");
  if (entry.slug === "renata-glasc") aliases.push("Renata");
  if (entry.slug === "kog-maw") aliases.push("Kog'Maw", "Kogmaw");

  return {
    slug: entry.slug,
    name: ddragon.name,
    title: capitalizeTitle(ddragon.title.replace(/^the /i, "The ")),
    region,
    factions,
    roles: ddragon.tags.slice(0, 3).map((t) => capitalizeTitle(t)),
    status: "Alive",
    species: entry.species ?? "Unknown",
    aliases,
    releaseYear: entry.releaseYear ?? 2010,
    complexity: complexity as CharacterSeed["complexity"],
    importance,
    popularity,
    verified: false,
    short,
    long: [longParagraph],
    tags: [region.replace("-", " "), ...ddragon.tags.slice(0, 4).map((t) => t.toLowerCase())],
    timeline: [
      {
        era: entry.era ?? "Modern Runeterra",
        title: ddragon.name,
        description: trimWords(short, 28),
      },
    ],
  };
}

async function main() {
  const res = await fetch(
    `https://ddragon.leagueoflegends.com/cdn/${DDRAGON_VERSION}/data/en_US/champion.json`,
  );
  const json = (await res.json()) as { data: Record<string, DDragonChampion> };
  const existing = new Set(existingSeeds.map((s) => s.slug));
  const missing = ROSTER_ENTRIES.filter((e) => e.active && !existing.has(e.slug));

  const seeds: CharacterSeed[] = [];
  for (const entry of missing) {
    const key = ddragonKeyForSlug(entry.slug);
    const dd = json.data[key];
    if (!dd) {
      console.error(`Missing DDragon entry for ${entry.slug} (${key})`);
      continue;
    }
    seeds.push(buildSeed(entry, dd));
  }

  seeds.sort((a, b) => a.name.localeCompare(b.name));

  const out = `import type { CharacterSeed } from "./build";

/** Auto-generated minimal seeds for roster expansion. Regenerate via scripts/generate-roster-expansion.ts */
export const rosterExpansionSeeds: CharacterSeed[] = ${JSON.stringify(seeds, null, 2)} as CharacterSeed[];
`;

  const target = join(process.cwd(), "data/characters/roster-expansion.ts");
  writeFileSync(target, out, "utf8");
  console.log(`Wrote ${seeds.length} expansion seeds to ${target}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
