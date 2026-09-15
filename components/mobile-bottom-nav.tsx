"use client";

import { Compass, GitFork, Search, Sparkles } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSearchDialog } from "@/components/providers";
import { cn } from "@/lib/utils";

const ITEMS = [
  { href: "/", label: "Discover", icon: Compass },
  { href: "/connect", label: "Connect", icon: GitFork },
  { href: "/me", label: "Daily", icon: Sparkles },
] as const;

export function MobileBottomNav() {
  const pathname = usePathname();
  const { openSearch } = useSearchDialog();

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <nav
      aria-label="Primary mobile"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-ink/92 pb-[env(safe-area-inset-bottom)] backdrop-blur-xl md:hidden"
    >
      <div className="mx-auto grid max-w-md grid-cols-4">
        {ITEMS.map((item) => {
          const active = isActive(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={active ? "page" : undefined}
              className={cn(
                "relative flex flex-col items-center gap-1 py-2.5 transition-colors",
                active ? "text-gold" : "text-muted",
              )}
            >
              {active ? (
                <span
                  aria-hidden
                  className="bg-gold absolute top-0 h-[2px] w-8 rounded-full"
                />
              ) : null}
              <item.icon className="size-5" aria-hidden />
              <span className="text-[0.625rem] font-medium tracking-wide uppercase">
                {item.label}
              </span>
            </Link>
          );
        })}
        <button
          type="button"
          onClick={() => openSearch("click")}
          className="text-muted flex flex-col items-center gap-1 py-2.5"
        >
          <Search className="size-5" aria-hidden />
          <span className="text-[0.625rem] font-medium tracking-wide uppercase">
            Search
          </span>
        </button>
      </div>
    </nav>
  );
}
