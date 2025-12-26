
import React from 'react';
import { Icons } from '../components/Icons';
import NeuralBrain from '../components/NeuralBrain';
import { UserRole } from '../types';

interface LandingPageProps {
    darkMode: boolean;
    setDarkMode: (val: boolean) => void;
    onSelectRole: (role: UserRole) => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ darkMode, setDarkMode, onSelectRole }) => {
    return (
        <div className="min-h-screen w-full bg-prism-bg dark:bg-black transition-all duration-1000 overflow-hidden relative flex flex-col lg:flex-row">

            {/* Top Integrated Nav */}
            <div className="absolute top-8 left-8 lg:top-12 lg:left-12 flex items-center gap-4 z-50">
                <Icons.Logo size={40} className="text-prism-text dark:text-white" />
                <div className="h-6 w-[0.5px] bg-prism-text/20 dark:bg-white/20"></div>
                <span className="font-[950] text-2xl text-prism-text dark:text-white tracking-[-0.08em]">NEUROSENSE.</span>
            </div>

            <div className="absolute top-8 right-8 lg:top-12 lg:right-12 z-50">
                <button
                    onClick={() => setDarkMode(!darkMode)}
                    className="w-12 h-12 rounded-full glass-ui flex items-center justify-center text-prism-text dark:text-white hover:scale-105 transition-all shadow-lg"
                >
                    {darkMode ? <Icons.Sun /> : <Icons.Moon />}
                </button>
            </div>

            {/* Left Hero */}
            <div className="w-full lg:w-[55%] p-8 md:p-12 lg:p-20 flex flex-col justify-center relative z-20 resolve-ui">
                <div className="max-w-[800px] space-y-12 lg:space-y-16">
                    <div className="space-y-6">
                        <h1 className="text-[clamp(2.8rem,7vw,5.5rem)] font-[1000] text-prism-text dark:text-white leading-[0.9] tracking-[-0.06em]">
                            Recover <br /> Your Voice, <br /> Body & Mind.
                        </h1>
                        <p className="text-[clamp(1rem,1.8vw,1.3rem)] text-prism-text/60 dark:text-white/30 max-w-xl font-medium leading-[1.4] tracking-tight">
                            Advanced AI-powered neuro-recovery at home. Regain strength and speech clarity through clinical motor synthesis.
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center gap-6">
                        <button
                            onClick={() => onSelectRole(UserRole.PATIENT)}
                            className="group w-full sm:w-auto flex items-center gap-4 bg-prism-dark p-2 pr-10 rounded-full border border-white/5 hover:scale-[1.05] active:scale-95 transition-all shadow-2xl specular"
                        >
                            <div className="w-14 h-14 bg-prism-accent rounded-full flex items-center justify-center text-prism-dark group-hover:rotate-12 transition-transform duration-500 shadow-lg">
                                <Icons.User size={24} />
                            </div>
                            <div className="flex flex-col items-start pr-4">
                                <span className="text-white font-[950] uppercase tracking-[0.2em] text-sm">PATIENT</span>
                                <span className="text-white/40 text-[10px] font-bold uppercase tracking-widest mt-0.5">Start Recovery Journey</span>
                            </div>
                        </button>

                        <button
                            onClick={() => onSelectRole(UserRole.DOCTOR)}
                            className="group w-full sm:w-auto flex items-center gap-4 glass-ui p-2 pr-10 rounded-full border border-prism-text/5 hover:bg-white/10 hover:scale-[1.05] active:scale-95 transition-all shadow-lg"
                        >
                            <div className="w-14 h-14 bg-emerald-500/20 dark:bg-emerald-500/10 border border-emerald-500/30 rounded-full flex items-center justify-center text-emerald-600 dark:text-emerald-400 group-hover:rotate-12 transition-transform duration-500">
                                <Icons.Activity size={24} />
                            </div>
                            <div className="flex flex-col items-start pr-4">
                                <span className="text-prism-text dark:text-white font-[950] uppercase tracking-[0.2em] text-sm">DOCTOR</span>
                                <span className="text-prism-text/40 dark:text-white/30 text-[10px] font-bold uppercase tracking-widest mt-0.5">Clinical Dashboard</span>
                            </div>
                        </button>
                    </div>
                </div>
            </div>

            {/* Right Visual */}
            <div className="hidden lg:flex w-full lg:w-[45%] relative items-center justify-center overflow-hidden">
                <div className="w-full h-full absolute flex items-center justify-center">
                    <NeuralBrain darkMode={darkMode} />
                </div>
            </div>
        </div>
    );
};

export default LandingPage;
