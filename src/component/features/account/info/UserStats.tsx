import React from 'react';

interface UserStatsProps {
  stats: {
    orders: number;
    ordered: number;
    shipping: number;
  };
}

export default function UserStats({ stats }: UserStatsProps) {
  return (
    <div style={styles.statsGrid}>
      <div style={styles.statCard}>
        <div style={styles.statNumber}>{stats.orders}</div>
        <div style={styles.statLabel}>Tổng số đơn hàng</div>
      </div>
      <div style={styles.statCard}>
        <div style={styles.statNumber}>{stats.ordered}</div>
        <div style={styles.statLabel}>Đơn hàng đã đặt</div>
      </div>
      <div style={styles.statCard}>
        <div style={styles.statNumber}>{stats.shipping}</div>
        <div style={styles.statLabel}>Đơn hàng đang giao</div>
      </div>
    </div>
  );
}

const styles = {
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '16px',
    marginBottom: '32px',
  },
  statCard: {
    background: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)',
    padding: '20px',
    borderRadius: '12px',
    border: '1px solid #bfdbfe',
    textAlign: 'center' as const,
  },
  statNumber: {
    fontSize: '28px',
    fontWeight: 'bold',
    color: '#1e40af',
    margin: '0 0 4px 0',
  },
  statLabel: {
    fontSize: '14px',
    color: '#3b82f6',
    fontWeight: '500',
  },
};