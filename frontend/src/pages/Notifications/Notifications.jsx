import React, { useState } from 'react';
import { Bell, CheckCircle2, Clock, Calendar, FileText, Sparkles, Trash2 } from 'lucide-react';
import Badge from '../../components/Badge/Badge';
import EmptyState from '../../components/EmptyState/EmptyState';
import './Notifications.css';

export default function Notifications() {
  const [notifications, setNotifications] = useState([
    {
      id: 'NOTIF-1',
      title: 'Upcoming Appointment Reminder',
      description: 'Consultation with Dr. Priya Sharma is scheduled for Aug 30 at 04:00 PM EST.',
      time: '15 mins ago',
      type: 'appointment',
      read: false
    },
    {
      id: 'NOTIF-2',
      title: 'Diagnostic Lab Report Ready',
      description: 'Your Complete Blood Count (CBC) report from Metropolitan Pathology has been uploaded to your Reports Vault.',
      time: '2 hours ago',
      type: 'report',
      read: false
    },
    {
      id: 'NOTIF-3',
      title: 'Health Vitals Normal',
      description: 'Your resting heart rate and blood pressure sync from today are within ideal clinical ranges.',
      time: '1 day ago',
      type: 'health',
      read: true
    },
    {
      id: 'NOTIF-4',
      title: 'Welcome to AROVEXA Portal',
      description: 'Your verified patient profile is ready. Explore doctors, accredited hospitals, and diagnostic packages.',
      time: '3 days ago',
      type: 'system',
      read: true
    }
  ]);

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const clearAll = () => {
    setNotifications([]);
  };

  const getIcon = (type) => {
    switch (type) {
      case 'appointment': return <Calendar size={18} />;
      case 'report': return <FileText size={18} />;
      case 'health': return <Sparkles size={18} />;
      default: return <Bell size={18} />;
    }
  };

  return (
    <div className="notifications-page">
      <div className="page-header-row">
        <div>
          <span className="page-badge-pill">Account Alerts</span>
          <h1 className="page-title">Notifications & Alerts</h1>
          <p className="page-subtitle">
            Stay informed about your upcoming clinical consultations, diagnostic report arrivals, and health updates.
          </p>
        </div>

        {notifications.length > 0 && (
          <div className="notifications-header-actions">
            <button 
              type="button" 
              className="btn btn-secondary btn-sm"
              onClick={markAllAsRead}
            >
              <CheckCircle2 size={15} />
              <span>Mark All Read</span>
            </button>
            <button 
              type="button" 
              className="btn btn-secondary btn-sm"
              onClick={clearAll}
            >
              <Trash2 size={15} />
              <span>Clear All</span>
            </button>
          </div>
        )}
      </div>

      <div className="notifications-container">
        {notifications.length === 0 ? (
          <EmptyState 
            icon={Bell}
            title="No Notifications"
            description="You are all caught up! There are no unread alerts or notifications at this time."
          />
        ) : (
          <div className="notifications-list">
            {notifications.map((n) => (
              <div key={n.id} className={`notification-item ${n.read ? 'read' : 'unread'}`}>
                <div className={`notification-icon-box ${n.type}`}>
                  {getIcon(n.type)}
                </div>
                <div className="notification-content">
                  <div className="notification-top">
                    <h3 className="notification-title">{n.title}</h3>
                    <div className="notification-meta">
                      {!n.read && <Badge variant="teal" size="sm">New</Badge>}
                      <span className="notification-time">
                        <Clock size={12} />
                        <span>{n.time}</span>
                      </span>
                    </div>
                  </div>
                  <p className="notification-desc">{n.description}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
