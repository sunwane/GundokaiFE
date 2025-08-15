export type ThemeMode = 'light' | 'dark';

export interface ThemeColors {
  // Input colors
  inputBackground: string;
  inputBorder: string;
  inputText: string;
  inputPlaceholder: string;
  inputFocusBorder: string;
  
  // Error states
  errorBorder: string;
  errorBackground: string;
  errorText: string;
  
  // Label & text
  labelText: string;
  
  // Button colors
  primaryButton: string;
  primaryButtonHover: string;
  primaryButtonText: string;
  
  // Tab colors
  tabBackground: string;
  tabActiveBackground: string;
  tabText: string;
  tabActiveText: string;
}

export const lightTheme: ThemeColors = {
  inputBackground: '#ffffff',
  inputBorder: '#d1d5db',
  inputText: '#374151',
  inputPlaceholder: '#9ca3af',
  inputFocusBorder: '#3b82f6',
  errorBorder: '#ef4444',
  errorBackground: 'rgba(239, 68, 68, 0.05)',
  errorText: '#dc2626',
  labelText: '#374151',
  primaryButton: '#3b82f6',
  primaryButtonHover: '#2563eb',
  primaryButtonText: '#ffffff',
  tabBackground: 'rgba(0, 0, 0, 0.05)',
  tabActiveBackground: '#3b82f6',
  tabText: '#6b7280',
  tabActiveText: '#ffffff',
};

// ✅ Dark theme với button sáng như light theme
export const darkTheme: ThemeColors = {
  // ✅ Input colors giữ nguyên dark
  inputBackground: 'rgba(15, 23, 42, 0.8)',
  inputBorder: 'rgba(100, 116, 139, 0.3)',
  inputText: '#e2e8f0',
  inputPlaceholder: 'rgba(148, 163, 184, 0.6)',
  inputFocusBorder: '#3b82f6',

  // ✅ Error states giữ nguyên
  errorBorder: '#f87171',
  errorBackground: 'rgba(248, 113, 113, 0.1)',
  errorText: '#fca5a5',

  // ✅ Label text giữ nguyên
  labelText: '#cbd5e1',

  // ✅ Button colors SÁNG như light theme
  primaryButton: '#3b82f6',        // Same as light theme
  primaryButtonHover: '#2563eb',   // Same as light theme  
  primaryButtonText: '#ffffff',    // Same as light theme

  // ✅ Tab colors với light-style buttons
  tabBackground: 'rgba(15, 23, 42, 0.6)',
  tabActiveBackground: '#3b82f6',  // Same as light theme
  tabText: 'rgba(148, 163, 184, 0.8)',
  tabActiveText: '#ffffff',        // Same as light theme
};

export function getTheme(mode: ThemeMode): ThemeColors {
  return mode === 'dark' ? darkTheme : lightTheme;
}