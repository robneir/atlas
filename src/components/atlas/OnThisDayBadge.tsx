"use client";

import { Calendar } from "lucide-react";

interface OnThisDayBadgeProps {
  count: number;
  onCycleToFirst: () => void;
}

export function OnThisDayBadge({ count, onCycleToFirst }: OnThisDayBadgeProps) {
  if (count === 0) return null;

  return (
    <button
      type="button"
      onClick={onCycleToFirst}
      className="fixed z-20 font-sans cursor-pointer transition-all duration-200"
      style={{
        bottom: 80,
        right: 16,
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        padding: "8px 14px",
        borderRadius: 4,
        border: "1.5px solid var(--atlas-light-grey)",
        backgroundColor: "var(--atlas-white)",
        boxShadow: "var(--atlas-shadow-md)",
        fontSize: 13,
        fontWeight: 600,
        color: "var(--atlas-charcoal)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = "var(--atlas-shadow-lg)";
        e.currentTarget.style.borderColor = "var(--atlas-mid-grey)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = "var(--atlas-shadow-md)";
        e.currentTarget.style.borderColor = "var(--atlas-light-grey)";
      }}
      aria-label={`${count} events on this day. Click to explore.`}
    >
      <Calendar size={14} style={{ color: "var(--atlas-accent)" }} />
      <span>{count} on this day</span>
    </button>
  );
}
