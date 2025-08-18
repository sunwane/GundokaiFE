export interface Order {
  order_id: string;
  account_id: string;
  order_date: string;
  total_amount: number;
  status: 'pending' | 'confirmed' | 'shipping' | 'delivered' | 'cancelled';
  phoneNumber: string;
  address: string;
  customer_Name: string;
}

export interface OrderDetail {
  id: string;
  order_id: string;
  product_id: number;
  quantity: number;
  price: number;
}

export interface OrderWithDetails extends Order {
  details: OrderDetail[];
}