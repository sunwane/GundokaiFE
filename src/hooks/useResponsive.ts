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
  isHydrated: boolean;
}

const DEFAULT_BREAKPOINTS: ResponsiveBreakpoints = {
  mobile: 768,
  tablet: 1024,
  desktop: 1200,
  largeDesktop: 1920,
};

export function useResponsive(customBreakpoints?: Partial<ResponsiveBreakpoints>): ResponsiveState {
  const breakpoints = { ...DEFAULT_BREAKPOINTS, ...customBreakpoints };
  
  // Start with desktop defaults for SSR
  const [windowWidth, setWindowWidth] = useState(breakpoints.desktop);
  const [windowHeight, setWindowHeight] = useState(800);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    // Only update after hydration
    setIsHydrated(true);
    console.log('window.innerWidth:', window.innerWidth);
    setWindowWidth(window.innerWidth);
    setWindowHeight(window.innerHeight);

    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      setWindowHeight(window.innerHeight);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Calculate values - use desktop defaults if not hydrated
  const isMobile = isHydrated ? windowWidth < breakpoints.mobile : false;
  const isTablet = isHydrated ? windowWidth >= breakpoints.mobile && windowWidth < breakpoints.tablet : false;
  const isDesktop = isHydrated ? windowWidth >= breakpoints.tablet && windowWidth < breakpoints.largeDesktop : true;
  const isLargeDesktop = isHydrated ? windowWidth >= breakpoints.largeDesktop : false;
  const isSmallScreen = isHydrated ? windowWidth < breakpoints.tablet : false;
  const orientation = isHydrated ? (windowWidth > windowHeight ? 'landscape' : 'portrait') : 'landscape';

  return {
    windowWidth,
    isMobile,
    isTablet,
    isDesktop,
    isLargeDesktop,
    isSmallScreen,
    orientation,
    isHydrated,
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