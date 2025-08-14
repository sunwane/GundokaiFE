import React from 'react';

interface PasswordInputProps {
  id: string;
  label: string;
  name: string;
  value: string;
  placeholder?: string;
  error?: string;
  required?: boolean;
  showPassword: boolean;
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
  onChange,
  onTogglePassword
}: PasswordInputProps) {
  return (
    <div style={styles.formGroup}>
      <label style={styles.label} htmlFor={id}>{label}</label>
      <div style={styles.inputWrapper}>
        <input
          id={id}
          type={showPassword ? 'text' : 'password'}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          style={{
            ...styles.input,
            ...(error ? styles.inputError : {})
          }}
          required={required}
        />
        <button
          type="button"
          onClick={onTogglePassword}
          style={styles.toggleButton}
        >
          {showPassword ? '👁️' : '👁️‍🗨️'}
        </button>
      </div>
      {error && (
        <span style={styles.fieldError}>{error}</span>
      )}
    </div>
  );
}

const styles = {
  formGroup: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '0.25rem', // Giảm từ 0.5rem
  },
  label: {
    fontSize: '0.75rem', // Giảm từ 0.875rem
    fontWeight: '500',
    color: '#374151',
  },
  inputWrapper: {
    position: 'relative' as const,
  },
  input: {
    padding: '0.5rem', // Giảm từ 0.75rem
    paddingRight: '2.5rem', // Giảm từ 3rem để phù hợp với padding mới
    backgroundColor: '#ffffff',
    border: '1px solid #d1d5db',
    borderRadius: '0.5rem',
    color: '#374151',
    fontSize: '0.875rem', // Giảm từ 1rem
    outline: 'none',
    transition: 'all 0.2s ease',
    width: '100%',
  },
  inputError: {
    borderColor: '#ef4444',
    backgroundColor: 'rgba(239, 68, 68, 0.05)',
  },
  toggleButton: {
    position: 'absolute' as const,
    right: '0.5rem', // Giảm từ 0.75rem
    top: '50%',
    transform: 'translateY(-50%)',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    fontSize: '0.875rem', // Giảm từ 1rem
    color: '#6b7280',
    padding: '0.25rem',
  },
  fieldError: {
    fontSize: '0.6875rem', // Giảm từ 0.75rem
    color: '#dc2626',
    marginTop: '0.125rem', // Giảm từ 0.25rem
  },
};