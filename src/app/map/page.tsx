"use client";

import { useState, useMemo, useCallback } from "react";
import { MapView } from "@/components/atlas/MapView";
import { DailyBanner } from "@/components/atlas/DailyBanner";
import { WelcomeHero } from "@/components/atlas/WelcomeHero";
import { MapLensesCard } from "@/components/atlas/MapLensesCard";
import { DataProvidersCard } from "@/components/atlas/DataProvidersCard";
import { EventDetailCard } from "@/components/atlas/EventDetailCard";
import { TimeScrubber } from "@/components/atlas/TimeScrubber";
import { PartnersBar } from "@/components/atlas/PartnersBar";
import { OnThisDayBadge } from "@/components/atlas/OnThisDayBadge";
import { getOnThisDayEvents } from "@/data/events";
import { EVENTS } from "@/data/events";
import type { HistoricalEvent } from "@/data/types";

export default function MapPage() {
  const onThisDayEvents = useMemo(() => {
    const now = new Date();
    return getOnThisDayEvents(now.getMonth() + 1, now.getDate());
  }, []);

  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
  const [visitedIds, setVisitedIds] = useState<Set<string>>(new Set());

  const selectedEvent: HistoricalEvent | null = useMemo(() => {
    if (!selectedEventId) return null;
    return (
      EVENTS.find((e) => e.id === selectedEventId) ??
      null
    );
  }, [selectedEventId]);

  const currentIndex = useMemo(() => {
    if (!selectedEventId) return -1;
    return onThisDayEvents.findIndex((e) => e.id === selectedEventId);
  }, [selectedEventId, onThisDayEvents]);

  const handleSelectEvent = useCallback(
    (eventId: string | null) => {
      setSelectedEventId(eventId);
      if (eventId) {
        setVisitedIds((prev) => new Set(prev).add(eventId));
      }
    },
    []
  );

  const handleNext = useCallback(() => {
    if (currentIndex < onThisDayEvents.length - 1) {
      handleSelectEvent(onThisDayEvents[currentIndex + 1].id);
    }
  }, [currentIndex, onThisDayEvents, handleSelectEvent]);

  const handlePrev = useCallback(() => {
    if (currentIndex > 0) {
      handleSelectEvent(onThisDayEvents[currentIndex - 1].id);
    }
  }, [currentIndex, onThisDayEvents, handleSelectEvent]);

  const handleClose = useCallback(() => {
    setSelectedEventId(null);
  }, []);

  return (
    <div className="h-[calc(100vh-54px)] overflow-hidden">
      <MapView
        onThisDayEvents={onThisDayEvents}
        visitedIds={visitedIds}
        onSelectEvent={handleSelectEvent}
        selectedEventId={selectedEventId}
      />
      <DailyBanner />
      <WelcomeHero />
      <MapLensesCard />
      <DataProvidersCard />

      {selectedEvent && currentIndex >= 0 && (
        <EventDetailCard
          event={selectedEvent}
          onClose={handleClose}
          onNext={currentIndex < onThisDayEvents.length - 1 ? handleNext : undefined}
          onPrev={currentIndex > 0 ? handlePrev : undefined}
          currentIndex={currentIndex}
          totalCount={onThisDayEvents.length}
        />
      )}

      <OnThisDayBadge
        count={onThisDayEvents.length}
        onCycleToFirst={() => {
          const firstUnvisited = onThisDayEvents.find(
            (e) => !visitedIds.has(e.id)
          );
          if (firstUnvisited) {
            handleSelectEvent(firstUnvisited.id);
          } else if (onThisDayEvents.length > 0) {
            handleSelectEvent(onThisDayEvents[0].id);
          }
        }}
      />

      <TimeScrubber />
      <PartnersBar />
    </div>
  );
}
