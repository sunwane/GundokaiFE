import React from 'react';
import { Account } from '@/types/Account';

interface UserInfoDisplayProps {
  user: Omit<Account, 'password'>;
}

export default function UserInfoDisplay({ user }: UserInfoDisplayProps) {
  const getGenderText = (gender: string) => {
    switch (gender) {
      case 'male': return 'Nam';
      case 'female': return 'Nữ';
      default: return 'Khác';
    }
  };

  return (
    <div style={styles.infoGrid}>
      <div style={styles.infoItem}>
        <label style={styles.infoLabel}>ID</label>
        <div style={styles.infoValue}>{user.id}</div>
      </div>
      
      <div style={styles.infoItem}>
        <label style={styles.infoLabel}>Tên đăng nhập</label>
        <div style={styles.infoValue}>{user.username}</div>
      </div>
      
      <div style={styles.infoItem}>
        <label style={styles.infoLabel}>Email</label>
        <div style={styles.infoValue}>{user.email}</div>
      </div>
      
      <div style={styles.infoItem}>
        <label style={styles.infoLabel}>Giới tính</label>
        <div style={styles.infoValue}>{getGenderText(user.gender)}</div>
      </div>
    </div>
  );
}

const styles = {
  infoGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '24px',
  },
  infoItem: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '8px',
  },
  infoLabel: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#6b7280',
    textTransform: 'uppercase' as const,
    letterSpacing: '0.5px',
  },
  infoValue: {
    padding: '12px 16px',
    backgroundColor: '#f9fafb',
    border: '1px solid #e5e7eb',
    borderRadius: '8px',
    fontSize: '16px',
    color: '#1f2937',
    fontWeight: '500',
  },
};