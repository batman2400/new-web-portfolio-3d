'use client';

import { useState, useRef, useEffect } from 'react';
import { PORTFOLIO_DATA } from '@/utils/portfolioData';
import { sound } from '@/utils/soundEngine';
import { Terminal, CornerDownLeft, Sparkles } from 'lucide-react';

interface TerminalLine {
  type: 'input' | 'output' | 'error' | 'success' | 'system';
  text: string;
}

export default function InteractiveTerminal() {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<TerminalLine[]>([
    { type: 'system', text: '⚡ MOHAN-OS v2.4 (x86_64-spatial-webgl)' },
    { type: 'system', text: 'Type "help" to inspect available developer commands, or click the quick pills below.' },
  ]);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIdx, setHistoryIdx] = useState(-1);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    if (!trimmed) return;

    sound.playKeyStroke();
    const newHistory: TerminalLine[] = [...history, { type: 'input', text: `$ ${cmd}` }];
    setCommandHistory((prev) => [...prev, cmd]);
    setHistoryIdx(-1);

    switch (trimmed) {
      case 'help':
        sound.playBlip(620);
        newHistory.push(
          { type: 'system', text: 'Available commands:' },
          { type: 'output', text: '  about      - Display background, focus, and core philosophy' },
          { type: 'output', text: '  skills     - Print full technical competencies & ratings' },
          { type: 'output', text: '  projects   - Output featured engineering repositories' },
          { type: 'output', text: '  contact    - Retrieve direct transmission channels' },
          { type: 'output', text: '  stats      - Stream telemetry & production metrics' },
          { type: 'output', text: '  clear      - Flush current terminal buffer' },
          { type: 'output', text: '  date       - Output system timestamp' },
          { type: 'output', text: '  sudo       - Elevate privileges' }
        );
        break;

      case 'about':
        sound.playBlip(600);
        newHistory.push(
          { type: 'success', text: `Role: ${PORTFOLIO_DATA.personal.role}` },
          { type: 'output', text: PORTFOLIO_DATA.personal.bio }
        );
        break;

      case 'skills':
        sound.playBlip(650);
        PORTFOLIO_DATA.skillCategories.forEach((cat) => {
          newHistory.push({ type: 'system', text: `[${cat.category}]` });
          const skillNames = cat.skills.map((s) => `${s.name} (${s.level}%)`).join(', ');
          newHistory.push({ type: 'output', text: `  ${skillNames}` });
        });
        break;

      case 'projects':
        sound.playBlip(640);
        PORTFOLIO_DATA.projects.forEach((p) => {
          newHistory.push(
            { type: 'success', text: `★ ${p.title}` },
            { type: 'output', text: `   ${p.description}` },
            { type: 'output', text: `   Stack: ${p.tags.join(' • ')}` }
          );
        });
        break;

      case 'contact':
        sound.playSuccess();
        newHistory.push(
          { type: 'success', text: 'Direct Communications:' },
          { type: 'output', text: `  Email:    ${PORTFOLIO_DATA.personal.socials.email}` },
          { type: 'output', text: `  GitHub:   ${PORTFOLIO_DATA.personal.socials.github}` },
          { type: 'output', text: `  LinkedIn: ${PORTFOLIO_DATA.personal.socials.linkedin}` }
        );
        break;

      case 'stats':
        sound.playBlip(700);
        PORTFOLIO_DATA.personal.stats.forEach((s) => {
          newHistory.push({ type: 'output', text: `  ${s.label.padEnd(22)}: ${s.value}` });
        });
        break;

      case 'clear':
        setHistory([]);
        setInput('');
        return;

      case 'date':
        newHistory.push({ type: 'output', text: new Date().toUTCString() });
        break;

      case 'sudo':
        sound.playBlip(320);
        newHistory.push({
          type: 'error',
          text: 'Guest access denied: User "visitor" is not in the sudoers file. Incident reported to Mohan.',
        });
        break;

      default:
        sound.playBlip(300);
        newHistory.push({
          type: 'error',
          text: `Command not found: "${cmd}". Type "help" to view allowed commands.`,
        });
    }

    setHistory(newHistory);
    setInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleCommand(input);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const nextIdx = historyIdx === -1 ? commandHistory.length - 1 : Math.max(0, historyIdx - 1);
        setHistoryIdx(nextIdx);
        setInput(commandHistory[nextIdx]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIdx !== -1) {
        const nextIdx = historyIdx + 1;
        if (nextIdx < commandHistory.length) {
          setHistoryIdx(nextIdx);
          setInput(commandHistory[nextIdx]);
        } else {
          setHistoryIdx(-1);
          setInput('');
        }
      }
    } else {
      sound.playKeyStroke();
    }
  };

  return (
    <section id="terminal" className="relative py-24 px-4 sm:px-8 md:px-16 z-10">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 text-cyan-400 font-mono text-xs uppercase tracking-widest mb-2">
            <Terminal size={14} /> Interactive CLI
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Developer <span className="text-gradient-cyan">Console</span>.
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-2 font-light">
            Direct interface to query system capabilities, projects, and architecture details.
          </p>
        </div>

        {/* Terminal Window Frame */}
        <div className="rounded-2xl glass-panel border border-cyan-500/30 shadow-glow-cyan overflow-hidden bg-slate-950/90 font-mono text-xs sm:text-sm">
          {/* Title Bar */}
          <div className="flex items-center justify-between px-4 py-3 bg-slate-900/80 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-red-500 inline-block" />
              <span className="h-3 w-3 rounded-full bg-yellow-500 inline-block" />
              <span className="h-3 w-3 rounded-full bg-green-500 inline-block" />
              <span className="text-xs text-slate-400 font-mono ml-2">guest@mohan-dev: ~ (bash)</span>
            </div>
            <div className="text-[11px] text-cyan-400/80 flex items-center gap-1">
              <Sparkles size={12} /> WebGL Interactive
            </div>
          </div>

          {/* Quick command buttons */}
          <div className="flex flex-wrap gap-2 px-4 py-2.5 bg-slate-900/40 border-b border-slate-800/80 text-[11px]">
            <span className="text-slate-500 self-center">Quick inputs:</span>
            {['help', 'about', 'skills', 'projects', 'stats', 'contact'].map((cmd) => (
              <button
                key={cmd}
                onClick={() => handleCommand(cmd)}
                className="px-2.5 py-0.5 rounded bg-slate-800/80 hover:bg-cyan-500 hover:text-slate-950 text-slate-300 transition-colors"
              >
                {cmd}
              </button>
            ))}
          </div>

          {/* Output log */}
          <div
            onClick={() => inputRef.current?.focus()}
            className="p-4 sm:p-6 min-h-[300px] max-h-[420px] overflow-y-auto space-y-2 cursor-text"
          >
            {history.map((line, idx) => (
              <div key={idx} className="leading-relaxed">
                {line.type === 'input' && (
                  <span className="text-cyan-400 font-bold">{line.text}</span>
                )}
                {line.type === 'system' && (
                  <span className="text-purple-400">{line.text}</span>
                )}
                {line.type === 'success' && (
                  <span className="text-emerald-400 font-semibold">{line.text}</span>
                )}
                {line.type === 'error' && (
                  <span className="text-rose-400">{line.text}</span>
                )}
                {line.type === 'output' && (
                  <span className="text-slate-300">{line.text}</span>
                )}
              </div>
            ))}
            <div ref={bottomRef} />
          </div>

          {/* Input Prompt Row */}
          <div className="flex items-center gap-2 px-4 py-3 bg-slate-900/80 border-t border-slate-800">
            <span className="text-cyan-400 font-bold">$</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="type 'help', 'skills', or 'projects'..."
              className="w-full bg-transparent text-white focus:outline-none placeholder:text-slate-600 font-mono text-xs sm:text-sm"
            />
            <button
              onClick={() => handleCommand(input)}
              className="text-slate-500 hover:text-cyan-400 p-1"
            >
              <CornerDownLeft size={14} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
