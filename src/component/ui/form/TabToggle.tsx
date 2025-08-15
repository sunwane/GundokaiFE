import React from 'react';
import { ThemeMode, getTheme } from '@/types/Theme';

interface TabOption {
  value: string;
  label: string;
}

interface TabToggleProps {
  options: TabOption[];
  activeTab: string;
  mode?: ThemeMode; // ✅ Light hoặc dark
  onTabChange: (tab: string) => void;
}

export default function TabToggle({ 
  options, 
  activeTab, 
  mode = 'light', // ✅ Default light
  onTabChange 
}: TabToggleProps) {
  const theme = getTheme(mode);
  const styles = getStyles(theme, mode);
  
  return (
    <div style={styles.tabsList}>
      {options.map((option) => (
        <button
          key={option.value}
          style={{
            ...styles.tabsTrigger,
            ...(activeTab === option.value ? styles.tabsTriggerActive : {})
          }}
          className={`tab-button tab-button-${mode} ${activeTab === option.value ? 'active' : ''}`}
          onClick={() => onTabChange(option.value)}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}

// ✅ Helper function để tạo màu tối hơn
function darkenColor(color: string, amount: number = 0.1, mode: ThemeMode = 'light'): string {
  // Nếu là rgba
  if (color.startsWith('rgba')) {
    const match = color.match(/rgba\((\d+),\s*(\d+),\s*(\d+),\s*([\d.]+)\)/);
    if (match) {
      const [, r, g, b, a] = match;
      const newR = Math.max(0, parseInt(r) * (1 - amount));
      const newG = Math.max(0, parseInt(g) * (1 - amount));
      const newB = Math.max(0, parseInt(b) * (1 - amount));
      return `rgba(${Math.round(newR)}, ${Math.round(newG)}, ${Math.round(newB)}, ${a})`;
    }
  }
  
  // Nếu là rgb
  if (color.startsWith('rgb')) {
    const match = color.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
    if (match) {
      const [, r, g, b] = match;
      const newR = Math.max(0, parseInt(r) * (1 - amount));
      const newG = Math.max(0, parseInt(g) * (1 - amount));
      const newB = Math.max(0, parseInt(b) * (1 - amount));
      return `rgb(${Math.round(newR)}, ${Math.round(newG)}, ${Math.round(newB)})`;
    }
  }
  
  // Nếu là hex
  if (color.startsWith('#')) {
    const hex = color.replace('#', '');
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);
    
    const newR = Math.max(0, Math.round(r * (1 - amount)));
    const newG = Math.max(0, Math.round(g * (1 - amount)));
    const newB = Math.max(0, Math.round(b * (1 - amount)));
    
    return `#${newR.toString(16).padStart(2, '0')}${newG.toString(16).padStart(2, '0')}${newB.toString(16).padStart(2, '0')}`;
  }
  
  // Fallback cho các trường hợp khác
  return mode === 'dark' ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.08)';
}

function getStyles(theme: any, mode: ThemeMode) {
  return {
    tabsList: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      backgroundColor: theme.tabBackground,
      borderRadius: '0.5rem',
      padding: '0.25rem',
      marginBottom: '1rem',
      border: `1px solid ${theme.inputBorder}`,
    },
    tabsTrigger: {
      padding: '0.5rem 1rem',
      backgroundColor: 'transparent',
      border: 'none',
      color: theme.tabText,
      cursor: 'pointer',
      borderRadius: '0.375rem',
      fontSize: '0.875rem',
      fontWeight: '500',
      transition: 'all 0.2s ease',
    },
    tabsTriggerActive: {
      backgroundColor: theme.tabActiveBackground,
      color: theme.tabActiveText,
      boxShadow: '0 2px 4px rgba(59, 130, 246, 0.2)',
    },
    // ✅ Động tạo hover colors
    tabsTriggerHover: {
      backgroundColor: darkenColor(theme.tabBackground, 0.15, mode), // Tối hơn 15%
    },
  };
}

// ✅ CSS với màu hover được tính động
if (typeof document !== 'undefined') {
  // Remove old style if exists
  const existingStyle = document.getElementById('tab-toggle-hover-styles');
  if (existingStyle) {
    existingStyle.remove();
  }

  const style = document.createElement('style');
  style.id = 'tab-toggle-hover-styles';
  style.textContent = `
    .tab-button:hover:not(.active) {
      transition: all 0.2s ease !important;
    }
    
    .tab-button-light:hover:not(.active) {
      background-color: rgba(0, 0, 0, 0.12) !important;
    }
    
    .tab-button-dark:hover:not(.active) {
      background-color: rgba(255, 255, 255, 0.20) !important;
    }

    /* ✅ Hover effect cho container background */
    .tab-button-light:hover:not(.active) {
      background-color: var(--tab-hover-light, rgba(0, 0, 0, 0.12)) !important;
    }
    
    .tab-button-dark:hover:not(.active) {
      background-color: var(--tab-hover-dark, rgba(255, 255, 255, 0.20)) !important;
    }
  `;
  document.head.appendChild(style);
}