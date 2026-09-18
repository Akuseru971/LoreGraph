/**
 * Image-led story panel transitions — zoom/crossfade, no star mechanics.
 */

export interface PanelTransitionState {
  t: number;
  outgoingOpacity: number;
  incomingOpacity: number;
  outgoingScale: number;
  incomingScale: number;
  incomingBlur: number;
  kenBurnsScale: number;
  kenBurnsPanX: number;
  kenBurnsPanY: number;
}

function clamp01(v: number): number {
  return Math.max(0, Math.min(1, v));
}

function smoothstep(edge0: number, edge1: number, x: number): number {
  const t = clamp01((x - edge0) / Math.max(1e-6, edge1 - edge0));
  return t * t * (3 - 2 * t);
}

/** Ease for panel-to-panel travel (0 = leaving prev, 1 = arrived on next). */
export function easePanelTravel(t: number): number {
  const x = clamp01(t);
  return 1 - Math.pow(1 - x, 2.4);
}

/** Evaluate zoom-through transition between story panels. */
export function evaluatePanelTransition(
  travelProgress: number,
  holdProgress = 0,
  sceneSeed = 0,
): PanelTransitionState {
  const t = easePanelTravel(travelProgress);
  const dissolve = smoothstep(0, 0.35, t);
  const emerge = smoothstep(0.25, 0.92, t);
  const zoomDrive = smoothstep(0.15, 0.88, t);

  const drift = ((sceneSeed % 7) - 3) * 0.004;
  const hold = clamp01(holdProgress);
  const kenBurnsScale = 1 + hold * 0.055 + zoomDrive * 0.02;
  const kenBurnsPanX = drift + hold * 0.012;
  const kenBurnsPanY = hold * 0.008;

  return {
    t,
    outgoingOpacity: (1 - dissolve) * 0.96,
    incomingOpacity: emerge * 0.96,
    outgoingScale: 1 + dissolve * 0.08,
    incomingScale: 1.06 - emerge * 0.04,
    incomingBlur: Math.max(0, (1 - emerge) * 8),
    kenBurnsScale,
    kenBurnsPanX,
    kenBurnsPanY,
  };
}

/** Departure zoom before next panel (0–1 within departure phase). */
export function evaluatePanelDeparture(departureProgress: number): {
  scale: number;
  opacity: number;
  blur: number;
} {
  const p = clamp01(departureProgress);
  return {
    scale: 1 + p * 0.1,
    opacity: 1 - p * 0.35,
    blur: p * 3,
  };
}
