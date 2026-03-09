"use client";

import { useRef, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const PARTICLE_COUNT = 1000;

export default function ParticleSystem() {
  const meshRef = useRef<THREE.Points>(null);
  const { mouse, viewport } = useThree();

  const { positions, speeds, originalPositions } = useMemo(() => {
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    const originalPositions = new Float32Array(PARTICLE_COUNT * 3);
    const speeds = new Float32Array(PARTICLE_COUNT);

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
    }

    return { positions, speeds, originalPositions };
  }, []);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;

    const pos = meshRef.current.geometry.attributes.position.array as Float32Array;
    const time = clock.getElapsedTime();

    // Posizione mouse in world space
    const mouseX = (mouse.x * viewport.width) / 2;
    const mouseY = (mouse.y * viewport.height) / 2;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const ix = i * 3;
      const iy = i * 3 + 1;
      const iz = i * 3 + 2;

      // Movimento base verso l'alto
      pos[iy] += speeds[i];
      if (pos[iy] > 10) pos[iy] = -10;

      // Ondulazione con noise
      pos[ix] = originalPositions[ix] + Math.sin(time * 0.3 + i * 0.1) * 0.1;
      pos[iz] = originalPositions[iz] + Math.cos(time * 0.2 + i * 0.05) * 0.1;

      // Repulsione dal mouse
      const dx = pos[ix] - mouseX;
      const dy = pos[iy] - mouseY;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const repulseRadius = 4;

      if (dist < repulseRadius) {
        const force = (repulseRadius - dist) / repulseRadius;
        pos[ix] += (dx / dist) * force * 0.4;
        pos[iy] += (dy / dist) * force * 0.4;
      }
    }

    meshRef.current.geometry.attributes.position.needsUpdate = true;
    meshRef.current.rotation.y += 0.0002;
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.025}
        color="#ffffff"
        transparent
        opacity={0.4}
        sizeAttenuation
      />
    </points>
  );
}