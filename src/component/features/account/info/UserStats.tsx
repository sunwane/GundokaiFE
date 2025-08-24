import React from "react";

interface UserStatsProps {
  stats: {
    orders: number;
    ordered: number;
    shipping: number;
    completed: number; // ✅ Required thay vì optional
  };
}

// UserStats.tsx
export default function UserStats({ stats }: UserStatsProps) {
  // ✅ Debug props
  // console.log("=== USER STATS DEBUG ===");
  // console.log("stats prop:", stats);
  // console.log("stats type:", typeof stats);

  // ✅ Safe fallback
  const safeStats = stats || {
    orders: 0,
    ordered: 0,
    shipping: 0,
    completed: 0,
  };

  // console.log("safeStats:", safeStats);

  return (
    <div style={styles.statsGrid}>
      <div style={styles.statCard}>
        <div style={styles.statNumber}>{safeStats.orders}</div>
        <div style={styles.statLabel}>Tổng số đơn hàng</div>
      </div>
      <div style={styles.statCard}>
        <div style={styles.statNumber}>{safeStats.ordered}</div>
        <div style={styles.statLabel}>Đơn hàng chờ xử lý</div>
      </div>
      <div style={styles.statCard}>
        <div style={styles.statNumber}>{safeStats.shipping}</div>
        <div style={styles.statLabel}>Đơn hàng đang giao</div>
      </div>
      <div style={styles.statCard}>
        <div style={styles.statNumber}>{safeStats.completed}</div>
        <div style={styles.statLabel}>Đơn hàng hoàn thành</div>
      </div>
    </div>
  );
}

const styles = {
  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "16px",
    marginBottom: "32px",
  },
  statCard: {
    background: "linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)",
    padding: "20px",
    borderRadius: "12px",
    border: "1px solid #bfdbfe",
    textAlign: "center" as const,
  },
  statNumber: {
    fontSize: "28px",
    fontWeight: "bold",
    color: "#1e40af",
    margin: "0 0 4px 0",
  },
  statLabel: {
    fontSize: "14px",
    color: "#3b82f6",
    fontWeight: "500",
  },
};
