import type { Era } from "@/data/types";
import { ERA_CONFIG } from "@/lib/eras";

interface EraTagProps {
  era: Era;
}

export function EraTag({ era }: EraTagProps) {
  const { label, color } = ERA_CONFIG[era];

  return (
    <span
      className="inline-flex items-center font-sans"
      style={{
        padding: "3px 10px",
        borderRadius: 999,
        fontSize: 11,
        fontWeight: 700,
        textTransform: "uppercase",
        letterSpacing: "0.06em",
        backgroundColor: `${color}26`,
        color: color,
      }}
    >
      {label}
    </span>
  );
}
