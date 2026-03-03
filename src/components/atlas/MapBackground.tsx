"use client";

import "./map-background.css";

/** Positions for the 12 decorative map pins (top%, left%). */
const PIN_POSITIONS: [number, number][] = [
  [22, 18],
  [35, 42],
  [28, 65],
  [48, 30],
  [55, 72],
  [40, 85],
  [62, 50],
  [70, 25],
  [32, 52],
  [45, 12],
  [58, 88],
  [75, 68],
];

/**
 * Full-screen CSS-gradient map background.
 * Acts as a placeholder that will be swapped for a real Mapbox GL map later.
 */
export function MapBackground() {
  return (
    <div className="map-bg" aria-hidden="true">
      {/* Terrain — landmasses & ocean */}
      <div className="map-terrain" />

      {/* Coastline outlines */}
      <div className="map-coastlines" />

      {/* Subtle gridlines */}
      <div className="map-gridlines" />

      {/* Decorative map pins */}
      {PIN_POSITIONS.map(([top, left], i) => (
        <div
          key={i}
          className="map-pin"
          style={{ top: `${top}%`, left: `${left}%` }}
        />
      ))}
    </div>
  );
}
