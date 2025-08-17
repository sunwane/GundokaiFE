import React from 'react';

interface EmptyStateProps {
  icon: string;
  title: string;
  subtitle: string;
  action?: React.ReactNode;
}

export default function EmptyState({ icon, title, subtitle, action }: EmptyStateProps) {
  return (
    <div style={styles.container}>
      <div style={styles.icon}>{icon}</div>
      <h3 style={styles.title}>{title}</h3>
      <p style={styles.subtitle}>{subtitle}</p>
      {action && <div style={styles.action}>{action}</div>}
    </div>
  );
}

const styles = {
  container: {
    textAlign: 'center' as const,
    padding: '60px 20px',
  },
  icon: {
    fontSize: '48px',
    marginBottom: '16px',
  },
  title: {
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#1f2937',
    margin: '0 0 8px 0',
  },
  subtitle: {
    fontSize: '14px',
    color: '#6b7280',
    margin: '0 0 20px 0',
  },
  action: {
    marginTop: '20px',
  },
};