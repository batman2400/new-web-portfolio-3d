'use client';

import { PORTFOLIO_DATA } from '@/utils/portfolioData';
import { Briefcase, CheckCircle2 } from 'lucide-react';

export default function ExperienceSection() {
  const { timeline } = PORTFOLIO_DATA;

  return (
    <section id="experience" className="relative py-24 px-4 sm:px-8 md:px-16 z-10">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="mb-14">
          <div className="inline-flex items-center gap-2 text-cyan-400 font-mono text-xs uppercase tracking-widest mb-2">
            <Briefcase size={14} /> Career Trajectory
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Work Experience & <span className="text-gradient-cyan">Impact</span>.
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-2 font-light">
            A history of building scalable web systems, leading technical teams, and pushing browser graphics boundaries.
          </p>
        </div>

        {/* Timeline Container */}
        <div className="relative border-l border-cyan-500/20 ml-3 sm:ml-6 space-y-10">
          {timeline.map((item, idx) => (
            <div key={idx} className="relative pl-6 sm:pl-10 group">
              {/* Timeline Indicator Dot */}
              <div className="absolute -left-[9px] top-1.5 h-4 w-4 rounded-full bg-slate-950 border-2 border-cyan-400 group-hover:bg-cyan-400 group-hover:shadow-glow-cyan transition-all duration-300" />

              {/* Card */}
              <div className="glass-panel p-6 sm:p-7 rounded-2xl border-slate-800/90 group-hover:border-cyan-500/30 transition-colors">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                  <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {item.role}
                  </h3>
                  <span className="text-xs font-mono px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-cyan-400 self-start sm:self-auto">
                    {item.year}
                  </span>
                </div>

                <div className="text-sm font-mono text-purple-400 mb-3">
                  @ {item.company}
                </div>

                <p className="text-sm text-slate-300 mb-4 leading-relaxed">
                  {item.description}
                </p>

                {/* Achievements */}
                <div className="space-y-1.5 mb-5">
                  {item.achievements.map((ach, aIdx) => (
                    <div key={aIdx} className="flex items-start gap-2 text-xs text-slate-400">
                      <CheckCircle2 size={13} className="text-emerald-400 mt-0.5 shrink-0" />
                      <span>{ach}</span>
                    </div>
                  ))}
                </div>

                {/* Tech Pills */}
                <div className="flex flex-wrap gap-1.5 pt-3 border-t border-slate-800/80">
                  {item.tech.map((t) => (
                    <span key={t} className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900/60 text-slate-400 border border-slate-800">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
