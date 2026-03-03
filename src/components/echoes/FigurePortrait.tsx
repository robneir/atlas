import type { HistoricalFigure } from "@/data/types";
import { ERA_CONFIG } from "@/lib/eras";
import { EraTag } from "@/components/shared/EraTag";

interface FigurePortraitProps {
  figure: HistoricalFigure;
}

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

function formatYear(year: number): string {
  if (year < 0) return `${Math.abs(year)} BC`;
  return `${year} AD`;
}

export function FigurePortrait({ figure }: FigurePortraitProps) {
  const eraColor = ERA_CONFIG[figure.era].color;
  const initials = getInitials(figure.name);

  return (
    <div style={{ width: "100%" }}>
      {/* Portrait area */}
      <div
        style={{
          height: 300,
          background: `linear-gradient(135deg, ${eraColor}cc, ${eraColor}88, ${eraColor}55)`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {figure.portraitUrl ? (
          <img
            src={figure.portraitUrl}
            alt={figure.name}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        ) : (
          <span
            className="font-serif"
            style={{
              fontSize: 72,
              fontWeight: 700,
              color: "#fff",
              userSelect: "none",
            }}
          >
            {initials}
          </span>
        )}
      </div>

      {/* Info area */}
      <div style={{ padding: 24 }}>
        <h2
          className="font-serif"
          style={{
            fontSize: 28,
            fontWeight: 700,
            color: "var(--atlas-black)",
            margin: 0,
          }}
        >
          {figure.name}
        </h2>

        <p
          className="font-sans"
          style={{
            fontSize: 16,
            color: "var(--atlas-dark-grey)",
            margin: 0,
            marginTop: 4,
          }}
        >
          {figure.title}
        </p>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            marginTop: 12,
          }}
        >
          <EraTag era={figure.era} />
          <span
            className="font-sans"
            style={{
              fontSize: 13,
              color: "var(--atlas-mid-grey)",
              fontWeight: 500,
            }}
          >
            {formatYear(figure.birthYear)} &ndash;{" "}
            {formatYear(figure.deathYear)}
          </span>
        </div>

        {/* Key facts */}
        <ul
          className="font-sans"
          style={{
            fontSize: 14,
            color: "var(--atlas-dark-grey)",
            lineHeight: 1.6,
            margin: 0,
            marginTop: 16,
            paddingLeft: 18,
          }}
        >
          {figure.keyFacts.map((fact, i) => (
            <li key={i} style={{ marginBottom: 4 }}>
              {fact}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
