'use client';
export const dynamic = "force-dynamic";

import React, { Suspense } from 'react';
import PageHeader from "@/component/layout/header/PageHeader";
import ProductCard from "@/component/features/product/ProductCard";
import Breadcrumbs from "@/component/ui/Breadcrumbs";
import ProductImageGallery from "@/component/features/product/ProductImageGallery";
import ProductInfo from "@/component/features/product/ProductInfo";
import LoadingSpinner from "@/component/ui/LoadingSpinner";
import { useRouter, useSearchParams } from 'next/navigation';
import { useProductDetail } from '@/hooks/product/useProductDetail';
import { useResponsive } from '@/hooks/useResponsive';
import Footer from '@/component/layout/footer/Footer';
import { Product } from '@/types/Product';

function ProductDetailContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const productId = searchParams.get('id');

  // Updated hook now returns productDetail
  const { product, images, productDetail, relatedProducts, loading, error, refetch } = useProductDetail(productId);
  const { isMobile } = useResponsive({ mobile: 915 });

  const handleAddToCart = (productId: string, quantity: number) => {
    // TODO: Implement add to cart logic
    console.log(`Adding ${quantity} of product ${productId} to cart`);
  };

  const handleProductClick = (clickedProduct: Product) => {
    router.push(`/productDetail?id=${clickedProduct.id}`);
  };

  if (loading) {
    return (
      <div>
        <PageHeader />
        <div style={styles.loadingContainer}>
          <LoadingSpinner text="Đang tải sản phẩm..." size="large" />
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div>
        <PageHeader />
        <div style={styles.errorContainer}>
          <h2>Không tìm thấy sản phẩm!</h2>
          <p style={{ color: '#6b7280' }}>Sản phẩm bạn tìm kiếm không tồn tại hoặc đã bị xóa.</p>
          <button onClick={() => router.push('/products')} style={styles.backButton}>
            Quay lại danh sách sản phẩm
          </button>
        </div>
      </div>
    );
  }

  // Breadcrumbs data
  const breadcrumbs = [
    { label: 'Trang chủ', href: '/' },
    { label: 'Danh mục sản phẩm', href: '/products' },
    { label: product.subcategory.mainCategory.categoryName, href: `/products?category=${product.subcategory.mainCategory.id}` },
    { label: product.subcategory.subCategoryName, href: `/products?subcategory=${product.subcategory.id}` },
  ];

  return (
    <div>
      <PageHeader />
      <div style={{
        ...styles.mainContainer,
        padding: isMobile ? '16px 3vw' : '24px 5vw',
      }}>
        <Breadcrumbs items={breadcrumbs} />
        {/* Main Product Section */}
        <div style={{
          ...styles.detailContainer,
          gap: isMobile ? '24px' : '40px',
          flexDirection: isMobile ? 'column' : 'row',
          alignItems: isMobile ? "center" : 'flex-start',
        }}>
          {/* Product Images */}
          <ProductImageGallery
            images={images}
            fallbackImage={product.thumbnail}
            productName={product.productName}
          />

          {/* Product Info - Now includes productDetail */}
          <ProductInfo
            isMobile={isMobile}
            product={product}
            productDetail={productDetail}
            onAddToCart={handleAddToCart}
          />
        </div>

        {/* Related Products Section - Responsive như ProductShowcase */}
        {relatedProducts.length > 0 && (
          <div style={{
            ...styles.relatedSection,
            marginTop: isMobile ? '40px' : '60px',
          }}>
            <div style={{
              ...styles.relatedTitle,
              fontSize: isMobile ? '20px' : '24px',
              padding: isMobile ? '8px 16px' : '12px 24px',
              marginBottom: isMobile ? '16px' : '24px',
            }}>
              Có thể bạn sẽ thích
            </div>
            
            {/* Related Products Grid - Responsive */}
            <div 
              className="related-product-grid"
              style={{
                ...styles.relatedGrid,
                // Mobile: Horizontal scroll như ProductShowcase
                gap: isMobile ? "24px" : "32px",
                justifyContent: isMobile? "flex-start" : "center",
                flexDirection: isMobile? "row" as const : "row" as const,
                flexWrap: isMobile? "nowrap" as const : "wrap" as const,
                padding: isMobile ? "0 5px 10px 5px" : "0 10px 15px 10px",
                margin: isMobile ? "0 10px" : "0 0px",
              }}
            >
              {relatedProducts.map((relatedProduct) => (
                <ProductCard 
                  key={relatedProduct.id} 
                  product={relatedProduct} 
                  onClick={handleProductClick}
                  isMobile={isMobile}
                  style={{
                    flexShrink: 0,
                    width: isMobile ? "150px" : "200px",
                    scrollSnapAlign: "start",
                  }}
                />
              ))}
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default function ProductDetailPage() {
  return (
    <Suspense fallback={
      <div>
        <PageHeader />
        <div style={styles.loadingContainer}>
          <LoadingSpinner text="Đang tải..." size="large" />
        </div>
      </div>
    }>
      <ProductDetailContent />
    </Suspense>
  );
}

const styles = {
  mainContainer: {
    display: "flex",
    flexDirection: 'column' as const,
    gap: '8px',
    width: '100%',
    maxWidth: '1400px',
    margin: '0 auto',
    paddingBottom: '100px',
  },
  loadingContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '50vh',
  },
  errorContainer: {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    justifyContent: 'center',
    height: '50vh',
    gap: '16px',
    textAlign: 'center' as const,
    padding: '0 20px',
  },
  backButton: {
    padding: '12px 24px',
    backgroundColor: '#3b82f6',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: '600',
    transition: 'background 0.2s',
  },
  detailContainer: {
    marginTop: '8px',
    display: 'flex',
  },
  relatedSection: {
    // marginTop will be set dynamically
  },
  relatedTitle: {
    fontWeight: 'bold',
    color: '#dc2626',
    background: '#fff1f2',
    borderRadius: '12px',
    display: 'inline-block',
    border: '1px solid #fecaca',
  },
  relatedGrid: {
    display: "flex",
    alignItems: "center",
    overflowX: "auto" as const,
    overflowY: "hidden" as const,
    scrollBehavior: "smooth" as const,
    scrollSnapType: "x mandatory",
    WebkitOverflowScrolling: "touch" as const, // Smooth scrolling on iOS
    msOverflowStyle: "none" as const, // Hide scrollbar on IE
    scrollbarWidth: "thin" as const, // Thin scrollbar on Firefox
  },
};

// CSS cho responsive related products - giống ProductShowcase
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = `
    /* Custom scrollbar styling */
    .product-grid::-webkit-scrollbar {
      height: 8px;
    }
    
    .product-grid::-webkit-scrollbar-track {
      background: rgba(241, 245, 249, 0.8);
      border-radius: 4px;
      margin: 0 10px;
    }
    
    .product-grid::-webkit-scrollbar-thumb {
      background: linear-gradient(90deg, #cbd5e1, #94a3b8);
      border-radius: 4px;
      transition: background 0.3s ease;
    }
    
    .product-grid::-webkit-scrollbar-thumb:hover {
      background: linear-gradient(90deg, #94a3b8, #64748b);
    }

    /* Mobile specific styles */
    @media (max-width: 768px) {
      .product-grid::-webkit-scrollbar {
        height: 6px;
      }
      
      .product-grid::-webkit-scrollbar-track {
        margin: 0 5px;
      }
    }

    /* Firefox scrollbar */
    .product-grid {
      scrollbar-width: thin;
      scrollbar-color: #cbd5e1 rgba(241, 245, 249, 0.8);
    }
  `;
  document.head.appendChild(style);
}