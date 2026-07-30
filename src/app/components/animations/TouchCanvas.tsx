"use client";

import { useRef, useLayoutEffect } from "react";
import Particle from "./Particle";
import { usePrefersReducedMotion } from "@/app/hooks/usePrefersReducedMotion";

const TouchCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const color = "#5AB3F2";
  const amount = 80;

  const DEFAULT_SPREAD = 110;

  const prefersReducedMotion = usePrefersReducedMotion();

  useLayoutEffect(() => {
    if (prefersReducedMotion) return;

    const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;
    if (!isTouchDevice) return;

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

    let particle: Particle[] = [];

    const randomizeParticles = (
      x: number,
      y: number,
      quantity: number = amount,
      spread: number = DEFAULT_SPREAD
    ) => {
      for (let i = 0; i < quantity; i++) {
        const offsetX = (Math.random() - 0.5) * Math.random() * spread;
        const offsetY = (Math.random() - 0.5) * Math.random() * spread;
        const alpha = Math.random();
        const fadeSpeed = 0.009 + Math.random() * 0.001;

        let rad = 2 + Math.random() * 5;

        if (spread > DEFAULT_SPREAD) {
          rad = 4 + Math.random() * 12;
        }

        rad *= spread / DEFAULT_SPREAD;

        if (Math.abs(offsetX) < 30 && Math.abs(offsetY) < 30)
          rad = (2 + Math.random() * 12) * (spread / DEFAULT_SPREAD);
        else if (Math.abs(offsetX) < 35 && Math.abs(offsetY) < 35)
          rad = (1 + Math.random() * 3) * (spread / DEFAULT_SPREAD);

        const particleColor = Math.random() < 0.18 ? "#FF8200" : color;

        particle.push(
          new Particle(
            x + offsetX,
            y + offsetY,
            rad,
            alpha,
            fadeSpeed,
            particleColor,
            0,
            0,
            1
          )
        );
      }
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
      particle = particle.filter((p) => p.alpha > 0.01);
      particle.forEach((p) => {
        p.alpha -= p.fadeSpeed;
        p.draw(ctx);
      });
      animationId = requestAnimationFrame(animate);
    };

    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("touchend", handleTouchEnd);
    window.addEventListener("touchcancel", handleTouchEnd);

    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
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
