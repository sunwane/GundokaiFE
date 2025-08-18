'use client';
import React, { useState, useEffect } from 'react';
import PageHeader from "@/component/layout/header/PageHeader";
import ProductCard from '@/component/features/product/ProductCard';
import LoadingSpinner from "@/component/ui/LoadingSpinner";
import SortBar, { SortType } from '@/component/features/product/SortBar';
import FilterPanel from '@/component/features/product/FilterPanel';
import FilterButton from '@/component/features/product/FilterButton';
import { useSearchParams, useRouter } from 'next/navigation';
import { useResponsive } from '@/hooks/useResponsive';
import { mockProducts } from '@/data/mockProducts';
import { Product, StockStatus } from '@/types/Product';

export default function SearchResultPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { isMobile } = useResponsive();
  
  const query = searchParams.get('query') || '';
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Filter and sort states
  const [sortType, setSortType] = useState<SortType>('default');
  const [showFilterPanel, setShowFilterPanel] = useState(false);
  
  // Filter states
  const [pendingStockFilter, setPendingStockFilter] = useState<StockStatus[]>(['Tất cả']);
  const [pendingPriceRange, setPendingPriceRange] = useState({ min: 0, max: 5000000 });
  const [pendingCategories, setPendingCategories] = useState<string[]>([]);
  
  // Applied filters
  const [appliedStockFilter, setAppliedStockFilter] = useState<StockStatus[]>(['Tất cả']);
  const [appliedPriceRange, setAppliedPriceRange] = useState({ min: 0, max: 5000000 });
  const [appliedCategories, setAppliedCategories] = useState<string[]>([]);

  // Search function
  const searchProducts = (searchTerm: string): Product[] => {
    if (!searchTerm.trim()) return [];
    
    return mockProducts.filter(product => 
      product.product_Name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  // Sort function
  const sortProducts = (products: Product[], type: SortType): Product[] => {
    const sorted = [...products];
    
    switch (type) {
      case 'price-asc':
        return sorted.sort((a, b) => a.price - b.price);
      case 'price-desc':
        return sorted.sort((a, b) => b.price - a.price);
      case 'newest':
        return sorted.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
      case 'bestseller':
        return sorted.sort((a, b) => a.stock_quantity - b.stock_quantity);
      default:
        return sorted;
    }
  };

  // Filter function
  const filterProducts = (products: Product[]): Product[] => {
    return products.filter(product => {
      const stockMatch = appliedStockFilter.includes('Tất cả') || 
        (appliedStockFilter.includes('Còn hàng') && product.stock_quantity > 0) ||
        (appliedStockFilter.includes('Hết hàng') && product.stock_quantity === 0);

      const priceMatch = product.price >= appliedPriceRange.min && product.price <= appliedPriceRange.max;

      const categoryMatch = appliedCategories.length === 0 || 
        appliedCategories.includes(product.category_id) ||
        appliedCategories.includes(product.subCategory_id);

      return stockMatch && priceMatch && categoryMatch;
    });
  };

  // Initial search
  useEffect(() => {
    const performSearch = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 300));
      const results = searchProducts(query);
      setAllProducts(results);
      setLoading(false);
    };

    if (query) {
      performSearch();
    } else {
      setAllProducts([]);
      setLoading(false);
    }
  }, [query]);

  // Apply filters and sorting
  useEffect(() => {
    const filtered = filterProducts(allProducts);
    const sorted = sortProducts(filtered, sortType);
    setFilteredProducts(sorted);
  }, [allProducts, appliedStockFilter, appliedPriceRange, appliedCategories, sortType]);

  // Filter handlers
  const handleApplyFilters = () => {
    setAppliedStockFilter([...pendingStockFilter]);
    setAppliedPriceRange({ ...pendingPriceRange });
    setAppliedCategories([...pendingCategories]);
    setShowFilterPanel(false);
  };

  const handleResetFilters = () => {
    setPendingStockFilter(['Tất cả']);
    setPendingPriceRange({ min: 0, max: 5000000 });
    setPendingCategories([]);
    setAppliedStockFilter(['Tất cả']);
    setAppliedPriceRange({ min: 0, max: 5000000 });
    setAppliedCategories([]);
  };

  const hasChanges = 
    JSON.stringify(pendingStockFilter) !== JSON.stringify(appliedStockFilter) ||
    JSON.stringify(pendingPriceRange) !== JSON.stringify(appliedPriceRange) ||
    JSON.stringify(pendingCategories) !== JSON.stringify(appliedCategories);

  const handleProductClick = (product: Product) => {
    router.push(`/productDetail?id=${product.id}`);
  };

  const handleToggleFilters = () => {
    setShowFilterPanel(!showFilterPanel);
  };

  if (loading) {
    return (
      <div>
        <PageHeader />
        <div style={styles.loadingContainer}>
          <LoadingSpinner text="Đang tìm kiếm..." size="large" />
        </div>
      </div>
    );
  }

  return (
    <div>
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
              pendingStockFilter={pendingStockFilter}
              pendingPriceRange={pendingPriceRange}
              pendingCategories={pendingCategories}
              onPendingStockChange={setPendingStockFilter}
              onPendingPriceChange={setPendingPriceRange}
              onPendingCategoryChange={setPendingCategories}
              onApply={handleApplyFilters}
              onReset={handleResetFilters}
              hasChanges={hasChanges}
              products={allProducts}
              showCategories={true}
            />
          )}

          {/* Products Container */}
          <div style={styles.productsContainer}>
            {/* Simple SortBar with custom left content */}
            <SortBar
              sortType={sortType}
              onSortChange={setSortType}
            >
                <div style={styles.searchHeader}>
                <h1 style={styles.title}>
                    Kết quả tìm kiếm cho: <span style={styles.queryText}>"{query}"</span>
                </h1>
                <p style={styles.resultCount}>
                    Tìm thấy {filteredProducts.length} sản phẩm
                </p>
                </div>
            </SortBar>

            {/* Mobile Filter Button */}
            {isMobile && (
              <div style={styles.mobileFilterContainer}>
                <button 
                  style={styles.mobileFilterButton}
                  onClick={handleToggleFilters}
                >
                  🔍 Bộ lọc & Sắp xếp
                </button>
              </div>
            )}

            {/* Results Grid */}
            {filteredProducts.length === 0 ? (
              <div style={styles.noResults}>
                <div style={styles.noResultsIcon}>🔍</div>
                <h3 style={styles.noResultsTitle}>
                  {allProducts.length === 0 
                    ? 'Không tìm thấy sản phẩm phù hợp' 
                    : 'Không có sản phẩm nào phù hợp với bộ lọc'
                  }
                </h3>
                <p style={styles.noResultsText}>
                  {allProducts.length === 0 
                    ? 'Hãy thử tìm kiếm với từ khóa khác hoặc kiểm tra chính tả.'
                    : 'Hãy thử điều chỉnh bộ lọc hoặc tìm kiếm với từ khóa khác.'
                  }
                </p>
                <div style={styles.noResultsActions}>
                  {allProducts.length > 0 && (
                    <button 
                      style={styles.resetFiltersButton}
                      onClick={handleResetFilters}
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
              <div style={{
                ...styles.productGrid,
                gridTemplateColumns: isMobile 
                  ? 'repeat(2, 1fr)' 
                  : 'repeat(auto-fit, minmax(210px, 1fr))',
                gap: isMobile ? '16px' : '24px',
              }}>
                {filteredProducts.map((product) => (
                  <ProductCard 
                    key={product.id} 
                    product={product} 
                    onClick={handleProductClick}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Mobile Filter Popup */}
        {isMobile && showFilterPanel && (
          <FilterPanel
            pendingStockFilter={pendingStockFilter}
            pendingPriceRange={pendingPriceRange}
            pendingCategories={pendingCategories}
            onPendingStockChange={setPendingStockFilter}
            onPendingPriceChange={setPendingPriceRange}
            onPendingCategoryChange={setPendingCategories}
            onApply={handleApplyFilters}
            onReset={handleResetFilters}
            hasChanges={hasChanges}
            products={allProducts}
            showCategories={true}
            isPopup={true}
            onClose={() => setShowFilterPanel(false)}
          />
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    margin: '0 auto',
    minHeight: '70vh',
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
    color: '#dc2626', // Màu đỏ như yêu cầu
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
  mobileFilterContainer: {
    marginBottom: '20px',
  },
  mobileFilterButton: {
    width: '100%',
    padding: '12px 16px',
    backgroundColor: '#667eea',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
  },
  productGrid: {
    display: 'grid',
    justifyItems: 'center',
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