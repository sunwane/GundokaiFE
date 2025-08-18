import { Product } from './Product';

export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
  // Derived properties
  total_price: number;
  is_out_of_stock: boolean;
}

export interface Cart {
  items: CartItem[];
  total_quantity: number;
  total_amount: number;
  subtotal: number;
}