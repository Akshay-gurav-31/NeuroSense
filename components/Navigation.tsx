
import React, { useState, useEffect } from 'react';
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
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Close drawer on escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsDrawerOpen(false);
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  const patientTabs = [
    { id: 'dashboard', icon: <Icons.Home />, label: 'Hub' },
    { id: 'therapy', icon: <Icons.Therapy />, label: 'Labs' },
    { id: 'chat', icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" /></svg>, label: 'Chat' },
    { id: 'connect', icon: <Icons.Activity />, label: 'Link' },
    { id: 'progress', icon: <Icons.Stats />, label: 'Data' },
  ];

  const doctorTabs = [
    { id: 'dashboard', icon: <Icons.Home />, label: 'Dashboard' },
    { id: 'patients', icon: <Icons.User />, label: 'Cohort' },
    { id: 'chat', icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" /></svg>, label: 'Chat' },
    { id: 'alerts', icon: <Icons.Activity />, label: 'Alerts' },
    { id: 'reports', icon: <Icons.Stats />, label: 'Reports' },
  ];

  const activeId = (role === UserRole.DOCTOR && currentView === 'dashboard') ? 'patients' : currentView;
  const tabs = role === UserRole.PATIENT ? patientTabs : doctorTabs;

  return (
    <>
      {/* 1. Hamburger Button (Floating Top-Right) */}
      <button
        onClick={() => setIsDrawerOpen(true)}
        className="fixed top-6 right-6 z-[200] p-4 bg-white/90 dark:bg-[#0B1121]/90 backdrop-blur-xl border border-slate-200 dark:border-white/10 rounded-[1.5rem] shadow-xl text-slate-900 dark:text-white hover:text-blue-600 dark:hover:text-cyan-400 hover:scale-105 transition-all active:scale-95 group"
        aria-label="Open Menu"
      >
        <div className="space-y-1.5 flex flex-col items-end">
          <span className="block w-6 h-[3px] bg-current rounded-full transition-all duration-300 group-hover:w-8 group-hover:bg-blue-600 dark:group-hover:bg-cyan-400"></span>
          <span className="block w-4 h-[3px] bg-current rounded-full transition-all duration-300 group-hover:w-8 group-hover:bg-blue-600 dark:group-hover:bg-cyan-400"></span>
          <span className="block w-6 h-[3px] bg-current rounded-full transition-all duration-300 group-hover:w-8 group-hover:bg-blue-600 dark:group-hover:bg-cyan-400"></span>
        </div>
      </button>

      {/* 2. Enhanced Overlay (Backdrop) */}
      <div
        className={`fixed inset-0 z-[210] bg-[#020408]/60 backdrop-blur-md transition-opacity duration-500 ease-out ${isDrawerOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setIsDrawerOpen(false)}
      />

      {/* 3. Floating Card Drawer */}
      <div className={`fixed top-4 bottom-4 right-4 z-[220] w-[calc(100vw-2rem)] sm:w-[480px] bg-white dark:bg-[#080d1a] rounded-[2.5rem] shadow-2xl border border-slate-200 dark:border-white/10 transform transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] flex flex-col overflow-hidden ${isDrawerOpen ? 'translate-x-0' : 'translate-x-[calc(100%+2rem)]'}`}>

        {/* Drawer Header: Brand & Close */}
        <div className="flex-none p-8 sm:p-10 flex items-center justify-between border-b border-slate-100 dark:border-white/5 bg-slate-50/30 dark:bg-white/[0.01]">
          <button
            onClick={() => setIsDrawerOpen(false)}
            className="p-4 rounded-2xl hover:bg-rose-50 dark:hover:bg-rose-500/10 text-slate-400 hover:text-rose-500 transition-colors group"
          >
            <svg className="w-6 h-6 transition-transform duration-300 group-hover:rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>

          <div className="flex items-center gap-4 cursor-pointer group text-right" onClick={() => { setView('dashboard'); setIsDrawerOpen(false); }}>
            <div className="flex flex-col items-end">
              <h2 className="text-2xl font-[1000] uppercase tracking-tighter text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-cyan-400 transition-colors">NeuroSense</h2>
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 dark:text-slate-500">System v4.0</p>
            </div>
            <div className="p-3 rounded-2xl bg-blue-500/10 dark:bg-cyan-500/10 text-blue-600 dark:text-cyan-400 shadow-sm">
              <Icons.Logo size={28} />
            </div>
          </div>
        </div>

        {/* Drawer Body: Navigation Menu */}
        <div className="flex-grow overflow-y-auto py-8 px-4 sm:px-6">
          <h3 className="px-6 text-[11px] font-black uppercase tracking-[0.4em] text-slate-400 dark:text-slate-600 mb-6 text-right">Main Menu</h3>
          <div className="space-y-3">
            {tabs.map((tab) => {
              const isActive = activeId === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setView(tab.id);
                    setIsDrawerOpen(false);
                  }}
                  className={`w-full flex items-center justify-end gap-6 px-8 py-5 rounded-[2rem] transition-all duration-300 group relative overflow-hidden
                     ${isActive
                      ? 'bg-blue-600 text-white shadow-[0_8px_30px_-5px_rgba(37,99,235,0.4)] dark:bg-cyan-500/10 dark:text-cyan-400 dark:border dark:border-cyan-500/20 dark:shadow-[0_0_20px_-5px_rgba(34,211,238,0.2)]'
                      : 'text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-white'}
                   `}
                >

                  <span className={`relative z-10 font-[900] uppercase tracking-[0.15em] text-sm flex-grow text-right transition-all duration-300 ${isActive ? '-translate-x-1' : ''}`}>{tab.label}</span>
                  <div className={`relative z-10 w-6 h-6 transition-transform duration-300 ${isActive ? 'scale-110' : 'group-hover:scale-110'}`}>
                    {tab.icon}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Drawer Footer: User & System */}
        <div className="flex-none p-6 border-t border-slate-100 dark:border-white/5 bg-slate-50/50 dark:bg-black/20">
          <div className="grid grid-cols-2 gap-4 mb-4">
            <button
              onClick={() => { setView('profile'); setIsDrawerOpen(false); }}
              className={`flex flex-col items-center justify-center p-5 rounded-[2rem] gap-2 transition-all hover:scale-105 active:scale-95 ${currentView === 'profile' ? 'bg-white shadow-lg text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400' : 'bg-slate-100 dark:bg-white/5 text-slate-500 dark:text-slate-400'}`}
            >
              <Icons.User size={20} />
              <span className="font-bold text-[10px] uppercase tracking-widest">Profile</span>
            </button>
            <button
              onClick={toggleTheme}
              className="flex flex-col items-center justify-center p-5 rounded-[2rem] gap-2 transition-all hover:scale-105 active:scale-95 bg-slate-100 dark:bg-white/5 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            >
              {darkMode ? <Icons.Sun size={20} /> : <Icons.Moon size={20} />}
              <span className="font-bold text-[10px] uppercase tracking-widest">{darkMode ? 'Light' : 'Dark'}</span>
            </button>
          </div>

          <button
            onClick={() => { onLogout(); setIsDrawerOpen(false); }}
            className="w-full flex items-center justify-center gap-3 p-6 rounded-[2rem] text-rose-500 bg-rose-50 dark:bg-rose-500/10 hover:bg-rose-500 hover:text-white transition-all group active:scale-95"
          >
            <span className="font-black text-xs uppercase tracking-[0.2em]">Terminate Session</span>
            <Icons.Logout size={16} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

      </div>
    </>
  );
};

export default Navigation;
