/** Visual roles for entity assets. */
export type AssetRole =
  | "MASTER"
  | "PORTRAIT"
  | "CARD"
  | "HERO"
  | "CINEMATIC"
  | "THUMBNAIL"
  | "EMBLEM"
  | "OG_IMAGE"
  | "BACKGROUND"
  | "LOADING";

export type AssetEntityType =
  | "CHAMPION"
  | "REGION"
  | "EVENT"
  | "FACTION"
  | "ARTIFACT"
  | "DEMON"
  | "SPIRIT_CHARACTER"
  | "DARKIN_ENTITY"
  | "CELESTIAL_ASPECT"
  | "COSMIC_CONCEPT";

export type FocalMode = "CARD" | "HERO" | "MOBILE" | "CINEMATIC" | "STORY";

export type QaStatus =
  | "NEEDS_VISUAL_QA"
  | "CANDIDATE"
  | "APPROVED"
  | "MANUAL_OVERRIDE"
  | "LOW_RESOLUTION_SOURCE"
  | "LOREGRAPH_COMPOSITE_FALLBACK";

export type SourceAuthority =
  | "RIOT_DATA_DRAGON"
  | "RIOT_UNIVERSE_OR_OFFICIAL_WIKI"
  | "RIOT_PRIMARY_PREFERRED_OFFICIAL_WIKI_FALLBACK"
  | "RIOT_PRIMARY_PREFERRED"
  | "DERIVED_FROM_RIOT_MASTER"
  | "LOREGRAPH_COMPOSITE";

/** Raw CSV row from asset manifest. */
export interface AssetManifestRecord {
  asset_id: string;
  entity_id: string;
  entity_type: AssetEntityType;
  entity_name: string;
  asset_kind: string;
  local_path: string;
  primary_url: string;
  source_page_url: string;
  source_authority: string;
  copyright_owner: string;
  expected_min_width: string;
  expected_min_height: string;
  preferred_aspect: string;
  desktop_focal_x: string;
  desktop_focal_y: string;
  mobile_focal_x: string;
  mobile_focal_y: string;
  crop_strategy: string;
  download_status: string;
  qa_status: string;
  notes: string;
}

export interface FocalPoint {
  x: number;
  y: number;
}

export interface EntityAssetMeta {
  assetId: string;
  entityId: string;
  entityType: AssetEntityType;
  slug: string;
  name: string;
  role: AssetRole;
  localPath: string | null;
  publicPath: string | null;
  sourceUrl: string | null;
  sourcePageUrl: string | null;
  sourceAuthority: string;
  copyrightOwner: string;
  desktopFocal: FocalPoint;
  mobileFocal: FocalPoint;
  qaStatus: QaStatus;
  width?: number;
  height?: number;
  isLocal: boolean;
  isCompositeFallback: boolean;
}

export interface ChampionAssetIndex {
  slug: string;
  name: string;
  master: string | null;
  portrait: string | null;
  card: string | null;
  hero: string | null;
  cinematic: string | null;
  loading: string | null;
  desktopFocal: FocalPoint;
  mobileFocal: FocalPoint;
  qaStatus: QaStatus;
  sourceUrl: string | null;
}

export interface AssetManifestIndex {
  generatedAt: string;
  champions: Record<string, ChampionAssetIndex>;
  events: Record<string, EntityAssetMeta>;
  regions: Record<string, EntityAssetMeta>;
  factions: Record<string, EntityAssetMeta>;
  artifacts: Record<string, EntityAssetMeta>;
  stats: {
    manifestRows: number;
    mastersDownloaded: number;
    variantsGenerated: number;
    cacheHits: number;
    failedDownloads: string[];
    lowResolution: string[];
    visualQaPending: number;
  };
}
