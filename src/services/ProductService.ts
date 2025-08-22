import { Product, ProductResponse } from '@/types/Product';
import { mockProducts } from '@/data/mockProducts';

const API_BASE_URL = 'http://localhost:8080/product';

export class ProductService {
  static async getProducts(): Promise<ProductResponse> {
    // ✅ TƯƠNG LAI: Real API call
    try {
      const response = await fetch(`${API_BASE_URL}/getAll`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
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
  }
  
  static async getProductById(id: string): Promise<Product | null> {
    try {
      const response = await fetch(`${API_BASE_URL}/getProductById/${id}`);
      if (response.status === 404) return null;
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      
      const product = await response.json();
      return product;
    } catch (error) {
      console.error(`Error fetching product ${id}:`, error);
      return null;
    }
  }

  static async getProductsBySubCategory(subCategoryId: string): Promise<ProductResponse> {
    try {
      // const response = await fetch(`/api/products?subcategory=${subCategoryId}`);
      const response = await fetch(`${API_BASE_URL}/getProductBySubCategory/${subCategoryId}`);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      return data.result;
    } catch (error) {
      console.error('Error fetching products by subcategory:', error);
      throw error;
    }

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
  try {
    // ✅ SỬA: Sử dụng query parameter thay vì path parameter
    const response = await fetch(`${API_BASE_URL}/search?q=${encodeURIComponent(query)}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });
    
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error searching products:', error);
    throw error;
  }
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

  /**
   * 🔥 Lấy sản phẩm sắp cháy hàng (Hot/Trending)
   * 
   * 🔄 Hiện tại: Tạm dùng getOutOfStockProducts (chờ backend)
   * 🌐 Tương lai: GET /api/products/trending hoặc /api/products/hot
   */
  static async getHotProducts(): Promise<ProductResponse> {
    // ❌ HIỆN TẠI - Tạm dùng out of stock, limit 5
    await new Promise(resolve => setTimeout(resolve, 400));
    const hotProducts = mockProducts
      .filter(p => p.status === 'Hết hàng') // Tạm thời
      .slice(0, 5); // Chỉ lấy 5 sản phẩm
    
    return {
      data: hotProducts,
      total: hotProducts.length,
      message: "Sản phẩm sắp cháy hàng"
    };

    // ✅ TƯƠNG LAI - Real API
    /*
    try {
      const response = await fetch('/api/products/hot?limit=5');
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching hot products:', error);
      throw error;
    }
    */
  }

  /**
   * ✨ Lấy sản phẩm mới nhất (New/Fresh)
   * 
   * 🔄 Hiện tại: Tạm dùng getComingSoonProducts (chờ backend)
   * 🌐 Tương lai: GET /api/products/latest hoặc /api/products/new
   */
  static async getLatestProducts(): Promise<ProductResponse> {
    // ❌ HIỆN TẠI - Tạm dùng coming soon, limit 5
    await new Promise(resolve => setTimeout(resolve, 400));
    const latestProducts = mockProducts
      .filter(p => p.status === 'Hàng sắp về') // Tạm thời
      .slice(0, 5); // Chỉ lấy 5 sản phẩm
    
    return {
      data: latestProducts,
      total: latestProducts.length,
      message: "Sản phẩm mới nhất"
    };

    // ✅ TƯƠNG LAI - Real API
    /*
    try {
      const response = await fetch('/api/products/latest?limit=5');
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching latest products:', error);
      throw error;
    }
    */
  }
}