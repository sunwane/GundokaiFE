import { useMemo } from 'react';
import { useSubCategories } from '@/hooks/categories/useSubCategories';
import { useCategories } from '@/hooks/categories/useCategories';
import { Product } from '@/types/Product';
import { SubCategory } from '@/types/SubCategory';

export interface CategoryGroup {
  categoryId: string;
  categoryName: string;
  subcategories: {
    id: string;
    name: string;
    count: number;
  }[];
}

export interface UseCategoryFilterReturn {
  categoryGroups: CategoryGroup[];
  loading: boolean;
  subCategories: SubCategory[];
  handleSubCategoryChange: (
    subCategoryId: string,
    selectedCategories: string[],
    onCategoryChange?: (categories: string[]) => void
  ) => void;
}

export function useCategoryFilter(products: Product[] = []): UseCategoryFilterReturn {
  const { categories, loading: categoriesLoading } = useCategories();
  const { subCategories, loading: subCategoriesLoading } = useSubCategories();

  // Nhóm subcategories theo category và tính count
  const categoryGroups: CategoryGroup[] = useMemo(() => {
    if (!categories.length || !subCategories.length) return [];

    return categories.map(category => {
      const categorySubCategories = subCategories
        .filter(sub => sub.mainCategory && sub.mainCategory.id === category.id)
        .map(sub => ({
          id: sub.id,
          name: sub.subCategoryName,
          count: products.filter(p => p.subcategory.id === sub.id).length
        }));

      return {
        categoryId: category.id,
        categoryName: category.categoryName,
        subcategories: categorySubCategories
      };
    }).filter(group => group.subcategories.length > 0); // Chỉ hiển thị category có subcategory
  }, [categories, subCategories, products]);

  const handleSubCategoryChange = (
    subCategoryId: string,
    selectedCategories: string[],
    onCategoryChange?: (categories: string[]) => void
  ) => {
    if (!onCategoryChange) return;

    let newCategories = [...selectedCategories];
    
    if (newCategories.includes(subCategoryId)) {
      newCategories = newCategories.filter(id => id !== subCategoryId);
    } else {
      newCategories.push(subCategoryId);
    }

    onCategoryChange(newCategories);
  };

  const loading = categoriesLoading || subCategoriesLoading;

  return {
    categoryGroups,
    loading,
    subCategories,
    handleSubCategoryChange,
  };
}