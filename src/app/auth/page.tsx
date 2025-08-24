'use client';
import React, { useEffect, useState } from 'react';
import AuthForm from '@/component/features/auth/AuthForm';
import ModelSection from '@/component/features/auth/ModelSection';

export default function AuthPage() {
  const [isHydrated, setIsHydrated] = useState(false);
  const [windowWidth, setWindowWidth] = useState(1200); // Default desktop width

  useEffect(() => {
    // Mark as hydrated and get real window size
    setIsHydrated(true);
    setWindowWidth(window.innerWidth);
    
    const checkScreenSize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    const originalHtmlOverflow = document.documentElement.style.overflow;
    
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = originalOverflow;
      document.documentElement.style.overflow = originalHtmlOverflow;
    };
  }, []);

  // Use computed values that are consistent between server and client
  const isSmallScreen = isHydrated ? windowWidth < 1100 : false;
  const isMobile = isHydrated ? windowWidth < 768 : false;

  return (
    <main style={styles.container}>
      {/* Model Section - Show/hide based on hydration state */}
      <div 
        style={{
          ...styles.backgroundModelSection,
          display: (!isHydrated || !isSmallScreen) ? 'block' : 'none'
        }}
      >
        <ModelSection />
      </div>
      
      {/* Content chính */}
      <div style={{
        ...styles.content,
        padding: isHydrated && isMobile ? '0.5rem' : '1rem',
      }}>
        <div style={{
          ...styles.mainGrid,
          ...(isHydrated && isSmallScreen ? styles.mainGridCentered : {})
        }}>
          {/* Auth Form */}
          <div style={{
            ...styles.leftSection,
            ...(isHydrated && isSmallScreen ? styles.leftSectionCentered : {}),
            width: isHydrated ? (isSmallScreen ? '100%' : isMobile ? '50vw' : '40vw') : '40vw',
          }}>
            <div style={styles.authFormWrapper}>
              <AuthForm />
            </div>
          </div>
          
          {/* Khoảng trống bên phải */}
          <div 
            style={{
              ...styles.rightSection,
              padding: isHydrated && isMobile ? '1rem' : '1.5rem',
              display: (!isHydrated || !isSmallScreen) ? 'flex' : 'none'
            }}
          >
            {/* Intentionally empty - model is in background */}
          </div>
        </div>
      </div>
    </main>
  );
}

const styles = {
  container: {
    height: '100vh',
    width: '100vw',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column' as const,
    background: `
      url('/images/backgrounds/authBg.jpg') center center / cover no-repeat,
      linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(147, 197, 253, 0.1) 100%)
    `,
    position: 'relative' as const,
  },
  backgroundModelSection: {
    position: 'absolute' as const,
    right: 0,
    height: '100%',
    width: '55%',
    zIndex: 1,
    pointerEvents: 'auto' as const,
  },
  content: {
    display: 'flex',
    flexDirection: 'column' as const,
    height: '100%',
    overflow: 'hidden',
    maxWidth: '1400px',
    margin: '0 auto',
    width: '100%',
    boxSizing: 'border-box' as const,
    position: 'relative' as const,
    zIndex: 100,
    pointerEvents: 'none' as const,
    justifyContent: 'center',
    padding: '1rem',
  },
  mainGrid: {
    display: 'flex',
    gap: '1.5rem',
    height: 'auto',
    overflow: 'hidden',
    minHeight: 0,
    pointerEvents: 'none' as const,
    alignItems: 'center',
    width: '100%',
  },
  mainGridCentered: {
    justifyContent: 'center',
    alignItems: 'center',
    gap: 0,
    width: '100%',
  },
  leftSection: {
    flex: '0 0 auto',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '40vw',
    height: 'auto',
    overflow: 'visible',
    zIndex: 20,
    pointerEvents: 'auto' as const,
  },
  leftSectionCentered: {
    width: '100%',
    maxWidth: '600px',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '0 auto',
  },
  authFormWrapper: {
    width: '100%',
    height: 'auto',
    position: 'relative' as const,
    zIndex: 20,
    pointerEvents: 'auto' as const,
    maxWidth: '100%',
  },
  rightSection: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    pointerEvents: 'none' as const,
    background: 'transparent',
    padding: '1.5rem',
  },
};