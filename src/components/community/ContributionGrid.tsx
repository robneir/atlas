"use client";

import { Pin, Star } from "lucide-react";
import type { User, Chronicle } from "@/data/types";
import { ChronicleCard } from "@/components/chronicles/ChronicleCard";
import { EraTag } from "@/components/shared/EraTag";

interface ContributionGridProps {
  user: User;
  chronicles: Chronicle[];
}

/**
 * Simple seeded pseudo-random number generator.
 * Uses the username as a seed so the heatmap is consistent per user.
 */
function seededRandom(seed: string): () => number {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = seed.charCodeAt(i) + ((hash << 5) - hash);
  }
  return () => {
    hash = (hash * 16807 + 0) % 2147483647;
    return (hash & 0x7fffffff) / 0x7fffffff;
  };
}

/**
 * Generate 364 days of mock contribution data (52 weeks x 7 days).
 * Each value is 0-4 representing intensity level.
 */
function generateHeatmapData(username: string): number[] {
  const rng = seededRandom(username);
  const data: number[] = [];
  for (let i = 0; i < 364; i++) {
    const r = rng();
    if (r < 0.4) data.push(0);
    else if (r < 0.65) data.push(1);
    else if (r < 0.82) data.push(2);
    else if (r < 0.93) data.push(3);
    else data.push(4);
  }
  return data;
}

const HEATMAP_COLORS = [
  "var(--atlas-cream)",
  "#f0c8b8",
  "#e8936e",
  "#d96038",
  "var(--atlas-accent)",
];

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function ContributionGrid({ user, chronicles }: ContributionGridProps) {
  // Filter chronicles authored by this user
  const userChronicles = chronicles.filter((c) => c.authorId === user.id);

  // Find pinned chronicles
  const pinnedChronicles = user.pinnedChronicleIds
    .map((id) => chronicles.find((c) => c.id === id))
    .filter((c): c is Chronicle => c !== undefined);

  // Heatmap data
  const heatmapData = generateHeatmapData(user.username);

  // Build columns (52 columns, 7 rows each)
  const columns: number[][] = [];
  for (let col = 0; col < 52; col++) {
    const column: number[] = [];
    for (let row = 0; row < 7; row++) {
      column.push(heatmapData[col * 7 + row]);
    }
    columns.push(column);
  }

  return (
    <div>
      {/* Pinned Chronicles */}
      {pinnedChronicles.length > 0 && (
        <section style={{ marginBottom: 40 }}>
          <h2
            className="font-accent"
            style={{
              fontSize: 18,
              fontWeight: 700,
              color: "var(--atlas-black)",
              margin: 0,
              marginBottom: 16,
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <Pin size={16} />
            Pinned
          </h2>

          <div
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            {pinnedChronicles.map((chronicle) => (
              <ChronicleCard key={chronicle.id} chronicle={chronicle} />
            ))}
          </div>
        </section>
      )}

      {/* Contribution Activity Heatmap */}
      <section style={{ marginBottom: 40 }}>
        <h2
          className="font-accent"
          style={{
            fontSize: 18,
            fontWeight: 700,
            color: "var(--atlas-black)",
            margin: 0,
            marginBottom: 16,
          }}
        >
          Contribution Activity
        </h2>

        <div
          style={{
            backgroundColor: "var(--atlas-white)",
            borderRadius: 10,
            padding: 20,
            boxShadow: "var(--atlas-shadow-sm)",
          }}
        >
          {/* Grid */}
          <div
            style={{
              display: "flex",
              gap: 2,
              overflowX: "auto",
            }}
          >
            {columns.map((column, colIndex) => (
              <div
                key={colIndex}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 2,
                }}
              >
                {column.map((value, rowIndex) => (
                  <div
                    key={rowIndex}
                    style={{
                      width: 10,
                      height: 10,
                      borderRadius: 2,
                      backgroundColor: HEATMAP_COLORS[value],
                    }}
                  />
                ))}
              </div>
            ))}
          </div>

          {/* Legend */}
          <div
            className="font-sans"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 4,
              marginTop: 12,
              justifyContent: "flex-end",
              fontSize: 11,
              color: "var(--atlas-mid-grey)",
            }}
          >
            <span>Less</span>
            {HEATMAP_COLORS.map((color, i) => (
              <div
                key={i}
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: 2,
                  backgroundColor: color,
                }}
              />
            ))}
            <span>More</span>
          </div>
        </div>
      </section>

      {/* Published Chronicles List */}
      <section style={{ marginBottom: 40 }}>
        <h2
          className="font-accent"
          style={{
            fontSize: 18,
            fontWeight: 700,
            color: "var(--atlas-black)",
            margin: 0,
            marginBottom: 16,
          }}
        >
          Published Chronicles
        </h2>

        {userChronicles.length === 0 ? (
          <p
            className="font-sans"
            style={{
              fontSize: 14,
              color: "var(--atlas-mid-grey)",
            }}
          >
            No chronicles published yet.
          </p>
        ) : (
          <div
            style={{
              backgroundColor: "var(--atlas-white)",
              borderRadius: 10,
              boxShadow: "var(--atlas-shadow-sm)",
              padding: "4px 20px",
            }}
          >
            {userChronicles.map((chronicle, index) => (
              <div
                key={chronicle.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  padding: "14px 0",
                  borderBottom:
                    index < userChronicles.length - 1
                      ? "1px solid var(--atlas-light-grey)"
                      : "none",
                }}
              >
                {/* Title */}
                <span
                  className="font-serif"
                  style={{
                    fontSize: 15,
                    fontWeight: 700,
                    color: "var(--atlas-black)",
                    flex: 1,
                    minWidth: 0,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {chronicle.title}
                </span>

                {/* Era tag */}
                <EraTag era={chronicle.era} />

                {/* Stars */}
                <span
                  className="font-sans"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 4,
                    fontSize: 13,
                    color: "var(--atlas-dark-grey)",
                    flexShrink: 0,
                  }}
                >
                  <Star size={13} />
                  {chronicle.stars.toLocaleString()}
                </span>

                {/* Date */}
                <span
                  className="font-sans"
                  style={{
                    fontSize: 13,
                    color: "var(--atlas-mid-grey)",
                    flexShrink: 0,
                    whiteSpace: "nowrap",
                  }}
                >
                  {formatDate(chronicle.createdAt)}
                </span>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
