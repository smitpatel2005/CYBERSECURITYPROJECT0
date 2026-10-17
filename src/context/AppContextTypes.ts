import type { AppModule, PresenterInfo, Language } from '../types';

export interface AppContextType {
  activeModule: AppModule;
  setActiveModule: (module: AppModule) => void;
  exhibitionMode: boolean;
  setExhibitionMode: (open: boolean) => void;
  exhibitionStep: number;
  setExhibitionStep: (step: number) => void;
  nextExhibitionStep: () => void;
  prevExhibitionStep: () => void;
  exitExhibition: () => void;
  theme: 'dark' | 'light';
  toggleTheme: () => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  
  // Progress tracking
  urlInspectionsCount: number;
  incrementUrlInspections: () => void;
  passwordAuditsCount: number;
  incrementPasswordAudits: () => void;
  messageScansCount: number;
  incrementMessageScans: () => void;
  
  // Presenter Info
  presenterInfo: PresenterInfo;
  updatePresenterInfo: (info: Partial<PresenterInfo>) => void;
  
  // Stats
  getOverallStats: () => {
    urlInspections: number;
    passwordAudits: number;
    messageScans: number;
  };
}
