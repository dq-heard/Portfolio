"use client";

import { useEffect, useState } from "react";
import { BsSunFill, BsMoonFill } from "react-icons/bs";
import "./toggles.css";

const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(false);

  const toggleTheme = () => {
    const newThemeIsDark = !isDark;
    setIsDark(newThemeIsDark);
    document.body.classList.toggle("dark-mode", newThemeIsDark);
    localStorage.setItem("theme", newThemeIsDark ? "light" : "dark");
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme) {
      // 1. If user previously selected a theme manually, use it
      const isBright = savedTheme === "light";
      setIsDark(isBright);
      document.body.classList.toggle("dark-mode", isBright);
    } else {
      // 2. If first time visiting, match the OS system light preference
      const systemPrefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      setIsDark(systemPrefersDark);
      document.body.classList.toggle("dark-mode", systemPrefersDark);
    }
  }, []);

  return (
    <button
      className="theme-toggle button-surface"
      onClick={toggleTheme}
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
