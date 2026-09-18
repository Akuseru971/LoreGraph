"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { getAtmosphereConfig } from "@/lib/cinematic-v3/atmosphere";
import { particleCountForQuality } from "@/lib/cinematic-v3/quality";
import type { CinematicJourney, CinematicQualityLevel, CinematicScene } from "@/types";
import { CinematicCameraRig } from "./cinematic-camera";
import { ConstellationLines } from "./constellation-lines";
import { LoreLight } from "./lore-light";
import { ParticleField } from "./particle-field";
import { SceneImagePlane } from "./scene-image-plane";

function SceneWorld({
  journey,
  scene,
  sceneIndex,
  transitionProgress,
  graphRevealProgress,
  quality,
  secondaryLights,
}: {
  journey: CinematicJourney;
  scene: CinematicScene;
  sceneIndex: number;
  transitionProgress: number;
  graphRevealProgress: number;
  quality: CinematicQualityLevel;
  secondaryLights: Array<{ id: string; position: [number, number, number]; color: string }>;
}) {
  const atmosphere = getAtmosphereConfig(scene.atmosphere ?? "CELESTIAL");
  const graphPoints = journey.scenes.map((s) =>
    graphRevealProgress > 0 ? s.graphTarget! : s.coordinates,
  );
  const worldScale = scene.worldScale ?? 1;

  return (
    <>
      <color attach="background" args={[atmosphere.background]} />
      <fog attach="fog" args={[atmosphere.fogColor, atmosphere.fogNear, atmosphere.fogFar]} />
      <ambientLight intensity={atmosphere.ambientIntensity} />
      <CinematicCameraRig
        target={scene.coordinates}
        preset={scene.cameraPreset ?? "SLOW_APPROACH"}
        transitionProgress={transitionProgress}
        graphRevealProgress={graphRevealProgress}
        graphCenter={{
          x: 0,
          y: 0,
          z: journey.scenes[sceneIndex]?.coordinates.z ?? 0,
        }}
      />
      <ParticleField
        config={atmosphere}
        count={particleCountForQuality(quality)}
      />
      <LoreLight
        position={[scene.coordinates.x, scene.coordinates.y, scene.coordinates.z]}
        color="#ffd89a"
        warmth={atmosphere.starWarmth}
      />
      {secondaryLights.map((light) => (
        <LoreLight
          key={light.id}
          position={light.position}
          color={light.color}
          warmth={0.9}
          intensity={0.8}
        />
      ))}
      {scene.type === "EVENT" || scene.type === "CONFLICT" ? (
        <mesh
          position={[
            scene.coordinates.x,
            scene.coordinates.y - 0.5,
            scene.coordinates.z - 1,
          ]}
          scale={worldScale}
        >
          <ringGeometry args={[1.2, 1.8, 48]} />
          <meshBasicMaterial color={atmosphere.particleColor} transparent opacity={0.2} />
        </mesh>
      ) : null}
      {scene.image?.url ? (
        <Suspense fallback={null}>
          <SceneImagePlane
            url={scene.image.url}
            position={[
              scene.coordinates.x,
              scene.coordinates.y + 0.5,
              scene.coordinates.z - 2.5,
            ]}
            scale={3.5 * worldScale}
          />
        </Suspense>
      ) : null}
      <ConstellationLines
        points={graphPoints}
        progress={graphRevealProgress > 0 ? graphRevealProgress : transitionProgress * 0.5}
      />
    </>
  );
}

export function CinematicSceneCanvas({
  journey,
  sceneIndex,
  transitionProgress,
  graphRevealProgress,
  quality,
}: {
  journey: CinematicJourney;
  sceneIndex: number;
  transitionProgress: number;
  graphRevealProgress: number;
  quality: CinematicQualityLevel;
}) {
  const scene = journey.scenes[sceneIndex];
  if (!scene) return null;

  const secondaryLights: Array<{ id: string; position: [number, number, number]; color: string }> =
    [];
  if (scene.secondaryCharacterIds?.length) {
    scene.secondaryCharacterIds.forEach((id, i) => {
      secondaryLights.push({
        id,
        position: [
          scene.coordinates.x + 1.5 + i * 0.8,
          scene.coordinates.y + 0.3,
          scene.coordinates.z + 0.5,
        ],
        color: i % 2 === 0 ? "#a8c8ff" : "#ff9a8a",
      });
    });
  }

  const dpr = quality === "high" ? 2 : quality === "medium" ? 1.5 : 1;

  return (
    <Canvas
      className="absolute inset-0"
      dpr={dpr}
      gl={{ antialias: quality !== "low", alpha: false }}
      camera={{ position: [0, 1.5, 8], fov: 45, near: 0.1, far: 200 }}
    >
      <SceneWorld
        journey={journey}
        scene={scene}
        sceneIndex={sceneIndex}
        transitionProgress={transitionProgress}
        graphRevealProgress={graphRevealProgress}
        quality={quality}
        secondaryLights={secondaryLights}
      />
    </Canvas>
  );
}
