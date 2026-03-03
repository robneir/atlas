"use client";

import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "atlas-onboarding-complete";

export interface UseOnboardingReturn {
  isComplete: boolean;
  complete: () => void;
  reset: () => void;
}

export function useOnboarding(): UseOnboardingReturn {
  const [isComplete, setIsComplete] = useState(true); // default true to avoid flash

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      setIsComplete(stored === "true");
    } catch {
      // localStorage may be unavailable
      setIsComplete(true);
    }
  }, []);

  const complete = useCallback(() => {
    setIsComplete(true);
    try {
      localStorage.setItem(STORAGE_KEY, "true");
    } catch {
      // localStorage may be unavailable
    }
  }, []);

  const reset = useCallback(() => {
    setIsComplete(false);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // localStorage may be unavailable
    }
  }, []);

  return { isComplete, complete, reset };
}
