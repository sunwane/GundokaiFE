'use client';
import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import UserInfoDisplay from '@/component/features/account/UserInfoDisplay';
import AccountMenuList from '@/component/features/account/AccountMenuList';
import LogoutButton from '@/component/features/account/LogoutButton';

interface AccountShortcutProps {
  user: {
    id: number;
    username: string;
    email: string;
  } | null;
  onLogout: () => void;
  isDesktop?: boolean;
  children: React.ReactNode; // Trigger element passed from parent
}

export default function AccountShortcut({ user, onLogout, isDesktop = true, children }: AccountShortcutProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleToggle = () => {
    if (!isDesktop) {
      setIsOpen(!isOpen);
    }
  };

  const handleMouseEnter = () => {
    if (isDesktop) {
      setIsOpen(true);
    }
  };

  const handleMouseLeave = () => {
    if (isDesktop) {
      setIsOpen(false);
    }
  };

  const handleMenuItemClick = (path: string) => {
    router.push(path);
    setIsOpen(false);
  };

  const handleLogout = () => {
    onLogout();
    setIsOpen(false);
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
      {/* Trigger Button - now passed as children */}
      <div onClick={handleToggle} style={styles.triggerWrapper}>
        {children}
      </div>

      {/* Dropdown Menu */}
      {isOpen && (
        <div style={styles.dropdown}>
          {/* User Info Section */}
          <UserInfoDisplay user={user} variant="compact" />

          <div style={styles.divider} />

          {/* Menu Items */}
          <AccountMenuList
            onItemClick={handleMenuItemClick}
            variant="dropdown"
          />

          <div style={styles.divider} />

          {/* Action Buttons */}
          <div style={styles.actionSection}>
            {/* View All Button - Only show on desktop */}
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

            {/* Logout Button */}
            <LogoutButton onLogout={handleLogout} variant="dropdown" />
          </div>
        </div>
      )}
    </div>
  );
}

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
    marginTop: '8px',
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
};