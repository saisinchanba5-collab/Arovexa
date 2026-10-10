import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Building2, 
  Stethoscope, 
  Calendar, 
  FlaskConical, 
  FileText, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  ShieldCheck, 
  Heart, 
  Users, 
  Activity,
  Search,
  Clock
} from 'lucide-react';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import './Landing.css';

export default function Landing() {
  const coreFeatures = [
    {
      title: 'Hospitals Directory',
      tag: '5 Verified Centers',
      icon: Building2,
      desc: 'Browse accredited multi-specialty healthcare institutions and 24/7 trauma care facilities.',
      path: '/hospitals'
    },
    {
      title: 'Specialist Physicians',
      tag: '25 Top Doctors',
      icon: Stethoscope,
      desc: 'Connect with board-certified physicians, surgeons, pediatricians, and cardiologists.',
      path: '/doctors'
    },
    {
      title: 'Clinical Appointments',
      tag: 'Instant Slots',
      icon: Calendar,
      desc: 'Book in-person hospital consultations and telehealth slots in seconds with clear fee transparency.',
      path: '/appointments'
    },
    {
      title: 'Diagnostic Lab Tests',
      tag: 'Home Sample Collection',
      icon: FlaskConical,
      desc: 'Schedule metabolic panels, lipid profiles, and blood tests with doorstep phlebotomy.',
      path: '/lab-tests'
    },
    {
      title: 'Medical Health Records',
      tag: 'Encrypted Vault',
      icon: FileText,
      desc: 'Consolidate pathology reports, prescriptions, and radiology scans in a secure repository.',
      path: '/reports'
    },
    {
      title: 'AI Health Intelligence',
      tag: 'Smart Assistant',
      icon: Sparkles,
      desc: 'Receive plain-language explanations of medical reports and general health guidance.',
      path: '/ai-assistant'
    }
  ];

  return (
    <div className="landing-page">
      <Navbar />

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-container">
          <div className="hero-content">
            <div className="hero-badge">
              <Activity size={16} />
              <span>Modern Digital Healthcare Coordination</span>
            </div>

            <h1 className="hero-title">
              Healthcare made simpler for you.
            </h1>

            <p className="hero-description">
              Find verified multi-specialty hospitals, book board-certified specialist physicians, schedule doorstep lab tests, and access intelligent health assistance—all in one unified patient portal.
            </p>

            <div className="hero-actions">
              <Link to="/register" className="btn btn-primary btn-lg">
                <span>Get Started Free</span>
                <ArrowRight size={18} />
              </Link>
              <Link to="/dashboard" className="btn btn-secondary btn-lg">
                <span>Explore Portal Preview</span>
              </Link>
            </div>

            {/* Trust Markers */}
            <div className="hero-trust-bar">
              <div className="trust-item">
                <CheckCircle2 size={16} className="trust-check" />
                <span>5 Premier Hospitals</span>
              </div>
              <div className="trust-item">
                <CheckCircle2 size={16} className="trust-check" />
                <span>25 Specialist Doctors</span>
              </div>
              <div className="trust-item">
                <CheckCircle2 size={16} className="trust-check" />
                <span>Doorstep Lab Tests</span>
              </div>
            </div>
          </div>

          {/* Hero Visual Card */}
          <div className="hero-visual-col">
            <div className="hero-portal-mockup-card">
              <div className="mockup-header">
                <div className="mockup-avatar">P</div>
                <div>
                  <h3 className="mockup-greeting">Good Morning, Patient 👋</h3>
                  <span className="mockup-sub">Your Healthcare Overview</span>
                </div>
                <span className="mockup-pill">Demo Preview</span>
              </div>

              <div className="mockup-metrics-grid">
                <div className="mockup-metric-tile coral">
                  <span className="mock-label">Heart Rate</span>
                  <strong className="mock-val">72 BPM</strong>
                  <span className="mock-sub">Optimal Rhythm</span>
                </div>
                <div className="mockup-metric-tile ice">
                  <span className="mock-label">Blood Pressure</span>
                  <strong className="mock-val">118/76</strong>
                  <span className="mock-sub">Ideal Pressure</span>
                </div>
                <div className="mockup-metric-tile mint">
                  <span className="mock-label">SpO₂</span>
                  <strong className="mock-val">98%</strong>
                  <span className="mock-sub">Optimal Saturation</span>
                </div>
                <div className="mockup-metric-tile highlight">
                  <span className="mock-label">Steps</span>
                  <strong className="mock-val">6,542</strong>
                  <span className="mock-sub">Daily Track</span>
                </div>
              </div>

              <div className="mockup-next-apt">
                <div className="mock-apt-icon">
                  <Calendar size={18} />
                </div>
                <div className="mock-apt-info">
                  <span className="mock-apt-title">Dr. Priya Sharma • Cardiologist</span>
                  <span className="mock-apt-time">30 Aug • 4:00 PM • Apollo Hospitals</span>
                </div>
                <span className="mock-badge">Upcoming</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Highlights Section */}
      <section className="landing-services-section">
        <div className="services-container">
          <div className="services-header-center">
            <span className="services-subheading">Comprehensive Services</span>
            <h2 className="services-main-title">Everything You Need for Coordinated Healthcare</h2>
            <p className="services-lead">
              A unified digital ecosystem linking patient discovery, provider booking, diagnostics, and secure records.
            </p>
          </div>

          <div className="services-grid-landing">
            {coreFeatures.map((feat) => {
              const Icon = feat.icon;
              return (
                <div key={feat.title} className="service-feature-card">
                  <div className="service-card-top-row">
                    <div className="service-icon-wrap">
                      <Icon size={22} />
                    </div>
                    <span className="service-tag-pill">{feat.tag}</span>
                  </div>

                  <h3 className="service-card-title">{feat.title}</h3>
                  <p className="service-card-desc">{feat.desc}</p>

                  <Link to={feat.path} className="service-card-link">
                    <span>Explore Service</span>
                    <ArrowRight size={14} />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* AI Assistant Showcase Section */}
      <section className="landing-ai-section">
        <div className="ai-showcase-container">
          <div className="ai-showcase-card">
            <div className="ai-badge-header">
              <Sparkles size={16} />
              <span>Intelligent Health Assistance</span>
            </div>
            <h2 className="ai-showcase-title">AI-Assisted Report Explanation & Health Inquiries</h2>
            <p className="ai-showcase-desc">
              Understand clinical terminology, prepare for doctor appointments, and upload diagnostic reports for automated educational explanations.
            </p>

            <div className="ai-disclaimer-notice">
              <ShieldCheck size={16} />
              <span>AI-generated health information is informational and not a medical diagnosis.</span>
            </div>

            <div className="ai-showcase-actions">
              <Link to="/ai-assistant" className="btn btn-primary">
                <span>Explore AI Assistant</span>
                <ArrowRight size={16} />
              </Link>
              <Link to="/reports" className="btn btn-secondary">
                <span>View Medical Records Vault</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
