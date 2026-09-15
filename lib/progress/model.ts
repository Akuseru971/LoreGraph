import {
  achievements,
  characters,
  knowledgeTiers,
  levels,
  relationships,
  storyPaths,
  XP_REWARDS,
} from "@/data";
import type {
  AchievementDefinition,
  CharacterProgress,
  LevelDefinition,
  ProgressLevel,
  RegionSlug,
  UserProgress,
} from "@/types";
import { clamp, todayKey } from "@/lib/utils";

export const PROGRESS_VERSION = 1;

export function emptyProgress(): UserProgress {
  const now = new Date().toISOString();
  return {
    version: PROGRESS_VERSION,
    xp: 0,
    characters: {},
    stories: {},
    relationshipsDiscovered: [],
    connectionsFound: 0,
    connectSearches: 0,
    achievements: [],
    dailyAttempts: [],
    streak: 0,
    longestStreak: 0,
    lastDailyDate: null,
    quizAnswered: 0,
    quizCorrect: 0,
    firstSeenAt: now,
    lastSeenAt: now,
    onboarding: {
      pickedFirstCharacter: false,
      openedFirstGraph: false,
      ranFirstConnection: false,
    },
  };
}

export function emptyCharacterProgress(characterId: string): CharacterProgress {
  return {
    characterId,
    views: 0,
    relationshipsSeen: [],
    timelineViewed: false,
    storiesCompleted: 0,
    quizCorrect: 0,
    collected: false,
    updatedAt: new Date().toISOString(),
  };
}

/* -------------------------------------------------------------------- level */

export function levelForXp(xp: number): LevelDefinition {
  let current = levels[0];
  for (const level of levels) {
    if (xp >= level.minXp) current = level;
  }
  return current;
}

export function nextLevel(xp: number): LevelDefinition | null {
  return levels.find((l) => l.minXp > xp) ?? null;
}

export function levelProgress(xp: number): number {
  const current = levelForXp(xp);
  const next = nextLevel(xp);
  if (!next) return 100;
  return clamp(
    ((xp - current.minXp) / (next.minXp - current.minXp)) * 100,
    0,
    100,
  );
}

/* ---------------------------------------------------------------- mastery */

const relationshipsByCharacter = new Map<string, number>();
for (const relationship of relationships) {
  for (const id of [relationship.sourceCharacterId, relationship.targetCharacterId]) {
    relationshipsByCharacter.set(id, (relationshipsByCharacter.get(id) ?? 0) + 1);
  }
}

/**
 * Per-character knowledge, 0–100. Deliberately reachable: viewing the profile
 * gets you started, reading relationships and the timeline gets you most of
 * the way, and stories/quizzes finish it.
 */
export function characterKnowledge(
  characterId: string,
  progress: UserProgress,
): number {
  const entry = progress.characters[characterId];
  if (!entry) return 0;

  const totalRelationships = relationshipsByCharacter.get(characterId) ?? 1;
  const seen = entry.relationshipsSeen.length;

  const viewScore = entry.views > 0 ? 20 : 0;
  const relScore = clamp((seen / totalRelationships) * 45, 0, 45);
  const timelineScore = entry.timelineViewed ? 15 : 0;
  const storyScore = clamp(entry.storiesCompleted * 10, 0, 12);
  const quizScore = clamp(entry.quizCorrect * 4, 0, 8);

  return Math.round(viewScore + relScore + timelineScore + storyScore + quizScore);
}

export function progressLevelFor(knowledge: number): ProgressLevel {
  if (knowledge <= 0) return "unknown";
  if (knowledge < 45) return "discovered";
  if (knowledge < 85) return "studied";
  return "mastered";
}

export const PROGRESS_LEVEL_LABEL: Record<ProgressLevel, string> = {
  unknown: "UNKNOWN",
  discovered: "DISCOVERED",
  studied: "STUDIED",
  mastered: "MASTERED",
};

/** Overall universe knowledge, 0–100. */
export function universeKnowledge(progress: UserProgress): number {
  if (characters.length === 0) return 0;
  const total = characters.reduce(
    (sum, character) => sum + characterKnowledge(character.id, progress),
    0,
  );
  return Math.round(total / characters.length);
}

export function knowledgeTier(percent: number): string {
  let name = knowledgeTiers[0].name;
  for (const tier of knowledgeTiers) {
    if (percent >= tier.min) name = tier.name;
  }
  return name;
}

/* --------------------------------------------------------------- lore DNA */

export interface LoreDnaEntry {
  key: string;
  label: string;
  percent: number;
  accentColor: string;
}

const DNA_GROUPS: Array<{ key: string; label: string; accentColor: string; match: (id: string) => boolean }> =
  (() => {
    const byRegion = (region: RegionSlug) => (id: string) =>
      characters.find((c) => c.id === id)?.region === region;
    const byTag = (tag: string) => (id: string) =>
      characters.find((c) => c.id === id)?.tags.includes(tag) ?? false;

    return [
      { key: "noxus", label: "Noxus", accentColor: "#A03041", match: byRegion("noxus") },
      { key: "darkin", label: "Darkin", accentColor: "#A8434A", match: byTag("darkin") },
      { key: "shurima", label: "Shurima", accentColor: "#D1A65C", match: byRegion("shurima") },
      { key: "ionia", label: "Ionia", accentColor: "#C77FA8", match: byRegion("ionia") },
      { key: "targon", label: "Targon", accentColor: "#8B7FC7", match: byRegion("targon") },
      { key: "demacia", label: "Demacia", accentColor: "#D8B978", match: byRegion("demacia") },
      {
        key: "piltover-zaun",
        label: "Piltover & Zaun",
        accentColor: "#5FA86B",
        match: (id) => {
          const region = characters.find((c) => c.id === id)?.region;
          return region === "piltover" || region === "zaun";
        },
      },
      {
        key: "shadow-isles",
        label: "Shadow Isles",
        accentColor: "#4FA88C",
        match: byRegion("shadow-isles"),
      },
      { key: "freljord", label: "Freljord", accentColor: "#7FA8C7", match: byRegion("freljord") },
      { key: "void", label: "Void", accentColor: "#8A5FC9", match: byTag("void") },
    ];
  })();

export function loreDna(progress: UserProgress): LoreDnaEntry[] {
  return DNA_GROUPS.map((group) => {
    const members = characters.filter((c) => group.match(c.id));
    if (members.length === 0) {
      return { key: group.key, label: group.label, percent: 0, accentColor: group.accentColor };
    }
    const total = members.reduce(
      (sum, member) => sum + characterKnowledge(member.id, progress),
      0,
    );
    return {
      key: group.key,
      label: group.label,
      percent: Math.round(total / members.length),
      accentColor: group.accentColor,
    };
  }).sort((a, b) => b.percent - a.percent);
}

/* ----------------------------------------------------------- achievements */

export function evaluateAchievements(progress: UserProgress): string[] {
  const exploredIds = Object.keys(progress.characters).filter(
    (id) => (progress.characters[id]?.views ?? 0) > 0,
  );
  const explored = new Set(exploredIds);
  const knowledge = universeKnowledge(progress);

  const unlocked: string[] = [];

  for (const achievement of achievements) {
    if (isUnlocked(achievement, { progress, explored, knowledge })) {
      unlocked.push(achievement.id);
    }
  }
  return unlocked;
}

function isUnlocked(
  achievement: AchievementDefinition,
  ctx: { progress: UserProgress; explored: Set<string>; knowledge: number },
): boolean {
  const { rule } = achievement;
  switch (rule.kind) {
    case "charactersExplored":
      return rule.characterIds.every((id) => ctx.explored.has(id));
    case "charactersExploredCount":
      return ctx.explored.size >= rule.count;
    case "tagExplored": {
      const members = characters.filter((c) => c.tags.includes(rule.tag));
      return members.length > 0 && members.every((c) => ctx.explored.has(c.id));
    }
    case "regionExplored": {
      const members = characters.filter((c) => c.region === rule.region);
      return members.length > 0 && members.every((c) => ctx.explored.has(c.id));
    }
    case "storyCompleted":
      return ctx.progress.stories[rule.storySlug]?.completed === true;
    case "characterMastered":
      return characterKnowledge(rule.characterId, ctx.progress) >= 85;
    case "connectionsFound":
      return ctx.progress.connectionsFound >= rule.count;
    case "knowledgePercent":
      return ctx.knowledge >= rule.percent;
    case "streak":
      return ctx.progress.longestStreak >= rule.days;
    default:
      return false;
  }
}

/* ----------------------------------------------------------------- stats */

export interface UserStats {
  charactersExplored: number;
  storiesCompleted: number;
  connectionsDiscovered: number;
  streak: number;
  longestStreak: number;
  quizAccuracy: number;
  achievements: number;
  knowledge: number;
  xp: number;
}

export function userStats(progress: UserProgress): UserStats {
  const charactersExplored = Object.values(progress.characters).filter(
    (c) => c.views > 0,
  ).length;
  const storiesCompleted = Object.values(progress.stories).filter(
    (s) => s.completed,
  ).length;
  return {
    charactersExplored,
    storiesCompleted,
    connectionsDiscovered: progress.relationshipsDiscovered.length,
    streak: progress.streak,
    longestStreak: progress.longestStreak,
    quizAccuracy:
      progress.quizAnswered === 0
        ? 0
        : Math.round((progress.quizCorrect / progress.quizAnswered) * 100),
    achievements: progress.achievements.length,
    knowledge: universeKnowledge(progress),
    xp: progress.xp,
  };
}

export const TOTAL_STORY_PATHS = storyPaths.length;
export const TOTAL_CHARACTERS = characters.length;
export const TOTAL_RELATIONSHIPS = relationships.length;

/* ---------------------------------------------------------------- streaks */

export function applyDailyResult(
  progress: UserProgress,
  result: { date?: string; questionIds: string[]; correct: number; total: number },
): UserProgress {
  const date = result.date ?? todayKey();
  if (progress.dailyAttempts.some((a) => a.date === date)) return progress;

  const perfect = result.total > 0 && result.correct === result.total;
  const previous = progress.lastDailyDate;
  let streak = 1;
  if (previous) {
    const gap =
      (new Date(`${date}T00:00:00Z`).getTime() -
        new Date(`${previous}T00:00:00Z`).getTime()) /
      86_400_000;
    if (gap === 1) streak = progress.streak + 1;
    else if (gap === 0) streak = progress.streak;
  }

  const xpGain =
    XP_REWARDS.completeDaily + (perfect ? XP_REWARDS.perfectDailyBonus : 0);

  return {
    ...progress,
    xp: progress.xp + xpGain,
    quizAnswered: progress.quizAnswered + result.total,
    quizCorrect: progress.quizCorrect + result.correct,
    streak,
    longestStreak: Math.max(progress.longestStreak, streak),
    lastDailyDate: date,
    dailyAttempts: [
      ...progress.dailyAttempts,
      {
        date,
        questionIds: result.questionIds,
        correctCount: result.correct,
        totalCount: result.total,
        perfect,
        completedAt: new Date().toISOString(),
      },
    ].slice(-90),
  };
}
