import Particle from "./Particle";

type ParticleUpdate = (particle: Particle) => void;

export default class ParticleSystem {
  readonly particles: Particle[] = [];

  emit(particle: Particle) {
    this.particles.push(particle);
  }

  emitMany(particles: Particle[]) {
    this.particles.push(...particles);
  }

  render(ctx: CanvasRenderingContext2D, beforeUpdate?: ParticleUpdate) {
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const particle = this.particles[i];

      particle.alpha -= particle.fadeSpeed;

      if (particle.alpha <= 0.01) {
        this.particles.splice(i, 1);
        continue;
      }

      beforeUpdate?.(particle);

      particle.update();
      particle.draw(ctx);
    }
  }

  clear() {
    this.particles.length = 0;
  }
}
