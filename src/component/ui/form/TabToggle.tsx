import React from 'react';

interface TabOption {
  value: string;
  label: string;
}

interface TabToggleProps {
  options: TabOption[];
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export default function TabToggle({ options, activeTab, onTabChange }: TabToggleProps) {
  return (
    <div style={styles.tabsList}>
      {options.map((option) => (
        <button
          key={option.value}
          style={{
            ...styles.tabsTrigger,
            ...(activeTab === option.value ? styles.tabsTriggerActive : {})
          }}
          onClick={() => onTabChange(option.value)}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}

const styles = {
  tabsList: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    backgroundColor: 'rgba(0, 0, 0, 0.05)', // Nền xám nhạt thay vì trắng trong suốt
    borderRadius: '0.5rem',
    padding: '0.25rem',
    marginBottom: '1rem',
    border: '1px solid rgba(0, 0, 0, 0.1)',
  },
  tabsTrigger: {
    padding: '0.5rem 1rem',
    backgroundColor: 'transparent',
    border: 'none',
    color: '#6b7280', // Màu xám đậm thay vì trắng
    cursor: 'pointer',
    borderRadius: '0.375rem',
    fontSize: '0.875rem',
    fontWeight: '500',
    transition: 'all 0.2s ease',
  },
  tabsTriggerActive: {
    backgroundColor: '#3b82f6', // Giữ màu xanh cho tab active
    color: 'white',
    boxShadow: '0 2px 4px rgba(59, 130, 246, 0.2)',
  },
};

// Add hover effects
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = `
    button:hover:not([style*="background-color: rgb(59, 130, 246)"]) {
      background-color: rgba(0, 0, 0, 0.05) !important;
      color: #374151 !important;
    }
  `;
  document.head.appendChild(style);
}