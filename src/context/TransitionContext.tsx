"use client";
import { createContext, useContext, useRef, useState } from "react";

interface TransitionContextType {
  isTransitioning: boolean;
  setIsTransitioning: (v: boolean) => void;
  particleIntensityRef: React.MutableRefObject<number>;
}

const TransitionContext = createContext<TransitionContextType>({
  isTransitioning: false,
  setIsTransitioning: () => {},
  particleIntensityRef: { current: 0 },
});

export function TransitionProvider({ children }: { children: React.ReactNode }) {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const particleIntensityRef = useRef(0);

  return (
    <TransitionContext.Provider value={{ isTransitioning, setIsTransitioning, particleIntensityRef }}>
      {children}
    </TransitionContext.Provider>
  );
}

export function useTransition() {
  return useContext(TransitionContext);
}