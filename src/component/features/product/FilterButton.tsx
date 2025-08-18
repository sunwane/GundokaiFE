import React from 'react';

interface FilterButtonProps {
  onClick: () => void;
  filterCount?: number;
}

export default function FilterButton({ onClick, filterCount = 0 }: FilterButtonProps) {
  return (
    <button onClick={onClick} style={styles.filterButton}>
      <div style={styles.filterIcon}>
        <span style={styles.iconText}>⚙️</span>
        {filterCount > 0 && (
          <span style={styles.badge}>{filterCount}</span>
        )}
      </div>
      <span style={styles.buttonText}>BỘ LỌC</span>
    </button>
  );
}

const styles = {
  filterButton: {
    position: 'fixed' as const,
    bottom: '20px',
    right: '20px',
    backgroundColor: '#6c5ce7',
    color: 'white',
    border: 'none',
    borderRadius: '50px',
    padding: '12px 20px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    cursor: 'pointer',
    boxShadow: '0 4px 12px rgba(108, 92, 231, 0.4)',
    zIndex: 100,
    fontSize: '14px',
    fontWeight: 'bold',
    letterSpacing: '0.5px',
    transition: 'all 0.3s ease',
  },
  filterIcon: {
    position: 'relative' as const,
  },
  iconText: {
    fontSize: '16px',
  },
  badge: {
    position: 'absolute' as const,
    top: '-8px',
    right: '-8px',
    backgroundColor: '#ff6b35',
    color: 'white',
    borderRadius: '50%',
    width: '20px',
    height: '20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '10px',
    fontWeight: 'bold',
  },
  buttonText: {
    fontSize: '14px',
    fontWeight: 'bold',
  },
};