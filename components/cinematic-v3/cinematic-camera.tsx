"use client";

import { useFrame, useThree } from "@react-three/fiber";
import * as React from "react";
import * as THREE from "three";
import { cameraFollowPosition } from "@/lib/cinematic-v3/star-path";
import type { CinematicCameraPreset } from "@/types";

export function CinematicCameraRig({
  starPosition,
  preset,
  transitionProgress,
  graphRevealProgress = 0,
  graphCenter,
  arrived,
}: {
  starPosition: THREE.Vector3;
  preset: CinematicCameraPreset;
  transitionProgress: number;
  graphRevealProgress?: number;
  graphCenter?: THREE.Vector3;
  arrived: boolean;
}) {
  const { camera } = useThree();
  const current = React.useRef(new THREE.Vector3(0, 1.5, 8));
  const lookAt = React.useRef(new THREE.Vector3(0, 0, 0));
  const velocity = React.useRef(new THREE.Vector3());
  const star = React.useRef(new THREE.Vector3());

  useFrame((_, delta) => {
    star.current.copy(starPosition);
    const t = arrived ? 1 : transitionProgress;

    const desired = cameraFollowPosition(
      { x: star.current.x, y: star.current.y, z: star.current.z },
      preset,
      t,
      graphRevealProgress,
    );

    const damping = graphRevealProgress > 0 ? 2.5 : 4.5;
    const smooth = 1 - Math.exp(-damping * delta);
    current.current.lerp(new THREE.Vector3(desired.x, desired.y, desired.z), smooth);

    const ahead = star.current.clone();
    if (!arrived && transitionProgress < 0.95) {
      const predict = 0.35 * (1 - transitionProgress);
      ahead.z -= predict;
      ahead.y += predict * 0.2;
    }

    const center = graphCenter ?? ahead;
    lookAt.current.lerp(center, smooth * 1.2);
    if (graphRevealProgress > 0.1) {
      lookAt.current.lerp(
        new THREE.Vector3(
          (graphCenter?.x ?? 0) * graphRevealProgress,
          (graphCenter?.y ?? 0) * graphRevealProgress,
          star.current.z * (1 - graphRevealProgress * 0.5),
        ),
        graphRevealProgress * 0.04,
      );
    }

    camera.position.copy(current.current);
    camera.lookAt(lookAt.current);

    velocity.current.subVectors(current.current, desired);
  });

  return null;
}
