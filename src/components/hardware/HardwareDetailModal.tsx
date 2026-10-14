import React, { useEffect } from 'react';
import { HardwareDevice, Language } from '../../types';
import { HardwareDeviceImage } from './HardwareDeviceImage';
import { 
  X, 
  Lightbulb, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle, 
  Layers, 
  HelpCircle,
  ArrowRight,
  Info
} from 'lucide-react';

interface HardwareDetailModalProps {
  device: HardwareDevice | null;
  language: Language;
  onClose: () => void;
}

export const HardwareDetailModal: React.FC<HardwareDetailModalProps> = ({
  device,
  language,
  onClose
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (device) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [device, onClose]);

  if (!device) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto animate-fadeIn">
      {/* Modal Container */}
      <div 
        className="relative bg-slate-950 border border-slate-800 rounded-3xl max-w-4xl w-full max-h-[92vh] flex flex-col shadow-2xl overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="p-4 sm:p-6 border-b border-slate-800 bg-slate-900/90 flex items-center justify-between sticky top-0 z-20 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-600/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400 font-bold text-lg">
              {device.name[language].charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg sm:text-xl font-bold text-white">
                  {device.name[language]}
                </h2>
                {device.fullForm && (
                  <span className="hidden sm:inline-block text-[11px] font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800/40">
                    {device.fullForm[language]}
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-400">
                {language === 'gu' ? 'કમ્પ્યુટર હાર્ડવેર માસ્ટરી ગાઇડ' : 'Computer Hardware Beginner Guide'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
            title="Close (Esc)"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="overflow-y-auto p-4 sm:p-8 space-y-6">
          {/* Top Hero Layout: Image + Core Definition */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <HardwareDeviceImage
              src={device.image}
              alt={device.name[language]}
              fallbackType={device.fallbackSvgType}
              className="w-full h-56 sm:h-64 rounded-2xl shadow-xl"
            />

            <div className="space-y-4">
              {device.fullForm && (
                <div className="p-3 rounded-xl bg-cyan-950/40 border border-cyan-500/30">
                  <span className="text-[10px] font-mono text-cyan-400 uppercase font-bold block">
                    {language === 'gu' ? 'પૂરું નામ (Full Form):' : 'Full Name:'}
                  </span>
                  <span className="text-sm font-semibold text-white">
                    {device.fullForm[language]}
                  </span>
                </div>
              )}

              <div className="space-y-1.5">
                <h4 className="text-xs font-mono uppercase text-slate-400 font-bold">
                  {language === 'gu' ? 'સરળ વ્યાખ્યા (Definition):' : 'Simple Definition:'}
                </h4>
                <p className="text-sm text-slate-200 leading-relaxed bg-slate-900/80 p-3.5 rounded-xl border border-slate-800">
                  {device.shortDefinition[language]}
                </p>
              </div>

              {/* Relationship note if present */}
              {device.relationshipNote && (
                <div className="p-3.5 rounded-xl bg-blue-950/50 border border-blue-500/40 text-xs text-blue-200 flex items-start gap-2">
                  <Info className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-cyan-300 block mb-0.5">
                      {language === 'gu' ? 'મહત્વની સ્પષ્ટતા (Relationship):' : 'Key Clarification:'}
                    </strong>
                    {device.relationshipNote[language]}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Core Functions: What it does & Why it matters */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-cyan-400 uppercase font-semibold flex items-center gap-1.5">
                <HelpCircle className="w-4 h-4 text-cyan-400" />
                {language === 'gu' ? 'આ સાધન શું કામ કરે છે? (What It Does)' : 'What It Does'}
              </span>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {device.whatItDoes[language]}
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-emerald-400 uppercase font-semibold flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                {language === 'gu' ? 'તે શા માટે જરૂરી છે? (Why It Matters)' : 'Why It Matters'}
              </span>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {device.whyItMatters[language]}
              </p>
            </div>
          </div>

          {/* How It Works In Simple Terms */}
          <div className="p-5 rounded-2xl bg-gradient-to-r from-slate-900 to-slate-900/80 border border-cyan-500/30 space-y-2">
            <span className="text-xs font-mono text-cyan-300 uppercase font-bold flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-cyan-400" />
              {language === 'gu' ? 'આ સાધન કેવી રીતે કામ કરે છે? (How It Works)' : 'How It Works (In Simple Terms)'}
            </span>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
              {device.howItWorks[language]}
            </p>
          </div>

          {/* Real Life Analogy Box */}
          <div className="p-5 rounded-2xl bg-indigo-950/30 border border-indigo-500/30 space-y-2">
            <span className="text-xs font-mono text-indigo-300 uppercase font-bold flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-indigo-400" />
              {language === 'gu' ? 'રોજિંદા જીવનનું ઉદાહરણ (Real-Life Analogy):' : 'Easy Real-Life Analogy:'}
            </span>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed italic">
              "{device.realLifeAnalogy[language]}"
            </p>
          </div>

          {/* Types and Variations Grid */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase text-slate-400 font-bold">
              {language === 'gu' ? 'સાધનના વિવિધ પ્રકારો (Different Types):' : 'Different Types & Variations:'}
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {device.types.map((type, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                  <strong className="text-xs font-semibold text-cyan-300 block">
                    {type.name[language]}
                  </strong>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    {type.description[language]}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Comparison section if present */}
          {device.comparisons && device.comparisons.length > 0 && (
            <div className="space-y-3">
              <h4 className="text-xs font-mono uppercase text-slate-400 font-bold">
                {language === 'gu' ? 'સરખામણી (Device Comparison):' : 'Device Comparison:'}
              </h4>
              {device.comparisons.map((comp, idx) => (
                <div key={idx} className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-white">{comp.title[language]}</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {comp.comparisonText[language]}
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono pt-1">
                    {comp.points.map((pt, pIdx) => (
                      <div key={pIdx} className="p-3 rounded-lg bg-slate-950 border border-slate-800/80 space-y-1">
                        <span className="text-slate-500 uppercase text-[10px] block">{pt.feature[language]}</span>
                        <div className="flex justify-between text-[11px]">
                          <span className="text-cyan-300">{pt.deviceA[language]}</span>
                          <span className="text-slate-600">vs</span>
                          <span className="text-amber-300">{pt.deviceB[language]}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Advantages vs Limitations */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl bg-slate-900/80 border border-emerald-500/30 space-y-2">
              <span className="text-xs font-mono text-emerald-400 uppercase font-semibold flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                {language === 'gu' ? 'મુખ્ય ફાયદા (Advantages)' : 'Key Advantages'}
              </span>
              <ul className="text-xs text-slate-300 space-y-1.5">
                {device.advantages[language].map((adv, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-emerald-400 font-bold">•</span>
                    <span>{adv}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/80 border border-amber-500/30 space-y-2">
              <span className="text-xs font-mono text-amber-400 uppercase font-semibold flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4 text-amber-400" />
                {language === 'gu' ? 'મર્યાદાઓ (Limitations)' : 'Limitations'}
              </span>
              <ul className="text-xs text-slate-300 space-y-1.5">
                {device.limitations[language].map((lim, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-amber-400 font-bold">•</span>
                    <span>{lim}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Did You Know & Remember This */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
              <span className="text-xs font-mono text-cyan-400 uppercase font-semibold flex items-center gap-1.5">
                <Sparkles className="w-4 h-4" />
                {language === 'gu' ? 'શું તમે જાણો છો? (Did You Know?)' : 'Did You Know?'}
              </span>
              <p className="text-xs text-slate-400 leading-relaxed">
                {device.didYouKnow[language]}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-amber-950/30 border border-amber-500/40 space-y-1">
              <span className="text-xs font-mono text-amber-300 uppercase font-semibold flex items-center gap-1.5">
                <Lightbulb className="w-4 h-4 text-amber-400" />
                {language === 'gu' ? 'યાદ રાખો (Remember This):' : 'Remember This:'}
              </span>
              <p className="text-xs text-slate-300 leading-relaxed">
                {device.rememberThis[language]}
              </p>
            </div>
          </div>
        </div>

        {/* Modal Bottom Footer */}
        <div className="p-4 sm:p-5 border-t border-slate-800 bg-slate-900/90 flex items-center justify-between sticky bottom-0 z-20 backdrop-blur-md">
          <span className="text-xs font-mono text-slate-400">
            {language === 'gu' ? 'કુલ 11 હાર્ડવેર ઉપકરણોમાંથી એક' : '1 of 11 Computer Hardware Devices'}
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-semibold text-xs sm:text-sm transition-all shadow-lg shadow-cyan-950/40"
          >
            {language === 'gu' ? 'બંધ કરો (Close)' : 'Done Reading'}
          </button>
        </div>
      </div>
    </div>
  );
};
