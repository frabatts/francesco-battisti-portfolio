"use client";
import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect, useRef } from "react";
import ParticleSystem from "./ParticleSystem";

export default function Scene() {
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Normalizza le coordinate del mouse da -1 a 1
      mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

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
        <ParticleSystem mouseRef={mouseRef} />
      </Suspense>
    </Canvas>
  );
}