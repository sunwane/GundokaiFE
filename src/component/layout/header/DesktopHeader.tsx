'use client';
import React from 'react';
import SearchBar from '../../features/header/SearchBar';

interface DesktopHeaderProps {
  isSmallScreen: boolean;
  onLogoClick: () => void;
  onCartClick: () => void;
  onAccountClick: () => void;
  isLoggedIn: boolean;
  accountComponent?: React.ReactNode;
}

export default function DesktopHeader({
  isSmallScreen,
  onLogoClick,
  onCartClick,
  onAccountClick,
  isLoggedIn,
  accountComponent
}: DesktopHeaderProps) {
  return (
    <div style={styles.headerTop}>
      <button 
        style={styles.logoContainer}
        onClick={onLogoClick}
        title="Về trang chủ"
      >
        <img src="/images/logo.png" alt="Gundokai logo" style={styles.logo} />
        <div style={styles.logoName}>HỘI ĐẠO <br/> CHIẾN BINH</div>
      </button>
      
      <div style={styles.headerTopContainer}>
        <SearchBar placeholder="Tìm kiếm mô hình, phụ kiện..." />
        <div style={{
          ...styles.buttonPlace,
          gap: isSmallScreen ? '8px' : '10px'
        }}>
          <div style={styles.iconWrapper} onClick={onCartClick}>
            <img src="/images/icons/cart.png" alt="Cart" style={styles.icon} />
            <span style={styles.iconLabel}>Giỏ hàng</span>
          </div>

          {/* Account Section */}
          {accountComponent ? (
            accountComponent
          ) : (
            <div style={styles.iconWrapper} onClick={onAccountClick}>
              <img src="/images/icons/account.png" alt="Account" style={styles.icon} />
              <span style={styles.iconLabel}>
                {isLoggedIn ? 'TÀI KHOẢN' : 'ĐĂNG NHẬP'}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const styles = {
  logo: {
    height: '80px',
    padding: '5px',
    paddingRight: '0px',
  },
  logoContainer: {
    display: 'flex',
    alignItems: 'center',
    transition: 'opacity 0.2s ease',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    minWidth: '200px',
  },
  logoName: {
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#333',
    lineHeight: '1.2',
    textAlign: 'left' as const,
    flexShrink: 0,
  },
  headerTop: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    height: '100px',
    gap: '20px',
    padding: '0 5vw',
  },
  headerTopContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  buttonText: {
    fontSize: '14px',
    color: '#002749',
    marginLeft: '2px',
    flexShrink: 0,
  },
  buttonContainer: {
    display: 'flex',
    alignItems: 'center',
    borderRadius: '4px',
    transition: 'background-color 0.2s ease',
    justifyContent: 'center',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
  },
  buttonIcon: {
    width: '28px',
    height: '28px',
  },
  buttonPlace: {
    display: 'flex',
    alignItems: 'center',
  },
  iconWrapper: {
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    transition: 'background-color 0.2s ease',
    padding: '8px',
    borderRadius: '4px',
  },
  icon: {
    width: '28px',
    height: '28px',
  },
  iconLabel: {
    fontSize: '14px',
    color: '#002749',
    marginLeft: '2px',
    flexShrink: 0,
    fontWeight: '500',
  },
};
