
import React, { useState, useEffect, useMemo } from 'react';
import { SessionResult, Connection, ConnectionStatus, DoctorProfile, UserAccount, TherapyType } from '../types';
import { User, Mic, Activity, Brain, Therapy, Logo, Verified, Logout } from '../components/Icons';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  AreaChart, Area, PieChart, Pie, Cell, BarChart, Bar, RadarChart, PolarGrid,
  PolarAngleAxis, PolarRadiusAxis, Radar, ScatterChart, Scatter, ZAxis
} from 'recharts';

import OverallRecoveryCard from '../components/dashboard/OverallRecoveryCard';
import WeeklyProgressCard from '../components/dashboard/WeeklyProgressCard';
import ExerciseCompletionCard from '../components/dashboard/ExerciseCompletionCard';
import RiskStatusCard from '../components/dashboard/RiskStatusCard';
import HandAccuracyCard from '../components/dashboard/HandAccuracyCard';
import TremorIntensityCard from '../components/dashboard/TremorIntensityCard';
import SpeechClarityCard from '../components/dashboard/SpeechClarityCard';
import MemoryScoreCard from '../components/dashboard/MemoryScoreCard';
import BalanceStabilityCard from '../components/dashboard/BalanceStabilityCard';
import MoodTrendCard from '../components/dashboard/MoodTrendCard';
import SessionComplianceCard from '../components/dashboard/SessionComplianceCard';
import RecoveryPredictionCard from '../components/dashboard/RecoveryPredictionCard';
import AIRecommendationsCard from '../components/dashboard/AIRecommendationsCard';


interface DoctorProps {
  activeTab: string;
  history: SessionResult[];
  connections: Connection[];
  onAcceptConnection: (connId: string) => void;
  darkMode: boolean;
  currentUser: DoctorProfile;
  accounts: UserAccount[];
  setView: (view: string) => void;
}

const COLORS = ['#48c1cf', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

const DashboardWidget: React.FC<{ title: string, icon: React.ReactNode, children: React.ReactNode, className?: string, isDark: boolean }> = ({ title, icon, children, className, isDark }) => (
  <div className={`flex flex-col rounded-[2rem] border transition-all duration-500 overflow-hidden shadow-xl hover:shadow-2xl group ${isDark ? 'bg-[#0f1115] border-white/5' : 'bg-white border-slate-100'} ${className || ''}`}>
    <div className="px-6 py-4 flex items-center justify-between border-b border-transparent group-hover:border-inherit transition-colors">
      <div className="flex items-center gap-3">
        <div className={`text-slate-400 group-hover:text-[#48c1cf] transition-colors`}>{icon}</div>
        <h3 className={`text-[10px] font-black uppercase tracking-[0.3em] ${isDark ? 'text-white/60' : 'text-slate-500'}`}>{title}</h3>
      </div>
      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
    </div>
    <div className="flex-grow p-6">
      {children}
    </div>
  </div>
);

const PatientMonitor: React.FC<{ patient: UserAccount, history: SessionResult[], onBack: () => void, isDark: boolean }> = ({ patient, history, onBack, isDark }) => {
  const patientHistory = history.filter(h => h.patientId === patient.id);

  return (
    <div className={`fixed inset-0 z-[200] flex flex-col transition-colors duration-1000 ${isDark ? 'bg-black text-white' : 'bg-[#f4f7f9] text-[#1a365d]'}`}>

      {/* Header Layout Item (Non-overlapping) */}
      <div className="flex-none z-50 p-6 pb-0">
        <header className="flex items-center justify-between bio-gradient-header py-4 px-8 rounded-full shadow-2xl text-white relative overflow-hidden">
          {/* Left: Return Button */}
          <div className="flex items-center gap-6 relative z-10">
            <button onClick={onBack} className="flex items-center gap-2 px-6 py-2 rounded-full bg-black/40 hover:bg-black/60 transition-all text-[10px] font-bold uppercase tracking-widest border border-white/10 shadow-lg group text-white">
              <Logout size={14} className="rotate-180 group-hover:-translate-x-0.5 transition-transform text-white" />
              <span>Return</span>
            </button>
            <div className="h-8 w-[1px] bg-white/10 mx-2"></div>
            <div>
              <h2 className="text-3xl font-black tracking-tighter uppercase leading-none text-white drop-shadow-md">{patient.name}</h2>
              <p className="font-mono text-[9px] font-bold uppercase tracking-[0.3em] mt-1 text-blue-200 opacity-80">PATIENT BIO-TELEMETRY PORTAL v4.0</p>
            </div>
          </div>

          {/* Right: Status & Session Pool */}
          <div className="hidden md:flex items-center gap-12 relative z-10">
            <div className="flex flex-col items-center">
              <span className="text-[9px] font-bold uppercase tracking-widest text-blue-300 mb-1">Status</span>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.8)]"></div>
                <span className="text-xs font-bold font-mono tracking-wider uppercase text-white text-shadow-sm">Connected</span>
              </div>
            </div>
            <div className="flex flex-col items-end">
              <span className="text-[9px] font-bold uppercase tracking-widest text-blue-300 mb-1">Session Pool</span>
              <span className="text-2xl font-black tabular-nums tracking-tighter text-white drop-shadow-md">{history.length} <span className="text-sm font-bold text-blue-300">Units</span></span>
            </div>
          </div>

          {/* Subtle overlay gradient for depth */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none"></div>
        </header>
      </div>

      {/* Scrollable Content Area */}
      <div className="flex-grow overflow-y-auto p-4 lg:p-6 pt-6">
        <div className="max-w-[1800px] mx-auto space-y-8 h-full">
          {/* THE GRID DASHBOARD */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 pb-20 grid-flow-dense auto-rows-auto">
            {/* Row 1 */}
            <OverallRecoveryCard history={patientHistory} />
            <div className="md:col-span-2">
              <WeeklyProgressCard history={patientHistory} />
            </div>
            <ExerciseCompletionCard history={patientHistory} />
            <RiskStatusCard history={patientHistory} />

            {/* Row 2 */}
            <HandAccuracyCard history={patientHistory} />
            <TremorIntensityCard history={patientHistory} />
            <SpeechClarityCard history={patientHistory} />
            <MemoryScoreCard history={patientHistory} />
            {/* Row 2 - Continue */}
            <div className="row-span-3">
              <RecoveryPredictionCard history={patientHistory} />
            </div>

            {/* rows 3 & 4 mixed */}
            <div className="row-span-2">
              <BalanceStabilityCard history={patientHistory} />
            </div>

            <AIRecommendationsCard history={patientHistory} />

            <div className="md:col-span-2 row-span-2">
              <SessionComplianceCard history={patientHistory} />
            </div>

            <MoodTrendCard history={patientHistory} />

          </div>
        </div>
      </div>
    </div>
  );
};

const DoctorDashboard: React.FC<DoctorProps> = ({ activeTab, history, connections, onAcceptConnection, darkMode, currentUser, accounts, setView }) => {
  const [selectedPatientId, setSelectedPatientId] = useState<string | null>(null);

  const myConnections = connections.filter(c => c.doctorId === currentUser.id);
  const pendingRequests = myConnections.filter(c => c.status === ConnectionStatus.PENDING);
  const authorizedPatients = myConnections.filter(c => c.status === ConnectionStatus.CONNECTED);

  const getPatientName = (pId: string) => {
    return accounts.find(a => a.id === pId)?.name || "Unknown Patient";
  };

  const getPatientAccount = (pId: string) => {
    return accounts.find(a => a.id === pId);
  };

  if (selectedPatientId) {
    const patient = getPatientAccount(selectedPatientId);
    if (patient) return <PatientMonitor patient={patient} history={history} onBack={() => setSelectedPatientId(null)} isDark={darkMode} />;
  }

  const renderRequestsView = () => (
    <div className="space-y-8 animate-in fade-in duration-500">
      <h2 className={`text-xs font-black uppercase tracking-[0.4em] mb-8 ${darkMode ? 'text-[#48c1cf]' : 'text-blue-600'}`}>Inbound Telemetry Requests</h2>
      {pendingRequests.length === 0 ? (
        <div className={`py-20 text-center rounded-[3rem] ${darkMode ? 'glass-medical' : 'bg-slate-50 border border-slate-200'}`}>
          <p className="text-slate-400 dark:text-white font-bold uppercase tracking-widest text-xs">No pending handshakes found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {pendingRequests.map(req => (
            <div key={req.id} className={`p-8 rounded-[2.5rem] border shadow-lg flex items-center justify-between transition-all ${darkMode ? 'bg-[#0B1221] border-white/10' : 'bg-white border-slate-200'}`}>
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-white mb-1">Patient Request</p>
                <p className="text-xl font-black text-[#1a365d] dark:text-white mb-1">{getPatientName(req.patientId)}</p>
                <p className="text-[8px] font-bold text-slate-400 dark:text-white uppercase tracking-widest opacity-50 dark:opacity-100">ID: {req.patientId}</p>
              </div>
              <button
                onClick={() => onAcceptConnection(req.id)}
                className="px-6 py-3 bg-emerald-600 text-white rounded-xl font-black uppercase tracking-widest text-[9px] shadow-lg active:scale-95 transition-all"
              >
                AUTHORIZE LINK
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const renderAuthorizedView = () => (
    <div className="space-y-8 animate-in fade-in duration-500">
      <h2 className={`text-xs font-black uppercase tracking-[0.4em] mb-8 ${darkMode ? 'text-white' : 'text-blue-600'}`}>Managed Patient Cohort</h2>
      {authorizedPatients.length === 0 ? (
        <div className={`py-20 text-center rounded-[3rem] ${darkMode ? 'glass-medical' : 'bg-slate-50 border border-slate-200'}`}>
          <p className="text-slate-400 dark:text-white font-bold uppercase tracking-widest text-xs">No authorized patients linked yet.</p>
        </div>
      ) : (
        <div className={`rounded-[2.5rem] border overflow-hidden shadow-xl ${darkMode ? 'bg-[#0B1221] border-white/10' : 'bg-white border-slate-200'}`}>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className={`border-b ${darkMode ? 'border-white/5' : 'border-slate-100'}`}>
                  <th className={`px-8 py-5 text-[9px] font-black uppercase tracking-[0.4em] ${darkMode ? 'text-white' : 'text-slate-400'}`}>Patient Identity</th>
                  <th className={`px-8 py-5 text-[9px] font-black uppercase tracking-[0.4em] ${darkMode ? 'text-white' : 'text-slate-400'}`}>Patient ID</th>
                  <th className={`px-8 py-5 text-[9px] font-black uppercase tracking-[0.4em] ${darkMode ? 'text-white' : 'text-slate-400'}`}>Handshake Date</th>
                  <th className={`px-8 py-5 text-[9px] font-black uppercase tracking-[0.4em] ${darkMode ? 'text-white' : 'text-slate-400'}`}>Status</th>
                  <th className={`px-8 py-5 text-[9px] font-black uppercase tracking-[0.4em] text-right ${darkMode ? 'text-white' : 'text-slate-400'}`}>Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                {authorizedPatients.map((p, i) => (
                  <tr key={i} className={`transition-colors group ${darkMode ? '' : 'hover:bg-slate-50'}`}>
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-xl flex items-center justify-center font-black text-xs ${darkMode ? 'bg-white/10 text-white' : 'bg-[#48c1cf]/10 text-[#48c1cf]'}`}>
                          {getPatientName(p.patientId).charAt(0)}
                        </div>
                        <span className={`text-sm font-black uppercase tracking-tight ${darkMode ? 'text-white' : 'text-[#1a365d]'}`}>{getPatientName(p.patientId)}</span>
                      </div>
                    </td>
                    <td className={`px-8 py-5 text-[10px] clinical-mono font-bold tracking-widest ${darkMode ? 'text-white' : 'text-slate-400'}`}>{p.patientId}</td>
                    <td className={`px-8 py-5 text-xs font-semibold ${darkMode ? 'text-white' : 'text-slate-400'}`}>{new Date(p.timestamp).toLocaleDateString()}</td>
                    <td className="px-8 py-5">
                      <span className={`px-3 py-1 rounded-lg text-[8px] font-black uppercase tracking-widest ${darkMode ? 'bg-emerald-500/20 text-emerald-400' : 'bg-emerald-500/10 text-emerald-600'}`}>ACTIVE PORTAL</span>
                    </td>
                    <td className="px-8 py-5 text-right">
                      <button
                        onClick={() => setSelectedPatientId(p.patientId)}
                        className="px-5 py-2 rounded-xl bg-emerald-500/10 hover:bg-emerald-500 text-emerald-600 hover:text-white dark:text-emerald-400 dark:hover:text-white text-[9px] font-[1000] uppercase tracking-widest transition-all shadow-sm hover:shadow-emerald-500/20 hover:scale-105 border border-emerald-500/20"
                      >
                        VIEW TELEMETRY
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className={`fixed top-0 bottom-0 right-0 left-0 md:left-28 z-[100] flex flex-col transition-colors duration-500 overflow-hidden ${darkMode ? 'bg-[#0B1121] text-slate-100 bg-[radial-gradient(circle_at_center,_#151e32_0%,_#0B1121_100%)]' : 'bg-white text-slate-900'}`}>
      {/* Ambient Blue Light Source - Only in dark mode */}
      {darkMode && (
        <>
          <div className="ambient-blue-glow top-[-20%] left-[20%] opacity-60"></div>
          <div className="ambient-blue-glow bottom-[-20%] right-[10%] opacity-40"></div>
        </>
      )}

      <div className="flex-none z-10 p-6 pb-0">
        <header className={`flex items-center justify-between py-3 px-8 rounded-full shadow-2xl relative overflow-hidden transition-all duration-300 ${darkMode ? 'bio-gradient-header text-white' : 'bg-white text-slate-900 border border-slate-200'}`}>
          {/* Left: Branding */}
          <div className="flex items-center gap-6 relative z-10">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center border shadow-lg ${darkMode ? 'bg-blue-500/10 border-blue-400/20' : 'bg-blue-50 border-blue-100'}`}>
              <Activity size={20} className={darkMode ? "text-blue-400" : "text-blue-600"} />
            </div>
            <div>
              <h1 className={`text-3xl tracking-tighter uppercase leading-none drop-shadow-md ${darkMode ? 'font-[800] text-white' : 'font-[900] text-slate-800'}`}>Clinical Command</h1>
              <p className={`font-mono text-[9px] font-bold uppercase tracking-[0.3em] mt-1 opacity-80 ${darkMode ? 'text-blue-200' : 'text-slate-500'}`}>CENTRAL TELEMETRY UNIT v4.0</p>
            </div>
          </div>

          {/* Right: Physician Status */}
          <div className="hidden md:flex items-center gap-12 relative z-10">
            <div className="flex flex-col items-center">
              <span className={`text-[9px] font-bold uppercase tracking-widest mb-1 ${darkMode ? 'text-blue-200/60' : 'text-slate-400'}`}>System Status</span>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.8)]"></div>
                <span className={`text-xs font-bold font-mono tracking-wider uppercase text-shadow-sm ${darkMode ? 'text-emerald-300' : 'text-slate-700'}`}>Online</span>
              </div>
            </div>
            <div className="flex flex-col items-end">
              <span className={`text-[9px] font-bold uppercase tracking-widest mb-1 ${darkMode ? 'text-blue-200/60' : 'text-slate-400'}`}>Authorized Physician</span>
              <span className={`text-lg font-black tracking-tight drop-shadow-md ${darkMode ? 'text-white' : 'text-slate-800'}`}>Dr. {currentUser.name}</span>
            </div>
          </div>

          {/* Subtle overlay gradient - Only in Dark Mode */}
          {darkMode && <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none"></div>}
        </header>
      </div>

      <div className="flex-grow overflow-y-auto p-6 pt-6">
        <div className="space-y-12 resolve-ui">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="dashboard-card group border-blue-500/30 hover:border-blue-400/60 relative overflow-hidden">
              <div className="absolute -bottom-4 -right-4 text-slate-200 dark:text-white/10 pointer-events-none">
                <User size={80} />
              </div>
              <p className={`text-[10px] font-black uppercase tracking-widest mb-2 relative z-10 ${darkMode ? 'text-blue-300' : 'text-blue-600'}`}>Total Linked Cohort</p>
              <p className={`text-4xl font-black relative z-10 drop-shadow-md ${darkMode ? 'text-white' : 'text-slate-900'}`}>{authorizedPatients.length}</p>
            </div>
            <div className="dashboard-card group border-cyan-500/30 hover:border-cyan-400/60 relative overflow-hidden">
              <div className="absolute -bottom-4 -right-4 text-slate-200 dark:text-white/10 pointer-events-none">
                <Activity size={80} />
              </div>
              <p className={`text-[10px] font-black uppercase tracking-widest mb-2 relative z-10 ${darkMode ? 'text-cyan-300' : 'text-cyan-600'}`}>Pending Inbound Handshake</p>
              <p className={`text-4xl font-black relative z-10 drop-shadow-md ${darkMode ? 'text-white' : 'text-slate-900'}`}>{pendingRequests.length}</p>
            </div>
          </div>

          <div className={`flex flex-wrap gap-4 pb-4 ${darkMode ? 'border-b border-white/10' : 'border-b border-slate-200'}`}>
            {[
              { id: 'patients', label: 'Patient Cohort', icon: <User size={14} /> },
              { id: 'alerts', label: 'Handshake Queue', icon: <Activity size={14} />, count: pendingRequests.length },
              { id: 'reports', label: 'Clinical Synthesis', icon: <Brain size={14} /> }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setView(tab.id)}
                className={`px-8 py-3 rounded-full font-black uppercase tracking-widest text-[10px] transition-all duration-300 flex items-center gap-3 relative overflow-hidden group border ${activeTab === tab.id ? `${darkMode ? 'bg-blue-600/90 text-white border-blue-500/50 shadow-[0_0_15px_rgba(37,99,235,0.2)]' : 'bg-blue-600 text-white border-blue-400 shadow-[0_0_20px_rgba(37,99,235,0.4)]'} scale-105` : `${darkMode ? 'text-slate-400/80 hover:text-white hover:bg-white/5' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'} border-transparent hover:border-blue-500/30`}`}
              >
                {activeTab === tab.id && <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 animate-shimmer"></div>}
                {tab.icon}
                <span className="relative z-10">{tab.label}</span>
                {tab.count !== undefined && tab.count > 0 && <span className={`absolute -top-1 -right-1 w-5 h-5 bg-cyan-500 rounded-full text-[9px] flex items-center justify-center text-black font-black border-2 shadow-lg ${darkMode ? 'border-[#020617]' : 'border-white'}`}>{tab.count}</span>}
              </button>
            ))}
          </div>

          <div className="mt-8 pb-20">
            {activeTab === 'patients' && renderAuthorizedView()}
            {activeTab === 'alerts' && renderRequestsView()}
            {activeTab === 'reports' && (
              <div className={`p-10 rounded-[3rem] border shadow-xl animate-in fade-in duration-500 ${darkMode ? 'bg-[#0B1221] border-white/10' : 'bg-white border-slate-200'}`}>
                <h2 className="text-2xl font-black mb-8 text-[#1a365d] dark:text-white uppercase tracking-tighter">Cohort Statistical Synthesis</h2>
                <p className="text-sm font-medium text-slate-500 dark:text-white leading-relaxed italic border-l-4 border-[#48c1cf] pl-6 py-2">
                  Aggregate reports for linked patients will appear here after kinematic data sync. System is currently analyzing 3 active recovery vectors.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;
