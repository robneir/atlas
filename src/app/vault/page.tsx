"use client";

import { useState, useMemo } from "react";
import { Calendar, List } from "lucide-react";
import { EVENTS } from "@/data/events";
import type { HistoricalEvent } from "@/data/types";
import { CalendarView } from "@/components/vault/CalendarView";
import { DateEntry } from "@/components/vault/DateEntry";
import { SectionIntro } from "@/components/onboarding/SectionIntro";

type ViewMode = "calendar" | "list";

/**
 * Maps historical events to calendar days for demo purposes.
 * Distributes events across different days of the given month
 * using a deterministic spread so the calendar always looks populated.
 */
function mapEventsToMonth(
  events: HistoricalEvent[],
  month: number,
  year: number
): Map<number, HistoricalEvent[]> {
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const map = new Map<number, HistoricalEvent[]>();

  events.forEach((event, index) => {
    // Spread events deterministically across the month
    const day = ((index * 3 + index * index) % daysInMonth) + 1;
    const existing = map.get(day) ?? [];
    existing.push(event);
    map.set(day, existing);
  });

  return map;
}

/**
 * Groups events by month for the list view.
 * Returns mock dates assigned to each event for display.
 */
function getListViewData(events: HistoricalEvent[], month: number, year: number) {
  const MONTH_NAMES = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // Assign each event a date within the month
  const entries: { dateStr: string; day: number; events: HistoricalEvent[] }[] = [];
  const dayMap = new Map<number, HistoricalEvent[]>();

  events.forEach((event, index) => {
    const day = ((index * 3 + index * index) % daysInMonth) + 1;
    const existing = dayMap.get(day) ?? [];
    existing.push(event);
    dayMap.set(day, existing);
  });

  // Sort by day and build entries
  const sortedDays = Array.from(dayMap.entries()).sort(([a], [b]) => a - b);
  for (const [day, dayEvents] of sortedDays) {
    entries.push({
      dateStr: `${MONTH_NAMES[month]} ${day}, ${year}`,
      day,
      events: dayEvents,
    });
  }

  return { monthLabel: `${MONTH_NAMES[month]} ${year}`, entries };
}

export default function VaultPage() {
  const [viewMode, setViewMode] = useState<ViewMode>("calendar");
  const now = new Date();
  const [currentMonth, setCurrentMonth] = useState(now.getMonth());
  const [currentYear, setCurrentYear] = useState(now.getFullYear());

  const eventsByDay = useMemo(
    () => mapEventsToMonth(EVENTS, currentMonth, currentYear),
    [currentMonth, currentYear]
  );

  const listData = useMemo(
    () => getListViewData(EVENTS, currentMonth, currentYear),
    [currentMonth, currentYear]
  );

  const handleMonthChange = (month: number, year: number) => {
    setCurrentMonth(month);
    setCurrentYear(year);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "var(--atlas-cream)",
      }}
    >
      <SectionIntro
        sectionKey="vault"
        title="Vault"
        subtitle="The Archive"
        description="The permanent record. Browse historical events by date, see what happened on any day in history, and explore the living archive of human knowledge."
        features={[
          "Calendar and list views of historical events",
          "Browse by month and year",
          "See contributions and attributions",
          "Every event timestamped and verified",
        ]}
      />
      <div
        style={{
          maxWidth: 1000,
          margin: "0 auto",
          padding: "40px 16px 100px",
        }}
        className="md:!px-7"
      >
        {/* Header row */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            marginBottom: 32,
            flexWrap: "wrap",
            gap: 16,
          }}
        >
          {/* Title + subtitle */}
          <div>
            <h1
              className="font-serif text-[28px] md:text-[36px]"
              style={{
                fontWeight: 700,
                color: "var(--atlas-black)",
                margin: 0,
              }}
            >
              Vault
            </h1>
            <p
              className="font-sans text-[15px] md:text-[17px]"
              style={{
                color: "var(--atlas-dark-grey)",
                margin: 0,
                paddingTop: 6,
              }}
            >
              The Archive — Browse history by date
            </p>
          </div>

          {/* View toggle */}
          <div
            role="group"
            aria-label="View mode"
            className="font-sans"
            style={{
              display: "flex",
              borderRadius: 999,
              overflow: "hidden",
              border: "1px solid var(--atlas-light-grey)",
            }}
          >
            <button
              type="button"
              aria-pressed={viewMode === "calendar"}
              onClick={() => setViewMode("calendar")}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                padding: "8px 16px",
                fontSize: 13,
                fontWeight: 600,
                border: "none",
                cursor: "pointer",
                backgroundColor:
                  viewMode === "calendar"
                    ? "var(--atlas-accent)"
                    : "var(--atlas-white)",
                color:
                  viewMode === "calendar"
                    ? "#ffffff"
                    : "var(--atlas-charcoal)",
                transition: "background-color 0.15s ease, color 0.15s ease",
              }}
            >
              <Calendar size={14} />
              Calendar
            </button>
            <button
              type="button"
              aria-pressed={viewMode === "list"}
              onClick={() => setViewMode("list")}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                padding: "8px 16px",
                fontSize: 13,
                fontWeight: 600,
                border: "none",
                cursor: "pointer",
                backgroundColor:
                  viewMode === "list"
                    ? "var(--atlas-accent)"
                    : "var(--atlas-white)",
                color:
                  viewMode === "list" ? "#ffffff" : "var(--atlas-charcoal)",
                transition: "background-color 0.15s ease, color 0.15s ease",
              }}
            >
              <List size={14} />
              List
            </button>
          </div>
        </div>

        {/* Views */}
        {viewMode === "calendar" ? (
          <CalendarView
            eventsByDay={eventsByDay}
            currentMonth={currentMonth}
            currentYear={currentYear}
            onMonthChange={handleMonthChange}
          />
        ) : (
          /* List view */
          <div>
            {/* Month header */}
            <h2
              className="font-serif"
              style={{
                fontSize: 18,
                fontWeight: 700,
                color: "var(--atlas-black)",
                margin: 0,
                marginBottom: 20,
              }}
            >
              {listData.monthLabel}
            </h2>

            {/* Date entries */}
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {listData.entries.map((entry) => (
                <DateEntry
                  key={entry.day}
                  date={entry.dateStr}
                  events={entry.events}
                />
              ))}
            </div>

            {listData.entries.length === 0 && (
              <div
                className="font-sans"
                style={{
                  textAlign: "center",
                  padding: "60px 20px",
                  color: "var(--atlas-mid-grey)",
                  fontSize: 15,
                }}
              >
                No events recorded for this month.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
