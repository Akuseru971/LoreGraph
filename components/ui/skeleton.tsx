import { cn } from "@/lib/utils";

export function Skeleton({ className }: { className?: string }) {
  return <div className={cn("skeleton", className)} aria-hidden />;
}

export function CardSkeleton() {
  return (
    <div className="panel-flat overflow-hidden">
      <Skeleton className="aspect-[3/4] w-full rounded-none" />
      <div className="space-y-2 p-4">
        <Skeleton className="h-4 w-2/3" />
        <Skeleton className="h-3 w-1/2" />
      </div>
    </div>
  );
}

export function GraphSkeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "panel-flat relative flex items-center justify-center overflow-hidden",
        className,
      )}
    >
      <div className="absolute inset-0 opacity-40">
        <Skeleton className="absolute top-1/2 left-1/2 size-24 -translate-x-1/2 -translate-y-1/2 rounded-full" />
        <Skeleton className="absolute top-[22%] left-[26%] size-12 rounded-full" />
        <Skeleton className="absolute top-[18%] right-[22%] size-10 rounded-full" />
        <Skeleton className="absolute bottom-[20%] left-[20%] size-11 rounded-full" />
        <Skeleton className="absolute right-[26%] bottom-[24%] size-9 rounded-full" />
      </div>
      <p className="text-eyebrow text-muted relative">Assembling the graph…</p>
    </div>
  );
}
