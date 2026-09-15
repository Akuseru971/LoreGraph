export default function Loading() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6">
      <div className="skeleton h-10 w-64 max-w-full rounded-lg" />
      <div className="skeleton mt-4 h-5 w-96 max-w-full rounded-md" />
      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="skeleton aspect-[4/5] rounded-[var(--radius-card)]"
          />
        ))}
      </div>
    </div>
  );
}
