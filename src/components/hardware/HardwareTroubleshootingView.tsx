import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  TroubleshootingCategory, 
  TroubleshootingIssue 
} from '../../types';
import { 
  TROUBLESHOOTING_ISSUES, 
  BEEP_CODE_GUIDE 
} from '../../data/troubleshootingData';
import { 
  Wrench, 
  Search, 
  AlertTriangle, 
  CheckCircle2, 
  Cpu, 
  HardDrive, 
  Monitor, 
  Zap, 
  Volume2, 
  ShieldAlert, 
  RotateCcw, 
  ChevronDown, 
  ChevronUp, 
  Info, 
  Sparkles,
  Layers,
  ThermometerSnowflake,
  Usb,
  Wifi,
  ExternalLink
} from 'lucide-react';

export const HardwareTroubleshootingView: React.FC = () => {
  const { language, setActiveModule } = useApp();
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<TroubleshootingCategory>('all');
  const [expandedIssueId, setExpandedIssueId] = useState<string | null>(TROUBLESHOOTING_ISSUES[0].id);
  const [showBeepGuide, setShowBeepGuide] = useState<boolean>(false);

  const categories: { id: TroubleshootingCategory; label: { en: string; gu: string }; icon: React.ElementType }[] = [
    { id: 'all', label: { en: 'All Problems', gu: 'બધી સમસ્યાઓ' }, icon: Layers },
    { id: 'display', label: { en: 'Display & GPU', gu: 'ડિસ્પ્લે & GPU' }, icon: Monitor },
    { id: 'power', label: { en: 'Power & SMPS', gu: 'પાવર & SMPS' }, icon: Zap },
    { id: 'ram', label: { en: 'RAM & Beeps', gu: 'RAM & બીપ કોડ' }, icon: Volume2 },
    { id: 'storage', label: { en: 'SSD & Hard Disk', gu: 'SSD & હાર્ડ ડિસ્ક' }, icon: HardDrive },
    { id: 'cpu', label: { en: 'CPU & Overheating', gu: 'CPU & હીટિંગ' }, icon: ThermometerSnowflake },
    { id: 'peripherals', label: { en: 'USB & Ports', gu: 'USB & પોર્ટ્સ' }, icon: Usb },
    { id: 'network', label: { en: 'Network & LAN', gu: 'નેટવર્ક & LAN' }, icon: Wifi },
  ];

  const filteredIssues = useMemo(() => {
    return TROUBLESHOOTING_ISSUES.filter((issue) => {
      const matchesCategory = selectedCategory === 'all' || issue.category === selectedCategory;
      const query = searchQuery.toLowerCase().trim();
      if (!query) return matchesCategory;

      const titleEn = issue.title.en.toLowerCase();
      const titleGu = issue.title.gu.toLowerCase();
      const symptomEn = issue.symptom.en.toLowerCase();
      const symptomGu = issue.symptom.gu.toLowerCase();
      const component = issue.component.toLowerCase();

      const matchesSearch = 
        titleEn.includes(query) || 
        titleGu.includes(query) || 
        symptomEn.includes(query) || 
        symptomGu.includes(query) || 
        component.includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const toggleExpand = (id: string) => {
    setExpandedIssueId(expandedIssueId === id ? null : id);
  };

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case 'critical':
        return {
          bg: 'bg-red-950/80 text-red-300 border-red-500/40',
          label: language === 'gu' ? 'ગંભીર (Critical)' : 'Critical Fault'
        };
      case 'high':
        return {
          bg: 'bg-amber-950/80 text-amber-300 border-amber-500/40',
          label: language === 'gu' ? 'મધ્યમ-ઉચ્ચ (High)' : 'High Priority'
        };
      case 'medium':
        return {
          bg: 'bg-blue-950/80 text-blue-300 border-blue-500/40',
          label: language === 'gu' ? 'સામાન્ય (Medium)' : 'Medium'
        };
      default:
        return {
          bg: 'bg-slate-800 text-slate-300 border-slate-700',
          label: language === 'gu' ? 'સરળ (Low)' : 'Low'
        };
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner Header */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 border border-slate-800 p-6 sm:p-8 shadow-xl">
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-950/80 border border-amber-500/40 text-amber-300 text-xs font-mono font-semibold">
              <Wrench className="w-3.5 h-3.5 text-amber-400" />
              <span>
                {language === 'gu' ? 'કમ્પ્યુટર હાર્ડવેર ફોલ્ટ ડાયગ્નોસ્ટિક લેબ' : 'PC Hardware Fault Diagnostics Lab'}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
              <span className="text-amber-400">Hardware</span> Troubleshooting
            </h1>

            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              {language === 'gu'
                ? 'કમ્પ્યુટર અને તેના પાર્ટ્સમાં આવતી સમસ્યાઓ (જેમ કે No Display, No Power, Beep Sound, RAM/GPU ખામી, હીટિંગ) નું સ્ટેપ-બાય-સ્ટેપ નિદાન અને રિપેરિંગ માર્ગદર્શિકા.'
                : 'Interactive step-by-step diagnostic guide for physical PC hardware failures: No Display, Dead Power Supply, RAM Beep Codes, Overheating, and component replacements.'}
            </p>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
            <button
              onClick={() => setShowBeepGuide(!showBeepGuide)}
              className={`px-4 py-2.5 rounded-xl border text-xs font-semibold flex items-center gap-2 transition-all ${
                showBeepGuide
                  ? 'bg-amber-500/20 border-amber-400 text-amber-300 shadow-[0_0_15px_rgba(245,158,11,0.2)]'
                  : 'bg-slate-900/90 hover:bg-slate-800 border-slate-800 text-slate-300'
              }`}
            >
              <Volume2 className="w-4 h-4 text-amber-400" />
              <span>{language === 'gu' ? 'બીપ કોડ માર્ગદર્શિકા' : 'Beep Code Guide'}</span>
            </button>

            <button
              onClick={() => setActiveModule('hardware-learning')}
              className="px-4 py-2.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white text-xs font-semibold flex items-center gap-2 transition-all"
            >
              <Cpu className="w-4 h-4 text-cyan-400" />
              <span>{language === 'gu' ? 'હાર્ડવેર પાર્ટ્સ લેબ' : 'Explore Hardware Parts'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Beep Code Guide Dropdown Drawer */}
      {showBeepGuide && (
        <div className="p-5 rounded-2xl bg-slate-950/90 border border-amber-500/30 space-y-4 animate-fadeIn shadow-2xl">
          <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
            <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
              <Volume2 className="w-4 h-4" />
              <span>{language === 'gu' ? 'BIOS POST બીપ સાઉન્ડ ડિકોડર' : 'Standard BIOS POST Beep Sound Decoder'}</span>
            </div>
            <span className="text-[11px] font-mono text-slate-500">
              {language === 'gu' ? 'મધરબોર્ડ સ્પીકર કોડ્સ' : 'Motherboard Internal Speaker'}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {BEEP_CODE_GUIDE.map((beep, idx) => (
              <div 
                key={idx} 
                className={`p-3.5 rounded-xl border text-xs space-y-2 ${
                  beep.status === 'good'
                    ? 'bg-emerald-950/20 border-emerald-500/30 text-emerald-200'
                    : 'bg-slate-900/90 border-slate-800 text-slate-200'
                }`}
              >
                <div className="flex items-center justify-between font-mono font-bold">
                  <span className={beep.status === 'good' ? 'text-emerald-400' : 'text-amber-400'}>
                    🔊 {beep.beeps}
                  </span>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full border ${
                    beep.status === 'good' ? 'bg-emerald-950 text-emerald-300 border-emerald-800' : 'bg-red-950 text-red-300 border-red-800'
                  }`}>
                    {beep.status === 'good' ? 'Pass' : 'Fault'}
                  </span>
                </div>
                <div className="font-semibold text-slate-100">
                  {beep.meaning[language]}
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  {beep.action[language]}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Search Bar & Quick Categories */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 sm:p-5 shadow-xl space-y-4">
        {/* Search Input */}
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={
              language === 'gu'
                ? 'સમસ્યા શોધો: દા.ત. No Display, Beep Sound, ગરમ થવું, SMPS, RAM, હાર્ડ ડિસ્ક...'
                : 'Search any problem: e.g., No Display, Beep sound, PC won\'t turn on, Overheating, Blue Screen...'
            }
            className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-10 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-all font-mono"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Category Pills Filter */}
        <div className="flex flex-wrap items-center gap-1.5 pt-1">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isSelected = selectedCategory === cat.id;

            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all ${
                  isSelected
                    ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-slate-950 font-bold shadow-md shadow-amber-950/40'
                    : 'bg-slate-950/80 hover:bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-800'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{cat.label[language]}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Safety Notice Banner */}
      <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 flex items-start gap-3 text-xs text-slate-400">
        <Info className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong className="text-amber-300">
            {language === 'gu' ? 'મહત્વપૂર્ણ હાર્ડવેર સેફ્ટી સૂચના:' : 'Crucial Hardware Safety Rule:'}
          </strong>{' '}
          {language === 'gu'
            ? 'કમ્પ્યુટરનું કેબિનેટ ખોલતા પહેલા હંમેશા મેઈન પાવર કેબલ સ્વિચ બોર્ડમાંથી કાઢી નાખો અને પાવર બટનને ૧૦ સેકન્ડ દબાવી રાખી સ્ટેટિક ચાર્જ ડિસ્ચાર્જ કરો.'
            : 'Always unplug the main AC power cord and hold the power button for 10 seconds to discharge residual capacitor electricity before touching internal RAM, CPU, or motherboard pins.'}
        </p>
      </div>

      {/* Issues Diagnostic List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between text-xs font-mono text-slate-400">
          <span>
            {language === 'gu' ? 'મળેલી સમસ્યાઓ:' : 'Diagnosed Issues:'} {filteredIssues.length} / {TROUBLESHOOTING_ISSUES.length}
          </span>
          {selectedCategory !== 'all' && (
            <button
              onClick={() => setSelectedCategory('all')}
              className="text-cyan-400 hover:underline"
            >
              {language === 'gu' ? 'બધી બતાવો' : 'Show All'}
            </button>
          )}
        </div>

        {filteredIssues.length === 0 ? (
          <div className="p-12 text-center rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
            <AlertTriangle className="w-8 h-8 text-amber-400 mx-auto" />
            <h4 className="text-base font-bold text-white">
              {language === 'gu' ? 'કોઈ મેળ ખાતી સમસ્યા મળી નથી' : 'No matching issues found'}
            </h4>
            <p className="text-xs text-slate-400 max-w-md mx-auto">
              {language === 'gu'
                ? 'કૃપા કરીને અલગ કીવર્ડ શોધી જુઓ અથવા કેટેગરી ફિલ્ટરમાં "બધી સમસ્યાઓ" પસંદ કરો.'
                : 'Try searching with different terms like "RAM", "Display", "SMPS", or clear your filter.'}
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredIssues.map((issue) => {
              const isExpanded = expandedIssueId === issue.id;
              const severity = getSeverityBadge(issue.severity);

              return (
                <div
                  key={issue.id}
                  className={`rounded-2xl border transition-all overflow-hidden ${
                    isExpanded
                      ? 'bg-slate-900/95 border-amber-500/40 shadow-[0_4px_25px_rgba(245,158,11,0.1)]'
                      : 'bg-slate-900/70 hover:bg-slate-900 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  {/* Issue Summary Accordion Header */}
                  <div
                    onClick={() => toggleExpand(issue.id)}
                    className="p-5 cursor-pointer flex items-start sm:items-center justify-between gap-4 select-none"
                  >
                    <div className="space-y-1.5 flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded-full border font-bold ${severity.bg}`}>
                          {severity.label}
                        </span>
                        <span className="text-[11px] font-mono text-cyan-400 bg-cyan-950/60 border border-cyan-800/60 px-2 py-0.5 rounded">
                          {issue.component}
                        </span>
                        {issue.beepCode && (
                          <span className="text-[11px] font-mono text-amber-300 bg-amber-950/60 border border-amber-800/60 px-2 py-0.5 rounded flex items-center gap-1">
                            <Volume2 className="w-3 h-3" />
                            {issue.beepCode}
                          </span>
                        )}
                      </div>

                      <h3 className="text-base sm:text-lg font-bold text-white tracking-tight group-hover:text-cyan-300 transition-colors">
                        {issue.title[language]}
                      </h3>

                      <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                        {issue.symptom[language]}
                      </p>
                    </div>

                    <div className="p-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-400 hover:text-white shrink-0 mt-1 sm:mt-0">
                      {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                    </div>
                  </div>

                  {/* Expanded Diagnostic Solution Drawer */}
                  {isExpanded && (
                    <div className="px-5 pb-6 pt-2 border-t border-slate-800/80 space-y-5 animate-fadeIn">
                      {/* Likely Causes */}
                      <div className="space-y-2 bg-slate-950/60 p-4 rounded-xl border border-slate-800">
                        <h4 className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                          <AlertTriangle className="w-3.5 h-3.5" />
                          <span>{language === 'gu' ? 'સંભવિત કારણો (Likely Causes):' : 'Likely Causes of this Fault:'}</span>
                        </h4>
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 pt-1">
                          {issue.likelyCauses[language].map((cause, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                              <span>{cause}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Step-by-Step Practical Troubleshooting Steps */}
                      <div className="space-y-3">
                        <h4 className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
                          <Wrench className="w-3.5 h-3.5" />
                          <span>{language === 'gu' ? 'સ્ટેપ-બાય-સ્ટેપ રિપેરિંગ પદ્ધતિ:' : 'Step-by-Step Diagnostic & Repair Steps:'}</span>
                        </h4>

                        <div className="space-y-3">
                          {issue.diagnosticSteps.map((step) => (
                            <div 
                              key={step.step}
                              className="p-4 rounded-xl bg-slate-950/90 border border-slate-800 space-y-2 hover:border-slate-700 transition-colors"
                            >
                              <div className="flex items-center gap-2">
                                <span className="w-6 h-6 rounded-lg bg-cyan-950 border border-cyan-500/40 text-cyan-400 font-mono text-xs font-bold flex items-center justify-center shrink-0">
                                  {step.step}
                                </span>
                                <h5 className="text-sm font-bold text-white">
                                  {step.title[language]}
                                </h5>
                              </div>

                              <p className="text-xs text-slate-300 leading-relaxed pl-8">
                                {step.instruction[language]}
                              </p>

                              {step.tip && (
                                <div className="ml-8 mt-2 p-2.5 rounded-lg bg-cyan-950/40 border border-cyan-800/40 text-[11px] text-cyan-300 flex items-start gap-2">
                                  <Sparkles className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                                  <span>
                                    <strong>Pro-Tip:</strong> {step.tip[language]}
                                  </span>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Prevention Advice */}
                      <div className="p-3.5 rounded-xl bg-emerald-950/20 border border-emerald-500/30 text-xs text-emerald-200 flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <p>
                          <strong className="text-emerald-400">
                            {language === 'gu' ? 'ભવિષ્યમાં આ ખામીથી બચવા માટે:' : 'Long-Term Prevention:'}
                          </strong>{' '}
                          {issue.preventionTip[language]}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
