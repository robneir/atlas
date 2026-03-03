"use client";

import { useRef, useEffect, useState } from "react";
import { useTheme } from "@/hooks/useTheme";
import { useMapInteraction } from "@/hooks/useMapInteraction";
import { EVENTS } from "@/data/events";
import { ERA_CONFIG } from "@/lib/eras";
import { MapBackground } from "./MapBackground";

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
// Component
// ---------------------------------------------------------------------------

export function MapView() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { mapRef, attachListeners } = useMapInteraction();
  const { theme } = useTheme();
  const [mapReady, setMapReady] = useState(false);
  const [tokenMissing, setTokenMissing] = useState(false);

  // Track theme in a ref so the style.load callback always sees the latest.
  const themeRef = useRef(theme);
  useEffect(() => {
    themeRef.current = theme;
  }, [theme]);

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

    const map = new mapboxgl.Map({
      container: containerRef.current,
      style: theme === "dark" ? DARK_STYLE : LIGHT_STYLE,
      center: INITIAL_CENTER,
      zoom: INITIAL_ZOOM,
      scrollZoom: false, // disabled initially per spec
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
