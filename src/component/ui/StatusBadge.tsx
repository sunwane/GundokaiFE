import React from 'react';

interface StatusBadgeProps {
  status: string;
  color: string;
  text: string;
  size?: 'small' | 'medium' | 'large';
}

export default function StatusBadge({ status, color, text, size = 'medium' }: StatusBadgeProps) {
  const getSizeStyles = () => {
    switch (size) {
      case 'small':
        return { padding: '2px 8px', fontSize: '10px' };
      case 'large':
        return { padding: '6px 16px', fontSize: '14px' };
      default:
        return { padding: '4px 12px', fontSize: '12px' };
    }
  };

  return (
    <span
      style={{
        ...styles.badge,
        ...getSizeStyles(),
        backgroundColor: color + '20',
        color: color,
        border: `1px solid ${color}30`,
      }}
    >
      {text}
    </span>
  );
}

const styles = {
  badge: {
    borderRadius: '20px',
    fontWeight: '500',
    display: 'inline-block',
  },
};