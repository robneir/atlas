"use client";

import { useState, useMemo } from "react";
import type { DailyActivity } from "@/data/types";

interface ContributionHeatmapProps {
  activityHistory: DailyActivity[];
  currentStreak: number;
}

const INTENSITY_COLORS = [
  "var(--atlas-cream)",
  "#f0c8b8",
  "#e8936e",
  "#d96038",
  "var(--atlas-accent)",
];

const DAY_LABELS = ["", "Mon", "", "Wed", "", "Fri", ""];

function getIntensity(count: number): number {
  if (count === 0) return 0;
  if (count <= 2) return 1;
  if (count <= 4) return 2;
  if (count <= 6) return 3;
  return 4;
}

function formatDate(dateStr: string): string {
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function ContributionHeatmap({
  activityHistory,
  currentStreak,
}: ContributionHeatmapProps) {
  const [tooltip, setTooltip] = useState<{
    text: string;
    x: number;
    y: number;
  } | null>(null);

  // Build 52×7 grid from activity history
  // The grid fills from the end: last entry = bottom-right cell
  const { grid, monthLabels } = useMemo(() => {
    const totalCells = 52 * 7;
    const cells: { date: string; count: number; intensity: number }[] = [];

    // Pad front if activity history is shorter than 364 days
    const padCount = totalCells - activityHistory.length;
    for (let i = 0; i < padCount; i++) {
      cells.push({ date: "", count: 0, intensity: 0 });
    }

    for (const day of activityHistory) {
      cells.push({
        date: day.date,
        count: day.count,
        intensity: getIntensity(day.count),
      });
    }

    // Build column-major grid (each column = 7 days, Sun–Sat)
    const columns: typeof cells[] = [];
    for (let col = 0; col < 52; col++) {
      const column: typeof cells = [];
      for (let row = 0; row < 7; row++) {
        column.push(cells[col * 7 + row]);
      }
      columns.push(column);
    }

    // Compute month labels
    const months: { label: string; col: number }[] = [];
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    let lastMonth = -1;

    for (let col = 0; col < 52; col++) {
      // Use first non-empty cell in the column
      const cell = columns[col].find((c) => c.date);
      if (cell?.date) {
        const m = new Date(cell.date + "T00:00:00").getMonth();
        if (m !== lastMonth) {
          months.push({ label: monthNames[m], col });
          lastMonth = m;
        }
      }
    }

    return { grid: columns, monthLabels: months };
  }, [activityHistory]);

  const cellSize = 11;
  const cellGap = 2;
  const step = cellSize + cellGap;

  return (
    <div
      style={{
        backgroundColor: "var(--atlas-white)",
        borderRadius: 10,
        padding: 20,
        boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 16,
        }}
      >
        <h3
          className="font-accent"
          style={{
            fontSize: 16,
            fontWeight: 700,
            color: "var(--atlas-black)",
            margin: 0,
          }}
        >
          Contribution Activity
        </h3>
        <span style={{ fontSize: 13, color: "var(--atlas-mid-grey)" }}>
          🔥 {currentStreak} day streak
        </span>
      </div>

      {/* Grid container with horizontal scroll on mobile */}
      <div style={{ overflowX: "auto", position: "relative" }}>
        <div
          style={{
            display: "inline-flex",
            flexDirection: "column",
            gap: 4,
          }}
        >
          {/* Month labels */}
          <div
            style={{
              display: "flex",
              marginLeft: 32,
              height: 16,
              position: "relative",
            }}
          >
            {monthLabels.map((m) => (
              <span
                key={`${m.label}-${m.col}`}
                style={{
                  position: "absolute",
                  left: m.col * step,
                  fontSize: 11,
                  color: "var(--atlas-mid-grey)",
                  whiteSpace: "nowrap",
                }}
              >
                {m.label}
              </span>
            ))}
          </div>

          {/* Grid body: day labels + cells */}
          <div style={{ display: "flex", gap: 0 }}>
            {/* Day labels column */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: cellGap,
                width: 30,
                flexShrink: 0,
              }}
            >
              {DAY_LABELS.map((label, i) => (
                <div
                  key={i}
                  style={{
                    height: cellSize,
                    fontSize: 10,
                    color: "var(--atlas-mid-grey)",
                    lineHeight: `${cellSize}px`,
                    textAlign: "right",
                    paddingRight: 4,
                  }}
                >
                  {label}
                </div>
              ))}
            </div>

            {/* Cells grid */}
            <div
              style={{
                display: "flex",
                gap: cellGap,
                position: "relative",
              }}
              onMouseLeave={() => setTooltip(null)}
            >
              {grid.map((col, colIdx) => (
                <div
                  key={colIdx}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: cellGap,
                  }}
                >
                  {col.map((cell, rowIdx) => (
                    <div
                      key={`${colIdx}-${rowIdx}`}
                      style={{
                        width: cellSize,
                        height: cellSize,
                        borderRadius: 2,
                        backgroundColor: INTENSITY_COLORS[cell.intensity],
                        cursor: cell.date ? "pointer" : "default",
                      }}
                      onMouseEnter={(e) => {
                        if (!cell.date) return;
                        const rect = (
                          e.target as HTMLElement
                        ).getBoundingClientRect();
                        const parentRect = (
                          e.target as HTMLElement
                        )
                          .closest("[data-heatmap-container]")
                          ?.getBoundingClientRect();
                        if (parentRect) {
                          setTooltip({
                            text: `${cell.count} contribution${cell.count !== 1 ? "s" : ""} on ${formatDate(cell.date)}`,
                            x: rect.left - parentRect.left + cellSize / 2,
                            y: rect.top - parentRect.top - 8,
                          });
                        }
                      }}
                      onMouseLeave={() => setTooltip(null)}
                    />
                  ))}
                </div>
              ))}

              {/* Tooltip */}
              {tooltip && (
                <div
                  style={{
                    position: "absolute",
                    left: tooltip.x,
                    top: tooltip.y,
                    transform: "translate(-50%, -100%)",
                    backgroundColor: "var(--atlas-charcoal)",
                    color: "#fff",
                    fontSize: 11,
                    padding: "4px 8px",
                    borderRadius: 4,
                    whiteSpace: "nowrap",
                    pointerEvents: "none",
                    zIndex: 10,
                  }}
                  data-heatmap-container
                >
                  {tooltip.text}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          gap: 4,
          marginTop: 12,
          fontSize: 11,
          color: "var(--atlas-mid-grey)",
        }}
      >
        <span>Less</span>
        {INTENSITY_COLORS.map((color, i) => (
          <div
            key={i}
            style={{
              width: cellSize,
              height: cellSize,
              borderRadius: 2,
              backgroundColor: color,
            }}
          />
        ))}
        <span>More</span>
      </div>
    </div>
  );
}
