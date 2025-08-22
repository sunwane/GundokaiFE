'use client';
import { useState, useCallback } from 'react';
import { Product, ProductResponse } from '@/types/Product';
import { ProductService } from '@/services/ProductService';

export interface UseSearchProductsReturn {
  searchResults: Product[];
  loading: boolean;
  error: string | null;
  searchProducts: (query: string) => void;
}

export function useSearchProducts(): UseSearchProductsReturn {
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const searchProducts = useCallback(async (query: string) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      // Simulate API delay
      // await new Promise(resolve => setTimeout(resolve, 300));
      
      // const results = mockProducts.filter(product => 
      //   product.productName.toLowerCase().includes(query.toLowerCase()) ||
      //   product.description.toLowerCase().includes(query.toLowerCase())
      // );
      const response: ProductResponse = await ProductService.searchProducts(query);
      
      // ✅ XỬ LÝ RESPONSE THEO STRUCTURE CỦA BE
      const results = response.result || response.data || [];
      setSearchResults(Array.isArray(results) ? results : []);
      
      setSearchResults(results);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Search failed');
      setSearchResults([]);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    searchResults,
    loading,
    error,
    searchProducts,
  };
}