import React from 'react';
import { Notification } from '@/types/Notification';

interface NotificationCardProps {
  notification: Notification;
  onMarkAsRead: (id: string) => void;
}

export default function NotificationCard({ notification, onMarkAsRead }: NotificationCardProps) {
  const formatDate = (dateString: string) => {
    const now = new Date();
    const notificationDate = new Date(dateString);
    const diffInHours = (now.getTime() - notificationDate.getTime()) / (1000 * 60 * 60);

    if (diffInHours < 1) {
      return 'Vừa xong';
    } else if (diffInHours < 24) {
      return `${Math.floor(diffInHours)} giờ trước`;
    } else if (diffInHours < 168) {
      return `${Math.floor(diffInHours / 24)} ngày trước`;
    } else {
      return notificationDate.toLocaleDateString('vi-VN');
    }
  };

  return (
    <div 
      style={{
        ...styles.notificationCard,
        ...(notification.is_read ? {} : styles.notificationUnread)
      }}
      onClick={() => !notification.is_read && onMarkAsRead(notification.id)}
    >
      <div style={styles.notificationHeader}>
        <div style={styles.notificationIndicator}>
          {notification.is_read ? (
            <span style={styles.readIndicator}>✅</span>
          ) : (
            <span style={styles.unreadIndicator}>🔵</span>
          )}
        </div>
        <div style={styles.notificationTime}>
          {formatDate(notification.sent_at)}
        </div>
      </div>
      
      <div style={styles.notificationContent}>
        <p style={styles.notificationMessage}>
          {notification.message}
        </p>
      </div>

      {!notification.is_read && (
        <div style={styles.notificationActions}>
          <button 
            onClick={(e) => {
              e.stopPropagation();
              onMarkAsRead(notification.id);
            }}
            style={styles.markReadButton}
          >
            Đánh dấu đã đọc
          </button>
        </div>
      )}
    </div>
  );
}

const styles = {
  notificationCard: {
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: '#e5e7eb', // Tách border thành các thuộc tính riêng
    borderRadius: '8px',
    padding: '16px',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    backgroundColor: '#ffffff',
  },
  notificationUnread: {
    backgroundColor: '#eff6ff',
    borderColor: '#bfdbfe', // Chỉ thay đổi borderColor
  },
  notificationHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '8px',
  },
  notificationIndicator: {
    fontSize: '12px',
  },
  readIndicator: {
    color: '#10b981',
  },
  unreadIndicator: {
    color: '#3b82f6',
  },
  notificationTime: {
    fontSize: '12px',
    color: '#6b7280',
  },
  notificationContent: {
    marginBottom: '12px',
  },
  notificationMessage: {
    fontSize: '14px',
    color: '#1f2937',
    margin: 0,
    lineHeight: '1.5',
  },
  notificationActions: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  markReadButton: {
    padding: '4px 12px',
    backgroundColor: '#3b82f6',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    fontSize: '12px',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  },
};