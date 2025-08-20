import React from 'react';
import { Account } from '@/types/Account';

interface UserInfoDisplayProps {
  user: Omit<Account, 'password'>;
}

export default function UserInfoDisplay({ user }: UserInfoDisplayProps) {
  const getGenderText = (gender: string) => {
    switch (gender) {
      case 'MALE': return 'Nam';
      case 'FEMALE': return 'Nữ';
      default: return 'Other';
    }
  };

  return (
    <div style={styles.infoGrid}>      
      <div style={styles.infoItem}>
        <label style={styles.infoLabel}>Tên đăng nhập</label>
        <div style={styles.infoValue}>{user.username}</div>
      </div>
      
      <div style={styles.infoItem}>
        <label style={styles.infoLabel}>Giới tính</label>
        <div style={styles.infoValue}>{getGenderText(user.gender)}</div>
      </div>

      <div style={{ ...styles.infoItem, ...styles.fullWidth }}>
        <label style={styles.infoLabel}>Email</label>
        <div style={styles.infoValue}>{user.email}</div>
      </div>

      {/* ✅ Thêm ghi chú về việc không thể thay đổi email và giới tính */}
      <div style={{ ...styles.infoItem, ...styles.fullWidth }}>
        <div style={styles.infoNote}>
          <span style={styles.noteIcon}>ℹ️</span>
          <span style={styles.noteText}>
            Email và giới tính không thể thay đổi. Chỉ có thể cập nhật tên đăng nhập.
          </span>
        </div>
      </div>
    </div>
  );
}

const styles = {
  infoGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '24px',
    marginTop: '24px',
  },
  infoItem: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '6px',
  },
  fullWidth: {
    gridColumn: '1 / -1',
  },
  infoLabel: {
    fontSize: '13px',
    fontWeight: '600',
    color: '#6b7280',
    textTransform: 'uppercase' as const,
    letterSpacing: '0.5px',
  },
  infoValue: {
    fontSize: '16px',
    fontWeight: '500',
    color: '#1f2937',
    padding: '12px 16px',
    backgroundColor: '#f9fafb',
    border: '1px solid #e5e7eb',
    borderRadius: '8px',
  },
  // ✅ Styles cho info note
  infoNote: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '12px 16px',
    backgroundColor: '#eff6ff',
    border: '1px solid #bfdbfe',
    borderRadius: '8px',
    marginTop: '8px',
  },
  noteIcon: {
    fontSize: '16px',
  },
  noteText: {
    fontSize: '13px',
    color: '#1e40af',
    fontStyle: 'italic' as const,
  },
};