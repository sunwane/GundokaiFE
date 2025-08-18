'use client';
import React, { useEffect } from 'react';
import AuthForm from '@/component/features/auth/AuthForm';
import ModelSection from '@/component/features/auth/ModelSection';
import { useResponsive } from '@/hooks/useResponsive';

export default function AuthPage() {
  // SỬ DỤNG useResponsive THAY VÌ LOGIC CŨ
  const { isSmallScreen, isMobile, windowWidth } = useResponsive({
    mobile: 768,
    tablet: 1100,
  });
 
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
      {/* Model Section - Ẩn khi màn hình nhỏ */}
      {!isSmallScreen && (
        <div style={{
          ...styles.backgroundModelSection,
          width: windowWidth > 1400 ? '60%' : '55%', // RESPONSIVE WIDTH
        }}>
          <ModelSection />
        </div>
      )}
      
      {/* Content chính */}
      <div style={{
        ...styles.content,
        padding: isMobile ? '0.5rem' : '1rem', // RESPONSIVE PADDING
      }}>
        <div style={{
          ...styles.mainGrid,
          ...(isSmallScreen ? styles.mainGridCentered : {})
        }}>
          {/* Auth Form */}
          <div style={{
            ...styles.leftSection,
            ...(isSmallScreen ? styles.leftSectionCentered : {}),
            width: isSmallScreen ? '100%' : isMobile ? '50vw' : '40vw', // RESPONSIVE WIDTH
          }}>
            <div style={styles.authFormWrapper}>
              <AuthForm />
            </div>
          </div>
          
          {/* Khoảng trống bên phải - Ẩn khi màn hình nhỏ */}
          {!isSmallScreen && (
            <div style={{
              ...styles.rightSection,
              padding: isMobile ? '1rem' : '1.5rem', // RESPONSIVE PADDING
            }}>
              {/* Intentionally empty - model is in background */}
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
  backgroundModelSection: {
    position: 'absolute' as const,
    right: 0,
    height: '100%',
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
    maxWidth: '600px',
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
  },
};