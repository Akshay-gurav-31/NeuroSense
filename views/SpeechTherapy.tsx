
import React, { useState, useRef, useEffect } from 'react';
import { Icons } from '../components/Icons';
import { azureSpeechService } from '../services/azure-speech.service';

interface SpeechTherapyProps {
  onComplete: (score: number, feedback: string) => void;
  onAbort: () => void;
  darkMode: boolean;
}

const SpeechTherapy: React.FC<SpeechTherapyProps> = ({ onComplete, onAbort, darkMode }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [sessionId] = useState(() => `SES-${Math.random().toString(36).substr(2, 6).toUpperCase()}`);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const isDark = darkMode;
  const [recordingTime, setRecordingTime] = useState(0);

  const targetPhrase = "Neural rehabilitation requires consistent articulation practice";
  const streamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    let interval: any;
    if (isRecording) {
      interval = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
    } else {
      setRecordingTime(0);
    }
    return () => clearInterval(interval);
  }, [isRecording]);

  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const toggleRecording = async () => {
    if (isRecording) {
      mediaRecorderRef.current?.stop();
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
        streamRef.current = null;
      }
      setIsRecording(false);
    } else {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        streamRef.current = stream;
        const recorder = new MediaRecorder(stream);
        chunksRef.current = [];

        recorder.ondataavailable = (e) => chunksRef.current.push(e.data);
        recorder.onstop = async () => {
          setLoading(true);

          try {
            // 1. Compile audio chunks into bio-phonetic stream
            const audioBlob = new Blob(chunksRef.current, { type: 'audio/wav' });

            // 2. Initiate Azure Articulatory Precision Assessment
            const result = await azureSpeechService.analyzeSpeech(audioBlob, targetPhrase);

            // 3. Map Azure AI outputs to Clinical Metrics
            setResult({
              clarityScore: result.clarityScore,
              accuracyScore: result.pronunciationScore,
              feedback: result.clarityScore > 75
                ? "Excellent phonemic resonance. Linguistic motor nodes are stabilizing."
                : "Phonetic elision detected in multi-syllabic transitions. Focus on articulation clarity."
            });
          } catch (err) {
            console.error('Speech analysis failure:', err);
          } finally {
            setLoading(false);
          }
        };

        mediaRecorderRef.current = recorder;
        recorder.start();
        setIsRecording(true);
      } catch (err) {
        alert("Microphone node authorization required.");
      }
    }
  };

  return (
    <div className={`fixed inset-0 z-[100] p-8 h-screen flex flex-col overflow-y-auto resolve-ui transition-colors duration-500 ${isDark ? 'bg-black text-white' : 'bg-[#f8fdfe] text-[#1a365d]'}`}>
      <header className={`flex justify-between items-center mb-12 border-b pb-8 ${isDark ? 'border-white/5' : 'border-slate-200'}`}>
        <div className="flex items-center gap-6">
          <button
            onClick={onAbort}
            className={`flex items-center gap-3 px-6 py-3 rounded-2xl transition-all text-[10px] font-black uppercase tracking-widest border ${isDark ? 'bg-white/5 border-white/10 hover:bg-white/10' : 'bg-white border-slate-200 hover:bg-slate-50 shadow-sm'}`}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M19 12H5m7 7-7-7 7-7" /></svg>
            Abort Protocol
          </button>
          <div className={`h-8 w-[1px] ${isDark ? 'bg-white/10' : 'bg-slate-200'}`}></div>
          <div>
            <h1 className="text-2xl font-black tracking-tight leading-none mb-1">Articulatory Precision</h1>
            <p className="text-slate-500 clinical-mono text-[9px] uppercase tracking-[0.3em] font-bold">NODE: NS-PHON-PRO-4.0</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-[10px] font-black text-[#48c1cf] uppercase tracking-widest mb-1">Session ID</p>
          <p className={`clinical-mono text-sm font-bold ${isDark ? 'text-white/40' : 'text-slate-300'}`}>{sessionId}</p>
        </div>
      </header>

      <div className="flex-grow flex flex-col items-center justify-center space-y-20 pb-20">
        {!result && (
          <div className="text-center max-w-2xl">
            <p className="text-[#48c1cf] text-[10px] font-black uppercase tracking-[0.4em] mb-10">Clinical Input Target</p>
            <h2 className={`text-5xl lg:text-6xl font-black leading-tight tracking-tighter ${isDark ? 'text-white' : 'text-[#1a365d]'}`}>
              "{targetPhrase}"
            </h2>
          </div>
        )}

        {!result && (
          <div className="relative group">
            {isRecording && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-48 h-48 bg-emerald-500/20 rounded-full animate-ping"></div>
                <div className="absolute w-56 h-56 border border-emerald-500/10 rounded-full"></div>
              </div>
            )}
            {isRecording && (
              <div className="absolute -top-16 left-1/2 -translate-x-1/2 whitespace-nowrap">
                <div className={`px-4 py-2 rounded-full border backdrop-blur-md flex items-center gap-2 ${isDark ? 'bg-rose-500/10 border-rose-500/20' : 'bg-rose-50/50 border-rose-200'}`}>
                  <div className="w-2 h-2 bg-rose-500 rounded-full animate-pulse"></div>
                  <span className="text-xs font-black clinical-mono text-rose-500">00:{recordingTime < 10 ? `0${recordingTime}` : recordingTime}</span>
                </div>
              </div>
            )}
            <button
              onClick={toggleRecording}
              className={`relative z-10 w-36 h-36 rounded-full flex flex-col items-center justify-center transition-all active:scale-[0.9] border-2 shadow-2xl ${isRecording
                ? 'bg-rose-600 border-rose-400 text-white animate-pulse'
                : (isDark ? 'bg-[#0a0a0a] border-white/10 text-white hover:border-[#48c1cf]' : 'bg-white border-slate-200 text-[#1a365d] hover:border-[#48c1cf]')
                }`}
            >
              {isRecording ? <Icons.Activity /> : <Icons.Mic />}
              <span className="text-[8px] font-black uppercase tracking-widest mt-2">{isRecording ? 'Capturing' : 'Initiate'}</span>
            </button>
          </div>
        )}

        {loading && (
          <div className="flex flex-col items-center gap-6">
            <div className="w-10 h-10 border-4 border-[#48c1cf] border-t-transparent rounded-full animate-spin"></div>
            <p className="text-[#48c1cf] font-black text-[10px] tracking-[0.5em] uppercase animate-pulse">Synthesizing Bio-Telemetry...</p>
          </div>
        )}

        {result && (
          <div className={`w-full max-w-2xl p-12 lg:p-16 rounded-[3.5rem] animate-in zoom-in-95 slide-in-from-bottom-10 duration-700 shadow-2xl border ${isDark ? 'bg-[#050505] border-white/10' : 'bg-white border-slate-200'}`}>
            <div className="grid grid-cols-2 gap-16 mb-16">
              <div className="space-y-3">
                <span className="block text-[10px] font-black uppercase tracking-[0.4em] text-[#48c1cf]">Clarity Metric</span>
                <span className={`text-6xl font-black tracking-tighter ${isDark ? 'text-white' : 'text-[#1a365d]'}`}>{result.clarityScore}%</span>
                <div className={`w-full h-1 rounded-full overflow-hidden ${isDark ? 'bg-white/5' : 'bg-slate-100'}`}>
                  <div className="h-full bg-[#48c1cf]" style={{ width: `${result.clarityScore}%` }}></div>
                </div>
              </div>
              <div className="space-y-3">
                <span className="block text-[10px] font-black uppercase tracking-[0.4em] text-[#48c1cf]">Precision Metric</span>
                <span className={`text-6xl font-black tracking-tighter ${isDark ? 'text-white' : 'text-[#1a365d]'}`}>{result.accuracyScore}%</span>
                <div className={`w-full h-1 rounded-full overflow-hidden ${isDark ? 'bg-white/5' : 'bg-slate-100'}`}>
                  <div className="h-full bg-emerald-500" style={{ width: `${result.accuracyScore}%` }}></div>
                </div>
              </div>
            </div>

            <div className={`pt-12 border-t space-y-6 ${isDark ? 'border-white/5' : 'border-slate-100'}`}>
              <div className="flex items-center justify-between mb-4">
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.5em]">Clinical Synthesis</p>
                <div className={`h-[1px] flex-grow mx-6 ${isDark ? 'bg-white/5' : 'bg-slate-100'}`}></div>
              </div>
              <p className={`text-xl leading-relaxed font-medium italic opacity-90 ${isDark ? 'text-slate-100' : 'text-[#1a365d]'}`}>"{result.feedback}"</p>
            </div>

            <button
              onClick={() => onComplete(result.accuracyScore || 0, result.feedback)}
              className={`w-full mt-16 py-7 rounded-3xl font-black uppercase tracking-[0.4em] text-[10px] shadow-2xl active:scale-95 transition-all shimmer ${isDark ? 'bg-white text-black' : 'bg-[#48c1cf] text-white'}`}
            >
              SYNC CLINICAL RECORD
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SpeechTherapy;
