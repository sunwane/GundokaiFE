import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AuthService } from '@/services/AuthService';
import { OrderService } from '@/services/OrderService';
import { NotificationService } from '@/services/NotificationService';
import { Account } from '@/types/Account';
import { OrderWithDetails } from '@/types/Order';
import { Notification } from '@/types/Notification';

export function useAccount() {
  const router = useRouter();
  const [user, setUser] = useState<Omit<Account, 'password'> | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [orders, setOrders] = useState<OrderWithDetails[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [ordersLoading, setOrdersLoading] = useState(false);
  const [notificationsLoading, setNotificationsLoading] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('authToken');
      const userSession = localStorage.getItem('userSession');

      if (!token || !userSession) {
        router.push('/auth');
        return;
      }

      try {
        const currentUser = await AuthService.getCurrentUser(token);
        setUser(currentUser);
      } catch (err) {
        console.error('Auth check failed:', err);
        localStorage.removeItem('authToken');
        localStorage.removeItem('userSession');
        router.push('/auth');
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  const loadOrders = async () => {
    if (!user) return;
    
    setOrdersLoading(true);
    try {
      const userOrders = await OrderService.getUserOrders(user.id);
      setOrders(userOrders);
    } catch (error) {
      console.error('Failed to load orders:', error);
    } finally {
      setOrdersLoading(false);
    }
  };

  const loadNotifications = async () => {
    if (!user) return;
    
    setNotificationsLoading(true);
    try {
      const userNotifications = await NotificationService.getUserNotifications(user.id);
      setNotifications(userNotifications);
    } catch (error) {
      console.error('Failed to load notifications:', error);
    } finally {
      setNotificationsLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await AuthService.logout();
      router.push('/');
    } catch (err) {
      console.error('Logout error:', err);
      localStorage.removeItem('authToken');
      localStorage.removeItem('userSession');
      router.push('/');
    }
  };

  return {
    user,
    isLoading,
    orders,
    notifications,
    ordersLoading,
    notificationsLoading,
    loadOrders,
    loadNotifications,
    handleLogout,
    setUser
  };
}