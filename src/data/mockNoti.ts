import { Notification } from '@/types/Notification';

export const mockNotifications: Notification[] = [
  {
    id: "001",
    user_id: "user005",
    message: 'Đơn hàng #1 đã được giao thành công',
    is_read: false,
    sent_at: '2024-08-16T08:30:00Z'
  },
  {
    id: "002",
    user_id: "user005",
    message: 'Đơn hàng #2 đang trên đường giao đến bạn',
    is_read: false,
    sent_at: '2024-08-15T16:45:00Z'
  },
  {
    id: "003",
    user_id: "user005",
    message: 'Chào mừng bạn đến với Hội Đào Chiến Binh!',
    is_read: true,
    sent_at: '2024-08-10T10:00:00Z'
  },
  {
    id: "004",
    user_id: "user005",
    message: 'Có sản phẩm mới trong danh mục Gundam Real Grade',
    is_read: true,
    sent_at: '2024-08-12T14:20:00Z'
  }
];