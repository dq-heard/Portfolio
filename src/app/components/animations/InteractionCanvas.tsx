"use client";

import { useLayoutEffect, useRef } from "react";
import Particle from "./Particle";
import { useParticleBurst } from "@/app/context/ParticleContext";
import { BurstOptions } from "@/app/utils/types";
import { usePrefersReducedMotion } from "@/app/hooks/usePrefersReducedMotion";

const InteractionCanvas = () => {
  const prefersReducedMotion = usePrefersReducedMotion();

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { registerBurst } = useParticleBurst();

  useLayoutEffect(() => {
    if (prefersReducedMotion) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.globalCompositeOperation = "screen";

    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;

      canvas.width = canvas.clientWidth * dpr;
      canvas.height = canvas.clientHeight * dpr;

      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    };

    resizeCanvas();

    window.addEventListener("resize", resizeCanvas);

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

        const particleColor = Math.random() < 0.18 ? "#FF8200" : "#5AB3F2";

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

      particles = particles.filter((p) => p.alpha > 0.01);

      particles.forEach((p) => {
        p.alpha -= p.fadeSpeed;
        p.draw(ctx);
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      unregisterBurst();
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [prefersReducedMotion]);

  return (
    <div ref={containerRef} className="impact-wrapper">
      <canvas ref={canvasRef} className="impact-canvas" aria-hidden="true" />
    </div>
  );
};

export default InteractionCanvas;
