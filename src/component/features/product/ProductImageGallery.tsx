import React, { useState } from 'react';
import { ProductImage } from '@/types/ProductImage';

interface ProductImageGalleryProps {
  images: ProductImage[];
  fallbackImage?: string;
  productName: string;
}

export default function ProductImageGallery({ 
  images, 
  fallbackImage, 
  productName 
}: ProductImageGalleryProps) {
  const allImages = images.length > 0 
    ? images.map(img => img.img_link) 
    : fallbackImage 
    ? [fallbackImage] 
    : [];

  const [mainImage, setMainImage] = useState(allImages[0] || '');
  const [thumbIndex, setThumbIndex] = useState(0);

  const maxThumbs = 4;
  const canScrollLeft = thumbIndex > 0;
  const canScrollRight = allImages.length > maxThumbs && thumbIndex < allImages.length - maxThumbs;

  const handleThumbClick = (img: string) => {
    setMainImage(img);
  };

  const handleScrollLeft = () => {
    setThumbIndex(prev => Math.max(prev - 1, 0));
  };

  const handleScrollRight = () => {
    setThumbIndex(prev => Math.min(prev + 1, allImages.length - maxThumbs));
  };

  if (allImages.length === 0) {
    return (
      <div style={styles.container}>
        <div style={styles.noImagePlaceholder}>
          <span>Không có ảnh</span>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.stickyImageBox}>
        {/* Main Image */}
        <div style={styles.mainImageWrapper}>
          <img 
            src={mainImage} 
            alt={productName} 
            style={styles.mainImage}
            onError={(e) => {
              e.currentTarget.src = '/images/logo.png';
            }}
          />
        </div>

        {/* Thumbnail Navigation */}
        {allImages.length > 1 && (
          <div style={styles.thumbListWrapper}>
            {canScrollLeft && (
              <button 
                style={styles.thumbNavBtn} 
                onClick={handleScrollLeft}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#d1d5db';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#e5e7eb';
                }}
              >
                ‹
              </button>
            )}
            
            <div style={styles.thumbList}>
              {allImages.slice(thumbIndex, thumbIndex + maxThumbs).map((img, idx) => (
                <img
                  key={`${img}-${idx}`}
                  src={img}
                  alt={`${productName} ${idx + 1}`}
                  style={{
                    ...styles.thumbImage,
                    border: img === mainImage ? '2px solid #3b82f6' : '2px solid #e5e7eb',
                  }}
                  onClick={() => handleThumbClick(img)}
                  onError={(e) => {
                    e.currentTarget.src = '/images/logo.png';
                  }}
                />
              ))}
            </div>
            
            {canScrollRight && (
              <button 
                style={styles.thumbNavBtn} 
                onClick={handleScrollRight}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#d1d5db';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#e5e7eb';
                }}
              >
                ›
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    flex: '0 0 350px',
    minWidth: '350px',
    maxWidth: '350px',
    position: 'relative' as const,
    height: '100%',
  },
  stickyImageBox: {
    position: 'sticky' as const,
    top: '100px',
    zIndex: 2,
    background: '#fff',
    borderRadius: '12px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
    padding: '20px',
    border: '1px solid #e5e7eb',
  },
  mainImageWrapper: {
    width: '100%',
    height: '350px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '16px',
    background: '#f8fafc',
    borderRadius: '8px',
    overflow: 'hidden',
    border: '1px solid #e5e7eb',
  },
  mainImage: {
    maxWidth: '100%',
    maxHeight: '100%',
    objectFit: 'contain' as const,
    borderRadius: '8px',
  },
  noImagePlaceholder: {
    width: '100%',
    height: '350px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f3f4f6',
    borderRadius: '8px',
    color: '#6b7280',
    fontSize: '16px',
  },
  thumbListWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginTop: '8px',
    width: '100%',
    justifyContent: 'center',
  },
  thumbList: {
    display: 'flex',
    gap: '8px',
    overflow: 'hidden',
  },
  thumbImage: {
    width: '65px',
    height: '65px',
    objectFit: 'cover' as const,
    borderRadius: '6px',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    background: '#fff',
  },
  thumbNavBtn: {
    background: '#e5e7eb',
    border: 'none',
    borderRadius: '50%',
    width: '34px',
    height: '34px',
    fontSize: '20px',
    cursor: 'pointer',
    color: '#374151',
    fontWeight: 'bold',
    transition: 'background 0.2s ease',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
};