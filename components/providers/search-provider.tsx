"use client";

import * as React from "react";
import { track } from "@/lib/analytics";

interface SearchContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
  openSearch: (via?: "keyboard" | "click") => void;
}

const SearchContext = React.createContext<SearchContextValue | null>(null);

export function SearchProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = React.useState(false);

  const openSearch = React.useCallback((via: "keyboard" | "click" = "click") => {
    track({ name: "search_open", via });
    setOpen(true);
  }, []);

  React.useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const isCommandK =
        event.key.toLowerCase() === "k" && (event.metaKey || event.ctrlKey);
      const isSlash =
        event.key === "/" &&
        !event.metaKey &&
        !event.ctrlKey &&
        !(event.target instanceof HTMLInputElement) &&
        !(event.target instanceof HTMLTextAreaElement);
      if (isCommandK || isSlash) {
        event.preventDefault();
        setOpen((value) => {
          if (!value) track({ name: "search_open", via: "keyboard" });
          return !value;
        });
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const value = React.useMemo(() => ({ open, setOpen, openSearch }), [open, openSearch]);

  return <SearchContext.Provider value={value}>{children}</SearchContext.Provider>;
}

export function useSearchDialog(): SearchContextValue {
  const context = React.useContext(SearchContext);
  if (!context) throw new Error("useSearchDialog must be used inside <SearchProvider>");
  return context;
}
