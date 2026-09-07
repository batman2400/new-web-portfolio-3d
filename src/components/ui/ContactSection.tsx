'use client';

import { useState } from 'react';
import { PORTFOLIO_DATA } from '@/utils/portfolioData';
import { sound } from '@/utils/soundEngine';
import confetti from 'canvas-confetti';
import { Mail, Copy, Check, Send, Sparkles, MessageSquare, MapPin } from 'lucide-react';

export default function ContactSection() {
  const { personal } = PORTFOLIO_DATA;
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleCopyEmail = () => {
    sound.playSuccess();
    navigator.clipboard.writeText(personal.socials.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    sound.playKeyStroke();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      sound.playSuccess();

      // Fire celebratory confetti
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.65 },
          colors: ['#00f0ff', '#a855f7', '#00ff88'],
        });
      } catch {
        // ignore
      }

      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 800);
  };

  return (
    <section id="contact" className="relative py-24 px-4 sm:px-8 md:px-16 z-10">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="mb-14 text-center">
          <div className="inline-flex items-center gap-2 text-cyan-400 font-mono text-xs uppercase tracking-widest mb-2">
            <Mail size={14} /> Transmission Relay
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Initiate <span className="text-gradient-cyan">Contact</span>.
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-xl mx-auto mt-2 font-light">
            Have an ambitious 3D project, engineering challenge, or leadership inquiry? Drop a transmission below.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Left Info Column */}
          <div className="lg:col-span-2 space-y-6">
            <div className="glass-panel p-6 sm:p-7 rounded-2xl border-slate-800">
              <h3 className="text-lg font-bold text-white mb-2">
                Direct Contact
              </h3>
              <p className="text-xs text-slate-400 mb-6 leading-relaxed">
                Preferred communication channel is direct email. I reply within 24 hours.
              </p>

              {/* Email Copy Card */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                <div className="flex items-center gap-2.5 overflow-hidden">
                  <Mail size={16} className="text-cyan-400 shrink-0" />
                  <span className="text-xs font-mono text-slate-200 truncate">
                    {personal.socials.email}
                  </span>
                </div>
                <button
                  onClick={handleCopyEmail}
                  className="ml-2 flex items-center gap-1 px-2.5 py-1 rounded bg-cyan-950/70 text-cyan-300 hover:bg-cyan-900 text-xs font-mono border border-cyan-500/30 transition-all shrink-0"
                >
                  {copied ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
                  <span>{copied ? 'Copied' : 'Copy'}</span>
                </button>
              </div>

              {/* Location & Status */}
              <div className="mt-6 space-y-3 pt-6 border-t border-slate-800/80 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <MapPin size={14} className="text-purple-400" />
                  <span>{personal.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Sparkles size={14} className="text-emerald-400" />
                  <span>{personal.status}</span>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="glass-panel p-6 rounded-2xl border-slate-800">
              <div className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-4">
                Networks & Profiles
              </div>
              <div className="flex flex-col gap-2.5 text-xs font-mono">
                <a
                  href={personal.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => sound.playBlip(550)}
                  className="flex items-center justify-between p-2.5 rounded-lg bg-slate-900/60 hover:bg-slate-800 text-slate-300 hover:text-cyan-400 transition-colors"
                >
                  <span>GitHub</span>
                  <span>&rarr;</span>
                </a>
                <a
                  href={personal.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => sound.playBlip(550)}
                  className="flex items-center justify-between p-2.5 rounded-lg bg-slate-900/60 hover:bg-slate-800 text-slate-300 hover:text-cyan-400 transition-colors"
                >
                  <span>LinkedIn</span>
                  <span>&rarr;</span>
                </a>
                <a
                  href={personal.socials.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => sound.playBlip(550)}
                  className="flex items-center justify-between p-2.5 rounded-lg bg-slate-900/60 hover:bg-slate-800 text-slate-300 hover:text-cyan-400 transition-colors"
                >
                  <span>X / Twitter</span>
                  <span>&rarr;</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Form Column */}
          <div className="lg:col-span-3">
            <div className="glass-panel p-6 sm:p-8 rounded-2xl border-slate-800 relative overflow-hidden">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <MessageSquare size={18} className="text-cyan-400" /> Send a Message
              </h3>

              {submitted ? (
                <div className="p-8 rounded-xl bg-cyan-950/40 border border-cyan-500/30 text-center animate-in fade-in duration-300">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-cyan-500 text-slate-950 mb-3 shadow-glow-cyan">
                    <Check size={24} />
                  </div>
                  <h4 className="text-lg font-bold text-white mb-1">
                    Transmission Received!
                  </h4>
                  <p className="text-xs text-slate-300 mb-6 max-w-sm mx-auto">
                    Thank you for reaching out. I will review your inquiry and connect with you shortly.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="px-4 py-2 rounded-lg bg-slate-900 text-xs font-mono text-cyan-400 border border-slate-700 hover:border-cyan-400"
                  >
                    Send Another Transmission
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-slate-300 mb-1.5">
                        Your Name <span className="text-cyan-400">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Alex Vance"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950/80 border border-slate-800 focus:border-cyan-400 text-white text-xs font-mono focus:outline-none transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-slate-300 mb-1.5">
                        Your Email <span className="text-cyan-400">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="alex@company.com"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950/80 border border-slate-800 focus:border-cyan-400 text-white text-xs font-mono focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1.5">
                      Subject / Project Type
                    </label>
                    <input
                      type="text"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="WebGPU Architecture / Contract Opportunity"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950/80 border border-slate-800 focus:border-cyan-400 text-white text-xs font-mono focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1.5">
                      Message <span className="text-cyan-400">*</span>
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tell me about your timeline, tech requirements, and vision..."
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950/80 border border-slate-800 focus:border-cyan-400 text-white text-xs font-mono focus:outline-none transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-mono font-bold text-xs shadow-glow-cyan transition-all transform hover:-translate-y-0.5 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span>Transmitting...</span>
                    ) : (
                      <>
                        <Send size={14} />
                        <span>Send Transmission</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
