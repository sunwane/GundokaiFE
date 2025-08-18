'use client';
import React, { useState, useEffect } from 'react'
import CategoryNavigation from '@/component/navigation/CategoryNavigation';
import { useRouter } from 'next/navigation';
import { useCategories } from '@/hooks/useCategories';
import CompactHeader from '@/component/layout/header/CompactHeader';
import DesktopHeader from '@/component/layout/header/DesktopHeader';
import MobileMenuDropdown from '@/component/navigation/MobileMenuDropdown';
import AccountShortcut from '@/component/features/header/AccountShortcut';

function PageHeader() {
  const router = useRouter();
  const [windowWidth, setWindowWidth] = useState(1920);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  const { categories, loading, error } = useCategories();

  // Check login status and user data
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<any>(null);
  
  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('authToken');
    const userSession = localStorage.getItem('userSession');
    
    if (token || userSession) {
      setIsLoggedIn(true);
      // Parse user data from localStorage
      if (userSession) {
        try {
          const userData = JSON.parse(userSession);
          setUser(userData);
        } catch (error) {
          console.error('Error parsing user session:', error);
        }
      }
    } else {
      setIsLoggedIn(false);
      setUser(null);
    }
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isSmallScreen = windowWidth <= 1000;
  const isMobile = windowWidth <= 760;
  const isDesktop = windowWidth >= 750;

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
    // If logged in, AccountShortcut will handle the dropdown
  };

  const handleLogout = () => {
    // Clear auth data
    localStorage.removeItem('authToken');
    localStorage.removeItem('userSession');
    setIsLoggedIn(false);
    setUser(null);
    
    // Redirect to home page
    router.push('/');
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    setSelectedCategory(null);
    if (isSearchOpen) setIsSearchOpen(false);
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
    if (isMenuOpen) setIsMenuOpen(false);
  };

  const handleCategoryClick = (categoryId: string) => {
    if (categoryId === 'info') {
      router.push('/about');
      setIsMenuOpen(false);
    } else {
      setSelectedCategory(selectedCategory === categoryId ? null : categoryId);
    }
  };

  const handleSubCategoryClick = (subCategoryId: string) => {
    router.push(`/products?subcategory=${subCategoryId}`);
    setIsMenuOpen(false);
    setSelectedCategory(null);
  };

  // Create AccountShortcut wrapper that preserves original button appearance
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
        isDesktop={true}
      >
        <div style={styles.desktopAccountWrapper}>
          <img src="/images/icons/account.png" alt="Account" style={styles.desktopIcon} />
          <span style={styles.desktopIconLabel}>Tài khoản</span>
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
          onToggleMenu={toggleMenu}
          onToggleSearch={toggleSearch}
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

const styles = {
  headerContainer: {
    display: 'flex',
    boxShadow: '0 4px 4px rgba(0, 0, 0, 0.1)',
    height: '160px',
    flexDirection: 'column' as const,
    alignItems: 'center',
    position: 'relative' as const,
    backgroundColor: '#fff',
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
  // Desktop account wrapper styles
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
  // Mobile account button styles
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

export default PageHeader