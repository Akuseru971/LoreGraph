const rawUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim() ?? "";
const rawKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim() ?? "";

function isValidSupabaseUrl(url: string): boolean {
  if (!url) return false;
  try {
    const parsed = new URL(url);
    return parsed.protocol === "https:" || parsed.protocol === "http:";
  } catch {
    return false;
  }
}

/** True only when URL + anon key look like a real Supabase project. */
export function isSupabaseEnvConfigured(
  url = rawUrl,
  key = rawKey,
): boolean {
  return isValidSupabaseUrl(url) && key.length > 20;
}

export const SUPABASE_URL = isSupabaseEnvConfigured() ? rawUrl : "";
export const SUPABASE_ANON_KEY = isSupabaseEnvConfigured() ? rawKey : "";

/**
 * LoreGraph runs fully without Supabase (demo mode: seed data + localStorage).
 * Everything that touches persistence checks this first.
 */
export const isSupabaseConfigured = isSupabaseEnvConfigured();
