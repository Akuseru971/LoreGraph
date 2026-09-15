"use client";

import type { User } from "@supabase/supabase-js";
import * as React from "react";
import { track } from "@/lib/analytics";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";
import { isSupabaseConfigured } from "@/lib/supabase/config";

interface SessionContextValue {
  user: User | null;
  signedIn: boolean;
  /** False when the app is running in demo mode (no Supabase env vars). */
  authAvailable: boolean;
  loading: boolean;
  signInWithEmail: (email: string) => Promise<{ error?: string }>;
  signInWithGoogle: () => Promise<{ error?: string }>;
  signOut: () => Promise<void>;
}

const SessionContext = React.createContext<SessionContextValue | null>(null);

export function SessionProvider({
  children,
  initialUser = null,
}: {
  children: React.ReactNode;
  initialUser?: User | null;
}) {
  const [user, setUser] = React.useState<User | null>(initialUser);
  const [loading, setLoading] = React.useState(isSupabaseConfigured);

  React.useEffect(() => {
    const supabase = getSupabaseBrowserClient();
    if (!supabase) return;
    void supabase.auth.getUser().then(({ data }) => {
      setUser(data.user ?? null);
      setLoading(false);
    });
    const { data } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
      if (event === "SIGNED_IN") track({ name: "signup", method: "supabase" });
    });
    return () => data.subscription.unsubscribe();
  }, []);

  const signInWithEmail = React.useCallback(async (email: string) => {
    const supabase = getSupabaseBrowserClient();
    if (!supabase) return { error: "Accounts are not configured in this build." };
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: `${window.location.origin}/auth/callback` },
    });
    return error ? { error: error.message } : {};
  }, []);

  const signInWithGoogle = React.useCallback(async () => {
    const supabase = getSupabaseBrowserClient();
    if (!supabase) return { error: "Accounts are not configured in this build." };
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${window.location.origin}/auth/callback` },
    });
    return error ? { error: error.message } : {};
  }, []);

  const signOut = React.useCallback(async () => {
    const supabase = getSupabaseBrowserClient();
    if (!supabase) return;
    await supabase.auth.signOut();
    setUser(null);
  }, []);

  const value = React.useMemo<SessionContextValue>(
    () => ({
      user,
      signedIn: user !== null,
      authAvailable: isSupabaseConfigured,
      loading,
      signInWithEmail,
      signInWithGoogle,
      signOut,
    }),
    [user, loading, signInWithEmail, signInWithGoogle, signOut],
  );

  return <SessionContext.Provider value={value}>{children}</SessionContext.Provider>;
}

export function useSession(): SessionContextValue {
  const context = React.useContext(SessionContext);
  if (!context) throw new Error("useSession must be used inside <SessionProvider>");
  return context;
}
