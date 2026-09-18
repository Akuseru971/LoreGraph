import { ChampionHeroSkeleton, GraphSkeleton } from "@/components/ui/screen-skeletons";

export default function ChampionLoading() {
  return (
    <div>
      <ChampionHeroSkeleton />
      <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6">
        <GraphSkeleton className="min-h-[320px]" />
      </div>
    </div>
  );
}
