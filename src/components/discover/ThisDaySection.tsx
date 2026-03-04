"use client";

import { ArrowRight } from "lucide-react";
import { EVENTS } from "@/data/events";
import { EraTag } from "@/components/shared/EraTag";

export function ThisDaySection() {
  // Pick 3 events as "today's" events since exact dates won't match
  const todayEvents = EVENTS.slice(0, 3);

  return (
    <section style={{ marginBottom: 48 }}>
      <h2
        className="font-accent"
        style={{
          fontSize: 20,
          fontWeight: 700,
          color: "var(--atlas-black)",
          margin: 0,
          marginBottom: 20,
        }}
      >
        This Day in History
      </h2>

      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {todayEvents.map((event, index) => (
          <div
            key={event.id}
            className="atlas-card-stagger"
            style={{
              animationDelay: `${index * 80}ms`,
              backgroundColor: "var(--atlas-white)",
              borderRadius: 4,
              padding: "16px 20px",
              boxShadow: "var(--atlas-shadow-sm)",
              display: "flex",
              alignItems: "center",
              gap: 20,
              cursor: "pointer",
              transition: "box-shadow 0.25s ease, transform 0.25s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = "var(--atlas-shadow-md)";
              e.currentTarget.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = "var(--atlas-shadow-sm)";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            {/* Left: EraTag + date */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: 6,
                minWidth: 120,
                flexShrink: 0,
              }}
            >
              <EraTag era={event.era} />
              <span
                className="font-sans"
                style={{
                  fontSize: 12,
                  color: "var(--atlas-mid-grey)",
                  fontWeight: 500,
                }}
              >
                {event.date}
              </span>
            </div>

            {/* Center: Title + description */}
            <div style={{ flex: 1, minWidth: 0 }}>
              <h3
                className="font-sans"
                style={{
                  fontSize: 16,
                  fontWeight: 700,
                  color: "var(--atlas-black)",
                  margin: 0,
                  marginBottom: 4,
                }}
              >
                {event.title}
              </h3>
              <p
                className="font-sans"
                style={{
                  fontSize: 13,
                  color: "var(--atlas-dark-grey)",
                  margin: 0,
                  display: "-webkit-box",
                  WebkitLineClamp: 1,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                  lineHeight: 1.5,
                }}
              >
                {event.description}
              </p>
            </div>

            {/* Right: Arrow */}
            <div style={{ flexShrink: 0 }}>
              <ArrowRight
                size={18}
                style={{ color: "var(--atlas-mid-grey)" }}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
