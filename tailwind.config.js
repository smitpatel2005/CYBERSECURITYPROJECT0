/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        cyber: {
          bg: '#080d1a',
          surface: '#0f172a',
          card: '#131e36',
          border: '#1e293b',
          borderLight: '#334155',
          accent: '#06b6d4',
          accentGlow: '#0891b2',
          electric: '#0ea5e9',
          neonCyan: '#22d3ee',
          textMuted: '#94a3b8',
          textLight: '#f1f5f9',
          danger: '#ef4444',
          warning: '#f59e0b',
          success: '#10b981',
        }
      },
      fontFamily: {
        mono: ['Fira Code', 'JetBrains Mono', 'ui-monospace', 'monospace'],
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'cyber-sm': '0 2px 10px rgba(6, 182, 212, 0.08)',
        'cyber': '0 4px 20px rgba(14, 165, 233, 0.12)',
        'cyber-lg': '0 10px 30px rgba(6, 182, 212, 0.18)',
      }
    },
  },
  plugins: [],
}
