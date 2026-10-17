import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  MessageFraudAnalysis, 
  ScamCategory 
} from '../../types';
import { analyzeMessageFraud } from '../../utils/messageFraudDetector';
import { 
  MessageSquareWarning, 
  Smartphone, 
  ShieldAlert, 
  ShieldCheck, 
  AlertTriangle, 
  AlertOctagon, 
  Copy, 
  RotateCcw, 
  ExternalLink, 
  PhoneCall, 
  CheckCircle2, 
  XCircle, 
  Sparkles, 
  Flame, 
  Lock, 
  Zap, 
  FileWarning, 
  Shield, 
  Send 
} from 'lucide-react';

interface PresetSample {
  id: string;
  category: ScamCategory;
  label: { en: string; gu: string };
  badge: { en: string; gu: string };
  icon: React.ElementType;
  color: string;
  text: string;
}

const PRESET_SAMPLES: PresetSample[] = [
  {
    id: 'electricity',
    category: 'electricity_bill_scam',
    label: { en: 'Electricity Disconnection Scam', gu: 'લાઈટ બિલ કટ ઓફ સ્કેમ' },
    badge: { en: 'Very Rampant', gu: 'ખૂબ પ્રચલિત' },
    icon: Zap,
    color: 'from-amber-500/20 to-orange-500/20 text-amber-400 border-amber-500/30',
    text: 'Dear consumer, your electricity power will be disconnected tonight at 9.30 PM from electricity office because your previous month bill was not updated. Please immediately contact our electricity officer at 9876543210. Thank you.'
  },
  {
    id: 'sbi-kyc',
    category: 'bank_kyc_phishing',
    label: { en: 'SBI / HDFC KYC Block Smishing', gu: 'બેંક એકાઉન્ટ KYC બ્લોક ફિશિંગ' },
    badge: { en: 'Critical Phish', gu: 'ખતરનાક ફિશિંગ' },
    icon: Lock,
    color: 'from-rose-500/20 to-red-500/20 text-rose-400 border-rose-500/30',
    text: 'Dear SBI Customer, your bank account has been suspended due to pending PAN card & KYC verification. To prevent permanent deactivation within 24 hours, update immediately at: http://sbi-kyc-verify-portal.top/auth'
  },
  {
    id: 'kbc-lottery',
    category: 'lottery_reward_fraud',
    label: { en: 'KBC 25 Lakh Lottery Fraud', gu: 'KBC ૨૫ લાખ લોટરી ફ્રોડ' },
    badge: { en: 'Fake Lottery', gu: 'નકલી લોટરી' },
    icon: Sparkles,
    color: 'from-purple-500/20 to-fuchsia-500/20 text-purple-400 border-purple-500/30',
    text: 'Congratulations! Your WhatsApp mobile number has won cash prize of Rs. 25,00,000 in Kaun Banega Crorepati lucky draw! Send processing fee Rs. 1,500 to claim your lottery check. WhatsApp on 9988776655 immediately.'
  },
  {
    id: 'task-job',
    category: 'part_time_job_scam',
    label: { en: 'YouTube Like / Part-Time Job Scam', gu: 'યુટ્યુબ લાઈક / જોબ સ્કેમ' },
    badge: { en: 'Work From Home', gu: 'ટાસ્ક સ્કીમ' },
    icon: Flame,
    color: 'from-blue-500/20 to-cyan-500/20 text-cyan-400 border-cyan-500/30',
    text: 'Special offer! Work from home part time job. Earn Rs. 3,000 to 8,000 daily just by liking YouTube videos and rating hotels. Contact VIP HR on Telegram @EarnDaily_HR to get bonus Rs. 500 now.'
  },
  {
    id: 'india-post',
    category: 'courier_delivery_scam',
    label: { en: 'India Post Address Update Scam', gu: 'ઇન્ડિયા પોસ્ટ પાર્સલ એડ્રેસ સ્કેમ' },
    badge: { en: 'Smishing Link', gu: 'ફેક કુરિયર' },
    icon: FileWarning,
    color: 'from-yellow-500/20 to-amber-500/20 text-yellow-400 border-yellow-500/30',
    text: 'India Post Alert: Your parcel package #IN89214 could not be delivered due to incomplete delivery address. Update your address within 24 hours to avoid package return: http://indiapost-pkg-update.xyz'
  },
  {
    id: 'remote-apk',
    category: 'apk_malware_remote',
    label: { en: 'Fake Officer .APK / AnyDesk Fraud', gu: 'અજાણી .APK / AnyDesk સ્કેમ' },
    badge: { en: 'High Danger', gu: 'અત્યંત જોખમી' },
    icon: AlertOctagon,
    color: 'from-red-600/20 to-rose-700/20 text-red-400 border-red-500/40',
    text: 'Urgent notice: Your electricity payment failed. Download official e-bill update app to clear bill: http://192.168.1.15/electricity-update.apk or install AnyDesk to verify with technical staff.'
  },
  {
    id: 'safe-bank',
    category: 'legitimate_transactional',
    label: { en: 'Genuine Bank OTP Notification', gu: 'અસલી સુરક્ષિત બેંક OTP મેસેજ' },
    badge: { en: 'Legitimate / Safe', gu: 'સુરક્ષિત મેસેજ' },
    icon: ShieldCheck,
    color: 'from-emerald-500/20 to-teal-500/20 text-emerald-400 border-emerald-500/30',
    text: '849201 is your OTP for transaction of INR 3,450.00 at AMAZON on card ending 4019. NEVER share this OTP with anyone, including bank officials. If this was not you, call official helpline 1800-11-2211.'
  }
];

export const MessageFraudDetector: React.FC = () => {
  const { language, incrementMessageScans, getOverallStats } = useApp();
  const stats = getOverallStats();

  const [inputMessage, setInputMessage] = useState<string>(PRESET_SAMPLES[0].text);
  const [analysis, setAnalysis] = useState<MessageFraudAnalysis>(() => analyzeMessageFraud(PRESET_SAMPLES[0].text));
  const [hasScanned, setHasScanned] = useState<boolean>(true);
  const [pasteNotice, setPasteNotice] = useState<string>('');

  const handleAnalyze = (textToTest?: string) => {
    const text = typeof textToTest === 'string' ? textToTest : inputMessage;
    if (!text.trim()) return;

    const result = analyzeMessageFraud(text);
    setAnalysis(result);
    setHasScanned(true);
    incrementMessageScans();
  };

  const handleSelectPreset = (sample: PresetSample) => {
    setInputMessage(sample.text);
    handleAnalyze(sample.text);
  };

  const handleClear = () => {
    setInputMessage('');
    setAnalysis(analyzeMessageFraud(''));
    setHasScanned(false);
  };

  const handlePasteClipboard = async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.readText) {
        const text = await navigator.clipboard.readText();
        if (text) {
          setInputMessage(text);
          handleAnalyze(text);
          setPasteNotice(language === 'gu' ? 'ક્લિપબોર્ડમાંથી પેસ્ટ કર્યું!' : 'Pasted from clipboard!');
          setTimeout(() => setPasteNotice(''), 3000);
          return;
        }
      }
      setPasteNotice(language === 'gu' ? 'ટેક્સ્ટ બોક્સમાં જાતે પેસ્ટ કરો (Ctrl+V)' : 'Please paste text into the box (Ctrl+V)');
      setTimeout(() => setPasteNotice(''), 4000);
    } catch {
      setPasteNotice(language === 'gu' ? 'ટેક્સ્ટ બોક્સમાં જાતે પેસ્ટ કરો (Ctrl+V)' : 'Please paste text into the box (Ctrl+V)');
      setTimeout(() => setPasteNotice(''), 4000);
    }
  };

  const getRiskBadgeStyles = () => {
    switch (analysis.riskLevel) {
      case 'DANGEROUS':
        return {
          bg: 'bg-red-950/80 border-red-500/50 text-red-200',
          title: language === 'gu' ? 'અત્યંત જોખમી - સ્કેમ / ફ્રોડ સંદેશ' : 'HIGH RISK — CONFIRMED FRAUD PATTERN',
          icon: AlertOctagon,
          iconColor: 'text-red-400',
          barColor: 'bg-gradient-to-r from-orange-500 to-red-600',
          badgeText: language === 'gu' ? 'સ્કેમ એલર્ટ' : 'FRAUD ALERT',
          badgeColor: 'bg-red-500/20 text-red-300 border-red-500/40'
        };
      case 'SUSPICIOUS':
        return {
          bg: 'bg-amber-950/80 border-amber-500/50 text-amber-200',
          title: language === 'gu' ? 'શંકાસ્પદ સંદેશ - સાવચેતી જરૂરી' : 'SUSPICIOUS — EXERCISE CAUTION',
          icon: AlertTriangle,
          iconColor: 'text-amber-400',
          barColor: 'bg-gradient-to-r from-yellow-400 to-amber-500',
          badgeText: language === 'gu' ? 'શંકાસ્પદ' : 'SUSPICIOUS',
          badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/40'
        };
      default:
        return {
          bg: 'bg-emerald-950/80 border-emerald-500/50 text-emerald-200',
          title: language === 'gu' ? 'સુરક્ષિત સંદેશ - કોઈ જોખમ જણાયું નથી' : 'SAFE / CLEAN MESSAGE',
          icon: ShieldCheck,
          iconColor: 'text-emerald-400',
          barColor: 'bg-gradient-to-r from-teal-400 to-emerald-500',
          badgeText: language === 'gu' ? 'સુરક્ષિત' : 'SAFE',
          badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
        };
    }
  };

  const riskStyles = getRiskBadgeStyles();
  const RiskIcon = riskStyles.icon;

  return (
    <div className="space-y-8">
      {/* Top Banner Header */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 border border-slate-800 p-6 sm:p-8 shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 text-xs font-mono font-semibold">
              <Smartphone className="w-3.5 h-3.5 text-cyan-400" />
              <span>
                {language === 'gu' ? 'વાસ્તવિક હેયુરિસ્ટિક મેસેજ ડિફેન્સ એન્જિન' : 'Real-Time Heuristic Message Defense Engine'}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
              <MessageSquareWarning className="w-7 h-7 text-cyan-400" />
              <span>
                {language === 'gu' ? 'SMS, WhatsApp & મેસેજ ફ્રોડ ડિટેક્ટર' : 'SMS, WhatsApp & Message Fraud Detector'}
              </span>
            </h1>

            <p className="text-slate-300 text-sm leading-relaxed">
              {language === 'gu'
                ? 'તમારા મોબાઈલ, લેપટોપ કે કમ્પ્યુટર પર આવેલો કોઈપણ શંકાસ્પદ મેસેજ (લાઈટ બિલ, બેંક KYC, KBC લોટરી, જોબ ઓફર) અહીં પેસ્ટ કરીને તરત જ ચેક કરો કે તે અસલી છે કે ફેક સ્કેમ.'
                : 'Paste or type any incoming SMS, WhatsApp notification, or email received on your phone, laptop, or PC to analyze deceptive links, social engineering urgency, APK Trojans, and bank phishing traps.'}
            </p>
          </div>

          <div className="flex md:flex-col items-center justify-between md:items-end gap-3 shrink-0">
            <div className="px-4 py-2 rounded-xl bg-slate-900/90 border border-slate-800 text-right">
              <span className="text-[10px] font-mono text-slate-500 uppercase block">
                {language === 'gu' ? 'કુલ સ્કેન થયેલ' : 'Scans Audited'}
              </span>
              <span className="text-2xl font-mono font-bold text-cyan-400">
                {stats.messageScans}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick 1-Click Real Presets */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span>
              {language === 'gu' ? 'પ્રચલિત સ્કેમ ઉદાહરણો પર ક્લિક કરીને ટેસ્ટ કરો:' : 'Click to Test Real-Life Smishing & Scam Samples:'}
            </span>
          </h3>
          <span className="text-xs text-slate-500 font-mono hidden sm:inline">
            {language === 'gu' ? '૭ વાસ્તવિક દૃશ્યો' : '7 Live Presets'}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
          {PRESET_SAMPLES.map((sample) => {
            const Icon = sample.icon;
            const isSelected = inputMessage.trim() === sample.text.trim();

            return (
              <button
                key={sample.id}
                onClick={() => handleSelectPreset(sample)}
                className={`p-3 rounded-xl border text-left transition-all flex flex-col justify-between gap-2 group ${
                  isSelected
                    ? 'bg-slate-900 border-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.2)] ring-1 ring-cyan-400'
                    : 'bg-slate-900/60 hover:bg-slate-900 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-start justify-between gap-2 w-full">
                  <div className={`p-1.5 rounded-lg border ${sample.color}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 border border-slate-700">
                    {sample.badge[language]}
                  </span>
                </div>

                <div>
                  <h4 className="text-xs font-bold text-slate-200 group-hover:text-cyan-300 transition-colors">
                    {sample.label[language]}
                  </h4>
                  <p className="text-[11px] text-slate-400 line-clamp-2 mt-1 leading-snug">
                    {sample.text}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Interactive Input Console */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800/80 pb-3">
          <label className="text-sm font-semibold text-white flex items-center gap-2">
            <Send className="w-4 h-4 text-cyan-400" />
            <span>
              {language === 'gu' ? 'મેસેજનું લખાણ અહીં પેસ્ટ કરો અથવા લખો:' : 'Paste or Type Incoming Message Below:'}
            </span>
          </label>

          <div className="flex items-center gap-2 flex-wrap">
            {pasteNotice && (
              <span className="text-xs text-cyan-400 font-mono animate-pulse bg-cyan-950/80 px-2 py-1 rounded border border-cyan-500/40">
                {pasteNotice}
              </span>
            )}
            <button
              onClick={handlePasteClipboard}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 hover:text-white text-xs font-medium flex items-center gap-1.5 transition-all"
              title="Paste from clipboard"
            >
              <Copy className="w-3.5 h-3.5 text-cyan-400" />
              <span>{language === 'gu' ? 'ક્લિપબોર્ડ પેસ્ટ' : 'Paste Clipboard'}</span>
            </button>

            {inputMessage && (
              <button
                onClick={handleClear}
                className="px-3 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 text-slate-400 hover:text-slate-200 text-xs font-medium flex items-center gap-1.5 transition-all"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>{language === 'gu' ? 'સાફ કરો' : 'Clear'}</span>
              </button>
            )}
          </div>
        </div>

        {/* Text Area */}
        <div className="relative">
          <textarea
            rows={5}
            value={inputMessage}
            onChange={(e) => {
              setInputMessage(e.target.value);
              if (e.target.value.trim().length > 5) {
                const res = analyzeMessageFraud(e.target.value);
                setAnalysis(res);
                setHasScanned(true);
              }
            }}
            placeholder={
              language === 'gu'
                ? 'તમારા ફોનમાં કે કમ્પ્યુટરમાં આવેલો SMS, WhatsApp કે ઈમેઈલ મેસેજ અહીં પેસ્ટ કરો (જેમ કે: "Dear customer your power will be disconnected...")...'
                : 'Paste incoming SMS, WhatsApp message, email, or chat notification here (e.g., "Dear customer, your electricity power will be disconnected tonight...")...'
            }
            className="w-full bg-slate-950/90 border border-slate-800 rounded-xl p-4 text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 text-sm font-sans leading-relaxed transition-all resize-y min-h-[120px]"
          />

          <div className="flex items-center justify-between mt-2 text-xs font-mono text-slate-500 px-1">
            <span>
              {analysis.charCount} {language === 'gu' ? 'અક્ષરો' : 'chars'} • {analysis.wordCount} {language === 'gu' ? 'શબ્દો' : 'words'}
            </span>
            <span className="text-slate-500">
              {language === 'gu' ? '૧૦૦% ક્લાયન્ટ-સાઇડ સુરક્ષિત વિશ્લેષણ' : '100% Client-Side Private Analysis'}
            </span>
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-2">
          <button
            onClick={() => handleAnalyze()}
            disabled={!inputMessage.trim()}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-600 to-teal-600 hover:from-cyan-500 hover:to-teal-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-lg shadow-cyan-950/50 transition-all border border-cyan-400/30"
          >
            <ShieldAlert className="w-4 h-4 text-cyan-200" />
            <span>
              {language === 'gu' ? 'હમણાં જ ફ્રોડ અને સ્કેમ ચેક કરો' : 'Scan Message for Threats & Fraud'}
            </span>
          </button>
        </div>
      </div>

      {/* Analysis Results View */}
      {hasScanned && analysis.wordCount > 0 && (
        <div className="space-y-6 animate-fadeIn">
          {/* Risk Level Banner */}
          <div className={`p-6 sm:p-7 rounded-2xl border ${riskStyles.bg} shadow-2xl relative overflow-hidden space-y-5`}>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-2xl bg-slate-950/70 border border-slate-800/80 ${riskStyles.iconColor} shrink-0`}>
                  <RiskIcon className="w-8 h-8" />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className={`text-[11px] font-mono font-bold uppercase px-2.5 py-0.5 rounded-full border ${riskStyles.badgeColor}`}>
                      {riskStyles.badgeText}
                    </span>
                    <span className="text-xs font-mono text-slate-400">
                      {analysis.categoryTitle[language]}
                    </span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                    {riskStyles.title}
                  </h2>
                </div>
              </div>

              {/* Gauge Metric */}
              <div className="bg-slate-950/80 border border-slate-800 p-4 rounded-xl text-center sm:text-right shrink-0 min-w-[140px]">
                <span className="text-[10px] font-mono text-slate-400 uppercase block">
                  {language === 'gu' ? 'જોખમ ગુણાંક' : 'Threat Level Score'}
                </span>
                <div className="text-3xl font-mono font-extrabold text-white flex items-center justify-center sm:justify-end gap-1">
                  <span className={analysis.riskLevel === 'DANGEROUS' ? 'text-red-400' : analysis.riskLevel === 'SUSPICIOUS' ? 'text-amber-400' : 'text-emerald-400'}>
                    {analysis.riskScore}%
                  </span>
                </div>
                <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden mt-2">
                  <div 
                    className={`h-full rounded-full transition-all duration-700 ${riskStyles.barColor}`}
                    style={{ width: `${analysis.riskScore}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Plain English & Gujarati Summary */}
            <div className="bg-slate-950/60 border border-slate-800/70 rounded-xl p-4 text-sm text-slate-200 leading-relaxed">
              <p className="font-medium">
                {analysis.summary[language]}
              </p>
            </div>
          </div>

          {/* Forensic Evidence Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Extracted Links */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 space-y-2">
              <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                <span className="flex items-center gap-1.5 font-bold uppercase text-cyan-400">
                  <ExternalLink className="w-3.5 h-3.5" />
                  {language === 'gu' ? 'લિંક્સ / URL' : 'Embedded URLs'}
                </span>
                <span className="bg-slate-800 px-2 py-0.5 rounded text-white font-bold">
                  {analysis.extractedUrls.length}
                </span>
              </div>
              {analysis.extractedUrls.length > 0 ? (
                <div className="space-y-1.5 pt-1">
                  {analysis.extractedUrls.map((u, idx) => (
                    <div key={idx} className="bg-slate-950/70 p-2 rounded-lg border border-slate-800 text-[11px] font-mono break-all space-y-1">
                      <div className="text-cyan-300 truncate">{u.url}</div>
                      <div className="flex gap-1 flex-wrap">
                        {u.isShortener && <span className="bg-amber-950 text-amber-300 text-[9px] px-1.5 py-0.5 rounded border border-amber-800">Shortener</span>}
                        {u.isIpAddress && <span className="bg-red-950 text-red-300 text-[9px] px-1.5 py-0.5 rounded border border-red-800">Raw IP</span>}
                        {u.isSuspiciousTld && <span className="bg-red-950 text-red-300 text-[9px] px-1.5 py-0.5 rounded border border-red-800">Risky TLD</span>}
                        {u.hasApkDownload && <span className="bg-rose-950 text-rose-300 text-[9px] px-1.5 py-0.5 rounded border border-rose-800">APK File</span>}
                        {u.isSpoofedBrand && <span className="bg-rose-950 text-rose-300 text-[9px] px-1.5 py-0.5 rounded border border-rose-800">Brand Spoof</span>}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-slate-500 italic pt-1">
                  {language === 'gu' ? 'કોઈ વેબ લિંક્સ મળી નથી.' : 'No external URLs found.'}
                </p>
              )}
            </div>

            {/* Extracted Phone Numbers */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 space-y-2">
              <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                <span className="flex items-center gap-1.5 font-bold uppercase text-cyan-400">
                  <PhoneCall className="w-3.5 h-3.5" />
                  {language === 'gu' ? 'ફોન નંબર્સ' : 'Phone Numbers'}
                </span>
                <span className="bg-slate-800 px-2 py-0.5 rounded text-white font-bold">
                  {analysis.extractedPhones.length}
                </span>
              </div>
              {analysis.extractedPhones.length > 0 ? (
                <div className="space-y-1.5 pt-1">
                  {analysis.extractedPhones.map((phone, idx) => (
                    <div key={idx} className="bg-slate-950/70 p-2 rounded-lg border border-slate-800 text-[11px] font-mono text-amber-300 flex items-center justify-between">
                      <span>{phone}</span>
                      <span className="text-[10px] text-slate-500">{language === 'gu' ? 'અચકાસો' : 'Unverified'}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-slate-500 italic pt-1">
                  {language === 'gu' ? 'કોઈ નંબર મળ્યો નથી.' : 'No phone numbers identified.'}
                </p>
              )}
            </div>

            {/* Urgency & Panic Triggers */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 space-y-2">
              <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                <span className="flex items-center gap-1.5 font-bold uppercase text-amber-400">
                  <Zap className="w-3.5 h-3.5" />
                  {language === 'gu' ? 'માનસિક ઉતાવળ / ડર' : 'Urgency Triggers'}
                </span>
                <span className="bg-slate-800 px-2 py-0.5 rounded text-white font-bold">
                  {analysis.detectedUrgencyWords.length}
                </span>
              </div>
              {analysis.detectedUrgencyWords.length > 0 ? (
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {analysis.detectedUrgencyWords.map((word, idx) => (
                    <span key={idx} className="bg-amber-950/60 border border-amber-800/80 text-amber-300 text-[10px] font-mono px-2 py-0.5 rounded">
                      {word}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-slate-500 italic pt-1">
                  {language === 'gu' ? 'કોઈ ઉતાવળ કે ધમકી નથી.' : 'No urgent threats detected.'}
                </p>
              )}
            </div>

            {/* Credential / Remote Access Threats */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 space-y-2">
              <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                <span className="flex items-center gap-1.5 font-bold uppercase text-rose-400">
                  <Lock className="w-3.5 h-3.5" />
                  {language === 'gu' ? 'ખાનગી ડેટા / APK' : 'Credentials & APK'}
                </span>
                <span className="bg-slate-800 px-2 py-0.5 rounded text-white font-bold">
                  {analysis.detectedCredentialWords.length + analysis.detectedRemoteApps.length}
                </span>
              </div>
              {analysis.detectedCredentialWords.length > 0 || analysis.detectedRemoteApps.length > 0 ? (
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {analysis.detectedCredentialWords.map((word, idx) => (
                    <span key={idx} className="bg-rose-950/60 border border-rose-800/80 text-rose-300 text-[10px] font-mono px-2 py-0.5 rounded">
                      {word}
                    </span>
                  ))}
                  {analysis.detectedRemoteApps.map((tool, idx) => (
                    <span key={idx} className="bg-red-950/80 border border-red-700 text-red-200 text-[10px] font-mono px-2 py-0.5 rounded font-bold">
                      {tool}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-slate-500 italic pt-1">
                  {language === 'gu' ? 'કોઈ OTP કે એપ ચોરીની માગણી નથી.' : 'No credential requests found.'}
                </p>
              )}
            </div>
          </div>

          {/* Heuristic Rules Audit Table */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Shield className="w-4 h-4 text-cyan-400" />
                <span>
                  {language === 'gu' ? 'સાયબર ડિફેન્સ હેયુરિસ્ટિક રૂલ્સ ચકાસણી:' : 'Cyber Defense Heuristic Rule Breakdown:'}
                </span>
              </h3>
              <span className="text-xs font-mono text-slate-400">
                {analysis.heuristicRules.filter(r => r.triggered).length} / {analysis.heuristicRules.length} {language === 'gu' ? 'નિયમો સક્રિય' : 'Rules Triggered'}
              </span>
            </div>

            <div className="space-y-3">
              {analysis.heuristicRules.map((rule) => {
                return (
                  <div
                    key={rule.id}
                    className={`p-4 rounded-xl border transition-all ${
                      rule.triggered && rule.riskScore > 0
                        ? 'bg-slate-950/90 border-red-900/40 shadow-[0_0_10px_rgba(239,68,68,0.05)]'
                        : rule.triggered && rule.riskScore < 0
                        ? 'bg-emerald-950/30 border-emerald-800/40'
                        : 'bg-slate-950/40 border-slate-800/60'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="flex items-center gap-2.5">
                        {rule.triggered && rule.riskScore > 0 ? (
                          <XCircle className="w-4 h-4 text-rose-400 shrink-0" />
                        ) : (
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                        )}
                        <h4 className="text-sm font-bold text-slate-200">
                          {rule.name[language]}
                        </h4>
                      </div>

                      <div className="flex items-center gap-2">
                        {rule.evidence && (
                          <span className="text-[10px] font-mono text-slate-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800 truncate max-w-[200px]">
                            {rule.evidence}
                          </span>
                        )}
                        <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold ${
                          rule.triggered && rule.riskScore > 0
                            ? 'bg-red-500/20 text-red-300 border border-red-500/30'
                            : rule.triggered && rule.riskScore < 0
                            ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                            : 'bg-slate-800 text-slate-400'
                        }`}>
                          {rule.riskScore > 0 ? `+${rule.riskScore} Risk` : rule.riskScore < 0 ? `${rule.riskScore} Mitigation` : '0 Safe'}
                        </span>
                      </div>
                    </div>

                    <p className="text-xs text-slate-400 mt-2 leading-relaxed pl-6">
                      {rule.explanation[language]}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Action Protocol Checklist */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xl space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-cyan-400" />
              <span>
                {language === 'gu' ? 'તમારે શું પગલાં લેવા જોઈએ? (સુરક્ષા માર્ગદર્શિકા)' : 'Immediate Action Protocol (Recommended Steps):'}
              </span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {analysis.actionAdvice[language].map((step, idx) => (
                <div key={idx} className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-950/70 border border-slate-800">
                  <div className="w-5 h-5 rounded-full bg-cyan-950 border border-cyan-500/40 text-cyan-400 flex items-center justify-center text-[10px] font-mono font-bold shrink-0 mt-0.5">
                    {idx + 1}
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {step}
                  </p>
                </div>
              ))}
            </div>

            {/* National Helpline Callout */}
            <div className="mt-4 p-4 rounded-xl bg-gradient-to-r from-cyan-950/80 via-slate-950 to-blue-950/80 border border-cyan-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="space-y-1 text-center sm:text-left">
                <span className="text-xs font-bold text-white flex items-center gap-1.5 justify-center sm:justify-start">
                  <PhoneCall className="w-3.5 h-3.5 text-cyan-400" />
                  {language === 'gu' ? 'ભારત સરકાર રાષ્ટ્રીય સાયબર ક્રાઈમ હેલ્પલાઇન:' : 'Govt of India National Cyber Crime Helpline:'}
                </span>
                <p className="text-[11px] text-slate-400">
                  {language === 'gu'
                    ? 'કોઈપણ ઓનલાઇન નાણાકીય છેતરપિંડી થાય ત્યારે ૨૪ કલાકમાં તુરંત સંપર્ક કરો.'
                    : 'Report online financial frauds immediately within 24 hours to freeze suspicious accounts.'}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href="tel:1930"
                  className="px-4 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs font-mono transition-all flex items-center gap-1.5 shadow-lg shadow-cyan-500/20"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>Call 1930</span>
                </a>
                <a
                  href="https://cybercrime.gov.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700 transition-all flex items-center gap-1.5"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>cybercrime.gov.in</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
