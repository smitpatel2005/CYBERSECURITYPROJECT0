import { useContext } from 'react';
import { AppContext } from './AppContextObject';
import type { AppContextType } from './AppContextTypes';

export const useApp = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

export default useApp;
