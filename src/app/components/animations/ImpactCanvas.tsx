"use client";

import { useLayoutEffect, useRef } from "react";
import Particles from "./Particles";
import { useParticleBurst } from "@/app/context/ParticleContext";

const ImpactCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { registerBurst } = useParticleBurst();

  useLayoutEffect(() => {
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

    let particles: Particles[] = [];
    let animationId = 0;

    const burst = (x: number, y: number, quantity = 140) => {
      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();

      const localX = x - rect.left;
      const localY = y - rect.top;

      for (let i = 0; i < quantity; i++) {
        const spread = 160;

        const radius =
          Math.random() < 0.2 ? 10 + Math.random() * 8 : 2 + Math.random() * 6;

        particles.push(
          new Particles(
            localX + (Math.random() - 0.5) * spread,
            localY + (Math.random() - 0.5) * spread,
            radius,
            Math.random(),
            0.01,
            "#5AB3F2",
            0,
            0
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
  }, []);

  return (
    <div ref={containerRef} className="impact-wrapper">
      <canvas ref={canvasRef} className="impact-canvas" />
    </div>
  );
};

export default ImpactCanvas;
