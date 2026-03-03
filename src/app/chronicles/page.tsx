"use client";

import { useState, useMemo } from "react";
import { CHRONICLES } from "@/data/chronicles";
import { ERA_CONFIG } from "@/lib/eras";
import { ChronicleCard } from "@/components/chronicles/ChronicleCard";
import { SectionIntro } from "@/components/onboarding/SectionIntro";
import type { Era } from "@/data/types";

type SortOption = "popular" | "newest" | "oldest";

export default function ChroniclesPage() {
  const [eraFilter, setEraFilter] = useState<Era | "all">("all");
  const [sortBy, setSortBy] = useState<SortOption>("popular");

  const filteredAndSorted = useMemo(() => {
    let results = [...CHRONICLES];

    // Filter by era
    if (eraFilter !== "all") {
      results = results.filter((c) => c.era === eraFilter);
    }

    // Sort
    switch (sortBy) {
      case "popular":
        results.sort((a, b) => b.stars - a.stars);
        break;
      case "newest":
        results.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        break;
      case "oldest":
        results.sort(
          (a, b) =>
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );
        break;
    }

    return results;
  }, [eraFilter, sortBy]);

  const eraOptions = Object.entries(ERA_CONFIG).map(([key, config]) => ({
    value: key as Era,
    label: config.label,
  }));

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "var(--atlas-cream)",
      }}
    >
      <SectionIntro
        sectionKey="chronicles"
        title="Chronicles"
        subtitle="Stories"
        description="Dive into community-curated historical narratives. Chronicles are in-depth stories written by contributors — think Wikipedia meets Medium for history."
        features={[
          "Browse stories by era, region, or topic",
          "Star your favorite chronicles",
          "Rich reading experience with embedded maps",
          "Contribute your own historical narratives",
        ]}
      />
      <div
        style={{
          maxWidth: 1000,
          margin: "0 auto",
          padding: "40px 16px 100px",
        }}
        className="md:!px-7"
      >
        {/* Page header */}
        <div style={{ marginBottom: 32 }}>
          <h1
            className="font-serif text-[28px] md:text-[36px]"
            style={{
              fontWeight: 700,
              color: "var(--atlas-black)",
              margin: 0,
            }}
          >
            Chronicles
          </h1>
          <p
            className="font-sans text-[15px] md:text-[17px]"
            style={{
              color: "var(--atlas-dark-grey)",
              marginTop: 6,
              margin: 0,
              paddingTop: 6,
            }}
          >
            Community-curated historical narratives
          </p>
        </div>

        {/* Filter/sort bar */}
        <div
          className="font-sans"
          style={{
            display: "flex",
            gap: 12,
            marginBottom: 28,
            flexWrap: "wrap",
          }}
        >
          <label>
            <span className="sr-only">Filter by era</span>
            <select
              value={eraFilter}
              onChange={(e) => setEraFilter(e.target.value as Era | "all")}
              style={{
                padding: "8px 12px",
                borderRadius: 8,
                border: "1px solid var(--atlas-light-grey)",
                backgroundColor: "var(--atlas-white)",
                color: "var(--atlas-charcoal)",
                fontSize: 14,
                fontWeight: 500,
                cursor: "pointer",
                outline: "none",
                appearance: "auto",
              }}
            >
              <option value="all">All Eras</option>
              {eraOptions.map((era) => (
                <option key={era.value} value={era.value}>
                  {era.label}
                </option>
              ))}
            </select>
          </label>

          <label>
            <span className="sr-only">Sort by</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              style={{
                padding: "8px 12px",
                borderRadius: 8,
                border: "1px solid var(--atlas-light-grey)",
                backgroundColor: "var(--atlas-white)",
                color: "var(--atlas-charcoal)",
                fontSize: 14,
                fontWeight: 500,
                cursor: "pointer",
                outline: "none",
                appearance: "auto",
              }}
            >
              <option value="popular">Most Popular</option>
              <option value="newest">Newest</option>
              <option value="oldest">Oldest</option>
            </select>
          </label>
        </div>

        {/* Cards grid */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5"
        >
          {filteredAndSorted.map((chronicle, index) => (
            <div
              key={chronicle.id}
              className="atlas-card-stagger"
              style={{ animationDelay: `${index * 60}ms` }}
            >
              <ChronicleCard chronicle={chronicle} />
            </div>
          ))}
        </div>

        {/* Empty state */}
        {filteredAndSorted.length === 0 && (
          <div
            role="status"
            aria-live="polite"
            className="font-sans"
            style={{
              textAlign: "center",
              padding: "60px 20px",
              color: "var(--atlas-mid-grey)",
              fontSize: 16,
            }}
          >
            No chronicles found for this era. Try a different filter.
          </div>
        )}
      </div>
    </div>
  );
}
