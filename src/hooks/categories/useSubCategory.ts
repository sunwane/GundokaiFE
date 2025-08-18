'use client';
import { useState, useEffect } from 'react';
import { SubCategory } from '@/types/SubCategory';
import { SubCategoryService } from '@/services/SubCategoryService';

export function useSubCategory(subcategoryId?: string | null) {
  const [subcategory, setSubcategory] = useState<SubCategory | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSubcategory = async () => {
    if (!subcategoryId) {
      setSubcategory(null);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      const data = await SubCategoryService.getSubCategoryById(subcategoryId);
      setSubcategory(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      console.error('Error fetching subcategory:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubcategory();
  }, [subcategoryId]);

  const refetch = async () => {
    await fetchSubcategory();
  };

  return { 
    subcategory, 
    loading, 
    error,
    refetch 
  };
}