import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Droplet, 
  ShieldCheck, 
  Calendar, 
  LogOut, 
  Save, 
  CheckCircle2 
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import './Profile.css';

export default function Profile() {
  const navigate = useNavigate();
  const { patient, updatePatient, logout } = useAuth();

  const [profileData, setProfileData] = useState({
    fullName: patient?.name || 'Eleanor Vance',
    email: patient?.email || 'patient@example.com',
    phone: patient?.phone || '+1 (555) 432-8910',
    bloodGroup: patient?.bloodGroup || 'O+',
    dob: patient?.dob || '1994-05-18',
    address: patient?.address || '42 Medical Center Road, Apt 4B, Metro City',
    emergencyContact: patient?.emergencyContact || 'Arthur Vance (Father) — +1 (555) 987-6543'
  });

  const [savedNotice, setSavedNotice] = useState('');

  // Keep local form in sync if context patient updates
  useEffect(() => {
    if (patient) {
      setProfileData({
        fullName: patient.name || '',
        email: patient.email || '',
        phone: patient.phone || '',
        bloodGroup: patient.bloodGroup || 'O+',
        dob: patient.dob || '',
        address: patient.address || '',
        emergencyContact: patient.emergencyContact || ''
      });
    }
  }, [patient]);

  const handleChange = (e) => {
    setProfileData({ ...profileData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const initials = profileData.fullName
      .trim()
      .split(' ')
      .map((part) => part[0])
      .join('')
      .slice(0, 2)
      .toUpperCase();

    updatePatient({
      name: profileData.fullName,
      email: profileData.email,
      phone: profileData.phone,
      bloodGroup: profileData.bloodGroup,
      dob: profileData.dob,
      address: profileData.address,
      emergencyContact: profileData.emergencyContact,
      avatar: initials || 'EV'
    });

    setSavedNotice('Profile details saved! Header and sidebar user information updated.');
  };

  const handleLogout = async () => {
    if (logout) await logout();
    navigate('/login');
  };

  return (
    <div className="profile-page">
      {/* Header */}
      <div className="page-header-row">
        <div>
          <span className="page-badge-pill">Account Settings</span>
          <h1 className="page-title">Patient Account & Profile</h1>
          <p className="page-subtitle">
            Manage your personal healthcare profile, emergency contact details, and session settings (Sample Preview).
          </p>
        </div>

        <button 
          type="button" 
          className="btn btn-secondary"
          onClick={handleLogout}
        >
          <LogOut size={16} />
          <span>Sign Out / Logout</span>
        </button>
      </div>

      {savedNotice && (
        <div className="profile-saved-banner">
          <CheckCircle2 size={16} />
          <span>{savedNotice}</span>
          <button type="button" onClick={() => setSavedNotice('')} className="banner-close">&times;</button>
        </div>
      )}

      {/* Main Profile Card */}
      <div className="profile-layout-card">
        {/* User Card Header */}
        <div className="profile-hero-banner">
          <div className="profile-avatar-circle">{patient?.avatar || 'EV'}</div>
          <div className="profile-hero-info">
            <div className="profile-hero-name-row">
              <h2 className="profile-hero-name">{profileData.fullName}</h2>
              <span className="profile-verified-badge">
                <ShieldCheck size={14} />
                <span>Verified Patient Session</span>
              </span>
            </div>
            <p className="profile-hero-meta">{profileData.email} • Blood Group: {profileData.bloodGroup}</p>
          </div>
        </div>

        {/* Profile Edit Form */}
        <form onSubmit={handleSubmit} className="profile-form">
          <div className="form-section-title">Personal Healthcare Details</div>

          <div className="profile-form-grid">
            <div className="form-field">
              <label className="form-label" htmlFor="prof-name">Full Legal Name</label>
              <input
                id="prof-name"
                type="text"
                name="fullName"
                className="form-input"
                value={profileData.fullName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-field">
              <label className="form-label" htmlFor="prof-email">Email Address</label>
              <input
                id="prof-email"
                type="email"
                name="email"
                className="form-input"
                value={profileData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-field">
              <label className="form-label" htmlFor="prof-phone">Phone Number</label>
              <input
                id="prof-phone"
                type="tel"
                name="phone"
                className="form-input"
                value={profileData.phone}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-field">
              <label className="form-label" htmlFor="prof-blood">Blood Group</label>
              <input
                id="prof-blood"
                type="text"
                name="bloodGroup"
                className="form-input"
                value={profileData.bloodGroup}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-field full-width">
              <label className="form-label" htmlFor="prof-address">Residential Address</label>
              <input
                id="prof-address"
                type="text"
                name="address"
                className="form-input"
                value={profileData.address}
                onChange={handleChange}
              />
            </div>

            <div className="form-field full-width">
              <label className="form-label" htmlFor="prof-emergency">Primary Emergency Contact</label>
              <input
                id="prof-emergency"
                type="text"
                name="emergencyContact"
                className="form-input"
                value={profileData.emergencyContact}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="profile-actions-bar">
            <span className="demo-boundary-note">Demo Preview: No personal real data stored on server.</span>
            <button type="submit" className="btn btn-primary">
              <Save size={16} />
              <span>Save Changes</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
