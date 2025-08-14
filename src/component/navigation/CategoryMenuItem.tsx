'use client';
import React from 'react';
import { useSubCategories } from '@/hooks/useSubCategories';

interface CategoryMenuItemProps {
  category: any;
  isSelected: boolean;
  onClick: (categoryId: string) => void;
  onSubCategoryClick: (subCategoryId: string) => void;
}

function CategoryMenuItem({ category, isSelected, onClick, onSubCategoryClick }: CategoryMenuItemProps) {
  const { subCategories, loading } = useSubCategories(category.id);

  return (
    <div style={styles.categoryMenuSection}>
      {/* ✅ Main Category Button */}
      <button
        style={styles.menuItem}
        onClick={() => onClick(category.id)}
      >
        <img src={category.icon_img} alt={category.category_Name} style={styles.menuIcon} />
        <span style={styles.menuText}>{category.category_Name}</span>
        <span style={styles.menuArrow}>›</span>
      </button>

      {/* ✅ Subcategories - Show when selected */}
      {isSelected && (
        <div style={styles.subMenuContainer}>
          {loading ? (
            <div style={styles.subMenuLoading}>Loading...</div>
          ) : (
            subCategories.map((subCategory) => (
              <button
                key={subCategory.id}
                style={styles.subMenuItem}
                onClick={() => onSubCategoryClick(subCategory.id)}
              >
                <span style={styles.subMenuText}>{subCategory.subCategory_Name}</span>
              </button>
            ))
          )}
        </div>
      )}
    </div>
  );
}

const styles = {
  categoryMenuSection: {
    borderBottom: '1px solid #f0f0f0',
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
  menuArrow: {
    fontSize: '18px',
    color: '#999',
    marginLeft: '10px',
  },
  subMenuContainer: {
    backgroundColor: '#f8f9fa',
    paddingLeft: '20px',
  },
  subMenuItem: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    padding: '10px 20px',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    transition: 'background-color 0.2s ease',
    textAlign: 'left' as const,
  },
  subMenuText: {
    fontSize: '14px',
    color: '#666',
    fontWeight: '400',
  },
  subMenuLoading: {
    padding: '10px 20px',
    fontSize: '14px',
    color: '#999',
    textAlign: 'center' as const,
  },
};

export default CategoryMenuItem;