import React from 'react';
import './Badge.css';

/**
 * Reusable Badge component for clinical status, categories, and demo tags.
 * Variants: 'teal' | 'navy' | 'gold' | 'sand' | 'success' | 'warning' | 'error' | 'outline' | 'demo'
 */
export default function Badge({ 
  children, 
  variant = 'teal', 
  size = 'md',
  className = '',
  icon: Icon
}) {
  return (
    <span className={`arovexa-badge badge-${variant} badge-size-${size} ${className}`}>
      {Icon && <Icon size={size === 'sm' ? 12 : 14} className="badge-prefix-icon" />}
      <span>{children}</span>
    </span>
  );
}
