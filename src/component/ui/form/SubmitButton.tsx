import React from 'react';

interface SubmitButtonProps {
  isLoading: boolean;
  children: React.ReactNode;
  loadingText?: string;
  disabled?: boolean;
  onClick?: () => void;
}

export default function SubmitButton({
  isLoading,
  children,
  loadingText = 'Đang xử lý',
  disabled = false,
  onClick
}: SubmitButtonProps) {
  return (
    <button
      type="submit"
      disabled={isLoading || disabled}
      onClick={onClick}
      style={{
        ...styles.submitButton,
        ...(isLoading || disabled ? styles.submitButtonDisabled : {})
      }}
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

const styles = {
  submitButton: {
    padding: '0.75rem 1rem',
    backgroundColor: '#3b82f6',
    color: 'white',
    border: 'none',
    borderRadius: '0.5rem',
    cursor: 'pointer',
    fontSize: '1rem',
    fontWeight: '500',
    transition: 'all 0.2s ease',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
    boxShadow: '0 2px 4px rgba(59, 130, 246, 0.2)',
    marginTop: '1rem',
  },
  submitButtonDisabled: {
    opacity: 0.6,
    cursor: 'not-allowed',
    boxShadow: 'none',
  },
  spinner: {
    display: 'inline-block',
    width: '1rem',
    height: '1rem',
    border: '2px solid rgba(255, 255, 255, 0.3)',
    borderTop: '2px solid white',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
  },
};

// Add spinner animation and hover effects
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.textContent = `
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
    
    button[type="submit"]:hover:not(:disabled) {
      background-color: #2563eb !important;
      transform: translateY(-1px);
      box-shadow: 0 4px 8px rgba(59, 130, 246, 0.3) !important;
    }
  `;
  document.head.appendChild(styleSheet);
}