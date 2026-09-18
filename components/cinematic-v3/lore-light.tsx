"use client";

import { useFrame } from "@react-three/fiber";
import * as React from "react";
import * as THREE from "three";

export function LoreLight({
  position,
  color = "#ffd89a",
  warmth = 1,
  visible = true,
  intensity = 1.2,
}: {
  position: THREE.Vector3 | [number, number, number];
  color?: string;
  warmth?: number;
  visible?: boolean;
  intensity?: number;
}) {
  const ref = React.useRef<THREE.Mesh>(null);
  const lightRef = React.useRef<THREE.PointLight>(null);
  const trailRef = React.useRef<THREE.Points>(null);
  const t = React.useRef(0);

  const pos = Array.isArray(position)
    ? new THREE.Vector3(...position)
    : position;

  useFrame((_, delta) => {
    t.current += delta;
    if (ref.current) {
      ref.current.position.copy(pos);
      const pulse = 1 + Math.sin(t.current * 2.4) * 0.06;
      ref.current.scale.setScalar(pulse);
    }
    if (lightRef.current) {
      lightRef.current.position.copy(pos);
      lightRef.current.intensity = intensity * (0.9 + Math.sin(t.current * 1.8) * 0.1);
    }
    if (trailRef.current) {
      trailRef.current.position.copy(pos);
    }
  });

  if (!visible) return null;

  const warmColor = new THREE.Color(color).multiplyScalar(warmth);

  return (
    <group>
      <mesh ref={ref} position={pos}>
        <sphereGeometry args={[0.06, 12, 12]} />
        <meshBasicMaterial color={warmColor} transparent opacity={0.95} />
      </mesh>
      <mesh position={pos}>
        <sphereGeometry args={[0.14, 12, 12]} />
        <meshBasicMaterial color={warmColor} transparent opacity={0.15} />
      </mesh>
      <pointLight
        ref={lightRef}
        position={pos}
        color={warmColor}
        intensity={intensity}
        distance={12}
        decay={2}
      />
      <points ref={trailRef} position={pos}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[new Float32Array(12), 3]}
            count={4}
          />
        </bufferGeometry>
        <pointsMaterial
          color={warmColor}
          size={0.04}
          transparent
          opacity={0.35}
          sizeAttenuation
        />
      </points>
    </group>
  );
}
