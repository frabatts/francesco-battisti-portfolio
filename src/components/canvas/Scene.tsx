"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import ParticleSystem from "./ParticleSystem";

export default function Scene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 75 }}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
        pointerEvents: "none",
      }}
    >
      <Suspense fallback={null}>
        <ParticleSystem />
      </Suspense>
    </Canvas>
  );
}