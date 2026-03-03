"use client";

import { useMemo } from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import type { MonthlyStats } from "@/data/types";

interface ImpactChartProps {
  monthlyStats: MonthlyStats[];
}

const MONTH_NAMES = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

function CustomTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: Array<{ name: string; value: number; color: string }>;
  label?: string;
}) {
  if (!active || !payload?.length) return null;
  return (
    <div
      style={{
        backgroundColor: "#ffffff",
        border: "none",
        borderRadius: 8,
        padding: "10px 14px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.12)",
        fontSize: 13,
      }}
    >
      <div style={{ fontWeight: 600, marginBottom: 4, color: "#1a1714" }}>
        {label}
      </div>
      {payload.map((entry) => (
        <div
          key={entry.name}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            color: "#3a3530",
          }}
        >
          <span
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              backgroundColor: entry.color,
              display: "inline-block",
            }}
          />
          {entry.name}: {entry.value}
        </div>
      ))}
    </div>
  );
}

export default function ImpactChart({ monthlyStats }: ImpactChartProps) {
  const data = useMemo(() => {
    let cumulativeStars = 0;
    let cumulativeVotes = 0;

    return monthlyStats.map((m) => {
      cumulativeStars += m.starsReceived;
      cumulativeVotes += m.votesCast;

      const monthIndex = parseInt(m.month.split("-")[1], 10) - 1;
      return {
        name: MONTH_NAMES[monthIndex],
        "Stars Received": cumulativeStars,
        "Votes Cast": cumulativeVotes,
      };
    });
  }, [monthlyStats]);

  return (
    <div
      style={{
        backgroundColor: "var(--atlas-white)",
        borderRadius: 10,
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
        Impact Over Time
      </h3>

      <ResponsiveContainer width="100%" height={240}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="starsFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#D1401F" stopOpacity={0.2} />
              <stop offset="100%" stopColor="#D1401F" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="votesFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3a3530" stopOpacity={0.1} />
              <stop offset="100%" stopColor="#3a3530" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid
            horizontal={true}
            vertical={false}
            strokeDasharray="4 4"
            stroke="#e8e5e0"
          />
          <XAxis
            dataKey="name"
            tick={{ fontSize: 12, fill: "#b5b0a8" }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fontSize: 12, fill: "#b5b0a8" }}
            axisLine={false}
            tickLine={false}
            width={40}
          />
          <Tooltip content={<CustomTooltip />} />
          <Area
            type="monotone"
            dataKey="Stars Received"
            stroke="#D1401F"
            fill="url(#starsFill)"
            strokeWidth={2}
          />
          <Area
            type="monotone"
            dataKey="Votes Cast"
            stroke="#3a3530"
            fill="url(#votesFill)"
            strokeWidth={2}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
