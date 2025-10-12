import { Product } from '@/types/Product';
import { ProductImg } from '@/types/Product';
import { ProductDetail } from '@/types/ProductDetail';
import { CheckAPIService } from './CheckAPIService';
import { mockProductDetails } from '@/data/mockProductDetails';
import { mockProducts } from '@/data/mockProducts';
import { mockProductImages } from '@/data/mockProductImg';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080';

const check_API_URL = 'http://localhost:8080/product';

export class ProductDetailService {
  static async getProductById(productId: string): Promise<Product | null> {
    const apiAvailable = await CheckAPIService.checkApiAvailability(check_API_URL);

    if (!apiAvailable) {
      const mockProduct = mockProducts.find(product => product.id == productId)!;
      return mockProduct;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/product/getByProductId/${productId}`);
      if (!response.ok) {
        if (response.status === 404) return null;
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return data.result || data;
    } catch (error) {
      console.error('❌ Error fetching product by ID, fallback to mock:', error);
      
      // 🔄 Fallback: Return mock data
      const productSummary = mockProducts.find(product => product.id === productId);
      const productDetail = mockProductDetails.find(detail => detail.id === productId);
      const mockProduct = productSummary && productDetail ? { ...productSummary, detail: productDetail } : null;
      return mockProduct;
    }
  }

  static async getProductImgs(productId: string): Promise<ProductImg[]> {
    const apiAvailable = await CheckAPIService.checkApiAvailability(check_API_URL);

    if (!apiAvailable) {
      const mockImages = mockProductImages.filter(img => img.productId === productId);
      return mockImages;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/productImg/getAllImg/${productId}`);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      
      const data = await response.json();
      return data.result || data;
    } catch (error) {
      console.error('❌ Error fetching product images, fallback to mock:', error);
      throw error; // Ném lỗi để gọi fallback ở hàm gọi
    }
  }

  static async getProductDetail(productId: string): Promise<ProductDetail | null> {
    const apiAvailable = await CheckAPIService.checkApiAvailability(API_BASE_URL);

    if (!apiAvailable) {
      const mockDetail = mockProductDetails.find(detail => detail.id === productId);
      return mockDetail || null;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/productDetail/get/${productId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      
      if (!response.ok) {
        if (response.status === 404) return null;
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return data.result || null;
    } catch (error) {
      console.error('❌ Error fetching product detail, fallback to mock:', error);
      
      throw error; // Ném lỗi để gọi fallback ở hàm gọi
    }
  }

  static async getRelatedProducts(): Promise<Product[]> {
    const apiAvailable = await CheckAPIService.checkApiAvailability(check_API_URL);

    if (!apiAvailable) {
      
      // Lấy 4 sản phẩm random từ mock data
      const shuffledProducts = [...mockProducts].sort(() => 0.5 - Math.random());
      const relatedProducts = shuffledProducts.slice(0, 5 );
      
      return relatedProducts;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/product/random`);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        
      const data = await response.json();
      return data.result || [];
    } catch (error) {
      console.error('❌ Error fetching related products, fallback to mock:', error);
      
      throw error; // Ném lỗi để gọi fallback ở hàm gọi
    }
  }
}