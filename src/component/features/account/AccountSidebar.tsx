import React from 'react';
import { Account } from '@/types/Account';
import UserInfoDisplay from '@/component/features/account/UserInfoDisplay';
import AccountMenuList from '@/component/features/account/AccountMenuList';
import LogoutButton from '@/component/features/account/LogoutButton';

interface AccountSidebarProps {
  user: Omit<Account, 'password'>;
  activeTab: string;
  onTabChange: (tab: string) => void;
  onLogout: () => void;
}

export default function AccountSidebar({ user, activeTab, onTabChange, onLogout }: AccountSidebarProps) {
  const handleMenuItemClick = (path: string, tabId?: string) => {
    if (tabId) {
      onTabChange(tabId);
    }
  };

  return (
    <div style={styles.sidebar}>
      {/* User Info Header */}
      <UserInfoDisplay 
        user={user} 
        variant="full" 
        showBadge={true} 
      />

      {/* Menu Items */}
      <AccountMenuList
        activeTab={activeTab}
        onItemClick={handleMenuItemClick}
        variant="sidebar"
        showTitle={true}
      />

      {/* Logout Button */}
      <LogoutButton 
        onLogout={onLogout} 
        variant="sidebar" 
        showInSection={true} 
      />
    </div>
  );
}

const styles = {
  sidebar: {
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    boxShadow: '0 8px 25px rgba(0, 0, 0, 0.1)',
    border: '1px solid #e5e7eb',
    overflow: 'hidden',
    height: 'fit-content',
  },
};