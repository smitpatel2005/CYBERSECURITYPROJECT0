import type { 
  MessageFraudAnalysis, 
  MessageRiskLevel, 
  ScamCategory, 
  ExtractedUrlInfo, 
  MessageHeuristicRule 
} from '../types';

// High risk TLD list
const SUSPICIOUS_TLDS = [
  '.xyz', '.top', '.tk', '.ml', '.ga', '.cf', '.gq', '.club', 
  '.vip', '.site', '.online', '.work', '.click', '.zip', '.mov', 
  '.icu', '.cc', '.ru', '.biz', '.link'
];

// Known URL shorteners that obscure destinations
const URL_SHORTENERS = [
  'bit.ly', 'tinyurl.com', 't.co', 'cutt.ly', 'is.gd', 'rb.gy', 
  'shorturl.at', 'ow.ly', 'buff.ly', 'tiny.cc', 'bl.ink'
];

// Targeted brands commonly spoofed in SMS/WhatsApp smishing
const TARGETED_BRANDS = [
  'sbi', 'hdfc', 'icici', 'axis', 'pnb', 'bank', 'paytm', 'phonepe', 
  'gpay', 'electricity', 'ugvcl', 'pgvcl', 'mgvcl', 'dgycl', 'tatapower',
  'netflix', 'amazon', 'flipkart', 'indapost', 'indiapost', 'fedex', 
  'bluedart', 'whatsapp', 'telegram', 'kbc'
];

// Remote access & malware tools
const REMOTE_ACCESS_TOOLS = [
  'anydesk', 'teamviewer', 'quicksupport', 'rustdesk', 'zoho assist', 
  'airdroid', 'screen share', 'remote desktop', 'apk'
];

// Urgency words in English, Gujarati and Hinglish
const URGENCY_PATTERNS = [
  { term: 'immediately', label: 'Immediately / તત્કાલ' },
  { term: 'urgent', label: 'Urgent Action / તાકીદ' },
  { term: 'tonight', label: 'Tonight deadline / આજે રાત્રે' },
  { term: 'within 24 hours', label: 'Within 24 hours / ૨૪ કલાકમાં' },
  { term: 'within 2 hrs', label: 'Within 2 hours / ૨ કલાકમાં' },
  { term: 'disconnected', label: 'Power disconnection / વીજળી કટ' },
  { term: 'electric power will be disconnected', label: 'Electricity cutoff threat' },
  { term: 'light bill', label: 'Light bill warning' },
  { term: 'bill unpaid', label: 'Unpaid bill threat' },
  { term: 'blocked', label: 'Account blocked / ખાતું બ્લોક' },
  { term: 'suspended', label: 'Suspended / સસ્પેન્ડ' },
  { term: 'deactivated', label: 'Deactivated / ડિએક્ટિવેટ' },
  { term: 'arrest', label: 'Arrest warrant / ધરપકડ' },
  { term: 'legal action', label: 'Legal action / કોર્ટ કાર્યવાહી' },
  { term: 'police', label: 'Police complaint / પોલીસ' },
  { term: 'last warning', label: 'Last warning / આખરી ચેતવણી' },
  { term: 'penalty', label: 'Penalty / દંડ' },
  { term: 'fine of', label: 'Fine / ચલણ' },
  { term: 'આજે રાત્રે', label: 'આજે રાત્રે લાઈન કપાશે' },
  { term: 'તરત જ', label: 'તરત જ સંપર્ક કરો' },
  { term: 'વીજળી કાપી', label: 'વીજળી કાપી નાખવામાં આવશે' },
  { term: 'ખાતું બ્લોક', label: 'ખાતું બ્લોક થઈ જશે' },
  { term: 'બંધ થઈ જશે', label: 'સર્વિસ બંધ થઈ જશે' },
  { term: 'દંડ', label: 'દંડ વસૂલવામાં આવશે' },
  { term: 'tarat', label: 'Tarat call karo' },
  { term: 'kapai jashe', label: 'Line kapai jashe' }
];

// Sensitive credential requests
const CREDENTIAL_PATTERNS = [
  { term: 'otp', label: 'OTP (One Time Password)' },
  { term: 'one time password', label: 'One Time Password' },
  { term: 'cvv', label: 'CVV / Security Code' },
  { term: 'atm pin', label: 'ATM PIN' },
  { term: 'upi pin', label: 'UPI PIN' },
  { term: 'net banking password', label: 'Net Banking Password' },
  { term: 'kyc', label: 'KYC Update / કેવાયસી' },
  { term: 'pan card', label: 'PAN Card Linking' },
  { term: 'pan link', label: 'PAN Link deadline' },
  { term: 'aadhaar', label: 'Aadhaar Verification' },
  { term: 'verify identity', label: 'Identity Verification' },
  { term: 'share otp', label: 'Requesting OTP share' },
  { term: 'send otp', label: 'Asking to send OTP' },
  { term: 'enter pin', label: 'Asking to enter UPI PIN' },
  { term: 'કેવાયસી', label: 'કેવાયસી અપડેટ' },
  { term: 'ઓટીપી', label: 'ઓટીપી આપો' },
  { term: 'પીન', label: 'પીન દાખલ કરો' }
];

// Financial & lottery lures
const FINANCIAL_PATTERNS = [
  { term: 'won', label: 'Won money / ઈનામ જીત્યા' },
  { term: 'winner', label: 'Lucky winner' },
  { term: 'lottery', label: 'Lottery claim' },
  { term: 'kbc', label: 'KBC Lottery Scam' },
  { term: 'kaun banega crorepati', label: 'Kaun Banega Crorepati' },
  { term: 'cash prize', label: 'Cash Prize / રોકડ ઈનામ' },
  { term: '25 lakh', label: '25 Lakhs Prize' },
  { term: 'congratulations you have won', label: 'Congratulations prize' },
  { term: 'selected for reward', label: 'Selected for reward' },
  { term: 'part-time job', label: 'Part-Time Job Offer' },
  { term: 'part time job', label: 'Part Time Job' },
  { term: 'work from home', label: 'Work from home scam' },
  { term: 'earn rs', label: 'Earn daily cash' },
  { term: 'earn 3000', label: 'Earn high daily wage' },
  { term: 'earn 5000', label: 'Earn 5000 daily' },
  { term: 'like youtube', label: 'Like YouTube video scam' },
  { term: 'hotel review', label: 'Review hotel task' },
  { term: 'telegram', label: 'Telegram VIP task group' },
  { term: 'double your money', label: 'Investment doubling' },
  { term: 'guaranteed returns', label: 'Guaranteed 100% returns' },
  { term: 'free gift', label: 'Free gift reward' },
  { term: 'free recharge', label: 'Free mobile recharge' },
  { term: 'ઘેર બેઠા કમાવો', label: 'ઘેર બેઠા પૈસા કમાવો' },
  { term: 'ઈનામ લાગ્યું', label: 'ઈનામ લાગ્યું' },
  { term: 'લોટરી', label: 'લોટરી લાગી' }
];

// Courier scam patterns
const COURIER_PATTERNS = [
  { term: 'india post', label: 'India Post parcel' },
  { term: 'courier', label: 'Courier delivery' },
  { term: 'parcel', label: 'Package / Parcel' },
  { term: 'delivery failed', label: 'Delivery failed attempt' },
  { term: 'incorrect address', label: 'Incorrect delivery address' },
  { term: 'update address within', label: 'Update address urgently' },
  { term: 'redelivery fee', label: 'Redelivery nominal charge' },
  { term: 'customs fee', label: 'Customs charge' }
];

// Safe indicators (Authentic bank safety markers)
const SAFE_MARKERS = [
  'never share this otp',
  'do not share this otp',
  'never share your otp',
  'bank never asks for otp',
  'bank never calls to ask',
  'do not disclose',
  'if this was not you',
  'if not requested by you',
  'valid for 10 minutes',
  'valid for 5 minutes',
  'never share with anyone, including bank officials'
];

/**
 * Extracts URLs and examines their domain heuristics
 */
export function extractAndAnalyzeUrls(text: string): ExtractedUrlInfo[] {
  const urlRegex = /(https?:\/\/[^\s]+)|(\b[a-zA-Z0-9.-]+\.(?:com|org|net|in|info|xyz|top|site|club|vip|online|work|click|zip|mov|icu|cc|ru|biz|link|me|tv|app)\b[^\s]*)/gi;
  const matches = text.match(urlRegex) || [];
  const results: ExtractedUrlInfo[] = [];

  for (const raw of matches) {
    let cleanUrl = raw.trim();
    // remove trailing punctuations often caught in SMS
    cleanUrl = cleanUrl.replace(/[.,;!?)]+$/, '');

    let parsedHostname = '';
    try {
      const formatted = cleanUrl.startsWith('http://') || cleanUrl.startsWith('https://') 
        ? cleanUrl 
        : 'http://' + cleanUrl;
      const parsed = new URL(formatted);
      parsedHostname = parsed.hostname.toLowerCase();
    } catch {
      parsedHostname = cleanUrl.toLowerCase().split('/')[0];
    }

    const isIpAddress = /^(\d{1,3}\.){3}\d{1,3}$/.test(parsedHostname);
    const isShortener = URL_SHORTENERS.some((s) => parsedHostname.includes(s));
    const isSuspiciousTld = SUSPICIOUS_TLDS.some((tld) => parsedHostname.endsWith(tld));
    const hasApkDownload = cleanUrl.toLowerCase().includes('.apk') || text.toLowerCase().includes('.apk');

    // Brand spoof check: e.g., 'sbi-update.xyz', 'hdfc-verification.top'
    const isSpoofedBrand = TARGETED_BRANDS.some((b) => {
      if (parsedHostname.includes(b)) {
        // if domain is not the official brand domain
        const isOfficial = (b === 'sbi' && (parsedHostname === 'onlinesbi.sbi' || parsedHostname.endsWith('.sbi') || parsedHostname === 'sbi.co.in')) ||
                           (b === 'hdfc' && (parsedHostname === 'hdfcbank.com' || parsedHostname.endsWith('.hdfcbank.com'))) ||
                           (b === 'icici' && (parsedHostname === 'icicibank.com' || parsedHostname.endsWith('.icicibank.com'))) ||
                           (b === 'paytm' && (parsedHostname === 'paytm.com' || parsedHostname.endsWith('.paytm.com'))) ||
                           (b === 'amazon' && (parsedHostname === 'amazon.in' || parsedHostname === 'amazon.com')) ||
                           (b === 'google' && (parsedHostname === 'google.com' || parsedHostname === 'google.co.in')) ||
                           (b === 'indapost' || b === 'indiapost' && parsedHostname === 'indiapost.gov.in');
        return !isOfficial;
      }
      return false;
    });

    results.push({
      url: cleanUrl,
      domain: parsedHostname,
      isShortener,
      isIpAddress,
      isSuspiciousTld,
      hasApkDownload,
      isSpoofedBrand
    });
  }

  return results;
}

/**
 * Extracts phone numbers from message
 */
export function extractPhoneNumbers(text: string): string[] {
  const phoneRegex = /(?:\+91[\-\s]?)?[6-9]\d{9}\b|\b1800\d{6,7}\b/g;
  const found = text.match(phoneRegex) || [];
  // Return unique
  return Array.from(new Set(found));
}

/**
 * Core Real Heuristic Analysis Function
 */
export function analyzeMessageFraud(message: string): MessageFraudAnalysis {
  const clean = message.trim();
  const lower = clean.toLowerCase();
  
  const charCount = clean.length;
  const words = clean.split(/\s+/).filter(Boolean);
  const wordCount = words.length;

  if (wordCount === 0) {
    return {
      rawMessage: '',
      charCount: 0,
      wordCount: 0,
      riskScore: 0,
      riskLevel: 'SAFE',
      category: 'benign_general',
      categoryTitle: { en: 'No Content Provided', gu: 'કોઈ લખાણ દાખલ કરેલ નથી' },
      summary: { en: 'Please enter or paste a message to analyze.', gu: 'વિશ્લેષણ કરવા માટે કૃપા કરીને મેસેજ ટાઈપ કરો અથવા પેસ્ટ કરો.' },
      extractedUrls: [],
      extractedPhones: [],
      heuristicRules: [],
      detectedUrgencyWords: [],
      detectedFinancialWords: [],
      detectedCredentialWords: [],
      detectedRemoteApps: [],
      actionAdvice: { en: [], gu: [] }
    };
  }

  // 1. Extract and analyze URLs
  const extractedUrls = extractAndAnalyzeUrls(clean);
  const extractedPhones = extractPhoneNumbers(clean);

  // 2. Extract keywords by category
  const detectedUrgencyWords: string[] = [];
  URGENCY_PATTERNS.forEach(p => {
    if (lower.includes(p.term.toLowerCase())) {
      detectedUrgencyWords.push(p.label);
    }
  });

  const detectedCredentialWords: string[] = [];
  CREDENTIAL_PATTERNS.forEach(p => {
    if (lower.includes(p.term.toLowerCase())) {
      detectedCredentialWords.push(p.label);
    }
  });

  const detectedFinancialWords: string[] = [];
  FINANCIAL_PATTERNS.forEach(p => {
    if (lower.includes(p.term.toLowerCase())) {
      detectedFinancialWords.push(p.label);
    }
  });

  const detectedCourierWords: string[] = [];
  COURIER_PATTERNS.forEach(p => {
    if (lower.includes(p.term.toLowerCase())) {
      detectedCourierWords.push(p.label);
    }
  });

  const detectedRemoteApps: string[] = [];
  REMOTE_ACCESS_TOOLS.forEach(tool => {
    if (lower.includes(tool)) {
      detectedRemoteApps.push(tool.toUpperCase());
    }
  });

  // 3. Check for genuine safety markers
  const foundSafeMarkers = SAFE_MARKERS.filter(m => lower.includes(m));

  // 4. Evaluate Heuristic Rules
  const heuristicRules: MessageHeuristicRule[] = [];
  let calculatedRisk = 0;

  // Rule 1: High Urgency & Disconnection / Legal Threats
  const hasUrgency = detectedUrgencyWords.length > 0;
  if (hasUrgency) {
    const points = Math.min(30, detectedUrgencyWords.length * 15);
    calculatedRisk += points;
    heuristicRules.push({
      id: 'rule-urgency',
      name: { 
        en: 'Psychological Urgency & Fear Induction', 
        gu: 'માનસિક ડર અને ઉતાવળ ઊભી કરતી ભાષા' 
      },
      triggered: true,
      severity: 'high',
      riskScore: points,
      explanation: {
        en: `Detected high-pressure psychological panic tactics (${detectedUrgencyWords.slice(0, 3).join(', ')}). Attackers induce false urgency to bypass logical thinking before you verify with the real provider.`,
        gu: `મેસેજમાં તાકીદે કાર્યવાહી કરવા માટે ખોટો ડર કે ઉતાવળ ઊભી કરવામાં આવી છે (${detectedUrgencyWords.slice(0, 3).join(', ')}). સાયબર ગઠિયા પીડિત વ્યક્તિને વિચારવાનો મોકો આપ્યા વગર છેતરવા માટે આ રીત વાપરે છે.`
      },
      evidence: detectedUrgencyWords.join(', ')
    });
  } else {
    heuristicRules.push({
      id: 'rule-urgency',
      name: { 
        en: 'Psychological Urgency & Fear Induction', 
        gu: 'માનસિક ડર અને ઉતાવળ ઊભી કરતી ભાષા' 
      },
      triggered: false,
      severity: 'safe',
      riskScore: 0,
      explanation: {
        en: 'No aggressive deadline panic or disconnection threats detected.',
        gu: 'મેસેજમાં કોઈ ગભરાટ કે અકાઉન્ટ બંધ કરવાની ધમકીભરી ભાષા જોવા મળી નથી.'
      }
    });
  }

  // Rule 2: Credential & Identity Theft (OTP / PIN / KYC)
  const hasCredentialHarvesting = detectedCredentialWords.length > 0;
  if (hasCredentialHarvesting) {
    const points = 35;
    calculatedRisk += points;
    heuristicRules.push({
      id: 'rule-credentials',
      name: { 
        en: 'Sensitive Credential & KYC Harvesting', 
        gu: 'ખાનગી OTP, PIN અથવા KYC સંબંધિત વિગતો' 
      },
      triggered: true,
      severity: 'critical',
      riskScore: points,
      explanation: {
        en: `Message references sensitive banking or identity credentials (${detectedCredentialWords.slice(0, 3).join(', ')}). Legitimate organizations and banks NEVER request passwords, OTPs, or PINs via text or unverified forms.`,
        gu: `મેસેજમાં ઓટીપી, પીન અથવા કેવાયસી અપડેટની માગણી છે (${detectedCredentialWords.slice(0, 3).join(', ')}). કોઈપણ બેંક કે માન્ય સંસ્થા ક્યારેય SMS કે વોટ્સએપ પર ગુપ્ત પિન કે ઓટીપી માગતી નથી.`
      },
      evidence: detectedCredentialWords.join(', ')
    });
  } else {
    heuristicRules.push({
      id: 'rule-credentials',
      name: { 
        en: 'Sensitive Credential & KYC Harvesting', 
        gu: 'ખાનગી OTP, PIN અથવા KYC સંબંધિત વિગતો' 
      },
      triggered: false,
      severity: 'safe',
      riskScore: 0,
      explanation: {
        en: 'No direct solicitation of OTP, PIN, or confidential KYC data found.',
        gu: 'કોઈ ઓટીપી, પીન કે ખાનગી બેંકિંગ ડેટાની માગણી જોવા મળી નથી.'
      }
    });
  }

  // Rule 3: Malicious Links, URL Shorteners & Domain Spoofing
  const hasUrls = extractedUrls.length > 0;
  const suspiciousUrls = extractedUrls.filter(u => u.isShortener || u.isIpAddress || u.isSuspiciousTld || u.isSpoofedBrand);
  if (suspiciousUrls.length > 0) {
    const points = 35;
    calculatedRisk += points;
    const reasons: string[] = [];
    suspiciousUrls.forEach(u => {
      if (u.isShortener) reasons.push(`Shortener hiding true destination (${u.domain})`);
      if (u.isIpAddress) reasons.push(`Raw numeric IP address (${u.domain})`);
      if (u.isSuspiciousTld) reasons.push(`High-risk cheap TLD (${u.domain})`);
      if (u.isSpoofedBrand) reasons.push(`Brand impersonation domain (${u.domain})`);
    });

    heuristicRules.push({
      id: 'rule-links',
      name: { 
        en: 'Deceptive Links, Shorteners & Spoofed Domains', 
        gu: 'છેતરપિંડીવાળી લિંક્સ, શોર્ટનર અને બોગસ ડોમેઇન' 
      },
      triggered: true,
      severity: 'critical',
      riskScore: points,
      explanation: {
        en: `Detected risky link patterns: ${reasons.join(', ')}. Scammers employ link shorteners and deceptive brand spellings to masquerade as legitimate portals.`,
        gu: `શંકાસ્પદ લિંક્સ મળી આવી છે: ${reasons.join(', ')}. સાયબર ગુનેગારો સાચી વેબસાઇટ જેવું જ બનાવટી ડોમેઈન બનાવીને લોકોનો ડેટા ચોરે છે.`
      },
      evidence: suspiciousUrls.map(u => u.url).join(' | ')
    });
  } else if (hasUrls) {
    heuristicRules.push({
      id: 'rule-links',
      name: { 
        en: 'Standard Web Links Present', 
        gu: 'સામાન્ય વેબ લિંક્સ ઉપલબ્ધ' 
      },
      triggered: true,
      severity: 'low',
      riskScore: 10,
      explanation: {
        en: 'Message contains hyperlinks. Even if standard, always verify the sender before tapping unknown links on mobile.',
        gu: 'મેસેજમાં વેબ લિંક છે. લિંક સામાન્ય દેખાતી હોય તો પણ અજાણ્યા નંબર પરથી આવેલી લિંક પર ક્લિક કરતા પહેલા ચકાસણી કરો.'
      },
      evidence: extractedUrls.map(u => u.url).join(', ')
    });
    calculatedRisk += 10;
  } else {
    heuristicRules.push({
      id: 'rule-links',
      name: { 
        en: 'Deceptive Links, Shorteners & Spoofed Domains', 
        gu: 'છેતરપિંડીવાળી લિંક્સ, શોર્ટનર અને બોગસ ડોમેઇન' 
      },
      triggered: false,
      severity: 'safe',
      riskScore: 0,
      explanation: {
        en: 'No external links or phishing URLs detected in the message.',
        gu: 'મેસેજમાં કોઈ બહારની લિંક કે ફિશિંગ URL મળી નથી.'
      }
    });
  }

  // Rule 4: Malicious APK / Remote Desktop Trojans
  const hasMalwareOrApk = detectedRemoteApps.length > 0 || extractedUrls.some(u => u.hasApkDownload);
  if (hasMalwareOrApk) {
    const points = 40;
    calculatedRisk += points;
    heuristicRules.push({
      id: 'rule-malware',
      name: { 
        en: 'Remote Access Tool / Malicious APK Vector', 
        gu: 'રિમોટ કંટ્રોલ એપ્લિકેશન અથવા અજાણી APK ફાઇલ' 
      },
      triggered: true,
      severity: 'critical',
      riskScore: points,
      explanation: {
        en: `Extreme Threat: The message asks you to install remote access tools (${detectedRemoteApps.join(', ')}) or side-load an unknown .APK file. This grants hackers full control to monitor your screen and steal banking OTPs silently!`,
        gu: `અત્યંત ગંભીર જોખમ: આ મેસેજ અજાણી .APK ફાઇલ અથવા સ્ક્રીન શેરિંગ એપ (${detectedRemoteApps.join(', ')}) ઇન્સ્ટોલ કરાવવાનો પ્રયત્ન કરે છે. આનાથી હેકર્સ તમારા મોબાઈલની સ્ક્રીન જોઈને તમામ OTP અને પૈસા ચોરી શકે છે!`
      },
      evidence: detectedRemoteApps.join(', ') || '.APK Download Link'
    });
  } else {
    heuristicRules.push({
      id: 'rule-malware',
      name: { 
        en: 'Remote Access Tool / Malicious APK Vector', 
        gu: 'રિમોટ કંટ્રોલ એપ્લિકેશન અથવા અજાણી APK ફાઇલ' 
      },
      triggered: false,
      severity: 'safe',
      riskScore: 0,
      explanation: {
        en: 'No requests for remote desktop apps (AnyDesk, TeamViewer) or rogue APK downloads.',
        gu: 'કોઈ રિમોટ એક્સેસ એપ્લિકેશન કે APK ડાઉનલોડ કરવા અંગેનું જોખમ જણાયું નથી.'
      }
    });
  }

  // Rule 5: Financial Baits, Lottery & Work-From-Home Task Scams
  const hasFinancialBait = detectedFinancialWords.length > 0;
  if (hasFinancialBait) {
    const points = 25;
    calculatedRisk += points;
    heuristicRules.push({
      id: 'rule-financial',
      name: { 
        en: 'Unrealistic Financial Bait & Lottery Schemes', 
        gu: 'અવાસ્તવિક લોટરી, ઈનામ કે ટાસ્ક સ્કેમ' 
      },
      triggered: true,
      severity: 'high',
      riskScore: points,
      explanation: {
        en: `Message promises extraordinary rewards, lottery winnings, or lucrative daily income (${detectedFinancialWords.slice(0, 3).join(', ')}). Free money schemes are classic advance-fee / task investment frauds.`,
        gu: `મેસેજમાં મોટું ઇનામ જીતવાની, લોટરીની અથવા ઘેરબેઠા હજારો રૂપિયા કમાવવાની ખોટી લાલચ આપવામાં આવી છે (${detectedFinancialWords.slice(0, 3).join(', ')}). આવી લાલચ આપીને સાયબર ગુનેગારો પ્રોસેસિંગ ફીના નામે પૈસા પડાવે છે.`
      },
      evidence: detectedFinancialWords.join(', ')
    });
  } else {
    heuristicRules.push({
      id: 'rule-financial',
      name: { 
        en: 'Unrealistic Financial Bait & Lottery Schemes', 
        gu: 'અવાસ્તવિક લોટરી, ઈનામ કે ટાસ્ક સ્કેમ' 
      },
      triggered: false,
      severity: 'safe',
      riskScore: 0,
      explanation: {
        en: 'No false lottery prizes or get-rich-quick work-from-home hooks detected.',
        gu: 'કોઈ નકલી લોટરી કે અવાસ્તવિક પૈસા કમાવવાની લાલચ જોવા મળી નથી.'
      }
    });
  }

  // Rule 6: Unverified Contact Numbers & Call Prompts
  const hasCallAction = extractedPhones.length > 0 && (lower.includes('call') || lower.includes('contact') || lower.includes('helpline') || lower.includes('સંપર્ક') || lower.includes('ફોન'));
  if (hasCallAction && (hasUrgency || hasCredentialHarvesting)) {
    const points = 15;
    calculatedRisk += points;
    heuristicRules.push({
      id: 'rule-call-fraud',
      name: { 
        en: 'Unverified Mobile Number Impersonating Official Support', 
        gu: 'અધિકૃત સપોર્ટ તરીકે ખોટો પર્સનલ મોબાઈલ નંબર' 
      },
      triggered: true,
      severity: 'medium',
      riskScore: points,
      explanation: {
        en: `Urges calling private mobile numbers (${extractedPhones.join(', ')}) under the guise of an "Electricity Officer", "Bank Manager", or "Helpline". Official utilities use verified IVR/toll-free channels.`,
        gu: `અધિકૃત વીજ કંપની કે બેંકના નામે વ્યક્તિગત મોબાઈલ નંબર (${extractedPhones.join(', ')}) પર તાત્કાલિક કોલ કરવાનું કહેવામાં આવે છે. વાસ્તવિક સંસ્થાઓ ક્યારેય અંગત મોબાઈલ નંબર આપતી નથી.`
      },
      evidence: extractedPhones.join(', ')
    });
  }

  // Rule 7: Genuine Transactional & Defensive Markers (Mitigation)
  const isLegitimateWarning = foundSafeMarkers.length > 0 && !hasMalwareOrApk && suspiciousUrls.length === 0;
  if (isLegitimateWarning) {
    calculatedRisk = Math.max(0, calculatedRisk - 35);
    heuristicRules.push({
      id: 'rule-safe-marker',
      name: { 
        en: 'Official Security Disclaimer Observed', 
        gu: 'સત્તાવાર સુરક્ષા માર્ગદર્શિકા હાજર' 
      },
      triggered: true,
      severity: 'safe',
      riskScore: -35,
      explanation: {
        en: 'Message includes genuine bank security advisory advising recipients to NEVER disclose OTPs. Consistent with legitimate transactional broadcasts.',
        gu: 'આ મેસેજમાં "ઓટીપી કોઈને આપશો નહીં" જેવી સત્તાવાર સુરક્ષા ચેતવણી છે, જે વાસ્તવિક બેંકિંગ સિસ્ટમનો ભાગ છે.'
      },
      evidence: foundSafeMarkers.join(', ')
    });
  }

  // Clamp risk score to 0 - 100
  const finalRiskScore = Math.max(0, Math.min(100, Math.round(calculatedRisk)));

  // Determine Risk Level
  let riskLevel: MessageRiskLevel = 'SAFE';
  if (finalRiskScore >= 60) {
    riskLevel = 'DANGEROUS';
  } else if (finalRiskScore >= 25) {
    riskLevel = 'SUSPICIOUS';
  }

  // Determine Categorization
  let category: ScamCategory = 'benign_general';
  let categoryTitle = { en: 'Legitimate or General Message', gu: 'સામાન્ય અથવા સુરક્ષિત સંદેશ' };
  let summary = {
    en: 'This message shows no prominent threat patterns, malicious APK vectors, or phishing lures. It appears safe.',
    gu: 'આ મેસેજમાં કોઈ જોખમી લિંક્સ, નકલી લોટરી કે ખતરનાક ધમકીઓ મળી નથી. તે સુરક્ષિત જણાય છે.'
  };

  if (hasMalwareOrApk) {
    category = 'apk_malware_remote';
    categoryTitle = { en: 'Malicious APK / Remote Desktop Scam', gu: 'ખતરનાક APK / રિમોટ એક્સેસ સ્કેમ' };
    summary = {
      en: 'CRITICAL ALERT: Attackers are attempting to install malware or remote control tools to take over your device and siphon banking credentials.',
      gu: 'અત્યંત ગંભીર એલર્ટ: આ મેસેજ દ્વારા તમારા મોબાઈલ કે કમ્પ્યુટરમાં ખતરનાક એપ ઇન્સ્ટોલ કરાવીને બેંકિંગ ડેટા ચોરવાનો પ્રયાસ થઈ રહ્યો છે.'
    };
  } else if (lower.includes('electric') || lower.includes('power') || lower.includes('light bill') || lower.includes('વીજળી') || lower.includes('લાઈટ બિલ')) {
    category = 'electricity_bill_scam';
    categoryTitle = { en: 'Electricity Power Disconnection Scam (Light Bill Scam)', gu: 'વીજળી બિલ કટ ઓફ સ્કેમ (લાઈટ બિલ ફ્રોડ)' };
    summary = {
      en: 'HIGH RISK: Highly rampant fraud threatening power disconnection tonight. Targets victims into calling a fake officer number or downloading a fake APK.',
      gu: 'મોટું જોખમ: આજે રાત્રે લાઈટ કાપી નાખવાની ધમકી આપીને ફેક નંબર પર કોલ કરાવી છેતરપિંડી આચરતો ખૂબ જ પ્રચલિત સ્કેમ છે.'
    };
  } else if (hasCredentialHarvesting && (lower.includes('bank') || lower.includes('kyc') || lower.includes('pan') || lower.includes('sbi') || lower.includes('hdfc') || lower.includes('કેવાયસી'))) {
    category = 'bank_kyc_phishing';
    categoryTitle = { en: 'Bank Account & KYC Suspension Smishing', gu: 'બેંક એકાઉન્ટ બ્લોક અને KYC ફિશિંગ સ્કેમ' };
    summary = {
      en: 'HIGH RISK: Impersonates a financial institution alleging account blockage due to pending KYC or PAN linking to steal net banking credentials.',
      gu: 'મોટું જોખમ: બેંકના નામે ખાતું બંધ થવાનો ડર બતાવીને PAN અથવા KYC અપડેટ કરવાના બહાને તમારા બેંક ખાતાની ચોરી કરવાનો પ્રયત્ન છે.'
    };
  } else if (hasFinancialBait && (lower.includes('kbc') || lower.includes('lottery') || lower.includes('prize') || lower.includes('won') || lower.includes('ઈનામ'))) {
    category = 'lottery_reward_fraud';
    categoryTitle = { en: 'Lottery & Lucky Draw Cash Prize Fraud', gu: 'લોટરી, KBC અથવા રોકડ ઈનામ ફ્રોડ' };
    summary = {
      en: 'HIGH RISK: Classic advance-fee scam claiming you won a lottery or lucky draw. Victims are tricked into paying "taxes" or "registration charges".',
      gu: 'મોટું જોખમ: લોટરી કે મોટી રકમ જીત્યાની ખોટી લાલચ આપી પ્રોસેસિંગ ફીના નામે પૈસા પડાવતો જાણીતો સ્કેમ છે.'
    };
  } else if (hasFinancialBait && (lower.includes('job') || lower.includes('work from home') || lower.includes('task') || lower.includes('youtube') || lower.includes('પાર્ટ ટાઈમ'))) {
    category = 'part_time_job_scam';
    categoryTitle = { en: 'Part-Time Work-From-Home / Task Scam', gu: 'પાર્ટ-ટાઇમ જોબ / યુટ્યુબ લાઈક ટાસ્ક સ્કેમ' };
    summary = {
      en: 'HIGH RISK: Fraudulent work opportunity offering inflated daily pay for simple tasks (liking videos, writing reviews), leading into an investment trap.',
      gu: 'મોટું જોખમ: ફક્ત વિડીયો લાઈક કરીને રોજના હજારો રૂપિયા કમાવવાની ખોટી સ્કીમ છે, જેમાં પાછળથી મોટા રોકાણના નામે છેતરપિંડી થાય છે.'
    };
  } else if (detectedCourierWords.length > 0 || (lower.includes('post') && lower.includes('address'))) {
    category = 'courier_delivery_scam';
    categoryTitle = { en: 'Parcel Delivery & Address Verification Scam', gu: 'પાર્સલ ડિલિવરી / ઇન્ડિયા પોસ્ટ એડ્રેસ સ્કેમ' };
    summary = {
      en: 'HIGH RISK: Fake courier notification alleging delivery failure. Clicking the link prompts payment of a small fee on a credential-stealing gateway.',
      gu: 'મોટું જોખમ: પાર્સલ અટવાયું હોવાનું જણાવી એડ્રેસ અપડેટ કરવા અથવા નજીવી ફી ભરવાના બહાને કાર્ડની ચોરી કરતી સાઈટ પર લઈ જાય છે.'
    };
  } else if (isLegitimateWarning && finalRiskScore < 25) {
    category = 'legitimate_transactional';
    categoryTitle = { en: 'Genuine Transactional / Security Notification', gu: 'અસલી સત્તાવાર બેંક અથવા ટ્રાન્ઝેક્શન એલર્ટ' };
    summary = {
      en: 'SAFE: Message follows standard banking protocol with active security advisories warning against OTP disclosure. No phishing links detected.',
      gu: 'સુરક્ષિત: આ મેસેજ બેંકિંગ પ્રોટોકોલ અનુસાર છે અને તેમાં સુરક્ષા ચેતવણી આપવામાં આવી છે. કોઈ શંકાસ્પદ લિંક્સ નથી.'
    };
  } else if (finalRiskScore >= 60) {
    category = 'urgent_threat_extortion';
    categoryTitle = { en: 'High Risk Phishing / Threat Communication', gu: 'અત્યંત જોખમી ફિશિંગ અથવા ધમકીભર્યો મેસેજ' };
    summary = {
      en: 'HIGH RISK: Contains multiple critical threat signatures including deceptive links and intimidation tactics.',
      gu: 'મોટું જોખમ: આ મેસેજમાં છેતરપિંડીવાળી લિંક્સ અને ગેરકાયદેસર ધમકીના બહુવિધ ચિહ્નો જોવા મળ્યા છે.'
    };
  } else if (finalRiskScore >= 25) {
    category = 'general_suspicious';
    categoryTitle = { en: 'Suspicious / Unverified Message', gu: 'શંકાસ્પદ / સાવચેત રહેવા યોગ્ય મેસેજ' };
    summary = {
      en: 'CAUTION: Message exhibits certain red flags (unverified links or urging contact). Exercise vigilance before clicking or sharing information.',
      gu: 'સાવધાન: આ મેસેજમાં કેટલીક શંકાસ્પદ બાબતો (અજાણી લિંક્સ અથવા ઉતાવળ) જણાઈ છે. કોઈ પગલું ભરતા પહેલા સંપૂર્ણ ખાતરી કરો.'
    };
  }

  // Action advice
  const actionAdviceEn: string[] = [];
  const actionAdviceGu: string[] = [];

  if (riskLevel === 'DANGEROUS') {
    actionAdviceEn.push('DO NOT click on any link or open attached files.');
    actionAdviceEn.push('NEVER share your OTP, UPI PIN, ATM PIN, or banking passwords.');
    actionAdviceEn.push('Do NOT install any APK or remote screen-sharing app like AnyDesk.');
    actionAdviceEn.push('Report immediately to the National Cyber Crime Portal: cybercrime.gov.in or call Helpline 1930.');
    actionAdviceEn.push('Block this sender number on WhatsApp, SMS, or Email immediately.');

    actionAdviceGu.push('આ મેસેજમાં આવેલી કોઈપણ લિંક પર ક્લિક કરશો નહીં.');
    actionAdviceGu.push('કોઈપણ સંજોગોમાં તમારો OTP, UPI PIN કે બેંક પાસવર્ડ શેર કરશો નહીં.');
    actionAdviceGu.push('કોઈપણ .APK ફાઇલ કે AnyDesk જેવી સ્ક્રીન શેરિંગ એપ્સ ડાઉનલોડ કરશો નહીં.');
    actionAdviceGu.push('નેશનલ સાયબર ક્રાઈમ હેલ્પલાઇન ૧૯૩૦ (1930) પર અથવા cybercrime.gov.in પર ફરિયાદ નોંધાવો.');
    actionAdviceGu.push('આ મોકલનાર નંબરને તમારા મોબાઈલમાં તરત જ બ્લોક અને રિપોર્ટ કરો.');
  } else if (riskLevel === 'SUSPICIOUS') {
    actionAdviceEn.push('Verify directly with the official company or branch before taking any action.');
    actionAdviceEn.push('Avoid clicking links from unknown senders; type official URLs manually in your browser.');
    actionAdviceEn.push('Do not share sensitive identity documents (Aadhaar, PAN) over unverified chats.');

    actionAdviceGu.push('કોઈપણ પગલું ભરતાં પહેલાં સંબંધિત બેંક કે સંસ્થાની અધિકૃત શાખામાં રૂબરૂ અથવા હેલ્પલાઇન પર ખાતરી કરો.');
    actionAdviceGu.push('અજાણ્યા મેસેજમાંથી લિંક ખોલવાને બદલે ઓફિશિયલ વેબસાઈટ બ્રાઉઝરમાં જાતે ટાઈપ કરીને જ ખોલો.');
    actionAdviceGu.push('તમારા આધાર કાર્ડ કે પાન કાર્ડની વિગતો મેસેજ પર શેર કરશો નહીં.');
  } else {
    actionAdviceEn.push('Message appears standard and low risk.');
    actionAdviceEn.push('Always remember: Banks and reputable organizations never ask for your passwords or OTPs.');

    actionAdviceGu.push('આ મેસેજ સામાન્ય અને સુરક્ષિત જણાય છે.');
    actionAdviceGu.push('હંમેશા યાદ રાખો: સાચી બેંકો ક્યારેય ફોન કે SMS પર તમારી પાસે ગુપ્ત પિન કે પાસવર્ડ માગતી નથી.');
  }

  return {
    rawMessage: clean,
    charCount,
    wordCount,
    riskScore: finalRiskScore,
    riskLevel,
    category,
    categoryTitle,
    summary,
    extractedUrls,
    extractedPhones,
    heuristicRules,
    detectedUrgencyWords,
    detectedFinancialWords,
    detectedCredentialWords,
    detectedRemoteApps,
    actionAdvice: { en: actionAdviceEn, gu: actionAdviceGu }
  };
}
