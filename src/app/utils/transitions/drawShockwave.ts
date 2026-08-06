import { THEME_TRANSITION_CONFIG } from "./themeTransition";

type DrawShockwaveProps = {
  ctx: CanvasRenderingContext2D;
  x: number;
  y: number;
  maxRadius: number;
  progress: number;
  time: number;
  frontColor: string;
  highlightColor: string;
  accentColor: string;
};

type ShockwaveState = {
  frontRadius: number;
  revealRadius: number;
  revealThickness: number;
  maxRadius: number;
  coverage: number;
};

const drawFrontRing = ({
  ctx,
  x,
  y,
  radius,
  maxRadius,
  color,
  highlightColor,
  detailFade,
}: {
  ctx: CanvasRenderingContext2D;
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  color: string;
  highlightColor: string;
  detailFade: number;
}) => {
  ctx.save();

  // Main front body
  ctx.strokeStyle = color;
  ctx.lineWidth = Math.max(16, maxRadius * 0.02);

  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  ctx.stroke();

  // Temporary energy edge
  if (detailFade > 0) {
    ctx.globalAlpha = detailFade;

    ctx.strokeStyle = highlightColor;
    ctx.lineWidth = Math.max(2, maxRadius * 0.004);

    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.stroke();
  }

  ctx.restore();
};
export const drawShockwave = ({
  ctx,
  x,
  y,
  maxRadius,
  time,
  progress,
  frontColor,
  highlightColor,
  accentColor,
}: DrawShockwaveProps): ShockwaveState => {
  const { impactDuration, frontWidth, distortionStrength } =
    THEME_TRANSITION_CONFIG.shockwave;

  // Phase 1 — Geometry
  const impactProgress = Math.min(progress / impactDuration, 1);
  const impactStrength = Math.sin(impactProgress * Math.PI) ** 0.6;
  const impactRadius = maxRadius * 0.07 * impactStrength;

  const waveDelay = 0.04;
  const spreadProgress = Math.max(
    0,
    (progress - impactDuration - waveDelay) / (1 - impactDuration - waveDelay)
  );
  const impactPulse = Math.sin(impactProgress * Math.PI);
  const frontLead = Math.sin(spreadProgress * Math.PI) * 0.08;
  const frontRadius =
    maxRadius * (spreadProgress + frontLead) + maxRadius * 0.04 * impactPulse;

  const revealOffset = Math.max(
    30,
    maxRadius * THEME_TRANSITION_CONFIG.shockwave.revealOffset
  );
  const revealRadius = Math.max(0, frontRadius - revealOffset);
  const revealThickness = Math.max(
    40,
    maxRadius * THEME_TRANSITION_CONFIG.shockwave.revealThickness
  );

  const impactDistortion =
    Math.sin(time * 0.015) *
    maxRadius *
    distortionStrength *
    (1 - spreadProgress * 0.5);
  const distortedFrontRadius = Math.max(0, frontRadius + impactDistortion);

  const detailFade = Math.max(0, 1 - (progress - 0.45) / 0.25);

  // Phase 2 — Render

  // Impact
  if (impactRadius > 0) {
    ctx.save();

    // Outer energy shell
    ctx.strokeStyle = highlightColor;
    ctx.globalAlpha = impactStrength * 0.65;
    ctx.lineWidth = Math.max(4, maxRadius * 0.006);

    ctx.beginPath();
    ctx.arc(x, y, impactRadius, 0, Math.PI * 2);
    ctx.stroke();

    // Hot inner flash
    ctx.fillStyle = "#fffaf2";
    ctx.globalAlpha = impactStrength * 0.45;

    ctx.beginPath();
    ctx.arc(x, y, impactRadius * 0.45, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
  }

  // Front
  drawFrontRing({
    ctx,
    x,
    y,
    radius: distortedFrontRadius,
    maxRadius,
    color: frontColor,
    highlightColor,
    detailFade,
  });

  // Phase 3 — Return transition state
  const coverage = Math.min(frontRadius / maxRadius, 1);

  return {
    frontRadius,
    revealRadius,
    revealThickness,
    maxRadius,
    coverage,
  };
};
