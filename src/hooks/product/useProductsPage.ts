'use client';
import { useState, useEffect } from 'react';
import { useProducts } from './useProducts';
import { useSubCategory } from '@/hooks/categories/useSubCategory';
import { Product } from '@/types/Product';
import { StockStatus } from '@/types/Product';

export type SortType = 'default' | 'price-asc' | 'price-desc' | 'newest' | 'bestseller';

export function useProductsPage(subcategoryId?: string | null) {
  
  const { 
    products = [], // ✅ Giá trị mặc định                    
    loading: productsLoading,    
    error: productsError,        
    refetch,
    ...productMethods            
  } = useProducts(subcategoryId); 

  const { 
    subcategory: subcategoryInfo, 
    loading: subcategoryLoading,  
    error: subcategoryError,      
    ...subcategoryMethods         
  } = useSubCategory(subcategoryId);

  // 🔄 SORT & FILTER STATES
  const [sortType, setSortType] = useState<SortType>('default');
  const [stockFilter, setStockFilter] = useState<StockStatus[]>(['Tất cả']);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 10000000 });
  const [filteredAndSortedProducts, setFilteredAndSortedProducts] = useState<Product[]>([]);

  // 🔍 FILTER FUNCTION
  const applyFilters = (productList: Product[]) => {
    if (!productList || !Array.isArray(productList)) return [];
    let filtered = [...productList];

    // Stock filter
    if (!stockFilter.includes('Tất cả')) {
      filtered = filtered.filter(product => {
        let matched = false;
        if (stockFilter.includes('Còn hàng') && (product.stock_quantity || 0) > 0 && product.status === 'Còn hàng') matched = true;
        if (stockFilter.includes('Hết hàng') && ((product.stock_quantity || 0) === 0 || product.status === 'Hết hàng')) matched = true;
        if (stockFilter.includes('Hàng sắp về') && product.status === 'Hàng sắp về') matched = true;
        return matched;
      });
    }

    // Price range filter
    filtered = filtered.filter(product =>
      product.price >= priceRange.min && product.price <= priceRange.max
    );

    return filtered;
  };

  // 🔄 SORT FUNCTION
  const applySorting = (productList: Product[]) => {
    if (!productList || !Array.isArray(productList)) return [];
    
    let sorted = [...productList];
    
    switch (sortType) {
      case 'price-asc':
        sorted = sorted.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        sorted = sorted.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        sorted = sorted.sort((a, b) => {
          const dateA = new Date(a.created_at || '').getTime();
          const dateB = new Date(b.created_at || '').getTime();
          return dateB - dateA;
        });
        break;
      // case 'bestseller':
      //   sorted = sorted.sort((a, b) => (b.sold_count || 0) - (a.sold_count || 0));
      //   break;
      default:
        break;
    }
    
    return sorted;
  };

  // 🔄 COMBINED FILTER AND SORT
  const updateFilteredAndSortedProducts = () => {
    const filtered = applyFilters(products);
    const sorted = applySorting(filtered);
    setFilteredAndSortedProducts(sorted);
  };

  // 🔄 UPDATE khi products hoặc filters thay đổi
  useEffect(() => {
    updateFilteredAndSortedProducts();
  }, [products, sortType, stockFilter, priceRange]);

  // 🎯 HANDLER FUNCTIONS
  const sortProducts = (type: SortType) => {
    setSortType(type);
  };

  const filterByStock = (statuses: StockStatus[]) => {
    setStockFilter(statuses);
  };

  const filterByPriceRange = (range: { min: number; max: number }) => {
    setPriceRange(range);
  };

  const loading = productsLoading || subcategoryLoading;
  const error = productsError || subcategoryError;

  return {
    // 📊 Data
    products,
    filteredAndSortedProducts,
    subcategoryInfo,
    
    // 🔄 States
    loading,
    error,
    sortType,
    stockFilter,
    priceRange,
    
    // 🎯 Actions
    sortProducts,
    filterByStock,

    // 🛠️ Methods
    ...productMethods,
    ...subcategoryMethods
  };
}