"use client";
import {
  forwardRef,
  useImperativeHandle,
  useLayoutEffect,
  useRef,
} from "react";
import Particle from "./Particle";
import ParticleSystem from "./ParticleSystem";
import { useCanvas } from "@/app/hooks";
import { PARTICLE_BLUE } from "@/app/utils/particles/";

export type AvatarCanvasHandle = {
  play: () => void;
};

const AvatarCanvas = forwardRef<AvatarCanvasHandle>((props, ref) => {
  const { canvasRef, ctxRef } = useCanvas("element");
  const burstRef = useRef<(() => void) | null>(null);

  useImperativeHandle(ref, () => ({
    play() {
      burstRef.current?.();
    },
  }));

  useLayoutEffect(() => {
    const canvas = canvasRef.current;
    const ctx = ctxRef.current;

    if (!canvas || !ctx) return;

    ctx.globalCompositeOperation = "screen";

    const system = new ParticleSystem();
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

        system.emit(
          new Particle(
            x + (Math.random() - 0.5) * spread,
            y + (Math.random() - 0.5) * spread,
            radius,
            Math.random(),
            0.01,
            PARTICLE_BLUE,
            vx,
            vy
          )
        );
      }
    };

    burstRef.current = burst;

    const updateAvatarParticle = (particle: Particle) => {
      particle.vx *= 0.92;
      particle.vy *= 0.92;
      particle.vy += 0.04;
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      system.render(ctx, updateAvatarParticle);

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <div className="avatar-impact-wrapper">
      <canvas
        ref={canvasRef}
        className="avatar-impact-canvas"
        aria-hidden="true"
      />
    </div>
  );
});

export default AvatarCanvas;
