import React from 'react';
import { ThemeMode, getTheme } from '@/types/Theme';

interface FormInputProps {
  id: string;
  label: string;
  type?: 'text' | 'password';
  name: string;
  value: string;
  placeholder?: string;
  error?: string;
  required?: boolean;
  mode?: ThemeMode;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function FormInput({
  id,
  label,
  type = 'text',
  name,
  value,
  placeholder,
  error,
  required = false,
  mode = 'light',
  onChange
}: FormInputProps) {
  const theme = getTheme(mode);
  const styles = getStyles(theme);
  
  return (
    <div style={styles.formGroup}>
      <label style={styles.label} htmlFor={id}>{label}</label>
      <input
        id={id}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        style={{
          ...styles.input,
          ...(error ? styles.inputError : {})
        }}
        className={`form-input-${mode}`}
        required={required}
        // ✅ Thêm autocomplete attribute để control behavior
        autoComplete={type === 'password' ? 'current-password' : 'username'}
      />
      {error && (
        <span style={styles.fieldError}>{error}</span>
      )}
    </div>
  );
}

function getStyles(theme: any) {
  return {
    formGroup: {
      display: 'flex',
      flexDirection: 'column' as const,
      gap: '0.25rem',
    },
    label: {
      fontSize: '0.75rem',
      fontWeight: '500',
      color: theme.labelText,
    },
    input: {
      padding: '0.5rem',
      backgroundColor: theme.inputBackground,
      border: `1px solid ${theme.inputBorder}`,
      borderRadius: '0.5rem',
      color: theme.inputText,
      fontSize: '0.875rem',
      outline: 'none',
      transition: 'all 0.2s ease',
    },
    inputError: {
      borderColor: theme.errorBorder,
      backgroundColor: theme.errorBackground,
    },
    fieldError: {
      fontSize: '0.6875rem',
      color: theme.errorText,
      marginTop: '0.125rem',
    },
  };
}

// ✅ CSS để giữ nguyên màu theme bình thường khi autofill (không nhạt hơn)
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = `
    /* ========== AUTOCOMPLETE OVERRIDE - Giữ nguyên màu theme ========== */
    
    /* Dark mode autocomplete - giữ nguyên màu theme bình thường */
    .form-input-dark:-webkit-autofill,
    .form-input-dark:-webkit-autofill:hover,
    .form-input-dark:-webkit-autofill:focus,
    .form-input-dark:-webkit-autofill:active {
      -webkit-box-shadow: 0 0 0 30px rgba(15, 23, 42, 0.8) inset !important; /* ✅ Giống màu theme bình thường */
      -webkit-text-fill-color: #e2e8f0 !important; /* ✅ Giống màu text theme bình thường */
      caret-color: #e2e8f0 !important;
      border: 1px solid rgba(100, 116, 139, 0.3) !important; /* ✅ Giống border theme bình thường */
      transition: background-color 5000s ease-in-out 0s;
    }

    /* ========== MOZILLA AUTOCOMPLETE ========== */
    
    .form-input-dark:-moz-autofill {
      background-color: rgba(15, 23, 42, 0.8) !important; /* ✅ Giống màu theme bình thường */
      color: #e2e8f0 !important; /* ✅ Giống text theme bình thường */
      border: 1px solid rgba(100, 116, 139, 0.3) !important;
    }

    /* ========== FOCUS STATES - Giữ nguyên ========== */
    
    /* Dark mode focus */
    .form-input-dark:focus {
      border-color: #60a5fa !important;
      box-shadow: 0 0 0 3px rgba(96, 165, 250, 0.2) !important;
    }
    
    .form-input-dark:focus:-webkit-autofill {
      -webkit-box-shadow: 
        0 0 0 30px rgba(15, 23, 42, 0.8) inset, /* ✅ Giống màu theme bình thường */
        0 0 0 3px rgba(96, 165, 250, 0.2) !important;
      -webkit-text-fill-color: #e2e8f0 !important; /* ✅ Giống text theme bình thường */
      border-color: #60a5fa !important;
    }

    /* ========== HOVER STATES - Giữ nguyên ========== */
    
    .form-input-dark:hover:-webkit-autofill {
      -webkit-box-shadow: 0 0 0 30px rgba(15, 23, 42, 0.8) inset !important; /* ✅ Giống màu theme bình thường */
      -webkit-text-fill-color: #e2e8f0 !important;
    }

    /* ========== PLACEHOLDER STYLES ========== */
    
    .form-input-dark::placeholder {
      color: rgba(148, 163, 184, 0.6) !important;
    }

    /* ========== ADDITIONAL BROWSER SUPPORT ========== */
    
    /* Edge/IE autocomplete */
    .form-input-dark::-ms-reveal {
      display: none;
    }

    /* Input type search clear button */
    .form-input-dark::-webkit-search-cancel-button {
      -webkit-appearance: none;
      appearance: none;
    }

    /* ========== ANIMATION OVERRIDE ========== */
    
    .form-input-dark {
      animation-name: none !important;
      animation-fill-mode: unset !important;
    }

    /* ========== SELECTION STYLES ========== */
    
    .form-input-dark::selection {
      background-color: rgba(96, 165, 250, 0.3);
      color: #e2e8f0;
    }

    /* ========== PREVENT ALL AUTOCOMPLETE STYLING ========== */
    
    .form-input-dark:-webkit-autofill {
      -webkit-transition: background-color 5000s ease-in-out 0s !important;
      transition: background-color 5000s ease-in-out 0s !important;
    }
  `;
  document.head.appendChild(style);
}