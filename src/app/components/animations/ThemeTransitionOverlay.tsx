"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { useCanvas, usePrefersReducedMotion } from "@/app/hooks";
import { useThemeTransition } from "@/app/context";
import {
  renderTransition,
  THEME_TRANSITION_CONFIG,
} from "@/app/utils/transitions";
/**
 * ThemeTransitionOverlay
 *
 * Renders the full-screen canvas animation used during theme changes.
 * The transition originates from the theme toggle, synchronizes the
 * theme swap at the animation midpoint, and cleans itself up once complete.
 */
const ThemeTransitionOverlay = () => {
  const { canvasRef, ctxRef, ready } = useCanvas("viewport");
  const { registerTransition } = useThemeTransition();
  const prefersReducedMotion = usePrefersReducedMotion();

  const [active, setActive] = useState(false);

  const origin = useRef({
    x: 0,
    y: 0,
  });

  const colors = useRef({
    frontColor: "",
    highlightColor: "",
    accentColor: "",
  });

  const onThemeSwap = useRef<(() => void) | null>(null);

  useLayoutEffect(() => {
    // Register transition requests from the ThemeTransitionContext.
    // Each request provides the animation origin and an optional
    // callback used to synchronize the theme swap with the transition.
    return registerTransition(
      ({ x, y, colors: transitionColors, onThemeSwap: callback }) => {
        origin.current = { x, y };
        colors.current = transitionColors;
        onThemeSwap.current = callback ?? null;

        if (prefersReducedMotion) {
          callback?.();
          return;
        }

        setActive(true);
      }
    );
  }, [registerTransition, prefersReducedMotion]);

  useLayoutEffect(() => {
    if (!active || !ready) return;

    const canvas = canvasRef.current;
    const ctx = ctxRef.current;

    if (!canvas || !ctx) return;

    // Animation state.
    let animationId = 0;
    let progress = 0;
    let opacity = 1;
    let startTime = performance.now();

    const { duration, debug } = THEME_TRANSITION_CONFIG;

    const transitionDuration = debug.enabled ? debug.duration : duration;

    // Animation lifecycle:
    //
    // Impact
    // Shockwave propagates
    // Theme swaps once the wave reaches the configured coverage
    // Wake settles and fades
    const animate = () => {
      const time = performance.now();

      const width = window.innerWidth;
      const height = window.innerHeight;

      ctx.clearRect(0, 0, width, height);

      // Grow the transition outward from the interaction origin.
      const elapsed = time - startTime;
      progress = Math.min(elapsed / transitionDuration, 1);

      // Render the current transition.
      renderTransition({
        ctx,
        x: origin.current.x,
        y: origin.current.y,
        progress,
        width,
        height,
        opacity,
        time,
        colors: colors.current,
      });

      // Trigger the theme swap once, near the beginning of the event.
      // The shockwave will visually reveal the new theme as it expands.
      if (progress > 0.02 && onThemeSwap.current) {
        if (!debug.disableThemeSwap) {
          onThemeSwap.current();
        }

        onThemeSwap.current = null;
      }

      // Continue animating until the transition completes.
      if (progress < 1) {
        animationId = requestAnimationFrame(animate);
        return;
      }

      if (debug.enabled && debug.freezeAtEnd) {
        animationId = requestAnimationFrame(animate);
        return;
      }

      opacity -= 0.08;

      if (opacity > 0) {
        animationId = requestAnimationFrame(animate);
      } else {
        ctx.clearRect(0, 0, width, height);
        setActive(false);
      }
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [active, ready]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        width: "100%",
        height: "100%",
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        pointerEvents: "none",
        background: "transparent",
        display: active ? "block" : "none",
      }}
    />
  );
};

export default ThemeTransitionOverlay;
