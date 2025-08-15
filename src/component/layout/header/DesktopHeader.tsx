'use client';
import React from 'react';
import SearchBar from '../../ui/header/SearchBar';

interface DesktopHeaderProps {
  isSmallScreen: boolean;
  onLogoClick: () => void;
  onCartClick: () => void;
  onAccountClick: () => void;
  isLoggedIn?: boolean; // ✅ New prop for login status
}

function DesktopHeader({ 
  isSmallScreen, 
  onLogoClick, 
  onCartClick,
  onAccountClick,
  isLoggedIn = false // ✅ Default to false
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
          {/* ✅ Cart Button */}
          <button 
            style={{
              ...styles.buttonContainer,
              padding: isSmallScreen ? '8px' : '8px 12px'
            }}
            onClick={onCartClick}
            title="Giỏ hàng"
          >
            <img src={'/images/icons/cart.png'} alt="Giỏ hàng" style={styles.buttonIcon} />
            {!isSmallScreen && (
              <div style={styles.buttonText}>Giỏ hàng</div>
            )}
          </button>
          
          {/* ✅ Account Button với dynamic text */}
          <button 
            style={{
              ...styles.buttonContainer,
              padding: isSmallScreen ? '8px' : '8px 12px'
            }}
            onClick={onAccountClick}
            title={isLoggedIn ? "Tài khoản" : "Đăng nhập"} // ✅ Dynamic title
          >
            <img 
              src={'/images/icons/account.png'} 
              alt={isLoggedIn ? "Tài khoản" : "Đăng nhập"} // ✅ Dynamic alt
              style={styles.buttonIcon} 
            />
            {!isSmallScreen && (
              <div style={styles.buttonText}>
                {isLoggedIn ? "Tài khoản" : "Đăng nhập"} {/* ✅ Dynamic text */}
              </div>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

// ✅ Styles giữ nguyên
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
};

export default DesktopHeader;