import React from 'react';
import { OrderWithDetails } from '@/types/Order';
import Card from '@/component/ui/CardCotainer';
import CardHeader from '@/component/ui/CardHeader';
import LoadingSpinner from '@/component/ui/LoadingSpinner';
import EmptyState from '@/component/ui/EmptyState';
import ActionButton from '@/component/ui/ActionButton';
import OrderCard from '@/component/features/account/order/OrderCard';

interface OrderHistoryProps {
  orders: OrderWithDetails[];
  isLoading: boolean;
  onRefresh: () => void;
}

export default function OrderHistory({ orders, isLoading, onRefresh }: OrderHistoryProps) {
  if (isLoading) {
    return (
      <Card padding="none">
        <CardHeader title="Lịch sử mua hàng" icon="📦" />
        <LoadingSpinner text="Đang tải lịch sử đơn hàng..." />
      </Card>
    );
  }

  return (
    <Card padding="none">
      <CardHeader title="Lịch sử mua hàng" icon="📦">
        <ActionButton onClick={onRefresh}>
          <span>🔄</span>
          Làm mới
        </ActionButton>
      </CardHeader>

      <div style={styles.content}>
        {orders.length === 0 ? (
          <EmptyState
            icon="📦"
            title="Chưa có đơn hàng nào"
            subtitle="Bạn chưa thực hiện đơn hàng nào. Hãy khám phá các sản phẩm của chúng tôi!"
          />
        ) : (
          <div style={styles.ordersList}>
            {orders.map((order) => (
              <OrderCard key={order.order_id} order={order} />
            ))}
          </div>
        )}
      </div>
    </Card>
  );
}

const styles = {
  content: {
    padding: '24px',
  },
  ordersList: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '20px',
  },
};