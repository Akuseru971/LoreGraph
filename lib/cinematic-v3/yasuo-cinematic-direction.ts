import type { CinematicJourney, CinematicScene } from "@/types";

export const YASUO_JOURNEY_ID = "cinematic:character:yasuo";

function insertAfter(
  scenes: CinematicScene[],
  afterId: string,
  newScenes: CinematicScene[],
): CinematicScene[] {
  const idx = scenes.findIndex((s) => s.id === afterId);
  if (idx < 0) return [...scenes, ...newScenes];
  return [...scenes.slice(0, idx + 1), ...newScenes, ...scenes.slice(idx + 1)];
}

function patchScene(
  scenes: CinematicScene[],
  sceneId: string,
  patch: Partial<CinematicScene>,
): CinematicScene[] {
  return scenes.map((s) => (s.id === sceneId ? { ...s, ...patch } : s));
}

/** Expand Yasuo into seven illustrated story beats for image-led cinematic mode. */
export function applyYasuoCinematicDirection(
  journey: CinematicJourney,
): CinematicJourney {
  if (journey.id !== YASUO_JOURNEY_ID) return journey;

  let scenes = [...journey.scenes];

  scenes = patchScene(scenes, "cscene:yasuo:origin", {
    title: "The Prodigy",
    eyebrow: "IONIA",
    narrativePhrases: [
      "The only student of his generation to master the wind technique.",
      "Gifted, proud, and entirely unbearable about it.",
    ],
    shotType: "ESTABLISHING",
    composition: "FULL_BLEED",
  });

  scenes = patchScene(scenes, "cscene:yasuo:beat:yasuo-1", {
    title: "Master Souma",
    eyebrow: "THE PRODIGY",
    narrativePhrases: [
      "Elder Souma saw promise in Yasuo — and burden in his pride.",
      "Expectation became the weight he could not set down.",
    ],
    shotType: "REVEAL",
    composition: "FULL_BLEED",
  });

  scenes = patchScene(scenes, "cscene:yasuo:beat:yasuo-2", {
    title: "The Ionian War",
    eyebrow: "IONIAN WAR",
    narrativePhrases: [
      "Noxus invaded Ionia. Yasuo was assigned to guard the elder.",
      "He left his post to join the battle he could hear in the distance.",
    ],
    shotType: "WIDE_EVENT",
    worldNodeArchetype: "INVASION",
    worldScale: 2.6,
    composition: "FULL_BLEED",
  });

  scenes = patchScene(scenes, "cscene:yasuo:beat:yasuo-3", {
    title: "The Accusation",
    eyebrow: "THE ACCUSATION",
    narrativePhrases: [
      "Elder Souma was dead by a wind technique.",
      "Yasuo was blamed — and refused to defend himself.",
    ],
    shotType: "AFTERMATH",
    composition: "FULL_BLEED",
  });

  const exileScene: CinematicScene = {
    id: "cscene:yasuo:beat:yasuo-4",
    type: "EVENT",
    title: "Exile",
    eyebrow: "EXILE",
    narrative:
      "Ionia sent hunters after him. Yasuo fled rather than accept a sentence he could not bear.",
    narrativePhrases: [
      "Ionia sent hunters after him.",
      "Yasuo fled rather than accept a sentence he could not bear.",
    ],
    entityId: "char:yasuo",
    primaryCharacterId: "char:yasuo",
    atmosphere: "IONIA",
    cameraPreset: "SLOW_APPROACH",
    importance: "CORE",
    claimIds: [],
    sourceIds: ["source:bio-yasuo"],
    evidenceClass: "SUPPORTED_SYNTHESIS",
    continuity: "MAIN_RUNETERRA",
    holdDurationMs: 6000,
    transitionDurationMs: 850,
    shotType: "ESTABLISHING",
    composition: "FULL_BLEED",
    worldScale: 1.4,
    environmentalMotifs: ["IONIAN_SPIRIT_ARCS", "IONIAN_FLOATING_LIGHTS"],
    coordinates: { x: 0.4, y: 0.1, z: 28 },
    graphTarget: { x: 0.4, y: 0.1, z: 28 },
    curated: true,
  };

  const duelScene: CinematicScene = {
    id: "cscene:yasuo:beat:yasuo-5",
    type: "CONFLICT",
    title: "Brother's Blade",
    eyebrow: "THE DUEL",
    narrative:
      "Yone was sent to bring him in. Yasuo won the duel — the worst possible outcome for both of them.",
    narrativePhrases: [
      "Yone was sent to bring him in.",
      "Yasuo won the duel — the worst possible outcome for both of them.",
    ],
    entityId: "event:yasuo-yone-duel",
    primaryCharacterId: "char:yasuo",
    secondaryCharacterIds: ["char:yone"],
    atmosphere: "IONIA",
    cameraPreset: "FREEFALL_DROP",
    importance: "CORE",
    claimIds: [],
    sourceIds: ["source:bio-yasuo"],
    evidenceClass: "SUPPORTED_SYNTHESIS",
    continuity: "MAIN_RUNETERRA",
    holdDurationMs: 6500,
    transitionDurationMs: 850,
    shotType: "IMPACT",
    composition: "FULL_BLEED",
    worldScale: 2.2,
    environmentalMotifs: ["IONIAN_SPIRIT_ARCS"],
    coordinates: { x: 0, y: 0.2, z: 40 },
    graphTarget: { x: 0, y: 0.2, z: 40 },
    curated: true,
  };

  const truthScene: CinematicScene = {
    id: "cscene:yasuo:beat:yasuo-6",
    type: "EVENT",
    title: "Truth and Regret",
    eyebrow: "MODERN IONIA",
    narrative:
      "Years later he learned who truly killed the elder. Exoneration and forgiveness are not the same thing.",
    narrativePhrases: [
      "Years later he learned who truly killed the elder.",
      "Exoneration and forgiveness are not the same thing.",
    ],
    entityId: "char:yasuo",
    primaryCharacterId: "char:yasuo",
    atmosphere: "IONIA",
    cameraPreset: "HOLD",
    importance: "CORE",
    claimIds: [],
    sourceIds: ["source:bio-yasuo"],
    evidenceClass: "SUPPORTED_SYNTHESIS",
    continuity: "MAIN_RUNETERRA",
    holdDurationMs: 6500,
    transitionDurationMs: 850,
    shotType: "AFTERMATH",
    composition: "FULL_BLEED",
    worldScale: 1.2,
    environmentalMotifs: ["IONIAN_FLOATING_LIGHTS"],
    coordinates: { x: -0.3, y: 0, z: 52 },
    graphTarget: { x: -0.3, y: 0, z: 52 },
    curated: true,
  };

  scenes = insertAfter(scenes, "cscene:yasuo:beat:yasuo-3", [
    exileScene,
    duelScene,
    truthScene,
  ]);

  scenes = patchScene(scenes, "cscene:yasuo:ending", {
    title: "The Wanderer",
    eyebrow: "THE UNFORGIVEN",
    narrativePhrases: [
      "Yasuo still walks Ionia — unforgiven, and unable to forgive himself.",
    ],
    shotType: "PULLBACK",
    composition: "FULL_BLEED",
  });

  return {
    ...journey,
    scenes,
    introSequence: undefined,
    outroSequence: undefined,
  };
}
