"use client";

import { useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as React from "react";
import * as THREE from "three";
import type { CinematicComposition } from "@/types";

const memoryVertex = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const memoryFragment = `
  uniform sampler2D uMap;
  uniform float uOpacity;
  uniform float uTime;
  varying vec2 vUv;
  void main() {
    vec2 uv = vUv;
    float edgeX = smoothstep(0.0, 0.12, uv.x) * smoothstep(1.0, 0.88, uv.x);
    float edgeY = smoothstep(0.0, 0.1, uv.y) * smoothstep(1.0, 0.9, uv.y);
    float mask = edgeX * edgeY;
    vec4 col = texture2D(uMap, uv);
    float drift = sin(uTime * 0.3 + uv.x * 3.0) * 0.002;
    col = texture2D(uMap, uv + vec2(drift, drift * 0.5));
    gl_FragColor = vec4(col.rgb, col.a * uOpacity * mask);
  }
`;

function SceneImageMesh({
  texture,
  position,
  scale,
  opacity,
  focalPoint,
  aspectRatio,
  composition,
  arrivalProgress,
  traveling,
  fadeOut = 0,
  crossfade = false,
}: {
  texture: THREE.Texture;
  position: [number, number, number];
  scale: number;
  opacity: number;
  focalPoint?: { x: number; y: number };
  aspectRatio?: number;
  composition: CinematicComposition;
  arrivalProgress: number;
  traveling: boolean;
  fadeOut?: number;
  crossfade?: boolean;
}) {
  const meshRef = React.useRef<THREE.Mesh>(null);
  const matRef = React.useRef<THREE.ShaderMaterial>(null);
  texture.colorSpace = THREE.SRGBColorSpace;

  const texAspect =
    aspectRatio ??
    (texture.image
      ? (texture.image as HTMLImageElement).width /
        Math.max(1, (texture.image as HTMLImageElement).height)
      : 16 / 9);

  const height = scale;
  const width = height * texAspect;
  const fp = focalPoint ?? { x: 0.5, y: 0.5 };
  const offsetX = (0.5 - fp.x) * width * 0.35;
  const offsetY = (0.5 - fp.y) * height * 0.25;
  const travelReveal = crossfade
    ? Math.max(0, (arrivalProgress - 0.15) / 0.85)
    : Math.max(0, arrivalProgress * 0.55);
  const reveal = traveling ? travelReveal : Math.min(1, arrivalProgress);
  const memoryOpacity =
    composition === "BACKGROUND_MEMORY" ? opacity * 0.82 : opacity;
  const exitFade = fadeOut > 0 ? Math.max(0, 1 - fadeOut * 1.15) : 1;

  useFrame(({ clock }) => {
    if (!meshRef.current || !matRef.current) return;
    const holdDrift = Math.sin(clock.elapsedTime * 0.12) * 0.004;
    matRef.current.uniforms.uOpacity.value = memoryOpacity * reveal * exitFade;
    matRef.current.uniforms.uTime.value = clock.elapsedTime;
    const depth = traveling
      ? crossfade
        ? -0.3 + arrivalProgress * 0.2
        : -0.5 * (1 - arrivalProgress)
      : -0.1;
    const panX = holdDrift + (traveling ? (1 - arrivalProgress) * 0.08 : holdDrift);
    meshRef.current.position.set(
      position[0] + offsetX + panX,
      position[1] + offsetY + holdDrift * 0.5,
      position[2] + depth,
    );
    const s = composition === "FULL_BLEED" ? 0.94 + reveal * 0.08 : 0.9 + reveal * 0.1;
    meshRef.current.scale.set(s, s, 1);
    meshRef.current.rotation.y = Math.sin(clock.elapsedTime * 0.15) * 0.015;
  });

  return (
    <mesh ref={meshRef} position={position}>
      <planeGeometry args={[width, height]} />
      <shaderMaterial
        ref={matRef}
        transparent
        depthWrite={false}
        uniforms={{
          uMap: { value: texture },
          uOpacity: { value: memoryOpacity * reveal },
          uTime: { value: 0 },
        }}
        vertexShader={memoryVertex}
        fragmentShader={memoryFragment}
      />
    </mesh>
  );
}

export function SceneImagePlane({
  url,
  position,
  scale = 4,
  opacity = 0.55,
  focalPoint,
  aspectRatio,
  composition = "BACKGROUND_MEMORY",
  arrivalProgress = 1,
  traveling = false,
  fadeOut = 0,
  crossfade = false,
}: {
  url: string;
  position: [number, number, number];
  scale?: number;
  opacity?: number;
  focalPoint?: { x: number; y: number };
  aspectRatio?: number;
  composition?: CinematicComposition;
  arrivalProgress?: number;
  traveling?: boolean;
  fadeOut?: number;
  crossfade?: boolean;
}) {
  const texture = useTexture(url);
  return (
    <SceneImageMesh
      texture={texture}
      position={position}
      scale={scale}
      opacity={opacity}
      focalPoint={focalPoint}
      aspectRatio={aspectRatio}
      composition={composition}
      arrivalProgress={arrivalProgress}
      traveling={traveling}
      fadeOut={fadeOut}
      crossfade={crossfade}
    />
  );
}
