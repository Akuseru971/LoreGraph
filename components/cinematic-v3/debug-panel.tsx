"use client";

import { compositionForScene } from "@/lib/cinematic-v3/composition";
import type { CinematicJourney } from "@/types";

export function CinematicDebugPanel({
  journey,
  sceneIndex,
  transitionProgress,
  arrived,
  onJumpToScene,
}: {
  journey: CinematicJourney;
  sceneIndex: number;
  transitionProgress: number;
  arrived: boolean;
  onJumpToScene?: (index: number) => void;
}) {
  const scene = journey.scenes[sceneIndex];
  if (!scene) return null;

  const composition = compositionForScene(scene, scene.image);

  return (
    <div className="pointer-events-auto absolute top-4 left-4 z-[120] max-w-sm rounded border border-line/40 bg-ink/90 p-3 font-mono text-[10px] text-muted">
      <div className="text-gold mb-1">Cinematic V3 Debug</div>
      <div>scene {sceneIndex + 1}/{journey.scenes.length}</div>
      <div>type {scene.type}</div>
      <div>camera {scene.cameraPreset}</div>
      <div>composition {composition}</div>
      <div>atmosphere {scene.atmosphere}</div>
      <div>worldScale {scene.worldScale ?? 1}</div>
      <div>choreography {scene.relationshipChoreography ?? "—"}</div>
      <div>travel {arrived ? "arrived" : `${(transitionProgress * 100).toFixed(0)}%`}</div>
      <div>image {scene.image?.url ? "yes" : "no"}</div>
      {scene.image ? (
        <>
          <div>relevance {scene.image.relevance ?? "—"}</div>
          <div>confidence {scene.image.confidence ?? "—"}</div>
          <div>source {scene.image.sourceEntityId ?? "—"}</div>
          <div>
            focal{" "}
            {scene.image.focalPoint
              ? `${scene.image.focalPoint.x.toFixed(2)}, ${scene.image.focalPoint.y.toFixed(2)}`
              : "—"}
          </div>
        </>
      ) : null}
      <div>
        coords {scene.coordinates.x.toFixed(1)}, {scene.coordinates.y.toFixed(1)},{" "}
        {scene.coordinates.z.toFixed(1)}
      </div>
      {onJumpToScene ? (
        <div className="mt-2 flex flex-wrap gap-1">
          {journey.scenes.map((s, i) => (
            <button
              key={s.id}
              type="button"
              className={`rounded px-1.5 py-0.5 ${i === sceneIndex ? "bg-gold/30 text-gold" : "bg-line/30"}`}
              onClick={() => onJumpToScene(i)}
            >
              {i + 1}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
