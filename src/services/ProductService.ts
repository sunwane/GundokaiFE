import { Product, ProductResponse } from '@/types/Product';
import { mockProducts } from '@/data/mockProducts';

/**
 * 🎯 ProductService - Service Layer Pattern
 * 
 * 🔄 Hiện tại: Sử dụng mock data
 * 🌐 Tương lai: Sẽ gọi real API endpoints
 * 
 * ⚡ Lợi ích của Service Layer:
 * - Tách biệt logic API call khỏi components/hooks
 * - Dễ dàng thay đổi từ mock -> real API
 * - Centralized API management
 * - Type safety với TypeScript
 * 
 * 🔄 Khi nối backend: CHỈ CẦN THAY ĐỔI BÊN TRONG HÀM, KHÔNG THAY ĐỔI INTERFACE
 */
export class ProductService {
  
  /**
   * 📋 Lấy tất cả sản phẩm
   * 
   * 🔄 Hiện tại: Return mock data
   * 🌐 Tương lai: GET /api/products
   */
  static async getProducts(): Promise<ProductResponse> {
    // ❌ HIỆN TẠI: Mock data với delay
    await new Promise(resolve => setTimeout(resolve, 500));
    return {
      data: mockProducts,
      total: mockProducts.length,
      message: "Products retrieved successfully"
    };

    // ✅ TƯƠNG LAI: Real API call
    /*
    try {
      const response = await fetch('/api/products', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${getToken()}` // Nếu cần auth
        }
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return data; // Backend trả về ProductResponse format
      
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
    */
  }

  /**
   * 🔍 Lấy sản phẩm theo ID
   * 
   * 🔄 Hiện tại: Find trong mock array
   * 🌐 Tương lai: GET /api/products/:id
   */
  static async getProductById(id: string): Promise<Product | null> {
    // ❌ HIỆN TẠI
    await new Promise(resolve => setTimeout(resolve, 300));
    const product = mockProducts.find(p => p.id === id);
    return product || null;

    // ✅ TƯƠNG LAI: Real API
    /*
    try {
      const response = await fetch(`/api/products/${id}`);
      if (response.status === 404) return null;
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      
      const product = await response.json();
      return product;
    } catch (error) {
      console.error(`Error fetching product ${id}:`, error);
      return null;
    }
    */
  }

  /**
   * 📂 Lấy sản phẩm theo subcategory
   * 
   * 🔄 Hiện tại: Filter mock array
   * 🌐 Tương lai: GET /api/products?subcategory=:id
   */
  static async getProductsBySubCategory(subCategoryId: string): Promise<ProductResponse> {
    // ❌ HIỆN TẠI
    await new Promise(resolve => setTimeout(resolve, 400));
    const filteredProducts = mockProducts.filter(p => p.subCategory_id === subCategoryId);
    return {
      data: filteredProducts,
      total: filteredProducts.length,
      message: `Products filtered by subcategory: ${subCategoryId}`
    };

    // ✅ TƯƠNG LAI: Real API với query params
    /*
    try {
      const response = await fetch(`/api/products?subcategory=${subCategoryId}`);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching products by subcategory:', error);
      throw error;
    }
    */
  }

  /**
   * ✅ Lấy sản phẩm còn hàng
   * 
   * 🔄 Hiện tại: Filter by status = 'Còn hàng'
   * 🌐 Tương lai: GET /api/products?status=active
   */
  static async getActiveProducts(): Promise<ProductResponse> {
    // ❌ HIỆN TẠI
    await new Promise(resolve => setTimeout(resolve, 400));
    const activeProducts = mockProducts.filter(p => p.status === 'Còn hàng');
    return {
      data: activeProducts,
      total: activeProducts.length,
      message: "Sản phẩm còn hàng"
    };

    // ✅ TƯƠNG LAI
    /*
    const response = await fetch('/api/products?status=active');
    return await response.json();
    */
  }

  /**
   * 🔍 Tìm kiếm sản phẩm
   * 
   * 🔄 Hiện tại: Search trong mock array
   * 🌐 Tương lai: GET /api/products/search?q=:query
   */
  static async searchProducts(query: string): Promise<ProductResponse> {
    // ❌ HIỆN TẠI
    await new Promise(resolve => setTimeout(resolve, 400));
    const searchResults = mockProducts.filter(p => 
      p.product_Name.toLowerCase().includes(query.toLowerCase()) ||
      p.description.toLowerCase().includes(query.toLowerCase())
    );
    return {
      data: searchResults,
      total: searchResults.length,
      message: `Search results for: ${query}`
    };

    // ✅ TƯƠNG LAI: Server-side search với full-text search
    /*
    try {
      const response = await fetch(`/api/products/search?q=${encodeURIComponent(query)}`);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error searching products:', error);
      throw error;
    }
    */
  }

  /**
   * 💰 Lấy sản phẩm theo khoảng giá
   * 
   * 🔄 Hiện tại: Filter by price range
   * 🌐 Tương lai: GET /api/products?minPrice=:min&maxPrice=:max
   */
  static async getProductsByPriceRange(minPrice: number, maxPrice: number): Promise<ProductResponse> {
    // ❌ HIỆN TẠI
    await new Promise(resolve => setTimeout(resolve, 400));
    const filteredProducts = mockProducts.filter(p => 
      p.price >= minPrice && p.price <= maxPrice
    );
    return {
      data: filteredProducts,
      total: filteredProducts.length,
      message: `Products in price range: ${minPrice.toLocaleString('vi-VN')}đ - ${maxPrice.toLocaleString('vi-VN')}đ`
    };

    // ✅ TƯƠNG LAI
    /*
    const response = await fetch(`/api/products?minPrice=${minPrice}&maxPrice=${maxPrice}`);
    return await response.json();
    */
  }

  /**
   * ❌ Lấy sản phẩm hết hàng
   * 
   * 🔄 Hiện tại: Filter by status = 'Hết hàng'
   * 🌐 Tương lai: GET /api/products?status=out_of_stock
   */
  static async getOutOfStockProducts(): Promise<ProductResponse> {
    // ❌ HIỆN TẠI
    await new Promise(resolve => setTimeout(resolve, 400));
    const outOfStockProducts = mockProducts.filter(p => p.status === 'Hết hàng');
    return {
      data: outOfStockProducts,
      total: outOfStockProducts.length,
      message: "Sản phẩm hết hàng"
    };

    // ✅ TƯƠNG LAI
    /*
    const response = await fetch('/api/products?status=out_of_stock');
    return await response.json();
    */
  }

  /**
   * 🚀 Lấy sản phẩm sắp về
   * 
   * 🔄 Hiện tại: Filter by status = 'Hàng sắp về'
   * 🌐 Tương lai: GET /api/products?status=coming_soon
   */
  static async getComingSoonProducts(): Promise<ProductResponse> {
    // ❌ HIỆN TẠI
    await new Promise(resolve => setTimeout(resolve, 400));
    const comingSoonProducts = mockProducts.filter(p => p.status === 'Hàng sắp về');
    return {
      data: comingSoonProducts,
      total: comingSoonProducts.length,
      message: "Hàng sắp về"
    };

    // ✅ TƯƠNG LAI
    /*
    const response = await fetch('/api/products?status=coming_soon');
    return await response.json();
    */
  }
}