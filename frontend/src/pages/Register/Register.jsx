import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Lock, 
  Mail, 
  User, 
  Phone, 
  Activity, 
  ArrowRight, 
  Eye, 
  EyeOff, 
  ShieldCheck, 
  CheckCircle2 
} from 'lucide-react';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import './Register.css';

export default function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });

  const [showPassword, setShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [notice, setNotice] = useState('');
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: null });
    }
  };

  const validate = () => {
    const errs = {};
    if (!formData.fullName.trim()) errs.fullName = 'Full Name is required';
    if (!formData.email.trim()) errs.email = 'Email ID is required';
    if (!formData.phone.trim()) errs.phone = 'Phone Number is required';
    if (!formData.password) errs.password = 'Password is required';
    if (formData.password.length < 6) errs.password = 'Password must be at least 6 characters';
    if (formData.password !== formData.confirmPassword) {
      errs.confirmPassword = 'Passwords do not match';
    }
    if (!agreeTerms) errs.terms = 'Please accept the Terms of Service to proceed';
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    // Safe frontend-only notice
    setNotice('Step 2 Architecture Notice: Frontend registration form validated. Backend endpoints and secure authentication connect in a later phase.');
  };

  return (
    <div className="register-page">
      <Navbar />

      <main className="register-main">
        <div className="auth-card-container">
          <div className="auth-card-header">
            <div className="auth-brand-badge">
              <Activity size={22} />
            </div>
            <h1 className="auth-title">Create your AROVEXA account</h1>
            <p className="auth-subtitle">Smart Healthcare Management System</p>
          </div>

          {notice && (
            <div className="auth-notice-banner">
              <ShieldCheck size={18} className="notice-icon" />
              <p>{notice}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="auth-form-body">
            {/* 1. Full Name */}
            <div className="form-group">
              <label htmlFor="reg-name" className="form-label">Full Name *</label>
              <div className="input-with-icon">
                <User size={18} className="field-icon" />
                <input
                  id="reg-name"
                  name="fullName"
                  type="text"
                  className={`form-input ${errors.fullName ? 'error' : ''}`}
                  placeholder="Eleanor Vance"
                  value={formData.fullName}
                  onChange={handleChange}
                />
              </div>
              {errors.fullName && <span className="field-error-msg">{errors.fullName}</span>}
            </div>

            {/* 2. Email ID */}
            <div className="form-group">
              <label htmlFor="reg-email" className="form-label">Email ID *</label>
              <div className="input-with-icon">
                <Mail size={18} className="field-icon" />
                <input
                  id="reg-email"
                  name="email"
                  type="email"
                  className={`form-input ${errors.email ? 'error' : ''}`}
                  placeholder="patient@example.com"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              {errors.email && <span className="field-error-msg">{errors.email}</span>}
            </div>

            {/* 3. Phone Number (Item 21 Requirement) */}
            <div className="form-group">
              <label htmlFor="reg-phone" className="form-label">Phone Number *</label>
              <div className="input-with-icon">
                <Phone size={18} className="field-icon" />
                <input
                  id="reg-phone"
                  name="phone"
                  type="tel"
                  className={`form-input ${errors.phone ? 'error' : ''}`}
                  placeholder="+1 (555) 000-0000"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>
              {errors.phone && <span className="field-error-msg">{errors.phone}</span>}
            </div>

            {/* 4. Password */}
            <div className="form-group">
              <label htmlFor="reg-password" className="form-label">Password *</label>
              <div className="input-with-icon">
                <Lock size={18} className="field-icon" />
                <input
                  id="reg-password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  className={`form-input ${errors.password ? 'error' : ''}`}
                  placeholder="Create a strong password"
                  value={formData.password}
                  onChange={handleChange}
                />
                <button
                  type="button"
                  className="password-toggle-btn"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {errors.password && <span className="field-error-msg">{errors.password}</span>}
            </div>

            {/* 5. Confirm Password */}
            <div className="form-group">
              <label htmlFor="reg-confirm" className="form-label">Confirm Password *</label>
              <div className="input-with-icon">
                <Lock size={18} className="field-icon" />
                <input
                  id="reg-confirm"
                  name="confirmPassword"
                  type={showPassword ? 'text' : 'password'}
                  className={`form-input ${errors.confirmPassword ? 'error' : ''}`}
                  placeholder="Re-enter password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
              </div>
              {errors.confirmPassword && <span className="field-error-msg">{errors.confirmPassword}</span>}
            </div>

            {/* Terms checkbox */}
            <div className="terms-checkbox-wrap">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                />
                <span>I agree to the AROVEXA Terms of Service and Privacy Policy</span>
              </label>
              {errors.terms && <span className="field-error-msg">{errors.terms}</span>}
            </div>

            <button type="submit" className="btn btn-primary btn-block">
              <span>Create Account</span>
              <ArrowRight size={16} />
            </button>
          </form>

          <div className="auth-card-footer">
            <p>
              Already have an account?{' '}
              <Link to="/login" className="auth-switch-link">
                Sign In here
              </Link>
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
