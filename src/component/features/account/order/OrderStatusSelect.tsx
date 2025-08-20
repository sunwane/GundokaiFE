import React from "react";
import { OrderStatus } from "../../../../hooks/order/useOrderFilter";

interface OrderStatusSelectProps {
  selectedStatus: OrderStatus;
  onStatusChange: (status: OrderStatus) => void;
  orderCounts: Record<OrderStatus, number>;
}

const statusOptions = [
  { value: "all" as OrderStatus, label: "Tất cả đơn hàng" },
  { value: "pending" as OrderStatus, label: "Chờ xử lý" },
  { value: "shipping" as OrderStatus, label: "Đang giao" },
  { value: "delivered" as OrderStatus, label: "Đã giao" },
  { value: "cancelled" as OrderStatus, label: "Đã hủy" },
];

export default function OrderStatusSelect({
  selectedStatus,
  onStatusChange,
  orderCounts,
}: OrderStatusSelectProps) {
  return (
    <select
      value={selectedStatus}
      onChange={(e) => onStatusChange(e.target.value as OrderStatus)}
      style={styles.select}
    >
      {statusOptions.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label} ({orderCounts[option.value]})
        </option>
      ))}
    </select>
  );
}

const styles = {
  select: {
    padding: "8px 12px",
    backgroundColor: "#ffffff",
    border: "1px solid #d1d5db",
    borderRadius: "6px",
    fontSize: "14px",
    color: "#374151",
    cursor: "pointer",
    outline: "none",
    minWidth: "160px",
    transition: "border-color 0.2s ease",
  },
};
