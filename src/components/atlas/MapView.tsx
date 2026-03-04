"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { useTheme } from "@/hooks/useTheme";
import { useMapInteraction } from "@/hooks/useMapInteraction";
import { EVENTS } from "@/data/events";
import { ERA_CONFIG } from "@/lib/eras";
import { MapBackground } from "./MapBackground";
import type { HistoricalEvent } from "@/data/types";

// Mapbox GL must be imported client-side only
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const LIGHT_STYLE = "mapbox://styles/mapbox/light-v11";
const DARK_STYLE = "mapbox://styles/mapbox/dark-v11";
const INITIAL_CENTER: [number, number] = [20, 30];
const INITIAL_ZOOM = 2.5;
const EVENTS_SOURCE_ID = "events";
const EVENTS_LAYER_ID = "event-pins";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Build the GeoJSON FeatureCollection from event data. */
function buildEventsGeoJSON(): GeoJSON.FeatureCollection {
  return {
    type: "FeatureCollection",
    features: EVENTS.map((event) => ({
      type: "Feature" as const,
      geometry: {
        type: "Point" as const,
        coordinates: event.coordinates,
      },
      properties: {
        id: event.id,
        title: event.title,
        era: event.era,
      },
    })),
  };
}

/** Build the match expression for circle-color based on era. */
function buildEraColorMatch(): mapboxgl.Expression {
  const entries: (string | string[])[] = [];
  for (const [era, config] of Object.entries(ERA_CONFIG)) {
    entries.push(era, (config as { color: string }).color);
  }
  return ["match", ["get", "era"], ...entries, "#888888"] as mapboxgl.Expression;
}

/** Add the events GeoJSON source and circle layer to the map. */
function addEventsLayer(map: mapboxgl.Map) {
  // Guard: don't add if source already exists
  if (map.getSource(EVENTS_SOURCE_ID)) return;

  map.addSource(EVENTS_SOURCE_ID, {
    type: "geojson",
    data: buildEventsGeoJSON(),
  });

  map.addLayer({
    id: EVENTS_LAYER_ID,
    type: "circle",
    source: EVENTS_SOURCE_ID,
    paint: {
      "circle-radius": [
        "interpolate",
        ["linear"],
        ["zoom"],
        1, 4,
        4, 6,
        8, 10,
      ],
      "circle-color": buildEraColorMatch(),
      "circle-opacity": 0.7,
      "circle-stroke-width": 1,
      "circle-stroke-color": "#ffffff",
      "circle-stroke-opacity": 0.5,
    },
  });
}

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------

interface MapViewProps {
  onThisDayEvents?: HistoricalEvent[];
  visitedIds?: Set<string>;
  onSelectEvent?: (eventId: string | null) => void;
  selectedEventId?: string | null;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function MapView({
  onThisDayEvents = [],
  visitedIds = new Set(),
  onSelectEvent,
  selectedEventId,
}: MapViewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { mapRef, attachListeners } = useMapInteraction();
  const { theme } = useTheme();
  const [mapReady, setMapReady] = useState(false);
  const [tokenMissing, setTokenMissing] = useState(false);
  const markersRef = useRef<mapboxgl.Marker[]>([]);

  // Track theme in a ref so the style.load callback always sees the latest.
  const themeRef = useRef(theme);
  useEffect(() => {
    themeRef.current = theme;
  }, [theme]);

  // ------------------------------------------------------------------
  // flyTo helper
  // ------------------------------------------------------------------
  const flyToEvent = useCallback(
    (event: HistoricalEvent) => {
      const map = mapRef.current;
      if (!map) return;
      map.flyTo({
        center: event.coordinates as [number, number],
        zoom: 6,
        duration: 1500,
        essential: true,
      });
    },
    [mapRef]
  );

  // ------------------------------------------------------------------
  // Initialize Mapbox map
  // ------------------------------------------------------------------
  useEffect(() => {
    const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
    if (!token) {
      setTokenMissing(true);
      return;
    }

    if (!containerRef.current) return;

    mapboxgl.accessToken = token;

    // Read saved projection preference (default: globe)
    const savedProjection = localStorage.getItem("atlas-projection") || "globe";

    const map = new mapboxgl.Map({
      container: containerRef.current,
      style: theme === "dark" ? DARK_STYLE : LIGHT_STYLE,
      center: INITIAL_CENTER,
      zoom: INITIAL_ZOOM,
      projection: savedProjection as "globe" | "mercator",
      scrollZoom: true,
      attributionControl: false, // we'll add a compact one
    });

    // Add compact attribution
    map.addControl(
      new mapboxgl.AttributionControl({ compact: true }),
      "bottom-left"
    );

    map.on("load", () => {
      addEventsLayer(map);
      attachListeners(map);
      setMapReady(true);
    });

    mapRef.current = map;

    return () => {
      map.remove();
      mapRef.current = null;
    };
    // Only run once on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ------------------------------------------------------------------
  // Projection switching — listen for 2D/3D toggle
  // ------------------------------------------------------------------
  useEffect(() => {
    function handleProjection(e: Event) {
      const map = mapRef.current;
      if (!map) return;
      const projection = (e as CustomEvent).detail?.projection;
      if (projection === "globe" || projection === "mercator") {
        map.setProjection(projection);
      }
    }

    window.addEventListener("atlas:set-projection", handleProjection);
    return () => window.removeEventListener("atlas:set-projection", handleProjection);
  }, [mapRef]);

  // ------------------------------------------------------------------
  // Theme switching — swap Mapbox style on theme change
  // ------------------------------------------------------------------
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !mapReady) return;

    const newStyle = theme === "dark" ? DARK_STYLE : LIGHT_STYLE;

    // setStyle clears all sources/layers, so we need to re-add after load
    map.setStyle(newStyle);

    const onStyleLoad = () => {
      addEventsLayer(map);
    };

    map.once("style.load", onStyleLoad);

    return () => {
      map.off("style.load", onStyleLoad);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [theme, mapReady]);

  // ------------------------------------------------------------------
  // On This Day — pulsing HTML markers
  // ------------------------------------------------------------------
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !mapReady || onThisDayEvents.length === 0) return;

    // Remove old markers
    markersRef.current.forEach((m) => m.remove());
    markersRef.current = [];

    onThisDayEvents.forEach((event) => {
      const el = document.createElement("div");
      el.className = `on-this-day-marker${visitedIds.has(event.id) ? " on-this-day-marker--visited" : ""}`;
      el.title = event.title;

      el.addEventListener("click", (e) => {
        e.stopPropagation();
        flyToEvent(event);
        onSelectEvent?.(event.id);
      });

      const marker = new mapboxgl.Marker({ element: el, anchor: "center" })
        .setLngLat(event.coordinates as [number, number])
        .addTo(map);

      markersRef.current.push(marker);
    });

    return () => {
      markersRef.current.forEach((m) => m.remove());
      markersRef.current = [];
    };
  }, [mapReady, onThisDayEvents, visitedIds, flyToEvent, onSelectEvent]);

  // ------------------------------------------------------------------
  // Fly to selected event when it changes (e.g. from next/prev)
  // ------------------------------------------------------------------
  useEffect(() => {
    if (!selectedEventId || !mapReady) return;
    const event = onThisDayEvents.find((e) => e.id === selectedEventId);
    if (event) {
      flyToEvent(event);
    }
  }, [selectedEventId, mapReady, onThisDayEvents, flyToEvent]);

  // ------------------------------------------------------------------
  // Update visited state on markers
  // ------------------------------------------------------------------
  useEffect(() => {
    markersRef.current.forEach((marker, i) => {
      if (i < onThisDayEvents.length) {
        const event = onThisDayEvents[i];
        const el = marker.getElement();
        if (visitedIds.has(event.id)) {
          el.classList.add("on-this-day-marker--visited");
        }
      }
    });
  }, [visitedIds, onThisDayEvents]);

  // ------------------------------------------------------------------
  // Render
  // ------------------------------------------------------------------

  // If no token, fall back to the CSS gradient background
  if (tokenMissing) {
    return <MapBackground />;
  }

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-0"
      style={{ width: "100vw", height: "100vh" }}
      aria-label="Interactive historical map"
    />
  );
}
