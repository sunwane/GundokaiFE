'use client';
import { useState, useEffect } from 'react';
import { SubCategory } from '@/types/SubCategory';
import { SubCategoryService } from '@/services/SubCategoryService';

export function useSubCategories(categoryId?: string) {
  const [subCategories, setSubCategories] = useState<SubCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSubCategories = async () => {
    try {
      setLoading(true);
      setError(null);
      
      let data: SubCategory[];
      if (categoryId) {
       const response = await SubCategoryService.getSubCategoriesByCategoryId(categoryId);
        data =  response || [];
        
      } else {
        const response = await SubCategoryService.getSubCategories();
        data = response.result || response || [];
      }
      setSubCategories(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      console.error('Error fetching subcategories:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubCategories();
  }, [categoryId]);

  const refetch = async () => {
    await fetchSubCategories();
  };

  return { 
    subCategories, 
    loading, 
    error,
    refetch 
  };
}