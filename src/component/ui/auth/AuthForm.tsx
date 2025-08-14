'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { useFormValidation } from '@/hooks/useFormValidation';
import TabToggle from '@/component/ui/form/TabToggle';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

const tabOptions = [
  { value: 'login', label: 'Đăng nhập' },
  { value: 'register', label: 'Đăng ký' }
];

export default function AuthForm() {
  const router = useRouter();
  const auth = useAuth();
  const validation = useFormValidation();
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsSmallScreen(window.innerWidth < 1100);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validation.validateLogin(auth.loginData)) return;
    await auth.handleLogin(e);
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validation.validateRegister(auth.registerData)) return;
    await auth.handleRegister(e);
  };

  const handleLogoClick = () => {
    router.push('/');
  };

  return (
    <div style={{
      ...styles.card,
      ...(isSmallScreen ? styles.cardMobile : {})
    }} className={isSmallScreen ? 'auth-form-mobile' : ''}>
      {/* Header Section với background riêng */}
      <div style={styles.header}>
        <div 
          style={styles.logoContainer}
          className="auth-logo-container"
          onClick={handleLogoClick}
          title="Về trang chủ"
        >
          <img src="/images/logo.png" alt="Gundokai logo" style={styles.logoImage} />
        </div>
        <div style={styles.welcomeMessage}>
          Chào mừng đến với<br/>
          <span style={styles.brandName}>HỘI ĐẠO CHIẾN BINH</span>
        </div>
      </div>

      {/* Content Section */}
      <div style={styles.cardContent}>
        <TabToggle
          options={tabOptions}
          activeTab={auth.authMode}
          onTabChange={(tab) => auth.setAuthMode(tab as 'login' | 'register')}
        />

        <div style={styles.tabsContent}>
          <div style={styles.scrollableContent}>
            {auth.authMode === 'login' ? (
              <LoginForm
                data={auth.loginData}
                isLoading={auth.isLoading}
                error={auth.error}
                validationErrors={Object.fromEntries(
                  Object.entries(validation.errors).map(([key, value]) => [key, String(value)])
                )}
                showPassword={auth.showPassword}
                onInputChange={auth.handleLoginInputChange}
                onSubmit={handleLoginSubmit}
                onTogglePassword={() => auth.setShowPassword(!auth.showPassword)}
              />
            ) : (
              <RegisterForm
                data={auth.registerData}
                isLoading={auth.isLoading}
                error={auth.error}
                validationErrors={Object.fromEntries(
                  Object.entries(validation.errors).map(([key, value]) => [key, String(value)])
                )}
                showPassword={auth.showPassword}
                onInputChange={auth.handleRegisterInputChange}
                onSubmit={handleRegisterSubmit}
                onTogglePassword={() => auth.setShowPassword(!auth.showPassword)}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  card: {
    width: '100%',
    height: '85vh',
    border: '1px solid rgba(0, 0, 0, 0.1)',
    background: 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(10px)',
    borderRadius: '1rem',
    overflow: 'hidden',
    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    flexDirection: 'column' as const,
  },
  // ✅ Style cho mobile
  cardMobile: {
    maxWidth: '90vw',
    height: 'auto',
    maxHeight: '90vh',
  },
  header: {
    // Header có background đậm hơn và phân cách rõ ràng
    background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.12) 0%, rgba(147, 197, 253, 0.08) 100%)',
    borderBottom: '2px solid rgba(59, 130, 246, 0.15)',
    padding: '1.5rem 1.5rem 1.25rem 1.5rem',
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    position: 'relative' as const,
    // Thêm pattern subtle
    backgroundImage: `
      radial-gradient(circle at 20% 80%, rgba(59, 130, 246, 0.05) 0%, transparent 50%),
      radial-gradient(circle at 80% 20%, rgba(147, 197, 253, 0.05) 0%, transparent 50%)
    `,
  },
  logoContainer: {
    cursor: 'pointer',
    padding: '0.75rem',
    borderRadius: '1rem',
    transition: 'all 0.3s ease',
    marginBottom: '0.75rem',
    background: 'rgba(255, 255, 255, 0.7)',
    border: '1px solid rgba(255, 255, 255, 0.3)',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
  },
  logoImage: {
    height: '3rem',
    width: 'auto',
    filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.15))',
  },
  welcomeMessage: {
    textAlign: 'center' as const,
    fontSize: '0.875rem',
    color: '#4b5563', // Đậm hơn từ #6b7280
    lineHeight: '1.4',
    fontWeight: '500', // Thêm weight
  },
  brandName: {
    fontSize: '1.1rem', // Tăng từ 1rem
    fontWeight: '800', // Tăng từ 700
    color: '#1f2937',
    textTransform: 'uppercase' as const,
    letterSpacing: '0.8px', // Tăng letter spacing
    textShadow: '0 1px 2px rgba(0, 0, 0, 0.1)', // Thêm text shadow
  },
  cardContent: {
    padding: '1.5rem',
    display: 'flex',
    flexDirection: 'column' as const,
    flex: 1,
    overflow: 'hidden',
    background: 'rgba(255, 255, 255, 0.98)', // Background trắng hơn cho content
  },
  tabsContent: {
    paddingTop: '1rem',
    flex: 1,
    overflow: 'hidden',
  },
  scrollableContent: {
    height: '100%',
    overflowY: 'auto' as const,
    paddingRight: '0.5rem',
    scrollbarWidth: 'thin' as const,
    scrollbarColor: '#cbd5e0 transparent',
  },
};

// Add custom scrollbar styles và hover effects
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = `
    .scrollableContent::-webkit-scrollbar {
      width: 6px;
    }
    
    .scrollableContent::-webkit-scrollbar-track {
      background: transparent;
    }
    
    .scrollableContent::-webkit-scrollbar-thumb {
      background: #cbd5e0;
      border-radius: 3px;
    }
    
    .scrollableContent::-webkit-scrollbar-thumb:hover {
      background: #a0aec0;
    }

    .auth-logo-container:hover {
      background: rgba(255, 255, 255, 0.9) !important;
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(0, 0, 0, 0.12) !important;
    }

    .auth-logo-container:active {
      transform: translateY(0);
    }
  `;
  document.head.appendChild(style);
}