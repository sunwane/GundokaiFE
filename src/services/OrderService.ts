import { Order, OrderDetail, OrderWithDetails } from '@/types/Order';
import { mockOrders, mockOrderDetails } from '@/data/mockOrders'

export class OrderService {
  static async getUserOrders(userId: string): Promise<OrderWithDetails[]> {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));
    
    return mockOrders
      .filter(order => order.account_id === userId)
      .map(order => ({
        ...order,
        details: mockOrderDetails.filter(detail => detail.order_id === order.order_id)
      }));
  }

  static async getOrderById(orderId: string): Promise<OrderWithDetails | null> {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const order = mockOrders.find(o => o.order_id === orderId);
    if (!order) return null;
    
    return {
      ...order,
      details: mockOrderDetails.filter(detail => detail.order_id === orderId)
    };
  }

  static getStatusText(status: Order['status']): string {
    const statusMap = {
      pending: 'Chờ xác nhận',
      confirmed: 'Đã xác nhận',
      shipping: 'Đang giao',
      delivered: 'Đã giao',
      cancelled: 'Đã hủy'
    };
    return statusMap[status];
  }

  static getStatusColor(status: Order['status']): string {
    const colorMap = {
      pending: '#f59e0b',
      confirmed: '#3b82f6',
      shipping: '#8b5cf6',
      delivered: '#10b981',
      cancelled: '#ef4444'
    };
    return colorMap[status];
  }
}