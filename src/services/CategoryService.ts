import { Category, CategoryResponse } from '@/types/Category';
import { mockCategories } from '@/data/mockCategories';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

export class CategoryService {
  
  // Get all categories
  static async getCategories(): Promise<CategoryResponse> {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    try {
      // TODO: Real API call
      // const response = await fetch(`${API_BASE_URL}/categories`);
      // const data = await response.json();
      // return data;

      // Mock response for now
      return {
        data: mockCategories,
        total: mockCategories.length,
        message: 'Categories fetched successfully'
      };
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw new Error('Failed to fetch categories');
    }
  }

  // Get category by ID
  static async getCategoryById(categoryId: string): Promise<Category | null> {
    await new Promise(resolve => setTimeout(resolve, 200));
    
    try {
      // TODO: Real API call
      // const response = await fetch(`${API_BASE_URL}/categories/${categoryId}`);
      // return await response.json();

      // Mock response for now
      const category = mockCategories.find(cat => cat.id === categoryId);
      return category || null;
    } catch (error) {
      console.error('Error fetching category:', error);
      throw new Error('Failed to fetch category');
    }
  }

  // Get category name by ID (utility method)
  static async getCategoryNameById(categoryId: string): Promise<string | null> {
    const category = await this.getCategoryById(categoryId);
    return category ? category.category_Name : null;
  }
}