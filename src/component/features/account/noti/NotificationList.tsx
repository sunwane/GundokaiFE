import React from 'react';
import { Notification } from '@/types/Notification';
import NotificationCard from './NotificationCard';
import { useAutoRefreshNotifications } from '@/hooks/useAutoRefreshNotifications';

interface NotificationListProps {
  userId: string; // ✅ Thêm userId prop
}

export default function NotificationList({ userId }: NotificationListProps) {
  const {
    notifications,
    isLoading,
    error,
    unreadCount,
    newNotificationsCount,
    isAutoRefreshing,
    lastFetchTime,
    loadNotifications,
    markAsRead,
    markAllAsRead
  } = useAutoRefreshNotifications(userId);

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('vi-VN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  if (isLoading && notifications.length === 0) {
    return (
      <div style={styles.container}>
        <div style={styles.header}>
          <h2 style={styles.title}>Thông báo</h2>
        </div>
        <div style={styles.loadingContainer}>
          <div style={styles.spinner}></div>
          <span>Đang tải thông báo...</span>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      {/* ✅ New notification toast */}
      {newNotificationsCount > 0 && (
        <div style={styles.toast}>
          <div style={styles.toastContent}>
            <div style={styles.toastIndicator}></div>
            <p style={styles.toastText}>
              🔔 {newNotificationsCount} thông báo mới
            </p>
          </div>
        </div>
      )}

      {/* Header với stats */}
      <div style={styles.header}>
        <div>
          <h2 style={styles.title}>Thông báo</h2>
          <div style={styles.subtitle}>
            Quản lý thông báo cá nhân của bạn
            {unreadCount > 0 && (
              <span style={styles.unreadBadge}>
                {unreadCount} chưa đọc
              </span>
            )}
          </div>
          
          {/* ✅ Auto-refresh indicator */}
          <p style={styles.refreshInfo}>
            {isAutoRefreshing ? (
              <span style={styles.refreshing}>
                <div style={styles.refreshSpinner}></div>
                Đang kiểm tra thông báo mới...
              </span>
            ) : lastFetchTime ? (
              `Cập nhật lần cuối: ${formatDate(lastFetchTime)} • Tự động kiểm tra mỗi 5 giây`
            ) : (
              'Đang tải...'
            )}
          </p>
        </div>
        
        {/* Action buttons */}
        <div style={styles.actions}>
          {unreadCount > 0 && (
            <button 
              onClick={markAllAsRead} 
              disabled={isLoading}
              style={styles.markAllButton}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#1d4ed8';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#2563eb';
              }}
            >
              ✓ Đánh dấu tất cả đã đọc ({unreadCount})
            </button>
          )}
          
          <button 
            onClick={loadNotifications} 
            disabled={isLoading || isAutoRefreshing}
            style={styles.refreshButton}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#f3f4f6';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#ffffff';
            }}
          >
            🔄 Làm mới
          </button>
        </div>
      </div>

      {/* ✅ Stats display */}
      {notifications.length > 0 && (
        <div style={styles.stats}>
          <div style={styles.statCard}>
            <div style={styles.statNumber}>{notifications.length}</div>
            <div style={styles.statLabel}>Tổng thông báo</div>
          </div>
          <div style={styles.statCard}>
            <div style={{...styles.statNumber, color: '#d97706'}}>{unreadCount}</div>
            <div style={styles.statLabel}>Chưa đọc</div>
          </div>
          <div style={styles.statCard}>
            <div style={{...styles.statNumber, color: '#059669'}}>{notifications.length - unreadCount}</div>
            <div style={styles.statLabel}>Đã đọc</div>
          </div>
        </div>
      )}

      {/* Error display */}
      {error && (
        <div style={styles.errorContainer}>
          <p style={styles.errorText}>❌ {error}</p>
          <button 
            onClick={() => loadNotifications()}
            style={styles.retryButton}
          >
            Thử lại
          </button>
        </div>
      )}

      {/* Notifications list */}
      <div style={styles.content}>
        {notifications.length === 0 ? (
          <div style={styles.emptyState}>
            <div style={styles.emptyIcon}>🔔</div>
            <h3 style={styles.emptyTitle}>Chưa có thông báo</h3>
            <p style={styles.emptyDescription}>
              Bạn sẽ nhận được thông báo về đơn hàng và các hoạt động tài khoản tại đây.
            </p>
          </div>
        ) : (
          <div style={styles.notificationsList}>
            {notifications.map((notification) => (
              <NotificationCard
                key={notification.id}
                notification={notification}
                onMarkAsRead={markAsRead}
              />
            ))}
          </div>
        )}
      </div>

      {/* Summary */}
      {notifications.length > 0 && (
        <div style={styles.summary}>
          Tổng cộng: {notifications.length} thông báo • 
          {unreadCount > 0 ? (
            <span style={styles.summaryUnread}> {unreadCount} chưa đọc</span>
          ) : (
            <span style={styles.summaryRead}> Tất cả đã đọc</span>
          )}
          • {notifications.length - unreadCount} đã đọc
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    background: '#fff',
    borderRadius: '12px',
    border: '1px solid #e5e7eb',
    overflow: 'hidden',
    position: 'relative' as const,
  },
  // ✅ Toast styles
  toast: {
    position: 'fixed' as const,
    top: '20px',
    right: '20px',
    zIndex: 1000,
    background: '#fff',
    border: '2px solid #10b981',
    borderRadius: '8px',
    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
    animation: 'slideInRight 0.3s ease-out',
  },
  toastContent: {
    padding: '12px 16px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  toastIndicator: {
    width: '8px',
    height: '8px',
    backgroundColor: '#10b981',
    borderRadius: '50%',
    animation: 'pulse 1s infinite',
  },
  toastText: {
    margin: 0,
    fontSize: '14px',
    fontWeight: '500',
    color: '#059669',
  },
  header: {
    padding: '24px',
    borderBottom: '1px solid #e5e7eb',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: '16px',
  },
  title: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#111827',
    margin: '0 0 8px 0',
  },
  subtitle: {
    fontSize: '14px',
    color: '#6b7280',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginBottom: '4px',
  },
  unreadBadge: {
    backgroundColor: '#ef4444',
    color: 'white',
    padding: '2px 8px',
    borderRadius: '12px',
    fontSize: '12px',
    fontWeight: '600',
  },
  refreshInfo: {
    fontSize: '12px',
    color: '#9ca3af',
    margin: 0,
  },
  refreshing: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
  },
  refreshSpinner: {
    width: '12px',
    height: '12px',
    border: '2px solid #e5e7eb',
    borderTop: '2px solid #3b82f6',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
  },
  actions: {
    display: 'flex',
    gap: '8px',
    flexShrink: 0,
  },
  markAllButton: {
    backgroundColor: '#2563eb',
    color: 'white',
    border: 'none',
    padding: '8px 16px',
    borderRadius: '6px',
    fontSize: '14px',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  },
  refreshButton: {
    backgroundColor: '#ffffff',
    color: '#374151',
    border: '1px solid #d1d5db',
    padding: '8px 16px',
    borderRadius: '6px',
    fontSize: '14px',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  },
  // ✅ Stats styles
  stats: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '1px',
    backgroundColor: '#e5e7eb',
  },
  statCard: {
    backgroundColor: '#fff',
    padding: '16px',
    textAlign: 'center' as const,
  },
  statNumber: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#3b82f6',
  },
  statLabel: {
    fontSize: '12px',
    color: '#6b7280',
    marginTop: '4px',
  },
  content: {
    padding: '24px',
  },
  loadingContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '48px',
    gap: '12px',
  },
  spinner: {
    width: '20px',
    height: '20px',
    border: '2px solid #e5e7eb',
    borderTop: '2px solid #3b82f6',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
  },
  errorContainer: {
    backgroundColor: '#fef2f2',
    border: '1px solid #fecaca',
    borderRadius: '8px',
    padding: '16px',
    margin: '16px 24px',
  },
  errorText: {
    color: '#dc2626',
    fontSize: '14px',
    margin: '0 0 8px 0',
  },
  retryButton: {
    backgroundColor: '#ffffff',
    color: '#dc2626',
    border: '1px solid #dc2626',
    padding: '6px 12px',
    borderRadius: '4px',
    fontSize: '12px',
    cursor: 'pointer',
  },
  emptyState: {
    textAlign: 'center' as const,
    padding: '48px 24px',
  },
  emptyIcon: {
    fontSize: '48px',
    marginBottom: '16px',
  },
  emptyTitle: {
    fontSize: '18px',
    fontWeight: '600',
    color: '#374151',
    margin: '0 0 8px 0',
  },
  emptyDescription: {
    fontSize: '14px',
    color: '#6b7280',
    margin: 0,
    lineHeight: 1.5,
  },
  notificationsList: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '1px',
    backgroundColor: '#f3f4f6',
    borderRadius: '8px',
    overflow: 'hidden',
  },
  summary: {
    fontSize: '12px',
    color: '#6b7280',
    textAlign: 'center' as const,
    padding: '16px 24px',
    borderTop: '1px solid #e5e7eb',
    backgroundColor: '#f9fafb',
  },
  summaryUnread: {
    color: '#d97706',
    fontWeight: '500',
  },
  summaryRead: {
    color: '#059669',
    fontWeight: '500',
  },
};