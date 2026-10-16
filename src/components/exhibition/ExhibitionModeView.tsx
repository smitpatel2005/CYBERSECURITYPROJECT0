import React, { useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Presentation, 
  X, 
  ChevronRight, 
  ChevronLeft, 
  ShieldCheck, 
  Globe, 
  KeyRound, 
  ExternalLink,
  Cpu 
} from 'lucide-react';

export const ExhibitionModeView: React.FC = () => {
  const { 
    exhibitionStep, 
    setExhibitionStep, 
    nextExhibitionStep, 
    prevExhibitionStep, 
    exitExhibition, 
    setActiveModule,
    presenterInfo,
    getOverallStats 
  } = useApp();

  const stats = getOverallStats();

  // Keyboard navigation: Arrow keys & Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'Space') {
        nextExhibitionStep();
      } else if (e.key === 'ArrowLeft') {
        prevExhibitionStep();
      } else if (e.key === 'Escape') {
        exitExhibition();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextExhibitionStep, prevExhibitionStep, exitExhibition]);

  const steps = [
    {
      stepNumber: 1,
      title: 'Project Overview & Technical Vision',
      subtitle: 'CyberShield: Smart Cyber Security Awareness & Digital Defense System',
      badge: 'Introduction',
      icon: ShieldCheck,
      content: (
        <div className="space-y-6 text-slate-300">
          <p className="text-base sm:text-lg leading-relaxed text-slate-200">
            Welcome to the <strong>CyberShield</strong> live exhibition showcase at the <strong>IANT Anniversary</strong>. This system is a fully functional, browser-native cybersecurity platform delivering empirical heuristic analysis, entropy auditing, and defensive systems engineering.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl bg-slate-900 border border-cyan-500/30 space-y-2">
              <span className="text-xs font-mono text-cyan-400 uppercase font-semibold">Track 1: Web Safety Heuristics</span>
              <p className="text-sm text-slate-300">
                Rule-based heuristic URL analysis, typosquatting & homoglyph detection, raw IP identification, and deep subdomain risk evaluation.
              </p>
            </div>
            <div className="p-5 rounded-2xl bg-slate-900 border border-blue-500/30 space-y-2">
              <span className="text-xs font-mono text-blue-400 uppercase font-semibold">Track 2: Authentication & Password Entropy</span>
              <p className="text-sm text-slate-300">
                Mathematical password entropy evaluation, dictionary walk detection, crack resistance times, and multi-word Diceware passphrase generation.
              </p>
            </div>
          </div>
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-slate-400">
            <span>Presenter: <strong className="text-white">{presenterInfo.name}</strong></span>
            <span>ID: <strong className="text-cyan-400">{presenterInfo.rollNo}</strong></span>
            <span>Institution: <strong className="text-slate-300">{presenterInfo.institution}</strong></span>
          </div>
        </div>
      ),
      jumpModule: 'dashboard' as const
    },
    {
      stepNumber: 2,
      title: 'Website Safety & URL Heuristic Inspection',
      subtitle: 'Rule-Based Domain Analysis & Phishing URL Triage',
      badge: 'Web Security',
      icon: Globe,
      content: (
        <div className="space-y-6 text-slate-300">
          <p className="text-base sm:text-lg leading-relaxed text-slate-200">
            Over 80% of modern phishing domains use valid SSL/TLS certificates. Technical judges can inspect how our heuristic engine dissects URL strings locally without making dangerous external HTTP calls.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-mono">
            <div className="p-4 rounded-xl bg-slate-900 border border-red-500/30 space-y-1">
              <strong className="text-red-400 block uppercase">1. Typosquatting Heuristics</strong>
              <p className="text-slate-400">Flags character swaps, repeated consonants (e.g. <code>bankk.com</code>), and numeric homoglyphs (e.g. <code>paypa1.com</code>).</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-900 border border-amber-500/30 space-y-1">
              <strong className="text-amber-400 block uppercase">2. Raw IP Addresses</strong>
              <p className="text-slate-400">Detects direct IP hosts (e.g. <code>http://192.168.1.1/login</code>) bypassing domain registration scrutiny.</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-900 border border-cyan-500/30 space-y-1">
              <strong className="text-cyan-400 block uppercase">3. Subdomain Stacking</strong>
              <p className="text-slate-400">Exposes deep subdomain hierarchies designed to deceive mobile users where only the leftmost prefix is visible.</p>
            </div>
          </div>
          <p className="text-xs text-slate-400">
            Click "Jump to Module" below to test custom URLs against the heuristic engine with real-time risk scoring.
          </p>
        </div>
      ),
      jumpModule: 'url-inspector' as const
    },
    {
      stepNumber: 3,
      title: 'Password Entropy & Passphrase Resistance',
      subtitle: 'Why 4 Random Words Beat Short Complex Passwords',
      badge: 'Authentication',
      icon: KeyRound,
      content: (
        <div className="space-y-6 text-slate-300">
          <p className="text-base sm:text-lg leading-relaxed text-slate-200">
            Demonstrating mathematical password entropy evaluated 100% locally in browser memory without sending keystrokes across any network socket.
          </p>
          <div className="p-5 rounded-2xl bg-slate-900 border border-cyan-500/30 space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
              <div className="p-4 rounded-xl bg-red-950/30 border border-red-500/40 space-y-1">
                <span className="text-red-300 font-bold">Standard Password: "P@ssw0rd123"</span>
                <p className="text-slate-400">Entropy: ~32 bits. Cracked in seconds via GPU dictionary and leetspeak mask attacks.</p>
              </div>
              <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-500/40 space-y-1">
                <span className="text-emerald-300 font-bold">Passphrase: "correct-horse-battery-staple"</span>
                <p className="text-slate-400">Entropy: &gt;77 bits. Memorable to humans, mathematically impossible to brute-force for centuries.</p>
              </div>
            </div>
          </div>
          <p className="text-xs text-slate-400">
            Includes real-time character diversity checks, common pattern matching, and a built-in cryptographic Diceware passphrase generator using <code>crypto.getRandomValues</code>.
          </p>
        </div>
      ),
      jumpModule: 'password-checker' as const
    },
    {
      stepNumber: 4,
      title: 'Computer Hardware Architecture & Learning Lab',
      subtitle: '10 Essential Devices, Bilingual Gujarati/English Support & System Flow',
      badge: 'Hardware Education',
      icon: Cpu,
      content: (
        <div className="space-y-6 text-slate-300">
          <p className="text-base sm:text-lg leading-relaxed text-slate-200">
            A comprehensive, beginner-friendly learning module covering all 10 core computer hardware components with instant toggle between English and natural Gujarati (ગુજરાતી).
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono">
            <div className="p-4 rounded-xl bg-slate-900 border border-cyan-500/30 space-y-1">
              <strong className="text-cyan-400 block uppercase">1. 10 Hardware Devices</strong>
              <p className="text-slate-400">RAM, HDD, SSD, Motherboard, SMPS, CPU (Processor), Monitor, Mouse, Keyboard, and Cabinet with full specs and real-life analogies.</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-900 border border-blue-500/30 space-y-1">
              <strong className="text-blue-400 block uppercase">2. CPU / Processor Core</strong>
              <p className="text-slate-400">Combines instruction execution and silicon microarchitecture, explaining cores, clock speeds, and Intel/AMD Ryzen/ARM architectures.</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-900 border border-emerald-500/30 space-y-1">
              <strong className="text-emerald-400 block uppercase">3. Flow & Mastery Quiz</strong>
              <p className="text-slate-400">6-stage interactive system cooperation simulator showing data flow from mouse click to screen display, plus a 5-question mastery quiz.</p>
            </div>
          </div>
          <p className="text-xs text-slate-400">
            Click "Jump to Module" below to explore all 10 components and toggle language in real-time.
          </p>
        </div>
      ),
      jumpModule: 'hardware-learning' as const
    }
  ];

  const currentStep = steps[exhibitionStep] || steps[0];
  const StepIcon = currentStep.icon;

  return (
    <div className="fixed inset-0 z-50 bg-[#050811] text-white flex flex-col justify-between overflow-y-auto">
      {/* Top Bar */}
      <div className="p-6 border-b border-slate-800 bg-slate-950/80 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-cyan-600/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
            <Presentation className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold">CyberShield Exhibition Mode</h2>
            <span className="text-xs font-mono text-cyan-400">
              Slide {exhibitionStep + 1} of {steps.length} • Use Arrow Keys or Space to Navigate
            </span>
          </div>
        </div>

        <button
          onClick={exitExhibition}
          className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-white transition-colors"
          title="Exit Exhibition (Esc)"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Main Slide Content */}
      <div className="flex-1 max-w-4xl w-full mx-auto p-6 sm:p-10 flex flex-col justify-center">
        <div className="space-y-6 animate-fadeIn">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-cyan-950/80 border border-cyan-500/40 flex items-center justify-center text-cyan-400 shadow-lg">
                <StepIcon className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest block font-semibold">
                  {currentStep.badge}
                </span>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  {currentStep.title}
                </h1>
              </div>
            </div>

            <button
              onClick={() => {
                exitExhibition();
                setActiveModule(currentStep.jumpModule);
              }}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-cyan-500/40 text-cyan-300 text-xs font-mono transition-colors shrink-0"
            >
              <span>Jump to Module</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>

          <h3 className="text-sm sm:text-base text-slate-400 font-medium">
            {currentStep.subtitle}
          </h3>

          <div className="pt-2">
            {currentStep.content}
          </div>
        </div>
      </div>

      {/* Bottom Navigation Strip */}
      <div className="p-6 border-t border-slate-800 bg-slate-950/80 flex items-center justify-between">
        <button
          disabled={exhibitionStep === 0}
          onClick={prevExhibitionStep}
          className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 disabled:opacity-30 border border-slate-800 text-xs font-semibold flex items-center gap-2 transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Previous Slide</span>
        </button>

        {/* Step dots */}
        <div className="flex items-center gap-2">
          {steps.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setExhibitionStep(idx)}
              className={`w-2.5 h-2.5 rounded-full transition-all ${
                idx === exhibitionStep
                  ? 'bg-cyan-400 w-8'
                  : 'bg-slate-700 hover:bg-slate-500'
              }`}
              title={`Slide ${idx + 1}`}
            />
          ))}
        </div>

        <button
          disabled={exhibitionStep === steps.length - 1}
          onClick={nextExhibitionStep}
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 disabled:opacity-30 text-white text-xs font-semibold flex items-center gap-2 shadow-lg shadow-cyan-950/40 transition-all"
        >
          <span>Next Slide</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
