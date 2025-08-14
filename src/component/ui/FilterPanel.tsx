'use client';
import React, { useState } from 'react';

export type StockStatus = 'all' | 'in-stock' | 'out-of-stock' | 'coming-soon';

interface FilterPanelProps {
  stockFilter: StockStatus;
  onStockFilterChange: (status: StockStatus) => void;
  priceRange: { min: number; max: number };
  onPriceRangeChange: (range: { min: number; max: number }) => void;
}

export default function FilterPanel({ 
  stockFilter, 
  onStockFilterChange, 
  priceRange, 
  onPriceRangeChange 
}: FilterPanelProps) {
  const [tempPriceRange, setTempPriceRange] = useState(priceRange);

  const stockOptions = [
    { key: 'all' as StockStatus, label: 'Tất cả', color: '#6c757d' },
    { key: 'in-stock' as StockStatus, label: 'Còn hàng', color: '#28a745' },
    { key: 'out-of-stock' as StockStatus, label: 'Hết hàng', color: '#dc3545' },
    { key: 'coming-soon' as StockStatus, label: 'Hàng sắp về', color: '#ffc107' },
  ];

  const handlePriceSubmit = () => {
    onPriceRangeChange(tempPriceRange);
  };

  const handlePriceReset = () => {
    const resetRange = { min: 0, max: 10000000 };
    setTempPriceRange(resetRange);
    onPriceRangeChange(resetRange);
  };

  return (
    <div style={styles.filterPanel}>
      {/* ✅ Header */}
      <div style={styles.filterHeader}>
        <h3 style={styles.filterTitle}>BỘ LỌC</h3>
      </div>

      {/* ✅ Stock Status Filter */}
      <div style={styles.filterSection}>
        <h4 style={styles.sectionTitle}>Trạng thái hàng</h4>
        <div style={styles.stockOptions}>
          {stockOptions.map((option) => (
            <button
              key={option.key}
              onClick={() => onStockFilterChange(option.key)}
              style={{
                ...styles.stockButton,
                ...(stockFilter === option.key ? styles.stockButtonActive : {}),
                borderLeftColor: option.color,
              }}
            >
              <span 
                style={{ 
                  ...styles.stockIndicator, 
                  backgroundColor: option.color 
                }}
              ></span>
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {/* ✅ Price Range Filter */}
      <div style={styles.filterSection}>
        <h4 style={styles.sectionTitle}>Khoảng giá</h4>
        <div style={styles.priceInputs}>
          <div style={styles.priceInputGroup}>
            <label style={styles.priceLabel}>Từ:</label>
            <input
              type="number"
              value={tempPriceRange.min}
              onChange={(e) => setTempPriceRange({
                ...tempPriceRange,
                min: Number(e.target.value)
              })}
              style={styles.priceInput}
              placeholder="0"
            />
          </div>
          <div style={styles.priceInputGroup}>
            <label style={styles.priceLabel}>Đến:</label>
            <input
              type="number"
              value={tempPriceRange.max}
              onChange={(e) => setTempPriceRange({
                ...tempPriceRange,
                max: Number(e.target.value)
              })}
              style={styles.priceInput}
              placeholder="10,000,000"
            />
          </div>
        </div>
        <div style={styles.priceButtons}>
          <button onClick={handlePriceSubmit} style={styles.applyButton}>
            Áp dụng
          </button>
          <button onClick={handlePriceReset} style={styles.resetButton}>
            Đặt lại
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  filterPanel: {
    width: '280px',
    backgroundColor: '#ffffff',
    border: '3px solid #1a1aff',
    clipPath: 'polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))',
    padding: '0',
    position: 'sticky' as const,
    top: '20px',
    height: 'fit-content',
    maxHeight: 'calc(100vh - 40px)',
    overflowY: 'auto' as const,
  },
  filterHeader: {
    background: 'linear-gradient(135deg, #1a1aff 0%, #ff6b35 100%)',
    color: 'white',
    padding: '16px 20px',
    clipPath: 'polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 0 100%)',
    marginBottom: '0',
  },
  filterTitle: {
    margin: 0,
    fontSize: '16px',
    fontWeight: 'bold',
    textTransform: 'uppercase' as const,
    letterSpacing: '1px',
  },
  filterSection: {
    padding: '20px',
    borderBottom: '2px solid #e9ecef',
  },
  sectionTitle: {
    margin: '0 0 16px 0',
    fontSize: '14px',
    fontWeight: 'bold',
    color: '#333',
    textTransform: 'uppercase' as const,
    letterSpacing: '0.5px',
  },
  stockOptions: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '8px',
  },
  stockButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '12px 16px',
    backgroundColor: '#f8f9fa',
    border: '2px solid #e9ecef',
    borderLeft: '4px solid #6c757d',
    borderRadius: '0',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    fontSize: '13px',
    fontWeight: '500',
    color: '#495057',
    textAlign: 'left' as const,
  },
  stockButtonActive: {
    backgroundColor: '#e3f2fd',
    borderColor: '#1a1aff',
    color: '#1a1aff',
    fontWeight: '600',
    transform: 'translateX(4px)',
  },
  stockIndicator: {
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    flexShrink: 0,
  },
  priceInputs: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '12px',
    marginBottom: '16px',
  },
  priceInputGroup: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '4px',
  },
  priceLabel: {
    fontSize: '12px',
    fontWeight: '500',
    color: '#666',
    textTransform: 'uppercase' as const,
  },
  priceInput: {
    padding: '8px 12px',
    border: '2px solid #e9ecef',
    borderRadius: '0',
    fontSize: '14px',
    color: '#495057',
    outline: 'none',
    transition: 'border-color 0.2s ease',
  },
  priceButtons: {
    display: 'flex',
    gap: '8px',
  },
  applyButton: {
    flex: 1,
    padding: '10px 16px',
    background: 'linear-gradient(135deg, #1a1aff 0%, #ff6b35 100%)',
    color: 'white',
    border: '2px solid #1a1aff',
    borderRadius: '0',
    cursor: 'pointer',
    fontSize: '12px',
    fontWeight: 'bold',
    textTransform: 'uppercase' as const,
    letterSpacing: '0.5px',
    transition: 'all 0.2s ease',
  },
  resetButton: {
    flex: 1,
    padding: '10px 16px',
    backgroundColor: '#f8f9fa',
    color: '#666',
    border: '2px solid #e9ecef',
    borderRadius: '0',
    cursor: 'pointer',
    fontSize: '12px',
    fontWeight: 'bold',
    textTransform: 'uppercase' as const,
    letterSpacing: '0.5px',
    transition: 'all 0.2s ease',
  },
};