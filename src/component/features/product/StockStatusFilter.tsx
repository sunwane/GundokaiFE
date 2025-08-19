import React from 'react';
import { StockStatus } from '@/types/Product';

interface StockStatusFilterProps {
  selectedStatuses: StockStatus[];
  onStatusChange: (statuses: StockStatus[]) => void;
}

const stockOptions = [
  { key: 'Tất cả' as StockStatus, label: 'Tất cả', color: '#6c757d' },
  { key: 'Còn hàng' as StockStatus, label: 'Còn hàng', color: '#28a745' },
  { key: 'Hết hàng' as StockStatus, label: 'Hết hàng', color: '#dc3545' },
  { key: 'Hàng sắp về' as StockStatus, label: 'Hàng sắp về', color: '#ffc107' },
];

export default function StockStatusFilter({ 
  selectedStatuses, 
  onStatusChange 
}: StockStatusFilterProps) {

  const handleStatusChange = (status: StockStatus) => {
    if (status === 'Tất cả') {
      onStatusChange(['Tất cả']);
      return;
    }

    let newStatuses = [...selectedStatuses];
    newStatuses = newStatuses.filter(s => s !== 'Tất cả');
    
    if (newStatuses.includes(status)) {
      newStatuses = newStatuses.filter(s => s !== status);
    } else {
      newStatuses.push(status);
    }

    if (newStatuses.length === 0) {
      newStatuses = ['Tất cả'];
    }

    onStatusChange(newStatuses);
  };

  return (
    <div style={styles.container}>
      {stockOptions.map((option) => (
        <label key={option.key} style={styles.checkboxLabel}>
          <input
            type="checkbox"
            checked={selectedStatuses.includes(option.key)}
            onChange={() => handleStatusChange(option.key)}
            style={styles.checkbox}
          />
          <span style={{
            ...styles.checkboxCustom,
            borderColor: selectedStatuses.includes(option.key) ? option.color : '#ddd',
            backgroundColor: selectedStatuses.includes(option.key) ? option.color + '15' : '#fff'
          }}>
            {selectedStatuses.includes(option.key) && 
              <span style={{ ...styles.checkmark, color: option.color }}>✓</span>
            }
          </span>
          <span style={styles.statusLabel}>{option.label}</span>
          <span style={{ ...styles.statusDot, backgroundColor: option.color }}></span>
        </label>
      ))}
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '8px',
  },
  checkboxLabel: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    cursor: 'pointer',
    padding: '12px 16px',
    borderRadius: '8px',
    transition: 'background-color 0.2s ease',
    backgroundColor: '#f8f9fa',
    border: '1px solid transparent',
  },
  checkbox: {
    display: 'none',
  },
  checkboxCustom: {
    width: '20px',
    height: '20px',
    border: '2px solid #ddd',
    backgroundColor: '#fff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '12px',
    borderRadius: '4px',
    transition: 'all 0.3s ease',
  },
  checkmark: {
    fontWeight: 'bold',
    fontSize: '14px',
  },
  statusLabel: {
    fontSize: '14px',
    color: '#081945',
    fontWeight: '500',
    flex: 1,
  },
  statusDot: {
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    marginLeft: 'auto',
  },
};