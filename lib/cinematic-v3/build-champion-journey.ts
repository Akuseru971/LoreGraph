import { eventById, regionBySlug } from "@/data";
import { getChampionAssetUrl } from "@/lib/assets";
import { isCoreTimelineBeat } from "@/lib/timeline/importance";
import { isTrustedTimelineBeat } from "@/lib/timeline/trust";
import type {
  Character,
  CinematicJourney,
  CinematicScene,
  Continuity,
  TimelineBeat,
} from "@/types";
import { atmosphereForRegion } from "./atmosphere";
import { layoutScenes } from "./layout";
import { evaluateCinematicReadiness } from "./readiness";
import {
  cameraForSceneType,
  evidenceClassForBeat,
  inferSceneType,
  worldScaleForEvent,
} from "./scene-typing";

function truncateNarrative(text: string, maxWords = 55): string {
  const words = text.trim().split(/\s+/);
  if (words.length <= maxWords) return text.trim();
  return `${words.slice(0, maxWords).join(" ")}…`;
}

function beatToScene(
  beat: TimelineBeat,
  character: Character,
  index: number,
  total: number,
): Omit<CinematicScene, "coordinates" | "graphTarget"> {
  const sceneType = inferSceneType(beat, index, total);
  const event = beat.eventId ? eventById.get(beat.eventId) : undefined;
  const atmosphere = atmosphereForRegion(
    event?.regionSlugs?.[0] ?? character.region,
  );

  return {
    id: `cscene:${character.slug}:${beat.id}`,
    type: sceneType,
    title: beat.title,
    eyebrow: beat.era,
    narrative: truncateNarrative(beat.description),
    entityId: beat.eventId ?? character.id,
    era: beat.era,
    primaryCharacterId: character.id,
    eventId: beat.eventId,
    image: {
      assetKey: character.assetKey,
      url: getChampionAssetUrl(character.assetKey, "cinematic"),
      variant: "cinematic",
    },
    atmosphere,
    cameraPreset: cameraForSceneType(sceneType),
    importance: isCoreTimelineBeat(beat) ? "CORE" : "SUPPORTING",
    claimIds: beat.claimIds ?? [],
    sourceIds: beat.sourceIds ?? [],
    evidenceClass: evidenceClassForBeat(beat),
    continuity: beat.continuity ?? character.continuity ?? "MAIN_RUNETERRA",
    worldScale: worldScaleForEvent(beat.eventId),
    holdDurationMs: 6000,
    transitionDurationMs: 2600,
  };
}

function originScene(character: Character): Omit<CinematicScene, "coordinates" | "graphTarget"> {
  const region = regionBySlug.get(character.region);
  return {
    id: `cscene:${character.slug}:origin`,
    type: "ORIGIN",
    title: character.name,
    eyebrow: region?.name ?? character.region,
    narrative: truncateNarrative(character.shortDescription),
    entityId: character.id,
    primaryCharacterId: character.id,
    image: {
      assetKey: character.assetKey,
      url: getChampionAssetUrl(character.assetKey, "cinematic"),
      variant: "cinematic",
    },
    atmosphere: atmosphereForRegion(character.region),
    cameraPreset: "SLOW_APPROACH",
    importance: "CORE",
    claimIds: [],
    sourceIds: character.sourceIds,
    evidenceClass: "SUPPORTED_SYNTHESIS",
    continuity: character.continuity ?? "MAIN_RUNETERRA",
    holdDurationMs: 7000,
    transitionDurationMs: 3000,
  };
}

function endingScene(
  character: Character,
  graphNodeIds: string[],
): Omit<CinematicScene, "coordinates" | "graphTarget"> {
  return {
    id: `cscene:${character.slug}:ending`,
    type: "ENDING",
    title: character.name,
    eyebrow: "The larger constellation",
    narrative: truncateNarrative(
      `This thread through ${character.name}'s history is one path through a much larger universe of Runeterra lore.`,
    ),
    entityId: character.id,
    primaryCharacterId: character.id,
    atmosphere: "CELESTIAL",
    cameraPreset: "PULL_BACK",
    importance: "CORE",
    claimIds: [],
    sourceIds: character.sourceIds,
    evidenceClass: "EDITORIAL_TRANSITION",
    continuity: character.continuity ?? "MAIN_RUNETERRA",
    holdDurationMs: 8000,
    transitionDurationMs: 4500,
    worldScale: 1,
  };
}

/** Build a V3 cinematic journey from trusted timeline beats only. */
export function buildChampionJourneyV3(character: Character): CinematicJourney {
  const readiness = evaluateCinematicReadiness(character);
  const trustedBeats = [...character.timeline]
    .filter(isTrustedTimelineBeat)
    .sort((a, b) => a.order - b.order);

  const sceneDrafts: Omit<CinematicScene, "coordinates" | "graphTarget">[] = [
    originScene(character),
    ...trustedBeats.map((beat, i) =>
      beatToScene(beat, character, i + 1, trustedBeats.length + 2),
    ),
    endingScene(character, []),
  ];

  const scenes = layoutScenes(sceneDrafts, `cinematic:character:${character.slug}`);
  const graphNodeIds = [
    character.id,
    ...trustedBeats.map((b) => b.eventId).filter(Boolean) as string[],
  ];

  const continuity: Continuity = character.continuity ?? "MAIN_RUNETERRA";
  const sourceClaimIds = trustedBeats.flatMap((b) => b.claimIds ?? []);

  return {
    id: `cinematic:character:${character.slug}`,
    kind: "CHARACTER",
    title: character.name,
    subtitle: character.title,
    primaryCharacterId: character.id,
    scenes,
    sourceClaimIds: [...new Set(sourceClaimIds)],
    continuity,
    cinematicReady: readiness.ready,
    generatedAt: new Date().toISOString(),
    graphNodeIds,
  };
}
