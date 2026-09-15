import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Stable 32-bit hash — used for deterministic visuals and daily rotation. */
export function hashString(input: string): number {
  let hash = 2166136261;
  for (let i = 0; i < input.length; i++) {
    hash ^= input.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return Math.abs(hash);
}

export function todayKey(date: Date = new Date()): string {
  return date.toISOString().slice(0, 10);
}

export function daysBetween(a: string, b: string): number {
  const first = new Date(`${a}T00:00:00Z`).getTime();
  const second = new Date(`${b}T00:00:00Z`).getTime();
  return Math.round((second - first) / 86_400_000);
}

export function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

/** Deterministic shuffle so server and client agree on ordering. */
export function seededShuffle<T>(items: T[], seed: string): T[] {
  const result = [...items];
  let state = hashString(seed) || 1;
  const next = () => {
    state = (state * 1664525 + 1013904223) % 4294967296;
    return state / 4294967296;
  };
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(next() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

export function hexToRgba(hex: string, alpha: number): string {
  const normalised = hex.replace("#", "");
  const full =
    normalised.length === 3
      ? normalised
          .split("")
          .map((c) => c + c)
          .join("")
      : normalised;
  const r = parseInt(full.slice(0, 2), 16);
  const g = parseInt(full.slice(2, 4), 16);
  const b = parseInt(full.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

export function initials(name: string): string {
  const cleaned = name.replace(/['’]/g, "");
  const parts = cleaned.split(/[\s-]+/).filter(Boolean);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export function pluralise(count: number, singular: string, plural?: string): string {
  return `${count} ${count === 1 ? singular : (plural ?? `${singular}s`)}`;
}

export function formatPercent(value: number): string {
  return `${Math.round(value)}%`;
}
