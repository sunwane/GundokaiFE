'use client';
import React from 'react';

export type SortType = 'default' | 'price-asc' | 'price-desc' | 'newest' | 'bestseller';

interface SortBarProps {
  sortType: SortType;
  onSortChange: (type: SortType) => void;
  children?: React.ReactNode; // Cho phép các page tự style phần bên trái
}

export default function SortBar({ 
  sortType, 
  onSortChange, 
  children 
}: SortBarProps) {
  const sortOptions = [
    { key: 'default' as SortType, label: 'Mặc định' },
    { key: 'price-asc' as SortType, label: 'Giá thấp đến cao' },
    { key: 'price-desc' as SortType, label: 'Giá cao đến thấp' },
    { key: 'newest' as SortType, label: 'Mới nhất' },
    { key: 'bestseller' as SortType, label: 'Bán chạy' },
  ];

  return (
    <div style={styles.container}>
      {/* Left side - Optional content from children */}
      <div style={styles.leftContent}>
        {children}
      </div>

      {/* Right side - Sort controls */}
      <div style={styles.sortSection}>
        <span style={styles.sortLabel}>Sắp xếp theo:</span>
        <div style={styles.sortWrapper}>
          <select
            value={sortType}
            onChange={(e) => onSortChange(e.target.value as SortType)}
            style={styles.sortSelect}
          >
            {sortOptions.map((option) => (
              <option key={option.key} value={option.key}>
                {option.label}
              </option>
            ))}
          </select>
          <span style={styles.sortArrow}>▼</span>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '16px 0',
    borderBottom: '1px solid #e5e7eb',
    marginBottom: '24px',
  },
  leftContent: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
  },
  sortSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  sortLabel: {
    fontSize: '14px',
    color: '#374151',
    fontWeight: '500',
    whiteSpace: 'nowrap' as const,
  },
  sortWrapper: {
    position: 'relative' as const,
    display: 'inline-block',
  },
  sortSelect: {
    appearance: 'none' as const,
    padding: '8px 32px 8px 12px',
    border: '1px solid #d1d5db',
    borderRadius: '6px',
    fontSize: '14px',
    color: '#374151',
    backgroundColor: '#fff',
    cursor: 'pointer',
    outline: 'none',
    minWidth: '160px',
    fontWeight: '500',
    transition: 'border-color 0.2s ease',
  },
  sortArrow: {
    position: 'absolute' as const,
    right: '10px',
    top: '50%',
    transform: 'translateY(-50%)',
    fontSize: '10px',
    color: '#6b7280',
    pointerEvents: 'none' as const,
  },
};