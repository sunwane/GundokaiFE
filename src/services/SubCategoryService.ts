import { SubCategory, SubCategoryResponse } from '@/types/SubCategory';
import { mockSubCategories } from '@/data/mockSubCategories';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

export class SubCategoryService {
  
  // Get all subcategories
  static async getSubCategories(): Promise<SubCategoryResponse> {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    try {
      // TODO: Real API call
      // const response = await fetch(`${API_BASE_URL}/subcategories`);
      // const data = await response.json();
      // return data;

      // Mock response for now
      return {
        data: mockSubCategories,
        total: mockSubCategories.length,
        message: 'SubCategories fetched successfully'
      };
    } catch (error) {
      console.error('Error fetching subcategories:', error);
      throw new Error('Failed to fetch subcategories');
    }
  }

  // Get subcategories by category ID
  static async getSubCategoriesByCategoryId(categoryId: string): Promise<SubCategory[]> {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    try {
      // TODO: Real API call
      // const response = await fetch(`${API_BASE_URL}/subcategories?category_id=${categoryId}`);
      // return await response.json();

      // Mock response
      const filteredSubCategories = mockSubCategories.filter(
        subCat => subCat.category_id === categoryId
      );
      return filteredSubCategories;
    } catch (error) {
      console.error('Error fetching subcategories by category:', error);
      throw new Error('Failed to fetch subcategories by category');
    }
  }

  // Get subcategory by ID
  static async getSubCategoryById(subCategoryId: string): Promise<SubCategory | null> {
    await new Promise(resolve => setTimeout(resolve, 200));
    
    try {
      // TODO: Real API call
      // const response = await fetch(`${API_BASE_URL}/subcategories/${subCategoryId}`);
      // return await response.json();

      // Mock response for now
      const subCategory = mockSubCategories.find(sub => sub.id === subCategoryId);
      return subCategory || null;
    } catch (error) {
      console.error('Error fetching subcategory:', error);
      throw new Error('Failed to fetch subcategory');
    }
  }

  // Get subcategory name by ID (utility method)
  static async getSubCategoryNameById(subCategoryId: string): Promise<string | null> {
    const subCategory = await this.getSubCategoryById(subCategoryId);
    return subCategory ? subCategory.subCategory_Name : null;
  }

  // Get categoryId by subCategoryId
  static async getCategoryIdBySubCategoryId(subCategoryId: string): Promise<string | null> {
    const subCategory = await this.getSubCategoryById(subCategoryId);
    return subCategory ? subCategory.category_id : null;
  }
}