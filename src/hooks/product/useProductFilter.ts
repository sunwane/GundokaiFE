import { useMemo } from 'react';
import { Product } from '@/types/Product';
import { FilterState } from './useFilterState';
import { SortType } from '@/component/features/product/SortBar';

export interface UseProductFilterReturn {
  filteredProducts: Product[];
  sortedAndFilteredProducts: Product[];
  filterCount: number;
}

export function useProductFilter(
  products: Product[],
  filters: FilterState,
  sortType: SortType = 'default'
): UseProductFilterReturn {

  // Apply filters
  const filteredProducts = useMemo(() => {
    if (!products || !Array.isArray(products)) return [];

    let filtered = [...products];

    // Stock filter
    if (!filters.stockFilter.includes('Tất cả')) {
      filtered = filtered.filter(product => {
        let matched = false;
        
        if (filters.stockFilter.includes('Còn hàng') && 
            (product.stock_quantity || 0) > 0 && 
            product.status === 'Còn hàng') {
          matched = true;
        }
        
        if (filters.stockFilter.includes('Hết hàng') && 
            ((product.stock_quantity || 0) === 0 || product.status === 'Hết hàng')) {
          matched = true;
        }
        
        if (filters.stockFilter.includes('Hàng sắp về') && 
            product.status === 'Hàng sắp về') {
          matched = true;
        }
        
        return matched;
      });
    }

    // Price range filter
    filtered = filtered.filter(product =>
      product.price >= filters.priceRange.min && 
      product.price <= filters.priceRange.max
    );

    // Category filter
    if (filters.categories.length > 0) {
      filtered = filtered.filter(product =>
        filters.categories.includes(product.subCategory_id)
      );
    }

    return filtered;
  }, [products, filters]);

  // Apply sorting
  const sortedAndFilteredProducts = useMemo(() => {
    if (!filteredProducts || filteredProducts.length === 0) return [];

    const sorted = [...filteredProducts];

    switch (sortType) {
      case 'price-asc':
        return sorted.sort((a, b) => a.price - b.price);
      
      case 'price-desc':
        return sorted.sort((a, b) => b.price - a.price);
      
      case 'newest':
        return sorted.sort((a, b) => 
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
      
      case 'bestseller':
        // Assuming products with higher stock_quantity are bestsellers
        return sorted.sort((a, b) => (b.stock_quantity || 0) - (a.stock_quantity || 0));
      
      default:
        return sorted;
    }
  }, [filteredProducts, sortType]);

  // Calculate active filter count
  const filterCount = useMemo(() => {
    let count = 0;
    
    // Stock filter count (exclude 'Tất cả')
    count += filters.stockFilter.filter(s => s !== 'Tất cả').length;
    
    // Price range count
    if (filters.priceRange.min > 0 || filters.priceRange.max < 10000000) {
      count += 1;
    }
    
    // Category count
    count += filters.categories.length;
    
    return count;
  }, [filters]);

  return {
    filteredProducts,
    sortedAndFilteredProducts,
    filterCount,
  };
}