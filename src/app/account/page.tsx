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
  const [isHydrated, setIsHydrated] = useState(false);
  const [windowWidth, setWindowWidth] = useState(1200); // Default desktop width

  useEffect(() => {
    setIsHydrated(true);
    setWindowWidth(window.innerWidth);

    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Computed responsive values
  const isMobile = isHydrated ? windowWidth < 768 : false;
  
  const getResponsivePadding = () => {
    return isHydrated && isMobile ? '20px 4vw' : '32px 5vw';
  };

  const getResponsiveSpacing = () => {
    const small = isHydrated && isMobile ? '8px' : '12px';
    const medium = isHydrated && isMobile ? '16px' : '24px';
    const large = isHydrated && isMobile ? '24px' : '40px';
    
    return { small, medium, large };
  };

  const spacing = getResponsiveSpacing();

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    
    if (tab === 'orders' && orders.length === 0) {
      loadOrders();
    } else if (tab === 'notifications' && notifications.length === 0) {
      loadNotifications();
    }
  };

  useEffect(() => {
    setActiveTab(tabFromUrl);
  }, [tabFromUrl]);

  if (isLoading) {
    return (
      <div>
        <PageHeader />
        <div style={styles.loadingContainer}>
          <LoadingSpinner text="Đang tải thông tin tài khoản..." size="large" />
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  // ✅ Hàm tạo avatar từ username
  const getAvatarText = (username: string) => {
    if (!username) return 'U';
    return username.charAt(0).toUpperCase();
  };

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
      
      {/* ✅ Welcome Banner - Cập nhật màu xanh biển */}
      <div style={styles.welcomeBanner}>
        <div style={{
          ...styles.bannerContent,
          padding: getResponsivePadding(),
        }}>
          <div style={styles.welcomeContainer}>
            {/* ✅ Avatar tròn giống sidebar */}
            <div style={styles.bannerAvatar}>
              {getAvatarText(user.username)}
            </div>
            
            <div style={styles.welcomeText}>
              <h1 style={styles.welcomeTitle}>
                Chào mừng trở lại, {user.username}! 
              </h1>
              <p style={styles.welcomeSubtitle}>
                Quản lý thông tin tài khoản và đơn hàng của bạn
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
          gridTemplateColumns: isHydrated && isMobile ? '1fr' : '300px 1fr',
          gap: spacing.large,
          alignItems: 'start',
        }}>
          {/* Sidebar - hidden on mobile when not hydrated or is mobile */}
          {(!isHydrated || !isMobile) && (
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
          {isHydrated && isMobile && (
            <div style={styles.mobileTabNav}>
              <select 
                value={activeTab} 
                onChange={(e) => handleTabChange(e.target.value)}
                style={styles.mobileSelect}
              >
                <option value="account">Thông tin tài khoản</option>
                <option value="orders">Lịch sử đơn hàng</option>
                <option value="notifications">Thông báo</option>
                <option value="password">Đổi mật khẩu</option>
              </select>
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
  loadingContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '50vh',
  },
  // ✅ SỬA: Banner màu xanh biển thay vì gradient tím
  welcomeBanner: {
    background: 'linear-gradient(135deg, #4a90e2 0%, #357abd 100%)', // Màu xanh biển như ảnh 2
    color: 'white',
    marginBottom: '32px',
  },
  bannerContent: {
    maxWidth: '1400px',
    margin: '0 auto',
    padding: '32px 5vw',
  },
  // ✅ THÊM: Container cho avatar và text
  welcomeContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
  },
  // ✅ THÊM: Avatar tròn giống sidebar
  bannerAvatar: {
    width: '80px',
    height: '80px',
    borderRadius: '50%',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    border: '3px solid rgba(255, 255, 255, 0.3)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '32px',
    fontWeight: 'bold',
    color: 'white',
    flexShrink: 0,
  },
  welcomeText: {
    textAlign: 'left' as const,
    flex: 1,
  },
  welcomeTitle: {
    fontSize: '28px',
    fontWeight: 'bold',
    margin: '0 0 8px 0',
  },
  welcomeSubtitle: {
    fontSize: '16px',
    opacity: 0.9,
    margin: 0,
  },
  pageContainer: {
    maxWidth: '1400px',
    margin: '0 auto',
    padding: '32px 5vw',
  },
  sidebarContainer: {
    position: 'sticky' as const,
    top: '32px',
  },
  mobileTabNav: {
    marginBottom: '24px',
  },
  mobileSelect: {
    width: '100%',
    padding: '12px',
    fontSize: '16px',
    border: '1px solid #d1d5db',
    borderRadius: '8px',
    backgroundColor: 'white',
  },
  mainContent: {
    minHeight: '500px',
  },
};