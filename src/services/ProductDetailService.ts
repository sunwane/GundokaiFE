import { Product } from '@/types/Product';
import { ProductImage } from '@/types/ProductImage';
import { ProductDetail } from '@/types/ProductDetail';
import { mockProducts } from '@/data/mockProducts';
import { mockProductImages } from '@/data/mockProductImg';
import { mockProductDetails } from '@/data/mockProductDetails';

export class ProductDetailService {
  static async getProductById(productId: string): Promise<Product | null> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const product = mockProducts.find(p => p.id === productId);
    return product || null;
  }

  static async getProductImages(productId: string): Promise<ProductImage[]> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 200));
    
    return mockProductImages.filter(img => img.product_id === productId);
  }

  static async getProductDetail(productId: string): Promise<ProductDetail | null> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 150));
    
    const detail = mockProductDetails.find(detail => detail.product_id === productId);
    return detail || null;
  }

  static async getRelatedProducts(categoryId: string, limit: number = 5): Promise<Product[]> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 250));
    
    return mockProducts
      .filter(p => p.category_id === categoryId)
      .slice(0, limit);
  }
}