import { Notification } from '@/types/Notification';
import { mockNotifications } from '@/data/mockNoti';

export class NotificationService {
  static async getUserNotifications(userId: string): Promise<Notification[]> {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 600));
    
    return mockNotifications
      .filter(notification => notification.user_id == userId)
      .sort((a, b) => new Date(b.sent_at).getTime() - new Date(a.sent_at).getTime());
  }

  static async markAsRead(notificationId: string): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const notification = mockNotifications.find(n => n.id === notificationId);
    if (notification) {
      notification.is_read = true;
    }
  }

  static async markAllAsRead(userId: string): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    mockNotifications
      .filter(n => n.user_id === userId)
      .forEach(n => n.is_read = true);
  }

  static getUnreadCount(notifications: Notification[]): number {
    return notifications.filter(n => !n.is_read).length;
  }
}