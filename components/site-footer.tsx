import Link from "next/link";
import { LoreGraphMark } from "@/components/brand";
import { activeUniverse } from "@/data";

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-line">
      <div className="mx-auto w-full max-w-[1400px] px-4 py-12 sm:px-6">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <Link href="/" className="flex items-center gap-2">
              <LoreGraphMark className="text-gold size-5" />
              <span className="font-display text-parchment text-base">LoreGraph</span>
            </Link>
            <p className="text-muted mt-3 text-sm leading-relaxed">
              Explore. Connect. Understand. An interactive map of fictional
              universes, starting with {activeUniverse.name}.
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-3">
            <nav aria-label="Product">
              <h2 className="text-eyebrow text-muted mb-3">Product</h2>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/" className="text-muted hover:text-parchment">
                    Discover
                  </Link>
                </li>
                <li>
                  <Link href="/connect" className="text-muted hover:text-parchment">
                    Connect
                  </Link>
                </li>
                <li>
                  <Link href="/me" className="text-muted hover:text-parchment">
                    Daily Lore
                  </Link>
                </li>
              </ul>
            </nav>

            <nav aria-label="Universes">
              <h2 className="text-eyebrow text-muted mb-3">Universes</h2>
              <ul className="space-y-2 text-sm">
                <li className="text-parchment flex items-center gap-2">
                  {activeUniverse.displayName}
                  <span className="text-eyebrow text-gold/70 rounded-full border border-gold/30 px-1.5 py-0.5">
                    Live
                  </span>
                </li>
                <li className="text-muted">More coming</li>
              </ul>
            </nav>

            <div>
              <h2 className="text-eyebrow text-muted mb-3">Data</h2>
              <p className="text-muted text-sm leading-relaxed">
                Lore summaries are editorial and versioned. Entries flagged
                <span className="text-parchment"> ambiguous</span> or
                <span className="text-parchment"> old lore</span> are labelled
                rather than hidden.
              </p>
            </div>
          </div>
        </div>

        <div className="hairline my-8" />

        <div
          id="legal"
          className="text-muted flex flex-col gap-3 text-xs leading-relaxed"
        >
          <p>
            LoreGraph is an independent fan project. It is not endorsed by Riot
            Games and does not reflect the views or opinions of Riot Games or
            anyone officially involved in producing or managing Riot Games
            properties. Riot Games and all associated properties are trademarks
            or registered trademarks of Riot Games, Inc.
          </p>
          <p>
            League of Legends and Runeterra are the intellectual property of Riot
            Games, Inc. This project claims no ownership of that material and
            makes no claim of official partnership. Artwork placeholders are
            generated; no third-party images are bundled with this build.
          </p>
          <p className="text-muted-dim">
            © {new Date().getFullYear()} LoreGraph · Built as an independent
            demonstration project.
          </p>
        </div>
      </div>
    </footer>
  );
}
