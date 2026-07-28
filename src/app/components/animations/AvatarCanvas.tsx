"use client";
import {
  forwardRef,
  useImperativeHandle,
  useLayoutEffect,
  useRef,
} from "react";
import Particles from "./Particles";

export type AvatarCanvasHandle = {
  play: () => void;
};

const AvatarCanvas = forwardRef<AvatarCanvasHandle>((props, ref) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const burstRef = useRef<(() => void) | null>(null);

  useImperativeHandle(ref, () => ({
    play() {
      burstRef.current?.();
    },
  }));

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

    const burst = (quantity = 140) => {
      const x = canvas.clientWidth / 2;
      const y = canvas.clientHeight / 2;

      const spread = 160;

      for (let i = 0; i < quantity; i++) {
        const radius =
          Math.random() < 0.2 ? 10 + Math.random() * 8 : 2 + Math.random() * 6;

        const angle = Math.PI * 1.5 + (Math.random() - 0.5) * (Math.PI * 0.8);
        const speed = 2 + Math.random() * 2.5;

        const vx = Math.cos(angle) * speed;
        const vy = Math.sin(angle) * speed;

        particles.push(
          new Particles(
            x + (Math.random() - 0.5) * spread,
            y + (Math.random() - 0.5) * spread,
            radius,
            Math.random(),
            0.01,
            "#5AB3F2",
            vx,
            vy
          )
        );
      }
    };

    burstRef.current = burst;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles = particles.filter((p) => p.alpha > 0.01);

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        p.vx *= 0.92;
        p.vy *= 0.92;

        p.vy += 0.04;

        p.alpha -= p.fadeSpeed;

        p.draw(ctx);
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return (
    <div className="impact-wrapper">
      <canvas ref={canvasRef} className="avatar-canvas" />
    </div>
  );
});

export default AvatarCanvas;
