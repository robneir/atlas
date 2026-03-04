"use client";

import { ERA_CONFIG } from "@/lib/eras";
import type { Era } from "@/data/types";

export function EraExplorer() {
  const eras = Object.entries(ERA_CONFIG) as [
    Era,
    (typeof ERA_CONFIG)[Era],
  ][];

  const formatRange = (range: readonly [number, number]) => {
    const formatYear = (y: number) => {
      if (y < 0) return `${Math.abs(y)} BC`;
      return `${y} AD`;
    };
    return `${formatYear(range[0])} - ${formatYear(range[1])}`;
  };

  return (
    <section style={{ marginBottom: 48 }}>
      <h2
        className="font-accent"
        style={{
          fontSize: 20,
          fontWeight: 700,
          color: "var(--atlas-black)",
          margin: 0,
          marginBottom: 20,
        }}
      >
        Explore by Era
      </h2>

      <div
        style={{
          display: "flex",
          gap: 12,
          overflowX: "auto",
          scrollbarWidth: "none",
          paddingBottom: 4,
        }}
        className="[&::-webkit-scrollbar]:hidden"
      >
        {eras.map(([key, config], index) => (
          <div
            key={key}
            className="atlas-card-stagger"
            style={{
              animationDelay: `${index * 60}ms`,
              minWidth: 140,
              maxWidth: 140,
              borderRadius: 4,
              padding: 16,
              cursor: "pointer",
              transition: "transform 0.2s ease, box-shadow 0.2s ease",
              background: `linear-gradient(135deg, ${config.color}, ${config.color}cc)`,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.03)";
              e.currentTarget.style.boxShadow = "var(--atlas-shadow-md)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            <div
              className="font-sans"
              style={{
                fontSize: 14,
                fontWeight: 700,
                color: "#ffffff",
                marginBottom: 4,
              }}
            >
              {config.label}
            </div>
            <div
              className="font-sans"
              style={{
                fontSize: 12,
                color: "#ffffff",
                opacity: 0.8,
              }}
            >
              {formatRange(config.range)}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
