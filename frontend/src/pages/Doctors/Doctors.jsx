import React, { useState, useMemo, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  Stethoscope, 
  Search, 
  Filter, 
  Star, 
  Award, 
  Building2, 
  Calendar, 
  Clock, 
  CreditCard, 
  RotateCcw,
  SlidersHorizontal,
  X,
  Eye,
  CheckCircle2
} from 'lucide-react';
import DoctorProfileModal from '../../components/DoctorProfileModal/DoctorProfileModal';
import BookAppointmentModal from '../../components/BookAppointmentModal/BookAppointmentModal';
import SearchBar from '../../components/SearchBar/SearchBar';
import Badge from '../../components/Badge/Badge';
import EmptyState from '../../components/EmptyState/EmptyState';
import { SAMPLE_DOCTORS, SAMPLE_HOSPITALS } from '../../data/mockData';
import './Doctors.css';

export default function Doctors() {
  const location = useLocation();
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('All');
  const [selectedHospital, setSelectedHospital] = useState('All');
  const [selectedConsultType, setSelectedConsultType] = useState('All');
  const [selectedGender, setSelectedGender] = useState('All');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const [activeProfileDoctor, setActiveProfileDoctor] = useState(null);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [selectedDoctorForBooking, setSelectedDoctorForBooking] = useState(null);

  // Synchronize modal with URL query param ?doctor=DOC-XX or location.state
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const docId = params.get('doctor') || location.state?.selectedId;
    if (docId) {
      const found = SAMPLE_DOCTORS.find((d) => d.id === docId);
      if (found) {
        setActiveProfileDoctor(found);
      }
    } else {
      setActiveProfileDoctor(null);
    }
  }, [location.search, location.state]);

  const handleOpenDoctorProfile = (doc) => {
    setActiveProfileDoctor(doc);
    const params = new URLSearchParams(location.search);
    params.set('doctor', doc.id);
    navigate(`/doctors?${params.toString()}`, { replace: true });
  };

  const handleCloseDoctorProfile = () => {
    setActiveProfileDoctor(null);
    const params = new URLSearchParams(location.search);
    if (params.has('doctor')) {
      params.delete('doctor');
      const newSearch = params.toString();
      navigate(`/doctors${newSearch ? `?${newSearch}` : ''}`, { replace: true });
    }
  };

  const specialties = [
    'All',
    'Cardiology',
    'Neurology',
    'Pediatrics',
    'Orthopedics',
    'Dermatology',
    'Family Medicine',
    'Obstetrics & Gynecology',
    'General Surgery'
  ];

  const consultTypes = ['All', 'In-Person', 'Telehealth'];
  const genders = ['All', 'Female', 'Male'];

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedSpecialty('All');
    setSelectedHospital('All');
    setSelectedConsultType('All');
    setSelectedGender('All');
  };

  const filteredDoctors = useMemo(() => {
    return SAMPLE_DOCTORS.filter((doc) => {
      const q = searchQuery.toLowerCase();
      const matchSearch =
        doc.name.toLowerCase().includes(q) ||
        doc.specialty.toLowerCase().includes(q) ||
        doc.hospitalName.toLowerCase().includes(q);

      const matchSpecialty =
        selectedSpecialty === 'All' || doc.specialty.toLowerCase().includes(selectedSpecialty.toLowerCase());

      const matchHospital =
        selectedHospital === 'All' || doc.hospitalId === selectedHospital;

      const matchConsult =
        selectedConsultType === 'All' || doc.consultationType.includes(selectedConsultType);

      const matchGender =
        selectedGender === 'All' || doc.gender === selectedGender;

      return matchSearch && matchSpecialty && matchHospital && matchConsult && matchGender;
    });
  }, [searchQuery, selectedSpecialty, selectedHospital, selectedConsultType, selectedGender]);

  const activeFilterCount =
    (selectedSpecialty !== 'All' ? 1 : 0) +
    (selectedHospital !== 'All' ? 1 : 0) +
    (selectedConsultType !== 'All' ? 1 : 0) +
    (selectedGender !== 'All' ? 1 : 0);

  const handleBookSlot = (doc) => {
    setSelectedDoctorForBooking(doc);
    setBookingModalOpen(true);
  };

  return (
    <div className="doctors-page">
      {/* Page Header */}
      <div className="page-header-row">
        <div>
          <span className="page-badge-pill">Specialist Physicians</span>
          <h1 className="page-title">Find Board-Certified Specialists</h1>
          <p className="page-subtitle">
            Browse 25 specialist doctors across 5 premier hospitals with transparent credentials and instant slot booking (Demo Preview).
          </p>
        </div>

        {/* Mobile Filter Trigger */}
        <button
          type="button"
          className="btn btn-secondary mobile-filter-btn"
          onClick={() => setMobileFilterOpen(true)}
          aria-label="Open doctor filters"
        >
          <SlidersHorizontal size={16} />
          <span>Filters</span>
          {activeFilterCount > 0 && (
            <span className="filter-count-badge">{activeFilterCount}</span>
          )}
        </button>
      </div>

      {/* Main Layout Grid */}
      <div className="doctors-layout-grid">
        {/* Desktop Filter Sidebar */}
        <aside className="doctors-filter-sidebar desktop-filter-sidebar" aria-label="Doctor Filters">
          <div className="filter-panel-header">
            <div className="filter-title-group">
              <Filter size={17} />
              <h3>Filter Specialists</h3>
            </div>
            {activeFilterCount > 0 && (
              <button 
                type="button" 
                className="filter-reset-link"
                onClick={handleResetFilters}
              >
                <RotateCcw size={12} />
                <span>Reset</span>
              </button>
            )}
          </div>

          {/* Search */}
          <div className="filter-group">
            <label className="filter-label">Search Physician</label>
            <SearchBar
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onClear={() => setSearchQuery('')}
              placeholder="Doctor name, specialty..."
            />
          </div>

          {/* Specialty Dropdown */}
          <div className="filter-group">
            <label className="filter-label" htmlFor="doc-spec-select">Clinical Specialty</label>
            <select
              id="doc-spec-select"
              className="filter-select"
              value={selectedSpecialty}
              onChange={(e) => setSelectedSpecialty(e.target.value)}
            >
              {specialties.map((s) => (
                <option key={s} value={s}>
                  {s === 'All' ? 'All Specialties' : s}
                </option>
              ))}
            </select>
          </div>

          {/* Affiliated Hospital Dropdown */}
          <div className="filter-group">
            <label className="filter-label" htmlFor="doc-hosp-select">Hospital / Center</label>
            <select
              id="doc-hosp-select"
              className="filter-select"
              value={selectedHospital}
              onChange={(e) => setSelectedHospital(e.target.value)}
            >
              <option value="All">All Hospitals</option>
              {SAMPLE_HOSPITALS.map((h) => (
                <option key={h.id} value={h.id}>
                  {h.name}
                </option>
              ))}
            </select>
          </div>

          {/* Consultation Type Radio */}
          <div className="filter-group">
            <label className="filter-label">Consultation Format</label>
            <div className="filter-radio-list">
              {consultTypes.map((type) => (
                <label key={type} className="filter-radio-item">
                  <input
                    type="radio"
                    name="consultType"
                    value={type}
                    checked={selectedConsultType === type}
                    onChange={(e) => setSelectedConsultType(e.target.value)}
                  />
                  <span>{type === 'All' ? 'All Formats' : type}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Gender Filter Radio */}
          <div className="filter-group">
            <label className="filter-label">Physician Gender</label>
            <div className="filter-radio-list">
              {genders.map((g) => (
                <label key={g} className="filter-radio-item">
                  <input
                    type="radio"
                    name="gender"
                    value={g}
                    checked={selectedGender === g}
                    onChange={(e) => setSelectedGender(e.target.value)}
                  />
                  <span>{g === 'All' ? 'All Genders' : g}</span>
                </label>
              ))}
            </div>
          </div>
        </aside>

        {/* Mobile Filter Drawer */}
        {mobileFilterOpen && (
          <div className="mobile-filter-drawer-overlay" onClick={() => setMobileFilterOpen(false)}>
            <div className="mobile-filter-drawer" onClick={(e) => e.stopPropagation()}>
              <div className="drawer-header">
                <h3>Filter Specialists</h3>
                <button 
                  type="button" 
                  className="drawer-close-btn"
                  onClick={() => setMobileFilterOpen(false)}
                  aria-label="Close filters"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="drawer-body">
                <div className="filter-group">
                  <label className="filter-label">Search Physician</label>
                  <SearchBar
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onClear={() => setSearchQuery('')}
                    placeholder="Doctor name, specialty..."
                  />
                </div>

                <div className="filter-group">
                  <label className="filter-label" htmlFor="mob-doc-spec">Specialty</label>
                  <select
                    id="mob-doc-spec"
                    className="filter-select"
                    value={selectedSpecialty}
                    onChange={(e) => setSelectedSpecialty(e.target.value)}
                  >
                    {specialties.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>

                <div className="filter-group">
                  <label className="filter-label" htmlFor="mob-doc-hosp">Hospital</label>
                  <select
                    id="mob-doc-hosp"
                    className="filter-select"
                    value={selectedHospital}
                    onChange={(e) => setSelectedHospital(e.target.value)}
                  >
                    <option value="All">All Hospitals</option>
                    {SAMPLE_HOSPITALS.map((h) => (
                      <option key={h.id} value={h.id}>{h.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="drawer-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handleResetFilters}
                >
                  Reset
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => setMobileFilterOpen(false)}
                >
                  Apply Filters ({filteredDoctors.length})
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Doctors Grid Content */}
        <main className="doctors-content-col">
          <div className="results-status-bar">
            <span className="results-count">
              Showing <strong>{filteredDoctors.length}</strong> of {SAMPLE_DOCTORS.length} Specialist Physicians
            </span>
            <span className="demo-notice-tag">Sample Provider Dataset</span>
          </div>

          {filteredDoctors.length === 0 ? (
            <EmptyState
              icon={Stethoscope}
              title="No Physicians Match Your Filters"
              description="Try clearing your selected specialty or hospital filter to browse all 25 specialists."
              actionText="Reset All Filters"
              onAction={handleResetFilters}
            />
          ) : (
            <div className="doctors-cards-grid">
              {filteredDoctors.map((doc) => (
                <div key={doc.id} className="doctor-item-card">
                  {/* Doctor Card Top / Avatar & Main Meta */}
                  <div className="doc-card-top-row">
                    <div className="doc-avatar-container">
                      <img 
                        src={doc.image} 
                        alt={doc.name} 
                        className="doc-avatar-img"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=300&q=80';
                        }}
                      />
                    </div>
                    <div className="doc-main-meta">
                      <div className="doc-rating-pill">
                        <Star size={12} className="star-fill" />
                        <strong>{doc.rating}</strong>
                        <span className="doc-reviews-count">({doc.reviewsCount})</span>
                      </div>
                      <h3 className="doc-name" title={doc.name}>{doc.name}</h3>
                      <span className="doc-specialty-badge">
                        {doc.specialty}
                      </span>
                    </div>
                  </div>

                  {/* Doctor Info Details */}
                  <div className="doc-card-details">
                    <div className="doc-detail-item">
                      <Building2 size={13} className="detail-icon" />
                      <span className="hospital-name-text">{doc.hospitalName}</span>
                    </div>

                    <div className="doc-exp-fee-row">
                      <div className="doc-detail-item">
                        <Award size={13} className="detail-icon" />
                        <span>{doc.experience}</span>
                      </div>
                      <div className="doc-fee-badge">
                        <span className="fee-label">Fee:</span>
                        <strong className="fee-val">{doc.consultationFee}</strong>
                      </div>
                    </div>
                  </div>

                  {/* 2–3 Available Slots Requirement */}
                  <div className="doc-slots-section">
                    <span className="slots-heading">Next Available Slots:</span>
                    <div className="doc-slots-chips">
                      {(doc.availableSlots || ['Today 4:00 PM', 'Tomorrow 11:00 AM', 'Friday 3:30 PM']).slice(0, 3).map((slot, sIdx) => (
                        <button
                          key={sIdx}
                          type="button"
                          className="slot-chip"
                          onClick={() => handleBookSlot(doc)}
                          title={`Book slot: ${slot}`}
                        >
                          <Clock size={11} />
                          <span>{slot}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons: View Profile & Book Slot */}
                  <div className="doc-card-bottom-actions">
                    <button
                      type="button"
                      className="btn btn-secondary btn-sm doc-profile-btn"
                      onClick={() => handleOpenDoctorProfile(doc)}
                      title="View complete doctor profile"
                    >
                      <Eye size={13} />
                      <span>View Profile</span>
                    </button>

                    <button
                      type="button"
                      className="btn btn-primary btn-sm doc-book-btn"
                      onClick={() => handleBookSlot(doc)}
                      title={`Book appointment with ${doc.name}`}
                    >
                      <Calendar size={13} />
                      <span>Book Slot</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>

      {/* Doctor Profile Modal */}
      <DoctorProfileModal
        doctor={activeProfileDoctor}
        isOpen={Boolean(activeProfileDoctor)}
        onClose={handleCloseDoctorProfile}
        onBookAppointment={(doc) => handleBookSlot(doc)}
      />

      {/* Book Appointment Modal */}
      <BookAppointmentModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        initialDoctor={selectedDoctorForBooking}
      />
    </div>
  );
}
