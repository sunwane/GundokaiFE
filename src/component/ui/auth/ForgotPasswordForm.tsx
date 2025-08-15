'use client';
import React, { useState } from 'react';
import BaseAuthCard from './BaseAuthCard';
import BaseAuthContent from './BaseAuthContent';
import AuthFormHeader from './AuthFormHeader';
import FormInput from '@/component/ui/form/FormInput';
import PasswordInput from '@/component/ui/form/PasswordInput';
import SubmitButton from '@/component/ui/form/SubmitButton';
import Alert from '@/component/ui/Alert'; // Đổi từ Notification thành Alert
import { ThemeMode } from '@/types/Theme';
import { useForgotPassword } from '@/hooks/auth/useForgotPassword';
import './styles/forgotpassword.css';

interface ForgotPasswordFormProps {
  mode?: ThemeMode;
}

export default function ForgotPasswordForm({ mode = 'dark' }: ForgotPasswordFormProps) {
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);

  const {
    formData,
    isLoading,
    error,
    success,
    validationErrors,
    handleInputChange,
    handleSendCode: originalHandleSendCode,
    handleResendCode,
    handleResetPassword,
    handleBackToLogin,
    handleLogoClick,
    toggleNewPasswordVisibility,
    toggleConfirmPasswordVisibility,
    getFormClassName,
    isSubmitDisabled,
    isSendCodeDisabled,
  } = useForgotPassword();

  const handleSendCode = async () => {
    if (!formData.email) {
      setNotification({ message: 'Vui lòng nhập email trước khi gửi mã xác nhận', type: 'error' });
      return;
    }

    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setNotification({ message: 'Mã xác nhận đã được gửi đến email của bạn!', type: 'success' });
      originalHandleSendCode();
    } catch (error) {
      setNotification({ message: 'Có lỗi xảy ra khi gửi mã xác nhận', type: 'error' });
    }
  };

  return (
    <div className={getFormClassName()}>
      <BaseAuthCard className="auth-form">
        <AuthFormHeader
          welcomeText="Khôi phục tài khoản"
          brandName="HỘI ĐẠO CHIẾN BINH"
          onLogoClick={handleLogoClick}
        />

        <BaseAuthContent>
          {/* Hiển thị Alert thay vì errorMessage */}
          {notification && (
            <Alert
              message={notification.message}
              type={notification.type}
              onClose={() => setNotification(null)} // Đóng thông báo
            />
          )}

          <div className="scrollable-form-container" style={styles.scrollableContainer}>
            <form onSubmit={handleResetPassword} className="forgot-password-form" style={styles.form}>
              <FormInput
                id="email"
                label="Email hoặc Tên đăng nhập"
                type="text"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Nhập email hoặc tên đăng nhập"
                error={validationErrors.email}
                required
                mode={mode}
              />

              <div style={styles.verificationContainer}>
                <div style={styles.verificationInputWrapper}>
                  <FormInput
                    id="verificationCode"
                    label="Mã xác thực"
                    type="text"
                    name="verificationCode"
                    value={formData.verificationCode}
                    onChange={handleInputChange}
                    placeholder="Nhập mã 6 số từ email"
                    error={validationErrors.verificationCode}
                    required
                    mode={mode}
                  />
                </div>
                <button
                  type="button"
                  onClick={handleSendCode}
                  disabled={isSendCodeDisabled()}
                  style={{
                    ...styles.sendCodeButton,
                    ...(isSendCodeDisabled() ? styles.sendCodeButtonDisabled : {}),
                  }}
                  className="send-code-button"
                >
                  {formData.codeSent ? '✓ Đã gửi' : 'Gửi mã'}
                </button>
              </div>

              {formData.codeSent && (
                <div style={styles.resendContainer}>
                  <button
                    type="button"
                    onClick={handleResendCode}
                    disabled={isLoading}
                    style={{
                      ...styles.resendButton,
                      ...(isLoading ? styles.resendButtonDisabled : {}),
                    }}
                    className="resend-button"
                  >
                    {isLoading ? 'Đang gửi...' : 'Gửi lại mã'}
                  </button>
                </div>
              )}

              <PasswordInput
                id="newPassword"
                label="Mật khẩu mới"
                name="newPassword"
                value={formData.newPassword}
                onChange={handleInputChange}
                placeholder="Nhập mật khẩu mới (tối thiểu 6 ký tự)"
                error={validationErrors.newPassword}
                showPassword={formData.showNewPassword}
                onTogglePassword={toggleNewPasswordVisibility}
                required
                mode={mode}
              />

              <PasswordInput
                id="confirmPassword"
                label="Nhập lại mật khẩu mới"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                placeholder="Nhập lại mật khẩu mới"
                error={validationErrors.confirmPassword}
                showPassword={formData.showConfirmPassword}
                onTogglePassword={toggleConfirmPasswordVisibility}
                required
                mode={mode}
              />

              {success && (
                <div style={styles.successMessage}>
                  ✅ {success}
                </div>
              )}

              <SubmitButton
                isLoading={isLoading}
                disabled={isSubmitDisabled()}
                mode={mode}
                loadingText="ĐANG XỬ LÝ..."
              >
                XÁC NHẬN ĐỔI MẬT KHẨU
              </SubmitButton>
            </form>
          </div>

          <div className="back-to-login-container" style={styles.backToLoginContainer}>
            <button
              type="button"
              onClick={handleBackToLogin}
              style={styles.backToLoginLink}
              className="back-to-login-link"
            >
              ← Quay lại đăng nhập
            </button>
          </div>
        </BaseAuthContent>
      </BaseAuthCard>
    </div>
  );
}

const styles = {
  scrollableContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '1rem',
    minHeight: 0,
    maxHeight: 'calc(100vh - 300px)',
    overflowY: 'auto', // Scroll chỉ ở container chính
  },

  // ✅ Form styles
  form: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '1rem', // Khoảng cách cố định giữa các phần tử
    flex: 1,
    paddingBottom: '1rem',
  },

  // ✅ Error/Success message styles
  errorMessage: {
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
    color: '#fca5a5',
    padding: '0.75rem 1rem',
    border: '1px solid rgba(239, 68, 68, 0.3)',
    borderRadius: '0.375rem',
    fontSize: '0.875rem',
    fontWeight: '500',
    backdropFilter: 'blur(10px)',
    minHeight: '3rem',
    display: 'flex',
    alignItems: 'center',
    position: 'absolute', // Hiển thị ngay bên trong container cha
    top: '0', // Hiển thị ngay bên trong container cha
    left: '0',
    right: '0',
  },
  successMessage: {
    backgroundColor: 'rgba(34, 197, 94, 0.1)',
    color: '#86efac',
    padding: '0.75rem 1rem',
    border: '1px solid rgba(34, 197, 94, 0.3)',
    borderRadius: '0.375rem',
    fontSize: '0.875rem',
    fontWeight: '500',
    backdropFilter: 'blur(10px)',
    minHeight: '3rem', // Đặt chiều cao tối thiểu
  },

  // ✅ Input container styles
  verificationContainer: {
    display: 'flex',
    gap: '0.5rem',
    alignItems: 'flex-end',
  },
  verificationInputWrapper: {
    flex: 1,
  },

  // ✅ Button styles
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
    height: '42px', // Đặt chiều cao cố định
  },
  sendCodeButtonDisabled: {
    backgroundColor: '#9ca3af',
    cursor: 'not-allowed',
  },

  // ✅ Resend button container
  resendContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '-0.5rem',
    marginBottom: '0.25rem',
  },
  resendButton: {
    background: 'none',
    border: 'none',
    color: '#f59e0b', // Orange color
    fontSize: '0.75rem',
    textDecoration: 'underline',
    cursor: 'pointer',
    padding: '0.25rem',
    transition: 'color 0.2s ease',
  },
  resendButtonDisabled: {
    color: '#9ca3af',
    cursor: 'not-allowed',
    textDecoration: 'none',
  },

  // ✅ Back to login container - nằm ngoài scroll
  backToLoginContainer: {
    textAlign: 'center' as const,
    paddingTop: '1rem',
    borderTop: '1px solid rgba(148, 163, 184, 0.2)',
    flexShrink: 0, // Không cho shrink
    marginTop: 'auto', // Đẩy xuống bottom
  },

  // ✅ Back to login styled như link
  backToLoginLink: {
    background: 'none',
    border: 'none',
    color: '#60a5fa', // Blue link color
    fontSize: '0.875rem',
    fontWeight: '400',
    cursor: 'pointer',
    transition: 'color 0.2s ease',
    padding: '0.25rem',
  },
} as const;