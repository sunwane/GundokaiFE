'use client';
import { Product } from '@/types/Product';
import { useState, useEffect } from 'react';
import { useImageBackgroundColor } from '@/hooks/useImageBackgroundColor';
import { useCategory } from '@/hooks/useCategory'; // ✅ Import hook mới
import CardLabel from '@/component/ui/product/CardLabel'; // ✅ Import CardLabel component
import { SubCategoryService } from '@/services/SubCategoryService';

interface ProductCardProps {
  product: Product;
  onClick?: (product: Product) => void;
}

function useCategoryId(subCategoryId: string) {
  const [categoryId, setCategoryId] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    SubCategoryService.getCategoryIdBySubCategoryId(subCategoryId).then(id => {
      if (isMounted) setCategoryId(id);
    });
    return () => { isMounted = false; };
  }, [subCategoryId]);

  return categoryId;
}

export default function ProductCard({ product, onClick }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  
  // ✅ Sử dụng useCategory thay vì useCategoryNames
  const { 
    categoryName, 
    subCategoryName, 
    category, 
    subCategory, 
    loading 
  } = useCategory(product.subCategory_id);
  
  // ✅ Sử dụng custom hook cho background color
  const { backgroundColor, imgRef, handleImageLoad } = useImageBackgroundColor(
    product.subCategory_id,
    'rgba(248, 249, 250, 0.8)'
  );

  const handleClick = () => {
    if (onClick) {
      onClick(product);
    }
  };

  const categoryId = useCategoryId(product.subCategory_id);

  return (
    <div 
      style={styles.cardWrapper}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
    >
      {/* ✅ Gundam Shadow - luôn hiển thị */}
      <div style={styles.gundamShadow}></div>
      
      {/* ✅ Main Card với Gundam Frame - di chuyển khi hover */}
      <div 
        style={{
          ...styles.mainCard,
          transform: isHovered ? 'translate(10px, 10px)' : 'translate(0, 0)'
        }}
      >
        {/* ✅ Product Image */}
        <div 
          style={{
            ...styles.productImageContainer,
            backgroundColor: backgroundColor, // ✅ Từ hook
            transition: 'background-color 0.5s ease',
          }}
        >
          <img 
            ref={imgRef} // ✅ Từ hook
            src={product.thumbnail} 
            alt={product.product_Name} 
            style={styles.productImage}
            onLoad={handleImageLoad} // ✅ Từ hook
            crossOrigin="anonymous"
          />
        </div>

        {/* ✅ Product Info */}
        <div style={styles.productInfo}>
          {/* ✅ Card Label với tên từ hook mới */}
          {!loading && (
            <CardLabel 
              subcategoryId={subCategoryName || product.subCategory_id} // ✅ Dùng tên thay vì ID
              categoryId={categoryName || 'Gundam'} // ✅ Dùng tên thay vì ID
              style={styles.cardLabelContainer}
            />
          )}
          
          <h3 style={styles.productName}>{product.product_Name}</h3>
          <div style={styles.priceContainer}>
            <span style={styles.price}>{product.price.toLocaleString('vi-VN')} VNĐ</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ✅ Updated styles - Removed badge styles, added container
const styles = {
  cardWrapper: {
    position: 'relative' as const,
    display: 'inline-block',
    cursor: 'pointer',
    width: '100%',
    maxWidth: '210px',
  },
  gundamShadow: {
    position: 'absolute' as const,
    top: '10px',
    left: '10px',
    width: '220px',
    height: '320px',
    backgroundImage: 'url("/images/frames/gundamshadow.png")',
    backgroundSize: '100% 100%',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    zIndex: 1,
    opacity: 0.8,
  },
  mainCard: {
    position: 'relative' as const,
    width: '220px',
    height: '320px',
    backgroundImage: 'url("/images/frames/gundam.png")',
    backgroundSize: '100% 100%',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    zIndex: 2,
    transition: 'transform 0.3s ease',
    display: 'flex',
    flexDirection: 'column' as const,
    padding: '7px 8px',
  },
  productImageContainer: {
    width: '203px',
    height: '180px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    marginBottom: '10px',
  },
  productImage: {
    width: '100%',
    height: '100%',
    objectFit: 'contain' as const,
  },
  // ✅ Container cho CardLabel component
  cardLabelContainer: {
    marginBottom: '5px',
  },
  productInfo: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column' as const,
    justifyContent: 'flex-start',
    textAlign: 'center' as const,
    padding: '0px 5px',
  },
  productName: {
    fontSize: '13px',
    fontWeight: 'bold',
    margin: '0 0 10px 0',
    color: '#2c3e50',
    lineHeight: 1.2,
    textAlign: 'left' as const,
    padding: '0 2px',
    // ✅ Uppercase text
    textTransform: 'uppercase' as const,
    // ✅ Giới hạn 2 dòng với ellipsis
    display: '-webkit-box',
    WebkitBoxOrient: 'vertical' as const,
    WebkitLineClamp: 3,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    // ✅ Cố định chiều cao cho 2 dòng
    minHeight: '48px', // 12.5px * 1.2 * 2 lines ≈ 30px
    maxHeight: '48px',
  },
  priceContainer: {
    display: 'flex',
    justifyContent: 'flex-end' as const,
    width: '100%',
    paddingRight: '5px',
  },
  price: {
    fontSize: '14px',
    fontWeight: 'bold',
    color: '#e74c3c',
  },
};