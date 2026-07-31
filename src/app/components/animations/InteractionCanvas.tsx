"use client";

import { useLayoutEffect, useRef } from "react";
import Particle from "./Particle";
import { useParticleBurst } from "@/app/context/ParticleContext";
import { BurstOptions } from "@/app/utils/types";
import { useCanvas, usePrefersReducedMotion } from "@/app/hooks";
import {
  PARTICLE_BLUE,
  PARTICLE_ORANGE,
  updateAndRenderParticles,
} from "@/app/utils/particles/";

const InteractionCanvas = () => {
  const prefersReducedMotion = usePrefersReducedMotion();

  const { canvasRef, ctxRef } = useCanvas("element");
  const containerRef = useRef<HTMLDivElement>(null);
  const { registerBurst } = useParticleBurst();

  useLayoutEffect(() => {
    if (prefersReducedMotion) return;
    const canvas = canvasRef.current;
    const ctx = ctxRef.current;

    if (!canvas || !ctx) return;

    ctx.globalCompositeOperation = "screen";

    let particles: Particle[] = [];
    let animationId = 0;

    const burst = ({ x, y, quantity = 40 }: BurstOptions) => {
      const localX = x;
      const localY = y;

      for (let i = 0; i < quantity; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed =
          Math.random() < 0.35
            ? 0.2 + Math.random() * 0.5
            : 0.6 + Math.random() * 1;
        const fadeSpeed = 0.008 + Math.random() * 0.004;

        const radius =
          Math.random() < 0.08 ? 6 + Math.random() * 3 : 2 + Math.random() * 3;

        const particleColor =
          Math.random() < 0.18 ? PARTICLE_BLUE : PARTICLE_ORANGE;

        particles.push(
          new Particle(
            localX,
            localY,
            radius,
            Math.random(),
            fadeSpeed,
            particleColor,
            Math.cos(angle) * speed,
            Math.sin(angle) * speed,
            0.96
          )
        );
      }
    };

    const unregisterBurst = registerBurst(burst);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      updateAndRenderParticles(particles, ctx);

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      unregisterBurst();
      cancelAnimationFrame(animationId);
    };
  }, [prefersReducedMotion]);

  return (
    <div ref={containerRef} className="impact-wrapper">
      <canvas ref={canvasRef} className="impact-canvas" aria-hidden="true" />
    </div>
  );
};

export default InteractionCanvas;
