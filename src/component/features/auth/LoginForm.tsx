import React, { useState } from 'react';
import FormInput from '@/component/ui/form/FormInput';
import PasswordInput from '@/component/ui/form/PasswordInput';
import SubmitButton from '@/component/ui/form/SubmitButton';
import ErrorMessage from '@/component/ui/ErrorMessage';
import { LoginRequest } from '@/types/Account';
import { ThemeMode } from '@/types/Theme'; // ✅ Import ThemeMode
import { useRouter } from 'next/navigation';

interface LoginFormProps {
  data: LoginRequest;
  isLoading: boolean;
  error: string;
  validationErrors: { [key: string]: string };
  showPassword: boolean;
  mode?: ThemeMode; // ✅ Thêm mode prop
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
  mode = 'light', // ✅ Default light
  onInputChange,
  onSubmit,
  onTogglePassword
}: LoginFormProps) {
  const router = useRouter();
  const [rememberMe, setRememberMe] = useState(false);

  const handleForgotPassword = () => {
    router.push('/auth/forgot-password');
  };

  return (
    <form onSubmit={onSubmit} style={styles.form}>
      <FormInput
        id="email"
        label="Email hoặc Tên đăng nhập"
        type="text"
        name="email"
        value={data.email}
        placeholder="Nhập email hoặc tên đăng nhập"
        error={validationErrors.email}
        mode={mode} // ✅ Pass mode
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
        mode={mode} // ✅ Pass mode
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

      <SubmitButton 
        isLoading={isLoading}
        mode={mode} // ✅ Pass mode
      >
        Đăng nhập
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
    color: 'rgb(147, 158, 180)',
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