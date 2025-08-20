'use client';
import React from 'react';
import CollapsibleSection from '@/component/ui/CollapsibleSection';
import StockStatusFilter from './StockStatusFilter';
import PriceRangeSlider from './PriceRangeSlider';
import CategoryFilter from './CategoryFilter';
import { StockStatus } from '@/types/Product';
import { Product } from '@/types/Product';
import { max } from 'three/tsl';

interface FilterPanelProps {
  // Pending filters
  pendingStockFilter: StockStatus[];
  pendingPriceRange: { min: number; max: number };
  pendingCategories?: string[];
  
  // Handlers for pending changes
  onPendingStockChange: (statuses: StockStatus[]) => void;
  onPendingPriceChange: (range: { min: number; max: number }) => void;
  onPendingCategoryChange?: (categories: string[]) => void;
  
  // Actions
  onApply: () => void;
  onReset: () => void;
  hasChanges: boolean;
  
  // Display options
  showCategories?: boolean;
  isPopup?: boolean;
  onClose?: () => void;

  // Additional data
  products?: Product[]; // Thêm products để tính count
}

export default function FilterPanel({ 
  pendingStockFilter,
  pendingPriceRange,
  pendingCategories = [],
  onPendingStockChange,
  onPendingPriceChange,
  onPendingCategoryChange,
  onApply,
  onReset,
  hasChanges,
  products = [], // Thêm products
  showCategories = false,
  isPopup = false,
  onClose
}: FilterPanelProps) {

  const containerStyle = isPopup 
    ? { ...styles.filterPanel, ...styles.popupPanel, padding: '2vw 4vw' }
    : { ...styles.filterPanel, padding: '0.75vw' };

  return (
    <>
      {isPopup && <div style={styles.overlay} onClick={onClose} />}
      {isPopup && (
        <button
          onClick={onClose}
          style={styles.outsideCloseButton}
        >
          ✕
        </button>
      )}
      <div style={containerStyle}>
        {/* Header */}
        <div style={styles.filterHeader}>
          <div style={styles.headerContent}>
            <img src="/images/icons/filter.png" alt="filter" style={styles.filterIcon} />
            <h3 style={styles.filterTitle}>BỘ LỌC</h3>
          </div>
        </div>

        <div style={styles.filterContent}>
          {/* Category Filter - CẬP NHẬT */}
          {showCategories && onPendingCategoryChange && (
            <CollapsibleSection title="DANH MỤC SẢN PHẨM">
              <CategoryFilter
                selectedCategories={pendingCategories}
                onCategoryChange={onPendingCategoryChange}
                products={products}
              />
            </CollapsibleSection>
          )}

          {/* Stock Status Filter */}
          <CollapsibleSection title="TRẠNG THÁI HÀNG HÓA">
            <StockStatusFilter
              selectedStatuses={pendingStockFilter}
              onStatusChange={onPendingStockChange}
            />
          </CollapsibleSection>

          {/* Price Range Filter */}
          <CollapsibleSection title="KHOẢNG GIÁ">
            <PriceRangeSlider
              priceRange={pendingPriceRange}
              onPriceRangeChange={onPendingPriceChange}
            />
          </CollapsibleSection>
        </div>

        {/* Action Section */}
        <div style={styles.actionSection}>
          {hasChanges && (
            <div style={styles.changeIndicator}>
              <span style={styles.changeIcon}>●</span>
              <span style={styles.changeText}>Có thay đổi chưa áp dụng</span>
            </div>
          )}
          
          <div style={styles.actionButtons}>
            <button onClick={onReset} style={styles.resetButton}>
              <span style={styles.buttonIcon}>↻</span>
              ĐẶT LẠI
            </button>
            <button 
              onClick={onApply} 
              style={{
                ...styles.applyButton,
                opacity: hasChanges ? 1 : 0.5,
                cursor: hasChanges ? 'pointer' : 'not-allowed'
              }}
              disabled={!hasChanges}
            >
              <span style={styles.buttonIcon}>✓</span>
              ÁP DỤNG BỘ LỌC
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

const styles = {
  filterPanel: {
    width: '300px',
    backgroundImage: 'url("/images/frames/filter.png")',
    backgroundSize: '100% 100%',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    position: 'sticky' as const,
    top: '10px',
    height: 'fit-content',
    maxHeight: 'calc(100vh - 40px)',
    overflowY: 'auto' as const,
  },
  popupPanel: {
    position: 'fixed' as const,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '90vw',
    maxWidth: '360px',
    maxHeight: '85vh',
    zIndex: 1000,
  },
  overlay: {
    position: 'fixed' as const,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    zIndex: 999,
    backdropFilter: 'blur(3px)',
  },
  filterHeader: {
    padding: '12px 20px 8px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerContent: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  filterIcon: {
    width: "20px",
    height: "20px",
  },
  filterTitle: {
    margin: 0,
    fontSize: '16px',
    fontWeight: '700',
    letterSpacing: '0.5px',
  },
  filterContent: {
    padding: '0px 8px',
    maxHeight: '50vh',
    overflowY: 'auto' as const,
  },
  actionSection: {
    padding: '28px 16px',
  },
  changeIndicator: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginBottom: '16px',
    padding: '8px 12px',
    backgroundColor: 'rgba(223, 238, 255, 0.8)',
  },
  changeIcon: {
    fontSize: '12px',
    color: '#294CA6',
  },
  changeText: {
    fontSize: '12px',
    fontWeight: '500',
    textTransform: 'uppercase' as const,
    color: '#294CA6',
  },
  actionButtons: {
    display: 'flex',
    gap: '12px',
  },
  resetButton: {
    flex: '0 0 auto',
    padding: '12px 12px',
    backgroundColor: 'transparent',
    border: '1px solid #ccc',
    color: '#333',
    cursor: 'pointer',
    fontSize: '12px',
    fontWeight: '700',
    letterSpacing: '0.5px',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    transition: 'all 0.2s ease',
  },
  applyButton: {
    flex: 1,
    padding: '12px 20px',
    backgroundColor: 'transparent',
    border: '1px solid #294CA6',
    color: '#294CA6',
    cursor: 'pointer',
    fontSize: '12px',
    fontWeight: '700',
    letterSpacing: '0.5px',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    transition: 'all 0.3s ease',
  },
  buttonIcon: {
    fontSize: '14px',
  },
  outsideCloseButton: {
    position: 'fixed' as const,
    top: '70px',
    right: '10px',
    zIndex: 1100,
    background: 'white',
    border: '1px solid #e5e7eb',
    fontSize: '22px',
    cursor: 'pointer',
    padding: '6px 12px',
    borderRadius: '50%',
    boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
};