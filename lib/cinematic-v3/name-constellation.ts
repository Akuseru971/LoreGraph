import { GENERATED_NAME_GLYPHS } from "@/data/cinematic/name-glyphs.generated";
import type { NameConstellationSpec } from "@/data/cinematic/name-constellations";
import type {
  ChampionConstellation,
  ChampionConstellationAnchor,
} from "@/types";

/** Build constellation from pre-generated Instrument Serif glyph geometry. */
export function buildNameConstellation(spec: NameConstellationSpec): ChampionConstellation {
  const generated = GENERATED_NAME_GLYPHS[spec.id];
  if (!generated) {
    throw new Error(`Missing generated glyph constellation for ${spec.id}`);
  }

  const hero = generated.anchors.find((a) => a.id === spec.heroStarId) ?? generated.anchors[0];

  return {
    id: spec.id,
    characterId: spec.characterId,
    heroStarId: spec.heroStarId,
    splashFocal: { x: hero?.x ?? 0.5, y: hero?.y ?? 0.44 },
    anchors: generated.anchors,
    lines: generated.lines,
    contourGroups: generated.contourGroups,
    displayName: spec.displayName,
    typographySource: "Instrument Serif (OFL)",
  };
}

export function getNameConstellationHeroPosition(
  constellation: ChampionConstellation,
  heroStarId?: string,
): { x: number; y: number } {
  const id = heroStarId ?? constellation.heroStarId;
  const hero = constellation.anchors.find((a) => a.id === id);
  return hero ? { x: hero.x, y: hero.y } : { x: 0.5, y: 0.44 };
}

/** Pick the destination star within the name for a target scene beat. */
export function getDestinationStarForScene(
  constellation: ChampionConstellation,
  targetSceneIndex: number,
  totalScenes: number,
): string {
  const letterGroups =
    constellation.contourGroups?.filter((g) => g.id.startsWith("letter-")) ?? [];
  const letterCount = letterGroups.length || 1;
  const denom = Math.max(1, totalScenes - 1);
  const letterIndex = Math.min(
    letterCount - 1,
    Math.floor((targetSceneIndex / denom) * letterCount),
  );
  const groupId = `letter-${letterIndex}`;
  const groupAnchors = constellation.anchors.filter((a) => a.contourGroup === groupId);
  const prominent = pickDestinationAnchor(groupAnchors, constellation.heroStarId, letterIndex);
  return prominent?.id ?? constellation.heroStarId;
}

function pickDestinationAnchor(
  groupAnchors: ChampionConstellationAnchor[],
  heroStarId: string,
  letterIndex: number,
): ChampionConstellationAnchor | undefined {
  const highs = groupAnchors.filter(
    (a) => a.visualWeight === "HIGH" && a.id !== heroStarId,
  );
  if (highs.length) {
    return highs[Math.floor(highs.length * 0.45)] ?? highs[0];
  }
  const mids = groupAnchors.filter((a) => a.id !== heroStarId);
  return mids[Math.floor(mids.length * ((letterIndex % 3) / 3 + 0.35))] ?? mids[0];
}

export function isNameConstellation(constellation: ChampionConstellation): boolean {
  return Boolean(constellation.displayName) || constellation.id.startsWith("name:");
}
