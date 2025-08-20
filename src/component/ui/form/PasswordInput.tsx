import React from 'react';
import { ThemeMode, getTheme } from '@/types/Theme';

interface PasswordInputProps {
  id: string;
  label: string;
  name: string;
  value: string;
  placeholder?: string;
  error?: string;
  required?: boolean;
  showPassword: boolean;
  mode?: ThemeMode;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onTogglePassword: () => void;
}

export default function PasswordInput({
  id,
  label,
  name,
  value,
  placeholder,
  error,
  required = false,
  showPassword,
  mode = 'light',
  onChange,
  onTogglePassword
}: PasswordInputProps) {
  const theme = getTheme(mode);
  const styles = getStyles(theme);

  return (
    <div style={styles.formGroup}>
      <label htmlFor={id} style={styles.label}>
        {label} {required && <span style={{ color: theme.errorText }}>*</span>}
      </label>
      <div style={styles.inputWrapper}>
        <input
          id={id}
          name={name}
          type={showPassword ? 'text' : 'password'}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          required={required}
          style={{
            ...styles.input,
            ...(error ? styles.inputError : {})
          }}
          className={`form-input-${mode}`}
        />
        <button
          type="button"
          onClick={onTogglePassword}
          style={styles.toggleButton}
          aria-label={showPassword ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
        >
          {showPassword ? '👁️' : '🙈'}
        </button>
      </div>
      {error && (
        <span style={styles.errorText}>{error}</span>
      )}
    </div>
  );
}

function getStyles(theme: any) {
  const styles = {
    input: {
      padding: '0.5rem',
      paddingRight: '2.5rem',
      backgroundColor: theme.inputBackground,
      border: `1px solid ${theme.inputBorder}`,
      borderRadius: '0.5rem',
      color: theme.inputText,
      fontSize: '0.875rem',
      outline: 'none',
      transition: 'all 0.2s ease',
      width: '100%',
      height: '42px',
    },
  };

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
    inputWrapper: {
      position: 'relative' as const,
    },
    input: styles.input,
    inputError: {
      borderColor: theme.errorBorder,
    },
    toggleButton: {
      position: 'absolute' as const,
      right: '0.5rem',
      top: '50%',
      transform: 'translateY(-50%)',
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      fontSize: '1rem',
      padding: '0.25rem',
      color: theme.inputText,
      opacity: 0.7,
      transition: 'opacity 0.2s ease',
    },
    errorText: {
      fontSize: '0.75rem',
      color: theme.errorText,
      marginTop: '0.25rem',
    },
  };
}