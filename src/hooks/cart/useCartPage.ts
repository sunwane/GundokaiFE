'use client';
import { useCart } from './useCart';
import { useRouter } from 'next/navigation';
import { useResponsive } from '@/hooks/useResponsive';
import { usePopupMessage } from '@/hooks/ui/usePopupMessage';

export interface UseCartPageReturn {
  cart: any;
  loading: boolean;
  isMobile: boolean;
  router: any;
  handleQuantityChange: (productId: string, quantity: number) => void;
  handleRemoveItem: (productId: string) => void;
  handleClearCart: () => void;
  handleCheckout: () => void;
  formatPrice: (price: number) => string;
  popupMessage: any;
}

export function useCartPage(): UseCartPageReturn {
  const { cart, loading, updateQuantity, removeFromCart, clearCart } = useCart();
  const router = useRouter();
  const { isMobile } = useResponsive();
  const popupMessage = usePopupMessage();

  const handleQuantityChange = (productId: string, quantity: number) => {
    updateQuantity(productId, quantity);
  };

  const handleRemoveItem = (productId: string) => {
    popupMessage.showConfirm({
      title: 'Xóa sản phẩm',
      message: 'Bạn có chắc chắn muốn xóa sản phẩm này khỏi giỏ hàng?',
      confirmText: 'Xóa',
      cancelText: 'Hủy',
      onConfirm: () => {
        removeFromCart(productId);
        popupMessage.showSuccess({
          title: 'Thành công',
          message: 'Đã xóa sản phẩm khỏi giỏ hàng',
          duration: 2000
        });
      }
    });
  };

  const handleClearCart = () => {
    popupMessage.showConfirm({
      title: 'Xóa toàn bộ giỏ hàng',
      message: 'Bạn có chắc chắn muốn xóa toàn bộ sản phẩm trong giỏ hàng?',
      confirmText: 'Xóa tất cả',
      cancelText: 'Hủy',
      onConfirm: () => {
        clearCart();
        popupMessage.showSuccess({
          title: 'Thành công',
          message: 'Đã xóa toàn bộ giỏ hàng',
          duration: 2000
        });
      }
    });
  };

  const handleCheckout = () => {
    popupMessage.showInfo({
      title: 'Thông báo',
      message: 'Chức năng thanh toán sẽ được triển khai sau!',
      confirmText: 'Đã hiểu',
    });
  };

  const formatPrice = (price: number) => {
    return price.toLocaleString('vi-VN') + ' VNĐ';
  };

  return {
    cart,
    loading,
    isMobile,
    router,
    handleQuantityChange,
    handleRemoveItem,
    handleClearCart,
    handleCheckout,
    formatPrice,
    popupMessage,
  };
}