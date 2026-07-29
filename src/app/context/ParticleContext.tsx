"use client";

import { createContext, useContext, useRef } from "react";

type BurstOptions = {
  x: number;
  y: number;
  quantity?: number;
};

type BurstFunction = (options: BurstOptions) => void;

type ParticleContextType = {
  registerBurst: (burst: BurstFunction) => () => void;
  triggerBurst: (options: BurstOptions) => void;
};

const ParticleContext = createContext<ParticleContextType | null>(null);

export function ParticleProvider({ children }: { children: React.ReactNode }) {
  const burstHandlers = useRef(new Set<BurstFunction>());

  const registerBurst = (handler: BurstFunction) => {
    burstHandlers.current.add(handler);

    return () => {
      burstHandlers.current.delete(handler);
    };
  };

  const triggerBurst = (options: BurstOptions) => {
    burstHandlers.current.forEach((handler) => {
      handler(options);
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
