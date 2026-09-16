import {
  characterById,
  eventById,
  loreEntityById,
  regionBySlug,
  relationshipById,
} from "@/data";
import { edgeCategory } from "@/lib/truth/layer";
import type { Character, GraphPath, Journey, PathStep } from "@/types";
import {
  characterStep,
  conceptStep,
  eraTransitionStep,
  eventStep,
  makeStep,
  resetStepCounter,
} from "./steps";
import { DEFAULT_SCENE_DURATION_MS, journeyEstimatedDuration } from "./timing";

function relationshipBetween(aId: string, bId: string) {
  return [...relationshipById.values()].find(
    (r) =>
      (r.sourceCharacterId === aId && r.targetCharacterId === bId) ||
      (r.sourceCharacterId === bId && r.targetCharacterId === aId),
  );
}

function historicalBeatsForConnection(
  source: Character,
  target: Character,
  relEventIds: string[],
): ReturnType<typeof makeStep>[] {
  const steps: ReturnType<typeof makeStep>[] = [];
  const relEventSlugs = new Set(
    relEventIds.map((id) => id.replace("event:", "")),
  );

  const beats = [...source.timeline].sort((a, b) => a.order - b.order);

  for (const beat of beats) {
    const beatEventSlug = beat.eventId?.replace("event:", "");
    const isRelevant =
      !relEventSlugs.size ||
      (beatEventSlug && relEventSlugs.has(beatEventSlug)) ||
      beats.indexOf(beat) < beats.findIndex((b) =>
        b.eventId ? relEventSlugs.has(b.eventId.replace("event:", "")) : false,
      );

    if (!isRelevant && relEventSlugs.size > 0) continue;

    if (beat.eventId) {
      const event = eventById.get(beat.eventId);
      if (event) {
        steps.push(
          eventStep(
            {
              id: event.id,
              title: beat.title,
              description: beat.description,
              era: beat.era,
              canonStatus: event.canonStatus,
            },
            source.accentColor,
            [beat.description],
          ),
        );
        continue;
      }
    }

    steps.push(
      makeStep({
        type: "EVENT",
        title: beat.title,
        eyebrow: beat.era,
        narration: [beat.description],
        accentColor: source.accentColor,
        canonStatus: source.canonStatus,
        contentType: "fact",
        sourceIds: source.sourceIds,
        duration: DEFAULT_SCENE_DURATION_MS,
        cameraPreset: "close",
        transition: "travel",
      }),
    );
  }

  return steps;
}

function pathStepToJourneyStep(
  step: PathStep,
  accentFallback: string,
): ReturnType<typeof makeStep> | null {
  const { to } = step;

  if (to.type === "character") {
    const c = characterById.get(to.id);
    if (!c) return null;
    return characterStep(c, { contentType: "fact" });
  }

  if (to.type === "event") {
    const event = eventById.get(to.id);
    if (!event) return null;
    return eventStep(event, accentFallback);
  }

  if (to.type === "concept") {
    const concept = loreEntityById.get(to.id);
    if (!concept) return null;
    return conceptStep(
      {
        id: concept.id,
        name: concept.name,
        shortDescription: concept.shortDescription,
        accentColor: concept.accentColor,
      },
      [concept.shortDescription],
      "fact",
    );
  }

  if (to.type === "region") {
    const region = regionBySlug.get(to.slug as Parameters<typeof regionBySlug.get>[0]);
    if (!region) return null;
    return makeStep({
      type: "REGION",
      entityId: region.id,
      title: region.name,
      eyebrow: "Shared context",
      narration: [region.shortDescription],
      accentColor: region.accentColor,
      canonStatus: "CURRENT_CANON",
      contentType: "fact",
      duration: DEFAULT_SCENE_DURATION_MS,
      cameraPreset: "wide",
      transition: "travel",
    });
  }

  if (to.type === "faction") {
    return makeStep({
      type: "FACTION",
      entityId: to.id,
      title: to.name,
      eyebrow: "Faction",
      narration: [to.metadata.description ?? `${to.name} connects these stories.`],
      accentColor: accentFallback,
      canonStatus: "CURRENT_CANON",
      contentType: "fact",
      duration: DEFAULT_SCENE_DURATION_MS,
      cameraPreset: "wide",
      transition: "travel",
    });
  }

  return null;
}

function expandDirectConnection(
  source: Character,
  target: Character,
  path: GraphPath,
): ReturnType<typeof makeStep>[] {
  const rel = relationshipBetween(source.id, target.id);
  const relEvents = rel?.eventIds ?? [];

  if (path.directOnly && path.length === 1) {
    const historical = historicalBeatsForConnection(source, target, relEvents);

    if (historical.length > 0) {
      return historical;
    }

    if (source.slug === "aatrox" && target.slug === "pantheon") {
      const aspect = loreEntityById.get("concept:aspect-of-war");
      const hist = historicalBeatsForConnection(source, target, [
        "event:darkin-war",
        "event:aatrox-pantheon-duel",
      ]);
      if (aspect) {
        hist.push(
          conceptStep(
            {
              id: aspect.id,
              name: "Aspect of War",
              shortDescription:
                "The celestial that fought in the Darkin War — not the mortal Atreus, who would host it millennia later.",
              accentColor: aspect.accentColor,
            },
            undefined,
            "fact",
          ),
        );
      }
      return hist;
    }
  }

  return [];
}

function voidConnectionExpansion(
  source: Character,
  target: Character,
): ReturnType<typeof makeStep>[] {
  const steps: ReturnType<typeof makeStep>[] = [];
  const voidBeats = source.timeline
    .filter(
      (b) =>
        b.eventId?.includes("void-incursion") ||
        b.title.toLowerCase().includes("void"),
    )
    .sort((a, b) => a.order - b.order);

  for (const beat of voidBeats.slice(0, 2)) {
    if (beat.eventId) {
      const event = eventById.get(beat.eventId);
      if (event) {
        steps.push(
          eventStep(event, source.accentColor, [beat.description]),
        );
      }
    }
  }

  const voidConcept = loreEntityById.get("concept:void");
  if (voidConcept) {
    steps.push(
      conceptStep(
        {
          id: voidConcept.id,
          name: voidConcept.name,
          shortDescription: voidConcept.shortDescription,
          accentColor: voidConcept.accentColor,
        },
        [
          `${source.name} fought the Void in an age ${target.name} never witnessed.`,
          "The hunger beneath the world outlasted every empire that tried to stop it.",
        ],
        "fact",
      ),
    );
  }

  steps.push(
    eraTransitionStep("Modern Runeterra", [
      "Centuries pass. The Void does not.",
      `${target.name}'s story belongs to a much later breach.`,
    ]),
  );

  const targetVoidBeat = target.timeline.find(
    (b) =>
      b.title.toLowerCase().includes("void") ||
      b.description.toLowerCase().includes("void"),
  );
  if (targetVoidBeat) {
    steps.push(
      makeStep({
        type: "EVENT",
        title: targetVoidBeat.title,
        eyebrow: targetVoidBeat.era,
        narration: [targetVoidBeat.description],
        accentColor: target.accentColor,
        canonStatus: target.canonStatus,
        contentType: "fact",
        sourceIds: target.sourceIds,
        duration: DEFAULT_SCENE_DURATION_MS,
        cameraPreset: "close",
        transition: "travel",
      }),
    );
  }

  return steps;
}

/** Expand a Connect path into a narratively meaningful cinematic journey. */
export function buildConnectionJourney(
  source: Character,
  target: Character,
  path: GraphPath,
): Journey {
  resetStepCounter();
  const steps: ReturnType<typeof makeStep>[] = [];
  const rel = relationshipBetween(source.id, target.id);
  const category = path.steps[0] ? edgeCategory(path.steps[0].edge) : null;

  steps.push(
    makeStep({
      type: "OPENING",
      title: `${source.name} · ${target.name}`,
      eyebrow: "How are they connected?",
      narration: [
        path.directOnly
          ? "Their stories meet directly in Runeterra's canon."
          : "To understand this connection, we follow the thread through history.",
      ],
      assetKey: source.assetKey,
      accentColor: source.accentColor,
      canonStatus: "CURRENT_CANON",
      contentType: "editorial",
      duration: 3200,
      cameraPreset: "wide",
      transition: "fade",
    }),
  );

  steps.push(
    characterStep(source, {
      eyebrow: "Beginning",
      narration: [source.shortDescription],
    }),
  );

  const isVoidBridge =
    path.steps.some((s) => s.to.slug === "void" || s.from.slug === "void") &&
    !path.directOnly;

  if (isVoidBridge && source.slug === "aatrox" && target.slug === "kaisa") {
    steps.push(...voidConnectionExpansion(source, target));
  } else {
    const expanded = expandDirectConnection(source, target, path);
    if (expanded.length > 0) {
      if (expanded[0]?.eyebrow !== source.timeline[0]?.era) {
        const era = source.timeline[0]?.era;
        if (era) {
          steps.push(
            eraTransitionStep(era, [
              `We follow the thread into ${era.toLowerCase()} — where this connection begins.`,
            ]),
          );
        }
      }
      steps.push(...expanded);
    } else {
      for (const pathStep of path.steps) {
        const converted = pathStepToJourneyStep(pathStep, source.accentColor);
        if (converted) steps.push(converted);
      }
    }
  }

  if (!steps.some((s) => s.entityId === target.id)) {
    steps.push(
      characterStep(target, {
        eyebrow: "Arrival",
        narration: [target.shortDescription],
      }),
    );
  }

  const endingNarration =
    path.directOnly && rel
      ? [`${source.name} and ${target.name} share a documented bond in Runeterra's lore.`]
      : path.directOnly
        ? [`${source.name} and ${target.name} are directly connected.`]
        : category === "STRUCTURAL_LORE" || category === "SHARED_EVENT"
          ? [
              `${source.name} and ${target.name} never share a single documented scene.`,
              "Their stories intersect through the structural thread above.",
            ]
          : [
              `${source.name} and ${target.name} are linked indirectly through Runeterra's wider history.`,
            ];

  steps.push(
    makeStep({
      type: "ENDING",
      title: `${source.name} ↔ ${target.name}`,
      eyebrow: path.directOnly ? "Direct connection" : "Indirect lore connection",
      narration: endingNarration,
      assetKey: target.assetKey,
      accentColor: target.accentColor,
      canonStatus: target.canonStatus,
      contentType: path.directOnly ? "fact" : "editorial",
      duration: 4000,
      cameraPreset: "close",
      transition: "fade",
    }),
  );

  return {
    id: `journey:connection:${source.slug}:${target.slug}`,
    type: "CONNECTION_STORY",
    title: `${source.name} → ${target.name}`,
    subtitle: path.directOnly ? "Direct connection" : "Connection journey",
    sourceChampionId: source.id,
    targetChampionId: target.id,
    connectionLabel: path.directOnly ? "Direct canon" : "Indirect connection",
    steps,
    estimatedDuration: journeyEstimatedDuration(steps),
  };
}

export function buildCinematicJourney(
  source: Character,
  target: Character,
  path: GraphPath,
): Journey {
  return buildConnectionJourney(source, target, path);
}
