"use client";

import type { User } from "@supabase/supabase-js";
import * as React from "react";
import { bufferSink, consoleSink, registerSink } from "@/lib/analytics";
import { ProgressProvider } from "./progress-provider";
import { SearchProvider } from "./search-provider";
import { SessionProvider, useSession } from "./session-provider";

function AnalyticsBootstrap() {
  React.useEffect(() => {
    // Sinks are registered here rather than inside lib/analytics so swapping
    // providers is a one-line change and nothing else imports a vendor SDK.
    const unregister = [registerSink(bufferSink), registerSink(consoleSink)];
    return () => unregister.forEach((fn) => fn());
  }, []);
  return null;
}

function ProgressBridge({ children }: { children: React.ReactNode }) {
  const { signedIn } = useSession();
  return <ProgressProvider signedIn={signedIn}>{children}</ProgressProvider>;
}

export function AppProviders({
  children,
  initialUser = null,
}: {
  children: React.ReactNode;
  initialUser?: User | null;
}) {
  return (
    <SessionProvider initialUser={initialUser}>
      <ProgressBridge>
        <SearchProvider>
          <AnalyticsBootstrap />
          {children}
        </SearchProvider>
      </ProgressBridge>
    </SessionProvider>
  );
}

export { useProgress } from "./progress-provider";
export { useSearchDialog } from "./search-provider";
export { useSession } from "./session-provider";
