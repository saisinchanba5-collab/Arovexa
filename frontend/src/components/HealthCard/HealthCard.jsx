import React from 'react';
import './HealthCard.css';

/**
 * Reusable HealthCard Component
 * Consistent white surface card for metrics, features, listings, and summary stats.
 */
export default function HealthCard({
  title,
  subtitle,
  icon: Icon,
  value,
  badge,
  badgeType = 'default',
  trend,
  className = '',
  children,
  onClick
}) {
  const isClickable = Boolean(onClick);

  return (
    <div 
      className={`arovexa-health-card ${isClickable ? 'clickable' : ''} ${className}`}
      onClick={onClick}
      role={isClickable ? 'button' : undefined}
      tabIndex={isClickable ? 0 : undefined}
    >
      {/* Header section if title, icon, or badge is present */}
      {(title || Icon || badge) && (
        <div className="health-card-header">
          <div className="header-left">
            {Icon && (
              <div className="health-card-icon-wrap">
                <Icon size={20} className="health-card-icon" />
              </div>
            )}
            <div className="header-titles">
              {title && <h3 className="health-card-title">{title}</h3>}
              {subtitle && <p className="health-card-subtitle">{subtitle}</p>}
            </div>
          </div>
          {badge && (
            <span className={`health-card-badge badge-${badgeType}`}>
              {badge}
            </span>
          )}
        </div>
      )}

      {/* Primary metric/value display if passed */}
      {value !== undefined && (
        <div className="health-card-value-wrap">
          <span className="health-card-value">{value}</span>
          {trend && <span className="health-card-trend">{trend}</span>}
        </div>
      )}

      {/* Custom children content */}
      {children && (
        <div className="health-card-body">
          {children}
        </div>
      )}
    </div>
  );
}
