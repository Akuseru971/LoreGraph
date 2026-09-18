"use client";

import * as React from "react";
import * as THREE from "three";
import type { CinematicCoordinates } from "@/types";

export function ConstellationLines({
  points,
  progress,
  color = "#c8a86a",
}: {
  points: CinematicCoordinates[];
  progress: number;
  color?: string;
}) {
  const geometry = React.useMemo(() => {
    const verts: number[] = [];
    const visibleCount = Math.max(1, Math.floor(points.length * progress));
    for (let i = 0; i < visibleCount - 1; i++) {
      verts.push(points[i].x, points[i].y, points[i].z);
      verts.push(points[i + 1].x, points[i + 1].y, points[i + 1].z);
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.Float32BufferAttribute(verts, 3));
    return geo;
  }, [points, progress]);

  return (
    <lineSegments geometry={geometry}>
      <lineBasicMaterial color={color} transparent opacity={0.35 + progress * 0.35} />
    </lineSegments>
  );
}
