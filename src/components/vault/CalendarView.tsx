"use client";

import { useState, useMemo } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { HistoricalEvent } from "@/data/types";
import { ERA_CONFIG } from "@/lib/eras";
import { DateEntry } from "./DateEntry";

interface CalendarViewProps {
  eventsByDay: Map<number, HistoricalEvent[]>;
  currentMonth: number;
  currentYear: number;
  onMonthChange: (month: number, year: number) => void;
}

const DAY_NAMES = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function getDaysInMonth(month: number, year: number) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(month: number, year: number) {
  return new Date(year, month, 1).getDay();
}

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

export function CalendarView({
  eventsByDay,
  currentMonth,
  currentYear,
  onMonthChange,
}: CalendarViewProps) {
  const [selectedDay, setSelectedDay] = useState<number | null>(null);

  const today = useMemo(() => new Date(), []);
  const isCurrentMonth =
    today.getMonth() === currentMonth && today.getFullYear() === currentYear;

  const daysInMonth = getDaysInMonth(currentMonth, currentYear);
  const firstDay = getFirstDayOfMonth(currentMonth, currentYear);

  const handlePrev = () => {
    if (currentMonth === 0) {
      onMonthChange(11, currentYear - 1);
    } else {
      onMonthChange(currentMonth - 1, currentYear);
    }
    setSelectedDay(null);
  };

  const handleNext = () => {
    if (currentMonth === 11) {
      onMonthChange(0, currentYear + 1);
    } else {
      onMonthChange(currentMonth + 1, currentYear);
    }
    setSelectedDay(null);
  };

  // Build grid cells: leading empties + actual days
  const cells: (number | null)[] = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  const selectedDateStr = selectedDay
    ? `${MONTH_NAMES[currentMonth]} ${selectedDay}, ${currentYear}`
    : null;
  const selectedEvents = selectedDay ? eventsByDay.get(selectedDay) ?? [] : [];

  return (
    <div>
      {/* Month navigation */}
      <div
        className="font-sans"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 20,
          marginBottom: 20,
        }}
      >
        <button
          onClick={handlePrev}
          aria-label="Previous month"
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: 10,
            borderRadius: 6,
            display: "flex",
            alignItems: "center",
            color: "var(--atlas-charcoal)",
            minWidth: 44,
            minHeight: 44,
            justifyContent: "center",
          }}
        >
          <ChevronLeft size={20} />
        </button>
        <span
          className="font-serif"
          style={{ fontSize: 20, fontWeight: 700, color: "var(--atlas-black)" }}
        >
          {MONTH_NAMES[currentMonth]} {currentYear}
        </span>
        <button
          onClick={handleNext}
          aria-label="Next month"
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: 10,
            borderRadius: 6,
            display: "flex",
            alignItems: "center",
            color: "var(--atlas-charcoal)",
            minWidth: 44,
            minHeight: 44,
            justifyContent: "center",
          }}
        >
          <ChevronRight size={20} />
        </button>
      </div>

      {/* Day-of-week headers */}
      <div
        className="font-sans"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(7, 1fr)",
        }}
      >
        {DAY_NAMES.map((name) => (
          <div
            key={name}
            style={{
              textAlign: "center",
              fontSize: 12,
              fontWeight: 600,
              color: "var(--atlas-mid-grey)",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              paddingBottom: 8,
            }}
          >
            {name}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(7, 1fr)",
          border: "1px solid var(--atlas-light-grey)",
          borderBottom: "none",
          borderRight: "none",
        }}
      >
        {cells.map((day, i) => {
          const dayEvents = day ? eventsByDay.get(day) ?? [] : [];
          const isToday = isCurrentMonth && day === today.getDate();
          const isSelected = day === selectedDay;

          return (
            <div
              key={i}
              onClick={() => {
                if (day) setSelectedDay(day === selectedDay ? null : day);
              }}
              className="h-[56px] sm:h-[80px]"
              style={{
                borderBottom: "1px solid var(--atlas-light-grey)",
                borderRight: "1px solid var(--atlas-light-grey)",
                padding: 6,
                cursor: day ? "pointer" : "default",
                backgroundColor: isSelected
                  ? "var(--atlas-off-white)"
                  : "var(--atlas-white)",
                borderTop: isToday ? `2px solid var(--atlas-accent)` : undefined,
                position: "relative",
                transition: "background-color 0.15s ease",
              }}
              onMouseEnter={(e) => {
                if (day && !isSelected) {
                  e.currentTarget.style.backgroundColor = "var(--atlas-off-white)";
                }
              }}
              onMouseLeave={(e) => {
                if (day && !isSelected) {
                  e.currentTarget.style.backgroundColor = "var(--atlas-white)";
                }
              }}
            >
              {day && (
                <>
                  {/* Day number */}
                  <div
                    className="font-sans"
                    style={{
                      fontSize: 13,
                      fontWeight: 600,
                      color: isToday
                        ? "var(--atlas-accent)"
                        : "var(--atlas-charcoal)",
                      textAlign: "right",
                    }}
                  >
                    {day}
                  </div>

                  {/* Event dots */}
                  {dayEvents.length > 0 && (
                    <div
                      style={{
                        position: "absolute",
                        bottom: 6,
                        left: 6,
                        display: "flex",
                        gap: 4,
                      }}
                    >
                      {dayEvents.slice(0, 3).map((evt, j) => (
                        <div
                          key={j}
                          style={{
                            width: 7,
                            height: 7,
                            borderRadius: "50%",
                            backgroundColor: ERA_CONFIG[evt.era].color,
                          }}
                        />
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>
          );
        })}
      </div>

      {/* Selected day entries */}
      {selectedDay && selectedDateStr && (
        <div style={{ marginTop: 24 }}>
          {selectedEvents.length > 0 ? (
            <DateEntry date={selectedDateStr} events={selectedEvents} />
          ) : (
            <div
              className="font-sans"
              style={{
                textAlign: "center",
                padding: "32px 20px",
                color: "var(--atlas-mid-grey)",
                fontSize: 15,
              }}
            >
              No events recorded for this date.
            </div>
          )}
        </div>
      )}
    </div>
  );
}
