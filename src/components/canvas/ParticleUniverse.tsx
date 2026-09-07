'use client';

import { useFrame } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';

interface ParticleUniverseProps {
  count?: number;
  scrollY?: number;
}

export default function ParticleUniverse({ count = 2200, scrollY = 0 }: ParticleUniverseProps) {
  const pointsRef = useRef<THREE.Points>(null);

  // Generate particles distributed in a cylindrical volume around the scene
  const { positions, colors, initialPositions } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const initPos = new Float32Array(count * 3);

    const color1 = new THREE.Color('#00f0ff');
    const color2 = new THREE.Color('#a855f7');
    const color3 = new THREE.Color('#38bdf8');

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const radius = 6 + Math.random() * 24;
      const theta = Math.random() * Math.PI * 2;
      const y = (Math.random() - 0.5) * 30;

      const x = Math.cos(theta) * radius;
      const z = Math.sin(theta) * radius;

      pos[i3] = x;
      pos[i3 + 1] = y;
      pos[i3 + 2] = z;

      initPos[i3] = x;
      initPos[i3 + 1] = y;
      initPos[i3 + 2] = z;

      // Color gradient distribution
      const mixedColor = Math.random() > 0.6 ? color2 : Math.random() > 0.3 ? color1 : color3;
      col[i3] = mixedColor.r;
      col[i3 + 1] = mixedColor.g;
      col[i3 + 2] = mixedColor.b;
    }

    return { positions: pos, colors: col, initialPositions: initPos };
  }, [count]);

  useFrame((state, delta) => {
    if (!pointsRef.current) return;
    const time = state.clock.getElapsedTime();

    // Gentle slow rotation of universe
    pointsRef.current.rotation.y = time * 0.04 + scrollY * 0.0005;
    pointsRef.current.rotation.x = Math.sin(time * 0.02) * 0.1;

    // Wave ripple through particles
    const positionsAttr = pointsRef.current.geometry.attributes.position as THREE.BufferAttribute;
    const array = positionsAttr.array as Float32Array;

    for (let i = 0; i < count; i += 4) {
      const i3 = i * 3;
      const origX = initialPositions[i3];
      const origY = initialPositions[i3 + 1];
      const origZ = initialPositions[i3 + 2];

      // Subtle organic breathing oscillation
      array[i3 + 1] = origY + Math.sin(time * 1.5 + origX * 0.2) * 0.35;
      array[i3] = origX + Math.cos(time * 0.8 + origZ * 0.1) * 0.15;
    }
    positionsAttr.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
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
        size={0.075}
        vertexColors
        transparent
        opacity={0.75}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}
