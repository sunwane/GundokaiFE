'use client';
import { useState, useEffect } from 'react';

export interface ModalState {
  isOpen: boolean;
  data?: any;
}

export function useModalState<T = any>(initialState: boolean = false) {
  const [state, setState] = useState<ModalState>({
    isOpen: initialState,
    data: undefined,
  });

  const open = (data?: T) => {
    setState({ isOpen: true, data });
  };

  const close = () => {
    setState({ isOpen: false, data: undefined });
  };

  const toggle = (data?: T) => {
    setState(prev => ({
      isOpen: !prev.isOpen,
      data: prev.isOpen ? undefined : data,
    }));
  };

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (state.isOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [state.isOpen]);

  return {
    ...state,
    open,
    close,
    toggle,
  };
}