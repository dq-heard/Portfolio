import { PARTICLE_BLUE, PARTICLE_ORANGE } from "./colors";

export const AMBIENT_PARTICLE_CONFIG = {
  amount: 80,
  defaultSpread: 110,
  maxSpread: 180,
  accentChance: 0.06,
  primaryColor: PARTICLE_BLUE,
  accentColor: PARTICLE_ORANGE,
};

export const TOUCH_PARTICLE_CONFIG = {
  amount: 80,
  defaultSpread: 110,
  accentChance: 0.18,
  primaryColor: PARTICLE_BLUE,
  accentColor: PARTICLE_ORANGE,
};

export const INTERACTION_PARTICLE_CONFIG = {
  defaultQuantity: 40,
  accentChance: 0.18,
};

export const AVATAR_PARTICLE_CONFIG = {
  quantity: 140,
  spread: 160,
  color: PARTICLE_BLUE,
};
