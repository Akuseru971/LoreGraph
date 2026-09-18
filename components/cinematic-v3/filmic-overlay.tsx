"use client";

export function FilmicOverlay({
  enabled = true,
  vignette = 0.35,
  grain = 0.04,
}: {
  enabled?: boolean;
  vignette?: number;
  grain?: number;
}) {
  if (!enabled) return null;

  return (
    <div
      className="pointer-events-none absolute inset-0 z-20"
      style={{
        background: `radial-gradient(ellipse at center, transparent 45%, rgba(0,0,0,${vignette}) 100%)`,
        mixBlendMode: "multiply",
      }}
      aria-hidden
    >
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E\")",
          opacity: grain,
        }}
      />
    </div>
  );
}
