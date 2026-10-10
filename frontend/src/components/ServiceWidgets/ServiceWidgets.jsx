import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  CalendarPlus, 
  FileText, 
  Building2, 
  FlaskConical, 
  Sparkles, 
  Users, 
  CalendarCheck, 
  Activity, 
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Stethoscope,
  Shield,
  HeartPulse,
  Clock,
  Heart
} from 'lucide-react';
import { SAMPLE_DOCTORS } from '../../data/mockData';
import './ServiceWidgets.css';

/**
 * ServiceWidgets Component
 * Redesigned Large Premium Healthcare Service Cards
 * - Desktop: 4 cards per row, equal heights, generous spacing
 * - Tablet: 2 cards per row
 * - Mobile: Horizontal swipeable carousel with auto-slide, pause on touch, and pagination dots
 */
export default function ServiceWidgets({ onOpenBooking }) {
  const navigate = useNavigate();

  // Mobile carousel state
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);

  const autoSlideTimerRef = useRef(null);
  const touchStartXRef = useRef(0);
  const touchEndXRef = useRef(0);

  // 8 Dashboard Service Widgets with Exact Requirements
  const widgets = [
    {
      id: 'book-appointment',
      title: 'Book an Appointment',
      badge: 'TOP DOCTORS ONLINE',
      description: 'Find doctors and schedule your next appointment easily.',
      action: 'Book Now',
      supportingText: '24/7 Scheduling',
      icon: <CalendarPlus size={24} />,
      watermarkIcon: <Stethoscope size={92} strokeWidth={1.2} />,
      tint: 'mint',
      badgeClass: 'badge-mint-pill',
      onClick: () => {
        if (onOpenBooking) {
          onOpenBooking(SAMPLE_DOCTORS[0]);
        } else {
          navigate('/appointments');
        }
      }
    },
    {
      id: 'medical-reports',
      title: 'Medical Reports',
      badge: 'ENCRYPTED VAULT',
      description: 'View and manage medical reports and important health documents.',
      action: 'View Reports',
      supportingText: 'Encrypted Vault',
      icon: <FileText size={24} />,
      watermarkIcon: <Shield size={92} strokeWidth={1.2} />,
      tint: 'ice',
      badgeClass: 'badge-ice-pill',
      onClick: () => navigate('/reports')
    },
    {
      id: 'hospital-discovery',
      title: 'Hospital Discovery',
      badge: 'VERIFIED CENTRES',
      description: 'Explore hospitals and healthcare facilities near you.',
      action: 'Browse Hospitals',
      supportingText: '5 Verified Centers',
      icon: <Building2 size={24} />,
      watermarkIcon: <Building2 size={92} strokeWidth={1.2} />,
      tint: 'navy',
      badgeClass: 'badge-navy-pill',
      onClick: () => navigate('/hospitals')
    },
    {
      id: 'laboratory-services',
      title: 'Laboratory Services',
      badge: 'ACCREDITED LABS',
      description: 'Schedule laboratory tests and view your test results.',
      action: 'View Tests',
      supportingText: 'Doorstep Pickup',
      icon: <FlaskConical size={24} />,
      watermarkIcon: <FlaskConical size={92} strokeWidth={1.2} />,
      tint: 'lavender',
      badgeClass: 'badge-lavender-pill',
      onClick: () => navigate('/lab-tests')
    },
    {
      id: 'ai-health-assistant',
      title: 'AI Health Assistant',
      badge: 'AI POWERED',
      description: 'Ask health-related questions and understand your health information.',
      action: 'Ask AROVEXA AI',
      supportingText: 'Smart Guidance',
      icon: <Sparkles size={24} />,
      watermarkIcon: <Sparkles size={92} strokeWidth={1.2} />,
      tint: 'lime',
      badgeClass: 'badge-lime-pill',
      onClick: () => navigate('/ai-assistant')
    },
    {
      id: 'family-health',
      title: 'Family Health',
      badge: 'FAMILY CARE',
      description: 'Manage healthcare information for your family members.',
      action: 'View Family',
      supportingText: 'Coordinated Care',
      icon: <Users size={24} />,
      watermarkIcon: <Heart size={92} strokeWidth={1.2} />,
      tint: 'coral',
      badgeClass: 'badge-coral-pill',
      onClick: () => navigate('/family-health')
    },
    {
      id: 'upcoming-appointments',
      title: 'Upcoming Appointments',
      badge: 'UPCOMING',
      description: 'View and manage your scheduled healthcare appointments.',
      action: 'View Appointments',
      supportingText: 'Track & Manage',
      icon: <CalendarCheck size={24} />,
      watermarkIcon: <Clock size={92} strokeWidth={1.2} />,
      tint: 'teal',
      badgeClass: 'badge-teal-pill',
      onClick: () => navigate('/appointments')
    },
    {
      id: 'health-insights',
      title: 'Health Insights',
      badge: 'PERSONALIZED',
      description: 'Review recent health activity and useful health insights.',
      action: 'View Insights',
      supportingText: 'Real-time Vitals',
      icon: <Activity size={24} />,
      watermarkIcon: <HeartPulse size={92} strokeWidth={1.2} />,
      tint: 'soft-blue',
      badgeClass: 'badge-blue-pill',
      onClick: () => {
        const el = document.getElementById('health-summary');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
          navigate('/dashboard');
        }
      }
    }
  ];

  const totalSlides = widgets.length;

  // Next / Prev slide handlers for mobile carousel
  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  const handleGoTo = (index) => {
    setCurrentIndex(index);
  };

  // Mobile auto-slide timer (4000ms) with pause on interaction
  useEffect(() => {
    if (isPaused || isDragging) return;

    autoSlideTimerRef.current = setInterval(() => {
      handleNext();
    }, 4000);

    return () => {
      if (autoSlideTimerRef.current) clearInterval(autoSlideTimerRef.current);
    };
  }, [isPaused, isDragging, handleNext]);

  // Touch handlers for mobile swipe
  const handleTouchStart = (e) => {
    setIsPaused(true);
    touchStartXRef.current = e.touches[0].clientX;
    touchEndXRef.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    setIsPaused(false);
    const deltaX = touchStartXRef.current - touchEndXRef.current;
    if (deltaX > 45) {
      handleNext();
    } else if (deltaX < -45) {
      handlePrev();
    }
  };

  // Mouse drag handlers for desktop emulation & testing
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setIsPaused(true);
    setDragStartX(e.clientX);
    setDragOffset(0);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const delta = e.clientX - dragStartX;
    setDragOffset(delta);
  };

  const handleMouseUp = () => {
    if (!isDragging) return;
    setIsDragging(false);
    setIsPaused(false);
    if (dragOffset < -50) {
      handleNext();
    } else if (dragOffset > 50) {
      handlePrev();
    }
    setDragOffset(0);
  };

  const handleMouseLeave = () => {
    if (isDragging) {
      setIsDragging(false);
      setIsPaused(false);
      setDragOffset(0);
    }
  };

  // Render a single large premium service card
  const renderCard = (widget) => (
    <div
      key={widget.id}
      className={`service-widget-card tint-${widget.tint}`}
      onClick={widget.onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          widget.onClick();
        }
      }}
      aria-label={`${widget.title}: ${widget.action}`}
    >
      {/* Subtle Healthcare Decorative Watermark (Lower-Right Background) */}
      <div className="widget-watermark-icon" aria-hidden="true">
        {widget.watermarkIcon}
      </div>

      {/* Top Area: Rounded Icon Container (Left) + Pill-shaped Badge (Right) */}
      <div className="widget-top-area">
        <div className={`widget-icon-container bg-${widget.tint}`}>
          {widget.icon}
        </div>
        <span className={`widget-badge-pill ${widget.badgeClass}`}>
          {widget.badge}
        </span>
      </div>

      {/* Middle Area: Large Bold Title + 2-3 Line Description */}
      <div className="widget-middle-area">
        <h3 className="widget-title">{widget.title}</h3>
        <p className="widget-description">{widget.description}</p>
      </div>

      {/* Bottom Area: Thin Divider + Action Left + Arrow + Secondary Right */}
      <div className="widget-bottom-area">
        <div className="widget-divider" />
        <div className="widget-action-row">
          <div className="widget-action-left">
            <span className="widget-action-label">{widget.action}</span>
            <span className="widget-arrow-circle">
              <ArrowRight size={15} className="widget-action-arrow" />
            </span>
          </div>
          {widget.supportingText && (
            <span className="widget-supporting-text">{widget.supportingText}</span>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <section className="service-widgets-section" aria-label="AROVEXA Healthcare Services">
      {/* Section Header */}
      <div className="service-widgets-header">
        <div>
          <span className="service-header-badge">Clinical Network</span>
          <h2 className="service-header-title">Explore AROVEXA Services</h2>
          <p className="service-header-subtitle">
            Direct access to verified healthcare services, doctors, and clinical operations
          </p>
        </div>
      </div>

      {/* 1. Desktop & Tablet Responsive Grid */}
      <div className="service-widgets-desktop-grid">
        {widgets.map((widget) => renderCard(widget))}
      </div>

      {/* 2. Mobile Swipeable Carousel */}
      <div 
        className="service-widgets-mobile-carousel"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div
          className="mobile-carousel-viewport"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
        >
          <div
            className="mobile-carousel-track"
            style={{
              transform: `translateX(calc(-${currentIndex * 100}% + ${dragOffset}px))`,
              transition: isDragging ? 'none' : 'transform 0.4s cubic-bezier(0.25, 1, 0.5, 1)'
            }}
          >
            {widgets.map((widget) => (
              <div key={`mob-${widget.id}`} className="mobile-carousel-slide">
                {renderCard(widget)}
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Navigation Controls & Pagination Dots */}
        <div className="mobile-carousel-controls">
          <button
            type="button"
            className="mobile-carousel-arrow-btn"
            onClick={handlePrev}
            aria-label="Previous service"
            title="Previous service"
          >
            <ChevronLeft size={18} />
          </button>

          <div className="mobile-carousel-dots" role="tablist" aria-label="Service carousel dots">
            {widgets.map((w, idx) => (
              <button
                key={`dot-${w.id}`}
                type="button"
                role="tab"
                className={`mobile-dot ${idx === currentIndex ? 'active' : ''}`}
                onClick={() => handleGoTo(idx)}
                aria-label={`Go to ${w.title}`}
                aria-selected={idx === currentIndex}
              />
            ))}
          </div>

          <button
            type="button"
            className="mobile-carousel-arrow-btn"
            onClick={handleNext}
            aria-label="Next service"
            title="Next service"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
}
