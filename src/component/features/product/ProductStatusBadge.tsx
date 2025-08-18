import React from 'react';

interface ProductStatusBadgeProps {
  text: string;
  color: string;
  backgroundColor: string;
  position?: 'top-left' | 'bottom-right';
}

export default function ProductStatusBadge({ 
  text, 
  color, 
  backgroundColor, 
  position = 'top-left' 
}: ProductStatusBadgeProps) {
  return (
    <div style={{
      ...styles.badge,
      ...styles[position],
      color,
      backgroundColor,
    }}>
      <span style={styles.badgeText}>{text}</span>
    </div>
  );
}

const styles = {
  badge: {
    position: 'absolute' as const,
    zIndex: 10,
    padding: '4px 8px',
    borderRadius: '4px',
    fontSize: '10px',
    fontWeight: 'bold',
    letterSpacing: '0.5px',
    textAlign: 'center' as const,
    boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
    animation: 'fadeInScale 0.3s ease-out',
  },
  'bottom-right': { 
    bottom: '4px',
    right: '4px',
  },
  'top-left': {
    top: '4px',
    left: '4px',
  },
  badgeText: {
    textShadow: '0 1px 2px rgba(0,0,0,0.3)',
  },
};