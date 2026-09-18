"use client";

import { useFrame, useThree } from "@react-three/fiber";
import * as React from "react";
import * as THREE from "three";
import type { HubMotionChannels } from "@/lib/cinematic-v3/motion-curve";
import {
  interpolateStarPosition,
  cameraFollowPosition,
  isFreefallPreset,
} from "@/lib/cinematic-v3/star-path";
import { shotCameraHints } from "@/lib/cinematic-v3/shot-types";
import type { CinematicCameraPreset, CinematicCoordinates, CinematicScene } from "@/types";

export function StarFollowCamera({
  scene,
  from,
  prevPrev,
  next,
  transitionProgress,
  arrived,
  sceneIndex,
  preset,
  graphRevealProgress,
  graphCenter,
  hubMotion,
}: {
  scene: CinematicScene;
  from: CinematicCoordinates;
  prevPrev?: CinematicCoordinates;
  next?: CinematicCoordinates;
  transitionProgress: number;
  arrived: boolean;
  sceneIndex: number;
  preset: CinematicCameraPreset;
  graphRevealProgress: number;
  graphCenter?: THREE.Vector3;
  hubMotion?: HubMotionChannels;
}) {
  const { camera } = useThree();
  const current = React.useRef(new THREE.Vector3(0, 1.5, 8));
  const lookAt = React.useRef(new THREE.Vector3(0, 0, 0));
  const velocity = React.useRef(new THREE.Vector3(0, 0, 0));
  const fovCurrent = React.useRef(45);

  useFrame((_, delta) => {
    const star =
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

    const hints = shotCameraHints(scene);
    const t = arrived ? 1 : transitionProgress;
    const desired = cameraFollowPosition(star, preset, t, graphRevealProgress);

    if (hubMotion && !arrived && sceneIndex > 0) {
      const pull = hubMotion.cameraPullback;
      const plunge = hubMotion.plunge;
      desired.z += pull * 22 + plunge * 6;
      desired.y += pull * 4.5 - plunge * 2.2;
      desired.x *= 1 - pull * 0.12;
    }

    desired.x *= hints.offsetScale;
    desired.y *= hints.offsetScale * 0.95;
    desired.z *= hints.offsetScale;

    const target = new THREE.Vector3(desired.x, desired.y, desired.z);
    const smooth = 1 - Math.exp(-(5.5 + hints.lookAhead) * delta);
    velocity.current.copy(target).sub(current.current).multiplyScalar(smooth);
    current.current.add(velocity.current);

    const targetFov = 45 * hints.fovScale + (hubMotion?.fovBias ?? 0);
    fovCurrent.current += (targetFov - fovCurrent.current) * smooth;

    if (camera instanceof THREE.PerspectiveCamera) {
      camera.fov = fovCurrent.current;
      camera.updateProjectionMatrix();
    }

    const ahead = new THREE.Vector3(star.x, star.y, star.z);
    if (!arrived && transitionProgress < 0.98) {
      if (isFreefallPreset(preset)) {
        const plunge = hubMotion?.plunge ?? 1 - transitionProgress;
        ahead.y -= 0.5 * (1 - transitionProgress) + plunge * 0.35;
        ahead.z -= 0.7 * (1 - transitionProgress) + plunge * 0.5;
      } else {
        ahead.z -= 0.35 * (1 - transitionProgress);
        ahead.y += 0.2 * (1 - transitionProgress);
      }
    }

    if (hubMotion && hubMotion.cameraPullback > 0.2) {
      ahead.y += hubMotion.cameraPullback * 0.8;
      ahead.z += hubMotion.cameraPullback * 1.2;
    }

    lookAt.current.lerp(ahead, smooth * 1.15);
    if (graphRevealProgress > 0.1 && graphCenter) {
      lookAt.current.lerp(graphCenter, graphRevealProgress * 0.05);
    }

    camera.position.copy(current.current);
    camera.lookAt(lookAt.current);
  });

  return null;
}
