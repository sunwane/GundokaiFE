'use client';
import { useEffect, useState } from 'react';
import { SubCategoryService } from '@/services/SubCategoryService';
import { CategoryService } from '@/services/CategoryService';
import { Category } from '@/types/Category';
import { SubCategory } from '@/types/SubCategory';

interface CategoryResult {
  // ✅ Thông tin category đầy đủ
  category: Category | null;
  categoryName: string | null;
  categoryId: string | null;
  
  // ✅ Thông tin subcategory đầy đủ
  subCategory: SubCategory | null;
  subCategoryName: string | null;
  
  // ✅ States
  loading: boolean;
  error: string | null;
}

export function useCategory(subCategoryId: string | null | undefined): CategoryResult {
  const [category, setCategory] = useState<Category | null>(null);
  const [categoryName, setCategoryName] = useState<string | null>(null);
  const [categoryId, setCategoryId] = useState<string | null>(null);
  const [subCategory, setSubCategory] = useState<SubCategory | null>(null);
  const [subCategoryName, setSubCategoryName] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!subCategoryId) {
      // ✅ Reset tất cả state
      setCategory(null);
      setCategoryName(null);
      setCategoryId(null);
      setSubCategory(null);
      setSubCategoryName(null);
      setLoading(false);
      setError(null);
      return;
    }

    setLoading(true);
    setError(null);

    const fetchCategoryData = async () => {
      try {
        // 🔄 Lấy subcategory đầy đủ
        const subCategory = await SubCategoryService.getSubCategoryById(subCategoryId)!;
        const subCategoryData = subCategory?.result || subCategory?.data || subCategory;
        if (subCategoryData) {
          setSubCategory(subCategoryData);
          setSubCategoryName(subCategoryData.subCategoryName);
          setCategoryId(subCategoryData.mainCategoryId);
        
          // 🔄 Lấy category đầy đủ từ categoryId
          const category = await CategoryService.getCategoryById(subCategoryData.mainCategory.id);
          console.log("Fetched Category:", category);
          const categoryData = category?.result || category?.data || category;
          if (categoryData) {
            setCategory(categoryData);
            setCategoryName(categoryData.categoryName);
          } else {
            setCategory(null);
            setCategoryName(null);
          }
        } else {
          setSubCategory(null);
          setSubCategoryName(null);
          setCategoryId(null);
          setCategory(null);
          setCategoryName(null);
        }

      } catch (err) {
        console.error('Error fetching category data:', err);
        setError(err instanceof Error ? err.message : 'Unknown error');
        
        // ✅ Reset tất cả khi có lỗi
        setCategory(null);
        setCategoryName(null);
        setCategoryId(null);
        setSubCategory(null);
        setSubCategoryName(null);
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryData();
  }, [subCategoryId]);

  return { 
    category, 
    categoryName, 
    categoryId,
    subCategory, 
    subCategoryName, 
    loading, 
    error 
  };
}