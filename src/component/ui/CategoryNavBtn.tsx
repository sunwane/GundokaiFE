import React from 'react'
import { Category } from '@/types/Category';

interface CategoryNavBtnProps {
  category: Category;
  onClick?: (categoryId: string) => void;
}

function CategoryNavBtn({ 
  category, 
  onClick 
}: CategoryNavBtnProps) {
  
  const handleClick = () => {
    if (onClick) {
      onClick(category.id);
    }
  };

  return (
    <button 
      style={styles.button}
      onClick={handleClick}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = '#f0f8ff';
        e.currentTarget.style.color = '#007AFF';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = '#fff';
        e.currentTarget.style.color = '#333';
      }}
    >
      <div style={styles.iconContainer}>
        <img 
          src={category.icon} 
          alt={`${category.name} icon`} 
          style={styles.icon}
        />
      </div>
      <span style={styles.text}>
        {category.name}
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
    padding: '16px 8px',     // Giảm horizontal padding
    backgroundColor: '#fff',
    border: 'none',
    borderRadius: '0',       // Bỏ border radius để liền mạch
    cursor: 'pointer',
    transition: 'background-color 0.2s ease, color 0.2s ease',
    flex: 1,                 // Quan trọng: chia đều space
    minWidth: 0,             // Cho phép shrink
    textDecoration: 'none',
    whiteSpace: 'nowrap' as const,
    height: '60px',          // Cố định chiều cao
  },
  iconContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  icon: {
    width: '30px',           // Giảm kích thước icon
    height: '30px',
    objectFit: 'contain' as const,
  },
  text: {
    fontSize: 'clamp(10px, 2vw, 16px)', // Responsive font size
    fontWeight: 600,
    color: '#00417C',
    textTransform: 'uppercase' as const,
    lineHeight: 1.2,
    textAlign: 'center' as const,
    overflow: 'hidden',      // Ẩn text overflow
    textOverflow: 'ellipsis', // Hiển thị ... nếu text quá dài
  }
};

export default CategoryNavBtn