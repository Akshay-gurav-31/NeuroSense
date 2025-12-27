
import React from 'react';
import { TherapyType } from '../types';
import { Icons } from '../components/Icons';

interface TherapyLibraryProps {
  onStartTherapy: (type: TherapyType, exerciseName?: string) => void;
  darkMode: boolean;
}

const TherapyLibrary: React.FC<TherapyLibraryProps> = ({ onStartTherapy, darkMode }) => {
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
        { name: 'Voice Control', desc: 'Practice holding long vowel sounds.' }
      ]
    },
    {
      id: TherapyType.BRAIN,
      title: 'Brain Training',
      icon: <Icons.Brain />,
      exercises: [
        { name: 'Memory Game', desc: 'Remember and repeat simple patterns.' },
        { name: 'Mental Focus', desc: 'Clinical color-word interference test.' }
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

  return (
    <div className="space-y-16 animate-in fade-in duration-700 resolve-ui">
      <header>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-1.5 h-6 bg-[#48c1cf] rounded-full"></div>
          <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#48c1cf]">Daily Training</span>
        </div>
        <h1 className="text-5xl font-black tracking-tight mb-2 text-[#1a365d] dark:text-white">Training Library</h1>
        <p className="text-slate-500 text-lg">Pick a simple routine to start your daily session.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {categories.map((cat) => (
          <div
            key={cat.id}
            className={`p-10 rounded-[3rem] border transition-all ${darkMode ? 'bg-[#050505] border-white/5' : 'bg-white border-slate-200 shadow-sm'}`}
          >
            <div className="flex items-center gap-5 mb-10">
              <div className="w-14 h-14 bg-[#48c1cf]/10 text-[#48c1cf] rounded-2xl flex items-center justify-center border border-[#48c1cf]/20">
                {cat.icon}
              </div>
              <h2 className="text-2xl font-black tracking-tight">{cat.title}</h2>
            </div>

            <div className="space-y-5">
              {cat.exercises.map((ex, i) => (
                <button
                  key={i}
                  onClick={() => onStartTherapy(cat.id, ex.name)}
                  className={`w-full text-left p-6 rounded-[2rem] border transition-all hover:border-[#48c1cf] hover:bg-[#48c1cf]/5 group flex items-center justify-between ${darkMode ? 'border-white/5 bg-[#0a0a0a]' : 'border-slate-50 bg-slate-50'}`}
                >
                  <div className="max-w-[80%]">
                    <p className="font-black text-base mb-1 text-[#1a365d] dark:text-white">{ex.name}</p>
                    <p className="text-xs text-slate-500 font-medium">{ex.desc}</p>
                  </div>
                  <div className="text-[#48c1cf] opacity-0 group-hover:opacity-100 transition-opacity translate-x-2 group-hover:translate-x-0 duration-300">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="m9 18 6-6-6-6" /></svg>
                  </div>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TherapyLibrary;
