'use client';
import React from 'react';

interface CardLabelProps {
  categoryId: string;
  subcategoryId: string;
  className?: string;
  style?: React.CSSProperties;
}

export default function CardLabel({ 
  categoryId,
  subcategoryId, 
  className, 
  style 
}: CardLabelProps) {

  // ✅ Hàm xử lý lấy text trong ngoặc (nếu có)
  const getDisplayText = (text: string): string => {
    // Tìm text trong ngoặc đơn ()
    const match = text.match(/\(([^)]+)\)/);
    if (match && match[1]) {
      return match[1]; // Trả về text trong ngoặc
    }
    return text; // Trả về text gốc nếu không có ngoặc
  };

  return (
    <div 
      style={{
        ...styles.cardLabel,
        ...style
      }}
      className={className}
    >
      {/* Category label */}
      <span style={styles.categoryLabel}>
        {getDisplayText(categoryId)}
      </span>
      {/* Subcategory label - Hiển thị text trong ngoặc (nếu có) */}
      <span style={styles.subcategoryLabel}>
        {getDisplayText(subcategoryId).toUpperCase()}
      </span>
    </div>
  );
}

const styles = {
  cardLabel: {
    display: 'flex',
    alignItems: 'center',
    position: 'relative' as const,
    background: '#fff',
    overflow: 'hidden',
    width: 'fit-content',
    maxWidth: '200px', // ✅ Giới hạn chiều rộng tối đa
  },
  categoryLabel: {
    border: 'none',
    lineHeight: 1,
    display: 'flex',
    alignItems: 'center',
    position: 'relative' as const,
    clipPath: 'polygon(0 0, calc(100% - 12px) 0, 100% 100%, 0 100%)',
    zIndex: 2,
    background: '#1a1aff',
    color: '#fff',
    fontSize: '11px',
    height: '24px',
    paddingLeft: '8px',
    paddingRight: '14px',
    paddingTop: '6px',
    paddingBottom: '6px',
    // ✅ Text overflow handling
    textOverflow: 'ellipsis', // Hiển thị ...
    whiteSpace: 'nowrap',    // Không xuống dòng
  },
  subcategoryLabel: {
    background: '#fff',
    textTransform: 'uppercase' as const,
    lineHeight: 1,
    display: 'flex',
    alignItems: 'center',
    position: 'relative' as const,
    marginLeft: '-12px',
    paddingLeft: '14px',
    paddingRight: '8px',
    paddingTop: '6px',
    paddingBottom: '6px',
    clipPath: 'polygon(12px 0, 100% 0, 100% 100%, 0 100%, 0 0)',
    zIndex: 1,
    backgroundColor: '#fff',
    color: '#FFAA00',
    fontWeight: 'bold',
    fontSize: '13px',
    height: '24px',
    border: '2px solid #111',
    borderLeft: 'none',
    // ✅ Text overflow handling
    maxWidth: '160px',        // Giới hạn chiều rộng
    overflow: 'hidden',      // Ẩn phần text thừa
    textOverflow: 'ellipsis', // Hiển thị ...
    whiteSpace: 'nowrap',    // Không xuống dòng
  },
};