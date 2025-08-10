'use client';
import { useState, useEffect } from 'react';
import { Category } from '@/types/Category';
import { CategoryService } from '@/services/CategoryService';

export function useCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await CategoryService.getCategories();
      setCategories(response.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      console.error('Error fetching categories:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const refetch = async () => {
    await fetchCategories();
  };

  return { 
    categories, 
    loading, 
    error,
    refetch 
  };
}