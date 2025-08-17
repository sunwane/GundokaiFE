import React from 'react';

interface CardProps {
  children: React.ReactNode;
  padding?: 'none' | 'small' | 'medium' | 'large';
  shadow?: boolean;
}

export default function Card({ children, padding = 'medium', shadow = true }: CardProps) {
  const getPaddingStyles = () => {
    switch (padding) {
      case 'none':
        return { padding: 0 };
      case 'small':
        return { padding: '16px' };
      case 'large':
        return { padding: '32px' };
      default:
        return { padding: '24px' };
    }
  };

  return (
    <div style={{
      ...styles.card,
      ...getPaddingStyles(),
      boxShadow: shadow ? '0 8px 25px rgba(0, 0, 0, 0.1)' : 'none',
    }}>
      {children}
    </div>
  );
}

const styles = {
  card: {
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    border: '1px solid #e5e7eb',
    overflow: 'hidden',
  },
};