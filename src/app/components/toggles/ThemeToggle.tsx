"use client";

import { useEffect, useRef, useState } from "react";
import { BsSunFill, BsMoonFill } from "react-icons/bs";
import { useThemeTransition } from "@/app/context";
import "./toggles.css";
import { getTransitionColors } from "@/app/utils/transitions";

const ThemeToggle = () => {
  const [isDark, setIsDark] = useState<boolean | null>(null);

  const buttonRef = useRef<HTMLButtonElement>(null);

  const { triggerTransition } = useThemeTransition();

  const applyTheme = (newThemeIsDark: boolean) => {
    setIsDark(newThemeIsDark);

    document.documentElement.classList.toggle("dark-mode", newThemeIsDark);

    localStorage.setItem("theme", newThemeIsDark ? "dark" : "light");
  };

  const toggleTheme = () => {
    const newThemeIsDark = !isDark;
    const colors = getTransitionColors(newThemeIsDark);
    const rect = buttonRef.current?.getBoundingClientRect();

    if (rect) {
      triggerTransition({
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
        colors,
        onThemeSwap: () => {
          applyTheme(newThemeIsDark);
        },
      });
    }
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");

    const shouldUseDark =
      savedTheme === "dark" ||
      (!savedTheme &&
        window.matchMedia("(prefers-color-scheme: dark)").matches);

    setIsDark(shouldUseDark);
    document.documentElement.classList.toggle("dark-mode", shouldUseDark);
  }, []);

  if (isDark === null) {
    return <div className="theme-toggle-placeholder" />;
  }

  return (
    <button
      ref={buttonRef}
      className={`theme-toggle button-surface ${isDark === null ? "is-loading" : ""}`}
      onClick={toggleTheme}
      aria-hidden={isDark === null}
      disabled={isDark === null}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      aria-pressed={isDark}
    >
      {isDark ? (
        <BsSunFill aria-hidden="true" focusable="false" />
      ) : (
        <BsMoonFill aria-hidden="true" focusable="false" />
      )}
    </button>
  );
};

export default ThemeToggle;
