import React, { useState, useMemo, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  Building2, 
  Search, 
  MapPin, 
  Star, 
  Filter, 
  Check, 
  X, 
  Phone, 
  ShieldCheck, 
  Bed, 
  ExternalLink, 
  SlidersHorizontal, 
  RotateCcw 
} from 'lucide-react';
import HospitalDetailsModal from '../../components/HospitalDetailsModal/HospitalDetailsModal';
import BookAppointmentModal from '../../components/BookAppointmentModal/BookAppointmentModal';
import SearchBar from '../../components/SearchBar/SearchBar';
import Badge from '../../components/Badge/Badge';
import EmptyState from '../../components/EmptyState/EmptyState';
import { SAMPLE_HOSPITALS, SAMPLE_DOCTORS } from '../../data/mockData';
import './Hospitals.css';

export default function Hospitals() {
  const location = useLocation();
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState('All');
  const [selectedRating, setSelectedRating] = useState('All');
  const [selectedFacilities, setSelectedFacilities] = useState([]);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const [selectedHospitalForModal, setSelectedHospitalForModal] = useState(null);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [selectedDoctorForBooking, setSelectedDoctorForBooking] = useState(null);

  // Synchronize modal with URL query param ?hospital=HOSP-XX or location.state
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const hospId = params.get('hospital') || location.state?.selectedId;
    if (hospId) {
      const found = SAMPLE_HOSPITALS.find((h) => h.id === hospId);
      if (found) {
        setSelectedHospitalForModal(found);
      }
    } else {
      setSelectedHospitalForModal(null);
    }
  }, [location.search, location.state]);

  const handleOpenHospitalModal = (hospital) => {
    setSelectedHospitalForModal(hospital);
    const params = new URLSearchParams(location.search);
    params.set('hospital', hospital.id);
    navigate(`/hospitals?${params.toString()}`, { replace: true });
  };

  const handleCloseHospitalModal = () => {
    setSelectedHospitalForModal(null);
    const params = new URLSearchParams(location.search);
    if (params.has('hospital')) {
      params.delete('hospital');
      const newSearch = params.toString();
      navigate(`/hospitals${newSearch ? `?${newSearch}` : ''}`, { replace: true });
    }
  };

  const facilityOptions = [
    'Emergency',
    'Pharmacy',
    'Diagnostics',
    '24/7 Service',
    'ICU',
    'Blood Bank'
  ];

  const cityOptions = ['All', 'Metro City', 'Westside', 'Highland'];
  const ratingOptions = [
    { label: 'All Ratings', value: 'All' },
    { label: '4.8 & Above', value: '4.8' },
    { label: '4.9 & Above', value: '4.9' }
  ];

  const handleFacilityToggle = (facility) => {
    setSelectedFacilities((prev) =>
      prev.includes(facility)
        ? prev.filter((f) => f !== facility)
        : [...prev, facility]
    );
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCity('All');
    setSelectedRating('All');
    setSelectedFacilities([]);
  };

  const filteredHospitals = useMemo(() => {
    return SAMPLE_HOSPITALS.filter((hosp) => {
      // Search match
      const q = searchQuery.toLowerCase();
      const matchSearch =
        hosp.name.toLowerCase().includes(q) ||
        hosp.type.toLowerCase().includes(q) ||
        hosp.location.toLowerCase().includes(q);

      // City filter
      const matchCity = selectedCity === 'All' || hosp.city === selectedCity;

      // Rating filter
      const matchRating =
        selectedRating === 'All' || hosp.rating >= parseFloat(selectedRating);

      // Facilities match
      const matchFacilities =
        selectedFacilities.length === 0 ||
        selectedFacilities.every((facility) => hosp.facilities.includes(facility));

      return matchSearch && matchCity && matchRating && matchFacilities;
    });
  }, [searchQuery, selectedCity, selectedRating, selectedFacilities]);

  const activeFilterCount =
    (selectedCity !== 'All' ? 1 : 0) +
    (selectedRating !== 'All' ? 1 : 0) +
    selectedFacilities.length;

  return (
    <div className="hospitals-page">
      {/* Page Header */}
      <div className="page-header-row">
        <div>
          <span className="page-badge-pill">Healthcare Directory</span>
          <h1 className="page-title">Healthcare Centers & Hospitals</h1>
          <p className="page-subtitle">
            Discover accredited multi-specialty hospitals, emergency facilities, and specialized clinics (Sample Preview).
          </p>
        </div>

        {/* Mobile Filter Trigger */}
        <button
          type="button"
          className="btn btn-secondary mobile-filter-btn"
          onClick={() => setMobileFilterOpen(true)}
          aria-label="Open filter drawer"
        >
          <SlidersHorizontal size={16} />
          <span>Filters</span>
          {activeFilterCount > 0 && (
            <span className="filter-count-badge">{activeFilterCount}</span>
          )}
        </button>
      </div>

      {/* Main Content Grid (Sidebar Filter + Hospital Cards) */}
      <div className="hospitals-layout-grid">
        {/* Desktop Filter Panel */}
        <aside className="hospitals-filter-sidebar desktop-filter-sidebar" aria-label="Hospital Filters">
          <div className="filter-panel-header">
            <div className="filter-title-group">
              <Filter size={17} />
              <h3>Filter Facilities</h3>
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

          {/* Search Input */}
          <div className="filter-group">
            <label className="filter-label" htmlFor="hosp-search-input">Search Center</label>
            <SearchBar
              id="hosp-search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onClear={() => setSearchQuery('')}
              placeholder="Hospital name, department..."
            />
          </div>

          {/* Location Dropdown */}
          <div className="filter-group">
            <label className="filter-label" htmlFor="hosp-location-select">Location / City</label>
            <select
              id="hosp-location-select"
              className="filter-select"
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
            >
              {cityOptions.map((c) => (
                <option key={c} value={c}>
                  {c === 'All' ? 'All Locations' : c}
                </option>
              ))}
            </select>
          </div>

          {/* Rating Dropdown */}
          <div className="filter-group">
            <label className="filter-label" htmlFor="hosp-rating-select">Minimum Rating</label>
            <select
              id="hosp-rating-select"
              className="filter-select"
              value={selectedRating}
              onChange={(e) => setSelectedRating(e.target.value)}
            >
              {ratingOptions.map((r) => (
                <option key={r.value} value={r.value}>
                  {r.label}
                </option>
              ))}
            </select>
          </div>

          {/* Facility Checkboxes (Item 14 Requirement) */}
          <div className="filter-group">
            <label className="filter-label">Key Facilities & Services</label>
            <div className="facility-checkbox-list">
              {facilityOptions.map((facility) => {
                const isChecked = selectedFacilities.includes(facility);
                return (
                  <label key={facility} className="checkbox-item">
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => handleFacilityToggle(facility)}
                    />
                    <span className="checkbox-custom">
                      {isChecked && <Check size={12} />}
                    </span>
                    <span className="checkbox-text">{facility}</span>
                  </label>
                );
              })}
            </div>
          </div>

          {/* Reset Filters Action */}
          <div className="filter-sidebar-footer">
            <button 
              type="button" 
              className="btn btn-secondary btn-sm filter-reset-full-btn"
              onClick={handleResetFilters}
            >
              <RotateCcw size={14} />
              <span>Reset Filters</span>
            </button>
          </div>
        </aside>

        {/* Mobile Filter Drawer / Sheet */}
        {mobileFilterOpen && (
          <div className="mobile-filter-drawer-overlay" onClick={() => setMobileFilterOpen(false)}>
            <div className="mobile-filter-drawer" onClick={(e) => e.stopPropagation()}>
              <div className="drawer-header">
                <h3>Filter Hospitals</h3>
                <button 
                  type="button" 
                  className="drawer-close-btn"
                  onClick={() => setMobileFilterOpen(false)}
                >
                  <X size={20} />
                </button>
              </div>

              <div className="drawer-body">
                {/* Search */}
                <div className="filter-group">
                  <label className="filter-label">Search</label>
                  <SearchBar
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onClear={() => setSearchQuery('')}
                    placeholder="Search by name..."
                  />
                </div>

                {/* Location */}
                <div className="filter-group">
                  <label className="filter-label">Location</label>
                  <select
                    className="form-select"
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.target.value)}
                  >
                    {cityOptions.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                {/* Facilities */}
                <div className="filter-group">
                  <label className="filter-label">Facilities</label>
                  <div className="facility-checkbox-list">
                    {facilityOptions.map((facility) => (
                      <label key={facility} className="checkbox-item">
                        <input
                          type="checkbox"
                          checked={selectedFacilities.includes(facility)}
                          onChange={() => handleFacilityToggle(facility)}
                        />
                        <span className="checkbox-text">{facility}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              <div className="drawer-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handleResetFilters}
                >
                  <RotateCcw size={14} />
                  <span>Reset Filters</span>
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => setMobileFilterOpen(false)}
                >
                  Apply Filters ({filteredHospitals.length})
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Hospitals Directory Cards Grid (Item 15) */}
        <main className="hospitals-content-col">
          <div className="results-status-bar">
            <span className="results-count">
              Showing <strong>{filteredHospitals.length}</strong> of {SAMPLE_HOSPITALS.length} Healthcare Centers
            </span>
            <span className="demo-notice-tag">Sample Data Directory</span>
          </div>

          {filteredHospitals.length === 0 ? (
            <EmptyState
              icon={Building2}
              title="No Centers Match Your Filters"
              description="Try clearing your selected facility checkboxes or city filter to see all hospitals."
              actionLabel="Reset All Filters"
              onAction={handleResetFilters}
            />
          ) : (
            <div className="hospitals-cards-grid">
              {filteredHospitals.map((hospital) => (
                <div key={hospital.id} className="hospital-card">
                  {/* Hospital Image with Status Badges */}
                  <div className="hospital-card-img-wrap">
                    <img 
                      src={hospital.image} 
                      alt={hospital.name} 
                      className="hospital-card-img"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = 'https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?auto=format&fit=crop&w=600&q=80';
                      }}
                    />
                    <div className="hospital-img-overlay-badges">
                      <span className="hosp-verified-pill">
                        <ShieldCheck size={11} />
                        <span>Verified</span>
                      </span>
                      <span className="hosp-status-pill">
                        {hospital.emergency ? '24/7 Emergency' : hospital.status || 'Active'}
                      </span>
                    </div>
                  </div>

                  {/* Hospital Content Summary */}
                  <div className="hospital-card-body">
                    <div className="card-meta-bar">
                      <div className="hosp-rating">
                        <Star size={13} className="star-fill" />
                        <strong>{hospital.rating}</strong>
                        <span className="hosp-reviews">({hospital.reviewsCount})</span>
                      </div>
                      <span className="hosp-capacity-tag">
                        <Bed size={12} />
                        <span>{hospital.beds}</span>
                      </span>
                    </div>

                    <h3 className="hospital-name" title={hospital.name}>{hospital.name}</h3>

                    <div className="hosp-location-row">
                      <MapPin size={13} className="location-icon" />
                      <span>{hospital.location}</span>
                    </div>

                    {hospital.accreditation && (
                      <div className="hosp-accreditation-row">
                        <ShieldCheck size={12} className="accred-icon" />
                        <span>{hospital.accreditation}</span>
                      </div>
                    )}

                    {/* Important Facility Badges (Max 3) */}
                    <div className="hosp-facilities-row">
                      {hospital.facilities.slice(0, 3).map((fac) => (
                        <span key={fac} className="facility-tag">{fac}</span>
                      ))}
                      {hospital.facilities.length > 3 && (
                        <span className="facility-tag more">+{hospital.facilities.length - 3}</span>
                      )}
                    </div>

                    {/* Card Footer: View Details */}
                    <div className="hospital-card-footer">
                      <button
                        type="button"
                        className="btn btn-primary btn-sm hosp-action-btn"
                        onClick={() => handleOpenHospitalModal(hospital)}
                        title={`View full details for ${hospital.name}`}
                      >
                        <span>View Details</span>
                        <ExternalLink size={13} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>

      {/* Hospital Details Modal */}
      <HospitalDetailsModal
        hospital={selectedHospitalForModal}
        isOpen={Boolean(selectedHospitalForModal)}
        onClose={handleCloseHospitalModal}
        onSelectDoctor={(doc) => {
          setSelectedDoctorForBooking(doc);
          setBookingModalOpen(true);
        }}
      />

      {/* Reusable Book Appointment Modal */}
      <BookAppointmentModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        initialDoctor={selectedDoctorForBooking}
      />
    </div>
  );
}
