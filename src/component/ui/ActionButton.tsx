import React from 'react';

interface ActionButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
}

export default function ActionButton({ 
  onClick, 
  children, 
  variant = 'outline', 
  size = 'medium',
  disabled = false 
}: ActionButtonProps) {
  const getVariantStyles = () => {
    switch (variant) {
      case 'primary':
        return {
          backgroundColor: '#3b82f6',
          color: 'white',
          border: 'none',
        };
      case 'secondary':
        return {
          backgroundColor: '#f3f4f6',
          color: '#374151',
          border: '1px solid #d1d5db',
        };
      default:
        return {
          backgroundColor: 'transparent',
          color: '#374151',
          border: '1px solid #d1d5db',
        };
    }
  };

  const getSizeStyles = () => {
    switch (size) {
      case 'small':
        return { padding: '6px 12px', fontSize: '12px' };
      case 'large':
        return { padding: '12px 24px', fontSize: '16px' };
      default:
        return { padding: '8px 16px', fontSize: '14px' };
    }
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        ...styles.button,
        ...getVariantStyles(),
        ...getSizeStyles(),
        opacity: disabled ? 0.6 : 1,
        cursor: disabled ? 'not-allowed' : 'pointer',
      }}
    >
      {children}
    </button>
  );
}

const styles = {
  button: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    borderRadius: '8px',
    fontWeight: '500',
    transition: 'all 0.2s ease',
    outline: 'none',
  },
};