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
    localStorage.setItem("theme", newThemeIsDark ? "dark" : "light");
  };

  useEffect(() => {
    document.body.classList.toggle("dark-mode", isDark);
  }, [isDark]);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    setIsDark(savedTheme === "dark");
  }, []);

  return (
    <button
      className="theme-toggle glass-button"
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
