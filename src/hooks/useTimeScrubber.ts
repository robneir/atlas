"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { ERA_CONFIG } from "@/lib/eras";
import type { Era } from "@/data/types";

const MIN_YEAR = -10000;
const MAX_YEAR = 2025;

/** Determine which era a given year falls into. */
function getEraForYear(year: number): Era {
  for (const [key, config] of Object.entries(ERA_CONFIG)) {
    const [start, end] = config.range;
    if (year >= start && year < end) {
      return key as Era;
    }
  }
  // Edge case: year === 2025 falls at the boundary of contemporary
  return "contemporary";
}

export interface TimeScrubberState {
  currentYear: number;
  isPlaying: boolean;
  currentEra: Era;
  currentEraLabel: string;
  currentEraColor: string;
  play: () => void;
  pause: () => void;
  toggle: () => void;
  setYear: (year: number) => void;
}

/**
 * Manages the time scrubber state:
 * - current year (clamped to [-10000, 2025])
 * - play/pause for auto-rewinding through history
 * - computed era label and color from ERA_CONFIG
 */
export function useTimeScrubber(): TimeScrubberState {
  const [currentYear, setCurrentYear] = useState(MAX_YEAR);
  const [isPlaying, setIsPlaying] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const currentEra = getEraForYear(currentYear);
  const eraConfig = ERA_CONFIG[currentEra];
  const currentEraLabel = eraConfig.label;
  const currentEraColor = eraConfig.color;

  const clampYear = useCallback((year: number) => {
    return Math.max(MIN_YEAR, Math.min(MAX_YEAR, Math.round(year)));
  }, []);

  const setYear = useCallback(
    (year: number) => {
      setCurrentYear(clampYear(year));
    },
    [clampYear],
  );

  const play = useCallback(() => {
    setIsPlaying(true);
  }, []);

  const pause = useCallback(() => {
    setIsPlaying(false);
  }, []);

  const toggle = useCallback(() => {
    setIsPlaying((prev) => {
      if (!prev) {
        // If at MIN_YEAR, reset to MAX_YEAR before playing
        setCurrentYear((year) => (year <= MIN_YEAR ? MAX_YEAR : year));
      }
      return !prev;
    });
  }, []);

  // Auto-advance: rewind through history (decrement by 100 every 200ms)
  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setCurrentYear((prev) => {
          const next = prev - 100;
          if (next <= MIN_YEAR) {
            setIsPlaying(false);
            return MIN_YEAR;
          }
          return next;
        });
      }, 200);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isPlaying]);

  return {
    currentYear,
    isPlaying,
    currentEra,
    currentEraLabel,
    currentEraColor,
    play,
    pause,
    toggle,
    setYear,
  };
}
