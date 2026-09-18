import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import { parseCsvRecords } from "@/lib/lore-import/csv";
import { parseFocal } from "./focal-points";
import type {
  AssetManifestIndex,
  AssetManifestRecord,
  AssetRole,
  ChampionAssetIndex,
  EntityAssetMeta,
  FocalPoint,
} from "./types";

const MANIFEST_PATH = join(
  process.cwd(),
  "data/import/loregraph-asset-pack-v1/asset_manifest.csv",
);

const INDEX_PATH = join(process.cwd(), "data/assets/manifest-index.json");

export function loadManifestRecords(): AssetManifestRecord[] {
  if (!existsSync(MANIFEST_PATH)) return [];
  const content = readFileSync(MANIFEST_PATH, "utf8");
  return parseCsvRecords<AssetManifestRecord>(content);
}

export function loadManifestIndex(): AssetManifestIndex | null {
  if (!existsSync(INDEX_PATH)) return null;
  try {
    return JSON.parse(readFileSync(INDEX_PATH, "utf8")) as AssetManifestIndex;
  } catch {
    return null;
  }
}

export function entitySlugFromId(entityId: string): string {
  const parts = entityId.split(":");
  return parts.length > 1 ? parts.slice(1).join(":") : entityId;
}

export function assetKindToRole(kind: string): AssetRole | null {
  switch (kind) {
    case "MASTER_SPLASH":
      return "MASTER";
    case "NATIVE_LOADING":
      return "LOADING";
    case "GENERATED_PORTRAIT_512":
      return "PORTRAIT";
    case "GENERATED_CARD_4X5":
      return "CARD";
    case "GENERATED_HERO_16X9":
      return "HERO";
    case "GENERATED_CINEMATIC_9X16":
      return "CINEMATIC";
    case "REGION_HERO":
    case "EVENT_HERO":
    case "FACTION_HERO":
    case "ARTIFACT_HERO":
    case "ENTITY_HERO":
      return "HERO";
    case "FACTION_EMBLEM":
      return "EMBLEM";
    default:
      return null;
  }
}

function focalFromRecord(
  record: AssetManifestRecord,
): { desktop: FocalPoint; mobile: FocalPoint } {
  return {
    desktop: {
      x: parseFocal(record.desktop_focal_x, 0.5),
      y: parseFocal(record.desktop_focal_y, 0.5),
    },
    mobile: {
      x: parseFocal(record.mobile_focal_x, 0.5),
      y: parseFocal(record.mobile_focal_y, 0.4),
    },
  };
}

export function buildChampionIndexFromManifest(
  records: AssetManifestRecord[],
): Record<string, ChampionAssetIndex> {
  const champions: Record<string, ChampionAssetIndex> = {};

  for (const record of records) {
    if (record.entity_type !== "CHAMPION") continue;
    const slug = entitySlugFromId(record.entity_id);
    const focal = focalFromRecord(record);

    if (!champions[slug]) {
      champions[slug] = {
        slug,
        name: record.entity_name,
        master: null,
        portrait: null,
        card: null,
        hero: null,
        cinematic: null,
        loading: null,
        desktopFocal: focal.desktop,
        mobileFocal: focal.mobile,
        qaStatus: "NEEDS_VISUAL_QA",
        sourceUrl: null,
      };
    }

    const entry = champions[slug];
    const publicPath = record.local_path ? `/assets/${record.local_path}` : null;

    switch (record.asset_kind) {
      case "MASTER_SPLASH":
        entry.master = publicPath;
        entry.sourceUrl = record.primary_url || entry.sourceUrl;
        break;
      case "NATIVE_LOADING":
        entry.loading = publicPath;
        break;
      case "GENERATED_PORTRAIT_512":
        entry.portrait = publicPath;
        break;
      case "GENERATED_CARD_4X5":
        entry.card = publicPath;
        break;
      case "GENERATED_HERO_16X9":
        entry.hero = publicPath;
        break;
      case "GENERATED_CINEMATIC_9X16":
        entry.cinematic = publicPath;
        break;
    }

    if (record.qa_status) {
      entry.qaStatus = record.qa_status as ChampionAssetIndex["qaStatus"];
    }
  }

  return champions;
}

export function recordToEntityMeta(record: AssetManifestRecord): EntityAssetMeta {
  const focal = focalFromRecord(record);
  const role = assetKindToRole(record.asset_kind) ?? "HERO";
  const slug = entitySlugFromId(record.entity_id);

  return {
    assetId: record.asset_id,
    entityId: record.entity_id,
    entityType: record.entity_type,
    slug,
    name: record.entity_name,
    role,
    localPath: record.local_path,
    publicPath: record.local_path ? `/assets/${record.local_path}` : null,
    sourceUrl: record.primary_url || null,
    sourcePageUrl: record.source_page_url || null,
    sourceAuthority: record.source_authority,
    copyrightOwner: record.copyright_owner,
    desktopFocal: focal.desktop,
    mobileFocal: focal.mobile,
    qaStatus: (record.qa_status || "NEEDS_VISUAL_QA") as EntityAssetMeta["qaStatus"],
    isLocal: false,
    isCompositeFallback: record.source_authority === "LOREGRAPH_COMPOSITE",
  };
}
