'use client';
import React, { useEffect } from 'react';
import { PopupState, PopupType } from '@/hooks/ui/usePopupMessage';

interface PopupMessageProps {
  popup: PopupState | null;
  onClose: () => void;
}

export default function PopupMessage({ popup, onClose }: PopupMessageProps) {
  useEffect(() => {
    if (popup?.isVisible) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [popup?.isVisible]);

  if (!popup?.isVisible) return null;

  const handleConfirm = () => {
    popup.onConfirm?.();
    onClose();
  };

  const handleCancel = () => {
    popup.onCancel?.();
    onClose();
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      if (popup.type === 'confirm') {
        handleCancel();
      } else {
        onClose();
      }
    }
  };

  const getIcon = (type: PopupType) => {
    switch (type) {
      case 'success':
        return '✅';
      case 'error':
        return '❌';
      case 'warning':
        return '⚠️';
      case 'info':
        return 'ℹ️';
      case 'confirm':
        return '❓';
      default:
        return 'ℹ️';
    }
  };

  const getColor = (type: PopupType) => {
    switch (type) {
      case 'success':
        return '#10b981';
      case 'error':
        return '#ef4444';
      case 'warning':
        return '#f59e0b';
      case 'info':
        return '#3b82f6';
      case 'confirm':
        return '#6b7280';
      default:
        return '#3b82f6';
    }
  };

  return (
    <div style={styles.overlay} onClick={handleBackdropClick}>
      <div style={{
        ...styles.popup,
        borderTop: `4px solid ${getColor(popup.type || 'info')}`
      }}>
        {/* Header */}
        <div style={styles.header}>
          <div style={styles.iconContainer}>
            <span style={styles.icon}>{getIcon(popup.type || 'info')}</span>
          </div>
          <div style={styles.headerText}>
            <h3 style={{
              ...styles.title,
              color: getColor(popup.type || 'info')
            }}>
              {popup.title}
            </h3>
          </div>
          {popup.type !== 'confirm' && (
            <button
              style={styles.closeButton}
              onClick={onClose}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#f3f4f6';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
            >
              ✕
            </button>
          )}
        </div>

        {/* Content */}
        <div style={styles.content}>
          <p style={styles.message}>{popup.message}</p>
        </div>

        {/* Actions */}
        <div style={styles.actions}>
          {popup.type === 'confirm' ? (
            <>
              <button
                style={styles.cancelButton}
                onClick={handleCancel}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#f3f4f6';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                {popup.cancelText || 'Hủy'}
              </button>
              <button
                style={{
                  ...styles.confirmButton,
                  backgroundColor: getColor(popup.type),
                }}
                onClick={handleConfirm}
                onMouseEnter={(e) => {
                  const color = getColor(popup.type || 'info');
                  e.currentTarget.style.backgroundColor = color === '#ef4444' ? '#dc2626' : 
                    color === '#f59e0b' ? '#d97706' : 
                    color === '#10b981' ? '#059669' : '#2563eb';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = getColor(popup.type || 'info');
                }}
              >
                {popup.confirmText || 'Xác nhận'}
              </button>
            </>
          ) : (
            <button
              style={{
                ...styles.okButton,
                backgroundColor: getColor(popup.type || 'info'),
              }}
              onClick={onClose}
              onMouseEnter={(e) => {
                const color = getColor(popup.type || 'info');
                e.currentTarget.style.backgroundColor = color === '#ef4444' ? '#dc2626' : 
                  color === '#f59e0b' ? '#d97706' : 
                  color === '#10b981' ? '#059669' : '#2563eb';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = getColor(popup.type || 'info');
              }}
            >
              {popup.confirmText || 'OK'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

const styles = {
  overlay: {
    position: 'fixed' as const,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 9999,
    backdropFilter: 'blur(4px)',
  },
  popup: {
    backgroundColor: '#fff',
    borderRadius: '16px',
    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    maxWidth: '400px',
    width: '90vw',
    maxHeight: '90vh',
    overflow: 'hidden',
    animation: 'popupSlideIn 0.3s ease-out',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    padding: '20px 24px 12px',
    gap: '12px',
  },
  iconContainer: {
    flexShrink: 0,
  },
  icon: {
    fontSize: '24px',
  },
  headerText: {
    flex: 1,
  },
  title: {
    margin: 0,
    fontSize: '18px',
    fontWeight: '600',
  },
  closeButton: {
    background: 'none',
    border: 'none',
    fontSize: '18px',
    cursor: 'pointer',
    padding: '4px 8px',
    borderRadius: '4px',
    color: '#6b7280',
    flexShrink: 0,
    transition: 'background-color 0.2s ease',
  },
  content: {
    padding: '0 24px 20px',
  },
  message: {
    margin: 0,
    fontSize: '16px',
    lineHeight: 1.5,
    color: '#374151',
  },
  actions: {
    display: 'flex',
    gap: '12px',
    padding: '20px 24px',
    borderTop: '1px solid #e5e7eb',
    justifyContent: 'flex-end',
  },
  cancelButton: {
    padding: '8px 20px',
    backgroundColor: 'transparent',
    color: '#6b7280',
    border: '1px solid #d1d5db',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  },
  confirmButton: {
    padding: '8px 20px',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'background-color 0.2s ease',
  },
  okButton: {
    padding: '8px 24px',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'background-color 0.2s ease',
  },
};