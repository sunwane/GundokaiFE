'use client';
import { Product } from '@/types/Product';
import { useState, useEffect } from 'react';
import { useImageBackgroundColor } from '@/hooks/useImageBackgroundColor';
import { useCategory } from '@/hooks/categories/useCategory';
import { useProductStatus } from '@/hooks/product/useProductStatus';
import CardLabel from '@/component/features/product/CardLabel';
import ProductImage from '@/component/features/product/ProductImage';
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
  
  // Hooks
  const { 
    categoryName, 
    subCategoryName, 

    loading 
  } = useCategory(product.subCategory_id);
  
  const { backgroundColor, imgRef, handleImageLoad } = useImageBackgroundColor(
    product.subCategory_id,
    'rgba(248, 249, 250, 0.8)'
  );

  const { isOutOfStock } = useProductStatus(product);

  const handleClick = () => {
    if (onClick) {
      onClick(product);
    }
  };

  const categoryId = useCategoryId(product.subCategory_id);

  return (
    <div 
      style={{
        ...styles.cardWrapper,
        // BỎ CURSOR not-allowed - LUÔN CHO PHÉP CLICK
        cursor: 'pointer',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
    >
      {/* Gundam Shadow */}
      <div style={styles.gundamShadow}></div>
      
      {/* Main Card với Gundam Frame */}
      <div 
        style={{
          ...styles.mainCard,
          // BỎ ĐIỀU KIỆN isOutOfStock - LUÔN CHO PHÉP HOVER EFFECT
          transform: isHovered ? 'translate(10px, 10px)' : 'translate(0, 0)',
          // BỎ FILTER saturate - KHÔNG LÀM MỜ CARD
          // filter: isOutOfStock ? 'saturate(0.3)' : 'none',
        }}
      >
        {/* Product Image với status handling */}
        <ProductImage
          product={product}
          backgroundColor={backgroundColor}
          onImageLoad={handleImageLoad}
          imageRef={imgRef}
          style={styles.productImageContainer}
        />

        {/* Product Info */}
        <div style={styles.productInfo}>
          {/* Card Label */}
          {!loading && (
            <CardLabel 
              subcategoryId={subCategoryName || product.subCategory_id}
              categoryId={categoryName || 'Gundam'}
              style={styles.cardLabelContainer}
            />
          )}
          
          <h3 style={{
            ...styles.productName,
            // color: isOutOfStock ? '#999' : '#2c3e50',
            color: '#2c3e50', // LUÔN GIỮ MÀU BẬT
          }}>
            {product.product_Name}
          </h3>
          
          <div style={styles.priceContainer}>
            {/* BỎ ĐIỀU KIỆN isOutOfStock CHO MÀU GIÁ */}
            <span style={{
              ...styles.price,
              // color: isOutOfStock ? '#999' : '#e74c3c',
              color: '#e74c3c', // LUÔN GIỮ MÀU ĐỎ
            }}>
              {product.price.toLocaleString('vi-VN')} VNĐ
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

// Styles giữ nguyên
const styles = {
  cardWrapper: {
    position: 'relative' as const,
    display: 'inline-block',
    width: '100%',
    maxWidth: '210px',
    transition: 'all 0.3s ease',
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
    transition: 'all 0.3s ease',
    display: 'flex',
    flexDirection: 'column' as const,
    padding: '7px 8px',
  },
  productImageContainer: {
    marginBottom: '10px',
  },
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
    lineHeight: 1.2,
    textAlign: 'left' as const,
    padding: '0 2px',
    textTransform: 'uppercase' as const,
    display: '-webkit-box',
    WebkitBoxOrient: 'vertical' as const,
    WebkitLineClamp: 3,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    minHeight: '48px',
    maxHeight: '48px',
    transition: 'color 0.3s ease',
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
    transition: 'color 0.3s ease',
  },
};