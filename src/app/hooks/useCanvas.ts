import { useLayoutEffect, useRef, useState } from "react";

type CanvasSizeMode = "viewport" | "element";

export function useCanvas(mode: CanvasSizeMode = "element") {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const [ready, setReady] = useState(false);

  useLayoutEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctxRef.current = ctx;
    setReady(true);

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      const width =
        mode === "viewport" ? window.innerWidth : canvas.clientWidth;

      const height =
        mode === "viewport" ? window.innerHeight : canvas.clientHeight;

      canvas.width = width * dpr;
      canvas.height = height * dpr;

      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);

      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = "source-over";
    };

    resize();

    let resizeTimeout: number | undefined;

    const handleResize = () => {
      clearTimeout(resizeTimeout);

      resizeTimeout = window.setTimeout(() => {
        resize();
      }, 150);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);

      if (resizeTimeout) {
        clearTimeout(resizeTimeout);
      }
    };
  }, [mode]);

  return {
    canvasRef,
    ctxRef,
    ready,
  };
}
