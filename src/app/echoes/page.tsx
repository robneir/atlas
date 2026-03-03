"use client";

import { useState, useMemo } from "react";
import { FIGURES } from "@/data/figures";
import { ERA_CONFIG } from "@/lib/eras";
import { FigureCard } from "@/components/echoes/FigureCard";
import { SectionIntro } from "@/components/onboarding/SectionIntro";
import type { Era } from "@/data/types";

export default function EchoesPage() {
  const [eraFilter, setEraFilter] = useState<Era | "all">("all");

  const filtered = useMemo(() => {
    if (eraFilter === "all") return FIGURES;
    return FIGURES.filter((f) => f.era === eraFilter);
  }, [eraFilter]);

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
        sectionKey="echoes"
        title="Echoes"
        subtitle="Chat with History"
        description="Have conversations with historical figures brought to life through AI. Select a figure, learn their story, and engage in dialogue across the ages."
        features={[
          "Browse figures from every era",
          "Explore their key contributions",
          "Chat with pre-written dialogue trees",
          "Discover connections between figures",
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
        <div style={{ marginBottom: 32 }}>
          <h1
            className="font-serif text-[28px] md:text-[36px]"
            style={{
              fontWeight: 700,
              color: "var(--atlas-black)",
              margin: 0,
            }}
          >
            Echoes
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
            Chat with History
          </p>
        </div>

        {/* Era filter */}
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
        </div>

        {/* Figures grid */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6"
        >
          {filtered.map((figure, index) => (
            <div
              key={figure.id}
              className="atlas-card-stagger"
              style={{ animationDelay: `${index * 60}ms` }}
            >
              <FigureCard figure={figure} />
            </div>
          ))}
        </div>

        {/* Empty state */}
        {filtered.length === 0 && (
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
            No figures found for this era. Try a different filter.
          </div>
        )}
      </div>
    </div>
  );
}
