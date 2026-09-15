"use client";

import { Flame, LogIn, RotateCcw, Sparkles } from "lucide-react";
import * as React from "react";
import { achievements } from "@/data";
import { useProgress, useSession } from "@/components/providers";
import { AchievementList } from "@/components/daily/achievement-card";
import { CollectionGrid } from "@/components/daily/collection-grid";
import { DailyQuiz } from "@/components/daily/daily-quiz";
import { LoreDNA } from "@/components/daily/lore-dna";
import { Button } from "@/components/ui/button";
import { ProgressMeter } from "@/components/ui/progress-ring";
import {
  knowledgeTier,
  levelForXp,
  levelProgress,
  nextLevel,
  userStats,
} from "@/lib/progress/model";
import { formatPercent } from "@/lib/utils";
import type { QuizQuestion } from "@/types";

export function ProfileScreen({
  dailyQuestions,
  date,
}: {
  dailyQuestions: QuizQuestion[];
  date: string;
}) {
  const { user, signedIn, authAvailable, signInWithEmail, signInWithGoogle } =
    useSession();
  const { progress, ready, reset, mode } = useProgress();
  const [email, setEmail] = React.useState("");
  const [authMessage, setAuthMessage] = React.useState<string | null>(null);
  const [authBusy, setAuthBusy] = React.useState(false);

  const stats = userStats(progress);
  const level = levelForXp(progress.xp);
  const upcoming = nextLevel(progress.xp);
  const tier = knowledgeTier(stats.knowledge);
  const rareAchievements = achievements.filter(
    (a) =>
      progress.achievements.includes(a.id) &&
      (a.rarity === "epic" || a.rarity === "legendary"),
  );

  const sendMagicLink = async () => {
    setAuthBusy(true);
    setAuthMessage(null);
    const result = await signInWithEmail(email);
    setAuthMessage(
      result.error ?? "Check your email for a sign-in link.",
    );
    setAuthBusy(false);
  };

  if (!ready) {
    return (
      <div className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6">
        <div className="skeleton h-8 w-48 rounded-lg" />
        <div className="skeleton mt-8 h-64 w-full rounded-[var(--radius-card)]" />
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-6xl px-4 pt-10 pb-24 sm:px-6 sm:pt-14">
      {/* ---------------------------------------------------------- header */}
      <header className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-eyebrow text-gold">Your archive</p>
          <h1 className="text-monument mt-3 text-[clamp(2rem,6vw,3.5rem)]">
            {signedIn ? (user?.email?.split("@")[0] ?? "Scholar") : "LoreGraph"}
          </h1>
          <p className="text-muted mt-3 max-w-lg text-sm leading-relaxed">
            {signedIn
              ? "Progress syncs to your account. Explore, connect and read to grow your Runeterra knowledge."
              : "Play Daily Lore without an account. Sign in to save streaks, collection and achievements across devices."}
          </p>
        </div>

        {!signedIn && authAvailable ? (
          <div className="panel w-full max-w-sm p-4">
            <p className="text-eyebrow text-muted mb-3">Sign in</p>
            <div className="flex gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@email.com"
                className="text-parchment placeholder:text-muted h-10 min-w-0 flex-1 rounded-full border border-line bg-white/[0.03] px-4 text-sm outline-none focus:border-gold/40"
              />
              <Button
                variant="primary"
                size="sm"
                disabled={authBusy || !email.includes("@")}
                onClick={() => void sendMagicLink()}
              >
                <LogIn aria-hidden />
                Link
              </Button>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="mt-2 w-full"
              disabled={authBusy}
              onClick={() => void signInWithGoogle()}
            >
              Continue with Google
            </Button>
            {authMessage ? (
              <p className="text-muted mt-2 text-xs">{authMessage}</p>
            ) : null}
          </div>
        ) : null}
      </header>

      {/* ---------------------------------------------------- knowledge */}
      <section
        aria-labelledby="knowledge-heading"
        className="panel mt-10 p-5 sm:p-7"
      >
        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 id="knowledge-heading" className="text-eyebrow text-muted">
              LoreGraph completion
            </h2>
            <p className="font-display text-parchment mt-2 text-5xl tabular-nums sm:text-6xl">
              {formatPercent(stats.knowledge)}
            </p>
            <p className="text-muted mt-2 text-sm">
              Level {level.level} · {level.name} · {tier} · based on {stats.charactersExplored} champions explored in this archive
            </p>
            {upcoming ? (
              <div className="mt-4 max-w-xs">
                <div className="mb-1.5 flex justify-between text-xs">
                  <span className="text-muted">Next: {upcoming.name}</span>
                  <span className="text-muted-dim tabular-nums">
                    {progress.xp}/{upcoming.minXp} XP
                  </span>
                </div>
                <ProgressMeter value={levelProgress(progress.xp)} color="#C9A96E" height={4} />
              </div>
            ) : null}
          </div>

          <dl className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:gap-6">
            <Stat label="Explored" value={stats.charactersExplored} />
            <Stat label="Stories" value={stats.storiesCompleted} />
            <Stat label="Connections" value={stats.connectionsDiscovered} />
            <Stat label="Streak" value={stats.streak} icon={Flame} />
            <Stat label="Quiz accuracy" value={`${stats.quizAccuracy}%`} />
            <Stat label="Achievements" value={stats.achievements} icon={Sparkles} />
          </dl>
        </div>
      </section>

      {/* ------------------------------------------------------ daily */}
      <section aria-labelledby="daily-heading" className="mt-14">
        <h2 id="daily-heading" className="font-display text-parchment text-2xl">
          Daily Lore
        </h2>
        <p className="text-muted mt-1 text-sm">
          Five questions. Same set for everyone today. Streaks count even without
          an account ({mode === "local" ? "saved locally" : "synced"}).
        </p>
        <div className="mt-5">
          <DailyQuiz questions={dailyQuestions} date={date} />
        </div>
      </section>

      {/* ---------------------------------------------------- lore DNA */}
      <section aria-labelledby="dna-heading" className="mt-14">
        <h2 id="dna-heading" className="font-display text-parchment text-2xl">
          Your Lore DNA
        </h2>
        <p className="text-muted mt-1 text-sm">
          Where your attention has been — weighted by how well you know each thread.
        </p>
        <div className="panel mt-5 p-5 sm:p-6">
          <LoreDNA progress={progress} />
        </div>
      </section>

      {/* -------------------------------------------------- achievements */}
      <section aria-labelledby="achievements-heading" className="mt-14">
        <div className="flex items-baseline justify-between gap-4">
          <h2 id="achievements-heading" className="font-display text-parchment text-2xl">
            Achievements
          </h2>
          {rareAchievements.length > 0 ? (
            <span className="text-eyebrow text-gold">
              {rareAchievements.length} rare
            </span>
          ) : null}
        </div>
        <div className="mt-5">
          <AchievementList unlockedIds={progress.achievements} />
        </div>
      </section>

      {/* ---------------------------------------------------- collection */}
      <section aria-labelledby="collection-heading" className="mt-14">
        <h2 id="collection-heading" className="font-display text-parchment text-2xl">
          Collection
        </h2>
        <p className="text-muted mt-1 text-sm">
          Unknown · Discovered · Studied · Mastered
        </p>
        <div className="mt-5">
          <CollectionGrid progress={progress} />
        </div>
      </section>

      {process.env.NODE_ENV === "development" ? (
        <div className="mt-10 flex justify-end">
          <Button variant="ghost" size="sm" onClick={() => reset()}>
            <RotateCcw aria-hidden />
            Reset local progress
          </Button>
        </div>
      ) : null}
    </div>
  );
}

function Stat({
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value: number | string;
  icon?: React.ComponentType<{ className?: string }>;
}) {
  return (
    <div className="rounded-xl border border-line bg-white/[0.02] px-3 py-3">
      <dt className="text-eyebrow text-muted-dim flex items-center gap-1">
        {Icon ? <Icon className="size-3" aria-hidden /> : null}
        {label}
      </dt>
      <dd className="text-parchment mt-1 text-xl font-medium tabular-nums">
        {value}
      </dd>
    </div>
  );
}
