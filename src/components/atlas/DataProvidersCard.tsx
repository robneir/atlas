"use client";

import { useState } from "react";
import { Layers, ChevronUp } from "lucide-react";

export function DataProvidersCard() {
  const [expanded, setExpanded] = useState(true);

  return (
    <div
      className="fixed bottom-[120px] right-3 md:right-[20px] z-50 hidden md:block"
      style={{
        width: 300,
        borderRadius: 10,
        boxShadow: "var(--atlas-shadow-md)",
        backgroundColor: "var(--atlas-white)",
        padding: "14px 16px",
      }}
    >
      {/* Header */}
      <button
        type="button"
        onClick={() => setExpanded((v) => !v)}
        className="flex w-full cursor-pointer items-center justify-between"
        style={{ marginBottom: expanded ? 8 : 0, border: "none", background: "none", padding: 0 }}
      >
        <span
          className="flex items-center gap-[6px] font-sans text-[14px] font-semibold"
          style={{ color: "var(--atlas-link)" }}
        >
          <Layers size={14} />
          Community Contributors
        </span>
        <ChevronUp
          size={12}
          style={{
            color: "var(--atlas-mid-grey)",
            transform: expanded ? "rotate(0deg)" : "rotate(180deg)",
            transition: "transform 0.2s ease",
          }}
        />
      </button>

      {/* Body */}
      {expanded && (
        <p
          className="font-sans text-[13px] leading-[1.5]"
          style={{ color: "var(--atlas-dark-grey)", margin: 0 }}
        >
          This platform shows{" "}
          <strong style={{ fontWeight: 700 }}>12,847 historical events</strong>{" "}
          across{" "}
          <strong style={{ fontWeight: 700 }}>3,291 chronicles</strong> from{" "}
          <strong style={{ fontWeight: 700 }}>847 contributors</strong>. Data
          curated by historians and researchers worldwide.{" "}
          <a
            href="#"
            className="underline underline-offset-2 transition-colors hover:opacity-80"
            style={{ color: "var(--atlas-link)" }}
          >
            Learn more.
          </a>
        </p>
      )}
    </div>
  );
}
