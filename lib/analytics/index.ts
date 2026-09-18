/**
 * Provider-agnostic analytics.
 *
 * Nothing here knows about a vendor. Register one or more sinks at startup
 * (see components/providers.tsx) and every call fans out to all of them. The
 * event names below are the ones the product metrics depend on:
 * connections per session, graph depth, champion pages per session, connect
 * searches per user, share rate, retention, daily and story completion.
 */

export type AnalyticsEvent =
  | { name: "page_view"; path: string; title?: string }
  | { name: "champion_view"; slug: string; region: string; source?: string }
  | { name: "graph_open"; characterSlug: string }
  | { name: "relationship_open"; relationshipId: string; from: string; to: string }
  | { name: "graph_node_click"; nodeId: string; nodeType: string; depth: number }
  | {
      name: "connection_search";
      from: string;
      to: string;
      strategy: string;
      hops: number | null;
      found: boolean;
    }
  | {
      name: "connection_complete";
      from: string;
      to: string;
      strategy: string;
      hops: number;
      found: boolean;
    }
  | { name: "connection_share"; from: string; to: string; format: string }
  | { name: "story_start"; slug: string }
  | { name: "story_complete"; slug: string; chapters: number }
  | { name: "daily_start"; date: string }
  | { name: "daily_complete"; date: string; correct: number; total: number }
  | { name: "search_open"; via: "keyboard" | "click" }
  | { name: "search_result_click"; query: string; resultId: string }
  | { name: "region_filter"; region: string }
  | { name: "signup"; method: string }
  | { name: "return_visit"; daysSinceFirst: number }
  | { name: "xp_awarded"; amount: number; reason: string }
  | {
      name: "cinematic_start";
      journeyType: string;
      sourceChampion: string;
      targetChampion: string;
      sceneCount: number;
      completionPercent: number;
    }
  | {
      name: "cinematic_complete";
      journeyType: string;
      sourceChampion: string;
      targetChampion: string;
      sceneCount: number;
      completionPercent: number;
    }
  | {
      name: "cinematic_scene_view";
      journeyType: string;
      sourceChampion: string;
      targetChampion: string;
      sceneCount: number;
      completionPercent: number;
    }
  | {
      name: "cinematic_skip";
      journeyType: string;
      sourceChampion: string;
      targetChampion: string;
      sceneCount: number;
      completionPercent: number;
    }
  | {
      name: "cinematic_replay";
      journeyType: string;
      sourceChampion: string;
      targetChampion: string;
      sceneCount: number;
      completionPercent: number;
    }
  | {
      name: "cinematic_recording_mode";
      journeyType: string;
      sourceChampion: string;
      targetChampion: string;
      sceneCount: number;
      completionPercent: number;
    }
  | {
      name: "cinematic_format_select";
      journeyType: string;
      sourceChampion: string;
      targetChampion: string;
      sceneCount: number;
      completionPercent: number;
    }
  | {
      name: "cinematic_share";
      journeyType: string;
      sourceChampion: string;
      targetChampion: string;
      sceneCount: number;
      completionPercent: number;
    }
  | { name: "journey_started"; journeyId: string; journeyKind: string; sceneCount: number }
  | {
      name: "journey_scene_viewed";
      journeyId: string;
      sceneIndex: number;
      sceneType: string;
    }
  | { name: "journey_completed"; journeyId: string; sceneCount: number }
  | { name: "journey_exited"; journeyId: string; sceneIndex: number }
  | { name: "journey_node_explored"; journeyId: string; entityId: string }
  | { name: "journey_replayed"; journeyId: string }
  | { name: "journey_sound_enabled"; journeyId: string }
  | {
      name: "connection_journey_started";
      journeyId: string;
      from: string;
      to: string;
    };

export type AnalyticsSink = (event: AnalyticsEvent, context: EventContext) => void;

export interface EventContext {
  timestamp: number;
  sessionId: string;
  path: string;
  universe: string;
}

const sinks: AnalyticsSink[] = [];
let sessionId = "";

function getSessionId(): string {
  if (sessionId) return sessionId;
  if (typeof window === "undefined") return "server";
  const key = "loregraph.session";
  const existing = window.sessionStorage.getItem(key);
  if (existing) {
    sessionId = existing;
    return sessionId;
  }
  sessionId =
    typeof crypto !== "undefined" && "randomUUID" in crypto
      ? crypto.randomUUID()
      : `s-${Date.now()}-${Math.random().toString(36).slice(2)}`;
  window.sessionStorage.setItem(key, sessionId);
  return sessionId;
}

export function registerSink(sink: AnalyticsSink): () => void {
  sinks.push(sink);
  return () => {
    const index = sinks.indexOf(sink);
    if (index >= 0) sinks.splice(index, 1);
  };
}

export function track(event: AnalyticsEvent): void {
  const context: EventContext = {
    timestamp: Date.now(),
    sessionId: getSessionId(),
    path: typeof window === "undefined" ? "" : window.location.pathname,
    universe: "runeterra",
  };
  for (const sink of sinks) {
    try {
      sink(event, context);
    } catch {
      // Analytics must never break the product.
    }
  }
}

/** Dev sink: prints events so the funnel is inspectable without a vendor. */
export const consoleSink: AnalyticsSink = (event, context) => {
  if (process.env.NODE_ENV === "production") return;
  console.debug(`[analytics] ${event.name}`, { ...event, path: context.path });
};

/**
 * Buffers events in memory so a provider script that loads late (or a future
 * server-side ingest endpoint) can drain them.
 */
const buffer: Array<{ event: AnalyticsEvent; context: EventContext }> = [];
export const bufferSink: AnalyticsSink = (event, context) => {
  buffer.push({ event, context });
  if (buffer.length > 200) buffer.shift();
};
export function drainBuffer() {
  return buffer.splice(0, buffer.length);
}
