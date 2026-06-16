"use client";

import { useEffect, useState } from "react";
import { BsSunFill, BsMoonFill } from "react-icons/bs";
import "./toggles.css";

const ThemeToggle = () => {
  const [isBright, setIsBright] = useState(false);

  const toggleTheme = () => {
    const newThemeIsBright = !isBright;
    setIsBright(newThemeIsBright);
    document.body.classList.toggle("light-mode", newThemeIsBright);
    localStorage.setItem("theme", newThemeIsBright ? "light" : "dark");
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme) {
      // 1. If user previously selected a theme manually, use it
      const isLight = savedTheme === "light";
      setIsBright(isLight);
      document.body.classList.toggle("light-mode", isLight);
    } else {
      // 2. If first time visiting, match the OS system light preference
      const systemPrefersLight = window.matchMedia(
        "(prefers-color-scheme: light)"
      ).matches;
      setIsBright(systemPrefersLight);
      document.body.classList.toggle("light-mode", systemPrefersLight);
    }
  }, []);

  return (
    <button
      className="theme-toggle glass-button"
      onClick={toggleTheme}
      aria-label={isBright ? "Switch to dark theme" : "Switch to light theme"}
      aria-pressed={isBright}
    >
      {isBright ? (
        <BsMoonFill aria-hidden="true" focusable="false" />
      ) : (
        <BsSunFill aria-hidden="true" focusable="false" />
      )}
    </button>
  );
};

export default ThemeToggle;
