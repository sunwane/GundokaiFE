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
  const [isMobile, setIsMobile] = useState(false);

  // Detect screen size
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 750);
    };

    // Check on mount
    checkScreenSize();

    // Add event listener
    window.addEventListener('resize', checkScreenSize);

    // Cleanup
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

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
        <div style={styles.bannerContent}>
          <div style={styles.welcomeInfo}>
            <div style={styles.avatar}>
              <div style={styles.avatarPlaceholder}>
                {user.username.charAt(0).toUpperCase()}
              </div>
            </div>
            <div>
              <h2 style={styles.welcomeTitle}>Xin chào, {user.username}!</h2>
              <p style={styles.welcomeSubtitle}>Chào mừng bạn quay trở lại</p>
            </div>
          </div>
        </div>
      </div>

      <div style={styles.pageContainer}>

        <div style={isMobile ? styles.contentGridMobile : styles.contentGrid}>
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
    padding: '20px 0',
  },
  bannerContent: {
    padding: '0 5vw',
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
    width: '60px',
    height: '60px',
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
    fontSize: '24px',
    fontWeight: 'bold',
  },
  welcomeTitle: {
    fontSize: '20px',
    fontWeight: 'bold',
    margin: '0 0 4px 0',
  },
  welcomeSubtitle: {
    fontSize: '14px',
    margin: 0,
    opacity: 0.9,
  },
  pageContainer: {
    minHeight: 'calc(100vh - 200px)',
    background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
    padding: '32px 5vw',
  },
  // Desktop grid - có sidebar
  contentGrid: {
    display: 'grid',
    gridTemplateColumns: '300px 1fr',
    gap: '32px',
    alignItems: 'start',
  },
  // Mobile grid - không có sidebar, mainContent full width
  contentGridMobile: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: '0',
    alignItems: 'start',
  },
  sidebarContainer: {
    position: 'sticky' as const,
    top: '32px',
  },
  mainContent: {
    minHeight: '600px',
  },
};