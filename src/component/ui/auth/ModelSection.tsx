'use client';
import React from 'react';
import GundamScene3D from '@/component/ui/auth/GundamScene3D';

export default function ModelSection() {
  return (
    <div style={styles.modelSection}>
      <GundamScene3D />
      <div style={styles.modelCredit}>
        <p>
          Model: "エールストライク/GAT-X105 Aile Strike" by みそ太郎 under{' '}
          <a 
            href="http://creativecommons.org/licenses/by/4.0/" 
            target="_blank" 
            rel="noopener noreferrer"
            style={styles.creditLink}
          >
            CC BY 4.0
          </a>
          {' '}| Source:{' '}
          <a 
            href="https://skfb.ly/oQZYD" 
            target="_blank" 
            rel="noopener noreferrer"
            style={styles.creditLink}
          >
            Sketchfab
          </a>
        </p>
      </div>
    </div>
  );
}

const styles = {
  modelSection: {
    height: '100%',
    minHeight: '31.25rem',
    width: '100%',
    borderRadius: '0.75rem',
    position: 'relative' as const,
    overflow: 'hidden',
  },
  modelCredit: {
    position: 'absolute' as const,
    bottom: '0.5rem',
    left: '0.5rem',
    right: '0.5rem',
    fontSize: '0.8rem',
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'right' as const,
    lineHeight: '1.3',
    zIndex: 10,
  },
  creditLink: {
    color: 'rgba(147, 197, 253, 0.9)',
    textDecoration: 'none',
    borderBottom: '1px solid rgba(147, 197, 253, 0.3)',
    transition: 'all 0.2s ease',
  },
};

if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = `
    .model-credit-link:hover {
      color: rgba(147, 197, 253, 1) !important;
      border-bottom-color: rgba(147, 197, 253, 0.8) !important;
    }
  `;
  document.head.appendChild(style);
}