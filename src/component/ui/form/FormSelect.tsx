import React from 'react';

interface FormSelectProps {
  id: string;
  label: string;
  name: string;
  value: string;
  error?: string;
  required?: boolean;
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
  options,
  onChange
}: FormSelectProps) {
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
  select: {
    padding: '0.5rem', // Giảm từ 0.75rem
    backgroundColor: '#ffffff',
    border: '1px solid #d1d5db',
    borderRadius: '0.5rem',
    color: '#374151',
    fontSize: '0.875rem', // Giảm từ 1rem
    outline: 'none',
    cursor: 'pointer',
    appearance: 'none' as const,
    backgroundImage: 'url("data:image/svg+xml,%3csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 20 20\'%3e%3cpath stroke=\'%23374151\' stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'1.5\' d=\'M6 8l4 4 4-4\'/%3e%3c/svg%3e")',
    backgroundPosition: 'right 0.5rem center', // Điều chỉnh position cho padding mới
    backgroundRepeat: 'no-repeat',
    backgroundSize: '1rem',
    transition: 'all 0.2s ease',
  },
  inputError: {
    borderColor: '#ef4444',
    backgroundColor: 'rgba(239, 68, 68, 0.05)',
  },
  fieldError: {
    fontSize: '0.6875rem', // Giảm từ 0.75rem
    color: '#dc2626',
    marginTop: '0.125rem', // Giảm từ 0.25rem
  },
};