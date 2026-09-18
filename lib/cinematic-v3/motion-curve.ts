/**
 * Single continuous cinematic trajectory for inter-chapter travel.
 * All visual channels are overlapping envelopes on one master progress t ∈ [0, 1].
 */

export interface HubMotionChannels {
  t: number;
  debugRegion: "dissolve" | "pullback" | "name" | "star" | "plunge" | "arrival";

  sceneDissolve: number;
  cameraPullback: number;
  nameOpacity: number;
  /** 0–1 readable hub window — full word must be visible when > 0.5. */
  nameReadable: number;
  /** Subtle breathing around fitted scale (0.95–1.05). */
  nameBreathing: number;
  nameScale: number;
  nameDepth: number;
  starIntensity: number;
  softenNonHero: number;
  plunge: number;
  /** Plunge-only zoom toward destination star — zero during readable window. */
  plungeZoom: number;
  nextBackground: number;
  arrivalSettle: number;
  /** @deprecated Use plungeZoom — kept for compatibility. */
  zoomProgress: number;
  fovBias: number;
  showName: boolean;
}

function clamp01(v: number): number {
  return Math.max(0, Math.min(1, v));
}

export function smoothstep(edge0: number, edge1: number, x: number): number {
  const t = clamp01((x - edge0) / Math.max(1e-6, edge1 - edge0));
  return t * t * (3 - 2 * t);
}

function envelope(
  start: number,
  peak: number,
  end: number,
  x: number,
  fall = true,
): number {
  const rise = smoothstep(start, peak, x);
  if (!fall) return rise;
  const fallOff = 1 - smoothstep(peak, end, x);
  return rise * (x < peak ? 1 : Math.max(0.15, fallOff));
}

export function evaluateHubMotion(t: number): HubMotionChannels {
  const x = clamp01(t);

  const sceneDissolve = smoothstep(0, 0.22, x);

  const pullbackRise = smoothstep(0, 0.38, x);
  const plungeDrive = smoothstep(0.5, 0.88, x);
  const cameraPullback = pullbackRise * (1 - plungeDrive * 0.65) + plungeDrive * 0.1;

  const nameFadeIn = smoothstep(0.1, 0.28, x);
  const nameFadeOut = 1 - smoothstep(0.54, 0.72, x) * 0.9;
  const nameOpacity = clamp01(nameFadeIn * nameFadeOut);

  const nameReadable = smoothstep(0.28, 0.38, x) * (1 - smoothstep(0.5, 0.58, x) * 0.25);
  const nameBreathing = 0.97 + nameReadable * 0.06;

  const nameScale = 1;
  const nameDepth = pullbackRise * 18 - plungeDrive * 14;

  const starIntensity = 1 + envelope(0.36, 0.46, 0.58, x, false) * 1.75;
  const softenNonHero = envelope(0.38, 0.5, 0.68, x) * 0.65;

  const plunge = smoothstep(0.5, 0.85, x);
  const plungeZoom = smoothstep(0.5, 0.88, x);

  const nextBackground = smoothstep(0.52, 0.92, x);
  const arrivalSettle = smoothstep(0.86, 1, x);

  const fovBias = pullbackRise * 8 - plungeDrive * 4.5;

  const showName = nameOpacity > 0.04 && x < 0.96;

  let debugRegion: HubMotionChannels["debugRegion"] = "dissolve";
  if (x >= 0.86) debugRegion = "arrival";
  else if (x >= 0.5) debugRegion = "plunge";
  else if (x >= 0.36) debugRegion = "star";
  else if (x >= 0.1) debugRegion = "name";
  else if (x >= 0.02) debugRegion = "pullback";

  return {
    t: x,
    debugRegion,
    sceneDissolve,
    cameraPullback,
    nameOpacity,
    nameReadable,
    nameBreathing,
    nameScale,
    nameDepth,
    starIntensity,
    softenNonHero,
    plunge,
    plungeZoom,
    nextBackground,
    arrivalSettle,
    zoomProgress: plungeZoom,
    fovBias,
    showName,
  };
}

/** Master progress where full name readability is validated (0.38–0.48). */
export const HUB_READABILITY_SAMPLE_T = 0.42;
