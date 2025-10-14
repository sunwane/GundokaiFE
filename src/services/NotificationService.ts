import { Notification, NotificationBEResponse } from '@/types/Notification';
import { CheckAPIService } from './CheckAPIService';
import { mockNotifications } from '@/data/mockNoti';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080';

const check_api_url = 'http://localhost:8080/notification';

export class NotificationService {
  // ✅ Hàm helper để lấy token
  private static getAuthToken(): string | null {
    return localStorage.getItem('authToken');
  }

  // ✅ Hàm helper để transform data từ BE response
  private static transformNotification(beNotification: NotificationBEResponse): Notification {
    return {
      id: beNotification.id,
      user_id: beNotification.user_id,          // ✅ Giữ nguyên field name
      message: beNotification.message,
      is_read: beNotification.readOrNot,        // ✅ Chuyển đổi readOrNot -> is_read
      sent_at: beNotification.sent_at
    };
  }

  static async getUserNotifications(userId: string): Promise<Notification[]> {
    // 🔍 Kiểm tra API có sẵn không
    const apiAvailable = await CheckAPIService.checkApiAvailability(check_api_url);
    if (!apiAvailable) {
      return mockNotifications
        .filter(notification => notification.user_id === userId)
        .sort((a, b) => new Date(b.sent_at).getTime() - new Date(a.sent_at).getTime());
    }

    try {
      const token = this.getAuthToken();
      
      if (!token) {
        throw new Error('No authentication token found');
      }

      // ✅ Gọi API đơn giản như ProductService
      const response = await fetch(`${API_BASE_URL}/notification/getAll`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,  // ✅ Thêm token
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      // ✅ Xử lý response theo cấu trúc BE
      const notifications = data.result || data;
      
      if (!Array.isArray(notifications)) {
        console.warn('Notifications data is not an array:', notifications);
        return [];
      }

      // ✅ Transform và filter theo userId
      return notifications
        .filter(notification => notification.user_id === userId)
        .map(this.transformNotification)
        .sort((a, b) => new Date(b.sent_at).getTime() - new Date(a.sent_at).getTime());

    } catch (error) {
      console.error('Error fetching notifications:', error);
      throw error;
    }
  }

  static async markAsRead(notificationId: string): Promise<void> {
    // 🔍 Kiểm tra API có sẵn không
    const apiAvailable = await CheckAPIService.checkApiAvailability(check_api_url);
    if (!apiAvailable) {
      alert('API hiện không có sẵn, chưa thể đánh dấu thật, đây là bản preview giao diện.');
      return;
    }

    try {
      const token = this.getAuthToken();
      
      if (!token) {
        throw new Error('No authentication token found');
      }

      const response = await fetch(`${API_BASE_URL}/notification/markAsRead/${notificationId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Mark as read response:', data);

    } catch (error) {
      console.error('Error marking notification as read:', error);
      throw error;
    }
  }

  static async markAllAsRead(userId: string): Promise<void> {
    // 🔍 Kiểm tra API có sẵn không
    const apiAvailable = await CheckAPIService.checkApiAvailability(check_api_url);
    if (!apiAvailable) {
      alert('API hiện không có sẵn, chưa thể đánh dấu thật, đây là bản preview giao diện.');
      return;
    }

    try {
      const notifications = await this.getUserNotifications(userId);
      const unreadNotifications = notifications.filter(n => !n.is_read);
      
      const markPromises = unreadNotifications.map(notification => 
        this.markAsRead(notification.id)
      );
      
      await Promise.all(markPromises);
      
    } catch (error) {
      console.error('Error marking all notifications as read:', error);
      throw error;
    }
  }

  // ✅ Utility function
  static getUnreadCount(notifications: Notification[]): number {
    return notifications.filter(n => !n.is_read).length;
  }
}