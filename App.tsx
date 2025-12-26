
import React, { useState, useEffect } from 'react';
import { UserRole, TherapyType, PatientProfile, DoctorProfile, SessionResult, UserAccount, Connection, ConnectionStatus } from './types';
import Navigation from './components/Navigation';
import PatientDashboard from './views/PatientDashboard';
import BodyTherapy from './views/BodyTherapy';
import SpeechTherapy from './views/SpeechTherapy';
import BrainGames from './views/BrainGames';
import DoctorDashboard from './views/DoctorDashboard';
import ProgressStats from './views/ProgressStats';
import TherapyLibrary from './views/TherapyLibrary';
import ProfileView from './views/ProfileView';
import DoctorConnect from './views/DoctorConnect';

// New Modular Views
import LandingPage from './views/LandingPage';
import AuthPortal from './views/AuthPortal';

import { dataService } from './services/supabase.service';

const App: React.FC = () => {
  const [role, setRole] = useState<UserRole | null>(() => {
    try {
      return localStorage.getItem('ns_role') as UserRole || null;
    } catch {
      return null;
    }
  });
  const [user, setUser] = useState<UserAccount | null>(() => {
    try {
      const saved = localStorage.getItem('ns_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [accounts, setAccounts] = useState<UserAccount[]>([]);
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const savedTheme = localStorage.getItem('ns_theme');
    return savedTheme === null ? false : savedTheme === 'dark';
  });
  const [currentView, setView] = useState('dashboard');
  const [activeExercise, setActiveExercise] = useState<TherapyType | null>(null);
  const [authMode, setAuthMode] = useState<'LOGIN' | 'REGISTER' | null>(null);
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const [globalDoctors, setGlobalDoctors] = useState<DoctorProfile[]>([]);
  const [allConnections, setAllConnections] = useState<Connection[]>([]);
  const [history, setHistory] = useState<SessionResult[]>([]);

  // Periodically fetch data to simulate "real-time" if not using subscriptions yet
  const fetchData = async () => {
    if (!user) return;
    try {
      // Fetch history based on role
      const historyPromise = user.role === UserRole.DOCTOR
        ? dataService.getAllSessions()
        : dataService.getPatientHistory(user.id);

      const [hist, conns, allUsers] = await Promise.all([
        historyPromise,
        dataService.getConnections(),
        dataService.getAllUsers()
      ]);
      setHistory(hist);
      setAllConnections(conns);
      setAccounts(allUsers);
      setGlobalDoctors(allUsers.filter(u => u.role === UserRole.DOCTOR) as DoctorProfile[]);
    } catch (err) {
      console.error('Error fetching real-time data:', err);
    }
  };

  useEffect(() => {
    if (user) {
      localStorage.setItem('ns_user', JSON.stringify(user));
      localStorage.setItem('ns_role', user.role);
      fetchData();
      const interval = setInterval(fetchData, 5000); // 5s poll for mock real-time
      return () => clearInterval(interval);
    }
    localStorage.setItem('ns_theme', darkMode ? 'dark' : 'light');

    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [user, darkMode]);

  const handleAuthSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setAuthError(null);
    setIsAuthenticating(true);
    const formData = new FormData(e.currentTarget);
    const email = (formData.get('email') as string).trim().toLowerCase();
    const password = (formData.get('password') as string).trim();

    try {
      if (authMode === 'LOGIN') {
        const foundUser = await dataService.login(email, password);
        if (foundUser) {
          if (foundUser.role === selectedRole) {
            setUser(foundUser);
            setRole(foundUser.role);
            setAuthMode(null);
          } else {
            setAuthError(`This account is registered as a ${foundUser.role}, not a ${selectedRole}.`);
          }
        } else {
          setAuthError("Invalid email or password.");
        }
      } else {
        const userId = `UID-${Math.random().toString(36).substr(2, 7).toUpperCase()}`;
        const newUser: UserAccount = {
          id: userId,
          name: formData.get('name') as string,
          email: email,
          password: password,
          phone: formData.get('phone') as string || "N/A",
          role: selectedRole!,
          startDate: new Date().toISOString(),
          licenseId: formData.get('licenseId') as string || undefined,
          diagnosis: formData.get('diagnosis') as string || (selectedRole === UserRole.PATIENT ? "Neuro-Recovery" : undefined),
          isVerified: selectedRole === UserRole.DOCTOR,
          caseId: selectedRole === UserRole.PATIENT ? `NS-${Math.floor(Math.random() * 90000)}` : undefined
        };

        await dataService.register(newUser);
        setUser(newUser);
        setRole(selectedRole);
        setAuthMode(null);
      }
    } catch (err: any) {
      setAuthError(err.message || "Data sync error.");
    } finally {
      setIsAuthenticating(false);
    }
  };

  const handleLogout = () => {
    setIsLoggingOut(true);
    setTimeout(() => {
      localStorage.removeItem('ns_user');
      localStorage.removeItem('ns_role');
      setUser(null);
      setRole(null);
      setSelectedRole(null);
      setAuthMode(null);
      setView('dashboard');
      setIsLoggingOut(false);
    }, 1000);
  };

  const handleCompleteExercise = async (score: number, feedback: string) => {
    if (!activeExercise || !user) return;
    const newResult: SessionResult = {
      patientId: user.id,
      timestamp: new Date().toISOString(),
      type: activeExercise,
      score,
      feedback
    };

    try {
      await dataService.saveSession(newResult);
      setHistory(prev => [newResult, ...prev]);
      setActiveExercise(null);
      setView('progress');
    } catch (err) {
      console.error('Session save failed:', err);
      // Fallback to optimistic UI
      setHistory(prev => [newResult, ...prev]);
      setActiveExercise(null);
      setView('progress');
    }
  };

  if (isLoggingOut) {
    return (
      <div className="fixed inset-0 z-[999] bg-white dark:bg-black flex flex-col items-center justify-center p-8 text-center transition-all duration-1000">
        <div className="w-16 h-16 border-[3px] border-prism-accent border-t-transparent rounded-full animate-spin mb-8"></div>
        <h2 className="text-3xl font-[950] text-prism-dark dark:text-white tracking-tighter uppercase">Ending Session</h2>
      </div>
    );
  }

  // Active Therapy Flow
  if (activeExercise === TherapyType.BODY) return <BodyTherapy onComplete={handleCompleteExercise} darkMode={darkMode} />;
  if (activeExercise === TherapyType.SPEECH) return <SpeechTherapy onComplete={handleCompleteExercise} onAbort={() => setActiveExercise(null)} darkMode={darkMode} />;
  if (activeExercise === TherapyType.BRAIN) return <BrainGames onComplete={(score: number) => handleCompleteExercise(score, "Cognitive assessment finalized.")} darkMode={darkMode} />;

  // Separate Landing Page
  if (!role && !authMode) {
    return (
      <LandingPage
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        onSelectRole={(r) => { setSelectedRole(r); setAuthMode('LOGIN'); }}
      />
    );
  }

  // Separate Auth Portals
  if (!role && authMode) {
    return (
      <AuthPortal
        role={selectedRole!}
        authMode={authMode}
        setAuthMode={setAuthMode}
        onSubmit={handleAuthSubmit}
        isAuthenticating={isAuthenticating}
        authError={authError}
        onSwitchRole={(r) => setSelectedRole(r)}
      />
    );
  }

  const renderView = () => {
    if (role === UserRole.DOCTOR) {
      return (
        <DoctorDashboard
          activeTab={currentView === 'dashboard' ? 'patients' : currentView}
          history={history}
          connections={allConnections}
          onAcceptConnection={async (connId: string) => {
            try {
              await dataService.updateConnectionStatus(connId, ConnectionStatus.CONNECTED);
              setAllConnections(prev => prev.map(c => c.id === connId ? { ...c, status: ConnectionStatus.CONNECTED } : c));
            } catch (err) {
              console.error('Handshake authorization failed:', err);
            }
          }}
          darkMode={darkMode}
          currentUser={user as DoctorProfile}
          accounts={accounts}
          setView={setView}
        />
      );
    }
    switch (currentView) {
      case 'dashboard': return <PatientDashboard profile={user as PatientProfile} history={history} onStartTherapy={(t: TherapyType) => setActiveExercise(t)} darkMode={darkMode} />;
      case 'connect': return <DoctorConnect doctors={globalDoctors} connections={allConnections} onRequest={async (dId: string) => {
        const newC: Connection = { id: `C-${Date.now()}`, patientId: user!.id, doctorId: dId, status: ConnectionStatus.PENDING, timestamp: new Date().toISOString() };
        try {
          await dataService.requestConnection(newC);
          setAllConnections([...allConnections, newC]);
        } catch (err) {
          console.error('Connection request failed:', err);
          // Fallback
          setAllConnections([...allConnections, newC]);
        }
      }} patientId={user?.id || ''} />;
      case 'therapy': return <TherapyLibrary onStartTherapy={(t: TherapyType) => setActiveExercise(t)} darkMode={darkMode} />;
      case 'progress': return <ProgressStats history={history} darkMode={darkMode} />;
      case 'profile': return <ProfileView profile={user as PatientProfile} onLogout={handleLogout} darkMode={darkMode} />;
      default: return <PatientDashboard profile={user as PatientProfile} history={history} onStartTherapy={(t: TherapyType) => setActiveExercise(t)} darkMode={darkMode} />;
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#000000] md:pl-28 transition-all duration-1000">
      <Navigation role={role!} currentView={currentView} setView={setView} onLogout={handleLogout} darkMode={darkMode} toggleTheme={() => setDarkMode(!darkMode)} />
      <main className="max-w-[1500px] mx-auto min-h-screen pb-36 md:pb-12">
        <div className="p-6 md:p-10 lg:p-14">
          {renderView()}
        </div>
      </main>
    </div>
  );
};

export default App;
