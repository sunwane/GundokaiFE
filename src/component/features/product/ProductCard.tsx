'use client';
import { Product } from '@/types/Product';
import { useState, useEffect } from 'react';
import { useImageBackgroundColor } from '@/hooks/useImageBackgroundColor';
import { useCategory } from '@/hooks/categories/useCategory';
import { useProductStatus } from '@/hooks/product/useProductStatus';
import CardLabel from '@/component/features/product/CardLabel';
import ProductImage from '@/component/features/product/ProductImage';
import { SubCategoryService } from '@/services/SubCategoryService';
import { max } from 'three/tsl';

interface ProductCardProps {
  product: Product;
  onClick: (product: Product) => void;
  style?: React.CSSProperties;
  isMobile?: boolean; // Thêm prop này
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

export default function ProductCard({ product, onClick, style, isMobile = false }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  
  // Hooks
  const { 
    categoryName, 
    subCategoryName, 
    loading 
  } = useCategory(product.subcategory.id);
  
  const { backgroundColor, imgRef, handleImageLoad } = useImageBackgroundColor(
    product.subcategory.id,
    'rgba(248, 249, 250, 0.8)'
  );

  const { isOutOfStock } = useProductStatus(product);

  const categoryId = useCategoryId(product.subcategory.id);

  return (
    <div 
      style={{
        ...styles.cardWrapper,
        ...(isMobile ? styles.cardWrapperMobile : {}),
        ...style, // Apply custom style
        cursor: 'pointer',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onClick(product)}
    >
      {/* Gundam Shadow */}
      <div style={{
        ...styles.gundamShadow,
        ...(isMobile ? styles.gundamShadowMobile : {}),
      }}></div>
      
      {/* Main Card với Gundam Frame */}
      <div 
        style={{
          ...styles.mainCard,
          ...(isMobile ? styles.mainCardMobile : {}),
          transform: isHovered ? 'translate(10px, 10px)' : 'translate(0, 0)',
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
              subcategoryId={subCategoryName || product.subcategory.subCategoryName}
              categoryId={categoryName || 'Gundam'}
              style={isMobile ? styles.cardLabelMobile : styles.cardLabelContainer}
              isMobile={isMobile}
            />
          )}
          
          <h3 style={{
            ...styles.productName,
            color: '#2c3e50', // LUÔN GIỮ MÀU BẬT
          }}>
            {product.productName}
          </h3>
          
          <div style={styles.priceContainer}>
            <span style={{
              ...styles.price,
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
    maxWidth: '210px',
    transition: 'all 0.3s ease',
  },
  cardWrapperMobile: {
    maxWidth: '140px',
    minWidth: '140px',
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
  gundamShadowMobile: {
    width: '150px',
    height: '220px',
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
  mainCardMobile: {
    width: '150px',
    height: '220px',
    padding: '4px 4px',
  },
  productImageContainer: {
    marginBottom: '10px',
  },
  cardLabelContainer: {
    marginBottom: '5px',
    maxWidth: '195px',
  },
  cardLabelMobile: {
    marginBottom: '3px',
    maxWidth: '135px',
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