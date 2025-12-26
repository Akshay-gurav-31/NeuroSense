import { supabase } from '../lib/supabase';
import { UserAccount, SessionResult, Connection, UserRole, ConnectionStatus, TherapyType } from '../types';

export const dataService = {
    // --- USER AUTHENTICATION & PROFILES ---

    async register(user: UserAccount) {
        // 1. Insert into users table
        const { error: userError } = await supabase
            .from('users')
            .insert({
                id: user.id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                password: user.password, // Plain text as requested
                role: user.role,
                start_date: user.startDate
            });

        if (userError) throw userError;

        // 2. Insert into profiles table
        const { error: profileError } = await supabase
            .from('profiles')
            .insert({
                user_id: user.id,
                diagnosis: user.diagnosis,
                case_id: user.caseId,
                license_id: user.licenseId,
                is_verified: user.isVerified
            });

        if (profileError) throw profileError;
        return user;
    },

    async login(email: string, password: string): Promise<UserAccount | null> {
        const { data: users, error } = await supabase
            .from('users')
            .select(`
        *,
        profiles (*)
      `)
            .eq('email', email)
            .eq('password', password) // Direct matching (plain text)
            .single();

        if (error || !users) return null;

        // Map back to UserAccount interface
        const profile = users.profiles;
        return {
            id: users.id,
            name: users.name,
            email: users.email,
            phone: users.phone,
            role: users.role as UserRole,
            startDate: users.start_date,
            diagnosis: profile?.diagnosis,
            caseId: profile?.case_id,
            licenseId: profile?.license_id,
            isVerified: profile?.is_verified
        };
    },

    // --- THERAPY SESSIONS ---

    async saveSession(result: SessionResult) {
        const { error } = await supabase
            .from('sessions')
            .insert({
                patient_id: result.patientId,
                timestamp: result.timestamp,
                type: result.type,
                score: result.score,
                feedback: result.feedback
            });

        if (error) throw error;
    },

    async getPatientHistory(patientId: string): Promise<SessionResult[]> {
        const { data, error } = await supabase
            .from('sessions')
            .select('*')
            .eq('patient_id', patientId)
            .order('timestamp', { ascending: false });

        if (error) throw error;
        return data.map(s => ({
            patientId: s.patient_id,
            timestamp: s.timestamp,
            type: s.type as TherapyType,
            score: s.score,
            feedback: s.feedback
        }));
    },

    async getAllSessions(): Promise<SessionResult[]> {
        const { data, error } = await supabase
            .from('sessions')
            .select('*')
            .order('timestamp', { ascending: false });

        if (error) throw error;
        return data.map(s => ({
            patientId: s.patient_id,
            timestamp: s.timestamp,
            type: s.type as TherapyType,
            score: s.score,
            feedback: s.feedback
        }));
    },

    // --- CLINICAL CONNECTIONS ---

    async requestConnection(conn: Connection) {
        const { error } = await supabase
            .from('connections')
            .insert({
                id: conn.id,
                patient_id: conn.patientId,
                doctor_id: conn.doctorId,
                status: conn.status,
                timestamp: conn.timestamp
            });

        if (error) throw error;
    },

    async updateConnectionStatus(connId: string, status: ConnectionStatus) {
        const { error } = await supabase
            .from('connections')
            .update({ status })
            .eq('id', connId);

        if (error) throw error;
    },

    async getConnections(): Promise<Connection[]> {
        const { data, error } = await supabase
            .from('connections')
            .select('*');

        if (error) throw error;
        return data.map(c => ({
            id: c.id,
            patientId: c.patient_id,
            doctorId: c.doctor_id,
            status: c.status as ConnectionStatus,
            timestamp: c.timestamp
        }));
    },

    async getAllUsers(): Promise<UserAccount[]> {
        const { data: users, error } = await supabase
            .from('users')
            .select(`
        *,
        profiles (*)
      `);

        if (error) throw error;

        return users.map(u => ({
            id: u.id,
            name: u.name,
            email: u.email,
            phone: u.phone,
            role: u.role as UserRole,
            startDate: u.start_date,
            diagnosis: u.profiles?.diagnosis,
            caseId: u.profiles?.case_id,
            licenseId: u.profiles?.license_id,
            isVerified: u.profiles?.is_verified
        }));
    }
};
