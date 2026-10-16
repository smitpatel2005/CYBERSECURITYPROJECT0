import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/layout/Navbar';
import { Sidebar } from './components/layout/Sidebar';
import { Breadcrumbs } from './components/layout/Breadcrumbs';

// Active Cybersecurity & Hardware Modules
import { DashboardView } from './components/dashboard/DashboardView';
import { UrlSafetyInspector } from './components/cyber/UrlSafetyInspector';
import { PasswordChecker } from './components/auth/PasswordChecker';
import { HardwareLearningView } from './components/hardware/HardwareLearningView';
import { ExhibitionModeView } from './components/exhibition/ExhibitionModeView';

const AppContent: React.FC = () => {
  const { activeModule, exhibitionMode } = useApp();
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);

  return (
    <div className="min-h-screen bg-[#080d1a] text-slate-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-black">
      {/* If Exhibition Mode is active, render full-screen presentation */}
      {exhibitionMode && <ExhibitionModeView />}

      {/* Main App Layout */}
      <Navbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      
      <div className="flex-1 flex">
        {/* Collapsible Sidebar */}
        <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

        {/* Main Content Area */}
        <main className="flex-1 lg:pl-72 flex flex-col min-w-0">
          <Breadcrumbs />

          <div className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto space-y-6">
            {activeModule === 'dashboard' && <DashboardView />}
            {activeModule === 'hardware-learning' && <HardwareLearningView />}
            {activeModule === 'url-inspector' && <UrlSafetyInspector />}
            {activeModule === 'password-checker' && <PasswordChecker />}
          </div>

          {/* Standard Footer */}
          <footer className="border-t border-slate-900 bg-slate-950/80 py-6 px-6 text-center text-xs text-slate-500 font-mono">
            <div className="max-w-7xl mx-auto flex items-center justify-center">
              <div>
                CyberShield Security Suite © 2026 • Smart Cyber Security Awareness & Digital Defense System
              </div>
            </div>
          </footer>
        </main>
      </div>
    </div>
  );
};

export function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;
