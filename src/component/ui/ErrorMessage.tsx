import React from 'react';

interface ErrorMessageProps {
  message: string;
  icon?: string;
}

export default function ErrorMessage({ message, icon = '⚠️' }: ErrorMessageProps) {
  if (!message) return null;

  return (
    <div style={styles.errorMessage}>
      {icon} {message}
    </div>
  );
}

const styles = {
  errorMessage: {
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
    color: '#dc2626',
    padding: '0.75rem',
    borderRadius: '0.5rem',
    fontSize: '0.875rem',
    border: '1px solid rgba(239, 68, 68, 0.3)',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  },
};