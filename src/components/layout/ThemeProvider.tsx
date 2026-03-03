"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { ThemeContext, type Theme } from "@/hooks/useTheme";

const STORAGE_KEY = "atlas-theme";

function getInitialTheme(): Theme {
  if (typeof window === "undefined") return "light";
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "dark" || stored === "light") return stored;
  } catch {
    // localStorage may be unavailable
  }
  return "light";
}

function applyTheme(theme: Theme) {
  const root = document.documentElement;
  // Set data-theme for Atlas design tokens
  root.setAttribute("data-theme", theme);
  // Toggle .dark class for shadcn/Tailwind dark variant
  if (theme === "dark") {
    root.classList.add("dark");
  } else {
    root.classList.remove("dark");
  }
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(getInitialTheme);

  // Apply theme on mount and whenever it changes
  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  const setTheme = useCallback((newTheme: Theme) => {
    setThemeState(newTheme);
    try {
      localStorage.setItem(STORAGE_KEY, newTheme);
    } catch {
      // localStorage may be unavailable
    }
  }, []);

  const toggle = useCallback(() => {
    setTheme(theme === "light" ? "dark" : "light");
  }, [theme, setTheme]);

  const value = useMemo(
    () => ({ theme, toggle, setTheme }),
    [theme, toggle, setTheme]
  );

  return (
    <>
      {/* Inline script to prevent flash of wrong theme on page load.
          This is a static string with no user input -- safe to use. */}
      <script
        dangerouslySetInnerHTML={{
          __html: `(function(){try{var t=localStorage.getItem("${STORAGE_KEY}");if(t==="dark"){document.documentElement.setAttribute("data-theme","dark");document.documentElement.classList.add("dark")}}catch(e){}})();`,
        }}
      />
      <ThemeContext value={value}>{children}</ThemeContext>
    </>
  );
}
