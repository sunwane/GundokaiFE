import { SubCategory, SubCategoryResponse } from '@/types/SubCategory';
import { mockSubCategories } from '@/data/mockSubCategories';
import { CheckAPIService } from './CheckAPIService';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/subCategory';

export class SubCategoryService {
  
  // Get all subcategories
  static async getSubCategories(): Promise<SubCategoryResponse> {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // 🔍 Kiểm tra API có sẵn không
    const apiAvailable = await CheckAPIService.checkApiAvailability(API_BASE_URL);
    
    if (!apiAvailable) {
      console.log('🎭 Using mock subcategories data (API not available)');
      console.log('🎭 Returning mock subcategory:', mockSubCategories);

      return {
        result: mockSubCategories,
        total: mockSubCategories.length,
        message: 'SubCategories fetched successfully (Mock Data)'
      };
    }
    
    try {
      console.log('🌐 Fetching subcategories from real API...');
      const response = await fetch(`${API_BASE_URL}/getAll`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('✅ Real API subcategories data received:', data);
      
      return {
        result: Array.isArray(data.result) ? data.result : Array.isArray(data.data) ? data.data : [],
        total: data.total || 0,
        message: data.message || 'SubCategories fetched successfully (Real API)'
      };
      
    } catch (error) {
      console.error('❌ Real API failed, falling back to mock data:', error);
      console.log('🎭 Returning mock subcategory:', mockSubCategories);

      // 🔄 Fallback: Return mock data
      return {
        result: mockSubCategories,
        total: mockSubCategories.length,
        message: 'SubCategories fetched successfully (Mock Data - API Failed)'
      };
    }
  }

  // Get subcategories by category ID
  static async getSubCategoriesByCategoryId(categoryId: string): Promise<SubCategory[]> {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // 🔍 Kiểm tra API có sẵn không
    const apiAvailable = await CheckAPIService.checkApiAvailability(API_BASE_URL);
    
    if (!apiAvailable) {
      console.log('🎭 Using mock subcategories by category data (API not available)');
      const filteredSubCategories = mockSubCategories.filter(
        subCat => subCat.mainCategory.id === categoryId
      );
      console.log('🎭 Returning mock subcategories by category:', filteredSubCategories);
      return filteredSubCategories;
    }
    
    try {
      console.log('🌐 Fetching subcategories by category from real API...');
      const response = await fetch(`${API_BASE_URL}/getAllByCategory/${categoryId}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('✅ Real API subcategories by category data received:', data);
      return !Array.isArray(data) ? data : [];
      
    } catch (error) {
      console.error('❌ Real API failed, falling back to mock data:', error);
      
      // 🔄 Fallback: Return mock data
      const filteredSubCategories = mockSubCategories.filter(
        subCat => subCat.mainCategory.id === categoryId
      );
      return filteredSubCategories;
    }
  }

  // Get subcategory by ID
  static async getSubCategoryById(subCategoryId: string): Promise<SubCategory | null> {
    await new Promise(resolve => setTimeout(resolve, 200));
    
    // 🔍 Kiểm tra API có sẵn không
    const apiAvailable = await CheckAPIService.checkApiAvailability(API_BASE_URL);
    
    if (!apiAvailable) {
      console.log('🎭 Using mock subcategory data (API not available)');
      const subCategory = mockSubCategories.find(sub => sub.id === subCategoryId);
      return subCategory || null;
    }
    
    try {
      console.log('🌐 Fetching subcategory from real API...');
      const response = await fetch(`${API_BASE_URL}/getSubCategoryById/${subCategoryId}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('✅ Real API subcategory data received:', data);
      return data;
      
    } catch (error) {
      console.error('❌ Real API failed, falling back to mock data:', error);
      
      // 🔄 Fallback: Return mock data
      const subCategory = mockSubCategories.find(sub => sub.id === subCategoryId);
      console.log('🎭 Returning mock subcategory:', subCategory);
      return subCategory || null;
    }
  }

  // Get subcategory name by ID (utility method)
  static async getSubCategoryNameById(subCategoryId: string): Promise<string | null> {
    const subCategory = await this.getSubCategoryById(subCategoryId);
    return subCategory ? subCategory.subCategoryName : null;
  }

  // Get categoryId by subCategoryId
  static async getCategoryIdBySubCategoryId(subCategoryId: string): Promise<string | null> {
    const subCategory = await this.getSubCategoryById(subCategoryId);
    return subCategory && typeof subCategory.mainCategory === 'object' ? subCategory.mainCategory.id : null;
  }

  /**
   * 🔧 Utility methods
   */
  static async isApiAvailable(): Promise<boolean> {
    return await CheckAPIService.isApiAvailable(API_BASE_URL);
  }
  
  static resetApiCheck(): void {
    CheckAPIService.resetApiCheck(API_BASE_URL);
  }
  
  static isMockMode(): boolean {
    return CheckAPIService.isMockMode(API_BASE_URL);
  }
}