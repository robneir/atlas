"use client";

import { useMemo } from "react";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
} from "recharts";

interface BreakdownChartProps {
  breakdown: {
    votes: number;
    stars: number;
    corrections: number;
    chronicles: number;
  };
}

const SEGMENT_COLORS: Record<string, string> = {
  Votes: "#D1401F",
  Stars: "#f59e0b",
  Corrections: "#3b82f6",
  Chronicles: "#10b981",
};

function CustomTooltip({
  active,
  payload,
}: {
  active?: boolean;
  payload?: Array<{
    name: string;
    value: number;
    payload: { fill: string };
  }>;
}) {
  if (!active || !payload?.length) return null;
  const entry = payload[0];
  return (
    <div
      style={{
        backgroundColor: "var(--atlas-white)",
        border: "none",
        borderRadius: 4,
        padding: "10px 14px",
        boxShadow: "var(--atlas-shadow-md)",
        fontSize: 13,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 6,
          color: "var(--atlas-black)",
          fontWeight: 600,
        }}
      >
        <span
          style={{
            width: 8,
            height: 8,
            borderRadius: "50%",
            backgroundColor: entry.payload.fill,
            display: "inline-block",
          }}
        />
        {entry.name}: {entry.value}
      </div>
    </div>
  );
}

export default function BreakdownChart({ breakdown }: BreakdownChartProps) {
  const data = useMemo(
    () => [
      { name: "Votes", value: breakdown.votes },
      { name: "Stars", value: breakdown.stars },
      { name: "Corrections", value: breakdown.corrections },
      { name: "Chronicles", value: breakdown.chronicles },
    ],
    [breakdown]
  );

  const total = data.reduce((sum, d) => sum + d.value, 0);

  return (
    <div
      style={{
        backgroundColor: "var(--atlas-white)",
        borderRadius: 4,
        padding: 20,
        boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
      }}
    >
      <h3
        className="font-accent"
        style={{
          fontSize: 16,
          fontWeight: 700,
          color: "var(--atlas-black)",
          margin: "0 0 16px",
        }}
      >
        Contribution Breakdown
      </h3>

      {/* Chart with centered total */}
      <div style={{ position: "relative", width: "100%", height: 200 }}>
        <ResponsiveContainer width="100%" height={200}>
          <PieChart>
            <Pie
              data={data}
              innerRadius={55}
              outerRadius={80}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              strokeWidth={0}
            >
              {data.map((entry) => (
                <Cell
                  key={entry.name}
                  fill={SEGMENT_COLORS[entry.name]}
                />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>

        {/* Center total overlay */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            textAlign: "center",
            pointerEvents: "none",
          }}
        >
          <div
            style={{
              fontSize: 24,
              fontWeight: 700,
              color: "var(--atlas-black)",
              lineHeight: 1.2,
            }}
          >
            {total.toLocaleString()}
          </div>
          <div style={{ fontSize: 11, color: "var(--atlas-mid-grey)" }}>
            total
          </div>
        </div>
      </div>

      {/* Legend */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          gap: "12px 20px",
          marginTop: 12,
        }}
      >
        {data.map((entry) => (
          <div
            key={entry.name}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              fontSize: 13,
              color: "var(--atlas-black)",
            }}
          >
            <span
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                backgroundColor: SEGMENT_COLORS[entry.name],
                display: "inline-block",
                flexShrink: 0,
              }}
            />
            {entry.name}
            <span style={{ color: "var(--atlas-mid-grey)", fontWeight: 500 }}>
              {entry.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
