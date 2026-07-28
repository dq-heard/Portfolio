import { useEffect, useRef } from "react";

export function useFloatEffect(amplitude = 10, speed = 0.01, delay = 0) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (
      !ref.current ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;

    let offset = 0;
    let frameId: number;
    let timeoutId: number;

    const animate = () => {
      offset += speed;
      const y = Math.sin(offset) * amplitude;
      ref.current!.style.transform = `translateY(${y}px)`;
      frameId = requestAnimationFrame(animate);
    };

    timeoutId = window.setTimeout(() => {
      frameId = requestAnimationFrame(animate);
    }, delay);

    return () => {
      window.clearTimeout(timeoutId);
      cancelAnimationFrame(frameId);
    };
  }, [amplitude, speed, delay]);

  return ref;
}
