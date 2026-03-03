"use client";

import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Search, Calendar, BookOpen, User, Users } from "lucide-react";
import { useSearch } from "@/hooks/useSearch";
import { EraTag } from "@/components/shared/EraTag";
import type { SearchResult } from "@/hooks/useSearch";

/* ------------------------------------------------------------------ */
/*  SearchModal                                                        */
/* ------------------------------------------------------------------ */

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const TYPE_ICON = {
  event: Calendar,
  chronicle: BookOpen,
  figure: User,
  user: Users,
} as const;

const SECTION_LABELS: Record<string, string> = {
  events: "Events",
  chronicles: "Chronicles",
  figures: "Figures",
  users: "Contributors",
};

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [highlightIndex, setHighlightIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const [animating, setAnimating] = useState(false);

  const { grouped, hasResults } = useSearch(query);

  // Flatten results for keyboard navigation
  const flatResults = useMemo(() => {
    const flat: SearchResult[] = [];
    if (grouped.events.length) flat.push(...grouped.events);
    if (grouped.chronicles.length) flat.push(...grouped.chronicles);
    if (grouped.figures.length) flat.push(...grouped.figures);
    if (grouped.users.length) flat.push(...grouped.users);
    return flat;
  }, [grouped]);

  // Reset state when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      setQuery("");
      setHighlightIndex(-1);
      setAnimating(true);
      // Focus input after animation frame
      requestAnimationFrame(() => {
        inputRef.current?.focus();
      });
    }
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    if (!isOpen) return;

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Reset highlight when results change
  useEffect(() => {
    setHighlightIndex(-1);
  }, [query]);

  // Navigate to a result
  const navigateTo = useCallback(
    (result: SearchResult) => {
      onClose();
      router.push(result.url);
    },
    [onClose, router]
  );

  // Keyboard navigation within the input
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setHighlightIndex((prev) =>
          prev < flatResults.length - 1 ? prev + 1 : 0
        );
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setHighlightIndex((prev) =>
          prev > 0 ? prev - 1 : flatResults.length - 1
        );
      } else if (e.key === "Enter" && highlightIndex >= 0) {
        e.preventDefault();
        const result = flatResults[highlightIndex];
        if (result) navigateTo(result);
      }
    },
    [flatResults, highlightIndex, navigateTo]
  );

  // Scroll highlighted item into view
  useEffect(() => {
    if (highlightIndex < 0 || !listRef.current) return;
    const items = listRef.current.querySelectorAll("[data-search-item]");
    const target = items[highlightIndex];
    if (target) {
      target.scrollIntoView({ block: "nearest" });
    }
  }, [highlightIndex]);

  if (!isOpen) return null;

  // Compute a running index for flatResults mapping
  let runningIndex = 0;

  return (
    <div
      className="fixed inset-0"
      role="dialog"
      aria-modal="true"
      aria-label="Search Atlas"
      style={{
        zIndex: 150,
        animation: animating ? "searchFadeIn 0.15s ease-out" : undefined,
      }}
      onAnimationEnd={() => setAnimating(false)}
    >
      {/* Overlay */}
      <div
        className="absolute inset-0"
        style={{ background: "rgba(0,0,0,0.50)" }}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Content card */}
      <div
        className="relative mx-auto"
        style={{
          maxWidth: 600,
          marginTop: "min(20vh, 160px)",
          background: "var(--atlas-white)",
          borderRadius: 12,
          boxShadow: "var(--atlas-shadow-lg)",
          overflow: "hidden",
          animation: animating
            ? "searchScaleIn 0.15s ease-out"
            : undefined,
        }}
      >
        {/* Search input row */}
        <div
          className="flex items-center"
          style={{
            padding: "0 20px",
            borderBottom: "1px solid var(--atlas-light-grey)",
          }}
        >
          <Search
            size={18}
            style={{ color: "var(--atlas-mid-grey)", flexShrink: 0 }}
          />
          <input
            ref={inputRef}
            type="text"
            role="combobox"
            aria-label="Search events, chronicles, figures"
            aria-expanded={hasResults && query.trim().length > 0}
            aria-controls="search-results-list"
            aria-activedescendant={highlightIndex >= 0 ? `search-result-${highlightIndex}` : undefined}
            aria-autocomplete="list"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search events, chronicles, figures..."
            className="flex-1 outline-none"
            style={{
              padding: "16px 14px",
              fontSize: 17,
              fontFamily: "var(--font-source-sans), sans-serif",
              background: "transparent",
              border: "none",
              color: "var(--atlas-black)",
            }}
          />
          <button
            type="button"
            aria-label="Close search"
            onClick={onClose}
            className="flex items-center justify-center cursor-pointer"
            style={{
              padding: "3px 8px",
              borderRadius: 5,
              fontSize: 11,
              fontWeight: 600,
              fontFamily: "var(--font-source-sans), sans-serif",
              color: "var(--atlas-mid-grey)",
              background: "var(--atlas-off-white)",
              border: "1px solid var(--atlas-light-grey)",
              lineHeight: 1.4,
            }}
          >
            ESC
          </button>
        </div>

        {/* Results area */}
        <div
          ref={listRef}
          id="search-results-list"
          role="listbox"
          aria-label="Search results"
          style={{
            maxHeight: 400,
            overflowY: "auto",
            paddingBottom: 12,
          }}
        >
          {/* Initial state - no query */}
          {!query.trim() && (
            <div
              className="flex items-center justify-center"
              style={{
                padding: "40px 20px",
                fontSize: 14,
                color: "var(--atlas-mid-grey)",
                fontFamily: "var(--font-source-sans), sans-serif",
              }}
            >
              Start typing to search across all of Atlas
            </div>
          )}

          {/* Empty state - query but no results */}
          {query.trim() && !hasResults && (
            <div
              role="status"
              aria-live="polite"
              className="flex items-center justify-center"
              style={{
                padding: "40px 20px",
                fontSize: 14,
                color: "var(--atlas-mid-grey)",
                fontFamily: "var(--font-source-sans), sans-serif",
              }}
            >
              No results found
            </div>
          )}

          {/* Results grouped by type */}
          {query.trim() &&
            hasResults &&
            (
              Object.entries(SECTION_LABELS) as [
                keyof typeof SECTION_LABELS,
                string,
              ][]
            ).map(([key, label]) => {
              const items =
                grouped[key as keyof typeof grouped] ?? [];
              if (items.length === 0) return null;

              const startIndex = runningIndex;
              runningIndex += items.length;

              return (
                <div key={key}>
                  {/* Section header */}
                  <div
                    style={{
                      padding: "8px 20px",
                      fontSize: 11,
                      fontWeight: 700,
                      textTransform: "uppercase",
                      letterSpacing: "0.06em",
                      color: "var(--atlas-mid-grey)",
                      fontFamily: "var(--font-source-sans), sans-serif",
                    }}
                  >
                    {label}
                  </div>

                  {/* Section items */}
                  {items.map((result, i) => {
                    const globalIndex = startIndex + i;
                    const isHighlighted = globalIndex === highlightIndex;
                    const Icon =
                      TYPE_ICON[result.type as keyof typeof TYPE_ICON];

                    return (
                      <div
                        key={result.id}
                        id={`search-result-${globalIndex}`}
                        role="option"
                        aria-selected={isHighlighted}
                        data-search-item
                        className="flex items-center cursor-pointer transition-colors duration-100"
                        style={{
                          padding: "10px 20px",
                          gap: 14,
                          background: isHighlighted
                            ? "var(--atlas-off-white)"
                            : "transparent",
                        }}
                        onClick={() => navigateTo(result)}
                        onMouseEnter={() => setHighlightIndex(globalIndex)}
                      >
                        {/* Type icon */}
                        <div
                          className="flex items-center justify-center flex-shrink-0"
                          style={{
                            width: 32,
                            height: 32,
                            borderRadius: 8,
                            background: "var(--atlas-off-white)",
                          }}
                        >
                          <Icon
                            size={15}
                            style={{ color: "var(--atlas-dark-grey)" }}
                          />
                        </div>

                        {/* Title + subtitle */}
                        <div className="flex-1 min-w-0">
                          <div
                            className="truncate"
                            style={{
                              fontSize: 15,
                              fontWeight: 600,
                              color: "var(--atlas-black)",
                              fontFamily:
                                "var(--font-source-sans), sans-serif",
                              lineHeight: 1.3,
                            }}
                          >
                            {result.title}
                          </div>
                          <div
                            className="truncate"
                            style={{
                              fontSize: 13,
                              color: "var(--atlas-mid-grey)",
                              fontFamily:
                                "var(--font-source-sans), sans-serif",
                              lineHeight: 1.4,
                            }}
                          >
                            {result.subtitle}
                          </div>
                        </div>

                        {/* Era tag */}
                        {result.era && (
                          <div className="flex-shrink-0">
                            <EraTag era={result.era} />
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              );
            })}
        </div>
      </div>

    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  SearchWrapper — manages open state + CMD+K shortcut               */
/* ------------------------------------------------------------------ */

export function SearchWrapper() {
  const [isOpen, setIsOpen] = useState(false);

  // Global CMD+K shortcut
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Listen for custom event from TopBar search button
  useEffect(() => {
    function handleOpenSearch() {
      setIsOpen(true);
    }

    window.addEventListener("atlas:open-search", handleOpenSearch);
    return () =>
      window.removeEventListener("atlas:open-search", handleOpenSearch);
  }, []);

  return (
    <SearchModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
  );
}
