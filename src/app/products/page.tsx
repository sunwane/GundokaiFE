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
import Footer from '@/component/layout/footer/Footer';

export default function ProductsPage() {
  const searchParams = useSearchParams();
  const subcategoryId = searchParams.get('subcategory');
  const router = useRouter();

  const value = !subcategoryId ? true : false;
  
  const { isMobile, isTablet, windowWidth } = useResponsive({
    mobile: 720,
    tablet: 1000,
  });
  
  const [showMobileFilter, toggleMobileFilter, setShowMobileFilter] = useToggle(false);
  const [sortType, setSortType] = useState<SortType>('default');

  const { 
    products = [], 
    subcategoryInfo, 
    loading, 
    error, 
    refetch 
  } = useProductsPage(subcategoryId);

  console.log('ProductsPage render with products:', subcategoryInfo);

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

  const { sortedAndFilteredProducts, filterCount } = useProductFilter(
    products,
    currentFilters,
    sortType
  );

  const handleProductClick = (product: Product) => {
    router.push(`/productDetail?id=${product.id}`);
  };

  const getMaxColumns = () => {
    if (isMobile) return 2;
    const containerWidth = windowWidth - (isMobile ? 32 : 200);
    const cardMinWidth = 250;
    const gap = 24;
    return Math.floor((containerWidth + gap) / (cardMinWidth + gap));
  };

  const maxColumns = getMaxColumns();
  const productCount = sortedAndFilteredProducts.length;
  const shouldUseFlex = productCount > 0 && productCount < maxColumns;

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
      
      <ProductBanner subcategoryInfo={subcategoryInfo} />

      <div style={{
        ...styles.mainContent,
        padding: isMobile ? '16px 4vw' : '20px 5vw',
        gap: isMobile ? '20px' : '30px',
        flexDirection: isMobile ? 'column' : 'row',
      }}>
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
            showCategories={value}
            products={products} 
          />
        )}

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
            <div style={styles.productInfo}>
              <span style={styles.productCount}>
                Hiện có {sortedAndFilteredProducts.length} sản phẩm
              </span>
            </div>
          </SortBar>

          <div style={{
            ...(shouldUseFlex ? styles.productFlex : styles.productGrid),
            ...(!shouldUseFlex && {
              gridTemplateColumns: isMobile 
                ? 'repeat(2, 1fr)' 
                : 'repeat(auto-fit, minmax(230px, 1fr))',
              gap: isMobile ? '16px' : '24px',
            }),
            ...(shouldUseFlex && {
              gap: isMobile ? '16px' : '32px',
              justifyContent: 'flex-start',
              alignItems: 'center',
            }),
          }}>
            {sortedAndFilteredProducts.map((product) => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onClick={handleProductClick}
                isMobile={isMobile}
                style={shouldUseFlex ? {
                  width: isMobile ? 'calc(50% - 8px)' : '230px',
                  flexShrink: 0,
                } : undefined}
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

      {isMobile && (
        <FilterButton 
          onClick={() => setShowMobileFilter(true)}
          filterCount={filterCount}
        />
      )}

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
      <Footer />
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
    marginBottom: "60px",
  },
  productsContent: {
    flex: 1,
    minWidth: 0,
  },
  productGrid: {
    display: 'grid',
    justifyItems: 'center',
  },
  productFlex: {
    display: 'flex',
    flexWrap: 'wrap' as const,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
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