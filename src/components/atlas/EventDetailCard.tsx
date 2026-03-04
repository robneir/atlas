"use client";

import { X, MapPin, ChevronLeft, ChevronRight } from "lucide-react";
import type { HistoricalEvent } from "@/data/types";
import { FIGURES } from "@/data/figures";
import { EraTag } from "@/components/shared/EraTag";
import { VoteButtons } from "@/components/shared/VoteButtons";

interface EventDetailCardProps {
  event: HistoricalEvent;
  onClose: () => void;
  onNext?: () => void;
  onPrev?: () => void;
  currentIndex?: number;
  totalCount?: number;
}

export function EventDetailCard({
  event,
  onClose,
  onNext,
  onPrev,
  currentIndex,
  totalCount,
}: EventDetailCardProps) {
  // Find the first related figure for the "Chat with" button
  const relatedFigure = FIGURES.find((f) =>
    event.relatedFigureIds.includes(f.id)
  );

  return (
    <div
      role="dialog"
      aria-label={`Event details: ${event.title}`}
      className="event-detail-card fixed z-[80] left-3 right-3 md:left-1/2 md:right-auto md:w-[420px] md:-translate-x-1/2"
      style={{
        bottom: 120,
        backgroundColor: "var(--atlas-white)",
        borderRadius: 4,
        boxShadow: "var(--atlas-shadow-lg)",
        padding: "20px",
        animation: "eventCardSlideUp 0.3s ease-out both",
      }}
    >
      {/* Close button */}
      <button
        type="button"
        aria-label="Close event details"
        onClick={onClose}
        className="absolute flex cursor-pointer items-center justify-center transition-colors"
        style={{
          top: 12,
          right: 12,
          width: 32,
          height: 32,
          borderRadius: "50%",
          border: "none",
          background: "transparent",
          color: "var(--atlas-mid-grey)",
        }}
        onMouseEnter={(e) =>
          (e.currentTarget.style.color = "var(--atlas-black)")
        }
        onMouseLeave={(e) =>
          (e.currentTarget.style.color = "var(--atlas-mid-grey)")
        }
      >
        <X size={16} />
      </button>

      {/* Era tag */}
      <EraTag era={event.era} />

      {/* Date */}
      <p
        className="font-sans"
        style={{
          fontSize: 13,
          color: "var(--atlas-mid-grey)",
          marginTop: 8,
          marginBottom: 0,
        }}
      >
        {event.date}
      </p>

      {/* Title */}
      <h2
        className="font-serif text-[18px] md:text-[22px]"
        style={{
          fontWeight: 700,
          color: "var(--atlas-black)",
          marginTop: 6,
          marginBottom: 0,
          lineHeight: 1.3,
        }}
      >
        {event.title}
      </h2>

      {/* Location */}
      <p
        className="flex items-center gap-[5px] font-sans"
        style={{
          fontSize: 14,
          color: "var(--atlas-dark-grey)",
          marginTop: 4,
          marginBottom: 0,
        }}
      >
        <MapPin size={13} style={{ flexShrink: 0 }} />
        {event.location}
      </p>

      {/* Description */}
      <p
        className="font-sans text-[14px] md:text-[15px]"
        style={{
          lineHeight: 1.6,
          color: "var(--atlas-charcoal)",
          marginTop: 12,
          marginBottom: 0,
        }}
      >
        {event.description}
      </p>

      {/* Action buttons */}
      <div className="flex flex-wrap gap-2" style={{ marginTop: 16 }}>
        <button
          type="button"
          className="cursor-pointer font-sans transition-colors"
          style={{
            padding: "12px 18px",
            fontSize: 13,
            fontWeight: 600,
            borderRadius: 4,
            border: "1.5px solid var(--atlas-light-grey)",
            background: "transparent",
            color: "var(--atlas-dark-grey)",
          }}
        >
          View Timeline
        </button>
        <button
          type="button"
          className="cursor-pointer font-sans transition-colors"
          style={{
            padding: "12px 18px",
            fontSize: 13,
            fontWeight: 600,
            borderRadius: 4,
            border: "1.5px solid var(--atlas-light-grey)",
            background: "transparent",
            color: "var(--atlas-dark-grey)",
          }}
        >
          Read Chronicle
        </button>
        {relatedFigure && (
          <button
            type="button"
            className="cursor-pointer font-sans transition-colors"
            style={{
              padding: "12px 18px",
              fontSize: 13,
              fontWeight: 600,
              borderRadius: 4,
              border: "1.5px solid transparent",
              backgroundColor: "var(--atlas-accent)",
              color: "#ffffff",
            }}
          >
            Chat with {relatedFigure.name}
          </button>
        )}
      </div>

      {/* Vote / interaction row */}
      <div style={{ display: "flex", alignItems: "center", gap: 16, marginTop: 12, paddingTop: 12, borderTop: "1px solid var(--atlas-light-grey)" }}>
        <VoteButtons itemId={event.id} initialScore={Math.abs(event.year % 50) + 10} />
      </div>

      {/* Next / Prev navigation */}
      {totalCount != null && totalCount > 1 && (
        <div
          className="font-sans"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: 12,
            paddingTop: 12,
            borderTop: "1px solid var(--atlas-light-grey)",
          }}
        >
          <button
            type="button"
            disabled={!onPrev}
            onClick={onPrev}
            className="cursor-pointer transition-colors"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 4,
              padding: "6px 10px",
              borderRadius: 4,
              border: "1px solid var(--atlas-light-grey)",
              background: "transparent",
              color: onPrev ? "var(--atlas-charcoal)" : "var(--atlas-light-grey)",
              fontSize: 13,
              fontWeight: 500,
            }}
          >
            <ChevronLeft size={14} />
            Prev
          </button>
          <span
            style={{
              fontSize: 12,
              color: "var(--atlas-mid-grey)",
              fontWeight: 500,
            }}
          >
            {(currentIndex ?? 0) + 1} of {totalCount}
          </span>
          <button
            type="button"
            disabled={!onNext}
            onClick={onNext}
            className="cursor-pointer transition-colors"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 4,
              padding: "6px 10px",
              borderRadius: 4,
              border: "1px solid var(--atlas-light-grey)",
              background: "transparent",
              color: onNext ? "var(--atlas-charcoal)" : "var(--atlas-light-grey)",
              fontSize: 13,
              fontWeight: 500,
            }}
          >
            Next
            <ChevronRight size={14} />
          </button>
        </div>
      )}
    </div>
  );
}
