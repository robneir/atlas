"use client";

import { useTheme } from "@/hooks/useTheme";

/**
 * Floating pill-shaped banner near the top of the map showing
 * a "This Day in History" fact based on today's date.
 */

const DAILY_FACTS: Record<string, string> = {
  "01-01": "On this day in 45 BC, the Julian calendar took effect",
  "01-27": "On this day in 1945, Soviet troops liberated Auschwitz",
  "02-12": "On this day in 1809, Abraham Lincoln was born",
  "03-03": "On this day in 1847, Alexander Graham Bell was born",
  "03-12": "On this day in 1930, Gandhi began the Salt March",
  "04-12": "On this day in 1961, Yuri Gagarin became the first human in space",
  "05-29": "On this day in 1453, Constantinople fell to the Ottomans",
  "06-06": "On this day in 1944, Allied forces landed on the beaches of Normandy",
  "07-04": "On this day in 1776, the United States declared independence",
  "07-14": "On this day in 1789, the storming of the Bastille ignited the French Revolution",
  "07-20": "On this day in 1969, humans first walked on the Moon",
  "09-02": "On this day in 31 BC, the Battle of Actium shaped the Roman Empire",
  "10-12": "On this day in 1492, Columbus reached the Americas",
  "11-09": "On this day in 1989, the Berlin Wall fell",
  "12-17": "On this day in 1903, the Wright Brothers achieved powered flight",
};

function getTodayFact(): string {
  const now = new Date();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const key = `${month}-${day}`;

  if (DAILY_FACTS[key]) {
    return DAILY_FACTS[key];
  }

  // Fall back to a deterministic "random" fact based on day-of-year
  const values = Object.values(DAILY_FACTS);
  const dayOfYear =
    Math.floor(
      (now.getTime() - new Date(now.getFullYear(), 0, 0).getTime()) /
        (1000 * 60 * 60 * 24),
    );
  return values[dayOfYear % values.length];
}

export function DailyBanner() {
  const fact = getTodayFact();
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div
      role="status"
      aria-live="polite"
      aria-label="This day in history"
      className="fixed top-[68px] left-3 right-3 md:left-1/2 md:right-auto md:-translate-x-1/2 z-[60]"
      style={{
        background: "var(--atlas-white)",
        borderRadius: 999,
        boxShadow: "var(--atlas-shadow-md)",
        padding: "8px 16px",
        display: "flex",
        alignItems: "center",
        gap: 10,
        whiteSpace: "nowrap",
        maxWidth: 600,
        border: isDark ? "1px solid rgba(255,255,255,0.08)" : "none",
        overflow: "hidden",
      }}
    >
      {/* TODAY badge */}
      <span
        style={{
          display: "inline-block",
          background: "var(--atlas-accent)",
          color: "#ffffff",
          fontSize: 10,
          fontWeight: 700,
          textTransform: "uppercase",
          letterSpacing: "0.1em",
          padding: "2px 8px",
          borderRadius: 999,
          flexShrink: 0,
        }}
      >
        Today
      </span>

      {/* Historical fact */}
      <span
        className="font-sans text-[13px] md:text-[14px]"
        style={{
          color: "var(--atlas-charcoal)",
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
          minWidth: 0,
        }}
      >
        {fact}
      </span>

      {/* Explore link */}
      <a
        href="#"
        aria-label="Explore this historical event"
        className="font-sans hidden sm:inline"
        style={{
          fontSize: 14,
          fontWeight: 600,
          color: "var(--atlas-link)",
          cursor: "pointer",
          textDecoration: "none",
          flexShrink: 0,
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.textDecoration = "underline";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.textDecoration = "none";
        }}
      >
        Explore &rarr;
      </a>
    </div>
  );
}
