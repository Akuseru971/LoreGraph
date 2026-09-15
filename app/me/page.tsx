import type { Metadata } from "next";
import { ProfileScreen } from "@/components/daily/profile-screen";
import { loreRepository } from "@/lib/data/lore-repository";
import { todayKey } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Daily Lore & Your Archive",
  description:
    "Track your Runeterra knowledge, play Daily Lore, build your collection and unlock achievements.",
  alternates: { canonical: "/me" },
  openGraph: {
    title: "Daily Lore & Your Archive | LoreGraph",
    description: "Your Runeterra knowledge, streaks, Lore DNA and daily challenge.",
    url: "/me",
  },
};

export default function ProfilePage() {
  const date = todayKey();
  const dailyQuestions = loreRepository.dailyQuestions(date, 5);

  return <ProfileScreen dailyQuestions={dailyQuestions} date={date} />;
}
