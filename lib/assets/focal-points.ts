import { FOCAL_OVERRIDES } from "./asset-overrides";
import type { FocalMode, FocalPoint } from "./types";

const DEFAULT_FOCAL: FocalPoint = { x: 0.5, y: 0.3 };

export function parseFocal(value: string | number | undefined, fallback = 0.5): number {
  if (value === undefined || value === "") return fallback;
  const n = typeof value === "number" ? value : parseFloat(value);
  return Number.isFinite(n) ? Math.min(1, Math.max(0, n)) : fallback;
}

export function focalToObjectPosition(point: FocalPoint): string {
  return `${(point.x * 100).toFixed(1)}% ${(point.y * 100).toFixed(1)}%`;
}

export function getAssetObjectPosition(
  slug: string,
  mode: FocalMode,
  manifestFocal?: { desktop: FocalPoint; mobile: FocalPoint },
): string {
  const override = FOCAL_OVERRIDES[slug]?.[mode];
  if (override) return focalToObjectPosition(override);

  const useMobile = mode === "MOBILE" || mode === "CINEMATIC";
  const point = useMobile
    ? manifestFocal?.mobile ?? DEFAULT_FOCAL
    : manifestFocal?.desktop ?? DEFAULT_FOCAL;

  return focalToObjectPosition(point);
}

export function resolveFocalForCrop(
  slug: string,
  mode: FocalMode,
  manifestFocal?: { desktop: FocalPoint; mobile: FocalPoint },
): FocalPoint {
  const override = FOCAL_OVERRIDES[slug]?.[mode];
  if (override) return override;

  const useMobile = mode === "MOBILE" || mode === "CINEMATIC";
  return useMobile
    ? manifestFocal?.mobile ?? { x: 0.5, y: 0.4 }
    : manifestFocal?.desktop ?? { x: 0.5, y: 0.5 };
}
