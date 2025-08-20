import React, { useState } from 'react';
import FormInput from '@/component/ui/form/FormInput';
import FormSelect from '@/component/ui/form/FormSelect';
import PasswordInput from '@/component/ui/form/PasswordInput';
import SubmitButton from '@/component/ui/form/SubmitButton';
import ErrorMessage from '@/component/ui/ErrorMessage';
import { RegisterRequest } from '@/types/Account';
import { ThemeMode } from '@/types/Theme';

interface RegisterFormProps {
  data: RegisterRequest;
  isLoading: boolean;
  error: string;
  validationErrors: any;
  showPassword: boolean;
  mode?: ThemeMode;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  onTogglePassword: (show: boolean) => void;
  onSendVerificationCode: (email: string) => Promise<void>;
}

const genderOptions = [
  { value: 'MALE', label: 'Nam' },
  { value: 'FEMALE', label: 'Nữ' },
];

export default function RegisterForm({
  data,
  isLoading,
  error,
  validationErrors,
  showPassword,
  mode = 'light',
  onInputChange,
  onSubmit,
  onTogglePassword,
  onSendVerificationCode
}: RegisterFormProps) {
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [isSendingCode, setIsSendingCode] = useState(false);
  const [codeSent, setCodeSent] = useState(false);
  const [countdown, setCountdown] = useState(0);
  // ✅ THÊM: State cho notification
  const [notification, setNotification] = useState<{
    type: 'success' | 'error' | 'info';
    message: string;
    visible: boolean;
  }>({
    type: 'info',
    message: '',
    visible: false
  });

  const safeData = data || {
    username: '',
    email: '',
    password: '',
    gender: 'MALE',
    verificationCode: ''
  };

  // ✅ THÊM: Function để show notification
  const showNotification = (type: 'success' | 'error' | 'info', message: string) => {
    setNotification({ type, message, visible: true });
    
    // Auto hide sau 4 giây
    setTimeout(() => {
      setNotification(prev => ({ ...prev, visible: false }));
    }, 4000);
  };

  const handleTermsClick = () => {
    window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ', '_blank');
  };

  const handleSendCode = async () => {
    if (!safeData.email) {
      // ✅ SỬA: Dùng notification thay vì alert
      showNotification('error', 'Vui lòng nhập email trước khi gửi mã xác nhận');
      return;
    }

    setIsSendingCode(true);
    try {
      await onSendVerificationCode(safeData.email);
      
      setCodeSent(true);
      setCountdown(60);
      
      const timer = setInterval(() => {
        setCountdown(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            setCodeSent(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      
      // ✅ SỬA: Dùng notification thay vì alert
      showNotification('success', 'Mã xác nhận đã được gửi đến email của bạn!');
    } catch (error) {
      console.error('Error sending verification code:', error);
      // ✅ SỬA: Dùng notification thay vì alert
      showNotification('error', 'Có lỗi xảy ra khi gửi mã xác nhận');
    } finally {
      setIsSendingCode(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreeToTerms) {
      // ✅ SỬA: Dùng notification thay vì alert
      showNotification('error', 'Vui lòng đồng ý với các điều khoản và điều kiện');
      return;
    }
    onSubmit(e);
  };

  return (
    <div style={styles.container}>
      {/* ✅ THÊM: Custom Notification Component */}
      {notification.visible && (
        <div style={{
          ...styles.notification,
          ...(notification.type === 'success' ? styles.notificationSuccess : 
             notification.type === 'error' ? styles.notificationError : 
             styles.notificationInfo)
        }}>
          <div style={styles.notificationContent}>
            <span style={styles.notificationIcon}>
              {notification.type === 'success' ? '✅' : 
               notification.type === 'error' ? '❌' : 
               'ℹ️'}
            </span>
            <span style={styles.notificationMessage}>
              {notification.message}
            </span>
            <button 
              onClick={() => setNotification(prev => ({ ...prev, visible: false }))}
              style={styles.notificationClose}
            >
              ✕
            </button>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} style={styles.form}>
        {/* Tên đăng nhập */}
        <FormInput
          id="username"
          label="Tên đăng nhập"
          type="text"
          name="username"
          value={safeData.username || ''}
          placeholder="Nhập tên đăng nhập"
          error={validationErrors?.username}
          mode={mode}
          onChange={onInputChange}
          required
        />

        {/* Email */}
        <FormInput
          id="email"
          label="Email"
          type="text"
          name="email"
          value={safeData.email || ''}
          placeholder="abc@gmail.com"
          error={validationErrors?.email}
          mode={mode}
          onChange={onInputChange}
          required
        />

        {/* Mã xác nhận với nút gửi */}
        <div style={styles.verificationContainer}>
          <div style={styles.verificationInputWrapper}>
            <FormInput
              id="verificationCode"
              label="Mã xác nhận"
              type="text"
              name="verificationCode"
              value={safeData.verificationCode || ''}
              placeholder="Nhập mã 6 số"
              error={validationErrors?.verificationCode}
              mode={mode}
              onChange={onInputChange}
              required
            />
          </div>
          <button
            type="button"
            onClick={handleSendCode}
            disabled={isSendingCode || codeSent || !safeData.email}
            style={{
              ...styles.sendCodeButton,
              ...(isSendingCode || codeSent || !safeData.email ? styles.sendCodeButtonDisabled : {})
            }}
          >
            {isSendingCode ? '...' : codeSent ? `${countdown}s` : 'Gửi mã'}
          </button>
        </div>

        {/* Giới tính */}
        <FormSelect
          id="gender"
          label="Giới tính"
          name="gender"
          value={safeData.gender || 'MALE'}
          error={validationErrors?.gender}
          options={genderOptions}
          mode={mode}
          onChange={onInputChange}
          required
        />

        {/* Mật khẩu */}
        <PasswordInput
          id="register-password"
          label="Mật khẩu"
          name="password"
          value={safeData.password || ''}
          error={validationErrors?.password}
          showPassword={showPassword}
          mode={mode}
          onChange={onInputChange}
          onTogglePassword={onTogglePassword}
          required
        />

        {/* Agree to Terms */}
        <div style={styles.termsContainer}>
          <input
            type="checkbox"
            id="agree-terms"
            checked={agreeToTerms}
            onChange={(e) => setAgreeToTerms(e.target.checked)}
            style={styles.checkbox}
            required
          />
          <label htmlFor="agree-terms" style={styles.termsLabel}>
            Tôi đồng ý và chấp nhận{' '}
            <button
              type="button"
              onClick={handleTermsClick}
              style={styles.termsLink}
            >
              các điều khoản
            </button>
          </label>
        </div>

        <ErrorMessage message={error} />

        <SubmitButton 
          isLoading={isLoading}
          mode={mode}
        >
          Đăng ký
        </SubmitButton>
      </form>
    </div>
  );
}

const styles = {
  container: {
    position: 'relative' as const,
  },
  // ✅ THÊM: Notification styles
  notification: {
    position: 'fixed' as const,
    top: '20px',
    right: '20px',
    minWidth: '320px',
    maxWidth: '400px',
    padding: '0',
    borderRadius: '12px',
    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15), 0 4px 10px rgba(0, 0, 0, 0.1)',
    zIndex: 9999,
    animation: 'slideInRight 0.3s ease-out',
    backdropFilter: 'blur(10px)',
  },
  notificationSuccess: {
    background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
    border: '1px solid rgba(16, 185, 129, 0.3)',
  },
  notificationError: {
    background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
    border: '1px solid rgba(239, 68, 68, 0.3)',
  },
  notificationInfo: {
    background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
    border: '1px solid rgba(59, 130, 246, 0.3)',
  },
  notificationContent: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '16px 20px',
    color: '#ffffff',
  },
  notificationIcon: {
    fontSize: '18px',
    flexShrink: 0,
  },
  notificationMessage: {
    flex: 1,
    fontSize: '14px',
    fontWeight: '500',
    lineHeight: '1.4',
  },
  notificationClose: {
    background: 'rgba(255, 255, 255, 0.2)',
    border: 'none',
    color: '#ffffff',
    borderRadius: '6px',
    width: '24px',
    height: '24px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    fontSize: '12px',
    fontWeight: 'bold',
    flexShrink: 0,
    transition: 'all 0.2s ease',
  },
  form: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '0.75rem',
  },
  verificationContainer: {
    display: 'flex',
    gap: '0.5rem',
    alignItems: 'flex-end',
  },
  verificationInputWrapper: {
    flex: 1,
  },
  sendCodeButton: {
    padding: '0.5rem 0.75rem',
    backgroundColor: '#3b82f6',
    color: '#ffffff',
    border: 'none',
    borderRadius: '0.5rem',
    fontSize: '0.75rem',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    whiteSpace: 'nowrap' as const,
    minWidth: '70px',
    height: '42px',
  },
  sendCodeButtonDisabled: {
    backgroundColor: '#9ca3af',
    cursor: 'not-allowed',
  },
  termsContainer: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '0.5rem',
    marginTop: '0.25rem',
  },
  checkbox: {
    marginTop: '0.125rem',
    width: '1rem',
    height: '1rem',
    accentColor: '#3b82f6',
  },
  termsLabel: {
    fontSize: '0.75rem',
    color: '#6b7280',
    lineHeight: '1.2',
  },
  termsLink: {
    color: '#3b82f6',
    textDecoration: 'underline',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: 0,
    font: 'inherit',
  },
};