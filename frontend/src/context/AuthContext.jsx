import React, { createContext, useContext, useState } from 'react';
import { authService } from '../services/authService';
import { FAMILY_PROFILES } from '../data/mockData';

const AuthContext = createContext(null);

const INITIAL_PATIENT = {
  name: 'Eleanor Vance',
  email: 'patient@example.com',
  phone: '+1 (555) 432-8910',
  dob: '1994-05-18',
  gender: 'Female',
  avatar: 'EV',
  bloodGroup: 'O+',
  emergencyContact: 'Arthur Vance (Father) — +1 (555) 987-6543',
  address: '42 Medical Center Road, Apt 4B, Metro City'
};

const INITIAL_APPOINTMENTS = [
  {
    id: 'APT-1092',
    doctor: 'Dr. Priya Sharma, MD',
    doctorId: 'DOC-01',
    specialty: 'Cardiology Review Consultation',
    date: '2026-08-30',
    time: '04:00 PM EST',
    timeSlot: '04:00 PM',
    location: 'Apollo Hospitals & Health City, OPD Wing B',
    hospital: 'Apollo Hospitals & Health City',
    hospitalId: 'HOSP-01',
    consultationType: 'New Consultant',
    status: 'Confirmed',
    patientName: 'Eleanor Vance',
    badgeClass: 'badge-mint'
  },
  {
    id: 'APT-1088',
    doctor: 'Dr. Marcus Reynolds, MS',
    doctorId: 'DOC-02',
    specialty: 'Neurology Evaluation',
    date: '2026-09-02',
    time: '11:30 AM EST',
    timeSlot: '11:30 AM',
    location: 'Apex Cardiovascular & Neurosciences, Suite 12',
    hospital: 'Apex Cardiovascular & Neurosciences Institute',
    hospitalId: 'HOSP-03',
    consultationType: 'Existing / Old Consultant',
    status: 'Confirmed',
    patientName: 'Eleanor Vance',
    badgeClass: 'badge-ice'
  },
  {
    id: 'APT-1075',
    doctor: 'Dr. Sarah Bennett, MD',
    doctorId: 'DOC-04',
    specialty: 'Pediatric Checkup',
    date: '2026-09-08',
    time: '02:00 PM EST',
    timeSlot: '02:00 PM',
    location: 'Horizon Maternal & Child Health Hospital, Room 104',
    hospital: 'Horizon Maternal & Child Health Hospital',
    hospitalId: 'HOSP-04',
    consultationType: 'New Consultant',
    status: 'Scheduled',
    patientName: 'Eleanor Vance',
    badgeClass: 'badge-lime'
  },
  {
    id: 'APT-1044',
    doctor: 'Dr. Vikram Patel, MS',
    doctorId: 'DOC-08',
    specialty: 'General Surgery Follow-up',
    date: '2026-07-15',
    time: '09:15 AM EST',
    timeSlot: '09:15 AM',
    location: 'St. Jude Metropolitan Medical Center',
    hospital: 'St. Jude Metropolitan Medical Center',
    hospitalId: 'HOSP-02',
    consultationType: 'Existing / Old Consultant',
    status: 'Completed',
    patientName: 'Eleanor Vance',
    badgeClass: 'badge-demo'
  },
  {
    id: 'APT-1031',
    doctor: 'Dr. Emily Watson, MD',
    doctorId: 'DOC-06',
    specialty: 'Annual Family Wellness Physical',
    date: '2026-06-20',
    time: '10:00 AM EST',
    timeSlot: '10:00 AM',
    location: 'St. Jude Metropolitan Medical Center',
    hospital: 'St. Jude Metropolitan Medical Center',
    hospitalId: 'HOSP-02',
    consultationType: 'Existing / Old Consultant',
    status: 'Completed',
    patientName: 'Eleanor Vance',
    badgeClass: 'badge-demo'
  }
];

/**
 * AuthProvider component
 * Establishes the single shared patient, appointments, and family state for the AROVEXA frontend.
 */
export function AuthProvider({ children }) {
  const [user, setUser] = useState({
    email: INITIAL_PATIENT.email,
    name: INITIAL_PATIENT.name
  });
  const [loading, setLoading] = useState(false);
  const [patient, setPatient] = useState(INITIAL_PATIENT);
  const [appointments, setAppointments] = useState(INITIAL_APPOINTMENTS);
  const [familyMembers, setFamilyMembers] = useState(FAMILY_PROFILES);

  // Patient profile updates
  const updatePatient = (updates) => {
    setPatient((prev) => {
      const updated = { ...prev, ...updates };
      // Keep user display name in sync
      if (updates.name || updates.fullName) {
        setUser((u) => ({ ...u, name: updates.name || updates.fullName }));
      }
      return updated;
    });
  };

  // Appointment actions
  const bookAppointment = (bookingData) => {
    const newId = `APT-${Math.floor(1000 + Math.random() * 9000)}`;
    const createdAppointment = {
      id: newId,
      doctor: bookingData.doctorName || 'Dr. Specialist, MD',
      doctorId: bookingData.doctorId || 'DOC-01',
      specialty: bookingData.specialty || 'General Consultation',
      date: bookingData.date || '2026-10-15',
      time: bookingData.timeSlot ? `${bookingData.timeSlot} EST` : '10:00 AM EST',
      timeSlot: bookingData.timeSlot || '10:00 AM',
      location: bookingData.hospitalName || 'AROVEXA Partner Medical Center',
      hospital: bookingData.hospitalName || 'AROVEXA Partner Medical Center',
      hospitalId: bookingData.hospitalId || 'HOSP-01',
      consultationType: bookingData.consultationType === 'existing' ? 'Existing / Old Consultant' : 'New Consultant',
      status: 'Confirmed',
      patientName: bookingData.patientName || patient.name,
      badgeClass: 'badge-mint',
      notes: bookingData.notes || ''
    };

    setAppointments((prev) => [createdAppointment, ...prev]);
    return createdAppointment;
  };

  const cancelAppointment = (appointmentId) => {
    setAppointments((prev) =>
      prev.map((apt) =>
        apt.id === appointmentId
          ? { ...apt, status: 'Cancelled', badgeClass: 'badge-coral' }
          : apt
      )
    );
  };

  const rescheduleAppointment = (appointmentId, newDate, newTimeSlot) => {
    setAppointments((prev) =>
      prev.map((apt) =>
        apt.id === appointmentId
          ? {
              ...apt,
              date: newDate,
              time: `${newTimeSlot} EST`,
              timeSlot: newTimeSlot,
              status: 'Confirmed',
              badgeClass: 'badge-mint'
            }
          : apt
      )
    );
  };

  // Family members actions
  const addFamilyMember = (newMemberData) => {
    const newId = `FAM-0${familyMembers.length + 1}`;
    const newMember = {
      id: newId,
      ...newMemberData
    };
    setFamilyMembers((prev) => [...prev, newMember]);
    return newMember;
  };

  // Authentication contract methods
  const login = async (credentials) => {
    setLoading(true);
    try {
      const response = await authService.loginUser(credentials);
      setUser(response);
      return response;
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    setLoading(true);
    try {
      const response = await authService.registerUser(userData);
      setUser(response);
      return response;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      await authService.logoutUser();
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const value = {
    user,
    isAuthenticated: Boolean(user),
    loading,
    login,
    register,
    logout,
    // Shared patient state & actions
    patient,
    updatePatient,
    // Shared appointments state & actions
    appointments,
    bookAppointment,
    cancelAppointment,
    rescheduleAppointment,
    // Shared family members state & actions
    familyMembers,
    addFamilyMember
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

/**
 * Custom hooks to access shared state and actions
 */
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export const usePatient = useAuth;

