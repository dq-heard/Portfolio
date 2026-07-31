"use client";

import { useEffect, useState } from "react";
import { BsSunFill, BsMoonFill } from "react-icons/bs";
import "./toggles.css";

const ThemeToggle = () => {
  const [isDark, setIsDark] = useState<boolean | null>(null);

  const toggleTheme = () => {
    const newThemeIsDark = !isDark;

    setIsDark(newThemeIsDark);

    document.body.classList.toggle("dark-mode", newThemeIsDark);

    localStorage.setItem("theme", newThemeIsDark ? "dark" : "light");
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");

    const shouldUseDark =
      savedTheme === "dark" ||
      (!savedTheme &&
        window.matchMedia("(prefers-color-scheme: dark)").matches);

    setIsDark(shouldUseDark);
    document.body.classList.toggle("dark-mode", shouldUseDark);
  }, []);

  if (isDark === null) {
    return <div className="theme-toggle-placeholder" />;
    return null;
  }

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
