import { CartItem, Cart } from '@/types/Cart';
import { Product } from '@/types/Product';

export class CartService {
  private static CART_STORAGE_KEY = 'gundam_cart';

  // Lấy giỏ hàng từ localStorage
  static getCart(): Cart {
    if (typeof window === 'undefined') {
      return { items: [], total_quantity: 0, total_amount: 0, subtotal: 0 };
    }

    try {
      const cartData = localStorage.getItem(this.CART_STORAGE_KEY);
      if (cartData) {
        const cart = JSON.parse(cartData) as Cart;
        return this.calculateCartTotals(cart);
      }
    } catch (error) {
      console.error('Error loading cart:', error);
    }

    return { items: [], total_quantity: 0, total_amount: 0, subtotal: 0 };
  }

  // Lưu giỏ hàng vào localStorage
  static saveCart(cart: Cart): void {
    if (typeof window === 'undefined') return;

    try {
      const updatedCart = this.calculateCartTotals(cart);
      localStorage.setItem(this.CART_STORAGE_KEY, JSON.stringify(updatedCart));
    } catch (error) {
      console.error('Error saving cart:', error);
    }
  }

  // Thêm sản phẩm vào giỏ hàng
  static addToCart(product: Product, quantity: number = 1): void {
    const cart = this.getCart();
    const existingItemIndex = cart.items.findIndex(
      item => item.product && item.product.id === product.id
    );

    if (existingItemIndex >= 0) {
      cart.items[existingItemIndex].quantity += quantity;
      cart.items[existingItemIndex].total_price =
        cart.items[existingItemIndex].quantity * cart.items[existingItemIndex].product.price;
      cart.items[existingItemIndex].is_out_of_stock =
        cart.items[existingItemIndex].product.stockQuantity <= 0;
    } else {
      const cartItem: CartItem = {
        id: `cart_${Date.now()}_${product.id}`,
        product: product,
        quantity: quantity,
        total_price: product.price * quantity,
        is_out_of_stock: product.stockQuantity <= 0,
      };
      cart.items.push(cartItem);
    }

    const updatedCart = this.calculateCartTotals(cart);
    this.saveCart(updatedCart);
    this.triggerCartUpdate();
  }

  // Cập nhật số lượng sản phẩm trong giỏ
  static updateQuantity(productId: string, quantity: number): void {
    const cart = this.getCart();
    const itemIndex = cart.items.findIndex(item => item.product.id === productId);

    if (itemIndex >= 0) {
      if (quantity <= 0) {
        cart.items.splice(itemIndex, 1);
      } else {
        cart.items[itemIndex].quantity = quantity;
        cart.items[itemIndex].total_price = cart.items[itemIndex].product.price * quantity;
      }
    }

    const updatedCart = this.calculateCartTotals(cart);
    this.saveCart(updatedCart);
    this.triggerCartUpdate();
  }

  // Xóa sản phẩm khỏi giỏ hàng
  static removeFromCart(productId: string): void {
    const cart = this.getCart();
    cart.items = cart.items.filter(item => item.product.id !== productId);

    const updatedCart = this.calculateCartTotals(cart);
    this.saveCart(updatedCart);
    this.triggerCartUpdate();
  }

  // Xóa toàn bộ giỏ hàng
  static clearCart(): void {
    const emptyCart: Cart = { items: [], total_quantity: 0, total_amount: 0, subtotal: 0 };
    this.saveCart(emptyCart);
    this.triggerCartUpdate();
  }

  // Tính toán tổng tiền
  private static calculateCartTotals(cart: Cart): Cart {
    const totalQuantity = cart.items.reduce((sum, item) => sum + item.quantity, 0);
    const subtotal = cart.items.reduce((sum, item) => sum + item.total_price, 0);
    
    return {
      ...cart,
      total_quantity: totalQuantity,
      subtotal: subtotal,
      total_amount: subtotal, // Không có shipping, tax, discount
    };
  }

  // Thêm method để trigger cart update event
  private static triggerCartUpdate() {
    // Dispatch custom event để notify các component khác
    window.dispatchEvent(new CustomEvent('cartUpdated'));
  }
}