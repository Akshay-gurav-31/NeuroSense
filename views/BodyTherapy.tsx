
import React, { useRef, useState, useEffect } from 'react';
import { Icons } from '../components/Icons';

const BodyTherapy: React.FC<{ onComplete: (score: number, feedback: string) => void; darkMode: boolean }> = ({ onComplete, darkMode }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [feedback, setFeedback] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [sessionId] = useState(() => `BIO-${Math.random().toString(36).substr(2, 6).toUpperCase()}`);
  const isDark = darkMode;

  useEffect(() => {
    async function setupCamera() {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' } });
          if (videoRef.current) videoRef.current.srcObject = stream;
        } catch (err) {
          console.error("Camera access denied");
        }
      }
    }
    setupCamera();
  }, []);

  const captureAndAnalyze = async () => {
    if (!videoRef.current || !canvasRef.current) return;
    setLoading(true);

    // Simulate Local Analysis
    await new Promise(r => setTimeout(r, 1500));

    const mockResults = [
      { score: 85, feedback: "Movement fluid and within acceptable parameters. No significant tremor detected.", asymmetryDetected: false },
      { score: 72, feedback: "Subtle asymmetry detected in hand extension. Focus on full finger abduction.", asymmetryDetected: true },
      { score: 91, feedback: "Excellent clinical form. Muscle engagement is optimal.", asymmetryDetected: false }
    ];

    const result = mockResults[Math.floor(Math.random() * mockResults.length)];
    setFeedback(result);
    setLoading(false);
  };

  return (
    <div className={`fixed inset-0 z-[100] p-8 h-screen flex flex-col resolve-ui overflow-hidden transition-colors duration-500 ${isDark ? 'bg-black text-white' : 'bg-[#f8fdfe] text-[#1a365d]'}`}>
      <header className={`flex justify-between items-center mb-10 border-b pb-8 ${isDark ? 'border-white/5' : 'border-slate-200'}`}>
        <div className="flex items-center gap-6">
          <button
            onClick={() => onComplete(0, "Protocol terminated.")}
            className={`flex items-center gap-3 px-6 py-3 rounded-2xl transition-all text-[10px] font-black uppercase tracking-widest border ${isDark ? 'bg-white/5 border-white/10 hover:bg-white/10' : 'bg-white border-slate-200 hover:bg-slate-50 shadow-sm'}`}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M19 12H5m7 7-7-7 7-7" /></svg>
            Abort Protocol
          </button>
          <div className={`h-8 w-[1px] ${isDark ? 'bg-white/10' : 'bg-slate-200'}`}></div>
          <div>
            <h1 className="text-2xl font-black tracking-tight leading-none mb-1">Kinematic Telemetry</h1>
            <p className="text-slate-500 clinical-mono text-[9px] font-bold uppercase tracking-[0.3em]">SENSOR: NS-MOTOR-HD</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-[10px] font-black text-[#48c1cf] uppercase tracking-widest mb-1">Session ID</p>
          <p className={`clinical-mono text-sm font-bold ${isDark ? 'text-white/40' : 'text-slate-300'}`}>{sessionId}</p>
        </div>
      </header>

      <div className={`relative flex-grow rounded-[3.5rem] overflow-hidden shadow-2xl border group ${isDark ? 'bg-[#050505] border-white/10' : 'bg-white border-slate-200'}`}>
        <video ref={videoRef} autoPlay muted playsInline className={`w-full h-full object-cover mirror transition-opacity duration-700 ${isDark ? 'opacity-70' : 'opacity-90'}`} />

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 border border-white/5 rounded-[4rem] pointer-events-none">
          <div className="absolute -top-1 -left-1 w-8 h-8 border-t-2 border-l-2 border-[#48c1cf] rounded-tl-3xl"></div>
          <div className="absolute -top-1 -right-1 w-8 h-8 border-t-2 border-r-2 border-[#48c1cf] rounded-tr-3xl"></div>
          <div className="absolute -bottom-1 -left-1 w-8 h-8 border-b-2 border-l-2 border-[#48c1cf] rounded-bl-3xl"></div>
          <div className="absolute -bottom-1 -right-1 w-8 h-8 border-b-2 border-r-2 border-[#48c1cf] rounded-br-3xl"></div>
        </div>

        {loading && (
          <div className={`absolute inset-0 backdrop-blur-md flex flex-col items-center justify-center z-50 ${isDark ? 'bg-black/90' : 'bg-white/80'}`}>
            <div className="w-14 h-14 border-4 border-[#48c1cf] border-t-transparent rounded-full animate-spin mb-6"></div>
            <p className="text-[10px] font-black tracking-[0.5em] uppercase text-[#48c1cf] animate-pulse">Analyzing Bio-Mesh Dynamics...</p>
          </div>
        )}

        {feedback && (
          <div className={`absolute bottom-12 left-1/2 -translate-x-1/2 w-full max-w-xl backdrop-blur-xl p-12 rounded-[3.5rem] animate-in slide-in-from-bottom-12 duration-700 shadow-2xl border ${isDark ? 'bg-black/90 border-white/10' : 'bg-white/95 border-slate-200'}`}>
            <div className="flex items-center justify-between mb-10">
              <div className="flex items-center gap-3">
                <div className="w-1.5 h-6 bg-emerald-500 rounded-full"></div>
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-emerald-500">Stability Confirmed</span>
              </div>
              <div className={`px-6 py-2 rounded-2xl font-black text-2xl tracking-tighter ${isDark ? 'bg-white text-black' : 'bg-[#1a365d] text-white'}`}>{feedback.score}%</div>
            </div>

            <p className={`text-xl font-medium leading-relaxed mb-10 italic ${isDark ? 'text-slate-100' : 'text-[#1a365d]'}`}>"{feedback.feedback}"</p>

            <button
              onClick={() => onComplete(feedback.score, feedback.feedback)}
              className={`w-full py-6 rounded-3xl font-black uppercase tracking-[0.4em] text-[10px] shadow-2xl active:scale-[0.98] transition-all shimmer ${isDark ? 'bg-white text-black' : 'bg-[#48c1cf] text-white'}`}
            >
              COMMIT KINEMATIC DATA
            </button>
          </div>
        )}
      </div>

      <div className="mt-10 flex flex-col items-center gap-8 pb-10">
        <button
          onClick={captureAndAnalyze}
          disabled={loading}
          className={`relative w-28 h-28 rounded-full border-8 flex items-center justify-center shadow-2xl active:scale-[0.85] transition-all group ${isDark ? 'bg-white border-white/10 text-black' : 'bg-[#1a365d] border-[#48c1cf]/20 text-white'}`}
        >
          <div className={`w-10 h-10 border-[5px] rounded-xl group-hover:scale-110 transition-transform ${isDark ? 'border-black' : 'border-[#48c1cf]'}`}></div>
          {!loading && !feedback && (
            <div className="absolute -top-12 left-1/2 -translate-x-1/2 whitespace-nowrap text-[9px] font-black uppercase tracking-[0.3em] text-[#48c1cf] animate-bounce">Initiate Capture Sequence</div>
          )}
        </button>
        <canvas ref={canvasRef} width="400" height="300" className="hidden" />
      </div>
    </div>
  );
};

export default BodyTherapy;
