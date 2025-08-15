'use client';
import React, { ReactNode } from 'react';
import '@/component/ui/auth/styles/authform.css';

interface BaseAuthCardProps {
  children: ReactNode;
  className?: string;
  height?: string;
}

export default function BaseAuthCard({ 
  children, 
  className = '',
  height = '85vh'
}: BaseAuthCardProps) {
  return (
    <div 
      style={{
        ...styles.card,
        height: height
      }}
      className={`auth-form ${className}`}
    >
      {children}
    </div>
  );
}

const styles = {
  card: {
    width: '100%',
    background: `
      linear-gradient(135deg, 
        rgba(15, 23, 42, 0.75) 0%, 
        rgba(30, 41, 59, 0.72) 50%, 
        rgba(51, 65, 85, 0.70) 100%
      )
    `,
    border: '1px solid rgba(59, 130, 246, 0.25)',
    backdropFilter: 'blur(15px)',
    clipPath: `polygon(
      20px 0%, 
      calc(100% - 20px) 0%, 
      100% 20px, 
      100% calc(100% - 20px), 
      calc(100% - 20px) 100%, 
      20px 100%, 
      0% calc(100% - 20px), 
      0% 20px
    )`,
    boxShadow: `
      0 25px 50px rgba(0, 0, 0, 0.3),
      0 0 25px rgba(59, 130, 246, 0.08),
      inset 0 1px 0 rgba(255, 255, 255, 0.08)
    `,
    display: 'flex',
    flexDirection: 'column' as const,
    position: 'relative' as const,
    overflow: 'hidden',
    padding: '1.5rem',
    boxSizing: 'border-box' as const,
    margin: 0,
  },
} as const;