export default function ChampionLoading() {
  return (
    <div className="animate-pulse">
      <div className="skeleton h-[min(52vh,420px)] w-full rounded-none" />
      <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6">
        <div className="skeleton h-8 w-48 rounded-lg" />
        <div className="skeleton mt-6 h-40 w-full rounded-[var(--radius-card)]" />
      </div>
    </div>
  );
}
