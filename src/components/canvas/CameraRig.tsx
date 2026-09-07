'use client';

import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import * as THREE from 'three';

export type CameraPreset = 'overview' | 'workstation' | 'screen' | 'orbit';

interface CameraRigProps {
  preset: CameraPreset;
  scrollYProgress?: number;
}

const PRESET_CONFIGS: Record<CameraPreset, { pos: [number, number, number]; target: [number, number, number] }> = {
  overview: {
    pos: [0, 4.5, 9.5],
    target: [0, 1.2, 0],
  },
  workstation: {
    pos: [0, 2.2, 4.8],
    target: [0, 1.5, 0],
  },
  screen: {
    pos: [0, 1.8, 2.8],
    target: [0, 1.7, 0],
  },
  orbit: {
    pos: [6, 4, 7],
    target: [0, 1.2, 0],
  },
};

export default function CameraRig({ preset, scrollYProgress = 0 }: CameraRigProps) {
  const targetPos = useRef(new THREE.Vector3(...PRESET_CONFIGS.overview.pos));
  const targetLook = useRef(new THREE.Vector3(...PRESET_CONFIGS.overview.target));
  const currentLook = useRef(new THREE.Vector3(...PRESET_CONFIGS.overview.target));

  useFrame((state, delta) => {
    // Determine desired base camera position
    const config = PRESET_CONFIGS[preset] || PRESET_CONFIGS.overview;
    
    // Slight mouse parallax offset
    const mouseX = (state.pointer.x * 0.8);
    const mouseY = (state.pointer.y * 0.5);

    // Scroll influence on overview/workstation
    const scrollOffset = scrollYProgress * 3;

    targetPos.current.set(
      config.pos[0] + mouseX,
      config.pos[1] + mouseY - (preset === 'overview' ? scrollOffset * 0.3 : 0),
      config.pos[2] + (preset === 'overview' ? scrollOffset * 0.5 : 0)
    );

    targetLook.current.set(
      config.target[0] + mouseX * 0.2,
      config.target[1] + mouseY * 0.2,
      config.target[2]
    );

    // Smooth lerp camera position and lookAt
    const lerpSpeed = THREE.MathUtils.clamp(delta * 4, 0.01, 0.15);
    state.camera.position.lerp(targetPos.current, lerpSpeed);
    currentLook.current.lerp(targetLook.current, lerpSpeed);
    state.camera.lookAt(currentLook.current);
  });

  return null;
}
