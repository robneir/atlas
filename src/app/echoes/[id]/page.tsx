"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { FIGURES } from "@/data/figures";
import { FigurePortrait } from "@/components/echoes/FigurePortrait";
import { ChatPanel } from "@/components/echoes/ChatPanel";
import { ArrowLeft } from "lucide-react";

export default function EchoesChatPage() {
  const params = useParams();
  const figureId = params.id as string;
  const figure = FIGURES.find((f) => f.id === figureId);

  if (!figure) {
    return (
      <div
        style={{
          minHeight: "calc(100vh - 54px)",
          backgroundColor: "var(--atlas-cream)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          className="font-sans"
          style={{
            textAlign: "center",
            color: "var(--atlas-dark-grey)",
          }}
        >
          <p style={{ fontSize: 18, marginBottom: 16 }}>Figure not found.</p>
          <Link
            href="/echoes"
            style={{
              color: "var(--atlas-accent)",
              textDecoration: "none",
              fontWeight: 600,
              fontSize: 15,
            }}
          >
            Back to Echoes
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "calc(100vh - 54px)",
        backgroundColor: "var(--atlas-cream)",
      }}
    >
      {/* Back link */}
      <div
        style={{
          padding: "16px 16px",
          maxWidth: 1100,
          margin: "0 auto",
        }}
        className="md:!px-7"
      >
        <Link
          href="/echoes"
          className="font-sans"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            color: "var(--atlas-dark-grey)",
            textDecoration: "none",
            fontSize: 14,
            fontWeight: 500,
            transition: "color 0.2s ease",
          }}
        >
          <ArrowLeft size={16} />
          Back to Echoes
        </Link>
      </div>

      {/* Split view — stacks vertically on mobile */}
      <div
        className="flex flex-col md:flex-row"
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          minHeight: "calc(100vh - 54px - 52px)",
        }}
      >
        {/* Left side: FigurePortrait */}
        <div
          className="w-full md:w-[380px] md:flex-shrink-0"
          style={{
            backgroundColor: "var(--atlas-white)",
            borderRadius: "10px 10px 0 0",
            overflow: "hidden",
            boxShadow: "var(--atlas-shadow-sm)",
          }}
        >
          <FigurePortrait figure={figure} />
        </div>

        {/* Right side: ChatPanel */}
        <div
          className="flex-1 min-h-[400px] md:min-h-0"
          style={{
            backgroundColor: "var(--atlas-white)",
            borderRadius: "0 0 10px 10px",
            borderTop: "1px solid var(--atlas-light-grey)",
            boxShadow: "var(--atlas-shadow-sm)",
          }}
        >
          <ChatPanel figure={figure} />
        </div>
      </div>
    </div>
  );
}
