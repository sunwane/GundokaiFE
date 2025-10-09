import { Product, ProductResponse } from '@/types/Product';
import { mockProducts } from '@/data/mockProducts';
import { CheckAPIService } from './CheckAPIService';

const API_BASE_URL = 'http://localhost:8080/product';

export class ProductService {
  static async getProducts(): Promise<ProductResponse> {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // 🔍 Kiểm tra API có sẵn không
    const apiAvailable = await CheckAPIService.checkApiAvailability(API_BASE_URL);
    
    if (!apiAvailable) {
      console.log('🎭 Using mock subcategories data (API not available)');
      console.log('🎭 Returning mock subcategory:', mockProducts);

      return {
        data: mockProducts,
        total: mockProducts.length,
        message: 'SubCategories fetched successfully (Mock Data)'
      };
    }

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
      console.error('Error fetching products, fallback mockup data:', error);
      return {
        data: mockProducts,
        total: mockProducts.length,
        message: 'SubCategories fetched successfully (Mock Data)'
      };
    }
  }
  
  static async getProductById(id: string): Promise<Product | null> {
    const apiAvailable = await CheckAPIService.checkApiAvailability(API_BASE_URL);
        
    if (!apiAvailable) {
      console.log('🎭 Using mock products data (API not available)');
      
      // Lọc sản phẩm theo id
      const filteredProduct = mockProducts.find(product => product.id === id);
      
      if (!filteredProduct) {
        console.log(`🎭 Product with id "${id}" not found in mock data`);
        return null; // Trả về null nếu không tìm thấy sản phẩm
      }
    
      console.log('🎭 Returning mock product:', filteredProduct);
      return filteredProduct;
    }
    
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
    const apiAvailable = await CheckAPIService.checkApiAvailability(API_BASE_URL);

    if (!apiAvailable) {
      console.log('🎭 Using mock subcategories by category data (API not available)');
      const filteredProduct = mockProducts.filter(
        pro => pro.subcategory.id === subCategoryId
      );
      console.log('🎭 Returning mock subcategories by category:', filteredProduct);
      return {
        data: filteredProduct,
        total: filteredProduct.length,
        message: 'Products fetched successfully (Mock Data - API not available)'
      };
    }

    try {
      const response = await fetch(`${API_BASE_URL}/getProductBySubCategory/${subCategoryId}`);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      return data;
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
  const apiAvailable = await CheckAPIService.checkApiAvailability(API_BASE_URL);

  if (!apiAvailable) {
    console.log('🎭 Using mock subcategories by category data (API not available)');
    const filteredProduct = mockProducts.filter(
      pro => pro.productName === query
    );
    console.log('🎭 Returning mock subcategories by category:', filteredProduct);
    return {
      data: filteredProduct,
      total: filteredProduct.length,
      message: 'Products fetched successfully (Mock Data - API not available)'
    };
  }

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

  }
  static async getHotProducts(): Promise<ProductResponse> {
    // ❌ HIỆN TẠI - Tạm dùng out of stock, limit 5
    await new Promise(resolve => setTimeout(resolve, 400));
    const apiAvailable = await CheckAPIService.checkApiAvailability(API_BASE_URL);

    if (!apiAvailable) {
      console.log('🎭 Using mock products data (API not available)');

      // Lọc các sản phẩm có số lượng lớn hơn 0
      const filteredProducts = mockProducts.filter(pro => pro.stockQuantity > 0);

      // Sắp xếp sản phẩm theo số lượng tăng dần
      const sortedProducts = filteredProducts.sort((a, b) => a.stockQuantity - b.stockQuantity);

      // Lấy 5 sản phẩm nhỏ nhất
      const leastQuantityProducts = sortedProducts.slice(0, 5);

      console.log('🎭 Returning top 5 products with the least quantity:', leastQuantityProducts);

      return {
        data: leastQuantityProducts,
        total: leastQuantityProducts.length,
        message: 'Top 5 products with the least quantity fetched successfully (Mock Data - API not available)',
      };
    }

    try {
      const response = await fetch(`${API_BASE_URL}/getTop5BestSeller`);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      
      const data = await response.json();
      console.log('Hot products from API:', data);
      return data;
    } catch (error) {
      console.error('Error fetching hot products:', error);
      throw error;
    }

  }

  static async getLatestProducts(): Promise<ProductResponse> {

    const apiAvailable = await CheckAPIService.checkApiAvailability(API_BASE_URL);
    if (!apiAvailable) {
      console.log('🎭 Using mock products data (API not available)')
      const sortedByDate = [...mockProducts].sort((a, b) => 
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      const latest5Products = sortedByDate.slice(0, 5);
      console.log('🎭 Returning top 5 newest products:', latest5Products)
      return {
        data: latest5Products,
        total: latest5Products.length,
        message: 'Top 5 newest products fetched successfully (Mock Data - API not available)',
      };
    }

    try {
      const response = await fetch(`${API_BASE_URL}/getTop5Newest`);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching latest products:', error);
      throw error;
    }
  }
}