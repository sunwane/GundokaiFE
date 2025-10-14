import { Order, OrderDetail, CreateOrderRequest, CreateOrderResponse, OrderStatus, PaymentMethod, UpdateOrderStatusRequest } from '@/types/Order';
import { mockOrders } from '@/data/mockOrders';
import { CheckAPIService } from './CheckAPIService';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

const check_api_url = 'http://localhost:8080/order'

export interface OrderResponse {
  result?: Order;
  message?: string;
}

export interface OrderListResponse {
  result?: Order[];
  message?: string;
}

export interface OrderPageResponse {
  result?: {
    content: Order[];
    totalElements: number;
    totalPages: number;
    size: number;
    number: number;
  };
  message?: string;
}

export interface ApiResponse<T> {
  code?: number;
  message?: string;
  result?: T;
}

export class OrderService {

  /**
   * 📋 Tạo đơn hàng mới
   */
  static async createOrder(orderRequest: CreateOrderRequest): Promise<CreateOrderResponse> {
    const apiStatus = await CheckAPIService.checkApiAvailability(check_api_url);
    if (!apiStatus) {
      // Nếu API không hoạt động, trả về mock data
      alert('Cảm ơn bạn đã trải nghiệm hệ thống, hiện API chưa hoạt động nên hệ thống sẽ không lưu đơn hàng của bạn. Vui lòng thử lại sau, xin lỗi vì sự bất tiện này!');
  
      // Mock response
      const mockResponse: CreateOrderResponse = {
        code: 100,
        message: 'Đơn hàng đã được tạo thành công (mock data)',
        result: {
          orderId: 'mockOrder001',
          userId: 'mockUser001',
          customerName: orderRequest.customerName,
          phoneNumber: orderRequest.phoneNumber,
          address: orderRequest.address,
          orderDate: new Date().toISOString(),
          totalAmount: orderRequest.total,
          status: 'PENDING',
          paymentMethod: orderRequest.paymentMethod,
          paymentStatus: 'PENDING',
          email: orderRequest.email,
          orderDetails: orderRequest.items.map((item, index) => ({
            id: `mockDetail${index + 1}`,
            orderId: 'mockOrder001',
            productId: item.productId,
            quantity: item.quantity,
            unitPrice: 100000, // Giá giả lập
            subTotal: item.quantity * 100000, // Tổng giá giả lập
            productName: `Mock Product ${index + 1}`, // Tên sản phẩm giả lập
            status: 'PENDING',
          })),
        },
      };
  
      return mockResponse;
    }

    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        throw new Error('Không tìm thấy token xác thực');
      }

      const response = await fetch(`${API_BASE_URL}/order/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(orderRequest),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Có lỗi xảy ra khi tạo đơn hàng');
      }

      const data: CreateOrderResponse = await response.json();
      return data;
    } catch (error) {
      console.error('Create order error:', error);
      throw error;
    }
  }

  /**
   * 📋 Lấy lịch sử mua hàng của người dùng hiện tại (có phân trang)
   */
  static async getOrderHistory(page: number = 0, size: number = 10): Promise<OrderPageResponse> {
    const apiStatus = await CheckAPIService.checkApiAvailability(check_api_url);
    if (!apiStatus) {
      // Nếu API không hoạt động, trả về mock data
      const start = page * size;
      const end = start + size;
      const pagedOrders = mockOrders.slice(start, end);
      return {
        result: {
          content: pagedOrders,
          totalElements: mockOrders.length,
          totalPages: Math.ceil(mockOrders.length / size),
          size: size,
          number: page,
        },
        message: 'Dữ liệu lịch sử mua hàng (mock data)',
      };
    }
    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        throw new Error('Không tìm thấy token xác thực');
      }

      // Log để debug
      const url = `${API_BASE_URL}/order/history?page=${page}&size=${size}`;
      // console.log('API URL:', url);

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Có lỗi xảy ra khi lấy lịch sử mua hàng');
      }

      const data: OrderPageResponse = await response.json();
      
      // Kiểm tra và sửa totalPages nếu cần
      if (data.result && data.result.content) {
        // Nếu API không trả về totalPages hoặc totalPages = 1 mặc dù có nhiều items
        if (!data.result.totalPages || data.result.totalPages === 1) {
          if (data.result.content.length === size) {
            // Nếu số lượng items = size, có thể có thêm trang
            data.result.totalPages = Math.max(2, Math.ceil((data.result.totalElements || (page + 1) * size + 1) / size));
          } else {
            // Nếu số lượng items < size, đây có thể là trang cuối
            data.result.totalPages = page + 1;
          }
        }
      }
      
      return data;
    } catch (error) {
      console.error('Error fetching order history:', error);
      throw error;
    }
  }

  /**
   * 📋 Lấy tất cả đơn hàng (không phân trang)
   */
  static async getAllOrders(): Promise<OrderListResponse> {
    const apiStatus = await CheckAPIService.checkApiAvailability(check_api_url);
    if (!apiStatus) {
      // Nếu API không hoạt động, trả về mock data
      return {
        result: mockOrders,
        message: 'Dữ liệu đơn hàng (mock data)',
      };
    }
    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        throw new Error('Không tìm thấy token xác thực');
      }

      // Gọi API với size lớn để lấy tất cả
      const response = await fetch(`${API_BASE_URL}/order/history?page=0&size=1000`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Có lỗi xảy ra khi lấy danh sách đơn hàng');
      }

      const data: OrderListResponse = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching all orders:', error);
      throw error;
    }
  }

  /**
   * 🔍 Lấy đơn hàng theo ID
   */
  static async getOrderById(orderId: string): Promise<Order> {
    const apiStatus = await CheckAPIService.checkApiAvailability(check_api_url);
    if (!apiStatus) {
      // Nếu API không hoạt động, trả về mock data
      const mockOrder = mockOrders.find(order => order.orderId === orderId);
      if (mockOrder) {
        return mockOrder;
      } else {
        throw new Error('Không tìm thấy đơn hàng (mock data)');
      }
    }
    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        throw new Error('Không tìm thấy token xác thực');
      }

      const response = await fetch(`${API_BASE_URL}/order/${orderId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Có lỗi xảy ra khi lấy thông tin đơn hàng');
      }

      const data: ApiResponse<Order> = await response.json();
      if (!data.result) {
        throw new Error('Không tìm thấy đơn hàng');
      }

      return data.result;
    } catch (error) {
      console.error('Get order by ID error:', error);
      throw error;
    }
  }

  /**
   * 📋 Lấy đơn hàng theo userId (Admin function)
   */
  static async getOrdersByUserId(userId: string, page: number = 0, size: number = 10): Promise<Order[]> {
    const apiStatus = await CheckAPIService.checkApiAvailability(check_api_url);
    if (!apiStatus) {
      // Nếu API không hoạt động, trả về mock data
      const userOrders = mockOrders.filter(order => order.userId === userId);
      return userOrders;
    }

    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        throw new Error('Không tìm thấy token xác thực');
      }

      const response = await fetch(`${API_BASE_URL}/order/user/${userId}?page=${page}&size=${size}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Có lỗi xảy ra khi lấy danh sách đơn hàng');
      }

      const data: ApiResponse<Order[]> = await response.json();
      return data.result || [];
    } catch (error) {
      console.error('Get orders by user ID error:', error);
      throw error;
    }
  }

  /**
   * 🔄 Cập nhật trạng thái đơn hàng (Admin only)
   */
  static async updateOrderStatus(orderId: string, newStatus: OrderStatus): Promise<Order> {
    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        throw new Error('Không tìm thấy token xác thực');
      }

      const response = await fetch(`${API_BASE_URL}/order/update-status/${orderId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ newStatus } as UpdateOrderStatusRequest),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Có lỗi xảy ra khi cập nhật trạng thái đơn hàng');
      }

      const data: ApiResponse<Order> = await response.json();
      if (!data.result) {
        throw new Error('Không nhận được thông tin đơn hàng đã cập nhật');
      }

      return data.result;
    } catch (error) {
      console.error('Update order status error:', error);
      throw error;
    }
  }

  /**
   * ❌ Hủy đơn hàng (User)
   */
  static async cancelOrder(orderId: string): Promise<Order> {
    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        throw new Error('Không tìm thấy token xác thực');
      }

      const response = await fetch(`${API_BASE_URL}/order/cancel/${orderId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Có lỗi xảy ra khi hủy đơn hàng');
      }

      const data: ApiResponse<Order> = await response.json();
      if (!data.result) {
        throw new Error('Không nhận được thông tin đơn hàng đã hủy');
      }

      return data.result;
    } catch (error) {
      console.error('Cancel order error:', error);
      throw error;
    }
  }

  /**
   * 🎨 Utility Functions - Không cần API call
   */

  /**
   * 📝 Lấy text mô tả trạng thái đơn hàng
   */
 // OrderService.ts
// OrderService.ts - Version đơn giản hơn
static getStatusText(status: string): string {
  // Explicit check cho COMPLETED
  if (status === 'COMPLETED') {
    return 'Hoàn thành';
  }
  
  if (status === 'PENDING') {
    return 'Chờ xác nhận';
  }
  
  if (status === 'CONFIRMED') {
    return 'Đã xác nhận';
  }
  
  if (status === 'PROCESSING') {
    return 'Đang xử lý';
  }
  
  if (status === 'SHIPPED') {
    return 'Đang giao hàng';
  }
  
  if (status === 'DELIVERED') {
    return 'Đã giao hàng';
  }
  
  if (status === 'CANCELLED') {
    return 'Đã hủy';
  }
  
  return `Trạng thái không xác định: ${status}`;
}
  /**
   * 📝 Lấy text mô tả trạng thái thanh toán
   */
  static getPaymentStatusText(status: string): string {
    const statusMap: Record<string, string> = {
      'PENDING': 'Chờ thanh toán',
      'PAID': 'Đã thanh toán',
      'CONFIRMED': 'Đã xác nhận thanh toán',
      'FAILED': 'Thanh toán thất bại',
      'CANCELLED': 'Đã hủy thanh toán'
    };
    return statusMap[status] || 'Không xác định';
  }
  static async getUserOrders(userId: string): Promise<OrderDetail[]> {

    // Replace with actual implementation

    return [];

  }
  /**
   * 🎨 Lấy màu cho trạng thái đơn hàng
   */
 // OrderService.ts
// OrderService.ts
static getStatusColor(status: OrderStatus): string {
  const colorMap: Record<OrderStatus, string> = {
    'PENDING': '#f59e0b',      // Yellow
    'CONFIRMED': '#3b82f6',    // Blue
    'PROCESSING': '#8b5cf6',   // Purple
    'SHIPPED': '#6366f1',      // Indigo
    'DELIVERED': '#10b981',    // Green
    'COMPLETED': '#059669',    // Dark Green ✅ Thêm COMPLETED
    'CANCELLED': '#ef4444'     // Red
  };
  return colorMap[status] || '#6b7280';
}

  /**
   * 🎨 Lấy màu cho trạng thái thanh toán
   */
  static getPaymentStatusColor(status: string): string {
    const colorMap: Record<string, string> = {
      'PENDING': '#f59e0b',     // Yellow
      'PAID': '#10b981',        // Green
      'CONFIRMED': '#059669',   // Dark Green
      'FAILED': '#ef4444',      // Red
      'CANCELLED': '#6b7280'    // Gray
    };
    return colorMap[status] || '#6b7280';
  }

  /**
   * 💰 Lấy text mô tả phương thức thanh toán
   */
  static getPaymentMethodText(method: PaymentMethod): string {
    const methodMap: Record<PaymentMethod, string> = {
      'VNPAY': 'VNPay',
      'COD': 'Thanh toán khi nhận hàng'
    };
    return methodMap[method] || 'Không xác định';
  }

  /**
   * 💳 Format số tiền thành VND
   */
  static formatPrice(amount: number): string {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount);
  }

  /**
   * 📅 Format ngày tháng
   */
  static formatDate(dateString: string): string {
    return new Intl.DateTimeFormat('vi-VN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    }).format(new Date(dateString));
  }
}