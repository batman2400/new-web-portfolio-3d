'use client';

import dynamic from 'next/dynamic';
import { useState } from 'react';
import Navbar from '@/components/ui/Navbar';
import HeroSection from '@/components/ui/HeroSection';
import ProjectsSection from '@/components/ui/ProjectsSection';
import SkillsMatrix from '@/components/ui/SkillsMatrix';
import ExperienceSection from '@/components/ui/ExperienceSection';
import InteractiveTerminal from '@/components/ui/InteractiveTerminal';
import ContactSection from '@/components/ui/ContactSection';
import Footer from '@/components/ui/Footer';
import { CameraPreset } from '@/components/canvas/CameraRig';

// Dynamic import of 3D WebGL Canvas to prevent server-side hydration mismatches
const SceneCanvas = dynamic(() => import('@/components/canvas/SceneCanvas'), {
  ssr: false,
  loading: () => (
    <div className="fixed inset-0 z-0 flex items-center justify-center bg-[#07090e]">
      <div className="flex flex-col items-center gap-3">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-cyan-500 border-t-transparent shadow-glow-cyan" />
        <span className="text-xs font-mono text-cyan-400/80 tracking-widest uppercase animate-pulse">
          Initializing Spatial WebGL...
        </span>
      </div>
    </div>
  ),
});

export default function Home() {
  const [cameraPreset, setCameraPreset] = useState<CameraPreset>('overview');

  const handleOpenTerminal = () => {
    const el = document.getElementById('terminal');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleMonitorClick = () => {
    setCameraPreset('screen');
    const el = document.getElementById('projects');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <main className="relative min-h-screen bg-[#07090e] text-slate-100 selection:bg-cyan-400 selection:text-slate-950">
      {/* Fixed 3D WebGL Canvas Background */}
      <SceneCanvas
        cameraPreset={cameraPreset}
        onMonitorClick={handleMonitorClick}
      />

      {/* Subtle Scanline Overlay for Cyber Atmosphere */}
      <div className="pointer-events-none fixed inset-0 z-1 cyber-grid opacity-40" />

      {/* Layered Semantic DOM Content */}
      <div className="relative z-10 flex flex-col">
        <Navbar
          cameraPreset={cameraPreset}
          onSelectPreset={setCameraPreset}
          onOpenTerminal={handleOpenTerminal}
        />

        <HeroSection
          onSelectPreset={setCameraPreset}
          onOpenTerminal={handleOpenTerminal}
        />

        <ProjectsSection />

        <SkillsMatrix />

        <ExperienceSection />

        <InteractiveTerminal />

        <ContactSection />

        <Footer />
      </div>
    </main>
  );
}
