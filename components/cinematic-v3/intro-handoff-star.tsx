"use client";

/**
 * Bridges intro hero-star zoom to the first LoreLight frame — no black cut.
 */
export function IntroHandoffStar({
  progress,
  heroX,
  heroY,
  intensity = 1,
}: {
  progress: number;
  heroX: number;
  heroY: number;
  intensity?: number;
}) {
  if (progress <= 0) return null;
  const opacity = progress < 0.5 ? 1 : 1 - (progress - 0.5) / 0.5;
  const scale = 1 + (1 - progress) * 0.8;
  const cx = heroX * 100;
  const cy = heroY * 100;

  return (
    <div
      className="pointer-events-none absolute inset-0 z-[58] overflow-hidden"
      style={{ opacity }}
      aria-hidden
    >
      <div
        className="absolute"
        style={{
          left: `${cx}%`,
          top: `${cy}%`,
          transform: `translate(-50%, -50%) scale(${scale})`,
        }}
      >
        <div
          className="absolute rounded-full"
          style={{
            width: 120 * intensity,
            height: 120 * intensity,
            left: -60 * intensity,
            top: -60 * intensity,
            background:
              "radial-gradient(circle, rgba(255,255,255,0.95) 0%, rgba(255,230,180,0.5) 25%, rgba(255,180,100,0.15) 50%, transparent 70%)",
            filter: "blur(2px)",
          }}
        />
        <div
          className="absolute rounded-full bg-white"
          style={{
            width: 8,
            height: 8,
            left: -4,
            top: -4,
            boxShadow: `0 0 ${20 + intensity * 16}px rgba(255,240,210,0.9), 0 0 40px rgba(255,200,120,0.4)`,
          }}
        />
        <div
          className="absolute"
          style={{
            width: 80,
            height: 2,
            left: -40,
            top: -1,
            background:
              "linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent)",
          }}
        />
      </div>
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(circle at ${cx}% ${cy}%, rgba(255,235,200,${0.25 * (1 - progress)}) 0%, transparent 45%)`,
        }}
      />
    </div>
  );
}
