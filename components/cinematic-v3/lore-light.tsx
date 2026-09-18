"use client";

import { useFrame } from "@react-three/fiber";
import * as React from "react";
import * as THREE from "three";
import { StarTrail, useStarTrailHistory } from "./star-trail";

function createGlowTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 128;
  canvas.height = 128;
  const ctx = canvas.getContext("2d")!;
  const grad = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
  grad.addColorStop(0, "rgba(255,255,255,1)");
  grad.addColorStop(0.08, "rgba(255,245,220,0.7)");
  grad.addColorStop(0.25, "rgba(255,200,120,0.2)");
  grad.addColorStop(1, "rgba(255,180,100,0)");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 128, 128);
  return new THREE.CanvasTexture(canvas);
}

function createFlareTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 256;
  canvas.height = 64;
  const ctx = canvas.getContext("2d")!;
  const grad = ctx.createLinearGradient(0, 32, 256, 32);
  grad.addColorStop(0, "rgba(255,255,255,0)");
  grad.addColorStop(0.45, "rgba(255,240,200,0.15)");
  grad.addColorStop(0.5, "rgba(255,255,255,0.55)");
  grad.addColorStop(0.55, "rgba(255,240,200,0.15)");
  grad.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 256, 64);
  return new THREE.CanvasTexture(canvas);
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
  arrivalPulse = 0,
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
  arrivalPulse?: number;
  onPositionUpdate?: (pos: THREE.Vector3) => void;
}) {
  const coreRef = React.useRef<THREE.Mesh>(null);
  const innerRef = React.useRef<THREE.Mesh>(null);
  const contrastHaloRef = React.useRef<THREE.Mesh>(null);
  const coronaRef = React.useRef<THREE.Mesh>(null);
  const hFlareRef = React.useRef<THREE.Sprite>(null);
  const vFlareRef = React.useRef<THREE.Sprite>(null);
  const spikeRef = React.useRef<THREE.Group>(null);
  const spriteRef = React.useRef<THREE.Sprite>(null);
  const lightRef = React.useRef<THREE.PointLight>(null);
  const particlesRef = React.useRef<THREE.Points>(null);
  const groupRef = React.useRef<THREE.Group>(null);
  const t = React.useRef(0);
  const worldPos = React.useRef(new THREE.Vector3());
  const targetPos = React.useRef(new THREE.Vector3());

  const { history, record } = useStarTrailHistory(trailLength);
  const warmColor = React.useMemo(() => new THREE.Color(color).multiplyScalar(warmth), [color, warmth]);
  const coreColor = React.useMemo(() => new THREE.Color("#ffffff"), []);
  const glowTex = React.useMemo(() => createGlowTexture(), []);
  const flareTex = React.useMemo(() => createFlareTexture(), []);

  const particleOffsets = React.useMemo(() => {
    const arr = new Float32Array(18);
    for (let i = 0; i < 6; i++) {
      arr[i * 3] = (Math.sin(i * 2.1) * 0.5) * 0.25;
      arr[i * 3 + 1] = (Math.cos(i * 1.7) * 0.5) * 0.25;
      arr[i * 3 + 2] = (Math.sin(i * 3.3) * 0.5) * 0.25;
    }
    return arr;
  }, []);

  React.useEffect(() => {
    if (!position) return;
    if (Array.isArray(position)) targetPos.current.set(...position);
    else targetPos.current.copy(position);
  }, [position]);

  useFrame((_, delta) => {
    if (positionRef?.current) targetPos.current.copy(positionRef.current);
    t.current += delta;
    const flicker =
      0.9 + Math.sin(t.current * 8.3) * 0.05 + Math.sin(t.current * 13.7) * 0.04;
    const pulse = 1 + Math.sin(t.current * 2.1) * 0.06 + arrivalPulse * 0.15;
    const breathe = 1 + Math.sin(t.current * 1.4) * 0.04;
    const flareLen = 1 + Math.sin(t.current * 1.9) * 0.12;

    worldPos.current.copy(targetPos.current);
    worldPos.current.x += Math.sin(t.current * 1.7) * 0.03;
    worldPos.current.y += Math.cos(t.current * 2.3) * 0.025;
    groupRef.current?.position.copy(worldPos.current);

    const scale = variant === "secondary" ? 0.75 : variant === "transform" ? 1.15 : 1;

    const minCore = 0.038;
    coreRef.current?.scale.setScalar(minCore * pulse * scale * flicker);
    innerRef.current?.scale.setScalar(0.12 * breathe * scale);
    contrastHaloRef.current?.scale.setScalar(0.2 * breathe * scale);
    coronaRef.current?.scale.setScalar((0.26 + Math.sin(t.current * 2.7) * 0.03) * breathe * scale);

    if (hFlareRef.current) {
      hFlareRef.current.scale.set(2.2 * flareLen * scale, 0.1 * scale, 1);
      (hFlareRef.current.material as THREE.SpriteMaterial).opacity = 0.42 * flicker;
    }
    if (vFlareRef.current) {
      vFlareRef.current.scale.set(0.07 * scale, 0.42 * breathe * scale, 1);
      (vFlareRef.current.material as THREE.SpriteMaterial).opacity = 0.28 * flicker;
    }
    if (spikeRef.current) spikeRef.current.rotation.z = t.current * 0.15;
    if (spriteRef.current) {
      spriteRef.current.scale.setScalar(0.5 * breathe * scale);
      (spriteRef.current.material as THREE.SpriteMaterial).opacity = 0.16 + Math.sin(t.current * 2.5) * 0.04;
    }
    if (lightRef.current) {
      lightRef.current.intensity = intensity * flicker * (variant === "secondary" ? 0.65 : 1);
    }
    if (particlesRef.current) particlesRef.current.rotation.y += delta * 0.5;

    record(worldPos.current, delta, traveling);
    onPositionUpdate?.(worldPos.current);
  });

  if (!visible) return null;

  return (
    <group ref={groupRef}>
      <mesh ref={coreRef}>
        <sphereGeometry args={[1, 8, 8]} />
        <meshBasicMaterial color={coreColor} transparent opacity={0.98} />
      </mesh>
      <mesh ref={innerRef}>
        <sphereGeometry args={[1, 12, 12]} />
        <meshBasicMaterial color={warmColor} transparent opacity={0.45} blending={THREE.AdditiveBlending} />
      </mesh>
      <mesh ref={contrastHaloRef}>
        <sphereGeometry args={[1, 10, 10]} />
        <meshBasicMaterial color="#0a0a12" transparent opacity={0.35} depthWrite={false} />
      </mesh>
      <mesh ref={coronaRef}>
        <sphereGeometry args={[1, 10, 10]} />
        <meshBasicMaterial color={warmColor} transparent opacity={0.1} blending={THREE.AdditiveBlending} />
      </mesh>
      <sprite ref={hFlareRef} scale={[1.8, 0.12, 1]}>
        <spriteMaterial map={flareTex} transparent blending={THREE.AdditiveBlending} depthWrite={false} opacity={0.35} />
      </sprite>
      <sprite ref={vFlareRef} scale={[0.08, 0.55, 1]}>
        <spriteMaterial map={flareTex} transparent blending={THREE.AdditiveBlending} depthWrite={false} opacity={0.22} />
      </sprite>
      <group ref={spikeRef}>
        {[0, 1, 2, 3].map((i) => (
          <sprite key={i} rotation={[0, 0, (Math.PI / 2) * i]} scale={[0.35, 0.02, 1]}>
            <spriteMaterial map={flareTex} transparent blending={THREE.AdditiveBlending} depthWrite={false} opacity={0.08} />
          </sprite>
        ))}
      </group>
      <sprite ref={spriteRef}>
        <spriteMaterial map={glowTex} transparent blending={THREE.AdditiveBlending} depthWrite={false} opacity={0.18} />
      </sprite>
      <pointLight ref={lightRef} color={warmColor} intensity={intensity} distance={16} decay={2} />
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[particleOffsets, 3]} />
        </bufferGeometry>
        <pointsMaterial color={warmColor} size={0.02} transparent opacity={0.45} sizeAttenuation blending={THREE.AdditiveBlending} depthWrite={false} />
      </points>
      {variant === "primary" ? (
        <StarTrail history={history} color={color} traveling={traveling} presetLength={trailLength} />
      ) : null}
    </group>
  );
}
