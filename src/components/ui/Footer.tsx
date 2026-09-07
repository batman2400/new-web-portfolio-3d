'use client';

import { ArrowUp, Sparkles, Heart } from 'lucide-react';
import { sound } from '@/utils/soundEngine';

export default function Footer() {
  const scrollToTop = () => {
    sound.playBlip(750);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative z-10 border-t border-slate-800/80 bg-slate-950/80 backdrop-blur-xl px-4 sm:px-8 py-10 font-mono text-xs text-slate-400">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-white font-bold mb-1">
            <span className="text-cyan-400">MOHAN</span> &bull; 3D PORTFOLIO
          </div>
          <p className="text-[11px] text-slate-500">
            Next.js 15 (App Router) &bull; React Three Fiber &bull; Drei &bull; Tailwind CSS
          </p>
        </div>

        <div className="flex items-center gap-2 text-[11px] text-emerald-400 bg-slate-900/80 px-3 py-1.5 rounded-full border border-slate-800">
          <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>WebGL 2.0 Active &bull; 60 FPS Target</span>
        </div>

        <button
          onClick={scrollToTop}
          className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-slate-900 hover:bg-cyan-500 hover:text-slate-950 text-slate-300 border border-slate-800 transition-all"
        >
          <span>Back to Top</span>
          <ArrowUp size={13} />
        </button>
      </div>
    </footer>
  );
}
