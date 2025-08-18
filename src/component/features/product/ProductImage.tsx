import React from 'react';
import { Product } from '@/types/Product';
import { useProductStatus } from '@/hooks/product/useProductStatus';
import ProductStatusBadge from './ProductStatusBadge';
import ProductImageOverlay from './ProductImageOverlay';

interface ProductImageProps {
  product: Product;
  backgroundColor?: string;
  onImageLoad?: () => void;
  imageRef?: React.RefObject<HTMLImageElement | null>;
  className?: string;
  style?: React.CSSProperties;
}

export default function ProductImage({ 
  product, 
  backgroundColor = 'rgba(248, 249, 250, 0.8)',
  onImageLoad,
  imageRef,
  className,
  style 
}: ProductImageProps) {
  const { 
    isOutOfStock, 
    isComingSoon, 
    statusLabel, 
    badgeConfig 
  } = useProductStatus(product);

  return (
    <div style={{
      ...styles.container,
      backgroundColor,
      ...style,
    }} className={className}>
      
      {/* Product Image - CHỈ ẢNH HƯỞNG ĐẾN ẢNH */}
      <img 
        ref={imageRef}
        src={product.thumbnail} 
        alt={product.product_Name} 
        style={{
          ...styles.image,
          // GIẢM HIỆU ỨNG LÀM MỜ ẢNH
          filter: isOutOfStock ? 'grayscale(30%) brightness(0.8)' : 'none',
          opacity: isOutOfStock ? 0.7 : 1,
        }}
        onLoad={onImageLoad}
        crossOrigin="anonymous"
      />

      {/* Coming Soon Badge */}
      {isComingSoon && badgeConfig && (
        <ProductStatusBadge
          text={badgeConfig.text}
          color={badgeConfig.color}
          backgroundColor={badgeConfig.backgroundColor}
          position="top-left"
        />
      )}

      {/* Out of Stock Overlay - CHỈ HIỂN THỊ TRÊN ẢNH */}
      <ProductImageOverlay
        isVisible={isOutOfStock}
        overlayText={statusLabel}
        overlayType="out-of-stock"
      />
    </div>
  );
}

const styles = {
  container: {
    position: 'relative' as const,
    width: '203px',
    height: '180px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    borderRadius: '4px',
    transition: 'background-color 0.5s ease',
    // ĐẢM BẢO OVERLAY CHỈ HIỂN THỊ TRONG KHUNG ẢNH
    isolation: 'isolate',
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'contain' as const,
    transition: 'all 0.3s ease',
  },
};