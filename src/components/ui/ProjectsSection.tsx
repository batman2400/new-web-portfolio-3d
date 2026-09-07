'use client';

import { useState } from 'react';
import { PORTFOLIO_DATA, Project } from '@/utils/portfolioData';
import { sound } from '@/utils/soundEngine';
import { ExternalLink, Sparkles, Layers, Cpu } from 'lucide-react';
import { GithubIcon } from './Icons';

export default function ProjectsSection() {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const categories = ['All', '3D & Cloud Systems', 'AI & Full Stack', 'Creative Tools'];

  const filteredProjects = activeCategory === 'All'
    ? PORTFOLIO_DATA.projects
    : PORTFOLIO_DATA.projects.filter((p) => p.category.includes(activeCategory.split(' ')[0]));

  return (
    <section id="projects" className="relative py-24 px-4 sm:px-8 md:px-16 z-10">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 text-cyan-400 font-mono text-xs uppercase tracking-widest mb-2">
              <Layers size={14} /> Featured Deployments
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Selected <span className="text-gradient-cyan">Engineering</span> Works.
            </h2>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  sound.playBlip(560);
                  setActiveCategory(cat);
                }}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-mono transition-all ${
                  activeCategory === cat
                    ? 'bg-cyan-500 text-slate-950 font-bold shadow-glow-cyan'
                    : 'bg-slate-900/80 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredProjects.map((project) => (
            <article
              key={project.id}
              onMouseEnter={() => sound.playBlip(480, 0.02, 0.04)}
              className="group relative flex flex-col justify-between rounded-2xl glass-panel p-6 sm:p-8 transition-all duration-300 hover:border-cyan-400/50 hover:shadow-glow-cyan"
            >
              <div>
                {/* Top header row */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="text-xs font-mono text-cyan-400/90 font-medium px-2.5 py-1 rounded-md bg-cyan-950/60 border border-cyan-500/20">
                    {project.category}
                  </span>
                  <span className="text-xs font-mono text-emerald-400 flex items-center gap-1">
                    <Sparkles size={12} /> {project.metrics}
                  </span>
                </div>

                {/* Project Title */}
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 group-hover:text-cyan-300 transition-colors">
                  {project.title}
                </h3>

                {/* Project Description */}
                <p className="text-sm text-slate-300 mb-6 leading-relaxed">
                  {project.description}
                </p>

                {/* Tech Tags */}
                <div className="flex flex-wrap gap-1.5 mb-8">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[11px] font-mono px-2.5 py-1 rounded bg-slate-900/80 text-slate-300 border border-slate-800"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3 pt-4 border-t border-slate-800/80">
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => sound.playBlip(640)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-cyan-500/10 hover:bg-cyan-500 text-cyan-300 hover:text-slate-950 text-xs font-mono font-semibold border border-cyan-500/30 transition-all"
                >
                  <ExternalLink size={13} />
                  <span>Live Sandbox</span>
                </a>
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => sound.playBlip(600)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white text-xs font-mono border border-slate-800 transition-all"
                >
                  <GithubIcon size={13} />
                  <span>Source Code</span>
                </a>
                <button
                  onClick={() => {
                    sound.playKeyStroke();
                    setSelectedProject(project);
                  }}
                  className="ml-auto text-xs font-mono text-slate-400 hover:text-cyan-400 underline underline-offset-4"
                >
                  Case Study &rarr;
                </button>
              </div>
            </article>
          ))}
        </div>

        {/* Modal Case Study Expander */}
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
            <div className="relative w-full max-w-2xl rounded-2xl glass-panel p-6 sm:p-8 border border-cyan-400/40 shadow-glow-cyan animate-in fade-in zoom-in-95 duration-200">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider">
                    {selectedProject.category}
                  </span>
                  <h3 className="text-2xl font-bold text-white mt-1">
                    {selectedProject.title}
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="text-slate-400 hover:text-white p-1 font-mono text-lg"
                >
                  ✕
                </button>
              </div>

              <div className="my-4 p-4 rounded-xl bg-slate-950/80 border border-slate-800 font-mono text-xs text-slate-300 leading-relaxed">
                <div className="text-cyan-400 font-bold mb-2 flex items-center gap-1.5">
                  <Cpu size={14} /> Architectural Deep-Dive:
                </div>
                {selectedProject.longDescription}
              </div>

              <div className="mb-6">
                <div className="text-xs font-mono text-slate-400 mb-2">Engineered with:</div>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.tags.map((t) => (
                    <span key={t} className="text-xs font-mono px-2.5 py-1 rounded bg-cyan-950/40 text-cyan-300 border border-cyan-500/20">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setSelectedProject(null)}
                  className="px-4 py-2 rounded-lg text-xs font-mono text-slate-400 hover:text-white"
                >
                  Close
                </button>
                <a
                  href={selectedProject.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-lg bg-cyan-500 text-slate-950 font-mono font-bold text-xs shadow-glow-cyan"
                >
                  View Repository
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
