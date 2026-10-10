import React from 'react';
import { Search, X } from 'lucide-react';
import './SearchBar.css';

/**
 * Reusable SearchBar component with quick clear button
 */
export default function SearchBar({
  value,
  onChange,
  onClear,
  placeholder = 'Search...',
  className = '',
  disabled = false
}) {
  return (
    <div className={`arovexa-search-bar ${className}`}>
      <Search size={18} className="search-bar-icon" />
      <input
        type="text"
        className="search-bar-input"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
      />
      {value && onClear && (
        <button 
          type="button" 
          className="search-bar-clear-btn" 
          onClick={onClear}
          aria-label="Clear search input"
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
}
