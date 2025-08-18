import React from 'react';

interface ProductImageOverlayProps {
  isVisible: boolean;
  overlayText: string;
}

export default function ProductImageOverlay({ 
  isVisible, 
  overlayText
}: ProductImageOverlayProps) {
  if (!isVisible) return null;

  return (
    <div style={styles.overlay}>
      <div style={styles.overlayContent}> 
        <span style={styles.overlayText}>
          [ 
          {overlayText}
           ]
        </span>
      </div>
    </div>
  );
}

const styles = {
  overlay: {
    position: 'absolute' as const,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)', // MÀU ĐEN MỜ 0.5
    zIndex: 10,
    borderRadius: '4px',
    transition: 'all 0.3s ease',
  },
  overlayContent: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  overlayText: {
    fontSize: '15px',
    fontWeight: '900',
    textAlign: 'center' as const,
    letterSpacing: '1px',
    textTransform: 'uppercase' as const,
    textShadow: '0 2px 4px rgba(0, 0, 0, 0.9)',
    color: 'rgb(255, 64, 64)',
    lineHeight: 1,
  },
};