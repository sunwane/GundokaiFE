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
  const { isMobile, windowWidth } = useResponsive();
  
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

  // Tính số cột tối đa có thể hiển thị trên một hàng
  const getMaxColumns = () => {
    if (isMobile) return 2;
    // Tính dựa trên width container và min-width của product card
    const containerWidth = windowWidth - (isMobile ? 32 : 200); // Trừ padding và filter panel
    const cardMinWidth = 250; // Min width của product card cho search
    const gap = 24;
    return Math.floor((containerWidth + gap) / (cardMinWidth + gap));
  };

  const maxColumns = getMaxColumns();
  const productCount = sortedAndFilteredProducts.length;
  const shouldUseFlex = productCount > 0 && productCount < maxColumns;

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
        padding: isMobile ? '16px 4vw' : '24px 5vw',
      }}>
        {/* Content Layout */}
        <div style={{
          ...styles.contentLayout,
          flexDirection: isMobile ? 'column' : 'row',
        }}>
          {/* Filter Panel - Desktop */}
          {!isMobile && (
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
          )}

          {/* Products Container */}
          <div style={styles.productsContainer}>
            {/* SortBar with search info */}
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

            {/* Results Grid/Flex */}
            {sortedAndFilteredProducts.length === 0 ? (
              <div style={styles.noResults}>
                <div style={styles.noResultsIcon}>🔍</div>
                <h3 style={styles.noResultsTitle}>
                  {searchResults.length === 0 
                    ? 'Không tìm thấy sản phẩm phù hợp' 
                    : 'Không có sản phẩm nào phù hợp với bộ lọc'
                  }
                </h3>
                <p style={styles.noResultsText}>
                  {searchResults.length === 0 
                    ? 'Hãy thử tìm kiếm với từ khóa khác hoặc kiểm tra chính tả.' 
                    : 'Hãy thử điều chỉnh bộ lọc hoặc tìm kiếm với từ khóa khác.'
                  }
                </p>
                <div style={styles.noResultsActions}>
                  {searchResults.length > 0 && (
                    <button 
                      style={styles.resetFiltersButton}
                      onClick={resetFilters}
                    >
                      Xóa bộ lọc
                    </button>
                  )}
                  <button 
                    style={styles.backButton}
                    onClick={() => router.push('/products')}
                  >
                    Xem tất cả sản phẩm
                  </button>
                </div>
              </div>
            ) : (
              /* Dynamic Grid/Flex Container */
              <div style={{
                ...(shouldUseFlex ? styles.productFlex : styles.productGrid),
                // Grid styles khi có nhiều sản phẩm
                ...(!shouldUseFlex && {
                  gridTemplateColumns: isMobile 
                    ? 'repeat(2, 1fr)' 
                    : 'repeat(auto-fit, minmax(210px, 1fr))',
                  gap: isMobile ? '16px' : '24px',
                }),
                // Flex styles khi có ít sản phẩm
                ...(shouldUseFlex && {
                  gap: isMobile ? '16px' : '32px',
                  justifyContent: 'center',
                  alignItems: 'center',
                }),
              }}>
                {sortedAndFilteredProducts.map((product) => (
                  <ProductCard 
                    key={product.id} 
                    product={product} 
                    onClick={handleProductClick}
                    style={shouldUseFlex ? {
                      width: isMobile ? 'calc(50% - 8px)' : '210px',
                      flexShrink: 0,
                    } : undefined}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Mobile Filter Button */}
        {isMobile && (
          <FilterButton 
            onClick={() => setShowFilterPanel(true)}
            filterCount={filterCount}
          />
        )}

        {/* Mobile Filter Popup */}
        {isMobile && showFilterPanel && (
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

// Updated styles với productFlex
const styles = {
  container: {
    margin: '0 auto',
    minHeight: '70vh',
    marginBottom: '70px',
  },
  loadingContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '50vh',
  },
  searchHeader: {
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
    margin: 0,
  },
  contentLayout: {
    display: 'flex',
    gap: '32px',
    alignItems: 'flex-start',
  },
  productsContainer: {
    flex: 1,
    minWidth: 0,
  },
  productGrid: {
    display: 'grid',
    justifyItems: 'center',
  },
  // Thêm style cho flex layout
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
    padding: '80px 20px',
    textAlign: 'center' as const,
  },
  noResultsIcon: {
    fontSize: '80px',
    marginBottom: '24px',
    opacity: 0.5,
  },
  noResultsTitle: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#374151',
    marginBottom: '12px',
  },
  noResultsText: {
    fontSize: '16px',
    color: '#6b7280',
    marginBottom: '32px',
    maxWidth: '500px',
    lineHeight: 1.6,
  },
  noResultsActions: {
    display: 'flex',
    gap: '16px',
    flexWrap: 'wrap' as const,
    justifyContent: 'center',
  },
  resetFiltersButton: {
    padding: '12px 24px',
    backgroundColor: '#f3f4f6',
    color: '#374151',
    border: '1px solid #d1d5db',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'background 0.2s ease',
  },
  backButton: {
    padding: '12px 32px',
    backgroundColor: '#2563eb',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'background 0.2s ease',
  },
};