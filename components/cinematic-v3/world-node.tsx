"use client";

import { useFrame } from "@react-three/fiber";
import * as React from "react";
import * as THREE from "three";

export function WorldNode({
  position,
  scale = 1,
  color = "#c8a86a",
  arrivalProgress = 1,
  worldScale = 1,
}: {
  position: [number, number, number];
  scale?: number;
  color?: string;
  arrivalProgress?: number;
  worldScale?: number;
}) {
  const haloRef = React.useRef<THREE.Mesh>(null);
  const arcRef = React.useRef<THREE.Group>(null);
  const beamRef = React.useRef<THREE.Mesh>(null);
  const t = React.useRef(0);
  const nodeColor = React.useMemo(() => new THREE.Color(color), [color]);
  const reveal = Math.max(0, Math.min(1, arrivalProgress));
  const size = scale * (0.6 + worldScale * 0.55) * reveal;

  useFrame((_, delta) => {
    t.current += delta;
    if (haloRef.current) {
      const pulse = 1 + Math.sin(t.current * 1.2) * 0.04;
      haloRef.current.scale.setScalar(size * pulse);
      const mat = haloRef.current.material as THREE.MeshBasicMaterial;
      mat.opacity = 0.08 + reveal * 0.12;
    }
    if (arcRef.current) {
      arcRef.current.rotation.z = t.current * 0.08;
    }
    if (beamRef.current) {
      const mat = beamRef.current.material as THREE.MeshBasicMaterial;
      mat.opacity = 0.06 + reveal * 0.14 + Math.sin(t.current * 2) * 0.02;
    }
  });

  if (worldScale < 1.4) return null;

  return (
    <group position={position}>
      <mesh ref={haloRef} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[1.4, 2.8, 64]} />
        <meshBasicMaterial color={nodeColor} transparent opacity={0.15} side={THREE.DoubleSide} />
      </mesh>
      <group ref={arcRef}>
        {[0, 1, 2].map((i) => (
          <mesh key={i} rotation={[0, 0, (Math.PI * 2 * i) / 3]} scale={size}>
            <ringGeometry args={[1.6 + i * 0.35, 1.75 + i * 0.35, 48, 1, 0, Math.PI * 0.55]} />
            <meshBasicMaterial color={nodeColor} transparent opacity={0.12 - i * 0.02} />
          </mesh>
        ))}
      </group>
      <mesh ref={beamRef} position={[0, 1.2 * size, 0]}>
        <cylinderGeometry args={[0.02 * size, 0.08 * size, 3.5 * size, 8, 1, true]} />
        <meshBasicMaterial color={nodeColor} transparent opacity={0.12} side={THREE.DoubleSide} />
      </mesh>
      {worldScale >= 2.2 ? (
        <points>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              args={[
                new Float32Array(
                  Array.from({ length: 24 }, (_, i) => {
                    const angle = (i / 24) * Math.PI * 2;
                    const r = 2.5 + (i % 3) * 0.4;
                    return [Math.cos(angle) * r, (Math.random() - 0.5) * 0.5, Math.sin(angle) * r];
                  }).flat(),
                ),
                3,
              ]}
            />
          </bufferGeometry>
          <pointsMaterial
            color={nodeColor}
            size={0.05}
            transparent
            opacity={0.25 * reveal}
            sizeAttenuation
            depthWrite={false}
          />
        </points>
      ) : null}
    </group>
  );
}
