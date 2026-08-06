import { drawShockwave } from "./drawShockwave";

import type { TransitionColors } from "./transitionColors";

type RenderTransitionProps = {
  ctx: CanvasRenderingContext2D;
  x: number;
  y: number;
  progress: number;
  width: number;
  height: number;
  opacity: number;
  time: number;
  colors: TransitionColors;
};

export const renderTransition = ({
  ctx,
  x,
  y,
  progress,
  width,
  height,
  opacity,
  time,
  colors,
}: RenderTransitionProps) => {
  ctx.globalAlpha = opacity;

  const maxRadius = Math.hypot(width, height);

  // Cover the page while the shockwave reveals it.
  // The overlay evolves from impact darkness into a warm residual glow.
  const darkFade = Math.max(0, 1 - progress / 0.7);

  const darkAlpha = 0.88 * darkFade;

  const settlingStart = 0.55;

  const settlingProgress = Math.min(
    Math.max((progress - settlingStart) / (1 - settlingStart), 0),
    1
  );

  const orangeFade =
    settlingProgress > 0
      ? Math.min(settlingProgress / 0.15, 1) *
        Math.pow(1 - settlingProgress, 0.55)
      : 0;

  const orangeAlpha = 0.06 + orangeFade * 0.39;

  ctx.fillStyle = `rgba(8, 12, 20, ${darkAlpha})`;
  ctx.fillRect(0, 0, width, height);

  if (orangeAlpha > 0) {
    const gradient = ctx.createRadialGradient(x, y, 0, x, y, maxRadius * 0.55);

    gradient.addColorStop(0, colors.accentColor);

    gradient.addColorStop(1, "transparent");

    ctx.fillStyle = gradient;
    ctx.globalAlpha = orangeAlpha;

    ctx.fillRect(0, 0, width, height);

    ctx.globalAlpha = opacity;
  }

  ctx.beginPath();

  const shockwaveState = drawShockwave({
    ctx,
    x,
    y,
    maxRadius,
    progress,
    time,
    frontColor: colors.frontColor,
    highlightColor: colors.highlightColor,
    accentColor: colors.accentColor,
  });

  // Reveal the theme underneath the transition.
  // The shockwave controls the geometry;
  // the renderer controls how the page is exposed.
  ctx.save();

  ctx.fillStyle = colors.highlightColor;

  ctx.beginPath();

  ctx.arc(x, y, shockwaveState.revealRadius, 0, Math.PI * 2);

  ctx.arc(
    x,
    y,
    Math.max(0, shockwaveState.revealRadius - shockwaveState.revealThickness),
    0,
    Math.PI * 2,
    true
  );

  ctx.fill();

  ctx.restore();
  ctx.globalAlpha = 1;

  return shockwaveState;
};
