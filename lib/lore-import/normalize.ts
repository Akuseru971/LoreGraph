import type { ImportedAlias } from "./types";

const SLUG_ALIASES: Record<string, string> = {
  kaisa: "kaisa",
  "kai-sa": "kaisa",
  belveth: "belveth",
  "bel-veth": "belveth",
  "bel'veth": "belveth",
  leblanc: "leblanc",
  chogath: "chogath",
  "cho'gath": "chogath",
  khazix: "khazix",
  "kha-zix": "khazix",
  "kha'zix": "khazix",
  reksai: "reksai",
  "rek'sai": "reksai",
  velkoz: "velkoz",
  "vel'koz": "velkoz",
  ksante: "ksante",
  "k'sante": "ksante",
  nunu: "nunu-willump",
  "nunu & willump": "nunu-willump",
  "nunu and willump": "nunu-willump",
  "aurelion sol": "aurelion-sol",
  "jarvan iv": "jarvan-iv",
  "lee sin": "lee-sin",
  "miss fortune": "miss-fortune",
  "master yi": "master-yi",
  "twisted fate": "twisted-fate",
  "dr mundo": "dr-mundo",
  "dr. mundo": "dr-mundo",
  "tahm kench": "tahm-kench",
  "xin zhao": "xin-zhao",
  "kog maw": "kog-maw",
  "kog'maw": "kog-maw",
  "monkey king": "wukong",
  "renata glasc": "renata-glasc",
};

/** Map pack event IDs to existing LoreGraph event slugs. */
export const EVENT_ID_MAP: Record<string, string> = {
  "event:void-war": "void-incursion",
  "event:great-darkin-war": "darkin-war",
  "event:fall-shurima": "shurima-fall",
  "event:ruination": "the-ruination",
  "event:noxian-invasion-ionia": "noxian-invasion-ionia",
  "event:swain-coup": "swain-coup",
  "event:mage-rebellion": "mage-rebellion-founding",
  "event:aatrox-atreus-duel": "aatrox-pantheon-duel",
  "event:brothers-duel": "brothers-duel",
  "event:kinkou-fracture": "kinkou-fracture",
  "event:piltover-zaun-crisis": "piltover-zaun-crisis",
};

/** Map pack source IDs to existing LoreGraph source IDs where equivalent. */
export function mapSourceId(packId: string): string {
  const bioMatch = packId.match(/^src:riot-bio:(.+)$/);
  if (bioMatch) return `source:bio-${normalizeSlug(bioMatch[1])}`;

  const wikiMatch = packId.match(/^src:wiki-universe:(.+)$/);
  if (wikiMatch) return `source:wiki-${normalizeSlug(wikiMatch[1])}`;

  return packId.replace(/^src:/, "source:pack:");
}

export function normalizeSlug(input: string): string {
  const key = input.trim().toLowerCase().replace(/\s+/g, " ");
  if (SLUG_ALIASES[key]) return SLUG_ALIASES[key];
  return key.replace(/'/g, "").replace(/\s+/g, "-");
}

export function normalizeEntityId(id: string, aliasMap: Map<string, string>): string {
  if (!id) return id;
  const mapped = aliasMap.get(id) ?? aliasMap.get(id.toLowerCase());
  if (mapped) return mapped;

  if (id.startsWith("char:")) {
    const slug = normalizeSlug(id.replace("char:", ""));
    return `char:${slug}`;
  }
  if (id.startsWith("event:")) {
    const raw = id.replace("event:", "");
    const slug = EVENT_ID_MAP[id] ?? normalizeSlug(raw);
    return `event:${slug}`;
  }
  if (id.startsWith("faction:")) {
    return `faction:${normalizeSlug(id.replace("faction:", ""))}`;
  }
  if (id.startsWith("concept:") || id.startsWith("entity:")) {
    return id;
  }
  return id;
}

export function buildAliasMap(aliases: ImportedAlias[]): Map<string, string> {
  const map = new Map<string, string>();

  for (const row of aliases) {
    const canonical = normalizeEntityId(row.entity_id, map);
    map.set(row.alias.toLowerCase(), canonical);
    map.set(row.canonical_name.toLowerCase(), canonical);
    map.set(row.entity_id, canonical);
  }

  for (const [alias, slug] of Object.entries(SLUG_ALIASES)) {
    map.set(alias, `char:${slug}`);
    map.set(`char:${alias}`, `char:${slug}`);
  }

  return map;
}

export function parsePipeList(value: string): string[] {
  if (!value?.trim()) return [];
  return value.split("|").map((s) => s.trim()).filter(Boolean);
}

export function parseBool(value: string): boolean {
  return value?.toUpperCase() === "TRUE";
}

export function slugFromCharId(id: string): string {
  return id.replace("char:", "");
}

export function regionSlugFromName(name: string): string {
  const map: Record<string, string> = {
    shurima: "shurima",
    ionia: "ionia",
    noxus: "noxus",
    demacia: "demacia",
    piltover: "piltover",
    zaun: "zaun",
    targon: "targon",
    freljord: "freljord",
    "shadow isles": "shadow-isles",
    bilgewater: "bilgewater",
    ixtal: "ixtal",
    "bandle city": "bandle-city",
    void: "void",
    runeterra: "runeterra",
  };
  const key = name.split("/")[0].trim().toLowerCase();
  return map[key] ?? key.replace(/\s+/g, "-");
}
