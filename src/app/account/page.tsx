'use client';
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import PageHeader from '@/component/layout/header/PageHeader';
import AccountSidebar from '@/component/features/account/AccountSidebar';
import AccountInfo from '@/component/features/account/info/AccountInfo';
import OrderHistory from '@/component/features/account/order/OrderHistory';
import NotificationList from '@/component/features/account/noti/NotificationList';
import ChangePassword from '@/component/features/account/ChangePassword';
import LoadingSpinner from '@/component/ui/LoadingSpinner';
import { useAccount } from '@/hooks/useAccount';
import { usePageResponsive } from '@/hooks/usePageResponsive';

export default function AccountPage() {
  const searchParams = useSearchParams();
  const tabFromUrl = searchParams.get('tab') || 'account';
  
  const {
    user,
    isLoading,
    orders,
    notifications,
    ordersLoading,
    notificationsLoading,
    loadOrders,
    loadNotifications,
    handleLogout,
    setUser
  } = useAccount();

  const [activeTab, setActiveTab] = useState(tabFromUrl);
  
  // SỬ DỤNG usePageResponsive THAY VÌ useResponsive
  const { 
    isMobile, 
    getResponsivePadding, 
    getGridColumns,
    getResponsiveSpacing 
  } = usePageResponsive({
    mobileBreakpoint: 750,
    tabletBreakpoint: 1024,
    mobilePadding: '20px 4vw',
    desktopPadding: '32px 5vw',
  });

  const spacing = getResponsiveSpacing();

  // Update tab when URL changes
  useEffect(() => {
    setActiveTab(tabFromUrl);
  }, [tabFromUrl]);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    
    if (tab === 'orders' && orders.length === 0) {
      loadOrders();
    } else if (tab === 'notifications' && notifications.length === 0) {
      loadNotifications();
    }
  };

  if (isLoading) {
    return (
      <div>
        <PageHeader />
        <LoadingSpinner text="Đang tải thông tin tài khoản..." size="large" />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'account':
        return (
          <AccountInfo 
            user={user} 
            onUserUpdate={setUser}
          />
        );
      case 'orders':
        return (
          <OrderHistory 
            orders={orders}
            isLoading={ordersLoading}
            onRefresh={loadOrders}
          />
        );
      case 'notifications':
        return (
          <NotificationList 
            notifications={notifications}
            isLoading={notificationsLoading}
            onRefresh={loadNotifications}
          />
        );
      case 'password':
        return <ChangePassword userId={user.id} />;
      default:
        return (
          <AccountInfo 
            user={user} 
            onUserUpdate={setUser}
          />
        );
    }
  };

  return (
    <div>
      <PageHeader />
      
      {/* Welcome Banner */}
      <div style={styles.welcomeBanner}>
        <div style={{
          ...styles.bannerContent,
          padding: getResponsivePadding(),
        }}>
          <div style={styles.welcomeInfo}>
            <div style={{
              ...styles.avatar,
              width: isMobile ? '50px' : '60px',
              height: isMobile ? '50px' : '60px',
            }}>
              <div style={{
                ...styles.avatarPlaceholder,
                fontSize: isMobile ? '20px' : '24px',
              }}>
                {user.username.charAt(0).toUpperCase()}
              </div>
            </div>
            <div>
              <h2 style={{
                ...styles.welcomeTitle,
                fontSize: isMobile ? '18px' : '20px',
              }}>
                Xin chào, {user.username}!
              </h2>
              <p style={{
                ...styles.welcomeSubtitle,
                fontSize: isMobile ? '12px' : '14px',
              }}>
                Chào mừng bạn quay trở lại
              </p>
            </div>
          </div>
        </div>
      </div>

      <div style={{
        ...styles.pageContainer,
        padding: getResponsivePadding(),
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '300px 1fr',
          gap: spacing.large,
          alignItems: 'start',
        }}>
          {/* Sidebar - hidden on mobile */}
          {!isMobile && (
            <div style={styles.sidebarContainer}>
              <AccountSidebar
                user={user}
                activeTab={activeTab}
                onTabChange={handleTabChange}
                onLogout={handleLogout}
              />
            </div>
          )}

          {/* Mobile Tab Navigation */}
          {isMobile && (
            <div style={styles.mobileTabNav}>
              {[
                { key: 'account', label: 'Thông tin', icon: '👤' },
                { key: 'orders', label: 'Đơn hàng', icon: '📦' },
                { key: 'notifications', label: 'Thông báo', icon: '🔔' },
                { key: 'password', label: 'Mật khẩu', icon: '🔐' },
              ].map((tab) => (
                <button
                  key={tab.key}
                  style={{
                    ...styles.mobileTabButton,
                    backgroundColor: activeTab === tab.key ? '#3b82f6' : '#ffffff',
                    color: activeTab === tab.key ? '#ffffff' : '#6b7280',
                  }}
                  onClick={() => handleTabChange(tab.key)}
                >
                  <span style={styles.mobileTabIcon}>{tab.icon}</span>
                  <span style={styles.mobileTabLabel}>{tab.label}</span>
                </button>
              ))}
            </div>
          )}

          <div style={styles.mainContent}>
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  welcomeBanner: {
    background: 'linear-gradient(135deg, #3b82f6 0%, #1e40af 100%)',
    color: 'white',
    padding: '20px 0px',
  },
  bannerContent: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  welcomeInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
  },
  avatar: {
    borderRadius: '50%',
    overflow: 'hidden',
    border: '3px solid rgba(255, 255, 255, 0.3)',
  },
  avatarPlaceholder: {
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
  },
  welcomeTitle: {
    fontWeight: 'bold',
    margin: '0 0 4px 0',
  },
  welcomeSubtitle: {
    margin: 0,
    opacity: 0.9,
  },
  pageContainer: {
    minHeight: 'calc(100vh - 200px)',
    background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
  },
  sidebarContainer: {
    position: 'sticky' as const,
    top: '32px',
  },
  mobileTabNav: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '8px',
    marginBottom: '20px',
    backgroundColor: '#f8fafc',
    padding: '12px',
    borderRadius: '12px',
    border: '1px solid #e5e7eb',
  },
  mobileTabButton: {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    gap: '4px',
    padding: '12px 8px',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    fontSize: '12px',
    fontWeight: '500',
  },
  mobileTabIcon: {
    fontSize: '16px',
  },
  mobileTabLabel: {
    fontSize: '10px',
    textAlign: 'center' as const,
  },
  mainContent: {
    minHeight: '600px',
  },
};