import { useState, useEffect } from 'react';
import { Cart } from '@/types/Cart';
import { Product } from '@/types/Product';
import { CartService } from '@/services/CartService';

export function useCart() {
  const [cart, setCart] = useState<Cart>({ items: [], total_quantity: 0, total_amount: 0, subtotal: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = () => {
    try {
      const cartData = CartService.getCart();
      setCart(cartData);
    } catch (error) {
      console.error('Error loading cart:', error);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = (product: Product, quantity: number = 1) => {
    try {
      const updatedCart = CartService.addToCart(product, quantity);
      setCart(updatedCart);
      return true;
    } catch (error) {
      console.error('Error adding to cart:', error);
      return false;
    }
  };

  const updateQuantity = (productId: string, quantity: number) => {
    try {
      const updatedCart = CartService.updateQuantity(productId, quantity);
      setCart(updatedCart);
      return true;
    } catch (error) {
      console.error('Error updating quantity:', error);
      return false;
    }
  };

  const removeFromCart = (productId: string) => {
    try {
      const updatedCart = CartService.removeFromCart(productId);
      setCart(updatedCart);
      return true;
    } catch (error) {
      console.error('Error removing from cart:', error);
      return false;
    }
  };

  const clearCart = () => {
    try {
      const updatedCart = CartService.clearCart();
      setCart(updatedCart);
      return true;
    } catch (error) {
      console.error('Error clearing cart:', error);
      return false;
    }
  };

  return {
    cart,
    loading,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    refreshCart: loadCart,
  };
}