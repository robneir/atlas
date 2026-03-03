"use client";

import { useState } from "react";
import { Layers, ChevronDown } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";

const LENSES = [
  { label: "Events", defaultOn: true },
  { label: "People", defaultOn: true },
  { label: "Stories", defaultOn: false },
  { label: "Connections", defaultOn: false },
] as const;

export function MapLensesCard() {
  const [expanded, setExpanded] = useState(false);
  const [toggles, setToggles] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(LENSES.map((l) => [l.label, l.defaultOn]))
  );
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const toggle = (label: string) =>
    setToggles((prev) => ({ ...prev, [label]: !prev[label] }));

  return (
    <div
      className="fixed top-[68px] right-3 md:right-[20px] z-50"
      style={{
        width: 200,
        borderRadius: 10,
        boxShadow: "var(--atlas-shadow-md)",
        backgroundColor: isDark ? "#151518" : "var(--atlas-white)",
        border: isDark ? "1px solid rgba(255,255,255,0.08)" : "none",
      }}
    >
      {/* Header */}
      <button
        type="button"
        aria-expanded={expanded}
        aria-label="Map Lenses"
        onClick={() => setExpanded((v) => !v)}
        className="flex w-full cursor-pointer items-center justify-between"
        style={{ padding: "12px 14px" }}
      >
        <span
          className="flex items-center gap-[6px] font-sans text-[13px] md:text-[14px] font-semibold"
          style={{ color: "var(--atlas-link)" }}
        >
          <Layers size={14} />
          Map Lenses
        </span>
        <ChevronDown
          size={12}
          style={{
            color: "var(--atlas-mid-grey)",
            transform: expanded ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.2s ease",
          }}
        />
      </button>

      {/* Toggle rows */}
      {expanded && (
        <div style={{ borderTop: "1px solid var(--atlas-light-grey)" }}>
          {LENSES.map(({ label }) => (
            <div
              key={label}
              className="flex items-center justify-between font-sans text-[13px] md:text-[14px]"
              style={{ padding: "10px 14px", color: "var(--atlas-charcoal)" }}
            >
              <span>{label}</span>
              <button
                type="button"
                onClick={() => toggle(label)}
                aria-label={`Toggle ${label}`}
                aria-pressed={toggles[label]}
                className="relative cursor-pointer"
                style={{
                  width: 40,
                  height: 24,
                  borderRadius: 12,
                  backgroundColor: toggles[label]
                    ? "var(--atlas-accent)"
                    : "var(--atlas-light-grey)",
                  border: "none",
                  padding: 0,
                  transition: "background-color 0.2s ease",
                }}
              >
                <span
                  style={{
                    position: "absolute",
                    top: 3,
                    left: toggles[label] ? 19 : 3,
                    width: 18,
                    height: 18,
                    borderRadius: "50%",
                    backgroundColor: "#fff",
                    boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
                    transition: "left 0.2s ease",
                  }}
                />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
