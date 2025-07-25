"use client";

import { useRef, useLayoutEffect } from "react";
import Particles from "./Particles";

const ParticleCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const color = "#5AB3F2";
  const amount = 80;

  useLayoutEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.globalCompositeOperation = "screen";
    } else return;

    const dpr = window.devicePixelRatio || 1;
    const setCanvasSize = () => {
      ctx.setTransform(1, 0, 0, 1, 0, 0); // Reset
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.scale(dpr, dpr);
    };

    setCanvasSize();
    let resizeTimeout: number;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = window.setTimeout(setCanvasSize, 150);
    };
    window.addEventListener("resize", handleResize);

    let particles: Particles[] = [];

    const randomizeParticles = (
      x: number,
      y: number,
      quantity: number = amount
    ) => {
      for (let i = 0; i < quantity; i++) {
        const offsetX = (Math.random() - 0.5) * Math.random() * 110;
        const offsetY = (Math.random() - 0.5) * Math.random() * 110;
        const alpha = Math.random();
        let rad = Math.random() * 6;

        if (Math.abs(offsetX) < 30 && Math.abs(offsetY) < 30)
          rad = Math.random() * 14;
        else if (Math.abs(offsetX) < 35 && Math.abs(offsetY) < 35)
          rad = Math.random() * 4;

        particles.push(new Particles(x + offsetX, y + offsetY, rad, alpha));
      }
    };

    let lastBurst = 0;
    const burstCooldown = 10; // milliseconds

    const throttledRandomize = (
      x: number,
      y: number,
      quantity: number = amount
    ) => {
      const now = performance.now();
      if (now - lastBurst >= burstCooldown) {
        randomizeParticles(x, y, quantity);
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
      throttledRandomize(
        e.clientX + offsetX,
        e.clientY + offsetY,
        boostedAmount
      );
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles = particles.filter((p) => p.alpha > 0.01);
      particles.forEach((p) => {
        p.alpha -= 0.01;
        p.draw(ctx, color);
      });
      requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", handleMouseMove);
    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div
      className="canvas"
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
        aria-label="Particle animation"
        role="img"
        style={{ width: "100%", height: "100%" }}
      >
        Particle-based decorative animation.
      </canvas>
    </div>
  );
};

export default ParticleCanvas;
