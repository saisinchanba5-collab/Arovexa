import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { 
  FlaskConical, 
  Clock, 
  Home, 
  CheckCircle2, 
  Search, 
  ArrowRight,
  ShieldCheck,
  Tag,
  Calendar,
  X
} from 'lucide-react';
import { SAMPLE_LAB_TESTS } from '../../data/mockData';
import SearchBar from '../../components/SearchBar/SearchBar';
import EmptyState from '../../components/EmptyState/EmptyState';
import { 
  BloodTestIllustration, 
  CompleteBloodCountIllustration, 
  LipidProfileIllustration, 
  ThyroidProfileIllustration, 
  DiabetesGlucoseIllustration 
} from '../../assets/images/LabTestIllustrations';
import './LabTests.css';

export default function LabTests() {
  const location = useLocation();
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [bookedNotice, setBookedNotice] = useState(null);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const testId = params.get('test') || location.state?.selectedId;
    if (testId) {
      const found = SAMPLE_LAB_TESTS.find((t) => t.id === testId);
      if (found) {
        setActiveCategory('All');
        setSearchQuery(found.name);
        setBookedNotice(`Selected Screening Test: "${found.name}" (${found.price} • ${found.category}). Includes: ${found.parameters}. Turnaround: ${found.turnaround}.`);
      }
    }
  }, [location.search, location.state]);

  const categories = ['All', 'Full Body Checks', 'Cardiology', 'Thyroid', 'Diabetes'];

  const filteredTests = SAMPLE_LAB_TESTS.filter((test) => {
    const matchCat = activeCategory === 'All' || test.category === activeCategory;
    const matchSearch =
      test.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      test.parameters.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  const handleBookTest = (test) => {
    setBookedNotice(`Sample test order requested for "${test.name}" (Price: ${test.price}). Doorstep collection slot scheduled in demo session.`);
  };

  const renderTestIllustration = (testId) => {
    switch (testId) {
      case 'LAB-01':
        return <BloodTestIllustration />;
      case 'LAB-02':
        return <CompleteBloodCountIllustration />;
      case 'LAB-03':
        return <LipidProfileIllustration />;
      case 'LAB-04':
        return <ThyroidProfileIllustration />;
      case 'LAB-05':
        return <DiabetesGlucoseIllustration />;
      default:
        return <BloodTestIllustration />;
    }
  };

  return (
    <div className="lab-tests-page">
      {/* Header */}
      <div className="page-header-row">
        <div>
          <span className="page-badge-pill">Pathology & Diagnostics</span>
          <h1 className="page-title">Diagnostic Lab Tests & Screenings</h1>
          <p className="page-subtitle">
            5 certified screening profiles with doorstep sample collection and digital report delivery (Sample Preview).
          </p>
        </div>
      </div>

      {bookedNotice && (
        <div className="lab-booked-banner">
          <CheckCircle2 size={18} />
          <span>{bookedNotice}</span>
          <button type="button" onClick={() => setBookedNotice(null)} className="banner-close">&times;</button>
        </div>
      )}

      {/* Category Pills & Search */}
      <div className="lab-filter-row">
        <div className="category-pills">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              className={`cat-pill ${activeCategory === cat ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        <SearchBar
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onClear={() => setSearchQuery('')}
          placeholder="Search tests, biomarkers..."
        />
      </div>

      {/* Lab Tests Grid (Exactly 5 sample tests) */}
      {filteredTests.length === 0 ? (
        <EmptyState
          icon={FlaskConical}
          title="No Lab Tests Found"
          description="No diagnostic screening packages match your search or selected category. Try selecting 'All' or searching for another keyword."
          actionLabel="Reset Filters"
          onAction={() => {
            setActiveCategory('All');
            setSearchQuery('');
          }}
        />
      ) : (
        <div className="lab-tests-cards-grid">
          {filteredTests.map((test) => (
          <div key={test.id} className="lab-test-card">
            {/* Visual Clean Healthcare Illustration */}
            <div className="lab-card-img-wrap">
              {renderTestIllustration(test.id)}
              <span className="lab-category-badge">{test.category}</span>
              <span className="lab-price-pill">{test.price}</span>
            </div>

            {/* Content */}
            <div className="lab-test-card-body">
              <div className="lab-card-top-header">
                <h3 className="lab-test-name">{test.name}</h3>
                {test.badge && (
                  <span className="lab-highlight-badge">{test.badge}</span>
                )}
              </div>

              <p className="lab-short-desc">{test.shortDescription}</p>

              <div className="lab-parameters-box">
                <strong>Parameters Evaluated:</strong>
                <span>{test.parameters}</span>
              </div>

              <div className="lab-meta-list">
                <div className="lab-meta-item">
                  <Clock size={15} />
                  <span>{test.turnaround}</span>
                </div>
                <div className="lab-meta-item">
                  <Home size={15} />
                  <span>{test.homeCollection}</span>
                </div>
              </div>

              <div className="lab-card-footer">
                <span className="sample-type-pill">{test.sampleType}</span>
                <button
                  type="button"
                  className="btn btn-primary btn-sm"
                  onClick={() => handleBookTest(test)}
                >
                  <span>Book Test</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>
          </div>
        ))}
        </div>
      )}
    </div>
  );
}
