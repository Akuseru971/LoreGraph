"use client";

import { useFrame } from "@react-three/fiber";
import * as React from "react";
import * as THREE from "three";

export function useStarTrailHistory(maxPoints: number) {
  const history = React.useRef<THREE.Vector3[]>([]);
  const lastSample = React.useRef(0);

  const record = React.useCallback(
    (position: THREE.Vector3, delta: number, traveling: boolean) => {
      lastSample.current += delta;
      if (!traveling && lastSample.current < 0.05) return;
      if (lastSample.current < 0.016) return;
      lastSample.current = 0;

      const copy = position.clone();
      const hist = history.current;
      if (hist.length === 0 || hist[hist.length - 1].distanceTo(copy) > 0.02) {
        hist.push(copy);
        if (hist.length > maxPoints) hist.shift();
      }
    },
    [maxPoints],
  );

  const clear = React.useCallback(() => {
    history.current = [];
  }, []);

  return { history, record, clear };
}

export function StarTrail({
  history,
  color = "#ffd89a",
  traveling,
  presetLength = 28,
}: {
  history: React.MutableRefObject<THREE.Vector3[]>;
  color?: string;
  traveling: boolean;
  presetLength?: number;
}) {
  const lineRef = React.useRef<THREE.LineSegments>(null);
  const pointsRef = React.useRef<THREE.Points>(null);
  const warmColor = React.useMemo(() => new THREE.Color(color), [color]);

  useFrame(() => {
    const pts = history.current;
    if (pts.length < 2) return;

    const positions = new Float32Array(pts.length * 3);
    const sizes = new Float32Array(pts.length);
    const opacities = new Float32Array(pts.length);

    for (let i = 0; i < pts.length; i++) {
      positions[i * 3] = pts[i].x;
      positions[i * 3 + 1] = pts[i].y;
      positions[i * 3 + 2] = pts[i].z;
      const age = i / Math.max(1, pts.length - 1);
      sizes[i] = (0.02 + age * 0.06) * (traveling ? 1.15 : 0.85);
      opacities[i] = age * (traveling ? 0.55 : 0.25);
    }

    if (lineRef.current) {
      const geo = lineRef.current.geometry as THREE.BufferGeometry;
      geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      geo.setDrawRange(0, pts.length);
    }

    if (pointsRef.current) {
      const geo = pointsRef.current.geometry as THREE.BufferGeometry;
      geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      geo.setAttribute("size", new THREE.BufferAttribute(sizes, 1));
      geo.setAttribute("opacity", new THREE.BufferAttribute(opacities, 1));
    }
  });

  const maxLen = traveling ? presetLength : Math.floor(presetLength * 0.6);

  return (
    <group>
      <lineSegments ref={lineRef}>
        <bufferGeometry />
        <lineBasicMaterial
          color={warmColor}
          transparent
          opacity={traveling ? 0.45 : 0.2}
          depthWrite={false}
        />
      </lineSegments>
      <points ref={pointsRef}>
        <bufferGeometry />
        <shaderMaterial
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          uniforms={{
            uColor: { value: warmColor },
          }}
          vertexShader={`
            attribute float size;
            attribute float opacity;
            varying float vOpacity;
            void main() {
              vOpacity = opacity;
              vec4 mv = modelViewMatrix * vec4(position, 1.0);
              gl_PointSize = size * (180.0 / -mv.z);
              gl_Position = projectionMatrix * mv;
            }
          `}
          fragmentShader={`
            uniform vec3 uColor;
            varying float vOpacity;
            void main() {
              float d = length(gl_PointCoord - 0.5);
              if (d > 0.5) discard;
              float glow = smoothstep(0.5, 0.0, d);
              gl_FragColor = vec4(uColor, glow * vOpacity);
            }
          `}
        />
      </points>
    </group>
  );
}
