"use client";

import { Search, Maximize, Plus, Minus } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";

const BUTTONS = [
  { icon: Search, label: "Search" },
  { icon: Maximize, label: "Fullscreen" },
  { icon: Plus, label: "Zoom In" },
  { icon: Minus, label: "Zoom Out" },
] as const;

export function MapControls() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div
      className="fixed top-[120px] right-3 md:right-[20px] z-50 flex flex-col"
      style={{ gap: 2 }}
    >
      {BUTTONS.map(({ icon: Icon, label }) => (
        <button
          key={label}
          type="button"
          aria-label={label}
          className="flex cursor-pointer items-center justify-center transition-all duration-250 ease-out"
          style={{
            width: 44,
            height: 44,
            borderRadius: 4,
            backgroundColor: isDark ? "#151518" : "var(--atlas-white)",
            boxShadow: "var(--atlas-shadow-md)",
            border: isDark ? "1px solid rgba(255,255,255,0.08)" : "none",
          }}
          onClick={() => {
            if (label === "Search") {
              window.dispatchEvent(new CustomEvent("atlas:open-search"));
            }
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.boxShadow = "var(--atlas-shadow-lg)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.boxShadow = "var(--atlas-shadow-md)")
          }
        >
          <Icon size={18} style={{ color: "var(--atlas-dark-grey)" }} />
        </button>
      ))}
    </div>
  );
}
