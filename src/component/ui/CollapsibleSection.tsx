import React, { useState } from 'react';

interface CollapsibleSectionProps {
  title: string;
  defaultCollapsed?: boolean;
  children: React.ReactNode;
}

export default function CollapsibleSection({ 
  title, 
  defaultCollapsed = false, 
  children 
}: CollapsibleSectionProps) {
  const [isCollapsed, setIsCollapsed] = useState(defaultCollapsed);

  return (
    <div style={styles.section}>
      <button 
        onClick={() => setIsCollapsed(!isCollapsed)}
        style={styles.header}
      >
        <span style={styles.title}>{title}</span>
        <span style={styles.icon}>
          {isCollapsed ? '▼' : '▲'}
        </span>
      </button>
      {!isCollapsed && (
        <div style={styles.content}>
          {children}
        </div>
      )}
    </div>
  );
}

const styles = {
  section: {
    borderBottom: '1px solid #f0f3f7',
  },
  header: {
    width: '100%',
    background: 'none',
    border: 'none',
    padding: '20px 24px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    cursor: 'pointer',
    transition: 'background-color 0.2s ease',
    backgroundColor: '#fafbfc',
  },
  title: {
    fontSize: '13px',
    fontWeight: '700',
    color: '#081945',
    letterSpacing: '0.8px',
    textTransform: 'uppercase' as const,
  },
  icon: {
    fontSize: '12px', 
    color: '#081945',
    fontWeight: 'bold',
    transition: 'transform 0.2s ease',
  },
  content: {
    padding: '0 24px 24px 24px',
    backgroundColor: '#ffffff',
  },
};