import { Category, CategoryResponse } from '@/types/Category';
import { mockCategories } from '@/data/mockCategories';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/mainCategory';

export class CategoryService {
  private static apiAvailable: boolean | null = null; // Cache kết quả kiểm tra API
  
  /**
   * 🔍 Kiểm tra API có sẵn không bằng cách thử gọi endpoint
   */
  private static async checkApiAvailability(): Promise<boolean> {
    // Nếu đã kiểm tra rồi, return cache
    if (this.apiAvailable !== null) {
      return this.apiAvailable;
    }

    try {
      console.log('🔍 Checking API availability...');
      
      // Thử gọi API với timeout ngắn
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 3000); // 3s timeout
      
      const response = await fetch(`${API_BASE_URL}/getAll`, {
        method: 'GET',
        signal: controller.signal,
        headers: {
          'Content-Type': 'application/json',
        }
      });
      
      clearTimeout(timeoutId);
      
      // Nếu response ok, API có sẵn
      this.apiAvailable = response.ok;
      console.log('✅ API is available:', this.apiAvailable);
      
    } catch (error) {
      if (error instanceof Error) {
        console.warn('❌ API check failed:', error.message);
      } else {
        console.warn('❌ API check failed:', error);
      }
      this.apiAvailable = false;
    }
    
    return this.apiAvailable;
  }

  /**
   * 📋 Get all categories - Tự động kiểm tra API trước
   */
  static async getCategories(): Promise<CategoryResponse> {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // 🔍 Kiểm tra API có sẵn không
    const apiAvailable = await this.checkApiAvailability();
    
    if (!apiAvailable) {
      console.log('🎭 Using mock categories data (API not available)');
      return {
        data: mockCategories,
        total: mockCategories.length,
        message: 'Categories fetched successfully (Mock Data)'
      };
    }
    
    try {
      console.log('🌐 Fetching from real API...');
      const response = await fetch(`${API_BASE_URL}/getAll`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('✅ Real API data received:', data);
      
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
    const apiAvailable = await this.checkApiAvailability();
    
    if (!apiAvailable) {
      console.log('🎭 Using mock category data (API not available)');
      const category = mockCategories.find(cat => cat.id === categoryId);
      return category || null;
    }
    
    try {
      console.log('🌐 Fetching category from real API...');
      const response = await fetch(`${API_BASE_URL}/getById/${categoryId}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('✅ Real API category data received:', data);
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

  /**
   * 🔧 Utility methods
   */
  static async isApiAvailable(): Promise<boolean> {
    return await this.checkApiAvailability();
  }
  
  static resetApiCheck(): void {
    this.apiAvailable = null;
  }
  
  static isMockMode(): boolean {
    return this.apiAvailable === false;
  }
}