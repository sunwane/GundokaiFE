'use client';
import React from 'react';
import GundamScene3D from '@/component/ui/GundamScene3D';

export default function ModelSection() {
  return (
    <div style={styles.modelSection}>
      <GundamScene3D />
      <div style={styles.modelCredit}>
        <p>Model: "ガンダムバルバトス 第4形態/ASW-G-08 Gundam Barbatos 4th form" by みそ太郎 under CC-BY-NC-4.0</p>
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
    fontSize: '0.75rem',
    color: 'rgba(255, 255, 255, 0.7)',
    textAlign: 'right' as const,
    lineHeight: '1.4',
    zIndex: 10,
  },
};