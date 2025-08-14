'use client';
import React from 'react';
import CategoryMenuItem from '@/component/navigation/CategoryMenuItem';

interface MobileMenuDropdownProps {
  isOpen: boolean;
  categories: any[];
  selectedCategory: string | null;
  onCategoryClick: (categoryId: string) => void;
  onSubCategoryClick: (subCategoryId: string) => void;
}

function MobileMenuDropdown({ 
  isOpen, 
  categories, 
  selectedCategory, 
  onCategoryClick, 
  onSubCategoryClick 
}: MobileMenuDropdownProps) {
  if (!isOpen) return null;

  return (
    <div style={styles.menuDropdown}>
      <div style={styles.menuContent}>
        {/* ✅ Main Categories */}
        {categories.map((category) => (
          <CategoryMenuItem 
            key={category.id}
            category={category}
            isSelected={selectedCategory === category.id}
            onClick={onCategoryClick}
            onSubCategoryClick={onSubCategoryClick}
          />
        ))}
        
        {/* ✅ Info Category */}
        <button
          style={styles.menuItem}
          onClick={() => onCategoryClick('info')}
        >
          <img src="/images/icons/aboutIcon.png" alt="Thông tin" style={styles.menuIcon} />
          <span style={styles.menuText}>THÔNG TIN</span>
        </button>
      </div>
    </div>
  );
}

const styles = {
  menuDropdown: {
    position: 'absolute' as const,
    top: '70px',
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    borderTop: '1px solid #eee',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
    zIndex: 1000,
    overflowY: 'auto' as const,
  },
  menuContent: {
    padding: '10px 0',
  },
  menuItem: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    padding: '12px 20px',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    transition: 'background-color 0.2s ease',
    textAlign: 'left' as const,
  },
  menuIcon: {
    width: '24px',
    height: '24px',
    marginRight: '15px',
  },
  menuText: {
    flex: 1,
    fontSize: '16px',
    color: '#333',
    fontWeight: '500',
  },
};

export default MobileMenuDropdown;