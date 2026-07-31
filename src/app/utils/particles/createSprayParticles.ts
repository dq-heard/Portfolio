import Particle from "@/app/components/animations/Particle";

type CreateSprayParticlesOptions = {
  particles: Particle[];
  x: number;
  y: number;
  quantity: number;
  spread: number;
  defaultSpread: number;
  primaryColor: string;
  accentColor: string;
  accentChance: number;
};

export function createSprayParticles({
  particles,
  x,
  y,
  quantity,
  spread,
  defaultSpread,
  primaryColor,
  accentColor,
  accentChance,
}: CreateSprayParticlesOptions) {
  const spreadScale = spread / defaultSpread;

  for (let i = 0; i < quantity; i++) {
    const offsetX = (Math.random() - 0.5) * Math.random() * spread;
    const offsetY = (Math.random() - 0.5) * Math.random() * spread;

    let radius =
      spread > defaultSpread ? 4 + Math.random() * 12 : 2 + Math.random() * 5;

    radius *= spreadScale;

    if (Math.abs(offsetX) < 30 && Math.abs(offsetY) < 30) {
      radius = (2 + Math.random() * 12) * spreadScale;
    } else if (Math.abs(offsetX) < 35 && Math.abs(offsetY) < 35) {
      radius = (1 + Math.random() * 3) * spreadScale;
    }

    particles.push(
      new Particle(
        x + offsetX,
        y + offsetY,
        radius,
        Math.random(),
        0.009 + Math.random() * 0.001,
        Math.random() < accentChance ? accentColor : primaryColor,
        0,
        0,
        1
      )
    );
  }
}
