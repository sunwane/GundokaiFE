'use client';
import { useState, useCallback } from 'react';

export type PopupType = 'success' | 'error' | 'warning' | 'info' | 'confirm';

export interface PopupMessageConfig {
  title: string;
  message: string;
  type?: PopupType;
  confirmText?: string;
  cancelText?: string;
  duration?: number;
  onConfirm?: () => void;
  onCancel?: () => void;
  onClose?: () => void;
}

export interface PopupState extends PopupMessageConfig {
  isVisible: boolean;
  id: string;
}

export interface UsePopupMessageReturn {
  popup: PopupState | null;
  showSuccess: (config: Omit<PopupMessageConfig, 'type'>) => void;
  showError: (config: Omit<PopupMessageConfig, 'type'>) => void;
  showWarning: (config: Omit<PopupMessageConfig, 'type'>) => void;
  showInfo: (config: Omit<PopupMessageConfig, 'type'>) => void;
  showConfirm: (config: Omit<PopupMessageConfig, 'type'>) => void;
  hidePopup: () => void;
}

export function usePopupMessage(): UsePopupMessageReturn {
  const [popup, setPopup] = useState<PopupState | null>(null);

  const showPopup = useCallback((config: PopupMessageConfig) => {
    const newPopup: PopupState = {
      ...config,
      isVisible: true,
      id: Date.now().toString(),
    };
    setPopup(newPopup);

    // Auto hide for non-confirm types
    if (config.type !== 'confirm' && config.duration) {
      setTimeout(() => {
        hidePopup();
      }, config.duration);
    }
  }, []);

  const hidePopup = useCallback(() => {
    setPopup(null);
  }, []);

  const showSuccess = useCallback((config: Omit<PopupMessageConfig, 'type'>) => {
    showPopup({ ...config, type: 'success', duration: config.duration || 3000 });
  }, [showPopup]);

  const showError = useCallback((config: Omit<PopupMessageConfig, 'type'>) => {
    showPopup({ ...config, type: 'error', duration: config.duration || 5000 });
  }, [showPopup]);

  const showWarning = useCallback((config: Omit<PopupMessageConfig, 'type'>) => {
    showPopup({ ...config, type: 'warning', duration: config.duration || 4000 });
  }, [showPopup]);

  const showInfo = useCallback((config: Omit<PopupMessageConfig, 'type'>) => {
    showPopup({ ...config, type: 'info', duration: config.duration || 3000 });
  }, [showPopup]);

  const showConfirm = useCallback((config: Omit<PopupMessageConfig, 'type'>) => {
    showPopup({ ...config, type: 'confirm' });
  }, [showPopup]);

  return {
    popup,
    showSuccess,
    showError,
    showWarning,
    showInfo,
    showConfirm,
    hidePopup,
  };
}