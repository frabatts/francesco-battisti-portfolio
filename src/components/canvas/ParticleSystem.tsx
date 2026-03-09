"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const PARTICLE_COUNT = 800;

export default function ParticleSystem() {
  const meshRef = useRef<THREE.Points>(null);

  // Genera posizioni casuali una sola volta
  const { positions, speeds } = useMemo(() => {
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    const speeds = new Float32Array(PARTICLE_COUNT);

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      positions[i * 3 + 0] = (Math.random() - 0.5) * 20; // x
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20; // y
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10; // z
      speeds[i] = Math.random() * 0.01 + 0.002;
    }

    return { positions, speeds };
  }, []);

  // Animazione per frame
  useFrame(() => {
    if (!meshRef.current) return;

    const pos = meshRef.current.geometry.attributes.position
      .array as Float32Array;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      // Le particelle salgono lentamente
      pos[i * 3 + 1] += speeds[i];

      // Reset quando escono dallo schermo
      if (pos[i * 3 + 1] > 10) {
        pos[i * 3 + 1] = -10;
      }
    }

    meshRef.current.geometry.attributes.position.needsUpdate = true;

    // Rotazione lenta del sistema
    meshRef.current.rotation.y += 0.0003;
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
        size={0.03}
        color="#ffffff"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
}