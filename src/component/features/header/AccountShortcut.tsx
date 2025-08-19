'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useClickOutside } from '@/hooks/useClickOutside';
import { useToggle } from '@/hooks/useToggle';
import UserInfoDisplay from '@/component/features/account/UserInfoHeader';
import AccountMenuList from '@/component/features/account/AccountMenuList';
import LogoutButton from '@/component/features/account/LogoutButton';

interface AccountShortcutProps {
  user: {
    id: string;
    username: string;
    email: string;
  } | null;
  onLogout: () => void;
  isDesktop?: boolean;
  isTablet?: boolean; // Thêm prop này
  children: React.ReactNode;
}

export default function AccountShortcut({ 
  user, 
  onLogout, 
  isDesktop = false,
  isTablet = false, // Default false
  children 
}: AccountShortcutProps) {
  const [isOpen, toggleOpen, setOpen] = useToggle(false);
  const dropdownRef = useClickOutside<HTMLDivElement>(() => setOpen(false), isOpen);
  const router = useRouter();

  const handleToggle = () => {
    if (!isDesktop) {
      toggleOpen();
    }
  };

  const handleMouseEnter = () => {
    if (isDesktop) {
      setOpen(true);
    }
  };

  const handleMouseLeave = () => {
    if (isDesktop) {
      setOpen(false);
    }
  };

  const handleMenuItemClick = (path: string) => {
    router.push(path);
    setOpen(false);
  };

  const handleLogout = () => {
    onLogout();
    setOpen(false);
  };

  if (!user) {
    return null;
  }

  return (
    <div 
      ref={dropdownRef}
      style={styles.container}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Wrapper để ẩn text trên tablet */}
      <div 
        style={styles.triggerWrapper} 
        onClick={handleToggle}
        title={isTablet ? 'Tài khoản' : undefined} // Thêm tooltip cho tablet
      >
        {isTablet ? (
          // Chỉ hiển thị icon trên tablet
          <div style={styles.tabletTrigger}>
            <img src="/images/icons/account.png" alt="Account" style={styles.tabletIcon} />
          </div>
        ) : (
          children
        )}
      </div>

      {/* Dropdown Menu */}
      {isOpen && (
        <div style={{
          ...styles.dropdown,
        }}>
          <UserInfoDisplay user={user} variant="compact" />
          <div style={styles.divider} />
          <AccountMenuList
            onItemClick={handleMenuItemClick}
            variant="dropdown"
          />
          <div style={styles.divider} />
          <div style={styles.actionSection}>
            {isDesktop && (
              <button
                style={styles.viewAllButton}
                onClick={() => handleMenuItemClick('/account')}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#e6f3ff';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#f0f8ff';
                }}
              >
                <span style={styles.viewAllIcon}>📋</span>
                <span style={styles.viewAllText}>Xem tất cả</span>
              </button>
            )}
            <LogoutButton onLogout={handleLogout} variant="dropdown" />
          </div>
        </div>
      )}
    </div>
  );
}

// Styles giữ nguyên...
const styles = {
  container: {
    position: 'relative' as const,
    display: 'inline-block',
  },
  triggerWrapper: {
    cursor: 'pointer',
  },
  dropdown: {
    position: 'absolute' as const,
    top: '100%',
    right: '0',
    backgroundColor: '#ffffff',
    border: '1px solid #e5e7eb',
    borderRadius: '12px',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.15)',
    zIndex: 1000,
    minWidth: '280px',
    overflow: 'hidden',
    marginTop: '3px',
  },
  divider: {
    height: '1px',
    backgroundColor: '#e5e7eb',
  },
  actionSection: {
    padding: '8px',
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '4px',
  },
  viewAllButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    width: '100%',
    padding: '10px 12px',
    backgroundColor: '#f0f8ff',
    border: '1px solid #bfdbfe',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  },
  viewAllIcon: {
    fontSize: '14px',
  },
  viewAllText: {
    fontSize: '13px',
    color: '#1e40af',
    fontWeight: '600',
  },
  tabletTrigger: {
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    transition: 'background-color 0.2s ease',
    padding: '8px',
    borderRadius: '4px',
  },
  tabletIcon: {
    width: '28px',
    height: '28px',
  },
};