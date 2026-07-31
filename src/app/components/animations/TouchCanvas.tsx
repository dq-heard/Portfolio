"use client";

import { useLayoutEffect } from "react";
import Particle from "./Particle";
import { useCanvas, usePrefersReducedMotion } from "@/app/hooks/";
import {
  PARTICLE_BLUE,
  PARTICLE_ORANGE,
  createSprayParticles,
  updateAndRenderParticles,
} from "@/app/utils/particles/";

const TouchCanvas = () => {
  const { canvasRef, ctxRef } = useCanvas("viewport");
  const color = PARTICLE_BLUE;
  const amount = 80;

  const DEFAULT_SPREAD = 110;

  const prefersReducedMotion = usePrefersReducedMotion();

  useLayoutEffect(() => {
    if (prefersReducedMotion) return;

    const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;
    if (!isTouchDevice) return;

    const canvas = canvasRef.current;
    const ctx = ctxRef.current;

    if (!canvas || !ctx) return;

    ctx.globalCompositeOperation = "screen";

    let particle: Particle[] = [];

    const randomizeParticles = (
      x: number,
      y: number,
      quantity = amount,
      spread = DEFAULT_SPREAD
    ) => {
      createSprayParticles({
        particles: particle,
        x,
        y,
        quantity,
        spread,
        defaultSpread: DEFAULT_SPREAD,
        primaryColor: color,
        accentColor: PARTICLE_ORANGE,
        accentChance: 0.18,
      });
    };

    let lastTouchBurst = 0;
    const touchCooldown = 50;

    let touchX = 0;
    let touchY = 0;

    let isTouchSpraying = false;
    let touchStartTime = 0;

    const handleTouchStart = (e: TouchEvent) => {
      const touch = e.touches[0];

      touchX = touch.clientX;
      touchY = touch.clientY;

      touchStartTime = performance.now();

      isTouchSpraying = true;

      randomizeParticles(touchX, touchY, 25, 40);
    };

    const handleTouchMove = (e: TouchEvent) => {
      const touch = e.touches[0];

      touchX = touch.clientX;
      touchY = touch.clientY;
    };

    const handleTouchEnd = () => {
      isTouchSpraying = false;
      touchStartTime = 0;
    };

    let animationId = 0;

    const animate = () => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      if (isTouchSpraying) {
        const now = performance.now();

        if (now - lastTouchBurst >= touchCooldown) {
          const held = now - touchStartTime;

          const multiplier = Math.min(0.4 + held / 1200, 1.8);

          const spread = Math.min(40 + held / 25, 130);

          randomizeParticles(
            touchX,
            touchY,
            Math.floor(amount * multiplier),
            spread
          );

          lastTouchBurst = now;
        }
      }

      updateAndRenderParticles(particle, ctx);

      animationId = requestAnimationFrame(animate);
    };

    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("touchend", handleTouchEnd);
    window.addEventListener("touchcancel", handleTouchEnd);

    animate();

    return () => {
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
      window.removeEventListener("touchcancel", handleTouchEnd);

      cancelAnimationFrame(animationId);
    };
  }, [prefersReducedMotion]);

  return (
    <div
      className="touch-canvas"
      style={{
        width: "100vw",
        height: "100vh",
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        pointerEvents: "none", // allows clickthrough
      }}
    >
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        role="img"
        style={{ width: "100%", height: "100%" }}
      ></canvas>
    </div>
  );
};

export default TouchCanvas;
