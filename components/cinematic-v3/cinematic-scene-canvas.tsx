"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense, useMemo } from "react";
import * as THREE from "three";
import { imageOffsetForComposition } from "@/lib/cinematic-v3/composition";
import { getAtmosphereConfig } from "@/lib/cinematic-v3/atmosphere";
import { particleCountForQuality } from "@/lib/cinematic-v3/quality";
import type { CinematicJourney, CinematicQualityLevel, CinematicScene } from "@/types";
import { AtmosphereParticles } from "./atmosphere-particles";
import { ConstellationLines } from "./constellation-lines";
import { EnvironmentalMotifField } from "./environmental-motif-field";
import { ForegroundDepth } from "./foreground-depth";
import { SceneImagePlane } from "./scene-image-plane";
import { StarFollowCamera } from "./star-follow-camera";
import { TravelingStar } from "./traveling-star";
import { WorldNode } from "./world-node";

function hashSeed(str: string): number {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function lerpHex(a: string, b: string, t: number): string {
  const ca = new THREE.Color(a);
  const cb = new THREE.Color(b);
  return ca.lerp(cb, t).getStyle();
}

function SceneWorld({
  journey,
  scene,
  prevScene,
  prevPrevScene,
  nextScene,
  sceneIndex,
  transitionProgress,
  graphRevealProgress,
  quality,
  arrived,
  visitedSceneIndices,
  showImages = true,
  environmentOnly = false,
  arrivalPulse = 0,
}: {
  journey: CinematicJourney;
  scene: CinematicScene;
  prevScene?: CinematicScene;
  prevPrevScene?: CinematicScene;
  nextScene?: CinematicScene;
  sceneIndex: number;
  transitionProgress: number;
  graphRevealProgress: number;
  quality: CinematicQualityLevel;
  arrived: boolean;
  visitedSceneIndices: number[];
  showImages?: boolean;
  environmentOnly?: boolean;
  arrivalPulse?: number;
}) {
  const atmosphere = getAtmosphereConfig(scene.atmosphere ?? "CELESTIAL");
  const prevAtmosphere = getAtmosphereConfig(prevScene?.atmosphere ?? scene.atmosphere ?? "CELESTIAL");
  const blend = arrived ? 1 : transitionProgress;
  const traveling = !arrived && sceneIndex > 0;
  const seed = useMemo(() => hashSeed(journey.id), [journey.id]);

  const from = prevScene?.coordinates ?? scene.coordinates;
  const preset = scene.cameraPreset ?? "SLOW_APPROACH";
  const worldScale = scene.worldScale ?? 1;
  const composition = scene.composition ?? scene.image?.compositionHint ?? "NO_IMAGE";
  const imageOffset = imageOffsetForComposition(composition, scene.image?.focalPoint);
  const imageOpacity =
    composition === "BACKGROUND_MEMORY"
      ? 0.48
      : composition === "DISTANT_WORLD"
        ? 0.52
        : composition === "FULL_BLEED"
          ? 0.72
          : 0.58;
  const prevComposition =
    prevScene?.composition ?? prevScene?.image?.compositionHint ?? "BACKGROUND_MEMORY";
  const prevImageOffset = imageOffsetForComposition(
    prevComposition,
    prevScene?.image?.focalPoint,
  );
  const prevImageOpacity =
    prevComposition === "BACKGROUND_MEMORY"
      ? 0.48
      : prevComposition === "FULL_BLEED"
        ? 0.72
        : 0.58;
  const motifs = scene.environmentalMotifs ?? [];

  const bg = lerpHex(prevAtmosphere.background, atmosphere.background, blend);
  const fog = lerpHex(prevAtmosphere.fogColor, atmosphere.fogColor, blend);
  const fogNear = prevAtmosphere.fogNear + (atmosphere.fogNear - prevAtmosphere.fogNear) * blend;
  const fogFar = prevAtmosphere.fogFar + (atmosphere.fogFar - prevAtmosphere.fogFar) * blend;
  const ambient =
    prevAtmosphere.ambientIntensity +
    (atmosphere.ambientIntensity - prevAtmosphere.ambientIntensity) * blend;

  const nodeReveal = arrived ? 1 : Math.max(0, (transitionProgress - 0.55) / 0.45);
  const showWorldNode =
    (scene.type === "EVENT" || scene.type === "CONFLICT" || scene.worldNodeArchetype) &&
    worldScale >= 1.4;

  return (
    <>
      <color attach="background" args={[bg]} />
      <fog attach="fog" args={[fog, fogNear, fogFar]} />
      <ambientLight intensity={ambient} />
      <EnvironmentalMotifField
        motifs={motifs}
        color={atmosphere.particleColor}
        intensity={blend}
        position={[
          scene.coordinates.x,
          scene.coordinates.y,
          scene.coordinates.z - 6,
        ]}
      />
      <StarFollowCamera
        scene={scene}
        from={from}
        prevPrev={prevPrevScene?.coordinates}
        next={nextScene?.coordinates}
        transitionProgress={transitionProgress}
        arrived={arrived}
        sceneIndex={sceneIndex}
        preset={preset}
        graphRevealProgress={graphRevealProgress}
        graphCenter={new THREE.Vector3(0, 0, journey.scenes[sceneIndex]?.coordinates.z ?? 0)}
      />
      <AtmosphereParticles
        config={atmosphere}
        prevConfig={prevAtmosphere}
        blend={blend}
        count={particleCountForQuality(quality)}
      />
      <ForegroundDepth color={atmosphere.particleColor} count={quality === "high" ? 32 : 18} seed={seed} />
      {showWorldNode ? (
        <WorldNode
          position={[scene.coordinates.x, scene.coordinates.y - 0.3, scene.coordinates.z - 0.8]}
          color={atmosphere.particleColor}
          arrivalProgress={nodeReveal}
          worldScale={worldScale}
          scale={1.2}
          scene={scene}
          archetype={scene.worldNodeArchetype}
        />
      ) : null}
      {showImages && !environmentOnly && traveling && prevScene?.image?.url ? (
        <Suspense fallback={null}>
          <SceneImagePlane
            url={prevScene.image.url}
            position={[
              from.x + prevImageOffset.x,
              from.y + prevImageOffset.y,
              from.z + prevImageOffset.z - 0.4,
            ]}
            scale={3.2}
            opacity={prevImageOpacity}
            focalPoint={prevScene.image.focalPoint}
            aspectRatio={prevScene.image.aspectRatio}
            composition={prevComposition}
            arrivalProgress={1}
            traveling={true}
            fadeOut={transitionProgress}
          />
        </Suspense>
      ) : null}
      {showImages && !environmentOnly && scene.image?.url && composition !== "NO_IMAGE" ? (
        <Suspense fallback={null}>
          <SceneImagePlane
            url={scene.image.url}
            position={[
              scene.coordinates.x + imageOffset.x,
              scene.coordinates.y + imageOffset.y,
              scene.coordinates.z + imageOffset.z,
            ]}
            scale={
              3.4 *
              (composition === "FULL_BLEED" ? 1.05 : 1) *
              (composition === "DISTANT_WORLD" ? worldScale * 0.9 : 1)
            }
            opacity={imageOpacity}
            focalPoint={scene.image.focalPoint}
            aspectRatio={scene.image.aspectRatio}
            composition={composition}
            arrivalProgress={arrived ? 1 : transitionProgress}
            traveling={traveling}
            crossfade={traveling}
          />
        </Suspense>
      ) : null}
      <TravelingStar
        scene={scene}
        from={from}
        prevPrev={prevPrevScene?.coordinates}
        next={nextScene?.coordinates}
        transitionProgress={transitionProgress}
        arrived={arrived}
        sceneIndex={sceneIndex}
        starWarmth={atmosphere.starWarmth}
        arrivalPulse={arrivalPulse}
      />
      <ConstellationLines
        points={journey.scenes.map((s) =>
          graphRevealProgress > 0 ? s.graphTarget! : s.coordinates,
        )}
        visitedIndices={visitedSceneIndices}
        progress={
          graphRevealProgress > 0
            ? graphRevealProgress
            : arrived
              ? 0.6
              : transitionProgress * 0.4
        }
        graphReveal={graphRevealProgress > 0}
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
  arrived,
  visitedSceneIndices,
  showImages = true,
  environmentOnly = false,
  arrivalPulse = 0,
}: {
  journey: CinematicJourney;
  sceneIndex: number;
  transitionProgress: number;
  graphRevealProgress: number;
  quality: CinematicQualityLevel;
  arrived: boolean;
  visitedSceneIndices: number[];
  showImages?: boolean;
  environmentOnly?: boolean;
  arrivalPulse?: number;
}) {
  const scene = journey.scenes[sceneIndex];
  if (!scene) return null;

  const prevScene = sceneIndex > 0 ? journey.scenes[sceneIndex - 1] : undefined;
  const prevPrevScene = sceneIndex > 1 ? journey.scenes[sceneIndex - 2] : undefined;
  const nextScene =
    sceneIndex < journey.scenes.length - 1 ? journey.scenes[sceneIndex + 1] : undefined;

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
        prevScene={prevScene}
        prevPrevScene={prevPrevScene}
        nextScene={nextScene}
        sceneIndex={sceneIndex}
        transitionProgress={transitionProgress}
        graphRevealProgress={graphRevealProgress}
        quality={quality}
        arrived={arrived}
        visitedSceneIndices={visitedSceneIndices}
        showImages={showImages}
        environmentOnly={environmentOnly}
        arrivalPulse={arrivalPulse}
      />
    </Canvas>
  );
}
