import React from 'react';
import { OrderWithDetails } from '@/types/Order';
import Card from '@/component/ui/CardCotainer';
import CardHeader from '@/component/ui/CardHeader';
import LoadingSpinner from '@/component/ui/LoadingSpinner';
import EmptyState from '@/component/ui/EmptyState';
import ActionButton from '@/component/ui/ActionButton';
import OrderCard from '@/component/features/account/order/OrderCard';
import OrderStatusSelect from '@/component/features/account/order/OrderStatusSelect';
import { useOrderFilter } from '@/hooks/order/useOrderFilter';

interface OrderHistoryProps {
  orders: OrderWithDetails[];
  isLoading: boolean;
  onRefresh: () => void;
}

export default function OrderHistory({ orders, isLoading, onRefresh }: OrderHistoryProps) {
  const {
    selectedStatus,
    setSelectedStatus,
    filteredOrders,
    orderCounts
  } = useOrderFilter(orders);

  if (isLoading) {
    return (
      <Card padding="none">
        <CardHeader title="Lịch sử mua hàng" icon="📦" />
        <LoadingSpinner text="Đang tải lịch sử đơn hàng..." />
      </Card>
    );
  }

  const getEmptyStateMessage = () => {
    switch (selectedStatus) {
      case 'pending':
        return {
          title: 'Không có đơn hàng chờ xử lý',
          subtitle: 'Hiện tại bạn không có đơn hàng nào đang chờ xử lý.'
        };
      case 'shipping':
        return {
          title: 'Không có đơn hàng đang giao',
          subtitle: 'Hiện tại bạn không có đơn hàng nào đang trong quá trình giao hàng.'
        };
      case 'delivered':
        return {
          title: 'Không có đơn hàng đã giao',
          subtitle: 'Bạn chưa có đơn hàng nào được giao thành công.'
        };
      case 'cancelled':
        return {
          title: 'Không có đơn hàng đã hủy',
          subtitle: 'Bạn chưa hủy đơn hàng nào.'
        };
      default:
        return {
          title: 'Chưa có đơn hàng nào',
          subtitle: 'Bạn chưa thực hiện đơn hàng nào. Hãy khám phá các sản phẩm của chúng tôi!'
        };
    }
  };

  const emptyMessage = getEmptyStateMessage();

  return (
    <Card padding="none">
      <CardHeader title="Lịch sử mua hàng" icon="📦">
        <div style={styles.headerActions}>
          {/* Status Filter Select */}
          {orders.length > 0 && (
            <OrderStatusSelect
              selectedStatus={selectedStatus}
              onStatusChange={setSelectedStatus}
              orderCounts={orderCounts}
            />
          )}
          
          {/* Refresh Button */}
          <ActionButton onClick={onRefresh}>
            <span>🔄</span>
            Làm mới
          </ActionButton>
        </div>
      </CardHeader>

      <div style={styles.content}>
        {/* Results Section */}
        {filteredOrders.length === 0 ? (
          <EmptyState
            icon="📦"
            title={emptyMessage.title}
            subtitle={emptyMessage.subtitle}
          />
        ) : (
          <div style={styles.ordersSection}>
            {/* Results Summary - Optional, có thể bỏ nếu muốn đơn giản hơn */}
            <div style={styles.resultsSummary}>
              <span style={styles.resultsText}>
                Hiển thị {filteredOrders.length} đơn hàng
              </span>
            </div>

            {/* Orders List */}
            <div style={styles.ordersList}>
              {filteredOrders.map((order) => (
                <OrderCard key={order.order_id} order={order} />
              ))}
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}

const styles = {
  headerActions: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  content: {
    padding: '24px',
  },
  ordersSection: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '16px',
  },
  resultsSummary: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '12px 0',
    borderBottom: '1px solid #e5e7eb',
  },
  resultsText: {
    fontSize: '14px',
    color: '#6b7280',
    fontWeight: '500',
  },
  ordersList: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '20px',
  },
};