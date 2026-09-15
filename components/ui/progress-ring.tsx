import { cn } from "@/lib/utils";

export function ProgressRing({
  value,
  size = 44,
  thickness = 3,
  color = "#C9A96E",
  className,
  children,
  label,
}: {
  value: number;
  size?: number;
  thickness?: number;
  color?: string;
  className?: string;
  children?: React.ReactNode;
  label?: string;
}) {
  const clamped = Math.max(0, Math.min(100, value));
  const radius = (size - thickness) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - clamped / 100);

  return (
    <div
      className={cn("relative inline-flex items-center justify-center", className)}
      style={{ width: size, height: size }}
      role="img"
      aria-label={label ?? `${Math.round(clamped)} percent`}
    >
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="rgba(245,242,232,0.1)"
          strokeWidth={thickness}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={thickness}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{ transition: "stroke-dashoffset 700ms cubic-bezier(0.16,1,0.3,1)" }}
        />
      </svg>
      <span className="absolute inset-0 flex items-center justify-center">
        {children}
      </span>
    </div>
  );
}

/** Slim horizontal meter used for Lore DNA and knowledge bars. */
export function ProgressMeter({
  value,
  color = "#C9A96E",
  className,
  height = 3,
}: {
  value: number;
  color?: string;
  className?: string;
  height?: number;
}) {
  const clamped = Math.max(0, Math.min(100, value));
  return (
    <div
      className={cn("w-full overflow-hidden rounded-full bg-white/8", className)}
      style={{ height }}
      role="presentation"
    >
      <div
        className="h-full rounded-full"
        style={{
          width: `${clamped}%`,
          background: `linear-gradient(90deg, ${color}66, ${color})`,
          transition: "width 900ms cubic-bezier(0.16,1,0.3,1)",
        }}
      />
    </div>
  );
}
