"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import type { Map as MapboxMap } from "mapbox-gl";

const EVENTS_LAYER_ID = "event-pins";

/**
 * Manages interaction state for the Mapbox GL map:
 * - Map instance ref
 * - Click events on pins → selected event ID
 * - Hover state → cursor changes to pointer over pins
 */
export function useMapInteraction() {
  const mapRef = useRef<MapboxMap | null>(null);
  const listenersAttached = useRef(false);
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
  const [hoveredEventId, setHoveredEventId] = useState<string | null>(null);

  /** Attach map interaction listeners once. Safe to call multiple times. */
  const attachListeners = useCallback((map: MapboxMap) => {
    if (listenersAttached.current) return;
    listenersAttached.current = true;

    // Click on a pin → select event
    map.on("click", EVENTS_LAYER_ID, (e) => {
      if (e.features && e.features.length > 0) {
        const id = e.features[0].properties?.id ?? null;
        setSelectedEventId(id);
      }
    });

    // Click on empty space → deselect
    map.on("click", (e) => {
      try {
        const features = map.queryRenderedFeatures(e.point, {
          layers: [EVENTS_LAYER_ID],
        });
        if (!features.length) {
          setSelectedEventId(null);
        }
      } catch {
        // Layer may not exist during style transitions
      }
    });

    // Hover on pin → pointer cursor + track hovered event
    map.on("mouseenter", EVENTS_LAYER_ID, (e) => {
      map.getCanvas().style.cursor = "pointer";
      if (e.features && e.features.length > 0) {
        const id = e.features[0].properties?.id ?? null;
        setHoveredEventId(id);
      }
    });

    map.on("mouseleave", EVENTS_LAYER_ID, () => {
      map.getCanvas().style.cursor = "";
      setHoveredEventId(null);
    });
  }, []);

  /** Clear selection programmatically. */
  const clearSelection = useCallback(() => {
    setSelectedEventId(null);
  }, []);

  /** Select an event programmatically (e.g., from a list). */
  const selectEvent = useCallback((eventId: string | null) => {
    setSelectedEventId(eventId);
  }, []);

  // Clean up ref on unmount
  useEffect(() => {
    return () => {
      mapRef.current = null;
    };
  }, []);

  return {
    mapRef,
    selectedEventId,
    hoveredEventId,
    attachListeners,
    clearSelection,
    selectEvent,
  };
}
