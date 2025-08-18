'use client';
import React from 'react';
import CollapsibleSection from '@/component/ui/CollapsibleSection';
import StockStatusFilter from './StockStatusFilter';
import PriceRangeSlider from './PriceRangeSlider';
import CategoryFilter from './CategoryFilter';
import { StockStatus } from '@/types/Product';
import { Product } from '@/types/Product';

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
    ? { ...styles.filterPanel, ...styles.popupPanel }
    : styles.filterPanel;

  return (
    <>
      {isPopup && <div style={styles.overlay} onClick={onClose} />}
      <div style={containerStyle}>
        {/* Header */}
        <div style={styles.filterHeader}>
          <div style={styles.headerContent}>
            <span style={styles.filterIcon}>🔍</span>
            <h3 style={styles.filterTitle}>BỘ LỌC TÌM KIẾM</h3>
          </div>
          {isPopup && (
            <button onClick={onClose} style={styles.closeButton}>
              ✕
            </button>
          )}
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
                opacity: hasChanges ? 1 : 0.6,
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
    backgroundColor: '#ffffff',
    border: '1px solid #e0e6ed',
    borderRadius: '12px',
    position: 'sticky' as const,
    top: '20px',
    height: 'fit-content',
    maxHeight: 'calc(100vh - 40px)',
    overflowY: 'auto' as const,
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
    fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
  },
  popupPanel: {
    position: 'fixed' as const,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '90vw',
    maxWidth: '420px',
    maxHeight: '85vh',
    zIndex: 1000,
    boxShadow: '0 20px 60px rgba(0,0,0,0.25)',
  },
  overlay: {
    position: 'fixed' as const,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.6)',
    zIndex: 999,
    backdropFilter: 'blur(3px)',
  },
  filterHeader: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    padding: '20px 24px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: '12px 12px 0 0',
  },
  headerContent: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  filterIcon: {
    fontSize: '20px',
  },
  filterTitle: {
    margin: 0,
    fontSize: '16px',
    fontWeight: '700',
    letterSpacing: '0.5px',
  },
  closeButton: {
    background: 'none',
    border: 'none',
    color: 'white',
    fontSize: '20px',
    cursor: 'pointer',
    padding: '4px',
    width: '32px',
    height: '32px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '6px',
    transition: 'background-color 0.2s ease',
  },
  filterContent: {
    padding: '0',
    maxHeight: '50vh',
    overflowY: 'auto' as const,
  },
  actionSection: {
    padding: '24px',
    borderTop: '1px solid #f0f3f7',
    backgroundColor: '#fafbfc',
    borderRadius: '0 0 12px 12px',
  },
  changeIndicator: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginBottom: '16px',
    padding: '8px 12px',
    backgroundColor: '#fff3cd',
    border: '1px solid #ffeaa7',
    borderRadius: '6px',
  },
  changeIcon: {
    color: '#e17055',
    fontSize: '12px',
  },
  changeText: {
    fontSize: '12px',
    color: '#856404',
    fontWeight: '500',
  },
  actionButtons: {
    display: 'flex',
    gap: '12px',
  },
  resetButton: {
    flex: '0 0 auto',
    padding: '12px 16px',
    backgroundColor: '#ffffff',
    border: '2px solid #dee2e6',
    color: '#6c757d',
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
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    border: 'none',
    color: 'white',
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
    boxShadow: '0 4px 12px rgba(102, 126, 234, 0.4)',
  },
  buttonIcon: {
    fontSize: '14px',
  },
};