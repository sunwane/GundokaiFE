import React from 'react';

interface FormInputProps {
  id: string;
  label: string;
  type?: 'text' | 'password'; // ✅ Bỏ 'email' type
  name: string;
  value: string;
  placeholder?: string;
  error?: string;
  required?: boolean;
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
  onChange
}: FormInputProps) {
  return (
    <div style={styles.formGroup}>
      <label style={styles.label} htmlFor={id}>{label}</label>
      <input
        id={id}
        type={type} // ✅ Sẽ luôn là 'text' hoặc 'password', không bao giờ là 'email'
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
    gap: '0.25rem',
  },
  label: {
    fontSize: '0.75rem',
    fontWeight: '500',
    color: '#374151',
  },
  input: {
    padding: '0.5rem',
    backgroundColor: '#ffffff',
    border: '1px solid #d1d5db',
    borderRadius: '0.5rem',
    color: '#374151',
    fontSize: '0.875rem',
    outline: 'none',
    transition: 'all 0.2s ease',
  },
  inputError: {
    borderColor: '#ef4444',
    backgroundColor: 'rgba(239, 68, 68, 0.05)',
  },
  fieldError: {
    fontSize: '0.6875rem',
    color: '#dc2626',
    marginTop: '0.125rem',
  },
};