import React, { useState, useEffect } from 'react';
import { UserPlus, ShieldAlert } from 'lucide-react';
import Modal from '../Modal/Modal';
import './AddFamilyMemberModal.css';

/**
 * AddFamilyMemberModal Component
 * Built on shared Modal foundation.
 * Interactive modal for adding a new family member to the shared profile.
 */
export default function AddFamilyMemberModal({ isOpen, onClose, onAddMember }) {
  const [formData, setFormData] = useState({
    fullName: '',
    relationship: 'Mother',
    dobOrAge: '',
    bloodGroup: 'O+',
    phone: '',
    email: '',
    address: ''
  });

  const [errors, setErrors] = useState({});

  // Reset form when modal opens
  useEffect(() => {
    if (isOpen) {
      setFormData({
        fullName: '',
        relationship: 'Mother',
        dobOrAge: '',
        bloodGroup: 'O+',
        phone: '',
        email: '',
        address: ''
      });
      setErrors({});
    }
  }, [isOpen]);

  const relationshipOptions = [
    'Mother',
    'Father',
    'Child',
    'Spouse',
    'Sibling',
    'Other'
  ];

  const bloodGroupOptions = [
    'O+', 'O-', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }
    if (!formData.dobOrAge.trim()) {
      newErrors.dobOrAge = 'Age or Date of Birth is required';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Generate clean initials avatar
    const nameParts = formData.fullName.trim().split(' ');
    const avatar = nameParts.length >= 2
      ? `${nameParts[0][0]}${nameParts[1][0]}`.toUpperCase()
      : formData.fullName.substring(0, 2).toUpperCase();

    // Pass data to parent callback
    if (onAddMember) {
      onAddMember({
        name: formData.fullName.trim(),
        relationship: formData.relationship,
        age: formData.dobOrAge.trim().includes('Yr') ? formData.dobOrAge.trim() : `${formData.dobOrAge.trim()} Yrs`,
        bloodGroup: formData.bloodGroup,
        phone: formData.phone.trim() || 'Not Provided',
        email: formData.email.trim() || 'Not Provided',
        address: formData.address.trim() || 'Home Address',
        avatar: avatar,
        isPrimary: false
      });
    }

    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="md"
      title="Add Family Member"
      subtitle="Link a dependent to your healthcare portal profile (Sample Preview)"
      icon={UserPlus}
    >
      <form onSubmit={handleSubmit} className="add-family-form">
        <div className="form-grid-2">
          {/* Full Name */}
          <div className="form-field-group">
            <label htmlFor="family-full-name" className="form-field-label">
              Full Name <span className="req-star">*</span>
            </label>
            <input
              id="family-full-name"
              name="fullName"
              type="text"
              className={`form-field-input ${errors.fullName ? 'has-error' : ''}`}
              placeholder="e.g. Robert Vance"
              value={formData.fullName}
              onChange={handleChange}
              autoFocus
            />
            {errors.fullName && <span className="field-error-msg">{errors.fullName}</span>}
          </div>

          {/* Relationship */}
          <div className="form-field-group">
            <label htmlFor="family-relationship" className="form-field-label">
              Relationship <span className="req-star">*</span>
            </label>
            <select
              id="family-relationship"
              name="relationship"
              className="form-field-select"
              value={formData.relationship}
              onChange={handleChange}
            >
              {relationshipOptions.map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="form-grid-2">
          {/* DOB / Age */}
          <div className="form-field-group">
            <label htmlFor="family-dob" className="form-field-label">
              Date of Birth / Age <span className="req-star">*</span>
            </label>
            <input
              id="family-dob"
              name="dobOrAge"
              type="text"
              className={`form-field-input ${errors.dobOrAge ? 'has-error' : ''}`}
              placeholder="e.g. 28 or 15 May 1996"
              value={formData.dobOrAge}
              onChange={handleChange}
            />
            {errors.dobOrAge && <span className="field-error-msg">{errors.dobOrAge}</span>}
          </div>

          {/* Blood Group */}
          <div className="form-field-group">
            <label htmlFor="family-blood-group" className="form-field-label">
              Blood Group
            </label>
            <select
              id="family-blood-group"
              name="bloodGroup"
              className="form-field-select"
              value={formData.bloodGroup}
              onChange={handleChange}
            >
              {bloodGroupOptions.map((bg) => (
                <option key={bg} value={bg}>{bg}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="form-grid-2">
          {/* Phone Number */}
          <div className="form-field-group">
            <label htmlFor="family-phone" className="form-field-label">
              Phone Number
            </label>
            <input
              id="family-phone"
              name="phone"
              type="tel"
              className="form-field-input"
              placeholder="+1 (555) 000-0000"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>

          {/* Email ID */}
          <div className="form-field-group">
            <label htmlFor="family-email" className="form-field-label">
              Email ID
            </label>
            <input
              id="family-email"
              name="email"
              type="email"
              className="form-field-input"
              placeholder="member@example.com"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Address */}
        <div className="form-field-group">
          <label htmlFor="family-address" className="form-field-label">
            Address
          </label>
          <input
            id="family-address"
            name="address"
            type="text"
            className="form-field-input"
            placeholder="Residential address, city, state"
            value={formData.address}
            onChange={handleChange}
          />
        </div>

        {/* Demo Disclaimer Note */}
        <div className="form-prototype-notice">
          <ShieldAlert size={14} />
          <span>Frontend prototype preview: Data is stored in active session memory only.</span>
        </div>

        {/* Modal Actions */}
        <div className="modal-actions-footer">
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
            <UserPlus size={16} />
            <span>Add Member</span>
          </button>
        </div>
      </form>
    </Modal>
  );
}

