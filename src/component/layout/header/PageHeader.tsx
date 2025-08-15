'use client';
import React, { useState, useEffect } from 'react'
import CategoryNavigation from '@/component/navigation/CategoryNavigation';
import { useRouter } from 'next/navigation';
import { useCategories } from '@/hooks/useCategories';
import CompactHeader from '@/component/layout/header/CompactHeader';
import DesktopHeader from '@/component/layout/header/DesktopHeader';
import MobileMenuDropdown from '@/component/navigation/MobileMenuDropdown';

function PageHeader() {
  const router = useRouter();
  const [windowWidth, setWindowWidth] = useState(1920);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  const { categories, loading, error } = useCategories();

  // ✅ Check login status (replace with your actual auth logic)
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  useEffect(() => {
    // ✅ Check if user is logged in
    // Replace this with your actual authentication check
    const token = localStorage.getItem('authToken');
    const userSession = localStorage.getItem('userSession');
    
    setIsLoggedIn(!!(token || userSession));
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

  // ✅ Navigation handlers
  const handleLogoClick = () => {
    router.push('/');
  };

  const handleCartClick = () => {
    router.push('/cart');
  };

  const handleAccountClick = () => {
    if (isLoggedIn) {
      router.push('/account'); // ✅ Go to account page if logged in
    } else {
      router.push('/auth');   // ✅ Go to login page if not logged in
    }
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

  if (isMobile) {
    // ✅ Mobile Layout
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
          isLoggedIn={isLoggedIn} // ✅ Pass login status
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

  // ✅ Desktop Layout
  return (
    <div style={styles.headerContainer}>
      <DesktopHeader
        isSmallScreen={isSmallScreen}
        onLogoClick={handleLogoClick}
        onCartClick={handleCartClick}
        onAccountClick={handleAccountClick}
        isLoggedIn={isLoggedIn} // ✅ Pass login status
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
};

export default PageHeader