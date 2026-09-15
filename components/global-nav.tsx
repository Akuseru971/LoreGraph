"use client";

import { LogOut, Search, User as UserIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import * as React from "react";
import { activeUniverse } from "@/data";
import { Wordmark } from "@/components/brand";
import { useProgress, useSearchDialog, useSession } from "@/components/providers";
import { Button } from "@/components/ui/button";
import { levelForXp } from "@/lib/progress/model";
import { cn } from "@/lib/utils";

const LINKS = [
  { href: "/", label: "Discover" },
  { href: "/connect", label: "Connect" },
  { href: "/me", label: "Daily" },
] as const;

export function GlobalNav() {
  const pathname = usePathname();
  const { openSearch } = useSearchDialog();
  const { user, signedIn, authAvailable, signOut } = useSession();
  const { progress } = useProgress();
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const level = levelForXp(progress.xp);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 transition-colors duration-300",
        scrolled
          ? "border-b border-line bg-ink/85 backdrop-blur-xl"
          : "border-b border-transparent",
      )}
    >
      <nav
        aria-label="Primary"
        className="mx-auto flex h-16 w-full max-w-[1400px] items-center gap-4 px-4 sm:px-6"
      >
        <Link href="/" className="shrink-0" aria-label="LoreGraph home">
          <Wordmark />
        </Link>

        <span
          aria-hidden
          className="text-eyebrow text-gold/70 hidden shrink-0 border-l border-line pl-4 lg:block"
        >
          {activeUniverse.displayName}
        </span>

        <div className="hidden flex-1 items-center justify-center gap-1 md:flex">
          {LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={isActive(link.href) ? "page" : undefined}
              className={cn(
                "text-label relative rounded-full px-4 py-2 transition-colors",
                isActive(link.href)
                  ? "text-parchment"
                  : "text-muted hover:text-parchment",
              )}
            >
              {link.label}
              {isActive(link.href) ? (
                <span
                  aria-hidden
                  className="bg-gold absolute inset-x-4 -bottom-0.5 h-[2px] rounded-full"
                />
              ) : null}
            </Link>
          ))}
        </div>

        <div className="ml-auto flex items-center gap-2 md:ml-0">
          <button
            type="button"
            onClick={() => openSearch("click")}
            className="text-muted hover:text-parchment group flex h-9 items-center gap-2 rounded-full border border-line bg-white/[0.03] pr-2 pl-3 transition-colors hover:border-line-strong"
            aria-label="Search Runeterra"
          >
            <Search className="size-4" aria-hidden />
            <span className="hidden text-sm lg:inline">Search</span>
            <kbd className="text-eyebrow hidden rounded border border-line px-1.5 py-1 lg:block">
              ⌘K
            </kbd>
          </button>

          {signedIn ? (
            <div className="flex items-center gap-2">
              <Link
                href="/me"
                className="flex items-center gap-2 rounded-full border border-line bg-white/[0.03] py-1 pr-3 pl-1 transition-colors hover:border-gold/40"
              >
                <span className="bg-gold/15 text-gold grid size-7 place-items-center rounded-full text-xs font-semibold">
                  {(user?.email ?? "?").slice(0, 1).toUpperCase()}
                </span>
                <span className="text-eyebrow text-muted hidden sm:inline">
                  {level.name}
                </span>
              </Link>
              <Button
                variant="ghost"
                size="icon-sm"
                onClick={() => void signOut()}
                aria-label="Sign out"
              >
                <LogOut />
              </Button>
            </div>
          ) : (
            <Button asChild variant="secondary" size="sm" className="shrink-0">
              <Link href="/me">
                <UserIcon />
                <span className="hidden sm:inline">
                  {authAvailable ? "Sign in" : "Your archive"}
                </span>
              </Link>
            </Button>
          )}
        </div>
      </nav>
    </header>
  );
}
