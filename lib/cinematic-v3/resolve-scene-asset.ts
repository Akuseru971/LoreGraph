import { characterById, eventById, regionBySlug } from "@/data";
import { eventAssetByEventId } from "@/data/knowledge/event-assets";
import { getChampionAssetUrl, getEntityAsset, getRegionAsset } from "@/lib/assets";
import type {
  Character,
  CinematicComposition,
  CinematicScene,
  CinematicSceneAsset,
  CinematicSceneAssetConfidence,
  CinematicSceneAssetRelevance,
  CinematicSceneType,
} from "@/types";
import { compositionForScene } from "./composition";

/** Manifest event slug aliases when lore event id differs from asset key. */
const EVENT_ASSET_ALIASES: Record<string, string> = {
  "void-incursion": "void-war",
  "darkin-war": "great-darkin-war",
  "ascension-ritual": "golden-age-shurima",
  "darkin-corruption": "great-darkin-war",
  "the-ruination": "ruination-helia",
  "aatrox-return": "darkin-blade-aatrox",
  "aatrox-pantheon-duel": "aatrox-atreus-duel",
  "brothers-duel": "noxian-invasion-ionia",
};

export function eventSlugFromId(eventId?: string): string | null {
  if (!eventId) return null;
  const slug = eventId.replace(/^event:/, "");
  return EVENT_ASSET_ALIASES[slug] ?? slug;
}

function resolveSlugAsset(slug: string): { url: string; entityId: string } | null {
  for (const prefix of ["event", "artifact", "region", "faction"]) {
    const entityId = `${prefix}:${slug}`;
    const url = getEntityAsset(entityId, "HERO");
    if (url) return { url, entityId };
  }
  return null;
}

function assetFromEntity(
  entityId: string,
  relevance: CinematicSceneAssetRelevance,
  confidence: CinematicSceneAssetConfidence,
  focalPoint?: { x: number; y: number },
  compositionHint?: CinematicComposition,
): CinematicSceneAsset | null {
  const url = getEntityAsset(entityId, "HERO");
  if (!url) return null;
  return {
    url,
    sourceEntityId: entityId,
    relevance,
    confidence,
    focalPoint,
    compositionHint,
    variant: "event",
  };
}

function eventAsset(
  eventId: string,
  confidence: CinematicSceneAssetConfidence = "HIGH",
): CinematicSceneAsset | null {
  const meta = eventAssetByEventId.get(eventId);
  const slug = eventSlugFromId(eventId);
  if (!slug) return null;

  const focal =
    meta?.focalPointX != null && meta?.focalPointY != null
      ? { x: meta.focalPointX, y: meta.focalPointY }
      : undefined;

  const resolved = resolveSlugAsset(slug);
  if (resolved) {
    return {
      url: resolved.url,
      assetKey: meta?.assetKey ?? slug,
      sourceEntityId: eventId,
      relevance: resolved.entityId.startsWith("artifact:")
        ? "EXACT_ARTIFACT"
        : "EXACT_EVENT",
      confidence,
      focalPoint: focal,
      compositionHint: "DISTANT_WORLD",
      variant: "event",
    };
  }

  if (meta?.assetKey) {
    const url = getEntityAsset(`event:${meta.assetKey}`, "HERO");
    if (url) {
      return {
        url,
        assetKey: meta.assetKey,
        sourceEntityId: eventId,
        relevance: "EXACT_EVENT",
        confidence,
        focalPoint: focal,
        compositionHint: "DISTANT_WORLD",
        variant: "event",
      };
    }
  }

  return null;
}

function regionAsset(regionSlug: string): CinematicSceneAsset | null {
  const url = getRegionAsset(regionSlug, "HERO");
  if (!url) return null;
  const region = regionBySlug.get(regionSlug as import("@/types").RegionSlug);
  return {
    url,
    sourceEntityId: region?.id ?? `region:${regionSlug}`,
    relevance: "REGION_CONTEXT",
    confidence: "MEDIUM",
    compositionHint: "DISTANT_WORLD",
    variant: "event",
  };
}

function characterContextAsset(
  character: Character,
  confidence: CinematicSceneAssetConfidence = "LOW",
): CinematicSceneAsset {
  return {
    url: getChampionAssetUrl(character.assetKey, "cinematic"),
    assetKey: character.assetKey,
    sourceEntityId: character.id,
    relevance: "CHARACTER_CONTEXT",
    confidence,
    compositionHint: "BACKGROUND_MEMORY",
    variant: "cinematic",
  };
}

function shouldUseCharacterFallback(
  type: CinematicSceneType,
  confidence: CinematicSceneAssetConfidence,
): boolean {
  if (confidence === "LOW") return false;
  return type === "ORIGIN" || type === "TRANSFORMATION";
}

export interface ResolveSceneAssetContext {
  character?: Character;
  secondaryCharacters?: Character[];
}

export function resolveCinematicSceneAsset(
  scene: Omit<CinematicScene, "coordinates" | "graphTarget">,
  ctx: ResolveSceneAssetContext = {},
): CinematicSceneAsset | null {
  const character =
    ctx.character ??
    (scene.primaryCharacterId ? characterById.get(scene.primaryCharacterId) : undefined);

  let candidate: CinematicSceneAsset | null = null;

  switch (scene.type) {
    case "EVENT":
    case "CONFLICT":
    case "CONSEQUENCE": {
      if (scene.eventId) {
        candidate = eventAsset(scene.eventId);
        if (candidate) break;
        const event = eventById.get(scene.eventId);
        if (event?.regionSlugs?.[0]) {
          candidate = regionAsset(event.regionSlugs[0]);
        }
      }
      if (!candidate && character && shouldUseCharacterFallback(scene.type, "MEDIUM")) {
        candidate = characterContextAsset(character, "MEDIUM");
      }
      break;
    }
    case "LOCATION": {
      if (scene.locationId) {
        candidate = assetFromEntity(scene.locationId, "EXACT_LOCATION", "HIGH", undefined, "DISTANT_WORLD");
      }
      if (!candidate && character) {
        candidate = regionAsset(character.region);
      }
      break;
    }
    case "ARTIFACT": {
      if (scene.artifactId) {
        candidate = assetFromEntity(scene.artifactId, "EXACT_ARTIFACT", "HIGH", undefined, "CENTER_REVEAL");
      }
      break;
    }
    case "RELATIONSHIP": {
      if (scene.eventId) {
        candidate = eventAsset(scene.eventId, "MEDIUM");
      }
      break;
    }
    case "TRANSFORMATION": {
      if (scene.eventId) {
        candidate = eventAsset(scene.eventId, "HIGH");
      }
      if (!candidate && character) {
        candidate = characterContextAsset(character, "MEDIUM");
      }
      break;
    }
    case "ORIGIN": {
      if (character) {
        candidate = {
          ...characterContextAsset(character, "HIGH"),
          relevance: "CHARACTER_CONTEXT",
          confidence: "HIGH",
          compositionHint: "CENTER_REVEAL",
        };
      }
      if (!candidate && character) {
        candidate = regionAsset(character.region);
      }
      break;
    }
    case "FACTION":
    case "ENDING":
    default:
      break;
  }

  if (!candidate) return null;

  const composition = compositionForScene(
    { ...scene, coordinates: { x: 0, y: 0, z: 0 } },
    candidate,
  );
  if (composition === "NO_IMAGE" && candidate.confidence === "LOW") {
    return null;
  }

  return {
    ...candidate,
    compositionHint: candidate.compositionHint ?? composition,
  };
}

export function applySceneAssetAndComposition(
  scene: Omit<CinematicScene, "coordinates" | "graphTarget">,
  ctx: ResolveSceneAssetContext = {},
): Omit<CinematicScene, "coordinates" | "graphTarget"> {
  const image = resolveCinematicSceneAsset(scene, ctx);
  const composition = compositionForScene(
    { ...scene, coordinates: { x: 0, y: 0, z: 0 }, image: image ?? undefined },
    image,
  );
  return {
    ...scene,
    image: composition === "NO_IMAGE" ? undefined : image ?? undefined,
    composition,
  };
}
