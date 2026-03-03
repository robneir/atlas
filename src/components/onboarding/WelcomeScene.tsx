"use client";

import { useState } from "react";
import { InterestPicker } from "./InterestPicker";

interface WelcomeSceneProps {
  onComplete: () => void;
}

export function WelcomeScene({ onComplete }: WelcomeSceneProps) {
  const [step, setStep] = useState<"welcome" | "interests">("welcome");

  if (step === "interests") {
    return <InterestPicker onComplete={onComplete} />;
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Welcome to Atlas"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 200,
        background: "rgba(0, 0, 0, 0.95)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        animation: "onboardingBgFadeIn 0.5s ease-out forwards",
      }}
    >
      <div
        style={{
          maxWidth: 600,
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 8,
          padding: 24,
        }}
      >
        {/* Decorative rotating globe */}
        <div
          style={{
            width: 120,
            height: 120,
            borderRadius: "50%",
            border: "2px solid transparent",
            background:
              "linear-gradient(rgba(0,0,0,0.95), rgba(0,0,0,0.95)) padding-box, conic-gradient(from 0deg, var(--atlas-accent, #D1401F), rgba(255,255,255,0.1), var(--atlas-accent, #D1401F), rgba(255,255,255,0.05), var(--atlas-accent, #D1401F)) border-box",
            animation:
              "onboardingElementIn 1s ease-out 0.3s forwards, onboardingGlobeRotate 8s linear infinite, onboardingGlobePulse 4s ease-in-out infinite",
            opacity: 0,
            marginBottom: 16,
          }}
        />

        {/* ATLAS title */}
        <h1
          style={{
            fontFamily: "var(--font-playfair), serif",
            fontSize: 64,
            fontWeight: 700,
            color: "white",
            letterSpacing: "0.1em",
            margin: 0,
            opacity: 0,
            animation: "onboardingElementIn 1s ease-out 0.5s forwards",
          }}
        >
          ATLAS
        </h1>

        {/* Subtitle */}
        <p
          style={{
            fontFamily: "var(--font-source-sans), sans-serif",
            fontSize: 20,
            color: "rgba(255, 255, 255, 0.7)",
            margin: 0,
            opacity: 0,
            animation: "onboardingElementIn 1s ease-out 1.5s forwards",
          }}
        >
          Explore the History of Everything
        </p>

        {/* Description */}
        <p
          style={{
            fontFamily: "var(--font-source-sans), sans-serif",
            fontSize: 16,
            color: "rgba(255, 255, 255, 0.5)",
            margin: 0,
            maxWidth: 440,
            lineHeight: 1.6,
            opacity: 0,
            animation: "onboardingElementIn 1s ease-out 2.5s forwards",
          }}
        >
          Join a community of historians, researchers, and curious minds sharing
          knowledge openly.
        </p>

        {/* CTA button */}
        <button
          className="onboarding-cta"
          onClick={() => setStep("interests")}
          style={{
            fontFamily: "var(--font-source-sans), sans-serif",
            fontSize: 15,
            fontWeight: 600,
            color: "white",
            background: "var(--atlas-accent, #D1401F)",
            border: "none",
            borderRadius: 999,
            padding: "15px 32px",
            cursor: "pointer",
            marginTop: 16,
            opacity: 0,
            animation: "onboardingElementIn 0.5s ease-out 3.5s forwards",
            transition: "background 0.2s ease, transform 0.15s ease",
          }}
        >
          Begin Exploring
        </button>
      </div>
    </div>
  );
}
