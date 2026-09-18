import { Skeleton } from "./skeleton";

export function ChampionHeroSkeleton() {
  return (
    <div className="relative overflow-hidden">
      <Skeleton className="absolute inset-0 rounded-none" />
      <div className="relative mx-auto w-full max-w-6xl px-4 pt-16 pb-10 sm:px-6">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl space-y-4">
            <div className="flex gap-2">
              <Skeleton className="h-6 w-20 rounded-full" />
              <Skeleton className="h-6 w-24 rounded-full" />
            </div>
            <Skeleton className="h-16 w-3/4 max-w-md" />
            <Skeleton className="h-6 w-1/2" />
            <Skeleton className="h-20 w-full max-w-xl" />
            <div className="flex gap-2 pt-2">
              <Skeleton className="h-11 w-44 rounded-full" />
              <Skeleton className="h-11 w-36 rounded-full" />
            </div>
          </div>
          <Skeleton className="hidden aspect-[3/4] w-52 rounded-[var(--radius-card)] lg:block" />
        </div>
      </div>
    </div>
  );
}

export function GraphSkeleton({ className }: { className?: string }) {
  return (
    <div
      className={`relative flex min-h-[280px] items-center justify-center overflow-hidden rounded-[var(--radius-card)] border border-line bg-surface/40 sm:min-h-[360px] ${className ?? ""}`}
    >
      <div className="absolute inset-0 opacity-30">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="absolute"
            style={{
              left: `${15 + (i % 4) * 22}%`,
              top: `${20 + Math.floor(i / 4) * 35}%`,
            }}
          >
            <Skeleton className="size-12 rounded-full" />
          </div>
        ))}
      </div>
      <Skeleton className="h-4 w-32 rounded-full" />
    </div>
  );
}

export function ConnectResultSkeleton() {
  return (
    <div className="mt-10 space-y-6">
      <Skeleton className="h-8 w-48" />
      <GraphSkeleton />
      <div className="space-y-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={i} className="h-24 w-full rounded-[var(--radius-card)]" />
        ))}
      </div>
    </div>
  );
}

export function DailySkeleton() {
  return (
    <div className="panel space-y-4 p-6">
      <div className="flex justify-between">
        <Skeleton className="h-5 w-28" />
        <Skeleton className="h-5 w-16" />
      </div>
      <Skeleton className="h-6 w-24" />
      <Skeleton className="h-16 w-full" />
      <div className="grid gap-2 sm:grid-cols-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-12 rounded-lg" />
        ))}
      </div>
    </div>
  );
}

export function SearchSkeleton() {
  return (
    <div className="space-y-2 p-2">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="flex items-center gap-3 px-2 py-2">
          <Skeleton className="size-9 rounded-full" />
          <div className="flex-1 space-y-1.5">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-3 w-48" />
          </div>
        </div>
      ))}
    </div>
  );
}
