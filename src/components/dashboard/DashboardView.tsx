import React from 'react';
import { useApp } from '../../context/AppContext';
import { AppModule } from '../../types';
import { 
  KeyRound, 
  Sparkles, 
  ChevronRight, 
  Globe,
  Cpu 
} from 'lucide-react';

export const DashboardView: React.FC = () => {
  const { 
    setActiveModule, 
    getOverallStats,
    language
  } = useApp();

  const stats = getOverallStats();

  const moduleCards: {
    id: AppModule;
    title: string;
    description: string;
    icon: React.ElementType;
    badge: string;
    gradient: string;
    statValue: string;
  }[] = [
    {
      id: 'hardware-learning',
      title: language === 'gu' ? 'કમ્પ્યુટર હાર્ડવેર લર્નિંગ લેબ' : 'Computer Hardware Learning Lab',
      description: language === 'gu'
        ? 'કમ્પ્યુટરના 10 મુખ્ય હાર્ડવેર સાધનો (RAM, SSD, HDD, CPU, SMPS, મોનિટર...) ની વિગતવાર સમજણ, સિસ્ટમ ફ્લો અને નોલેજ ક્વિઝ.'
        : 'Explore 10 foundational PC hardware components (RAM, SSD, HDD, CPU, SMPS, Motherboard, etc.) with real-world analogies, system flow simulator, and mastery quiz.',
      icon: Cpu,
      badge: language === 'gu' ? '10 સાધનો' : '10 Devices',
      gradient: 'from-cyan-600/20 to-teal-600/20',
      statValue: language === 'gu' ? 'દ્વિભાષી લેબ (EN/GU)' : 'Bilingual Lab (EN/GU)'
    },
    {
      id: 'url-inspector',
      title: language === 'gu' ? 'વેબસાઇટ સેફ્ટી અને URL ઇન્સ્પેક્ટર' : 'Website Safety & URL Inspector',
      description: language === 'gu'
        ? 'HTTPS સુરક્ષા, સ્પેલિંગ મિસ્ટેક (ટાઇપોસ્ક્વોટિંગ) અને શંકાસ્પદ ડોમેઇનની એજ્યુકેશનલ ચકાસણી.'
        : 'Rule-based educational heuristic analyzer evaluating HTTPS encryption, brand typosquatting, raw IP hosts, and misleading subdomain hierarchies.',
      icon: Globe,
      badge: `${stats.urlInspections} Audits`,
      gradient: 'from-blue-600/20 to-indigo-600/20',
      statValue: 'Heuristic Rule Engine'
    },
    {
      id: 'password-checker',
      title: language === 'gu' ? 'પાસવર્ડ સ્ટ્રેન્થ અને એન્ટ્રોપી એનાલાઇઝર' : 'Password Strength Analyzer',
      description: language === 'gu'
        ? 'પાસવર્ડની મજબૂતાઈ, ક્રેક થવાનો અંદાજિત સમય અને અતિ-સુરક્ષિત Diceware પાસફ્રેઝ જનરેટર.'
        : 'Real-time client-side entropy evaluation, dictionary pattern detection, crack-time estimates, and multi-word Diceware passphrase generator.',
      icon: KeyRound,
      badge: `${stats.passwordAudits} Tests`,
      gradient: 'from-amber-600/20 to-orange-600/20',
      statValue: 'Entropy + Diceware'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Hero Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 border border-slate-800 p-6 sm:p-10 shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 text-xs font-mono font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>IANT Anniversary Live Project Exhibition 2026</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
            CyberShield <span className="text-cyan-400">Security Suite</span>
          </h1>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Smart Cyber Security Awareness & Digital Defense System. Built for live technical exhibition, providing 100% genuine client-side entropy evaluation, heuristic domain parsing, and defensive system hardening baselines.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => setActiveModule('hardware-learning')}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-600 to-teal-600 hover:from-cyan-500 hover:to-teal-500 text-white font-semibold text-xs sm:text-sm flex items-center gap-2 shadow-xl shadow-cyan-950/50 transition-all border border-cyan-400/30"
            >
              <Cpu className="w-4 h-4 text-cyan-200" />
              <span>{language === 'gu' ? 'કમ્પ્યુટર હાર્ડવેર લેબ' : 'Computer Hardware Lab'}</span>
            </button>

            <button
              onClick={() => setActiveModule('url-inspector')}
              className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 font-semibold text-xs sm:text-sm border border-slate-800 transition-colors flex items-center gap-2"
            >
              <Globe className="w-4 h-4 text-cyan-400" />
              <span>{language === 'gu' ? 'વેબ સેફ્ટી ચેક' : 'Inspect Web Safety'}</span>
            </button>

            <button
              onClick={() => setActiveModule('password-checker')}
              className="px-5 py-2.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-300 font-semibold text-xs sm:text-sm border border-slate-800 transition-colors flex items-center gap-2"
            >
              <KeyRound className="w-4 h-4 text-amber-400" />
              <span>{language === 'gu' ? 'પાસવર્ડ એનાલાઇઝર' : 'Password Analyzer'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Real State Metrics Ribbon */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-lg space-y-1">
          <span className="text-[11px] font-mono text-slate-400 uppercase font-semibold">URL Safety Audits</span>
          <div className="text-2xl font-mono font-bold text-white flex items-center gap-2">
            <span>{stats.urlInspections}</span>
            <span className="text-xs text-slate-500">analyzed</span>
          </div>
          <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden mt-2">
            <div
              className="bg-cyan-500 h-full rounded-full transition-all"
              style={{ width: `${Math.min(100, stats.urlInspections * 20)}%` }}
            />
          </div>
        </div>

        <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-lg space-y-1">
          <span className="text-[11px] font-mono text-slate-400 uppercase font-semibold">Password Audits</span>
          <div className="text-2xl font-mono font-bold text-white flex items-center gap-2">
            <span>{stats.passwordAudits}</span>
            <span className="text-xs text-slate-500">tested</span>
          </div>
          <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden mt-2">
            <div
              className="bg-amber-500 h-full rounded-full transition-all"
              style={{ width: `${Math.min(100, stats.passwordAudits * 25)}%` }}
            />
          </div>
        </div>

        <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-lg space-y-1">
          <span className="text-[11px] font-mono text-slate-400 uppercase font-semibold">Heuristic Engine</span>
          <div className="text-2xl font-mono font-bold text-white flex items-center gap-2">
            <span className="text-blue-400">5 Rules</span>
            <span className="text-xs text-slate-500">active</span>
          </div>
          <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden mt-2">
            <div className="bg-blue-500 h-full rounded-full w-full" />
          </div>
        </div>

        <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-lg space-y-1">
          <span className="text-[11px] font-mono text-slate-400 uppercase font-semibold">Passphrase Studio</span>
          <div className="text-2xl font-mono font-bold text-white flex items-center gap-2">
            <span className="text-emerald-400">Diceware</span>
            <span className="text-xs text-slate-500">CSPRNG</span>
          </div>
          <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden mt-2">
            <div className="bg-emerald-500 h-full rounded-full w-full" />
          </div>
        </div>
      </div>

      {/* Core Navigation Cards Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse"></span>
            {language === 'gu' ? 'કાર્યરત હાર્ડવેર અને સાયબર સુરક્ષા મોડ્યુલ્સ' : 'Operational Hardware & Cybersecurity Modules'}
          </h3>
          <span className="text-xs text-slate-400 font-mono">
            {language === 'gu' ? '3 સક્રિય મોડ્યુલ્સ' : '3 Active Modules'}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {moduleCards.map((card) => {
            const Icon = card.icon;

            return (
              <div
                key={card.id}
                onClick={() => setActiveModule(card.id)}
                className="group relative bg-slate-900/90 hover:bg-slate-900 border border-slate-800 hover:border-cyan-500/50 rounded-2xl p-6 cursor-pointer transition-all hover:shadow-[0_4px_25px_rgba(6,182,212,0.15)] flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${card.gradient} border border-slate-700/80 flex items-center justify-center text-cyan-400 group-hover:border-cyan-400 group-hover:shadow-[0_0_12px_rgba(6,182,212,0.3)] transition-all`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-full bg-slate-800/80 text-cyan-300 border border-slate-700">
                      {card.badge}
                    </span>
                  </div>

                  <h4 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {card.title}
                  </h4>

                  <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed">
                    {card.description}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
                  <span className="font-mono text-[11px] text-slate-500 truncate max-w-[140px]">{card.statValue}</span>
                  <span className="text-cyan-400 font-medium flex items-center gap-1 group-hover:translate-x-1 transition-transform shrink-0">
                    <span>Open</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
