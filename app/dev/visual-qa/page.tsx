import Image from "next/image";
import { notFound } from "next/navigation";
import { characters } from "@/data";
import { getManifestIndex, getChampionAssets, championArtPosition } from "@/lib/assets";

const PRIORITY_SLUGS = [
  "aatrox", "kaisa", "pantheon", "yasuo", "yone", "jinx", "vi", "viego",
  "thresh", "swain", "leblanc", "ambessa", "mel", "yunara", "aurelion-sol", "lux", "sylas",
];

export default function VisualQaPage() {
  if (process.env.NODE_ENV === "production") notFound();

  const index = getManifestIndex();
  const priority = characters.filter((c) => PRIORITY_SLUGS.includes(c.slug));
  const stats = index?.stats;

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <h1 className="text-monument text-4xl">Visual QA — Asset Pack v1</h1>
      <p className="text-muted mt-2 text-sm">
        Dev-only review queue. Champions, crops, focal points, and source provenance.
      </p>

      {stats ? (
        <dl className="mt-6 grid gap-3 sm:grid-cols-4">
          <Stat label="Manifest rows" value={stats.manifestRows} />
          <Stat label="Masters" value={stats.mastersDownloaded} />
          <Stat label="Variants" value={stats.variantsGenerated} />
          <Stat label="QA pending" value={stats.visualQaPending} />
        </dl>
      ) : null}

      <section className="mt-10">
        <h2 className="text-eyebrow text-gold">Priority champions</h2>
        <div className="mt-4 space-y-12">
          {priority.map((champ) => {
            const assets = getChampionAssets(champ.slug);
            const entry = index?.champions[champ.slug];
            return (
              <article
                key={champ.id}
                className="rounded-[var(--radius-card)] border border-line bg-surface p-5"
              >
                <header className="mb-4 flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="text-2xl font-medium">{champ.name}</h3>
                  <span className="text-eyebrow text-muted">
                    QA: {entry?.qaStatus ?? "unknown"} · local: {assets.hasLocal ? "yes" : "no"}
                  </span>
                </header>

                <div className="grid gap-4 lg:grid-cols-5">
                  <CropPreview label="Portrait" src={assets.portraitUrl} position={championArtPosition(champ.slug, "MOBILE")} aspect="aspect-square" />
                  <CropPreview label="Card 4:5" src={assets.cardUrl} position={championArtPosition(champ.slug, "CARD")} aspect="aspect-[4/5]" />
                  <CropPreview label="Hero 16:9" src={assets.heroUrl} position={championArtPosition(champ.slug, "HERO")} aspect="aspect-video" />
                  <CropPreview label="Cinematic 9:16" src={assets.cinematicUrl} position={championArtPosition(champ.slug, "CINEMATIC")} aspect="aspect-[9/16]" />
                  <div className="text-xs text-muted space-y-1">
                    <p>Source: {assets.sourceUrl ?? "CDN fallback"}</p>
                    <p>Desktop focal: {entry ? `${entry.desktopFocal.x}, ${entry.desktopFocal.y}` : "—"}</p>
                    <p>Mobile focal: {entry ? `${entry.mobileFocal.x}, ${entry.mobileFocal.y}` : "—"}</p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {index && Object.keys(index.events).length > 0 ? (
        <section className="mt-14">
          <h2 className="text-eyebrow text-gold">Events</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Object.entries(index.events).map(([slug, meta]) => (
              <article key={slug} className="rounded-xl border border-line overflow-hidden">
                {meta.publicPath ? (
                  <div className="relative aspect-video">
                    <Image src={meta.publicPath} alt={meta.name} fill className="object-cover" sizes="33vw" />
                  </div>
                ) : (
                  <div className="aspect-video bg-ink flex items-center justify-center text-muted text-sm">No image</div>
                )}
                <div className="p-3 text-sm">
                  <p className="font-medium">{meta.name}</p>
                  <p className="text-muted text-xs mt-1">{meta.qaStatus}</p>
                </div>
              </article>
            ))}
          </div>
        </section>
      ) : null}
    </main>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-xl border border-line px-4 py-3">
      <dt className="text-eyebrow text-muted">{label}</dt>
      <dd className="text-2xl tabular-nums mt-1">{value}</dd>
    </div>
  );
}

function CropPreview({
  label,
  src,
  position,
  aspect,
}: {
  label: string;
  src: string;
  position: string;
  aspect: string;
}) {
  return (
    <div>
      <p className="text-eyebrow text-muted mb-2">{label}</p>
      <div className={`relative ${aspect} overflow-hidden rounded-lg border border-line`}>
        <Image
          src={src}
          alt={label}
          fill
          className="object-cover"
          style={{ objectPosition: position }}
          sizes="200px"
        />
      </div>
      <p className="text-[10px] text-muted mt-1 truncate">{position}</p>
    </div>
  );
}
