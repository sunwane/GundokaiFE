'use client';
import { useState, useEffect } from 'react';
import { Product } from '@/types/Product';
import { ProductService } from '@/services/ProductService';

export function useProducts(subcategoryId?: string | null) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      
      let response;
      if (subcategoryId) {
        response = await ProductService.getProductsBySubCategory(subcategoryId);
      } else {
        response = await ProductService.getProducts();
      }
      
      setProducts(response.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      console.error('Error fetching products:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [subcategoryId]);

  const refetch = async () => {
    await fetchProducts();
  };

  const searchProducts = async (query: string) => {
    try {
      setLoading(true);
      setError(null);
      const response = await ProductService.searchProducts(query);
      setProducts(response.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      console.error('Error searching products:', err);
    } finally {
      setLoading(false);
    }
  };

  const filterByStatus = async (status: 'Còn hàng' | 'Hết hàng' | 'Hàng sắp về') => {
    try {
      setLoading(true);
      setError(null);
      
      let response;
      switch (status) {
        case 'Còn hàng':
          response = await ProductService.getActiveProducts();
          break;
        case 'Hết hàng':
          response = await ProductService.getOutOfStockProducts();
          break;
        case 'Hàng sắp về':
          response = await ProductService.getComingSoonProducts();
          break;
        default:
          response = await ProductService.getProducts();
      }
      
      setProducts(response.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      console.error('Error filtering products:', err);
    } finally {
      setLoading(false);
    }
  };

  const filterByPriceRange = async (minPrice: number, maxPrice: number) => {
    try {
      setLoading(true);
      setError(null);
      const response = await ProductService.getProductsByPriceRange(minPrice, maxPrice);
      setProducts(response.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      console.error('Error filtering products by price:', err);
    } finally {
      setLoading(false);
    }
  };

  return { 
    products, 
    loading, 
    error,
    refetch,
    searchProducts,
    filterByStatus,
    filterByPriceRange
  };
}