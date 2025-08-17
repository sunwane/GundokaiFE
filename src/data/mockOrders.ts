import { Order, OrderDetail } from '@/types/Order';

export const mockOrders: Order[] = [
  {
    order_id: 1,
    account_id: 1,
    order_date: '2024-08-10T10:30:00Z',
    total_amount: 2500000,
    status: 'delivered',
    phoneNumber: '0901234567',
    address: '123 Nguyễn Văn A, Quận 1, TP.HCM',
    customer_Name: 'Nguyễn Văn An'
  },
  {
    order_id: 2,
    account_id: 1,
    order_date: '2024-08-14T14:15:00Z',
    total_amount: 1800000,
    status: 'shipping',
    phoneNumber: '0901234567',
    address: '123 Nguyễn Văn A, Quận 1, TP.HCM',
    customer_Name: 'Nguyễn Văn An'
  },
  {
    order_id: 3,
    account_id: 1,
    order_date: '2024-08-16T09:00:00Z',
    total_amount: 950000,
    status: 'pending',
    phoneNumber: '0901234567',
    address: '123 Nguyễn Văn A, Quận 1, TP.HCM',
    customer_Name: 'Nguyễn Văn An'
  }
];

export const mockOrderDetails: OrderDetail[] = [
  { id: 1, order_id: 1, product_id: 101, quantity: 1, price: 1500000 },
  { id: 2, order_id: 1, product_id: 102, quantity: 2, price: 500000 },
  { id: 3, order_id: 2, product_id: 103, quantity: 1, price: 1800000 },
  { id: 4, order_id: 3, product_id: 104, quantity: 1, price: 950000 }
];