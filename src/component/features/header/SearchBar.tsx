'use client';
import React, { useState } from 'react';
import SearchDiv from './SearchDiv';
import { useRouter } from 'next/navigation';
import { useSearchProducts } from '@/hooks/product/useSearchProducts';
import { Product } from '@/types/Product';

interface SearchBarProps {
  placeholder?: string;
  onSearch?: (searchTerm: string) => void;
  onSearchChange?: (searchTerm: string) => void;
  className?: string;
  style?: React.CSSProperties;
  isCompact?: boolean;
}

function SearchBar({ 
  placeholder = "Tìm kiếm sản phẩm...",
  onSearch,
  onSearchChange,
  className,
  style,
  isCompact = false
}: SearchBarProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const router = useRouter();
  
  // Sử dụng search hook để lấy suggestions
  const { searchResults, searchProducts } = useSearchProducts();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    
    if (onSearchChange) {
      onSearchChange(value);
    }

    if (value.trim()) {
      searchProducts(value.trim());
      setShowDropdown(true);
    } else {
      setShowDropdown(false);
    }
  };

  const handleSearch = () => {
    if (searchTerm.trim()) {
      if (onSearch) {
        onSearch(searchTerm.trim());
      }
      router.push(`/searchresult?query=${encodeURIComponent(searchTerm.trim())}`);
      setShowDropdown(false);
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
    setShowDropdown(false);
  };

  const handleSelectProduct = (product: Product) => {
    setShowDropdown(false);
    setSearchTerm('');
    router.push(`/productDetail?id=${product.id}`);
  };

  const handleBlur = () => {
    setTimeout(() => {
      setShowDropdown(false);
    }, 150);
  };

  const containerStyles = isCompact ? styles.compactContainer : styles.container;
  const inputWrapperStyles = isCompact ? styles.compactInputWrapper : styles.inputWrapper;
  const inputStyles = isCompact ? styles.compactInput : styles.input;
  const searchButtonStyles = isCompact ? styles.compactSearchButton : styles.searchButton;
  const searchIconStyles = isCompact ? styles.compactSearchIcon : styles.searchIcon;

  return (
    <div style={{ ...containerStyles, ...style, position: 'relative' }} className={className}>
      <div style={inputWrapperStyles}>
        <input
          type="text"
          value={searchTerm}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          onBlur={handleBlur}
          onFocus={() => {
            if (searchTerm.trim() && searchResults.length > 0) {
              setShowDropdown(true);
            }
          }}
          placeholder={isCompact ? "Tìm kiếm..." : placeholder}
          style={inputStyles}
        />
        
        {/* Clear button */}
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
      
      {/* Search Dropdown */}
      <SearchDiv
        results={searchResults}
        onSelect={handleSelectProduct}
        visible={showDropdown}
      />
    </div>
  );
}

// Styles giữ nguyên...
const styles = {
  container: {
    flexGrow: 1,
    alignItems: 'center',
    margin: '0 clamp(0px, 2vw, 50px)',
    minWidth: '200px',
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
  compactContainer: {
    flexGrow: 1,
    alignItems: 'center',
    margin: '0',
    minWidth: '80px',
  },
  compactInputWrapper: {
    position: 'relative' as const,
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#fff',
    border: '1px solid #ddd',
    borderRadius: '15px',
    overflow: 'hidden',
    transition: 'border-color 0.2s ease',
    boxShadow: '0 1px 2px rgba(0, 0, 0, 0.1)',
    height: '36px',
    width: '100%',
  },
  compactInput: {
    flex: 1,
    padding: '4px 8px',
    border: 'none',
    outline: 'none',
    fontSize: '13px',
    color: '#333',
    backgroundColor: 'transparent',
    fontFamily: 'inherit',
    minWidth: '40px',
  },
  compactSearchButton: {
    padding: '4px',
    border: 'none',
    backgroundColor: '#1a365d',
    cursor: 'pointer',
    transition: 'background-color 0.2s ease',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '12px',
    margin: '2px',
    flexShrink: 0,
    width: '28px',
    height: '28px',
  },
  compactSearchIcon: {
    width: '16px',
    height: '16px',
    filter: 'brightness(0) invert(1)',
  },
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