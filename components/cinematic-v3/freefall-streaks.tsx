"use client";

import { useFrame } from "@react-three/fiber";
import * as React from "react";
import * as THREE from "three";

/** Star streak particles during freefall scene transitions. */
export function FreefallStreaks({
  intensity = 0,
  color = "#e8d4a0",
  count = 48,
}: {
  intensity: number;
  color?: string;
  count?: number;
}) {
  const pointsRef = React.useRef<THREE.Points>(null);
  const velocities = React.useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 8;
      arr[i * 3 + 1] = Math.random() * 12 + 2;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 6 - 4;
    }
    return arr;
  }, [count]);

  const positions = React.useMemo(() => new Float32Array(count * 3), [count]);

  useFrame((_, delta) => {
    if (!pointsRef.current || intensity < 0.05) return;
    const geo = pointsRef.current.geometry;
    const pos = geo.attributes.position as THREE.BufferAttribute;
    const speed = 18 * intensity;
    for (let i = 0; i < count; i++) {
      positions[i * 3] = velocities[i * 3] + Math.sin(i * 0.7) * 0.02;
      positions[i * 3 + 1] -= speed * delta;
      positions[i * 3 + 2] = velocities[i * 3 + 2] - speed * delta * 0.4;
      if (positions[i * 3 + 1] < -8) {
        positions[i * 3 + 1] = 12 + Math.random() * 4;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 6 - 4;
      }
      pos.setXYZ(i, positions[i * 3], positions[i * 3 + 1], positions[i * 3 + 2]);
    }
    pos.needsUpdate = true;
    const mat = pointsRef.current.material as THREE.PointsMaterial;
    mat.opacity = 0.15 + intensity * 0.45;
    mat.size = 0.04 + intensity * 0.06;
  });

  if (intensity < 0.05) return null;

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} count={count} />
      </bufferGeometry>
      <pointsMaterial
        color={color}
        size={0.05}
        transparent
        opacity={0.3}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}
