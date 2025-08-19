import React from 'react';

interface LoadingSpinnerProps {
  text?: string;
  size?: 'small' | 'medium' | 'large';
  spinner?: boolean;
}

export default function LoadingSpinner({ 
  text = "Đang tải...", 
  size = 'medium',
  spinner = true,
}: LoadingSpinnerProps) {
  const sizeMap = {
    small: '20px',
    medium: '28px',
    large: '36px'
  };

  const fontSizeMap = {
    small: '12px',
    medium: '16px',
    large: '18px'
  };

  return (
    <div style={styles.gundamContainer}>
      {spinner && (
        <div style={{
          ...styles.gundamSpinner,
          width: sizeMap[size],
          height: sizeMap[size],
        }} />
      )}
      <span style={{
        ...styles.gundamText,
        fontSize: fontSizeMap[size],
      }}>
        {text}
      </span>
      <style>{`
        @keyframes gundamPulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.6; }
        }
        @keyframes spin {
          to { 
            transform: rotate(360deg); } 
        }
        `}</style>
    </div>
  );
}

const styles = {
  // Gundam style - nằm ngang
  gundamContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '16px',
    padding: '20px',
  },
  gundamSpinner: {
    border: '5px solid #e5e7eb',
    borderTop: '5px solid rgb(58, 58, 255)',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
  },
  gundamText: {
    color: '#1a1aff',
    fontWeight: 'bold',
    textTransform: 'uppercase' as const,
    letterSpacing: '1px',
    animation: 'gundamPulse 1.5s ease-in-out infinite',
    textShadow: '0 0 10px rgba(26, 26, 255, 0.2)',
  },
};