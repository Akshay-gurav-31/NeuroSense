
import React, { useState, useEffect } from 'react';
import { Icons } from '../components/Icons';

const BrainGames: React.FC<{ onComplete: (score: number) => void; darkMode: boolean }> = ({ onComplete, darkMode }) => {
  const [sequence, setSequence] = useState<number[]>([]);
  const [userSequence, setUserSequence] = useState<number[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeButton, setActiveButton] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [gameState, setGameState] = useState<'IDLE' | 'SHOWING' | 'USER_TURN' | 'GAMEOVER'>('IDLE');

  const startNewGame = () => {
    setScore(0);
    const first = Math.floor(Math.random() * 4);
    setSequence([first]);
    setGameState('SHOWING');
    playSequence([first]);
  };

  const playSequence = async (seq: number[]) => {
    setIsPlaying(true);
    setGameState('SHOWING');
    for (const num of seq) {
      setActiveButton(num);
      await new Promise(r => setTimeout(r, 600));
      setActiveButton(null);
      await new Promise(r => setTimeout(r, 200));
    }
    setIsPlaying(false);
    setUserSequence([]);
    setGameState('USER_TURN');
  };

  const handleInput = (id: number) => {
    if (gameState !== 'USER_TURN') return;
    const nextUserSeq = [...userSequence, id];
    setUserSequence(nextUserSeq);

    if (id !== sequence[nextUserSeq.length - 1]) {
      setGameState('GAMEOVER');
      return;
    }

    if (nextUserSeq.length === sequence.length) {
      setScore(score + 1);
      const nextSequence = [...sequence, Math.floor(Math.random() * 4)];
      setSequence(nextSequence);
      setTimeout(() => playSequence(nextSequence), 1000);
    }
  };

  return (
    <div className={`fixed inset-0 z-[100] p-8 h-screen flex flex-col resolve-ui transition-colors duration-500 ${darkMode ? 'bg-[#020617] text-white' : 'bg-[#f8fdfe] text-[#1a365d]'}`}>
      <header className="flex justify-between items-center mb-12 border-b border-white/5 pb-6">
        <div className="flex items-center gap-6">
          <button
            onClick={() => onComplete(0)}
            className="flex items-center gap-3 px-6 py-3 bg-white/5 rounded-2xl hover:bg-white/10 transition-all text-[10px] font-black uppercase tracking-widest border border-white/5"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M19 12H5m7 7-7-7 7-7" /></svg>
            Exit Drill
          </button>
          <div className="h-8 w-[1px] bg-white/10"></div>
          <div>
            <h1 className="text-2xl font-black tracking-tight leading-none mb-1">Cognitive Load Assessment</h1>
            <p className="text-slate-500 text-[9px] font-black uppercase tracking-[0.3em]">Protocol: NS-COG-BRAVO</p>
          </div>
        </div>
        <div className="text-right">
          <span className="block text-[9px] text-slate-500 uppercase font-black tracking-widest mb-1">Complexity Level</span>
          <span className="text-4xl font-black text-blue-500 tracking-tighter">{score + 1}</span>
        </div>
      </header>

      <div className="flex-grow flex flex-col justify-center items-center">
        <div className="grid grid-cols-2 gap-8 w-full max-w-sm">
          {[0, 1, 2, 3].map((id) => (
            <button
              key={id}
              onClick={() => handleInput(id)}
              disabled={gameState !== 'USER_TURN'}
              className={`aspect-square rounded-[3rem] transition-all duration-300 transform active:scale-90 shadow-2xl border-4 ${activeButton === id ? 'scale-105 brightness-150 ring-8 ring-white/10' : 'border-white/5'
                } ${id === 0 ? 'bg-blue-600' : id === 1 ? 'bg-indigo-600' : id === 2 ? 'bg-emerald-600' : 'bg-amber-600'}`}
            />
          ))}
        </div>

        <div className="mt-20 text-center">
          {gameState === 'IDLE' && (
            <button
              onClick={startNewGame}
              className="bg-white text-slate-900 px-16 py-6 rounded-[2.5rem] font-black uppercase tracking-[0.4em] text-xs shadow-2xl hover:scale-105 transition-all active:scale-95"
            >
              Initialize Assessment
            </button>
          )}

          {gameState === 'SHOWING' && (
            <div className="flex flex-col items-center gap-4">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-ping mb-2"></div>
              <p className="font-black text-xs tracking-[0.5em] uppercase text-blue-500">Observing Pattern Sequence...</p>
            </div>
          )}

          {gameState === 'USER_TURN' && (
            <div className="flex flex-col items-center gap-4">
              <p className="font-black text-xs tracking-[0.5em] uppercase text-emerald-500">Replication Phase Active</p>
            </div>
          )}

          {gameState === 'GAMEOVER' && (
            <div className="animate-in zoom-in-95 duration-500 glass-medical p-12 rounded-[3.5rem] border border-white/10 shadow-2xl max-w-md w-full">
              <p className="text-rose-500 font-black text-3xl mb-3 tracking-tighter">Drill Concluded</p>
              <p className="text-slate-400 font-medium mb-10 text-sm leading-relaxed">Neural sequence mismatch detected. Clinical metrics synchronized to Hub.</p>
              <div className="flex flex-col gap-4">
                <button onClick={() => onComplete(Math.min(score * 10, 100))} className="w-full py-5 bg-blue-600 text-white rounded-2xl font-black uppercase tracking-[0.3em] text-[10px] shadow-xl">Finalize & Exit</button>
                <button onClick={startNewGame} className="w-full py-5 bg-white/5 text-slate-400 rounded-2xl font-black uppercase tracking-[0.3em] text-[10px] hover:bg-white/10 transition-colors">Repeat Protocol</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BrainGames;
