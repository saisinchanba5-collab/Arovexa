import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';

// Layouts
import PortalLayout from '../layouts/PortalLayout/PortalLayout';

// Public Pages
import Landing from '../pages/Landing/Landing';
import Login from '../pages/Login/Login';
import Register from '../pages/Register/Register';

// Portal Pages
import Dashboard from '../pages/Dashboard/Dashboard';
import Hospitals from '../pages/Hospitals/Hospitals';
import Doctors from '../pages/Doctors/Doctors';
import Appointments from '../pages/Appointments/Appointments';
import LabTests from '../pages/LabTests/LabTests';
import Reports from '../pages/Reports/Reports';
import AIHealthAssistant from '../pages/AIHealthAssistant/AIHealthAssistant';
import FamilyHealth from '../pages/FamilyHealth/FamilyHealth';
import Profile from '../pages/Profile/Profile';
import Notifications from '../pages/Notifications/Notifications';

/**
 * 404 Not Found Page Component
 */
function NotFound() {
  return (
    <div style={{
      minHeight: '80vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem',
      textAlign: 'center'
    }}>
      <h1 style={{ fontSize: '3.5rem', fontWeight: 800, color: '#142B3A', marginBottom: '0.5rem' }}>404</h1>
      <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#142B3A', marginBottom: '1rem' }}>Page Not Found</h2>
      <p style={{ color: '#647D8C', marginBottom: '1.75rem', maxWidth: '480px' }}>
        The requested healthcare portal resource could not be found. Return to our verified home page or clinical dashboard.
      </p>
      <div style={{ display: 'flex', gap: '1rem' }}>
        <Link to="/" style={{
          padding: '0.65rem 1.25rem',
          backgroundColor: '#D9FF4F',
          color: '#142B3A',
          borderRadius: '8px',
          fontWeight: 700
        }}>
          Return Home
        </Link>
        <Link to="/dashboard" style={{
          padding: '0.65rem 1.25rem',
          backgroundColor: '#FFFFFF',
          color: '#142B3A',
          border: '1px solid rgba(20, 43, 58, 0.15)',
          borderRadius: '8px',
          fontWeight: 600
        }}>
          Go to Dashboard
        </Link>
      </div>
    </div>
  );
}

/**
 * AppRoutes Component
 * Central router configuration splitting public pages from PortalLayout views.
 */
export default function AppRoutes() {
  return (
    <Routes>
      {/* Public Pages */}
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Authenticated / Application Portal Pages (Nested in PortalLayout) */}
      <Route element={<PortalLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/hospitals" element={<Hospitals />} />
        <Route path="/doctors" element={<Doctors />} />
        <Route path="/appointments" element={<Appointments />} />
        <Route path="/lab-tests" element={<LabTests />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/ai-assistant" element={<AIHealthAssistant />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/family-health" element={<FamilyHealth />} />
        <Route path="/profile" element={<Profile />} />
      </Route>

      {/* 404 Fallback */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
