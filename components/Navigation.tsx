
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  
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
    <nav className={`fixed top-0 left-0 right-0 z-[100] md:top-0 md:left-0 md:h-screen md:w-20 flex md:flex-col items-center justify-between border-b md:border-b-0 md:border-r transition-all duration-300 ${darkMode ? 'bg-black/95 border-white/5' : 'bg-white/95 border-slate-200 shadow-2xl'}`}>
      {/* Mobile Menu Toggle - Moved to top-left */}
      <div className="md:hidden w-full flex justify-between items-center px-4 py-3">
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 rounded-xl text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-white/5"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <div className="p-2 rounded-xl bg-gradient-to-br from-blue-500/10 to-emerald-500/10 border border-blue-500/20 cursor-pointer"
          onClick={() => setView('dashboard')}>
          <Icons.Logo size={24} className="text-blue-500" />
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[99] bg-black/50 md:hidden" onClick={() => setIsMobileMenuOpen(false)}></div>
      )}

      {/* Mobile Menu - Added for mobile visibility at top with vertical layout */}
      <div className={`${isMobileMenuOpen ? 'block' : 'hidden'} md:hidden fixed top-16 left-0 right-0 bg-white dark:bg-[#0B1121] shadow-xl z-[98] p-4 border-b border-slate-200 dark:border-white/10`}>
        <div className="flex flex-col gap-3">
          {/* Main Navigation Tabs */}
          {tabs.map((tab) => {
            const isActive = activeId === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setView(tab.id);
                  setIsMobileMenuOpen(false);
                }}
                className={`flex items-center gap-3 p-4 rounded-xl transition-all ${isActive ? 'bg-blue-500/10 text-blue-500 dark:text-blue-300' : 'hover:bg-slate-100 dark:hover:bg-white/10 text-slate-700 dark:text-white'}`}
              >
                <div className="w-5 h-5">
                  {tab.icon}
                </div>
                <span className="font-bold text-base text-slate-900 dark:text-white">{tab.label}</span>
              </button>
            );
          })}
          
          <button
            onClick={() => {
              setView('profile');
              setIsMobileMenuOpen(false);
            }}
            className={`flex items-center gap-3 p-4 rounded-xl transition-all ${currentView === 'profile' ? 'bg-emerald-500/10 text-emerald-500 dark:text-emerald-300' : 'hover:bg-slate-100 dark:hover:bg-white/10 text-slate-700 dark:text-white'}`}
          >
            <Icons.User size={20} />
            <span className="font-bold text-base text-slate-900 dark:text-white">Profile</span>
          </button>
          
          <button
            onClick={toggleTheme}
            className="flex items-center gap-3 p-4 rounded-xl hover:bg-slate-100 dark:hover:bg-white/10 text-slate-700 dark:text-white transition-all"
          >
            <div className="w-5 h-5">
              {darkMode ? <Icons.Sun size={20} /> : <Icons.Moon size={20} />}
            </div>
            <span className="font-bold text-base text-slate-900 dark:text-white">{darkMode ? 'Light' : 'Dark'} Mode</span>
          </button>
          
          <button
            onClick={() => {
              onLogout();
              setIsMobileMenuOpen(false);
            }}
            className="flex items-center gap-3 p-4 rounded-xl hover:bg-rose-500/10 text-rose-500 dark:text-rose-300 transition-all"
          >
            <Icons.Logout size={20} />
            <span className="font-bold text-base text-slate-900 dark:text-white">Logout</span>
          </button>
        </div>
      </div>

      {/* Desktop Sidebar - Always visible on desktop */}
      <div className="hidden md:flex flex-col items-center w-full h-full">
        {/* Brand Logo - Navigates to default dashboard */}
        <div className="flex items-center justify-center h-20 w-full mb-2">
          <div className="p-3 rounded-2xl bg-gradient-to-br from-blue-500/10 to-emerald-500/10 border border-blue-500/20 shadow-lg cursor-pointer hover:scale-105 transition-transform"
            onClick={() => setView('dashboard')}>
            <Icons.Logo size={32} className="text-blue-500" />
          </div>
        </div>

        {/* Main Navigation Tabs - Always visible on desktop */}
        <div className="flex flex-col items-center justify-start w-full px-2 py-3 gap-1.5">
          {tabs.map((tab) => {
            const isActive = activeId === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setView(tab.id);
                }}
                className={`flex flex-col items-center justify-center p-3 w-16 h-16 rounded-[1.4rem] transition-all duration-300 group relative
                  ${isActive
                    ? 'text-blue-500 bg-blue-500/10 shadow-[0_0_20px_rgba(59,130,246,0.15)] scale-105'
                    : 'text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-white/5'}
                `}
              >
                <div className={`transition-transform duration-300 ${isActive ? 'scale-110' : 'group-hover:scale-110'}`}>
                  {tab.icon}
                </div>
                <span className={`text-[8px] font-black uppercase tracking-[0.1em] mt-1.5 transition-all duration-300 ${isActive ? 'text-blue-500 dark:text-blue-300' : 'text-slate-400 dark:text-white'}`}>
                  {tab.label}
                </span>

                {isActive && (
                  <div className="absolute -left-0.5 top-1/2 -translate-y-1/2 w-1 h-8 bg-blue-500 rounded-r-full shadow-[0_0_10px_rgba(59,130,246,0.5)]"></div>
                )}
              </button>
            );
          })}

          {/* Dedicated Profile Tab - Aligned with primary navigation flow */}
          <button
            onClick={() => setView('profile')}
            className={`flex flex-col items-center justify-center p-3 w-16 h-16 rounded-[1.4rem] transition-all duration-300 group relative
              ${currentView === 'profile'
                ? 'text-emerald-500 bg-emerald-500/10 shadow-[0_0_20px_rgba(16,185,129,0.15)] scale-105'
                : 'text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-white/5'}
            `}
          >
            <Icons.User size={20} />
            <span className={`text-[8px] font-black uppercase tracking-[0.1em] mt-1.5 transition-all duration-300 ${currentView === 'profile' ? 'text-emerald-500 dark:text-emerald-300' : 'text-slate-400 dark:text-white'}`}>
              User
            </span>
          </button>

          {/* System Utility: Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="flex flex-col items-center justify-center p-3 w-16 h-16 rounded-[1.4rem] text-slate-400 hover:text-blue-500 hover:bg-slate-50 dark:hover:bg-white/5 transition-all focus:outline-none"
          >
            <div className="transition-transform duration-300 hover:rotate-90">
              {darkMode ? <Icons.Sun size={18} /> : <Icons.Moon size={18} />}
            </div>
            <span className="text-[8px] font-black uppercase tracking-[0.1em] mt-1.5 text-slate-500 dark:text-white">Mode</span>
          </button>

          {/* Core Action: Session Logout */}
          <button
            onClick={onLogout}
            className="flex flex-col items-center justify-center p-3 w-16 h-16 rounded-[1.4rem] bg-rose-500/5 text-rose-500 hover:bg-rose-500 hover:text-white transition-all active:scale-95 border border-rose-500/10"
            title="Logout"
          >
            <Icons.Logout size={18} />
            <span className="text-[8px] font-black uppercase tracking-[0.1em] mt-1.5 text-slate-900 dark:text-white">Logout</span>
          </button>
        </div>
      </div>

      {/* Hidden spacer to maintain floor alignment on mobile if needed */}
      <div className="hidden md:block pb-6"></div>
    </nav>
  );
};

export default Navigation;
