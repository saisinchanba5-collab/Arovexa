import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Lock, Mail, Activity, ArrowRight, Eye, EyeOff, ShieldCheck } from 'lucide-react';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import './Login.css';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [notice, setNotice] = useState('');
  const [errors, setErrors] = useState({});

  const validate = () => {
    const errs = {};
    if (!email.trim()) errs.email = 'Email address is required';
    if (!password) errs.password = 'Password is required';
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    // Safe frontend prototype behavior: inform user and allow previewing dashboard
    setNotice('Step 2 Architecture Notice: Frontend form validated. Click "Enter Portal Preview" below to navigate to the dashboard.');
  };

  return (
    <div className="login-page">
      <Navbar />

      <main className="login-main">
        <div className="auth-card-container">
          <div className="auth-card-header">
            <div className="auth-brand-badge">
              <Activity size={22} />
            </div>
            <h1 className="auth-title">Welcome back to AROVEXA</h1>
            <p className="auth-subtitle">Smart Healthcare Management System</p>
          </div>

          {notice && (
            <div className="auth-notice-banner">
              <ShieldCheck size={18} className="notice-icon" />
              <div className="notice-content">
                <p>{notice}</p>
                <button 
                  type="button" 
                  className="btn btn-primary btn-sm mt-2"
                  onClick={() => navigate('/dashboard')}
                >
                  Enter Portal Preview <ArrowRight size={14} />
                </button>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="auth-form-body">
            <div className="form-group">
              <label htmlFor="login-email" className="form-label">Email ID *</label>
              <div className="input-with-icon">
                <Mail size={18} className="field-icon" />
                <input
                  id="login-email"
                  type="email"
                  className={`form-input ${errors.email ? 'error' : ''}`}
                  placeholder="patient@example.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (errors.email) setErrors({ ...errors, email: null });
                  }}
                />
              </div>
              {errors.email && <span className="field-error-msg">{errors.email}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="login-password" className="form-label">Password *</label>
              <div className="input-with-icon">
                <Lock size={18} className="field-icon" />
                <input
                  id="login-password"
                  type={showPassword ? 'text' : 'password'}
                  className={`form-input ${errors.password ? 'error' : ''}`}
                  placeholder="Enter your account password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (errors.password) setErrors({ ...errors, password: null });
                  }}
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

            <button type="submit" className="btn btn-primary btn-block">
              <span>Sign In</span>
              <ArrowRight size={16} />
            </button>
          </form>

          <div className="auth-card-footer">
            <p>
              Don't have an account yet?{' '}
              <Link to="/register" className="auth-switch-link">
                Register here
              </Link>
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
