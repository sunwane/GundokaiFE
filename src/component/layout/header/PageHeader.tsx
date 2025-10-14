'use client';
import React, { useState } from 'react';
import CategoryNavigation from '@/component/navigation/CategoryNavigation';
import { useRouter } from 'next/navigation';
import { useCategories } from '@/hooks/categories/useCategories';
import { useResponsive } from '@/hooks/useResponsive';
import { useAuthState } from '@/hooks/auth/useAuthState';
import { useToggle } from '@/hooks/useToggle';
import CompactHeader from '@/component/layout/header/CompactHeader';
import DesktopHeader from '@/component/layout/header/DesktopHeader';
import MobileMenuDropdown from '@/component/navigation/MobileMenuDropdown';
import AccountShortcut from '@/component/features/header/AccountShortcut';

function PageHeader() {
  const router = useRouter();
  const { isMobile, isSmallScreen, isTablet } = useResponsive({
  });
  
  // Use toggle hooks instead of individual state
  const [isMenuOpen, toggleMenu, setMenuOpen] = useToggle(false);
  const [isSearchOpen, toggleSearch, setSearchOpen] = useToggle(false);
  
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const { categories, loading, error } = useCategories();
  const { isLoggedIn, user, logout } = useAuthState();

  // Navigation handlers
  const handleLogoClick = () => {
    router.push('/');
  };

  const handleCartClick = () => {
    router.push('/cart');
  };

  const handleAccountClick = () => {
    if (!isLoggedIn) {
      router.push('/auth');
    }
  };

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  const handleToggleMenu = () => {
    toggleMenu();
    setSelectedCategory(null);
    if (isSearchOpen) setSearchOpen(false);
  };

  const handleToggleSearch = () => {
    toggleSearch();
    if (isMenuOpen) setMenuOpen(false);
  };

  const handleCategoryClick = (categoryId: string) => {
    if (categoryId === 'info') {
      router.push('/about');
      setMenuOpen(false);
    } else {
      setSelectedCategory(selectedCategory === categoryId ? null : categoryId);
    }
  };

  const handleSubCategoryClick = (subCategoryId: string) => {
    router.push(`/products?subcategory=${subCategoryId}`);
    setMenuOpen(false);
    setSelectedCategory(null);
  };

  // Create AccountShortcut wrapper
  const createAccountComponent = () => {
    if (!isLoggedIn || !user) return null;

    if (isMobile) {
      return (
        <AccountShortcut 
          user={user} 
          onLogout={handleLogout}
          isDesktop={false}
        >
          <button 
            style={styles.mobileAccountButton}
            title="Tài khoản"
          >
            <img 
              src={'/images/icons/account.png'} 
              alt="Tài khoản"
              style={styles.mobileButtonIcon} 
            />
          </button>
        </AccountShortcut>
      );
    }

    return (
      <AccountShortcut 
        user={user} 
        onLogout={handleLogout}
        isDesktop={!isTablet} // Không phải desktop nếu là tablet
        isTablet={isTablet} // Truyền isTablet prop
      >
        <div style={styles.desktopAccountWrapper}>
          <img src="/images/icons/account.png" alt="Account" style={styles.desktopIcon} />
          {/* Ẩn text trên tablet */}
          {!isTablet && (
            <span style={styles.desktopIconLabel}>Tài khoản</span>
          )}
        </div>
      </AccountShortcut>
    );
  };

  if (isMobile) {
    return (
      <div style={{
        ...styles.headerContainer,
        height: '75px',
      }}>
        <CompactHeader
          isMenuOpen={isMenuOpen}
          isSearchOpen={isSearchOpen}
          onToggleMenu={handleToggleMenu}
          onToggleSearch={handleToggleSearch}
          onLogoClick={handleLogoClick}
          onCartClick={handleCartClick}
          onAccountClick={handleAccountClick}
          isLoggedIn={isLoggedIn}
          accountComponent={createAccountComponent()}
        />

        <MobileMenuDropdown
          isOpen={isMenuOpen}
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryClick={handleCategoryClick}
          onSubCategoryClick={handleSubCategoryClick}
        />
      </div>
    );
  }

  return (
    <div style={styles.headerContainer}>
      <DesktopHeader
        isSmallScreen={isSmallScreen}
        isTablet={isTablet} // Truyền isTablet prop
        onLogoClick={handleLogoClick}
        onCartClick={handleCartClick}
        onAccountClick={handleAccountClick}
        isLoggedIn={isLoggedIn}
        accountComponent={createAccountComponent()}
      />
      <div style={styles.headerBottom}>
        <CategoryNavigation />
      </div>
    </div>
  );
}

// Styles giữ nguyên...
const styles = {
  headerContainer: {
    display: 'flex',
    boxShadow: '0 4px 4px rgba(0, 0, 0, 0.1)',
    height: '160px',
    flexDirection: 'column' as const,
    alignItems: 'center',
    position: 'relative' as const,
    backgroundColor: '#fff',
    zIndex: 10,
  },
  headerBottom: {
    display: 'flex',
    justifyContent: 'space-between',
    width: "100%",
    backgroundColor: '#f3f3f3',
    padding: '0 8vw',
    height: '60px',
    alignItems: 'center',
  },
  desktopAccountWrapper: {
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    transition: 'background-color 0.2s ease',
    padding: '8px',
    borderRadius: '4px',
  },
  desktopIcon: {
    width: '28px',
    height: '28px',
  },
  desktopIconLabel: {
    fontSize: '14px',
    color: '#002749',
    marginLeft: '2px',
    flexShrink: 0,
    fontWeight: '500',
  },
  mobileAccountButton: {
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
  mobileButtonIcon: {
    width: '22px',
    height: '22px',
  },
};

export default PageHeader;