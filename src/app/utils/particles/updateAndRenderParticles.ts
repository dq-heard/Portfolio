import Particle from "@/app/components/animations/Particle";

export function updateAndRenderParticles(
  particles: Particle[],
  ctx: CanvasRenderingContext2D
) {
  for (let i = particles.length - 1; i >= 0; i--) {
    const particle = particles[i];

    particle.alpha -= particle.fadeSpeed;

    if (particle.alpha <= 0.01) {
      particles.splice(i, 1);
      continue;
    }

    particle.update();
    particle.draw(ctx);
  }
}
