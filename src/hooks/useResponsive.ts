'use client';
import { useState, useEffect } from 'react';

export interface ResponsiveBreakpoints {
  mobile: number;
  tablet: number;
  desktop: number;
  largeDesktop: number;
}

export interface ResponsiveState {
  windowWidth: number;
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  isLargeDesktop: boolean;
  isSmallScreen: boolean;
  orientation: 'portrait' | 'landscape';
}

const DEFAULT_BREAKPOINTS: ResponsiveBreakpoints = {
  mobile: 768,
  tablet: 1024,
  desktop: 1200,
  largeDesktop: 1920,
};

export function useResponsive(customBreakpoints?: Partial<ResponsiveBreakpoints>): ResponsiveState {
  const breakpoints = { ...DEFAULT_BREAKPOINTS, ...customBreakpoints };
  
  const [windowWidth, setWindowWidth] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth;
    }
    return breakpoints.desktop; // Default for SSR
  });

  const [windowHeight, setWindowHeight] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.innerHeight;
    }
    return 800; // Default for SSR
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      setWindowHeight(window.innerHeight);
    };

    // Set initial values
    setWindowWidth(window.innerWidth);
    setWindowHeight(window.innerHeight);

    window.addEventListener('resize', handleResize);
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = windowWidth < breakpoints.mobile;
  const isTablet = windowWidth >= breakpoints.mobile && windowWidth < breakpoints.tablet;
  const isDesktop = windowWidth >= breakpoints.tablet && windowWidth < breakpoints.largeDesktop;
  const isLargeDesktop = windowWidth >= breakpoints.largeDesktop;
  const isSmallScreen = windowWidth < breakpoints.tablet;
  const orientation = windowWidth > windowHeight ? 'landscape' : 'portrait';

  return {
    windowWidth,
    isMobile,
    isTablet,
    isDesktop,
    isLargeDesktop,
    isSmallScreen,
    orientation,
  };
}

// Specific hooks for common use cases
export function useMobileDetection(breakpoint: number = 768) {
  const { windowWidth } = useResponsive();
  return windowWidth <= breakpoint;
}

export function useDesktopDetection(breakpoint: number = 1024) {
  const { windowWidth } = useResponsive();
  return windowWidth >= breakpoint;
}