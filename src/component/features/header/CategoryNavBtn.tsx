import React from 'react'
import { Category } from '@/types/Category';

interface CategoryNavBtnProps {
  category: Category;
  onClick?: (categoryId: string) => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

function CategoryNavBtn({ 
  category, 
  onClick,
  onMouseEnter,
  onMouseLeave
}: CategoryNavBtnProps) {
  
  const handleClick = () => {
    // ✅ CHỈ category "info" mới được click
    if (category.id === 'info' && onClick) {
      onClick(category.id);
    }
    // ❌ Các category khác KHÔNG xử lý click
  };

  return (
    <button 
      style={{
        ...styles.button,
        cursor: category.id === 'info' ? 'pointer' : 'default' // ✅ Chỉ info có cursor pointer
      }}
      onClick={handleClick}
      onMouseEnter={(e) => {
        // ✅ Hover effect - màu xanh nhạt
        Object.assign(e.currentTarget.style, styles.buttonHover);
        if (onMouseEnter) onMouseEnter();
      }}
      onMouseLeave={(e) => {
        // ✅ Reset về màu ban đầu
        Object.assign(e.currentTarget.style, styles.button);
        if (onMouseLeave) onMouseLeave();
      }}
    >
      <div style={styles.iconContainer}>
        <img 
          src={category.icon_img} 
          alt={`${category.category_Name} icon`} 
          style={styles.icon}
        />
      </div>
      <span style={styles.text}>
        {category.category_Name}
      </span>
    </button>
  );
}

const styles = {
  button: {
    display: 'flex',
    flexDirection: 'row' as const,
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    padding: '16px 8px',
    backgroundColor: '#f3f3f3',
    border: 'none',
    borderRadius: '0',
    cursor: 'default',  // ✅ Default cursor cho tất cả
    transition: 'background-color 0.2s ease, color 0.2s ease',
    width: '100%',
    height: '60px',
    minWidth: 0,
    textDecoration: 'none',
    whiteSpace: 'nowrap' as const,
  },
  buttonHover: {
    display: 'flex',
    flexDirection: 'row' as const,
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    padding: '16px 8px',
    backgroundColor: '#f0f8ff',
    border: 'none',
    borderRadius: '0',
    cursor: 'default',  // ✅ Keep default cursor even on hover
    transition: 'background-color 0.2s ease, color 0.2s ease',
    width: '100%',
    height: '60px',
    minWidth: 0,
    textDecoration: 'none',
    whiteSpace: 'nowrap' as const,
    color: '#007AFF',
  },
  iconContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  icon: {
    width: '30px',
    height: '30px',
    objectFit: 'contain' as const,
  },
  text: {
    fontSize: 'clamp(10px, 2vw, 16px)',
    fontWeight: 600,
    color: '#00417C',
    textTransform: 'uppercase' as const,
    lineHeight: 1.2,
    textAlign: 'center' as const,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  }
};

export default CategoryNavBtn