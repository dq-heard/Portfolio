"use client";

import { useEffect, useRef } from "react";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";

type FloatEffectOptions = {
  amplitude?: number;
  speed?: number;
  delay?: number;
};

export function useFloatEffect<T extends HTMLElement = HTMLDivElement>({
  amplitude = 10,
  speed = 0.01,
  delay = 0,
}: FloatEffectOptions = {}) {
  const ref = useRef<T | null>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const element = ref.current;

    if (!element || prefersReducedMotion) return;

    let offset = 0;
    let frameId: number;
    let timeoutId: number;

    const animate = () => {
      offset += speed;

      const y = Math.sin(offset) * amplitude;

      element.style.transform = `translateY(${y}px)`;

      frameId = requestAnimationFrame(animate);
    };

    timeoutId = window.setTimeout(() => {
      frameId = requestAnimationFrame(animate);
    }, delay);

    return () => {
      window.clearTimeout(timeoutId);
      cancelAnimationFrame(frameId);
    };
  }, [amplitude, speed, delay, prefersReducedMotion]);

  return ref;
}
