import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { HARDWARE_DEVICES, HARDWARE_CATEGORIES } from '../../data/hardwareData';
import { HardwareCard } from './HardwareCard';
import { HardwareDetailModal } from './HardwareDetailModal';
import { HardwareSystemMap } from './HardwareSystemMap';
import { HardwareQuickQuiz } from './HardwareQuickQuiz';
import { HardwareDevice, HardwareCategory } from '../../types';
import { 
  Cpu, 
  Search, 
  Sparkles, 
  Layers, 
  HelpCircle, 
  Workflow, 
  Info, 
  CheckCircle2,
  HardDrive,
  Monitor,
  MousePointer,
  Zap,
  Box
} from 'lucide-react';

export const HardwareLearningView: React.FC = () => {
  const { language } = useApp();
  const [activeTab, setActiveTab] = useState<'devices' | 'flow' | 'quiz'>('devices');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedDevice, setSelectedDevice] = useState<HardwareDevice | null>(null);

  // Filtered devices based on category & search query
  const filteredDevices = useMemo(() => {
    return HARDWARE_DEVICES.filter((device) => {
      // Category match
      const categoryMatch =
        selectedCategory === 'all' ||
        (device.category as string[]).includes(selectedCategory);

      // Search match across English and Gujarati names, full forms, and definitions
      const query = searchQuery.trim().toLowerCase();
      if (!query) return categoryMatch;

      const nameEn = device.name.en.toLowerCase();
      const nameGu = device.name.gu.toLowerCase();
      const fullFormEn = device.fullForm ? device.fullForm.en.toLowerCase() : '';
      const fullFormGu = device.fullForm ? device.fullForm.gu.toLowerCase() : '';
      const defEn = device.shortDefinition.en.toLowerCase();
      const defGu = device.shortDefinition.gu.toLowerCase();
      const deviceId = device.id.toLowerCase();

      const textMatch =
        nameEn.includes(query) ||
        nameGu.includes(query) ||
        fullFormEn.includes(query) ||
        fullFormGu.includes(query) ||
        defEn.includes(query) ||
        defGu.includes(query) ||
        deviceId.includes(query);

      return categoryMatch && textMatch;
    });
  }, [selectedCategory, searchQuery]);

  const handleOpenDeviceById = (deviceId: string) => {
    const found = HARDWARE_DEVICES.find((d) => d.id === deviceId);
    if (found) {
      setSelectedDevice(found);
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn pb-12">
      {/* Top Banner / Hero Header */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-slate-900 to-cyan-950/80 border border-slate-800 p-6 sm:p-8 shadow-2xl">
        <div className="absolute -right-20 -top-20 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute right-40 -bottom-20 w-60 h-60 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-semibold mb-3">
            <Cpu className="w-3.5 h-3.5" />
            <span>
              {language === 'gu'
                ? 'કમ્પ્યુટર હાર્ડવેર એજ્યુકેશન મોડ્યુલ'
                : 'Computer Hardware Education Module'}
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            {language === 'gu'
              ? 'કમ્પ્યુટર હાર્ડવેર ઉપકરણો (Computer Hardware Devices)'
              : 'Computer Hardware Architecture & Devices'}
          </h1>

          <p className="mt-3 text-sm sm:text-base text-slate-300 leading-relaxed max-w-3xl">
            {language === 'gu'
              ? 'કમ્પ્યુટરના તમામ 10 મુખ્ય હાર્ડવેર સાધનો (RAM, SSD, HDD, CPU, Motherboard, SMPS, Monitor, Mouse, Keyboard, Cabinet) ની સંપૂર્ણ સમજણ ગુજરાતી અને અંગ્રેજીમાં મેળવો.'
              : 'Explore all 10 foundational computer hardware components with crystal-clear explanations, real-world analogies, component types, and bilingual English-Gujarati learning.'}
          </p>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-slate-800/80">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0">
                <Box className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[11px] text-slate-400 font-medium">
                  {language === 'gu' ? 'કુલ સાધનો' : 'Total Devices'}
                </p>
                <p className="text-base font-bold text-white">10 Components</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 shrink-0">
                <HardDrive className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[11px] text-slate-400 font-medium">
                  {language === 'gu' ? 'મેમરી અને સ્ટોરેજ' : 'Memory & Storage'}
                </p>
                <p className="text-base font-bold text-white">RAM, SSD, HDD</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400 shrink-0">
                <Cpu className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[11px] text-slate-400 font-medium">
                  {language === 'gu' ? 'મુખ્ય પ્રોસેસિંગ' : 'Core Processing'}
                </p>
                <p className="text-base font-bold text-white">CPU (Processor)</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
                <Workflow className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[11px] text-slate-400 font-medium">
                  {language === 'gu' ? 'દ્વિભાષી સપોર્ટ' : 'Bilingual Support'}
                </p>
                <p className="text-base font-bold text-emerald-400">English | ગુજરાતી</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Tabs Navigation */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
        <button
          onClick={() => setActiveTab('devices')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-xs sm:text-sm transition-all ${
            activeTab === 'devices'
              ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/25 font-bold'
              : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>{language === 'gu' ? `બધા હાર્ડવેર સાધનો (${HARDWARE_DEVICES.length})` : `All Hardware Devices (${HARDWARE_DEVICES.length})`}</span>
        </button>

        <button
          onClick={() => setActiveTab('flow')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-xs sm:text-sm transition-all ${
            activeTab === 'flow'
              ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/25 font-bold'
              : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
          }`}
        >
          <Workflow className="w-4 h-4" />
          <span>{language === 'gu' ? 'સિસ્ટમ કોઓપરેશન મેપ' : 'System Cooperation Map'}</span>
        </button>

        <button
          onClick={() => setActiveTab('quiz')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-xs sm:text-sm transition-all ${
            activeTab === 'quiz'
              ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/25 font-bold'
              : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
          }`}
        >
          <HelpCircle className="w-4 h-4" />
          <span>{language === 'gu' ? 'નોલેજ ક્વિઝ' : 'Knowledge Quiz'}</span>
        </button>
      </div>

      {/* Tab 1: Devices Explorer */}
      {activeTab === 'devices' && (
        <div className="space-y-6">
          {/* Controls: Search and Categories */}
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            {/* Search Box */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={
                  language === 'gu'
                    ? 'હાર્ડવેર શોધો (RAM, SSD, CPU, Monitor...)'
                    : 'Search hardware (RAM, SSD, CPU, Monitor...)'
                }
                className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Results count */}
            <div className="text-xs text-slate-400 self-center">
              {language === 'gu' ? 'દર્શાવેલ પરિણામો:' : 'Showing:'}{' '}
              <strong className="text-white font-mono">{filteredDevices.length}</strong> / {HARDWARE_DEVICES.length}
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
            {HARDWARE_CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all border ${
                    isSelected
                      ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50 shadow-sm'
                      : 'bg-slate-900/80 text-slate-400 border-slate-800 hover:bg-slate-800 hover:text-slate-200'
                  }`}
                >
                  {cat.name[language]}
                </button>
              );
            })}
          </div>

          {/* Devices Grid */}
          {filteredDevices.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredDevices.map((device) => (
                <HardwareCard
                  key={device.id}
                  device={device}
                  language={language}
                  onSelect={setSelectedDevice}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-slate-900/50 border border-slate-800 rounded-2xl">
              <Search className="w-10 h-10 text-slate-600 mx-auto mb-3" />
              <h4 className="text-base font-semibold text-slate-300">
                {language === 'gu' ? 'કોઈ સાધન મળ્યું નથી' : 'No components found'}
              </h4>
              <p className="text-xs text-slate-500 mt-1">
                {language === 'gu'
                  ? 'કૃપા કરીને અન્ય શબ્દ અથવા કેટેગરી પસંદ કરો.'
                  : 'Try searching with a different keyword or resetting the filter.'}
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                }}
                className="mt-4 px-4 py-2 rounded-xl bg-slate-800 text-xs font-semibold text-cyan-400 hover:bg-slate-700 transition-colors"
              >
                {language === 'gu' ? 'ફિલ્ટર રીસેટ કરો' : 'Reset Filters'}
              </button>
            </div>
          )}
        </div>
      )}

      {/* Tab 2: System Cooperation Flow */}
      {activeTab === 'flow' && (
        <div className="space-y-6">
          <HardwareSystemMap onSelectDevice={handleOpenDeviceById} />
        </div>
      )}

      {/* Tab 3: Knowledge Quiz */}
      {activeTab === 'quiz' && (
        <div className="space-y-6">
          <HardwareQuickQuiz />
        </div>
      )}

      {/* Hardware Detail Modal */}
      {selectedDevice && (
        <HardwareDetailModal
          device={selectedDevice}
          language={language}
          onClose={() => setSelectedDevice(null)}
        />
      )}
    </div>
  );
};
