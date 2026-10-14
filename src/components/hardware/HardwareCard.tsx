import React from 'react';
import { HardwareDevice, Language } from '../../types';
import { HardwareDeviceImage } from './HardwareDeviceImage';
import { 
  ArrowRight, 
  Lightbulb, 
  Cpu, 
  Layers, 
  HardDrive, 
  CircuitBoard, 
  Zap, 
  Monitor, 
  Mouse, 
  Keyboard, 
  Box,
  CheckCircle2
} from 'lucide-react';

interface HardwareCardProps {
  device: HardwareDevice;
  language: Language;
  onSelect: (device: HardwareDevice) => void;
}

export const HardwareCard: React.FC<HardwareCardProps> = ({
  device,
  language,
  onSelect
}) => {
  const getDeviceIcon = () => {
    switch (device.fallbackSvgType) {
      case 'ram':
        return <Layers className="w-4 h-4 text-cyan-400" />;
      case 'hdd':
      case 'ssd':
        return <HardDrive className="w-4 h-4 text-blue-400" />;
      case 'motherboard':
        return <CircuitBoard className="w-4 h-4 text-emerald-400" />;
      case 'smps':
        return <Zap className="w-4 h-4 text-amber-400" />;
      case 'cpu':
      case 'processor':
        return <Cpu className="w-4 h-4 text-cyan-400" />;
      case 'monitor':
        return <Monitor className="w-4 h-4 text-indigo-400" />;
      case 'mouse':
        return <Mouse className="w-4 h-4 text-teal-400" />;
      case 'keyboard':
        return <Keyboard className="w-4 h-4 text-purple-400" />;
      case 'cabinet':
        return <Box className="w-4 h-4 text-slate-300" />;
      default:
        return <Cpu className="w-4 h-4 text-cyan-400" />;
    }
  };

  const categoryLabels: Record<string, { en: string; gu: string }> = {
    internal: { en: 'Internal', gu: 'આંતરિક' },
    storage: { en: 'Storage', gu: 'સ્ટોરેજ' },
    input: { en: 'Input', gu: 'ઇનપુટ' },
    output: { en: 'Output', gu: 'આઉટપુટ' },
    power: { en: 'Power', gu: 'પાવર' },
    case: { en: 'Case', gu: 'કેસ' }
  };

  return (
    <div 
      onClick={() => onSelect(device)}
      className="group bg-slate-900/90 hover:bg-slate-900 border border-slate-800 hover:border-cyan-500/50 rounded-3xl overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-[0_8px_30px_rgba(6,182,212,0.15)] flex flex-col justify-between"
    >
      <div>
        {/* Device Image Header */}
        <div className="relative p-3 pb-0">
          <HardwareDeviceImage
            src={device.image}
            alt={device.name[language]}
            fallbackType={device.fallbackSvgType}
            className="w-full h-44 rounded-2xl"
          />

          {/* Category badges floating on top right */}
          <div className="absolute top-5 right-5 flex flex-wrap gap-1.5 justify-end max-w-[70%]">
            {device.category.map((cat) => (
              <span
                key={cat}
                className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-950/80 backdrop-blur-md text-cyan-300 border border-cyan-500/30 font-semibold"
              >
                {categoryLabels[cat]?.[language] || cat}
              </span>
            ))}
          </div>
        </div>

        {/* Content Body */}
        <div className="p-5 space-y-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <div className="p-1.5 rounded-lg bg-slate-800/80 border border-slate-700/60">
                {getDeviceIcon()}
              </div>
              <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                {device.name[language]}
              </h3>
            </div>

            {device.fullForm && (
              <p className="text-[11px] font-mono text-cyan-400 bg-cyan-950/40 px-2.5 py-0.5 rounded-lg border border-cyan-800/40 inline-block mt-0.5">
                {device.fullForm[language]}
              </p>
            )}
          </div>

          <p className="text-xs text-slate-300 leading-relaxed line-clamp-3">
            {device.shortDefinition[language]}
          </p>

          {/* Relationship clarification if available (e.g. CPU & Processor) */}
          {device.relationshipNote && (
            <div className="p-2.5 rounded-xl bg-blue-950/40 border border-blue-500/30 text-[11px] text-blue-200">
              <span className="font-semibold block text-cyan-400">
                {language === 'gu' ? 'મહત્વની સ્પષ્ટતા:' : 'Relationship Note:'}
              </span>
              <span className="line-clamp-2">{device.relationshipNote[language]}</span>
            </div>
          )}

          {/* Types preview tag strip */}
          <div className="pt-1">
            <span className="text-[10px] font-mono uppercase text-slate-500 block mb-1.5 font-semibold">
              {language === 'gu' ? 'મુખ્ય પ્રકારો:' : 'Common Types:'}
            </span>
            <div className="flex flex-wrap gap-1.5">
              {device.types.slice(0, 3).map((type, idx) => (
                <span
                  key={idx}
                  className="text-[10px] font-mono bg-slate-800/80 text-slate-300 px-2 py-0.5 rounded-md border border-slate-700/60"
                >
                  {type.name[language]}
                </span>
              ))}
              {device.types.length > 3 && (
                <span className="text-[10px] font-mono text-cyan-400 bg-slate-800 px-1.5 py-0.5 rounded">
                  +{device.types.length - 3}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Card Footer with Remember This & Action */}
      <div className="p-5 pt-0">
        <div className="p-3 rounded-xl bg-slate-950 border border-slate-800/80 space-y-1 mb-3">
          <div className="flex items-center gap-1.5 text-[11px] text-amber-400 font-semibold font-mono">
            <Lightbulb className="w-3.5 h-3.5" />
            <span>{language === 'gu' ? 'યાદ રાખો (Remember This):' : 'Remember This:'}</span>
          </div>
          <p className="text-[11px] text-slate-400 line-clamp-2">
            {device.rememberThis[language]}
          </p>
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onSelect(device);
          }}
          className="w-full py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-cyan-600 group-hover:bg-gradient-to-r group-hover:from-cyan-600 group-hover:to-blue-600 text-white text-xs font-semibold flex items-center justify-center gap-2 transition-all shadow-md group-hover:shadow-cyan-900/40"
        >
          <span>{language === 'gu' ? 'સંપૂર્ણ વિગત જુઓ' : 'Explore Full Details'}</span>
          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
        </button>
      </div>
    </div>
  );
};
