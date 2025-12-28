import React from 'react';
import { TherapyType, PatientProfile, SessionResult, Connection, UserAccount, ConnectionStatus } from '../types';
import { Icons } from '../components/Icons';
import { aiScoringService } from '../services/ai-scoring.service';
import DailyTracker from '../components/DailyTracker';
import { isToday } from '../utils/date-helpers';

interface DashboardProps {
  profile: PatientProfile;
  history: SessionResult[];
  onStartTherapy: (type: TherapyType) => void;
  darkMode: boolean;
}

const PatientDashboard: React.FC<DashboardProps> = ({ profile, history, onStartTherapy, darkMode }) => {
  const recoveryData = aiScoringService.predictRecovery(history);
  const riskData = aiScoringService.assessRisk(history);
  const avgScore = recoveryData.currentScore;

  const dailyTasks = [
    { title: 'Motor Sync', type: TherapyType.BODY, icon: <Icons.Body />, desc: 'Biomechanical kinematic assessment' },
    { title: 'Vocal Clarity', type: TherapyType.SPEECH, icon: <Icons.Mic />, desc: 'Articulation precision analysis' },
    { title: 'Neural Speed', type: TherapyType.BRAIN, icon: <Icons.Brain />, desc: 'Cognitive sequence processing' }
  ];

  const checkCompleted = (type: TherapyType) => {
    return history.some(s => isToday(s.timestamp) && s.type === type);
  };

  return (
    <div className="space-y-6 sm:space-y-8 resolve-ui">
      <header className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 pb-8 border-b border-slate-200 dark:border-white/10">
        <div className="w-full">
          <div className="inline-flex items-center gap-3 px-5 py-2 bg-slate-100 dark:bg-blue-500/10 text-slate-600 dark:text-blue-400 rounded-full text-[9px] font-black uppercase tracking-[0.3em] mb-8 border border-slate-200 dark:border-white/5">
            <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(59,130,246,0.5)]"></span>
            Telemetry Link: Active
          </div>
          <h1 className="text-5xl lg:text-[5.5rem] font-[1000] tracking-[-0.06em] mb-4 leading-[0.85] text-slate-900 dark:text-white transition-colors duration-300">
            Hello, <br /> {profile.name.split(' ')[0]}.
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-xl font-medium tracking-tight">Protocol: <span className="text-slate-900 dark:text-blue-400 font-black uppercase tracking-widest text-xs clinical-mono ml-2">{profile.diagnosis}</span></p>
        </div>

        <div className="flex gap-4 w-full lg:w-auto">
          <div className="flex-1 lg:min-w-[160px] bg-white dark:bg-[#080808] border border-slate-200 dark:border-white/10 p-6 rounded-[2.5rem] text-center shadow-lg transition-colors duration-300">
            <p className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2">Stability</p>
            <p className="text-3xl font-black text-slate-900 dark:text-white">96.8%</p>
          </div>
          <div className="flex-1 lg:min-w-[160px] bg-slate-900 dark:bg-[#0c0c0c] p-6 rounded-[2.5rem] text-center text-white shadow-xl transition-colors duration-300">
            <p className="text-[9px] font-black uppercase tracking-[0.2em] opacity-40 mb-2">Phase</p>
            <p className="text-3xl font-black tracking-tighter">14</p>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <section className="xl:col-span-2 bg-white dark:bg-[#080808] rounded-[3.5rem] p-8 lg:p-12 relative overflow-hidden border border-slate-200 dark:border-white/10 shadow-xl group transition-colors duration-300">
          <div className="relative z-10">
            <h2 className="text-[10px] font-[900] uppercase tracking-[0.4em] text-slate-400 mb-10">Historical Synthesis</h2>

            <div className="flex flex-col sm:flex-row items-start sm:items-end gap-6 mb-12">
              <span className="text-8xl lg:text-[10rem] font-[1000] tracking-[-0.08em] leading-none text-black dark:text-white transition-colors duration-300">{avgScore}</span>
              <div className="sm:mb-8">
                <span className="text-4xl font-black text-black/40 dark:text-white block mb-4 tracking-tighter">/ 100</span>
                <div className="flex items-center gap-2 px-4 py-2 bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded-xl text-[10px] font-black uppercase tracking-widest border border-blue-500/20">
                  {recoveryData.trend === 'IMPROVING' ? '+' : ''}{recoveryData.predictedScore - recoveryData.currentScore}% Predicted Velocity
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pt-10 border-t border-slate-100 dark:border-white/10">
              <div className="space-y-1">
                <p className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400">Node Status</p>
                <p className={`text-2xl font-black uppercase tracking-tight ${riskData.level === 'LOW' ? 'text-blue-500' : riskData.level === 'MODERATE' ? 'text-amber-500' : 'text-rose-500'}`}>
                  {riskData.level}
                </p>
              </div>
              <div className="md:col-span-3 p-6 bg-slate-50 dark:bg-white/[0.02] rounded-[2rem] border border-slate-100 dark:border-white/10">
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">{history.length > 0 ? (history[0].exerciseName || history[0].type) : 'System Status'}</p>
                <p className="text-base font-medium leading-[1.6] text-slate-600 dark:text-slate-300 italic">"{history.length > 0 ? history[0].feedback : "No active telemetry detected. Initialize laboratory protocol."}"</p>
              </div>
            </div>
          </div>
        </section>

        <section className="h-full">
          <DailyTracker
            history={history}
            tasks={dailyTasks}
            darkMode={darkMode}
          />
        </section>
      </div>

      <section>
        <div className="flex items-center justify-between mb-12 px-2">
          <h2 className="text-3xl font-[1000] tracking-tight text-slate-900 dark:text-white transition-colors duration-300">Active Labs.</h2>
          <div className="h-[0.5px] bg-slate-200 dark:bg-white/10 flex-grow mx-10"></div>
          <span className="text-[9px] font-black uppercase tracking-[0.4em] text-slate-400 clinical-mono">CORE V5.2</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {dailyTasks.map((task, idx) => {
            const completed = checkCompleted(task.type);
            return (
              <div
                key={idx}
                onClick={() => !completed && onStartTherapy(task.type)}
                className={`group p-10 rounded-[3rem] border transition-all duration-300 flex flex-col items-start relative overflow-hidden shadow-md ${completed
                  ? 'cursor-not-allowed bg-slate-50 dark:bg-white/[0.02] border-slate-100 dark:border-white/5 opacity-80'
                  : 'cursor-pointer bg-white dark:bg-[#080808] border-slate-200 dark:border-white/10 hover:border-blue-500 dark:hover:border-blue-500'
                  }`}
              >
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-8 transition-all duration-300 border ${completed
                  ? 'bg-blue-500 text-white border-blue-400'
                  : 'bg-slate-50 dark:bg-white/5 text-slate-600 dark:text-blue-400 group-hover:bg-blue-500 group-hover:text-white border-slate-100 dark:border-white/10'
                  }`}>
                  {completed ? <Icons.Activity /> : task.icon}
                </div>
                <h3 className="text-2xl font-[1000] tracking-tighter mb-2 text-slate-900 dark:text-white leading-none transition-colors duration-300">{task.title}</h3>
                <p className="text-slate-500 dark:text-slate-400 text-xs font-medium mb-12 leading-relaxed max-w-[90%]">{task.desc}</p>

                <div className="w-full pt-8 border-t border-slate-100 dark:border-white/10 flex items-center justify-between transition-colors">
                  <span className={`text-[9px] font-black uppercase tracking-[0.3em] ${completed ? 'text-blue-500' : 'text-slate-400 group-hover:text-blue-500'}`}>
                    {completed ? 'PROTOCOL VERIFIED' : 'INITIALIZE'}
                  </span>
                  {!completed && <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" className="group-hover:translate-x-2 transition-transform"><path d="m9 18 6-6-6-6" /></svg>}
                  {completed && <div className="p-2 bg-blue-500/10 rounded-lg text-blue-500"><Icons.Activity size={12} /></div>}
                </div>
              </div>
            );
          })}
        </div>
      </section>

    </div>
  );
};

export default PatientDashboard;
