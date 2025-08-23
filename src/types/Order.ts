// src/types/Order.ts

// ✅ Cập nhật OrderStatus để khớp với backend
// Order.ts
export type OrderStatus = 'PENDING' | 'CONFIRMED' | 'PROCESSING' | 'SHIPPED' | 'DELIVERED' | 'COMPLETED' | 'CANCELLED';
// ✅ Cập nhật PaymentStatus
export type PaymentStatus = 'PENDING' | 'PAID' | 'CONFIRMED' | 'FAILED' | 'CANCELLED';

// Enum cho phương thức thanh toán
export type PaymentMethod = 'VNPAY' | 'COD';

// Interface cho chi tiết đơn hàng
export interface OrderDetail {
  id: string;
  orderId: string;
  productId: string;
  quantity: number;
  unitPrice: number;
  subTotal: number;
}

// Interface cho đơn hàng
export interface Order {
  orderId: string;
  userId: string;
  customerName: string;
  phoneNumber: string;
  address: string;
  orderDate: string;
  totalAmount: number;
  status: OrderStatus; // Sử dụng OrderStatus đã cập nhật
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  orderDetails: OrderDetail[];
  paymentUrl?: string;
  email: string;
}

// Interface cho yêu cầu tạo đơn hàng
export interface CreateOrderRequest {
  total: number;
  paymentMethod: PaymentMethod;
  phoneNumber: string;
  address: string;
  customerName: string;
  email: string;
  items: CreateOrderDetailRequest[];
}

// Interface cho chi tiết sản phẩm trong yêu cầu tạo đơn hàng
export interface CreateOrderDetailRequest {
  productId: string;
  quantity: number;
}

// Interface cho phản hồi API khi tạo đơn hàng
export interface CreateOrderResponse {
  code: number;
  message: string;
  result: Order;
}

// Interface cho yêu cầu cập nhật trạng thái đơn hàng
export interface UpdateOrderStatusRequest {
  newStatus: OrderStatus;
}