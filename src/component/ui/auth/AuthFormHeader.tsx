'use client';
import React from 'react';
import { useRouter } from 'next/navigation';

interface AuthFormHeaderProps {
  className?: string;
  mode?: string;
  // ✅ New props for customizable text
  welcomeText?: string;
  brandName?: string;
  logoPath?: string;
  onLogoClick?: () => void;
  showWelcomeMessage?: boolean;
}

export default function AuthFormHeader({ 
  className, 
  mode = 'light',
  welcomeText = "Chào mừng đến với",
  brandName = "HỘI ĐẠO CHIẾN BINH",
  logoPath = "/images/logoWhite.png",
  onLogoClick,
  showWelcomeMessage = true
}: AuthFormHeaderProps) {
  const router = useRouter();

  const handleLogoClick = () => {
    if (onLogoClick) {
      onLogoClick();
    } else {
      router.push('/');
    }
  };

  return (
    <div style={styles.header} className={className}>
      <div 
        style={styles.logoContainer}
        className="auth-logo-container"
        onClick={handleLogoClick}
        title="Về trang chủ"
      >
        <img src={logoPath} alt="Gundokai logo" style={styles.logoImage} />
      </div>
      
      {showWelcomeMessage && (
        <div style={styles.welcomeMessage}>
          {welcomeText}
          {welcomeText && <br/>}
          <span style={styles.brandName}>{brandName}</span>
        </div>
      )}
    </div>
  );
}

const styles = {
  header: {
    background: `
      linear-gradient(135deg, 
        rgba(15, 23, 42, 0.65) 0%, 
        rgba(30, 41, 59, 0.60) 50%,
        rgba(51, 65, 85, 0.55) 100%
      )
    `,
    borderBottom: '2px solid rgba(59, 130, 246, 0.25)',
    padding: '1.5rem 1.5rem 1.25rem 1.5rem',
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    position: 'relative' as const,
    maxWidth: '100%',
    boxSizing: 'border-box' as const,
    overflow: 'hidden',
    height: 'auto',
    minHeight: 'fit-content',
    flexShrink: 0,
    backgroundImage: `
      radial-gradient(circle at 20% 80%, rgba(59, 130, 246, 0.08) 0%, transparent 50%),
      radial-gradient(circle at 80% 20%, rgba(147, 197, 253, 0.05) 0%, transparent 50%)
    `,
  },
  logoContainer: {
    cursor: 'pointer',
    padding: '0.75rem',
    borderRadius: '0.75rem',
    transition: 'all 0.3s ease',
    marginBottom: '0.75rem',
    background: 'rgba(15, 23, 42, 0.4)',
    border: '1px solid rgba(59, 130, 246, 0.2)',
    boxShadow: `
      0 4px 12px rgba(0, 0, 0, 0.25),
      0 0 15px rgba(59, 130, 246, 0.08),
      inset 0 1px 0 rgba(255, 255, 255, 0.05)
    `,
    backdropFilter: 'blur(10px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  logoImage: {
    height: '3rem',
    width: 'auto',
    filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3))',
    maxWidth: '100%',
    objectFit: 'contain' as const,
    flexShrink: 0,
  },
  welcomeMessage: {
    textAlign: 'center' as const,
    fontSize: '0.875rem',
    color: 'rgb(173, 173, 173)',
    lineHeight: '1.4',
    fontWeight: '500',
    wordWrap: 'break-word' as const,
    maxWidth: '100%',
    overflow: 'hidden',
    flexShrink: 0,
  },
  brandName: {
    fontSize: '1.2rem',
    fontWeight: '800',
    color: '#e2e8f0',
    textTransform: 'uppercase' as const,
    letterSpacing: '0.8px',
    textShadow: '0 1px 2px rgba(0, 0, 0, 0.5)',
    wordWrap: 'break-word' as const,
    display: 'inline-block',
    maxWidth: '100%',
    whiteSpace: 'nowrap' as const,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
};