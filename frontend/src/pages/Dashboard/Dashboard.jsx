import React, { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Heart, 
  Activity, 
  Wind, 
  Footprints, 
  Calendar, 
  Clock, 
  Building2, 
  Stethoscope, 
  Sparkles, 
  Plus, 
  Users, 
  ArrowRight, 
  ShieldCheck, 
  Droplets, 
  Moon, 
  CalendarCheck, 
  Apple, 
  FileText, 
  FlaskConical, 
  ChevronRight,
  Info,
  CheckCircle2,
  ExternalLink
} from 'lucide-react';
import Carousel from '../../components/Carousel/Carousel';
import BookAppointmentModal from '../../components/BookAppointmentModal/BookAppointmentModal';
import AddFamilyMemberModal from '../../components/AddFamilyMemberModal/AddFamilyMemberModal';
import Modal from '../../components/Modal/Modal';
import ServiceWidgets from '../../components/ServiceWidgets/ServiceWidgets';
import { useAuth } from '../../context/AuthContext';
import { 
  SAMPLE_HEALTH_SUMMARY, 
  NEXT_APPOINTMENT, 
  HEALTHCARE_TIPS, 
  AI_HEALTH_INSIGHTS, 
  SAMPLE_DOCTORS
} from '../../data/mockData';
import './Dashboard.css';

export default function Dashboard() {
  const navigate = useNavigate();
  const { patient, appointments, familyMembers, addFamilyMember } = useAuth();

  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [selectedDoctorForBooking, setSelectedDoctorForBooking] = useState(null);
  const [familyModalOpen, setFamilyModalOpen] = useState(false);
  const [addFamilyModalOpen, setAddFamilyModalOpen] = useState(false);

  // Live upcoming appointments derived from shared state
  const upcomingAppointments = useMemo(() => {
    return appointments.filter((apt) => apt.status !== 'Cancelled' && apt.status !== 'Completed');
  }, [appointments]);

  const nextAppointment = upcomingAppointments[0] || null;

  // Icon resolver for tips
  const getTipIcon = (iconName) => {
    switch (iconName) {
      case 'Droplets': return <Droplets size={24} className="tip-icon-svg" />;
      case 'Moon': return <Moon size={24} className="tip-icon-svg" />;
      case 'CalendarCheck': return <CalendarCheck size={24} className="tip-icon-svg" />;
      case 'Apple': return <Apple size={24} className="tip-icon-svg" />;
      default: return <Sparkles size={24} className="tip-icon-svg" />;
    }
  };

  // Icon resolver for services
  const getServiceIcon = (iconName) => {
    switch (iconName) {
      case 'Building2': return <Building2 size={22} />;
      case 'Stethoscope': return <Stethoscope size={22} />;
      case 'Calendar': return <Calendar size={22} />;
      case 'FlaskConical': return <FlaskConical size={22} />;
      case 'FileText': return <FileText size={22} />;
      case 'Sparkles': return <Sparkles size={22} />;
      case 'Users': return <Users size={22} />;
      default: return <Activity size={22} />;
    }
  };

  // Icon resolver for health metrics
  const getMetricIcon = (metric) => {
    switch (metric) {
      case 'Heart Rate': return <Heart size={22} className="metric-icon-heart" />;
      case 'Blood Pressure': return <Activity size={22} className="metric-icon-bp" />;
      case 'SpO₂': return <Wind size={22} className="metric-icon-spo2" />;
      case 'Steps': return <Footprints size={22} className="metric-icon-steps" />;
      default: return <Activity size={22} />;
    }
  };

  const handleOpenBooking = (doctor) => {
    setSelectedDoctorForBooking(doctor || SAMPLE_DOCTORS[0]);
    setBookingModalOpen(true);
  };

  const handleAddFamilyMemberSubmit = (newMemberData) => {
    addFamilyMember(newMemberData);
  };


  return (
    <div className="dashboard-page">
      {/* 1. Header Greeting Section (Item 6) */}
      <section className="dashboard-welcome-header">
        <div className="welcome-text-col">
          <div className="welcome-badge-row">
            <span className="welcome-pill">Patient Session</span>
            <span className="demo-notice-pill">
              <Info size={13} />
              Sample Preview / Demo Data
            </span>
          </div>
          <h1 className="welcome-title">Good Morning, {patient?.name?.split(' ')[0] || 'Patient'} 👋</h1>
          <p className="welcome-subtitle">Here's your healthcare overview</p>
        </div>

        <div className="welcome-actions">
          <button 
            type="button" 
            className="btn btn-primary"
            onClick={() => handleOpenBooking(SAMPLE_DOCTORS[0])}
          >
            <Plus size={16} />
            <span>Book Appointment</span>
          </button>
        </div>
      </section>

      {/* 2. CAROUSEL 1: YOUR HEALTH SUMMARY (Item 7) */}
      <section className="dashboard-section-wrap" id="health-summary">
        <Carousel
          title="YOUR HEALTH SUMMARY"
          subtitle="Real-time synchronized wellness metrics (Sample Preview values)"
          badge="Daily Vitals"
          items={SAMPLE_HEALTH_SUMMARY}
          itemsPerView={{ mobile: 1, tablet: 2, desktop: 3 }}
          autoSlideInterval={4500}
          renderItem={(metric) => (
            <div className={`health-summary-card tint-${metric.tint}`}>
              <div className="metric-card-top">
                <div className="metric-icon-box">
                  {getMetricIcon(metric.metric)}
                </div>
                <span className="metric-demo-tag">{metric.demoLabel}</span>
              </div>
              <div className="metric-value-wrap">
                <span className="metric-number">{metric.value}</span>
                <span className="metric-unit">{metric.unit}</span>
              </div>
              <div className="metric-card-bottom">
                <span className="metric-name">{metric.metric}</span>
                <span className="metric-status-indicator">
                  <span className="status-ping" />
                  {metric.status}
                </span>
              </div>
            </div>
          )}
        />
      </section>

      {/* 3. CAROUSEL 2: UPCOMING APPOINTMENTS (Item 8) */}
      <section className="dashboard-section-wrap">
        <Carousel
          title="UPCOMING APPOINTMENTS"
          subtitle="Scheduled provider reviews, consultations, and lab bookings"
          badge="Scheduled Visits"
          items={upcomingAppointments.length > 0 ? upcomingAppointments : [NEXT_APPOINTMENT]}
          itemsPerView={{ mobile: 1, tablet: 2, desktop: 2 }}
          autoSlideInterval={5000}
          renderItem={(apt) => (
            <div className="appointment-carousel-card">
              <div className="apt-card-top">
                <div className="apt-doctor-meta">
                  <h4 className="apt-doctor-name">{apt.doctor}</h4>
                  <span className="apt-doctor-specialty">{apt.specialty}</span>
                </div>
                <span className={`apt-status-badge ${apt.badgeClass || `badge-${apt.badgeVariant || 'mint'}`}`}>
                  {apt.status}
                </span>
              </div>

              <div className="apt-hospital-row">
                <Building2 size={15} />
                <span>{apt.hospital}</span>
              </div>

              <div className="apt-datetime-row">
                <Calendar size={15} />
                <span>{apt.date} • {apt.time}</span>
                <span className="apt-demo-label">{apt.consultationType || 'Verified Slot'}</span>
              </div>

              <div className="apt-card-footer">
                <button
                  type="button"
                  className="btn btn-secondary btn-sm"
                  onClick={() => {
                    const match = SAMPLE_DOCTORS.find((d) => d.name.includes(apt.doctor.split(' ')[1]));
                    handleOpenBooking(match || SAMPLE_DOCTORS[0]);
                  }}
                >
                  View Appointment
                </button>
              </div>
            </div>
          )}
        />
      </section>

      {/* 4. PROMINENT NEXT APPOINTMENT SECTION (Item 9) */}
      <section className="dashboard-next-appointment-section">
        <div className="next-apt-card">
          <div className="next-apt-label-row">
            <div className="next-apt-badge">
              <CalendarCheck size={16} />
              <span>NEXT APPOINTMENT</span>
            </div>
            <span className="next-demo-tag">
              {nextAppointment ? nextAppointment.consultationType || 'Confirmed Slot' : 'Ready to Schedule'}
            </span>
          </div>

          {nextAppointment ? (
            <div className="next-apt-content-grid">
              <div className="next-apt-doctor-col">
                <h3 className="next-doctor-name">{nextAppointment.doctor}</h3>
                <p className="next-doctor-spec">{nextAppointment.specialty}</p>
                <p className="next-hospital-name">
                  <Building2 size={16} />
                  <span>{nextAppointment.hospital}</span>
                </p>
              </div>

              <div className="next-apt-timing-col">
                <div className="timing-bubble">
                  <Clock size={18} />
                  <div>
                    <span className="timing-title">{nextAppointment.date} • {nextAppointment.time}</span>
                    <span className="timing-sub">{nextAppointment.location}</span>
                  </div>
                </div>
              </div>

              <div className="next-apt-action-col">
                <button 
                  type="button" 
                  className="btn btn-primary"
                  onClick={() => {
                    const match = SAMPLE_DOCTORS.find((d) => d.name.includes(nextAppointment.doctor.split(' ')[1]));
                    handleOpenBooking(match || SAMPLE_DOCTORS[0]);
                  }}
                >
                  <span>View Appointment</span>
                  <ArrowRight size={15} />
                </button>
              </div>
            </div>
          ) : (
            <div className="next-apt-empty-grid">
              <p>No upcoming appointments currently scheduled in your patient session.</p>
              <button
                type="button"
                className="btn btn-primary btn-sm"
                onClick={() => handleOpenBooking(SAMPLE_DOCTORS[0])}
              >
                <Plus size={15} />
                <span>Book New Appointment</span>
              </button>
            </div>
          )}
        </div>
      </section>

      {/* 5. CAROUSEL 3: HEALTHCARE TIPS (Item 10) */}
      <section className="dashboard-section-wrap">
        <Carousel
          title="HEALTHCARE TIPS"
          subtitle="General wellness insights and preventive healthy lifestyle practices"
          badge="Educational Guidance"
          items={HEALTHCARE_TIPS}
          itemsPerView={{ mobile: 1, tablet: 2, desktop: 3 }}
          autoSlideInterval={4500}
          renderItem={(tip) => (
            <div className="healthcare-tip-card">
              <div className="tip-card-top">
                <div className="tip-icon-wrapper">
                  {getTipIcon(tip.iconName)}
                </div>
                <span className="tip-tag">{tip.tag}</span>
              </div>
              <h4 className="tip-title">{tip.title}</h4>
              <p className="tip-summary">{tip.summary}</p>
              <span className="tip-footer-note">Informational wellness advice</span>
            </div>
          )}
        />
      </section>

      {/* 6. CAROUSEL 4: AI HEALTH INSIGHTS (Item 11) */}
      <section className="dashboard-section-wrap">
        <Carousel
          title="AI HEALTH INSIGHTS"
          subtitle="Smart assistance preview and document explanation tools"
          badge="Health Intelligence"
          items={AI_HEALTH_INSIGHTS}
          itemsPerView={{ mobile: 1, tablet: 1, desktop: 2 }}
          autoSlideInterval={5500}
          renderItem={(insight) => (
            <div className="ai-insight-card">
              <div className="ai-card-header">
                <div className="ai-insight-badge">
                  <Sparkles size={16} />
                </div>
                <span className="ai-ui-tag">Future Feature Preview</span>
              </div>
              <h4 className="ai-insight-title">{insight.title}</h4>
              <p className="ai-insight-sub">{insight.subtitle}</p>
              <p className="ai-insight-desc">{insight.description}</p>
              
              <div className="ai-insight-disclaimer">
                <Info size={14} className="disclaimer-info-icon" />
                <span>{insight.disclaimer}</span>
              </div>

              <div className="ai-card-actions">
                <Link to="/ai-assistant" className="btn btn-secondary btn-sm">
                  <span>Explore AI Assistant</span>
                  <ArrowRight size={13} />
                </Link>
              </div>
            </div>
          )}
        />
      </section>

      {/* 7. EXPLORE AROVEXA SERVICES */}
      <ServiceWidgets onOpenBooking={handleOpenBooking} />

      {/* 8. FAMILY HEALTH PROFILES (Item 13) */}
      <section className="dashboard-family-section">
        <div className="section-header-row">
          <div>
            <span className="section-badge-pill">Coordinated Care</span>
            <h2 className="section-title">FAMILY HEALTH</h2>
            <p className="section-subtitle">Manage healthcare appointments and clinical profiles for your family</p>
          </div>
          <div className="family-header-actions">
            <button 
              type="button" 
              className="btn btn-secondary btn-sm"
              onClick={() => setAddFamilyModalOpen(true)}
            >
              <Plus size={15} />
              <span>+ Add Member</span>
            </button>
            <button 
              type="button" 
              className="btn btn-primary btn-sm"
              onClick={() => setFamilyModalOpen(true)}
            >
              <Users size={15} />
              <span>Manage Family</span>
            </button>
          </div>
        </div>

        <div className="family-profiles-grid">
          {familyMembers.map((member) => (
            <div key={member.id} className={`family-member-card ${member.isPrimary ? 'primary-member' : ''}`}>
              <div className="member-avatar">
                {member.avatar}
              </div>
              <div className="member-info">
                <div className="member-title-row">
                  <h4 className="member-name">{member.name}</h4>
                  {member.isPrimary && <span className="primary-tag">Primary</span>}
                </div>
                <span className="member-relation">{member.relationship}</span>
                <div className="member-tags">
                  <span className="member-meta-pill">Age: {member.age}</span>
                  <span className="member-meta-pill">Blood: {member.bloodGroup}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Manage Family Modal */}
      <Modal
        isOpen={familyModalOpen}
        onClose={() => setFamilyModalOpen(false)}
        size="md"
        title="Family Healthcare Coordination"
        subtitle="Manage dependent profiles and clinical coordination (Sample Preview)"
        icon={Users}
        footer={
          <button 
            type="button" 
            className="btn btn-secondary"
            onClick={() => setFamilyModalOpen(false)}
          >
            Close
          </button>
        }
      >
        <p className="modal-info-text" style={{ marginBottom: '1.25rem', color: 'var(--color-text-muted)', fontSize: '0.9rem', lineHeight: '1.5' }}>
          In future releases (backend phase), selecting a family member will link appointments, prescription refills, and pathology results directly to that member's profile.
        </p>
        <div className="family-members-detail-list">
          {familyMembers.map((m) => (
            <div key={m.id} className="family-detail-row">
              <div className="member-avatar sm">{m.avatar}</div>
              <div className="family-detail-meta">
                <strong>{m.name}</strong>
                <span>{m.relationship} • {m.bloodGroup} • {m.age}</span>
              </div>
              <button type="button" className="btn btn-secondary btn-sm" onClick={() => setFamilyModalOpen(false)}>
                Select for Session
              </button>
            </div>
          ))}
        </div>
      </Modal>

      {/* Reusable Book Appointment Modal */}
      <BookAppointmentModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        initialDoctor={selectedDoctorForBooking}
      />

      {/* Add Family Member Modal */}
      <AddFamilyMemberModal
        isOpen={addFamilyModalOpen}
        onClose={() => setAddFamilyModalOpen(false)}
        onAddMember={handleAddFamilyMemberSubmit}
      />
    </div>
  );
}
