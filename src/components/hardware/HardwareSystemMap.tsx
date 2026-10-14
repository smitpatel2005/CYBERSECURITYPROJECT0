import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { SYSTEM_COOPERATION_STEPS } from '../../data/hardwareData';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles, 
  MousePointer, 
  Cpu, 
  HardDrive, 
  Zap, 
  Monitor, 
  Layers
} from 'lucide-react';

interface HardwareSystemMapProps {
  onSelectDevice?: (deviceId: string) => void;
}

export const HardwareSystemMap: React.FC<HardwareSystemMapProps> = ({ onSelectDevice }) => {
  const { language } = useApp();
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  useEffect(() => {
    let timer: ReturnType<typeof setInterval>;
    if (isPlaying) {
      timer = setInterval(() => {
        setCurrentStepIndex((prev) => (prev + 1) % SYSTEM_COOPERATION_STEPS.length);
      }, 3500);
    }
    return () => clearInterval(timer);
  }, [isPlaying]);

  const activeStep = SYSTEM_COOPERATION_STEPS[currentStepIndex];

  const getStepIcon = (activeDevice: string) => {
    switch (activeDevice) {
      case 'mouse':
        return <MousePointer className="w-5 h-5 text-amber-400" />;
      case 'motherboard':
        return <Layers className="w-5 h-5 text-emerald-400" />;
      case 'ssd':
        return <HardDrive className="w-5 h-5 text-purple-400" />;
      case 'ram':
        return <Zap className="w-5 h-5 text-cyan-400" />;
      case 'cpu':
        return <Cpu className="w-5 h-5 text-rose-400" />;
      case 'monitor':
        return <Monitor className="w-5 h-5 text-sky-400" />;
      default:
        return <Cpu className="w-5 h-5 text-cyan-400" />;
    }
  };

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-2xl relative overflow-hidden backdrop-blur-md">
      {/* Background glow effects */}
      <div className="absolute -top-24 -right-24 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header section */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 border-b border-slate-800/80 pb-5">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-800/60 text-cyan-300 text-xs font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{language === 'gu' ? 'ઇન્ટરેક્ટિવ સિમ્યુલેશન' : 'Interactive System Flow'}</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            {language === 'gu' ? 'કમ્પ્યુટર પાર્ટ્સ કેવી રીતે સાથે કામ કરે છે?' : 'How All Hardware Devices Work Together'}
          </h3>
          <p className="text-sm text-slate-400 mt-1 max-w-2xl">
            {language === 'gu'
              ? 'ઇનપુટથી લઈને આઉટપુટ સુધી ડેટા અને વીજળી કેવી રીતે વહે છે તેનું સ્ટેપ-બાય-સ્ટેપ સિમ્યુલેશન જુઓ.'
              : 'Follow the lifecycle of an instruction: from your click, through power and memory, to the final display on your screen.'}
          </p>
        </div>

        {/* Playback Controls */}
        <div className="flex items-center gap-2 self-stretch sm:self-auto justify-end">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold transition-all border ${
              isPlaying
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 hover:bg-amber-500/30'
                : 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40 hover:bg-cyan-500/30'
            }`}
          >
            {isPlaying ? (
              <>
                <Pause className="w-4 h-4" />
                <span>{language === 'gu' ? 'રોકો' : 'Pause'}</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4" />
                <span>{language === 'gu' ? 'ઓટો-પ્લે' : 'Auto-Play'}</span>
              </>
            )}
          </button>
          <button
            onClick={() => {
              setIsPlaying(false);
              setCurrentStepIndex(0);
            }}
            title={language === 'gu' ? 'ફરીથી શરૂ કરો' : 'Reset Flow'}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Step Pills Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2 mb-8">
        {SYSTEM_COOPERATION_STEPS.map((step, idx) => {
          const isActive = idx === currentStepIndex;
          const isPassed = idx < currentStepIndex;

          return (
            <button
              key={step.step}
              onClick={() => {
                setIsPlaying(false);
                setCurrentStepIndex(idx);
              }}
              className={`relative flex flex-col items-center text-center p-3 rounded-xl border transition-all text-xs ${
                isActive
                  ? 'bg-cyan-950/80 border-cyan-400 text-white shadow-lg shadow-cyan-500/20 ring-1 ring-cyan-400'
                  : isPassed
                  ? 'bg-slate-800/60 border-slate-700/80 text-slate-300 hover:bg-slate-800'
                  : 'bg-slate-900/40 border-slate-800/60 text-slate-500 hover:bg-slate-800/40 hover:text-slate-400'
              }`}
            >
              <div className="flex items-center justify-center w-7 h-7 rounded-lg mb-1.5 transition-colors bg-slate-950 border border-slate-800">
                {getStepIcon(step.activeDevice)}
              </div>
              <span className="font-semibold truncate w-full text-[11px]">
                {language === 'gu' ? `પગલું ${idx + 1}` : `Step ${idx + 1}`}
              </span>
              <span className="text-[10px] text-slate-400 truncate w-full">
                {step.activeDevice.toUpperCase()}
              </span>
              {isPassed && (
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 absolute top-1.5 right-1.5" />
              )}
            </button>
          );
        })}
      </div>

      {/* Active Step Showcase Card */}
      <div className="bg-slate-950/80 border border-cyan-500/30 rounded-2xl p-6 sm:p-8 relative overflow-hidden">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="flex-1 space-y-3">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-md bg-cyan-500/20 text-cyan-300 font-mono text-xs font-bold border border-cyan-500/30">
                {language === 'gu' ? `સ્ટેજ ${activeStep.step} / 6` : `Stage ${activeStep.step} of 6`}
              </span>
              <span className="text-xs text-slate-400 font-medium">
                {language === 'gu' ? 'મુખ્ય સાધન:' : 'Active Component:'}{' '}
                <strong className="text-white capitalize">{activeStep.activeDevice}</strong>
              </span>
            </div>

            <h4 className="text-xl sm:text-2xl font-bold text-white">
              {activeStep.title[language]}
            </h4>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-3xl">
              {activeStep.description[language]}
            </p>

            {onSelectDevice && (
              <div className="pt-2">
                <button
                  onClick={() => onSelectDevice(activeStep.activeDevice)}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-400 hover:text-cyan-300 transition-colors group"
                >
                  <span>
                    {language === 'gu'
                      ? `${activeStep.activeDevice.toUpperCase()} ની સંપૂર્ણ વિગતો જુઓ`
                      : `View complete details for ${activeStep.activeDevice.toUpperCase()}`}
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            )}
          </div>

          {/* Step Progress & Navigation buttons */}
          <div className="flex items-center gap-2 w-full lg:w-auto justify-between lg:justify-end border-t lg:border-t-0 border-slate-800 pt-4 lg:pt-0">
            <button
              onClick={() => {
                setIsPlaying(false);
                setCurrentStepIndex((prev) => (prev > 0 ? prev - 1 : SYSTEM_COOPERATION_STEPS.length - 1));
              }}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700 transition-all"
            >
              {language === 'gu' ? '← પાછળ' : '← Previous'}
            </button>
            <button
              onClick={() => {
                setIsPlaying(false);
                setCurrentStepIndex((prev) => (prev + 1) % SYSTEM_COOPERATION_STEPS.length);
              }}
              className="px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-medium shadow-md shadow-cyan-600/30 transition-all flex items-center gap-1"
            >
              <span>{language === 'gu' ? 'આગળ →' : 'Next Step →'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Real-world takeaway */}
      <div className="mt-5 p-4 rounded-xl bg-slate-950/40 border border-slate-800/80 flex items-start gap-3">
        <div className="w-2 h-2 rounded-full bg-cyan-400 mt-2 shrink-0 animate-ping" />
        <p className="text-xs text-slate-400 leading-relaxed">
          <strong className="text-slate-200">
            {language === 'gu' ? 'યાદ રાખો (Takeaway):' : 'Key Takeaway:'}{' '}
          </strong>
          {language === 'gu'
            ? 'કમ્પ્યુટરનો કોઈપણ એક ભાગ એકલો કામ કરી શકતો નથી. કીબોર્ડ/માઉસ કમાન્ડ આપે છે, મધરબોર્ડ તેને પહોંચાડે છે, SMPS વીજળી આપે છે, SSD ફાઇલ ખોલે છે, RAM તેને હાથવગી રાખે છે, CPU ગણતરી કરે છે, અને મોનિટર તેનું પરિણામ આંખો સામે પ્રદર્શિત કરે છે!'
            : 'No computer component works alone. Input initiates the command, motherboard routes it with steady SMPS power, SSD supplies saved files, RAM accelerates memory transfer, CPU executes calculations, and the monitor projects the visual output!'}
        </p>
      </div>
    </div>
  );
};
