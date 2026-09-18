import { characterById, eventById } from "@/data";
import { getChampionAssetUrl } from "@/lib/assets";
import { findNarrativePath } from "@/lib/graph";
import { buildLoreGraph } from "@/lib/graph/build";
import { isTrustedTimelineBeat } from "@/lib/timeline/trust";
import type {
  Character,
  CinematicJourney,
  CinematicScene,
  GraphPath,
  RelationshipChoreography,
} from "@/types";
import { atmosphereForRegion } from "./atmosphere";
import { layoutScenes } from "./layout";
import { choreographyForRelationship } from "./scene-typing";

function truncateNarrative(text: string, maxWords = 55): string {
  const words = text.trim().split(/\s+/);
  if (words.length <= maxWords) return text.trim();
  return `${words.slice(0, maxWords).join(" ")}…`;
}

/** Curated Yasuo ↔ Yone connection choreography from trusted beats. */
function buildYasuoYoneJourney(
  yasuo: Character,
  yone: Character,
): CinematicJourney | null {
  const yasuoTrusted = yasuo.timeline.filter(isTrustedTimelineBeat);
  const yoneTrusted = yone.timeline.filter(isTrustedTimelineBeat);
  if (yasuoTrusted.length < 2 || yoneTrusted.length < 2) return null;

  const continuity = yasuo.continuity ?? "MAIN_RUNETERRA";
  const scenes: Omit<CinematicScene, "coordinates" | "graphTarget">[] = [
    {
      id: "cscene:yasuo-yone:parallel",
      type: "RELATIONSHIP",
      title: "Brothers of Ionia",
      eyebrow: "Ionia",
      narrative: truncateNarrative(
        "Yasuo and Yone grew up as brothers in Ionia — two paths that began in parallel.",
      ),
      primaryCharacterId: yasuo.id,
      secondaryCharacterIds: [yone.id],
      atmosphere: atmosphereForRegion("ionia"),
      cameraPreset: "CURVE_RIGHT",
      importance: "CORE",
      claimIds: [],
      sourceIds: [...yasuo.sourceIds, ...yone.sourceIds],
      evidenceClass: "SUPPORTED_SYNTHESIS",
      continuity,
      relationshipChoreography: "PARALLEL",
      holdDurationMs: 6500,
      transitionDurationMs: 2800,
    },
    {
      id: "cscene:yasuo-yone:invasion",
      type: "EVENT",
      title: "The Noxian Invasion",
      eyebrow: "Ionian War",
      narrative: truncateNarrative(
        yasuoTrusted.find((b) => b.eventId?.includes("noxian"))?.description ??
          "Noxus invaded Ionia, pulling both brothers into a war neither was prepared for.",
      ),
      eventId: "event:noxian-invasion-ionia",
      primaryCharacterId: yasuo.id,
      secondaryCharacterIds: [yone.id],
      atmosphere: atmosphereForRegion("ionia"),
      cameraPreset: "FAST_APPROACH",
      importance: "CORE",
      claimIds:
        yasuoTrusted.find((b) => b.eventId?.includes("noxian"))?.claimIds ?? [],
      sourceIds: yasuo.sourceIds,
      evidenceClass:
        (yasuoTrusted.find((b) => b.eventId?.includes("noxian"))?.claimIds?.length ?? 0) > 0
          ? "FACT"
          : "SUPPORTED_SYNTHESIS",
      continuity,
      relationshipChoreography: "DIVERGE",
      worldScale: 2.4,
      holdDurationMs: 7000,
      transitionDurationMs: 2600,
    },
    {
      id: "cscene:yasuo-yone:accusation",
      type: "CONSEQUENCE",
      title: "The Elder Falls",
      eyebrow: "Ionian War",
      narrative: truncateNarrative(
        yasuoTrusted.find((b) => /elder|souma|blamed/i.test(b.title + b.description))?.description ??
          "An Ionian elder died. Yasuo was blamed — and the distance between the brothers began to grow.",
      ),
      primaryCharacterId: yasuo.id,
      secondaryCharacterIds: [yone.id],
      atmosphere: atmosphereForRegion("ionia"),
      cameraPreset: "SLOW_APPROACH",
      importance: "CORE",
      claimIds:
        yasuoTrusted.find((b) => /elder|souma|blamed/i.test(b.title + b.description))
          ?.claimIds ?? [],
      sourceIds: yasuo.sourceIds,
      evidenceClass:
        (yasuoTrusted.find((b) => /elder|souma|blamed/i.test(b.title + b.description))
          ?.claimIds?.length ?? 0) > 0
          ? "FACT"
          : "SUPPORTED_SYNTHESIS",
      continuity,
      relationshipChoreography: "DIVERGE",
      holdDurationMs: 6500,
      transitionDurationMs: 2400,
    },
    {
      id: "cscene:yasuo-yone:duel",
      type: "CONFLICT",
      title: "The Brothers' Duel",
      eyebrow: "Ionian War",
      narrative: truncateNarrative(
        yasuoTrusted.find((b) => /duel|yone|killed/i.test(b.title + b.description))?.description ??
          "Yone hunted Yasuo for the elder's death. Their paths converged — and only one walked away.",
      ),
      eventId: "event:brothers-duel",
      primaryCharacterId: yasuo.id,
      secondaryCharacterIds: [yone.id],
      atmosphere: atmosphereForRegion("ionia"),
      cameraPreset: "FAST_APPROACH",
      importance: "CORE",
      claimIds:
        yasuoTrusted.find((b) => /duel|yone|killed/i.test(b.title + b.description))
          ?.claimIds ?? [],
      sourceIds: yasuo.sourceIds,
      evidenceClass:
        (yasuoTrusted.find((b) => /duel|yone|killed/i.test(b.title + b.description))
          ?.claimIds?.length ?? 0) > 0
          ? "FACT"
          : "SUPPORTED_SYNTHESIS",
      continuity,
      relationshipChoreography: "CONVERGE",
      worldScale: 1.8,
      holdDurationMs: 7000,
      transitionDurationMs: 2200,
    },
    {
      id: "cscene:yasuo-yone:fade",
      type: "RELATIONSHIP",
      title: "Yone Falls",
      eyebrow: "Ionian War",
      narrative: truncateNarrative(
        "Yone's light faded in the duel. Yasuo survived — carrying a guilt the story would not let him escape.",
      ),
      primaryCharacterId: yone.id,
      secondaryCharacterIds: [yasuo.id],
      atmosphere: atmosphereForRegion("ionia"),
      cameraPreset: "HOLD",
      importance: "CORE",
      claimIds: [],
      sourceIds: yone.sourceIds,
      evidenceClass: "SUPPORTED_SYNTHESIS",
      continuity,
      relationshipChoreography: "FADE",
      holdDurationMs: 5500,
      transitionDurationMs: 3000,
    },
    {
      id: "cscene:yasuo-yone:return",
      type: "TRANSFORMATION",
      title: "The Azakana Mask",
      eyebrow: "Modern Ionia",
      narrative: truncateNarrative(
        yoneTrusted.find((b) => /azakana|mask|return/i.test(b.title + b.description))?.description ??
          "Yone returned changed — bound to an azakana mask, hunting spirits in a different light.",
      ),
      primaryCharacterId: yone.id,
      secondaryCharacterIds: [yasuo.id],
      image: {
        assetKey: yone.assetKey,
        url: getChampionAssetUrl(yone.assetKey, "cinematic"),
        variant: "cinematic",
      },
      atmosphere: atmosphereForRegion("ionia"),
      cameraPreset: "ORBIT",
      importance: "CORE",
      claimIds: yoneTrusted.flatMap((b) => b.claimIds ?? []),
      sourceIds: yone.sourceIds,
      evidenceClass: "FACT",
      continuity,
      relationshipChoreography: "TRANSFORM",
      holdDurationMs: 7000,
      transitionDurationMs: 2800,
    },
    {
      id: "cscene:yasuo-yone:ending",
      type: "ENDING",
      title: "Two Threads",
      eyebrow: "The constellation",
      narrative: truncateNarrative(
        "Two brothers, one invasion, one duel, and two paths that no longer run parallel — but still belong to the same constellation.",
      ),
      primaryCharacterId: yasuo.id,
      secondaryCharacterIds: [yone.id],
      atmosphere: "CELESTIAL",
      cameraPreset: "PULL_BACK",
      importance: "CORE",
      claimIds: [],
      sourceIds: [],
      evidenceClass: "EDITORIAL_TRANSITION",
      continuity,
      holdDurationMs: 9000,
      transitionDurationMs: 5000,
    },
  ];

  const laid = layoutScenes(scenes, "cinematic:connection:yasuo:yone");

  return {
    id: "cinematic:connection:yasuo:yone",
    kind: "CONNECTION",
    title: "Yasuo & Yone",
    subtitle: "Brothers divided by war",
    primaryCharacterId: yasuo.id,
    secondaryCharacterId: yone.id,
    scenes: laid,
    sourceClaimIds: [
      ...new Set([
        ...yasuoTrusted.flatMap((b) => b.claimIds ?? []),
        ...yoneTrusted.flatMap((b) => b.claimIds ?? []),
      ]),
    ],
    continuity,
    cinematicReady: true,
    generatedAt: new Date().toISOString(),
    graphNodeIds: [
      yasuo.id,
      yone.id,
      "event:noxian-invasion-ionia",
      "event:brothers-duel",
    ],
  };
}

function pathToScenes(
  source: Character,
  target: Character,
  path: GraphPath,
): Omit<CinematicScene, "coordinates" | "graphTarget">[] {
  const scenes: Omit<CinematicScene, "coordinates" | "graphTarget">[] = [
    {
      id: `cscene:conn:${source.slug}:origin`,
      type: "ORIGIN",
      title: source.name,
      eyebrow: source.title,
      narrative: truncateNarrative(source.shortDescription),
      primaryCharacterId: source.id,
      secondaryCharacterIds: [target.id],
      atmosphere: atmosphereForRegion(source.region),
      cameraPreset: "SLOW_APPROACH",
      importance: "CORE",
      claimIds: [],
      sourceIds: source.sourceIds,
      evidenceClass: "SUPPORTED_SYNTHESIS",
      continuity: source.continuity ?? "MAIN_RUNETERRA",
      relationshipChoreography: "PARALLEL",
      holdDurationMs: 6000,
      transitionDurationMs: 2800,
    },
  ];

  for (const step of path.steps) {
    if (step.to.type === "event") {
      const event = eventById.get(step.to.id);
      if (!event) continue;
      scenes.push({
        id: `cscene:conn:${source.slug}-${target.slug}:${event.slug}`,
        type: "EVENT",
        title: event.title,
        eyebrow: event.era,
        narrative: truncateNarrative(event.description),
        eventId: event.id,
        entityId: event.id,
        primaryCharacterId: source.id,
        secondaryCharacterIds: [target.id],
        atmosphere: atmosphereForRegion(event.regionSlugs[0]),
        cameraPreset: "FAST_APPROACH",
        importance: "CORE",
        claimIds: [],
        sourceIds: event.sourceIds ?? [],
        evidenceClass: event.sourceIds?.length ? "FACT" : "SUPPORTED_SYNTHESIS",
        continuity: source.continuity ?? "MAIN_RUNETERRA",
        worldScale: (event.importance ?? 50) >= 85 ? 2.5 : 1.6,
        holdDurationMs: 6500,
        transitionDurationMs: 2600,
      });
    }
  }

  scenes.push({
    id: `cscene:conn:${target.slug}:arrival`,
    type: "RELATIONSHIP",
    title: target.name,
    eyebrow: target.title,
    narrative: truncateNarrative(target.shortDescription),
    primaryCharacterId: target.id,
    secondaryCharacterIds: [source.id],
    atmosphere: atmosphereForRegion(target.region),
    cameraPreset: "SLOW_APPROACH",
    importance: "CORE",
    claimIds: [],
    sourceIds: target.sourceIds,
    evidenceClass: "SUPPORTED_SYNTHESIS",
    continuity: target.continuity ?? "MAIN_RUNETERRA",
    relationshipChoreography: "CONVERGE" as RelationshipChoreography,
    holdDurationMs: 6000,
    transitionDurationMs: 2800,
  });

  scenes.push({
    id: `cscene:conn:${source.slug}-${target.slug}:ending`,
    type: "ENDING",
    title: `${source.name} & ${target.name}`,
    eyebrow: "Connected",
    narrative: truncateNarrative(
      `This is the narrative bridge connecting ${source.name} and ${target.name} through verified lore.`,
    ),
    primaryCharacterId: source.id,
    secondaryCharacterIds: [target.id],
    atmosphere: "CELESTIAL",
    cameraPreset: "PULL_BACK",
    importance: "CORE",
    claimIds: [],
    sourceIds: [],
    evidenceClass: "EDITORIAL_TRANSITION",
    continuity: source.continuity ?? "MAIN_RUNETERRA",
    holdDurationMs: 8000,
    transitionDurationMs: 4500,
  });

  return scenes;
}

export function buildConnectionJourneyV3(
  source: Character,
  target: Character,
  path?: GraphPath,
): CinematicJourney | null {
  if (source.slug === "yasuo" && target.slug === "yone") {
    return buildYasuoYoneJourney(source, target);
  }
  if (source.slug === "yone" && target.slug === "yasuo") {
    return buildYasuoYoneJourney(target, source);
  }

  const graph = buildLoreGraph();
  const resolvedPath =
    path ?? findNarrativePath(source.id, target.id, graph) ?? undefined;
  if (!resolvedPath) return null;

  const sceneDrafts = pathToScenes(source, target, resolvedPath);
  if (sceneDrafts.length < 3) return null;

  const scenes = layoutScenes(
    sceneDrafts,
    `cinematic:connection:${source.slug}:${target.slug}`,
  );

  return {
    id: `cinematic:connection:${source.slug}:${target.slug}`,
    kind: "CONNECTION",
    title: `${source.name} & ${target.name}`,
    subtitle: resolvedPath.directOnly ? "Direct connection" : "Narrative bridge",
    primaryCharacterId: source.id,
    secondaryCharacterId: target.id,
    scenes,
    sourceClaimIds: [],
    continuity: source.continuity ?? "MAIN_RUNETERRA",
    cinematicReady: sceneDrafts.length >= 3,
    generatedAt: new Date().toISOString(),
    graphNodeIds: resolvedPath.nodes.map((n) => n.id),
  };
}

export function buildConnectionJourneyV3ById(
  sourceId: string,
  targetId: string,
): CinematicJourney | null {
  const source = characterById.get(sourceId);
  const target = characterById.get(targetId);
  if (!source || !target) return null;
  return buildConnectionJourneyV3(source, target);
}
