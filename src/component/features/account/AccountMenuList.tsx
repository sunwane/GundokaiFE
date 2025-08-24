import React from "react";

interface MenuItem {
  id: string;
  label: string;
  icon: string;
  path: string;
}

interface AccountMenuListProps {
  activeTab?: string;
  onItemClick: (path: string, tabId?: string) => void;
  variant?: "sidebar" | "dropdown";
  showTitle?: boolean;
}

const menuItems: MenuItem[] = [
  {
    id: "account",
    label: "Thông tin tài khoản",
    icon: "👤",
    path: "/account?tab=account",
  },
  {
    id: "orders",
    label: "Lịch sử đơn hàng",
    icon: "📦",
    path: "/account?tab=orders",
  },
  {
    id: "notifications",
    label: "Thông báo",
    icon: "🔔",
    path: "/account?tab=notifications",
  },
  {
    id: "password",
    label: "Đổi mật khẩu",
    icon: "🔐",
    path: "/account?tab=password",
  },
];

export default function AccountMenuList({
  activeTab,
  onItemClick,
  variant = "dropdown",
  showTitle = false,
}: AccountMenuListProps) {
  const isSidebar = variant === "sidebar";

  const handleItemClick = (item: MenuItem) => {
    if (isSidebar) {
      onItemClick(item.path, item.id);
    } else {
      onItemClick(item.path);
    }
  };

  return (
    <div style={isSidebar ? styles.sidebarSection : styles.dropdownSection}>
      {showTitle && isSidebar && (
        <h4 style={styles.menuTitle}>Quản lý tài khoản</h4>
      )}
      <div style={styles.menuList}>
        {menuItems.map((item) => (
          <button
            key={item.id}
            style={{
              ...(isSidebar ? styles.sidebarItem : styles.dropdownItem),
              ...(isSidebar && activeTab === item.id
                ? styles.sidebarItemActive
                : {}),
            }}
            onClick={() => handleItemClick(item)}
            onMouseEnter={(e) => {
              if (!isSidebar) {
                e.currentTarget.style.backgroundColor = "#f0f8ff";
              }
            }}
            onMouseLeave={(e) => {
              if (!isSidebar) {
                e.currentTarget.style.backgroundColor = "transparent";
              }
            }}
          >
            <span style={styles.menuIcon}>{item.icon}</span>
            <span style={styles.menuLabel}>{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

const styles = {
  // Sidebar variant
  sidebarSection: {
    padding: "20px 0",
  },
  sidebarItem: {
    width: "100%",
    padding: "12px 16px",
    backgroundColor: "transparent",
    borderLeft: "none",
    borderTop: "none",
    borderBottom: "none",
    borderRight: "3px solid transparent",
    borderRadius: "0",
    fontSize: "14px",
    fontWeight: "500",
    color: "#4b5563",
    cursor: "pointer",
    transition: "all 0.2s ease",
    display: "flex",
    alignItems: "center",
    gap: "12px",
    textAlign: "left" as const,
  },
  sidebarItemActive: {
    backgroundColor: "#eff6ff",
    color: "#2563eb",
    borderRight: "3px solid #2563eb",
  },

  // Dropdown variant
  dropdownSection: {
    padding: "8px 0",
  },
  dropdownItem: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    width: "100%",
    padding: "12px 20px",
    background: "none",
    border: "none",
    cursor: "pointer",
    transition: "all 0.2s ease",
    textAlign: "left" as const,
  },

  // Common
  menuTitle: {
    fontSize: "14px",
    fontWeight: "600",
    color: "#6b7280",
    textTransform: "uppercase" as const,
    letterSpacing: "0.5px",
    margin: "0 0 16px 0",
    padding: "0 24px",
  },
  menuList: {
    display: "flex",
    flexDirection: "column" as const,
  },
  menuIcon: {
    fontSize: "16px",
    width: "20px",
    textAlign: "center" as const,
  },
  menuLabel: {
    flex: 1,
    fontSize: "14px",
    color: "#374151",
    fontWeight: "500",
  },
};
