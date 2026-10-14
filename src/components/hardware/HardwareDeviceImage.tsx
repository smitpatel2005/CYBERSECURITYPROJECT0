import React, { useState } from 'react';
import { 
  Cpu, 
  HardDrive, 
  Zap, 
  Monitor, 
  Mouse, 
  Keyboard, 
  Box, 
  Layers, 
  CircuitBoard 
} from 'lucide-react';

interface HardwareDeviceImageProps {
  src: string;
  alt: string;
  fallbackType: string;
  className?: string;
  aspectRatio?: string;
}

export const HardwareDeviceImage: React.FC<HardwareDeviceImageProps> = ({
  src,
  alt,
  fallbackType,
  className = 'w-full h-48',
  aspectRatio = 'aspect-video'
}) => {
  const [hasError, setHasError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const getFallbackIcon = () => {
    switch (fallbackType) {
      case 'ram':
        return <Layers className="w-12 h-12 text-cyan-400 animate-pulse" />;
      case 'hdd':
        return <HardDrive className="w-12 h-12 text-amber-400" />;
      case 'ssd':
        return <HardDrive className="w-12 h-12 text-blue-400" />;
      case 'motherboard':
        return <CircuitBoard className="w-12 h-12 text-emerald-400" />;
      case 'smps':
        return <Zap className="w-12 h-12 text-yellow-400" />;
      case 'cpu':
      case 'processor':
        return <Cpu className="w-12 h-12 text-cyan-400" />;
      case 'monitor':
        return <Monitor className="w-12 h-12 text-indigo-400" />;
      case 'mouse':
        return <Mouse className="w-12 h-12 text-teal-400" />;
      case 'keyboard':
        return <Keyboard className="w-12 h-12 text-purple-400" />;
      case 'cabinet':
        return <Box className="w-12 h-12 text-slate-400" />;
      default:
        return <Cpu className="w-12 h-12 text-cyan-400" />;
    }
  };

  return (
    <div className={`relative overflow-hidden bg-slate-900 border border-slate-800 rounded-2xl flex items-center justify-center ${className} ${aspectRatio}`}>
      {!hasError ? (
        <>
          {isLoading && (
            <div className="absolute inset-0 bg-slate-900/90 flex flex-col items-center justify-center gap-2 z-10">
              <div className="w-7 h-7 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />
              <span className="text-[11px] font-mono text-slate-400">Loading device photo...</span>
            </div>
          )}
          <img
            src={src}
            alt={alt}
            loading="lazy"
            onLoad={() => setIsLoading(false)}
            onError={() => {
              setHasError(true);
              setIsLoading(false);
            }}
            className={`w-full h-full object-cover transition-transform duration-500 hover:scale-105 ${
              isLoading ? 'opacity-0' : 'opacity-100'
            }`}
          />
        </>
      ) : (
        <div className="w-full h-full p-6 flex flex-col items-center justify-center text-center bg-gradient-to-br from-slate-900 to-slate-950 space-y-2">
          <div className="p-3 rounded-2xl bg-slate-800/80 border border-slate-700/80 shadow-lg">
            {getFallbackIcon()}
          </div>
          <span className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wide">
            {alt}
          </span>
          <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950/60 px-2.5 py-0.5 rounded-full border border-cyan-800/40">
            Hardware Component
          </span>
        </div>
      )}
    </div>
  );
};
