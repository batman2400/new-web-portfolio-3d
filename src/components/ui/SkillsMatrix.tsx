'use client';

import { PORTFOLIO_DATA } from '@/utils/portfolioData';
import { sound } from '@/utils/soundEngine';
import { Wrench, Terminal, Cpu, Database } from 'lucide-react';

export default function SkillsMatrix() {
  const { skillCategories } = PORTFOLIO_DATA;

  return (
    <section id="skills" className="relative py-24 px-4 sm:px-8 md:px-16 z-10">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="mb-14">
          <div className="inline-flex items-center gap-2 text-cyan-400 font-mono text-xs uppercase tracking-widest mb-2">
            <Wrench size={14} /> Technical Arsenal
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Capabilities & <span className="text-gradient-purple">Specializations</span>.
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-2xl mt-3">
            A comprehensive overview of production-tested frameworks, graphics pipelines, and system architectures I utilize to deliver performant web software.
          </p>
        </div>

        {/* Skill Category Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {skillCategories.map((cat, idx) => (
            <div
              key={cat.category}
              className="glass-panel rounded-2xl p-6 sm:p-7 flex flex-col justify-between border-slate-800 hover:border-cyan-500/40 transition-all duration-300"
            >
              <div>
                {/* Category Header */}
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-950/60 text-cyan-400 border border-cyan-500/20">
                    {idx === 0 ? <Cpu size={20} /> : idx === 1 ? <Terminal size={20} /> : <Database size={20} />}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white tracking-tight">
                      {cat.category}
                    </h3>
                    <p className="text-xs text-slate-400 font-light">
                      {cat.description}
                    </p>
                  </div>
                </div>

                {/* Skill List */}
                <div className="space-y-4 mt-6">
                  {cat.skills.map((skill) => (
                    <div
                      key={skill.name}
                      onMouseEnter={() => sound.playBlip(700, 0.015, 0.02)}
                      className="group"
                    >
                      <div className="flex items-center justify-between text-xs font-mono mb-1.5">
                        <span className={`flex items-center gap-2 ${skill.highlight ? 'text-cyan-300 font-bold' : 'text-slate-300'}`}>
                          <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-900 border border-slate-700 text-slate-400">
                            {skill.iconText}
                          </span>
                          {skill.name}
                        </span>
                        <span className="text-slate-400 group-hover:text-cyan-400 transition-colors">
                          {skill.level}%
                        </span>
                      </div>
                      {/* Proficiency bar */}
                      <div className="h-1.5 w-full rounded-full bg-slate-900 overflow-hidden border border-slate-800">
                        <div
                          className={`h-full rounded-full transition-all duration-1000 ${
                            skill.highlight
                              ? 'bg-gradient-to-r from-cyan-400 to-blue-500 shadow-glow-cyan'
                              : 'bg-slate-600 group-hover:bg-cyan-400'
                          }`}
                          style={{ width: `${skill.level}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom tag */}
              <div className="mt-8 pt-4 border-t border-slate-800/80 text-[11px] font-mono text-slate-400 flex items-center justify-between">
                <span>Production Tested</span>
                <span className="text-emerald-400">● Active Daily</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
