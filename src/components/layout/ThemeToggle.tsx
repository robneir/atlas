"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";

export function ThemeToggle() {
  const { theme, toggle } = useTheme();

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={
        theme === "light" ? "Switch to dark mode" : "Switch to light mode"
      }
      className="relative flex h-9 w-9 items-center justify-center rounded-full border transition-colors duration-200"
      style={{
        borderColor: "var(--atlas-light-grey)",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLButtonElement).style.backgroundColor =
          "var(--atlas-off-white)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLButtonElement).style.backgroundColor =
          "transparent";
      }}
    >
      <Sun
        className="absolute h-[18px] w-[18px] transition-all duration-300"
        style={{
          color: "var(--atlas-charcoal)",
          opacity: theme === "dark" ? 1 : 0,
          transform: theme === "dark" ? "rotate(0deg) scale(1)" : "rotate(90deg) scale(0)",
        }}
      />
      <Moon
        className="absolute h-[18px] w-[18px] transition-all duration-300"
        style={{
          color: "var(--atlas-charcoal)",
          opacity: theme === "light" ? 1 : 0,
          transform: theme === "light" ? "rotate(0deg) scale(1)" : "rotate(-90deg) scale(0)",
        }}
      />
    </button>
  );
}
