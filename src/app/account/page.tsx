"use client";

export const dynamic = "force-dynamic";

import React, { useState, useEffect, useRef, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import PageHeader from "@/component/layout/header/PageHeader";
import AccountSidebar from "@/component/features/account/AccountSidebar";
import AccountInfo from "@/component/features/account/info/AccountInfo";
import OrderHistory from "@/component/features/account/order/OrderHistory";
import NotificationList from "@/component/features/account/noti/NotificationList";
import ChangePassword from "@/component/features/account/ChangePassword";
import LoadingSpinner from "@/component/ui/LoadingSpinner";
import { useAccount } from "@/hooks/useAccount";
import Footer from "@/component/layout/footer/Footer";

function AccountPageContent() {
  const searchParams = useSearchParams();
  const tabFromUrl = searchParams.get("tab") || "account";

  const {
    user,
    isLoading,
    orders,
    userStats,
    notifications,
    ordersLoading,
    notificationsLoading,
    loadOrders,
    loadNotifications,
    handleLogout,
    setUser,
  } = useAccount();

  console.log("orders in page:", orders);

  const [activeTab, setActiveTab] = useState(tabFromUrl);
  const [isHydrated, setIsHydrated] = useState(false);
  const [windowWidth, setWindowWidth] = useState(1200);
  const loadedTabs = useRef(new Set<string>());

  useEffect(() => {
    setIsHydrated(true);
    setWindowWidth(window.innerWidth);

    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    setActiveTab(tabFromUrl);
  }, [tabFromUrl]);

  useEffect(() => {
    if (!user || !activeTab) return;

    const tabKey = `${activeTab}-${user.id}`;
    if (loadedTabs.current.has(tabKey)) {
      return;
    }

    if (activeTab === "orders" && !ordersLoading) {
      console.log("Loading orders for first time");
      loadOrders();
      loadedTabs.current.add(tabKey);
    } else if (activeTab === "notifications" && !notificationsLoading) {
      console.log("Loading notifications for first time");
      loadNotifications();
      loadedTabs.current.add(tabKey);
    }
  }, [activeTab, user?.id]);

  const isMobile = isHydrated ? windowWidth < 768 : false;

  const getResponsivePadding = () => {
    return isHydrated && isMobile ? "20px 4vw" : "32px 5vw";
  };

  const getResponsiveSpacing = () => {
    const small = isHydrated && isMobile ? "8px" : "12px";
    const medium = isHydrated && isMobile ? "16px" : "24px";
    const large = isHydrated && isMobile ? "24px" : "40px";

    return { small, medium, large };
  };

  const spacing = getResponsiveSpacing();

  const handleTabChange = (tab: string) => {
    console.log("Tab changed to:", tab);
    setActiveTab(tab);

    if (!user) return;

    const tabKey = `${tab}-${user.id}`;
    if (loadedTabs.current.has(tabKey)) {
      console.log(`Tab ${tab} already loaded, skipping`);
      return;
    }

    if (tab === "orders") {
      loadOrders();
      loadedTabs.current.add(tabKey);
    } else if (tab === "notifications") {
      loadNotifications();
      loadedTabs.current.add(tabKey);
    }
  };

  const handleRefreshOrders = () => {
    const tabKey = `orders-${user?.id}`;
    loadedTabs.current.delete(tabKey);
    loadOrders();
    loadedTabs.current.add(tabKey);
  };

  const handleRefreshNotifications = () => {
    const tabKey = `notifications-${user?.id}`;
    loadedTabs.current.delete(tabKey);
    loadNotifications();
    loadedTabs.current.add(tabKey);
  };

  if (isLoading) {
    return (
      <>
        <PageHeader />
        <div style={styles.loadingContainer}>
          <LoadingSpinner text="Đang tải thông tin tài khoản..." size="large" />
        </div>
      </>
    );
  }

  if (!user) {
    return null;
  }

  const getAvatarText = (username: string) => {
    if (!username) return "U";
    return username.charAt(0).toUpperCase();
  };

  const renderContent = () => {
    switch (activeTab) {
      case "account":
        return (
          <AccountInfo
            user={user}
            onUserUpdate={setUser}
            userStats={userStats}
          />
        );
      case "orders":
        return (
          <OrderHistory
            orders={orders}
            isLoading={ordersLoading}
            onRefresh={handleRefreshOrders}
          />
        );
      case "notifications":
        return (
          <NotificationList
            userId={user.id}
          />
        );
      case "password":
        return <ChangePassword userId={user.id} />;
      default:
        return <AccountInfo user={user} onUserUpdate={setUser} userStats={{
          orders: 0,
          ordered: 0,
          shipping: 0,
          completed: 0
        }} />;
    }
  };

  return (
    <div>
      <PageHeader />

      <div style={styles.welcomeBanner}>
        <div
          style={{
            ...styles.bannerContent,
            padding: getResponsivePadding(),
          }}
        >
          <div style={styles.welcomeContainer}>
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

      <div
        style={{
          ...styles.pageContainer,
          padding: getResponsivePadding(),
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: isHydrated && isMobile ? "1fr" : "300px 1fr",
            gap: spacing.large,
            alignItems: "start",
          }}
        >
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

          <div style={styles.mainContent}>{renderContent()}</div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default function AccountPage() {
  return (
    <Suspense fallback={
      <div style={styles.loadingContainer}>
        <LoadingSpinner text="Đang tải..." size="large" />
      </div>
    }>
      <AccountPageContent />
    </Suspense>
  );
}

const styles = {
  loadingContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "50vh",
  },
  welcomeBanner: {
    background: "linear-gradient(135deg, #4a90e2 0%, #357abd 100%)",
    color: "white",
    marginBottom: "32px",
  },
  bannerContent: {
    maxWidth: "1400px",
    margin: "0 auto",
    padding: "32px 5vw",
  },
  welcomeContainer: {
    display: "flex",
    alignItems: "center",
    gap: "20px",
  },
  bannerAvatar: {
    width: "80px",
    height: "80px",
    borderRadius: "50%",
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    border: "3px solid rgba(255, 255, 255, 0.3)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "32px",
    fontWeight: "bold",
    color: "white",
    flexShrink: 0,
  },
  welcomeText: {
    textAlign: "left" as const,
    flex: 1,
  },
  welcomeTitle: {
    fontSize: "28px",
    fontWeight: "bold",
    margin: "0 0 8px 0",
  },
  welcomeSubtitle: {
    fontSize: "16px",
    opacity: 0.9,
    margin: 0,
  },
  pageContainer: {
    maxWidth: "1400px",
    margin: "0 auto",
    padding: "32px 5vw",
    marginBottom: "30px",
  },
  sidebarContainer: {
    position: "sticky" as const,
    top: "32px",
  },
  mobileTabNav: {
    marginBottom: "24px",
  },
  mobileSelect: {
    width: "100%",
    padding: "12px",
    fontSize: "16px",
    border: "1px solid #d1d5db",
    borderRadius: "8px",
    backgroundColor: "white",
  },
  mainContent: {
    minHeight: "500px",
  },
};
