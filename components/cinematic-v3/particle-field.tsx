"use client";

import * as React from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import type { AtmosphereConfig } from "@/lib/cinematic-v3/atmosphere";

export function ParticleField({
  config,
  count,
}: {
  config: AtmosphereConfig;
  count: number;
}) {
  const ref = React.useRef<THREE.Points>(null);

  const positions = React.useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 60;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 30;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 80 - 10;
    }
    return arr;
  }, [count]);

  useFrame((_, delta) => {
    if (!ref.current) return;
    ref.current.rotation.y += delta * 0.02;
  });

  if (count <= 0) return null;

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        color={config.particleColor}
        size={0.06 * config.particleDensity + 0.02}
        transparent
        opacity={0.25 + config.particleDensity * 0.2}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}
