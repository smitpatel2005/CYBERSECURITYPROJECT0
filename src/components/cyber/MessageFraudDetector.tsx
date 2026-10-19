import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { MessageFraudAnalysis } from '../../types';
import { analyzeMessageFraud } from '../../utils/messageFraudDetector';
import { 
  MessageSquareWarning, 
  ShieldAlert, 
  ShieldCheck, 
  AlertTriangle, 
  CheckCircle2, 
  RotateCcw, 
  ArrowRight,
  Info,
  Copy,
  ExternalLink,
  PhoneCall
} from 'lucide-react';

interface PresetSample {
  id: string;
  label: { en: string; gu: string };
  text: string;
}

const PRESET_SAMPLES: PresetSample[] = [
  {
    id: 'electricity',
    label: { en: 'Electricity Cut-off Scam', gu: 'લાઈટ બિલ કટ સ્કેમ' },
    text: 'Dear consumer, your electricity power will be disconnected tonight at 9.30 PM from electricity office because your previous month bill was not updated. Please immediately contact our electricity officer at 9876543210. Thank you.'
  },
  {
    id: 'sbi-kyc',
    label: { en: 'Bank KYC Phish', gu: 'બેંક KYC ફિશિંગ' },
    text: 'Dear SBI Customer, your bank account has been suspended due to pending PAN card & KYC verification. To prevent permanent deactivation within 24 hours, update immediately at: http://sbi-kyc-verify-portal.top/auth'
  },
  {
    id: 'kbc-lottery',
    label: { en: 'KBC 25 Lakh Lottery', gu: 'KBC ૨૫ લાખ લોટરી' },
    text: 'Congratulations! Your WhatsApp mobile number has won cash prize of Rs. 25,00,000 in Kaun Banega Crorepati lucky draw! Send processing fee Rs. 1,500 to claim your lottery check. WhatsApp on 9988776655 immediately.'
  },
  {
    id: 'task-job',
    label: { en: 'YouTube Job Scam', gu: 'યુટ્યુબ જોબ સ્કેમ' },
    text: 'Special offer! Work from home part time job. Earn Rs. 3,000 to 8,000 daily just by liking YouTube videos and rating hotels. Contact VIP HR on Telegram @EarnDaily_HR to get bonus Rs. 500 now.'
  },
  {
    id: 'india-post',
    label: { en: 'Courier Address Scam', gu: 'કુરિયર એડ્રેસ સ્કેમ' },
    text: 'India Post Alert: Your parcel package #IN89214 could not be delivered due to incomplete delivery address. Update your address within 24 hours to avoid package return: http://indiapost-pkg-update.xyz'
  },
  {
    id: 'remote-apk',
    label: { en: 'Fake Officer APK', gu: 'ખતરનાક APK સ્કેમ' },
    text: 'Urgent notice: Your electricity payment failed. Download official e-bill update app to clear bill: http://192.168.1.15/electricity-update.apk or install AnyDesk to verify with technical staff.'
  },
  {
    id: 'safe-bank',
    label: { en: 'Legitimate Bank OTP', gu: 'અસલી બેંક OTP' },
    text: '849201 is your OTP for transaction of INR 3,450.00 at AMAZON on card ending 4019. NEVER share this OTP with anyone, including bank officials. If this was not you, call official helpline 1800-11-2211.'
  }
];

export const MessageFraudDetector: React.FC = () => {
  const { language, incrementMessageScans } = useApp();
  const [inputMessage, setInputMessage] = useState<string>('');
  const [result, setResult] = useState<MessageFraudAnalysis | null>(null);
  const [copiedTip, setCopiedTip] = useState<boolean>(false);

  const analyzeMessage = (textToTest: string) => {
    const clean = textToTest.trim();
    if (!clean) return;

    const analysisResult = analyzeMessageFraud(clean);
    setResult(analysisResult);
    incrementMessageScans();
  };

  const handleReset = () => {
    setInputMessage('');
    setResult(null);
  };

  const handlePasteClipboard = async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.readText) {
        const text = await navigator.clipboard.readText();
        if (text) {
          setInputMessage(text);
          analyzeMessage(text);
          setCopiedTip(true);
          setTimeout(() => setCopiedTip(false), 2500);
        }
      }
    } catch {
      // Fallback
    }
  };

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-6 shadow-xl">
      {/* Header bar matching UrlSafetyInspector */}
      <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
        <div className="p-2.5 rounded-xl bg-cyan-950/80 border border-cyan-500/40 text-cyan-400">
          <MessageSquareWarning className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-white tracking-tight">
            {language === 'gu' 
              ? 'SMS, WhatsApp & મેસેજ ફ્રોડ ડિટેક્ટર' 
              : 'Educational SMS, WhatsApp & Message Fraud Inspector'}
          </h3>
          <p className="text-xs text-slate-400">
            {language === 'gu'
              ? 'મોબાઈલ કે કમ્પ્યુટરમાં આવેલા શંકાસ્પદ મેસેજ (લિંક્સ, ધમકી, KYC, ફેક APK) નું હેયુરિસ્ટિક વિશ્લેષણ'
              : 'Rule-based local heuristics analyzing message deception, psychological panic, phishing URLs, and rogue APK vectors'}
          </p>
        </div>
      </div>

      {/* Message Input Form matching UrlSafetyInspector */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-xs font-mono text-slate-300 block">
            {language === 'gu' 
              ? 'તપાસવા માટે કોઈપણ મેસેજ દાખલ કરો અથવા પેસ્ટ કરો:' 
              : 'Enter Any SMS, WhatsApp or Online Message to Inspect:'}
          </label>
          <button
            onClick={handlePasteClipboard}
            className="text-[11px] font-mono text-cyan-400 hover:text-cyan-300 flex items-center gap-1 transition-colors"
            title="Paste from clipboard"
          >
            <Copy className="w-3 h-3" />
            <span>{copiedTip ? (language === 'gu' ? 'પેસ્ટ થયું!' : 'Pasted!') : (language === 'gu' ? 'ક્લિપબોર્ડ પેસ્ટ' : 'Paste Clipboard')}</span>
          </button>
        </div>

        <div className="flex flex-col sm:flex-row gap-2">
          <textarea
            rows={2}
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder={
              language === 'gu'
                ? 'e.g. Dear consumer, your electricity power will be disconnected tonight at 9.30 PM. Contact electricity officer at 9876543210...'
                : 'e.g. Dear SBI Customer, your bank account has been suspended due to pending KYC. Update immediately at: http://sbi-kyc-verify.top'
            }
            className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500 font-mono resize-y min-h-[56px]"
          />
          <div className="flex sm:flex-col gap-2 shrink-0">
            <button
              onClick={() => analyzeMessage(inputMessage)}
              disabled={!inputMessage.trim()}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-semibold text-xs transition-all disabled:opacity-50 flex items-center justify-center gap-2 shrink-0 shadow-lg shadow-cyan-950/40"
            >
              <span>{language === 'gu' ? 'મેસેજ તપાસો' : 'Analyze Message'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            {result && (
              <button
                onClick={handleReset}
                className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors flex items-center justify-center"
                title="Reset analyzer"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Sample Pre-loaded Messages matching UrlSafetyInspector pill format */}
        <div className="flex flex-wrap items-center gap-1.5 pt-1">
          <span className="text-[11px] font-mono text-slate-500">
            {language === 'gu' ? 'ટેસ્ટ સેમ્પલ્સ:' : 'Test Samples:'}
          </span>
          {PRESET_SAMPLES.map((sample) => (
            <button
              key={sample.id}
              onClick={() => {
                setInputMessage(sample.text);
                analyzeMessage(sample.text);
              }}
              className="text-[11px] px-2.5 py-1 rounded-md bg-slate-800/80 hover:bg-slate-700 text-slate-300 border border-slate-700/60 font-mono transition-colors"
            >
              {sample.label[language]}
            </button>
          ))}
        </div>
      </div>

      {/* Analysis Result Display matching UrlSafetyInspector layout */}
      {result && (
        <div className="space-y-5 pt-4 border-t border-slate-800 animate-fadeIn">
          {/* Verdict Banner */}
          <div
            className={`p-4 rounded-xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
              result.riskLevel === 'DANGEROUS'
                ? 'bg-red-950/40 border-red-500/50 text-red-200'
                : result.riskLevel === 'SUSPICIOUS'
                ? 'bg-amber-950/40 border-amber-500/50 text-amber-200'
                : 'bg-emerald-950/40 border-emerald-500/50 text-emerald-200'
            }`}
          >
            <div className="flex items-center gap-3">
              {result.riskLevel === 'DANGEROUS' ? (
                <ShieldAlert className="w-8 h-8 text-red-400 shrink-0" />
              ) : result.riskLevel === 'SUSPICIOUS' ? (
                <AlertTriangle className="w-8 h-8 text-amber-400 shrink-0" />
              ) : (
                <ShieldCheck className="w-8 h-8 text-emerald-400 shrink-0" />
              )}
              <div>
                <span className="text-xs font-mono uppercase tracking-wider font-bold block">
                  Heuristic Assessment • {result.categoryTitle[language]}
                </span>
                <h4 className="text-lg font-bold">
                  {result.riskLevel === 'DANGEROUS'
                    ? (language === 'gu' ? 'અત્યંત જોખમી (High Risk Scam)' : 'High Risk Scam Detected')
                    : result.riskLevel === 'SUSPICIOUS'
                    ? (language === 'gu' ? 'શંકાસ્પદ સંદેશ (Potential Risk)' : 'Potential Risk Detected')
                    : (language === 'gu' ? 'સુરક્ષિત સંદેશ (Clean / Safe)' : 'Clean / Safe Message')}
                  : Risk Indicator {result.riskScore}/100
                </h4>
              </div>
            </div>

            <div className="text-xs font-mono bg-slate-950/80 px-3 py-1.5 rounded-lg border border-slate-800">
              Words: <span className="text-cyan-400 font-bold">{result.wordCount}</span> | URLs:{' '}
              <span className="text-slate-300 font-bold">{result.extractedUrls.length}</span> | Phones:{' '}
              <span className="text-slate-300 font-bold">{result.extractedPhones.length}</span>
            </div>
          </div>

          {/* Detailed Rules Checklist matching UrlSafetyInspector */}
          <div className="space-y-2">
            <h5 className="text-xs font-mono uppercase text-slate-400 tracking-wider font-semibold">
              {language === 'gu' ? 'નિયમ મુજબ હેયુરિસ્ટિક ચકાસણી:' : 'Rule-by-Rule Heuristic Inspection:'}
            </h5>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {result.heuristicRules.map((check) => {
                const isViolation = check.triggered && check.riskScore > 0;
                return (
                  <div
                    key={check.id}
                    className={`p-3 rounded-xl border text-xs space-y-1 ${
                      !isViolation
                        ? 'bg-slate-900/60 border-slate-800 text-slate-300'
                        : 'bg-red-950/20 border-red-500/30 text-red-200'
                    }`}
                  >
                    <div className="flex items-center justify-between font-semibold">
                      <span>{check.name[language]}</span>
                      {!isViolation ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      ) : (
                        <AlertTriangle className="w-4 h-4 text-red-400 shrink-0" />
                      )}
                    </div>
                    <p className="text-[11px] text-slate-400 leading-relaxed">
                      {check.explanation[language]}
                    </p>
                    {check.evidence && (
                      <div className="text-[10px] font-mono text-cyan-400/80 pt-0.5 truncate">
                        Evidence: {check.evidence}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Educational Disclaimer & Helpline matching UrlSafetyInspector style */}
          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-slate-400">
            <div className="flex items-start gap-2.5">
              <Info className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
              <p>
                <strong className="text-cyan-300">
                  {language === 'gu' ? 'સાયબર સલાહ:' : 'Technical Note:'}
                </strong>{' '}
                {result.summary[language]}{' '}
                {result.riskLevel === 'DANGEROUS' && (
                  <span className="text-red-400 font-medium">
                    {language === 'gu'
                      ? 'આવા મેસેજમાં આવેલી કોઈ લિંક ખોલશો નહીં કે OTP શેર કરશો નહીં.'
                      : 'Never open unverified links or share OTP.'}
                  </span>
                )}
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <a
                href="tel:1930"
                className="px-2.5 py-1 rounded-md bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/40 text-[11px] font-mono font-bold flex items-center gap-1 transition-colors"
              >
                <PhoneCall className="w-3 h-3" />
                <span>Helpline 1930</span>
              </a>
              <a
                href="https://cybercrime.gov.in"
                target="_blank"
                rel="noopener noreferrer"
                className="px-2.5 py-1 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 text-[11px] font-mono flex items-center gap-1 transition-colors"
              >
                <ExternalLink className="w-3 h-3" />
                <span>cybercrime.gov.in</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
