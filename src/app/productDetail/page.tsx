'use client';
import React from 'react';
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

export default function ProductDetailPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const productId = searchParams.get('id');

  // Updated hook now returns productDetail
  const { product, images, productDetail, relatedProducts, loading, error, refetch } = useProductDetail(productId);
  const { isMobile } = useResponsive(
    { mobile: 900 }
  );

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
  { label: 'Danh mục sản phẩm', href: '/products' }, // Đường dẫn đến danh mục sản phẩm
  { label: product.subcategory.mainCategory.categoryName, href: `/products?category=${product.subcategory.mainCategory.id}` }, // Đường dẫn đến danh mục cụ thể
  { label: product.subcategory.subCategoryName, href: `/products?subcategory=${product.subcategory.id}` }, // Đường dẫn đến danh mục con
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
          alignItems: isMobile? "center" : 'flex-start',
        }}>
          {/* Product Images */}
          <ProductImageGallery
            images={images}
            fallbackImage={product.thumbnail}
            productName={product.productName}
          />

          {/* Product Info - Now includes productDetail */}
          <ProductInfo
            product={product}
            productDetail={productDetail}
            onAddToCart={handleAddToCart}
          />
        </div>

        {/* Related Products Section */}
        {relatedProducts.length > 0 && (
          <div style={styles.relatedSection}>
            <div style={styles.relatedTitle}>Có thể bạn sẽ thích</div>
            <div style={{
              ...styles.relatedGrid,
              gridTemplateColumns: isMobile 
                ? 'repeat(2, 1fr)' 
                : 'repeat(auto-fit, minmax(230px,1fr))',
              gap: isMobile ? '16px' : '24px',
            }}>
              {relatedProducts.map((relatedProduct) => (
                <ProductCard 
                  key={relatedProduct.id} 
                  product={relatedProduct} 
                  onClick={handleProductClick}
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

// Styles giữ nguyên...
const styles = {
  mainContainer: {
    display: "flex",
    flexDirection: 'column' as const,
    gap: '8px',
    width: '100%',
    maxWidth: '1440px',
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
    marginTop: '60px',
  },
  relatedTitle: {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '24px',
    color: '#dc2626',
    background: '#fff1f2',
    padding: '12px 24px',
    borderRadius: '12px',
    display: 'inline-block',
    border: '1px solid #fecaca',
  },
  relatedGrid: {
    display: 'grid',
    justifyItems: 'center',
    padding: '0 20px',
  },
};