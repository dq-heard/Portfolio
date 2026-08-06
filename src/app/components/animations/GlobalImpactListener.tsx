"use client";

import { useEffect } from "react";
import { useParticleBurst } from "@/app/context";
import { usePrefersReducedMotion } from "@/app/hooks";

const GlobalImpactListener = () => {
  const { triggerBurst } = useParticleBurst();
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;

    const handleClick = (event: MouseEvent) => {
      triggerBurst({
        x: event.clientX,
        y: event.clientY,
        quantity: 18,
      });
    };

    window.addEventListener("click", handleClick);

    return () => {
      window.removeEventListener("click", handleClick);
    };
  }, [prefersReducedMotion, triggerBurst]);

  return null;
};

export default GlobalImpactListener;
