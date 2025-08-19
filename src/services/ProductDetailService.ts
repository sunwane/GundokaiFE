import { Product } from '@/types/Product';
import { ProductImg } from '@/types/Product';
import { ProductDetail } from '@/types/ProductDetail';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080';

export class ProductDetailService {
  static async getProductById(productId: string): Promise<Product | null> {
    try {
      const response = await fetch(`${API_BASE_URL}/product/getByProductId/${productId}`);
      if (!response.ok) {
        if (response.status === 404) return null;
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return data.result || data;
    } catch (error) {
      console.error('Error fetching product by ID:', error);
      throw error;
    }
  }

  static async getProductImgs(productId: string): Promise<ProductImg[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/productImg/getAllImg/${productId}`);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      
      const data = await response.json();
      return data.result || data;
    } catch (error) {
      console.error('Error fetching product images:', error);
      throw error;
    }
  }

  // ✅ CẬP NHẬT HÀM NÀY THEO API ENDPOINT CỦA BẠN
  static async getProductDetail(productId: string): Promise<ProductDetail | null> {
    try {
      const response = await fetch(`${API_BASE_URL}/get/${productId}`, {
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
      console.log('Product detail response:', data);
      return data.result || null;
    } catch (error) {
      console.error('Error fetching product detail:', error);
      throw error;
    }
  }

  static async getRelatedProducts(categoryId: string, limit: number = 5): Promise<Product[]> {
    try {
      // ✅ SỬ DỤNG API LẤY PRODUCTS THEO SUBCATEGORY
      const response = await fetch(`${API_BASE_URL}/getProductBySubCategory/${categoryId}`);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        
      const data = await response.json();
      const products = data.result || data;
      
      // ✅ GIỚI HẠN SỐ LƯỢNG SẢN PHẨM LIÊN QUAN
      return Array.isArray(products) ? products.slice(0, limit) : [];
    } catch (error) {
      console.error('Error fetching related products:', error);
      return [];
    }
  }
}