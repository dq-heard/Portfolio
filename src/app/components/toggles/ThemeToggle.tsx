"use client";

import { useEffect, useState } from "react";
import { BsSunFill, BsMoonFill } from "react-icons/bs";
import "./toggles.css";

const ThemeToggle = () => {
  const [isLight, setIsLight] = useState(false);

  const toggleTheme = () => {
    const newThemeIsLight = !isLight;
    setIsLight(newThemeIsLight);
    document.body.classList.toggle("light-theme", newThemeIsLight);
    localStorage.setItem("theme", newThemeIsLight ? "light" : "dark");
  };

  useEffect(() => {
    document.body.classList.toggle("light-theme", isLight);
  }, [isLight]);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    setIsLight(savedTheme === "light");
  }, []);

  return (
    <button
      className="theme-toggle glass-button"
      onClick={toggleTheme}
      aria-label={isLight ? "Switch to dark theme" : "Switch to light theme"}
      aria-pressed={isLight}
    >
      {isLight ? (
        <BsMoonFill aria-hidden="true" focusable="false" />
      ) : (
        <BsSunFill aria-hidden="true" focusable="false" />
      )}
    </button>
  );
};

export default ThemeToggle;
