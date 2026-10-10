import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Activity, Menu, X, ArrowRight, ShieldCheck } from 'lucide-react';
import './Navbar.css';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className="arovexa-navbar">
      <div className="navbar-container">
        {/* Brand Logo */}
        <Link to="/" className="navbar-brand" onClick={closeMobileMenu}>
          <div className="brand-icon-wrapper">
            <Activity className="brand-icon" size={22} />
          </div>
          <div className="brand-text">
            <span className="brand-name">AROVEXA</span>
            <span className="brand-tagline">Smart Healthcare Management System</span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="navbar-links" aria-label="Main Navigation">
          <Link 
            to="/" 
            className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
          >
            Home
          </Link>
          <Link 
            to="/hospitals" 
            className={`nav-link ${location.pathname === '/hospitals' ? 'active' : ''}`}
          >
            Hospitals
          </Link>
          <Link 
            to="/doctors" 
            className={`nav-link ${location.pathname === '/doctors' ? 'active' : ''}`}
          >
            Doctors
          </Link>
          <Link 
            to="/dashboard" 
            className={`nav-link ${location.pathname.startsWith('/dashboard') ? 'active' : ''}`}
          >
            Dashboard
          </Link>
          <Link 
            to="/ai-assistant" 
            className={`nav-link ${location.pathname === '/ai-assistant' ? 'active' : ''}`}
          >
            AI Assistant
          </Link>
        </nav>

        {/* Authentication CTA Buttons */}
        <div className="navbar-actions">
          <Link to="/login" className="btn btn-secondary btn-sm">
            Sign In
          </Link>
          <Link to="/register" className="btn btn-primary btn-sm">
            <span>Get Started</span>
            <ArrowRight size={15} />
          </Link>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button 
          className="navbar-mobile-toggle" 
          onClick={toggleMobileMenu}
          aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="navbar-mobile-drawer">
          <nav className="mobile-nav-links">
            <Link to="/" onClick={closeMobileMenu} className="mobile-nav-link">
              Home
            </Link>
            <Link to="/hospitals" onClick={closeMobileMenu} className="mobile-nav-link">
              Hospitals
            </Link>
            <Link to="/doctors" onClick={closeMobileMenu} className="mobile-nav-link">
              Doctors
            </Link>
            <Link to="/dashboard" onClick={closeMobileMenu} className="mobile-nav-link">
              Dashboard
            </Link>
            <Link to="/ai-assistant" onClick={closeMobileMenu} className="mobile-nav-link">
              AI Assistant
            </Link>
          </nav>
          <div className="mobile-nav-actions">
            <Link to="/login" onClick={closeMobileMenu} className="btn btn-secondary btn-block">
              Sign In
            </Link>
            <Link to="/register" onClick={closeMobileMenu} className="btn btn-primary btn-block">
              Get Started
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
