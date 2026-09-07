'use client';

import { useState } from 'react';
import { CameraPreset } from '../canvas/CameraRig';
import { sound } from '@/utils/soundEngine';
import { Volume2, VolumeX, Eye, Sparkles } from 'lucide-react';
import { GithubIcon } from './Icons';

interface NavbarProps {
  cameraPreset: CameraPreset;
  onSelectPreset: (preset: CameraPreset) => void;
  onOpenTerminal?: () => void;
}

export default function Navbar({ cameraPreset, onSelectPreset, onOpenTerminal }: NavbarProps) {
  const [isMuted, setIsMuted] = useState(sound.getMuted());
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleMuteToggle = () => {
    const muted = sound.toggleMute();
    setIsMuted(muted);
  };

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Arsenal', href: '#skills' },
    { name: 'Experience', href: '#experience' },
    { name: 'Terminal', href: '#terminal', action: onOpenTerminal },
    { name: 'Contact', href: '#contact' },
  ];

  const cameraPresets: { id: CameraPreset; label: string }[] = [
    { id: 'overview', label: 'Overview' },
    { id: 'workstation', label: 'Desk' },
    { id: 'screen', label: 'IDE' },
    { id: 'orbit', label: 'Angle' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 py-3 sm:px-8 backdrop-blur-xl bg-slate-950/70 border-b border-cyan-500/15">
      {/* Brand Logo */}
      <a
        href="#"
        onClick={() => {
          sound.playBlip(500);
          onSelectPreset('overview');
        }}
        className="group flex items-center gap-3 cursor-pointer"
      >
        <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 shadow-glow-cyan">
          <span className="text-lg font-black tracking-wider text-slate-950 font-mono">M</span>
          <div className="absolute -inset-0.5 rounded-xl bg-cyan-400 opacity-20 blur group-hover:opacity-60 transition duration-300" />
        </div>
        <div>
          <div className="text-sm font-bold tracking-tight text-white flex items-center gap-1.5 font-mono">
            MOHAN <span className="text-cyan-400">DEV</span>
          </div>
          <div className="text-[10px] text-cyan-300/70 uppercase tracking-widest font-mono">
            3D Web Architect
          </div>
        </div>
      </a>

      {/* Desktop Navigation Links */}
      <nav className="hidden md:flex items-center gap-1 glass-panel px-3 py-1.5 rounded-full border-cyan-500/20">
        {navLinks.map((link) => (
          <a
            key={link.name}
            href={link.href}
            onClick={() => {
              sound.playBlip(580);
              link.action?.();
            }}
            className="px-3.5 py-1 text-xs font-mono font-medium text-slate-300 hover:text-cyan-400 hover:bg-cyan-950/40 rounded-full transition-colors duration-200"
          >
            {link.name}
          </a>
        ))}
      </nav>

      {/* 3D View Selector & Controls */}
      <div className="flex items-center gap-2">
        {/* 3D Camera Preset Pills */}
        <div className="hidden lg:flex items-center gap-1 rounded-lg bg-slate-900/90 p-1 border border-slate-800">
          <span className="flex items-center gap-1 px-2 text-[10px] font-mono uppercase tracking-wider text-slate-400">
            <Eye size={12} className="text-cyan-400" /> 3D View:
          </span>
          {cameraPresets.map((p) => (
            <button
              key={p.id}
              onClick={() => {
                sound.playCameraSwitch();
                onSelectPreset(p.id);
              }}
              className={`px-2.5 py-0.5 text-xs font-mono rounded transition-all ${
                cameraPreset === p.id
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-glow-cyan'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>

        {/* Audio Toggle */}
        <button
          onClick={handleMuteToggle}
          title={isMuted ? 'Enable futuristic audio sound effects' : 'Mute audio sound effects'}
          className={`flex h-9 w-9 items-center justify-center rounded-xl border transition-all ${
            isMuted
              ? 'border-slate-800 bg-slate-900/80 text-slate-500 hover:text-slate-300'
              : 'border-cyan-500/50 bg-cyan-950/50 text-cyan-400 shadow-glow-cyan'
          }`}
        >
          {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
        </button>

        {/* GitHub Link */}
        <a
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => sound.playBlip(620)}
          className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-800 bg-slate-900/80 text-slate-300 hover:border-cyan-400 hover:text-cyan-400 transition-colors"
        >
          <GithubIcon size={16} />
        </a>

        {/* Mobile menu button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden flex h-9 w-9 items-center justify-center rounded-xl border border-slate-800 bg-slate-900/80 text-slate-300"
        >
          <Sparkles size={16} className="text-cyan-400" />
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 p-4 bg-slate-950/95 border-b border-cyan-500/20 backdrop-blur-2xl flex flex-col gap-2">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => {
                sound.playBlip(550);
                link.action?.();
                setMobileMenuOpen(false);
              }}
              className="px-4 py-2 text-sm font-mono text-slate-300 hover:text-cyan-400 rounded-lg hover:bg-slate-900"
            >
              {link.name}
            </a>
          ))}
          <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs font-mono text-slate-400">
            <span>Camera Preset:</span>
            <div className="flex gap-1">
              {cameraPresets.map((p) => (
                <button
                  key={p.id}
                  onClick={() => {
                    sound.playCameraSwitch();
                    onSelectPreset(p.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`px-2 py-1 rounded text-xs ${
                    cameraPreset === p.id ? 'bg-cyan-500 text-slate-950 font-bold' : 'bg-slate-900'
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
