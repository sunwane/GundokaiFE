import { Category, CategoryResponse } from '@/types/Category';
import { mockCategories } from '@/data/mockCategories';
import { CheckAPIService } from './CheckAPIService';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/mainCategory';

export class CategoryService {
  
  /**
   * 📋 Get all categories - Tự động kiểm tra API trước
   */
  static async getCategories(): Promise<CategoryResponse> {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // 🔍 Kiểm tra API có sẵn không
    const apiAvailable = await CheckAPIService.checkApiAvailability(API_BASE_URL);
    
    if (!apiAvailable) {
      return {
        data: mockCategories,
        total: mockCategories.length,
        message: 'Categories fetched successfully (Mock Data)'
      };
    }
    
    try {
      const response = await fetch(`${API_BASE_URL}/getAll`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      return {
        data: Array.isArray(data.result) ? data.result : Array.isArray(data.data) ? data.data : [],
        total: data.total || 0,
        message: data.message || 'Categories fetched successfully (Real API)'
      };
      
    } catch (error) {
      console.error('❌ Real API failed, falling back to mock data:', error);
      // 🔄 Fallback: Return mock data
      return {
        data: mockCategories,
        total: mockCategories.length,
        message: 'Categories fetched successfully (Mock Data - API Failed)'
      };
    }
  }

  /**
   * 🔍 Get category by ID - Tự động kiểm tra API trước
   */
  static async getCategoryById(categoryId: string): Promise<Category | null> {
    await new Promise(resolve => setTimeout(resolve, 200));
    
    // 🔍 Kiểm tra API có sẵn không
    const apiAvailable = await CheckAPIService.checkApiAvailability(API_BASE_URL);

    console.log("CategoryID: ", categoryId);
    
    if (!apiAvailable) {
      const category = mockCategories.find(cat => cat.id === categoryId);
      return category || null;
    }
    
    try {
      const response = await fetch(`${API_BASE_URL}/getById/${categoryId}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return data;
      
    } catch (error) {
      console.error('❌ Real API failed, falling back to mock data:', error);
      
      // 🔄 Fallback: Return mock data
      const category = mockCategories.find(cat => cat.id === categoryId);
      return category || null;
    }
  }

  // Get category name by ID (utility method)
  static async getCategoryNameById(categoryId: string): Promise<string | null> {
    const category = await this.getCategoryById(categoryId);
    return category ? category.categoryName : null;
  }

}