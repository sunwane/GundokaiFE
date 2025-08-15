import React from 'react';
import { ThemeMode, getTheme } from '@/types/Theme';

interface SubmitButtonProps {
  isLoading: boolean;
  children: React.ReactNode;
  loadingText?: string;
  disabled?: boolean;
  mode?: ThemeMode;
  onClick?: () => void;
}

export default function SubmitButton({
  isLoading,
  children,
  loadingText = 'Đang xử lý',
  disabled = false,
  mode = 'dark', // ✅ Default dark để match với AuthForm
  onClick
}: SubmitButtonProps) {
  const theme = getTheme(mode);
  const styles = getStyles(theme, mode);
  
  return (
    <button
      type="submit"
      disabled={isLoading || disabled}
      onClick={onClick}
      style={{
        ...styles.submitButton,
        ...(isLoading || disabled ? styles.submitButtonDisabled : {})
      }}
      className={`submit-button-${mode}`}
    >
      {isLoading ? (
        <>
          <span style={styles.spinner}></span> {loadingText}
        </>
      ) : (
        children
      )}
    </button>
  );
}

function getStyles(theme: any, mode: ThemeMode) {
  return {
    submitButton: {
      padding: '0.75rem 1rem',
      // ✅ Buttons sáng cho cả light và dark
      background: theme.primaryButton, // #3b82f6 cho cả hai theme
      color: theme.primaryButtonText,  // #ffffff cho cả hai theme
      border: 'none',
      borderRadius: '0.5rem',
      cursor: 'pointer',
      fontSize: '1rem',
      fontWeight: '600', // ✅ Bold hơn
      transition: 'all 0.3s ease', // ✅ Smooth hơn
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '0.5rem',
      marginTop: '1rem',
      // ✅ Enhanced styling cho dark theme
      ...(mode === 'dark' && {
        boxShadow: `
          0 4px 15px rgba(59, 130, 246, 0.2),
          0 0 20px rgba(59, 130, 246, 0.1),
          inset 0 1px 0 rgba(255, 255, 255, 0.1)
        `,
        backdropFilter: 'blur(10px)',
      })
    },
    submitButtonDisabled: {
      opacity: 0.5,
      cursor: 'not-allowed',
      transform: 'none !important',
    },
    spinner: {
      display: 'inline-block',
      width: '1rem',
      height: '1rem',
      border: `2px solid ${theme.primaryButtonText}33`,
      borderTop: `2px solid ${theme.primaryButtonText}`,
      borderRadius: '50%',
      animation: 'spin 1s linear infinite',
    },
  };
}

// ✅ Enhanced CSS cho dark theme với bright buttons
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = `
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
    
    /* ✅ Light theme hover - giữ nguyên */
    .submit-button-light:hover:not(:disabled) {
      background: #2563eb !important;
      transform: translateY(-1px);
      box-shadow: 0 6px 20px rgba(59, 130, 246, 0.3) !important;
    }
    
    /* ✅ Dark theme hover - enhanced với bright button */
    .submit-button-dark:hover:not(:disabled) {
      background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%) !important;
      transform: translateY(-2px) scale(1.02);
      box-shadow: 
        0 8px 25px rgba(59, 130, 246, 0.4),
        0 0 30px rgba(59, 130, 246, 0.2),
        inset 0 1px 0 rgba(255, 255, 255, 0.2) !important;
    }

    .submit-button-dark:active:not(:disabled) {
      transform: translateY(-1px) scale(1.01);
    }

    /* ✅ Button focus states */
    .submit-button-dark:focus:not(:disabled) {
      outline: none;
      box-shadow: 
        0 4px 15px rgba(59, 130, 246, 0.2),
        0 0 20px rgba(59, 130, 246, 0.1),
        0 0 0 3px rgba(59, 130, 246, 0.3) !important;
    }

    .submit-button-light:focus:not(:disabled) {
      outline: none;
      box-shadow: 
        0 4px 15px rgba(59, 130, 246, 0.3),
        0 0 0 3px rgba(59, 130, 246, 0.2) !important;
    }
  `;
  document.head.appendChild(style);
}