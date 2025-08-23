import React, { useState } from 'react';
import FormInput from '@/component/ui/form/FormInput';
import PasswordInput from '@/component/ui/form/PasswordInput';
import SubmitButton from '@/component/ui/form/SubmitButton';
import ErrorMessage from '@/component/ui/ErrorMessage';
import { LoginRequest } from '@/types/Account';
import { ValidationErrors } from '@/hooks/validation/useValidation';
import { ThemeMode } from '@/types/Theme';
import { useRouter } from 'next/navigation';

interface LoginFormProps {
  data?: LoginRequest;
  isLoading: boolean;
  error: string;
  validationErrors: ValidationErrors;
  showPassword: boolean;
  mode?: ThemeMode;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  onTogglePassword: (show: boolean) => void;
}

export default function LoginForm({
  data = { email: '', password: '' },
  isLoading,
  error,
  validationErrors,
  showPassword,
  mode = 'light',
  onInputChange,
  onSubmit,
  onTogglePassword,
}: LoginFormProps) {
  const [rememberMe, setRememberMe] = useState(false);
  const router = useRouter();

  const email = data?.email || '';
  const password = data?.password || '';

  const handleForgotPassword = () => {
    router.push('/forgot-password');
  };

  return (
    <form onSubmit={onSubmit} style={styles.form}>
      <FormInput
        id="email"
        label="Email hoặc Tên đăng nhập"
        type="text"
        name="email"
        value={email}
        placeholder="Nhập email hoặc tên đăng nhập"
        mode={mode}
        onChange={onInputChange}
        required
      />

      <PasswordInput
        id="password"
        label="Mật khẩu"
        name="password"
        value={password}
        showPassword={showPassword}
        mode={mode}
        onChange={onInputChange}
        onTogglePassword={onTogglePassword}
        required
      />

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
        mode={mode}
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