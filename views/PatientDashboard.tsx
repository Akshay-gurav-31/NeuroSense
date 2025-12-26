
import React from 'react';
import { TherapyType, PatientProfile, SessionResult } from '../types';
import { Icons } from '../components/Icons';

interface DashboardProps {
  profile: PatientProfile;
  history: SessionResult[];
  onStartTherapy: (type: TherapyType) => void;
  darkMode: boolean;
}

const PatientDashboard: React.FC<DashboardProps> = ({ profile, history, onStartTherapy, darkMode }) => {
  const avgScore = history.length > 0
    ? Math.round(history.reduce((acc, curr) => acc + curr.score, 0) / history.length)
    : 0;

  const dailyTasks = [
    { title: 'Motor Sync', type: TherapyType.BODY, icon: <Icons.Body />, desc: 'Biomechanical kinematic assessment' },
    { title: 'Vocal Clarity', type: TherapyType.SPEECH, icon: <Icons.Mic />, desc: 'Articulation precision analysis' },
    { title: 'Neural Speed', type: TherapyType.BRAIN, icon: <Icons.Brain />, desc: 'Cognitive sequence processing' }
  ];

  return (
    <div className="space-y-6 sm:space-y-8 resolve-ui">
      <header className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 pb-8 border-b border-slate-200 dark:border-white/10">
        <div className="w-full">
          <div className="inline-flex items-center gap-3 px-5 py-2 bg-slate-100 dark:bg-prism-accent/10 text-slate-600 dark:text-prism-accent rounded-full text-[9px] font-black uppercase tracking-[0.3em] mb-8 border border-slate-200 dark:border-white/5">
            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.5)]"></span>
            Telemetry Link: Active
          </div>
          <h1 className="text-5xl lg:text-[5.5rem] font-[1000] tracking-[-0.06em] mb-4 leading-[0.85] text-slate-900 dark:text-white transition-colors duration-500">
            Hello, <br /> {profile.name.split(' ')[0]}.
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-xl font-medium tracking-tight">Protocol: <span className="text-slate-900 dark:text-prism-accent font-black uppercase tracking-widest text-xs clinical-mono ml-2">{profile.diagnosis}</span></p>
        </div>

        <div className="flex gap-4 w-full lg:w-auto">
          <div className="flex-1 lg:min-w-[160px] bg-white dark:bg-[#080808] border border-slate-200 dark:border-white/10 p-6 rounded-[2.5rem] text-center shadow-lg transition-colors duration-500">
            <p className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2">Stability</p>
            <p className="text-3xl font-black text-slate-900 dark:text-white">96.8%</p>
          </div>
          <div className="flex-1 lg:min-w-[160px] bg-slate-900 dark:bg-[#0c0c0c] p-6 rounded-[2.5rem] text-center text-white shadow-xl transition-colors duration-500">
            <p className="text-[9px] font-black uppercase tracking-[0.2em] opacity-40 mb-2">Phase</p>
            <p className="text-3xl font-black tracking-tighter">14</p>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <section className="xl:col-span-2 bg-white dark:bg-[#080808] rounded-[3.5rem] p-8 lg:p-12 relative overflow-hidden border border-slate-200 dark:border-white/10 shadow-xl group transition-colors duration-500">
          <div className="relative z-10">
            <h2 className="text-[10px] font-[900] uppercase tracking-[0.4em] text-slate-400 mb-10">Historical Synthesis</h2>

            <div className="flex flex-col sm:flex-row items-start sm:items-end gap-6 mb-12">
              <span className="text-8xl lg:text-[10rem] font-[1000] tracking-[-0.08em] leading-none text-slate-900 dark:text-white transition-colors duration-500">{avgScore}</span>
              <div className="sm:mb-8">
                <span className="text-4xl font-black text-slate-200 dark:text-white/5 block mb-4 tracking-tighter">/ 100</span>
                <div className="flex items-center gap-2 px-4 py-2 bg-emerald-500/10 text-emerald-600 dark:text-emerald-500 rounded-xl text-[10px] font-black uppercase tracking-widest border border-emerald-500/20">
                  +6.2% Velocity
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pt-10 border-t border-slate-100 dark:border-white/10">
              <div className="space-y-1">
                <p className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400">Node Status</p>
                <p className="text-2xl font-black text-emerald-500 uppercase tracking-tight">Optimal</p>
              </div>
              <div className="md:col-span-3 p-6 bg-slate-50 dark:bg-white/[0.02] rounded-[2rem] border border-slate-100 dark:border-white/10">
                <p className="text-base font-medium leading-[1.6] text-slate-600 dark:text-slate-300 italic">"Neural plasticity markers are trending high. Stage 3 progression recommended."</p>
              </div>
            </div>
          </div>
        </section>

        <section className="h-full">
          <div className="bg-slate-900 dark:bg-[#0c0c0c] rounded-[3.5rem] p-10 text-white shadow-2xl relative overflow-hidden h-full flex flex-col justify-between border border-slate-800 dark:border-white/10 transition-colors duration-500">
            <div className="relative z-10">
              <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center mb-10 border border-white/10">
                <Icons.Activity />
              </div>
              <h3 className="text-3xl font-[900] tracking-tighter mb-4">Export Protocol</h3>
              <p className="text-white/40 text-base font-medium leading-relaxed mb-12">Authorized telemetry transmission for physician audit.</p>
            </div>

            <button className="relative z-10 w-full py-6 bg-[#BEF264] text-slate-900 rounded-[1.8rem] font-black uppercase tracking-[0.25em] text-[10px] shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all">
              DOWNLOAD DATA
            </button>
          </div>
        </section>
      </div>

      <section>
        <div className="flex items-center justify-between mb-12 px-2">
          <h2 className="text-3xl font-[1000] tracking-tight text-slate-900 dark:text-white transition-colors duration-500">Active Labs.</h2>
          <div className="h-[0.5px] bg-slate-200 dark:bg-white/10 flex-grow mx-10"></div>
          <span className="text-[9px] font-black uppercase tracking-[0.4em] text-slate-400 clinical-mono">CORE V5.2</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {dailyTasks.map((task, idx) => (
            <div
              key={idx}
              onClick={() => onStartTherapy(task.type)}
              className="group cursor-pointer bg-white dark:bg-[#080808] p-10 rounded-[3rem] border border-slate-200 dark:border-white/10 hover:border-[#BEF264] dark:hover:border-[#BEF264] transition-all flex flex-col items-start relative overflow-hidden shadow-md"
            >
              <div className="w-16 h-16 rounded-2xl bg-slate-50 dark:bg-white/5 text-slate-600 dark:text-[#BEF264] flex items-center justify-center mb-8 group-hover:bg-[#BEF264] group-hover:text-slate-900 transition-all border border-slate-100 dark:border-white/10">
                {task.icon}
              </div>
              <h3 className="text-2xl font-[1000] tracking-tighter mb-2 text-slate-900 dark:text-white leading-none transition-colors duration-500">{task.title}</h3>
              <p className="text-slate-500 dark:text-slate-400 text-xs font-medium mb-12 leading-relaxed max-w-[90%]">{task.desc}</p>

              <div className="w-full pt-8 border-t border-slate-100 dark:border-white/10 flex items-center justify-between group-hover:text-[#BEF264] transition-colors">
                <span className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-400">INITIALIZE</span>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" className="group-hover:translate-x-2 transition-transform"><path d="m9 18 6-6-6-6" /></svg>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default PatientDashboard;
