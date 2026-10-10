import React, { useState, useEffect } from 'react';
import { 
  Calendar, 
  Clock, 
  User, 
  Mail, 
  Phone, 
  Droplet, 
  MapPin, 
  Stethoscope, 
  CheckCircle2, 
  AlertCircle,
  Users
} from 'lucide-react';
import Modal from '../Modal/Modal';
import { useAuth } from '../../context/AuthContext';
import { SAMPLE_DOCTORS, SAMPLE_HOSPITALS } from '../../data/mockData';
import './BookAppointmentModal.css';

/**
 * Reusable Book Appointment Modal
 * Built upon the shared Modal component.
 * Connected to shared patient, family members, and appointment state.
 */
export default function BookAppointmentModal({
  isOpen,
  onClose,
  initialDoctor = null,
  initialHospital = null
}) {
  const { patient, familyMembers, bookAppointment } = useAuth();

  const [formData, setFormData] = useState({
    beneficiaryId: 'self',
    fullName: '',
    email: '',
    phone: '',
    bloodGroup: 'O+',
    address: '',
    consultationType: 'new', // 'new' | 'existing'
    doctorId: initialDoctor?.id || (SAMPLE_DOCTORS[0]?.id ?? ''),
    hospitalId: initialHospital?.id || initialDoctor?.hospitalId || (SAMPLE_HOSPITALS[0]?.id ?? ''),
    date: '2026-10-15',
    timeSlot: '10:30 AM',
    notes: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  // Populate form with patient defaults or initialDoctor when modal opens
  useEffect(() => {
    if (isOpen) {
      setSubmitted(false);
      setErrors({});
      setFormData({
        beneficiaryId: 'self',
        fullName: patient?.name || 'Eleanor Vance',
        email: patient?.email || 'patient@example.com',
        phone: patient?.phone || '+1 (555) 432-8910',
        bloodGroup: patient?.bloodGroup || 'O+',
        address: patient?.address || '42 Medical Center Road, Apt 4B',
        consultationType: 'new',
        doctorId: initialDoctor?.id || (SAMPLE_DOCTORS[0]?.id ?? ''),
        hospitalId: initialHospital?.id || initialDoctor?.hospitalId || (SAMPLE_HOSPITALS[0]?.id ?? ''),
        date: '2026-10-15',
        timeSlot: '10:30 AM',
        notes: ''
      });
    }
  }, [isOpen, patient, initialDoctor, initialHospital]);

  // Handle beneficiary selection (Self vs Family Member)
  const handleBeneficiaryChange = (beneficiaryId) => {
    if (beneficiaryId === 'self') {
      setFormData((prev) => ({
        ...prev,
        beneficiaryId: 'self',
        fullName: patient?.name || 'Eleanor Vance',
        email: patient?.email || 'patient@example.com',
        phone: patient?.phone || '+1 (555) 432-8910',
        bloodGroup: patient?.bloodGroup || 'O+',
        address: patient?.address || '42 Medical Center Road, Apt 4B'
      }));
    } else {
      const member = familyMembers.find((m) => m.id === beneficiaryId);
      if (member) {
        setFormData((prev) => ({
          ...prev,
          beneficiaryId,
          fullName: member.name,
          email: member.email && member.email !== 'Not Provided' ? member.email : patient?.email || '',
          phone: member.phone && member.phone !== 'Not Provided' ? member.phone : patient?.phone || '',
          bloodGroup: member.bloodGroup || 'O+',
          address: member.address && member.address !== 'Home Address' ? member.address : patient?.address || ''
        }));
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleConsultationTypeChange = (type) => {
    setFormData((prev) => ({ ...prev, consultationType: type }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Full Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email ID is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone Number is required';
    if (!formData.bloodGroup.trim()) newErrors.bloodGroup = 'Blood Group is required';
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.date) newErrors.date = 'Appointment date is required';
    return newErrors;
  };

  const selectedDoctor = SAMPLE_DOCTORS.find((d) => d.id === formData.doctorId) || initialDoctor || SAMPLE_DOCTORS[0];
  const selectedHospital = SAMPLE_HOSPITALS.find((h) => h.id === (selectedDoctor?.hospitalId || formData.hospitalId)) || SAMPLE_HOSPITALS[0];

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Call shared bookAppointment from context
    bookAppointment({
      ...formData,
      doctorName: selectedDoctor?.name,
      doctorId: selectedDoctor?.id,
      specialty: selectedDoctor?.specialty,
      hospitalName: selectedHospital?.name,
      hospitalId: selectedHospital?.id,
      patientName: formData.fullName
    });

    setSubmitted(true);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="lg"
      title={submitted ? 'Appointment Confirmed' : 'Book Clinical Appointment'}
      subtitle={
        submitted
          ? 'Demo Session Preview'
          : 'Schedule an in-person consultation or telehealth slot with verified specialists.'
      }
      icon={Stethoscope}
    >
      {submitted ? (
        <div className="appointment-success-view">
          <div className="success-icon-wrap">
            <CheckCircle2 size={44} />
          </div>
          <h3>Appointment Slot Reserved (Demo Preview)</h3>
          <p>
            Your appointment with <strong>{selectedDoctor?.name || 'Selected Doctor'}</strong> on{' '}
            <strong>{formData.date} at {formData.timeSlot}</strong> has been registered in your shared session.
          </p>
          <div className="success-summary-box">
            <div><span>Patient:</span> <strong>{formData.fullName}</strong></div>
            <div><span>Consultation:</span> <strong>{formData.consultationType === 'new' ? 'New Consultant' : 'Existing / Old Consultant'}</strong></div>
            <div><span>Facility:</span> <strong>{selectedHospital?.name}</strong></div>
            <div><span>Contact:</span> <strong>{formData.phone}</strong></div>
            <div><span>Blood Group:</span> <strong>{formData.bloodGroup}</strong></div>
          </div>
          <button 
            type="button" 
            className="btn btn-primary"
            onClick={onClose}
          >
            Done & Return to Portal
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="appointment-form-body">
          {/* Beneficiary Selector */}
          <div className="form-section-card">
            <label className="section-label">APPOINTMENT BENEFICIARY</label>
            <p className="section-subtext">Book for yourself or a registered family member.</p>
            <div className="form-field">
              <select
                id="apt-beneficiary"
                name="beneficiaryId"
                className="form-select"
                value={formData.beneficiaryId}
                onChange={(e) => handleBeneficiaryChange(e.target.value)}
              >
                <option value="self">Self ({patient?.name || 'Eleanor Vance'})</option>
                {familyMembers?.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.name} ({m.relationship} • {m.age})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Consultation Type Radio Group */}
          <div className="form-section-card">
            <label className="section-label">CONSULTATION TYPE</label>
            <p className="section-subtext">Specify whether this is your initial evaluation or a follow-up consultation.</p>
            
            <div className="consultation-radio-group">
              <label 
                className={`radio-tile ${formData.consultationType === 'new' ? 'selected' : ''}`}
                onClick={() => handleConsultationTypeChange('new')}
              >
                <input
                  type="radio"
                  name="consultationType"
                  value="new"
                  checked={formData.consultationType === 'new'}
                  onChange={() => handleConsultationTypeChange('new')}
                />
                <div className="radio-content">
                  <span className="radio-title">New Consultant</span>
                  <span className="radio-desc">First-time clinical visit or new symptoms review</span>
                </div>
              </label>

              <label 
                className={`radio-tile ${formData.consultationType === 'existing' ? 'selected' : ''}`}
                onClick={() => handleConsultationTypeChange('existing')}
              >
                <input
                  type="radio"
                  name="consultationType"
                  value="existing"
                  checked={formData.consultationType === 'existing'}
                  onChange={() => handleConsultationTypeChange('existing')}
                />
                <div className="radio-content">
                  <span className="radio-title">Existing / Old Consultant</span>
                  <span className="radio-desc">Follow-up review, routine check, or prescription refill</span>
                </div>
              </label>
            </div>
          </div>

          {/* Provider Details Section */}
          <div className="form-section-card">
            <label className="section-label">SELECT PROVIDER & FACILITY</label>
            <div className="form-row">
              <div className="form-field flex-1">
                <label className="form-label" htmlFor="apt-doctor">Physician / Specialist</label>
                <select
                  id="apt-doctor"
                  name="doctorId"
                  className="form-select"
                  value={formData.doctorId}
                  onChange={handleChange}
                >
                  {SAMPLE_DOCTORS.map((doc) => (
                    <option key={doc.id} value={doc.id}>
                      {doc.name} — {doc.specialty} ({doc.hospitalName})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-row-2col">
              <div className="form-field">
                <label className="form-label" htmlFor="apt-date">Preferred Date</label>
                <input
                  id="apt-date"
                  type="date"
                  name="date"
                  className={`form-input ${errors.date ? 'error' : ''}`}
                  value={formData.date}
                  onChange={handleChange}
                />
                {errors.date && <span className="field-error-text">{errors.date}</span>}
              </div>
              <div className="form-field">
                <label className="form-label" htmlFor="apt-slot">Preferred Time Slot</label>
                <select
                  id="apt-slot"
                  name="timeSlot"
                  className="form-select"
                  value={formData.timeSlot}
                  onChange={handleChange}
                >
                  <option value="09:00 AM">09:00 AM - 09:30 AM</option>
                  <option value="10:30 AM">10:30 AM - 11:00 AM</option>
                  <option value="01:30 PM">01:30 PM - 02:00 PM</option>
                  <option value="04:00 PM">04:00 PM - 04:30 PM</option>
                  <option value="05:30 PM">05:30 PM - 06:00 PM</option>
                </select>
              </div>
            </div>
          </div>

          {/* Patient Personal Information */}
          <div className="form-section-card">
            <label className="section-label">PATIENT INFORMATION</label>
            <div className="form-row-2col">
              <div className="form-field">
                <label className="form-label" htmlFor="apt-fullname">Full Name *</label>
                <input
                  id="apt-fullname"
                  type="text"
                  name="fullName"
                  className={`form-input ${errors.fullName ? 'error' : ''}`}
                  placeholder="e.g. Eleanor Vance"
                  value={formData.fullName}
                  onChange={handleChange}
                />
                {errors.fullName && <span className="field-error-text">{errors.fullName}</span>}
              </div>

              <div className="form-field">
                <label className="form-label" htmlFor="apt-email">Email ID *</label>
                <input
                  id="apt-email"
                  type="email"
                  name="email"
                  className={`form-input ${errors.email ? 'error' : ''}`}
                  placeholder="patient@example.com"
                  value={formData.email}
                  onChange={handleChange}
                />
                {errors.email && <span className="field-error-text">{errors.email}</span>}
              </div>
            </div>

            <div className="form-row-2col">
              <div className="form-field">
                <label className="form-label" htmlFor="apt-phone">Phone Number *</label>
                <input
                  id="apt-phone"
                  type="tel"
                  name="phone"
                  className={`form-input ${errors.phone ? 'error' : ''}`}
                  placeholder="+1 (555) 000-0000"
                  value={formData.phone}
                  onChange={handleChange}
                />
                {errors.phone && <span className="field-error-text">{errors.phone}</span>}
              </div>

              <div className="form-field">
                <label className="form-label" htmlFor="apt-bloodgroup">Blood Group *</label>
                <select
                  id="apt-bloodgroup"
                  name="bloodGroup"
                  className={`form-select ${errors.bloodGroup ? 'error' : ''}`}
                  value={formData.bloodGroup}
                  onChange={handleChange}
                >
                  <option value="A+">A Positive (A+)</option>
                  <option value="A-">A Negative (A-)</option>
                  <option value="B+">B Positive (B+)</option>
                  <option value="B-">B Negative (B-)</option>
                  <option value="O+">O Positive (O+)</option>
                  <option value="O-">O Negative (O-)</option>
                  <option value="AB+">AB Positive (AB+)</option>
                  <option value="AB-">AB Negative (AB-)</option>
                </select>
              </div>
            </div>

            <div className="form-field">
              <label className="form-label" htmlFor="apt-address">Address *</label>
              <input
                id="apt-address"
                type="text"
                name="address"
                className={`form-input ${errors.address ? 'error' : ''}`}
                placeholder="Street address, city, postal code"
                value={formData.address}
                onChange={handleChange}
              />
              {errors.address && <span className="field-error-text">{errors.address}</span>}
            </div>
          </div>

          {/* Modal Actions */}
          <div className="appointment-modal-actions">
            <button 
              type="button" 
              className="btn btn-secondary" 
              onClick={onClose}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="btn btn-primary"
            >
              Confirm Appointment Slot
            </button>
          </div>
        </form>
      )}
    </Modal>
  );
}

