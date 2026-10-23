import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  REAL_URL_SAMPLES, 
  REAL_MESSAGE_SAMPLES, 
  RealUrlSample, 
  RealMessageSample 
} from '../../data/realThreatSamplesData';
import { 
  X, 
  Database, 
  Globe, 
  MessageSquareWarning, 
  Copy, 
  Check, 
  ArrowRight, 
  ShieldAlert, 
  ShieldCheck, 
  ExternalLink, 
  Search,
  Sparkles,
  Zap
} from 'lucide-react';

interface RealThreatDataHubModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTab?: 'urls' | 'messages';
  onSelectUrl?: (url: string) => void;
  onSelectMessage?: (text: string) => void;
}

export const RealThreatDataHubModal: React.FC<RealThreatDataHubModalProps> = ({
  isOpen,
  onClose,
  defaultTab = 'urls',
  onSelectUrl,
  onSelectMessage
}) => {
  const { language, setActiveModule } = useApp();
  const [activeTab, setActiveTab] = useState<'urls' | 'messages'>(defaultTab);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleTestUrl = (sample: RealUrlSample) => {
    if (onSelectUrl) {
      onSelectUrl(sample.url);
    } else {
      setActiveModule('url-inspector');
    }
    onClose();
  };

  const handleTestMessage = (sample: RealMessageSample) => {
    if (onSelectMessage) {
      onSelectMessage(sample.text);
    } else {
      setActiveModule('message-detector');
    }
    onClose();
  };

  const filteredUrls = REAL_URL_SAMPLES.filter((item) => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return true;
    return (
      item.title.en.toLowerCase().includes(q) ||
      item.title.gu.toLowerCase().includes(q) ||
      item.url.toLowerCase().includes(q) ||
      item.badge.en.toLowerCase().includes(q)
    );
  });

  const filteredMessages = REAL_MESSAGE_SAMPLES.filter((item) => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return true;
    return (
      item.title.en.toLowerCase().includes(q) ||
      item.title.gu.toLowerCase().includes(q) ||
      item.text.toLowerCase().includes(q) ||
      item.badge.en.toLowerCase().includes(q)
    );
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div 
        className="relative w-full max-w-4xl max-h-[90vh] bg-slate-950 border border-slate-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-4 sm:p-6 border-b border-slate-800 bg-slate-900/80 flex items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-cyan-950/80 border border-cyan-500/40 text-cyan-400 shrink-0">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
                  {language === 'gu' ? 'વાસ્તવિક ટેસ્ટિંગ ડેટા બેંક' : 'Real Threat Testing Data Bank'}
                </h3>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-800 hidden sm:inline">
                  100% Genuine Data
                </span>
              </div>
              <p className="text-xs text-slate-400">
                {language === 'gu'
                  ? 'CyberDost, PhishTank અને ગુજરાત સાયબર ક્રાઈમ દ્વારા નોંધાયેલા અસલી ફિશિંગ URLs અને સ્કેમ મેસેજનો સંગ્રહ'
                  : 'Authentic real-world phishing URLs & scam messages reported by CyberDost, PhishTank, and Cyber Crime Police'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 transition-colors shrink-0"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs & Search Bar */}
        <div className="p-4 border-b border-slate-800/80 bg-slate-900/40 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          {/* Tabs */}
          <div className="flex items-center gap-2 bg-slate-950 p-1 rounded-xl border border-slate-800">
            <button
              onClick={() => setActiveTab('urls')}
              className={`flex-1 sm:flex-none px-4 py-2 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
                activeTab === 'urls'
                  ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Globe className="w-3.5 h-3.5" />
              <span>{language === 'gu' ? 'અસલી URLs (લિંક્સ)' : 'Real URLs (9)'}</span>
            </button>

            <button
              onClick={() => setActiveTab('messages')}
              className={`flex-1 sm:flex-none px-4 py-2 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
                activeTab === 'messages'
                  ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <MessageSquareWarning className="w-3.5 h-3.5" />
              <span>{language === 'gu' ? 'અસલી મેસેજ (SMS)' : 'Real Messages (9)'}</span>
            </button>
          </div>

          {/* Search Box */}
          <div className="relative flex-1 sm:max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={language === 'gu' ? 'સેમ્પલ શોધો (SBI, Light Bill...)' : 'Search samples (SBI, Tax, KBC...)'}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 font-mono"
            />
          </div>
        </div>

        {/* Scrollable Content Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          {activeTab === 'urls' ? (
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
                <span>
                  {language === 'gu' ? 'ઉપલબ્ધ વાસ્તવિક લિંક્સ:' : 'Live Threat & Safe URLs:'} {filteredUrls.length}
                </span>
                <span className="text-slate-500">
                  {language === 'gu' ? '૧-ક્લિક ટેસ્ટ બટન ઉપલબ્ધ' : '1-Click Test Ready'}
                </span>
              </div>

              {filteredUrls.map((item) => {
                const isLegit = item.category === 'legitimate';
                return (
                  <div 
                    key={item.id}
                    className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 hover:border-slate-700 transition-all space-y-2.5 group"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        {isLegit ? (
                          <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                        ) : (
                          <ShieldAlert className="w-4 h-4 text-red-400 shrink-0" />
                        )}
                        <h4 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors">
                          {item.title[language]}
                        </h4>
                      </div>

                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full border font-bold ${
                          isLegit 
                            ? 'bg-emerald-950/80 text-emerald-300 border-emerald-500/40' 
                            : 'bg-red-950/80 text-red-300 border-red-500/40'
                        }`}>
                          {item.badge[language]}
                        </span>
                        <span className="text-[10px] font-mono text-slate-500 bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                          {item.source[language]}
                        </span>
                      </div>
                    </div>

                    {/* URL Display Box */}
                    <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 font-mono text-xs text-cyan-300 break-all select-all flex items-center justify-between gap-2">
                      <span>{item.url}</span>
                      <button
                        onClick={() => handleCopy(item.id, item.url)}
                        className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors shrink-0"
                        title="Copy URL"
                      >
                        {copiedId === item.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>

                    {/* Expected Result & Test CTA */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-1 border-t border-slate-800/60 text-xs">
                      <span className="text-[11px] text-slate-400 leading-relaxed">
                        <strong className="text-slate-300">{language === 'gu' ? 'અપેક્ષિત પરિણામ:' : 'Expected Detection:'}</strong> {item.expectedResult[language]}
                      </span>

                      <button
                        onClick={() => handleTestUrl(item)}
                        className="px-3.5 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-semibold text-xs flex items-center justify-center gap-1.5 shrink-0 transition-all shadow-md shadow-cyan-950/40"
                      >
                        <span>{language === 'gu' ? 'આ URL ચેક કરો' : 'Test This URL'}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
                <span>
                  {language === 'gu' ? 'ઉપલબ્ધ વાસ્તવિક મેસેજ:' : 'Real Smishing & Fraud Messages:'} {filteredMessages.length}
                </span>
                <span className="text-slate-500">
                  {language === 'gu' ? '૧-ક્લિક ટેસ્ટ બટન ઉપલબ્ધ' : '1-Click Test Ready'}
                </span>
              </div>

              {filteredMessages.map((item) => {
                const isSafe = item.category === 'safe';
                return (
                  <div 
                    key={item.id}
                    className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 hover:border-slate-700 transition-all space-y-2.5 group"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        {isSafe ? (
                          <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                        ) : (
                          <ShieldAlert className="w-4 h-4 text-red-400 shrink-0" />
                        )}
                        <h4 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors">
                          {item.title[language]}
                        </h4>
                      </div>

                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full border font-bold ${
                          isSafe 
                            ? 'bg-emerald-950/80 text-emerald-300 border-emerald-500/40' 
                            : 'bg-red-950/80 text-red-300 border-red-500/40'
                        }`}>
                          {item.badge[language]}
                        </span>
                        <span className="text-[10px] font-mono text-slate-500 bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                          {item.source[language]}
                        </span>
                      </div>
                    </div>

                    {/* Message Body */}
                    <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-200 leading-relaxed font-sans relative">
                      <p>{item.text}</p>
                      <button
                        onClick={() => handleCopy(item.id, item.text)}
                        className="absolute right-2 top-2 p-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
                        title="Copy message"
                      >
                        {copiedId === item.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>

                    {/* Expected Result & Test CTA */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-1 border-t border-slate-800/60 text-xs">
                      <span className="text-[11px] text-slate-400 leading-relaxed">
                        <strong className="text-slate-300">{language === 'gu' ? 'અપેક્ષિત પરિણામ:' : 'Expected Analysis:'}</strong> {item.expectedResult[language]}
                      </span>

                      <button
                        onClick={() => handleTestMessage(item)}
                        className="px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-semibold text-xs flex items-center justify-center gap-1.5 shrink-0 transition-all shadow-md shadow-cyan-950/40"
                      >
                        <span>{language === 'gu' ? 'આ મેસેજ ચેક કરો' : 'Test This Message'}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-3.5 border-t border-slate-800 bg-slate-900/60 flex items-center justify-between text-xs text-slate-400 px-4 sm:px-6">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span>
              {language === 'gu'
                ? 'આ ડેટા સાયબર સિક્યોરિટી જાગૃતિ અને ડેમોન્સ્ટ્રેશન માટે છે.'
                : 'All samples are genuine patterns designed for educational threat demonstration.'}
            </span>
          </div>

          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium transition-colors"
          >
            {language === 'gu' ? 'બંધ કરો' : 'Close'}
          </button>
        </div>
      </div>
    </div>
  );
};
