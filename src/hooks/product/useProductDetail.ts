import { useState, useEffect } from 'react';
import { Product } from '@/types/Product';
import { ProductImg } from '@/types/Product';
import { ProductDetail } from '@/types/ProductDetail';
import { ProductDetailService } from '@/services/ProductDetailService';


export interface UseProductDetailReturn {
  product: Product | null;
  images: ProductImg[];
  productDetail: ProductDetail | null;
  relatedProducts: Product[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export function useProductDetail(productId: string | null): UseProductDetailReturn {
  const [product, setProduct] = useState<Product | null>(null);
  const [images, setImages] = useState<ProductImg[]>([]);
  const [productDetail, setProductDetail] = useState<ProductDetail | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const fetchData = async () => {
    if (!productId) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      // Fetch all data in parallel
      const [productData, imageData, detailData] = await Promise.all([
        ProductDetailService.getProductById(productId),
        ProductDetailService.getProductImgs(productId),
        ProductDetailService.getProductDetail(productId),
      ]);

      console.log("Detail Data:", detailData);

      if (!productData) {
        throw new Error('Product not found');
      }

      setProduct(productData);
      setImages(imageData);
      setProductDetail(detailData);

      // Fetch related products
      const relatedData = await ProductDetailService.getRelatedProducts();
      // Filter out current product from related products
      setRelatedProducts(relatedData.filter(p => p.id !== productId));

    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [productId]);

  const refetch = () => {
    fetchData();
  };

  return {
    product,
    images,
    productDetail,
    relatedProducts,
    loading,
    error,
    refetch,
  };
}