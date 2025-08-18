'use client';
import { useResponsive } from './useResponsive';

export interface PageResponsiveConfig {
  // Breakpoints
  mobileBreakpoint?: number;
  tabletBreakpoint?: number;
  
  // Padding configs
  mobilePadding?: string;
  tabletPadding?: string;
  desktopPadding?: string;
  
  // Grid configs
  mobileColumns?: number;
  tabletColumns?: number;
  desktopColumns?: number;
}

export function usePageResponsive(config: PageResponsiveConfig = {}) {
  const {
    mobileBreakpoint = 768,
    tabletBreakpoint = 1024,
    mobilePadding = '16px 4vw',
    tabletPadding = '20px 4vw',
    desktopPadding = '24px 5vw',
    mobileColumns = 1,
    tabletColumns = 2,
    desktopColumns = 3,
  } = config;

  const { windowWidth, isMobile, isTablet, isDesktop } = useResponsive({
    mobile: mobileBreakpoint,
    tablet: tabletBreakpoint,
  });

  // Get responsive padding
  const getResponsivePadding = () => {
    if (isMobile) return mobilePadding;
    if (isTablet) return tabletPadding;
    return desktopPadding;
  };

  // Get responsive columns
  const getResponsiveColumns = () => {
    if (isMobile) return mobileColumns;
    if (isTablet) return tabletColumns;
    return desktopColumns;
  };

  // Get responsive grid columns based on width
  const getGridColumns = (minColumnWidth: number = 210) => {
    const containerWidth = windowWidth * 0.9; // Assume 90% of screen width
    const maxColumns = Math.floor(containerWidth / minColumnWidth);
    
    if (isMobile) return Math.min(maxColumns, 2);
    if (isTablet) return Math.min(maxColumns, 3);
    return Math.min(maxColumns, 5);
  };

  // Get responsive font sizes
  const getResponsiveFontSizes = () => ({
    title: isMobile ? '18px' : isTablet ? '20px' : '24px',
    subtitle: isMobile ? '14px' : isTablet ? '16px' : '18px',
    body: isMobile ? '12px' : '14px',
    small: isMobile ? '10px' : '12px',
  });

  // Get responsive spacing
  const getResponsiveSpacing = () => ({
    small: isMobile ? '8px' : '12px',
    medium: isMobile ? '16px' : isTablet ? '20px' : '24px',
    large: isMobile ? '24px' : isTablet ? '32px' : '40px',
    xlarge: isMobile ? '32px' : isTablet ? '48px' : '64px',
  });

  return {
    windowWidth,
    isMobile,
    isTablet,
    isDesktop,
    getResponsivePadding,
    getResponsiveColumns,
    getGridColumns,
    getResponsiveFontSizes,
    getResponsiveSpacing,
  };
}