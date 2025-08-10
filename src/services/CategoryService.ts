import { Category, CategoryResponse } from '@/types/Category';
import { mockCategories } from '@/data/mockCategories';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

export class CategoryService {
  
  // Fake API - trả về mock data
  static async getCategories(): Promise<CategoryResponse> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    try {
      // TODO: Thay thế bằng real API call khi có backend
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

  // Fake API - get category by id
  static async getCategoryById(id: string): Promise<Category | null> {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    try {
      // TODO: Real API call
      // const response = await fetch(`${API_BASE_URL}/categories/${id}`);
      // return await response.json();

      // Mock response
      const category = mockCategories.find(cat => cat.id === id);
      return category || null;
    } catch (error) {
      console.error('Error fetching category:', error);
      throw new Error('Failed to fetch category');
    }
  }

  // Real API method (comment out for now)
  /*
  static async getCategoriesFromAPI(): Promise<CategoryResponse> {
    const response = await fetch(`${API_BASE_URL}/categories`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        // 'Authorization': `Bearer ${token}` // if needed
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch categories');
    }

    return await response.json();
  }
  */
}