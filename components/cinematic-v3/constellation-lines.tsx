"use client";

import * as React from "react";
import * as THREE from "three";
import type { CinematicCoordinates } from "@/types";

export function ConstellationLines({
  points,
  progress,
  visitedIndices = [],
  color = "#c8a86a",
  graphReveal = false,
}: {
  points: CinematicCoordinates[];
  progress: number;
  visitedIndices?: number[];
  color?: string;
  graphReveal?: boolean;
}) {
  const geometry = React.useMemo(() => {
    const verts: number[] = [];
    const colors: number[] = [];
    const base = new THREE.Color(color);
    const dim = base.clone().multiplyScalar(0.25);
    const bright = base.clone().multiplyScalar(1.4);

    const visibleCount = Math.max(1, Math.floor(points.length * progress));
    for (let i = 0; i < visibleCount - 1; i++) {
      verts.push(points[i].x, points[i].y, points[i].z);
      verts.push(points[i + 1].x, points[i + 1].y, points[i + 1].z);
      const visited = visitedIndices.includes(i) && visitedIndices.includes(i + 1);
      const c = visited || graphReveal ? bright : dim;
      colors.push(c.r, c.g, c.b, c.r, c.g, c.b);
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.Float32BufferAttribute(verts, 3));
    if (colors.length) {
      geo.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));
    }
    return geo;
  }, [points, progress, visitedIndices, color, graphReveal]);

  return (
    <lineSegments geometry={geometry}>
      <lineBasicMaterial
        vertexColors={geometry.attributes.color != null}
        color={color}
        transparent
        opacity={0.35 + progress * 0.45}
      />
    </lineSegments>
  );
}
