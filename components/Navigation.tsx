
import React from 'react';
import { UserRole } from '../types';
import { Icons } from './Icons';

interface NavigationProps {
  role: UserRole;
  currentView: string;
  setView: (view: string) => void;
  onLogout: () => void;
  darkMode: boolean;
  toggleTheme: () => void;
}

const Navigation: React.FC<NavigationProps> = ({ role, currentView, setView, onLogout, darkMode, toggleTheme }) => {
  const patientTabs = [
    { id: 'dashboard', icon: <Icons.Home />, label: 'Hub' },
    { id: 'therapy', icon: <Icons.Therapy />, label: 'Labs' },
    { id: 'connect', icon: <Icons.Activity />, label: 'Link' },
    { id: 'progress', icon: <Icons.Stats />, label: 'Data' },
    { id: 'profile', icon: <Icons.User />, label: 'User' }
  ];

  const doctorTabs = [
    { id: 'patients', icon: <Icons.User />, label: 'Patients' },
    { id: 'alerts', icon: <Icons.Activity />, label: 'Alerts' },
    { id: 'reports', icon: <Icons.Stats />, label: 'Reports' }
  ];

  const activeId = (role === UserRole.DOCTOR && currentView === 'dashboard') ? 'patients' : currentView;
  const tabs = role === UserRole.PATIENT ? patientTabs : doctorTabs;

  return (
    <nav className="fixed bottom-6 left-6 right-6 z-[100] bg-white/80 backdrop-blur-xl dark:bg-[#050B14] dark:backdrop-blur-none border border-white/20 dark:border-white/5 rounded-[2.5rem] md:top-0 md:bottom-auto md:left-0 md:w-28 md:h-full md:py-14 md:flex-col md:rounded-none md:border-t-0 md:border-r shadow-2xl safe-nav transition-colors duration-300">
      {/* Desktop Identity */}
      <div className="hidden md:flex flex-col items-center gap-14 mb-16">
        <div className="cursor-pointer hover:scale-110 active:scale-90 transition-all" onClick={() => setView('dashboard')}>
          <Icons.Logo size={44} className="text-prism-dark dark:text-white" />
        </div>
      </div>

      {/* Dynamic Nav Control */}
      <div className="flex md:flex-col items-center justify-around w-full md:w-auto px-1 py-3 md:p-0 gap-1">
        {tabs.map((tab) => {
          const isActive = activeId === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setView(tab.id)}
              className={`flex flex-col items-center space-y-1.5 px-3 py-4 rounded-[1.8rem] md:my-1.5 group relative transition-all duration-300 ${isActive
                ? 'bg-prism-dark text-white dark:bg-prism-accent dark:text-prism-dark shadow-xl scale-105'
                : 'text-slate-400 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-white/5'
                }`}
            >
              <div className={`transition-transform duration-500 ${isActive ? 'scale-110' : 'group-hover:scale-110'}`}>
                {tab.icon}
              </div>

              <span className={`text-[8px] font-[1000] uppercase tracking-[0.3em] clinical-mono transition-opacity duration-300 ${isActive ? 'opacity-100' : 'opacity-0 md:hidden'}`}>
                {tab.label}
              </span>

              {isActive && (
                <div className="hidden md:block absolute -left-0 top-1/2 -translate-y-1/2 w-1.5 h-10 bg-prism-accent rounded-r-full shadow-[0_0_20px_rgba(190,242,100,0.8)]"></div>
              )}
            </button>
          );
        })}

        {/* Mobile Dark Mode Toggle */}
        <button
          onClick={toggleTheme}
          className="flex md:hidden flex-col items-center space-y-1.5 px-3 py-4 rounded-[1.8rem] group relative transition-all duration-300 bg-slate-50 dark:bg-white/5 text-slate-400 hover:text-prism-accent"
        >
          <div className="w-5 h-5 flex items-center justify-center">
            {darkMode ? <Icons.Sun size={20} /> : <Icons.Moon size={20} />}
          </div>
          <span className="text-[8px] font-bold uppercase tracking-wider opacity-60">Theme</span>
        </button>
      </div>

      <div className="hidden md:block flex-grow"></div>

      {/* Utility Actions */}
      <div className="hidden md:flex flex-col items-center gap-8 pb-10">
        <button
          onClick={toggleTheme}
          className="w-12 h-12 flex items-center justify-center rounded-[1.5rem] bg-slate-50 dark:bg-white/5 text-slate-400 hover:text-prism-accent transition-all hover:rotate-90"
        >
          {darkMode ? <Icons.Sun /> : <Icons.Moon />}
        </button>
        <button
          onClick={onLogout}
          className="w-12 h-12 flex items-center justify-center rounded-[1.5rem] bg-rose-500/5 text-slate-400 hover:text-rose-500 transition-all hover:bg-rose-500/10 active:scale-75"
        >
          <Icons.Logout />
        </button>
      </div>
    </nav>
  );
};

export default Navigation;
