"use client";

import { createContext, useContext, useRef, type ReactNode } from "react";
import { TransitionColors } from "../utils/transitions";

type TransitionOptions = {
  x: number;
  y: number;
  colors: TransitionColors;
  onThemeSwap?: () => void;
  duration?: number;
};

type ThemeTransitionHandler = (options: TransitionOptions) => void;

type ThemeTransitionContextType = {
  registerTransition: (handler: ThemeTransitionHandler) => () => void;

  triggerTransition: (options: TransitionOptions) => void;
};

const ThemeTransitionContext = createContext<ThemeTransitionContextType | null>(
  null
);

export function ThemeTransitionProvider({ children }: { children: ReactNode }) {
  const handlers = useRef(new Set<ThemeTransitionHandler>());

  const registerTransition = (handler: ThemeTransitionHandler) => {
    handlers.current.add(handler);

    return () => {
      handlers.current.delete(handler);
    };
  };

  const triggerTransition = (options: TransitionOptions) => {
    handlers.current.forEach((handler) => {
      handler(options);
    });
  };

  return (
    <ThemeTransitionContext.Provider
      value={{
        registerTransition,
        triggerTransition,
      }}
    >
      {children}
    </ThemeTransitionContext.Provider>
  );
}

export function useThemeTransition() {
  const context = useContext(ThemeTransitionContext);

  if (!context) {
    throw new Error(
      "useThemeTransition must be used inside ThemeTransitionProvider"
    );
  }

  return context;
}
