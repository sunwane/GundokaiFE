'use client';
import React from 'react';
import { useSubCategories } from '@/hooks/categories/useSubCategories';
import LoadingSpinner from '@/component/ui/LoadingSpinner'; // ✅ Import LoadingSpinner

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
      <button
        style={styles.menuItem}
        onClick={() => onClick(category.id)}
      >
        <img src={category.icon_img} alt={category.category_Name} style={styles.menuIcon} />
        <span style={styles.menuText}>{category.category_Name}</span>
        <span style={styles.menuArrow}>›</span>
      </button>

      {isSelected && (
        <div style={styles.subMenuContainer}>
          {loading ? (
            <LoadingSpinner 
              text="TẢI DANH MỤC CON..." 
              size="small" 
            />
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
};

export default CategoryMenuItem;