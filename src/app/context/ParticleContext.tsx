"use client";

import { createContext, useContext, useRef } from "react";

type BurstFunction = (x: number, y: number, quantity?: number) => void;

type ParticleContextType = {
  registerBurst: (burst: BurstFunction) => () => void;
  triggerBurst: (x: number, y: number, quantity?: number) => void;
};

const ParticleContext = createContext<ParticleContextType | null>(null);

export function ParticleProvider({ children }: { children: React.ReactNode }) {
  const burstHandlers = useRef(
    new Set<(x: number, y: number, quantity?: number) => void>()
  );

  const registerBurst = (handler: BurstFunction) => {
    burstHandlers.current.add(handler);

    return () => {
      burstHandlers.current.delete(handler);
    };
  };

  const triggerBurst = (x: number, y: number, quantity?: number) => {
    burstHandlers.current.forEach((handler) => {
      handler(x, y, quantity);
    });
  };

  return (
    <ParticleContext.Provider
      value={{
        registerBurst,
        triggerBurst,
      }}
    >
      {children}
    </ParticleContext.Provider>
  );
}

export function useParticleBurst() {
  const context = useContext(ParticleContext);

  if (!context) {
    throw new Error("useParticleBurst must be used inside ParticleProvider");
  }

  return context;
}
