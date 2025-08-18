import React from 'react';

interface UserInfoHeaderProps {
  user: {
    username: string;
    email: string;
  };
  variant?: 'compact' | 'full';
  showBadge?: boolean;
}

export default function UserInfoHeader({ 
  user, 
  variant = 'compact', 
  showBadge = false 
}: UserInfoHeaderProps) {
  const isCompact = variant === 'compact';

  return (
    <div style={isCompact ? styles.compactContainer : styles.fullContainer}>
      <div style={isCompact ? styles.compactAvatar : styles.fullAvatar}>
        <span style={isCompact ? styles.compactAvatarText : styles.fullAvatarText}>
          {user.username.charAt(0).toUpperCase()}
        </span>
      </div>
      <div style={styles.userInfo}>
        <div style={isCompact ? styles.compactDisplayName : styles.fullDisplayName}>
          {user.username}
        </div>
        <div style={isCompact ? styles.compactEmail : styles.fullEmail}>
          {user.email}
        </div>
      </div>
    </div>
  );
}

const styles = {
  // Compact variant (for AccountShortcut)
  compactContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '16px 20px',
    backgroundColor: '#f8fafc',
  },
  compactAvatar: {
    width: '48px',
    height: '48px',
    borderRadius: '50%',
    backgroundColor: '#3b82f6',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  compactAvatarText: {
    color: 'white',
    fontSize: '18px',
    fontWeight: 'bold',
  },
  compactDisplayName: {
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: '2px',
  },
  compactEmail: {
    fontSize: '12px',
    color: '#6b7280',
  },

  // Full variant (for AccountSidebar)
  fullContainer: {
    background: 'linear-gradient(135deg, #3b82f6 0%, #1e40af 100%)',
    color: 'white',
    padding: '24px',
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
  },
  fullAvatar: {
    width: '60px',
    height: '60px',
    borderRadius: '50%',
    overflow: 'hidden',
    border: '3px solid rgba(255, 255, 255, 0.3)',
  },
  fullAvatarText: {
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '24px',
    fontWeight: 'bold',
  },
  fullDisplayName: {
    fontSize: '18px',
    fontWeight: 'bold',
    margin: '0 0 4px 0',
  },
  fullEmail: {
    fontSize: '14px',
    margin: '0 0 8px 0',
    opacity: 0.9,
  },

  // Common
  userInfo: {
    flex: 1,
  },
};