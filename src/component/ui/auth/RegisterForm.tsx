import React, { useState } from 'react';
import FormInput from '@/component/ui/form/FormInput';
import FormSelect from '@/component/ui/form/FormSelect';
import PasswordInput from '@/component/ui/form/PasswordInput';
import SubmitButton from '@/component/ui/form/SubmitButton';
import ErrorMessage from '@/component/ui/ErrorMessage';
import { RegisterRequest } from '@/types/Account';

interface RegisterFormProps {
  data: RegisterRequest;
  isLoading: boolean;
  error: string;
  validationErrors: { [key: string]: string };
  showPassword: boolean;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  onTogglePassword: () => void;
}

const genderOptions = [
  { value: 'male', label: 'Nam' },
  { value: 'female', label: 'Nữ' },
  { value: 'other', label: 'Khác' }
];

export default function RegisterForm({
  data,
  isLoading,
  error,
  validationErrors,
  showPassword,
  onInputChange,
  onSubmit,
  onTogglePassword
}: RegisterFormProps) {
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [isSendingCode, setIsSendingCode] = useState(false);
  const [codeSent, setCodeSent] = useState(false);
  const [countdown, setCountdown] = useState(0);

  const handleTermsClick = () => {
    // Rick Roll link 😄
    window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ', '_blank');
  };

  const handleSendCode = async () => {
    if (!data.email) {
      alert('Vui lòng nhập email trước khi gửi mã xác nhận');
      return;
    }

    setIsSendingCode(true);
    try {
      // Giả lập gửi mã
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setCodeSent(true);
      setCountdown(60); // 60 giây countdown
      
      // Countdown timer
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
      
      alert('Mã xác nhận đã được gửi đến email của bạn!');
    } catch (error) {
      alert('Có lỗi xảy ra khi gửi mã xác nhận');
    } finally {
      setIsSendingCode(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreeToTerms) {
      alert('Vui lòng đồng ý với các điều khoản và điều kiện');
      return;
    }
    onSubmit(e);
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      {/* Tên đăng nhập */}
      <FormInput
        id="username"
        label="Tên đăng nhập"
        type="text"
        name="username"
        value={data.username || ''}
        placeholder="Nhập tên đăng nhập"
        error={validationErrors.username}
        onChange={onInputChange}
        required
      />

      {/* Email */}
      <FormInput
        id="email"
        label="Email"
        type="text"
        name="email"
        value={data.email}
        placeholder="abc@gmail.com"
        error={validationErrors.email}
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
            value={data.verificationCode || ''}
            placeholder="Nhập mã 6 số"
            error={validationErrors.verificationCode}
            onChange={onInputChange}
            required
          />
        </div>
        <button
          type="button"
          onClick={handleSendCode}
          disabled={isSendingCode || codeSent || !data.email}
          style={{
            ...styles.sendCodeButton,
            ...(isSendingCode || codeSent || !data.email ? styles.sendCodeButtonDisabled : {})
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
        value={data.gender}
        error={validationErrors.gender}
        options={genderOptions}
        onChange={onInputChange}
        required
      />

      {/* Mật khẩu */}
      <PasswordInput
        id="register-password"
        label="Mật khẩu"
        name="password"
        value={data.password}
        error={validationErrors.password}
        showPassword={showPassword}
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

      <SubmitButton isLoading={isLoading}>
        Đăng ký
      </SubmitButton>
    </form>
  );
}

const styles = {
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
    height: '42px', // Match input height
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
    width: '16px',
    height: '16px',
    marginTop: '0.125rem',
    accentColor: '#3b82f6',
  },
  termsLabel: {
    fontSize: '0.75rem',
    color: '#6b7280',
    lineHeight: '1.3',
  },
  termsLink: {
    background: 'none',
    border: 'none',
    color: '#3b82f6',
    fontSize: '0.75rem',
    textDecoration: 'underline',
    cursor: 'pointer',
    padding: 0,
  },
};