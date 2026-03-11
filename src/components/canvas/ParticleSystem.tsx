"use client";
import { useRef, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useTransition } from "@/context/TransitionContext";

const PARTICLE_COUNT = 1000;
const COLOR_DEFAULT = new THREE.Color("#ffffff");
const COLOR_ACCENT = new THREE.Color("#e8d5b0");
const COLOR_GLOW = new THREE.Color("#ffffff");
const REPULSE_RADIUS = 4;

interface Props {
  mouseRef: React.RefObject<{ x: number; y: number }>;
}

export default function ParticleSystem({ mouseRef }: Props) {
  const meshRef = useRef<THREE.Points>(null);
  const { viewport, camera } = useThree();
  const { particleIntensityRef } = useTransition();

  const angles = useRef<Float32Array>(new Float32Array(PARTICLE_COUNT));
  const radii = useRef<Float32Array>(new Float32Array(PARTICLE_COUNT));
  const depthSpeeds = useRef<Float32Array>(new Float32Array(PARTICLE_COUNT));
  const snapshotPositions = useRef<Float32Array>(new Float32Array(PARTICLE_COUNT * 3));
  const snapshotTaken = useRef(false);

  const { positions, speeds, originalPositions, colors } = useMemo(() => {
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    const originalPositions = new Float32Array(PARTICLE_COUNT * 3);
    const speeds = new Float32Array(PARTICLE_COUNT);
    const colors = new Float32Array(PARTICLE_COUNT * 3);

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const x = (Math.random() - 0.5) * 20;
      const y = (Math.random() - 0.5) * 20;
      const z = (Math.random() - 0.5) * 10;

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;
      originalPositions[i * 3] = x;
      originalPositions[i * 3 + 1] = y;
      originalPositions[i * 3 + 2] = z;
      speeds[i] = Math.random() * 0.008 + 0.002;

      angles.current[i] = Math.atan2(y, x);
      radii.current[i] = Math.sqrt(x * x + y * y);
      depthSpeeds.current[i] = 0.5 + Math.random() * 1.5;

      colors[i * 3] = COLOR_DEFAULT.r;
      colors[i * 3 + 1] = COLOR_DEFAULT.g;
      colors[i * 3 + 2] = COLOR_DEFAULT.b;
    }

    return { positions, speeds, originalPositions, colors };
  }, []);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;

    const pos = meshRef.current.geometry.attributes.position.array as Float32Array;
    const col = meshRef.current.geometry.attributes.color.array as Float32Array;
    const mat = meshRef.current.material as THREE.PointsMaterial;
    const time = clock.getElapsedTime();

    const mouseX = mouseRef.current ? (mouseRef.current.x * viewport.width) / 2 : 0;
    const mouseY = mouseRef.current ? (mouseRef.current.y * viewport.height) / 2 : 0;

    const rawIntensity = particleIntensityRef.current;
    const intensity = Math.min(rawIntensity, 1);
    const isVortex = rawIntensity > 0;

    // ── ZOOM CAMERA ──
    const targetZ = THREE.MathUtils.lerp(5, 2.5, intensity);
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetZ, 0.06);

    // ── SNAPSHOT al primo frame del vortice ──
    if (isVortex && !snapshotTaken.current) {
      for (let j = 0; j < PARTICLE_COUNT * 3; j++) {
        snapshotPositions.current[j] = pos[j];
      }
      // Inizializza angoli e raggi dalla posizione snapshot
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const ix = i * 3;
        const iy = i * 3 + 1;
        angles.current[i] = Math.atan2(snapshotPositions.current[iy], snapshotPositions.current[ix]);
        radii.current[i] = Math.sqrt(snapshotPositions.current[ix] ** 2 + snapshotPositions.current[iy] ** 2);
      }
      snapshotTaken.current = true;
    }

    // Reset snapshot quando vortice finisce
    if (!isVortex && snapshotTaken.current) {
      snapshotTaken.current = false;
    }

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const ix = i * 3;
      const iy = i * 3 + 1;
      const iz = i * 3 + 2;

      if (isVortex) {
        // ── VORTICE — addensamento dalla posizione snapshot ──
        const angularSpeed = 0.018 + intensity * 0.018 * depthSpeeds.current[i];
        angles.current[i] += angularSpeed;

        const snapshotR = Math.sqrt(
          snapshotPositions.current[ix] ** 2 + snapshotPositions.current[iy] ** 2
        );
        radii.current[i] = THREE.MathUtils.lerp(
          radii.current[i],
          THREE.MathUtils.lerp(snapshotR, 0, intensity * 0.9),
          0.01 * depthSpeeds.current[i] * 0.3
        );

        pos[ix] = Math.cos(angles.current[i]) * radii.current[i];
        pos[iy] = Math.sin(angles.current[i]) * radii.current[i];
        pos[iz] = THREE.MathUtils.lerp(
          pos[iz],
          snapshotPositions.current[iz] * (1 - intensity * 0.7),
          0.01
        );

        // Glow bianco progressivo
        const glowT = intensity;
        col[ix] = THREE.MathUtils.lerp(col[ix], COLOR_GLOW.r, glowT * 0.1);
        col[iy] = THREE.MathUtils.lerp(col[iy], COLOR_GLOW.g, glowT * 0.1);
        col[iz] = THREE.MathUtils.lerp(col[iz], COLOR_GLOW.b, glowT * 0.1);

      } else {
        // ── STATO NORMALE ──
        pos[iy] += speeds[i] * depthSpeeds.current[i];
        if (pos[iy] > 10) pos[iy] = -10;

        const waveAmp = 0.05 + depthSpeeds.current[i] * 0.05;
        pos[ix] = originalPositions[ix] + Math.sin(time * 0.3 + i * 0.1) * waveAmp;
        pos[iz] = originalPositions[iz] + Math.cos(time * 0.2 + i * 0.05) * waveAmp;

        // Effetto mouse
        const dx = pos[ix] - mouseX;
        const dy = pos[iy] - mouseY;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < REPULSE_RADIUS && dist > 0) {
          const force = (REPULSE_RADIUS - dist) / REPULSE_RADIUS;
          const t = 1 - dist / REPULSE_RADIUS;
          pos[ix] += (dx / dist) * force * 0.2;
          pos[iy] += (dy / dist) * force * 0.2;
          col[ix] = THREE.MathUtils.lerp(col[ix], COLOR_ACCENT.r, t * 0.15);
          col[iy] = THREE.MathUtils.lerp(col[iy], COLOR_ACCENT.g, t * 0.15);
          col[iz] = THREE.MathUtils.lerp(col[iz], COLOR_ACCENT.b, t * 0.15);
        } else {
          col[ix] = THREE.MathUtils.lerp(col[ix], COLOR_DEFAULT.r, 0.03);
          col[iy] = THREE.MathUtils.lerp(col[iy], COLOR_DEFAULT.g, 0.03);
          col[iz] = THREE.MathUtils.lerp(col[iz], COLOR_DEFAULT.b, 0.03);
        }
      }
    }

    // Dimensione particelle cresce durante vortice
    const targetSize = THREE.MathUtils.lerp(0.035, 0.075, intensity);
    mat.size = THREE.MathUtils.lerp(mat.size, targetSize, 0.08);

    meshRef.current.geometry.attributes.position.needsUpdate = true;
    meshRef.current.geometry.attributes.color.needsUpdate = true;
    meshRef.current.rotation.y += isVortex ? 0.001 + intensity * 0.004 : 0.0002;
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
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
          return new THREE.CanvasTexture(canvas);
        })()}
      />
    </points>
  );
}