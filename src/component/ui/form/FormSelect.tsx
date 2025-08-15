import React from 'react';
import { ThemeMode, getTheme } from '@/types/Theme';

interface FormSelectProps {
  id: string;
  label: string;
  name: string;
  value: string;
  error?: string;
  required?: boolean;
  mode?: ThemeMode; // ✅ Thêm mode prop
  options: { value: string; label: string }[];
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export default function FormSelect({
  id,
  label,
  name,
  value,
  error,
  required = false,
  mode = 'light', // ✅ Default light
  options,
  onChange
}: FormSelectProps) {
  const theme = getTheme(mode);
  const styles = getStyles(theme);
  
  return (
    <div style={styles.formGroup}>
      <label style={styles.label} htmlFor={id}>{label}</label>
      <select
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        style={{
          ...styles.select,
          ...(error ? styles.inputError : {})
        }}
        className={`form-select-${mode}`}
        required={required}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && (
        <span style={styles.fieldError}>{error}</span>
      )}
    </div>
  );
}

// ✅ Generate styles based on theme
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
    select: {
      padding: '0.5rem',
      backgroundColor: theme.inputBackground,
      border: `1px solid ${theme.inputBorder}`,
      borderRadius: '0.5rem',
      color: theme.inputText,
      fontSize: '0.875rem',
      outline: 'none',
      cursor: 'pointer',
      appearance: 'none' as const,
      backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%23${theme.inputText.replace('#', '')}' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
      backgroundPosition: 'right 0.5rem center',
      backgroundRepeat: 'no-repeat',
      backgroundSize: '1rem',
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

// ✅ CSS cho focus states
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = `
    /* Light mode styles */
    .form-select-light:focus {
      border-color: #3b82f6 !important;
      box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1) !important;
    }
    
    /* Dark mode styles */
    .form-select-dark:focus {
      border-color: #60a5fa !important;
      box-shadow: 0 0 0 3px rgba(96, 165, 250, 0.2) !important;
    }
  `;
  document.head.appendChild(style);
}