export interface Notification {
  id: string;
  user_id: string;         // ✅ Match với BE field name
  message: string;
  is_read: boolean;        // ✅ Frontend sử dụng
  sent_at: string;
}

// ✅ Interface cho BE response (optional, để type safety)
export interface NotificationBEResponse {
  id: string;
  user_id: string;
  message: string;
  readOrNot: boolean;      // ✅ BE field name
  sent_at: string;
}