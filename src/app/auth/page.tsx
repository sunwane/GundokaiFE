'use client';
import React, { useState, useEffect } from 'react';
import AuthForm from '@/component/ui/auth/AuthForm';
import ModelSection from '@/component/ui/auth/ModelSection';

export default function AuthPage() {
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    // Function để check screen size
    const checkScreenSize = () => {
      setIsSmallScreen(window.innerWidth < 1100);
    };

    // Check initial size
    checkScreenSize();

    // Add event listener
    window.addEventListener('resize', checkScreenSize);

    // Cleanup
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // ✅ Chỉ khóa scroll cho page này
  useEffect(() => {
    // Lưu trữ overflow style gốc
    const originalOverflow = document.body.style.overflow;
    const originalHtmlOverflow = document.documentElement.style.overflow;
    
    // Khóa scroll khi vào page này
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';

    // Cleanup - khôi phục scroll khi rời khỏi page
    return () => {
      document.body.style.overflow = originalOverflow;
      document.documentElement.style.overflow = originalHtmlOverflow;
    };
  }, []); // Chạy 1 lần khi component mount/unmount

  return (
    <main style={styles.container}>
      {/* Model Section - Ẩn khi màn hình nhỏ */}
      {!isSmallScreen && (
        <div style={styles.backgroundModelSection}>
          <ModelSection />
        </div>
      )}
      
      {/* Content chính */}
      <div style={styles.content}>
        <div style={{
          ...styles.mainGrid,
          ...(isSmallScreen ? styles.mainGridCentered : {})
        }}>
          {/* Auth Form */}
          <div style={{
            ...styles.leftSection,
            ...(isSmallScreen ? styles.leftSectionCentered : {})
          }}>
            <div style={styles.authFormWrapper}>
              <AuthForm />
            </div>
          </div>
          
          {/* Khoảng trống bên phải - Ẩn khi màn hình nhỏ */}
          {!isSmallScreen && (
            <div style={styles.rightSection}>
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
    width: '60%', 
    height: '100%',
    zIndex: 1,
    pointerEvents: 'auto' as const,
  },
  content: {
    display: 'flex',
    flexDirection: 'column' as const,
    padding: '0rem 1.5rem',
    height: '100%',
    overflow: 'hidden',
    maxWidth: '1400px',
    margin: 'auto',
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
  },
  // ✅ Style cho màn hình nhỏ - center hoàn toàn
  mainGridCentered: {
    justifyContent: 'center',
    alignItems: 'center',
    gap: 0,
  },
  leftSection: {
    flex: '0 0 auto',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    maxWidth: '600px',
    width: "40vw",
    height: 'auto',
    overflow: 'visible',
    zIndex: 20,
    pointerEvents: 'auto' as const,
  },
  // ✅ Style cho leftSection khi màn hình nhỏ
  leftSectionCentered: {
    width: '100%',
    maxWidth: '450px', // Giới hạn max width cho form
    justifyContent: 'center',
    alignItems: 'center',
  },
  authFormWrapper: {
    width: '100%',
    height: 'auto',
    position: 'relative' as const,
    zIndex: 20,
    pointerEvents: 'auto' as const,
  },
  rightSection: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '1.5rem',
    overflow: 'hidden',
    pointerEvents: 'none' as const,
    background: 'transparent',
  },
};

// ✅ Chỉ thêm responsive styles, không khóa scroll global
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = `
    /* ✅ Chỉ responsive styles, không có overflow hidden global */
    @media (max-width: 1100px) {
      .auth-form-mobile {
        max-width: 90vw !important;
        margin: 0 auto;
      }
    }

    @media (max-width: 768px) {
      .auth-form-mobile {
        max-width: 95vw !important;
        padding: 1rem !important;
      }
    }
  `;
  document.head.appendChild(style);
}