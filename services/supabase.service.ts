import { supabase } from '../lib/supabase';
import { UserAccount, SessionResult, Connection, UserRole, ConnectionStatus, TherapyType } from '../types';

export const dataService = {
    // --- USER AUTHENTICATION & PROFILES ---

    async uploadAvatar(file: File): Promise<string> {
        const fileExt = file.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const filePath = `${fileName}`;

        const { error: uploadError } = await supabase.storage
            .from('avatars')
            .upload(filePath, file);

        if (uploadError) throw uploadError;

        const { data } = supabase.storage
            .from('avatars')
            .getPublicUrl(filePath);

        return data.publicUrl;
    },

    async register(user: UserAccount) {
        // 1. Insert into users table
        const { error: userError } = await supabase
            .from('users')
            .insert({
                id: user.id,
                name: user.name,
                email: user.email,
                avatar_url: user.avatarUrl,
                phone: user.phone,
                password: user.password,
                role: user.role,
                start_date: user.startDate
            });

        if (userError) throw userError;

        // 2. Insert into appropriate profile table
        if (user.role === UserRole.PATIENT) {
            const { error: patientError } = await supabase
                .from('patient_profiles')
                .insert({
                    user_id: user.id,
                    diagnosis: user.diagnosis,
                    case_id: user.caseId
                });
            if (patientError) throw patientError;
        } else if (user.role === UserRole.DOCTOR) {
            const { error: doctorError } = await supabase
                .from('doctor_profiles')
                .insert({
                    user_id: user.id,
                    license_id: user.licenseId,
                    is_verified: user.isVerified
                });
            if (doctorError) throw doctorError;
        }

        return user;
    },

    async updateUser(user: UserAccount) {
        // 1. Update users table
        const { error: userError } = await supabase
            .from('users')
            .update({
                name: user.name,
                phone: user.phone,
                avatar_url: user.avatarUrl
            })
            .eq('id', user.id);

        if (userError) throw userError;

        // 2. Update specific profile table
        if (user.role === UserRole.PATIENT) {
            const { error: patientError } = await supabase
                .from('patient_profiles')
                .upsert({ // Upsert ensures if profile was missing (legacy), it's created
                    user_id: user.id,
                    diagnosis: user.diagnosis,
                    case_id: user.caseId,
                    updated_at: new Date().toISOString()
                });
            if (patientError) throw patientError;
        } else if (user.role === UserRole.DOCTOR) {
            const { error: doctorError } = await supabase
                .from('doctor_profiles')
                .upsert({
                    user_id: user.id,
                    license_id: user.licenseId,
                    is_verified: user.isVerified,
                    updated_at: new Date().toISOString()
                });
            if (doctorError) throw doctorError;
        }

        return user;
    },

    async login(email: string, password: string): Promise<UserAccount | { error: 'EMAIL_NOT_FOUND' | 'WRONG_PASSWORD' }> {
        // Fetch user with both potential profiles (Supabase handles left joins on FKs)
        const { data: userByEmail, error: emailError } = await supabase
            .from('users')
            .select(`
                *,
                patient_profiles (*),
                doctor_profiles (*)
            `)
            .eq('email', email)
            .single();

        // If email doesn't exist in database
        if (emailError || !userByEmail) {
            return { error: 'EMAIL_NOT_FOUND' };
        }

        // Email exists, now check password
        if (userByEmail.password !== password) {
            return { error: 'WRONG_PASSWORD' };
        }

        // Map data based on role
        // Supabase returns arrays for relations usually
        const patientData = Array.isArray(userByEmail.patient_profiles) ? userByEmail.patient_profiles[0] : userByEmail.patient_profiles;
        const doctorData = Array.isArray(userByEmail.doctor_profiles) ? userByEmail.doctor_profiles[0] : userByEmail.doctor_profiles;

        return {
            id: userByEmail.id,
            name: userByEmail.name,
            email: userByEmail.email,
            avatarUrl: userByEmail.avatar_url,
            phone: userByEmail.phone,
            role: userByEmail.role as UserRole,
            startDate: userByEmail.start_date,
            // Merge profile data
            diagnosis: patientData?.diagnosis,
            caseId: patientData?.case_id,
            licenseId: doctorData?.license_id,
            isVerified: doctorData?.is_verified
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
        patient_profiles (*),
        doctor_profiles (*)
      `);

        if (error) throw error;

        return users.map(u => {
            // Handle Supabase relation results (can be array or object depending on query/client version)
            const docProfile = Array.isArray(u.doctor_profiles) ? u.doctor_profiles[0] : u.doctor_profiles;
            const patProfile = Array.isArray(u.patient_profiles) ? u.patient_profiles[0] : u.patient_profiles;

            return {
                id: u.id,
                name: u.name,
                email: u.email,
                avatarUrl: u.avatar_url,
                phone: u.phone,
                role: u.role as UserRole,
                startDate: u.start_date,
                diagnosis: patProfile?.diagnosis,
                caseId: patProfile?.case_id,
                licenseId: docProfile?.license_id,
                isVerified: docProfile?.is_verified
            };
        });
    }
};
