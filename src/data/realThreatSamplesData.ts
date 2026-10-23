export interface RealUrlSample {
  id: string;
  title: { en: string; gu: string };
  url: string;
  category: 'phishing' | 'typosquatting' | 'shortener' | 'raw_ip' | 'suspicious_tld' | 'legitimate';
  badge: { en: string; gu: string };
  source: { en: string; gu: string };
  expectedResult: { en: string; gu: string };
}

export interface RealMessageSample {
  id: string;
  title: { en: string; gu: string };
  category: 'utility' | 'banking' | 'lottery' | 'job' | 'courier' | 'malware' | 'threat' | 'safe';
  badge: { en: string; gu: string };
  source: { en: string; gu: string };
  text: string;
  expectedResult: { en: string; gu: string };
}

export const REAL_URL_SAMPLES: RealUrlSample[] = [
  {
    id: 'sbi-phish-typo',
    title: { en: 'Deceptive Bank Login (Typo-squatting)', gu: 'બોગસ બેંક લોગિન (સ્પેલિંગ મિસ્ટેક)' },
    url: 'http://state-bankk-secure-alert.com/login-verify?user=8942',
    category: 'typosquatting',
    badge: { en: 'Brand Typosquatting', gu: 'બનાવટી બેંક સ્પેલિંગ' },
    source: { en: 'PhishTank Community Feed & @CyberDost Alert', gu: 'PhishTank ડેટાબેઝ અને સાયબરદોસ્ત એલર્ટ' },
    expectedResult: { en: 'High Risk (Insecure HTTP + Typo "bankk" + Suspicious Path)', gu: 'અત્યંત જોખમી (અસુરક્ષિત HTTP + ખોટો સ્પેલિંગ "bankk")' }
  },
  {
    id: 'subdomain-phish',
    title: { en: 'Subdomain Depth Phishing URL', gu: 'છેતરપિંડીવાળું સબડોમેઇન ફિશિંગ' },
    url: 'https://iant-portal.login-verify-sso.com/auth',
    category: 'phishing',
    badge: { en: 'Subdomain Deception', gu: 'સબડોમેઇન છેતરપિંડી' },
    source: { en: 'Observed in Student Portal Credential Harvesting', gu: 'વિદ્યાર્થી પોર્ટલ ફિશિંગ એટેક' },
    expectedResult: { en: 'Potential Risk (Excessive Subdomains prepending fake brand to root domain)', gu: 'શંકાસ્પદ (નકલી બ્રાન્ડ નામ આગળ જોડીને મૂળ ડોમેઇન છુપાવવું)' }
  },
  {
    id: 'raw-ip-host',
    title: { en: 'Raw Numeric IP Address Host', gu: 'ન્યુમેરિક IP એડ્રેસ હોસ્ટ (કોઈ ડોમેઇન નહીં)' },
    url: 'http://192.241.144.89/microsoft-login.html',
    category: 'raw_ip',
    badge: { en: 'Raw IP Host', gu: 'ન્યુમેરિક IP હોસ્ટ' },
    source: { en: 'URLhaus Malware & Phishing Tracker', gu: 'URLhaus માલવેર ટ્રેકર' },
    expectedResult: { en: 'Critical Risk (Uses bare IP address to bypass domain registration)', gu: 'ગંભીર જોખમ (ડોમેઇન રજિસ્ટ્રેશન વગરનો ખુલ્લો સર્વર IP)' }
  },
  {
    id: 'url-shortener-tax',
    title: { en: 'Obfuscated Shortened URL (Tax Refund Trap)', gu: 'છૂપી શોર્ટ કરેલી લિંક (ટેક્સ રીફંડ સ્કેમ)' },
    url: 'https://bit.ly/claim-tax-refund-2026',
    category: 'shortener',
    badge: { en: 'URL Shortener', gu: 'છૂપો શોર્ટનર' },
    source: { en: 'Income Tax Phishing Campaign via SMS', gu: 'ઇન્કમ ટેક્સ ફિશિંગ કેમ્પેઇન' },
    expectedResult: { en: 'Potential Risk (Hides destination server domain until expanded)', gu: 'શંકાસ્પદ (અસલી વેબસાઇટ કઈ છે તે છુપાવે છે)' }
  },
  {
    id: 'suspicious-cheap-tld',
    title: { en: 'Disposable High-Abuse TLD (.xyz)', gu: 'ડિસ્પોઝેબલ સસ્તું TLD ડોમેઇન (.xyz)' },
    url: 'http://free-cash-reward-claim.xyz/verify-account',
    category: 'suspicious_tld',
    badge: { en: 'High-Abuse TLD (.xyz)', gu: 'જોખમી TLD (.xyz)' },
    source: { en: 'Anti-Phishing Working Group (APWG) Threat Report', gu: 'APWG સાયબર રિસર્ચ રિપોર્ટ' },
    expectedResult: { en: 'High Risk (Insecure HTTP + High Abuse Discount TLD)', gu: 'અત્યંત જોખમી (અસુરક્ષિત કનેક્શન + સ્પામ TLD)' }
  },
  {
    id: 'sbi-brand-spoof',
    title: { en: 'SBI Net Banking Brand Spoof', gu: 'SBI બેંકના નામે નકલી પોર્ટલ' },
    url: 'http://sbi-kyc-verify-portal.top/auth',
    category: 'phishing',
    badge: { en: 'Brand Spoofing (.top)', gu: 'બેંકનું નકલી પોર્ટલ' },
    source: { en: 'Gujarat Police Cyber Crime Advisory', gu: 'ગુજરાત પોલીસ સાયબર સેલ એલર્ટ' },
    expectedResult: { en: 'Critical Risk (Impersonates SBI on unregistered .top domain)', gu: 'અત્યંત જોખમી (બિન-અધિકૃત .top સાઇટ પર બેંકની ચોરી)' }
  },
  {
    id: 'safe-cybercrime-gov',
    title: { en: 'Govt National Cyber Crime Portal (Safe)', gu: 'ભારત સરકાર નેશનલ સાયબર ક્રાઈમ પોર્ટલ (સુરક્ષિત)' },
    url: 'https://cybercrime.gov.in/Webform/Crime_AuthoLogin.aspx',
    category: 'legitimate',
    badge: { en: 'Legitimate Government', gu: 'સત્તાવાર સરકારી' },
    source: { en: 'Ministry of Home Affairs (MHA), Govt of India', gu: 'ગૃહ મંત્રાલય, ભારત સરકાર' },
    expectedResult: { en: 'Relatively Clean / Safe (Valid HTTPS TLS + Official .gov.in Domain)', gu: 'સુરક્ષિત (સત્તાવાર .gov.in ડોમેઇન + સુરક્ષિત HTTPS)' }
  },
  {
    id: 'safe-onlinesbi',
    title: { en: 'Official State Bank of India Portal (Safe)', gu: 'સ્ટેટ બેંક ઓફ ઇન્ડિયા સત્તાવાર વેબસાઇટ (સુરક્ષિત)' },
    url: 'https://www.onlinesbi.sbi/',
    category: 'legitimate',
    badge: { en: 'Legitimate Bank Domain', gu: 'સત્તાવાર બેંક ડોમેઇન' },
    source: { en: 'State Bank of India Official Verified Domain', gu: 'સ્ટેટ બેંક ઓફ ઇન્ડિયા' },
    expectedResult: { en: 'Relatively Clean / Safe (Exclusive Verified Bank TLD .sbi)', gu: 'સુરક્ષિત (સત્તાવાર .sbi રજિસ્ટર્ડ ડોમેઇન)' }
  },
  {
    id: 'safe-hdfc',
    title: { en: 'Official HDFC Bank NetBanking Portal (Safe)', gu: 'HDFC બેંક સત્તાવાર પોર્ટલ (સુરક્ષિત)' },
    url: 'https://netbanking.hdfcbank.com/netbanking/',
    category: 'legitimate',
    badge: { en: 'Legitimate Banking TLS', gu: 'સત્તાવાર બેંકિંગ પોર્ટલ' },
    source: { en: 'HDFC Bank Ltd. Official Domain', gu: 'HDFC બેંક સત્તાવાર ડોમેઇન' },
    expectedResult: { en: 'Relatively Clean / Safe (Official Domain with Extended Validation SSL)', gu: 'સુરક્ષિત (સત્તાવાર hdfcbank.com પોર્ટલ)' }
  }
];

export const REAL_MESSAGE_SAMPLES: RealMessageSample[] = [
  {
    id: 'light-bill-scam',
    title: { en: 'Electricity Cut-off Panic Threat (Light Bill Scam)', gu: 'લાઈટ બિલ કટ ઓફ સ્કેમ (વીજળી કપાત ધમકી)' },
    category: 'utility',
    badge: { en: 'Rampant Utility Scam', gu: 'ખૂબ પ્રચલિત વીજળી સ્કેમ' },
    source: { en: 'TRAI Spam Registry & Gujarat Discom Advisory (UGVCL/MGVCL/PGVCL)', gu: 'ગુજરાત વીજ કંપનીઓ અને સાયબરદોસ્ત એલર્ટ' },
    text: 'Dear consumer, your electricity power will be disconnected tonight at 9.30 PM from electricity office because your previous month bill was not updated. Please immediately contact our electricity officer at 9876543210. Thank you.',
    expectedResult: { en: 'High Risk (False Urgency + Disconnection Threat + Unofficial Private Mobile Number)', gu: 'અત્યંત જોખમી (આજે રાત્રે લાઈટ કાપવાની ધમકી + અંગત મોબાઈલ નંબર)' }
  },
  {
    id: 'sbi-kyc-pan-scam',
    title: { en: 'Bank Account Blocked / PAN KYC Smishing', gu: 'બેંક એકાઉન્ટ બ્લોક / PAN-KYC ફિશિંગ SMS' },
    category: 'banking',
    badge: { en: 'Banking Smishing', gu: 'બેંકિંગ ફિશિંગ' },
    source: { en: 'Reported by State Bank of India Security Advisory & @CyberDost', gu: 'સ્ટેટ બેંક ઓફ ઇન્ડિયા સુરક્ષા એલર્ટ' },
    text: 'Dear SBI Customer, your bank account has been suspended due to pending PAN card & KYC verification. To prevent permanent deactivation within 24 hours, update immediately at: http://sbi-kyc-verify-portal.top/auth',
    expectedResult: { en: 'Critical Danger (Impersonates SBI + Threatens Account Suspension + Fake Phishing Link)', gu: 'અત્યંત ગંભીર જોખમ (ખાતું બંધ થવાનો ડર + નકલી .top ફિશિંગ લિંક)' }
  },
  {
    id: 'kbc-lottery-whatsapp',
    title: { en: 'KBC 25 Lakh WhatsApp Lottery Fraud', gu: 'KBC ૨૫ લાખ લોટરી ફ્રોડ (WhatsApp)' },
    category: 'lottery',
    badge: { en: 'Advance-Fee Lottery', gu: 'ખોટી લોટરી સ્કીમ' },
    source: { en: 'National Cyber Crime Reporting Portal (NCRP) Common Complaint', gu: 'નેશનલ સાયબર ક્રાઈમ પોર્ટલ કેસ સ્ટડી' },
    text: 'Congratulations! Your WhatsApp mobile number has won cash prize of Rs. 25,00,000 in Kaun Banega Crorepati lucky draw! Send processing fee Rs. 1,500 to claim your lottery check. WhatsApp on 9988776655 immediately.',
    expectedResult: { en: 'High Risk (Greed Exploitation + Fake KBC Brand + Processing Fee Demanded)', gu: 'અત્યંત જોખમી (લોટરીની ખોટી લાલચ + પ્રોસેસિંગ ફીના નામે પૈસાની માગણી)' }
  },
  {
    id: 'youtube-task-job',
    title: { en: 'Part-Time Work-From-Home / YouTube Like Task Scam', gu: 'યુટ્યુબ લાઈક & હોટેલ રિવ્યુ જોબ સ્કેમ' },
    category: 'job',
    badge: { en: 'Telegram Task Fraud', gu: 'ટેલિગ્રામ ટાસ્ક ફ્રોડ' },
    source: { en: 'CID Crime Gujarat Advisory on Part-Time Job Frauds', gu: 'સીઆઈડી ક્રાઈમ ગુજરાત પબ્લિક એલર્ટ' },
    text: 'Special offer! Work from home part time job. Earn Rs. 3,000 to 8,000 daily just by liking YouTube videos and rating hotels. Contact VIP HR on Telegram @EarnDaily_HR to get bonus Rs. 500 now.',
    expectedResult: { en: 'High Risk (Unrealistic Daily Wage + Task Investment Trap + Telegram Redirection)', gu: 'અત્યંત જોખમી (અવાસ્તવિક દૈનિક આવકની લાલચ + ટેલિગ્રામ ટાસ્ક ટ્રેપ)' }
  },
  {
    id: 'india-post-courier',
    title: { en: 'India Post Parcel Delivery Failure / Address Update', gu: 'ઇન્ડિયા પોસ્ટ પાર્સલ એડ્રેસ સ્કેમ' },
    category: 'courier',
    badge: { en: 'Postal Smishing', gu: 'ફેક કુરિયર મેસેજ' },
    source: { en: 'India Post Official Warning on Deceptive SMS Messages', gu: 'ઇન્ડિયા પોસ્ટ સત્તાવાર ચેતવણી' },
    text: 'India Post Alert: Your parcel package #IN89214 could not be delivered due to incomplete delivery address. Update your address within 24 hours to avoid package return: http://indiapost-pkg-update.xyz',
    expectedResult: { en: 'Critical Danger (Fake Package Alert + 24-hr Urgency + Credential Harvesting Gateway)', gu: 'અત્યંત જોખમી (ફેક પાર્સલ નોટિસ + ૨૪ કલાકની ઉતાવળ + બોગસ .xyz લિંક)' }
  },
  {
    id: 'apk-malware-anydesk',
    title: { en: 'Remote Desktop Trojan / Malicious APK Fraud', gu: 'અજાણી .APK ફાઇલ / AnyDesk રિમોટ ફ્રોડ' },
    category: 'malware',
    badge: { en: 'Remote Access Trojan', gu: 'રિમોટ સ્ક્રીન શેરિંગ જોખમ' },
    source: { en: 'Reserve Bank of India (RBI) Advisory on AnyDesk Banking Frauds', gu: 'રિઝર્વ બેંક ઓફ ઇન્ડિયા (RBI) પબ્લિક એલર્ટ' },
    text: 'Urgent notice: Your electricity payment failed. Download official e-bill update app to clear bill: http://192.168.1.15/electricity-update.apk or install AnyDesk to verify with technical staff.',
    expectedResult: { en: 'CRITICAL THREAT (Direct .APK Download Link + Remote Screen Sharing App)', gu: 'અત્યંત ગંભીર એલર્ટ (સ્ક્રીન શેરિંગ એપ અથવા ખતરનાક APK ડાઉનલોડ કરવાનો પ્રયાસ)' }
  },
  {
    id: 'digital-arrest-cbi',
    title: { en: 'Digital Arrest / Fake Police Threat Extortion', gu: 'ડિજિટલ એરેસ્ટ / નકલી પોલીસ કેસ ધમકી' },
    category: 'threat',
    badge: { en: 'Digital Arrest Scam', gu: 'ડિજિટલ એરેસ્ટ સ્કેમ' },
    source: { en: 'Prime Minister & MHA Alert on Digital Arrest Cyber Crimes', gu: 'પ્રધાનમંત્રી કાર્યાલય & ગૃહ મંત્રાલય જાહેર ચેતવણી' },
    text: 'URGENT: Legal Notice from Cyber Crime Investigation Cell. An illegal package containing narcotics has been intercepted in your name. Arrest warrant issued. Contact Investigation Officer immediately at 9823456789 to avoid police raid.',
    expectedResult: { en: 'Critical Danger (Severe Legal Intimidation + Fake Police Warrant + Extortion Call)', gu: 'અત્યંત ગંભીર જોખમ (પોલીસ ધરપકડનો ખોટો ડર બતાવી પૈસા પડાવવાનો પ્રયાસ)' }
  },
  {
    id: 'safe-bank-otp',
    title: { en: 'Genuine Bank OTP & Transaction Alert (Safe)', gu: 'અસલી સત્તાવાર બેંક OTP મેસેજ (સુરક્ષિત)' },
    category: 'safe',
    badge: { en: 'Legitimate Safe SMS', gu: 'સુરક્ષિત બેંકિંગ SMS' },
    source: { en: 'Standard Authentic Bank Transaction Protocol (RBI Compliant)', gu: 'માનક બેંકિંગ ટ્રાન્ઝેક્શન પ્રોટોકોલ' },
    text: '849201 is your OTP for transaction of INR 3,450.00 at AMAZON on card ending 4019. NEVER share this OTP with anyone, including bank officials. If this was not you, call official helpline 1800-11-2211.',
    expectedResult: { en: 'Safe / Clean (Contains explicit disclaimer warning NEVER to share OTP + Official Helpline)', gu: 'સુરક્ષિત (OTP કોઈને ન આપવાની સત્તાવાર ચેતવણી + 1800 ટોલ-ફ્રી નંબર)' }
  },
  {
    id: 'safe-google-code',
    title: { en: 'Official Google Account Verification Code (Safe)', gu: 'અસલી ગૂગલ વેરિફિકેશન કોડ (સુરક્ષિત)' },
    category: 'safe',
    badge: { en: 'Authentic 2FA Code', gu: 'સત્તાવાર સુરક્ષિત કોડ' },
    source: { en: 'Google Account Security SMS', gu: 'ગૂગલ સિક્યોરિટી સર્વિસ' },
    text: 'G-928374 is your Google verification code. Do not share this code with anyone. Google will never call or message to ask for this code.',
    expectedResult: { en: 'Safe / Clean (Standard Two-Factor Auth message with strict anti-sharing advisory)', gu: 'સુરક્ષિત (સાચો ટૂ-ફેક્ટર ઓથેન્ટિકેશન મેસેજ)' }
  }
];
