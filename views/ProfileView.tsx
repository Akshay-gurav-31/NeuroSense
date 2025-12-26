
import React from 'react';
import { PatientProfile, UserAccount } from '../types';

interface ProfileViewProps {
  profile: UserAccount;
  onLogout: () => void;
  darkMode: boolean;
}

const ProfileView: React.FC<ProfileViewProps> = ({ profile, onLogout, darkMode }) => {
  return (
    <div className="max-w-2xl mx-auto space-y-12 animate-in fade-in duration-700 resolve-ui">
      <header>
        <h1 className="text-4xl font-black tracking-tight mb-2 text-[#1a365d] dark:text-white">User Settings</h1>
        <p className="text-slate-500 dark:text-slate-400">Manage your clinical identity and secure session parameters.</p>
      </header>

      <section className="p-10 rounded-[3rem] border bg-white dark:bg-[#050505] border-slate-200 dark:border-white/5 shadow-xl transition-colors">
        <div className="flex flex-col sm:flex-row items-center gap-8 mb-12 pb-12 border-b border-slate-100 dark:border-white/5">
          <div className="w-24 h-24 bg-[#48c1cf] rounded-[2rem] flex items-center justify-center text-white text-5xl font-black shadow-xl shadow-[#48c1cf]/20">
            {profile.name.charAt(0)}
          </div>
          <div className="text-center sm:text-left">
            <h2 className="text-3xl font-black mb-2 text-[#1a365d] dark:text-white">{profile.name}</h2>
            <div className="flex flex-wrap justify-center sm:justify-start gap-3">
              <span className="text-[10px] font-black uppercase tracking-widest text-[#48c1cf] bg-[#48c1cf]/10 px-3 py-1 rounded-full border border-[#48c1cf]/10">
                {profile.role}
              </span>
              {profile.caseId && <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 bg-slate-100 dark:bg-white/5 px-3 py-1 rounded-full">ID: {profile.caseId}</span>}
              {profile.licenseId && <span className="text-[10px] font-black uppercase tracking-widest text-emerald-500 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/10">License: {profile.licenseId}</span>}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="p-6 rounded-2xl border border-slate-100 dark:border-white/5 bg-slate-50 dark:bg-white/2">
            <p className="text-[9px] font-black text-slate-500 uppercase tracking-[0.2em] mb-2">Email Identity</p>
            <p className="font-bold text-sm text-[#1a365d] dark:text-slate-200">{profile.email}</p>
          </div>
          <div className="p-6 rounded-2xl border border-slate-100 dark:border-white/5 bg-slate-50 dark:bg-white/2">
            <p className="text-[9px] font-black text-slate-500 uppercase tracking-[0.2em] mb-2">Contact Number</p>
            <p className="font-bold text-sm text-[#1a365d] dark:text-slate-200">{profile.phone}</p>
          </div>
          {profile.diagnosis && (
            <div className="p-6 rounded-2xl border border-slate-100 dark:border-white/5 bg-slate-50 dark:bg-white/2">
              <p className="text-[9px] font-black text-slate-500 uppercase tracking-[0.2em] mb-2">Diagnosis Protocol</p>
              <p className="font-bold text-sm text-[#1a365d] dark:text-slate-200">{profile.diagnosis}</p>
            </div>
          )}
          <div className="p-6 rounded-2xl border border-slate-100 dark:border-white/5 bg-slate-50 dark:bg-white/2">
            <p className="text-[9px] font-black text-slate-500 uppercase tracking-[0.2em] mb-2">Clinical Enrollment</p>
            <p className="font-bold text-sm text-[#1a365d] dark:text-slate-200">{profile.startDate}</p>
          </div>
        </div>

        <div className="pt-12 border-t border-slate-100 dark:border-white/5">
          <button 
            onClick={onLogout}
            className="w-full py-5 bg-rose-500/10 text-rose-500 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-rose-500 hover:text-white transition-all shadow-lg shadow-rose-500/5 border border-rose-500/10"
          >
            TERMINATE CLINICAL SESSION
          </button>
        </div>
      </section>
    </div>
  );
};

export default ProfileView;
