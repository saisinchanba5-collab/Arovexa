import React from 'react';
import { 
  X, 
  Star, 
  Award, 
  Building2, 
  Calendar, 
  Clock, 
  GraduationCap, 
  ShieldCheck, 
  CreditCard,
  CheckCircle2 
} from 'lucide-react';
import Modal from '../Modal/Modal';
import './DoctorProfileModal.css';

export default function DoctorProfileModal({
  doctor,
  isOpen,
  onClose,
  onBookAppointment
}) {
  if (!isOpen || !doctor) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="lg"
      hideHeader={true}
      bodyClassName="modal-no-padding"
    >
      <div className="doc-profile-modal-card">
        {/* Close Button */}
        <button 
          type="button" 
          className="modal-close-corner-btn" 
          onClick={onClose}
          aria-label="Close doctor profile"
        >
          <X size={20} />
        </button>

        {/* Hero Section */}
        <div className="doc-profile-hero">
          <div className="doc-profile-avatar-wrap">
            <img 
              src={doctor.image} 
              alt={doctor.name} 
              className="doc-profile-img"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=400&q=80';
              }}
            />
            <span className="doc-verified-badge" title="Board Certified Physician">
              <ShieldCheck size={16} />
            </span>
          </div>

          <div className="doc-profile-title-col">
            <div className="doc-tags-row">
              <span className="specialty-badge">{doctor.specialty}</span>
              <span className="demo-badge">Sample Provider Preview</span>
            </div>
            <h2 className="doc-profile-name">{doctor.name}</h2>
            <p className="doc-profile-hospital">
              <Building2 size={16} />
              <span>{doctor.hospitalName}</span>
            </p>

            <div className="doc-quick-stats-row">
              <div className="quick-stat-item">
                <Star size={15} className="star-icon" />
                <strong>{doctor.rating}</strong>
                <span>({doctor.reviewsCount} reviews)</span>
              </div>
              <div className="stat-separator">•</div>
              <div className="quick-stat-item">
                <Award size={15} />
                <span>{doctor.experience}</span>
              </div>
              <div className="stat-separator">•</div>
              <div className="quick-stat-item">
                <CreditCard size={15} />
                <span>{doctor.consultationFee} Fee</span>
              </div>
            </div>
          </div>
        </div>

        {/* Content Body */}
        <div className="doc-profile-body">
          {/* About Section */}
          <div className="doc-info-block">
            <h4 className="block-heading">About Physician</h4>
            <p className="block-body-text">{doctor.about}</p>
          </div>

          {/* Education & Qualifications */}
          <div className="doc-info-block">
            <h4 className="block-heading">
              <GraduationCap size={16} />
              <span>Education & Qualifications</span>
            </h4>
            <div className="education-box">
              <p>{doctor.education}</p>
            </div>
          </div>

          {/* Available Slots */}
          <div className="doc-info-block">
            <h4 className="block-heading">
              <Clock size={16} />
              <span>Available Consultation Slots</span>
            </h4>
            <div className="slots-pills-row">
              {doctor.availableSlots?.map((slot, index) => (
                <div key={index} className="slot-pill">
                  <CheckCircle2 size={14} className="slot-check" />
                  <span>{slot}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Demo Patient Feedback Note */}
          <div className="demo-feedback-box">
            <div className="feedback-header">
              <span className="feedback-label">Sample Patient Reviews (Demo Data)</span>
              <div className="feedback-stars">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={13} fill="#e09f3e" color="#e09f3e" />
                ))}
              </div>
            </div>
            <p className="feedback-text">
              "Dr. {doctor.name.split(' ')[1] || doctor.name} was incredibly attentive, explained my diagnostic test thoroughly, and tailored a preventive routine."
            </p>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="doc-profile-footer">
          <div className="fee-preview-col">
            <span className="fee-label">Consultation Fee</span>
            <span className="fee-value">{doctor.consultationFee}</span>
          </div>

          <div className="footer-actions-group">
            <button 
              type="button" 
              className="btn btn-secondary" 
              onClick={onClose}
            >
              Close
            </button>
            <button 
              type="button" 
              className="btn btn-primary"
              onClick={() => {
                onClose();
                if (onBookAppointment) onBookAppointment(doctor);
              }}
            >
              <Calendar size={16} />
              <span>Book Appointment</span>
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
