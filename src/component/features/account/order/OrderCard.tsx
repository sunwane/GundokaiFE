import React from 'react';
import { OrderWithDetails } from '@/types/Order';
import { OrderService } from '@/services/OrderService';
import StatusBadge from '@/component/ui/StatusBadge';

interface OrderCardProps {
  order: OrderWithDetails;
}

export default function OrderCard({ order }: OrderCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  return (
    <div style={styles.orderCard}>
      <div style={styles.orderHeader}>
        <div style={styles.orderInfo}>
          <h3 style={styles.orderNumber}>Đơn hàng #{order.order_id}</h3>
          <p style={styles.orderDate}>{formatDate(order.order_date)}</p>
        </div>
        <StatusBadge
          status={order.status}
          color={OrderService.getStatusColor(order.status)}
          text={OrderService.getStatusText(order.status)}
        />
      </div>

      <div style={styles.orderDetails}>
        <div style={styles.customerInfo}>
          <div style={styles.infoRow}>
            <span style={styles.infoLabel}>Người nhận:</span>
            <span style={styles.infoValue}>{order.customer_Name}</span>
          </div>
          <div style={styles.infoRow}>
            <span style={styles.infoLabel}>Số điện thoại:</span>
            <span style={styles.infoValue}>{order.phoneNumber}</span>
          </div>
          <div style={styles.infoRow}>
            <span style={styles.infoLabel}>Địa chỉ:</span>
            <span style={styles.infoValue}>{order.address}</span>
          </div>
        </div>

        <div style={styles.orderItems}>
          <h4 style={styles.itemsTitle}>Chi tiết sản phẩm:</h4>
          {order.details.map((detail) => (
            <div key={detail.id} style={styles.orderItem}>
              <span style={styles.itemInfo}>
                Sản phẩm #{detail.productId} × {detail.quantity}
              </span>
              <span style={styles.itemPrice}>
                {formatPrice(detail.price)}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div style={styles.orderFooter}>
        <div style={styles.totalAmount}>
          <span style={styles.totalLabel}>Tổng tiền:</span>
          <span style={styles.totalValue}>{formatPrice(order.total_amount)}</span>
        </div>
      </div>
    </div>
  );
}

const styles = {
  orderCard: {
    border: '1px solid #e5e7eb',
    borderRadius: '8px',
    overflow: 'hidden',
    transition: 'all 0.2s ease',
  },
  orderHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '16px 20px',
    backgroundColor: '#f9fafb',
    borderBottom: '1px solid #e5e7eb',
  },
  orderInfo: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '4px',
  },
  orderNumber: {
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#1f2937',
    margin: 0,
  },
  orderDate: {
    fontSize: '12px',
    color: '#6b7280',
    margin: 0,
  },
  orderDetails: {
    padding: '20px',
  },
  customerInfo: {
    marginBottom: '16px',
  },
  infoRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '8px 0',
    borderBottom: '1px solid #f3f4f6',
  },
  infoLabel: {
    fontSize: '14px',
    color: '#6b7280',
    fontWeight: '500',
  },
  infoValue: {
    fontSize: '14px',
    color: '#1f2937',
    fontWeight: '500',
  },
  orderItems: {
    marginTop: '16px',
  },
  itemsTitle: {
    fontSize: '14px',
    fontWeight: 'bold',
    color: '#1f2937',
    margin: '0 0 12px 0',
  },
  orderItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '8px 0',
    borderBottom: '1px solid #f3f4f6',
  },
  itemInfo: {
    fontSize: '14px',
    color: '#1f2937',
  },
  itemPrice: {
    fontSize: '14px',
    color: '#1f2937',
    fontWeight: '500',
  },
  orderFooter: {
    padding: '16px 20px',
    backgroundColor: '#f9fafb',
    borderTop: '1px solid #e5e7eb',
  },
  totalAmount: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalLabel: {
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#1f2937',
  },
  totalValue: {
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#dc2626',
  },
};