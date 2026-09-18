import { LETTER_STROKES, type NameConstellationSpec } from "@/data/cinematic/name-constellations";
import type {
  ChampionConstellation,
  ChampionConstellationAnchor,
  ConstellationContourGroup,
  ConstellationLine,
} from "@/types";
import { densifyPolyline } from "./constellation-builder";

const LETTER_WIDTH = 0.11;
const LETTER_HEIGHT = 0.22;
const NAME_Y = 0.38;

function layoutLetters(displayName: string, letterSpacing = 0.012) {
  const chars = displayName.split("");
  const totalWidth = chars.length * LETTER_WIDTH + (chars.length - 1) * letterSpacing;
  const startX = 0.5 - totalWidth / 2;
  return chars.map((char, i) => ({
    char,
    x0: startX + i * (LETTER_WIDTH + letterSpacing),
    y0: NAME_Y,
  }));
}

/** Build a readable constellation typography from stroke font data. */
export function buildNameConstellation(spec: NameConstellationSpec): ChampionConstellation {
  const letters = layoutLetters(spec.displayName, spec.letterSpacing);
  const anchors: ChampionConstellationAnchor[] = [];
  const contourGroups: ConstellationContourGroup[] = [];
  const strokeLinks: Array<{ from: string; to: string }> = [];

  for (let li = 0; li < letters.length; li++) {
    const { char, x0, y0 } = letters[li];
    const strokes = LETTER_STROKES[char];
    if (!strokes) continue;

    const groupId = `letter-${li}`;
    contourGroups.push({
      id: groupId,
      label: char,
      revealPhase: li < 2 ? 1 : li < 4 ? 2 : 3,
    });

    for (let si = 0; si < strokes.length; si++) {
      const stroke = strokes[si];
      const local = densifyPolyline(stroke, 0.13, false);
      const prefix = `${groupId}-s${si}`;

      for (let pi = 0; pi < local.length; pi++) {
        const id = `${prefix}-p${pi}`;
        anchors.push({
          id,
          x: round4(x0 + local[pi].x * LETTER_WIDTH),
          y: round4(y0 + local[pi].y * LETTER_HEIGHT),
          category: "CONTOUR",
          visualWeight: pi === 0 || pi === local.length - 1 ? "HIGH" : "MEDIUM",
          revealPhase: contourGroups.find((g) => g.id === groupId)?.revealPhase ?? 2,
          contourGroup: groupId,
          lineWeight: "NORMAL",
          connectsTo: [],
        });
        if (pi < local.length - 1) {
          strokeLinks.push({ from: id, to: `${prefix}-p${pi + 1}` });
        }
      }
    }
  }

  const midLetter = Math.floor(letters.length / 2);
  const midGroup = `letter-${midLetter}`;
  const midAnchors = anchors.filter((a) => a.contourGroup === midGroup);
  const heroAnchor = midAnchors[Math.floor(midAnchors.length / 2)] ?? anchors[Math.floor(anchors.length / 2)];
  if (heroAnchor) {
    const oldId = heroAnchor.id;
    heroAnchor.id = spec.heroStarId;
    heroAnchor.category = "ICONIC";
    heroAnchor.visualWeight = "HERO";
    heroAnchor.lineWeight = "ICONIC";
    for (const link of strokeLinks) {
      if (link.from === oldId) link.from = spec.heroStarId;
      if (link.to === oldId) link.to = spec.heroStarId;
    }
  }

  for (const link of strokeLinks) {
    const from = anchors.find((a) => a.id === link.from);
    if (from) from.connectsTo = [...(from.connectsTo ?? []), link.to];
  }

  const lines: ConstellationLine[] = [];
  for (const a of anchors) {
    for (const to of a.connectsTo ?? []) {
      lines.push({
        from: a.id,
        to,
        weight: a.lineWeight ?? "NORMAL",
        category: a.category,
      });
    }
  }

  const hero = anchors.find((a) => a.id === spec.heroStarId) ?? anchors[0];

  return {
    id: spec.id,
    characterId: spec.characterId,
    heroStarId: spec.heroStarId,
    splashFocal: { x: hero?.x ?? 0.5, y: hero?.y ?? 0.42 },
    anchors,
    lines,
    contourGroups,
    displayName: spec.displayName,
  };
}

export function getNameConstellationHeroPosition(
  constellation: ChampionConstellation,
  heroStarId?: string,
): { x: number; y: number } {
  const id = heroStarId ?? constellation.heroStarId;
  const hero = constellation.anchors.find((a) => a.id === id);
  return hero ? { x: hero.x, y: hero.y } : { x: 0.5, y: 0.42 };
}

export function isNameConstellation(constellation: ChampionConstellation): boolean {
  return Boolean(constellation.displayName) || constellation.id.startsWith("name:");
}

function round4(n: number): number {
  return Math.round(n * 10000) / 10000;
}
