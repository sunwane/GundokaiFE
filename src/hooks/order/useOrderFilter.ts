import { useState, useMemo } from 'react';
import { Order } from '@/types/Order';

export type OrderStatus = 'all' | 'pending' | 'shipping' | 'delivered' | 'cancelled';

interface OrderFilterHookReturn {
  selectedStatus: OrderStatus;
  setSelectedStatus: (status: OrderStatus) => void;
  filteredOrders: Order[];
  orderCounts: Record<OrderStatus, number>;
}

export function useOrderFilter(orders: Order[]): OrderFilterHookReturn {
  const [selectedStatus, setSelectedStatus] = useState<OrderStatus>('all');

  // Tính số lượng đơn hàng theo từng trạng thái
  const orderCounts = useMemo(() => {
    const counts = {
      all: orders.length,
      pending: 0,
      shipping: 0,
      delivered: 0,
      cancelled: 0
    };

    orders.forEach(order => {
      if (order.status in counts) {
        counts[order.status as keyof typeof counts]++;
      }
    });

    return counts;
  }, [orders]);

  // Lọc đơn hàng theo trạng thái được chọn
  const filteredOrders = useMemo(() => {
    if (selectedStatus === 'all') {
      return orders;
    }
    return orders.filter(order => order.status === selectedStatus as Order['status']);
  }, [orders, selectedStatus]);

  return {
    selectedStatus,
    setSelectedStatus,
    filteredOrders,
    orderCounts
  };
}