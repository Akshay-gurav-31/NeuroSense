
export enum UserRole {
  PATIENT = 'PATIENT',
  DOCTOR = 'DOCTOR'
}

export enum TherapyType {
  BODY = 'BODY',
  BRAIN = 'BRAIN',
  SPEECH = 'SPEECH',
  MENTAL = 'MENTAL'
}

export enum ConnectionStatus {
  IDLE = 'IDLE',
  PENDING = 'PENDING',
  CONNECTED = 'CONNECTED'
}

export interface Connection {
  id: string;
  patientId: string;
  doctorId: string;
  status: ConnectionStatus;
  timestamp: string;
}

export interface UserAccount {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  phone: string;
  password?: string;
  role: UserRole;
  // Patient specific
  diagnosis?: string;
  caseId?: string;
  // Doctor specific
  licenseId?: string;
  isVerified?: boolean;
  startDate: string;
}

export interface PatientProfile extends UserAccount {
  // Specific fields guaranteed for patient
  caseId?: string;
}

export interface DoctorProfile extends UserAccount {
  // Specific fields guaranteed for doctor
  licenseId?: string;
  isVerified?: boolean;
}

export interface SessionResult {
  patientId: string;
  timestamp: string;
  type: TherapyType;
  score: number;
  feedback: string;
}

export interface PatientStats {
  recoveryScore: number;
  sessionsCompleted: number;
  activeStreak: number;
}
