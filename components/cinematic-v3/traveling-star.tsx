"use client";

import { useFrame } from "@react-three/fiber";
import * as React from "react";
import * as THREE from "three";
import {
  interpolateStarPosition,
  trailLengthForPreset,
} from "@/lib/cinematic-v3/star-path";
import type {
  CinematicCameraPreset,
  CinematicCoordinates,
  CinematicScene,
} from "@/types";
import { LoreLight } from "./lore-light";
import { RelationshipLights } from "./relationship-lights";

export function TravelingStar({
  scene,
  from,
  prevPrev,
  next,
  transitionProgress,
  arrived,
  sceneIndex,
  starWarmth,
  arrivalPulse = 0,
}: {
  scene: CinematicScene;
  from: CinematicCoordinates;
  prevPrev?: CinematicCoordinates;
  next?: CinematicCoordinates;
  transitionProgress: number;
  arrived: boolean;
  sceneIndex: number;
  starWarmth: number;
  arrivalPulse?: number;
}) {
  const position = React.useRef(new THREE.Vector3(from.x, from.y, from.z));
  const preset = scene.cameraPreset ?? "SLOW_APPROACH";
  const traveling = !arrived && sceneIndex > 0;

  useFrame(() => {
    const p =
      sceneIndex === 0
        ? scene.coordinates
        : interpolateStarPosition(
            from,
            scene.coordinates,
            transitionProgress,
            preset,
            prevPrev,
            next,
          );
    position.current.set(p.x, p.y, p.z);
  });

  return (
    <>
      <LoreLight
        positionRef={position}
        color="#fff4d6"
        warmth={starWarmth}
        traveling={traveling}
        trailLength={trailLengthForPreset(preset)}
        intensity={1.35}
        arrivalPulse={arrivalPulse}
      />
      {scene.secondaryCharacterIds?.length ? (
        <RelationshipLights
          starPositionRef={position}
          choreography={scene.relationshipChoreography}
          transitionProgress={transitionProgress}
          arrived={arrived}
          secondaryIds={scene.secondaryCharacterIds}
        />
      ) : null}
    </>
  );
}
