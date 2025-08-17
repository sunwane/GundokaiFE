import React from 'react';
import { Notification } from '@/types/Notification';
import { NotificationService } from '@/services/NotificationService';
import Card from '@/component/ui/CardCotainer';
import CardHeader from '@/component/ui/CardHeader';
import LoadingSpinner from '@/component/ui/LoadingSpinner';
import EmptyState from '@/component/ui/EmptyState';
import ActionButton from '@/component/ui/ActionButton';
import NotificationCard from '@/component/features/account/noti/NotificationCard';

interface NotificationListProps {
  notifications: Notification[];
  isLoading: boolean;
  onRefresh: () => void;
}

export default function NotificationList({ notifications, isLoading, onRefresh }: NotificationListProps) {
  const handleMarkAsRead = async (notificationId: string) => {
    try {
      await NotificationService.markAsRead(notificationId);
      onRefresh();
    } catch (error) {
      console.error('Failed to mark as read:', error);
    }
  };

  const handleMarkAllAsRead = async () => {
    try {
      const firstNotification = notifications[0];
      if (firstNotification) {
        await NotificationService.markAllAsRead(firstNotification.user_id);
        onRefresh();
      }
    } catch (error) {
      console.error('Failed to mark all as read:', error);
    }
  };

  const unreadCount = NotificationService.getUnreadCount(notifications);

  if (isLoading) {
    return (
      <Card padding="none">
        <CardHeader title="Thông báo" icon="🔔" />
        <LoadingSpinner text="Đang tải thông báo..." />
      </Card>
    );
  }

  return (
    <Card padding="none">
      <CardHeader title="Thông báo" icon="🔔">
        <div style={styles.headerContent}>
          {unreadCount > 0 && (
            <span style={styles.unreadBadge}>{unreadCount} mới</span>
          )}
          <div style={styles.headerActions}>
            <ActionButton onClick={onRefresh}>
              <span>🔄</span>
              Làm mới
            </ActionButton>
            {unreadCount > 0 && (
              <ActionButton onClick={handleMarkAllAsRead} variant="primary">
                <span>✅</span>
                Đánh dấu tất cả đã đọc
              </ActionButton>
            )}
          </div>
        </div>
      </CardHeader>

      <div style={styles.content}>
        {notifications.length === 0 ? (
          <EmptyState
            icon="🔔"
            title="Chưa có thông báo nào"
            subtitle="Các thông báo mới sẽ được hiển thị tại đây."
          />
        ) : (
          <div style={styles.notificationsList}>
            {notifications.map((notification) => (
              <NotificationCard
                key={notification.id}
                notification={notification}
                onMarkAsRead={handleMarkAsRead}
              />
            ))}
          </div>
        )}
      </div>
    </Card>
  );
}

const styles = {
  headerContent: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  unreadBadge: {
    backgroundColor: '#dc2626',
    color: 'white',
    padding: '4px 8px',
    borderRadius: '12px',
    fontSize: '12px',
    fontWeight: 'bold',
  },
  headerActions: {
    display: 'flex',
    gap: '8px',
  },
  content: {
    padding: '24px',
  },
  notificationsList: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '12px',
  },
};