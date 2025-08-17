import React from 'react';

interface AlertMessageProps {
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
  onClose?: () => void;
}

export default function AlertMessage({ type, message, onClose }: AlertMessageProps) {
  const getTypeStyles = () => {
    switch (type) {
      case 'success':
        return {
          backgroundColor: '#f0fdf4',
          color: '#16a34a',
          border: '1px solid #bbf7d0',
          icon: '✅'
        };
      case 'error':
        return {
          backgroundColor: '#fef2f2',
          color: '#dc2626',
          border: '1px solid #fecaca',
          icon: '⚠️'
        };
      case 'warning':
        return {
          backgroundColor: '#fffbeb',
          color: '#d97706',
          border: '1px solid #fed7aa',
          icon: '⚠️'
        };
      default:
        return {
          backgroundColor: '#eff6ff',
          color: '#2563eb',
          border: '1px solid #bfdbfe',
          icon: 'ℹ️'
        };
    }
  };

  const typeStyles = getTypeStyles();

  return (
    <div style={{ ...styles.alert, ...typeStyles }}>
      <span style={styles.icon}>{typeStyles.icon}</span>
      <span style={styles.message}>{message}</span>
      {onClose && (
        <button onClick={onClose} style={styles.closeButton}>
          ×
        </button>
      )}
    </div>
  );
}

const styles = {
  alert: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '12px 16px',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '500',
    marginBottom: '16px',
  },
  icon: {
    fontSize: '16px',
  },
  message: {
    flex: 1,
  },
  closeButton: {
    background: 'none',
    border: 'none',
    fontSize: '18px',
    cursor: 'pointer',
    padding: '0 4px',
    color: 'inherit',
  },
};