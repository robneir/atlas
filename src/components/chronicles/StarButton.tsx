"use client";

import { useState } from "react";
import { Star } from "lucide-react";

interface StarButtonProps {
  count: number;
  starred?: boolean;
  onToggle?: () => void;
}

export function StarButton({ count, starred = false, onToggle }: StarButtonProps) {
  const [hovered, setHovered] = useState(false);

  const isActive = starred || hovered;

  return (
    <button
      type="button"
      aria-label={`${starred ? "Unstar" : "Star"} (${count.toLocaleString()} stars)`}
      aria-pressed={starred}
      onClick={onToggle}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="font-sans"
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 4,
        cursor: "pointer",
        background: "none",
        border: "none",
        padding: 0,
        transition: "color 0.15s",
      }}
    >
      <Star
        size={14}
        fill={starred ? "var(--atlas-accent)" : "none"}
        stroke={isActive ? "var(--atlas-accent)" : "var(--atlas-mid-grey)"}
        style={{ transition: "all 0.15s" }}
      />
      <span
        style={{
          fontSize: 13,
          fontWeight: 600,
          color: isActive ? "var(--atlas-accent)" : "var(--atlas-mid-grey)",
          transition: "color 0.15s",
        }}
      >
        {count.toLocaleString()}
      </span>
    </button>
  );
}
