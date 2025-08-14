'use client';
import React from 'react';
import SearchBar from '@/component/ui/SearchBar';

interface CompactHeaderProps {
  isMenuOpen: boolean;
  isSearchOpen: boolean;
  onToggleMenu: () => void;
  onToggleSearch: () => void;
  onLogoClick: () => void;
  onCartClick: () => void;   // ✅ New prop
  onAccountClick: () => void; // ✅ New prop
  isLoggedIn?: boolean; // ✅ New prop for login status
}

function CompactHeader({ 
  isMenuOpen, 
  isSearchOpen, 
  onToggleMenu, 
  onToggleSearch, 
  onLogoClick,
  onCartClick,    // ✅ New prop
  onAccountClick,  // ✅ New prop
  isLoggedIn = false // ✅ Default to false
}: CompactHeaderProps) {
  return (
    <div style={styles.compactHeader}>
      {/* ✅ Left side: Menu button + Search button */}
      <div style={styles.leftSection}>
        <button 
          style={styles.menuButton}
          onClick={onToggleMenu}
          title="Menu"
        >
          <span style={{...styles.hamburger, transform: isMenuOpen ? 'rotate(45deg) translate(8px, 0px)' : 'none'}}></span>
          <span style={{...styles.hamburger, opacity: isMenuOpen ? 0 : 1}}></span>
          <span style={{...styles.hamburger, transform: isMenuOpen ? 'rotate(-45deg) translate(9px, -1px)' : 'none'}}></span>
        </button>

        {/* ✅ Search button - Hidden when search is open */}
        {!isSearchOpen && (
          <button 
            style={styles.searchButton}
            onClick={onToggleSearch}
            title="Tìm kiếm"
          >
            <img src={'/images/icons/search.png'} alt="Tìm kiếm" style={styles.buttonIcon} />
          </button>
        )}
      </div>

      {/* ✅ Center: Logo - Hidden when search is open */}
      {!isSearchOpen && (
        <div style={styles.centerSection}>
          <button 
            style={styles.compactLogoContainer}
            onClick={onLogoClick}
            title="Về trang chủ"
          >
            <img src="/images/logo.png" alt="Gundokai logo" style={styles.compactLogo} />
            <div style={styles.compactLogoName}>HỘI ĐẠO <br/> CHIẾN BINH</div>
          </button>
        </div>
      )}

      {/* ✅ Search Bar - Overlays center and right sections when open */}
      {isSearchOpen && (
        <SearchBar 
          placeholder="Tìm kiếm..." 
          isCompact={true}
        />
      )}

      {/* ✅ Right side: Cart + Account buttons (+ Close button when search open) */}
      <div style={styles.rightSection}>
        {/* ✅ Close button - Only visible when search is open */}
        {isSearchOpen && (
          <button 
            style={styles.closeButton}
            onClick={onToggleSearch}
            title="Đóng tìm kiếm"
          >
            <img src={'/images/icons/closeicon.png'} alt="Đóng" style={styles.buttonIcon} />
          </button>
        )}

        {/* ✅ Cart and Account buttons với dynamic title */}
        {!isSearchOpen && (
          <>
            <button 
              style={styles.compactButton}
              onClick={onCartClick}
              title="Giỏ hàng"
            >
              <img src={'/images/icons/cart.png'} alt="Giỏ hàng" style={styles.buttonIcon} />
            </button>
            
            <button 
              style={styles.compactButton}
              onClick={onAccountClick}
              title={isLoggedIn ? "Tài khoản" : "Đăng nhập"} // ✅ Dynamic title
            >
              <img 
                src={'/images/icons/account.png'} 
                alt={isLoggedIn ? "Tài khoản" : "Đăng nhập"} // ✅ Dynamic alt
                style={styles.buttonIcon} 
              />
            </button>
          </>
        )}
      </div>
    </div>
  );
}

const styles = {
  compactHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    height: '70px',
    padding: '0 15px',
    backgroundColor: '#fff',
    position: 'relative' as const, // ✅ For search overlay positioning
    gap: '8px',
  },
  
  // ✅ Left section: Menu + Search button
  leftSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    flexShrink: 0,
  },
  
  // ✅ Center section: Logo
  centerSection: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1, // ✅ Takes remaining space
    position: 'absolute' as const,
    left: '50%',
    transform: 'translateX(-50%)', // ✅ Perfect center alignment
    zIndex: 1,
  },
  
  // ✅ Right section: Cart + Account (or Close button)
  rightSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    flexShrink: 0,
    justifyContent: 'flex-end',
  },

  menuButton: {
    display: 'flex',
    flexDirection: 'column' as const,
    justifyContent: 'center',
    alignItems: 'center',
    width: '36px',
    height: '36px',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    gap: '5px',
    padding: '0',
  },
  
  hamburger: {
    width: '20px',
    height: '1.5px',
    backgroundColor: '#002749',
    borderRadius: '2px',
    transition: 'all 0.3s ease',
    transformOrigin: 'center',
  },
  
  compactLogoContainer: {
    display: 'flex',
    alignItems: 'center',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
  },
  
  compactLogo: {
    height: '50px', // ✅ Slightly smaller for center positioning
  },
  
  compactLogoName: {
    textAlign: 'left' as const,
    fontSize: '14px', // ✅ Smaller text
    fontWeight: 'bold',
    color: '#333',
    lineHeight: '1.2',
    whiteSpace: 'nowrap' as const,
  },
  
  searchButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '36px',
    height: '36px',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    borderRadius: '4px',
    transition: 'background-color 0.2s ease',
  },
  
  closeButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '36px',
    height: '36px',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    borderRadius: '4px',
    transition: 'background-color 0.2s ease',
  },
  
  compactButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '36px',
    height: '36px',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    borderRadius: '4px',
    transition: 'background-color 0.2s ease',
  },
  
  buttonIcon: {
    width: '22px', // ✅ Slightly smaller icons
    height: '22px',
  },
};

export default CompactHeader;