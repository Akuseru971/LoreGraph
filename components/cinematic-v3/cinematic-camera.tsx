"use client";

import { useFrame, useThree } from "@react-three/fiber";
import * as React from "react";
import * as THREE from "three";
import { ease, getCameraConfig } from "@/lib/cinematic-v3/camera";
import type { CinematicCameraPreset, CinematicCoordinates } from "@/types";

export function CinematicCameraRig({
  target,
  preset,
  transitionProgress,
  graphRevealProgress = 0,
  graphCenter,
}: {
  target: CinematicCoordinates;
  preset: CinematicCameraPreset;
  transitionProgress: number;
  graphRevealProgress?: number;
  graphCenter?: CinematicCoordinates;
}) {
  const { camera } = useThree();
  const current = React.useRef(new THREE.Vector3(0, 1.5, 8));
  const lookAt = React.useRef(new THREE.Vector3(0, 0, 0));

  useFrame(() => {
    const config = getCameraConfig(preset);
    const t = ease(transitionProgress, config.easing);
    const offset = config.offset;

    const pullZ = graphRevealProgress * 12;
    const pullY = graphRevealProgress * 5;

    const desired = new THREE.Vector3(
      target.x + offset.x * (1 - t * 0.5),
      target.y + offset.y * (1 - t * 0.5) + pullY,
      target.z + offset.z * (1 - t * 0.3) + pullZ,
    );

    current.current.lerp(desired, 0.06);

    const center = graphCenter ?? target;
    lookAt.current.set(center.x, center.y, center.z);
    lookAt.current.lerp(
      new THREE.Vector3(target.x, target.y, target.z),
      1 - graphRevealProgress * 0.3,
    );

    camera.position.copy(current.current);
    camera.lookAt(lookAt.current);
  });

  return null;
}
