"use client";

import { useFrame } from "@react-three/fiber";
import * as React from "react";
import * as THREE from "three";

export function ForegroundDepth({
  color = "#c8d8ff",
  count = 24,
  seed = 0,
}: {
  color?: string;
  count?: number;
  seed?: number;
}) {
  const ref = React.useRef<THREE.Points>(null);
  const positions = React.useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const s = Math.sin((seed + i) * 12.9898) * 43758.5453;
      const r = s - Math.floor(s);
      arr[i * 3] = (r - 0.5) * 8;
      arr[i * 3 + 1] = (Math.sin((seed + i) * 7.1) * 0.5) * 4;
      arr[i * 3 + 2] = 2 + r * 3;
    }
    return arr;
  }, [count, seed]);

  useFrame((_, delta) => {
    if (!ref.current) return;
    const pos = ref.current.geometry.attributes.position as THREE.BufferAttribute;
    for (let i = 0; i < count; i++) {
      pos.array[i * 3 + 2] += delta * 0.8;
      if (pos.array[i * 3 + 2] > 6) pos.array[i * 3 + 2] = 1.5;
    }
    pos.needsUpdate = true;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        color={color}
        size={0.12}
        transparent
        opacity={0.18}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
