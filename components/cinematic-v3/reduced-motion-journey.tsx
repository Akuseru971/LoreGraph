"use client";

import { motion } from "framer-motion";
import type { CinematicJourney } from "@/types";
import { getAtmosphereConfig } from "@/lib/cinematic-v3/atmosphere";

export function ReducedMotionJourney({
  journey,
  sceneIndex,
}: {
  journey: CinematicJourney;
  sceneIndex: number;
}) {
  const scene = journey.scenes[sceneIndex];
  if (!scene) return null;
  const atmosphere = getAtmosphereConfig(scene.atmosphere ?? "CELESTIAL");

  return (
    <motion.div
      key={scene.id}
      className="absolute inset-0"
      style={{ background: atmosphere.background }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <div
        className="absolute left-1/2 top-1/3 size-2 -translate-x-1/2 rounded-full"
        style={{
          background: atmosphere.particleColor,
          boxShadow: `0 0 24px ${atmosphere.particleColor}`,
        }}
      />
      {scene.image?.url ? (
        <div
          className="absolute inset-x-8 top-16 mx-auto max-w-md aspect-[9/16] opacity-40"
          style={{
            backgroundImage: `url(${scene.image.url})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            maskImage: "linear-gradient(to bottom, white 60%, transparent)",
          }}
        />
      ) : null}
    </motion.div>
  );
}
