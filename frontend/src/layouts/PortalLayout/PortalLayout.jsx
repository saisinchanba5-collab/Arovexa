import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Outlet, useLocation, useNavigate, Link } from 'react-router-dom';
import { 
  Menu, 
  Search, 
  User, 
  LogOut, 
  Settings,
  PanelLeftClose,
  PanelLeftOpen,
  X,
  Activity,
  ChevronDown
} from 'lucide-react';
import Sidebar from '../../components/Sidebar/Sidebar';
import Footer from '../../components/Footer/Footer';
import AIChatWidget from '../../components/AIChatWidget/AIChatWidget';
import { useAuth } from '../../context/AuthContext';
import { SAMPLE_HOSPITALS, SAMPLE_DOCTORS, SAMPLE_LAB_TESTS, SAMPLE_REPORTS } from '../../data/mockData';
import './PortalLayout.css';

export default function PortalLayout() {
  const { patient, logout } = useAuth();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [accountDropdownOpen, setAccountDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchCategory, setSearchCategory] = useState('All');
  const [searchDropdownOpen, setSearchDropdownOpen] = useState(false);

  const dropdownRef = useRef(null);
  const avatarButtonRef = useRef(null);
  const searchContainerRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  // Helper to resolve dynamic breadcrumbs based on route and query params
  const getBreadcrumbs = () => {
    const path = location.pathname.replace('/', '');
    const params = new URLSearchParams(location.search);

    const crumbs = [
      { label: 'Home', path: '/dashboard', isClickable: true }
    ];

    switch (path) {
      case 'dashboard':
        crumbs.push({ label: 'Dashboard', isCurrent: true });
        break;

      case 'hospitals': {
        const hospId = params.get('hospital');
        const hospital = hospId ? SAMPLE_HOSPITALS.find((h) => h.id === hospId) : null;
        if (hospital) {
          crumbs.push({ label: 'Hospitals', path: '/hospitals', isClickable: true });
          crumbs.push({ label: hospital.name, isCurrent: true });
        } else {
          crumbs.push({ label: 'Hospitals', isCurrent: true });
        }
        break;
      }

      case 'doctors': {
        const docId = params.get('doctor');
        const doctor = docId ? SAMPLE_DOCTORS.find((d) => d.id === docId) : null;
        if (doctor) {
          crumbs.push({ label: 'Doctors', path: '/doctors', isClickable: true });
          crumbs.push({ label: doctor.name, isCurrent: true });
        } else {
          crumbs.push({ label: 'Doctors', isCurrent: true });
        }
        break;
      }

      case 'appointments': {
        const aptId = params.get('apt');
        if (aptId) {
          crumbs.push({ label: 'Appointments', path: '/appointments', isClickable: true });
          crumbs.push({ label: 'Appointment Details', isCurrent: true });
        } else {
          crumbs.push({ label: 'Appointments', isCurrent: true });
        }
        break;
      }

      case 'lab-tests': {
        const testId = params.get('test');
        const test = testId ? SAMPLE_LAB_TESTS.find((t) => t.id === testId) : null;
        if (test) {
          crumbs.push({ label: 'Lab Tests', path: '/lab-tests', isClickable: true });
          crumbs.push({ label: test.name, isCurrent: true });
        } else {
          crumbs.push({ label: 'Lab Tests', isCurrent: true });
        }
        break;
      }

      case 'reports': {
        const repId = params.get('report');
        const report = repId ? (SAMPLE_REPORTS || []).find((r) => r.id === repId) : null;
        if (report) {
          crumbs.push({ label: 'Medical Reports', path: '/reports', isClickable: true });
          crumbs.push({ label: report.title, isCurrent: true });
        } else {
          crumbs.push({ label: 'Medical Reports', isCurrent: true });
        }
        break;
      }

      case 'ai-assistant':
        crumbs.push({ label: 'AI Assistant', isCurrent: true });
        break;

      case 'family-health':
        crumbs.push({ label: 'Family Health', isCurrent: true });
        break;

      case 'profile':
        crumbs.push({ label: 'Profile', isCurrent: true });
        break;

      case 'notifications':
        crumbs.push({ label: 'Notifications', isCurrent: true });
        break;

      default:
        crumbs.push({ label: 'Portal', isCurrent: true });
        break;
    }

    return crumbs;
  };

  // Live Header Search Query across Demo Data & Categories
  const searchResults = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return [];

    const results = [];

    // 1. Match Doctors
    if (searchCategory === 'All' || searchCategory === 'Doctors') {
      SAMPLE_DOCTORS.forEach((d) => {
        if (d.name.toLowerCase().includes(q) || d.specialty.toLowerCase().includes(q) || d.hospitalName.toLowerCase().includes(q)) {
          results.push({
            id: d.id,
            title: d.name,
            subtitle: `${d.specialty} • ${d.hospitalName}`,
            type: 'Doctor',
            badgeClass: 'badge-teal-tag',
            path: `/doctors?doctor=${d.id}`
          });
        }
      });
    }

    // 2. Match Hospitals
    if (searchCategory === 'All' || searchCategory === 'Hospitals') {
      SAMPLE_HOSPITALS.forEach((h) => {
        if (h.name.toLowerCase().includes(q) || h.city.toLowerCase().includes(q) || h.type.toLowerCase().includes(q)) {
          results.push({
            id: h.id,
            title: h.name,
            subtitle: `${h.type} • ${h.city}`,
            type: 'Hospital',
            badgeClass: 'badge-navy-tag',
            path: `/hospitals?hospital=${h.id}`
          });
        }
      });
    }

    // 3. Match Lab Tests
    if (searchCategory === 'All' || searchCategory === 'Lab Tests') {
      SAMPLE_LAB_TESTS.forEach((t) => {
        if (t.name.toLowerCase().includes(q) || t.category.toLowerCase().includes(q) || t.parameters.toLowerCase().includes(q)) {
          results.push({
            id: t.id,
            title: t.name,
            subtitle: `${t.category} • ${t.price}`,
            type: 'Lab Test',
            badgeClass: 'badge-lavender-tag',
            path: `/lab-tests?test=${t.id}`
          });
        }
      });
    }

    // 4. Match Reports
    if (searchCategory === 'All' || searchCategory === 'Reports') {
      (SAMPLE_REPORTS || []).forEach((r) => {
        if (r.title.toLowerCase().includes(q) || r.lab.toLowerCase().includes(q) || r.status.toLowerCase().includes(q)) {
          results.push({
            id: r.id,
            title: r.title,
            subtitle: `${r.lab} • ${r.date}`,
            type: 'Report',
            badgeClass: 'badge-ice-tag',
            path: `/reports?report=${r.id}`
          });
        }
      });
    }

    // 5. Match Portal Pages (only if category is All)
    if (searchCategory === 'All') {
      const pages = [
        { id: 'p-doc', title: 'Specialist Doctors', type: 'Page', badgeClass: 'badge-mint-tag', path: '/doctors', match: ['doctor', 'physician', 'specialist', 'dr'] },
        { id: 'p-hosp', title: 'Hospitals & Medical Centers', type: 'Page', badgeClass: 'badge-mint-tag', path: '/hospitals', match: ['hospital', 'center', 'clinic', 'emergency'] },
        { id: 'p-apt', title: 'Appointments & Scheduling', type: 'Page', badgeClass: 'badge-mint-tag', path: '/appointments', match: ['appointment', 'booking', 'schedule'] },
        { id: 'p-lab', title: 'Diagnostic Lab Tests', type: 'Page', badgeClass: 'badge-mint-tag', path: '/lab-tests', match: ['lab', 'test', 'blood', 'screening'] },
        { id: 'p-rep', title: 'Medical Reports & Records', type: 'Page', badgeClass: 'badge-mint-tag', path: '/reports', match: ['report', 'record', 'vault', 'pdf'] },
        { id: 'p-ai', title: 'AI Health Assistant', type: 'Page', badgeClass: 'badge-mint-tag', path: '/ai-assistant', match: ['ai', 'assistant', 'bot', 'chat'] },
        { id: 'p-fam', title: 'Family Health Profiles', type: 'Page', badgeClass: 'badge-mint-tag', path: '/family-health', match: ['family', 'member', 'dependent'] }
      ];

      pages.forEach((p) => {
        if (p.title.toLowerCase().includes(q) || p.match.some((m) => m.includes(q) || q.includes(m))) {
          results.push({ ...p, subtitle: `Navigate to ${p.title}` });
        }
      });
    }

    return results.slice(0, 8); // Top 8 matching results
  }, [searchQuery, searchCategory]);

  const handleSelectSearchResult = (result) => {
    navigate(result.path, { state: { selectedId: result.id, itemType: result.type } });
    setSearchQuery('');
    setSearchDropdownOpen(false);

    // Blur active element to remove text selection
    if (document.activeElement && document.activeElement.blur) {
      document.activeElement.blur();
    }
  };

  // Close dropdowns on click outside or Escape
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current && 
        !dropdownRef.current.contains(event.target) &&
        avatarButtonRef.current &&
        !avatarButtonRef.current.contains(event.target)
      ) {
        setAccountDropdownOpen(false);
      }

      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target)
      ) {
        setSearchDropdownOpen(false);
      }
    };

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setAccountDropdownOpen(false);
        setSearchDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Logout handler navigates UI directly to /login
  const handleLogout = async () => {
    setAccountDropdownOpen(false);
    if (logout) await logout();
    navigate('/login');
  };

  return (
    <div className="portal-layout">
      {/* Sliding / Collapsible Navigation Sidebar */}
      <Sidebar 
        isOpen={mobileSidebarOpen} 
        onClose={() => setMobileSidebarOpen(false)}
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
      />

      {/* Main Viewport */}
      <div className="portal-main-wrapper">
        {/* Top Header Shell */}
        <header className="portal-topbar" role="banner">
          <div className="portal-topbar-left">
            {/* Mobile Hamburger Trigger */}
            <button 
              type="button"
              className="portal-mobile-menu-trigger" 
              onClick={() => setMobileSidebarOpen(true)}
              aria-label="Open portal navigation menu"
            >
              <Menu size={22} />
            </button>

            {/* Desktop Expand Navigation Button when Collapsed */}
            {isSidebarCollapsed && (
              <button
                type="button"
                className="portal-desktop-expand-btn"
                onClick={() => setIsSidebarCollapsed(false)}
                title="Expand Navigation (Sidebar)"
                aria-label="Expand Navigation (Sidebar)"
              >
                <PanelLeftOpen size={16} />
                <span className="expand-btn-text">Navigation</span>
              </button>
            )}

            {/* Top-left Branding */}
            <Link to="/" className="portal-topbar-brand" title="AROVEXA Portal Home">
              <div className="topbar-brand-icon">
                <Activity size={18} />
              </div>
              <span className="topbar-brand-name">AROVEXA</span>
            </Link>
          </div>

          {/* Topbar Center: Quick Header Search Bar */}
          <div className="portal-topbar-center">
            {/* Quick Header Search Bar with "All" Category Selector & Live Suggestions */}
            <div className="portal-quick-search" ref={searchContainerRef}>
              {/* Category Selector */}
              <div className="search-category-pill">
                <select
                  className="search-category-select"
                  value={searchCategory}
                  onChange={(e) => setSearchCategory(e.target.value)}
                  aria-label="Filter search category"
                >
                  <option value="All">All</option>
                  <option value="Doctors">Doctors</option>
                  <option value="Hospitals">Hospitals</option>
                  <option value="Lab Tests">Lab Tests</option>
                  <option value="Reports">Reports</option>
                </select>
                <ChevronDown size={13} className="search-category-arrow" />
              </div>

              <div className="search-inner-divider" />

              {/* Input Area */}
              <div className="search-input-field-wrap">
                <Search size={15} className="quick-search-icon" />
                <input
                  type="text"
                  placeholder={
                    searchCategory === 'All' 
                      ? 'Search doctors, hospitals, tests, reports...' 
                      : `Search in ${searchCategory}...`
                  }
                  className="quick-search-input"
                  aria-label="Search portal resources"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setSearchDropdownOpen(true);
                  }}
                  onFocus={() => {
                    if (searchQuery.trim()) setSearchDropdownOpen(true);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      if (searchResults.length > 0) {
                        handleSelectSearchResult(searchResults[0]);
                      } else if (searchCategory === 'Doctors') {
                        navigate('/doctors');
                        setSearchDropdownOpen(false);
                      } else if (searchCategory === 'Hospitals') {
                        navigate('/hospitals');
                        setSearchDropdownOpen(false);
                      } else if (searchCategory === 'Lab Tests') {
                        navigate('/lab-tests');
                        setSearchDropdownOpen(false);
                      } else if (searchCategory === 'Reports') {
                        navigate('/reports');
                        setSearchDropdownOpen(false);
                      }
                    }
                  }}
                />

                {searchQuery.trim() && (
                  <button
                    type="button"
                    className="quick-search-clear-btn"
                    onClick={() => {
                      setSearchQuery('');
                      setSearchDropdownOpen(false);
                    }}
                    aria-label="Clear search text"
                  >
                    <X size={14} />
                  </button>
                )}
              </div>

              {/* Suggestions Dropdown */}
              {searchDropdownOpen && searchQuery.trim() && (
                <div className="portal-search-dropdown" role="listbox">
                  {searchResults.length > 0 ? (
                    <div className="search-results-list">
                      <div className="search-results-header">
                        <span>Found {searchResults.length} results ({searchCategory})</span>
                      </div>
                      {searchResults.map((item) => (
                        <div
                          key={`${item.type}-${item.id}`}
                          className="search-result-row"
                          onMouseDown={(e) => {
                            e.preventDefault();
                            handleSelectSearchResult(item);
                          }}
                          role="option"
                        >
                          <div className="search-result-meta">
                            <span className="search-item-title">{item.title}</span>
                            {item.subtitle && (
                              <span className="search-item-sub">{item.subtitle}</span>
                            )}
                          </div>
                          <span className={`search-item-badge ${item.badgeClass || ''}`}>
                            {item.type}
                          </span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="search-no-results">
                      <Search size={20} className="no-res-icon" />
                      <div className="no-res-text-col">
                        <span className="no-res-title">No matching results</span>
                        <span className="no-res-desc">
                          No {searchCategory === 'All' ? 'items' : searchCategory.toLowerCase()} match "{searchQuery}".
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="portal-topbar-right">
            {/* Clickable Patient Account Avatar ONLY (Requirement 2) */}
            <div className="portal-account-wrapper">
              <button
                type="button"
                ref={avatarButtonRef}
                className={`portal-avatar-btn ${accountDropdownOpen ? 'active' : ''}`}
                onClick={() => setAccountDropdownOpen(!accountDropdownOpen)}
                aria-expanded={accountDropdownOpen}
                aria-haspopup="true"
                aria-label="Toggle patient account menu"
                title={patient?.name || 'Patient Account'}
              >
                <span className="portal-avatar-text">{patient?.avatar || 'EV'}</span>
              </button>

              {/* Clean Account Dropdown Menu */}
              {accountDropdownOpen && (
                <div 
                  className="portal-account-dropdown" 
                  ref={dropdownRef}
                  role="menu"
                  aria-label="Patient Account Options"
                >
                  <div className="dropdown-profile-header">
                    <div className="dropdown-avatar-lg">{patient?.avatar || 'EV'}</div>
                    <div className="dropdown-user-info">
                      <h4 className="dropdown-user-name">{patient?.name || 'Eleanor Vance'}</h4>
                      <p className="dropdown-user-email">{patient?.email || 'patient@example.com'}</p>
                    </div>
                  </div>

                  <div className="dropdown-divider" />

                  <ul className="dropdown-menu-list">
                    <li>
                      <Link 
                        to="/profile" 
                        className="dropdown-menu-item"
                        onClick={() => setAccountDropdownOpen(false)}
                        role="menuitem"
                      >
                        <User size={16} />
                        <span>Profile</span>
                      </Link>
                    </li>
                    <li>
                      <Link 
                        to="/profile" 
                        className="dropdown-menu-item"
                        onClick={() => setAccountDropdownOpen(false)}
                        role="menuitem"
                      >
                        <Settings size={16} />
                        <span>Settings</span>
                      </Link>
                    </li>
                    <li className="dropdown-menu-divider" />
                    <li>
                      <button 
                        type="button" 
                        className="dropdown-menu-item logout-item"
                        onClick={handleLogout}
                        role="menuitem"
                      >
                        <LogOut size={16} />
                        <span>Logout</span>
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Dedicated Breadcrumb Navigation Bar */}
        <div className="portal-breadcrumbs-bar" role="navigation" aria-label="Breadcrumb path">
          <div className="portal-breadcrumbs-inner">
            <nav className="portal-breadcrumbs" aria-label="Breadcrumb navigation">
              {getBreadcrumbs().map((crumb, idx) => (
                <React.Fragment key={`${crumb.label}-${idx}`}>
                  {idx > 0 && <span className="breadcrumb-separator" aria-hidden="true">/</span>}
                  {crumb.isClickable && crumb.path ? (
                    <Link to={crumb.path} className="breadcrumb-link" title={`Navigate to ${crumb.label}`}>
                      {crumb.label}
                    </Link>
                  ) : (
                    <span 
                      className={`breadcrumb-text ${crumb.isCurrent ? 'breadcrumb-current' : ''}`}
                      aria-current={crumb.isCurrent ? 'page' : undefined}
                      title={crumb.label}
                    >
                      {crumb.label}
                    </span>
                  )}
                </React.Fragment>
              ))}
            </nav>
          </div>
        </div>

        {/* Dynamic Nested Page Content Area */}
        <main className="portal-content-area" id="main-content">
          <Outlet />
        </main>

        {/* Global Consistent Footer */}
        <Footer />

        {/* Floating AI Chatbot Assistant */}
        <AIChatWidget />
      </div>
    </div>
  );
}
