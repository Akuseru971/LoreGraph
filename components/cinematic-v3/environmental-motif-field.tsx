"use client";

import { useFrame } from "@react-three/fiber";
import * as React from "react";
import * as THREE from "three";
import type { EnvironmentalMotifType } from "@/types";

function SunDisc({ color, intensity }: { color: string; intensity: number }) {
  const ref = React.useRef<THREE.Mesh>(null);
  useFrame((_, d) => {
    if (ref.current) ref.current.rotation.z += d * 0.02;
  });
  return (
    <group position={[0, 2.5, -18]}>
      <mesh ref={ref}>
        <ringGeometry args={[4, 5.2, 64]} />
        <meshBasicMaterial color={color} transparent opacity={0.12 * intensity} side={THREE.DoubleSide} />
      </mesh>
      <mesh>
        <circleGeometry args={[3.2, 48]} />
        <meshBasicMaterial color={color} transparent opacity={0.06 * intensity} />
      </mesh>
    </group>
  );
}

function SpiritArcs({ color, intensity }: { color: string; intensity: number }) {
  const ref = React.useRef<THREE.Group>(null);
  useFrame((_, d) => {
    if (ref.current) ref.current.rotation.y += d * 0.05;
  });
  return (
    <group ref={ref} position={[0, 0, -12]}>
      {[0, 1, 2].map((i) => (
        <mesh key={i} rotation={[0, i * 1.2, 0]}>
          <torusGeometry args={[3 + i * 0.8, 0.02, 8, 64, Math.PI * 0.8]} />
          <meshBasicMaterial color={color} transparent opacity={0.15 * intensity} />
        </mesh>
      ))}
    </group>
  );
}

function VoidRift({ color, intensity }: { color: string; intensity: number }) {
  const ref = React.useRef<THREE.Mesh>(null);
  useFrame((_, d) => {
    if (ref.current) {
      ref.current.scale.x = 1 + Math.sin(performance.now() * 0.002) * 0.05;
    }
  });
  return (
    <mesh ref={ref} position={[0, 0, -14]} rotation={[0, 0, 0.3]}>
      <planeGeometry args={[6, 0.15]} />
      <meshBasicMaterial color={color} transparent opacity={0.25 * intensity} blending={THREE.AdditiveBlending} />
    </mesh>
  );
}

function Monoliths({ color, intensity }: { color: string; intensity: number }) {
  return (
    <group position={[0, -1, -16]}>
      {[-3, 0, 3].map((x, i) => (
        <mesh key={i} position={[x, 0, -i * 0.5]}>
          <boxGeometry args={[0.4, 4 + i, 0.3]} />
          <meshBasicMaterial color={color} transparent opacity={0.08 * intensity} />
        </mesh>
      ))}
    </group>
  );
}

function ConstellationGrid({ color, intensity }: { color: string; intensity: number }) {
  const points = React.useMemo(() => {
    const verts: number[] = [];
    for (let i = 0; i < 8; i++) {
      const a = (i / 8) * Math.PI * 2;
      verts.push(Math.cos(a) * 5, Math.sin(a) * 2, -15);
      verts.push(Math.cos(a + 0.4) * 6, Math.sin(a + 0.4) * 2.5, -16);
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.Float32BufferAttribute(verts, 3));
    return geo;
  }, []);
  return (
    <lineSegments geometry={points}>
      <lineBasicMaterial color={color} transparent opacity={0.2 * intensity} />
    </lineSegments>
  );
}

const MOTIF_RENDERERS: Partial<
  Record<
    EnvironmentalMotifType,
    React.FC<{ color: string; intensity: number }>
  >
> = {
  SUN_DISC: SunDisc,
  SHURIMA_ARCHES: Monoliths,
  IONIAN_SPIRIT_ARCS: SpiritArcs,
  IONIAN_FLOATING_LIGHTS: SpiritArcs,
  VOID_RIFT: VoidRift,
  VOID_FILAMENTS: VoidRift,
  NOXIAN_MONOLITHS: Monoliths,
  TARGON_CONSTELLATIONS: ConstellationGrid,
  CELESTIAL_ORBITS: ConstellationGrid,
  SHADOW_ARCHES: Monoliths,
  SHADOW_WISPS: SpiritArcs,
};

export function EnvironmentalMotifField({
  motifs,
  color,
  intensity = 1,
  position = [0, 0, 0],
}: {
  motifs: EnvironmentalMotifType[];
  color: string;
  intensity?: number;
  position?: [number, number, number];
}) {
  return (
    <group position={position}>
      {motifs.map((motif) => {
        const Renderer = MOTIF_RENDERERS[motif];
        if (!Renderer) return null;
        return <Renderer key={motif} color={color} intensity={intensity} />;
      })}
    </group>
  );
}
