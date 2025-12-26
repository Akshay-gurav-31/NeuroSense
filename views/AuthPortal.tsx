
import React from 'react';
import { Icons } from '../components/Icons';
import { UserRole } from '../types';

interface AuthPortalProps {
    role: UserRole;
    authMode: 'LOGIN' | 'REGISTER';
    setAuthMode: (mode: 'LOGIN' | 'REGISTER' | null) => void;
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    isAuthenticating: boolean;
    authError: string | null;
    onSwitchRole: (role: UserRole) => void;
}

const AuthPortal: React.FC<AuthPortalProps> = ({
    role,
    authMode,
    setAuthMode,
    onSubmit,
    isAuthenticating,
    authError,
    onSwitchRole
}) => {
    const isDoctor = role === UserRole.DOCTOR;

    return (
        <div className="min-h-screen bg-prism-bg dark:bg-black flex items-center justify-center p-4 lg:p-10 transition-all duration-1000 relative overflow-hidden">
            {/* Abstract Background Element */}
            <div className={`absolute top-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full blur-[120px] opacity-20 pointer-events-none transition-colors duration-1000 ${isDoctor ? 'bg-emerald-400' : 'bg-prism-accent'}`}></div>
            <div className={`absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full blur-[120px] opacity-10 pointer-events-none transition-colors duration-1000 ${isDoctor ? 'bg-blue-400' : 'bg-lime-400'}`}></div>

            <div className={`w-full max-w-[900px] flex flex-col md:flex-row rounded-[3rem] bg-white dark:bg-[#0A0A0A] hairline shadow-2xl relative z-10 overflow-hidden transition-all duration-700 resolve-ui`}>

                {/* Left Side: Branding/Visual */}
                <div className={`md:w-[40%] p-10 flex flex-col items-center justify-center text-center relative overflow-hidden transition-colors duration-700 ${isDoctor ? 'bg-emerald-500 text-white' : 'bg-prism-accent text-prism-dark'}`}>
                    {/* Minimal back button for left side */}
                    <button
                        onClick={() => setAuthMode(null)}
                        className={`absolute top-6 left-6 p-2 rounded-xl transition-all hover:scale-110 ${isDoctor ? 'bg-white/10 hover:bg-white/20' : 'bg-black/5 hover:bg-black/10'}`}
                    >
                        <Icons.Logout size={18} className="rotate-180" />
                    </button>

                    <div className="relative z-10 space-y-6">
                        <div className={`inline-flex items-center justify-center p-5 rounded-[2rem] shadow-2xl bg-white/10 backdrop-blur-md`}>
                            <Icons.Logo size={64} />
                        </div>
                        <div className="space-y-1">
                            <h2 className="text-3xl font-[1000] tracking-[-0.06em] uppercase">
                                {isDoctor ? 'Doctor' : 'Patient'}
                            </h2>
                            <p className="text-[10px] font-black uppercase tracking-[0.4em] opacity-60">
                                Access Portal
                            </p>
                        </div>
                    </div>

                    {/* Decorative Circle */}
                    <div className={`absolute -bottom-20 -right-20 w-40 h-40 rounded-full bg-white/10 blur-3xl`}></div>
                </div>

                {/* Right Side: Form */}
                <div className="md:w-[60%] p-8 lg:p-14 relative bg-white dark:bg-[#0A0A0A]">
                    <div className="mb-10">
                        <h2 className="text-3xl font-[1000] text-prism-dark dark:text-white tracking-[-0.05em] mb-2">
                            {authMode === 'LOGIN' ? 'Welcome Back' : 'Create Signature'}
                        </h2>
                        <div className="flex items-center gap-2">
                            <div className={`h-1 w-4 rounded-full ${isDoctor ? 'bg-emerald-500' : 'bg-prism-accent'}`}></div>
                            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-prism-text/40 dark:text-white/30">
                                {isDoctor ? 'Physician ID Protocol' : 'Neuro-Recovery Link'}
                            </p>
                        </div>
                    </div>

                    {authError && (
                        <div className="mb-8 p-5 bg-rose-500/5 border border-rose-500/10 text-rose-500 text-center rounded-2xl text-[10px] font-black uppercase tracking-widest animate-pulse">
                            {authError}
                        </div>
                    )}

                    <form onSubmit={onSubmit} className="space-y-4">
                        {authMode === 'REGISTER' && (
                            <div className="relative group">
                                <div className="absolute left-5 top-1/2 -translate-y-1/2 text-prism-text/30 group-focus-within:text-prism-accent transition-colors">
                                    <Icons.User size={18} />
                                </div>
                                <input name="name" required className="w-full pl-14 pr-8 py-3.5 rounded-xl outline-none font-bold text-sm bg-slate-50 dark:bg-white/5 border border-transparent focus:border-prism-accent transition-all dark:text-white" placeholder="Full Signature Name" />
                            </div>
                        )}

                        <div className="relative group">
                            <div className="absolute left-5 top-1/2 -translate-y-1/2 text-prism-text/30 group-focus-within:text-prism-accent transition-colors">
                                <Icons.Mail size={18} />
                            </div>
                            <input name="email" required type="email" className="w-full pl-14 pr-8 py-3.5 rounded-xl outline-none font-bold text-sm bg-slate-50 dark:bg-white/5 border border-transparent focus:border-prism-accent transition-all dark:text-white" placeholder="Network ID / Email" />
                        </div>

                        {authMode === 'REGISTER' && (
                            <div className="relative group">
                                <div className="absolute left-5 top-1/2 -translate-y-1/2 text-prism-text/30 group-focus-within:text-prism-accent transition-colors">
                                    <Icons.Phone size={18} />
                                </div>
                                <input name="phone" type="tel" className="w-full pl-14 pr-8 py-3.5 rounded-xl outline-none font-bold text-sm bg-slate-50 dark:bg-white/5 border border-transparent focus:border-prism-accent transition-all dark:text-white" placeholder="Contact Number (Optional)" />
                            </div>
                        )}

                        <div className="relative group">
                            <div className="absolute left-5 top-1/2 -translate-y-1/2 text-prism-text/30 group-focus-within:text-prism-accent transition-colors">
                                <Icons.Lock size={18} />
                            </div>
                            <input name="password" required type="password" className="w-full pl-14 pr-8 py-3.5 rounded-xl outline-none font-bold text-sm bg-slate-50 dark:bg-white/5 border border-transparent focus:border-prism-accent transition-all dark:text-white" placeholder="Password" />
                        </div>

                        <button
                            type="submit"
                            disabled={isAuthenticating}
                            className={`w-full py-4 mt-4 rounded-xl font-[1000] uppercase tracking-[0.3em] text-[10px] shadow-xl active:scale-95 transition-all specular ${isDoctor ? 'bg-emerald-600 text-white' : 'bg-prism-dark text-white'}`}
                        >
                            {isAuthenticating ? 'SYNCHRONIZING...' : 'ESTABLISH LINK'}
                        </button>
                    </form>

                    <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
                        <button
                            onClick={() => { setAuthMode(authMode === 'LOGIN' ? 'REGISTER' : 'LOGIN'); }}
                            className="text-[9px] font-black uppercase tracking-[0.2em] text-prism-text/30 dark:text-white/20 hover:text-prism-text dark:hover:text-white transition-colors"
                        >
                            {authMode === 'LOGIN' ? "Register" : "Login"}
                        </button>

                        <button
                            onClick={() => onSwitchRole(isDoctor ? UserRole.PATIENT : UserRole.DOCTOR)}
                            className="px-5 py-2.5 rounded-xl glass-ui text-[9px] font-black uppercase tracking-[0.2em] hover:bg-white/10 transition-all flex items-center gap-3 text-prism-text/40 dark:text-white/30 group"
                        >
                            <Icons.Brain size={14} className="group-hover:rotate-12 transition-transform" />
                            Switch Hub
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuthPortal;
