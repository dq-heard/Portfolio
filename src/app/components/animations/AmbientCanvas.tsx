"use client";

import { useLayoutEffect } from "react";
import Particle from "./Particle";
import { useCanvas, usePrefersReducedMotion } from "@/app/hooks";
import {
  PARTICLE_BLUE,
  PARTICLE_ORANGE,
  createSprayParticles,
  updateAndRenderParticles,
} from "@/app/utils/particles/";

const AmbientCanvas = () => {
  const { canvasRef, ctxRef } = useCanvas("viewport");
  const color = PARTICLE_BLUE;
  const amount = 80;

  const DEFAULT_SPREAD = 110;
  const MAX_SPREAD = 180;

  const prefersReducedMotion = usePrefersReducedMotion();

  useLayoutEffect(() => {
    if (prefersReducedMotion) return;

    const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;
    if (isTouchDevice) return;

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
        accentChance: 0.06,
      });
    };

    let lastBurst = 0;
    const mouseCooldown = 10;

    const throttledRandomize = (
      x: number,
      y: number,
      quantity: number = amount,
      spread: number = DEFAULT_SPREAD
    ) => {
      const now = performance.now();
      if (now - lastBurst >= mouseCooldown) {
        randomizeParticles(x, y, quantity, spread);
        lastBurst = now;
      }
    };

    let lastX = 0;
    let lastY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const dx = e.clientX - lastX;
      const dy = e.clientY - lastY;
      const speed = Math.sqrt(dx * dx + dy * dy);

      lastX = e.clientX;
      lastY = e.clientY;

      const angle = Math.atan2(dy, dx);
      const offsetFactor = Math.min(speed / 4, 20); // to avoid overshooting
      const offsetX = Math.cos(angle) * offsetFactor;
      const offsetY = Math.sin(angle) * offsetFactor;

      const boostedAmount = Math.max(amount, Math.floor(speed / 2) + amount);
      const spread = Math.min(DEFAULT_SPREAD + speed / 2, MAX_SPREAD);
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

      updateAndRenderParticles(particle, ctx);

      animationId = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", handleMouseMove);
    animate();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationId);
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
        role="img"
        style={{ width: "100%", height: "100%" }}
      ></canvas>
    </div>
  );
};

export default AmbientCanvas;
