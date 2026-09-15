"use client";

import * as React from "react";
import { XP_REWARDS, achievementById, storyPathBySlug } from "@/data";
import {
  createProgressRepository,
  type ProgressRepository,
} from "@/lib/data/progress-repository";
import { track } from "@/lib/analytics";
import {
  applyDailyResult,
  emptyCharacterProgress,
  emptyProgress,
  evaluateAchievements,
} from "@/lib/progress/model";
import type { UserProgress } from "@/types";
import { daysBetween, todayKey } from "@/lib/utils";

export interface XpToastPayload {
  id: number;
  amount: number;
  reason: string;
  achievement?: { name: string; description: string };
}

interface Award {
  amount: number;
  reason: string;
}

interface ProgressContextValue {
  progress: UserProgress;
  ready: boolean;
  signedIn: boolean;
  mode: ProgressRepository["kind"];
  toasts: XpToastPayload[];
  dismissToast: (id: number) => void;
  recordCharacterView: (characterId: string) => void;
  recordRelationshipSeen: (characterId: string, relationshipId: string) => void;
  recordTimelineViewed: (characterId: string) => void;
  toggleCollected: (characterId: string) => void;
  completeChapter: (storySlug: string, chapterId: string) => void;
  recordConnectionSearch: () => void;
  recordConnectionFound: () => void;
  markOnboarding: (key: keyof UserProgress["onboarding"]) => void;
  submitDaily: (result: {
    questionIds: string[];
    correct: number;
    total: number;
    characterIds?: string[];
  }) => void;
  reset: () => void;
}

const ProgressContext = React.createContext<ProgressContextValue | null>(null);

export function ProgressProvider({
  children,
  signedIn = false,
}: {
  children: React.ReactNode;
  signedIn?: boolean;
}) {
  const repository = React.useMemo(
    () => createProgressRepository(signedIn),
    [signedIn],
  );

  const [progress, setProgress] = React.useState<UserProgress>(() => emptyProgress());
  const [ready, setReady] = React.useState(false);
  const [toasts, setToasts] = React.useState<XpToastPayload[]>([]);

  // Authoritative mirror so mutations can read current state without putting
  // side effects (XP, toasts, analytics) inside a state updater.
  const current = React.useRef<UserProgress>(progress);
  const toastId = React.useRef(0);

  const pushToast = React.useCallback((payload: Omit<XpToastPayload, "id">) => {
    const id = ++toastId.current;
    setToasts((list) => [...list, { ...payload, id }].slice(-3));
    window.setTimeout(() => {
      setToasts((list) => list.filter((t) => t.id !== id));
    }, 4200);
  }, []);

  const dismissToast = React.useCallback((id: number) => {
    setToasts((list) => list.filter((t) => t.id !== id));
  }, []);

  const commit = React.useCallback((next: UserProgress) => {
    current.current = next;
    setProgress(next);
  }, []);

  /* --------------------------------------------------------------- load */
  React.useEffect(() => {
    let cancelled = false;
    void repository.load().then((loaded) => {
      if (cancelled) return;
      const today = todayKey();
      if (loaded.lastSeenAt.slice(0, 10) !== today) {
        track({
          name: "return_visit",
          daysSinceFirst: daysBetween(loaded.firstSeenAt.slice(0, 10), today),
        });
      }
      // A streak only survives if it was extended yesterday or today.
      const streakBroken =
        loaded.lastDailyDate !== null && daysBetween(loaded.lastDailyDate, today) > 1;
      const hydrated: UserProgress = {
        ...loaded,
        streak: streakBroken ? 0 : loaded.streak,
        lastSeenAt: new Date().toISOString(),
      };
      current.current = hydrated;
      setProgress(hydrated);
      setReady(true);
    });
    return () => {
      cancelled = true;
    };
  }, [repository]);

  /* --------------------------------------------------------------- save */
  React.useEffect(() => {
    if (!ready) return;
    const timer = window.setTimeout(() => {
      void repository.save(progress);
    }, 500);
    return () => window.clearTimeout(timer);
  }, [progress, ready, repository]);

  /**
   * Single mutation funnel. Applies the change, awards XP, then re-evaluates
   * achievements so unlocks and their bonuses stay consistent with the state
   * that produced them.
   */
  const apply = React.useCallback(
    (updater: (state: UserProgress) => UserProgress, award?: Award) => {
      const before = current.current;
      let next = updater(before);
      if (next === before) return;

      if (award && award.amount > 0) {
        next = { ...next, xp: next.xp + award.amount };
        track({ name: "xp_awarded", amount: award.amount, reason: award.reason });
        pushToast({ amount: award.amount, reason: award.reason });
      }

      const unlocked = evaluateAchievements(next);
      const fresh = unlocked.filter((id) => !next.achievements.includes(id));
      if (fresh.length > 0) {
        const bonus = fresh.reduce(
          (sum, id) => sum + (achievementById.get(id)?.xp ?? 0),
          0,
        );
        next = { ...next, achievements: unlocked, xp: next.xp + bonus };
        for (const id of fresh) {
          const achievement = achievementById.get(id);
          if (!achievement) continue;
          pushToast({
            amount: achievement.xp,
            reason: "Achievement unlocked",
            achievement: {
              name: achievement.name,
              description: achievement.description,
            },
          });
        }
      }

      commit(next);
    },
    [commit, pushToast],
  );

  const recordCharacterView = React.useCallback(
    (characterId: string) => {
      const existing = current.current.characters[characterId];
      const isFirstVisit = !existing || existing.views === 0;
      apply(
        (state) => {
          const entry =
            state.characters[characterId] ?? emptyCharacterProgress(characterId);
          return {
            ...state,
            characters: {
              ...state.characters,
              [characterId]: {
                ...entry,
                views: entry.views + 1,
                updatedAt: new Date().toISOString(),
              },
            },
            onboarding: { ...state.onboarding, pickedFirstCharacter: true },
          };
        },
        isFirstVisit
          ? { amount: XP_REWARDS.exploreCharacter, reason: "Champion explored" }
          : undefined,
      );
    },
    [apply],
  );

  const recordRelationshipSeen = React.useCallback(
    (characterId: string, relationshipId: string) => {
      const entry = current.current.characters[characterId];
      if (entry?.relationshipsSeen.includes(relationshipId)) return;
      apply(
        (state) => {
          const existing =
            state.characters[characterId] ?? emptyCharacterProgress(characterId);
          if (existing.relationshipsSeen.includes(relationshipId)) return state;
          const discovered = state.relationshipsDiscovered.includes(relationshipId)
            ? state.relationshipsDiscovered
            : [...state.relationshipsDiscovered, relationshipId];
          return {
            ...state,
            relationshipsDiscovered: discovered,
            characters: {
              ...state.characters,
              [characterId]: {
                ...existing,
                relationshipsSeen: [...existing.relationshipsSeen, relationshipId],
                updatedAt: new Date().toISOString(),
              },
            },
          };
        },
        { amount: XP_REWARDS.discoverRelationship, reason: "New connection" },
      );
    },
    [apply],
  );

  const recordTimelineViewed = React.useCallback(
    (characterId: string) => {
      if (current.current.characters[characterId]?.timelineViewed) return;
      apply((state) => {
        const entry =
          state.characters[characterId] ?? emptyCharacterProgress(characterId);
        if (entry.timelineViewed) return state;
        return {
          ...state,
          characters: {
            ...state.characters,
            [characterId]: { ...entry, timelineViewed: true },
          },
        };
      });
    },
    [apply],
  );

  const toggleCollected = React.useCallback(
    (characterId: string) => {
      apply((state) => {
        const entry =
          state.characters[characterId] ?? emptyCharacterProgress(characterId);
        return {
          ...state,
          characters: {
            ...state.characters,
            [characterId]: { ...entry, collected: !entry.collected },
          },
        };
      });
    },
    [apply],
  );

  const completeChapter = React.useCallback(
    (storySlug: string, chapterId: string) => {
      const path = storyPathBySlug.get(storySlug);
      const totalChapters = path?.chapters.length ?? 0;
      const existing = current.current.stories[storySlug];
      if (existing?.completedChapterIds.includes(chapterId)) return;

      const completedChapterIds = [
        ...(existing?.completedChapterIds ?? []),
        chapterId,
      ];
      const completed =
        totalChapters > 0 && completedChapterIds.length >= totalChapters;
      const finishedNow = completed && !existing?.completed;

      apply(
        (state) => {
          const characters = { ...state.characters };
          if (finishedNow && path) {
            for (const characterId of path.characterIds) {
              const entry =
                characters[characterId] ?? emptyCharacterProgress(characterId);
              characters[characterId] = {
                ...entry,
                storiesCompleted: entry.storiesCompleted + 1,
              };
            }
          }
          return {
            ...state,
            characters,
            stories: {
              ...state.stories,
              [storySlug]: {
                storySlug,
                completedChapterIds,
                completed,
                updatedAt: new Date().toISOString(),
              },
            },
          };
        },
        {
          amount:
            XP_REWARDS.completeChapter +
            (finishedNow ? XP_REWARDS.completeStoryPath : 0),
          reason: finishedNow ? "Story path complete" : "Chapter read",
        },
      );

      if (finishedNow) {
        track({ name: "story_complete", slug: storySlug, chapters: totalChapters });
      }
    },
    [apply],
  );

  const recordConnectionSearch = React.useCallback(() => {
    apply((state) => ({
      ...state,
      connectSearches: state.connectSearches + 1,
      onboarding: { ...state.onboarding, ranFirstConnection: true },
    }));
  }, [apply]);

  const recordConnectionFound = React.useCallback(() => {
    apply((state) => ({ ...state, connectionsFound: state.connectionsFound + 1 }), {
      amount: XP_REWARDS.findConnection,
      reason: "Connection found",
    });
  }, [apply]);

  const markOnboarding = React.useCallback(
    (key: keyof UserProgress["onboarding"]) => {
      if (current.current.onboarding[key]) return;
      apply((state) => ({
        ...state,
        onboarding: { ...state.onboarding, [key]: true },
      }));
    },
    [apply],
  );

  const submitDaily = React.useCallback(
    (result: {
      questionIds: string[];
      correct: number;
      total: number;
      characterIds?: string[];
    }) => {
      const date = todayKey();
      if (current.current.dailyAttempts.some((a) => a.date === date)) return;

      const perfect = result.total > 0 && result.correct === result.total;
      track({
        name: "daily_complete",
        date,
        correct: result.correct,
        total: result.total,
      });

      apply((state) => {
        const next = applyDailyResult(state, { ...result, date });
        if (next === state) return state;
        if (!result.characterIds?.length) return next;
        const characters = { ...next.characters };
        for (const characterId of result.characterIds) {
          const entry = characters[characterId] ?? emptyCharacterProgress(characterId);
          characters[characterId] = { ...entry, quizCorrect: entry.quizCorrect + 1 };
        }
        return { ...next, characters };
      });

      // applyDailyResult already granted the XP; surface it to the user.
      pushToast({
        amount:
          XP_REWARDS.completeDaily + (perfect ? XP_REWARDS.perfectDailyBonus : 0),
        reason: perfect ? "Perfect daily" : "Daily complete",
      });
    },
    [apply, pushToast],
  );

  const reset = React.useCallback(() => {
    void repository.clear();
    commit(emptyProgress());
  }, [repository, commit]);

  const value = React.useMemo<ProgressContextValue>(
    () => ({
      progress,
      ready,
      signedIn,
      mode: repository.kind,
      toasts,
      dismissToast,
      recordCharacterView,
      recordRelationshipSeen,
      recordTimelineViewed,
      toggleCollected,
      completeChapter,
      recordConnectionSearch,
      recordConnectionFound,
      markOnboarding,
      submitDaily,
      reset,
    }),
    [
      progress,
      ready,
      signedIn,
      repository.kind,
      toasts,
      dismissToast,
      recordCharacterView,
      recordRelationshipSeen,
      recordTimelineViewed,
      toggleCollected,
      completeChapter,
      recordConnectionSearch,
      recordConnectionFound,
      markOnboarding,
      submitDaily,
      reset,
    ],
  );

  return (
    <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>
  );
}

export function useProgress(): ProgressContextValue {
  const context = React.useContext(ProgressContext);
  if (!context) {
    throw new Error("useProgress must be used inside <ProgressProvider>");
  }
  return context;
}
