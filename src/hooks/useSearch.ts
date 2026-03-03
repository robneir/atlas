"use client";

import { useState, useEffect, useMemo } from "react";
import type { Era } from "@/data/types";
import { EVENTS } from "@/data/events";
import { CHRONICLES } from "@/data/chronicles";
import { FIGURES } from "@/data/figures";
import { USERS } from "@/data/users";

export interface SearchResult {
  type: "event" | "chronicle" | "figure" | "user";
  id: string;
  title: string;
  subtitle: string;
  era?: Era;
  url: string;
}

function matchesQuery(query: string, ...fields: string[]): boolean {
  const lower = query.toLowerCase();
  return fields.some((field) => field.toLowerCase().includes(lower));
}

function searchAll(query: string): SearchResult[] {
  if (!query.trim()) return [];

  const results: SearchResult[] = [];

  // Search events
  for (const event of EVENTS) {
    if (matchesQuery(query, event.title, event.location, event.description)) {
      results.push({
        type: "event",
        id: event.id,
        title: event.title,
        subtitle: `${event.date} - ${event.location}`,
        era: event.era,
        url: `/`,
      });
    }
  }

  // Search chronicles
  for (const chronicle of CHRONICLES) {
    if (
      matchesQuery(
        query,
        chronicle.title,
        chronicle.excerpt,
        ...chronicle.tags
      )
    ) {
      results.push({
        type: "chronicle",
        id: chronicle.id,
        title: chronicle.title,
        subtitle: chronicle.excerpt.slice(0, 80) + "...",
        era: chronicle.era,
        url: `/chronicles/${chronicle.id}`,
      });
    }
  }

  // Search figures
  for (const figure of FIGURES) {
    if (matchesQuery(query, figure.name, figure.title, figure.bio)) {
      results.push({
        type: "figure",
        id: figure.id,
        title: figure.name,
        subtitle: figure.title,
        era: figure.era,
        url: `/echoes/${figure.id}`,
      });
    }
  }

  // Search users
  for (const user of USERS) {
    if (matchesQuery(query, user.displayName, user.username)) {
      results.push({
        type: "user",
        id: user.id,
        title: user.displayName,
        subtitle: `@${user.username}`,
        url: `/profile/${user.username}`,
      });
    }
  }

  return results;
}

export interface GroupedResults {
  events: SearchResult[];
  chronicles: SearchResult[];
  figures: SearchResult[];
  users: SearchResult[];
}

export function useSearch(query: string) {
  const [debouncedQuery, setDebouncedQuery] = useState(query);

  // Debounce the query by 200ms
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 200);

    return () => clearTimeout(timer);
  }, [query]);

  const results = useMemo(() => searchAll(debouncedQuery), [debouncedQuery]);

  const grouped: GroupedResults = useMemo(() => {
    return {
      events: results.filter((r) => r.type === "event"),
      chronicles: results.filter((r) => r.type === "chronicle"),
      figures: results.filter((r) => r.type === "figure"),
      users: results.filter((r) => r.type === "user"),
    };
  }, [results]);

  const totalCount = results.length;
  const hasResults = totalCount > 0;

  return {
    results,
    grouped,
    totalCount,
    hasResults,
    isSearching: query !== debouncedQuery,
  };
}
