import React from 'react';

interface QuantitySelectorProps {
  quantity: number;
  onQuantityChange: (quantity: number) => void;
  maxQuantity?: number;
  minQuantity?: number;
  disabled?: boolean;
  size?: 'small' | 'medium' | 'large';
}

export default function QuantitySelector({
  quantity,
  onQuantityChange,
  maxQuantity = 999,
  minQuantity = 1,
  disabled = false,
  size = 'medium'
}: QuantitySelectorProps) {
  const handleDecrease = () => {
    if (quantity > minQuantity) {
      onQuantityChange(quantity - 1);
    }
  };

  const handleIncrease = () => {
    if (quantity < maxQuantity) {
      onQuantityChange(quantity + 1);
    }
  };

  const sizeStyles = {
    small: {
      button: { width: '28px', height: '28px', fontSize: '14px' },
      value: { width: '40px', height: '28px', fontSize: '14px' }
    },
    medium: {
      button: { width: '40px', height: '40px', fontSize: '18px' },
      value: { width: '50px', height: '40px', fontSize: '16px' }
    },
    large: {
      button: { width: '48px', height: '48px', fontSize: '20px' },
      value: { width: '60px', height: '48px', fontSize: '18px' }
    }
  };

  const currentSizeStyle = sizeStyles[size];

  return (
    <div style={styles.container}>
      <button 
        style={{
          ...styles.button,
          ...currentSizeStyle.button,
          opacity: disabled || quantity <= minQuantity ? 0.5 : 1,
          cursor: disabled || quantity <= minQuantity ? 'not-allowed' : 'pointer'
        }}
        onClick={handleDecrease}
        disabled={disabled || quantity <= minQuantity}
        onMouseEnter={(e) => {
          if (!disabled && quantity > minQuantity) {
            e.currentTarget.style.backgroundColor = '#f3f4f6';
          }
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = '#f9fafb';
        }}
      >
        -
      </button>
      
      <span style={{
        ...styles.value,
        ...currentSizeStyle.value
      }}>
        {quantity}
      </span>
      
      <button 
        style={{
          ...styles.button,
          ...currentSizeStyle.button,
          opacity: disabled || quantity >= maxQuantity ? 0.5 : 1,
          cursor: disabled || quantity >= maxQuantity ? 'not-allowed' : 'pointer'
        }}
        onClick={handleIncrease}
        disabled={disabled || quantity >= maxQuantity}
        onMouseEnter={(e) => {
          if (!disabled && quantity < maxQuantity) {
            e.currentTarget.style.backgroundColor = '#f3f4f6';
          }
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = '#f9fafb';
        }}
      >
        +
      </button>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    alignItems: 'center',
    gap: '0',
    border: '1px solid #d1d5db',
    borderRadius: '8px',
    overflow: 'hidden',
  },
  button: {
    border: 'none',
    background: '#f9fafb',
    color: '#374151',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'background 0.2s',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  value: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: '600',
    background: '#fff',
    borderLeft: '1px solid #d1d5db',
    borderRight: '1px solid #d1d5db',
  },
};