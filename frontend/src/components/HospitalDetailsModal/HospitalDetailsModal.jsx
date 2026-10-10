import React from 'react';
import { 
  X, 
  MapPin, 
  Phone, 
  Star, 
  ShieldCheck, 
  Bed, 
  CheckCircle2, 
  Stethoscope, 
  ArrowRight,
  Clock,
  Building2,
  Calendar
} from 'lucide-react';
import Modal from '../Modal/Modal';
import Badge from '../Badge/Badge';
import { SAMPLE_DOCTORS } from '../../data/mockData';
import './HospitalDetailsModal.css';

/**
 * HospitalDetailsModal Component
 * Large premium hospital details modal matching AROVEXA design pattern:
 * - Large hospital image/banner with dark overlay
 * - Clean horizontal information strip (Beds, Accreditation, Phone, Emergency)
 * - Facility overview with comfortable paragraph
 * - Verified facilities using reusable Badge components
 * - Specialist physicians with avatars, details, and Book Slot actions
 */
export default function HospitalDetailsModal({
  hospital,
  isOpen,
  onClose,
  onSelectDoctor
}) {
  if (!isOpen || !hospital) return null;

  // Filter doctors that belong to this hospital
  const affiliatedDoctors = SAMPLE_DOCTORS.filter(
    (d) => d.hospitalId === hospital.id
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="xl"
      hideHeader={true}
      bodyClassName="modal-no-padding"
      className="hospital-details-modal-container"
    >
      <div className="hospital-modal-card">
        {/* Close Button (X in corner) */}
        <button 
          type="button" 
          className="hospital-modal-close-btn" 
          onClick={onClose}
          aria-label="Close hospital details"
          title="Close (Esc)"
        >
          <X size={20} />
        </button>

        {/* 1. Hospital Hero Banner */}
        <div className="hospital-modal-hero">
          <img 
            src={hospital.image} 
            alt={hospital.name} 
            className="hospital-hero-img"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = 'https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?auto=format&fit=crop&w=1200&q=80';
            }}
          />
          <div className="hospital-hero-overlay">
            <div className="hero-badge-row">
              <span className="hospital-type-badge">{hospital.type}</span>
              <span className="hospital-verified-pill">
                <ShieldCheck size={13} />
                <span>Verified Center</span>
              </span>
            </div>
            <h2 className="hospital-hero-title">{hospital.name}</h2>
            <div className="hospital-hero-meta">
              <span className="hero-rating">
                <Star size={15} fill="#e09f3e" color="#e09f3e" />
                <strong>{hospital.rating}</strong>
                <span className="hero-reviews-count">({hospital.reviewsCount} reviews)</span>
              </span>
              <span className="meta-dot">•</span>
              <span className="hero-location">
                <MapPin size={15} className="location-pin" />
                <span>{hospital.location}</span>
              </span>
            </div>
          </div>
        </div>

        {/* 2. Clean Horizontal Information Strip (Summary) */}
        <div className="hospital-summary-strip">
          <div className="summary-strip-item">
            <div className="strip-icon-box">
              <Bed size={18} />
            </div>
            <div className="strip-text-col">
              <span className="strip-label">Capacity</span>
              <strong className="strip-val">{hospital.beds} Beds</strong>
            </div>
          </div>

          <div className="summary-strip-item">
            <div className="strip-icon-box">
              <ShieldCheck size={18} />
            </div>
            <div className="strip-text-col">
              <span className="strip-label">Accreditation</span>
              <strong className="strip-val">{hospital.accreditation}</strong>
            </div>
          </div>

          <div className="summary-strip-item">
            <div className="strip-icon-box">
              <Phone size={18} />
            </div>
            <div className="strip-text-col">
              <span className="strip-label">Helpline</span>
              <strong className="strip-val">{hospital.phone}</strong>
            </div>
          </div>

          <div className="summary-strip-item">
            <div className="strip-icon-box">
              <Clock size={18} />
            </div>
            <div className="strip-text-col">
              <span className="strip-label">Service Hours</span>
              <strong className="strip-val">{hospital.status || '24/7 Emergency'}</strong>
            </div>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="hospital-modal-body">
          {/* 3. Facility Overview */}
          <div className="hospital-section">
            <h4 className="section-title">Facility Overview</h4>
            <p className="section-text">
              {hospital.overview || hospital.shortDescription || 
                'Multi-specialty tertiary care hospital offering round-the-clock emergency care, advanced surgical facilities, specialized ICUs, and comprehensive clinical departments.'}
            </p>
          </div>

          {/* 4. Verified Facilities */}
          <div className="hospital-section">
            <h4 className="section-title">Verified Facilities & Capabilities</h4>
            <div className="facilities-badges-grid">
              {hospital.facilities?.map((facility) => (
                <Badge 
                  key={facility} 
                  variant="teal" 
                  size="md"
                  icon={CheckCircle2}
                  className="facility-badge-item"
                >
                  {facility}
                </Badge>
              ))}
            </div>
          </div>

          {/* 5. Specialist Physicians at this Center */}
          <div className="hospital-section">
            <div className="section-header-flex">
              <div>
                <h4 className="section-title">Specialist Physicians at this Center</h4>
                <p className="section-subtext">Book in-person consultations or clinical follow-ups</p>
              </div>
              <span className="doctor-count-badge">{affiliatedDoctors.length} Specialists</span>
            </div>

            <div className="affiliated-doctors-list">
              {affiliatedDoctors.map((doc) => (
                <div key={doc.id} className="affiliated-doc-card">
                  <div className="doc-card-left">
                    <img 
                      src={doc.image} 
                      alt={doc.name} 
                      className="affiliated-doc-avatar"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=240&q=80';
                      }}
                    />
                    <div className="affiliated-doc-info">
                      <h5 className="affiliated-doc-name">{doc.name}</h5>
                      <span className="affiliated-doc-spec">{doc.specialty}</span>
                      <div className="affiliated-doc-meta-row">
                        <span className="doc-exp-pill">{doc.experience} Experience</span>
                        <span className="doc-fee-pill">Fee: {doc.consultationFee}</span>
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    className="btn btn-primary btn-sm book-slot-btn"
                    onClick={() => {
                      onClose();
                      if (onSelectDoctor) onSelectDoctor(doc);
                    }}
                  >
                    <Calendar size={14} />
                    <span>Book Slot</span>
                    <ArrowRight size={13} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 6. Modal Footer */}
        <div className="hospital-modal-footer">
          <button 
            type="button" 
            className="btn btn-secondary" 
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </Modal>
  );
}
