'use client';

import { Canvas } from '@react-three/fiber';
import { Suspense, useEffect, useState } from 'react';
import CameraRig, { CameraPreset } from './CameraRig';
import CyberWorkstation from './CyberWorkstation';
import ParticleUniverse from './ParticleUniverse';

interface SceneCanvasProps {
  cameraPreset: CameraPreset;
  onMonitorClick?: () => void;
}

export default function SceneCanvas({ cameraPreset, onMonitorClick }: SceneCanvasProps) {
  const [scrollYProgress, setScrollYProgress] = useState(0);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const current = window.scrollY;
      setScrollY(current);
      if (totalHeight > 0) {
        setScrollYProgress(current / totalHeight);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed inset-0 z-0 h-screen w-screen overflow-hidden pointer-events-auto bg-[#07090e]">
      <Canvas
        shadows
        dpr={[1, 1.5]}
        camera={{ position: [0, 4.5, 9.5], fov: 45 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
      >
        <Suspense fallback={null}>
          {/* Lighting */}
          <ambientLight intensity={0.4} />
          
          <directionalLight
            position={[5, 8, 5]}
            intensity={1.2}
            castShadow
            shadow-mapSize={[1024, 1024]}
            shadow-bias={-0.0001}
          />

          {/* Cyberpunk Accent Lights */}
          <pointLight position={[-4, 3, 2]} color="#00f0ff" intensity={1.8} distance={10} />
          <pointLight position={[4, 3, -2]} color="#a855f7" intensity={1.6} distance={10} />
          <pointLight position={[0, -1, 3]} color="#00ff88" intensity={0.8} distance={8} />

          {/* 3D Meshes & Scene */}
          <CyberWorkstation onMonitorClick={onMonitorClick} activePreset={cameraPreset} />
          <ParticleUniverse count={2000} scrollY={scrollY} />

          {/* Camera Controller */}
          <CameraRig preset={cameraPreset} scrollYProgress={scrollYProgress} />
        </Suspense>
      </Canvas>
    </div>
  );
}
