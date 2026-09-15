import type { UserProgress } from "@/types";
import { emptyProgress, PROGRESS_VERSION } from "@/lib/progress/model";

/**
 * User progress persistence.
 *
 * Demo mode (no Supabase env vars, or signed out) keeps everything in
 * localStorage so the whole product — XP, collection, streak, achievements —
 * works without an account. When Supabase is configured and the visitor is
 * signed in, the same interface writes through to the database.
 */
export interface ProgressRepository {
  readonly kind: "local" | "supabase";
  load(): Promise<UserProgress>;
  save(progress: UserProgress): Promise<void>;
  clear(): Promise<void>;
}

const STORAGE_KEY = "loregraph.progress.v1";

function migrate(raw: unknown): UserProgress {
  const base = emptyProgress();
  if (!raw || typeof raw !== "object") return base;
  const candidate = raw as Partial<UserProgress>;
  return {
    ...base,
    ...candidate,
    version: PROGRESS_VERSION,
    characters: candidate.characters ?? {},
    stories: candidate.stories ?? {},
    relationshipsDiscovered: candidate.relationshipsDiscovered ?? [],
    achievements: candidate.achievements ?? [],
    dailyAttempts: candidate.dailyAttempts ?? [],
    onboarding: { ...base.onboarding, ...(candidate.onboarding ?? {}) },
  };
}

export class LocalProgressRepository implements ProgressRepository {
  readonly kind = "local" as const;

  async load(): Promise<UserProgress> {
    if (typeof window === "undefined") return emptyProgress();
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (!raw) return emptyProgress();
      return migrate(JSON.parse(raw));
    } catch {
      return emptyProgress();
    }
  }

  async save(progress: UserProgress): Promise<void> {
    if (typeof window === "undefined") return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch {
      // Storage disabled (private mode / quota). Progress stays in memory.
    }
  }

  async clear(): Promise<void> {
    if (typeof window === "undefined") return;
    window.localStorage.removeItem(STORAGE_KEY);
  }
}

/**
 * Talks to /api/progress, which owns the Supabase round-trip so the anon key
 * and RLS session stay server-side.
 */
export class SupabaseProgressRepository implements ProgressRepository {
  readonly kind = "supabase" as const;
  private local = new LocalProgressRepository();

  async load(): Promise<UserProgress> {
    try {
      const response = await fetch("/api/progress", { cache: "no-store" });
      if (!response.ok) return this.local.load();
      const body = (await response.json()) as { progress?: unknown };
      if (!body.progress) return this.local.load();
      return migrate(body.progress);
    } catch {
      return this.local.load();
    }
  }

  async save(progress: UserProgress): Promise<void> {
    // Mirror locally so a failed request never loses a session's work.
    await this.local.save(progress);
    try {
      await fetch("/api/progress", {
        method: "PUT",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ progress }),
      });
    } catch {
      // Offline: the local mirror is authoritative until the next successful save.
    }
  }

  async clear(): Promise<void> {
    await this.local.clear();
    try {
      await fetch("/api/progress", { method: "DELETE" });
    } catch {
      // Ignore.
    }
  }
}

export function createProgressRepository(signedIn: boolean): ProgressRepository {
  return signedIn ? new SupabaseProgressRepository() : new LocalProgressRepository();
}
