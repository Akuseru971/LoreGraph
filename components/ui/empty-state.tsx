import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
  className,
}: {
  icon?: LucideIcon;
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-3 px-6 py-14 text-center",
        className,
      )}
    >
      {Icon ? (
        <span className="mb-1 rounded-full border border-line bg-white/[0.03] p-3">
          <Icon className="text-muted size-5" />
        </span>
      ) : null}
      <p className="font-display text-parchment text-xl">{title}</p>
      {description ? (
        <p className="text-muted max-w-sm text-sm leading-relaxed">{description}</p>
      ) : null}
      {action ? <div className="mt-2">{action}</div> : null}
    </div>
  );
}
