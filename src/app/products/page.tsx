'use client';
import React, { useState } from 'react';
import PageHeader from "@/component/layout/header/PageHeader";
import ProductCard from "@/component/features/product/ProductCard";
import ProductBanner from "@/component/features/product/ProductBanner";
import SortBar, { SortType } from "@/component/features/product/SortBar";
import FilterPanel from "@/component/features/product/FilterPanel";
import FilterButton from "@/component/features/product/FilterButton";
import LoadingSpinner from "@/component/ui/LoadingSpinner";
import { useSearchParams, useRouter } from 'next/navigation';
import { useFilterState } from '@/hooks/useFilterState';
import { useProductFilter } from '@/hooks/product/useProductFilter';
import { useResponsive } from '@/hooks/useResponsive';
import { useToggle } from '@/hooks/useToggle';
import { Product } from '@/types/Product';
import { useProductsPage } from '@/hooks/product/useProductsPage';

export default function ProductsPage() {
  const searchParams = useSearchParams();
  const subcategoryId = searchParams.get('subcategory');
  const router = useRouter();
  
  // SỬ DỤNG useResponsive THAY VÌ LOGIC CŨ
  const { isMobile, isTablet, windowWidth } = useResponsive({
    mobile: 720,
    tablet: 1000,
  });
  
  // SỬ DỤNG useToggle CHO MOBILE FILTER
  const [showMobileFilter, toggleMobileFilter, setShowMobileFilter] = useToggle(false);
  const [sortType, setSortType] = useState<SortType>('default');

  // Fetch products và subcategory info
  const { 
    products = [], 
    subcategoryInfo, 
    loading, 
    error, 
    refetch 
  } = useProductsPage(subcategoryId);

  // Filter state management với hook đã cập nhật
  const {
    currentFilters,
    pendingFilters,
    setPendingStockFilter,
    setPendingPriceRange,
    setPendingCategories,
    applyFilters,
    resetFilters,
    hasChanges,
  } = useFilterState();

  // Apply filtering và sorting với hook đã cập nhật
  const { sortedAndFilteredProducts, filterCount } = useProductFilter(
    products,
    currentFilters,
    sortType
  );

  const handleProductClick = (product: Product) => {
    router.push(`/productDetail?id=${product.id}`);
  };

  if (loading) {
    return (
      <div>
        <PageHeader />
        <div style={styles.loadingContainer}>
          <LoadingSpinner 
            text="ĐANG TẢI SẢN PHẨM..." 
            size="large"
          />
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div>
        <PageHeader />
        <div style={styles.errorContainer}>
          <p>Error: {error}</p>
          <button onClick={refetch} style={styles.retryButton}>
            Thử lại
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <PageHeader />
      
      {/* BANNER VÀ TIÊU ĐỀ THỂ LOẠI */}
      <ProductBanner subcategoryInfo={subcategoryInfo} />

      <div style={{
        ...styles.mainContent,
        // RESPONSIVE PADDING VÀ GAP
        padding: isMobile ? '16px 4vw' : '20px 5vw',
        gap: isMobile ? '20px' : '30px',
        flexDirection: isMobile ? 'column' : 'row',
      }}>
        {/* Desktop Filter Panel */}
        {!isMobile && (
          <FilterPanel
            pendingStockFilter={pendingFilters.stockFilter}
            pendingPriceRange={pendingFilters.priceRange}
            pendingCategories={pendingFilters.categories}
            onPendingStockChange={setPendingStockFilter}
            onPendingPriceChange={setPendingPriceRange}
            onPendingCategoryChange={setPendingCategories}
            onApply={applyFilters}
            onReset={resetFilters}
            hasChanges={hasChanges()}
            showCategories={true}
            products={products} 
          />
        )}

        {/* Products Content */}
        <div
          style={{
            ...styles.productsContent,
            width: isMobile ? '100%' : 'auto',
            maxWidth: isMobile ? '100%' : 'none',
          }}
        >
          <SortBar 
            sortType={sortType} 
            onSortChange={setSortType}
          >
            {/* Custom left content for products page */}
            <div style={styles.productInfo}>
              <span style={styles.productCount}>
                Hiện có {sortedAndFilteredProducts.length} sản phẩm
              </span>
            </div>
          </SortBar>

          <div style={{
            ...styles.productGrid,
            // SỬ DỤNG LOGIC RESPONSIVE GIỐNG SEARCH RESULT PAGE
            gridTemplateColumns: isMobile 
              ? 'repeat(2, 1fr)' 
              : 'repeat(auto-fit, minmax(230px, 1fr))',
            gap: isMobile ? '16px' : '24px',
          }}>
            {sortedAndFilteredProducts.map((product) => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onClick={handleProductClick}
              />
            ))}
          </div>
          
          {sortedAndFilteredProducts.length === 0 && (
            <div style={{
              ...styles.emptyState,
              padding: isMobile ? '40px 16px' : '60px 20px',
              fontSize: isMobile ? '16px' : '18px',
            }}>
              <p>Không tìm thấy sản phẩm nào phù hợp với bộ lọc</p>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Filter Button */}
      {isMobile && (
        <FilterButton 
          onClick={() => setShowMobileFilter(true)}
          filterCount={filterCount}
        />
      )}

      {/* Mobile Filter Popup */}
      {isMobile && showMobileFilter && (
        <FilterPanel
          pendingStockFilter={pendingFilters.stockFilter}
          pendingPriceRange={pendingFilters.priceRange}
          pendingCategories={pendingFilters.categories}
          onPendingStockChange={setPendingStockFilter}
          onPendingPriceChange={setPendingPriceRange}
          onPendingCategoryChange={setPendingCategories}
          onApply={() => {
            applyFilters();
            setShowMobileFilter(false);
          }}
          onReset={resetFilters}
          hasChanges={hasChanges()}
          showCategories={true} 
          isPopup={true}
          onClose={() => setShowMobileFilter(false)}
        />
      )}
    </div>
  );
}

const styles = {
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
  },
  retryButton: {
    padding: '12px 24px',
    backgroundColor: '#6c5ce7',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: 'bold',
  },
  mainContent: {
    display: 'flex',
    margin: '0 auto',
    alignItems: 'flex-start',
  },
  productsContent: {
    flex: 1,
    minWidth: 0,
  },
  productGrid: {
    display: 'grid',
    justifyItems: 'center',
  },
  emptyState: {
    textAlign: 'center' as const,
    color: '#666',
    backgroundColor: '#f8f9fa',
    border: '2px dashed #ddd',
    borderRadius: '8px',
  },
  productInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  productCount: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#374151',
  },
  categoryName: {
    fontSize: '14px',
    color: '#6b7280',
  },
};