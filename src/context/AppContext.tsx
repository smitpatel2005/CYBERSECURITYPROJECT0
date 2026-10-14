import React, { useState, useEffect } from 'react';
import type { AppModule, PresenterInfo, Language } from '../types';
import { AppContext } from './AppContextObject';

export { useApp } from './useApp';
export type { AppContextType } from './AppContextTypes';

const defaultPresenter: PresenterInfo = {
  name: 'Student Technical Team',
  rollNo: 'IANT-CYBER-2026-042',
  institution: 'Institute of Advanced Network Technology (IANT)',
  mentor: 'Senior Technical Faculty Advisor',
  department: 'Cybersecurity & Systems Defense Division'
};

const STORAGE_KEY = 'cybershield_cyber_state_v3';

function getInitialStorage() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch {
    // In case storage is inaccessible
  }
  return {};
}

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const initialData = getInitialStorage();

  const [activeModule, setActiveModuleState] = useState<AppModule>('dashboard');
  const [exhibitionMode, setExhibitionMode] = useState<boolean>(false);
  const [exhibitionStep, setExhibitionStep] = useState<number>(0);
  const [theme, setTheme] = useState<'dark' | 'light'>(initialData.theme || 'dark');
  const [language, setLanguageState] = useState<Language>(initialData.language || 'en');

  const [urlInspectionsCount, setUrlInspectionsCount] = useState<number>(initialData.urlInspectionsCount || 0);
  const [passwordAuditsCount, setPasswordAuditsCount] = useState<number>(initialData.passwordAuditsCount || 0);
  const [presenterInfo, setPresenterInfo] = useState<PresenterInfo>(initialData.presenterInfo || defaultPresenter);

  // Sync state to localStorage safely
  const persistState = (partial: Record<string, unknown>) => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      const existing = saved ? JSON.parse(saved) : {};
      const updated = { ...existing, ...partial };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch {
      // Storage unavailable
    }
  };

  const setActiveModule = (mod: AppModule) => {
    setActiveModuleState(mod);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    persistState({ theme: next });
    if (next === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    persistState({ language: lang });
  };

  const toggleLanguage = () => {
    const next: Language = language === 'en' ? 'gu' : 'en';
    setLanguageState(next);
    persistState({ language: next });
  };

  const incrementUrlInspections = () => {
    const next = urlInspectionsCount + 1;
    setUrlInspectionsCount(next);
    persistState({ urlInspectionsCount: next });
  };

  const incrementPasswordAudits = () => {
    const next = passwordAuditsCount + 1;
    setPasswordAuditsCount(next);
    persistState({ passwordAuditsCount: next });
  };

  const updatePresenterInfo = (info: Partial<PresenterInfo>) => {
    const next = { ...presenterInfo, ...info };
    setPresenterInfo(next);
    persistState({ presenterInfo: next });
  };

  const nextExhibitionStep = () => {
    setExhibitionStep((prev) => Math.min(prev + 1, 3));
  };

  const prevExhibitionStep = () => {
    setExhibitionStep((prev) => Math.max(prev - 1, 0));
  };

  const exitExhibition = () => {
    setExhibitionMode(false);
  };

  const getOverallStats = () => {
    return {
      urlInspections: urlInspectionsCount,
      passwordAudits: passwordAuditsCount
    };
  };

  return (
    <AppContext.Provider
      value={{
        activeModule,
        setActiveModule,
        exhibitionMode,
        setExhibitionMode,
        exhibitionStep,
        setExhibitionStep,
        nextExhibitionStep,
        prevExhibitionStep,
        exitExhibition,
        theme,
        toggleTheme,
        language,
        setLanguage,
        toggleLanguage,
        urlInspectionsCount,
        incrementUrlInspections,
        passwordAuditsCount,
        incrementPasswordAudits,
        presenterInfo,
        updatePresenterInfo,
        getOverallStats
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
