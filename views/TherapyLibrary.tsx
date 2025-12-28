
import React from 'react';
import { TherapyType, SessionResult } from '../types';
import { Icons } from '../components/Icons';
import { isToday } from '../utils/date-helpers';

interface TherapyLibraryProps {
  onStartTherapy: (type: TherapyType, exerciseName?: string) => void;
  therapyHistory: SessionResult[];
  darkMode: boolean;
}

const TherapyLibrary: React.FC<TherapyLibraryProps> = ({ onStartTherapy, therapyHistory, darkMode }) => {
  const categories = [
    {
      id: TherapyType.BODY,
      title: 'Body Movement',
      icon: <Icons.Body />,
      exercises: [
        { name: 'Grip Strength', desc: 'Open and close your hand to build strength.' },
        { name: 'Arm Stretch', desc: 'Simple shoulder and elbow movement tracking.' }
      ]
    },
    {
      id: TherapyType.SPEECH,
      title: 'Speech Practice',
      icon: <Icons.Mic />,
      exercises: [
        { name: 'Clear Speaking', desc: 'Repeat simple words to practice clarity.' },
        { name: 'Voice Control', desc: 'Practice holding long vowel sounds.' },
        { name: 'Speak & Score', desc: 'Interactive word repetition & clarity score.' }
      ]
    },
    {
      id: TherapyType.BRAIN,
      title: 'Brain Training',
      icon: <Icons.Brain />,
      exercises: [
        { name: 'Memory Game', desc: 'Remember and repeat simple patterns.' },
        { name: 'Mental Focus', desc: 'Clinical color-word interference test.' },
        { name: 'Quick Tap', desc: 'High-speed reaction assessment.' }
      ]
    },
    {
      id: TherapyType.MENTAL,
      title: 'Mind & Mood',
      icon: <Icons.Activity />,
      exercises: [
        { name: 'Daily Check-in', desc: 'Quick questions about how you feel today.' }
      ]
    }
  ];

  const totalPossible = categories.length;
  const completedToday = categories.filter(cat =>
    therapyHistory.some(s => isToday(s.timestamp) && s.type === cat.id)
  ).length;
  const progressPercent = Math.round((completedToday / totalPossible) * 100);

  return (
    <div className="space-y-16 animate-in fade-in duration-700 resolve-ui">
      <header className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 pb-10 border-b border-slate-100 dark:border-white/5">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-1.5 h-6 bg-[#48c1cf] rounded-full"></div>
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#48c1cf]">Daily Training</span>
          </div>
          <h1 className="text-6xl font-black tracking-tight mb-3 text-[#1a365d] dark:text-white">Training Library</h1>
          <p className="text-slate-500 text-xl font-medium max-w-xl leading-relaxed">Personalized neurological exercises tailored to your recovery trajectory.</p>
        </div>

        <div className="flex items-center gap-8 bg-white dark:bg-[#050505] p-8 rounded-[3.5rem] border-2 border-slate-100 dark:border-white/10 shadow-2xl relative overflow-hidden group">
          {/* Subtle background glow */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#48c1cf]/5 blur-[50px] rounded-full -mr-16 -mt-16 group-hover:bg-[#48c1cf]/10 transition-colors duration-700"></div>

          <div className="relative w-28 h-28 transform group-hover:scale-105 transition-transform duration-500">
            <svg className="w-full h-full -rotate-90 filter drop-shadow-[0_0_8px_rgba(72,193,207,0.2)]">
              <circle cx="56" cy="56" r="48" fill="none" stroke="currentColor" strokeWidth="10" className="text-slate-100 dark:text-white/5" />
              <circle
                cx="56" cy="56" r="48"
                fill="none"
                stroke="url(#progressGradient)"
                strokeWidth="10"
                strokeDasharray={301.6}
                strokeDashoffset={301.6 - (301.6 * progressPercent) / 100}
                strokeLinecap="round"
                className="transition-all duration-1000 ease-out"
              />
              <defs>
                <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#48c1cf" />
                  <stop offset="100%" stopColor="#10b981" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl font-black tracking-tighter text-[#1a365d] dark:text-white leading-none">{progressPercent}%</span>
              <span className="text-[8px] font-black uppercase tracking-widest text-slate-400 mt-2">Daily</span>
            </div>
          </div>

          <div className="relative z-10 flex flex-col justify-center">
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#48c1cf] mb-2">Clinical Pulse</p>
            <p className="text-3xl font-black text-[#1a365d] dark:text-white leading-none tracking-tighter">
              {completedToday}<span className="text-lg opacity-20 mx-1">/</span>{totalPossible}
            </p>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-2 px-3 py-1 bg-slate-100 dark:bg-white/5 rounded-full inline-block">Units Resolved</p>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {categories.map((cat) => (
          <div
            key={cat.id}
            className={`p-10 rounded-[3rem] border-2 transition-all ${darkMode ? 'bg-[#050505] border-white/20' : 'bg-white border-slate-300/60 shadow-md'}`}
          >
            <div className="flex items-center gap-5 mb-10">
              <div className="w-14 h-14 bg-[#48c1cf]/10 text-[#48c1cf] rounded-2xl flex items-center justify-center border border-[#48c1cf]/20">
                {cat.icon}
              </div>
              <h2 className="text-2xl font-black tracking-tight">{cat.title}</h2>
            </div>

            <div className="space-y-5">
              {cat.exercises.map((ex, i) => {
                const isDone = therapyHistory.some(s => isToday(s.timestamp) && s.type === cat.id);
                return (
                  <button
                    key={i}
                    onClick={() => !isDone && onStartTherapy(cat.id, ex.name)}
                    className={`w-full text-left p-6 rounded-[2rem] border-2 transition-all group flex items-center justify-between ${isDone
                      ? 'bg-emerald-500/10 border-emerald-500/50 cursor-pointer hover:bg-emerald-500/20'
                      : 'hover:border-[#48c1cf] hover:bg-[#48c1cf]/5'
                      } ${!isDone && (darkMode ? 'border-white/15 bg-[#0a0a0a]' : 'border-slate-200 bg-slate-50')}`}
                  >
                    <div className="max-w-[75%]">
                      <p className="font-black text-base mb-1 text-[#1a365d] dark:text-white leading-tight">
                        {ex.name}
                      </p>
                      <p className="text-xs text-slate-500 font-medium">{ex.desc}</p>
                    </div>

                    <div className="flex-shrink-0">
                      {isDone ? (
                        <div className="flex items-center gap-2 bg-emerald-600 px-4 py-2 rounded-xl shadow-lg shadow-emerald-500/20 animate-in zoom-in duration-300 border border-emerald-400/30">
                          <div className="w-5 h-5 bg-white/10 rounded-md flex items-center justify-center border border-white/20">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
                          </div>
                          <span className="text-white font-[1000] text-[10px] uppercase tracking-widest">DONE</span>
                        </div>
                      ) : (
                        <div className="text-[#48c1cf] opacity-0 group-hover:opacity-100 transition-opacity translate-x-2 group-hover:translate-x-0 duration-300">
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
                        </div>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TherapyLibrary;
