# CyberShield — Smart Cyber Security Awareness & Digital Defense System

**CyberShield** is a professional, fully functional client-side cybersecurity web application designed and built for the **IANT Anniversary Live Project Exhibition**. The application provides 100% genuine, client-side cryptographic analysis, heuristic threat detection, identity security sandboxing, and defensive systems engineering.

---

## 🛡️ Project Overview

- **Project Title:** CyberShield Security Suite
- **Subtitle:** Smart Cyber Security Awareness & Digital Defense System
- **Event:** IANT Anniversary Live Project Exhibition
- **Category:** Applied Cryptography, Network Security, Identity Defense & Host Hardening
- **Target Audience:** College Exhibition Technical Judges, IT Students, Security Analysts, and Developers

---

## ✨ Core Modules & Working Capabilities

### 1. Executive Security Dashboard
- Real-time session analytics computed directly from live application state (Security Checklist Verified %, Quiz Score %, 2FA Sandbox Sessions, Cryptographic Operations). Zero fake counters.
- Interactive 3-Tier Cyber Defense Architecture Matrix connecting Layer 1 (Network & Perimeter) $\leftrightarrow$ Layer 2 (OS Hardening & Host Isolation) $\leftrightarrow$ Layer 3 (Cryptography & Identity).
- Quick navigation to all active cybersecurity defense modules.

### 2. Cyber Security Centre & Threat Defense
- **Interactive URL Safety Inspector:** Rule-based heuristic analyzer evaluating transport encryption (HTTPS), domain syntax, multiple subdomains, brand typosquatting, raw IP hostnames, and suspicious TLDs. Clearly labeled as an educational heuristic.
- **Email Fraud Awareness:** 6 real-world classification scenarios (Business Email Compromise CEO fraud, MFA Fatigue notification spam, vendor invoice modification, legitimate alerts).
- **SPF, DKIM, and DMARC Educational Breakdown:** Explains why visual appearance alone cannot guarantee email legitimacy and details cryptographic DNS authentication.
- **Cyber Hygiene Guide:** 5 defense-in-depth pillars covering OS patching, standard user vs administrator accounts, active firewall/antivirus, the 3-2-1 backup strategy, and public Wi-Fi precautions.

### 3. Password Strength Analyzer & Diceware Studio
- Real-time mathematical entropy evaluation ($E = L \times \log_2(R)$) computed locally in browser RAM.
- Flags dictionary words, common passwords, keyboard walks (`qwerty`, `123456`), and repetitive character sequences.
- 5-tier visual meter: Very Weak, Weak, Moderate, Strong, Hardened Passphrase.
- Actionable recommendations and offline GPU brute-force crack-time estimations.
- Cryptographic multi-word Diceware passphrase generator demonstrating why long passphrases defeat brute-force algorithms.
- **Privacy Guarantee:** Passwords are never sent across network sockets and never persisted in storage or cookies.

### 4. Two-Factor Authentication (2FA) Simulator
- Interactive sandbox simulating secondary authentication gates.
- Virtual smartphone authenticator widget implementing an RFC 6238 TOTP simulation with an active 30-second countdown timer and rotating 6-digit codes.
- One-click copy code to clipboard, quick-fill into active login field, and force refresh controls.
- Brute-force lockout protection (locks after 3 failed attempts).
- Deep architectural comparison of 2FA mechanisms: SMS OTPs vs Authenticator Apps vs Mobile Push vs FIDO2 Hardware Security Keys (YubiKey).

### 5. Cryptography & WebCrypto Studio
- **W3C Web Cryptography API Integration:** Utilizes browser-native `window.crypto.subtle` hardware-accelerated cryptographic subsystem.
- **Live Hash Generator:** Calculates real SHA-256, SHA-384, and SHA-512 cryptographic digests.
- **Avalanche Effect Testing:** Demonstrates how changing a single character in the input string flips ~50% of output digest bits.
- **Digital File Integrity Verifier:** Compares expected vendor checksums against calculated local hashes to detect Trojan file tampering.
- **AES-256-GCM Symmetric Encryption:** Derives keys with PBKDF2 (100,000 iterations), generates 12-byte random IVs, and executes authenticated encryption with mathematical decryption verification.
- **Data Encoding Workbench:** Live conversion between Base64 (RFC 4648), Hexadecimal bytes, and URL-encoding.

### 6. Network & Port Security Explorer
- Interactive database of 10 essential TCP/UDP ports:
  - Port 21 (FTP), 22 (SSH), 23 (Telnet), 25 (SMTP), 53 (DNS), 80 (HTTP), 443 (HTTPS), 445 (SMB), 3389 (RDP), 8080 (HTTP-Alt).
  - Highlights unencrypted plaintext risks, known vulnerabilities (EternalBlue WannaCry SMBv1, Telnet sniffing, RDP BlueKeep), and hardened alternatives.
- **Attack Surface Exposure Auditor:** Enter custom open ports or choose preset server profiles to compute an Attack Exposure Score and receive specific firewall block rules.

### 7. System Security Baseline Checklist
- 10-point Windows compliance audit:
  1. Windows Defender Real-Time Protection
  2. Windows Firewall Network Profiles
  3. User Account Control (UAC) Strict Enforcement
  4. BitLocker Drive Encryption
  5. Windows Update Security Channel
  6. Disabling SMBv1 Protocol (WannaCry Mitigation)
  7. Remote Desktop Network Level Authentication (NLA)
  8. SmartScreen Application Reputation Filter
  9. Guest & Default Account Disablement
  10. Disabling Removable Media AutoPlay / AutoRun
- Practical step-by-step Windows GUI instructions and exact PowerShell verification queries.
- Tri-state audit tracking (Verified, Action Needed, N/A) with real-time compliance score calculation.

### 8. Cybersecurity Mastery Quiz
- 30 randomized technical examination questions across Cryptography, Authentication & 2FA, Network Security, OS Hardening, and Social Engineering.
- Shuffled using the Fisher-Yates algorithm with instant technical explanations and celebration confetti.
- Full results breakdown by topic area and expandable technical review accordion with filters for missed questions.

### 9. Exhibition Mode
- 6-step guided full-screen presentation mode tailored for live judges and exhibition visitors.
- Keyboard-driven navigation (`Arrow Right/Left`, `Space`, `ESC`).

---

## 🚀 Running the Project

```bash
# Install dependencies
npm install

# Start Vite development server
npm run dev

# Build optimized production bundle
npm run build

# Preview production build locally
npm run preview
```

# CYBERSECURITYPROJECT
