import type { Metadata, Viewport } from "next";
import { IBM_Plex_Mono, Instrument_Serif, Inter } from "next/font/google";
import { AppShell } from "@/components/app-shell";
import { AppProviders } from "@/components/providers";
import { getCurrentUser } from "@/lib/supabase/server";
import { getSiteUrl } from "@/lib/seo";
import "./globals.css";

const display = Instrument_Serif({
  variable: "--font-serif-display",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const sans = Inter({
  variable: "--font-ui-sans",
  subsets: ["latin"],
  display: "swap",
});

const mono = IBM_Plex_Mono({
  variable: "--font-ui-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: "LoreGraph — Understand Runeterra",
    template: "%s | LoreGraph",
  },
  description:
    "Explore. Connect. Understand. An interactive map of Runeterra's characters, factions, timelines and the connections between them.",
  applicationName: "LoreGraph",
  keywords: [
    "Runeterra lore",
    "League of Legends lore",
    "champion relationships",
    "lore graph",
    "Runeterra timeline",
  ],
  openGraph: {
    type: "website",
    siteName: "LoreGraph",
    title: "LoreGraph — Understand Runeterra",
    description:
      "Every character. Every conflict. Every connection. Explore Runeterra as an interactive network.",
    url: getSiteUrl(),
  },
  twitter: {
    card: "summary_large_image",
    title: "LoreGraph — Understand Runeterra",
    description:
      "Every character. Every conflict. Every connection. Explore Runeterra as an interactive network.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#080B12",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const user = await getCurrentUser();

  return (
    <html
      lang="en"
      className={`${display.variable} ${sans.variable} ${mono.variable} h-full antialiased`}
    >
      <body className="bg-ink flex min-h-full flex-col">
        <AppProviders initialUser={user}>
          <AppShell>{children}</AppShell>
        </AppProviders>
      </body>
    </html>
  );
}
