"use client";

import { useFrame, useThree } from "@react-three/fiber";
import * as React from "react";
import * as THREE from "three";
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
}) {
  const { camera } = useThree();
  const current = React.useRef(new THREE.Vector3(0, 1.5, 8));
  const lookAt = React.useRef(new THREE.Vector3(0, 0, 0));

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
    desired.x *= hints.offsetScale;
    desired.y *= hints.offsetScale * 0.95;
    desired.z *= hints.offsetScale;
    const smooth = 1 - Math.exp(-(4.5 + hints.lookAhead) * delta);
    current.current.lerp(new THREE.Vector3(desired.x, desired.y, desired.z), smooth);
    if (camera instanceof THREE.PerspectiveCamera) {
      camera.fov = 45 * hints.fovScale;
      camera.updateProjectionMatrix();
    }

    const ahead = new THREE.Vector3(star.x, star.y, star.z);
    if (!arrived && transitionProgress < 0.95) {
      if (isFreefallPreset(preset)) {
        ahead.y -= 0.6 * (1 - transitionProgress);
        ahead.z -= 0.8 * (1 - transitionProgress);
      } else {
        ahead.z -= 0.35 * (1 - transitionProgress);
        ahead.y += 0.2 * (1 - transitionProgress);
      }
    }

    lookAt.current.lerp(ahead, smooth * 1.2);
    if (graphRevealProgress > 0.1 && graphCenter) {
      lookAt.current.lerp(graphCenter, graphRevealProgress * 0.05);
    }

    camera.position.copy(current.current);
    camera.lookAt(lookAt.current);
  });

  return null;
}
