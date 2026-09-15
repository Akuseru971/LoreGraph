/** Curated pairs that produce interesting connection stories. */
export const INSPIRATION_PAIRS: Array<{ from: string; to: string; label?: string }> = [
  { from: "aatrox", to: "pantheon" },
  { from: "jinx", to: "swain" },
  { from: "yasuo", to: "viego" },
  { from: "lux", to: "mordekaiser" },
  { from: "yone", to: "aatrox" },
  { from: "vi", to: "jinx" },
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
