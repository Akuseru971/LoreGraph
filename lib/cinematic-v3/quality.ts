import type { CinematicQualityLevel } from "@/types";

export function detectCinematicQuality(
  reducedMotion: boolean,
): CinematicQualityLevel {
  if (reducedMotion) return "low";
  if (typeof window === "undefined") return "medium";

  const dpr = window.devicePixelRatio ?? 1;
  const cores = navigator.hardwareConcurrency ?? 4;
  const memory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory ?? 4;

  if (dpr > 2 && cores >= 8 && memory >= 8) return "high";
  if (dpr > 1.5 || cores < 4 || memory < 4) return "low";
  return "medium";
}

export function particleCountForQuality(quality: CinematicQualityLevel): number {
  switch (quality) {
    case "high":
      return 400;
    case "medium":
      return 180;
    case "low":
      return 0;
  }
}
