"use client";

import { useTheme } from "@/hooks/useTheme";

const PARTNERS = [
  "Wikipedia",
  "Smithsonian",
  "Library of Congress",
  "British Museum",
  "World History Encyclopedia",
  "Internet Archive",
  "Stanford History",
  "Oxford Archives",
];

export function PartnersBar() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-[100] flex items-center overflow-x-auto whitespace-nowrap [&::-webkit-scrollbar]:hidden"
      style={{
        height: 36,
        padding: "0 12px",
        gap: 20,
        scrollbarWidth: "none",
        background: isDark ? "rgba(10,10,15,0.9)" : "rgba(255,255,255,0.95)",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
        borderTop: isDark ? "1px solid rgba(255,255,255,0.04)" : "1px solid rgba(0,0,0,0.04)",
      }}
    >
      <span
        className="font-sans text-[10px] md:text-[11px] font-bold uppercase"
        style={{
          letterSpacing: "0.1em",
          color: "var(--atlas-mid-grey)",
          marginRight: 8,
          flexShrink: 0,
        }}
      >
        Community Partners
      </span>

      {PARTNERS.map((name) => (
        <span
          key={name}
          className="cursor-default font-sans text-[12px] md:text-[13px] font-medium"
          style={{
            color: "var(--atlas-mid-grey)",
            flexShrink: 0,
          }}
        >
          {name}
        </span>
      ))}
    </div>
  );
}
