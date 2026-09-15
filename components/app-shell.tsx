import { GlobalNav } from "@/components/global-nav";
import { MobileBottomNav } from "@/components/mobile-bottom-nav";
import { SearchCommand } from "@/components/search-command";
import { SiteFooter } from "@/components/site-footer";
import { XpToastStack } from "@/components/xp-toast";

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <a
        href="#main"
        className="text-label focus:bg-gold focus:text-ink sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50 focus:rounded-full focus:px-4 focus:py-2"
      >
        Skip to content
      </a>
      <GlobalNav />
      <main id="main" className="flex-1 pb-24 md:pb-0">
        {children}
      </main>
      <SiteFooter />
      <MobileBottomNav />
      <SearchCommand />
      <XpToastStack />
    </>
  );
}
