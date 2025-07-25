import { useEffect, useRef } from "react";

export function useFloatEffect(amplitude = 10, speed = 0.01) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (
      !ref.current ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;

    let offset = 0;
    let frameId: number;

    const animate = () => {
      offset += speed;
      const y = Math.sin(offset) * amplitude;
      ref.current!.style.transform = `translateY(${y}px)`;
      frameId = requestAnimationFrame(animate);
    };

    frameId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(frameId);
  }, [amplitude, speed]);

  return ref;
}
