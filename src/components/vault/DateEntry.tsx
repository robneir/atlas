"use client";

import type { HistoricalEvent } from "@/data/types";
import { EraTag } from "@/components/shared/EraTag";

interface DateEntryProps {
  date: string;
  events: HistoricalEvent[];
}

export function DateEntry({ date, events }: DateEntryProps) {
  return (
    <div
      style={{
        backgroundColor: "var(--atlas-white)",
        borderRadius: 4,
        padding: 20,
        boxShadow: "var(--atlas-shadow-sm)",
      }}
    >
      <h3
        className="font-serif"
        style={{
          fontSize: 22,
          fontWeight: 700,
          color: "var(--atlas-black)",
          margin: 0,
          marginBottom: 16,
        }}
      >
        {date}
      </h3>

      {events.map((event, index) => (
        <div key={event.id}>
          {index > 0 && (
            <div
              style={{
                height: 1,
                backgroundColor: "var(--atlas-light-grey)",
                margin: "14px 0",
              }}
            />
          )}

          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
            <EraTag era={event.era} />
            <span
              className="font-sans"
              style={{
                fontSize: 13,
                color: "var(--atlas-mid-grey)",
                fontWeight: 500,
              }}
            >
              {event.year < 0 ? `${Math.abs(event.year)} BC` : event.year}
            </span>
          </div>

          <h4
            className="font-sans"
            style={{
              fontSize: 16,
              fontWeight: 600,
              color: "var(--atlas-black)",
              margin: 0,
              marginBottom: 4,
            }}
          >
            {event.title}
          </h4>

          <p
            className="font-sans"
            style={{
              fontSize: 14,
              color: "var(--atlas-dark-grey)",
              margin: 0,
              lineHeight: 1.5,
            }}
          >
            {event.description.length > 180
              ? event.description.slice(0, 180) + "..."
              : event.description}
          </p>
        </div>
      ))}
    </div>
  );
}
