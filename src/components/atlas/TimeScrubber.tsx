"use client";

import { useRef, useCallback, useEffect } from "react";
import { Play, Pause } from "lucide-react";
import { useTimeScrubber } from "@/hooks/useTimeScrubber";
import { useTheme } from "@/hooks/useTheme";
import { ERA_CONFIG } from "@/lib/eras";

const MIN_YEAR = -10000;
const MAX_YEAR = 2025;
const TOTAL_SPAN = MAX_YEAR - MIN_YEAR; // 12025

const TICK_YEARS = [-10000, -500, 500, 1400, 1600, 1800, 2025];
const TICK_YEARS_MOBILE = [-10000, 500, 1800, 2025];

const ERA_ENTRIES = Object.entries(ERA_CONFIG) as [
  string,
  { label: string; color: string; range: readonly [number, number] },
][];

/** Format a year for display: negative years become "X BC". */
function formatYear(year: number): string {
  if (year <= 0) {
    return `${Math.abs(year).toLocaleString()} BC`;
  }
  return year.toLocaleString();
}

/** Convert a year to a fraction (0..1) across the timeline. */
function yearToFraction(year: number): number {
  return (year - MIN_YEAR) / TOTAL_SPAN;
}

/** Convert a fraction (0..1) to a year. */
function fractionToYear(fraction: number): number {
  return MIN_YEAR + fraction * TOTAL_SPAN;
}

export function TimeScrubber() {
  const {
    currentYear,
    isPlaying,
    currentEraLabel,
    currentEraColor,
    toggle,
    setYear,
  } = useTimeScrubber();

  const { theme } = useTheme();
  const isDark = theme === "dark";

  const trackRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  /** Calculate year from a mouse/pointer X position on the track. */
  const yearFromClientX = useCallback((clientX: number): number => {
    const track = trackRef.current;
    if (!track) return MAX_YEAR;
    const rect = track.getBoundingClientRect();
    const fraction = Math.max(
      0,
      Math.min(1, (clientX - rect.left) / rect.width),
    );
    return Math.round(fractionToYear(fraction));
  }, []);

  /** Handle mouse/touch down on the thumb to start dragging. */
  const handleThumbMouseDown = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      isDragging.current = true;
      document.body.style.cursor = "grabbing";
      document.body.style.userSelect = "none";

      const onMouseMove = (ev: MouseEvent) => {
        if (isDragging.current) {
          setYear(yearFromClientX(ev.clientX));
        }
      };

      const onMouseUp = () => {
        isDragging.current = false;
        document.body.style.cursor = "";
        document.body.style.userSelect = "";
        document.removeEventListener("mousemove", onMouseMove);
        document.removeEventListener("mouseup", onMouseUp);
      };

      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseup", onMouseUp);
    },
    [setYear, yearFromClientX],
  );

  /** Handle touch events for mobile dragging */
  const handleThumbTouchStart = useCallback(
    (e: React.TouchEvent) => {
      e.stopPropagation();
      isDragging.current = true;

      const onTouchMove = (ev: TouchEvent) => {
        if (isDragging.current && ev.touches[0]) {
          ev.preventDefault();
          setYear(yearFromClientX(ev.touches[0].clientX));
        }
      };

      const onTouchEnd = () => {
        isDragging.current = false;
        document.removeEventListener("touchmove", onTouchMove);
        document.removeEventListener("touchend", onTouchEnd);
      };

      document.addEventListener("touchmove", onTouchMove, { passive: false });
      document.addEventListener("touchend", onTouchEnd);
    },
    [setYear, yearFromClientX],
  );

  /** Click on the track to jump to that year. */
  const handleTrackClick = useCallback(
    (e: React.MouseEvent) => {
      setYear(yearFromClientX(e.clientX));
    },
    [setYear, yearFromClientX],
  );

  // Clean up dragging state on unmount
  useEffect(() => {
    return () => {
      isDragging.current = false;
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
    };
  }, []);

  const thumbFraction = yearToFraction(currentYear);

  return (
    <div
      className="fixed bottom-[36px] left-0 right-0 z-[90] flex items-center"
      style={{
        height: 70,
        padding: "10px 12px",
        background: isDark ? "rgba(10,10,15,0.95)" : "rgba(255,255,255,0.95)",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
        borderTop: isDark
          ? "1px solid rgba(255,255,255,0.06)"
          : "1px solid var(--atlas-light-grey)",
      }}
    >
      {/* ---- Left Section ---- */}
      <div className="flex items-center gap-2 md:gap-3" style={{ flexShrink: 0 }}>
        {/* Play / Pause button — 44px touch target on mobile */}
        <button
          type="button"
          aria-label={isPlaying ? "Pause" : "Play"}
          onClick={toggle}
          className="flex cursor-pointer items-center justify-center transition-colors"
          style={{
            width: 44,
            height: 44,
            borderRadius: "50%",
            border: "1.5px solid var(--atlas-light-grey)",
            background: "transparent",
          }}
        >
          {isPlaying ? (
            <Pause size={16} style={{ color: "var(--atlas-dark-grey)" }} />
          ) : (
            <Play
              size={16}
              style={{
                color: "var(--atlas-dark-grey)",
                marginLeft: 2,
              }}
            />
          )}
        </button>

        {/* Current year */}
        <span
          className="font-serif text-[18px] md:text-[24px]"
          style={{
            fontWeight: 700,
            color: "var(--atlas-black)",
            minWidth: 70,
          }}
        >
          {formatYear(currentYear)}
        </span>

        {/* Era label — hidden on mobile */}
        <span
          className="font-sans hidden md:inline"
          style={{
            fontSize: 13,
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            color: currentEraColor,
            fontWeight: 600,
          }}
        >
          {currentEraLabel}
        </span>
      </div>

      {/* ---- Center / Track Section ---- */}
      <div
        className="relative flex-1"
        style={{ margin: "0 8px" }}
      >
        {/* Era segments track */}
        <div
          ref={trackRef}
          className="relative flex cursor-pointer overflow-hidden"
          style={{
            height: 28,
            borderRadius: 4,
          }}
          onClick={handleTrackClick}
        >
          {ERA_ENTRIES.map(([key, { color, range }]) => {
            const [start, end] = range;
            const widthPercent = ((end - start) / TOTAL_SPAN) * 100;
            return (
              <div
                key={key}
                style={{
                  width: `${widthPercent}%`,
                  height: "100%",
                  backgroundColor: color,
                  opacity: isDark ? 0.55 : 0.3,
                }}
              />
            );
          })}

          {/* Draggable thumb — wider on mobile for touch */}
          <div
            role="slider"
            aria-label="Timeline position"
            aria-valuemin={MIN_YEAR}
            aria-valuemax={MAX_YEAR}
            aria-valuenow={currentYear}
            aria-valuetext={formatYear(currentYear)}
            tabIndex={0}
            className="absolute top-0 transition-none"
            style={{
              left: `${thumbFraction * 100}%`,
              transform: "translateX(-50%)",
              width: 20,
              height: 28,
              borderRadius: 4,
              backgroundColor: "var(--atlas-accent)",
              cursor: isDragging.current ? "grabbing" : "grab",
              zIndex: 2,
              touchAction: "none",
            }}
            onMouseDown={handleThumbMouseDown}
            onTouchStart={handleThumbTouchStart}
            onKeyDown={(e) => {
              if (e.key === "ArrowLeft") {
                e.preventDefault();
                setYear(currentYear - 50);
              } else if (e.key === "ArrowRight") {
                e.preventDefault();
                setYear(currentYear + 50);
              }
            }}
          />
        </div>

        {/* Tick marks — fewer on mobile */}
        <div
          className="relative"
          style={{ height: 16, marginTop: 2 }}
        >
          {TICK_YEARS.map((year) => {
            const fraction = yearToFraction(year);
            const isMobileTick = TICK_YEARS_MOBILE.includes(year);
            return (
              <span
                key={year}
                className={`absolute font-sans ${isMobileTick ? "" : "hidden md:inline"}`}
                style={{
                  left: `${fraction * 100}%`,
                  transform: "translateX(-50%)",
                  fontSize: 10,
                  color: "var(--atlas-mid-grey)",
                  whiteSpace: "nowrap",
                }}
              >
                {formatYear(year)}
              </span>
            );
          })}
        </div>
      </div>

      {/* ---- Right Section — hidden on mobile ---- */}
      <span
        className="font-sans hidden md:inline"
        style={{
          fontSize: 12,
          color: "var(--atlas-mid-grey)",
          flexShrink: 0,
          whiteSpace: "nowrap",
        }}
      >
        10,000 BC &mdash; 2025
      </span>
    </div>
  );
}
