import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { PasswordAnalysis } from '../../types';
import { 
  KeyRound, 
  Eye, 
  EyeOff, 
  RotateCcw, 
  ShieldCheck, 
  CheckCircle2, 
  AlertTriangle, 
  Info,
  Sparkles
} from 'lucide-react';

export const PasswordChecker: React.FC = () => {
  const { incrementPasswordAudits } = useApp();
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const samplePasses = [
    { label: 'Weak Dictionary', value: 'password123' },
    { label: 'Short Leet', value: 'P@ssw0rd' },
    { label: 'Complex Short', value: 'K9#vL2' },
    { label: 'Hardened Passphrase', value: 'correct-horse-battery-staple-2026' }
  ];

  const analyzePassword = (pwd: string): PasswordAnalysis => {
    const length = pwd.length;
    const hasLower = /[a-z]/.test(pwd);
    const hasUpper = /[A-Z]/.test(pwd);
    const hasDigits = /[0-9]/.test(pwd);
    const hasSymbols = /[^a-zA-Z0-9]/.test(pwd);

    // Common weak patterns
    const lower = pwd.toLowerCase();
    const commonPatterns = [
      'password', '123456', 'qwerty', 'admin', 'welcome', 'login', 'abc123',
      'iloveyou', 'letmein', 'monkey', 'dragon', 'football', 'master'
    ];
    const isCommonPattern = commonPatterns.some((pat) => lower.includes(pat));

    // Repeating characters (e.g. 'aaaa', '1111')
    const hasRepeatingChars = /(.)\1{2,}/.test(pwd);

    // Sequential numbers (e.g. '123', '789')
    const hasSequentialNumbers = /(012|123|234|345|456|567|678|789)/.test(pwd);

    // Character set size R
    let charsetSize = 0;
    if (hasLower) charsetSize += 26;
    if (hasUpper) charsetSize += 26;
    if (hasDigits) charsetSize += 10;
    if (hasSymbols) charsetSize += 33;

    // Entropy in bits: length * log2(charsetSize)
    const entropyBits = charsetSize > 0 && length > 0
      ? Math.round(length * Math.log2(charsetSize))
      : 0;

    // Scoring logic (0 to 4)
    let score: 0 | 1 | 2 | 3 | 4 = 0;
    const suggestions: string[] = [];
    const positivePoints: string[] = [];

    if (length >= 16) {
      positivePoints.push('Outstanding length (16+ chars provides exponential entropy).');
    } else if (length >= 12) {
      positivePoints.push('Good baseline length (12+ chars).');
    } else if (length > 0) {
      suggestions.push('Increase length to at least 14-16 characters; length beats character complexity.');
    }

    if (hasLower && hasUpper) {
      positivePoints.push('Mix of uppercase and lowercase letters.');
    } else if (length > 0) {
      suggestions.push('Include both uppercase and lowercase characters.');
    }

    if (hasDigits) {
      positivePoints.push('Includes numerical digits.');
    } else if (length > 0) {
      suggestions.push('Add numbers or use multi-word passphrases.');
    }

    if (hasSymbols) {
      positivePoints.push('Includes special punctuation symbols.');
    } else if (length > 0) {
      suggestions.push('Add symbols or hyphens to separate words.');
    }

    if (isCommonPattern) {
      suggestions.push('Contains common dictionary word or keyboard sequence easily cracked by hash dictionaries.');
    }
    if (hasRepeatingChars) {
      suggestions.push('Avoid repetitive character sequences (e.g. "aaa").');
    }
    if (hasSequentialNumbers) {
      suggestions.push('Avoid sequential digits (e.g. "123").');
    }

    // Determine final score tier
    if (length === 0) {
      score = 0;
    } else if (isCommonPattern || length < 7) {
      score = 0;
    } else if (length < 10 || entropyBits < 40) {
      score = 1;
    } else if (length < 14 || entropyBits < 60) {
      score = 2;
    } else if (entropyBits >= 75 && length >= 14 && !hasRepeatingChars) {
      score = 4;
    } else {
      score = 3;
    }

    let ratingLabel: 'Very Weak' | 'Weak' | 'Moderate' | 'Strong' | 'Hardened Passphrase' = 'Very Weak';
    let timeToCrack = 'Instantaneous (under 1 millisecond)';

    switch (score) {
      case 0:
        ratingLabel = 'Very Weak';
        timeToCrack = 'Instantaneous (< 1 second across consumer GPUs)';
        break;
      case 1:
        ratingLabel = 'Weak';
        timeToCrack = 'A few seconds to minutes';
        break;
      case 2:
        ratingLabel = 'Moderate';
        timeToCrack = 'Several hours to a few days';
        break;
      case 3:
        ratingLabel = 'Strong';
        timeToCrack = 'Months to decades';
        break;
      case 4:
        ratingLabel = 'Hardened Passphrase';
        timeToCrack = 'Centuries to billions of years';
        break;
    }

    return {
      length,
      hasLower,
      hasUpper,
      hasDigits,
      hasSymbols,
      isCommonPattern,
      hasRepeatingChars,
      hasSequentialNumbers,
      entropyBits,
      score,
      ratingLabel,
      timeToCrack,
      suggestions,
      positivePoints
    };
  };

  const generatePassphrase = () => {
    const wordList = [
      'quantum', 'circuit', 'firewall', 'shield', 'protocol', 'galaxy',
      'matrix', 'terminal', 'cipher', 'packet', 'router', 'gateway',
      'silicon', 'kernel', 'horizon', 'vector', 'entropy', 'crypto',
      'sensor', 'voltage', 'plasma', 'storage', 'optical', 'beacon',
      'nebula', 'satellite', 'binary', 'cluster', 'cascade', 'orbital'
    ];
    const picked: string[] = [];
    for (let i = 0; i < 4; i++) {
      const idx = Math.floor(Math.random() * wordList.length);
      picked.push(wordList[idx]);
    }
    const randNum = Math.floor(10 + Math.random() * 90);
    setPassword(`${picked.join('-')}-${randNum}`);
    incrementPasswordAudits();
  };

  const analysis = analyzePassword(password);

  const handleReset = () => {
    setPassword('');
  };

  const meterColors = [
    'bg-red-500',
    'bg-orange-500',
    'bg-amber-400',
    'bg-blue-400',
    'bg-emerald-400'
  ];

  return (
    <div className="space-y-6">
      {/* Title Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900/80 border border-slate-800 p-6 rounded-2xl backdrop-blur-md">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-1">
            <KeyRound className="w-4 h-4" />
            <span>MODULE 03 • PASSWORD STRENGTH ANALYZER</span>
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">
            Client-Side Password Entropy & Pattern Checker
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
            Real-time evaluation of information entropy, dictionary collisions, keyboard walks, and brute-force resistance. Operates 100% locally in your browser memory.
          </p>
        </div>

        <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-950 border border-emerald-500/30 text-emerald-400 text-xs font-mono">
          <ShieldCheck className="w-4 h-4" />
          <span>Zero Server Transmission Guarantee</span>
        </div>
      </div>

      {/* Main Checker Container */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-6 shadow-xl">
        {/* Input Field with Show/Hide and Clear */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-xs font-mono text-slate-300 block">
              Test a Candidate Password or Multi-Word Passphrase:
            </label>
            <button
              type="button"
              onClick={generatePassphrase}
              className="text-[11px] px-2.5 py-1 rounded-lg bg-cyan-950 hover:bg-cyan-900 text-cyan-300 border border-cyan-500/40 font-mono transition-colors flex items-center gap-1.5"
            >
              <Sparkles className="w-3 h-3 text-cyan-400" />
              <span>Generate 4-Word Passphrase</span>
            </button>
          </div>
          <div className="relative flex items-center">
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Type or paste any password to inspect entropy..."
              autoComplete="off"
              spellCheck="false"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 pr-24 text-sm sm:text-base text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500 font-mono tracking-wider"
            />
            <div className="absolute right-2 flex items-center gap-1">
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="p-2 text-slate-400 hover:text-white rounded-lg transition-colors"
                title={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
              {password && (
                <button
                  type="button"
                  onClick={handleReset}
                  className="p-2 text-slate-400 hover:text-red-400 rounded-lg transition-colors"
                  title="Clear password input"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Sample Pre-loaded Passwords */}
          <div className="flex flex-wrap items-center gap-1.5 pt-1">
            <span className="text-[11px] font-mono text-slate-500">Test Preset Patterns:</span>
            {samplePasses.map((sp, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setPassword(sp.value)}
                className="text-[11px] px-2.5 py-1 rounded-md bg-slate-800/80 hover:bg-slate-700 text-slate-300 border border-slate-700/60 font-mono transition-colors"
              >
                {sp.label}
              </button>
            ))}
          </div>
        </div>

        {/* Strength Meter & Score */}
        {password.length > 0 && (
          <div className="space-y-4 pt-4 border-t border-slate-800 animate-fadeIn">
            {/* Visual 5-segment meter */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-slate-400">Strength Rating:</span>
                <span className={`font-bold uppercase ${
                  analysis.score === 4 ? 'text-emerald-400' :
                  analysis.score === 3 ? 'text-cyan-400' :
                  analysis.score === 2 ? 'text-amber-400' : 'text-red-400'
                }`}>
                  {analysis.ratingLabel} ({analysis.score} / 4)
                </span>
              </div>

              <div className="grid grid-cols-5 gap-1.5 h-2.5">
                {[0, 1, 2, 3, 4].map((step) => (
                  <div
                    key={step}
                    className={`rounded-full transition-all duration-300 ${
                      step <= analysis.score
                        ? meterColors[analysis.score]
                        : 'bg-slate-800'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-center">
                <span className="text-[10px] font-mono text-slate-500 uppercase block">Length</span>
                <span className="text-base font-mono font-bold text-white">{analysis.length} chars</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-center">
                <span className="text-[10px] font-mono text-slate-500 uppercase block">Entropy</span>
                <span className="text-base font-mono font-bold text-cyan-400">{analysis.entropyBits} bits</span>
              </div>
              <div className="col-span-2 p-3 rounded-xl bg-slate-950 border border-slate-800 flex flex-col justify-center">
                <span className="text-[10px] font-mono text-slate-500 uppercase block">Offline GPU Crack Resistance</span>
                <span className="text-xs font-mono font-bold text-slate-200 truncate">{analysis.timeToCrack}</span>
              </div>
            </div>

            {/* Character Diversity Checklist */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="text-[11px] font-mono text-slate-400 uppercase font-semibold block">
                Character Diversity Indicators:
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                <div className={`flex items-center gap-2 p-2 rounded-lg border ${analysis.hasLower ? 'border-emerald-500/40 text-emerald-300 bg-emerald-950/20' : 'border-slate-800 text-slate-500'}`}>
                  {analysis.hasLower ? <CheckCircle2 className="w-3.5 h-3.5" /> : <AlertTriangle className="w-3.5 h-3.5" />}
                  <span>Lowercase (a-z)</span>
                </div>
                <div className={`flex items-center gap-2 p-2 rounded-lg border ${analysis.hasUpper ? 'border-emerald-500/40 text-emerald-300 bg-emerald-950/20' : 'border-slate-800 text-slate-500'}`}>
                  {analysis.hasUpper ? <CheckCircle2 className="w-3.5 h-3.5" /> : <AlertTriangle className="w-3.5 h-3.5" />}
                  <span>Uppercase (A-Z)</span>
                </div>
                <div className={`flex items-center gap-2 p-2 rounded-lg border ${analysis.hasDigits ? 'border-emerald-500/40 text-emerald-300 bg-emerald-950/20' : 'border-slate-800 text-slate-500'}`}>
                  {analysis.hasDigits ? <CheckCircle2 className="w-3.5 h-3.5" /> : <AlertTriangle className="w-3.5 h-3.5" />}
                  <span>Digits (0-9)</span>
                </div>
                <div className={`flex items-center gap-2 p-2 rounded-lg border ${analysis.hasSymbols ? 'border-emerald-500/40 text-emerald-300 bg-emerald-950/20' : 'border-slate-800 text-slate-500'}`}>
                  {analysis.hasSymbols ? <CheckCircle2 className="w-3.5 h-3.5" /> : <AlertTriangle className="w-3.5 h-3.5" />}
                  <span>Symbols (!@#)</span>
                </div>
              </div>
            </div>

            {/* Actionable Feedback & Suggestions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {analysis.suggestions.length > 0 && (
                <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-500/30 space-y-2 text-xs">
                  <span className="font-bold text-amber-300 flex items-center gap-1.5 font-mono uppercase">
                    <AlertTriangle className="w-4 h-4" />
                    <span>Improvement Recommendations:</span>
                  </span>
                  <ul className="space-y-1.5 text-slate-300">
                    {analysis.suggestions.map((sug, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                        <span>{sug}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {analysis.positivePoints.length > 0 && (
                <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/30 space-y-2 text-xs">
                  <span className="font-bold text-emerald-300 flex items-center gap-1.5 font-mono uppercase">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Strong Attributes:</span>
                  </span>
                  <ul className="space-y-1.5 text-slate-300">
                    {analysis.positivePoints.map((pt, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Educational Lesson: Why Passphrases Beat Short Complex Passwords */}
        <div className="p-5 rounded-2xl bg-gradient-to-r from-slate-950 to-slate-900 border border-cyan-500/30 space-y-3 text-xs text-slate-300">
          <div className="flex items-center gap-2 text-cyan-400 font-bold uppercase font-mono">
            <Sparkles className="w-4 h-4" />
            <span>Cryptographic Insight: The Passphrase Advantage</span>
          </div>
          <p className="leading-relaxed">
            Many users struggle to remember short, painful passwords like <code className="bg-slate-900 px-1.5 py-0.5 rounded text-amber-300">P@ssw0rd!</code> which hash cracking clusters (Hashcat/John the Ripper) can breach in minutes using pre-computed rainbow tables and leetspeak rules.
          </p>
          <p className="leading-relaxed">
            By contrast, a 4-word random diceware passphrase like <code className="bg-slate-900 px-1.5 py-0.5 rounded text-cyan-300">solar-granite-orbital-lantern</code> provides over <strong>77 bits of pure entropy</strong>. It is effortless for a human to memorize, yet impossible for a supercomputer to brute-force within human lifetimes.
          </p>
          <div className="pt-2 border-t border-slate-800 text-[11px] text-slate-400 flex items-center gap-2">
            <Info className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
            <span>This educational checker cannot guarantee immunity against malware keyloggers or breached password databases.</span>
          </div>
        </div>
      </div>
    </div>
  );
};
