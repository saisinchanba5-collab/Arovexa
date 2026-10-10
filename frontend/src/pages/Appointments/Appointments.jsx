import React, { useState, useMemo, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Plus, 
  Building2, 
  Stethoscope, 
  CheckCircle2, 
  AlertCircle, 
  RotateCcw, 
  CalendarCheck, 
  X 
} from 'lucide-react';
import BookAppointmentModal from '../../components/BookAppointmentModal/BookAppointmentModal';
import Badge from '../../components/Badge/Badge';
import EmptyState from '../../components/EmptyState/EmptyState';
import { useAuth } from '../../context/AuthContext';
import { SAMPLE_DOCTORS } from '../../data/mockData';
import './Appointments.css';

export default function Appointments() {
  const location = useLocation();
  const { appointments, cancelAppointment } = useAuth();
  const [activeTab, setActiveTab] = useState('upcoming');
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [selectedDoctorForBooking, setSelectedDoctorForBooking] = useState(null);
  const [notice, setNotice] = useState('');

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const aptId = params.get('apt');
    if (aptId) {
      const found = appointments.find((a) => a.id === aptId);
      if (found) {
        setNotice(`Appointment Details: ${found.doctor} — ${found.date} at ${found.time} (${found.status})`);
      }
    }
  }, [location.search, appointments]);

  const upcomingAppointments = useMemo(() => {
    return appointments.filter((apt) => apt.status === 'Confirmed' || apt.status === 'Scheduled');
  }, [appointments]);

  const pastAppointments = useMemo(() => {
    return appointments.filter((apt) => apt.status === 'Completed' || apt.status === 'Cancelled');
  }, [appointments]);

  const handleOpenNewAppointment = () => {
    setSelectedDoctorForBooking(SAMPLE_DOCTORS[0]);
    setBookingModalOpen(true);
  };

  const handleReschedule = (doctorName) => {
    const doc = SAMPLE_DOCTORS.find((d) => d.name.includes(doctorName.split(' ')[1])) || SAMPLE_DOCTORS[0];
    setSelectedDoctorForBooking(doc);
    setBookingModalOpen(true);
  };

  const handleCancelAppointment = (apt) => {
    cancelAppointment(apt.id);
    setNotice(`Appointment ${apt.id} with ${apt.doctor} has been cancelled.`);
  };

  const displayedAppointments = activeTab === 'upcoming' ? upcomingAppointments : pastAppointments;

  return (
    <div className="appointments-page">
      {/* Header */}
      <div className="appointments-header">
        <div>
          <span className="page-badge-pill">Care Scheduling</span>
          <h1 className="page-title">Clinical Appointments</h1>
          <p className="page-subtitle">
            Track upcoming doctor visits, clinical consultations, and telehealth slots with verified healthcare providers.
          </p>
        </div>
        <button 
          type="button" 
          className="btn btn-primary"
          onClick={handleOpenNewAppointment}
        >
          <Plus size={16} />
          <span>New Appointment</span>
        </button>
      </div>

      {notice && (
        <div className="reschedule-banner">
          <CheckCircle2 size={16} />
          <span>{notice}</span>
          <button type="button" onClick={() => setNotice('')} className="banner-close">&times;</button>
        </div>
      )}

      {/* Tabs */}
      <div className="appointments-tabs">
        <button
          type="button"
          className={`tab-btn ${activeTab === 'upcoming' ? 'active' : ''}`}
          onClick={() => setActiveTab('upcoming')}
        >
          Upcoming Appointments ({upcomingAppointments.length})
        </button>
        <button
          type="button"
          className={`tab-btn ${activeTab === 'past' ? 'active' : ''}`}
          onClick={() => setActiveTab('past')}
        >
          Past & Cancelled Consultations ({pastAppointments.length})
        </button>
      </div>

      {/* Appointment Cards List or EmptyState */}
      {displayedAppointments.length === 0 ? (
        <EmptyState
          icon={Calendar}
          title={activeTab === 'upcoming' ? 'No Upcoming Appointments' : 'No Past Consultations'}
          description={
            activeTab === 'upcoming'
              ? 'You have no clinical appointments scheduled. Book a slot with our board-certified specialists.'
              : 'There are no past or cancelled consultations recorded in this session.'
          }
          actionText={activeTab === 'upcoming' ? 'Book New Appointment' : undefined}
          onAction={activeTab === 'upcoming' ? handleOpenNewAppointment : undefined}
        />
      ) : (
        <div className="appointments-list">
          {displayedAppointments.map((apt) => (
            <div key={apt.id} className="appointment-card-full">
              <div className="apt-card-top-row">
                <div className="apt-provider-info">
                  <div className="apt-calendar-icon-box">
                    <CalendarCheck size={20} />
                  </div>
                  <div>
                    <h3 className="apt-doctor-heading">{apt.doctor}</h3>
                    <span className="apt-specialty-sub">{apt.specialty}</span>
                  </div>
                </div>

                <div className="apt-badges-group">
                  <Badge variant="navy" size="sm">{apt.consultationType}</Badge>
                  <Badge 
                    variant={apt.status === 'Cancelled' ? 'error' : apt.status === 'Completed' ? 'demo' : 'success'} 
                    size="sm"
                  >
                    {apt.status}
                  </Badge>
                </div>
              </div>

              <div className="apt-info-grid">
                <div className="apt-info-item">
                  <Clock size={16} className="apt-icon" />
                  <span>{apt.date} • {apt.time}</span>
                </div>
                <div className="apt-info-item">
                  <MapPin size={16} className="apt-icon" />
                  <span>{apt.location}</span>
                </div>
              </div>

              {apt.patientName && (
                <div className="apt-patient-meta">
                  <span>Patient: <strong>{apt.patientName}</strong></span>
                  <span className="apt-id-tag">ID: {apt.id}</span>
                </div>
              )}

              <div className="appointment-card-actions">
                <span className="demo-data-note">Shared Demo Session Record</span>
                <div className="btn-actions-wrap">
                  {apt.status !== 'Cancelled' && apt.status !== 'Completed' && (
                    <>
                      <button 
                        type="button" 
                        className="btn btn-secondary btn-sm"
                        onClick={() => handleReschedule(apt.doctor)}
                      >
                        Reschedule
                      </button>
                      <button 
                        type="button" 
                        className="btn btn-sm action-cancel"
                        onClick={() => handleCancelAppointment(apt)}
                      >
                        Cancel
                      </button>
                    </>
                  )}
                  {(apt.status === 'Cancelled' || apt.status === 'Completed') && (
                    <button 
                      type="button" 
                      className="btn btn-secondary btn-sm"
                      onClick={() => handleReschedule(apt.doctor)}
                    >
                      Book Again
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Book Appointment Modal */}
      <BookAppointmentModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        initialDoctor={selectedDoctorForBooking}
      />
    </div>
  );
}

