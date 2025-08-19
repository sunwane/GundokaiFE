'use client';
import React from 'react';
import SearchBar from '@/component/features/header/SearchBar';
import CartBadge from '@/component/features/header/CartBadge';

interface CompactHeaderProps {
  isMenuOpen: boolean;
  isSearchOpen: boolean;
  onToggleMenu: () => void;
  onToggleSearch: () => void;
  onLogoClick: () => void;
  onCartClick: () => void;
  onAccountClick: () => void;
  isLoggedIn?: boolean;
  accountComponent?: React.ReactNode;
}

export default function CompactHeader({ 
  isMenuOpen, 
  isSearchOpen, 
  onToggleMenu, 
  onToggleSearch, 
  onLogoClick,
  onCartClick,
  onAccountClick,
  isLoggedIn = false,
  accountComponent
}: CompactHeaderProps) {
  return (
    <div style={styles.compactHeader}>
      {/* Left side: Menu button + Search button */}
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

      {/* Center: Logo - Hidden when search is open */}
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

      {/* Search Bar - Overlays center and right sections when open */}
      {isSearchOpen && (
        <SearchBar 
          placeholder="Tìm kiếm..." 
          isCompact={true}
        />
      )}

      {/* Right side: Cart + Account buttons (+ Close button when search open) */}
      <div style={styles.rightSection}>
        {isSearchOpen && (
          <button 
            style={styles.closeButton}
            onClick={onToggleSearch}
            title="Đóng tìm kiếm"
          >
            <img src={'/images/icons/closeicon.png'} alt="Đóng" style={styles.buttonIcon} />
          </button>
        )}

        {!isSearchOpen && (
          <>
            {/* Cart Button với Badge */}
            <div style={styles.cartWrapper}>
              <button 
                style={styles.compactButton}
                onClick={onCartClick}
                title="Giỏ hàng"
              >
                <img src={'/images/icons/cart.png'} alt="Giỏ hàng" style={styles.buttonIcon} />
              </button>
              {/* Mobile mode cho CartBadge */}
              <CartBadge 
                isMobile={true} 
                isTablet={false} 
              />
            </div>
            
            {/* Account Section */}
            {accountComponent ? (
              accountComponent
            ) : (
              <button 
                style={styles.compactButton}
                onClick={onAccountClick}
                title={isLoggedIn ? "Tài khoản" : "Đăng nhập"}
              >
                <img 
                  src={'/images/icons/account.png'} 
                  alt={isLoggedIn ? "Tài khoản" : "Đăng nhập"}
                  style={styles.buttonIcon} 
                />
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
}

// Styles giữ nguyên
const styles = {
  compactHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    height: '70px',
    padding: '0 15px',
    backgroundColor: '#fff',
    position: 'relative' as const,
    gap: '8px',
  },
  leftSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    flexShrink: 0,
  },
  centerSection: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    position: 'absolute' as const,
    left: '50%',
    transform: 'translateX(-50%)',
    zIndex: 1,
  },
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
    height: '50px',
  },
  compactLogoName: {
    textAlign: 'left' as const,
    fontSize: '14px',
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
    width: '22px',
    height: '22px',
  },
  cartWrapper: {
    position: 'relative' as const,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
};
