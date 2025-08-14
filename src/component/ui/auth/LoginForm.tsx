import React, { useState } from 'react';
import FormInput from '@/component/ui/form/FormInput';
import PasswordInput from '@/component/ui/form/PasswordInput';
import SubmitButton from '@/component/ui/form/SubmitButton';
import ErrorMessage from '@/component/ui/ErrorMessage';
import { LoginRequest } from '@/types/Account';

interface LoginFormProps {
  data: LoginRequest;
  isLoading: boolean;
  error: string;
  validationErrors: { [key: string]: string };
  showPassword: boolean;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  onTogglePassword: () => void;
}

export default function LoginForm({
  data,
  isLoading,
  error,
  validationErrors,
  showPassword,
  onInputChange,
  onSubmit,
  onTogglePassword
}: LoginFormProps) {
  const [rememberMe, setRememberMe] = useState(false);

  const handleForgotPassword = () => {
    // Xử lý quên mật khẩu
    alert('Chức năng quên mật khẩu sẽ được phát triển sau!');
  };

  return (
    <form onSubmit={onSubmit} style={styles.form}>
      <FormInput
        id="email"
        label="Email"
        type="text" // ✅ Luôn là text
        name="email"
        value={data.email}
        placeholder="abc@gmail.com"
        error={validationErrors.email}
        onChange={onInputChange}
        required
      />

      <PasswordInput
        id="password"
        label="Mật khẩu"
        name="password"
        value={data.password}
        error={validationErrors.password}
        showPassword={showPassword}
        onChange={onInputChange}
        onTogglePassword={onTogglePassword}
        required
      />

      {/* Remember Me và Forgot Password */}
      <div style={styles.checkboxAndForgotContainer}>
        <div style={styles.checkboxContainer}>
          <input
            type="checkbox"
            id="remember-me"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
            style={styles.checkbox}
          />
          <label htmlFor="remember-me" style={styles.checkboxLabel}>
            Ghi nhớ đăng nhập
          </label>
        </div>
        
        <button
          type="button"
          onClick={handleForgotPassword}
          style={styles.forgotPasswordLink}
        >
          Quên mật khẩu?
        </button>
      </div>

      <ErrorMessage message={error} />

      <SubmitButton isLoading={isLoading}>
        Đăng nhập
      </SubmitButton>
    </form>
  );
}

const styles = {
  form: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '0.75rem', // Giảm từ 1rem
  },
  checkboxAndForgotContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '0.25rem',
  },
  checkboxContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  },
  checkbox: {
    width: '16px',
    height: '16px',
    accentColor: '#3b82f6',
  },
  checkboxLabel: {
    fontSize: '0.75rem',
    color: '#6b7280',
    cursor: 'pointer',
  },
  forgotPasswordLink: {
    background: 'none',
    border: 'none',
    color: '#3b82f6',
    fontSize: '0.75rem',
    textDecoration: 'underline',
    cursor: 'pointer',
    padding: 0,
  },
};