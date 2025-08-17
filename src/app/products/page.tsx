'use client';
import PageHeader from "@/component/layout/header/PageHeader";
import ProductCard from "@/component/features/product/ProductCard";
import ProductBanner from "@/component/features/product/ProductBanner";
import SortBar, { SortType } from "@/component/features/product/SortBar";
import FilterPanel from "@/component/features/product/FilterPanel";
import LoadingSpinner from "@/component/ui/LoadingSpinner";
import { useSearchParams, useRouter } from 'next/navigation';
import { useProductsPage } from '@/hooks/useProductsPage';
import { Product } from '@/types/Product';

export default function ProductsPage() {
  const searchParams = useSearchParams();
  const subcategoryId = searchParams.get('subcategory');
  const router = useRouter();
  
  const { 
    filteredAndSortedProducts = [],
    subcategoryInfo, 
    loading, 
    error,
    refetch,
    sortType,         
    sortProducts,
    stockFilter = 'all',
    filterByStock,
    priceRange = { min: 0, max: 10000000 },
    filterByPriceRange,
  } = useProductsPage(subcategoryId);

  const handleProductClick = (product: Product) => {
    router.push(`/products/${product.id}`);
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
      <div style={styles.errorContainer}>
        <p>Error: {error}</p>
        <button onClick={refetch} style={styles.retryButton}>
          Thử lại
        </button>
      </div>
    );
  }

  return (
    <div>
      <PageHeader />
      
      <ProductBanner subcategoryInfo={subcategoryInfo} />
      <SortBar sortType={sortType} onSortChange={sortProducts} />

      <div style={styles.mainContent}>
        <FilterPanel
          stockFilter={stockFilter}
          onStockFilterChange={filterByStock}
          priceRange={priceRange}
          onPriceRangeChange={({ min, max }) => filterByPriceRange(min, max)}
        />

        <div style={styles.productsContent}>
          <div style={styles.productGrid}>
            {filteredAndSortedProducts.map((product) => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onClick={handleProductClick}
              />
            ))}
          </div>
          
          {filteredAndSortedProducts.length === 0 && (
            <div style={styles.emptyState}>
              <p>Không tìm thấy sản phẩm nào phù hợp với bộ lọc</p>
            </div>
          )}
        </div>
      </div>
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
    background: 'linear-gradient(135deg, #1a1aff 0%, #ff6b35 100%)',
    color: 'white',
    border: '2px solid #333',
    borderRadius: '0',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: 'bold',
    textTransform: 'uppercase' as const,
    letterSpacing: '1px',
    transition: 'all 0.3s ease',
    clipPath: 'polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))',
  },
  mainContent: {
    display: 'flex',
    gap: '30px',
    padding: '40px 5vw',
    maxWidth: '1400px',
    margin: '0 auto',
    alignItems: 'flex-start',
  },
  productsContent: {
    flex: 1,
    minWidth: 0,
  },
  productGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '24px',
    justifyItems: 'center',
  },
  emptyState: {
    textAlign: 'center' as const,
    padding: '60px 20px',
    color: '#666',
    fontSize: '18px',
    background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
    border: '2px dashed #1a1aff',
    clipPath: 'polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 20px 100%, 0 calc(100% - 20px))',
  },
};