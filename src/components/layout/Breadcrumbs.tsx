import React from 'react';
import { ChevronRight, Home } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { AppModule } from '../../types';

const MODULE_NAMES: Record<AppModule, { en: string; gu: string }> = {
  'dashboard': { en: 'Overview Dashboard', gu: 'મુખ્ય ડેશબોર્ડ' },
  'hardware-learning': { en: 'Computer Hardware Learning Lab', gu: 'કમ્પ્યુટર હાર્ડવેર લર્નિંગ લેબ' },
  'url-inspector': { en: 'Website Safety & URL Inspector', gu: 'વેબસાઇટ સેફ્ટી અને URL ઇન્સ્પેક્ટર' },
  'password-checker': { en: 'Password Strength & Entropy Analyzer', gu: 'પાસવર્ડ સ્ટ્રેન્થ અને એન્ટ્રોપી એનાલાઇઝર' },
  'message-detector': { en: 'SMS & Message Fraud Detector', gu: 'SMS અને મેસેજ ફ્રોડ ડિટેક્ટર' }
};

export const Breadcrumbs: React.FC = () => {
  const { activeModule, setActiveModule, language } = useApp();

  return (
    <nav className="flex items-center space-x-2 text-xs text-slate-400 py-2.5 px-4 bg-slate-900/60 border-b border-slate-800/80 backdrop-blur-sm">
      <button
        onClick={() => setActiveModule('dashboard')}
        className="flex items-center gap-1.5 hover:text-cyan-400 transition-colors"
      >
        <Home className="w-3.5 h-3.5 text-cyan-500" />
        <span>CyberShield</span>
      </button>

      {activeModule !== 'dashboard' && (
        <>
          <ChevronRight className="w-3 h-3 text-slate-600" />
          <span className="text-cyan-300 font-medium">
            {MODULE_NAMES[activeModule]?.[language] || activeModule}
          </span>
        </>
      )}
    </nav>
  );
};
