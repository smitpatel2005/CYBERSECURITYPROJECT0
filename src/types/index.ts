export type AppModule = 
  | 'dashboard'
  | 'url-inspector'
  | 'password-checker'
  | 'hardware-learning';

export type Language = 'en' | 'gu';

export type HardwareCategory = 
  | 'all'
  | 'internal'
  | 'storage'
  | 'input'
  | 'output'
  | 'power'
  | 'case';

export interface DeviceTypeItem {
  name: { en: string; gu: string };
  description: { en: string; gu: string };
}

export interface HardwareComparison {
  title: { en: string; gu: string };
  target: string;
  comparisonText: { en: string; gu: string };
  points: { feature: { en: string; gu: string }; deviceA: { en: string; gu: string }; deviceB: { en: string; gu: string } }[];
}

export interface HardwareDevice {
  id: string;
  name: { en: string; gu: string };
  fullForm?: { en: string; gu: string };
  category: ('internal' | 'storage' | 'input' | 'output' | 'power' | 'case')[];
  image: string;
  fallbackSvgType: 'ram' | 'hdd' | 'ssd' | 'motherboard' | 'smps' | 'cpu' | 'processor' | 'monitor' | 'mouse' | 'keyboard' | 'cabinet';
  shortDefinition: { en: string; gu: string };
  whatItDoes: { en: string; gu: string };
  whyItMatters: { en: string; gu: string };
  howItWorks: { en: string; gu: string };
  types: DeviceTypeItem[];
  commonUses: { en: string[]; gu: string[] };
  realLifeAnalogy: { en: string; gu: string };
  rememberThis: { en: string; gu: string };
  didYouKnow: { en: string; gu: string };
  advantages: { en: string[]; gu: string[] };
  limitations: { en: string[]; gu: string[] };
  relationshipNote?: { en: string; gu: string };
  comparisons?: HardwareComparison[];
}

export interface PresenterInfo {
  name: string;
  rollNo: string;
  institution: string;
  mentor: string;
  department: string;
}

export interface AppState {
  activeModule: AppModule;
  exhibitionMode: boolean;
  exhibitionStep: number;
  theme: 'dark' | 'light';
  passwordAuditsCount: number;
  urlInspectionsCount: number;
  presenterInfo: PresenterInfo;
}

// URL Safety Heuristic
export interface UrlAnalysisResult {
  url: string;
  protocol: string;
  hostname: string;
  path: string;
  isHttps: boolean;
  isIpAddress: boolean;
  subdomainCount: number;
  suspiciousKeywords: string[];
  typosquattingSuspected: boolean;
  isShortener: boolean;
  riskScore: number; // 0 (low) to 100 (high risk)
  verdict: 'Relatively Clean' | 'Potential Risk' | 'High Risk';
  heuristicChecks: {
    rule: string;
    passed: boolean;
    explanation: string;
  }[];
  disclaimer: string;
}

// Password Checker
export interface PasswordAnalysis {
  length: number;
  hasLower: boolean;
  hasUpper: boolean;
  hasDigits: boolean;
  hasSymbols: boolean;
  isCommonPattern: boolean;
  hasRepeatingChars: boolean;
  hasSequentialNumbers: boolean;
  entropyBits: number;
  score: 0 | 1 | 2 | 3 | 4; // 0: Very Weak, 1: Weak, 2: Moderate, 3: Strong, 4: Hardened
  ratingLabel: 'Very Weak' | 'Weak' | 'Moderate' | 'Strong' | 'Hardened Passphrase';
  timeToCrack: string;
  suggestions: string[];
  positivePoints: string[];
}
