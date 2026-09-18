/**
 * Single continuous cinematic trajectory for inter-chapter travel.
 * All visual channels are overlapping envelopes on one master progress t ∈ [0, 1].
 * Internal phase labels exist only for debugging — never drive hard boundaries.
 */

export interface HubMotionChannels {
  /** Master progress (clamped input). */
  t: number;
  /** Debug label — dominant motion region, not a hard gate. */
  debugRegion: "dissolve" | "pullback" | "name" | "star" | "plunge" | "arrival";

  /** 0–1 how much the departing scene has dissolved. */
  sceneDissolve: number;
  /** 0–1+ camera pullback depth (world separation). */
  cameraPullback: number;
  /** 0–1 global name opacity (full word). */
  nameOpacity: number;
  /** Spatial scale of name in frame (grows with pullback). */
  nameScale: number;
  /** Depth parallax factor for name layer. */
  nameDepth: number;
  /** 0–1 destination star intensity boost. */
  starIntensity: number;
  /** 0–1 dimming of non-destination stars. */
  softenNonHero: number;
  /** 0–1 plunge acceleration along destination vector. */
  plunge: number;
  /** 0–1 next scene background emergence. */
  nextBackground: number;
  /** 0–1 arrival settle (deceleration). */
  arrivalSettle: number;
  /** Continuous zoom toward destination star (no pause). */
  zoomProgress: number;
  /** FOV bias: positive = wider pullback, negative = plunge compression. */
  fovBias: number;
  /** Whether name should render. */
  showName: boolean;
}

function clamp01(v: number): number {
  return Math.max(0, Math.min(1, v));
}

/** Hermite smoothstep — C1 continuous. */
export function smoothstep(edge0: number, edge1: number, x: number): number {
  const t = clamp01((x - edge0) / Math.max(1e-6, edge1 - edge0));
  return t * t * (3 - 2 * t);
}

/** Rise from 0 at `start` to 1 at `peak`, optional fall to 0 by `end`. */
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

/**
 * Cohesive velocity-shaped curve: ease-in pullback, breathe at name, accelerate plunge, soft land.
 * Based on a single smooth acceleration profile with overlapping channel envelopes.
 */
export function evaluateHubMotion(t: number): HubMotionChannels {
  const x = clamp01(t);

  // Pullback peaks ~0.40 then eases into plunge without stopping
  const pullbackRise = smoothstep(0, 0.4, x);
  const plungeDrive = smoothstep(0.46, 0.88, x);
  const cameraPullback = pullbackRise * (1 - plungeDrive * 0.72) + plungeDrive * 0.08;

  // Name: fade in during pullback, hold readable, fade only late in plunge
  const nameFadeIn = smoothstep(0.1, 0.32, x);
  const nameHold = 1 - smoothstep(0.78, 0.94, x) * 0.35;
  const nameOpacity = clamp01(nameFadeIn * nameHold);

  const nameScale = 0.88 + pullbackRise * 0.22 - plungeDrive * 0.06;
  const nameDepth = pullbackRise * 28 - plungeDrive * 18;

  const sceneDissolve = smoothstep(0, 0.22, x);

  const starIntensity = 1 + envelope(0.36, 0.5, 0.68, x, false) * 1.85;
  const softenNonHero = envelope(0.38, 0.52, 0.72, x) * 0.68;

  const plunge = smoothstep(0.48, 0.85, x);
  const nextBackground = smoothstep(0.7, 0.98, x);
  const arrivalSettle = smoothstep(0.86, 1, x);

  const zoomProgress = smoothstep(0.44, 0.9, x) * 0.92;

  const fovBias = pullbackRise * 9 - plungeDrive * 5;

  const showName = nameOpacity > 0.04 && x < 0.96;

  let debugRegion: HubMotionChannels["debugRegion"] = "dissolve";
  if (x >= 0.86) debugRegion = "arrival";
  else if (x >= 0.48) debugRegion = "plunge";
  else if (x >= 0.36) debugRegion = "star";
  else if (x >= 0.1) debugRegion = "name";
  else if (x >= 0.02) debugRegion = "pullback";

  return {
    t: x,
    debugRegion,
    sceneDissolve,
    cameraPullback,
    nameOpacity,
    nameScale,
    nameDepth,
    starIntensity,
    softenNonHero,
    plunge,
    nextBackground,
    arrivalSettle,
    zoomProgress,
    fovBias,
    showName,
  };
}
