"use client";

import type { CinematicJourney } from "@/types";

export function CinematicDebugPanel({
  journey,
  sceneIndex,
}: {
  journey: CinematicJourney;
  sceneIndex: number;
}) {
  const scene = journey.scenes[sceneIndex];
  if (!scene) return null;

  return (
    <div className="pointer-events-none absolute top-4 left-4 z-[120] max-w-xs rounded border border-line/40 bg-ink/80 p-3 font-mono text-[10px] text-muted">
      <div className="text-gold mb-1">Cinematic V3 Debug</div>
      <div>scene {sceneIndex + 1}/{journey.scenes.length}</div>
      <div>type {scene.type}</div>
      <div>camera {scene.cameraPreset}</div>
      <div>atmosphere {scene.atmosphere}</div>
      <div>importance {scene.importance}</div>
      <div>evidence {scene.evidenceClass}</div>
      <div>
        coords {scene.coordinates.x.toFixed(1)}, {scene.coordinates.y.toFixed(1)},{" "}
        {scene.coordinates.z.toFixed(1)}
      </div>
      <div>claims {scene.claimIds.join(", ") || "—"}</div>
      <div>sources {scene.sourceIds.slice(0, 2).join(", ") || "—"}</div>
      <div>choreography {scene.relationshipChoreography ?? "—"}</div>
      <div>ready {journey.cinematicReady ? "yes" : "no"}</div>
    </div>
  );
}
