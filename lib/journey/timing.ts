/** Central cinematic timing tokens — deterministic for future video export. */
export const TRAVEL_DURATION_MS = 1400;
export const ARRIVAL_DURATION_MS = 700;
export const TEXT_DELAY_MS = 350;
export const DEPARTURE_DURATION_MS = 900;
export const ERA_TRANSITION_MS = 1800;
export const OPENING_DURATION_MS = 3200;
export const ENDING_DURATION_MS = 4000;

export const DEFAULT_SCENE_DURATION_MS = 5200;
export const SHORT_SCENE_DURATION_MS = 3800;
export const LONG_SCENE_DURATION_MS = 6800;

export function journeyEstimatedDuration(steps: { duration: number }[]): number {
  return steps.reduce((sum, s) => sum + s.duration, 0);
}
