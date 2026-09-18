import type { ChampionConstellation } from "@/types";

export interface IconicRegionDef {
  id: string;
  x0: number;
  y0: number;
  x1: number;
  y1: number;
}

export const AATROX_ICONIC_REGIONS: IconicRegionDef[] = [
  { id: "horns", x0: 0.42, y0: 0, x1: 0.62, y1: 0.18 },
  { id: "blade", x0: 0.58, y0: 0, x1: 0.82, y1: 0.35 },
  { id: "leftWing", x0: 0, y0: 0.12, x1: 0.3, y1: 0.5 },
  { id: "rightWing", x0: 0.7, y0: 0.12, x1: 1, y1: 0.5 },
  { id: "claw", x0: 0.1, y0: 0.35, x1: 0.32, y1: 0.58 },
  { id: "torso", x0: 0.35, y0: 0.25, x1: 0.55, y1: 0.55 },
  { id: "legs", x0: 0.35, y0: 0.52, x1: 0.58, y1: 0.85 },
];

export interface ContourConnectivityMetrics {
  anchorCount: number;
  contourAnchorCount: number;
  iconicConnectivityPct: number;
  primaryConnectivityPct: number;
  totalContourConnectivityPct: number;
  iconicExpected: number;
  iconicActual: number;
  primaryExpected: number;
  primaryActual: number;
}

function inRegion(x: number, y: number, region: IconicRegionDef): boolean {
  return x >= region.x0 && x <= region.x1 && y >= region.y0 && y <= region.y1;
}

function segmentInIconicRegion(
  ax: number,
  ay: number,
  bx: number,
  by: number,
  regions: IconicRegionDef[],
): boolean {
  const midX = (ax + bx) / 2;
  const midY = (ay + by) / 2;
  return regions.some((r) => inRegion(midX, midY, r));
}

/** Measure how continuously contour stars connect along their paths. */
export function computeContourConnectivity(
  constellation: ChampionConstellation,
  iconicRegions: IconicRegionDef[] = AATROX_ICONIC_REGIONS,
): ContourConnectivityMetrics {
  const contourAnchors = constellation.anchors.filter((a) => a.category === "CONTOUR");
  const anchorById = new Map(constellation.anchors.map((a) => [a.id, a]));

  const byGroup = new Map<string, typeof contourAnchors>();
  for (const a of contourAnchors) {
    const gid = a.contourGroup ?? "default";
    const list = byGroup.get(gid) ?? [];
    list.push(a);
    byGroup.set(gid, list);
  }

  let totalExpected = 0;
  let totalActual = 0;
  let iconicExpected = 0;
  let iconicActual = 0;
  let primaryExpected = 0;
  let primaryActual = 0;

  for (const [, group] of byGroup) {
    const sorted = [...group].sort((a, b) => {
      const ai = parseInt(a.id.split("-s").pop() ?? "0", 10);
      const bi = parseInt(b.id.split("-s").pop() ?? "0", 10);
      return ai - bi;
    });

    for (let i = 0; i < sorted.length; i++) {
      const next = sorted[(i + 1) % sorted.length];
      if (i === sorted.length - 1 && sorted.length < 3) continue;

      totalExpected++;
      const connected = sorted[i].connectsTo?.includes(next.id) ?? false;
      if (connected) totalActual++;

      const isPrimary =
        sorted[i].visualWeight !== "LOW" || next.visualWeight !== "LOW";
      if (isPrimary) {
        primaryExpected++;
        if (connected) primaryActual++;
      }

      if (segmentInIconicRegion(sorted[i].x, sorted[i].y, next.x, next.y, iconicRegions)) {
        iconicExpected++;
        if (connected) iconicActual++;
      }
    }
  }

  // Count structural/iconic anchor connections toward primary
  for (const a of constellation.anchors) {
    if (a.category === "ICONIC" || a.visualWeight === "HERO") {
      for (const to of a.connectsTo ?? []) {
        primaryExpected++;
        if (anchorById.has(to)) primaryActual++;
      }
    }
  }

  return {
    anchorCount: constellation.anchors.length,
    contourAnchorCount: contourAnchors.length,
    iconicConnectivityPct:
      iconicExpected > 0 ? Math.round((iconicActual / iconicExpected) * 1000) / 10 : 100,
    primaryConnectivityPct:
      primaryExpected > 0 ? Math.round((primaryActual / primaryExpected) * 1000) / 10 : 100,
    totalContourConnectivityPct:
      totalExpected > 0 ? Math.round((totalActual / totalExpected) * 1000) / 10 : 100,
    iconicExpected,
    iconicActual,
    primaryExpected,
    primaryActual,
  };
}
