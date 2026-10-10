import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Building2, 
  Stethoscope, 
  Calendar, 
  FlaskConical, 
  FileText, 
  Sparkles,
  Users,
  UserCircle,
  Activity,
  PanelLeftClose,
  PanelLeftOpen,
  X,
  LogOut,
  Bell
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import './Sidebar.css';

/**
 * Sliding Responsive Sidebar Component
 * Supports:
 * - Desktop expanded (labels + icons) vs collapsed (icons only)
 * - Mobile slide-in drawer with backdrop overlay
 * - Signature lime active state (#D9FF4F) with dark navy typography
 */
export default function Sidebar({ 
  isOpen, 
  onClose, 
  isCollapsed = false, 
  onToggleCollapse 
}) {
  const { patient, logout } = useAuth();

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Hospitals', path: '/hospitals', icon: Building2 },
    { name: 'Doctors', path: '/doctors', icon: Stethoscope },
    { name: 'Appointments', path: '/appointments', icon: Calendar },
    { name: 'Lab Tests', path: '/lab-tests', icon: FlaskConical },
    { name: 'Medical Reports', path: '/reports', icon: FileText },
    { name: 'AI Assistant', path: '/ai-assistant', icon: Sparkles, badge: 'Smart' },
    { name: 'Notifications', path: '/notifications', icon: Bell, badge: '2' },
    { name: 'Family Health', path: '/family-health', icon: Users },
    { name: 'Profile / Settings', path: '/profile', icon: UserCircle }
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div 
          className="sidebar-backdrop" 
          onClick={onClose} 
          aria-label="Close sidebar backdrop"
        />
      )}

      <aside 
        className={`arovexa-sidebar ${isOpen ? 'mobile-open' : ''} ${isCollapsed ? 'collapsed' : ''}`}
        aria-label="Main Portal Navigation"
      >
        {/* Sidebar Header */}
        <div className="sidebar-header">
          <NavLink to="/" className="sidebar-brand-link" title="AROVEXA Portal Home">
            <div className="sidebar-logo-square">
              <Activity size={20} />
            </div>
            {!isCollapsed && (
              <div className="sidebar-brand-text">
                <span className="brand-title">AROVEXA</span>
                <span className="brand-tag">Portal</span>
              </div>
            )}
          </NavLink>

          {/* Mobile Close Button */}
          <button 
            type="button"
            className="sidebar-mobile-close" 
            onClick={onClose} 
            aria-label="Close menu"
          >
            <X size={20} />
          </button>

          {/* Desktop Collapse / Expand Toggle Button */}
          {onToggleCollapse && (
            <button
              type="button"
              className={`sidebar-desktop-toggle ${isCollapsed ? 'collapsed-expand-btn' : ''}`}
              onClick={onToggleCollapse}
              title={isCollapsed ? 'Expand Navigation Sidebar' : 'Collapse Sidebar'}
              aria-label={isCollapsed ? 'Expand Navigation Sidebar' : 'Collapse Sidebar'}
            >
              {isCollapsed ? <PanelLeftOpen size={17} /> : <PanelLeftClose size={18} />}
            </button>
          )}
        </div>

        {/* Navigation List */}
        <nav className="sidebar-nav">
          {!isCollapsed && <div className="sidebar-section-title">Navigation</div>}
          <ul className="sidebar-menu">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.path} className="sidebar-menu-item">
                  <NavLink
                    to={item.path}
                    onClick={() => {
                      if (onClose) onClose();
                    }}
                    title={isCollapsed ? item.name : undefined}
                    className={({ isActive }) =>
                      `sidebar-nav-item ${isActive ? 'active' : ''}`
                    }
                  >
                    <Icon size={19} className="nav-item-icon" />
                    {!isCollapsed && (
                      <>
                        <span className="nav-item-label">{item.name}</span>
                        {item.badge && (
                          <span className="nav-smart-badge">{item.badge}</span>
                        )}
                      </>
                    )}
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Sidebar Footer */}
        <div className="sidebar-footer-area">
          {!isCollapsed ? (
            <div className="sidebar-user-preview">
              <div className="sidebar-avatar-circle">{patient?.avatar || 'EV'}</div>
              <div className="sidebar-user-meta">
                <span className="sidebar-user-name">{patient?.name || 'Eleanor Vance'}</span>
                <span className="sidebar-user-role">Verified Patient</span>
              </div>
            </div>
          ) : (
            <div className="sidebar-avatar-circle collapsed-avatar" title={patient?.name || 'Patient Account'}>
              {patient?.avatar || 'EV'}
            </div>
          )}

          <NavLink 
            to="/login" 
            className="sidebar-logout-shortcut" 
            title="Sign out to Login"
            onClick={logout}
          >
            <LogOut size={16} />
            {!isCollapsed && <span>Logout</span>}
          </NavLink>
        </div>
      </aside>
    </>
  );
}

