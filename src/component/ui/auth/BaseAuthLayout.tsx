'use client';
import React, { useState, useEffect, ReactNode } from 'react';

interface BaseAuthLayoutProps {
  children: ReactNode;
  backgroundContent?: ReactNode;
  showBackground?: boolean;
}

export default function BaseAuthLayout({ 
  children, 
  backgroundContent,
  showBackground = true 
}: BaseAuthLayoutProps) {
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsSmallScreen(window.innerWidth < 1100);
    };

    checkScreenSize();
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

  return (
    <main style={styles.container}>
      {/* Background Section */}
      {!isSmallScreen && showBackground && backgroundContent && (
        <div style={styles.backgroundSection}>
          {backgroundContent}
        </div>
      )}
      
      {/* Content */}
      <div style={styles.content}>
        <div style={{
          ...styles.mainGrid,
          ...(isSmallScreen ? styles.mainGridCentered : {})
        }}>
          {/* Form Section */}
          <div style={{
            ...styles.leftSection,
            ...(isSmallScreen ? styles.leftSectionCentered : {})
          }}>
            <div style={styles.formWrapper}>
              {children}
            </div>
          </div>
          
          {/* Right spacing */}
          {!isSmallScreen && (
            <div style={styles.rightSection}>
              {/* Intentionally empty */}
            </div>
          )}
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
  backgroundSection: {
    position: 'absolute' as const,
    right: 0,
    width: '60%', 
    height: '100%',
    zIndex: 1,
    pointerEvents: 'auto' as const,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    display: 'flex',
    flexDirection: 'column' as const,
    padding: '0.5rem',
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
  },
  mainGrid: {
    display: 'flex',
    gap: '1rem',
    height: 'auto',
    overflow: 'hidden',
    minHeight: 0,
    pointerEvents: 'none' as const,
    alignItems: 'center',
    width: '100%',
    margin: 0,
    padding: 0,
  },
  mainGridCentered: {
    justifyContent: 'center',
    alignItems: 'center',
    gap: 0,
    width: '100%',
    margin: '0 auto',
    padding: 0,
  },
  leftSection: {
    flex: '0 0 auto',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    maxWidth: '600px',
    width: "40vw",
    height: 'auto',
    overflow: 'visible',
    zIndex: 20,
    pointerEvents: 'auto' as const,
    marginLeft: 0,
    paddingLeft: 0,
  },
  leftSectionCentered: {
    width: '100%',
    maxWidth: '600px',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '0 auto',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  formWrapper: {
    width: '100%',
    height: 'auto',
    position: 'relative' as const,
    zIndex: 20,
    pointerEvents: 'auto' as const,
    maxWidth: '100%',
    padding: 0,
    margin: 0,
    left: 0,
    right: 0,
  },
  rightSection: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '1rem',
    overflow: 'hidden',
    pointerEvents: 'none' as const,
    background: 'transparent',
  },
};