'use client';
import { useState, useEffect } from 'react';
import { CartService } from '@/services/CartService';

export interface UseCartBadgeReturn {
  cartItemCount: number;
  refreshCartCount: () => void;
}

export function useCartBadge(): UseCartBadgeReturn {
  const [cartItemCount, setCartItemCount] = useState(0);

  const refreshCartCount = () => {
    try {
      const cart = CartService.getCart();
      const totalCount = cart.items.reduce((sum, item) => sum + item.quantity, 0);
      setCartItemCount(totalCount);
    } catch (error) {
      console.error('Error getting cart count:', error);
      setCartItemCount(0);
    }
  };

  useEffect(() => {
    // Initial load
    refreshCartCount();

    // Listen for cart changes (if you have cart update events)
    const handleCartUpdate = () => {
      refreshCartCount();
    };

    // Add event listener for cart updates (if using custom events)
    window.addEventListener('cartUpdated', handleCartUpdate);

    // Cleanup
    return () => {
      window.removeEventListener('cartUpdated', handleCartUpdate);
    };
  }, []);

  return {
    cartItemCount,
    refreshCartCount,
  };
}