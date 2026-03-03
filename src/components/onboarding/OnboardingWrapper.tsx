"use client";

import { useOnboarding } from "@/hooks/useOnboarding";
import { WelcomeScene } from "./WelcomeScene";

export function OnboardingWrapper() {
  const { isComplete, complete } = useOnboarding();

  if (isComplete) return null;

  return <WelcomeScene onComplete={complete} />;
}
