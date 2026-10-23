import React from 'react';
import { 
  ShieldCheck, 
  Sun, 
  Moon, 
  Menu, 
  X, 
  TerminalSquare,
  Globe 
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface NavbarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ sidebarOpen, setSidebarOpen }) => {
  const { 
    theme, 
    toggleTheme, 
    setActiveModule,
    getOverallStats,
    language,
    toggleLanguage
  } = useApp();

  const stats = getOverallStats();

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800 bg-slate-950/90 backdrop-blur-md">
      <div className="flex h-16 items-center justify-between px-4 sm:px-6">
        {/* Left: Mobile hamburger + Brand */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden p-2 text-slate-400 hover:text-slate-100 hover:bg-slate-800/60 rounded-lg transition-colors"
            aria-label="Toggle navigation"
          >
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <button 
            onClick={() => setActiveModule('dashboard')}
            className="flex items-center gap-3 text-left group"
          >
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-600/20 border border-cyan-500/40 text-cyan-400 group-hover:border-cyan-400 group-hover:shadow-[0_0_15px_rgba(6,182,212,0.3)] transition-all">
              <ShieldCheck className="w-6 h-6 text-cyan-400" />
              <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-500"></span>
              </span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-base sm:text-lg tracking-tight text-white group-hover:text-cyan-300 transition-colors">
                  Cyber Security <span className="text-cyan-400">& Hardware TroubleShooting</span>
                </span>
                <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-mono font-medium px-2 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-700/50 text-cyan-300">
                  <TerminalSquare className="w-3 h-3" /> v2.6
                </span>
              </div>
              <p className="hidden md:block text-[11px] text-slate-400 truncate max-w-sm">
                Smart Cyber Security Awareness & Hardware Troubleshooting System
              </p>
            </div>
          </button>
        </div>

        {/* Center / Right status badge & actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Quick Stat Pill */}
          <div className="hidden md:flex items-center gap-2 text-xs font-mono px-3 py-1.5 rounded-lg bg-slate-900/90 border border-slate-800">
            <span className="text-slate-400">URL Audits:</span>
            <span className="text-cyan-400 font-bold">{stats.urlInspections}</span>
            <span className="text-slate-600">|</span>
            <span className="text-slate-400">Passphrases:</span>
            <span className="text-emerald-400 font-bold">{stats.passwordAudits}</span>
          </div>

          {/* Language Selector: English | ગુજરાતી */}
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-xs font-semibold border border-slate-700/80 transition-all text-slate-200 hover:text-white"
            title={language === 'gu' ? 'Switch to English' : 'ગુજરાતીમાં જુઓ'}
            aria-label="Toggle language"
          >
            <Globe className="w-3.5 h-3.5 text-cyan-400" />
            <span className={language === 'en' ? 'text-cyan-400 font-bold' : 'text-slate-400'}>EN</span>
            <span className="text-slate-600 font-normal">|</span>
            <span className={language === 'gu' ? 'text-cyan-400 font-bold' : 'text-slate-400'}>ગુજરાતી</span>
          </button>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-slate-800/80 transition-colors border border-slate-800"
            title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} mode`}
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-cyan-400" />}
          </button>
        </div>
      </div>
    </header>
  );
};
