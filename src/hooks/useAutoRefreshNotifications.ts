import { useState, useEffect, useRef, useCallback } from 'react';
import { Notification } from '@/types/Notification';
import { NotificationService } from '@/services/NotificationService';

interface UseAutoRefreshNotificationsReturn {
  notifications: Notification[];
  isLoading: boolean;
  error: string | null;
  unreadCount: number;
  newNotificationsCount: number;
  isAutoRefreshing: boolean;
  lastFetchTime: Date | null;
  loadNotifications: () => Promise<void>;
  markAsRead: (notificationId: string) => Promise<void>;
  markAllAsRead: () => Promise<void>;
}

export function useAutoRefreshNotifications(userId: string): UseAutoRefreshNotificationsReturn {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [unreadCount, setUnreadCount] = useState(0);
  const [newNotificationsCount, setNewNotificationsCount] = useState(0);
  const [isAutoRefreshing, setIsAutoRefreshing] = useState(false);
  const [lastFetchTime, setLastFetchTime] = useState<Date | null>(null);

  // Refs để tránh stale closure
  const notificationsRef = useRef<Notification[]>([]);
  const userIdRef = useRef<string>(userId);

  // Update refs khi state thay đổi
  useEffect(() => {
    notificationsRef.current = notifications;
  }, [notifications]);

  useEffect(() => {
    userIdRef.current = userId;
  }, [userId]);

  // Helper functions
  const getUnreadCount = (notifs: Notification[]): number => {
    return notifs.filter(n => !n.is_read).length;
  };

  // Load notifications lần đầu
  const loadNotifications = useCallback(async () => {
    if (!userId) return;

    try {
      setIsLoading(true);
      setError(null);

      const notificationsData = await NotificationService.getUserNotifications(userId);
      
      setNotifications(notificationsData);
      const newUnreadCount = getUnreadCount(notificationsData);
      setUnreadCount(newUnreadCount);
      setLastFetchTime(new Date());

    } catch (err) {
      console.error('Error loading notifications:', err);
      setError(err instanceof Error ? err.message : 'Lỗi khi tải thông báo');
    } finally {
      setIsLoading(false);
    }
  }, [userId]);

  // Kiểm tra thông báo mới (không có dependencies để tránh infinite loop)
  const checkForNewNotifications = useCallback(async () => {
    const currentUserId = userIdRef.current;
    if (!currentUserId) return;

    try {
      setIsAutoRefreshing(true);
      
      const freshNotifications = await NotificationService.getUserNotifications(currentUserId);
      
      // Sử dụng ref để lấy current notifications
      const currentNotifications = notificationsRef.current;
      const currentIds = new Set(currentNotifications.map(n => n.id));
      const newNotifications = freshNotifications.filter(n => !currentIds.has(n.id));
      
      if (newNotifications.length > 0) {
        console.log(`🔔 Found ${newNotifications.length} new notifications`);
        
        // Update notifications state với thông báo mới ở đầu
        setNotifications(prev => {
          const updated = [...newNotifications, ...prev];
          const newUnreadCount = getUnreadCount(updated);
          setUnreadCount(newUnreadCount);
          
          // Hiển thị toast notification
          setNewNotificationsCount(newNotifications.length);
          setTimeout(() => setNewNotificationsCount(0), 3000);
        
          return updated;
        });
      } else {
        // Kiểm tra read status changes
        const currentNotifications = notificationsRef.current;
        const updatedNotifications = currentNotifications.map(currentNotification => {
          const freshNotification = freshNotifications.find(n => n.id === currentNotification.id);
          if (freshNotification && freshNotification.is_read !== currentNotification.is_read) {
            return { ...currentNotification, is_read: freshNotification.is_read };
          }
          return currentNotification;
        });
        
        const hasReadStatusChange = updatedNotifications.some((n, index) => 
          n.is_read !== currentNotifications[index]?.is_read
        );
        
        if (hasReadStatusChange) {
          setNotifications(updatedNotifications);
          const newUnreadCount = getUnreadCount(updatedNotifications);
          setUnreadCount(newUnreadCount);
        }
      }
      
      setLastFetchTime(new Date());
      
    } catch (error) {
      console.error('Error checking for new notifications:', error);
      // Không set error để không làm phiền user khi auto-refresh
    } finally {
      setIsAutoRefreshing(false);
    }
  }, []); // EMPTY dependency array để tránh infinite loop

  // Mark as read
  const markAsRead = useCallback(async (notificationId: string) => {
    const notification = notifications.find(n => n.id === notificationId);
    
    if (!notification || notification.is_read) {
      return; // Đã đọc rồi hoặc không tìm thấy
    }

    try {
      await NotificationService.markAsRead(notificationId);
      
      // Update local state
      setNotifications(prev => {
        const updated = prev.map(notification => 
          notification.id === notificationId 
            ? { ...notification, is_read: true }
            : notification
        );
        
        const newUnreadCount = getUnreadCount(updated);
        setUnreadCount(newUnreadCount);
        return updated;
      });
      
    } catch (err) {
      console.error('Error marking notification as read:', err);
      setError(err instanceof Error ? err.message : 'Lỗi khi đánh dấu đã đọc');
    }
  }, [notifications]);

  // Mark all as read
  const markAllAsRead = useCallback(async () => {
    const unreadNotifications = notifications.filter(n => !n.is_read);
    
    if (unreadNotifications.length === 0) {
      return;
    }

    try {
      setIsLoading(true);
      await NotificationService.markAllAsRead(userId);
      
      setNotifications(prev => {
        const updated = prev.map(notification => ({ ...notification, is_read: true }));
        setUnreadCount(0);
        return updated;
      });
      
    } catch (err) {
      console.error('Error marking all notifications as read:', err);
      setError(err instanceof Error ? err.message : 'Lỗi khi đánh dấu tất cả đã đọc');
    } finally {
      setIsLoading(false);
    }
  }, [notifications, userId]);

  // Setup auto-refresh interval (chỉ chạy 1 lần)
  useEffect(() => {
    if (!userId) return;

    // Load notifications lần đầu
    loadNotifications();

    // Setup interval để check mỗi 5 giây
    const intervalId = setInterval(() => {
      checkForNewNotifications();
    }, 5000);

    // Cleanup interval khi component unmount hoặc userId thay đổi
    return () => {
      clearInterval(intervalId);
    };
  }, [userId]); // Chỉ depend vào userId

  return {
    notifications,
    isLoading,
    error,
    unreadCount,
    newNotificationsCount,
    isAutoRefreshing,
    lastFetchTime,
    loadNotifications,
    markAsRead,
    markAllAsRead
  };
}