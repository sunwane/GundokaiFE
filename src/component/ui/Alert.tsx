import React from 'react';
import ReactDOM from 'react-dom';

interface AlertProps {
  message: string;
  type?: 'success' | 'error' | 'info'; // Các kiểu thông báo
  onClose: () => void; // Hàm đóng thông báo
}

export default function Alert({ message, type = 'info', onClose }: AlertProps) {
  const getBackgroundColor = () => {
    switch (type) {
      case 'success':
        return 'rgba(34, 197, 94, 0.9)'; // Màu xanh lá
      case 'error':
        return 'rgba(239, 68, 68, 0.9)'; // Màu đỏ
      case 'info':
      default:
        return 'rgba(59, 130, 246, 0.9)'; // Màu xanh dương
    }
  };

  const getTextColor = () => {
    switch (type) {
      case 'success':
        return '#ffffff'; // Trắng
      case 'error':
        return '#ffffff'; // Trắng
      case 'info':
      default:
        return '#ffffff'; // Trắng
    }
  };

  const alertContent = (
    <div style={{
      position: 'fixed',
      top: '20px',
      left: '50%',
      transform: 'translateX(-50%)',
      backgroundColor: getBackgroundColor(),
      color: getTextColor(),
      padding: '1rem 1.5rem',
      borderRadius: '0.5rem',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      zIndex: 1000,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      minWidth: '300px',
      maxWidth: '90%',
    }}>
      <span>{message}</span>
      <button
        onClick={onClose}
        style={{
          background: 'none',
          border: 'none',
          color: getTextColor(),
          fontSize: '1.25rem',
          cursor: 'pointer',
          marginLeft: '1rem',
        }}
      >
        ✕
      </button>
    </div>
  );

  return ReactDOM.createPortal(alertContent, document.body);
}