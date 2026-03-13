"use client";
import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect, useRef } from "react";
import ParticleSystem from "./ParticleSystem";

export default function Scene() {
  const mouseRef = useRef({ x: 0, y: 0 });
  const canvasRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", handleMouseMove);

    const forceNoPointerEvents = () => {
      const canvases = document.querySelectorAll("canvas");
      canvases.forEach((c) => {
        c.style.pointerEvents = "none";
        c.style.touchAction = "none";
      });
    };
    forceNoPointerEvents();
    const t = setTimeout(forceNoPointerEvents, 500);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      clearTimeout(t);
    };
  }, []);

  return (
    <div
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
        pointerEvents: "none",
        touchAction: "none",
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        style={{
          width: "100%",
          height: "100%",
          pointerEvents: "none",
          touchAction: "none",
        }}
        gl={{ alpha: true }}
      >
        <Suspense fallback={null}>
          <ParticleSystem mouseRef={mouseRef} />
        </Suspense>
      </Canvas>
    </div>
  );
}