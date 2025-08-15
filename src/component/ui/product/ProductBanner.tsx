'use client';
import React from 'react';

interface ProductBannerProps {
  subcategoryInfo?: {
    subCategory_img?: string;
    subCategory_Name?: string;
    description?: string;
  } | null;
}

export default function ProductBanner({ subcategoryInfo }: ProductBannerProps) {
  return (
    <>
      {subcategoryInfo?.subCategory_img ? (
        <div style={styles.bannerContainer}>
          <img 
            src={subcategoryInfo.subCategory_img} 
            alt={`${subcategoryInfo.subCategory_Name} Banner`}
            style={styles.bannerImage}
          />
          <div style={styles.bannerOverlay}>
            <h1 style={styles.bannerTitle}>{subcategoryInfo.subCategory_Name}</h1>
            <p style={styles.bannerDescription}>{subcategoryInfo.description}</p>
          </div>
        </div>
      ) : (
        <div style={styles.bannerContainer}>
          <img 
            src="/images/default-products-banner.jpg" 
            alt="All Products Banner"
            style={styles.bannerImage}
          />
          <div style={styles.bannerOverlay}>
            <h1 style={styles.bannerTitle}>Tất cả sản phẩm</h1>
            <p style={styles.bannerDescription}>Khám phá bộ sưu tập đầy đủ của chúng tôi</p>
          </div>
        </div>
      )}
    </>
  );
}

const styles = {
  bannerContainer: {
    position: 'relative' as const,
    width: '100%',
    height: '300px',
    overflow: 'hidden',
  },
  bannerImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover' as const,
  },
  bannerOverlay: {
    position: 'absolute' as const,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.6))',
    display: 'flex',
    flexDirection: 'column' as const,
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
    textAlign: 'center' as const,
  },
  bannerTitle: {
    fontSize: '36px',
    fontWeight: 'bold',
    margin: '0 0 12px 0',
    textShadow: '2px 2px 4px rgba(0,0,0,0.7)',
  },
  bannerDescription: {
    fontSize: '18px',
    margin: 0,
    maxWidth: '600px',
    textShadow: '1px 1px 2px rgba(0,0,0,0.7)',
  },
};