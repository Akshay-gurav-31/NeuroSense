
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
        <div className="min-h-screen w-full transition-all duration-700 overflow-x-hidden relative flex flex-col bg-gradient-to-r from-[#dcfce7] via-white to-[#dbeafe] dark:from-[#0a1f1c] dark:via-[#020617] dark:to-[#0a192f]">
            {/* Ambient Background Visuals: High-fidelity clinical aesthetic */}
            <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-emerald-500/5 dark:bg-emerald-500/10 blur-[120px] rounded-full pointer-events-none z-0"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-blue-500/5 dark:bg-blue-500/10 blur-[120px] rounded-full pointer-events-none z-0"></div>

            {/* Header Navigation: Branding and System Controls */}
            <div className="absolute top-4 left-4 sm:top-8 sm:left-8 z-50">
                <div className="flex items-center gap-3">
                    <Icons.Logo size={32} className="text-prism-text dark:text-white" />
                    <div className="h-4 w-[0.5px] bg-prism-text/20 dark:bg-white/20"></div>
                    <span className="font-[950] text-lg sm:text-2xl text-prism-text dark:text-white tracking-[-0.08em]">NEUROSENSE.</span>
                </div>
            </div>

            <div className="absolute top-4 right-4 sm:top-8 sm:right-8 z-50">
                <button
                    onClick={() => setDarkMode(!darkMode)}
                    className="w-10 h-10 rounded-full glass-ui flex items-center justify-center text-prism-text dark:text-white hover:scale-105 transition-all shadow-lg"
                >
                    {darkMode ? <Icons.Sun size={18} /> : <Icons.Moon size={18} />}
                </button>
            </div>

            {/* Primary Content Area: Value Proposition & Access Control */}
            <div className="w-full flex-grow flex flex-col justify-center relative z-20 resolve-ui p-6 sm:p-8 md:p-12">
                <div className="max-w-full w-full space-y-8 sm:space-y-10 md:space-y-12">
                    <div className="space-y-6 sm:space-y-8">
                        <h1 className="text-[clamp(1.8rem,6vw,3.5rem)] sm:text-[clamp(2rem,6vw,4rem)] md:text-[clamp(2.2rem,6vw,5rem)] font-[1000] text-prism-text dark:text-white leading-[1.1] tracking-[-0.04em]">
                            Recover <br /> Your Voice, <br /> Body & Mind.
                        </h1>
                        <p className="text-[0.9rem] sm:text-[1rem] md:text-[1.1rem] text-prism-text/60 dark:text-white/40 max-w-full sm:max-w-md md:max-w-lg font-medium leading-[1.5] tracking-tight">
                            Advanced AI-powered neuro-recovery at home. Regain strength and speech clarity through clinical motor synthesis.
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
                        <button
                            onClick={() => onSelectRole(UserRole.PATIENT)}
                            className="group w-full sm:w-auto flex items-center gap-3 sm:gap-4 bg-[#0a192f] p-2 pr-8 rounded-full border border-white/5 hover:scale-[1.05] active:scale-95 transition-all shadow-2xl specular"
                        >
                            <div className="w-12 h-12 sm:w-14 sm:h-14 bg-blue-500 rounded-full flex items-center justify-center text-white group-hover:rotate-12 transition-transform duration-300 shadow-lg">
                                <Icons.User size={20} className="sm:size-6" />
                            </div>
                            <div className="flex flex-col items-start pr-3 sm:pr-4">
                                <span className="text-white font-[950] uppercase tracking-[0.15em] text-xs sm:text-sm">PATIENT</span>
                                <span className="text-white/40 text-[8px] sm:text-[10px] font-bold uppercase tracking-widest mt-0.5">Start Recovery Journey</span>
                            </div>
                        </button>

                        <button
                            onClick={() => onSelectRole(UserRole.DOCTOR)}
                            className="group w-full sm:w-auto flex items-center gap-3 sm:gap-4 glass-ui p-2 pr-8 rounded-full border border-prism-text/5 hover:bg-white/10 hover:scale-[1.05] active:scale-95 transition-all shadow-lg"
                        >
                            <div className="w-12 h-12 sm:w-14 sm:h-14 bg-emerald-500 rounded-full flex items-center justify-center text-white group-hover:rotate-12 transition-transform duration-300 shadow-lg">
                                <Icons.Activity size={20} className="sm:size-6" />
                            </div>
                            <div className="flex flex-col items-start pr-3 sm:pr-4">
                                <span className="text-prism-text dark:text-white font-[950] uppercase tracking-[0.15em] text-xs sm:text-sm">DOCTOR</span>
                                <span className="text-prism-text/40 dark:text-white/30 text-[8px] sm:text-[10px] font-bold uppercase tracking-widest mt-0.5">Clinical Dashboard</span>
                            </div>
                        </button>
                    </div>
                </div>
            </div>

            {/* Secondary Visual Container: Neural Architecture Visualization */}
            <div className="hidden lg:flex w-full lg:w-[45%] relative items-center justify-center overflow-hidden">
                <div className="w-full h-full absolute flex items-center justify-center">
                    <NeuralBrain darkMode={darkMode} />
                </div>
            </div>
        </div>
    );
};

export default LandingPage;
