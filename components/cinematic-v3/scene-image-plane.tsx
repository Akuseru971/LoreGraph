"use client";

import { useTexture } from "@react-three/drei";
import * as React from "react";
import * as THREE from "three";

export function SceneImagePlane({
  url,
  position,
  scale = 4,
  opacity = 0.55,
}: {
  url?: string;
  position: [number, number, number];
  scale?: number;
  opacity?: number;
}) {
  if (!url) return null;

  const texture = useTexture(url);
  texture.colorSpace = THREE.SRGBColorSpace;

  return (
    <mesh position={position} rotation={[0, 0, 0]}>
      <planeGeometry args={[scale * 0.56, scale]} />
      <meshBasicMaterial
        map={texture}
        transparent
        opacity={opacity}
        side={THREE.DoubleSide}
        depthWrite={false}
      />
    </mesh>
  );
}
