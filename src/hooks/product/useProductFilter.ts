import { useMemo } from 'react';
import { Product, StockStatus } from '@/types/Product';
import { SortType } from '@/component/features/product/SortBar';
import { useCategoryFilter } from './useCategoryFilter';

export interface FilterState {
  stockFilter: StockStatus[];
  priceRange: { min: number; max: number };
  categories: string[];
}

export interface UseProductFilterReturn {
  sortedAndFilteredProducts: Product[];
  filterCount: number;
  categoryData: {
    categoryGroups: any[];
    loading: boolean;
    subCategories: any[];
    handleSubCategoryChange: (
      subCategoryId: string,
      selectedCategories: string[],
      onCategoryChange?: (categories: string[]) => void
    ) => void;
  };
}

export function useProductFilter(
  products: Product[] = [], // Default to empty array if no products
  filters: FilterState,
  sortType: SortType = 'default'
): UseProductFilterReturn {
  // Tích hợp category filter hook
  const categoryFilterData = useCategoryFilter(products);
  // Filter products
  console.log(products)
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      // Stock filter
      const stockMatch = filters.stockFilter.includes('Tất cả') || 
        (filters.stockFilter.includes('Còn hàng') && product.stockQuantity > 0) ||
        (filters.stockFilter.includes('Hàng sắp về') ) ||
        (filters.stockFilter.includes('Hết hàng') && product.stockQuantity === 0);

      // Price filter
      const priceMatch = product.price >= filters.priceRange.min && 
                        product.price <= filters.priceRange.max;

      // Category filter
      const categoryMatch = filters.categories.length === 0 || 
        filters.categories.includes(product.subcategory.id);

      return stockMatch && priceMatch && categoryMatch;
    });
  }, [products, filters]);

  // Sort products
  const sortedAndFilteredProducts = useMemo(() => {
    const sorted = [...filteredProducts];
    
    switch (sortType) {
      case 'price-asc':
        return sorted.sort((a, b) => a.price - b.price);
      case 'price-desc':
        return sorted.sort((a, b) => b.price - a.price);
      case 'newest':
        return sorted.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      case 'bestseller':
        return sorted.sort((a, b) => a.stockQuantity - b.stockQuantity);
      default:
        return sorted;
    }
  }, [filteredProducts, sortType]);

  // Calculate filter count
  const filterCount = useMemo(() => {
    let count = 0;
    if (!filters.stockFilter.includes('Tất cả')) count++;
    if (filters.priceRange.min > 0 || filters.priceRange.max < 5000000) count++;
    if (filters.categories.length > 0) count++;
    return count;
  }, [filters]);

  return {
    sortedAndFilteredProducts,
    filterCount,
    categoryData: categoryFilterData,
  };
}