import { useMemo } from 'react';
import { Product } from '@/types/Product';

export type ProductStatusType = 'Còn hàng' | 'Hết hàng' | 'Hàng sắp về';

export interface ProductStatusInfo {
  statusType: ProductStatusType;
  isOutOfStock: boolean;
  isComingSoon: boolean;
  statusLabel: string;
  badgeConfig?: {
    text: string;
    color: string;
    backgroundColor: string;
  };
}

export function useProductStatus(product: Product): ProductStatusInfo {
  const statusInfo = useMemo(() => {
    const stockQuantity = product.stockQuantity || 0;
    const status = product.status;

    // Xác định trạng thái sản phẩm
    let statusType: ProductStatusType = 'Còn hàng';
    let isOutOfStock = false;
    let isComingSoon = false;
    let statusLabel = '';
    let badgeConfig = undefined;

    if(status == 'Hàng sắp về'){
      statusType = 'Hàng sắp về';
      isComingSoon = true;
      statusLabel = 'HÀNG SẮP VỀ';
      badgeConfig = {
        text: 'SẮP VỀ',
        color: '#ffffff',
        backgroundColor: 'rgb(0, 119, 255)',
      };
    }else if(stockQuantity == 0 || status == 'Hết hàng'){
      statusType = 'Hết hàng';
      isOutOfStock = true;
      statusLabel = 'HẾT HÀNG';
    }

    return {
      statusType,
      isOutOfStock,
      isComingSoon,
      statusLabel,
      badgeConfig,
    };
  }, [product.stockQuantity, product.status]);

  return statusInfo;
}