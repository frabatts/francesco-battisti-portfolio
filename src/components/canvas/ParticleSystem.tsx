"use client";
import { useRef, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const PARTICLE_COUNT = 1000;
const COLOR_DEFAULT = new THREE.Color("#ffffff");
const COLOR_ACCENT = new THREE.Color("#e8d5b0");
const REPULSE_RADIUS = 4;

interface Props {
  mouseRef: React.RefObject<{ x: number; y: number }>;
}

export default function ParticleSystem({ mouseRef }: Props) {
  const meshRef = useRef<THREE.Points>(null);
  const { viewport } = useThree();

  const { positions, speeds, originalPositions, colors } = useMemo(() => {
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    const originalPositions = new Float32Array(PARTICLE_COUNT * 3);
    const speeds = new Float32Array(PARTICLE_COUNT);
    const colors = new Float32Array(PARTICLE_COUNT * 3);

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const x = (Math.random() - 0.5) * 20;
      const y = (Math.random() - 0.5) * 20;
      const z = (Math.random() - 0.5) * 10;

      positions[i * 3 + 0] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;
      originalPositions[i * 3 + 0] = x;
      originalPositions[i * 3 + 1] = y;
      originalPositions[i * 3 + 2] = z;
      speeds[i] = Math.random() * 0.008 + 0.002;

      colors[i * 3 + 0] = COLOR_DEFAULT.r;
      colors[i * 3 + 1] = COLOR_DEFAULT.g;
      colors[i * 3 + 2] = COLOR_DEFAULT.b;
    }

    return { positions, speeds, originalPositions, colors };
  }, []);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;

    const pos = meshRef.current.geometry.attributes.position.array as Float32Array;
    const col = meshRef.current.geometry.attributes.color.array as Float32Array;
    const time = clock.getElapsedTime();

    // Converti mouse normalizzato in world space
    const mouseX = mouseRef.current ? (mouseRef.current.x * viewport.width) / 2 : 0;
    const mouseY = mouseRef.current ? (mouseRef.current.y * viewport.height) / 2 : 0;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const ix = i * 3;
      const iy = i * 3 + 1;
      const iz = i * 3 + 2;

      // Movimento base verso l'alto
      pos[iy] += speeds[i];
      if (pos[iy] > 10) pos[iy] = -10;

      // Ondulazione
      pos[ix] = originalPositions[ix] + Math.sin(time * 0.3 + i * 0.1) * 0.1;
      pos[iz] = originalPositions[iz] + Math.cos(time * 0.2 + i * 0.05) * 0.1;

      // Distanza dal mouse
      const dx = pos[ix] - mouseX;
      const dy = pos[iy] - mouseY;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < REPULSE_RADIUS && dist > 0) {
        const force = (REPULSE_RADIUS - dist) / REPULSE_RADIUS;
        const t = 1 - dist / REPULSE_RADIUS;

        // Repulsione
        pos[ix] += (dx / dist) * force * 0.3;
        pos[iy] += (dy / dist) * force * 0.3;

        // Cambio colore → accent dorato
        col[ix] = THREE.MathUtils.lerp(col[ix], COLOR_ACCENT.r, t * 0.15);
        col[iy] = THREE.MathUtils.lerp(col[iy], COLOR_ACCENT.g, t * 0.15);
        col[iz] = THREE.MathUtils.lerp(col[iz], COLOR_ACCENT.b, t * 0.15);
      } else {
        // Torna al bianco gradualmente
        col[ix] = THREE.MathUtils.lerp(col[ix], COLOR_DEFAULT.r, 0.03);
        col[iy] = THREE.MathUtils.lerp(col[iy], COLOR_DEFAULT.g, 0.03);
        col[iz] = THREE.MathUtils.lerp(col[iz], COLOR_DEFAULT.b, 0.03);
      }
    }

    meshRef.current.geometry.attributes.position.needsUpdate = true;
    meshRef.current.geometry.attributes.color.needsUpdate = true;
    meshRef.current.rotation.y += 0.0002;
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
  size={0.035}
  transparent
  opacity={1}
  sizeAttenuation
  vertexColors
  alphaTest={0.001}
  map={(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 32;
    canvas.height = 32;
    const ctx = canvas.getContext("2d")!;
    const gradient = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
    gradient.addColorStop(0, "rgba(255,255,255,1)");
    gradient.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 32, 32);
    const texture = new THREE.CanvasTexture(canvas);
    return texture;
  })()}
/>
    </points>
  );
}