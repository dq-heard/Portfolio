"use client";

import { useLayoutEffect } from "react";
import ParticleSystem from "./ParticleSystem";
import { useCanvas, usePrefersReducedMotion } from "@/app/hooks";
import {
  AMBIENT_PARTICLE_CONFIG,
  createSprayParticles,
} from "@/app/utils/particles/";

const AmbientCanvas = () => {
  const { canvasRef, ctxRef } = useCanvas("viewport");
  const {
    amount,
    defaultSpread,
    maxSpread,
    primaryColor,
    accentColor,
    accentChance,
  } = AMBIENT_PARTICLE_CONFIG;

  const prefersReducedMotion = usePrefersReducedMotion();

  useLayoutEffect(() => {
    if (prefersReducedMotion) return;

    const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;
    if (isTouchDevice) return;

    const canvas = canvasRef.current;
    const ctx = ctxRef.current;

    if (!canvas || !ctx) return;

    ctx.globalCompositeOperation = "screen";

    const system = new ParticleSystem();

    const randomizeParticles = (
      x: number,
      y: number,
      quantity = amount,
      spread = defaultSpread
    ) => {
      system.emitMany(
        createSprayParticles({
          x,
          y,
          quantity,
          spread,
          defaultSpread,
          primaryColor,
          accentColor,
          accentChance,
        })
      );
    };

    let lastBurst = 0;
    const mouseCooldown = 10;

    const throttledRandomize = (
      x: number,
      y: number,
      quantity: number = amount,
      spread: number = defaultSpread
    ) => {
      const now = performance.now();
      if (now - lastBurst >= mouseCooldown) {
        randomizeParticles(x, y, quantity, spread);
        lastBurst = now;
      }
    };

    let lastX = 0;
    let lastY = 0;
    let hasInitialized = false;

    const handleMouseMove = (e: MouseEvent) => {
      // First mouse movement only establishes a starting point.
      // It does not create particles.
      if (!hasInitialized) {
        lastX = e.clientX;
        lastY = e.clientY;
        hasInitialized = true;
        return;
      }

      const dx = e.clientX - lastX;
      const dy = e.clientY - lastY;
      const speed = Math.sqrt(dx * dx + dy * dy);

      lastX = e.clientX;
      lastY = e.clientY;

      const angle = Math.atan2(dy, dx);
      const offsetFactor = Math.min(speed / 4, 20);
      const offsetX = Math.cos(angle) * offsetFactor;
      const offsetY = Math.sin(angle) * offsetFactor;

      const boostedAmount = Math.max(amount, Math.floor(speed / 2) + amount);
      const spread = Math.min(defaultSpread + speed / 2, maxSpread);

      throttledRandomize(
        e.clientX + offsetX,
        e.clientY + offsetY,
        boostedAmount,
        spread
      );
    };

    let animationId = 0;

    const animate = () => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      system.render(ctx);

      animationId = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", handleMouseMove);
    animate();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationId);
      system.clear();
    };
  }, [prefersReducedMotion]);

  return (
    <div
      className="ambient-canvas"
      style={{
        width: "100vw",
        height: "100vh",
        position: "fixed",
        inset: 0,
        zIndex: -1,
        pointerEvents: "none", // allows clickthrough
      }}
    >
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        style={{ width: "100%", height: "100%" }}
      ></canvas>
    </div>
  );
};

export default AmbientCanvas;
