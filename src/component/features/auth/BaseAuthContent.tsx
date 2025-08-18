'use client';
import React, { ReactNode } from 'react';

interface BaseAuthContentProps {
  children: ReactNode;
  className?: string;
}

export default function BaseAuthContent({ children, className = '' }: BaseAuthContentProps) {
  return (
    <div style={styles.cardContent} className={className}>
      {children}
    </div>
  );
}

const styles = {
  cardContent: {
    display: 'flex',
    flexDirection: 'column' as const,
    flex: 1,
    overflow: 'hidden',
    background: `
      linear-gradient(135deg, 
        rgba(15, 23, 42, 0.6) 0%, 
        rgba(30, 41, 59, 0.55) 100%
      )
    `,
    padding: '1.25rem',
    boxSizing: 'border-box' as const,
  },
} as const;