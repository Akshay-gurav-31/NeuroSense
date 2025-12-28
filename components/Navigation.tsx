
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
    { id: 'chat', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" /></svg>, label: 'Chat' },
    { id: 'connect', icon: <Icons.Activity />, label: 'Link' },
    { id: 'progress', icon: <Icons.Stats />, label: 'Data' },
  ];

  const doctorTabs = [
    { id: 'patients', icon: <Icons.User />, label: 'Cohort' },
    { id: 'chat', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" /></svg>, label: 'Chat' },
    { id: 'alerts', icon: <Icons.Activity />, label: 'Alerts' },
    { id: 'reports', icon: <Icons.Stats />, label: 'Reports' },
  ];

  const activeId = (role === UserRole.DOCTOR && currentView === 'dashboard') ? 'patients' : currentView;
  const tabs = role === UserRole.PATIENT ? patientTabs : doctorTabs;

  return (
    <nav className={`fixed bottom-0 left-0 right-0 z-[100] md:top-0 md:h-screen md:w-20 flex md:flex-col items-center justify-between border-t md:border-t-0 md:border-r transition-all duration-300 backdrop-blur-3xl 
      ${darkMode ? 'bg-black/95 border-white/5' : 'bg-white/95 border-slate-200 shadow-2xl'}
    `}>
      {/* Top Section: Logo & Primary Nav */}
      <div className="flex md:flex-col items-center w-full">
        {/* Desktop Logo */}
        <div className="hidden md:flex items-center justify-center h-20 w-full mb-2">
          <div className="p-3 rounded-2xl bg-gradient-to-br from-blue-500/10 to-emerald-500/10 border border-blue-500/20 shadow-lg cursor-pointer hover:scale-105 transition-transform"
            onClick={() => setView('dashboard')}>
            <Icons.Logo size={32} className="text-blue-500" />
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex md:flex-col items-center justify-around md:justify-start w-full px-2 py-3 md:py-0 gap-1 md:gap-3">
          {tabs.map((tab) => {
            const isActive = activeId === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setView(tab.id)}
                className={`flex flex-col items-center justify-center p-3 md:w-16 md:h-16 rounded-[1.4rem] transition-all duration-300 group relative
                  ${isActive
                    ? 'text-blue-500 bg-blue-500/10 shadow-[0_0_20px_rgba(59,130,246,0.15)] scale-105'
                    : 'text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-white/5'}
                `}
              >
                <div className={`transition-transform duration-300 ${isActive ? 'scale-110' : 'group-hover:scale-110'}`}>
                  {tab.icon}
                </div>
                <span className={`text-[8px] font-black uppercase tracking-[0.1em] mt-1.5 transition-all duration-300 ${isActive ? 'text-blue-500' : 'text-slate-500 dark:text-slate-400'}`}>
                  {tab.label}
                </span>

                {isActive && (
                  <div className="hidden md:block absolute -left-0.5 top-1/2 -translate-y-1/2 w-1 h-8 bg-blue-500 rounded-r-full shadow-[0_0_10px_rgba(59,130,246,0.5)]"></div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Bottom Section: Theme & Profile/Logout */}
      <div className="flex md:flex-col items-center gap-2 md:gap-4 px-4 md:px-0 md:pb-8">
        {/* Profile */}
        <button
          onClick={() => setView('profile')}
          className={`flex flex-col items-center justify-center p-3 md:w-16 md:h-16 rounded-[1.4rem] transition-all duration-300 group
            ${currentView === 'profile'
              ? 'text-emerald-500 bg-emerald-500/10'
              : 'text-slate-400 hover:bg-slate-50 dark:hover:bg-white/5'}
          `}
        >
          <Icons.User size={20} />
          <span className={`text-[8px] font-black uppercase tracking-[0.1em] mt-1.5 transition-all duration-300 ${currentView === 'profile' ? 'text-emerald-500' : 'text-slate-500 dark:text-slate-400'}`}>User</span>
        </button>

        <div className="hidden md:block w-8 h-[1px] bg-slate-200 dark:bg-white/10 opacity-50"></div>

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="flex flex-col items-center justify-center p-3 md:w-16 md:h-16 rounded-[1.4rem] text-slate-400 hover:bg-slate-50 dark:hover:bg-white/5 transition-all focus:outline-none"
        >
          {darkMode ? <Icons.Sun size={18} /> : <Icons.Moon size={18} />}
          <span className="text-[8px] font-black uppercase tracking-[0.1em] mt-1.5 text-slate-500 dark:text-slate-400">Mode</span>
        </button>

        {/* Logout Button */}
        <button
          onClick={onLogout}
          className="flex flex-col items-center justify-center p-3 md:w-16 md:h-16 rounded-[1.4rem] bg-rose-500/10 text-rose-500 hover:bg-rose-500 hover:text-white transition-all active:scale-95 shadow-sm border border-rose-500/20"
          title="Logout"
        >
          <Icons.Logout size={20} />
          <span className="text-[8px] font-black uppercase tracking-[0.1em] mt-1.5">Exit</span>
        </button>
      </div>
    </nav>
  );
};

export default Navigation;
