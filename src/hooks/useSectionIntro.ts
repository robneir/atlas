"use client";

import { useCallback, useEffect, useState } from "react";

const STORAGE_PREFIX = "atlas-section-intro-";

export interface UseSectionIntroReturn {
  hasSeenIntro: boolean;
  dismissIntro: () => void;
  resetIntro: () => void;
}

export function useSectionIntro(sectionKey: string): UseSectionIntroReturn {
  const [hasSeenIntro, setHasSeenIntro] = useState(true); // default true to avoid flash

  useEffect(() => {
    try {
      const stored = localStorage.getItem(`${STORAGE_PREFIX}${sectionKey}`);
      setHasSeenIntro(stored === "true");
    } catch {
      // localStorage may be unavailable
      setHasSeenIntro(true);
    }
  }, [sectionKey]);

  const dismissIntro = useCallback(() => {
    setHasSeenIntro(true);
    try {
      localStorage.setItem(`${STORAGE_PREFIX}${sectionKey}`, "true");
    } catch {
      // localStorage may be unavailable
    }
  }, [sectionKey]);

  const resetIntro = useCallback(() => {
    setHasSeenIntro(false);
    try {
      localStorage.removeItem(`${STORAGE_PREFIX}${sectionKey}`);
    } catch {
      // localStorage may be unavailable
    }
  }, [sectionKey]);

  return { hasSeenIntro, dismissIntro, resetIntro };
}
