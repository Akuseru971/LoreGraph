"use client";

import { useFrame } from "@react-three/fiber";
import * as React from "react";
import * as THREE from "three";
import { worldNodeConfig } from "@/lib/cinematic-v3/world-node-archetypes";
import type { CinematicScene, WorldNodeArchetype } from "@/types";

export function WorldNode({
  position,
  scale = 1,
  color = "#c8a86a",
  arrivalProgress = 1,
  worldScale = 1,
  scene,
  archetype,
}: {
  position: [number, number, number];
  scale?: number;
  color?: string;
  arrivalProgress?: number;
  worldScale?: number;
  scene?: CinematicScene;
  archetype?: WorldNodeArchetype;
}) {
  const haloRef = React.useRef<THREE.Mesh>(null);
  const arcRef = React.useRef<THREE.Group>(null);
  const beamRef = React.useRef<THREE.Mesh>(null);
  const linesRef = React.useRef<THREE.Group>(null);
  const t = React.useRef(0);
  const nodeColor = React.useMemo(() => new THREE.Color(color), [color]);
  const reveal = Math.max(0, Math.min(1, arrivalProgress));
  const config = scene ? worldNodeConfig(scene) : null;
  const arch = archetype ?? config?.archetype;
  const cfg = config ?? {
    ringCount: 3,
    horizontalScale: 1.2,
    verticalBeam: true,
    convergingPaths: false,
    inwardPressure: false,
    outwardPulse: false,
    particleChaos: 0.4,
    directionalLines: false,
    archetype: archetype ?? "WAR",
  };

  const size = scale * (0.6 + worldScale * 0.55) * reveal;
  const hScale = cfg.horizontalScale;

  useFrame((_, delta) => {
    t.current += delta;
    const pulse =
      cfg.outwardPulse
        ? 1 + Math.sin(t.current * 1.2) * 0.08
        : cfg.inwardPressure
          ? 1 - Math.sin(t.current * 0.8) * 0.04
          : 1 + Math.sin(t.current * 1.2) * 0.04;

    if (haloRef.current) {
      haloRef.current.scale.set(size * hScale * pulse, size * pulse, 1);
      const mat = haloRef.current.material as THREE.MeshBasicMaterial;
      mat.opacity = 0.08 + reveal * 0.14;
    }
    if (arcRef.current) {
      arcRef.current.rotation.z += delta * (cfg.particleChaos > 0.6 ? 0.12 : 0.06);
    }
    if (beamRef.current) {
      const mat = beamRef.current.material as THREE.MeshBasicMaterial;
      mat.opacity =
        (cfg.verticalBeam ? 0.1 : 0.04) +
        reveal * 0.12 +
        Math.sin(t.current * 2) * 0.02;
      beamRef.current.scale.y = cfg.verticalBeam ? 1 : 0.3;
    }
    if (linesRef.current && cfg.directionalLines) {
      linesRef.current.position.z = Math.sin(t.current * 0.5) * 0.2;
    }
  });

  if (worldScale < 1.4 && !arch) return null;

  return (
    <group position={position}>
      <mesh ref={haloRef} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[1.4, 2.8 * hScale, 64]} />
        <meshBasicMaterial color={nodeColor} transparent opacity={0.15} side={THREE.DoubleSide} />
      </mesh>
      <group ref={arcRef}>
        {Array.from({ length: cfg.ringCount }).map((_, i) => (
          <mesh key={i} rotation={[0, 0, (Math.PI * 2 * i) / cfg.ringCount]} scale={size}>
            <ringGeometry
              args={[1.6 + i * 0.35, 1.75 + i * 0.35, 48, 1, 0, Math.PI * (cfg.convergingPaths ? 0.4 : 0.55)]}
            />
            <meshBasicMaterial color={nodeColor} transparent opacity={0.12 - i * 0.02} />
          </mesh>
        ))}
      </group>
      {cfg.directionalLines ? (
        <group ref={linesRef}>
          {[-1, 0, 1].map((side) => (
            <mesh key={side} position={[side * 4, 0, -2]} rotation={[0, side * 0.3, 0]}>
              <planeGeometry args={[6, 0.03]} />
              <meshBasicMaterial color={nodeColor} transparent opacity={0.08 * reveal} />
            </mesh>
          ))}
        </group>
      ) : null}
      <mesh ref={beamRef} position={[0, 1.2 * size, 0]}>
        <cylinderGeometry args={[0.02 * size, 0.08 * size, 3.5 * size, 8, 1, true]} />
        <meshBasicMaterial color={nodeColor} transparent opacity={0.12} side={THREE.DoubleSide} />
      </mesh>
      {worldScale >= 2 || cfg.particleChaos > 0.5 ? (
        <points>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              args={[
                new Float32Array(
                  Array.from({ length: 24 }, (_, i) => {
                    const angle = (i / 24) * Math.PI * 2;
                    const r = 2.5 + (i % 3) * 0.4;
                    return [
                      Math.cos(angle) * r * hScale,
                      (Math.sin(angle * 3) * 0.25),
                      Math.sin(angle) * r,
                    ];
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
            opacity={0.25 * reveal * cfg.particleChaos}
            sizeAttenuation
            depthWrite={false}
          />
        </points>
      ) : null}
    </group>
  );
}
