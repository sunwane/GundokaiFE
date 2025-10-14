'use client';
import React from 'react';
import { useCartBadge } from '@/hooks/cart/useCartBadge';

interface CartBadgeProps {
  isMobile?: boolean;
  isTablet?: boolean; // Thêm prop cho tablet
  style?: React.CSSProperties;
}

export default function CartBadge({ 
  isMobile = false, 
  isTablet = false, // Default false
  style 
}: CartBadgeProps) {
  const { cartItemCount } = useCartBadge();

  if (cartItemCount === 0) return null;

  // Logic chọn style dựa trên device type
  let badgeStyle;
  if (isMobile) {
    badgeStyle = styles.mobileBadge;
  } else if (isTablet) {
    badgeStyle = styles.tabletBadge;
  } else {
    badgeStyle = styles.desktopBadge;
  }

  return (
    <div style={{ ...badgeStyle, ...style }}>
      <span style={styles.badgeText}>
        {cartItemCount > 99 ? '99+' : cartItemCount}
      </span>
    </div>
  );
}

const styles = {
  mobileBadge: {
    position: 'absolute' as const,
    top: '0px',
    right: '0px',
    backgroundColor: '#ef4444',
    borderRadius: '10px',
    minWidth: '18px',
    height: '18px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '2px solid #fff',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    zIndex: 10,
  },
  tabletBadge: {
    position: 'absolute' as const,
    top: '0px',
    right: '0px', // Position trên icon, không có text
    backgroundColor: '#ef4444',
    borderRadius: '10px',
    minWidth: '18px',
    height: '18px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '2px solid #fff',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    zIndex: 10,
  },
  desktopBadge: {
    position: 'absolute' as const,
    top: '0px',
    right: '65px', // Position để tránh text "Giỏ hàng"
    backgroundColor: '#ef4444',
    borderRadius: '12px',
    minWidth: '20px',
    height: '20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '2px solid #fff',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    zIndex: 10,
  },
  badgeText: {
    color: '#fff',
    fontSize: '10px',
    fontWeight: '700',
    lineHeight: 1,
    padding: '0 4px',
  },
};