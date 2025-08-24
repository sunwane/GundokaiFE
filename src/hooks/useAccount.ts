// hooks/useAccount.ts
import { useState, useEffect, useMemo } from 'react'; // ✅ Import useMemo
import { useRouter } from 'next/navigation';
import { AuthService } from '@/services/AuthService';
import { OrderService } from '@/services/OrderService';
import { NotificationService } from '@/services/NotificationService';
import { Account } from '@/types/Account';
import { Order, OrderDetail } from '@/types/Order';
import { Notification } from '@/types/Notification';

export function useAccount() {
  const router = useRouter();
  const [user, setUser] = useState<Omit<Account, 'password'> | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [orders, setOrders] = useState<Order[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [ordersLoading, setOrdersLoading] = useState(false);
  const [notificationsLoading, setNotificationsLoading] = useState(false);

  // ✅ Computed userStats với useMemo
  const userStats = useMemo(() => {
    // console.log('=== COMPUTING USER STATS ===');
    // console.log('Orders count:', orders?.length || 0);
    
    if (!orders || orders.length === 0) {
      // console.log('No orders, returning zero stats');
      return {
        orders: 0,
        ordered: 0,
        shipping: 0,
        completed: 0
      };
    }

    const totalOrders = orders.length;
    
    const pendingOrders = orders.filter(order => 
      order.status === 'PENDING' || order.status === 'CONFIRMED'
    ).length;
    
    const shippingOrders = orders.filter(order => 
      order.status === 'PROCESSING' || order.status === 'SHIPPED'
    ).length;

    const completedOrders = orders.filter(order => 
      order.status === 'DELIVERED' || order.status === 'COMPLETED'
    ).length;

    const stats = {
      orders: totalOrders,
      ordered: pendingOrders,
      shipping: shippingOrders,
      completed: completedOrders
    };

    // console.log('Computed stats:', stats);
    return stats;
  }, [orders]); // ✅ Re-compute khi orders thay đổi

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userSession');
    router.push('/auth');
  };

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

  // ✅ Load orders function
  const loadOrders = async () => {
    if (!user) return;
    
    setOrdersLoading(true);
    try {
      // console.log('=== LOADING ORDERS ===');
      const response = await OrderService.getOrderHistory(0, 100);
      
      // console.log('Order history response:', response);
      
      let userOrders: Order[] = [];
      if (response && response.result) {
        if (Array.isArray(response.result)) {
          userOrders = response.result;
        } else if (response.result.content) {
          userOrders = response.result.content;
        }
      } else if (Array.isArray(response)) {
        userOrders = response;
      }

      // console.log('Parsed orders:', userOrders);
      // console.log('Orders count:', userOrders.length);

      setOrders(userOrders);
      
    } catch (error) {
      console.error('Failed to load orders:', error);
      setOrders([]);
    } finally {
      setOrdersLoading(false);
    }
  };

  // ✅ Load notifications function
  const loadNotifications = async () => {
    if (!user) return;
    
    setNotificationsLoading(true);
    try {
      // ✅ Tạm thời disable notifications để tránh lỗi
      setNotifications([]);
      console.log('Notifications temporarily disabled');
      
    } catch (error) {
      console.error('Failed to load notifications:', error);
      setNotifications([]);
    } finally {
      setNotificationsLoading(false);
    }
  };

  // ✅ Load orders và notifications khi có user
  useEffect(() => {
    if (user) {
      loadOrders();
      loadNotifications();
    }
  }, [user]);

  return {
    user,
    orders,
    notifications,
    userStats, // ✅ Computed stats với 4 fields
    isLoading,
    ordersLoading,
    notificationsLoading,
    loadOrders,
    loadNotifications,
    handleLogout, // ✅ Export handleLogout
    setUser, // ✅ Export setUser for onUserUpdate
  };
}