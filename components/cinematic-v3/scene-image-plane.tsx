"use client";

import { useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as React from "react";
import * as THREE from "three";
import type { CinematicComposition } from "@/types";

function SceneImageMesh({
  texture,
  position,
  scale,
  opacity,
  focalPoint,
  aspectRatio,
  composition,
  arrivalProgress,
  traveling,
}: {
  texture: THREE.Texture;
  position: [number, number, number];
  scale: number;
  opacity: number;
  focalPoint?: { x: number; y: number };
  aspectRatio?: number;
  composition: CinematicComposition;
  arrivalProgress: number;
  traveling: boolean;
}) {
  const meshRef = React.useRef<THREE.Mesh>(null);
  texture.colorSpace = THREE.SRGBColorSpace;

  const texAspect =
    aspectRatio ??
    (texture.image
      ? (texture.image as HTMLImageElement).width /
        Math.max(1, (texture.image as HTMLImageElement).height)
      : 16 / 9);

  const height = scale;
  const width = height * texAspect;
  const fp = focalPoint ?? { x: 0.5, y: 0.5 };
  const offsetX = (0.5 - fp.x) * width * 0.35;
  const offsetY = (0.5 - fp.y) * height * 0.25;

  const reveal = traveling
    ? Math.max(0, arrivalProgress * 0.35)
    : Math.min(1, arrivalProgress);

  const memoryOpacity =
    composition === "BACKGROUND_MEMORY" ? opacity * 0.75 : opacity;

  useFrame(() => {
    if (!meshRef.current) return;
    const mat = meshRef.current.material as THREE.MeshBasicMaterial;
    mat.opacity = memoryOpacity * reveal;
    const depth = traveling ? -0.4 * (1 - arrivalProgress) : 0;
    meshRef.current.position.set(
      position[0] + offsetX,
      position[1] + offsetY,
      position[2] + depth,
    );
    const s = 0.92 + reveal * 0.08;
    meshRef.current.scale.set(s, s, 1);
  });

  return (
    <mesh ref={meshRef} position={position}>
      <planeGeometry args={[width, height]} />
      <meshBasicMaterial
        map={texture}
        transparent
        opacity={memoryOpacity * reveal}
        side={THREE.DoubleSide}
        depthWrite={false}
      />
    </mesh>
  );
}

export function SceneImagePlane({
  url,
  position,
  scale = 4,
  opacity = 0.55,
  focalPoint,
  aspectRatio,
  composition = "BACKGROUND_MEMORY",
  arrivalProgress = 1,
  traveling = false,
}: {
  url: string;
  position: [number, number, number];
  scale?: number;
  opacity?: number;
  focalPoint?: { x: number; y: number };
  aspectRatio?: number;
  composition?: CinematicComposition;
  arrivalProgress?: number;
  traveling?: boolean;
}) {
  const texture = useTexture(url);
  return (
    <SceneImageMesh
      texture={texture}
      position={position}
      scale={scale}
      opacity={opacity}
      focalPoint={focalPoint}
      aspectRatio={aspectRatio}
      composition={composition}
      arrivalProgress={arrivalProgress}
      traveling={traveling}
    />
  );
}
