"use client";

import { X } from "lucide-react";
import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const STORAGE_KEY = "loregraph.onboarding.v1";

type HintId = "graphExplore" | "tryConnect";

interface HintState {
  graphExplore: boolean;
  tryConnect: boolean;
}

function readState(): HintState {
  if (typeof window === "undefined") {
    return { graphExplore: true, tryConnect: true };
  }
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return { graphExplore: false, tryConnect: false };
    return JSON.parse(raw) as HintState;
  } catch {
    return { graphExplore: false, tryConnect: false };
  }
}

function writeState(state: HintState) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // ignore
  }
}

export function useOnboardingHint(id: HintId) {
  const [dismissed, setDismissed] = React.useState(() => readState()[id]);

  const dismiss = React.useCallback(() => {
    const next = { ...readState(), [id]: true };
    writeState(next);
    setDismissed(true);
  }, [id]);

  return { show: !dismissed, dismiss };
}

export function OnboardingHint({
  id,
  title,
  body,
  className,
  action,
}: {
  id: HintId;
  title: string;
  body: string;
  className?: string;
  action?: React.ReactNode;
}) {
  const { show, dismiss } = useOnboardingHint(id);
  if (!show) return null;

  return (
    <div
      role="status"
      className={cn(
        "relative rounded-[var(--radius-card)] border border-gold/35 bg-gold/8 p-4 pr-10",
        className,
      )}
    >
      <button
        type="button"
        onClick={dismiss}
        aria-label="Dismiss hint"
        className="text-muted hover:text-parchment absolute top-3 right-3 rounded p-1 transition-colors"
      >
        <X className="size-4" aria-hidden />
      </button>
      <p className="text-eyebrow text-gold">{title}</p>
      <p className="text-muted mt-1.5 text-sm leading-relaxed">{body}</p>
      {action ? <div className="mt-3">{action}</div> : null}
    </div>
  );
}

export function TryConnectHint() {
  return (
    <OnboardingHint
      id="tryConnect"
      title="Want to know how two characters connect?"
      body="Pick any two champions and LoreGraph maps the story between them."
      action={
        <Button variant="secondary" size="sm" asChild>
          <Link href="/connect">Try Connect</Link>
        </Button>
      }
    />
  );
}
