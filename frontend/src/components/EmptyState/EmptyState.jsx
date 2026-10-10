import React from 'react';
import { Inbox } from 'lucide-react';
import './EmptyState.css';

/**
 * Reusable EmptyState component for search, filtered queries, or empty records.
 */
export default function EmptyState({
  icon: Icon = Inbox,
  title = 'No records found',
  description = 'There are currently no items matching your criteria.',
  actionText,
  actionLabel,
  onAction,
  className = ''
}) {
  const buttonText = actionText || actionLabel;

  return (
    <div className={`arovexa-empty-state ${className}`}>
      <div className="empty-state-icon-wrap">
        <Icon size={28} className="empty-state-icon" />
      </div>
      <h3 className="empty-state-title">{title}</h3>
      <p className="empty-state-description">{description}</p>
      {buttonText && onAction && (
        <button 
          className="btn btn-secondary btn-sm empty-state-action"
          onClick={onAction}
        >
          {buttonText}
        </button>
      )}
    </div>
  );
}
