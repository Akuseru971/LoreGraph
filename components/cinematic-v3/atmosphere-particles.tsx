"use client";

import { useFrame } from "@react-three/fiber";
import * as React from "react";
import * as THREE from "three";
import type { AtmosphereConfig } from "@/lib/cinematic-v3/atmosphere";
import type { AtmospherePreset } from "@/types";

type ParticleBehavior = "default" | "organic" | "dust" | "void" | "spectral" | "celestial" | "ash";

const BEHAVIOR: Partial<Record<AtmospherePreset, ParticleBehavior>> = {
  IONIA: "organic",
  SHURIMA: "dust",
  VOID: "void",
  SHADOW_ISLES: "spectral",
  CELESTIAL: "celestial",
  NOXUS: "ash",
};

function lerpColor(a: string, b: string, t: number): string {
  const ca = new THREE.Color(a);
  const cb = new THREE.Color(b);
  return ca.lerp(cb, t).getStyle();
}

export function AtmosphereParticles({
  config,
  prevConfig,
  blend = 1,
  count,
}: {
  config: AtmosphereConfig;
  prevConfig?: AtmosphereConfig;
  blend?: number;
  count: number;
}) {
  const ref = React.useRef<THREE.Points>(null);
  const behavior = BEHAVIOR[config.preset] ?? "default";
  const velocities = React.useRef<Float32Array | null>(null);

  const positions = React.useMemo(() => {
    const arr = new Float32Array(count * 3);
    const vel = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 60;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 30;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 80 - 10;
      vel[i * 3] = (Math.random() - 0.5) * 0.02;
      vel[i * 3 + 1] = (Math.random() - 0.5) * 0.015;
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.02;
    }
    velocities.current = vel;
    return arr;
  }, [count]);

  const particleColor = prevConfig
    ? lerpColor(prevConfig.particleColor, config.particleColor, blend)
    : config.particleColor;

  useFrame((_, delta) => {
    if (!ref.current) return;
    const pos = ref.current.geometry.attributes.position as THREE.BufferAttribute;
    const vel = velocities.current;
    if (!vel) return;

    for (let i = 0; i < count; i++) {
      const ix = i * 3;
      let vx = vel[ix];
      let vy = vel[ix + 1];
      let vz = vel[ix + 2];

      switch (behavior) {
        case "organic":
          vy += Math.sin(pos.array[ix] * 0.3 + performance.now() * 0.001) * 0.0008;
          vx += Math.cos(pos.array[ix + 2] * 0.2) * 0.0005;
          break;
        case "dust":
          vy -= delta * 0.003;
          vx += delta * 0.001;
          break;
        case "void": {
          const pull = 0.0003;
          vx -= pos.array[ix] * pull;
          vy -= pos.array[ix + 1] * pull;
          vz += Math.sin(pos.array[ix] * 0.5) * 0.002;
          break;
        }
        case "spectral":
          vy += delta * 0.004;
          vx += Math.sin(pos.array[ix + 1] * 0.4) * 0.001;
          break;
        case "celestial":
          vz -= delta * 0.002;
          break;
        case "ash":
          vy -= delta * 0.002;
          vx += delta * 0.0025;
          break;
        default:
          break;
      }

      pos.array[ix] += vx;
      pos.array[ix + 1] += vy;
      pos.array[ix + 2] += vz;

      if (Math.abs(pos.array[ix]) > 30) pos.array[ix] *= -0.9;
      if (Math.abs(pos.array[ix + 1]) > 15) pos.array[ix + 1] *= -0.9;
      if (pos.array[ix + 2] > 20) pos.array[ix + 2] = -40;
      if (pos.array[ix + 2] < -50) pos.array[ix + 2] = 15;
    }
    pos.needsUpdate = true;

    if (behavior === "default") {
      ref.current.rotation.y += delta * 0.02;
    }
  });

  if (count <= 0) return null;

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        color={particleColor}
        size={0.06 * config.particleDensity + 0.02}
        transparent
        opacity={(0.2 + config.particleDensity * 0.2) * (0.4 + blend * 0.6)}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}
