"use client";

import { useFrame } from "@react-three/fiber";
import * as React from "react";
import * as THREE from "three";
import type { CinematicCoordinates, RelationshipChoreography } from "@/types";
import { LoreLight } from "./lore-light";

function offsetForChoreography(
  choreography: RelationshipChoreography,
  index: number,
  t: number,
  star: CinematicCoordinates,
): [number, number, number] {
  const side = index % 2 === 0 ? -1 : 1;
  switch (choreography) {
    case "PARALLEL":
      return [star.x + side * 1.2, star.y + 0.15, star.z + 0.3];
    case "DIVERGE": {
      const spread = t * 2.8;
      return [star.x + side * (1 + spread), star.y + 0.2, star.z + side * spread * 0.4];
    }
    case "CONVERGE": {
      const start = 3.5 * (1 - t);
      return [
        star.x + side * start,
        star.y + 0.3 * (1 - t),
        star.z + side * start * 0.5,
      ];
    }
    case "FADE":
      return [star.x + side * 0.8, star.y + 0.1, star.z + 0.2];
    case "TRANSFORM":
      return [star.x + side * 2.5 * (1 - t * 0.3), star.y + 0.5, star.z - 1.5 - t];
    case "ORBIT": {
      const angle = t * Math.PI * 2 + index;
      return [star.x + Math.cos(angle) * 1.8, star.y + 0.3, star.z + Math.sin(angle) * 1.2];
    }
    default:
      return [star.x + side * 1.5, star.y + 0.2, star.z + 0.4];
  }
}

function SecondaryLight({
  id,
  index,
  choreography,
  t,
  starRef,
  color,
  warmth,
  intensity,
  variant,
}: {
  id: string;
  index: number;
  choreography: RelationshipChoreography;
  t: number;
  starRef: React.RefObject<THREE.Vector3>;
  color: string;
  warmth: number;
  intensity: number;
  variant: "secondary" | "transform";
}) {
  const posRef = React.useRef(new THREE.Vector3());

  useFrame(() => {
    const star = starRef.current;
    if (!star) return;
    const [x, y, z] = offsetForChoreography(choreography, index, t, star);
    posRef.current.set(x, y, z);
  });

  return (
    <LoreLight
      positionRef={posRef}
      color={color}
      warmth={warmth}
      intensity={intensity}
      visible
      traveling={t < 1}
      variant={variant}
    />
  );
}

export function RelationshipLights({
  starPositionRef,
  choreography = "PARALLEL",
  transitionProgress,
  arrived,
  secondaryIds,
  colors = ["#a8c8ff", "#ff9a8a"],
}: {
  starPositionRef: React.RefObject<THREE.Vector3>;
  choreography?: RelationshipChoreography;
  transitionProgress: number;
  arrived: boolean;
  secondaryIds: string[];
  colors?: string[];
}) {
  const t = arrived ? 1 : transitionProgress;

  return (
    <>
      {secondaryIds.map((id, i) => {
        const fade =
          choreography === "FADE" && i === 0 ? Math.max(0, 1 - t * 1.1) : 1;
        const transform =
          choreography === "TRANSFORM" && i === 0
            ? { color: "#9ad4ff", warmth: 1.2 }
            : { color: colors[i % colors.length], warmth: 0.9 };

        if (fade < 0.05) return null;

        return (
          <SecondaryLight
            key={id}
            id={id}
            index={i}
            choreography={choreography}
            t={t}
            starRef={starPositionRef}
            color={transform.color}
            warmth={transform.warmth}
            intensity={0.75 * fade}
            variant={choreography === "TRANSFORM" ? "transform" : "secondary"}
          />
        );
      })}
      {choreography === "TRANSFORM" && arrived ? (
        <TransformReturnLight starRef={starPositionRef} />
      ) : null}
    </>
  );
}

function TransformReturnLight({
  starRef,
}: {
  starRef: React.RefObject<THREE.Vector3>;
}) {
  const posRef = React.useRef(new THREE.Vector3());

  useFrame(() => {
    const star = starRef.current;
    if (!star) return;
    posRef.current.set(star.x + 2.8, star.y + 0.4, star.z - 2.2);
  });

  return (
    <LoreLight
      positionRef={posRef}
      color="#7ec8ff"
      warmth={1.3}
      intensity={1}
      visible
      traveling={false}
      variant="transform"
    />
  );
}
