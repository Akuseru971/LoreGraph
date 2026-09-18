import type { CinematicIntroOverride, CinematicOutroOverride } from "@/types";

/** Per-champion intro/outro tuning for flagship journeys. */
export const cinematicIntroOverrides: Record<string, CinematicIntroOverride> = {
  "char:aatrox": {
    constellationId: "constellation:aatrox",
    heroStarId: "blade-core",
    atmosphere: "DARKIN",
    splashFocal: { x: 0.52, y: 0.3 },
    showText: true,
    recordShowIntroTitle: true,
  },
  "char:yasuo": {
    constellationId: "constellation:yasuo",
    heroStarId: "wind-blade",
    atmosphere: "IONIA",
    splashFocal: { x: 0.52, y: 0.3 },
    showText: true,
  },
  "char:yone": {
    constellationId: "constellation:yone",
    heroStarId: "spirit-blade",
    atmosphere: "IONIA",
    splashFocal: { x: 0.5, y: 0.32 },
    showText: true,
  },
  "char:viego": {
    constellationId: "constellation:viego",
    heroStarId: "soul-blade",
    atmosphere: "SHADOW_ISLES",
    splashFocal: { x: 0.5, y: 0.28 },
    showText: true,
    timing: {
      darkenMs: 2800,
      starsEmergeMs: 2200,
    },
  },
  "char:skarner": {
    constellationId: "constellation:skarner",
    heroStarId: "stinger",
    atmosphere: "SHURIMA",
    splashFocal: { x: 0.5, y: 0.38 },
    showText: true,
    timing: {
      splashHoldMs: 2000,
      linesFormMs: 1800,
    },
  },
};

export const cinematicOutroOverrides: Record<string, CinematicOutroOverride> = {
  "char:aatrox": {
    constellationId: "constellation:aatrox",
    showSplashEcho: true,
    showText: true,
    recordShowOutroTitle: true,
  },
  "char:yasuo": {
    constellationId: "constellation:yasuo",
    showSplashEcho: true,
    showText: true,
  },
  "char:yone": {
    constellationId: "constellation:yone",
    showSplashEcho: true,
    showText: true,
  },
  "char:viego": {
    constellationId: "constellation:viego",
    showSplashEcho: true,
    showText: true,
    timing: { constellationReformMs: 3200, splashEchoMs: 1800 },
  },
  "char:skarner": {
    constellationId: "constellation:skarner",
    showSplashEcho: false,
    showText: true,
    timing: { holdMs: 2800 },
  },
};
