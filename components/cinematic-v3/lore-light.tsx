"use client";

import { useFrame } from "@react-three/fiber";
import * as React from "react";
import * as THREE from "three";
import { StarTrail, useStarTrailHistory } from "./star-trail";

function createGlowTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 64;
  canvas.height = 64;
  const ctx = canvas.getContext("2d")!;
  const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
  grad.addColorStop(0, "rgba(255,255,255,0.9)");
  grad.addColorStop(0.2, "rgba(255,220,160,0.5)");
  grad.addColorStop(0.5, "rgba(255,180,100,0.15)");
  grad.addColorStop(1, "rgba(255,180,100,0)");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 64, 64);
  const tex = new THREE.CanvasTexture(canvas);
  tex.needsUpdate = true;
  return tex;
}

export function LoreLight({
  position,
  positionRef,
  color = "#ffd89a",
  warmth = 1,
  visible = true,
  intensity = 1.2,
  traveling = false,
  trailLength = 28,
  variant = "primary",
  onPositionUpdate,
}: {
  position?: THREE.Vector3 | [number, number, number];
  positionRef?: React.RefObject<THREE.Vector3>;
  color?: string;
  warmth?: number;
  visible?: boolean;
  intensity?: number;
  traveling?: boolean;
  trailLength?: number;
  variant?: "primary" | "secondary" | "transform";
  onPositionUpdate?: (pos: THREE.Vector3) => void;
}) {
  const coreRef = React.useRef<THREE.Mesh>(null);
  const innerRef = React.useRef<THREE.Mesh>(null);
  const coronaRef = React.useRef<THREE.Mesh>(null);
  const spriteRef = React.useRef<THREE.Sprite>(null);
  const lightRef = React.useRef<THREE.PointLight>(null);
  const particlesRef = React.useRef<THREE.Points>(null);
  const groupRef = React.useRef<THREE.Group>(null);
  const t = React.useRef(0);
  const drift = React.useRef({ x: 0, y: 0 });
  const worldPos = React.useRef(new THREE.Vector3());
  const targetPos = React.useRef(new THREE.Vector3());

  const { history, record } = useStarTrailHistory(trailLength);

  const warmColor = React.useMemo(() => new THREE.Color(color).multiplyScalar(warmth), [color, warmth]);
  const coreColor = React.useMemo(() => new THREE.Color("#ffffff").lerp(warmColor, 0.35), [warmColor]);
  const spriteTexture = React.useMemo(() => createGlowTexture(), []);

  const particleOffsets = React.useMemo(() => {
    const arr = new Float32Array(18);
    for (let i = 0; i < 6; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 0.25;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 0.25;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 0.25;
    }
    return arr;
  }, []);

  React.useEffect(() => {
    if (!position) return;
    if (Array.isArray(position)) {
      targetPos.current.set(position[0], position[1], position[2]);
    } else {
      targetPos.current.copy(position);
    }
  }, [position]);

  useFrame((_, delta) => {
    if (positionRef?.current) {
      targetPos.current.copy(positionRef.current);
    }
    t.current += delta;
    const flicker = 0.92 + Math.sin(t.current * 8.3) * 0.04 + Math.sin(t.current * 13.7) * 0.03;
    const pulse = 1 + Math.sin(t.current * 2.1) * 0.08;
    const breathe = 1 + Math.sin(t.current * 1.4) * 0.05;

    drift.current.x = Math.sin(t.current * 1.7) * 0.04;
    drift.current.y = Math.cos(t.current * 2.3) * 0.03;

    worldPos.current.copy(targetPos.current);
    worldPos.current.x += drift.current.x;
    worldPos.current.y += drift.current.y;

    if (groupRef.current) {
      groupRef.current.position.copy(worldPos.current);
    }

    const scale =
      variant === "secondary" ? 0.75 : variant === "transform" ? 1.15 : 1;

    if (coreRef.current) {
      coreRef.current.scale.setScalar(0.045 * pulse * scale * flicker);
    }
    if (innerRef.current) {
      innerRef.current.scale.setScalar(0.12 * breathe * scale);
      const mat = innerRef.current.material as THREE.MeshBasicMaterial;
      mat.opacity = 0.35 + Math.sin(t.current * 3.1) * 0.08;
    }
    if (coronaRef.current) {
      coronaRef.current.scale.setScalar(0.28 * breathe * scale);
      const mat = coronaRef.current.material as THREE.MeshBasicMaterial;
      mat.opacity = 0.1 + Math.sin(t.current * 1.9) * 0.03;
    }
    if (spriteRef.current) {
      spriteRef.current.scale.setScalar(0.55 * breathe * scale);
      const mat = spriteRef.current.material as THREE.SpriteMaterial;
      mat.opacity = 0.18 + Math.sin(t.current * 2.5) * 0.05;
    }
    if (lightRef.current) {
      lightRef.current.intensity = intensity * flicker * (variant === "secondary" ? 0.7 : 1);
    }
    if (particlesRef.current) {
      particlesRef.current.rotation.y += delta * 0.6;
      particlesRef.current.rotation.x += delta * 0.3;
    }

    record(worldPos.current, delta, traveling);
    onPositionUpdate?.(worldPos.current);
  });

  if (!visible) return null;

  return (
    <group ref={groupRef}>
      <mesh ref={coreRef}>
        <sphereGeometry args={[1, 16, 16]} />
        <meshBasicMaterial color={coreColor} transparent opacity={0.98} />
      </mesh>
      <mesh ref={innerRef}>
        <sphereGeometry args={[1, 16, 16]} />
        <meshBasicMaterial color={warmColor} transparent opacity={0.4} blending={THREE.AdditiveBlending} />
      </mesh>
      <mesh ref={coronaRef}>
        <sphereGeometry args={[1, 12, 12]} />
        <meshBasicMaterial color={warmColor} transparent opacity={0.12} blending={THREE.AdditiveBlending} />
      </mesh>
      <sprite ref={spriteRef} scale={[0.55, 0.55, 1]}>
        <spriteMaterial
          map={spriteTexture}
          transparent
          opacity={0.2}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </sprite>
      <pointLight
        ref={lightRef}
        color={warmColor}
        intensity={intensity}
        distance={14}
        decay={2}
      />
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[particleOffsets, 3]} />
        </bufferGeometry>
        <pointsMaterial
          color={warmColor}
          size={0.025}
          transparent
          opacity={0.5}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>
      {variant === "primary" ? (
        <StarTrail
          history={history}
          color={color}
          traveling={traveling}
          presetLength={trailLength}
        />
      ) : null}
    </group>
  );
}
