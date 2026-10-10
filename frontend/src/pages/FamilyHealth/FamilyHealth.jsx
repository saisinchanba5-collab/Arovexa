import React, { useState } from 'react';
import { Users, Plus, User, Heart, Calendar, ShieldCheck, CheckCircle2 } from 'lucide-react';
import BookAppointmentModal from '../../components/BookAppointmentModal/BookAppointmentModal';
import AddFamilyMemberModal from '../../components/AddFamilyMemberModal/AddFamilyMemberModal';
import EmptyState from '../../components/EmptyState/EmptyState';
import { useAuth } from '../../context/AuthContext';
import './FamilyHealth.css';

export default function FamilyHealth() {
  const { familyMembers, addFamilyMember } = useAuth();
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [addMemberModalOpen, setAddMemberModalOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState(familyMembers[0] || null);
  const [notice, setNotice] = useState('');

  const handleSaveMember = (newMemberData) => {
    const newMember = addFamilyMember(newMemberData);
    setSelectedMember(newMember);
    setNotice(`Successfully added ${newMember.name} (${newMember.relationship}) to your family profiles.`);
  };

  return (
    <div className="family-health-page">
      {/* Header */}
      <div className="page-header-row">
        <div>
          <span className="page-badge-pill">Coordinated Family Care</span>
          <h1 className="page-title">Family Health Profiles</h1>
          <p className="page-subtitle">
            Manage healthcare for your family. Coordinate clinical appointments, immunization logs, and medical records across dependents.
          </p>
        </div>

        <button 
          type="button" 
          className="btn btn-primary"
          onClick={() => setAddMemberModalOpen(true)}
        >
          <Plus size={16} />
          <span>+ Add Member</span>
        </button>
      </div>

      {notice && (
        <div className="family-notice-banner">
          <CheckCircle2 size={16} />
          <span>{notice}</span>
          <button type="button" onClick={() => setNotice('')} className="banner-close">&times;</button>
        </div>
      )}

      {/* Profiles Grid or EmptyState */}
      {familyMembers.length === 0 ? (
        <EmptyState
          icon={Users}
          title="No Family Members Added"
          description="Link your dependents or family members to coordinate care and book appointments."
          actionText="+ Add First Family Member"
          onAction={() => setAddMemberModalOpen(true)}
        />
      ) : (
        <div className="family-cards-grid">
          {familyMembers.map((member) => (
            <div 
              key={member.id} 
              className={`family-card-full ${selectedMember?.id === member.id ? 'active-selection' : ''}`}
              onClick={() => setSelectedMember(member)}
            >
              <div className="family-card-top">
                <div className="member-avatar-lg">
                  {member.avatar}
                </div>
                <div className="member-name-col">
                  <div className="name-row">
                    <h3 className="member-display-name">{member.name}</h3>
                    {member.isPrimary && <span className="primary-pill">Primary</span>}
                  </div>
                  <span className="member-relationship-tag">{member.relationship}</span>
                </div>
              </div>

              <div className="member-stats-row">
                <div className="member-stat">
                  <span className="stat-label">Age</span>
                  <strong className="stat-val">{member.age}</strong>
                </div>
                <div className="member-stat">
                  <span className="stat-label">Blood Group</span>
                  <strong className="stat-val">{member.bloodGroup}</strong>
                </div>
                <div className="member-stat">
                  <span className="stat-label">Member ID</span>
                  <strong className="stat-val">{member.id}</strong>
                </div>
              </div>

                  <div className="family-card-actions">
                    <button 
                      type="button" 
                      className="btn btn-secondary btn-sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedMember(member);
                        setBookingModalOpen(true);
                      }}
                    >
                      <Calendar size={14} />
                      <span>Book for {member.name.split(' ')[0]}</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Active Member Details Card */}
          {selectedMember && (
            <div className="active-member-overview-card">
              <div className="overview-header">
                <ShieldCheck size={20} className="shield-icon" />
                <div>
                  <h4>Selected Profile: {selectedMember.name} ({selectedMember.relationship})</h4>
                  <p>Sample preview of clinical records and appointments for this family member.</p>
                </div>
              </div>

              <div className="overview-grid">
                <div className="overview-item">
                  <span className="ov-label">Upcoming Visit</span>
                  <strong className="ov-val">Dr. Priya Sharma • Cardiology • Aug 30</strong>
                </div>
                <div className="overview-item">
                  <span className="ov-label">Latest Diagnostic</span>
                  <strong className="ov-val">Complete Blood Count (CBC) • Ready</strong>
                </div>
                <div className="overview-item">
                  <span className="ov-label">Emergency Contact</span>
                  <strong className="ov-val">+1 (555) 432-8910 (Verified)</strong>
                </div>
              </div>
            </div>
          )}

      {/* Add Family Member Modal */}
      <AddFamilyMemberModal
        isOpen={addMemberModalOpen}
        onClose={() => setAddMemberModalOpen(false)}
        onAddMember={handleSaveMember}
      />

      {/* Book Appointment for Selected Member Modal */}
      <BookAppointmentModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
      />
    </div>
  );
}
