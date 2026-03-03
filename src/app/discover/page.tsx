"use client";

import { TrendingSection } from "@/components/discover/TrendingSection";
import { ThisDaySection } from "@/components/discover/ThisDaySection";
import { FeaturedCollections } from "@/components/discover/FeaturedCollections";
import { EraExplorer } from "@/components/discover/EraExplorer";
import { Leaderboard } from "@/components/community/Leaderboard";
import { ActivityFeed } from "@/components/community/ActivityFeed";
import { SectionIntro } from "@/components/onboarding/SectionIntro";

export default function DiscoverPage() {
  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "var(--atlas-cream)",
      }}
    >
      <SectionIntro
        sectionKey="discover"
        title="Discover"
        subtitle="Trending"
        description="Your front page for all things history. See what's trending, explore by era, and find the latest additions from the Atlas community."
        features={[
          "Trending chronicles and popular content",
          "This Day in History highlights",
          "Featured curated collections",
          "Community leaderboard and activity",
        ]}
      />
      <div
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          padding: "40px 16px 100px",
        }}
        className="md:!px-7"
      >
        {/* Page header */}
        <div style={{ marginBottom: 40 }}>
          <h1
            className="font-serif text-[28px] md:text-[36px]"
            style={{
              fontWeight: 700,
              color: "var(--atlas-black)",
              margin: 0,
            }}
          >
            Discover
          </h1>
          <p
            className="font-sans text-[15px] md:text-[17px]"
            style={{
              color: "var(--atlas-dark-grey)",
              margin: 0,
              paddingTop: 6,
            }}
          >
            Trending stories, events, and community highlights
          </p>
        </div>

        <TrendingSection />
        <ThisDaySection />
        <FeaturedCollections />
        <EraExplorer />
        <Leaderboard />
        <ActivityFeed />
      </div>
    </div>
  );
}
