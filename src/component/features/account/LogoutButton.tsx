import React from 'react';

interface LogoutButtonProps {
  onLogout: () => void;
  variant?: 'sidebar' | 'dropdown';
  showInSection?: boolean;
}

export default function LogoutButton({ 
  onLogout, 
  variant = 'dropdown',
  showInSection = false 
}: LogoutButtonProps) {
  const isSidebar = variant === 'sidebar';

  const containerStyle = isSidebar && showInSection ? styles.sidebarSection : {};
  const buttonStyle = isSidebar ? styles.sidebarButton : styles.dropdownButton;

  return (
    <div style={containerStyle}>
      <button
        onClick={onLogout}
        style={buttonStyle}
        onMouseEnter={(e) => {
          if (!isSidebar) {
            e.currentTarget.style.backgroundColor = '#fee';
          }
        }}
        onMouseLeave={(e) => {
          if (!isSidebar) {
            e.currentTarget.style.backgroundColor = 'transparent';
          }
        }}
      >
        <span style={styles.logoutIcon}>🚪</span>
        <span style={isSidebar ? styles.sidebarLabel : styles.dropdownLabel}>
          Đăng xuất
        </span>
      </button>
    </div>
  );
}

const styles = {
  // Sidebar variant
  sidebarSection: {
    padding: '0 0 20px 0',
    borderTop: '1px solid #e5e7eb',
    margin: '20px 0 0 0',
  },
  sidebarButton: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '16px 24px',
    backgroundColor: 'transparent',
    border: 'none',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    textAlign: 'left' as const,
    color: '#dc2626',
    fontSize: '15px',
    fontWeight: '500',
    marginTop: '20px',
  },
  sidebarLabel: {
    flex: 1,
  },

  // Dropdown variant
  dropdownButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    width: '100%',
    padding: '10px 12px',
    background: 'none',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  },
  dropdownLabel: {
    fontSize: '13px',
    color: '#dc2626',
    fontWeight: '600',
  },

  // Common
  logoutIcon: {
    fontSize: '14px',
  },
};