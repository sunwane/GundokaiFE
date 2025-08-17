'use client';
import React, { useState } from 'react';

interface SearchBarProps {
  placeholder?: string;
  onSearch?: (searchTerm: string) => void;
  onSearchChange?: (searchTerm: string) => void;
  className?: string;
  style?: React.CSSProperties;
  isCompact?: boolean; // ✅ Add compact mode
}

function SearchBar({ 
  placeholder = "Tìm kiếm sản phẩm...",
  onSearch,
  onSearchChange,
  className,
  style,
  isCompact = false // ✅ Default false
}: SearchBarProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    
    // Real-time search while typing
    if (onSearchChange) {
      onSearchChange(value);
    }
  };

  const handleSearch = () => {
    if (onSearch && searchTerm.trim()) {
      onSearch(searchTerm.trim());
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleClear = () => {
    setSearchTerm('');
    if (onSearchChange) {
      onSearchChange('');
    }
  };

  // ✅ Dynamic styles based on compact mode
  const containerStyles = isCompact ? styles.compactContainer : styles.container;
  const inputWrapperStyles = isCompact ? styles.compactInputWrapper : styles.inputWrapper;
  const inputStyles = isCompact ? styles.compactInput : styles.input;
  const searchButtonStyles = isCompact ? styles.compactSearchButton : styles.searchButton;
  const searchIconStyles = isCompact ? styles.compactSearchIcon : styles.searchIcon;

  return (
    <div style={{ ...containerStyles, ...style }} className={className}>
      <div style={inputWrapperStyles}>
        <input
          type="text"
          value={searchTerm}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          placeholder={isCompact ? "Tìm kiếm..." : placeholder} // ✅ Shorter placeholder
          style={inputStyles}
        />
        
        {/* Clear button - Hide in very compact mode */}
        {searchTerm && !isCompact && (
          <button
            onClick={handleClear}
            style={styles.clearButton}
            type="button"
          >
            ×
          </button>
        )}
        
        {/* Search button */}
        <button
          onClick={handleSearch}
          style={searchButtonStyles}
          type="button"
        >
          <img 
            src="/images/icons/searchIcon.png" 
            alt="search" 
            style={searchIconStyles}
          />
        </button>
      </div>
    </div>
  );
}

const styles = {
  // ✅ Desktop styles
  container: {
    flexGrow: 1,
    alignItems: 'center',
    margin: '0 clamp(0px, 2vw, 50px)',
    minWidth: '200px', // ✅ Minimum width
  },
  inputWrapper: {
    position: 'relative' as const,
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#fff',
    border: '1.5px solid #00274A',
    borderRadius: '20px',
    overflow: 'hidden',
    transition: 'border-color 0.2s ease',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    height: '50px',
  },
  input: {
    flex: 1,
    padding: '8px 18px',
    border: 'none',
    outline: 'none',
    fontSize: '15px',
    color: '#333',
    backgroundColor: 'transparent',
    fontFamily: 'inherit',
  },
  
  // ✅ Compact styles for mobile
  compactContainer: {
    flexGrow: 1,
    alignItems: 'center',
    margin: '0',
    minWidth: '80px', // ✅ Much smaller minimum
  },
  compactInputWrapper: {
    position: 'relative' as const,
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#fff',
    border: '1px solid #ddd', // ✅ Thinner border
    borderRadius: '15px', // ✅ Smaller radius
    overflow: 'hidden',
    transition: 'border-color 0.2s ease',
    boxShadow: '0 1px 2px rgba(0, 0, 0, 0.1)', // ✅ Lighter shadow
    height: '36px', // ✅ Smaller height
    width: '100%',
  },
  compactInput: {
    flex: 1,
    padding: '4px 8px', // ✅ Smaller padding
    border: 'none',
    outline: 'none',
    fontSize: '13px', // ✅ Smaller font
    color: '#333',
    backgroundColor: 'transparent',
    fontFamily: 'inherit',
    minWidth: '40px', // ✅ Very small minimum
  },
  compactSearchButton: {
    padding: '4px', // ✅ Much smaller padding
    border: 'none',
    backgroundColor: '#1a365d',
    cursor: 'pointer',
    transition: 'background-color 0.2s ease',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '12px', // ✅ Smaller radius
    margin: '2px',
    flexShrink: 0,
    width: '28px', // ✅ Fixed small width
    height: '28px', // ✅ Fixed small height
  },
  compactSearchIcon: {
    width: '16px', // ✅ Much smaller icon
    height: '16px',
    filter: 'brightness(0) invert(1)',
  },

  // ✅ Original styles
  clearButton: {
    padding: '8px',
    border: 'none',
    backgroundColor: 'transparent',
    cursor: 'pointer',
    fontSize: '20px',
    color: '#999',
    transition: 'color 0.2s ease',
    flexShrink: 0,
  },
  searchButton: {
    padding: '10px 10px',
    border: 'none',
    backgroundColor: '#1a365d',
    cursor: 'pointer',
    transition: 'background-color 0.2s ease',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '18px',
    margin: '2px',
    flexShrink: 0,
  },
  searchIcon: {
    width: '24px',
    height: '24px',
    filter: 'brightness(0) invert(1)',
  }
};

export default SearchBar;