
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
    onGoogleLogin: () => void;
    darkMode: boolean;
}

const AuthPortal: React.FC<AuthPortalProps> = ({
    role,
    authMode,
    setAuthMode,
    onSubmit,
    isAuthenticating,
    authError,
    onSwitchRole,
    onGoogleLogin,
    darkMode
}) => {
    const isDoctor = role === UserRole.DOCTOR;

    return (
        <div className={`cosmic-auth-background ${darkMode ? 'dark' : 'light'}`}>
            {/* Dynamic System Theme Backgrounds */}
            <div className={`fixed inset-0 -z-10 transition-all duration-700 ${darkMode
                ? (isDoctor
                    ? 'bg-gradient-to-br from-[#0a1f1c] via-[#1a4d47] via-[#2d7a6e] via-[#8b6f47] to-[#c9a961]'
                    : 'bg-gradient-to-br from-[#0a192f] via-[#112240] via-[#1e40af] via-[#3b82f6] to-[#93c5fd]')
                : 'bg-gradient-to-r from-[#dcfce7] via-white to-[#dbeafe]'
                }`}></div>

            {/* Atmospheric Visual Effects: Particle Field */}
            <div className="fixed inset-0 opacity-60 -z-10 animate-particle-float" style={{
                backgroundImage: `radial-gradient(2px 2px at 20% 30%, white, transparent),
                                  radial-gradient(2px 2px at 60% 70%, white, transparent),
                                  radial-gradient(1px 1px at 50% 50%, white, transparent),
                                  radial-gradient(1px 1px at 80% 10%, white, transparent),
                                  radial-gradient(2px 2px at 90% 60%, white, transparent)`,
                backgroundSize: '200% 200%'
            }}></div>

            {/* Glow Overlay */}
            <div className="fixed inset-0 -z-10 mix-blend-screen" style={{
                background: isDoctor
                    ? `radial-gradient(ellipse at 30% 50%, rgba(26, 155, 142, 0.3) 0%, transparent 50%),
                       radial-gradient(ellipse at 70% 50%, rgba(201, 169, 97, 0.2) 0%, transparent 50%)`
                    : `radial-gradient(ellipse at 30% 50%, rgba(37, 99, 235, 0.3) 0%, transparent 50%),
                       radial-gradient(ellipse at 70% 50%, rgba(147, 197, 253, 0.2) 0%, transparent 50%)`
            }}></div>

            {/* Main Container */}
            <div className="min-h-screen flex items-center justify-center p-6 md:p-10 py-8 lg:py-16">
                <div className={`flex flex-col md:flex-row w-full max-w-[1000px] md:min-h-[660px] rounded-[40px] overflow-hidden shadow-2xl backdrop-blur-xl border transition-all duration-700 ${darkMode
                    ? 'bg-white/[0.03] border-white/[0.08] shadow-[0_30px_90px_rgba(0,0,0,0.6)]'
                    : 'bg-white/60 border-black/5 shadow-[0_30px_60px_rgba(0,0,0,0.1)]'
                    }`}>


                    {/* Brand Identity & Visual Indicators */}
                    <div className={`relative flex-[0_0_45%] bg-gradient-to-br flex flex-col items-center justify-center p-16 overflow-hidden transition-all duration-700 ${darkMode
                        ? (isDoctor
                            ? 'from-[rgba(10,31,28,0.95)] via-[rgba(26,77,71,0.9)] to-[rgba(45,122,110,0.85)]'
                            : 'from-[rgba(10,25,47,0.95)] via-[rgba(17,34,64,0.9)] to-[rgba(30,64,175,0.85)]')
                        : (isDoctor
                            ? 'from-[#10b981] via-[#059669] to-[#047857]'
                            : 'from-[#3b82f6] via-[#2563eb] to-[#1d4ed8]')
                        }`}>
                        {/* Radial Glow */}
                        <div className={`absolute inset-0 pointer-events-none ${isDoctor
                            ? 'bg-[radial-gradient(circle_at_50%_50%,rgba(26,155,142,0.15)_0%,transparent_70%)]'
                            : 'bg-[radial-gradient(circle_at_50%_50%,rgba(37,99,235,0.15)_0%,transparent_70%)]'
                            }`}></div>

                        {/* Back Button */}
                        <button
                            onClick={() => setAuthMode(null)}
                            className="absolute top-8 left-8 w-11 h-11 bg-white/[0.08] border border-white/[0.15] rounded-xl flex items-center justify-center text-white/70 hover:bg-white/[0.12] hover:text-white/90 transition-all"
                        >
                            <Icons.Logout size={18} className="rotate-180" />
                        </button>

                        {/* Icon Container with Glow */}
                        <div className="relative z-10 mb-12">
                            <div className={`absolute inset-0 w-40 h-40 rounded-full blur-[20px] animate-pulse-glow ${isDoctor
                                ? 'bg-[radial-gradient(circle,rgba(190,242,100,0.4)_0%,rgba(26,155,142,0.2)_40%,transparent_70%)]'
                                : 'bg-[radial-gradient(circle,rgba(56,189,248,0.4)_0%,rgba(37,99,235,0.2)_40%,transparent_70%)]'
                                }`}></div>
                            <div className="relative w-36 h-36 flex items-center justify-center">
                                {/* Waveform Icon */}
                                <svg className={`w-20 h-20 ${isDoctor ? 'text-[#BEF264]' : 'text-[#38bdf8]'}`}
                                    style={{ filter: `drop-shadow(0 0 20px ${isDoctor ? 'rgba(190, 242, 100, 0.6)' : 'rgba(56, 189, 248, 0.6)'})` }}
                                    viewBox="0 0 80 80" fill="none">
                                    <rect x="20" y="15" width="8" height="50" rx="4" fill="currentColor" opacity="0.6" />
                                    <rect x="36" y="8" width="8" height="64" rx="4" fill="currentColor" />
                                    <rect x="52" y="20" width="8" height="40" rx="4" fill="currentColor" opacity="0.6" />
                                </svg>
                            </div>
                        </div>

                        {/* Title */}
                        <div className="text-center z-10">
                            <h1 className="text-3xl lg:text-4xl font-black tracking-[0.05em] text-white mb-2 text-shadow-[0_2px_20px_rgba(255,255,255,0.3)]">
                                {isDoctor ? 'DOCTOR' : 'PATIENT'}
                            </h1>
                            <p className={`text-[10px] lg:text-[11px] font-bold tracking-[0.3em] uppercase opacity-90 ${isDoctor ? 'text-[#BEF264]' : 'text-[#38bdf8]'}`}>
                                {isDoctor ? 'ACCESS PORTAL' : 'RECOVERY HUB'}
                            </p>
                        </div>

                        {/* Neural Rings */}
                        <div className="absolute bottom-16 left-1/2 -translate-x-1/2 w-[300px] h-[120px]">
                            <div className={`absolute left-1/2 bottom-0 -translate-x-1/2 w-[200px] h-[100px] border rounded-full animate-ring-pulse ${isDoctor ? 'border-[rgba(26,155,142,0.3)]' : 'border-[rgba(37,99,235,0.3)]'}`}></div>
                            <div className={`absolute left-1/2 bottom-0 -translate-x-1/2 w-[250px] h-[125px] border rounded-full animate-ring-pulse ${isDoctor ? 'border-[rgba(26,155,142,0.3)]' : 'border-[rgba(37,99,235,0.3)]'}`} style={{ animationDelay: '0.5s' }}></div>
                            <div className={`absolute left-1/2 bottom-0 -translate-x-1/2 w-[300px] h-[150px] border rounded-full animate-ring-pulse ${isDoctor ? 'border-[rgba(26,155,142,0.3)]' : 'border-[rgba(37,99,235,0.3)]'}`} style={{ animationDelay: '1s' }}></div>
                        </div>
                    </div>

                    {/* Authentication Feedback & Input Ingress */}
                    <div className="relative flex-[0_0_55%] bg-gradient-to-br from-[#ffffff] to-[#f3f5f7] flex items-center justify-center p-12 lg:p-16">
                        {/* Design Space / Top Pill */}
                        <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-48 h-10 border-b border-x rounded-b-3xl hidden md:flex items-center justify-center ${isDoctor ? 'bg-[#BEF264]/10 border-[#BEF264]/20' : 'bg-[#38bdf8]/10 border-[#38bdf8]/20'
                            }`}>
                            <div className={`w-20 h-1 rounded-full ${isDoctor ? 'bg-[#BEF264]/30' : 'bg-[#38bdf8]/30'}`}></div>
                        </div>

                        <div className="w-full max-w-[380px]">
                            {/* Welcome Title - Responsive */}
                            <h2 className="text-2xl md:text-[32px] lg:text-[36px] font-black text-[#0f172a] mb-2 lg:mb-3 tracking-[-0.03em]">
                                {authMode === 'LOGIN' ? 'Welcome Back' : 'Create Account'}
                            </h2>

                            {/* Subtitle with Divider */}
                            <div className="flex items-center gap-2 lg:gap-3 mb-8 lg:mb-12">
                                <span className={`px-3 py-1 border rounded-full text-[8px] lg:text-[9px] font-black tracking-[0.2em] uppercase ${isDoctor ? 'bg-[#BEF264]/10 border-[#BEF264]/20 text-[#1a9b8e]' : 'bg-[#38bdf8]/10 border-[#38bdf8]/20 text-[#2563eb]'
                                    }`}>
                                    {isDoctor ? 'PHYSICIAN ID PROTOCOL' : 'NEURO-RECOVERY LINK'}
                                </span>
                                <span className="flex-1 h-[1px] bg-gradient-to-r from-black/[0.05] to-transparent"></span>
                            </div>

                            {/* Error Message */}
                            {authError && (
                                <div className="mb-5 lg:mb-6 p-3 lg:p-4 bg-rose-500/5 border border-rose-500/10 text-rose-500 text-center rounded-xl text-[9px] lg:text-[10px] font-black uppercase tracking-widest">
                                    {authError}
                                </div>
                            )}

                            {/* Form - Responsive */}
                            <form onSubmit={onSubmit} className="space-y-3 lg:space-y-3.5">
                                {authMode === 'REGISTER' && (
                                    <div className="relative">
                                        <div className="absolute left-[18px] top-1/2 -translate-y-1/2 text-[#9ca3af]">
                                            <Icons.User size={18} />
                                        </div>
                                        <input
                                            name="name"
                                            required
                                            className={`w-full h-10 md:h-11 lg:h-12 px-4 lg:px-5 pl-[48px] lg:pl-[52px] bg-white border border-black/[0.06] rounded-xl text-sm font-medium text-[#1a1a1a] placeholder:text-[#9ca3af] placeholder:font-medium focus:outline-none focus:bg-white transition-all touch-manipulation`}
                                            style={{
                                                borderColor: 'rgba(0,0,0,0.06)',
                                                boxShadow: isDoctor ? '0 0 0 4px rgba(16, 185, 129, 0.1)' : '0 0 0 4px rgba(59, 130, 246, 0.1)',
                                                borderInlineColor: isDoctor ? 'rgba(16, 185, 129, 0.4)' : 'rgba(59, 130, 246, 0.4)'
                                            }}
                                            placeholder="Full Name"
                                        />
                                    </div>
                                )}

                                <div className="relative">
                                    <div className="absolute left-[16px] lg:left-[18px] top-1/2 -translate-y-1/2 text-[#9ca3af]">
                                        <Icons.Mail size={18} />
                                    </div>
                                    <input
                                        name="email"
                                        required
                                        type="email"
                                        className={`w-full h-10 md:h-11 lg:h-12 px-4 lg:px-5 pl-[48px] lg:pl-[52px] bg-white border border-black/[0.06] rounded-xl text-sm font-medium text-[#1a1a1a] placeholder:text-[#9ca3af] placeholder:font-medium focus:outline-none focus:bg-white transition-all touch-manipulation`}
                                        style={{
                                            borderColor: 'rgba(0,0,0,0.06)',
                                            boxShadow: isDoctor ? '0 0 0 4px rgba(16, 185, 129, 0.1)' : '0 0 0 4px rgba(59, 130, 246, 0.1)',
                                            borderInlineColor: isDoctor ? 'rgba(16, 185, 129, 0.4)' : 'rgba(59, 130, 246, 0.4)'
                                        }}
                                        placeholder="Network ID / Email"
                                        pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                                        title="Please enter a valid email address"
                                    />
                                </div>

                                {authMode === 'REGISTER' && (
                                    <div className="relative">
                                        <div className="absolute left-[16px] lg:left-[18px] top-1/2 -translate-y-1/2 text-[#9ca3af]">
                                            <Icons.Phone size={18} />
                                        </div>
                                        <input
                                            name="phone"
                                            type="tel"
                                            className={`w-full h-10 md:h-11 lg:h-12 px-4 lg:px-5 pl-[48px] lg:pl-[52px] bg-white border border-black/[0.06] rounded-xl text-sm font-medium text-[#1a1a1a] placeholder:text-[#9ca3af] placeholder:font-medium focus:outline-none focus:bg-white transition-all touch-manipulation`}
                                            style={{
                                                borderColor: 'rgba(0,0,0,0.06)',
                                                boxShadow: isDoctor ? '0 0 0 4px rgba(16, 185, 129, 0.1)' : '0 0 0 4px rgba(59, 130, 246, 0.1)',
                                                borderInlineColor: isDoctor ? 'rgba(16, 185, 129, 0.4)' : 'rgba(59, 130, 246, 0.4)'
                                            }}
                                            placeholder="Contact Number (Optional)"
                                        />
                                    </div>
                                )}

                                {authMode === 'REGISTER' && isDoctor && (
                                    <div className="relative">
                                        <div className="absolute left-[16px] lg:left-[18px] top-1/2 -translate-y-1/2 text-[#9ca3af]">
                                            <Icons.ShieldCheck size={18} />
                                        </div>
                                        <input
                                            name="licenseId"
                                            required
                                            className={`w-full h-10 md:h-11 lg:h-12 px-4 lg:px-5 pl-[48px] lg:pl-[52px] bg-white border border-black/[0.06] rounded-xl text-sm font-medium text-[#1a1a1a] placeholder:text-[#9ca3af] placeholder:font-medium focus:outline-none focus:bg-white transition-all touch-manipulation`}
                                            style={{
                                                borderColor: 'rgba(0,0,0,0.06)',
                                                boxShadow: isDoctor ? '0 0 0 4px rgba(16, 185, 129, 0.1)' : '0 0 0 4px rgba(59, 130, 246, 0.1)',
                                                borderInlineColor: isDoctor ? 'rgba(16, 185, 129, 0.4)' : 'rgba(59, 130, 246, 0.4)'
                                            }}
                                            placeholder="Medical License Number"
                                            minLength={5}
                                            pattern="[a-zA-Z0-9]+"
                                            title="License ID must be at least 5 alphanumeric characters"
                                        />
                                    </div>
                                )}

                                <div className="relative">
                                    <div className="absolute left-[16px] lg:left-[18px] top-1/2 -translate-y-1/2 text-[#9ca3af]">
                                        <Icons.Lock size={18} />
                                    </div>
                                    <input
                                        name="password"
                                        required
                                        type="password"
                                        className={`w-full h-10 md:h-11 lg:h-12 px-4 lg:px-5 pl-[48px] lg:pl-[52px] bg-white border border-black/[0.06] rounded-xl text-sm font-medium text-[#1a1a1a] placeholder:text-[#9ca3af] placeholder:font-medium focus:outline-none focus:bg-white transition-all touch-manipulation`}
                                        style={{
                                            borderColor: 'rgba(0,0,0,0.06)',
                                            boxShadow: isDoctor ? '0 0 0 4px rgba(16, 185, 129, 0.1)' : '0 0 0 4px rgba(59, 130, 246, 0.1)',
                                            borderInlineColor: isDoctor ? 'rgba(16, 185, 129, 0.4)' : 'rgba(59, 130, 246, 0.4)'
                                        }}
                                        placeholder="Password"
                                        minLength={8}
                                        title="Password must be at least 8 characters long"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={isAuthenticating}
                                    className={`w-full h-11 md:h-12 lg:h-13 border-none rounded-2xl text-[10px] lg:text-[11px] font-black tracking-[0.2em] text-white uppercase cursor-pointer transition-all mt-5 lg:mt-6 touch-manipulation ${isDoctor
                                        ? 'bg-gradient-to-br from-[#0d5c54] to-[#1a9b8e] shadow-[0_10px_30px_rgba(13,92,84,0.35)]'
                                        : 'bg-gradient-to-br from-[#1e40af] to-[#3b82f6] shadow-[0_10px_30px_rgba(30,64,175,0.35)]'
                                        }`}
                                >
                                    {isAuthenticating ? 'PLEASE WAIT...' : (authMode === 'LOGIN' ? 'LOGIN' : 'CREATE ACCOUNT')}
                                </button>

                                {/* Google Login - Only for Patients */}
                                {!isDoctor && (
                                    <>
                                        {/* Divider or OR */}
                                        <div className="flex items-center gap-3 my-4">
                                            <div className="flex-1 h-[1px] bg-black/[0.06]"></div>
                                            <span className="text-[9px] font-black text-[#9ca3af] tracking-widest uppercase">OR</span>
                                            <div className="flex-1 h-[1px] bg-black/[0.06]"></div>
                                        </div>

                                        <button
                                            type="button"
                                            onClick={onGoogleLogin}
                                            disabled={isAuthenticating}
                                            className={`w-full h-11 md:h-12 border border-black/[0.08] rounded-2xl flex items-center justify-center gap-3 bg-white hover:bg-slate-50 transition-all shadow-sm active:scale-[0.98]`}
                                        >
                                            <Icons.Google size={20} />
                                            <span className="text-[10px] md:text-[11px] font-black tracking-[0.1em] text-[#0f172a] uppercase">CONTINUE WITH GOOGLE</span>
                                        </button>
                                    </>
                                )}
                            </form>

                            {/* Footer Links */}
                            <div className="flex justify-between items-center pt-6 mt-6 border-t border-black/[0.06]">
                                <button
                                    onClick={() => setAuthMode(authMode === 'LOGIN' ? 'REGISTER' : 'LOGIN')}
                                    className="text-[11px] font-bold tracking-[0.1em] text-[#6b7280] uppercase hover:text-[#1a9b8e] transition-colors"
                                >
                                    {authMode === 'LOGIN' ? 'REGISTER' : 'LOGIN'}
                                </button>
                                <button
                                    onClick={() => onSwitchRole(isDoctor ? UserRole.PATIENT : UserRole.DOCTOR)}
                                    className="flex items-center gap-2 text-[11px] font-bold tracking-[0.1em] text-[#6b7280] uppercase hover:text-[#1a9b8e] transition-colors"
                                >
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <circle cx="12" cy="12" r="10" />
                                        <polyline points="12 6 12 12 16 14" />
                                    </svg>
                                    SWITCH HUB
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuthPortal;
