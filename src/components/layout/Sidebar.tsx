import React from 'react';
import { 
  LayoutDashboard, 
  Globe, 
  KeyRound, 
  Layers, 
  ChevronRight,
  Cpu 
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { AppModule } from '../../types';

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

interface NavItem {
  id: AppModule;
  label: string;
  icon: React.ElementType;
  section: 'Overview' | 'Hardware Lab' | 'Cybersecurity Suite';
  badge?: string;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, setIsOpen }) => {
  const { activeModule, setActiveModule, getOverallStats, language } = useApp();
  const stats = getOverallStats();

  const navItems: NavItem[] = [
    { id: 'dashboard', label: language === 'gu' ? 'મુખ્ય ડેશબોર્ડ' : 'Main Dashboard', icon: LayoutDashboard, section: 'Overview' },
    
    // Hardware Lab
    { 
      id: 'hardware-learning', 
      label: language === 'gu' ? 'કમ્પ્યુટર હાર્ડવેર' : 'Computer Hardware', 
      icon: Cpu, 
      section: 'Hardware Lab', 
      badge: language === 'gu' ? '10 સાધનો' : '10 Devices' 
    },

    // Cybersecurity Suite
    { id: 'url-inspector', label: language === 'gu' ? 'URL અને વેબ સુરક્ષા' : 'URL & Web Safety', icon: Globe, section: 'Cybersecurity Suite', badge: 'Heuristic' },
    { id: 'password-checker', label: language === 'gu' ? 'પાસવર્ડ એનાલાઇઝર' : 'Password Analyzer', icon: KeyRound, section: 'Cybersecurity Suite', badge: 'Entropy' }
  ];

  const handleSelect = (id: AppModule) => {
    setActiveModule(id);
    if (window.innerWidth < 1024) {
      setIsOpen(false);
    }
  };

  const sections: ('Overview' | 'Hardware Lab' | 'Cybersecurity Suite')[] = [
    'Overview',
    'Hardware Lab',
    'Cybersecurity Suite'
  ];

  const overallProgress = Math.min(
    100,
    Math.round(Math.min(100, (stats.urlInspections + stats.passwordAudits) * 10))
  );

  return (
    <>
      {/* Backdrop for mobile */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm lg:hidden transition-opacity"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-16 bottom-0 left-0 z-40 w-72 bg-slate-950 border-r border-slate-800 transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } flex flex-col justify-between overflow-y-auto`}
      >
        <div className="p-4 space-y-6">
          {sections.map((section) => (
            <div key={section} className="space-y-1.5">
              <div className="flex items-center gap-1.5 px-3 text-[11px] font-mono tracking-wider text-slate-500 uppercase font-semibold">
                <Layers className="w-3 h-3 text-cyan-600" />
                <span>{section}</span>
              </div>

              <div className="space-y-1">
                {navItems
                  .filter((item) => item.section === section)
                  .map((item) => {
                    const Icon = item.icon;
                    const isActive = activeModule === item.id;

                    return (
                      <button
                        key={item.id}
                        onClick={() => handleSelect(item.id)}
                        className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-all group ${
                          isActive
                            ? 'bg-gradient-to-r from-cyan-950/80 to-blue-950/60 text-cyan-300 border border-cyan-500/40 shadow-[0_0_12px_rgba(6,182,212,0.15)]'
                            : 'text-slate-400 hover:text-slate-100 hover:bg-slate-900 border border-transparent'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <Icon
                            className={`w-4 h-4 transition-colors ${
                              isActive ? 'text-cyan-400' : 'text-slate-500 group-hover:text-slate-300'
                            }`}
                          />
                          <span>{item.label}</span>
                        </div>

                        <div className="flex items-center gap-1.5">
                          {item.badge && (
                            <span
                              className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${
                                isActive
                                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                                  : 'bg-slate-800 text-slate-400'
                              }`}
                            >
                              {item.badge}
                            </span>
                          )}
                          <ChevronRight
                            className={`w-3.5 h-3.5 transition-transform ${
                              isActive ? 'text-cyan-400 translate-x-0.5' : 'text-transparent group-hover:text-slate-600'
                            }`}
                          />
                        </div>
                      </button>
                    );
                  })}
              </div>
            </div>
          ))}
        </div>

        {/* Sidebar Footer with Lab Status & Progress */}
        <div className="p-4 border-t border-slate-900 bg-slate-950/80 space-y-3">
          <div className="p-3 rounded-lg bg-slate-900/90 border border-slate-800/80 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400 font-medium">Session Security Audit</span>
              <span className="font-mono text-cyan-400 font-bold">
                {overallProgress}%
              </span>
            </div>
            <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-gradient-to-r from-cyan-500 to-blue-500 h-full rounded-full transition-all duration-500"
                style={{ width: `${overallProgress}%` }}
              />
            </div>
            <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 pt-1">
              <span>Audits Completed:</span>
              <span className="text-cyan-400 font-bold">{stats.urlInspections + stats.passwordAudits}</span>
            </div>
          </div>

          <div className="text-[10px] text-center font-mono text-slate-600">
            IANT Exhibition Edition • 2026
          </div>
        </div>
      </aside>
    </>
  );
};
