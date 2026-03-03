"use client";

import { useState } from "react";

interface InterestPickerProps {
  onComplete: () => void;
}

const ERAS = [
  "Ancient",
  "Classical",
  "Medieval",
  "Renaissance",
  "Enlightenment",
  "Modern",
  "Contemporary",
];

const TOPICS = [
  "Wars & Battles",
  "Science & Discovery",
  "Art & Culture",
  "Philosophy",
  "Trade & Commerce",
  "Exploration",
  "Architecture",
  "Revolution",
];

const pillBase: React.CSSProperties = {
  border: "1px solid rgba(255, 255, 255, 0.3)",
  padding: "8px 18px",
  borderRadius: 999,
  color: "white",
  fontFamily: "var(--font-source-sans), sans-serif",
  fontSize: 14,
  background: "transparent",
  cursor: "pointer",
  transition: "all 0.2s ease",
  whiteSpace: "nowrap",
};

const pillSelected: React.CSSProperties = {
  ...pillBase,
  background: "var(--atlas-accent, #D1401F)",
  borderColor: "var(--atlas-accent, #D1401F)",
  color: "white",
};

export function InterestPicker({ onComplete }: InterestPickerProps) {
  const [selected, setSelected] = useState<Set<string>>(new Set());

  function toggleInterest(interest: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(interest)) {
        next.delete(interest);
      } else {
        next.add(interest);
      }
      return next;
    });
  }

  const canContinue = selected.size > 0;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 200,
        background: "rgba(0, 0, 0, 0.95)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        animation: "onboardingElementIn 0.4s ease-out forwards",
        overflowY: "auto",
        padding: "40px 20px",
      }}
    >
      <div
        style={{
          maxWidth: 600,
          width: "100%",
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 12,
        }}
      >
        <h2
          style={{
            fontFamily: "var(--font-playfair), serif",
            fontSize: 32,
            fontWeight: 700,
            color: "white",
            margin: 0,
          }}
        >
          What interests you?
        </h2>

        <p
          style={{
            fontFamily: "var(--font-source-sans), sans-serif",
            fontSize: 16,
            color: "rgba(255, 255, 255, 0.6)",
            margin: "0 0 12px 0",
          }}
        >
          Select topics to personalize your experience
        </p>

        {/* Eras section */}
        <div style={{ width: "100%", marginBottom: 8 }}>
          <p
            style={{
              fontFamily: "var(--font-source-sans), sans-serif",
              fontSize: 12,
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              color: "rgba(255, 255, 255, 0.4)",
              margin: "0 0 10px 0",
            }}
          >
            Eras
          </p>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: 10,
            }}
          >
            {ERAS.map((era) => (
              <button
                key={era}
                style={selected.has(era) ? pillSelected : pillBase}
                onClick={() => toggleInterest(era)}
              >
                {era}
              </button>
            ))}
          </div>
        </div>

        {/* Topics section */}
        <div style={{ width: "100%", marginBottom: 8 }}>
          <p
            style={{
              fontFamily: "var(--font-source-sans), sans-serif",
              fontSize: 12,
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              color: "rgba(255, 255, 255, 0.4)",
              margin: "0 0 10px 0",
            }}
          >
            Topics
          </p>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: 10,
            }}
          >
            {TOPICS.map((topic) => (
              <button
                key={topic}
                style={selected.has(topic) ? pillSelected : pillBase}
                onClick={() => toggleInterest(topic)}
              >
                {topic}
              </button>
            ))}
          </div>
        </div>

        {/* Continue button */}
        <button
          className="onboarding-cta"
          disabled={!canContinue}
          onClick={onComplete}
          style={{
            fontFamily: "var(--font-source-sans), sans-serif",
            fontSize: 15,
            fontWeight: 600,
            color: "white",
            background: "var(--atlas-accent, #D1401F)",
            border: "none",
            borderRadius: 999,
            padding: "15px 40px",
            cursor: canContinue ? "pointer" : "not-allowed",
            marginTop: 20,
            transition:
              "background 0.2s ease, transform 0.15s ease, opacity 0.2s ease",
            opacity: canContinue ? 1 : 0.4,
          }}
        >
          Continue
        </button>
      </div>
    </div>
  );
}
