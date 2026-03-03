"use client";

import { useState } from "react";
import type { HistoricalEvent } from "@/data/types";
import { EventDetailCard } from "@/components/atlas/EventDetailCard";

export function EventDetailCardDemo() {
  const [selectedEvent, setSelectedEvent] = useState<HistoricalEvent | null>(
    null
  );

  if (!selectedEvent) return null;

  return (
    <EventDetailCard
      event={selectedEvent}
      onClose={() => setSelectedEvent(null)}
    />
  );
}
