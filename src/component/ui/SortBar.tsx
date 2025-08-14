'use client';
import { maxHeaderSize } from 'http';
import React from 'react';

export type SortType = 'default' | 'price-asc' | 'price-desc' | 'newest' | 'bestseller';

interface SortBarProps {
  sortType: SortType;
  onSortChange: (type: SortType) => void;
}

export default function SortBar({ sortType, onSortChange }: SortBarProps) {
  const sortOptions = [
    { key: 'default' as SortType, label: 'Mặc định' },
    { key: 'price-asc' as SortType, label: 'Giá', icon: '↑' },
    { key: 'price-desc' as SortType, label: 'Giá', icon: '↓' },
    { key: 'newest' as SortType, label: 'Mới nhất' },
    { key: 'bestseller' as SortType, label: 'Bán chạy' },
  ];

  return (
    <div style={styles.sortContainer}>
      <div style={styles.sortLabel}>
        <span style={styles.sortText}>Sắp xếp theo</span>
      </div>
      
      <div style={styles.sortButtons}>
        {sortOptions.map((option) => (
          <button 
            key={option.key}
            onClick={() => onSortChange(option.key)}
            style={{
              ...styles.sortButton,
              ...(sortType === option.key ? styles.sortButtonActive : {})
            }}
          >
            <span style={styles.sortButtonText}>{option.label}</span>
            {option.icon && (
              <span style={styles.sortArrow}>{option.icon}</span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

const styles = {
  // ✅ Gundam-style Sort Container
  sortContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    background: 'linear-gradient(90deg, #f8f9fa 0%, #e9ecef 50%, #f8f9fa 100%)',
    gap: '20px',
    flexWrap: 'wrap' as const,
    position: 'relative' as const,
    width: '100%',
    maxWidth: '1400px',
    padding: '20px 5vw',
    margin: '0 auto',
  },
  sortLabel: {
    display: 'flex',
    alignItems: 'center',
    background: '#1a1aff',
    color: 'white',
    padding: '8px 16px',
    clipPath: 'polygon(0 0, calc(100% - 8px) 0, 100% 50%, calc(100% - 8px) 100%, 0 100%)',
    fontWeight: 'bold',
    letterSpacing: '1px',
  },
  sortText: {
    fontSize: '14px',
    fontWeight: '700',
    textTransform: 'uppercase' as const,
  },
  sortButtons: {
    display: 'flex',
    gap: '8px',
    flexWrap: 'wrap' as const,
  },
  sortButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    padding: '10px 16px',
    backgroundColor: '#ffffff',
    border: '2px solid #333',
    borderRadius: '0', // ✅ Sharp edges
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    fontSize: '13px',
    fontWeight: '600',
    color: '#333',
    textTransform: 'uppercase' as const,
    letterSpacing: '0.5px',
    clipPath: 'polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 6px 100%, 0 calc(100% - 6px))',
    position: 'relative' as const,
  },
  sortButtonActive: {
    background: 'linear-gradient(135deg, #1a1aff 0%, #ff6b35 100%)',
    borderColor: '#1a1aff',
    color: '#ffffff',
    transform: 'translateY(-2px)',
    boxShadow: '0 4px 8px rgba(26,26,255,0.3)',
  },
  sortButtonText: {
    fontSize: '13px',
    fontWeight: '600',
  },
  sortArrow: {
    fontSize: '14px',
    fontWeight: 'bold',
    color: '#ff6b35', // ✅ Orange accent for active state
  },
};