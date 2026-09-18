import type { ChampionConstellation } from "@/types";

export const HUB_HORIZONTAL_MARGIN = 0.08;
export const HUB_VERTICAL_MARGIN = 0.1;
export const HUB_MAX_WIDTH_PCT = 0.78;
/** Tiny inset so projected bounds stay strictly inside safe margins after float math. */
const FIT_INSET = 0.004;

export interface ConstellationBounds {
  minX: number;
  maxX: number;
  minY: number;
  maxY: number;
  centerX: number;
  centerY: number;
  width: number;
  height: number;
}

export interface SafeFrameFit {
  scale: number;
  offsetX: number;
  offsetY: number;
  bounds: ConstellationBounds;
  targetWidthPct: number;
  projected: ConstellationBounds;
}

export interface FitValidationIssue {
  constellationId: string;
  displayName: string;
  message: string;
  projected: ConstellationBounds;
}

/** Preferred visual width by word length (fraction of 16:9 frame). */
export function targetWidthForName(displayName: string): number {
  const len = displayName.length;
  if (len <= 4) return 0.58;
  if (len === 5) return 0.64;
  if (len === 6) return 0.68;
  return 0.7;
}

export function getConstellationBounds(constellation: ChampionConstellation): ConstellationBounds {
  let minX = Infinity;
  let maxX = -Infinity;
  let minY = Infinity;
  let maxY = -Infinity;

  for (const a of constellation.anchors) {
    minX = Math.min(minX, a.x);
    maxX = Math.max(maxX, a.x);
    minY = Math.min(minY, a.y);
    maxY = Math.max(maxY, a.y);
  }

  if (!Number.isFinite(minX)) {
    return {
      minX: 0.2,
      maxX: 0.8,
      minY: 0.35,
      maxY: 0.55,
      centerX: 0.5,
      centerY: 0.44,
      width: 0.6,
      height: 0.2,
    };
  }

  const width = maxX - minX;
  const height = maxY - minY;
  return {
    minX,
    maxX,
    minY,
    maxY,
    centerX: (minX + maxX) / 2,
    centerY: (minY + maxY) / 2,
    width,
    height,
  };
}

function transformBounds(
  bounds: ConstellationBounds,
  scale: number,
  offsetX: number,
  offsetY: number,
  originX = 0.5,
  originY = 0.44,
): ConstellationBounds {
  const tx = (v: number, axis: "x" | "y") => {
    const origin = axis === "x" ? originX : originY;
    const offset = axis === "x" ? offsetX : offsetY;
    return origin + (v - origin) * scale + offset;
  };

  const minX = tx(bounds.minX, "x");
  const maxX = tx(bounds.maxX, "x");
  const minY = tx(bounds.minY, "y");
  const maxY = tx(bounds.maxY, "y");

  return {
    minX,
    maxX,
    minY,
    maxY,
    centerX: (minX + maxX) / 2,
    centerY: (minY + maxY) / 2,
    width: maxX - minX,
    height: maxY - minY,
  };
}

/**
 * Fit constellation geometry into the title-safe hub region.
 * Returns scale + centering offsets for screen-space readable state.
 */
export function fitConstellationToSafeFrame(
  constellation: ChampionConstellation,
  options?: {
    horizontalMargin?: number;
    verticalMargin?: number;
    maxWidthPct?: number;
    centerY?: number;
  },
): SafeFrameFit {
  const bounds = getConstellationBounds(constellation);
  const hMargin = options?.horizontalMargin ?? HUB_HORIZONTAL_MARGIN;
  const vMargin = options?.verticalMargin ?? HUB_VERTICAL_MARGIN;
  const maxWidthPct = options?.maxWidthPct ?? HUB_MAX_WIDTH_PCT;
  const centerY = options?.centerY ?? 0.44;
  const targetWidthPct = targetWidthForName(constellation.displayName ?? "NAME");

  const safeWidth = 1 - hMargin * 2 - FIT_INSET;
  const topRoom = centerY - vMargin - FIT_INSET / 2;
  const bottomRoom = 1 - vMargin - centerY - FIT_INSET / 2;
  const maxHeightAtCenter = Math.min(topRoom, bottomRoom) * 2;

  const scaleForTarget = (targetWidthPct - FIT_INSET) / Math.max(1e-6, bounds.width);
  const scaleForMax = (maxWidthPct - FIT_INSET) / Math.max(1e-6, bounds.width);
  const scaleForSafeW = safeWidth / Math.max(1e-6, bounds.width);
  const scaleForSafeH = maxHeightAtCenter / Math.max(1e-6, bounds.height);

  const scale = Math.min(scaleForTarget, scaleForMax, scaleForSafeW, scaleForSafeH);

  const offsetX = 0.5 - bounds.centerX;
  const offsetY = centerY - bounds.centerY;

  const projected = transformBounds(bounds, scale, offsetX, offsetY, bounds.centerX, bounds.centerY);

  return {
    scale,
    offsetX,
    offsetY,
    bounds,
    targetWidthPct,
    projected,
  };
}

export function validateConstellationHubFit(
  constellation: ChampionConstellation,
): FitValidationIssue | null {
  const fit = fitConstellationToSafeFrame(constellation);
  const p = fit.projected;
  const hMargin = HUB_HORIZONTAL_MARGIN;
  const vMargin = HUB_VERTICAL_MARGIN;

  if (p.minX < hMargin) {
    return {
      constellationId: constellation.id,
      displayName: constellation.displayName ?? constellation.id,
      message: `left edge ${p.minX.toFixed(3)} < safe margin ${hMargin}`,
      projected: p,
    };
  }
  if (p.maxX > 1 - hMargin) {
    return {
      constellationId: constellation.id,
      displayName: constellation.displayName ?? constellation.id,
      message: `right edge ${p.maxX.toFixed(3)} > ${1 - hMargin}`,
      projected: p,
    };
  }
  if (p.minY < vMargin) {
    return {
      constellationId: constellation.id,
      displayName: constellation.displayName ?? constellation.id,
      message: `top edge ${p.minY.toFixed(3)} < safe margin ${vMargin}`,
      projected: p,
    };
  }
  if (p.maxY > 1 - vMargin) {
    return {
      constellationId: constellation.id,
      displayName: constellation.displayName ?? constellation.id,
      message: `bottom edge ${p.maxY.toFixed(3)} > ${1 - vMargin}`,
      projected: p,
    };
  }
  return null;
}

export function formatProjectedBounds(fit: SafeFrameFit): string {
  const p = fit.projected;
  return `x:${p.minX.toFixed(3)}–${p.maxX.toFixed(3)} y:${p.minY.toFixed(3)}–${p.maxY.toFixed(3)} w:${p.width.toFixed(3)}`;
}
