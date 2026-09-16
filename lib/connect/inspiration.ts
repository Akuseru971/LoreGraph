/** Curated pairs that produce interesting connection stories. */
export const INSPIRATION_PAIRS: Array<{ from: string; to: string; label?: string }> = [
  { from: "aatrox", to: "pantheon" },
  { from: "yasuo", to: "yone" },
  { from: "thresh", to: "senna" },
  { from: "lux", to: "sylas" },
  { from: "jinx", to: "vi" },
  { from: "aatrox", to: "kaisa" },
  { from: "lux", to: "mordekaiser" },
];

export function connectShareUrl(from: string, to: string, base = ""): string {
  return `${base}/connect?from=${from}&to=${to}`;
}

export function parseConnectParams(params: Record<string, string | string[] | undefined>) {
  const pick = (key: string) => {
    const v = params[key];
    return typeof v === "string" ? v : null;
  };
  return {
    a: pick("from") ?? pick("a"),
    b: pick("to") ?? pick("b"),
  };
}
