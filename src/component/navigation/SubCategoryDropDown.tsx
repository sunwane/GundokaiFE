'use client';
import React from 'react';
import { useSubCategories } from '@/hooks/useSubCategories';

interface SubCategoryDropdownProps {
  categoryId: string;
  onSubCategoryClick: (subCategoryId: string) => void; // ✅ Thêm prop mới
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

function SubCategoryDropdown({ 
  categoryId, 
  onSubCategoryClick, // ✅ Nhận prop từ parent
  onMouseEnter, 
  onMouseLeave 
}: SubCategoryDropdownProps) {
  const { subCategories, loading, error } = useSubCategories(categoryId);

  const handleSubCategoryClick = (subCategoryId: string, subCategoryName: string) => {
    console.log(`Navigate to subcategory: ${subCategoryId} - ${subCategoryName}`);
    onSubCategoryClick(subCategoryId); // ✅ Gọi function từ parent
  };

  if (loading) {
    return (
      <div style={styles.dropdown} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
        <div style={styles.loading}>Loading...</div>
      </div>
    );
  }

  if (error || subCategories.length === 0) {
    return null;
  }

  return (
    <div style={styles.dropdown} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      <div style={styles.listContainer}>
        {subCategories.map((subCategory) => (
          <div
            key={subCategory.id}
            style={styles.listItem}
            onClick={() => handleSubCategoryClick(subCategory.id, subCategory.subCategory_Name)}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#f0f8ff';
              e.currentTarget.style.color = '#007AFF';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.color = '#333';
            }}
          >
            {subCategory.subCategory_Name}
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  dropdown: {
    position: 'absolute' as const,
    top: '100%',
    left: '0',                      // ✅ Căn theo button
    backgroundColor: '#fff',
    border: '1px solid #e0e0e0',
    borderRadius: '4px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
    zIndex: 1000,
    maxHeight: '300px',
    width: '280px',                 // ✅ Width cố định nhỏ hơn
    overflowY: 'auto' as const,
  },
  listContainer: {
    padding: '8px 0',
  },
  listItem: {
    padding: '10px 20px',
    fontSize: '14px',
    fontWeight: '500',
    color: '#333',
    cursor: 'pointer',
    transition: 'background-color 0.2s ease, color 0.2s ease',
    borderBottom: '1px solid #f5f5f5',
    whiteSpace: 'nowrap' as const,   // ✅ Không wrap text
  },
  loading: {
    padding: '20px',
    textAlign: 'center' as const,
    fontSize: '14px',
    color: '#1a1aff',
    fontWeight: 'bold',
  }
};

export default SubCategoryDropdown;