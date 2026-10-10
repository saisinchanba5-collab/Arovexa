import React from 'react';
import { Link } from 'react-router-dom';
import { Activity, ShieldCheck, Heart } from 'lucide-react';
import './Footer.css';

/**
 * Reusable Global Footer Component
 * Displayed consistently across public landing, auth, and portal layouts.
 */
export default function Footer() {
  const portalLinks = [
    { name: 'Hospitals', path: '/hospitals' },
    { name: 'Doctors', path: '/doctors' },
    { name: 'Appointments', path: '/appointments' },
    { name: 'Lab Tests', path: '/lab-tests' },
    { name: 'Reports', path: '/reports' },
    { name: 'AI Assistant', path: '/ai-assistant' },
    { name: 'Family Health', path: '/family-health' }
  ];

  return (
    <footer className="arovexa-global-footer">
      <div className="footer-content-wrap">
        {/* Brand Col */}
        <div className="footer-brand-section">
          <div className="footer-brand-header">
            <div className="footer-brand-icon">
              <Activity size={20} />
            </div>
            <span className="footer-brand-title">AROVEXA</span>
          </div>
          <p className="footer-tagline">Smart Healthcare Management System</p>
          <p className="footer-subtext">
            Modern digital healthcare coordination platform connecting patients, verified hospitals, specialists, diagnostics, and clinical intelligence.
          </p>
          <div className="footer-hipaa-pill">
            <ShieldCheck size={14} />
            <span>Secure Patient Portal Architecture</span>
          </div>
        </div>

        {/* Links Col */}
        <div className="footer-nav-section">
          <h4 className="footer-nav-heading">Useful Services & Tools</h4>
          <ul className="footer-nav-list">
            {portalLinks.map((link) => (
              <li key={link.path}>
                <Link to={link.path} className="footer-link">
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="footer-bottom-bar">
        <div className="footer-bottom-inner">
          <p className="footer-disclaimer-note">
            <strong>Clinical Notice:</strong> AROVEXA displays verified informational health resources and sample preview records. It does not replace emergency clinical triage or doctor evaluations.
          </p>
          <div className="footer-copyright-row">
            <span>© 2026 AROVEXA. All rights reserved.</span>
            <span className="footer-care-tag">
              Crafted for simpler, better healthcare
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
