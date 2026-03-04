"use client";

import { useState, useEffect } from "react";
import { Search, MapPin, Info, Globe } from "lucide-react";

/**
 * Top-left search UI floating over the map, positioned below the TopBar.
 * Tagline + search bar + action buttons + 2D/3D toggle.
 */
export function WelcomeHero() {
  const [is3D, setIs3D] = useState(true);

  // Sync from localStorage after mount to avoid hydration mismatch
  useEffect(() => {
    const saved = localStorage.getItem("atlas-projection");
    if (saved === "mercator") setIs3D(false);
  }, []);

  function toggleProjection() {
    const next = !is3D;
    setIs3D(next);
    const projection = next ? "globe" : "mercator";
    localStorage.setItem("atlas-projection", projection);
    window.dispatchEvent(
      new CustomEvent("atlas:set-projection", {
        detail: { projection },
      })
    );
  }

  return (
    <section
      aria-label="Welcome to Atlas"
      className="fixed z-10 pointer-events-none"
      style={{
        top: 70,
        left: 24,
      }}
    >
      <div className="pointer-events-auto flex flex-col items-start">
        {/* Tagline */}
        <p
          className="mb-3 font-sans text-[13px] md:text-[14px] font-medium tracking-wide"
          style={{
            color: "var(--atlas-charcoal)",
            textShadow: "0 1px 4px rgba(255,255,255,0.7)",
          }}
        >
          Explore the history of everything.
        </p>

        {/* Search bar */}
        <button
          type="button"
          aria-label="Search events, figures, eras..."
          className="flex items-center gap-3 cursor-pointer transition-all duration-200"
          style={{
            width: "100%",
            maxWidth: 400,
            padding: "12px 20px",
            borderRadius: 9999,
            border: "1.5px solid var(--atlas-light-grey)",
            backgroundColor: "var(--atlas-white)",
            boxShadow: "0 4px 20px rgba(0,0,0,0.12), 0 1px 4px rgba(0,0,0,0.08)",
          }}
          onClick={() => {
            window.dispatchEvent(new CustomEvent("atlas:open-search"));
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = "0 6px 28px rgba(0,0,0,0.16), 0 2px 6px rgba(0,0,0,0.1)";
            e.currentTarget.style.borderColor = "var(--atlas-mid-grey)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.12), 0 1px 4px rgba(0,0,0,0.08)";
            e.currentTarget.style.borderColor = "var(--atlas-light-grey)";
          }}
        >
          <Search
            size={16}
            style={{ color: "var(--atlas-link)", flexShrink: 0 }}
          />
          <span
            className="font-sans text-[14px]"
            style={{ color: "var(--atlas-link)", opacity: 0.7 }}
          >
            Search events, figures, eras...
          </span>
        </button>

        {/* Action buttons */}
        <div className="mt-3 flex gap-2">
          {/* History Near Me */}
          <button
            type="button"
            className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full px-4 py-2 text-[12px] md:text-[13px] font-semibold cursor-pointer transition-all duration-200"
            style={{
              backgroundColor: "var(--atlas-white)",
              border: "1.5px solid var(--atlas-light-grey)",
              color: "var(--atlas-charcoal)",
              boxShadow: "var(--atlas-shadow-sm)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "var(--atlas-mid-grey)";
              e.currentTarget.style.boxShadow = "var(--atlas-shadow-md)";
              e.currentTarget.style.transform = "translateY(-1px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "var(--atlas-light-grey)";
              e.currentTarget.style.boxShadow = "var(--atlas-shadow-sm)";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            <MapPin size={14} />
            History Near Me
          </button>

          {/* Take a Tour */}
          <button
            type="button"
            className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full px-4 py-2 text-[12px] md:text-[13px] font-semibold cursor-pointer transition-all duration-200"
            style={{
              backgroundColor: "var(--atlas-white)",
              border: "1.5px solid var(--atlas-light-grey)",
              color: "var(--atlas-charcoal)",
              boxShadow: "var(--atlas-shadow-sm)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "var(--atlas-mid-grey)";
              e.currentTarget.style.boxShadow = "var(--atlas-shadow-md)";
              e.currentTarget.style.transform = "translateY(-1px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "var(--atlas-light-grey)";
              e.currentTarget.style.boxShadow = "var(--atlas-shadow-sm)";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            <Info size={14} />
            Take a Tour
          </button>

          {/* 2D / 3D toggle */}
          <button
            type="button"
            aria-label={is3D ? "Switch to 2D map" : "Switch to 3D globe"}
            className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full px-4 py-2 text-[12px] md:text-[13px] font-semibold cursor-pointer transition-all duration-200"
            style={{
              backgroundColor: is3D ? "var(--atlas-accent)" : "var(--atlas-white)",
              border: is3D ? "1.5px solid var(--atlas-accent)" : "1.5px solid var(--atlas-light-grey)",
              color: is3D ? "#fff" : "var(--atlas-charcoal)",
              boxShadow: "var(--atlas-shadow-sm)",
            }}
            onClick={toggleProjection}
            onMouseEnter={(e) => {
              if (!is3D) {
                e.currentTarget.style.borderColor = "var(--atlas-mid-grey)";
              }
              e.currentTarget.style.boxShadow = "var(--atlas-shadow-md)";
              e.currentTarget.style.transform = "translateY(-1px)";
            }}
            onMouseLeave={(e) => {
              if (!is3D) {
                e.currentTarget.style.borderColor = "var(--atlas-light-grey)";
              }
              e.currentTarget.style.boxShadow = "var(--atlas-shadow-sm)";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            <Globe size={14} />
            {is3D ? "2D Map" : "3D Globe"}
          </button>
        </div>
      </div>
    </section>
  );
}
