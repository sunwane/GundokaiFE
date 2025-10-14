'use client';
export const dynamic = "force-dynamic";

import React, { useState, useEffect, Suspense } from 'react';
import PageHeader from "@/component/layout/header/PageHeader";
import ProductCard from '@/component/features/product/ProductCard';
import LoadingSpinner from "@/component/ui/LoadingSpinner";
import SortBar, { SortType } from '@/component/features/product/SortBar';
import FilterPanel from '@/component/features/product/FilterPanel';
import FilterButton from '@/component/features/product/FilterButton';
import { useSearchParams, useRouter } from 'next/navigation';
import { useResponsive } from '@/hooks/useResponsive';
import { useToggle } from '@/hooks/useToggle';

// Import các hooks có sẵn
import { useProductFilter } from '@/hooks/product/useProductFilter';

// Import custom hook mới cho search
import { useSearchProducts } from '@/hooks/product/useSearchProducts';
import { useFilterState } from '@/hooks/product/useFilterState';

import { Product } from '@/types/Product';
import Footer from '@/component/layout/footer/Footer';

function SearchResultContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { isMobile, isTablet, windowWidth } = useResponsive({
    mobile: 840,
    tablet: 1024,
  });
  
  const query = searchParams.get('query') || '';
  
  // Sử dụng custom search hook
  const { searchResults, loading, searchProducts } = useSearchProducts();
  
  // Sử dụng filter state hook
  const {
    filters,
    pendingFilters,
    updatePendingStockFilter,
    updatePendingPriceRange,
    updatePendingCategories,
    applyFilters,
    resetFilters,
    hasChanges
  } = useFilterState();
  
  // Sort state
  const [sortType, setSortType] = useState<SortType>('default');
  
  // Mobile filter toggle
  const [showFilterPanel, toggleFilterPanel, setShowFilterPanel] = useToggle(false);
  
  // Sử dụng product filter hook
  const { sortedAndFilteredProducts, filterCount } = useProductFilter(
    searchResults || [], // Đảm bảo luôn là mảng
    filters,
    sortType
  );

  // Simplified responsive logic - giống Products page
  const getMaxColumns = () => {
    const containerWidth = windowWidth - 120;
    const cardMinWidth = isMobile ? 140 : 220;
    const gap = isMobile ? 16 : 24;
    return Math.floor((containerWidth) / (cardMinWidth + gap));
  };

  const maxColumns = getMaxColumns();
  const productCount = sortedAndFilteredProducts.length;
  const shouldUseFlex = productCount > 0 && productCount < maxColumns - 1;

  // Initial search
  useEffect(() => {
    if (query) {
      searchProducts(query);
    }
  }, [query, searchProducts]);

  const handleProductClick = (product: Product) => {
    router.push(`/productDetail?id=${product.id}`);
  };

  const handleApplyFilters = () => {
    applyFilters();
    setShowFilterPanel(false);
  };

  if (loading) {
    return (
      <>
        <PageHeader />
        <div style={styles.loadingContainer}>
          <LoadingSpinner text="Đang tìm kiếm..." size="large" />
        </div>
      </>
    );
  }

  return (
    <>
      <PageHeader />
      
      <div style={{
        ...styles.container,
        padding: isMobile ? '16px 4vw' : '20px 5vw',
        gap: isMobile ? '20px' : '30px',
        flexDirection: isMobile ? 'column' : 'row',
      }}>
        {/* Content Layout */}
        <div style={{
          ...styles.contentLayout,
          flexDirection: (isMobile || isTablet) ? 'column' : 'row',
          gap: isMobile ? '16px' : isTablet ? '20px' : '48px',
        }}>
          {/* Filter Panel - Desktop Only */}
          {!(isMobile || isTablet) && (
            <div style={styles.filterPanelContainer}>
              <FilterPanel
                pendingStockFilter={pendingFilters.stockFilter}
                pendingPriceRange={pendingFilters.priceRange}
                pendingCategories={pendingFilters.categories}
                onPendingStockChange={updatePendingStockFilter}
                onPendingPriceChange={updatePendingPriceRange}
                onPendingCategoryChange={updatePendingCategories}
                onApply={handleApplyFilters}
                onReset={resetFilters}
                hasChanges={hasChanges}
                products={searchResults}
                showCategories={true}
              />
            </div>
          )}

          {/* Products Container */}
          <div style={{
            marginTop: (isMobile || isTablet) ? '0' : '20px',
            width: (isMobile || isTablet) ? '100%' : 'auto',
            flex: 1,
            minWidth: 0,
          }}>
            {/* Search Header + SortBar - Responsive như Products */}
            {isMobile || isTablet ? (
              <div>
                <div style={{
                  ...styles.searchHeader,
                  marginTop: isMobile ? '16px' : isTablet ? '20px' : '24px',
                  textAlign: 'center',
                }}>
                  <h1 style={{
                    ...styles.title,
                    fontSize: isMobile ? '20px' : isTablet ? '24px' : '28px',
                    lineHeight: '1.3',
                    marginBottom: '4px',
                  }}>
                    Kết quả tìm kiếm cho: <span style={styles.queryText}>{`"${query}"`}</span>
                  </h1>
                  <p style={{
                    ...styles.resultCount,
                    fontSize: '20px',
                  }}>
                    Tìm thấy {sortedAndFilteredProducts.length} sản phẩm
                  </p>
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
                    onSortChange={setSortType} 
                  />
                </div>
              </div>
            ) : (
              <SortBar
                sortType={sortType}
                onSortChange={setSortType}
              >
                <div style={styles.searchHeader}>
                  <h1 style={styles.title}>
                    Kết quả tìm kiếm cho: <span style={styles.queryText}>{`"${query}"`}</span>
                  </h1>
                  <p style={styles.resultCount}>
                    Tìm thấy {sortedAndFilteredProducts.length} sản phẩm
                  </p>
                </div>
              </SortBar>
            )}

            {/* Results Grid/Flex - Simplified logic */}
            {sortedAndFilteredProducts.length === 0 ? (
              <div style={{
                ...styles.noResults,
                padding: isMobile ? '40px 16px' : isTablet ? '60px 20px' : '80px 20px',
              }}>
                <div style={{
                  fontSize: isMobile ? '60px' : isTablet ? '70px' : '80px',
                  marginBottom: isMobile ? '16px' : '24px',
                  opacity: 0.5,
                }}>🔍</div>
                <h3 style={{
                  fontSize: isMobile ? '20px' : isTablet ? '22px' : '24px',
                  marginBottom: isMobile ? '8px' : '12px',
                  fontWeight: 'bold',
                  color: '#374151',
                }}>
                  {searchResults.length === 0 
                    ? 'Không tìm thấy sản phẩm phù hợp' 
                    : 'Không có sản phẩm nào phù hợp với bộ lọc'
                  }
                </h3>
                <p style={{
                  fontSize: isMobile ? '14px' : '16px',
                  marginBottom: isMobile ? '24px' : '32px',
                  maxWidth: isMobile ? '300px' : '500px',
                  color: '#6b7280',
                  lineHeight: 1.6,
                }}>
                  {searchResults.length === 0 
                    ? 'Hãy thử tìm kiếm với từ khóa khác hoặc kiểm tra chính tả.' 
                    : 'Hãy thử điều chỉnh bộ lọc hoặc tìm kiếm với từ khóa khác.'
                  }
                  </p>
                <div style={{
                  display: 'flex',
                  flexDirection: isMobile ? 'column' : 'row',
                  gap: isMobile ? '12px' : '16px',
                  justifyContent: 'center',
                  width: '100%',
                }}>
                  {searchResults.length > 0 && (
                    <button 
                      style={{
                        backgroundColor: '#f3f4f6',
                        color: '#374151',
                        border: '1px solid #d1d5db',
                        borderRadius: '8px',
                        fontWeight: '600',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        padding: isMobile ? '10px 20px' : '12px 24px',
                        fontSize: isMobile ? '14px' : '16px',
                        width: isMobile ? '100%' : 'auto',
                      }}
                      onClick={resetFilters}
                    >
                      Xóa bộ lọc
                    </button>
                  )}
                  <button 
                    style={{
                      backgroundColor: '#2563eb',
                      color: '#fff',
                      border: 'none',
                      borderRadius: '8px',
                      fontWeight: '600',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      padding: isMobile ? '10px 20px' : '12px 32px',
                      fontSize: isMobile ? '14px' : '16px',
                      width: isMobile ? '100%' : 'auto',
                    }}
                    onClick={() => router.push('/products')}
                  >
                    Xem tất cả sản phẩm
                  </button>
                </div>
              </div>
            ) : (
              /* Simplified Grid/Flex Container - giống Products */
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
            )}
          </div>
        </div>

        {/* Mobile/Tablet Filter Button */}
        {(isMobile || isTablet) && (
          <FilterButton 
            onClick={() => setShowFilterPanel(true)}
            filterCount={filterCount}
          />
        )}

        {/* Mobile/Tablet Filter Popup */}
        {(isMobile || isTablet) && showFilterPanel && (
          <FilterPanel
            pendingStockFilter={pendingFilters.stockFilter}
            pendingPriceRange={pendingFilters.priceRange}
            pendingCategories={pendingFilters.categories}
            onPendingStockChange={updatePendingStockFilter}
            onPendingPriceChange={updatePendingPriceRange}
            onPendingCategoryChange={updatePendingCategories}
            onApply={handleApplyFilters}
            onReset={resetFilters}
            hasChanges={hasChanges}
            products={searchResults}
            showCategories={true}
            isPopup={true}
            onClose={() => setShowFilterPanel(false)}
          />
        )}
      </div>
      <Footer />
    </>
  );
}

export default function SearchResultPage() {
  return (
    <Suspense fallback={
      <div style={styles.loadingContainer}>
        <LoadingSpinner text="Đang tải..." size="large" />
      </div>
    }>
      <SearchResultContent />
    </Suspense>
  );
}

// Simplified styles - giống Products
const styles = {
  container: {
    margin: '0 auto',
    minHeight: '70vh',
    marginBottom: '70px',
    width: '100%',
    boxSizing: 'border-box' as const,
    display: 'flex',
    alignItems: 'flex-start',
  },
  loadingContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '50vh',
    width: '100%',
  },
  searchHeader: {
    // marginBottom will be set dynamically
  },
  title: {
    fontSize: '28px',
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: '8px',
  },
  queryText: {
    color: '#dc2626',
    fontStyle: 'italic',
  },
  resultCount: {
    fontSize: '16px',
    color: '#6b7280',
    fontWeight: '600',
    margin: 0,
  },
  contentLayout: {
    display: 'flex',
    alignItems: 'flex-start',
    width: '100%',
  },
  filterPanelContainer: {
    width: '280px',
    flexShrink: 0,
    position: 'sticky' as const,
    top: '20px',
    height: 'fit-content',
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
  noResults: {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center' as const,
    width: '100%',
  },
};