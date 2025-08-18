import React, { useMemo } from 'react';
import { useSubCategories } from '@/hooks/categories/useSubCategories';
import { useCategories } from '@/hooks/categories/useCategories';
import { Product } from '@/types/Product';

interface CategoryFilterProps {
  selectedCategories?: string[];
  onCategoryChange?: (categories: string[]) => void;
  products?: Product[]; // Để tính count
}

interface CategoryGroup {
  categoryId: string;
  categoryName: string;
  subcategories: {
    id: string;
    name: string;
    count: number;
  }[];
}

export default function CategoryFilter({ 
  selectedCategories = [], 
  onCategoryChange,
  products = []
}: CategoryFilterProps) {
  const { categories, loading: categoriesLoading } = useCategories();
  const { subCategories, loading: subCategoriesLoading } = useSubCategories();

  // Nhóm subcategories theo category và tính count
  const categoryGroups: CategoryGroup[] = useMemo(() => {
    if (!categories.length || !subCategories.length) return [];

    return categories.map(category => {
      const categorySubCategories = subCategories
        .filter(sub => sub.category_id === category.id)
        .map(sub => ({
          id: sub.id,
          name: sub.subCategory_Name,
          count: products.filter(p => p.subCategory_id === sub.id).length
        }));

      return {
        categoryId: category.id,
        categoryName: category.category_Name,
        subcategories: categorySubCategories
      };
    }).filter(group => group.subcategories.length > 0); // Chỉ hiển thị category có subcategory
  }, [categories, subCategories, products]);

  const handleSubCategoryChange = (subCategoryId: string) => {
    if (!onCategoryChange) return;

    let newCategories = [...selectedCategories];
    
    if (newCategories.includes(subCategoryId)) {
      newCategories = newCategories.filter(id => id !== subCategoryId);
    } else {
      newCategories.push(subCategoryId);
    }

    onCategoryChange(newCategories);
  };

  const loading = categoriesLoading || subCategoriesLoading;

  if (loading) {
    return (
      <div style={styles.loadingContainer}>
        <div style={styles.loadingText}>Đang tải danh mục...</div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      {categoryGroups.map((group) => (
        <div key={group.categoryId} style={styles.categoryGroup}>
          {/* Category Header */}
          <div style={styles.categoryHeader}>
            <span style={styles.categoryIcon}>📁</span>
            <h4 style={styles.categoryTitle}>{group.categoryName}</h4>
            <span style={styles.categoryCount}>
              ({group.subcategories.reduce((total, sub) => total + sub.count, 0)})
            </span>
          </div>

          {/* SubCategories */}
          <div style={styles.subcategoryList}>
            {group.subcategories.map((subcategory) => (
              <label key={subcategory.id} style={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(subcategory.id)}
                  onChange={() => handleSubCategoryChange(subcategory.id)}
                  style={styles.checkbox}
                />
                <span style={{
                  ...styles.checkboxCustom,
                  borderColor: selectedCategories.includes(subcategory.id) ? '#667eea' : '#ddd',
                  backgroundColor: selectedCategories.includes(subcategory.id) ? '#667eea15' : '#fff'
                }}>
                  {selectedCategories.includes(subcategory.id) && 
                    <span style={{ ...styles.checkmark, color: '#667eea' }}>✓</span>
                  }
                </span>
                <div style={styles.subcategoryInfo}>
                  <span style={styles.subcategoryName}>{subcategory.name}</span>
                  <span style={styles.subcategoryCount}>({subcategory.count})</span>
                </div>
              </label>
            ))}
          </div>
        </div>
      ))}

      {/* Selected Summary */}
      {selectedCategories.length > 0 && (
        <div style={styles.summary}>
          <div style={styles.summaryHeader}>
            <span style={styles.summaryIcon}>✅</span>
            <span style={styles.summaryTitle}>Đã chọn: {selectedCategories.length} danh mục</span>
          </div>
          <div style={styles.selectedItems}>
            {selectedCategories.map(subCatId => {
              const subCategory = subCategories.find(sub => sub.id === subCatId);
              return subCategory ? (
                <div key={subCatId} style={styles.selectedItem}>
                  <span style={styles.selectedItemText}>{subCategory.subCategory_Name}</span>
                  <button 
                    onClick={() => handleSubCategoryChange(subCatId)}
                    style={styles.removeButton}
                  >
                    ✕
                  </button>
                </div>
              ) : null;
            })}
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '20px',
  },
  loadingContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '40px 20px',
  },
  loadingText: {
    fontSize: '14px',
    color: '#6c757d',
    fontStyle: 'italic',
  },
  categoryGroup: {
    border: '1px solid #e9ecef',
    borderRadius: '8px',
    overflow: 'hidden',
    backgroundColor: '#ffffff',
  },
  categoryHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '12px 16px',
    backgroundColor: '#f8f9fa',
    borderBottom: '1px solid #e9ecef',
  },
  categoryIcon: {
    fontSize: '16px',
  },
  categoryTitle: {
    margin: 0,
    fontSize: '14px',
    fontWeight: '700',
    color: '#495057',
    flex: 1,
    textTransform: 'uppercase' as const,
    letterSpacing: '0.5px',
  },
  categoryCount: {
    fontSize: '12px',
    color: '#6c757d',
    fontWeight: '600',
  },
  subcategoryList: {
    padding: '8px',
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '4px',
  },
  checkboxLabel: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    cursor: 'pointer',
    padding: '10px 12px',
    borderRadius: '6px',
    transition: 'background-color 0.2s ease',
    ':hover': {
      backgroundColor: '#f8f9fa',
    },
  },
  checkbox: {
    display: 'none',
  },
  checkboxCustom: {
    width: '18px',
    height: '18px',
    border: '2px solid #ddd',
    backgroundColor: '#fff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '12px',
    borderRadius: '4px',
    transition: 'all 0.3s ease',
    flexShrink: 0,
  },
  checkmark: {
    fontWeight: 'bold',
    fontSize: '12px',
  },
  subcategoryInfo: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1,
  },
  subcategoryName: {
    fontSize: '13px',
    color: '#495057',
    fontWeight: '500',
  },
  subcategoryCount: {
    fontSize: '11px',
    color: '#6c757d',
    backgroundColor: '#e9ecef',
    padding: '2px 6px',
    borderRadius: '10px',
    fontWeight: '600',
  },
  summary: {
    padding: '16px',
    backgroundColor: '#f0f8ff',
    borderRadius: '8px',
    border: '1px solid #b3d9ff',
  },
  summaryHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginBottom: '12px',
  },
  summaryIcon: {
    fontSize: '14px',
  },
  summaryTitle: {
    fontSize: '12px',
    fontWeight: '600',
    color: '#0066cc',
    textTransform: 'uppercase' as const,
    letterSpacing: '0.5px',
  },
  selectedItems: {
    display: 'flex',
    flexWrap: 'wrap' as const,
    gap: '6px',
  },
  selectedItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    padding: '4px 8px',
    backgroundColor: '#667eea',
    color: 'white',
    borderRadius: '14px',
    fontSize: '11px',
    fontWeight: '500',
  },
  selectedItemText: {
    lineHeight: 1,
  },
  removeButton: {
    background: 'none',
    border: 'none',
    color: 'white',
    cursor: 'pointer',
    fontSize: '10px',
    padding: '0',
    lineHeight: 1,
    width: '12px',
    height: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '50%',
    transition: 'background-color 0.2s ease',
  },
};