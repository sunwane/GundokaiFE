'use client';
export const dynamic = "force-dynamic";

import React, { Suspense, useState } from 'react';
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

function ProductsPageContent() {
  const searchParams = useSearchParams();
  const subcategoryId = searchParams.get('subcategory');
  const router = useRouter();

  const value = !subcategoryId ? true : false;
  
  const { isMobile, isTablet, windowWidth } = useResponsive({
    mobile: 840,
    tablet: 1024,
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
    const containerWidth = windowWidth - 120;
    const cardMinWidth = isMobile ? 150 : 250;
    const gap = isMobile ? 12 : 24;
    return Math.floor((containerWidth) / (cardMinWidth + gap));
  };

  const maxColumns = getMaxColumns();
  const productCount = sortedAndFilteredProducts.length;
  const shouldUseFlex = productCount > 0 && productCount < maxColumns - 1;

  if (loading) {
    return (
      <>
        <PageHeader />
        <div style={styles.loadingContainer}>
          <LoadingSpinner 
            text="ĐANG TẢI SẢN PHẨM..." 
            size="large"
          />
        </div>
      </>
    );
  }
  
  if (error) {
    return (
      <>
        <PageHeader />
        <div style={styles.errorContainer}>
          <p>Error: {error}</p>
          <button onClick={refetch} style={styles.retryButton}>
            Thử lại
          </button>
        </div>
      </>
    );
  }
  return (
    <>
      <PageHeader />
      
      <ProductBanner subcategoryInfo={subcategoryInfo} />

      <div style={{
        ...styles.mainContent,
        padding: isMobile ? '16px 4vw' : '20px 5vw',
        gap: isMobile ? '20px' : '30px',
        flexDirection: isMobile ? 'column' : 'row',
      }}>
        {!(isMobile || isTablet) && (
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
          {isMobile || isTablet ? (
            <div>
            <div style={{
              ...styles.productInfo,
            }}>
              <span style={{
                ...styles.productCount,
                marginTop: isMobile ? '16px' : isTablet ? '20px' : '24px',
                textAlign: 'center',
                fontSize: "20px"
              }}>
                Hiện có {sortedAndFilteredProducts.length} sản phẩm
              </span>
            </div>
            <div style={{
              marginBottom: isMobile ? '16px' : isTablet ? '20px' : '24px',
              alignItems: 'stretch',
              display: 'flex',
              justifyContent: 'center',
              gap: '12px',
            }}>
              <SortBar
                sortType={sortType}
                onSortChange={setSortType} />
            </div>
          </div>
          ):(
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
          )}

          <div style={{
            ...(shouldUseFlex ? styles.productFlex : styles.productGrid),
            ...(!shouldUseFlex && {
              gridTemplateColumns: `repeat(auto-fit, minmax(${isMobile ? '140px' : '220px'}, 1fr))`,
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
                  width: isMobile ? "auto" : '220px',
                  flexShrink: 0,
                } : {}}
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

      {(isMobile || isTablet) && (
        <FilterButton 
          onClick={() => setShowMobileFilter(true)}
          filterCount={filterCount}
        />
      )}

      {(isMobile || isTablet) && showMobileFilter && (
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
    </>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={
      <div style={styles.loadingContainer}>
        <LoadingSpinner text="Đang tải..." size="large" />
      </div>
    }>
      <ProductsPageContent />
    </Suspense>
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
    justifyContent: 'center',
    gap: '8px',
  },
  productCount: {
    fontWeight: '600',
    color: '#000',
  },
  categoryName: {
    fontSize: '14px',
    color: '#6b7280',
  },
};