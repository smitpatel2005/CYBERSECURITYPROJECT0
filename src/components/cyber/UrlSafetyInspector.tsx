import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { UrlAnalysisResult } from '../../types';
import { 
  Globe, 
  AlertTriangle, 
  CheckCircle2, 
  ShieldAlert, 
  ShieldCheck, 
  Info,
  ArrowRight,
  RotateCcw
} from 'lucide-react';

export const UrlSafetyInspector: React.FC = () => {
  const { incrementUrlInspections } = useApp();
  const [inputUrl, setInputUrl] = useState<string>('');
  const [result, setResult] = useState<UrlAnalysisResult | null>(null);

  const sampleUrls = [
    { label: 'Deceptive Bank Login', url: 'http://state-bankk-secure-alert.com/login-verify?user=8942' },
    { label: 'Subdomain Phish', url: 'https://iant-portal.login-verify-sso.com/auth' },
    { label: 'Raw Malicious IP', url: 'http://192.241.144.89/microsoft-login.html' },
    { label: 'URL Shortener', url: 'https://bit.ly/claim-tax-refund-2026' },
    { label: 'Legitimate College URL', url: 'https://portal.iant.edu.in/students/exhibition' }
  ];

  const analyzeUrl = (urlToTest: string) => {
    let clean = urlToTest.trim();
    if (!clean) return;

    if (!clean.startsWith('http://') && !clean.startsWith('https://')) {
      clean = 'http://' + clean;
    }

    try {
      const parsed = new URL(clean);
      const isHttps = parsed.protocol === 'https:';
      const hostname = parsed.hostname.toLowerCase();
      const path = parsed.pathname.toLowerCase();

      // Checks
      const isIpAddress = /^(\d{1,3}\.){3}\d{1,3}$/.test(hostname);
      
      const parts = hostname.split('.');
      const subdomainCount = parts.length > 2 ? parts.length - 2 : 0;

      const shorteners = ['bit.ly', 'tinyurl.com', 't.co', 'is.gd', 'cutt.ly', 'ow.ly'];
      const isShortener = shorteners.some((s) => hostname.includes(s));

      const brandTypos = ['paypa1', 'g00gle', 'bankk', 'faceb00k', 'micros0ft', 'app1e', 'amaz0n', 'wellsfarg0'];
      const typosquattingSuspected = brandTypos.some((b) => hostname.includes(b));

      const highRiskTlds = ['.xyz', '.top', '.tk', '.biz', '.info', '.work', '.click', '.zip', '.mov'];
      const hasSuspiciousTld = highRiskTlds.some((tld) => hostname.endsWith(tld));

      const suspiciousPathWords = ['login', 'verify', 'update', 'account', 'banking', 'wallet', 'secure', 'password'];
      const foundPathWords = suspiciousPathWords.filter((w) => path.includes(w) || parsed.search.includes(w));

      // Scoring
      let riskScore = 0;
      const heuristicChecks = [];

      // Check 1: HTTPS
      if (isHttps) {
        heuristicChecks.push({
          rule: 'Transport Layer Security (HTTPS)',
          passed: true,
          explanation: 'Connection utilizes TLS encryption. Remember: scammers also use HTTPS!'
        });
      } else {
        riskScore += 30;
        heuristicChecks.push({
          rule: 'Transport Layer Security (HTTPS)',
          passed: false,
          explanation: 'Insecure plaintext HTTP. Data can be sniffed or modified in transit.'
        });
      }

      // Check 2: IP Hostname
      if (isIpAddress) {
        riskScore += 45;
        heuristicChecks.push({
          rule: 'Hostname Format (Domain vs Raw IP)',
          passed: false,
          explanation: 'Uses a raw numeric IP address instead of a registered domain. Common indicator of transient phishing servers.'
        });
      } else {
        heuristicChecks.push({
          rule: 'Hostname Format (Domain vs Raw IP)',
          passed: true,
          explanation: 'Uses a standard domain name format.'
        });
      }

      // Check 3: Subdomain Deception
      if (subdomainCount >= 2) {
        riskScore += 25;
        heuristicChecks.push({
          rule: 'Subdomain Complexity Depth',
          passed: false,
          explanation: `Contains ${subdomainCount} subdomains. Attackers often prepend authentic brand names to fake root domains.`
        });
      } else {
        heuristicChecks.push({
          rule: 'Subdomain Complexity Depth',
          passed: true,
          explanation: 'Normal single or zero subdomain structure.'
        });
      }

      // Check 4: URL Shortener
      if (isShortener) {
        riskScore += 20;
        heuristicChecks.push({
          rule: 'URL Obfuscation / Link Shorteners',
          passed: false,
          explanation: 'Link shortener hides the true destination server. Requires destination expansion before clicking.'
        });
      } else {
        heuristicChecks.push({
          rule: 'URL Obfuscation / Link Shorteners',
          passed: true,
          explanation: 'Direct destination URL without obfuscation services.'
        });
      }

      // Check 5: Typosquatting
      if (typosquattingSuspected) {
        riskScore += 40;
        heuristicChecks.push({
          rule: 'Brand Typosquatting / Character Substitution',
          passed: false,
          explanation: 'Detected deliberate typo-squatted pattern mimicking well-known finance or tech brands.'
        });
      } else {
        heuristicChecks.push({
          rule: 'Brand Typosquatting / Character Substitution',
          passed: true,
          explanation: 'No known common character-substitution patterns detected.'
        });
      }

      // Check 6: Suspicious TLD
      if (hasSuspiciousTld) {
        riskScore += 15;
        heuristicChecks.push({
          rule: 'Top-Level Domain (TLD) Reputation',
          passed: false,
          explanation: 'Uses a discount or high-abuse TLD frequently favored by disposable spam operations.'
        });
      } else {
        heuristicChecks.push({
          rule: 'Top-Level Domain (TLD) Reputation',
          passed: true,
          explanation: 'Standard institutional, commercial, or regional TLD.'
        });
      }

      const clampedScore = Math.min(100, Math.max(0, riskScore));
      let verdict: 'Relatively Clean' | 'Potential Risk' | 'High Risk' = 'Relatively Clean';

      if (clampedScore >= 60) {
        verdict = 'High Risk';
      } else if (clampedScore >= 25) {
        verdict = 'Potential Risk';
      }

      setResult({
        url: clean,
        protocol: parsed.protocol,
        hostname,
        path: parsed.pathname,
        isHttps,
        isIpAddress,
        subdomainCount,
        suspiciousKeywords: foundPathWords,
        typosquattingSuspected,
        isShortener,
        riskScore: clampedScore,
        verdict,
        heuristicChecks,
        disclaimer: 'This local inspection is strictly an educational rule-based heuristic parser. It does NOT query live web servers, download page payloads, or act as an antivirus scanner.'
      });
      incrementUrlInspections();
    } catch {
      alert('Invalid URL syntax. Please enter a valid URL (e.g., https://example.com/login).');
    }
  };

  const handleReset = () => {
    setInputUrl('');
    setResult(null);
  };

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-6 shadow-xl">
      <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
        <div className="p-2.5 rounded-xl bg-cyan-950/80 border border-cyan-500/40 text-cyan-400">
          <Globe className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-white tracking-tight">
            Educational Website Safety & URL Syntax Inspector
          </h3>
          <p className="text-xs text-slate-400">
            Rule-based local heuristics analyzing domain structure, protocol encryption, and deception vectors
          </p>
        </div>
      </div>

      {/* URL Input Form */}
      <div className="space-y-3">
        <label className="text-xs font-mono text-slate-300 block">
          Enter Any Web URL to Inspect:
        </label>
        <div className="flex flex-col sm:flex-row gap-2">
          <input
            type="text"
            value={inputUrl}
            onChange={(e) => setInputUrl(e.target.value)}
            placeholder="e.g. https://state-bankk-secure-alert.com/login?id=8942"
            className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500 font-mono"
          />
          <button
            onClick={() => analyzeUrl(inputUrl)}
            disabled={!inputUrl.trim()}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-semibold text-xs transition-all disabled:opacity-50 flex items-center justify-center gap-2 shrink-0 shadow-lg shadow-cyan-950/40"
          >
            <span>Analyze Syntax</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          {result && (
            <button
              onClick={handleReset}
              className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
              title="Reset URL analyzer"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Sample Pre-loaded URLs */}
        <div className="flex flex-wrap items-center gap-1.5 pt-1">
          <span className="text-[11px] font-mono text-slate-500">Test Samples:</span>
          {sampleUrls.map((sample, idx) => (
            <button
              key={idx}
              onClick={() => {
                setInputUrl(sample.url);
                analyzeUrl(sample.url);
              }}
              className="text-[11px] px-2.5 py-1 rounded-md bg-slate-800/80 hover:bg-slate-700 text-slate-300 border border-slate-700/60 font-mono transition-colors"
            >
              {sample.label}
            </button>
          ))}
        </div>
      </div>

      {/* Analysis Result Display */}
      {result && (
        <div className="space-y-5 pt-4 border-t border-slate-800 animate-fadeIn">
          {/* Verdict Banner */}
          <div
            className={`p-4 rounded-xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
              result.verdict === 'High Risk'
                ? 'bg-red-950/40 border-red-500/50 text-red-200'
                : result.verdict === 'Potential Risk'
                ? 'bg-amber-950/40 border-amber-500/50 text-amber-200'
                : 'bg-emerald-950/40 border-emerald-500/50 text-emerald-200'
            }`}
          >
            <div className="flex items-center gap-3">
              {result.verdict === 'High Risk' ? (
                <ShieldAlert className="w-8 h-8 text-red-400 shrink-0" />
              ) : result.verdict === 'Potential Risk' ? (
                <AlertTriangle className="w-8 h-8 text-amber-400 shrink-0" />
              ) : (
                <ShieldCheck className="w-8 h-8 text-emerald-400 shrink-0" />
              )}
              <div>
                <span className="text-xs font-mono uppercase tracking-wider font-bold block">
                  Heuristic Assessment
                </span>
                <h4 className="text-lg font-bold">
                  {result.verdict}: Risk Indicator {result.riskScore}/100
                </h4>
              </div>
            </div>

            <div className="text-xs font-mono bg-slate-950/80 px-3 py-1.5 rounded-lg border border-slate-800">
              Protocol: <span className="text-cyan-400 font-bold">{result.protocol}</span> | Host: <span className="text-slate-300 font-bold">{result.hostname}</span>
            </div>
          </div>

          {/* Detailed Rules Checklist */}
          <div className="space-y-2">
            <h5 className="text-xs font-mono uppercase text-slate-400 tracking-wider font-semibold">
              Rule-by-Rule Heuristic Inspection:
            </h5>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {result.heuristicChecks.map((check, idx) => (
                <div
                  key={idx}
                  className={`p-3 rounded-xl border text-xs space-y-1 ${
                    check.passed
                      ? 'bg-slate-900/60 border-slate-800 text-slate-300'
                      : 'bg-red-950/20 border-red-500/30 text-red-200'
                  }`}
                >
                  <div className="flex items-center justify-between font-semibold">
                    <span>{check.rule}</span>
                    {check.passed ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <AlertTriangle className="w-4 h-4 text-red-400" />
                    )}
                  </div>
                  <p className="text-[11px] text-slate-400">{check.explanation}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Educational Disclaimer */}
          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-start gap-2.5 text-xs text-slate-400">
            <Info className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
            <p>
              <strong className="text-cyan-300">Technical Note:</strong> {result.disclaimer}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
