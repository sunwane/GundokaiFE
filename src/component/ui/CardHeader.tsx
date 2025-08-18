import React from 'react';

interface CardHeaderProps {
  title: string;
  icon: string;
  children?: React.ReactNode;
}

export default function CardHeader({ title, icon, children }: CardHeaderProps) {
  return (
    <div style={styles.header}>
      <h2 style={styles.title}>
        <span style={styles.titleIcon}>{icon}</span>
        {title}
      </h2>
      {children && <div style={styles.headerActions}>{children}</div>}
    </div>
  );
}

const styles = {
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '24px',
    borderBottom: '1px solid #e5e7eb',
    backgroundColor: '#f9fafb',
  },
  title: {
    fontSize: '20px',
    fontWeight: 'bold',
    color: '#1f2937',
    margin: 0,
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  titleIcon: {
    fontSize: '18px',
    color: '#3b82f6',
  },
  headerActions: {
    display: 'flex',
    gap: '8px',
  },
};