import type { ChampionConstellation } from "@/types";

export interface ConstellationValidationIssue {
  level: "ERROR" | "WARNING";
  constellationId: string;
  kind: string;
  message: string;
}

const MIN_FLAGSHIP_ANCHORS = 60;
const MIN_CONTOUR_ANCHORS = 30;
const MIN_CONTOUR_GROUPS = 4;

export function validateFlagshipConstellation(
  constellation: ChampionConstellation,
): ConstellationValidationIssue[] {
  const issues: ConstellationValidationIssue[] = [];
  const contour = constellation.anchors.filter((a) => a.category === "CONTOUR");
  const iconic = constellation.anchors.filter((a) => a.category === "ICONIC");
  const withReveal = constellation.anchors.filter((a) => a.revealPhase != null);
  const hero = constellation.anchors.find((a) => a.id === constellation.heroStarId);

  if (constellation.anchors.length < MIN_FLAGSHIP_ANCHORS) {
    issues.push({
      level: "WARNING",
      constellationId: constellation.id,
      kind: "low_anchor_count",
      message: `${constellation.anchors.length} anchors — flagship silhouettes need ≥${MIN_FLAGSHIP_ANCHORS}`,
    });
  }

  if (contour.length < MIN_CONTOUR_ANCHORS) {
    issues.push({
      level: "WARNING",
      constellationId: constellation.id,
      kind: "low_contour_count",
      message: `${contour.length} CONTOUR anchors — need ≥${MIN_CONTOUR_ANCHORS} for silhouette fidelity`,
    });
  }

  if (constellation.silhouetteSource) {
    if (!constellation.silhouetteSource.maskAssetPath) {
      issues.push({
        level: "ERROR",
        constellationId: constellation.id,
        kind: "missing_mask_asset",
        message: "Splash-derived constellation missing maskAssetPath",
      });
    }
    if (!constellation.silhouetteSource.splashAssetPath) {
      issues.push({
        level: "ERROR",
        constellationId: constellation.id,
        kind: "missing_splash_provenance",
        message: "Splash-derived constellation missing splashAssetPath",
      });
    }
  } else if ((constellation.contourGroups?.length ?? 0) < MIN_CONTOUR_GROUPS) {
    issues.push({
      level: "WARNING",
      constellationId: constellation.id,
      kind: "missing_contour_groups",
      message: "Missing contour group definitions",
    });
  }

  if (!hero) {
    issues.push({
      level: "ERROR",
      constellationId: constellation.id,
      kind: "missing_hero_star",
      message: `Hero star ${constellation.heroStarId} not found in anchors`,
    });
  }

  if (withReveal.length < constellation.anchors.length * 0.5) {
    issues.push({
      level: "WARNING",
      constellationId: constellation.id,
      kind: "missing_reveal_priority",
      message: "Many anchors lack revealPhase",
    });
  }

  if (iconic.length < 2) {
    issues.push({
      level: "WARNING",
      constellationId: constellation.id,
      kind: "low_iconic_count",
      message: "Fewer than 2 ICONIC anchors",
    });
  }

  if (!(constellation.lines?.length ?? 0)) {
    issues.push({
      level: "WARNING",
      constellationId: constellation.id,
      kind: "missing_lines",
      message: "No explicit constellation lines defined",
    });
  }

  return issues;
}
