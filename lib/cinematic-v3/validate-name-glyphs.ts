import { GENERATED_NAME_GLYPHS } from "@/data/cinematic/name-glyphs.generated";
import type { ChampionConstellation } from "@/types";
import { countIntraGlyphCrossings, MAX_STARS_PER_LETTER, MIN_LETTER_GAP } from "./glyph-simplify";
import { validateConstellationHubFit } from "./name-fit";

export interface NameGlyphValidationIssue {
  constellationId: string;
  level: "ERROR" | "WARNING";
  message: string;
}

function asConstellation(id: string, generated: (typeof GENERATED_NAME_GLYPHS)[string]): ChampionConstellation {
  return {
    id,
    characterId: id.replace("name:", "char:"),
    heroStarId: "name-hero",
    splashFocal: { x: 0.5, y: 0.44 },
    anchors: generated.anchors,
    lines: generated.lines,
    contourGroups: generated.contourGroups,
    displayName: id.split(":")[1]?.toUpperCase() ?? id,
    typographySource: "Instrument Serif (OFL)",
  };
}

export function validateNameGlyphs(): NameGlyphValidationIssue[] {
  const issues: NameGlyphValidationIssue[] = [];

  for (const [id, generated] of Object.entries(GENERATED_NAME_GLYPHS)) {
    const constellation = asConstellation(id, generated);
    const letterGroups = generated.contourGroups?.filter((g) => g.id.startsWith("letter-")) ?? [];
    const perLetter = letterGroups.length
      ? generated.anchors.length / letterGroups.length
      : generated.anchors.length;

    if (perLetter > MAX_STARS_PER_LETTER) {
      issues.push({
        constellationId: id,
        level: "ERROR",
        message: `Average ${perLetter.toFixed(1)} stars/letter exceeds max ${MAX_STARS_PER_LETTER}`,
      });
    }

    const fitIssue = validateConstellationHubFit(constellation);
    if (fitIssue) {
      issues.push({
        constellationId: id,
        level: "ERROR",
        message: fitIssue.message,
      });
    }

    for (let i = 0; i < letterGroups.length - 1; i++) {
      const aIds = new Set(
        generated.anchors.filter((a) => a.contourGroup === `letter-${i}`).map((a) => a.id),
      );
      const bIds = new Set(
        generated.anchors.filter((a) => a.contourGroup === `letter-${i + 1}`).map((a) => a.id),
      );
      const crossLines = generated.lines.filter(
        (l) =>
          (aIds.has(l.from) && bIds.has(l.to)) || (bIds.has(l.from) && aIds.has(l.to)),
      );
      if (crossLines.length > 0) {
        issues.push({
          constellationId: id,
          level: "ERROR",
          message: `${crossLines.length} cross-letter lines between letter-${i} and letter-${i + 1}`,
        });
      }
    }

    for (const group of letterGroups) {
      const groupAnchors = generated.anchors.filter((a) => a.contourGroup === group.id);
      const byId = new Map(groupAnchors.map((a) => [a.id, a]));
      const segments = generated.lines
        .filter((l) => byId.has(l.from) && byId.has(l.to))
        .map((l) => ({
          from: { x: byId.get(l.from)!.x, y: byId.get(l.from)!.y },
          to: { x: byId.get(l.to)!.x, y: byId.get(l.to)!.y },
        }));
      const crossings = countIntraGlyphCrossings(segments);
      if (crossings > 4) {
        issues.push({
          constellationId: id,
          level: "WARNING",
          message: `Letter ${group.label} has ${crossings} line crossings (tangled)`,
        });
      }

      const xs = groupAnchors.map((a) => a.x);
      const minX = Math.min(...xs);
      const maxX = Math.max(...xs);
      if (maxX - minX < 0.02) {
        issues.push({
          constellationId: id,
          level: "WARNING",
          message: `Letter ${group.label} is extremely narrow`,
        });
      }
    }

    const letterBounds = letterGroups.map((g) => {
      const anchors = generated.anchors.filter((a) => a.contourGroup === g.id);
      const xs = anchors.map((a) => a.x);
      return { minX: Math.min(...xs), maxX: Math.max(...xs) };
    });
    for (let i = 0; i < letterBounds.length - 1; i++) {
      const gap = letterBounds[i + 1].minX - letterBounds[i].maxX;
      if (gap < MIN_LETTER_GAP * 0.35) {
        issues.push({
          constellationId: id,
          level: "ERROR",
          message: `Letter gap ${gap.toFixed(4)} below minimum between letters ${i} and ${i + 1}`,
        });
      }
    }
  }

  return issues;
}
