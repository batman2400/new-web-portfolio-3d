'use client';

import { PORTFOLIO_DATA } from '@/utils/portfolioData';
import { sound } from '@/utils/soundEngine';
import { CameraPreset } from '../canvas/CameraRig';
import { ArrowRight, Terminal, Box } from 'lucide-react';

interface HeroSectionProps {
  onSelectPreset: (preset: CameraPreset) => void;
  onOpenTerminal: () => void;
}

export default function HeroSection({ onSelectPreset, onOpenTerminal }: HeroSectionProps) {
  const { personal } = PORTFOLIO_DATA;

  return (
    <section id="hero" className="relative min-h-screen flex flex-col justify-center px-4 sm:px-8 md:px-16 pt-24 pb-16 z-10 pointer-events-none">
      <div className="max-w-4xl pointer-events-auto">
        {/* Availability Badge */}
        <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full glass-panel border-cyan-400/30 text-xs font-mono mb-6 text-slate-300 shadow-glow-cyan animate-pulse-slow">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
          </span>
          <span className="text-cyan-300 font-semibold">{personal.status}</span>
          <span className="text-slate-600">|</span>
          <span className="text-slate-400">Next.js 15 &bull; R3F &bull; WebGL</span>
        </div>

        {/* Main Headline */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white mb-6 leading-[1.08]">
          Architecting <br />
          <span className="text-gradient-cyan">Spatial WebGL</span> & <br />
          <span className="text-gradient-purple">Resilient Systems</span>.
        </h1>

        {/* Subtitle / Bio */}
        <p className="text-base sm:text-lg md:text-xl text-slate-300 max-w-2xl mb-8 leading-relaxed font-light">
          Hi, I am <span className="text-white font-medium">{personal.name}</span>. I build declarative 3D web applications, GPU-accelerated interfaces, and distributed systems where precision engineering meets high-fidelity digital craftsmanship.
        </p>

        {/* Interactive Action Buttons */}
        <div className="flex flex-wrap items-center gap-4 mb-14">
          <a
            href="#projects"
            onClick={() => sound.playBlip(620)}
            className="group inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-mono font-bold text-sm shadow-glow-cyan transition-all transform hover:-translate-y-0.5"
          >
            <span>Explore Projects</span>
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </a>

          <button
            onClick={() => {
              sound.playKeyStroke();
              onOpenTerminal();
            }}
            className="inline-flex items-center gap-2.5 px-5 py-3.5 rounded-xl glass-panel hover:bg-slate-900/90 text-slate-200 font-mono text-sm border-cyan-500/20 hover:border-cyan-400/50 transition-all transform hover:-translate-y-0.5"
          >
            <Terminal size={16} className="text-cyan-400" />
            <span>Launch CLI Terminal</span>
          </button>

          <button
            onClick={() => {
              sound.playCameraSwitch();
              onSelectPreset('workstation');
            }}
            className="inline-flex items-center gap-2.5 px-5 py-3.5 rounded-xl glass-panel hover:bg-purple-950/30 text-purple-300 font-mono text-sm border-purple-500/30 hover:border-purple-400 shadow-glow-purple transition-all transform hover:-translate-y-0.5"
          >
            <Box size={16} className="text-purple-400" />
            <span>Focus 3D Deck</span>
          </button>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl">
          {personal.stats.map((stat, idx) => (
            <div
              key={idx}
              className="glass-panel p-3.5 rounded-xl border-slate-800/80 hover:border-cyan-500/30 transition-colors"
            >
              <div className="text-2xl font-extrabold text-white font-mono tracking-tight text-gradient-cyan">
                {stat.value}
              </div>
              <div className="text-xs text-slate-400 font-mono uppercase tracking-wider mt-0.5">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
