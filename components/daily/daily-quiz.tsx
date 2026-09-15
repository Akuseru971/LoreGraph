"use client";

import { Check, Flame, X } from "lucide-react";
import * as React from "react";
import { useProgress } from "@/components/providers";
import { Button } from "@/components/ui/button";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/utils";
import type { QuizQuestion } from "@/types";

type AnswerState = "idle" | "correct" | "wrong";

export function DailyQuiz({
  questions,
  date,
}: {
  questions: QuizQuestion[];
  date: string;
}) {
  const { progress, submitDaily } = useProgress();
  const alreadyDone = progress.dailyAttempts.some((a) => a.date === date);

  const [index, setIndex] = React.useState(0);
  const [clueIndex, setClueIndex] = React.useState(0);
  const [selected, setSelected] = React.useState<number | null>(null);
  const [state, setState] = React.useState<AnswerState>("idle");
  const [finished, setFinished] = React.useState(alreadyDone);
  const [answers, setAnswers] = React.useState<number[]>([]);

  const question = questions[index];

  React.useEffect(() => {
    if (!alreadyDone) {
      track({ name: "daily_start", date });
    }
  }, [date, alreadyDone]);

  if (!question || questions.length === 0) {
    return (
      <p className="text-muted text-sm">No daily questions available today.</p>
    );
  }

  const submitAnswer = (optionIndex: number) => {
    if (state !== "idle" || finished) return;
    setSelected(optionIndex);
    const correct = optionIndex === question.correctIndex;
    setState(correct ? "correct" : "wrong");
    setAnswers((prev) => [...prev, optionIndex]);
  };

  const next = () => {
    if (index + 1 >= questions.length) {
      const totalCorrect = answers.reduce(
        (sum, ans, i) => sum + (ans === questions[i].correctIndex ? 1 : 0),
        0,
      );
      submitDaily({
        questionIds: questions.map((q) => q.id),
        correct: totalCorrect,
        total: questions.length,
        characterIds: questions.flatMap((q) => q.characterIds),
      });
      setFinished(true);
      return;
    }
    setIndex((i) => i + 1);
    setSelected(null);
    setState("idle");
    setClueIndex(0);
  };

  const kindLabel: Record<string, string> = {
    WHO_AM_I: "Who am I?",
    TRUE_OR_FALSE: "True or false",
    WHO_IS_CONNECTED: "Who is connected?",
    TIMELINE: "Timeline",
    FACTION: "Faction",
    CANON_OR_NOT: "Canon or not?",
  };

  if (finished || alreadyDone) {
    const attempt = progress.dailyAttempts.find((a) => a.date === date);
    return (
      <div className="panel p-5 sm:p-6">
        <div className="flex items-center gap-2">
          <Flame className="text-gold size-5" aria-hidden />
          <span className="text-eyebrow text-gold">
            {progress.streak} day streak
          </span>
        </div>
        <h3 className="font-display text-parchment mt-4 text-2xl">
          {alreadyDone && !attempt ? "Daily complete" : "Well read."}
        </h3>
        <p className="text-muted mt-2 text-sm">
          {attempt
            ? `${attempt.correctCount}/${attempt.totalCount} correct today`
            : "Come back tomorrow for a fresh set."}
          {attempt?.perfect ? " · Perfect run." : ""}
        </p>
      </div>
    );
  }

  return (
    <div className="panel p-5 sm:p-6">
      <div className="flex items-center justify-between gap-3">
        <span className="text-eyebrow text-gold flex items-center gap-1.5">
          <Flame className="size-3.5" aria-hidden />
          {progress.streak} day streak
        </span>
        <span className="text-eyebrow text-muted-dim">
          {index + 1} / {questions.length}
        </span>
      </div>

      <p className="text-eyebrow text-muted mt-5">{kindLabel[question.kind]}</p>

      {question.kind === "WHO_AM_I" && question.clues.length > 0 ? (
        <div className="mt-4 space-y-2">
          {question.clues.slice(0, clueIndex + 1).map((clue, i) => (
            <p
              key={i}
              className="text-parchment/90 border-l-2 border-gold/40 pl-3 text-sm leading-relaxed italic"
            >
              &ldquo;{clue}&rdquo;
            </p>
          ))}
          {clueIndex < question.clues.length - 1 && state === "idle" ? (
            <button
              type="button"
              onClick={() => setClueIndex((c) => c + 1)}
              className="text-eyebrow text-gold/80 hover:text-gold mt-1 transition-colors"
            >
              Reveal next clue
            </button>
          ) : null}
        </div>
      ) : (
        <p className="text-parchment mt-4 text-base leading-relaxed">
          {question.prompt}
        </p>
      )}

      <ul className="mt-6 grid gap-2 sm:grid-cols-2" role="listbox" aria-label="Answers">
        {question.options.map((option, optionIndex) => {
          const isSelected = selected === optionIndex;
          const isCorrect = optionIndex === question.correctIndex;
          let variant = "border-line bg-white/[0.02] hover:border-line-strong";
          if (state !== "idle" && isSelected && isCorrect) {
            variant = "border-[#7FB98A]/50 bg-[#7FB98A]/10";
          } else if (state !== "idle" && isSelected && !isCorrect) {
            variant = "border-[#A85059]/50 bg-[#A85059]/10";
          } else if (state !== "idle" && isCorrect) {
            variant = "border-[#7FB98A]/35 bg-[#7FB98A]/8";
          }

          return (
            <li key={option}>
              <button
                type="button"
                role="option"
                aria-selected={isSelected}
                disabled={state !== "idle"}
                onClick={() => submitAnswer(optionIndex)}
                className={cn(
                  "flex w-full items-center justify-between gap-2 rounded-xl border px-4 py-3 text-left text-sm transition-colors",
                  variant,
                )}
              >
                <span className="text-parchment">{option}</span>
                {state !== "idle" && isCorrect ? (
                  <Check className="size-4 text-[#7FB98A]" aria-hidden />
                ) : null}
                {state !== "idle" && isSelected && !isCorrect ? (
                  <X className="size-4 text-[#A85059]" aria-hidden />
                ) : null}
              </button>
            </li>
          );
        })}
      </ul>

      {state !== "idle" ? (
        <div className="mt-6 border-t border-line pt-5">
          <p
            className={cn(
              "font-display text-xl",
              state === "correct" ? "text-[#7FB98A]" : "text-parchment",
            )}
          >
            {state === "correct" ? "Excellent." : "Not quite."}
          </p>
          <p className="text-muted mt-2 text-sm leading-relaxed">
            {question.explanation}
          </p>
          <p className="text-eyebrow text-gold mt-3">+25 Lore XP on completion</p>
          <Button variant="primary" className="mt-4" onClick={next}>
            {index + 1 >= questions.length ? "Finish daily" : "Next question"}
          </Button>
        </div>
      ) : null}
    </div>
  );
}
